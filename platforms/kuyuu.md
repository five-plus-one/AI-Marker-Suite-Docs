---
title: 酷鱼网适配 — AI 批改助手
description: AI批改助手酷鱼网适配器使用说明。支持www.kuyuu.cn阅卷平台Canvas答题卡渲染（tainted canvas安全取图）、键/鼠/批三种打分模式、scores属性满分提取。包含技术特点、操作流程和常见问题解答。
keywords: 酷鱼网,酷鱼,kuyuu,AI批改,AI阅卷,自动批改,智能阅卷,www.kuyuu.cn,Canvas答题卡,ems-imageview,答题卡识别,AI评分,自动提交,手写识别,在线阅卷助手
---

# 酷鱼网

## 平台简介

酷鱼网是一个在线阅卷平台，使用 jQuery 传统页面 + `ems-imageview` 图片查看插件，答题卡渲染在 Canvas 上。

- **阅卷地址**: `https://www.kuyuu.cn`
- **评阅页面**: `/read/read?schoolid=..&examgroup=..&examid=..&groupid=..&itemid=N`

## 技术特点

- **前端框架**: jQuery（无 Vue / React）
- **图片渲染**: Canvas（`canvas.ems-iv-img`，由 ems-imageview 插件绘制）
- **分数输入**: 输入框（键模式）+ 满分/零分快捷按钮 + 0~15 分数按钮（鼠标模式）
- **分数提交**: 点击「提交」按钮（`a[btntype="submit"]`）
- **打分模式**: 键（键盘输入）/ 鼠（点击分数按钮）/ 批（标注模式）三种
- **特殊功能**: 分数确认开关、问题卷标记、回评列表、满分/零分一键

## 使用方法

### 1. 安装脚本

安装 AI 批改助手最新版本。

### 2. 打开评阅页面

登录酷鱼网平台，进入评阅页面（URL 含 `/read/read`）。页面结构如下：

- **中央**: 答题卡 Canvas（可缩放、拖动、标注）
- **右侧**: 评分面板（`#scorePanel`），含题号、满分、分数输入框和提交按钮
- **底部**: 提交 / 满分 / 零分 / 问题卷 / 回评按钮

### 3. 使用 AI 批改

1. 脚本会自动检测评阅页面，显示 AI 批改按钮
2. 点击按钮开始 AI 批改
3. AI 会自动识别答题卡图片、评分
4. 确认后脚本填入分数并点击「提交」

::: tip 打分模式
填分前脚本会自动确保「键」模式激活（`a[scoretype="key"]`），保证分数写入输入框而不是点分数按钮。
:::

## 图片获取

酷鱼网的答题卡绘制在 `<canvas class="ems-iv-img">` 上。由于图片是跨域绘制，Canvas 处于 **tainted（污染）状态**，`toDataURL()` 无法导出。

脚本采用三重策略取图：

1. **img 标签**: 查找页面上尺寸大于 200px 的 `<img>`（排除 UI 背景图）
2. **Performance 资源条目**: 从浏览器资源加载记录中提取图片 URL（排除 `/public/images/plugins/` 下的 UI 资源）
3. **canvas 兜底**: 尝试 `toDataURL`（万一未污染时可用）

拿到 URL 后，脚本使用 `GM_xmlhttpRequest` 下载图片（绕过 CORS 限制），再转 base64 送 AI 识别。

## 满分提取

满分从评分面板的 `td.first-td` 文本提取，格式如「18/20/21 (15分)」→ 满分 15。兜底方案为读取输入框 `scores` 属性（`,0,1,2,...,15,`）中的最大值。

## 适配器信息

| 项目 | 值 |
|------|-----|
| 适配器 ID | `kuyuu` |
| 域名 | www.kuyuu.cn |
| 页面检测 | URL 路径 `/read/read` + 评分面板 + Canvas |
| 任务标识 | URL 参数 `examid` + `itemid` |
| 图片策略 | img 标签 / Performance 条目 / canvas 兜底 → GM 下载 |
| 分数填入 | 键模式输入框，触发 input/change/blur/keyup 事件 |

## 常见问题

**Q: 图片导出失败怎么办？**
A: 属正常现象（tainted canvas 不可导出）。脚本会自动改用 Performance 资源条目拿到图片 URL 后下载。若仍失败，请确认页面图片已加载完成。

**Q: 提交后弹出确认框？**
A: 评分面板的「分数确认」开关开启时，平台会弹确认框。脚本会自动点击确定，无需手动操作。
