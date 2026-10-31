import fs from 'node:fs/promises';
import path from 'node:path';
import assert from 'node:assert/strict';
import {load} from 'cheerio';
const root=path.resolve('.vitepress/dist'),report=JSON.parse(await fs.readFile('site/seo-report.json','utf8')),seen=new Set();
const sitemap=load(await fs.readFile(root+'/sitemap.xml','utf8'),{xmlMode:true});const sitemapUrls=new Set(sitemap('loc').map((_,el)=>sitemap(el).text()).get());
assert(report.length>=61,'Every generated page has an SEO record');
for(const page of report){const file=path.join(root,page.route==='/'?'index.html':page.route.endsWith('/')?page.route.slice(1)+'index.html':page.route.slice(1)+'.html');const $=load(await fs.readFile(file,'utf8'));
 assert.equal($('head > title').length,1);assert(!seen.has(page.title),'Unique title: '+page.route);seen.add(page.title);
 if(page.indexable)assert.equal($('h1').length,1,'Single primary heading: '+page.route);assert.equal($('html').attr('lang'),'zh-CN');
 assert(page.description.length>=20&&page.description.length<=180,'Concise page description: '+page.route);
 for(const [selector,value] of [['meta[name="description"]',page.description],['meta[property="og:title"]',page.title],['meta[name="twitter:title"]',page.title],['meta[property="og:description"]',page.description],['meta[name="twitter:description"]',page.description],['meta[property="og:url"]',page.canonical]]){assert.equal($(selector).length,1,selector+' '+page.route);assert.equal($(selector).attr('content'),value)}
 assert.equal($('link[rel="canonical"]').length,1);assert.equal($('link[rel="canonical"]').attr('href'),page.canonical);
 const noindex=$('meta[name="robots"]').attr('content').includes('noindex');assert.equal(noindex,!page.indexable);
 assert.equal(sitemapUrls.has(page.canonical),page.indexable,'Sitemap matches indexing intent: '+page.route);
 const schemas=$('script[type="application/ld+json"]').toArray().map(el=>JSON.parse($(el).text()));
 assert.deepEqual(schemas.map(s=>s['@type']),page.schemas);
 for(const schema of schemas){assert.equal(schema['@context'],'https://schema.org');if(schema['@type']==='FAQPage'){assert.equal(page.route,'/guide/faq');assert(schema.mainEntity.length>0);for(const q of schema.mainEntity){assert(q.name&&q.acceptedAnswer.text);assert($('.vp-doc').text().replace(/[\u200b-\u200d]/g,'').replace(/\s+/g,' ').includes(q.name))}}if(schema['@type']==='HowTo'){assert.equal(page.route,'/guide/installation');assert.equal(schema.step.length,3)}if(schema['@type']==='SoftwareApplication')assert.equal(page.route,'/');}
 const image=new URL($('meta[property="og:image"]').attr('content'));await fs.access(path.join(root,image.pathname));
 assert(!$('main').text().includes('鏇存柊'),'Readable rendered content: '+page.route);
}
console.log(`SEO verified: ${report.length} pages; ${report.filter(p=>p.indexable).length} indexable; titles, descriptions, canonical, social previews, schema and sitemap.`);
