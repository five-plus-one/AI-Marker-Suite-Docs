---
title: A佳教育适配 — AI 批改助手
description: AI批改助手A佳教育适配器使用说明。支持y.ajia.cn在线阅卷（marking.html），行级 num-source 评分、data-score 满分提取、「确定」按钮提交自动翻卷。包含技术特点、操作流程和常见问题解答。
keywords: A佳教育,A佳,ajia,y.ajia.cn,AI批改,AI阅卷,自动批改,智能阅卷,答题卡识别,AI评分,自动提交,手写识别,在线阅卷助手,num-source,在线阅卷
---

# A佳教育

## 平台简介

A佳教育是在线阅卷平台，采用 jQuery + requirejs 传统页面架构，单题批量批改（URL 固定题号，逐个学生提交）。

- **阅卷地址**: `https://y.ajia.cn`
- **评阅页面**: `/html/page/marking.html?projectId=..&subjectCode=..&questionNo=N`

## 技术特点

- **前端框架**: jQuery + requirejs（无 Vue / React）
- **图片渲染**: `<img>`（每个 `.sub-img-container` 一张裁剪图，与打分行序号一一对应）
- **分数输入**: 行级 `input.num-source`（每行一个学生一题）；满分取同行 `td.fullscore[data-score]`
- **分数提交**: 点击「确定」（`#key_code_submit`）→ POST `/task/updateScore` → 自动拉取下一份
- **清除/全对/全错**: `#key_code_reset` / `#key_code_full` / `#key_code_zero` 快捷按钮
- **小题打分**: 支持快捷/分步打分板模式（`#subQuestionList`）

## 使用方法

### 1. 安装脚本

安装 AI 批改助手最新版本。

### 2. 打开评阅页面

登录 A佳教育平台，进入阅卷页面（URL 含 `/html/page/marking.html`）。页面结构：

- **中央**: 答题卡图片区（`#markImageContainer`，按题裁剪）
- **右侧**: 打分板（`#markSubjectList`），每行一个学生/一题，含分数输入框与满分
- **底部**: 清除 / 全对 / 全错 / 确定 等快捷按钮

### 3. 使用 AI 批改

1. 脚本自动检测阅卷页面，右下角显示 **AI 批改** 按钮
2. 点击开始批改，AI 识别答题卡并评分
3. 确认后脚本填入分数并点击「确定」，自动翻到下一份

## 注意事项

- **建议使用常规打分板**。小题快捷/分步打分板模式下，平台「确定」会先逐个小题确认再提交，首版适配未覆盖该路径
- 多行 = 同一学生多个小题时，分数以逗号拼接提交
- 赋值后需派发 `input` + `keyup` 事件（与平台「清除」按钮的事件组合一致），脚本已自动处理

## 常见问题

**Q: 提交后没有自动翻卷？**
A: 检查平台「确定」按钮是否被遮挡；若使用小题打分板，请切换到常规打分板。

**Q: 分数填进去又被清空？**
A: 平台「清除」会监听 `input`+`keyup`，脚本赋值已派发同组合事件。若仍被清空，刷新页面后重试。

**Q: 满分提取不到？**
A: 满分取自同行 `td.fullscore[data-score]` 属性。若平台改版导致属性缺失，需更新适配器。
