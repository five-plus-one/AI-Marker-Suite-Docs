import fs from 'node:fs/promises';
import assert from 'node:assert/strict';
import {load} from 'cheerio';

const origin=process.env.DOCS_PREVIEW_URL;
assert(origin,'Set DOCS_PREVIEW_URL to the local preview URL');
const legacy=JSON.parse(await fs.readFile('site/legacy-routes.json','utf8'));
const historical=JSON.parse(await fs.readFile('site/historical-links.json','utf8'));
const redirects=JSON.parse(await fs.readFile('site/redirects.json','utf8'));
const release=JSON.parse(await fs.readFile('.vitepress/dist/release.json','utf8'));
const pages=new Map(legacy.pages.map(page=>[page.file,{...page}]));
for(const page of historical.pages){
 const file=page.route==='/'?'index.html':page.route.endsWith('/')?page.route.slice(1)+'index.html':page.route.slice(1)+'.html';
 const existing=pages.get(file);
 pages.set(file,{file,anchors:[...new Set([...(existing?.anchors||[]),...page.anchors])]});
}
const checks=[];
for(const page of pages.values()){
  const route=page.file==='index.html'?'':page.file.endsWith('/index.html')?page.file.slice(0,-10):page.file.slice(0,-5);
  const paths=new Set([route,page.file]);
  if(page.file.endsWith('/index.html')){paths.add(route.replace(/\/$/,''));paths.add(route+'index')}
  if(page.file==='index.html')paths.add('index');
  for(const pathname of paths){
    const response=await fetch(new URL(pathname,origin));
    assert.equal(response.status,200,pathname);
    const $=load(await response.text());
    const oldRoute=page.file==='404.html'?'/404':route?'/'+route:'/',redirect=redirects.find(r=>r.from===oldRoute);
    const expected=redirect?.to||oldRoute;
    assert.equal($('link[rel="canonical"]').attr('href'),'https://aimarking.five-plus-one.com'+expected,pathname);
    let targetDoc=$;
    if(redirect){
      assert.equal($('meta[http-equiv="refresh"]').attr('content'),`0;url=${release.base+expected.slice(1)}`);
      const target=await fetch(new URL(expected.slice(1),origin));assert.equal(target.status,200);targetDoc=load(await target.text());
    }
    const ids=new Set(targetDoc('[id]').map((_,el)=>targetDoc(el).attr('id')).get());
    assert(page.anchors.every(id=>ids.has(redirect?.hashes[id]||id)),'Anchors: '+pathname);
    checks.push({path:pathname||'/',status:response.status});
  }
}
for(const asset of ['llms.txt','llms-full.txt','sitemap.xml','robots.txt','search.json','seo.json']){
 const response=await fetch(new URL(asset,origin));assert.equal(response.status,200,asset);assert((await response.text()).length>40,asset);
}
if(!process.env.CI)await fs.writeFile('site/http-compatibility-report.json',JSON.stringify({preview:origin,baseline:legacy.baseline,pages:pages.size,requests:checks.length,checks},null,2));
console.log(`HTTP verified: ${pages.size} legacy pages, ${checks.length} clean and .html URLs, canonical, anchors and 6 discovery resources.`);
