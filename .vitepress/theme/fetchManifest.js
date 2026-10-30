import {renderReleaseNotes} from '../../site/changelog.mjs';
/**
 * fetchManifest.js
 * 客户端脚本：从远端 manifest.json 动态加载版本号和 changelog
 * 支持 stable / preview 双渠道
 */

const MANIFEST_URL = 'https://auto-update.aimarking.five-plus-one.com/ota/manifest.json';
const PREVIEW_MANIFEST_URL = 'https://auto-update.aimarking.five-plus-one.com/ota/preview/manifest.json';

// 缓存 manifest 数据
let manifestCache = null;
let previewManifestCache = null;
let fetchPromise = null;
let fetchPreviewPromise = null;

/**
 * 获取 stable manifest 数据（带缓存）
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
 * 获取 preview manifest 数据（带缓存）
 */
export async function fetchPreviewManifest() {
    if (previewManifestCache) return previewManifestCache;
    if (fetchPreviewPromise) return fetchPreviewPromise;

    fetchPreviewPromise = (async () => {
        try {
            const response = await fetch(PREVIEW_MANIFEST_URL + '?_t=' + Date.now());
            if (!response.ok) throw new Error(`HTTP ${response.status}`);
            previewManifestCache = await response.json();
            console.log('[Manifest-Preview] 获取成功，版本:', previewManifestCache.version);
            return previewManifestCache;
        } catch (error) {
            console.warn('[Manifest-Preview] 获取失败:', error.message);
            return null;
        } finally {
            fetchPreviewPromise = null;
        }
    })();

    return fetchPreviewPromise;
}

/**
 * 更新页面结构化数据中的版本号
 * 注：导航栏下载入口固定显示「下载」，不再替换为长版本号
 * （长版本号如 "v1.21.10.0 / 预览 v1.21.11.0-preview.29" 会把导航栏撑宽，
 *  导致窄屏下整个页面出现横向滚动）
 */
export async function updateNavVersion() {
    const manifest = await fetchManifest();

    // 更新 JSON-LD 中的 softwareVersion（使用 stable 版本）
    if (manifest?.version) {
        updateJsonLdVersion(manifest.version);
    }
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
 * @param {HTMLElement} container - 容器元素
 * @param {Object} changelog - 版本 changelog 对象 { '1.21.5': ['...'], ... }
 * @param {Object|null} changelogDates - 版本日期映射 { '1.21.5': '2026-05-16', ... }
 */
export function renderChangelog(container, changelog, changelogDates) {
    if (!changelog || typeof changelog !== 'object') return;
    const channel=container.id==='dynamic-changelog-preview'?'preview':'stable';
    container.innerHTML=renderReleaseNotes(changelog,changelogDates,channel);
    revealChangelogAnchor();
}

export function revealChangelogAnchor() {
    if (!location.pathname.includes('/changelog')) return;
    let id;try{id=decodeURIComponent(location.hash.slice(1))}catch{return}
    if (!id) return;
    const target=document.getElementById(id);
    if(!target) return;
    const details=target.closest('details') || (target.classList.contains('fp-anchor-alias')?target.nextElementSibling:null);
    if(details?.tagName==='DETAILS') details.open=true;
    requestAnimationFrame(()=>target.scrollIntoView({block:'start'}));
}

/**
 * 初始化 changelog 页面（同时加载 stable 和 preview）
 */
export async function initChangelogPage() {
    // 只在 changelog 页面执行
    if (!window.location.pathname.includes('/changelog')) return;
    revealChangelogAnchor();

    const stableContainer = document.getElementById('dynamic-changelog');
    const previewContainer = document.getElementById('dynamic-changelog-preview');

    // 如果两个容器都不存在，跳过
    if (!stableContainer && !previewContainer) return;

    // 检查是否已经渲染过
    if (stableContainer?.dataset.loaded === 'true' && previewContainer?.dataset.loaded === 'true') return;

    // 并行加载 stable 和 preview
    const [stableManifest, previewManifest] = await Promise.all([
        fetchManifest(),
        fetchPreviewManifest(),
    ]);

    // 渲染 stable changelog
    if (stableContainer && stableContainer.dataset.loaded !== 'true') {
        if (stableManifest?.changelog) {
            // 更新 stable 版本号显示
            const stableVersionEl = document.getElementById('stable-version');
            if (stableVersionEl && stableManifest.version) {
                stableVersionEl.textContent = `v${stableManifest.version}`;
            }
            renderChangelog(stableContainer, stableManifest.changelog, stableManifest.changelogDates);
            stableContainer.dataset.loaded = 'true';
        } else {
            stableContainer.dataset.loaded = 'saved';
        }
    }

    // 渲染 preview changelog
    if (previewContainer && previewContainer.dataset.loaded !== 'true') {
        if (previewManifest?.changelog) {
            // 更新 preview 版本号显示
            const previewVersionEl = document.getElementById('preview-version');
            if (previewVersionEl && previewManifest.version) {
                previewVersionEl.textContent = `v${previewManifest.version}`;
            }
            renderChangelog(previewContainer, previewManifest.changelog, previewManifest.changelogDates);
            previewContainer.dataset.loaded = 'true';
        } else {
            previewContainer.dataset.loaded = 'saved';
        }
    }
}
