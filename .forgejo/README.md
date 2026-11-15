# 文档站内部构建与发布

内部 Issue #1 对应本次 CI 迁移。工作流使用 `linux-amd64`、本地镜像 `aimarker-ci:20261115` 和固定 commit 的 Forgejo Actions。

`docs-dev` 与 `main` 的 push、目标为这两个分支的 PR、手动运行都会分别使用 `BASE_URL=/` 和 `BASE_URL=/AI-Marker-Suite-Docs/` 构建。每个构建运行 `npm ci`、`npm run build`、`npm run check`、`npm run check:http`，保留 release-model 单元测试、链接、历史锚点、SEO、内容发现及 HTTP 门禁。两种路径的 artifact 分别为 docs-root 与 docs-pages，保留 7 天。

仅 main 分支的 push / workflow_dispatch 可以部署，且要等两种路径的全部检查通过。docs-dev 和 PR 只验证和保存产物。发布任务只下载 docs-root，使用仓库 secret `MARKER_DEPLOY_URL` 与 `MARKER_DEPLOY_TOKEN`，发送 HTTPS `POST /deploy?target=docs&commit=<40位SHA>`，Bearer 认证，gzip 二进制 body。包根目录是站点文件与 `.delivery.json`，包括 repository、commit、target、version、build；客户端验证摘要和身份，并在发送前核对 main HEAD。接收端再次核对当前 HEAD、去除身份文件并持久化 manifest 回执。

部署回执 artifact 保留 30 天，成功发布后通知 IndexNow；通知失败单独记录，不影响已完成的站点发布。selected branches 和 GitHub 发布展示由服务器私有同步程序维护。根路径与历史子路径兼容检查始终保留。

构建会刷新稳定与预览渠道的 OTA 更新日志快照；网络不可用时采用仓库保存的有效快照。构建与校验也会写出本地报告，因此必须在隔离 CI checkout 运行。内部开发说明通过 VitePress srcExclude 排除，不进入面向用户的站点内容。

修改先关联内部 Issue，在 docs-dev 的功能分支实施并通过 PR 验收，再按授权向 main 提交发布 PR。本次基础设施同步保持现有站点内容、共享组件版本与依赖锁文件。
