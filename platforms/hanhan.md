---
title: 华翰云适配 — AI 批改助手
description: AI批改助手华翰云适配器使用说明。支持yunyuejuan.net阅卷平台答题卡识别、Vue响应式输入框分数填充、自动提交功能。包含技术特点、操作流程和常见问题解答。
keywords: 华翰云,AI批改,AI阅卷,自动批改,智能阅卷,yunyuejuan.net,答题卡识别,AI评分,自动提交,手写识别,在线阅卷助手
---

# 华翰云

华翰云 (yunyuejuan.net) 是 AI 批改助手在 v1.21.2 中新增支持的阅卷平台。

## 支持的页面

脚本在以下 URL 模式下自动激活：

- `*.yunyuejuan.net/*` — 华翰云阅卷页面

## 功能支持

| 功能 | 支持状态 |
|------|---------|
| 自动获取答题卡图片 | 支持（`<img>` 标签） |
| 自动填入分数 | 支持（Vue 响应式） |
| 自动提交 | 支持 |
| 等待下一份试卷 | 支持 |
| 分小题评分 | 暂不支持 |

## 技术特点

华翰云平台使用 Vue + Element Plus 构建，答题卡以 `<img>` 标签渲染：

| 特性 | 说明 |
|------|------|
| 框架 | Vue + Element Plus |
| 答题卡渲染 | `<img>` 标签（`.el-image.photo_bg`） |
| 分数输入 | `input.el-input__inner`（placeholder="请给分"） |
| 提交按钮 | `.el-button--primary`（文字"给分"） |

### 答题卡图片获取

华翰云的答题卡以标准 `<img>` 元素渲染，脚本通过读取 `src` 属性获取图片 URL。图片托管在平台 CDN 上，脚本使用 `GM_xmlhttpRequest` 绕过跨域限制。

### 分数填入

华翰云使用 Vue 框架，直接修改 input 的 `value` 属性不会触发 Vue 的响应式更新。脚本通过以下方式确保分数正确填入：

1. 使用 `Object.getOwnPropertyDescriptor(HTMLInputElement.prototype, 'value').set` 设置值
2. 手动派发 `input`、`change` 和 `blur` 事件触发 Vue 响应式更新

### 提交机制

华翰云的提交按钮文字为"给分"，脚本自动查找包含"给分"文字的按钮并点击。

## 常见问题

### 页面检测失败

如果打开阅卷页面后没有出现 AI 批改按钮：

1. 确认当前页面 URL 匹配 `*.yunyuejuan.net/*`
2. 确认页面上显示了答题卡图片和分数输入框
3. 按 `F12` 查看控制台日志，检查是否有 `[诊断]` 信息

### 图片获取失败

华翰云的答题卡图片托管在 CDN 上，可能有防盗链机制。脚本使用 `GM_xmlhttpRequest` 绕过跨域限制。

如果图片获取失败：

1. 检查网络连接
2. 刷新页面重试
3. 确认 Tampermonkey 权限设置正确

### 分数填入失败

如果 AI 评分正确但分数没有填入输入框：

1. 可能是 Vue 响应式更新未触发，脚本已做兼容处理
2. 请更新脚本到最新版本
3. 如果仍然失败，请 [反馈问题](https://github.com/five-plus-one/AI-Marker-Suite/issues)
