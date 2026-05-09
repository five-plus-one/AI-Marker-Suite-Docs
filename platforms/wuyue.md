---
title: 五岳阅卷适配 — AI 批改助手
description: AI批改助手在五岳阅卷(wylkyj.com)平台上的使用说明。支持答题卡识别、Vue3输入框分数填充、分小题评分。
---

# 五岳阅卷

五岳阅卷 (wylkyj.com) 是 AI 批改助手新增支持的阅卷平台。

## 支持的页面

脚本在以下 URL 模式下自动激活：

- `*.wylkyj.com/*` — 五岳阅卷页面

## 功能支持

| 功能 | 支持状态 |
|------|---------|
| 自动获取答题卡图片 | 支持（AnswerSheet 类型图片） |
| 自动填入分数 | 支持（Vue3 响应式） |
| 自动提交 | 支持 |
| 等待下一份试卷 | 支持 |
| 分小题评分 | 支持 |

## 技术特点

五岳阅卷平台使用 Vue3 + Element Plus 构建，答题卡以 `<img>` 标签渲染，支持单小题和多小题模式。

| 特性 | 五岳阅卷 |
|------|---------|
| 框架 | Vue3 + Element Plus |
| 答题卡渲染 | `<img>` 标签 |
| 图片获取 | `src` 属性（AnswerSheet 类型） |
| 分数输入 | Vue3 响应式 input |
| 分小题 | `.computeItem` 容器 |

### 答题卡图片获取

五岳阅卷的答题卡使用 `<img>` 标签渲染，页面可能包含多张图片：

- **PaperScan**：原卷扫描图片（脚本会忽略）
- **AnswerSheet**：答题卡图片（脚本会筛选此类型）

图片托管在 `data.wylkyj.com` CDN 上，脚本通过 `GM_xmlhttpRequest` 绕过跨域限制。

### 分数填入

五岳阅卷使用 Vue3 框架，直接修改 input 的 `value` 属性不会触发 Vue 的响应式更新。脚本通过以下方式确保分数正确填入：

1. 使用 `Object.getOwnPropertyDescriptor(HTMLInputElement.prototype, 'value').set` 设置值
2. 手动派发 `input`、`change`、`blur` 事件触发 Vue3 响应式更新

### 分小题评分

五岳阅卷支持分小题评分。页面结构如下：

```html
<div class="computeList">
  <div class="computeItem">
    <span class="num">15</span>
    <div class="el-input">
      <input class="el-input__inner" placeholder="满分15分" />
    </div>
    <span class="full">满</span>
    <span class="zero">零</span>
  </div>
  <!-- 更多 computeItem... -->
</div>
```

- 脚本自动识别 `.computeItem` 容器中的多个小题输入框
- 通过 `.num` 元素获取满分值
- 逐题填入分数

## 常见问题

### 页面检测失败

如果打开阅卷页面后没有出现 AI 批改按钮：

1. 确认当前页面 URL 匹配 `*.wylkyj.com/*`
2. 确认页面上显示了答题卡图片和分数输入框
3. 按 `F12` 查看控制台日志，检查是否有 `[诊断]` 信息

### 图片获取失败

五岳阅卷的答题卡图片托管在 CDN 上，可能有防盗链机制。脚本使用 `GM_xmlhttpRequest` 绕过跨域限制。

如果图片获取失败：

1. 检查网络连接
2. 刷新页面重试
3. 确认 Tampermonkey 权限设置正确

### 分数填入失败

如果 AI 评分正确但分数没有填入输入框：

1. 可能是 Vue3 响应式更新未触发，脚本已做兼容处理
2. 请更新脚本到最新版本
3. 如果仍然失败，请 [反馈问题](https://github.com/five-plus-one/AI-Marker-Suite/issues)

### 分小题填入失败

五岳阅卷的分小题输入框结构可能因页面版本而异。如果自动检测失败：

1. 在设置面板中手动添加小题配置
2. 确认每个小题的标签和满分值正确
