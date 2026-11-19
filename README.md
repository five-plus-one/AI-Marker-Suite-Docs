# AI 批改助手 — 文档站

AI 批改助手文档提供脚本安装、评分设置和平台使用步骤。平台目录可按名称查找阅卷入口、适用任务、给分方式和安装要求。[使用文档](https://aimarking.five-plus-one.com/) · [平台目录](https://aimarking.five-plus-one.com/platforms/) · [脚本源码](https://github.com/five-plus-one/AI-Marker-Suite)

## 本地开发

站点由 VitePress 构建，搜索、阅读操作和即时提示使用 `@fiveplusone/ui`。本地开发约定使用 Node.js 22 和 npm 10，`packageManager` 固定为 `npm@10.9.9`。正式 CI 使用 `aimarker-ci:20261115` 镜像，实际版本为 Node.js 24.22.3、npm 11.19.1。安装依赖使用锁文件；更新依赖时使用 `npx npm@10.9.9 install` 同步锁文件。

```bash
# 安装依赖
npm ci

# 启动开发服务器
npm run dev

# 构建静态站点
npm run build

# 预览构建产物
npm run preview

# 向 IndexNow 提交站点更新（部署后由 CI 自动执行，一般无需手动运行）
npm run indexnow
```

## 文档结构

```
├── guide/           # 入门指南
│   ├── index.md            # 概述
│   ├── introduction.md     # 项目介绍
│   ├── installation.md     # 安装教程
│   ├── quickstart.md       # 快速上手
│   └── faq.md              # 常见问题
├── config/          # 配置说明
│   ├── index.md            # 概述
│   ├── api-setup.md        # AI 接口配置
│   ├── workflow.md         # 批改工作流
│   ├── rubric.md           # 评分规则
│   ├── presets.md          # 预设方案管理
│   ├── sub-questions.md    # 分小题配置
│   └── formula.md          # 公式语法指南
├── modes/           # 批改模式
│   ├── index.md            # 概述
│   ├── normal.md           # 普通模式
│   ├── trial.md            # 试改模式
│   ├── unattended.md       # 无人值守模式
│   └── dual.md             # 双评模式
├── platforms/       # 平台指南与平台目录
├── advanced/        # 进阶功能
│   ├── index.md            # 概述
│   ├── correction.md       # 分数纠错
│   ├── history.md          # 批改历史
│   └── adapter-dev.md      # 开发新适配器
├── feedback/        # 反馈
│   └── thankyou.md         # 致谢
├── public/          # 静态资源（llms.txt、robots.txt、图片等）
├── tools.md         # 工具页
├── support.md       # 帮助与反馈
├── changelog.md     # 更新日志（构建快照与 OTA manifest 刷新）
└── index.md         # 文档首页
```

## 部署

文档站通过内部 Forgejo CI 构建与部署（见 `.forgejo/workflows/ci.yml`），发布约定见 `.forgejo/README.md`：

1. docs-dev 与 PR 验证根路径和 `/AI-Marker-Suite-Docs/` 子路径，保存可下载的构建产物
2. main 的可信 push 经全部门禁后，通过独立 HTTPS 接收端发布到主站
3. 发布完成后向 IndexNow 提交站点更新；选定分支与 GitHub 发布展示由服务器私有程序同步

开发分支为 `docs-dev`，通过 PR 合并到 `main` 后触发部署。

部署地址：[https://aimarking.five-plus-one.com](https://aimarking.five-plus-one.com)

## 相关链接

- **脚本源码**：[AI-Marker-Suite](https://github.com/five-plus-one/AI-Marker-Suite)
- **一键安装**：[点击安装脚本](https://auto-update.aimarking.five-plus-one.com/ota/ai_marker.user.js)
- **问题反馈**：[GitHub Issues](https://github.com/five-plus-one/AI-Marker-Suite/issues)

## 许可证

[GNU General Public License v3.0](https://github.com/five-plus-one/AI-Marker-Suite/blob/stable/LICENSE)

## 共享组件接入

文档页面使用 VitePress 的导航、目录与页面运行时，保留首页组件、下载入口和双通道更新日志。共享库通过 `vitepress.css` 提供产品主题、阅读层级、表格与手机导航样式，通过 `DocumentationSearch` 提供章节搜索和键盘跳转；阅读操作使用共享 Button 与即时提示。Logo 来自共享 MarkerLogo。组件包保存在 `site/vendor/`，版本由 package.json 与锁文件固定。更新顺序为共享库实现、组件与实际页面验收、共享库发布，再替换安装包并更新引用。

`npm run build` 编译 Markdown、代码与公式，再由 `site/build.mjs` 生成章节搜索索引和每页 SEO 元数据。搜索索引按标题与章节拆分，链接直达原文锚点；`?q=关键词` 可直接打开搜索。支持 `BASE_URL=/` 与 `BASE_URL=/AI-Marker-Suite-Docs/`。`npm run dev` 构建并启动预览，编辑后重新构建即可查看。

`npm run check` 覆盖页面链接、原站 62 个路径与 746 个章节锚点，以及全部页面的标题、摘要、canonical、分享卡片、结构化数据和 sitemap。逐页 SEO 结果保存在 `site/seo-report.json`，兼容性结果保存在 `site/route-compatibility-report.json`，原站清单为 `site/legacy-routes.json`。


## 场景展示、历史链接与内容发现

首页通过共享 `ProductPreviewCard` 展示批改、双评和历史三个场景，支持方向键切换、内容与高度过渡。首个场景在构建时生成 HTML，浏览器接管标签交互；静态正文与链接可直接读取。页头、分区侧栏、搜索和阅读页的动态效果由共享样式与 `createDocumentationMotion` 统一。顶栏指示条、侧栏选中面和标签页标记在切换时平滑伸展与滑动，快速切换从当前可见位置衔接；容器缩放和减少动态效果偏好采用即时对齐。

`site/audit-history.mjs` 从仓库全部历史 Markdown 对象生成 `site/historical-links.json`。当前清单覆盖 62 个历史路径、791 个章节锚点；`site/legacy-routes.json` 继续保留原站 62 个路径与 746 个锚点。旧 `/history` 工具地址由静态兼容页面引导到 `/tools`，保留查询参数并映射原锚点。该兼容页面使用即时 meta refresh、规范链接和 JavaScript 跳转，HTTP 状态为 200。

更新日志在构建时刷新 `site/release-notes.json`，抓取失败时使用已有有效快照；当前稳定版、历史稳定版与预览版增量直接输出到 HTML。浏览器可继续刷新版本与日志。历史版本锚点会展开对应条目。

每次构建生成全部可索引页面的 `llms.txt` 目录和 `llms-full.txt` 正文、来源链接与图片说明。`npm run check` 检查元数据、结构化数据、sitemap、全部历史锚点、正文内部页面和资源链接，以及从首页出发的可达性。`npm run check:http` 自动启动临时预览，验证 63 个兼容路径的 137 种 URL 写法和 6 个发现文件。PR 与发布构建均在根路径、GitHub Pages 子路径运行检查。

SEO 与生成式搜索的内容发现遵循 [Google AI 功能说明](https://developers.google.com/search/docs/appearance/ai-features)、[网址迁移指南](https://developers.google.com/search/docs/crawling-indexing/site-move-with-url-changes)和[重定向说明](https://developers.google.com/search/docs/crawling-indexing/301-redirects)。可抓取正文、规范链接与准确结构化数据是主要依据，llms 文件是辅助入口；搜索收录和 AI 引用由各平台决定。

更新日志使用共享 ReleaseNotes 分类展示当前稳定版与预览版相对稳定版新增的变化；数值版本排序、稳定版基线筛选与内容去重在构建和浏览器刷新时采用同一逻辑。历史稳定版本集中收纳，历史书签打开对应版本；预览版已包含在稳定版的内容自动归入稳定版。

## 稳定版配套内容同步

概述与搜索摘要以产品整体能力为主，平台名称采用完整清单；具体入口、操作步骤与适用范围写在对应平台指南中。更新日志记录实际发布变化。

每次稳定版发布后，按以下顺序更新：

1. 核对稳定版 OTA manifest、GitHub Release 与该 tag 的实际功能和平台范围。
2. 更新主项目 README 的版本、平台清单、功能摘要和更新记录，以及 GitHub 仓库简介。
3. 更新项目介绍、平台指南、FAQ 和受影响的配置说明，核对稳定版安装入口与任务限制。
4. 运行构建刷新 `site/release-notes.json`；`site/product.mjs` 统一提供版本、平台名称和产品摘要，供首页、SEO 与 AI 可读文档使用。
5. 在根路径和 GitHub Pages 子路径执行构建、`npm run check` 与 `npm run check:http`，检查桌面与手机宽度、深浅色、链接、搜索摘要和 AI 可读文档。
6. 从 docs-dev 向 main 提交 PR，生产发布由仓库工作流完成；部署后检查规范链接、更新日志与发现文件。

更改平台支持范围时，同步 `site/product.mjs`、平台目录、项目介绍、FAQ、主项目 README 与仓库简介。预览版增量以对应渠道的 manifest 为准。
