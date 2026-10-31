import fs from 'node:fs/promises';
import path from 'node:path';
import {build} from 'esbuild';
import {load} from 'cheerio';
import {applyPageSeo} from './seo.mjs';
import {buildDiscovery} from './build-discovery.mjs';
const base=process.env.BASE_URL||'/',out=path.resolve('.vitepress/dist');
await build({entryPoints:['.vitepress/config.ts'],outfile:'site/.config.mjs',platform:'node',format:'esm',bundle:true,packages:'external'});
const config=(await import('./.config.mjs?'+Date.now())).default;
const groups=Object.entries(config.themeConfig.sidebar).flatMap(([prefix,items])=>items.map(g=>({label:g.text,prefix:base+prefix.slice(1),links:g.items.map(l=>({label:l.text,href:base+l.link.slice(1)}))})));
async function walk(dir){const result=[];for(const e of await fs.readdir(dir,{withFileTypes:true})){if(e.isDirectory()&&e.name!=='assets')result.push(...await walk(path.join(dir,e.name)));else if(e.isFile()&&e.name.endsWith('.html'))result.push(path.join(dir,e.name))}return result}
const seo=[],search=[];
for(const file of await walk(out)){
 const rel=path.relative(out,file).replaceAll('\\','/'),route=rel==='index.html'?'/':rel.endsWith('/index.html')?'/'+rel.slice(0,-10):'/'+rel.slice(0,-5);
 const $=load(await fs.readFile(file,'utf8')),article=$('.vp-doc').first(),title=article.find('h1').first().text().replace(/[\u200b-\u200d]/g,'').trim()||$('head > title').text().split('|')[0].trim();
 seo.push(applyPageSeo($,{route,title,article,groups,base}));
 if(!['/404','/README','/feedback/thankyou','/'].includes(route)){
  const group=groups.find(g=>g.links.some(l=>l.href===base+route.slice(1)))?.label||'文档';
  let heading='',anchor='',parts=[];
  const flush=()=>{const text=parts.join(' ').replace(/\s+/g,' ').trim();if(text||heading)search.push({url:base+route.slice(1)+(anchor?'#'+encodeURIComponent(anchor):''),title,heading,group,text});parts=[]};
  const content=article.find('h1').first().parent();
  (content.length?content:article).children().each((_,el)=>{const node=$(el);if(/^h[1-4]$/.test(el.tagName)){flush();heading=node.clone().find('.header-anchor').remove().end().text().trim();anchor=node.attr('id')||''}else{const copy=node.clone();copy.find('script,style,.header-anchor').remove();parts.push(copy.text())}});flush();
 }
 $('html').attr('data-product','marker').attr('data-theme','light');
 $('head').prepend('<script>try{var t=localStorage.getItem("vitepress-theme-appearance")||localStorage.getItem("marker-docs-theme");if(t&&!localStorage.getItem("vitepress-theme-appearance"))localStorage.setItem("vitepress-theme-appearance",t);var d=t==="dark"||(!t||t==="auto")&&matchMedia("(prefers-color-scheme:dark)").matches;document.documentElement.dataset.theme=d?"dark":"light";document.documentElement.classList.toggle("dark",d)}catch(e){}</script>');
 await fs.writeFile(file,$.html());
}
const sitemap=load(await fs.readFile(out+'/sitemap.xml','utf8'),{xmlMode:true}),indexed=new Set(seo.filter(p=>p.indexable).map(p=>p.canonical));
await fs.writeFile(out+'/search.json',JSON.stringify(search));
sitemap('url').each((_,el)=>{const loc=sitemap(el).find('loc'),current=new URL(loc.text()),route=base!=='/'&&current.pathname.startsWith(base)?'/'+current.pathname.slice(base.length):current.pathname,canonical='https://aimarking.five-plus-one.com'+route;if(!indexed.has(canonical))sitemap(el).remove();else loc.text(canonical)});
await fs.writeFile(out+'/sitemap.xml',sitemap.xml());await fs.writeFile(out+'/seo.json',JSON.stringify(seo));await fs.writeFile('site/seo-report.json',JSON.stringify(seo,null,2));await fs.writeFile(out+'/release.json',JSON.stringify({ui:JSON.parse(await fs.readFile('node_modules/@fiveplusone/ui/package.json','utf8')).version,pages:seo.length,builtAt:new Date().toISOString(),base},null,2));
console.log(`Documentation compiled: ${seo.length} pages; original VitePress runtime; base ${base}`);
await buildDiscovery({out,base,seo});

