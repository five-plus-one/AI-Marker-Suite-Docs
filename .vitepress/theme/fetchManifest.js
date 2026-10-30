import {renderChannelNotes} from '../../site/changelog.mjs';
import savedNotes from '../../site/release-notes.json';
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

export function revealChangelogAnchor() {
    if (!location.pathname.includes('/changelog')) return;
    let id;try{id=decodeURIComponent(location.hash.slice(1))}catch{return}
    if (!id) return;
    const target=document.getElementById(id);
    if(!target) return;
    for(let parent=target;parent;parent=parent.parentElement)if(parent.tagName==='DETAILS')parent.open=true;
    requestAnimationFrame(()=>target.scrollIntoView({block:'start'}));
}

const validManifest=data=>typeof data?.version==='string'&&/^\d+(?:\.\d+)*(?:-[\w.]+)?$/.test(data.version)&&data.changelog&&Object.keys(data.changelog).length>0&&Object.values(data.changelog).every(items=>Array.isArray(items)&&items.every(item=>typeof item==='string'));

export async function initChangelogPage() {
    if (!window.location.pathname.includes('/changelog')) return;
    revealChangelogAnchor();
    const stableContainer=document.getElementById('dynamic-changelog');
    const previewContainer=document.getElementById('dynamic-changelog-preview');
    if(!stableContainer||!previewContainer||stableContainer.dataset.loaded==='true')return;
    const [stable,preview]=await Promise.all([fetchManifest(),fetchPreviewManifest()]);
    if(!stableContainer.isConnected||!previewContainer.isConnected)return;
    const notes={stable:validManifest(stable)?stable:savedNotes.stable,preview:validManifest(preview)?preview:savedNotes.preview};
    // Keep server-rendered reading and expanded history intact when the snapshot matches.
    if(JSON.stringify(notes.stable.changelog)!==JSON.stringify(savedNotes.stable.changelog)||notes.stable.version!==savedNotes.stable.version||JSON.stringify(notes.preview.changelog)!==JSON.stringify(savedNotes.preview.changelog)||notes.preview.version!==savedNotes.preview.version){
        stableContainer.innerHTML=renderChannelNotes(notes,'stable');
        previewContainer.innerHTML=renderChannelNotes(notes,'preview');
    }
    stableContainer.dataset.loaded='true';previewContainer.dataset.loaded='true';
    revealChangelogAnchor();
}
