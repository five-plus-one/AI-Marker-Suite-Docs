/**
 * fetch-manifest.js
 * 从远端 manifest.json 获取版本号和 changelog，生成 VitePress 配置文件
 *
 * 用法: node fetch-manifest.js
 */

const fs = require('fs');
const path = require('path');

const MANIFEST_URL = 'https://auto-update.aimarking.five-plus-one.com/ota/manifest.json';
const OUTPUT_PATH = path.join(__dirname, '.vitepress', 'manifest-data.json');

async function fetchManifest() {
    console.log('📡 正在从远端获取 manifest.json...');

    try {
        const response = await fetch(MANIFEST_URL + '?_t=' + Date.now());
        if (!response.ok) {
            throw new Error(`HTTP ${response.status}`);
        }
        const data = await response.json();
        console.log(`✅ 获取成功，版本: ${data.version}`);
        return data;
    } catch (error) {
        console.warn(`⚠️ 获取失败: ${error.message}，使用本地缓存`);
        // 尝试读取本地缓存
        if (fs.existsSync(OUTPUT_PATH)) {
            return JSON.parse(fs.readFileSync(OUTPUT_PATH, 'utf8'));
        }
        // 返回默认值
        return {
            version: '1.12.1',
            releaseDate: '2026-05-08',
            changelog: {}
        };
    }
}

function generateChangelogMarkdown(changelog) {
    const versions = Object.keys(changelog).sort((a, b) => {
        const pa = a.split('.').map(Number);
        const pb = b.split('.').map(Number);
        for (let i = 0; i < Math.max(pa.length, pb.length); i++) {
            if ((pa[i] || 0) > (pb[i] || 0)) return -1;
            if ((pa[i] || 0) < (pb[i] || 0)) return 1;
        }
        return 0;
    });

    let md = `---
title: 更新日志 — AI 批改助手
description: AI批改助手完整更新日志，所有版本更新记录。
---

# 更新日志

`;

    // 日期映射
    const dateMap = {
        '1.12.1': '2026-05-08',
        '1.12.0': '2026-05-07',
        '1.11.3': '2026-05-07',
        '1.11.2': '2026-05-02',
        '1.11.1': '2026-05-02',
        '1.11.0': '2026-05-02',
        '1.10.4': '2026-05-01',
        '1.10.3': '2026-05-01',
        '1.10.2': '2026-05-01',
        '1.10.0': '2026-05-01',
        '1.9.0': '2026-04-30',
        '1.8.6': '2026-04-30',
        '1.8.5': '2026-04-30',
        '1.8.3': '2026-04-30',
        '1.8.0': '2026-04-20',
        '1.7.0': '2026-04-10',
    };

    for (const ver of versions) {
        const items = changelog[ver];
        const date = dateMap[ver] || '';
        md += `## v${ver}${date ? ` (${date})` : ''}\n\n`;
        items.forEach(item => {
            md += `- ${item}\n`;
        });
        md += '\n';
    }

    return md;
}

async function main() {
    const manifest = await fetchManifest();

    // 保存 manifest 数据
    fs.writeFileSync(OUTPUT_PATH, JSON.stringify(manifest, null, 2));
    console.log(`✅ 已保存到 ${OUTPUT_PATH}`);

    // 生成 changelog.md
    if (manifest.changelog) {
        const changelogPath = path.join(__dirname, 'changelog.md');
        const changelogMd = generateChangelogMarkdown(manifest.changelog);
        fs.writeFileSync(changelogPath, changelogMd);
        console.log('✅ 已更新 changelog.md');
    }

    // 输出版本号供 config.ts 使用
    console.log(`📌 版本号: ${manifest.version}`);
}

main().catch(console.error);
