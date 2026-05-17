---
title: 开发新适配器 — AI 批改助手
description: 为AI批改助手开发新阅卷平台适配器的完整指南。包含PlatformAdapter接口定义、生命周期方法、图片获取、分数填入等。
---

# 开发新适配器

AI 批改助手采用适配器模式支持多个阅卷平台。如果你想让脚本支持新的阅卷平台，可以按照本指南开发新适配器。

## 架构概述

```
src/
├── core/           # 核心模块（与平台无关）
│   ├── main.js     # 主控流程
│   ├── ai-engine.js # AI 调用
│   ├── prompt.js    # 提示词组装
│   └── ...
└── adapters/       # 平台适配器
    ├── adapter-interface.js  # 接口定义
    ├── zhixue/              # 智学网
    │   ├── adapter.js
    │   └── selectors.js
    ├── qitian/              # 七天网络旧版
    │   ├── adapter.js
    │   └── selectors.js
    └── qitian-new/          # 七天网络新 UI
        ├── adapter.js
        └── selectors.js
```

## 适配器接口

每个适配器必须实现 `PlatformAdapter` 接口。以下是完整的接口定义：

### 基本信息

```javascript
{
    /** 平台中文名 */
    name: "平台名称",

    /** 平台标识符 */
    id: "platform-id",

    /** URL 匹配模式（用于 @match） */
    urlPatterns: ["*.example.com/marking/*"],

    /** 平台图标 URL */
    iconUrl: "https://example.com/favicon.ico",
}
```

### 生命周期方法

#### `shouldInitialize()`

脚本启动时调用，判断当前页面是否属于该平台。应为轻量级 URL 检查。

```javascript
shouldInitialize() {
    return window.location.hostname.includes('example.com');
}
```

#### `detectMarkingPage()`

检测当前页面是否为批改页面（需包含答题卡图片和分数输入框）。

```javascript
async detectMarkingPage() {
    const hasImage = document.querySelector('.answer-card-img') !== null;
    const hasScoreInput = document.querySelector('.score-input') !== null;
    return hasImage && hasScoreInput;
}
```

### 任务标识

#### `getTaskIdentifier()`

返回当前题目的唯一标识字符串，用于方案绑定和 URL 变化检测。

```javascript
getTaskIdentifier() {
    return window.location.pathname + window.location.hash;
}
```

### 图片获取

#### `gatherAnswerImages()`

获取当前页面上所有答题卡图片的 URL 数组。

```javascript
async gatherAnswerImages() {
    const imgs = document.querySelectorAll('.answer-card-img');
    return Array.from(imgs).map(img => img.src);
}
```

#### `fetchImageAsBase64(url)`

下载指定 URL 的图片并返回 base64 编码数据（不含 `data:` 前缀）。

```javascript
async fetchImageAsBase64(url) {
    return new Promise((resolve, reject) => {
        GM_xmlhttpRequest({
            method: 'GET',
            url: url,
            responseType: 'blob',
            onload: (res) => {
                const reader = new FileReader();
                reader.onloadend = () => {
                    const base64 = reader.result.split(',')[1];
                    resolve(base64);
                };
                reader.readAsDataURL(res.response);
            },
            onerror: reject
        });
    });
}
```

### 分数填入

#### `fillScore(request)`

将分数值填入页面上的分数输入框。

```javascript
/**
 * @param {ScoreFillRequest} request
 * @returns {boolean} 成功找到并填入了输入框
 */
fillScore(request) {
    const input = document.querySelector('.score-input');
    if (!input) return false;

    const nativeInputValueSetter = Object.getOwnPropertyDescriptor(
        window.HTMLInputElement.prototype, 'value'
    ).set;
    nativeInputValueSetter.call(input, request.total);
    input.dispatchEvent(new Event('input', { bubbles: true }));
    input.dispatchEvent(new Event('change', { bubbles: true }));

    return true;
}
```

::: tip 分小题填入
如果 `request.subScores` 存在，需要将每个小题的分数填入对应的输入框。参考智学网适配器的实现。
:::

### 提交

#### `submitGrade()`

点击平台的「提交分数」按钮。

```javascript
submitGrade() {
    const btn = document.querySelector('.submit-btn');
    if (!btn) return false;
    btn.click();
    return true;
}
```

### 等待下一份

#### `waitForNextPaper(oldImageUrl?)`

提交后轮询等待下一份答卷加载完成。

```javascript
async waitForNextPaper(oldImageUrl) {
    const timeout = 30000;
    const interval = 500;
    const startTime = Date.now();

    while (Date.now() - startTime < timeout) {
        const newImages = await this.gatherAnswerImages();
        if (newImages.length > 0 && newImages[0] !== oldImageUrl) {
            return true;
        }
        await new Promise(r => setTimeout(r, interval));
    }
    return false;
}
```

### 状态查询

#### `isRegradeMode()`

当前是否处于回评/复核模式。

```javascript
isRegradeMode() {
    return document.querySelector('.regrade-indicator') !== null;
}
```

#### `getScoreInputs()`

返回当前页面上所有分数输入框的信息数组。

#### `detectSubQuestions()`

从 DOM 自动检测当前题目的小题列表。

### 可选钩子

- `onPageLoad()` — init() 完成后的平台特定页面设置
- `onGradingComplete()` — 每次批改循环完成后的回调

## 注册适配器

适配器通过全局变量注册：

```javascript
window.__AI_MARKER_ADAPTER__ = {
    name: "新平台",
    id: "new-platform",
    // ... 实现所有必需的方法
};
```

## 构建与测试

### 本地构建

```bash
cd Core
node build.js
```

构建脚本会自动合并所有模块（包括新适配器），输出到 `dist/ai_marker.user.js`。

### 测试步骤

1. 构建脚本
2. 在 Tampermonkey 中安装本地构建的脚本
3. 打开目标平台的阅卷页面
4. 验证以下功能：
   - 页面检测是否正确
   - 图片获取是否成功
   - 分数填入是否生效
   - 提交是否成功
   - 下一份试卷是否正确加载

### 调试技巧

打开浏览器控制台（`F12`），查看带 `[诊断]` 标记的日志：

```
新平台打分助手加载中...
[诊断] 脚本版本: 1.11.2 | 平台: 新平台 | 浏览器: Chrome/xxx
```

在关键方法中添加 `console.log` 输出调试信息。

## 参考实现

建议参考现有适配器的实现：

- **智学网** (`src/adapters/zhixue/`) — 最成熟的实现
- **七天网络旧版** (`src/adapters/qitian/`) — 传统页面适配
- **七天网络新 UI** (`src/adapters/qitian-new/`) — Vue SPA + Canvas 适配

## 提交贡献

如果你开发了新适配器并希望贡献给项目：

1. Fork [AI-Marker-Suite 仓库](https://github.com/five-plus-one/AI-Marker-Suite)
2. 创建新分支
3. 添加适配器代码
4. 提交 Pull Request

或者 [联系作者](https://r-l.ink/contact) 讨论适配需求。
