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
```

## 文档结构

```
├── guide/           # 入门指南
│   ├── introduction.md    # 项目介绍
│   ├── installation.md    # 安装教程
│   ├── quickstart.md      # 快速上手
│   └── faq.md             # 常见问题
├── config/          # 配置说明
│   ├── api-setup.md       # AI 接口配置
│   ├── rubric.md          # 评分规则
│   ├── presets.md         # 预设方案管理
│   └── sub-questions.md   # 分小题配置
├── modes/           # 批改模式
│   ├── normal.md          # 普通模式
│   ├── trial.md           # 试改模式
│   └── unattended.md      # 无人值守模式
├── platforms/       # 平台适配
│   ├── zhixue.md          # 智学网
│   ├── qitian.md          # 七天网络
│   ├── haofenshu.md       # 好分数
│   ├── wuyue.md           # 五岳阅卷
│   ├── hanhan.md          # 华翰云
│   ├── guangda.md         # 光大阅卷
│   ├── yunyuejuan.md      # 云阅卷
│   ├── xinjiaoyu.md       # 新教育
│   ├── runjian.md         # 润建学情
│   ├── xueba54.md         # 54学霸
│   ├── jiukexing.md       # 九科星
│   ├── huiyuejuan.md      # 慧阅卷
│   ├── lehua.md           # 乐华阅卷
│   └── xinkao.md          # 鑫考
├── advanced/        # 进阶功能
│   ├── correction.md      # 分数纠错
│   ├── history.md         # 批改历史
│   └── adapter-dev.md     # 开发新适配器
├── changelog.md     # 更新日志
└── index.md         # 文档首页
```

## 部署

文档站通过 GitHub Actions 自动部署到 GitHub Pages。推送到 `main` 分支后会自动触发构建和部署。

部署地址：[https://aimarking.five-plus-one.com](https://aimarking.five-plus-one.com)

## 相关链接

- **脚本源码**：[AI-Marker-Suite](https://github.com/five-plus-one/AI-Marker-Suite)
- **一键安装**：[点击安装脚本](https://auto-update.aimarking.five-plus-one.com/ota/ai_marker.user.js)
- **问题反馈**：[GitHub Issues](https://github.com/five-plus-one/AI-Marker-Suite/issues)

## 许可证

[GNU General Public License v3.0](https://github.com/five-plus-one/AI-Marker-Suite/blob/main/LICENSE)
