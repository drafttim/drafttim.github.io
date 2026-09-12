# Xiaochi Liu 个人主页

React + TypeScript + Vite。页面继续使用原有的 Tailwind CDN、字体、图片、视频和 Framer Motion 动画。

## 代码结构

- `App.tsx`：启动时序、语言和栏目状态，以及栏目切换动画。
- `components/sections/`：四个页面的组合与本地交互状态。
- `components/app/`：启动画面和 CRT 叠加效果。
- `components/layout/`：身份信息、头像特效、磁带播放器和布局装饰。
- `components/overview/`、`components/contact/`：对应页面的展示组件。
- `content/`：各页面的中英文界面文案；两种语言共享同一类型约束。
- `data/`：导航、论文、项目、技术栈和日志数据。
- `types.ts`：栏目、语言、论文和项目的共享类型。
- `components/src/assets/`：原始静态资源，保留原路径。

新增论文或项目时修改 `data/`；修改界面翻译时修改 `content/`；修改交互时从相应的 section 组件进入。弹窗状态和 `AnimatePresence` 保留在页面层，避免组件拆分改变进入、退出动画。

## 开发与检查

```sh
npm ci
npm run dev
npm run check
```

`check` 执行严格 TypeScript 检查及生产构建。GitHub Pages 工作流也会在构建前检查类型。

## 保持页面效果的回归检查

修改前先保存生产构建：

```sh
npm run build -- --outDir node_modules/.cache/architecture-baseline
```

修改后重新构建，比较两个构建：

```sh
npm run check
npx playwright install chromium
npm run test:visual -- node_modules/.cache/architecture-baseline dist
```

Windows 已安装 Edge 时可跳过浏览器安装，在 PowerShell 中执行 `$env:BROWSER_CHANNEL = 'msedge'` 后运行对比。

浏览器检查覆盖桌面和手机、中英文、四个栏目、概览展开卡片、论文与项目详情、邮箱复制反馈、微信二维码。它会严格比较 DOM 和截图尺寸，像素比较采用 pixelmatch 默认的 0.1 感知阈值与抗锯齿检测，每个场景最多允许 10 个差异像素（报告保留原始差异统计），在测试浏览器中固定循环装饰动画，并隐藏浏览器原生视频控件的加载动效；有限过渡动画完成并固定透明度后再截图，头像悬停动画则定位到同一时间点。视频的源文件与控件属性仍参加结构检查。页面外部资源首次需要联网，后续使用本次回归目录中的缓存，确保前后版本使用相同资源。报告及差异截图保存在 `node_modules/.cache/visual-comparison/`，不会提交到 Git。

静态输出也可以直接与 Git 中的指定版本比较：

```sh
npm run test:markup -- HEAD
```

此检查覆盖双语、启动、栏目、详情和复制状态，核对实际 HTML、类名、资源 URL 和初始动画样式。仅忽略样式表的空白和注释差异。进行后续修改时，应传入修改前的提交引用。
