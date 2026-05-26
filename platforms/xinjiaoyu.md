---
title: 新教育适配 — AI 批改助手
description: AI批改助手新教育适配器使用说明。支持xinjiaoyu.com阅卷平台考试系统和作业系统两种批改模式，通过API拦截获取答题卡图片，AI智能评分自动提交。
keywords: 新教育,AI批改,AI阅卷,自动批改,智能阅卷,xinjiaoyu.com,考试系统,作业系统,答题卡识别,AI评分,自动提交,手写识别,在线阅卷助手
---

# 新教育

## 平台简介

新教育智能平台是一个综合教育平台，提供考试系统和作业系统两种批改模式。

- **考试系统**: `https://www.xinjiaoyu.com/teacher/grading_center/examination/grading_new`
- **作业系统**: `https://www.xinjiaoyu.com/teacher/grading_center/homework/.../grading_by_question/...`

## 技术特点

- **前端框架**: Vue 3 + Ant Design
- **图片渲染**: Canvas（考试系统）/ API 获取（作业系统）
- **分数输入**: Ant Design InputNumber 组件
- **分数提交**: 点击"提交分数"按钮

## 两种批改模式

### 考试系统

按学生批改：一次处理一个学生的所有题目。

- **图片获取**: 通过 XMLHttpRequest 拦截 `/review/task/teacher/student/unreviewed/next` API
- **翻页**: 平台自动跳转到下一个学生

### 作业系统

按题批改：一次处理一个题目的所有学生。

- **图片获取**: 通过 XMLHttpRequest 拦截 `/server_homework/homework/answer/sheet/review/progress` API
- **翻页**: 平台自动跳转到下一个学生
- **学生列表**: 左侧面板显示学生列表，当前学生高亮显示

## 使用方法

### 1. 安装脚本

安装 AI 批改助手最新版本（v1.21.4 或更高版本）。

### 2. 打开阅卷页面

登录新教育平台，进入考试或作业的阅卷页面。

### 3. 使用 AI 批改

1. 脚本会自动检测阅卷页面，显示 AI 批改按钮
2. 点击按钮开始 AI 批改
3. AI 会自动识别答题卡图片、评分、填入分数并提交

## API 拦截

新教育平台使用 API 获取答题卡图片，脚本通过 XMLHttpRequest 拦截机制精确获取当前学生的图片 URL，避免预取图片干扰。

### 考试系统 API

```
POST /api/v3/server_exam_new/review/task/teacher/student/unreviewed/next
```

返回当前和下一个学生的答题卡图片 URL。

### 作业系统 API

```
GET /api/v3/server_homework/homework/answer/sheet/review/progress?homeworkId=...&classId=...
```

返回所有学生的答题卡数据，包含每个小题的图片 URL。

## 注意事项

### 分数输入

新教育使用 Ant Design 的 InputNumber 组件，需要通过 `nativeInputValueSetter` 技术设置值，以兼容 Vue 的响应式系统。

### 作业系统翻页

作业系统提交分数后，平台会自动跳转到下一个学生。脚本通过检测学生列表高亮变化来判断翻页完成。

## 平台适配器信息

| 属性 | 值 |
|------|-----|
| 平台名称 | 新教育 |
| 平台 ID | `xinjiaoyu` |
| URL 匹配 | `*://www.xinjiaoyu.com/*` |
| 适配器路径 | `src/adapters/xinjiaoyu/` |

## 更新日志

### v1.21.4

- 新增新教育平台支持
- 支持考试系统和作业系统两种批改模式
- 通过 API 拦截获取答题卡图片
- 支持 Ant Design InputNumber 分数输入
