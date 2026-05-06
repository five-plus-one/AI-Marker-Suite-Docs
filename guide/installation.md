# 安装教程

## 第一步：安装 Tampermonkey 浏览器扩展

**Tampermonkey（油猴）** 是一个免费的浏览器脚本管理器，支持主流浏览器。

| 浏览器 | 安装地址 |
|--------|---------|
| Chrome | [Chrome 网上应用店](https://chrome.google.com/webstore/detail/tampermonkey/dhdgffkkebhmkfjojejmpbldmpobfkfo) |
| Edge | [Edge 外接程序商店](https://microsoftedge.microsoft.com/addons/detail/tampermonkey/iikmkjmpaadaobahmlepeloendndfphd) |
| Firefox | [Firefox 附加组件](https://addons.mozilla.org/zh-CN/firefox/addon/tampermonkey/) |

安装完成后，浏览器右上角会出现 Tampermonkey 图标。

::: tip 浏览器兼容性
推荐使用 Chrome 或 Edge，兼容性最佳。Firefox 也完全支持。
:::

## 第二步：安装 AI 批改助手脚本

确保 Tampermonkey 已安装，点击下方链接，浏览器会自动弹出安装提示：

**[点击一键安装脚本](https://auto-update.aimarking.five-plus-one.com/ota/ai_marker.user.js)**

安装时 Tampermonkey 会显示脚本的权限请求，点击「安装」即可。

::: warning 注意
如果点击链接后没有弹出安装提示，请确认 Tampermonkey 扩展已启用。可以尝试刷新页面后重新点击。
:::

## 第三步：验证安装

1. 打开 Tampermonkey 管理面板（点击浏览器右上角 Tampermonkey 图标 → 管理面板）
2. 在「已安装脚本」列表中，确认「AI 批改助手」已启用（开关为绿色）
3. 打开智学网或七天网络的阅卷页面，页面上应出现 AI 批改相关的浮动按钮

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

1. 重新点击[一键安装链接](https://auto-update.aimarking.five-plus-one.com/ota/ai_marker.user.js)
2. Tampermonkey 会提示是否更新，点击「更新」即可

## 卸载脚本

1. 打开 Tampermonkey 管理面板
2. 找到「AI 批改助手」
3. 点击右侧的垃圾桶图标删除

## 下一步

安装完成后，请前往 [快速上手](./quickstart) 了解如何配置 API 密钥并开始使用。
