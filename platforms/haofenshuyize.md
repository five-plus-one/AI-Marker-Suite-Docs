---
title: 云阅卷(好分数)适配 — AI 批改助手
description: AI批改助手云阅卷(好分数)适配器使用说明。支持haofenshuyize.com阅卷平台Vue 3 + Element Plus框架、答题卡识别和自动评分。包含技术特点、操作流程和常见问题解答。
keywords: 云阅卷,好分数,haofenshuyize,AI批改,AI阅卷,自动批改,智能阅卷,haofenshuyize.com,Vue 3,Element Plus,答题卡识别,AI评分,自动提交,手写识别,在线阅卷助手
---

# 云阅卷(好分数)

## 平台简介

云阅卷(好分数)是一个在线阅卷平台，使用 Vue 3 + Element Plus 框架。

::: info 平台区别
云阅卷(好分数) `haofenshuyize.com` 与以下平台是不同平台：
- **好分数** `haofenshu.com` — SVG 答题卡
- **云阅卷** `yunyuejuan.net` — 华翰云平台
:::

- **阅卷地址**: `https://haofenshuyize.com`

## 技术特点

- **前端框架**: Vue 3 + Element Plus
- **图片渲染**: `<img>` 标签
- **分数输入**: 输入框
- **分数提交**: 点击"提交"按钮

## 使用方法

### 1. 安装脚本

安装 AI 批改助手最新版本。

### 2. 打开阅卷页面

登录云阅卷(好分数)平台，进入阅卷页面。

页面结构如下：

- **左侧**: 答题卡图片
- **右侧**: 评分面板（分数输入框 + 提交按钮）

### 3. 使用 AI 批改

1. 脚本会自动检测阅卷页面，显示 AI 批改按钮
2. 点击按钮开始 AI 批改
3. AI 会自动识别答题卡图片、评分、填入分数并提交

## 图片获取

云阅卷(好分数)平台的答题卡通过 `<img>` 标签加载，脚本直接从 DOM 中获取图片 URL。

## 评分方式

云阅卷(好分数)平台使用标准的输入框评分方式，脚本通过模拟原生输入事件填入分数，兼容 Vue 3 响应式系统。

## 平台适配器信息

| 属性 | 值 |
|------|-----|
| 平台名称 | 云阅卷(好分数) |
| 平台 ID | `haofenshuyize` |
| URL 匹配 | `https://haofenshuyize.com/*` |
| 适配器路径 | `src/adapters/haofenshuyize/` |
