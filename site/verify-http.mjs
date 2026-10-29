import fs from 'node:fs/promises';
import assert from 'node:assert/strict';
import {load} from 'cheerio';

const origin=process.env.DOCS_PREVIEW_URL;
assert(origin,'Set DOCS_PREVIEW_URL to the local preview URL');
const legacy=JSON.parse(await fs.readFile('site/legacy-routes.json','utf8'));
const checks=[];
for(const page of legacy.pages){
  const route=page.file==='index.html'?'':page.file.endsWith('/index.html')?page.file.slice(0,-10):page.file.slice(0,-5);
  for(const pathname of new Set([route,page.file])){
    const response=await fetch(new URL(pathname,origin));
    assert.equal(response.status,200,pathname);
    const $=load(await response.text());
    const expected=page.file==='404.html'?'/404':route?'/'+route:'/';
    assert.equal($('link[rel="canonical"]').attr('href'),'https://aimarking.five-plus-one.com'+expected,pathname);
    const ids=new Set($('[id]').map((_,el)=>$(el).attr('id')).get());
    assert(page.anchors.every(id=>ids.has(id)),'Anchors: '+pathname);
    checks.push({path:pathname||'/',status:response.status});
  }
}
await fs.writeFile('site/http-compatibility-report.json',JSON.stringify({preview:origin,baseline:legacy.baseline,pages:legacy.pages.length,requests:checks.length,checks},null,2));
console.log(`HTTP verified: ${legacy.pages.length} legacy pages, ${checks.length} clean and .html URLs, canonical and anchors.`);
