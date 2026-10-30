# AI 批改助手 — 文档站

本仓库包含 [AI 批改助手](https://aimarking.five-plus-one.com) 的文档站源码，正文由 [VitePress](https://vitepress.dev/) 编译，页面采用 React 与 `@fiveplusone/ui` 共享组件静态生成。

## 本地开发

```bash
# 安装依赖
npm install

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
├── platforms/       # 平台适配（32 页 / 33 个适配器）
│   ├── index.md            # 平台对比与快速导航
│   ├── zhixue.md           # 智学网
│   ├── qitian.md           # 七天网络
│   ├── haofenshu.md        # 好分数
│   ├── wuyue.md            # 五岳阅卷
│   ├── hanhan.md           # 华翰云
│   ├── guangda.md          # 光大阅卷
│   ├── yunyuejuan.md       # 云阅卷
│   ├── xinjiaoyu.md        # 新教育
│   ├── runjian.md          # 润建学情
│   ├── xueba54.md          # 54学霸
│   ├── jiukexing.md        # 九科星
│   ├── huiyuejuan.md       # 慧阅卷
│   ├── lehua.md            # 乐华阅卷
│   ├── xinkao.md           # 鑫考
│   ├── huixuexing.md       # 慧学星
│   ├── yuejiaoxiangyun.md  # 粤教翔云
│   ├── haofenshuyize.md    # 云阅卷(好分数)
│   ├── keewing.md          # 科耘阅卷
│   ├── guangda-2.md        # 光大阅卷V2
│   ├── weicom.md           # 威科姆(悦卷通)
│   ├── c30.md              # C30教育云
│   ├── ameqp.md            # AMEQP网上评卷
│   ├── haiyun.md           # 海云智评
│   └── xinkao-2.md         # 鑫考(内网)
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
├── changelog.md     # 更新日志（从 OTA manifest 动态拉取）
└── index.md         # 文档首页
```

## 部署

文档站通过 GitHub Actions 自动部署（见 `.github/workflows/deploy.yml`），推送 `main` 分支后自动触发：

1. **GitHub Pages** — `https://five-plus-one.github.io/AI-Marker-Suite-Docs/`（BASE_URL=`/AI-Marker-Suite-Docs/`）
2. **云服务器** — `/opt/1panel/www/sites/aimarking-docs/index`，对应主域名
3. 部署完成后自动向 IndexNow 提交站点更新通知搜索引擎

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
