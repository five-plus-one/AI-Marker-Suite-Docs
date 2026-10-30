---
title: 安装教程 — AI 批改助手
description: AI批改助手安装教程。需要在电脑端使用Edge浏览器，安装Tampermonkey扩展后一键安装脚本。支持智学网、七天网络、好分数等 33 个阅卷平台自动批改主观题。
keywords: AI批改助手,安装教程,Tampermonkey,油猴脚本,Edge浏览器,一键安装,自动批改,智能阅卷,智学网,七天网络,好分数,浏览器扩展
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

::: tip 先装油猴脚本环境
安装本脚本前，需要先完成 **Tampermonkey 扩展安装** 与 **「允许用户脚本」设置**。这两个步骤是所有油猴脚本的通用前提，详细图文教程见 → **[油猴脚本安装指南](/guide/userscript-install)**
:::

<span id="第一步-安装-tampermonkey-浏览器扩展" class="fp-anchor-alias" aria-hidden="true"></span>

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

### 允许扩展运行

安装扩展后**必须允许它运行用户脚本**，否则脚本不会生效。不同浏览器/版本操作略有不同。

#### Microsoft Edge

1. 在 Edge 地址栏输入 `edge://extensions/`，打开扩展管理页。
2. 找到 Tampermonkey，确认扩展已启用，并进入「详细信息」。
3. 打开「允许用户脚本」。如果当前版本没有这个选项，打开扩展管理页左下角的「开发人员模式」，然后刷新阅卷页面。

![Edge 扩展管理页中的开发人员模式开关](https://img.assets.five-plus-one.com/img/2026/10/4f8035363d77b85cb233f5eaacd97ac1.png)

#### Google Chrome

1. 在篡改猴扩展图标上**右键** → 点击 **「管理扩展程序」**

![通过篡改猴图标进入扩展管理](https://img.assets.five-plus-one.com/img/2026/10/c4f371298159b08c8a545666445e8b49.png)

2. 打开 **「允许运行用户脚本」** 与 **「允许访问文件网址」**

![Chrome 扩展详情中的用户脚本权限](https://img.assets.five-plus-one.com/img/2026/10/f9466dc624165e29827bf1abd43cbdd5.png)

::: tip 提示
Chrome 需先打开右上角的 **「开发者模式」**（见上图右上角），才会出现「允许运行用户脚本」选项。
:::

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
3. 打开支持的阅卷平台（如智学网、七天网络等）的阅卷页面，页面上应出现 AI 批改相关的浮动按钮

### 确认脚本已启用

点击浏览器右上角的**篡改猴图标**，看弹出的菜单：

**✅ 正常情况** —— 显示「✓ 已启用」，下方列出 AI-Marker-Suite：

![AI-Marker-Suite 脚本已启用](https://img.assets.five-plus-one.com/img/2026/10/13a2a8c709a9463a2e6baf138d060d56.png)

**❌ 异常情况** —— 顶部出现蓝色提示「请启用"允许用户脚本"扩展设置」：

![尚未允许用户脚本时的扩展提示](https://img.assets.five-plus-one.com/img/2026/10/13e5096cfd941365f5786c7681ace7a2.png)

出现异常提示时，请回到上一步完成「允许扩展运行」设置，然后刷新阅卷页面。

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
