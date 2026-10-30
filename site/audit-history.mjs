import fs from 'node:fs/promises';
import path from 'node:path';
import {execFileSync} from 'node:child_process';
import {createMarkdownRenderer} from 'vitepress';
import {load} from 'cheerio';

const git=(...args)=>execFileSync('git',args,{encoding:'utf8',maxBuffer:64*1024*1024});
const objects=git('rev-list','--objects','--all').trim().split('\n').map(line=>line.split(/ (.*)/s)).filter(([,file])=>file?.endsWith('.md')&&!file.startsWith('.')&&file!=='AGENTS.md');
const md=await createMarkdownRenderer(process.cwd(),{math:true});
const pages=new Map();
for(const [id,file] of objects){
 if(file.startsWith('.'))continue;
 const source=git('cat-file','blob',id).replace(/^---\r?\n[\s\S]*?\r?\n---\r?\n/,'');
 const $=load(md.render(source,{}));
 const route=file==='index.md'?'/':file.endsWith('/index.md')?'/'+file.slice(0,-8):'/'+file.slice(0,-3);
 if(!pages.has(route))pages.set(route,{route,source:file,anchors:[]});
 const page=pages.get(route);
 for(const anchor of $('[id]').toArray().map(el=>$(el).attr('id')))if(!page.anchors.includes(anchor))page.anchors.push(anchor);
}
const records=[...pages.values()].sort((a,b)=>a.route.localeCompare(b.route));
await fs.writeFile('site/historical-links.json',JSON.stringify({sourceRef:git('rev-parse','HEAD').trim(),sources:objects.length,pages:records},null,2));
const missing=[];
for(const page of records){
 const relative=page.route==='/'?'index.html':page.route.endsWith('/')?page.route.slice(1)+'index.html':page.route.slice(1)+'.html';
 try{const $=load(await fs.readFile(path.join('.vitepress/dist',relative),'utf8'));const ids=new Set($('[id]').toArray().map(el=>$(el).attr('id')));const anchors=page.anchors.filter(id=>!ids.has(id));if(anchors.length)missing.push({route:page.route,anchors})}
 catch{missing.push({route:page.route,missing:true,anchors:page.anchors})}
}
await fs.writeFile('site/.historical-missing.json',JSON.stringify(missing,null,2));
console.log(JSON.stringify({sources:objects.length,pages:records.length,anchors:records.reduce((n,p)=>n+p.anchors.length,0),missingPages:missing.length},null,2));
