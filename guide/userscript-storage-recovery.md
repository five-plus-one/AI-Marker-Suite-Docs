---
title: 油猴存储页卡住怎么办 — AI 批改助手
description: 油猴存储页无响应、AI 批改助手入口消失时，跟着截图在原浏览器备份、清理旧日志、彻底卸载并重装。
keywords: 油猴存储页卡死,篡改猴无响应,Tampermonkey,AI批改助手,保留批改配置,卸载重装
---

# 油猴存储页卡住怎么办

遇到油猴「存储」页无响应，可以在**现在使用的 Chrome 或 Edge 个人资料**里恢复。先判断还能打开哪个页面，再选处理办法。

| 现在能打开什么 | 从哪里开始 |
| --- | --- |
| 助手还能打开，或只是偶尔卡住 | [先更新并打开阅卷页](#现在要继续阅卷) |
| 「存储」页卡死，油猴「实用工具」能打开 | [导出备份，保留资料恢复](#备份并恢复原浏览器) |
| 想从头安装，或油猴管理面板也打不开 | [在原浏览器里完全卸载后重装](#在原浏览器里完全卸载后重装) |

## 怎么判断是存储页卡住

- 好分数等原站阅卷页可以打开，油猴显示 **AI-Marker-Suite** 已启用，但助手入口迟迟没有出现。
- 在油猴管理面板打开脚本的「存储」后，画面停住，滚动、编辑或点按钮都没有反应。浏览器也可能弹出「网页无响应」。
- 卡住时点提示里的**退出网页**，或关闭这个标签页。然后从油猴图标重新打开管理面板，直接点「实用工具」。

下图标出油猴的「存储」页。部分版本只有在「管理面板 → 设置 → 配置模式」选「高级」后才显示这个标签。已经看到页面无响应时，直接去「实用工具」备份即可。

[![油猴「存储」页位置及本机数据示例](https://img.five-plus-one.com/i/2026/11/24/acc24f4df6da3339.png)](https://img.five-plus-one.com/i/2026/11/24/acc24f4df6da3339.png)

如果存储页可以正常编辑，只有阅卷页没有助手入口，先检查油猴是否允许运行用户脚本，以及是否在受支持的实际阅卷页面。 [油猴安装与权限检查](./userscript-install)

## 为什么会卡住

油猴要读取脚本数据才能启动助手，也要读取这些数据才能在「存储」页里显示它们。旧版积累的诊断日志、评阅历史或带图片的评分方案较大时，读写和显示都可能变慢。卡住本身只能说明页面没有正常响应，单凭这一点无法确定是哪一类数据占得最多。

| 数据位置 | 里面有什么 | 恢复时怎么处理 |
| --- | --- | --- |
| 油猴的脚本存储 | 批改配置、供应商配置、诊断日志和部分历史 | 在油猴「实用工具」导出带存储的压缩包 |
| 各阅卷网站的本机存储 | 本机历史和答卷图片 | 能打开助手时，在原来的阅卷网站导出有图材料包 |
| 阅卷平台服务器 | 已保存的成绩 | 重装后仍可在原站核对 |

从稳定版 1.21.41.0 起，脚本把诊断日志总量控制在 4 MiB 以内，优先淘汰早期记录。脚本成功启动后才有机会整理旧日志。

## 现在要继续阅卷

1. 关掉卡死的油猴标签页，然后[安装最新版稳定版](https://auto-update.aimarking.five-plus-one.com/ota/ai_marker.user.js)。如果油猴提示「更新」，确认更新即可。
2. 回到原阅卷页，刷新一次，等待答卷和助手入口出现。若恢复，先在「批改配置 → 数据 → 配置管理」点「导出配置」留一份备份。
3. 如果助手入口和存储页仍卡住，按下面的步骤备份并恢复。当前卷有待确认的分数时，先在原站核对保存结果。

## 备份并恢复原浏览器

### 先把能导出的资料保存下来

- **助手还能打开时**，从「批改配置 → 数据 → 配置管理」点「导出配置」。需要保留本机历史和答卷原图时，回到保存这些记录的阅卷网站，打开「评阅历史」，选「材料包 ZIP」和「有图」导出。配置 JSON 用来恢复配置，材料包用来留存和查看。
- **助手打不开时**，打开油猴「管理面板 → 实用工具」。在「通用」勾选 **包含脚本存储**，然后在 **压缩包** 那一行点 **导出**。若看不到该页面，在油猴「设置」把配置模式切到「初学者」或「高级」。
- 在下载记录找到 ZIP，双击确认可以打开。里面应有 AI-Marker-Suite 的脚本文件和存储文件。保留原始 ZIP，后续使用副本。文件可能包含 API 密钥、评分方案和学生作答，保存在本机受控位置。

[![油猴实用工具中勾选「包含脚本存储」，再点「压缩包」一行的「导出」](https://img.five-plus-one.com/i/2026/11/24/ae455c17494dbda7.png)](https://img.five-plus-one.com/i/2026/11/24/ae455c17494dbda7.png)

### 有配置 JSON，想尽快恢复

1. 按下文[删除旧脚本](#删除助手脚本)，保留阅卷网站本机存储，再安装最新版。
2. 在原阅卷页打开助手。从「批改配置 → 数据 → 配置管理」导入刚保存的**配置 JSON**。
3. 检查方案、AI 连接和当前题目，用试改模式核对一份答卷。若遇到导入后又卡住，可以保留备份并重新装成空白配置，再手动建立当前题的方案。

### 只有油猴 ZIP，想保留里面的配置和记录

下面的 Windows 步骤会从 ZIP 生成一份新压缩包，只保留 AI-Marker-Suite 的文件，并从副本移除旧诊断日志。原始 ZIP 和各阅卷网站的本机存储保持可用。只想从头开始时，可直接跳到[完全卸载后重装](#在原浏览器里完全卸载后重装)。

<details>
<summary>展开 Windows 操作步骤</summary>

1. 在开始菜单搜索并打开 **Windows PowerShell**。
2. 复制下方整段代码，粘贴到 PowerShell，按回车。看到「备份 ZIP 的完整路径」时，在资源管理器右键 ZIP，选「复制文件地址」或「复制为路径」，粘贴到窗口后按回车。出现「已生成」后，在原 ZIP 所在文件夹找带「仅清日志」的新文件。

~~~powershell
& {
Add-Type -AssemblyName System.IO.Compression.FileSystem
$path = (Read-Host '备份 ZIP 的完整路径').Trim().Trim('"')
$prefix = 'AI-Marker-Suite'
$source = [IO.Compression.ZipFile]::OpenRead($path)
try {
    $storage = $source.GetEntry("$prefix.storage.json")
    $script = $source.GetEntry("$prefix.user.js")
    if (!$storage -or !$script) { throw '缺少 AI-Marker-Suite 的脚本或存储，请检查导出的 ZIP。' }
    $reader = [IO.StreamReader]::new($storage.Open())
    try { $payload = $reader.ReadToEnd() | ConvertFrom-Json }
    finally { $reader.Dispose() }
    if ($payload.data -isnot [pscustomobject]) { throw '此备份的存储格式无法识别。' }
    $keys = @($payload.data.PSObject.Properties.Name | Where-Object {
        $_ -match '^ai-marker-diagnostic-(log-v1-|grading-v1-|v2-slot-)'
    })
    foreach ($key in $keys) { $payload.data.PSObject.Properties.Remove($key) }

    $out = Join-Path (Split-Path -Parent $path) ("仅清日志-" + (Get-Date -Format 'yyyyMMdd-HHmmssfff') + '.zip')
    $zip = [IO.Compression.ZipFile]::Open($out, 'Create')
    try {
        foreach ($entry in @($script, $source.GetEntry("$prefix.options.json"))) {
            if (!$entry) { continue }
            $scriptStream = $entry.Open()
            $output = $zip.CreateEntry($entry.Name).Open()
            try { $scriptStream.CopyTo($output) }
            finally { $scriptStream.Dispose(); $output.Dispose() }
        }
        $output = $zip.CreateEntry($storage.Name).Open()
        $writer = [IO.StreamWriter]::new($output, [Text.UTF8Encoding]::new($false))
        try { $writer.Write(($payload | ConvertTo-Json -Depth 100 -Compress)) }
        finally { $writer.Dispose() }
    } finally { $zip.Dispose() }
    Write-Host "已生成 $out"
} finally { $source.Dispose() }
}
~~~

若提示缺少存储文件，回到油猴「实用工具」，勾选「包含脚本存储」重新导出。如果只剩一份无法读取的 ZIP，可以保留它，改走干净重装。

</details>

1. 按下文删除旧脚本。为了保留原来的本机历史和图片，保留阅卷网站的数据库。
2. 打开油猴「实用工具」，在「导入」一行点「选择文件」，选刚生成的「仅清日志」ZIP。油猴会打开确认页。如果原来的标签页停在「请稍候」，切到新开的油猴标签页。
3. 在确认页勾选 **AI-Marker-Suite** 和它下面的「存储」，点上方「导入」。导入后先[更新到最新版](https://auto-update.aimarking.five-plus-one.com/ota/ai_marker.user.js)，再刷新原阅卷页，检查方案和本机历史。若无法打开确认页或刷新后仍卡住，可改用下文的步骤装成空白配置。原始 ZIP 可继续留作备份。 [Tampermonkey 导入与导出说明](https://www.tampermonkey.net/faq.php?q=Q106)

[![油猴实用工具的「导入」和「选择文件」](https://img.five-plus-one.com/i/2026/11/24/ff85972bcf2ce6ad.png)](https://img.five-plus-one.com/i/2026/11/24/ff85972bcf2ce6ad.png)

[![油猴导入确认页中勾选脚本和存储后点击「导入」](https://img.five-plus-one.com/i/2026/11/24/2573e3c7411e1d6f.png)](https://img.five-plus-one.com/i/2026/11/24/2573e3c7411e1d6f.png)

## 在原浏览器里完全卸载后重装

这条路适合想从头安装，或管理面板无法正常打开的情况。完整清理会移除本机方案、历史和图片。需要留存的资料先按上面导出。已经在阅卷平台保存的成绩可以回原站查看。备份页面也打不开时，可以先保留第二步所说的网站数据库，只处理脚本，待助手恢复后打开评阅历史查看能否导出。

### 第一步：删除 AI-Marker-Suite {#删除助手脚本}

1. 关闭正在批改的标签页，从油猴菜单打开「管理面板」。如果以前开启过脚本同步，先在「设置 → 同步脚本」关闭「启用脚本同步」，避免旧脚本自动回来。
2. 在「已安装脚本」找到 **AI-Marker-Suite**，点该行右侧的垃圾桶图标。如果同时装过稳定版和预览版，检查列表里是否还有同名脚本。
3. 如果顶部出现 **垃圾箱**，打开后对 **AI-Marker-Suite** 单独点「删除」并确认。用单条删除保留垃圾箱里的其他脚本。若油猴未启用垃圾箱模式，第一次确认删除后脚本就会移除。

[![已安装脚本列表中 AI-Marker-Suite 一行的删除图标](https://img.five-plus-one.com/i/2026/11/24/24a88be00a043e9d.png)](https://img.five-plus-one.com/i/2026/11/24/24a88be00a043e9d.png)

[![油猴顶部的「垃圾箱」入口](https://img.five-plus-one.com/i/2026/11/24/59f9ef9b27a47905.png)](https://img.five-plus-one.com/i/2026/11/24/59f9ef9b27a47905.png)

[![垃圾箱中 AI-Marker-Suite 一项的单独「删除」按钮](https://img.five-plus-one.com/i/2026/11/24/e58a4d43c5a89e88.png)](https://img.five-plus-one.com/i/2026/11/24/e58a4d43c5a89e88.png)

### 管理面板也卡住时，移除油猴扩展

只有单独删除脚本无法操作时，才需要移除整个油猴。此操作会从当前个人资料移除**全部油猴脚本及其扩展存储**。若实用工具还可用，先导出其他脚本的备份。

1. 在原来的浏览器地址栏输入 **Chrome** 的 **chrome://extensions/**，或 **Edge** 的 **edge://extensions/**，按回车。
2. 找到 **Tampermonkey（篡改猴）**，点卡片里的「移除」或「删除」并确认。关闭以前卡住的油猴标签页。
3. 继续完成下面的本机数据清理，再在同一个浏览器窗口装回油猴。只恢复需要的脚本和配置。

[![Chrome 扩展列表中篡改猴卡片的「移除」按钮](https://img.five-plus-one.com/i/2026/11/24/be6e5956b53d26ab.png)](https://img.five-plus-one.com/i/2026/11/24/be6e5956b53d26ab.png)

[Chrome 扩展移除说明](https://support.google.com/chrome_webstore/answer/2664769?hl=zh-Hans) · [Edge 扩展移除说明](https://support.microsoft.com/zh-cn/edge/add-turn-off-or-remove-extensions-in-microsoft-edge)

### 第二步：清掉旧的本机历史和图片

如果希望彻底清理助手的本机数据，还要在**之前用过的每个阅卷网站**处理一次。如果要找回历史和答卷图片，保留这一步涉及的数据库。

1. 在助手仍处于卸载状态时，打开曾经批改过的网站，例如好分数的阅卷页。关闭该网站的其他标签页，只留一个页面。
2. 按 **F12** 打开开发者工具。在顶部找到「应用」或 **Application**。窗口窄时从 **»** 展开更多面板。
3. 在左侧展开 **IndexedDB**，选中 **ai-marker-images**。右侧点「删除数据库」或 **Delete database**，按提示确认。找不到该库时，当前这个网站无需清理此项。
4. 关闭该网站剩下的标签页。下次打开网站时，助手会在需要时新建空的本机存储。只删除上面指定的库即可保留网站的登录数据。

[![Chrome 开发者工具中选中 IndexedDB 数据库后的删除按钮](https://img.five-plus-one.com/i/2026/11/24/77562436af64c17a.png)](https://img.five-plus-one.com/i/2026/11/24/77562436af64c17a.png)

上图来自 Chrome 官方文档，示例数据库是 notes_db。操作时请选 ai-marker-images。 [Chrome 的 IndexedDB 删除说明](https://developer.chrome.com/docs/devtools/storage/indexeddb?hl=zh-cn#delete) · [CC BY 4.0](https://creativecommons.org/licenses/by/4.0/)

### 第三步：安装新版并验收

1. 如果刚移除了油猴，按[油猴脚本安装指南](./userscript-install)装回扩展，并在扩展详情里开启「允许运行用户脚本」。
2. [安装 AI 批改助手稳定版](https://auto-update.aimarking.five-plus-one.com/ota/ai_marker.user.js)。如果打开后只显示脚本文本，复制安装链接，在油猴「实用工具 → 从 URL 安装」粘贴并点「安装」。在「已安装脚本」确认所需的那份 AI-Marker-Suite 已启用。
3. 重新打开真实的阅卷任务。看到助手入口后，在「批改配置」连接自己的账号或供应商，再导入配置 JSON 或新建评分方案。
4. 选「试改模式」试改一份，核对正确的题目和分值，再确认原站保存。准备从空白重新开始时，保留原油猴 ZIP 作为备份即可。

[![阅卷页上打开油猴菜单，确认 AI-Marker-Suite 已启用](https://img.five-plus-one.com/i/2026/11/22/ebcfdec6bb51d7f2.png)](https://img.five-plus-one.com/i/2026/11/22/ebcfdec6bb51d7f2.png)
