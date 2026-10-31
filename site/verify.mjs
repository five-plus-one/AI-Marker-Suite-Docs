import fs from 'node:fs/promises';import path from 'node:path';import assert from 'node:assert/strict';import {load} from 'cheerio';
const root=path.resolve('.vitepress/dist'),release=JSON.parse(await fs.readFile(root+'/release.json','utf8')),base=release.base,records=JSON.parse(await fs.readFile('site/seo-report.json','utf8')),legacy=JSON.parse(await fs.readFile('site/legacy-routes.json','utf8'));
const problems=[],compatibility=[];
for(const page of records){const relative=page.route==='/'?'index.html':page.route.endsWith('/')?page.route.slice(1)+'index.html':page.route.slice(1)+'.html',file=path.join(root,relative),$=load(await fs.readFile(file,'utf8'));if(page.route!=='/404')assert.equal($('.VPNav').length,1,'Original navigation: '+page.route);assert($('script[type="module"]').length,'Page runtime: '+page.route);if(page.route!=='/404')assert($('.VPNavBarSearch').length,'Search entry: '+page.route);for(const a of $('a[href]').toArray()){const href=$(a).attr('href');if(!href.startsWith(base)||href.startsWith('//'))continue;const u=new URL(href,'https://local.test'),pathname=decodeURI(u.pathname.slice(base.length));const target=path.join(root,!pathname?'index.html':pathname.endsWith('/')?pathname+'index.html':path.extname(pathname)?pathname:pathname+'.html');try{await fs.access(target)}catch{problems.push({from:page.route,href})}}}
for(const page of legacy.pages){const $=load(await fs.readFile(path.join(root,page.file),'utf8'));const ids=new Set($('[id]').map((_,e)=>$(e).attr('id')).get());const missing=page.anchors.filter(id=>!ids.has(id));assert.deepEqual(missing,[],'Legacy anchors: '+page.file);compatibility.push({file:page.file,anchors:page.anchors.length,status:'preserved'})}
assert.deepEqual(problems,[],'Internal links');const home=load(await fs.readFile(root+'/index.html','utf8'));for(const name of ['资源','下载'])assert(home('.VPNavBarMenuGroup').text().includes(name),'Navigation group: '+name);assert(home('a[href*="ota/ai_marker.user.js"]').length);assert(home('a[href*="ota/preview/ai_marker.user.js"]').length);assert.equal(home('.home-donate-grid img').length,2);
for(const [section,label] of Object.entries({guide:'快速上手',config:'配置',modes:'批改模式',platforms:'平台',advanced:'进阶'})){
  for(const page of records.filter(page=>page.route.startsWith('/'+section+'/'))){
    const relative=page.route.endsWith('/')?page.route.slice(1)+'index.html':page.route.slice(1)+'.html';
    const $=load(await fs.readFile(path.join(root,relative),'utf8'));
    assert.equal($('.VPNavBarMenuLink.active').text().trim(),label,'Active section: '+page.route);
  }
}
const changelog=await fs.readFile(root+'/changelog.html','utf8');for(const id of ['dynamic-changelog','dynamic-changelog-preview','stable-version','preview-version'])assert(changelog.includes('id="'+id+'"'));assert(changelog.includes('id="稳定版"'));assert(changelog.includes('id="预览版"'));
assert((await fs.readFile(root+'/config/formula.html','utf8')).includes('mjx-container'));
const search=JSON.parse(await fs.readFile(root+'/search.json','utf8'));
assert(search.length>500,'Search covers document sections');
for(const entry of search){const url=new URL(entry.url,'https://local.test'),relative=decodeURI(url.pathname.slice(base.length)),target=path.join(root,relative.endsWith('/')?relative+'index.html':relative+'.html'),$=load(await fs.readFile(target,'utf8'));if(url.hash)assert($('[id]').toArray().some(el=>$(el).attr('id')===decodeURIComponent(url.hash.slice(1))),'Search section: '+entry.url)}
assert(home('.fp-docs-search-host').length,'Shared search host');
await fs.writeFile('site/route-compatibility-report.json',JSON.stringify({base,baseline:legacy.baseline,pages:compatibility.length,anchors:legacy.pages.reduce((n,p)=>n+p.anchors.length,0),results:compatibility},null,2));console.log(`Verified ${records.length} pages, original navigation and runtime; ${compatibility.length} legacy paths and ${legacy.pages.reduce((n,p)=>n+p.anchors.length,0)} anchors preserved (${base}).`);
