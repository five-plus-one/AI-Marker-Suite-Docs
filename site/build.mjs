import fs from 'node:fs/promises';
import path from 'node:path';
import {build} from 'esbuild';
import {load} from 'cheerio';
import React from 'react';
import {renderToString} from 'react-dom/server';
const base=process.env.BASE_URL||'/';
const out=path.resolve('.vitepress/dist');
await build({entryPoints:['.vitepress/config.ts'],outfile:'site/.config.mjs',platform:'node',format:'esm',bundle:true,packages:'external'});
const config=(await import('./.config.mjs?'+Date.now())).default;
const groups=Object.values(config.themeConfig.sidebar).flat().map(g=>({label:g.text,links:g.items.map(l=>({label:l.text,href:base+l.link.slice(1)}))}));
await build({entryPoints:['site/App.jsx'],outfile:'site/.server.mjs',platform:'node',format:'esm',bundle:true,external:['react','react-dom','lucide-react'],jsx:'automatic',loader:{'.css':'empty'}});
const {App,MarkerLogo}=await import('./.server.mjs?'+Date.now());
await fs.writeFile(out+'/img/marker-logo.svg',renderToString(React.createElement(MarkerLogo,{size:40})).replace(/var\(--[^,]+,([^)]+)\)/g,'$1'));
await fs.mkdir(out+'/docs-assets',{recursive:true});
const client=await build({metafile:true,entryPoints:['site/client.jsx'],outdir:out+'/docs-assets',entryNames:'client-[hash]',bundle:true,format:'esm',minify:!process.env.DOCS_DEBUG,jsx:'automatic',loader:{'.woff2':'file','.woff':'file','.ttf':'file'},define:{'process.env.NODE_ENV':JSON.stringify(process.env.DOCS_DEBUG?'development':'production')}});
const clientJs=path.basename(Object.keys(client.metafile.outputs).find(p=>p.endsWith('.js')));
const clientCss=path.basename(Object.keys(client.metafile.outputs).find(p=>p.endsWith('.css')));
async function walk(dir){const result=[];for(const e of await fs.readdir(dir,{withFileTypes:true})){if(e.isDirectory()&&e.name!=='assets'&&e.name!=='docs-assets')result.push(...await walk(path.join(dir,e.name)));else if(e.isFile()&&e.name.endsWith('.html'))result.push(path.join(dir,e.name))}return result}
const search=[];let count=0;
for(const file of await walk(out)){
 const rel=path.relative(out,file).replaceAll('\\','/');const route=rel==='index.html'?'/':rel.endsWith('/index.html')?'/'+rel.slice(0,-10):'/'+rel.slice(0,-5);
 const $=load(await fs.readFile(file,'utf8'));const article=$('.vp-doc').first();
 article.find('.vp-code-group .tabs').remove();article.find('button.copy,span.lang').remove();
 article.find('a').each((_,el)=>{const a=$(el);let href=a.attr('href');if(href?.endsWith('.md'))a.attr('href',href.slice(0,-3));});
 article.find('#dynamic-changelog,#dynamic-changelog-preview').closest('section').remove();article.find('#dynamic-changelog,#dynamic-changelog-preview').remove();
 const html=route==='/changelog'?'<h1>更新日志</h1>':article.html()||'';const title=article.find('h1').first().text().replace(/^#\s*/,'')||$('title').text().split('|')[0].trim();
 const url=base+route.slice(1);const outline=route==='/changelog'?[]:article.find('h2[id],h3[id]').toArray().map(el=>({label:$(el).text().replace(/^#\s*/,''),href:'#'+$(el).attr('id')}));
 const source=rel==='index.html'?'index.md':rel.replace(/\.html$/,'.md');const props={page:{path:route,url,title,html,outline,source},groups,base};
 if(route!=='/404'&&route!=='/README')search.push({url,title,text:article.text().replace(/\s+/g,' ').trim()});
 $('head script:not([type="application/ld+json"]),head link[rel~="stylesheet"],head link[rel~="modulepreload"],head link[rel~="preload"]').remove();
 $('link[rel="icon"]').attr('type','image/svg+xml').attr('href',base+'img/marker-logo.svg');
 $('html').removeClass('dark').attr('data-product','marker').attr('data-theme','light');
 $('meta[property="og:url"]').attr('content','https://aimarking.five-plus-one.com'+route);
 const canonical=$('link[rel="canonical"]');canonical.attr('href','https://aimarking.five-plus-one.com'+route);
 $('head').prepend('<script>try{var t=localStorage.getItem("marker-docs-theme");document.documentElement.dataset.theme=t||(matchMedia("(prefers-color-scheme:dark)").matches?"dark":"light");document.documentElement.style.colorScheme=document.documentElement.dataset.theme}catch(e){}</script>');
 $('head').append(`<link rel="stylesheet" href="${base}docs-assets/${clientCss}">`);
 const data=JSON.stringify(props).replaceAll('<','\\u003c');
 $('body').html(`<div id="root">${renderToString(React.createElement(App,props))}</div><script id="page-data" type="application/json">${data}</script><script type="module" src="${base}docs-assets/${clientJs}"></script>`);
 await fs.writeFile(file,$.html());count++;
}
await fs.writeFile(out+'/search.json',JSON.stringify(search));
await fs.writeFile(out+'/release.json',JSON.stringify({ui:'0.5.78',pages:count,builtAt:new Date().toISOString(),base},null,2));
console.log(`React documentation rendered: ${count} pages; ${search.length} search entries; base ${base}`);

