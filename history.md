---
title: 评阅历史 - AI 批改助手
description: 查看和导出评阅历史记录，管理批改数据
---

# 评阅历史

<div id="ai-history-root">
    <div class="tool-empty-state">
        <div class="tool-empty-state__mark">History</div>
        <h2>评阅历史</h2>
        <p>此页面用于查看和导出评阅历史记录。</p>
        <p class="tool-empty-state__hint">需要安装 AI 批改助手脚本才能使用此功能</p>
        <a href="https://auto-update.aimarking.five-plus-one.com/ota/ai_marker.user.js">安装脚本</a>
    </div>
</div>

<script setup>
// VitePress 客户端脚本（仅在浏览器执行）
import { onMounted } from 'vue'

onMounted(() => {
    // 延迟检查脚本是否注入
    setTimeout(() => {
        const container = document.getElementById('ai-history-root');
        if (container && container.querySelector('div[style*="text-align:center"]')) {
            console.log('[文档站] 未检测到 AI 批改助手脚本');
        }
    }, 3000);
})
</script>

## 功能说明

此页面提供以下功能：

- **查看历史** - 浏览所有评阅记录
- **导出数据** - 支持 CSV、JSON、HTML 三种格式导出
- **查看详情** - 查看每条记录的详细信息
- **关于页面** - 查看脚本版本和更新日志

## 使用方法

1. 安装 [AI 批改助手脚本](https://auto-update.aimarking.five-plus-one.com/ota/ai_marker.user.js)
2. 在阅卷平台使用脚本批改试卷
3. 访问此页面查看和导出历史记录

::: tip 提示
历史记录存储在浏览器本地，与阅卷平台共享同一份数据。您也可以通过油猴菜单中的"查看历史记录"快速访问此页面。
:::

## 油猴菜单快捷方式

安装脚本后，在任意页面点击油猴图标，可以看到以下快捷菜单：

- **查看历史记录** - 跳转到此页面
- **打开设置** - 打开脚本设置面板
- **检查更新** - 检查脚本是否有新版本
