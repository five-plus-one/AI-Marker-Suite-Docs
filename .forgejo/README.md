# 文档站内部构建与发布

内部 Issue #1 对应本次 CI 迁移。工作流使用 `linux-amd64`、本地镜像 `aimarker-ci:20261115` 和固定 commit 的 Forgejo Actions。

`docs-dev` 与 `main` 的 push、目标为这两个分支的 PR、手动运行都会分别使用 `BASE_URL=/` 和 `BASE_URL=/AI-Marker-Suite-Docs/` 构建。每个构建运行 `npm ci`、`npm run build`、`npm run check`、`npm run check:http`，保留 release-model 单元测试、链接、历史锚点、SEO、内容发现及 HTTP 门禁。两种路径的 artifact 分别为 docs-root 与 docs-pages，保留 7 天。

仅 main 分支的 push / workflow_dispatch 可以部署，且要等两种路径的全部检查通过。docs-dev 和 PR 只验证和保存产物。发布任务只下载 docs-root，使用仓库 secret `MARKER_DEPLOY_URL` 与 `MARKER_DEPLOY_TOKEN`，发送 HTTPS `POST /deploy?target=docs&commit=<40位SHA>`，Bearer 认证，gzip 二进制 body。包根目录是站点文件与 `.delivery.json`，包括 repository、commit、target、version、build；客户端验证摘要和身份，并在发送前核对 main HEAD。接收端再次核对当前 HEAD、去除身份文件并持久化 manifest 回执。

部署回执 artifact 保留 30 天，成功发布后通知 IndexNow；通知失败单独记录，不影响已完成的站点发布。选定分支和 GitHub 发布展示由服务器私有同步程序维护。根路径与历史子路径兼容检查始终保留。

构建会刷新稳定与预览渠道的 OTA 更新日志快照；网络不可用时采用仓库保存的有效快照。构建与校验也会写出本地报告，因此必须在隔离 CI checkout 运行。`AGENTS.md`、`CLAUDE.md`、`CONTRIBUTING.md` 通过 VitePress `srcExclude` 排除。根 `README.md` 仍参与渲染，站点后处理将 `/README` 排除出搜索与索引，公开入口将 `/README`、`/README.html` 重定向到首页。

修改先关联 GitHub 或内部 Issue，在 docs-dev 的功能分支实施并通过 PR 验收，再按授权向 main 提交发布 PR。本次基础设施同步保持现有站点内容、共享组件版本与依赖锁文件。

## 公开与内部协作

[GitHub 公开仓库](https://github.com/five-plus-one/AI-Marker-Suite-Docs) 与 [内部 Forgejo 仓库](https://git.work.five-plus-one.com/fiveplusone-dev/AI-Marker-Suite-Docs) 通过服务器同步已准入的公开分支、Issue 与 PR，可在任一侧参与协作。功能修改面向 `docs-dev` 提交 PR，发布到 `main` 也通过 PR。

同步以仓库和对象的稳定数字 ID 记录来源，已核验的同一维护者账号按双方数字 ID 配对。两侧的 Issue/PR 编号独立，引用对端事项时使用完整来源链接；内容同步保留来源身份和隐私准入边界。

仍开放的 PR 使用两侧原生 PR 协作；历史已关闭 PR 以带来源链接的关闭归档 Issue 保存原状态、合并提交、作者与讨论。归档 Issue 的重新打开只影响归档讨论，不改变来源 PR 的已合入状态；原先未合入的 PR 重新打开时按活动 PR 规则处理，并保留归档关联。历史归档本身不触发 PR 检查或临时部署。
