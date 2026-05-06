---
title: 支持平台 - AI 批改助手
description: AI 批改助手支持的在线阅卷平台，包括智学网和七天网络。
---

# 支持平台

AI 批改助手通过适配器模式支持多个在线阅卷平台。一个脚本即可在所有支持的平台上使用。

## 平台对比

| | 智学网 | 七天网络 |
|--|--------|---------|
| 网址 | zhixue.com | 7net.cc / qt7.net |
| 适配状态 | ✅ 完整支持 | ✅ 完整支持（含新旧 UI） |
| 批改流程 | 识别 → 打分 → 填入 → 提交 | 识别 → 打分 → 填入 → 提交 |

## 文档导航

<CardGrid>
<Card title="智学网" href="/platforms/zhixue" description="智学网平台的适配说明，包括页面识别和操作流程" />
<Card title="七天网络" href="/platforms/qitian" description="七天网络平台的适配说明，支持新旧两种 UI 界面" />
</CardGrid>

::: tip 关于适配器
AI 批改助手使用适配器模式，每个平台有独立的适配器代码。如果你需要支持新的阅卷平台，可以参考 [开发新适配器](/advanced/adapter-dev) 文档自行开发。
:::
