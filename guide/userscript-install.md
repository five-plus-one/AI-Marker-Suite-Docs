---
title: 油猴脚本安装指南 — Tampermonkey 用户脚本通用教程
description: 在电脑的 Edge、Chrome 或 Android 平板的 Edge 中安装 Tampermonkey，开启允许用户脚本，安装脚本并在目标网页验证。
keywords: 油猴脚本,油猴,Tampermonkey,篡改猴,用户脚本,脚本安装,Edge 油猴,Chrome 油猴,Android平板,允许用户脚本
---

# 油猴脚本安装指南

先安装 Tampermonkey（篡改猴）并允许它运行用户脚本，再打开所需脚本的安装链接。使用 Android 平板可按下文的 Edge 步骤操作。

## 什么是油猴脚本？

**油猴脚本**也叫用户脚本，由篡改猴等浏览器扩展管理，可以为特定网页增加功能或调整界面。

## 第一步：安装 Tampermonkey 扩展

### Microsoft Edge

**[点击安装 Tampermonkey](https://microsoftedge.microsoft.com/addons/detail/tampermonkey/iikmkjmpaadaobahmlepeloendndfphd)**

在打开的扩展商店页面点击 **「获取」**：

![Edge 扩展商店中的「获取」按钮](https://img.assets.five-plus-one.com/2026/05/e4dda0a1047a12d49dc27e615d591dbd.png)

弹出确认框后点 **「添加扩展」**：

![安装确认提示中的「添加扩展」按钮](https://img.assets.five-plus-one.com/2026/05/0ee33f3b3677ce816010d9309704c9dc.png)

### Google Chrome

**[点击安装 Tampermonkey](https://chromewebstore.google.com/detail/tampermonkey/dhdgffkkebhmkfjojejmpbldmpobfkfo)**

在打开的 Chrome 应用商店页面点击 **「添加至 Chrome」**。

### Android 平板 Edge

打开 Edge 的浏览器菜单，进入「扩展」，搜索「篡改猴」或「Tampermonkey」。点「获取」并按提示添加。安装后可在「扩展」的「已安装」列表中找到篡改猴。

### 装好了？

在电脑上，点击浏览器工具栏的拼图图标，在扩展菜单中找到篡改猴。需要经常打开时，可以把它固定在工具栏。

---

## 第二步：允许扩展运行用户脚本（关键）

安装扩展后**必须允许它运行用户脚本**，否则任何脚本都不会生效。不同浏览器/版本操作不同。

### Microsoft Edge（新版）

1. 点击浏览器右上角 **扩展（拼图图标）→ 篡改猴旁的「···」→ 管理扩展**

![Edge 扩展菜单中的「管理扩展」入口](https://img.assets.five-plus-one.com/2026/05/de36528fb825f706bf118834112b390f.png)

2. 在扩展详情里打开 **「允许用户脚本」**。

![Edge 扩展详情中的「允许用户脚本」开关](https://img.assets.five-plus-one.com/2026/05/45e126528a82494b866a5c7ad5d946d1.png)

### Microsoft Edge（旧版）

部分旧版 Edge 的扩展设置里**没有「允许用户脚本」这一项**。此时打开 **「开发人员模式」** 开关即可：

![Edge 扩展管理页中的开发人员模式开关](https://img.assets.five-plus-one.com/img/2026/10/4f8035363d77b85cb233f5eaacd97ac1.png)

开启后脚本即可正常运行。

### Google Chrome

1. 在篡改猴扩展图标上**右键** → 点击 **「管理扩展程序」**

![通过篡改猴图标进入扩展管理](https://img.assets.five-plus-one.com/img/2026/10/c4f371298159b08c8a545666445e8b49.png)

2. 打开 **「允许运行用户脚本」**。如果当前版本没有这个开关，可在扩展程序管理页打开「开发者模式」。

![Chrome 扩展详情中的用户脚本权限](https://img.assets.five-plus-one.com/img/2026/10/f9466dc624165e29827bf1abd43cbdd5.png)

### Android 平板 Edge 的用户脚本权限

进入 **Edge → 扩展 → 篡改猴 → 允许用户脚本**。在「已安装」列表中点篡改猴右侧的「···」，确认「启用」已打开，再打开「允许用户脚本」。

可对照[平板安装图示](./installation#平板-edge-安装)。其他版本的设置可参阅[篡改猴官方权限说明](https://www.tampermonkey.net/faq.php#Q209)。

---

## 第三步：安装你的脚本

在已安装篡改猴的浏览器中打开脚本链接，在篡改猴的确认页点击 **「安装」**。安装 AI 批改助手可从[安装教程](./installation#第二步-安装-ai-批改助手脚本)打开稳定版链接。

装完后**刷新**目标网页，脚本才会生效。

---

## 验证是否装好

在目标网页打开篡改猴菜单。电脑上可点工具栏图标，Android 平板可从 Edge 的扩展菜单进入。

**✅ 正常情况** —— 显示「✓ 已启用」，下方列出你安装的脚本：

![AI-Marker-Suite 脚本已启用](https://img.assets.five-plus-one.com/img/2026/10/13a2a8c709a9463a2e6baf138d060d56.png)

**❌ 异常情况** —— 顶部出现蓝色提示「请启用"允许用户脚本"扩展设置」：

![尚未允许用户脚本时的扩展提示](https://img.assets.five-plus-one.com/img/2026/10/13e5096cfd941365f5786c7681ace7a2.png)

出现异常提示时，请回到上一步完成「允许扩展运行用户脚本」的设置，然后**刷新页面**。

---

## 常见问题

### 脚本装了但页面上什么都没有？

1. 点击篡改猴图标，确认没有「请启用允许用户脚本」的蓝色提示
2. **刷新页面**——脚本启用后需要刷新才会在已打开的页面上生效
3. 确认当前页面确实是该脚本支持的网站（脚本只在特定网站上激活）
4. 打开篡改猴管理面板，确认脚本的**启用开关**是打开的

### 提示「请启用"允许用户脚本"」怎么办？

按上面的第二步找到篡改猴的用户脚本权限并开启，然后刷新目标网页。

### 装了 Tampermonkey 但找不到图标？

点击浏览器右上角的**拼图图标**（扩展管理），找到篡改猴，点旁边的**图钉/眼睛图标**把它固定到工具栏。

### 能在手机上用吗？

如果手机浏览器能安装篡改猴、允许运行用户脚本，并能正常打开脚本所需的网页，就可以尝试。使用 AI 批改助手时，请先确认手机能进入网页版阅卷平台的答卷页面。正式阅卷建议用电脑或平板。

### 更新脚本会丢配置吗？

不会。Tampermonkey 更新脚本时会保留你的脚本内配置（存在浏览器本地）。但**换浏览器或清理浏览器数据会丢失**，重要配置请用脚本自带的导出功能备份。
