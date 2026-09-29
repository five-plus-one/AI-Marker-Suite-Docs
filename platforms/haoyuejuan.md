---
title: 阅小二适配 — AI 批改助手
description: AI批改助手阅小二适配器使用说明。支持haoyuejuan.com阅卷平台答题卡识别、Vue3响应式输入框分数填充、分小题评分与回评模式识别。包含技术特点、操作流程和常见问题解答。
keywords: 阅小二,AI批改,AI阅卷,自动批改,智能阅卷,haoyuejuan.com,答题卡识别,AI评分,自动提交,分小题评分,手写识别,在线阅卷助手
---

# 阅小二

阅小二 (haoyuejuan.com) 是 AI 批改助手新增支持的阅卷平台（阅小二科技·教学质量大数据监测平台）。

## 支持的页面

脚本在以下 URL 模式下自动激活：

- `www.haoyuejuan.com/*` — 阅小二阅卷页面（批改页 hash 为 `#/reading`）

## 功能支持

| 功能 | 支持状态 |
|------|---------|
| 自动获取答题卡图片 | 支持（AnswerSheet，含 OSS 裁剪参数） |
| 自动填入分数 | 支持（Vue3 响应式） |
| 自动提交 | 支持 |
| 等待下一份试卷 | 支持 |
| 分小题评分 | 支持 |
| 回评模式识别 | 支持（「取消回评」按钮判定） |

## 技术特点

阅小二使用 Vue3 + Element Plus 构建，DOM 结构与五岳阅卷同构，答题卡以 `<img>` 标签渲染。

| 特性 | 阅小二 |
|------|---------|
| 框架 | Vue3 + Element Plus |
| 答题卡渲染 | `<img>` 标签 |
| 图片获取 | `src`（OSS 裁剪 URL，需原样保留） |
| 分数输入 | Vue3 响应式 input |
| 分小题 | `.computeItem` 容器 |
| 任务标识 | hash 固定 `#/reading`，拼接题号 `.num` |

### 答题卡图片获取

答题卡图片托管在 `data.wylkyj.com` CDN 上，URL 内含阿里云 OSS 裁剪参数（`x-oss-process=image/crop,...`）。脚本**原样取 `img.src`**，不会二次裁剪或剥离 query。

页面可能预载多张其他学生答卷（`.outBox.hideBox`），脚本只取当前可见区（`.outBox:not(.hideBox)`）内的图片。换卷时 DOM 会短暂清空重建，脚本会等待图片加载完成后再采集。

### 分数填入

与五岳阅卷相同，直接修改 input 的 `value` 不会触发 Vue 响应式更新。脚本通过：

1. `Object.getOwnPropertyDescriptor(HTMLInputElement.prototype, 'value').set` 设置值
2. 派发 `input` / `change` / `blur` 事件

输入框自带 `oninput` 过滤（仅数字、最多两位小数），兼容脚本写入。

### 分小题评分

```html
<div class="computeList">
  <div class="computeItem">
    <span class="num">18</span>
    <div class="el-input">
      <input class="el-input__inner" placeholder="满分12分" />
    </div>
    <span class="full">满</span>
    <span class="zero">零</span>
  </div>
  <!-- 更多 computeItem... -->
</div>
```

- 遍历 `.computeItem` 识别各小题输入框
- 从 placeholder「满分N分」解析满分，从 `.num` 取题号标签
- 逐题填入分数

### 回评模式

与五岳阅卷**相反**：

- 正常阅卷：面板显示「回评上一份」
- 回评模式：显示「取消回评」（`button.redBtn`）

脚本以「取消回评」出现作为回评判定，避免换卷瞬间 DOM 抖动误判。

## 适配器信息

| 项目 | 值 |
|------|-----|
| 适配器 ID | `haoyuejuan` |
| 平台名称 | 阅小二 |
| 域名 | www.haoyuejuan.com |
| 框架 | Vue3 + Element Plus |
| 参考实现 | 五岳阅卷 (wuyue) |

## 常见问题

### 页面检测失败

如果打开阅卷页面后没有出现 AI 批改按钮：

1. 确认 URL 为 `www.haoyuejuan.com/yuejuan/#/reading`
2. 确认页面上显示了答题卡图片和给分面板
3. 按 `F12` 查看控制台日志，搜索 `[阅小二]`

### 图片获取失败

答题卡图片有 OSS 签名与防盗链。脚本使用 `GM_xmlhttpRequest` 绕过跨域。若失败请刷新页面重试。

### 回评时仍弹出 AI 批改

脚本通过「取消回评」按钮识别回评模式。若误判，请反馈具体页面状态。

### 分小题填入失败

1. 在设置面板中手动添加小题配置
2. 确认每个小题的标签和满分值正确
