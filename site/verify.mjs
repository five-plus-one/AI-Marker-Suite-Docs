import fs from 'node:fs/promises';
import path from 'node:path';
import assert from 'node:assert/strict';
import {load} from 'cheerio';
const root=path.resolve('.vitepress/dist');const base=JSON.parse(await fs.readFile(root+'/release.json','utf8')).base;
const search=JSON.parse(await fs.readFile(root+'/search.json','utf8'));assert(search.length>=59);
const problems=[];
assert(search.some(entry=>entry.url.includes('#')&&entry.heading),'Search targets document sections');
for(const entry of search.filter(entry=>entry.url.includes('#'))){const [url,anchor]=entry.url.split('#');const route=url.slice(base.length);const file=path.join(root,route.endsWith('/')?route+'index.html':route+'.html');const $=load(await fs.readFile(file,'utf8'));assert($('[id]').toArray().some(el=>$(el).attr('id')===decodeURIComponent(anchor)),`Search anchor exists: ${entry.url}`)}

for(const page of [...new Map(search.map(p=>[p.url.split("#")[0],{...p,url:p.url.split("#")[0]}])).values()]){const route=page.url.slice(base.length);const file=path.join(root,route.endsWith('/')?route+'index.html':route?route+'.html':'index.html');const $=load(await fs.readFile(file,'utf8'));assert.equal($('#root .fp-docs').length,1);assert.equal($('link[rel~="stylesheet"]').length,1,'One shared theme stylesheet');assert.equal($('link[rel~="stylesheet"][href*="/assets/"]').length,0,'Shared stylesheet owns the appearance');assert.equal($('script[src*="vitepress"]').length,0);const data=JSON.parse($('#page-data').text());assert.equal(data.page.url,page.url);for(const a of $('a[href]').toArray()){const href=$(a).attr('href');if(!href.startsWith(base)||href.startsWith('//'))continue;const u=new URL(href,'https://local.test');const pathname=decodeURI(u.pathname.slice(base.length));const target=path.join(root,!pathname?'index.html':pathname.endsWith('/')?pathname+'index.html':path.extname(pathname)?pathname:pathname+'.html');try{await fs.access(target)}catch{problems.push({from:page.url,href})}}}
assert.deepEqual(problems,[],'All internal navigation targets must exist');
const formula=await fs.readFile(root+'/config/formula.html','utf8');assert(formula.includes('mjx-container'));assert(/docs-assets\/client-[A-Z0-9]+\.css/.test(formula));
console.log(`Verified ${search.length} search entries, navigation targets, static React content and formula markup (${base}).`);

