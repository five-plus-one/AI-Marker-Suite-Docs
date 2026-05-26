#!/usr/bin/env node

/**
 * IndexNow URL 提交脚本
 * 用于将网站 URL 提交到 IndexNow 协议支持的搜索引擎
 *
 * 使用方法：
 *   node scripts/submit-indexnow.js
 *   node scripts/submit-indexnow.js --sitemap https://aimarking.five-plus-one.com/sitemap.xml
 */

const https = require('https');
const { parseString } = require('xml2js');

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
 * 从 sitemap.xml 获取所有 URL
 */
async function fetchSitemapUrls(sitemapUrl) {
  return new Promise((resolve, reject) => {
    const url = new URL(sitemapUrl);
    const options = {
      hostname: url.hostname,
      port: 443,
      path: url.pathname,
      method: 'GET',
    };

    const req = https.request(options, (res) => {
      let data = '';
      res.on('data', (chunk) => data += chunk);
      res.on('end', () => {
        parseString(data, (err, result) => {
          if (err) {
            reject(err);
            return;
          }
          try {
            const urls = result.urlset.url.map(item => item.loc[0]);
            resolve(urls);
          } catch (e) {
            reject(new Error('Failed to parse sitemap XML'));
          }
        });
      });
    });

    req.on('error', reject);
    req.end();
  });
}

/**
 * 向 IndexNow 端点提交 URL
 */
async function submitToIndexNow(endpoint, urls) {
  return new Promise((resolve, reject) => {
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
  for (const endpoint of INDEXNOW_ENDPOINTS) {
    console.log(`🌐 提交到 ${endpoint}...`);
    for (const batch of batches) {
      const result = await submitToIndexNow(endpoint, batch);
      const statusEmoji = result.statusCode === 200 ? '✅' : '❌';
      console.log(`  ${statusEmoji} 状态码: ${result.statusCode}`);
      if (result.error) {
        console.log(`  ⚠️ 错误: ${result.error}`);
      }
    }
  }

  console.log('');
  console.log('✨ 完成！');
}

main().catch(console.error);
