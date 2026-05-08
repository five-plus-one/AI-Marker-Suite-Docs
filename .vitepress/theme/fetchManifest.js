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

    // 查找包含 "v" 开头文本的导航链接
    const navLinks = document.querySelectorAll('.VPNavBarMenuLink, .VPNav .VPNavBarMenuGroup a');
    for (const link of navLinks) {
        const text = link.textContent?.trim();
        if (text && text.startsWith('v') && text.includes('.')) {
            link.textContent = `v${version}`;
            break;
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

    // 显示加载状态
    container.innerHTML = '<p style="color: #999;">正在加载最新更新日志...</p>';

    const manifest = await fetchManifest();
    if (manifest?.changelog) {
        renderChangelog(container, manifest.changelog);
    } else {
        container.innerHTML = '<p style="color: #999;">加载失败，显示本地缓存</p>';
    }
}

// 页面加载时自动执行
if (typeof window !== 'undefined') {
    // 等待 DOM 加载完成
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', () => {
            updateNavVersion();
            initChangelogPage();
        });
    } else {
        updateNavVersion();
        initChangelogPage();
    }

    // VitePress SPA 路由变化时也需要执行
    window.addEventListener('hashchange', () => {
        setTimeout(() => {
            updateNavVersion();
            initChangelogPage();
        }, 100);
    });
}
