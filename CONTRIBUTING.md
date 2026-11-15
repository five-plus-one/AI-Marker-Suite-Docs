# 文档站贡献指南

在[内部文档站仓库](https://git.work.five-plus-one.com/fiveplusone-dev/AI-Marker-Suite-Docs)创建 Issue，描述使用场景、文档问题、期望内容和涉及页面。先创建 Issue，再从 docs-dev 创建实施分支；开发 PR 目标为 docs-dev，并使用 Closes #N 关联同仓库问题。

安装依赖后，分别以 BASE_URL=/ 与 BASE_URL=/AI-Marker-Suite-Docs/ 执行 npm run build、npm run check、npm run check:http。验证正文、链接、历史锚点、稳定与预览更新日志、SEO 和 HTTP 访问。浏览与交互修改还需验证宽窄窗口、深浅色与键盘操作。

开发 PR 验收完成后，按发布授权向 main 提交 PR。docs-dev 负责验证，main 的可信 push 由内部 CI 发布。入口和部署约定见 [.forgejo/README.md](.forgejo/README.md)。

共享组件先在共享库完成实现、验收与发布，再更新固定安装包引用。提交使用脱敏资料，并保留站点历史地址和锚点兼容。
