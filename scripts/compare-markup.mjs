// Compare against another commit with: node scripts/compare-markup.mjs <git-ref>
// This checks rendered markup, assets and initial styles; browser tests cover interaction/timing.
import { execFileSync } from 'node:child_process';
import { readFileSync, statSync } from 'node:fs';
import { createRequire } from 'node:module';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { build, transformSync } from 'esbuild';

const root = fileURLToPath(new URL('../', import.meta.url));
const require = createRequire(import.meta.url);
const React = require('react');
const { renderToStaticMarkup } = require('react-dom/server');
const git = (...args) => execFileSync('git', args, { cwd: root, maxBuffer: 128 * 1024 * 1024 });
const baseline = git('rev-parse', '--verify', '--end-of-options', `${process.argv[2] ?? 'HEAD'}^{commit}`).toString().trim();
const tracked = new Set(git('ls-tree', '-r', '-z', '--name-only', baseline).toString().split('\0'));
const sources = new Map();
const sections = ['overview', 'research', 'projects', 'contact'];
const files = {
  App: 'App.tsx',
  Layout: 'components/Layout.tsx',
  Overview: 'components/sections/Overview.tsx',
  Research: 'components/sections/Research.tsx',
  Projects: 'components/sections/Projects.tsx',
  Contact: 'components/sections/Contact.tsx',
};
const entry = Object.entries(files).map(([name, file]) =>
  `export { ${name === 'App' ? 'default as App' : name} } from './${file}';`
).join('\n');

async function loadComponents(original) {
  const result = await build({
    stdin: { contents: entry, resolveDir: root, sourcefile: 'parity-entry.js' },
    bundle: true,
    write: false,
    outfile: path.join(root, 'node_modules/.cache/markup-parity.cjs'),
    assetNames: 'assets/[name]-[hash]',
    publicPath: '/',
    platform: 'node',
    format: 'cjs',
    packages: 'external',
    jsx: 'automatic',
    plugins: [{ name: 'parity-source', setup(builder) {
      builder.onResolve({ filter: /^\./ }, args => {
        const relative = path.posix.normalize(path.posix.join(
          args.namespace === 'parity' ? path.posix.dirname(args.importer) : '.',
          args.path.replace(/\?inline$/, ''),
        ));
        const candidates = [relative, ...['.tsx', '.ts', '.jsx', '.js'].map(ext => relative + ext)];
        const file = candidates.find(candidate => original
          ? tracked.has(candidate)
          : statSync(path.join(root, candidate), { throwIfNoEntry: false })?.isFile());
        if (!file) throw new Error(`Cannot resolve ${args.path} from ${args.importer}`);
        return { path: file, namespace: 'parity' };
      });
      builder.onLoad({ filter: /.*/, namespace: 'parity' }, args => {
        const file = args.path;
        const ext = path.posix.extname(file).slice(1);
        if (original && !sources.has(file)) sources.set(file, git('show', `${baseline}:${file}`));
        const bytes = original ? sources.get(file) : readFileSync(path.join(root, file));
        if (ext === 'css') return { contents: bytes, loader: 'text' };
        if (!['ts', 'tsx', 'js', 'jsx'].includes(ext)) return { contents: bytes, loader: 'file' };
        let slot = 0;
        // Override only application hooks. React and Framer Motion are kept unmodified.
        const contents = bytes.toString().replace(/\buseState(?:<[^<>]*>)?\(/g,
          () => `globalThis.__markupParityState(${JSON.stringify(file)}, ${slot++}, `);
        return { contents, loader: ext, resolveDir: root };
      });
    }}],
  });
  const module = { exports: {} };
  const code = result.outputFiles.find(file => file.path.endsWith('.cjs')).text;
  new Function('require', 'module', 'exports', code)(require, module, module.exports);
  return module.exports;
}

const before = await loadComponents(true);
const after = await loadComponents(false);
const cssCache = new Map();
function normalizeCSS(html) {
  return html.replace(/<style>([\s\S]*?)<\/style>/g, (_, css) => {
    if (!cssCache.has(css)) cssCache.set(css, transformSync(css, {
      loader: 'css', minifyWhitespace: true, legalComments: 'none',
    }).code.trim());
    return `<style>${cssCache.get(css)}</style>`;
  });
}

function render(components, name, props, overrides) {
  const consumed = new Set();
  globalThis.__markupParityState = (file, slot, initial) => {
    const values = overrides[file];
    if (values && slot < values.length) consumed.add(`${file}:${slot}`);
    const value = values && slot < values.length
      ? values[slot]
      : typeof initial === 'function' ? initial() : initial;
    return [value, () => {}];
  };
  try {
    const html = renderToStaticMarkup(React.createElement(components[name], props));
    for (const [file, values] of Object.entries(overrides)) {
      values.forEach((_, slot) => {
        if (!consumed.has(`${file}:${slot}`)) throw new Error(`Unused state override: ${file}:${slot}`);
      });
    }
    return normalizeCSS(html);
  } finally {
    delete globalThis.__markupParityState;
  }
}

let checks = 0;
function compare(label, name, props = {}, overrides = {}) {
  const expected = render(before, name, props, overrides);
  const actual = render(after, name, props, overrides);
  if (actual !== expected) {
    let offset = 0;
    while (offset < expected.length && expected[offset] === actual[offset]) offset++;
    const excerpt = html => JSON.stringify(html.slice(Math.max(0, offset - 80), offset + 180));
    throw new Error(`${label}: markup differs at character ${offset}\nBaseline: ${excerpt(expected)}\nCurrent:  ${excerpt(actual)}`);
  }
  checks++;
}

const sectionStates = {
  Overview: [[null], ['academic'], ['research']],
  Research: [[null], [0]],
  Projects: [[null], [0], [1]],
  Contact: [[null, false], ['email', false], [null, true], ['email', true]],
};
compare('App/default', 'App');
for (const language of ['en', 'zh']) {
  compare(`App/boot/${language}`, 'App', {}, { [files.App]: ['overview', true, language] });
  for (const activeSection of sections) {
    compare(`Layout/${activeSection}/${language}`, 'Layout', {
      activeSection, language, onNavigate() {}, onLanguageChange() {},
      children: React.createElement('p', null, 'Preserved main content'),
    });
  }
  for (const [name, states] of Object.entries(sectionStates)) {
    compare(`${name}/${language}/default`, name, { language, onNavigate() {} });
    for (const state of states) {
      const label = `${name}/${language}/${JSON.stringify(state)}`;
      const overrides = { [files[name]]: state };
      compare(label, name, { language, onNavigate() {} }, overrides);
      compare(`App/${label}`, 'App', {}, {
        ...overrides, [files.App]: [name.toLowerCase(), false, language],
      });
    }
  }
}
console.log(`Markup parity passed: ${checks} scenarios against ${baseline.slice(0, 12)} (both languages, boot, all sections, modals and copy feedback).`);
