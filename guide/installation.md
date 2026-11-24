---
title: 安装教程 — AI 批改助手
description: 在电脑或 Android 平板的 Edge 中安装 Tampermonkey，开启允许用户脚本，安装 AI 批改助手稳定版并在阅卷页验证。
keywords: AI批改助手,安装教程,Tampermonkey,篡改猴,油猴脚本,Edge浏览器,Android平板,允许用户脚本,智能阅卷
---

# 安装教程

## 准备工作

AI 批改助手通过 Tampermonkey（篡改猴）在浏览器中运行。正式阅卷建议使用电脑或平板。使用 Android 平板时，可直接查看[平板 Edge 安装步骤](#平板-edge-安装)。

### 需要什么？

| 条件 | 说明 |
|------|------|
| **设备** | Windows 或 macOS 电脑，或可安装篡改猴扩展的 Android 平板 |
| **浏览器** | 推荐 Microsoft Edge，电脑上也可使用 Google Chrome |
| **Tampermonkey 扩展** | 安装篡改猴并开启「允许用户脚本」 |
| **网页阅卷任务** | 确认浏览器能打开答题卡和给分区，入口可在[支持平台](/platforms/)查询 |

### 为什么推荐 Edge？

Windows 电脑通常已安装 Edge，可直接从 Edge 扩展商店获取篡改猴。使用其他浏览器安装扩展时，可参考[油猴脚本安装指南](./userscript-install)。

手机浏览器支持安装篡改猴和运行用户脚本，并且能正常打开网页版阅卷平台时，可以尝试使用。

<span id="第一步-安装-tampermonkey-浏览器扩展" class="fp-anchor-alias" aria-hidden="true"></span>

## 第一步：安装 Tampermonkey 扩展

**Tampermonkey（油猴）** 是一个免费的浏览器扩展（插件），它可以让你在浏览器中运行额外的脚本程序。AI 批改助手就是通过它来运行的。

### 操作步骤

1. **打开 Edge 浏览器**（在开始菜单或桌面搜索 "Edge"）
2. **点击下方链接**打开 Tampermonkey 安装页面：

   **[点击安装 Tampermonkey 扩展](https://microsoftedge.microsoft.com/addons/detail/tampermonkey/iikmkjmpaadaobahmlepeloendndfphd)**

3. 在打开的页面中，点击 **「获取」** 按钮

![](https://img.five-plus-one.com/i/2026/11/22/51e8eb846cba688b.png)

4. 浏览器会弹出确认提示，点击 **「添加扩展」**

![](https://img.five-plus-one.com/i/2026/11/22/0a6b9bab44a90e5a.png)

5. 安装完成后，浏览器右上角会出现 Tampermonkey 的黑色图标

::: tip 找不到图标？
安装完成后如果看不到图标，点击浏览器右上角的 **拼图图标**（扩展管理），找到 Tampermonkey，点击 **「在工具栏中显示」**。
:::

### 允许扩展运行

安装扩展后**必须允许它运行用户脚本**，否则脚本不会生效。不同浏览器/版本操作略有不同。

#### Microsoft Edge

1. 在 Edge 地址栏输入 `edge://extensions/`，打开扩展管理页（也可以点击右上角 **扩展（拼图图标）→ 篡改猴旁的「···」→ 管理扩展**）。

![Edge 扩展菜单中的「管理扩展」入口](https://img.five-plus-one.com/i/2026/11/22/0209a55505dfcedd.png)

2. 找到 Tampermonkey，确认扩展已启用，并进入「详细信息」。
3. 打开「允许用户脚本」。

![Edge 扩展详情中的「允许用户脚本」开关](https://img.five-plus-one.com/i/2026/11/22/f221445652b05f42.png)

如果当前版本没有这个选项，打开扩展管理页左下角的「开发人员模式」，然后刷新阅卷页面。

![Edge 扩展管理页中的开发人员模式开关](https://img.five-plus-one.com/i/2026/11/22/576d90c33f29d7f5.png)

#### Google Chrome

1. 在篡改猴扩展图标上**右键** → 点击 **「管理扩展程序」**

![通过篡改猴图标进入扩展管理](https://img.five-plus-one.com/i/2026/11/22/484371fbfcd5481a.png)

2. 打开 **「允许运行用户脚本」**。如果当前版本没有这个开关，可在扩展程序管理页打开「开发者模式」。

![Chrome 扩展详情中的用户脚本权限](https://img.five-plus-one.com/i/2026/11/22/f71498ec7cb495c8.png)

不同浏览器版本的设置位置可参阅[篡改猴官方权限说明](https://www.tampermonkey.net/faq.php#Q209)。

## 第二步：安装 AI 批改助手脚本

::: danger 重要前提
执行这一步前，请你确保你已经按照上面的操作完成了 Tampermonkey 扩展的安装和启用。
:::

日常阅卷推荐安装稳定版。

| 版本 | 说明 | 安装链接 |
|------|------|---------|
| **稳定版** | 用于日常阅卷 | **[安装稳定版](https://auto-update.aimarking.five-plus-one.com/ota/ai_marker.user.js)** |
| **预览版** | 提前体验功能和平台适配 | **[安装预览版](https://auto-update.aimarking.five-plus-one.com/ota/preview/ai_marker.user.js)** |

可先在[支持平台](/platforms/)查找阅卷入口、适用任务和安装要求。已安装脚本的用户可在助手设置中切换渠道。

1. 在已启用篡改猴的浏览器中打开上方安装链接。从微信收到链接时，选择在 Edge 中打开。
2. 浏览器会自动弹出 Tampermonkey 的安装确认页面，显示脚本的名称和权限
3. 点击 **「安装」** 按钮

![](https://img.five-plus-one.com/i/2026/11/22/2bb11d8a8732650d.png)

::: warning 点击链接后没有反应？
- 在已安装篡改猴的浏览器中重新打开安装链接。
- 检查扩展的「启用」和「允许用户脚本」开关，再刷新页面重试。
:::

## 第三步：验证安装

1. 打开 Tampermonkey 管理面板（点击浏览器右上角 Tampermonkey 图标 → 管理面板）
2. 在「已安装脚本」列表中，确认「AI 批改助手」已启用（开关为绿色）
3. 打开支持的阅卷平台（如智学网、七天网络等）的阅卷页面，页面上应出现 AI 批改相关的浮动按钮

### 确认脚本已启用

点击浏览器右上角的**篡改猴图标**，看弹出的菜单：

**✅ 正常情况** —— 显示「✓ 已启用」，下方列出 AI-Marker-Suite：

![AI-Marker-Suite 脚本已启用](https://img.five-plus-one.com/i/2026/11/22/ebcfdec6bb51d7f2.png)

**❌ 异常情况** —— 顶部出现蓝色提示「请启用"允许用户脚本"扩展设置」：

![尚未允许用户脚本时的扩展提示](https://img.five-plus-one.com/i/2026/11/22/6c8c6b4a5c76a0ff.png)

出现异常提示时，请回到上一步完成「允许扩展运行」设置，然后刷新阅卷页面。

::: tip 注意
脚本只在阅卷页面（能看到答题卡图片和分数输入框的页面）上才会激活，其他页面上不会显示任何内容，这是正常的。
:::

## 平板 Edge 安装

1. 在平板上打开 Microsoft Edge，点浏览器菜单中的「扩展」。搜索「篡改猴」或「Tampermonkey」，点「获取」并按提示添加扩展。
2. 进入 **Edge → 扩展 → 篡改猴 → 允许用户脚本**。在「已安装」列表里点「篡改猴」右侧的「···」，确认「启用」已打开，再打开「允许用户脚本」。

   ![Android 平板 Edge 的扩展列表，篡改猴菜单中已打开允许用户脚本](https://img.five-plus-one.com/i/2026/11/22/ea39c8bcacf03ccd.jpg)

3. 在同一个 Edge 浏览器中打开[安装稳定版](https://auto-update.aimarking.five-plus-one.com/ota/ai_marker.user.js)，等篡改猴打开确认页，首次安装时点「安装」。下图演示的是已安装脚本后切换到预览渠道的「更新用户脚本」页面。

   ![Android 平板上篡改猴的脚本确认页，示例为切换到预览渠道](https://img.five-plus-one.com/i/2026/11/22/059b5f413dd2c55c.jpg)

4. 在 Edge 中进入阅卷平台的待阅答卷。若阅卷页面已打开，先刷新，等答题卡和给分区加载后，确认页面出现「AI 批改」入口。

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

需要永久清掉脚本存储和本机历史后重装时，按图完成删除、清理和安装。 [在原浏览器里完全卸载后重装](./userscript-storage-recovery#在原浏览器里完全卸载后重装)

## 下一步

安装完成后，打开[快速上手](./quickstart)，用五加一账号或已有 API 密钥连接批改服务，再试改一份答卷。
