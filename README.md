# AI 批改助手 — 文档站

本仓库包含 [AI 批改助手](https://aimarking.five-plus-one.com) 的文档站源码，基于 [VitePress](https://vitepress.dev/) 构建。

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
├── platforms/       # 平台适配（22 个）
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
│   └── ameqp.md            # AMEQP网上评卷
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
