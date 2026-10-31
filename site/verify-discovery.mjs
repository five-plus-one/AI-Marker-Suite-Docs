import {createReleaseModels} from './release-model.mjs';
import fs from 'node:fs/promises';
import path from 'node:path';
import assert from 'node:assert/strict';
import {load} from 'cheerio';

const root=path.resolve('.vitepress/dist'),release=JSON.parse(await fs.readFile(root+'/release.json','utf8')),base=release.base;
const historical=JSON.parse(await fs.readFile('site/historical-links.json','utf8')),redirects=JSON.parse(await fs.readFile('site/redirects.json','utf8')),seo=JSON.parse(await fs.readFile(root+'/seo.json','utf8'));
const origin='https://aimarking.five-plus-one.com',cache=new Map(),issues=[],graph=new Map();
const fileFor=route=>path.join(root,route==='/'?'index.html':route.endsWith('/')?route.slice(1)+'index.html':route.slice(1).endsWith('.html')?route.slice(1):route.slice(1)+'.html');
async function documentFor(route){if(!cache.has(route))cache.set(route,load(await fs.readFile(fileFor(route),'utf8')));return cache.get(route)}
const idsFor=$=>new Set($('[id]').map((_,el)=>$(el).attr('id')).get());
for(const page of historical.pages){
 const redirect=redirects.find(r=>r.from===page.route),target=redirect?.to||page.route,$=await documentFor(target),ids=idsFor($);
 for(const id of page.anchors)assert(ids.has(redirect?.hashes[id]||id),`Historical anchor ${page.route}#${id} → ${target}`);
 if(redirect){
  const alias=await documentFor(page.route);
  assert.equal(alias('link[rel="canonical"]').attr('href'),origin+target);
  assert.equal(alias('meta[http-equiv="refresh"]').attr('content'),`0;url=${base+target.slice(1)}`);
  assert(alias('meta[name="robots"]').attr('content').includes('noindex'));
  const script=alias('script').text();assert(script.includes('location.search+h'));assert(script.includes('location.replace'));
 }
}
for(const page of seo){
 const $=await documentFor(page.route),ids=$('[id]').map((_,el)=>$(el).attr('id')).get(),links=[];
 assert.equal(new Set(ids).size,ids.length,'Unique IDs: '+page.route);
 for(const el of $('a[href],img[src],script[src],link[href]').toArray()){
  const attribute=el.tagName==='img'||el.tagName==='script'?'src':'href',href=$(el).attr(attribute);
  if(!href||/^(data:|blob:|mailto:|tel:|javascript:)/i.test(href))continue;
  const url=new URL(href,'https://local.test'+base+page.route.slice(1));
  if(!['https://local.test',origin].includes(url.origin))continue;
  let route=decodeURI(url.pathname);
  if(url.origin==='https://local.test'){
   if(!route.startsWith(base)){issues.push({page:page.route,href,error:'Outside deployment base'});continue}
   route='/'+route.slice(base.length);
  }
  const extension=path.extname(route);
  if(extension&&extension!=='.html'){
   try{await fs.access(path.join(root,route.slice(1)))}catch{issues.push({page:page.route,href,error:'Missing file'})}
   continue;
  }
  route=route.replace(/\.html$/,'').replace(/\/index$/,'/');
  const redirect=redirects.find(r=>r.from===route),target=redirect?.to||route;
  try{
   const targetDoc=await documentFor(target);
   if(url.hash){const id=decodeURIComponent(url.hash.slice(1));if(!idsFor(targetDoc).has(redirect?.hashes[id]||id))issues.push({page:page.route,href,error:'Missing anchor'})}
   links.push(target);
  }catch{issues.push({page:page.route,href,error:'Missing page'})}
 }
 graph.set(page.route,links);
}
assert.deepEqual(issues,[],'Internal page, section and asset links');
const reached=new Set(['/']),queue=['/'];
for(let index=0;index<queue.length;index++)for(const route of graph.get(queue[index])||[])if(!reached.has(route)){reached.add(route);queue.push(route)}
assert.deepEqual(seo.filter(page=>page.indexable&&!reached.has(page.route)).map(page=>page.route),[],'Every indexable page is reachable from the homepage');
const llms=await fs.readFile(root+'/llms.txt','utf8'),full=await fs.readFile(root+'/llms-full.txt','utf8');
for(const page of seo.filter(p=>p.indexable)){
 assert(llms.includes(`](${page.canonical})`),'Discovery index: '+page.route);
 assert(full.includes(`来源：${page.canonical}\n`),'Full text source: '+page.route);
 const $=await documentFor(page.route);
 if(page.route!=='/')assert($('.vp-doc').text().trim().length>40,'Server-rendered text: '+page.route);
}
const changelog=await documentFor('/changelog'),notes=JSON.parse(await fs.readFile('site/release-notes.json','utf8'));
const models=createReleaseModels(notes);
for(const [channel,id] of [['stable','dynamic-changelog'],['preview','dynamic-changelog-preview']]){
 const expected=models[channel].groups.flatMap(group=>group.items.map(item=>item.text));
 const actual=changelog('#'+id+' .fp-release-group li').map((_,element)=>changelog(element).text()).get();
 assert.deepEqual(actual,expected,'Categorized release notes: '+channel);
 assert.equal(changelog('#'+id+' .fp-release-notes').length,1,'Channel panel: '+channel);
}
assert.equal(changelog('#dynamic-changelog .fp-release-history-item').length,models.stable.history.length,'Archived stable releases');
assert.equal(changelog('#dynamic-changelog-preview details').length,0,'Preview delta is directly readable');
const robots=await fs.readFile(root+'/robots.txt','utf8');assert(robots.includes('User-agent: *\nAllow: /'));assert(robots.includes('Sitemap: '+origin+'/sitemap.xml'));
const result={base,historicalSources:historical.sources,historicalPaths:historical.pages.length,historicalAnchors:historical.pages.reduce((n,page)=>n+page.anchors.length,0),redirects,reachablePages:seo.filter(page=>page.indexable&&reached.has(page.route)).length,releaseNotes:{stable:models.stable.groups.reduce((count,group)=>count+group.items.length,0),stableHistory:models.stable.history.length,previewAdditional:models.preview.groups.reduce((count,group)=>count+group.items.length,0)},internalLinkErrors:issues,discovery:['llms.txt','llms-full.txt','robots.txt','sitemap.xml']};
await fs.writeFile('site/discovery-report.json',JSON.stringify(result,null,2)+'\n');
console.log(`Discovery verified: ${result.historicalPaths} historical paths, ${result.historicalAnchors} anchors, ${result.reachablePages} reachable indexable pages; full text and both release channels (${base}).`);
