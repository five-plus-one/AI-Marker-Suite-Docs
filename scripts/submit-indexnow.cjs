#!/usr/bin/env node

/**
 * IndexNow URL 提交脚本
 * 用于将网站 URL 提交到 IndexNow 协议支持的搜索引擎
 *
 * 使用方法：
 *   node scripts/submit-indexnow.cjs
 *   node scripts/submit-indexnow.cjs --sitemap https://aimarking.five-plus-one.com/sitemap.xml
 */

const https = require('https');

// IndexNow 配置
const SITE_URL = 'https://aimarking.five-plus-one.com';
const INDEXNOW_KEY = '5fc7c0545bf116fcea0cc4481e52d497';
const KEY_LOCATION = `${SITE_URL}/${INDEXNOW_KEY}.txt`;

// IndexNow API 端点
const INDEXNOW_ENDPOINTS = [
  'api.indexnow.org',      // Bing, Yandex, Seznam.cz, Naver
  'api.search.brave.com',  // Brave Search
];

/**
 * 发起 HTTPS GET 请求
 */
function httpsGet(url) {
  return new Promise((resolve, reject) => {
    const urlObj = new URL(url);
    const options = {
      hostname: urlObj.hostname,
      port: 443,
      path: urlObj.pathname + urlObj.search,
      method: 'GET',
      headers: {
        'User-Agent': 'AI-Marker-Suite-IndexNow/1.0',
      },
    };

    const req = https.request(options, (res) => {
      let data = '';
      res.on('data', (chunk) => data += chunk);
      res.on('end', () => {
        if (res.statusCode >= 200 && res.statusCode < 300) {
          resolve(data);
        } else {
          reject(new Error(`HTTP ${res.statusCode}: ${res.statusMessage}`));
        }
      });
    });

    req.on('error', reject);
    req.setTimeout(10000, () => {
      req.destroy();
      reject(new Error('Request timeout'));
    });
    req.end();
  });
}

/**
 * 从 sitemap.xml 获取所有 URL（使用正则解析，无需外部依赖）
 */
async function fetchSitemapUrls(sitemapUrl) {
  const xml = await httpsGet(sitemapUrl);

  // 使用正则表达式提取 <loc> 标签中的 URL
  const urlRegex = /<loc>(.*?)<\/loc>/g;
  const urls = [];
  let match;

  while ((match = urlRegex.exec(xml)) !== null) {
    urls.push(match[1]);
  }

  return urls;
}

/**
 * 向 IndexNow 端点提交 URL
 */
function submitToIndexNow(endpoint, urls) {
  return new Promise((resolve) => {
    const payload = JSON.stringify({
      host: 'aimarking.five-plus-one.com',
      key: INDEXNOW_KEY,
      keyLocation: KEY_LOCATION,
      urlList: urls,
    });

    const options = {
      hostname: endpoint,
      port: 443,
      path: '/IndexNow',
      method: 'POST',
      headers: {
        'Content-Type': 'application/json; charset=utf-8',
        'Content-Length': Buffer.byteLength(payload),
        'User-Agent': 'AI-Marker-Suite-IndexNow/1.0',
      },
    };

    const req = https.request(options, (res) => {
      let data = '';
      res.on('data', (chunk) => data += chunk);
      res.on('end', () => {
        resolve({
          endpoint,
          statusCode: res.statusCode,
          response: data,
        });
      });
    });

    req.on('error', (err) => {
      resolve({
        endpoint,
        statusCode: 0,
        error: err.message,
      });
    });

    req.setTimeout(10000, () => {
      req.destroy();
      resolve({
        endpoint,
        statusCode: 0,
        error: 'Request timeout',
      });
    });

    req.write(payload);
    req.end();
  });
}

/**
 * 主函数
 */
async function main() {
  const args = process.argv.slice(2);
  const sitemapIndex = args.indexOf('--sitemap');
  const sitemapUrl = sitemapIndex !== -1 ? args[sitemapIndex + 1] : `${SITE_URL}/sitemap.xml`;

  console.log('🚀 IndexNow URL 提交工具');
  console.log(`📡 站点: ${SITE_URL}`);
  console.log(`🔑 Key: ${INDEXNOW_KEY}`);
  console.log(`📄 Sitemap: ${sitemapUrl}`);
  console.log('');

  // 获取 URL 列表
  let urls;
  try {
    console.log('📥 正在获取 sitemap...');
    urls = await fetchSitemapUrls(sitemapUrl);
    console.log(`✅ 找到 ${urls.length} 个 URL`);
  } catch (error) {
    console.error('❌ 获取 sitemap 失败:', error.message);
    process.exit(1);
  }

  if (urls.length === 0) {
    console.log('⚠️ 没有找到 URL，退出');
    process.exit(0);
  }

  // 批量提交（IndexNow 限制每次最多 10,000 个 URL）
  const BATCH_SIZE = 10000;
  const batches = [];
  for (let i = 0; i < urls.length; i += BATCH_SIZE) {
    batches.push(urls.slice(i, i + BATCH_SIZE));
  }

  console.log(`📤 将分 ${batches.length} 批提交`);
  console.log('');

  // 向所有端点提交
  // IndexNow 成功状态码：200 (OK) 或 202 (Accepted)
  // 403 表示该端点不支持或需要特殊认证，不影响整体成功
  let primaryEndpointSuccess = false;
  let anyEndpointSuccess = false;

  for (const endpoint of INDEXNOW_ENDPOINTS) {
    console.log(`🌐 提交到 ${endpoint}...`);
    for (const batch of batches) {
      const result = await submitToIndexNow(endpoint, batch);

      if (result.error) {
        console.log(`  ⚠️ 连接错误: ${result.error}`);
        continue;
      }

      // 200 和 202 都是成功状态码
      const isSuccess = result.statusCode === 200 || result.statusCode === 202;
      const statusEmoji = isSuccess ? '✅' : '❌';
      console.log(`  ${statusEmoji} 状态码: ${result.statusCode}`);

      if (isSuccess) {
        anyEndpointSuccess = true;
        // api.indexnow.org 是主要端点
        if (endpoint === 'api.indexnow.org') {
          primaryEndpointSuccess = true;
        }
      } else if (result.statusCode === 403) {
        console.log(`  ℹ️  该端点可能不支持或需要单独认证`);
      }
    }
  }

  console.log('');

  // 只要主端点成功，就认为整体成功
  if (primaryEndpointSuccess) {
    console.log('✨ 完成！URL 已成功提交到 IndexNow。');
  } else if (anyEndpointSuccess) {
    console.log('✨ 完成！URL 已提交到部分端点。');
  } else {
    console.log('❌ 所有端点提交失败。');
    process.exit(1);
  }
}

main().catch((err) => {
  console.error('❌ 脚本执行失败:', err.message);
  process.exit(1);
});
