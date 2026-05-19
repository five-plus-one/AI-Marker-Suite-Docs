---
title: 安装教程 — AI 批改助手
description: AI批改助手安装教程。需要在电脑端使用Edge浏览器，安装Tampermonkey扩展后一键安装脚本。
---

# 安装教程

## 准备工作

::: danger 重要前提
AI 批改助手是一个**浏览器脚本**，必须在**电脑端**的浏览器中运行。**手机无法使用**（微信中打开此页面也无法安装）。
:::

### 需要什么？

| 条件 | 说明 |
|------|------|
| **电脑** | Windows 或 Mac 均可，**手机、平板不行** |
| **Edge 浏览器** | Windows 10/11 已预装，无需额外下载 |
| **Tampermonkey 扩展** | 免费的浏览器脚本管理器，下面会教你怎么安装 |

### 为什么推荐 Edge？

- **Windows 电脑自带**：Windows 10 和 Windows 11 都预装了 Edge 浏览器，不需要额外下载
- **兼容性好**：Edge 基于 Chromium 内核，对油猴脚本的支持非常完善
- **Chrome 在国内无法访问应用商店**：虽然 Chrome 也能用，但它的扩展商店在国内无法直接打开

::: warning 不支持的浏览器
以下浏览器**不支持**油猴脚本，无法使用 AI 批改助手：
- 360 安全浏览器、360 极速浏览器
- 搜狗浏览器
- QQ 浏览器
- 各种"安全浏览器"

如果你目前使用的是上述浏览器，请切换到 **Edge 浏览器**。
:::

## 第一步：安装 Tampermonkey 扩展

**Tampermonkey（油猴）** 是一个免费的浏览器扩展（插件），它可以让你在浏览器中运行额外的脚本程序。AI 批改助手就是通过它来运行的。

### 操作步骤

1. **打开 Edge 浏览器**（在开始菜单或桌面搜索 "Edge"）
2. **点击下方链接**打开 Tampermonkey 安装页面：

   **[点击安装 Tampermonkey 扩展](https://microsoftedge.microsoft.com/addons/detail/tampermonkey/iikmkjmpaadaobahmlepeloendndfphd)**

3. 在打开的页面中，点击 **「获取」** 按钮

![](https://img.assets.five-plus-one.com/2026/05/e4dda0a1047a12d49dc27e615d591dbd.png)

4. 浏览器会弹出确认提示，点击 **「添加扩展」**

![](https://img.assets.five-plus-one.com/2026/05/0ee33f3b3677ce816010d9309704c9dc.png)

5. 安装完成后，浏览器右上角会出现 Tampermonkey 的黑色图标

::: tip 找不到图标？
安装完成后如果看不到图标，点击浏览器右上角的 **拼图图标**（扩展管理），找到 Tampermonkey，点击 **「在工具栏中显示」**。
:::

![](https://img.assets.five-plus-one.com/2026/05/0eeb6c42c1d31f6ca820d5326563f116.png)

### 允许扩展运行



1. 打开 Edge 浏览器，按照下面的图示依次点击 **扩展→篡改猴旁的更多选项→管理扩展**

![](https://img.assets.five-plus-one.com/2026/05/de36528fb825f706bf118834112b390f.png)

2. 在设置菜单中，勾选 **“允许用户脚本” 和 “允许访问文件 URL”**

![](https://img.assets.five-plus-one.com/2026/05/45e126528a82494b866a5c7ad5d946d1.png)

## 第二步：安装 AI 批改助手脚本

::: danger 重要前提
执行这一步前，请你确保你已经按照上面的操作完成了 Tampermonkey 扩展的安装和启用。
:::

Tampermonkey 安装好之后，就可以安装 AI 批改助手脚本了。

AI 批改助手提供两个版本渠道，请根据需要选择：

| 版本 | 说明 | 安装链接 |
|------|------|---------|
| **稳定版** | 经过充分测试，推荐日常使用 | **[点击安装稳定版](https://auto-update.aimarking.five-plus-one.com/ota/ai_marker.user.js)** |
| **预览版** | 包含最新功能，可能不够稳定 | **[点击安装预览版](https://auto-update.aimarking.five-plus-one.com/ota/preview/ai_marker.user.js)** |

::: tip 稳定版和预览版的区别
- **稳定版**：经过充分测试的功能版本，适合日常批改使用
- **预览版**：包含正在测试中的新功能，适合想提前体验的用户。如遇到问题可随时在脚本设置中切换回稳定版
- **开发版**：面向开发者的自动构建版本，不提供公开安装链接
:::

1. **在 Edge 浏览器中**点击上方安装链接（不要在微信中打开）
2. 浏览器会自动弹出 Tampermonkey 的安装确认页面，显示脚本的名称和权限
3. 点击 **「安装」** 按钮

![](https://img.assets.five-plus-one.com/2026/05/230fdabb40dffd845252170452402a32.png)

::: warning 点击链接后没有反应？
- 确认你是在 **Edge 浏览器** 中打开的，不是微信或其他 App
- 确认 Tampermonkey 扩展已安装并启用
- 尝试刷新页面后重新点击
:::

## 第三步：验证安装

1. 打开 Tampermonkey 管理面板（点击浏览器右上角 Tampermonkey 图标 → 管理面板）
2. 在「已安装脚本」列表中，确认「AI 批改助手」已启用（开关为绿色）
3. 打开**智学网**或**七天网络**的阅卷页面，页面上应出现 AI 批改相关的浮动按钮

::: tip 注意
脚本只在阅卷页面（能看到答题卡图片和分数输入框的页面）上才会激活，其他页面上不会显示任何内容，这是正常的。
:::

## 手动安装（高级）

如果你需要安装特定版本的脚本，可以手动操作：

1. 打开 Tampermonkey 管理面板
2. 点击「+」号创建新脚本
3. 清空编辑器中的默认内容
4. 将脚本代码粘贴进去
5. 按 `Ctrl + S` 保存

## 更新脚本

脚本内置了**自动更新检查**功能，每 24 小时检查一次新版本。发现新版本后会自动刷新页面应用更新。

你也可以手动更新：

1. 重新点击对应的安装链接（[稳定版](https://auto-update.aimarking.five-plus-one.com/ota/ai_marker.user.js) / [预览版](https://auto-update.aimarking.five-plus-one.com/ota/preview/ai_marker.user.js)）
2. Tampermonkey 会提示是否更新，点击「更新」即可

## 卸载脚本

1. 打开 Tampermonkey 管理面板
2. 找到「AI 批改助手」
3. 点击右侧的垃圾桶图标删除

## 下一步

安装完成后，请前往 [快速上手](./quickstart) 了解如何配置 API 密钥并开始使用。
