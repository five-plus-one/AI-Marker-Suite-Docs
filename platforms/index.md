---
title: 支持平台 - AI 批改助手
description: AI 批改助手支持的在线阅卷平台，包括智学网、七天网络、好分数、五岳阅卷、华翰云、光大阅卷、云阅卷、新教育、润建学情和54学霸。
---

# 支持平台

AI 批改助手通过适配器模式支持多个在线阅卷平台。一个脚本即可在所有支持的平台上使用。

::: info 移动端用户
如果你在手机上浏览，可以点击页面左上角的 **☰ 菜单按钮** 展开侧边目录，在各章节之间切换。
:::

## 平台对比

| | 智学网 | 七天网络 | 好分数 | 五岳阅卷 | 华翰云 | 光大阅卷 | 云阅卷 | 新教育 | 润建学情 | 54学霸 |
|--|--------|---------|-------|---------|-------|---------|-------|-------|---------|-------|
| 网址 | zhixue.com | 7net.cc / qt7.net | haofenshu.com | wylkyj.com | yunyuejuan.net | pj.yixx.cn | 内网部署 | xinjiaoyu.com | aisusheng.runjian.com | 54xueba.cn |
| 适配状态 | 完整支持 | 完整支持（含新旧 UI） | 完整支持 | 完整支持 | 完整支持 | 完整支持 | 完整支持 | 完整支持（考试+作业） | 完整支持 | 完整支持 |
| 答题卡渲染 | `<img>` 标签 | `<img>` / Canvas | SVG `<image>` | `<img>` 标签 | `<img>` 标签 | Canvas | `<img>` 标签 | Canvas / API | CSS background-image | Canvas + base64 img |
| 分数输入 | 输入框 | 输入框 | 输入框 | 输入框 | 输入框 | 点击选择 | 输入框 | 输入框 | 点击选择 | 输入框（多小题） |
| 批改流程 | 识别 → 打分 → 填入 → 提交 | 识别 → 打分 → 填入 → 提交 | 识别 → 打分 → 填入 → 提交 | 识别 → 打分 → 填入 → 提交 | 识别 → 打分 → 填入 → 提交 | 识别 → 打分 → 点击 → 提交 | 识别 → 打分 → 填入 → 提交 | 识别 → 打分 → 填入 → 提交 | 识别 → 打分 → 点击 → 提交 | 识别 → 打分 → 填入 → 提交 |

## 快速导航

1. **[智学网](/platforms/zhixue)** — 智学网平台的适配说明和操作流程
2. **[七天网络](/platforms/qitian)** — 七天网络平台的适配说明，支持新旧 UI
3. **[好分数](/platforms/haofenshu)** — 好分数平台的适配说明，支持 SVG 答题卡
4. **[五岳阅卷](/platforms/wuyue)** — 五岳阅卷平台的适配说明，支持分小题评分
5. **[华翰云](/platforms/hanhan)** — 华翰云平台的适配说明
6. **[光大阅卷](/platforms/guangda)** — 光大阅卷平台的适配说明，支持 Canvas 渲染和点击式评分
7. **[云阅卷](/platforms/yunyuejuan)** — 云阅卷平台的适配说明，支持内网阅卷系统
8. **[新教育](/platforms/xinjiaoyu)** — 新教育平台的适配说明，支持考试和作业两种批改模式
9. **[润建学情](/platforms/runjian)** — 润建学情平台的适配说明，支持 CSS 背景图和点击式评分
10. **[54学霸](/platforms/xueba54)** — 54学霸平台的适配说明，支持 Canvas/base64 图片和多小题输入框

<CardGrid>
<Card title="智学网" href="/platforms/zhixue" description="智学网平台的适配说明，包括页面识别和操作流程" />
<Card title="七天网络" href="/platforms/qitian" description="七天网络平台的适配说明，支持新旧两种 UI 界面" />
<Card title="好分数" href="/platforms/haofenshu" description="好分数平台的适配说明，支持 SVG 答题卡和分小题评分" />
<Card title="五岳阅卷" href="/platforms/wuyue" description="五岳阅卷平台的适配说明，支持分小题评分" />
<Card title="华翰云" href="/platforms/hanhan" description="华翰云平台的适配说明，支持答题卡识别" />
<Card title="光大阅卷" href="/platforms/guangda" description="光大阅卷平台的适配说明，支持 Canvas 渲染和点击式评分" />
<Card title="云阅卷" href="/platforms/yunyuejuan" description="云阅卷平台的适配说明，支持内网阅卷系统" />
<Card title="新教育" href="/platforms/xinjiaoyu" description="新教育平台的适配说明，支持考试和作业两种批改模式" />
<Card title="润建学情" href="/platforms/runjian" description="润建学情平台的适配说明，支持 CSS 背景图和点击式评分" />
<Card title="54学霸" href="/platforms/xueba54" description="54学霸平台的适配说明，支持 Canvas/base64 图片渲染和多小题输入框评分" />
</CardGrid>

::: tip 关于适配器
AI 批改助手使用适配器模式，每个平台有独立的适配器代码。如果你需要支持新的阅卷平台，可以参考 [开发新适配器](/advanced/adapter-dev) 文档自行开发。
:::

---

**其他分区**：[入门指南](/guide/) · [配置](/config/) · [批改模式](/modes/) · [进阶功能](/advanced/)
