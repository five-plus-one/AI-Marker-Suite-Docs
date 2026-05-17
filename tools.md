---
title: 工具 - AI 批改助手
description: 查看评阅历史、检查更新、管理设置
---

# 工具

<div id="ai-tools-root">
    <div class="tool-empty-state">
        <div class="tool-empty-state__mark">Tools</div>
        <h2>AI 批改助手工具</h2>
        <p>查看历史记录、检查更新、管理设置</p>
        <p class="tool-empty-state__hint">需要安装 AI 批改助手脚本才能使用此功能</p>
        <a href="https://auto-update.aimarking.five-plus-one.com/ota/ai_marker.user.js">安装脚本</a>
    </div>
</div>

<script setup>
import { onMounted } from 'vue'

onMounted(() => {
    // 延迟检查脚本是否注入
    setTimeout(() => {
        const container = document.getElementById('ai-tools-root');
        if (container && container.querySelector('div[style*="text-align:center"]')) {
            console.log('[文档站] 未检测到 AI 批改助手脚本');
        }
    }, 3000);
})
</script>

## 功能说明

安装脚本后，此页面将显示以下功能：

### 评阅历史
- 查看所有评阅记录
- 支持 CSV、JSON、HTML 三种格式导出
- 支持查看详情和纠错记录

### ℹ️ 关于
- 查看脚本版本信息
- 查看支持平台列表
- 查看更新日志
- 联系作者

### 检查更新
- 检查是否有新版本
- 自动下载更新

## 使用方法

1. 安装 [AI 批改助手脚本](https://auto-update.aimarking.five-plus-one.com/ota/ai_marker.user.js)
2. 访问此页面
3. 点击对应的功能按钮

::: tip 提示
此页面也支持以下域名：
- `aimarking.five-plus-one.com/tools`
- `five-plus-one.github.io/AI-Marker-Suite-Docs/tools`
:::
