import assert from 'node:assert/strict';
import pixelmatch from 'pixelmatch';
import { createHash } from 'node:crypto';
import { createServer } from 'node:http';
import { readFile, writeFile, mkdir, stat } from 'node:fs/promises';
import path from 'node:path';
import { createRequire } from 'node:module';

// NODE_PATH also allows using a preinstalled browser runtime without project dependencies.
const require = createRequire(import.meta.url);
const { chromium } = require('playwright');
const { PNG } = require('pngjs');
const baselineDir = process.argv[2];
const candidateDir = process.argv[3] || 'dist';
if (!baselineDir) throw new Error('Usage: node scripts/compare-pages.mjs <baseline-build> [candidate-build]');
const outputDir = path.resolve('node_modules/.cache/visual-comparison');
await mkdir(outputDir, { recursive: true });
const mime = { '.html': 'text/html', '.js': 'text/javascript', '.css': 'text/css', '.jpg': 'image/jpeg', '.png': 'image/png', '.mp4': 'video/mp4' };
async function serve(directory) {
  const root = path.resolve(directory);
  await stat(path.join(root, 'index.html'));
  const server = createServer(async (req, res) => {
    const name = decodeURIComponent(new URL(req.url, 'http://localhost').pathname);
    const file = path.resolve(root, '.' + (name === '/' ? '/index.html' : name));
    if (file !== root && !file.startsWith(root + path.sep)) { res.writeHead(403).end(); return; }
    try { const body = await readFile(file); res.writeHead(200, { 'Content-Type': mime[path.extname(file)] || 'application/octet-stream' }); res.end(body); }
    catch { res.writeHead(404).end(); }
  });
  await new Promise(resolve => server.listen(0, '127.0.0.1', resolve));
  return { server, url: `http://127.0.0.1:${server.address().port}` };
}
const sites = await Promise.all([serve(baselineDir), serve(candidateDir)]);
const browser = await chromium.launch({ headless: true, args: ['--disable-gpu', '--force-color-profile=srgb'], ...(process.env.BROWSER_CHANNEL ? { channel: process.env.BROWSER_CHANNEL } : {}) });
const cache = new Map();
const cacheDir = path.join(outputDir, 'external-assets');
await mkdir(cacheDir, { recursive: true });
const failures = [];
const renderingNoise = [];
// Use pixelmatch's standard perceptual threshold and anti-alias detection.
// DOM and image dimensions remain exact; raw raster differences are reported too.
const pixelThreshold = 0.1;
const maxDiffPixels = 10;
let comparisons = 0;
async function openPage(url, viewport) {
  const context = await browser.newContext({ viewport, permissions: ['clipboard-read', 'clipboard-write'] });
  await context.route(/^https:\/\/(cdn\.tailwindcss\.com|fonts\.googleapis\.com|fonts\.gstatic\.com|www\.transparenttextures\.com)\//, async route => {
    const key = route.request().url();
    if (!cache.has(key)) cache.set(key, (async () => {
      const file = path.join(cacheDir, createHash('sha256').update(key).digest('hex') + '.json');
      try { const saved = JSON.parse(await readFile(file, 'utf8')); return { ...saved, body: Buffer.from(saved.body, 'base64') }; } catch {}
      const response = await route.fetch({ timeout: 120000 });
      assert.equal(response.status(), 200, `Failed external resource: ${key}`);
      const saved = { status: response.status(), headers: response.headers(), body: (await response.body()).toString('base64') };
      await writeFile(file, JSON.stringify(saved));
      return { ...saved, body: Buffer.from(saved.body, 'base64') };
    })());
    await route.fulfill(await cache.get(key));
  });
  const page = await context.newPage();
  page.on('pageerror', error => failures.push(`Runtime: ${error.message}`));
  await page.addInitScript(() => {
    Math.random = () => 0.5;
    const animate = Element.prototype.animate;
    Element.prototype.animate = function(keyframes, options) {
      const animation = animate.call(this, keyframes, options);
      if (typeof options === 'object' && options.iterations === Infinity) {
        animation.pause();
        animation.currentTime = 0;
        animation.play = () => { animation.pause(); animation.currentTime = 0; };
      }
      return animation;
    };
  });
  await page.goto(url, { waitUntil: 'load', timeout: 180000 });
  // Framer's JS-driven decorative loops do not appear in document.getAnimations().
  // Fix their horizontal travel, reel rotation and heading skew only in the test browser.
  await page.addStyleTag({ content: '[style*="translateX("], [style*="rotate("], [style*="skewX("] { transform: none !important; } #root [style*="opacity:"] { opacity: 1 !important; } video::-webkit-media-controls { display: none !important; }' });
  await new Promise(resolve => setTimeout(resolve, 3000));
  await page.evaluate(async () => { await document.fonts.ready; await Promise.all([...document.images].map(img => img.decode().catch(() => {}))); });
  await settle(page);
  return page;
}
async function settle(page, duration = 1000) {
  await page.mouse.move(0, 0);
  await new Promise(resolve => setTimeout(resolve, duration));
}
async function capture(page, preserveHoverAnimation = false) {
  await page.evaluate(async () => {
    for (const video of document.querySelectorAll('video')) {
      video.preload = 'auto';
      if (video.readyState < 4) await new Promise((resolve, reject) => {
        video.addEventListener('canplaythrough', resolve, { once: true });
        video.addEventListener('error', reject, { once: true });
      });
    }
  });
  // Freeze decorative loops in the test browser; finite transitions run normally.
  await page.evaluate(() => {
    for (const animation of document.getAnimations()) {
      if (animation.effect.getTiming().iterations === Infinity) { animation.pause(); animation.currentTime = 0; }
    }
  });
  const options = { fullPage: true, animations: preserveHoverAnimation ? 'allow' : 'disabled' };
  await page.screenshot(options);
  await new Promise(resolve => setTimeout(resolve, 150));
  const screenshot = await page.screenshot(options);
  const dom = await page.locator('#root').evaluate(root => [...root.querySelectorAll('*')].filter(el => el.tagName !== 'STYLE').map(el => ({
    tag: el.tagName,
    attributes: [...el.attributes].filter(a => a.name !== 'style').map(a => [a.name, a.name === 'class' ? a.value.replace(/\s+/g, ' ').trim() : a.value]).sort((a,b) => a[0].localeCompare(b[0])),
    text: [...el.childNodes].filter(n => n.nodeType === Node.TEXT_NODE).map(n => n.textContent.replace(/\s+/g, ' ').trim()).filter(Boolean)
  })));
  return { screenshot, dom };
}
async function compare(pages, label) {
  const snapshots = await Promise.all(pages.map(page => capture(page, label.includes('avatar-hover'))));
  const [before, after] = snapshots;
  comparisons++;
  let issue = '';
  try { assert.deepEqual(after.dom, before.dom); } catch { issue += 'DOM differs; '; }
  const a = PNG.sync.read(before.screenshot), b = PNG.sync.read(after.screenshot);
  let changed = 0;
  let rawChanged = 0;
  let maxChannelDifference = 0;
  if (a.width !== b.width || a.height !== b.height) issue += `Dimensions ${a.width}x${a.height} vs ${b.width}x${b.height}; `;
  else {
    for (let i = 0; i < a.data.length; i += 4) {
      const difference = Math.max(...[0, 1, 2, 3].map(channel => Math.abs(a.data[i + channel] - b.data[i + channel])));
      if (difference) rawChanged++;
      maxChannelDifference = Math.max(maxChannelDifference, difference);
    }
    changed = pixelmatch(a.data, b.data, null, a.width, a.height, { threshold: pixelThreshold, includeAA: false });
    if (rawChanged) renderingNoise.push({ label, rawChanged, maxChannelDifference, changedAboveTolerance: changed });
    if (changed > maxDiffPixels) issue += `${changed} changed pixels; `;
  }
  if (issue) {
    failures.push(`${label}: ${issue}`);
    await Promise.all(snapshots.flatMap((s, i) => [writeFile(path.join(outputDir, `${label}-${i ? 'after' : 'before'}.png`), s.screenshot), writeFile(path.join(outputDir, `${label}-${i ? 'after' : 'before'}.json`), JSON.stringify(s.dom, null, 2))]));
  }
  console.log(`${issue ? 'FAIL' : 'PASS'} ${label}${issue ? ': ' + issue : ''}`);
}
async function both(pages, action) { await Promise.all(pages.map(action)); }
async function clickCard(page, index) {
  const card = page.locator('main .cursor-pointer').nth(index);
  await card.scrollIntoViewIfNeeded();
  await settle(page);
  await card.click({ force: true });
  await settle(page);
}
async function closeModal(page) {
  await page.locator('button').filter({ has: page.locator('svg.lucide-x') }).click({ force: true });
  await settle(page);
}
try {
  for (const viewport of [{ width: 390, height: 844 }, { width: 1440, height: 1000 }].filter(v => !process.env.VISUAL_WIDTH || v.width === Number(process.env.VISUAL_WIDTH))) {
    const pages = [];
    for (const site of sites) pages.push(await openPage(site.url, viewport));
    for (const language of (process.env.VISUAL_LANGUAGE ? [process.env.VISUAL_LANGUAGE] : ['zh', 'en'])) {
      if (language === 'en') await both(pages, async p => { await p.getByRole('button', { name: 'EN', exact: true }).click({ force: true }); await settle(p); });
      const prefix = `${viewport.width}-${language}`;
      for (const [index, section] of ['overview', 'research', 'projects', 'contact'].entries()) {
        if (index !== 0 || language === 'en') await both(pages, async p => { await p.locator('nav button').nth(index).click({ force: true }); await settle(p); await p.evaluate(() => scrollTo(0, 0)); await settle(p); });
        await compare(pages, `${prefix}-${section}`);
        if (section === 'overview') {
          await both(pages, async p => {
            await p.locator('aside .cursor-pointer').first().hover();
            await new Promise(resolve => setTimeout(resolve, 600));
            await p.evaluate(() => {
              for (const animation of document.getAnimations()) {
                if (/^(glitch|scanline|flash)/.test(animation.animationName || '')) {
                  animation.pause(); animation.currentTime = 500;
                }
              }
            });
          });
          await compare(pages, `${prefix}-avatar-hover`);
          await both(pages, p => settle(p));
          await both(pages, async p => { await p.evaluate(() => scrollTo(0, document.body.scrollHeight)); await settle(p); });
          await compare(pages, `${prefix}-overview-bottom`);
          for (let card = 0; card < 2; card++) {
            await both(pages, p => clickCard(p, card));
            await compare(pages, `${prefix}-overview-modal-${card}`);
            await both(pages, closeModal);
          }
        } else if (section === 'research' || section === 'projects') {
          const count = section === 'projects' ? 2 : 1;
          for (let card = 0; card < count; card++) {
            await both(pages, p => clickCard(p, card));
            await compare(pages, `${prefix}-${section}-modal-${card}`);
            await both(pages, closeModal);
          }
        } else {
          await both(pages, async p => { await p.getByRole('button', { name: /xiaochiliu@mail.bnu.edu.cn/ }).click({ force: true }); await settle(p, 500); assert.equal(await p.evaluate(() => navigator.clipboard.readText()), 'xiaochiliu@mail.bnu.edu.cn'); });
          await compare(pages, `${prefix}-contact-copied`);
          await both(pages, async p => { await settle(p, 2000); assert.equal(await p.getByText('COPIED', { exact: true }).count(), 0); await clickCard(p, 0); });
          await compare(pages, `${prefix}-contact-qr`);
          await both(pages, closeModal);
        }
      }
    }
    await both(pages, p => p.context().close());
  }
} finally {
  await browser.close();
  await Promise.all(sites.map(({ server }) => new Promise(resolve => server.close(resolve))));
}
await writeFile(path.join(outputDir, 'report.json'), JSON.stringify({ comparisons, pixelThreshold, maxDiffPixels, renderingNoise, failures }, null, 2));
assert.deepEqual(failures, [], `Visual regression failed. Artifacts: ${outputDir}`);
console.log(`${comparisons} comparisons passed with identical DOM and pixel differences within the documented anti-alias tolerance.`);
