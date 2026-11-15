# 文档站开发约定

源码与 Issues 位于内部 Forgejo 的 fiveplusone-dev/AI-Marker-Suite-Docs。先创建内部 Issue，再从 docs-dev 创建实施分支，开发 PR 目标为 docs-dev，发布时向 main 提交 PR。PR 正文使用 Closes #N 关联同仓库 Issue。

docs-dev 的 push 和全部 PR 执行构建验证；main 的可信 push 执行部署。合并发布、人工触发生产工作流与生产操作按用户的明确授权执行。本次内部 CI 迁移已获授权同步 CI 基础设施，保持站点内容和依赖版本。

安装依赖后，对 BASE_URL=/ 与 BASE_URL=/AI-Marker-Suite-Docs/ 分别执行 npm run build、npm run check、npm run check:http。构建与校验报告属于隔离 CI 工作目录，提交只包含人工维护的修改。

CI 容器使用 aimarker-ci:20261115，部署经 HTTPS 接收端并携带 .delivery.json，具体身份与回执约定见 .forgejo/README.md。选定分支与 GitHub 发布展示由服务器私有程序同步。

共享组件在 D:/5plus1/DEV/5plus1-ui 实现、验收并发布后，以固定安装包版本引用。面向用户的页面只展示产品功能、操作和结果；内部开发说明由 VitePress srcExclude 排除。
