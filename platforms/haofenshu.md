---
title: 好分数适配 — AI 批改助手
description: AI批改助手在好分数(haofenshu.com)阅卷平台上的使用说明。支持SVG答题卡识别、Vue输入框分数填充、分小题评分。
---

# 好分数

好分数 (haofenshu.com) 是 AI 批改助手在 v1.11.3 中新增支持的阅卷平台。

## 支持的页面

脚本在以下 URL 模式下自动激活：

- `*.haofenshu.com/*` — 好分数阅卷页面

## 功能支持

| 功能 | 支持状态 |
|------|---------|
| 自动获取答题卡图片 | 支持（SVG `xlink:href`） |
| 自动填入分数 | 支持（Vue 响应式） |
| 自动提交 | 支持 |
| 等待下一份试卷 | 支持 |
| 分小题评分 | 支持 |

## 技术特点

好分数平台使用 Vue + Element UI 构建，答题卡以 SVG 内嵌 `<image>` 元素渲染，与其他平台有显著差异：

| 特性 | 智学网/七天网络 | 好分数 |
|------|---------------|-------|
| 框架 | 传统页面 / Vue SPA | Vue + Element UI |
| 答题卡渲染 | `<img>` / Canvas | SVG `<image>` |
| 图片获取 | `src` 属性 | `xlink:href` 属性 |
| 分数输入 | 原生 input | Vue 响应式 input |

### 答题卡图片获取

好分数的答题卡使用 SVG `<image>` 元素渲染，脚本通过读取 `xlink:href` 属性获取图片 URL。图片托管在 `yj-oss.yunxiao.com` 等 CDN 域名上。

### 分数填入

好分数使用 Vue 框架，直接修改 input 的 `value` 属性不会触发 Vue 的响应式更新。脚本通过以下方式确保分数正确填入：

1. 使用 `Object.getOwnPropertyDescriptor(HTMLInputElement.prototype, 'value').set` 设置值
2. 手动派发 `input` 和 `change` 事件触发 Vue 响应式更新

### 分小题评分

好分数支持分小题评分。当页面上存在多个分数输入框时：

- 脚本自动识别 `.score-list` 容器中的多个小题输入框
- 通过 `.block-title` 元素获取小题标签
- 通过 `placeholder` 属性中的「满分X分」获取满分值
- 逐题填入分数

## 常见问题

### 页面检测失败

如果打开阅卷页面后没有出现 AI 批改按钮：

1. 确认当前页面 URL 匹配 `*.haofenshu.com/*`
2. 确认页面上显示了答题卡图片和分数输入框
3. 按 `F12` 查看控制台日志，检查是否有 `[诊断]` 信息

### 图片获取失败

好分数的答题卡图片托管在 CDN 上，可能有防盗链机制。脚本使用 `GM_xmlhttpRequest` 绕过跨域限制。

如果图片获取失败：

1. 检查网络连接
2. 刷新页面重试
3. 确认 Tampermonkey 权限设置正确

### 分数填入失败

如果 AI 评分正确但分数没有填入输入框：

1. 可能是 Vue 响应式更新未触发，脚本已做兼容处理
2. 请更新脚本到最新版本
3. 如果仍然失败，请 [反馈问题](https://github.com/five-plus-one/AI-Marker-Suite/issues)

### 分小题填入失败

好分数的分小题输入框结构可能因页面版本而异。如果自动检测失败：

1. 在设置面板中手动添加小题配置
2. 确认每个小题的标签和满分值正确
