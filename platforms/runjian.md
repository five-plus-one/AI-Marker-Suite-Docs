---
title: 润建学情适配 — AI 批改助手
description: AI批改助手润建学情适配器使用说明。支持aisusheng.runjian.com阅卷平台CSS背景图渲染、点击式评分按钮、API拦截获取答题卡图片。包含技术特点、操作流程和常见问题解答。
keywords: 润建学情,AI批改,AI阅卷,自动批改,智能阅卷,aisusheng.runjian.com,答题卡识别,AI评分,点击式评分,自动提交,手写识别,在线阅卷助手
---

# 润建学情

## 平台简介

润建学情大数据精准分析平台是一个在线阅卷和学情分析平台，支持按题块批改模式。

- **阅卷地址**: `https://aisusheng.runjian.com/apps/app-marking/marking/read-paper/{paperId}/{题块}/{index}`
- **API 域名**: `rjedu.runjian.com`

## 技术特点

- **前端框架**: Vue 2 + Element UI
- **图片渲染**: CSS `background-image`（腾讯云 COS，带 `imageMogr2/cut` 裁切参数）
- **分数输入**: 点击式评分按钮 (`.score-item-button`)
- **分数提交**: 点击"提交"按钮，无二次确认弹窗
- **给分模式**: 一键给分 / 批注给分 / 键盘给分

## 使用方法

### 1. 安装脚本

安装 AI 批改助手最新版本。

### 2. 打开阅卷页面

登录润建平台，进入阅卷页面。页面结构如下：

- **左侧**: 答题卡图片（通过 CSS background-image 渲染，自动裁切到当前题目区域）
- **右侧**: 给分面板（一键给分模式下显示 0-N 分按钮）

### 3. 使用 AI 批改

1. 脚本会自动检测阅卷页面，显示 AI 批改按钮
2. 点击按钮开始 AI 批改
3. AI 会自动识别答题卡图片、评分、点击对应分数按钮并提交

::: warning 自动提交复选框
给分面板中有一个"自动提交"复选框。脚本会在初始化时自动取消勾选，以确保分数填入和提交是两个独立步骤。如果手动勾选，点击分数按钮后会立即提交，可能导致 AI 批改流程异常。
:::

## 图片获取

润建平台的答题卡图片通过 CSS `background-image` 渲染在 `.img-box` 元素上，图片托管在腾讯云 COS。

### 图片裁切

平台使用 `imageMogr2/cut` 参数对完整答题卡图片进行裁切，只显示当前题目的区域：

```
https://guangxi-1308783540.cos.ap-guangzhou.myqcloud.com/.../paper/.../image.png?imageMogr2/cut/859x140x130x1096/ignore-error/1
```

裁切参数 `859x140x130x1096` 表示：宽度 859px、高度 140px、起始坐标 (130, 1096)。

### API 拦截

脚本通过 XMLHttpRequest 拦截 `get_item` API 获取当前题目的图片 URL 和元数据：

```
POST https://rjedu.runjian.com/marking-main/grad/v2/get_item
```

响应中包含：
- `result.todo[0].ossUrl` — 当前题目的图片 URL（已裁切）
- `result.todo[0].question` — 题号（如 "2.23"）
- `result.todo[0].id` — 题目唯一标识
- `result.stand[0].point` — 满分值

## 评分方式

润建平台使用**点击式评分**，通过 `.score-item-button` 按钮选择分数：

- 按钮组：0, 1, 2, 3, 4, 5, 6（根据满分值动态生成）
- 快捷按钮："满分"、"零分"
- 步长设置：可通过"步长"输入框调整分数步长

脚本会自动点击与 AI 评分结果匹配的按钮。

## 注意事项

### 分数按钮

润建平台的分数按钮是 Element UI 组件，脚本通过匹配按钮 `<span>` 文本来定位目标分数按钮。

### 提交流程

提交后无二次确认弹窗，平台会自动加载下一份试卷。脚本通过检测图片 URL 变化来判断新试卷是否加载完成。

### 多题块支持

URL 中包含题块信息（如"题块3"），脚本使用完整 URL 路径作为任务标识，支持预设方案按题块自动切换。

## 平台适配器信息

| 属性 | 值 |
|------|-----|
| 平台名称 | 润建学情 |
| 平台 ID | `runjian` |
| URL 匹配 | `*://aisusheng.runjian.com/*` |
| 适配器路径 | `src/adapters/runjian/` |
