/**
 * fetchManifest.js
 * 客户端脚本：从远端 manifest.json 动态加载版本号和 changelog
 */

const MANIFEST_URL = 'https://auto-update.aimarking.five-plus-one.com/ota/manifest.json';

// 缓存 manifest 数据
let manifestCache = null;
let fetchPromise = null;

/**
 * 获取 manifest 数据（带缓存）
 */
export async function fetchManifest() {
    if (manifestCache) return manifestCache;
    if (fetchPromise) return fetchPromise;

    fetchPromise = (async () => {
        try {
            const response = await fetch(MANIFEST_URL + '?_t=' + Date.now());
            if (!response.ok) throw new Error(`HTTP ${response.status}`);
            manifestCache = await response.json();
            console.log('[Manifest] 获取成功，版本:', manifestCache.version);
            return manifestCache;
        } catch (error) {
            console.warn('[Manifest] 获取失败:', error.message);
            return null;
        } finally {
            fetchPromise = null;
        }
    })();

    return fetchPromise;
}

/**
 * 更新导航栏版本号
 */
export async function updateNavVersion() {
    const manifest = await fetchManifest();
    if (!manifest?.version) return;

    const version = manifest.version;
    const versionText = `v${version}`;

    // VitePress 的版本号在 VPFlyout > button > .text > span 中
    // 查找所有 flyout 按钮的文本
    const flyoutTexts = document.querySelectorAll('.VPNavBarMenuGroup .text > span:first-child');
    for (const el of flyoutTexts) {
        const text = el.textContent?.trim();
        // 匹配 "获取中..." 或 "v" 开头的版本号
        if (text === '获取中...' || (text && text.startsWith('v') && text.includes('.'))) {
            el.textContent = versionText;
            console.log('[Manifest] 版本号已更新:', versionText);
            break;
        }
    }

    // 更新 JSON-LD 中的 softwareVersion
    updateJsonLdVersion(version);
}

/**
 * 更新页面中 JSON-LD 的 softwareVersion
 */
function updateJsonLdVersion(version) {
    const scripts = document.querySelectorAll('script[type="application/ld+json"]');
    for (const script of scripts) {
        try {
            const data = JSON.parse(script.textContent);
            if (data.softwareVersion) {
                data.softwareVersion = version;
                script.textContent = JSON.stringify(data);
            }
        } catch (e) {
            // 忽略解析错误
        }
    }
}

/**
 * 渲染 changelog 到指定容器
 */
export function renderChangelog(container, changelog) {
    if (!changelog || typeof changelog !== 'object') {
        container.innerHTML = '<p style="color: #999;">暂无更新日志</p>';
        return;
    }

    const versions = Object.keys(changelog).sort((a, b) => {
        const pa = a.split('.').map(Number);
        const pb = b.split('.').map(Number);
        for (let i = 0; i < Math.max(pa.length, pb.length); i++) {
            if ((pa[i] || 0) > (pb[i] || 0)) return -1;
            if ((pa[i] || 0) < (pb[i] || 0)) return 1;
        }
        return 0;
    });

    // 日期映射
    const dateMap = {
        '1.21.3': '2026-05-13',
        '1.21.2': '2026-05-09',
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

    let html = '';
    versions.forEach((ver, idx) => {
        const items = changelog[ver];
        const date = dateMap[ver] || '';
        const isLatest = idx === 0;

        html += `<div class="changelog-version${isLatest ? '' : ' collapsed'}">`;
        html += `<div class="changelog-version-header" onclick="this.parentElement.classList.toggle('collapsed')">`;
        html += `<svg class="changelog-toggle" viewBox="0 0 16 16" fill="none"><path d="M4 6l4 4 4-4" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg>`;
        html += `<span class="changelog-ver">v${ver}</span>`;
        if (date) html += `<span class="changelog-date">${date}</span>`;
        html += `</div>`;
        html += `<ul class="changelog-items">`;
        items.forEach(item => {
            html += `<li>${item}</li>`;
        });
        html += `</ul></div>`;
    });

    container.innerHTML = html;
}

/**
 * 初始化 changelog 页面
 */
export async function initChangelogPage() {
    // 只在 changelog 页面执行
    if (!window.location.pathname.includes('/changelog')) return;

    const container = document.getElementById('dynamic-changelog');
    if (!container) return;

    // 检查是否已经渲染过（避免重复渲染）
    if (container.dataset.loaded === 'true') return;

    // 显示加载状态
    container.innerHTML = '<p style="color: #999;">正在加载最新更新日志...</p>';

    const manifest = await fetchManifest();
    if (manifest?.changelog) {
        renderChangelog(container, manifest.changelog);
        container.dataset.loaded = 'true';
    } else {
        container.innerHTML = '<p style="color: #999;">加载失败，请刷新页面重试</p>';
    }
}
