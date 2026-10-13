---
title: 鑫考校园适配 — AI 批改助手
description: AI批改助手鑫考校园适配器使用说明。支持内网裸 IP:端口部署的 Marking/NormalReadPaper 鑫考校园6.0系统，data-score 属性满分提取、inputkey 键盘确认提交、subId+teaCode 任务标识和 token 换卷检测，v1.21.15.1 新增支持。
keywords: 鑫考校园,鑫考校园6.0,xinkao-campus,NormalReadPaper,AI批改,AI阅卷,自动批改,智能阅卷,内网阅卷,jQuery,答题卡识别,AI评分,自动提交,手写识别,在线阅卷助手,多小题评分,云阅卷
---

# 鑫考校园

鑫考校园是 AI 批改助手 v1.21.15.1 新增支持的阅卷平台（河北鑫考科技股份有限公司「鑫考校园 6.0」），运行在内网裸 IP:端口的 `/Marking/NormalReadPaper`，与[鑫考](/platforms/xinkao)（公网版 `/Marking/DisPlay`）、[鑫考(内网)](/platforms/xinkao-2)（`/biluo/display.jsp`）是三套独立系统。

::: warning 与另外两个鑫考的区别
三者同名但代码血缘不同：鑫考校园与鑫考(内网)、云阅卷同属「云阅卷」代码家族（提交都走 `inputkey(']')`），但满分来源、小题标签、任务标识方式各不相同；公网版鑫考则与这一族无关。脚本会根据路径和 DOM 特征自动加载对应适配器，无需手动切换。
:::

## 支持的页面

- `*://*/Marking/NormalReadPaper*` — 鑫考校园正常阅卷（内网裸 IP:端口部署，如 `http://119.x.x.x:8888/Marking/NormalReadPaper`）

::: tip 内网部署说明
平台部署在单位内网，访问地址为裸 IP + 端口号。脚本通过**路径特征 + DOM 特征**联合识别平台，不依赖固定 IP。
:::

## 技术特点

鑫考校园基于 jQuery 传统页面构建：

| 特性 | 说明 |
|------|------|
| 框架 | jQuery 传统页面（无 Vue/React） |
| 答题卡渲染 | `<img class="teaimg">` 标签（src 带 examcode/picName/path token） |
| 图片获取 | `img.teaimg` 元素 src，等 `naturalWidth > 0` |
| 分数输入 | 输入框（`input.fenshu`，多小题并列） |
| 提交方式 | `inputkey(']')` 键盘确认流 |

### 答题卡获取

答题卡通过 `<img class="teaimg">` 渲染，图片 URL 带 `examcode`/`picName`/`path` token。脚本会：

1. 等待图片 `naturalWidth > 0` 加载完成
2. 收集所有 `img.teaimg`（支持多页答题卡）
3. 换卷时通过 token 变化检测新试卷

### 满分提取

满分写在分数输入框的 **`data-score` 自定义属性**里（如 `data-score="12"`），不是 placeholder 也不是 `fen` 属性。脚本从该属性自动提取满分值，填入「分数设置」的评分单元配置。小题标签取所在 `<tr>` 第一列文字（如 `13-17(+12)`）。

### 分数填入与提交

填分时写入输入框 `value` 并触发 `input` / `change` / `blur` 事件，并调用平台 `clearNoNum` 归一化分数格式。

提交采用平台的**键盘确认流** `inputkey(']')`（与按回车提交同路径）：

1. 校验分数非空、数值格式正确、不超过 `data-score` 满分
2. 若当前是最后一个小题，调用 `submit()` 完成提交并自动加载下一份卷
3. 否则焦点自动移到下一个小题

脚本会先 focus 最后一个分数输入框再调用 `inputkey(']')`，确保平台内部状态正确。

### 多小题评分

支持一道大题拆成多个小题（多个 `input.fenshu` 并列，id 形如 `fenshu0`/`fenshu1`），脚本按顺序逐个填入对应分数。

### 任务标识

全局变量 `subId` + `teaCode` 构成任务标识，换题时变化、换学生卷时不变，用于评分方案绑定。`examcode`/`testPaperId`/图片 token 不参与标识，避免换卷误触发重新绑定。

## 功能支持

| 功能 | 支持状态 |
|------|---------|
| 自动获取答题卡图片 | 支持（token 图直接下载） |
| 自动提取满分 | 支持（`data-score` 属性解析） |
| 自动填入分数 | 支持（输入框 + clearNoNum 归一化） |
| 自动提交 | 支持（`inputkey(']')` 键盘确认） |
| 等待下一份试卷 | 支持（图片 token 变化检测） |
| 多小题评分 | 支持 |
| 回评模式检测 | 支持（`markingOrReview`/`huipFlag` 判断） |

## 常见问题

### 脚本没有在页面上激活

1. 确认地址栏路径包含 `/Marking/NormalReadPaper`
2. 确认已进入阅卷界面（页面有答题卡图片和小题列表）
3. 刷新页面后检查控制台日志是否有 `[鑫考校园]` 开头的输出

### 提交时提示"分数不能为空"或"分值过大"

这是平台 `inputkey(']')` 的校验提示，说明填分未生效或分数超过满分。请检查：

1. 分数设置里的小题满分是否与页面一致（`data-score` 属性值）
2. AI 给出的分数是否超过满分

### 与另外两个鑫考会冲突吗

不会。三者路径不同（`/Marking/NormalReadPaper` vs `/Marking/DisPlay` vs `/biluo/display.jsp`），脚本分别加载对应适配器。
