import fs from 'node:fs/promises';
import {load} from 'cheerio';
import {escapeHtml} from './changelog.mjs';

const origin='https://aimarking.five-plus-one.com';
export async function buildDiscovery({out,base,seo}){
 const redirects=JSON.parse(await fs.readFile('site/redirects.json','utf8'));
 for(const redirect of redirects){
  const target=base+redirect.to.slice(1),canonical=origin+redirect.to;
  const script=`var m=${JSON.stringify(redirect.hashes)},h=location.hash;try{var k=decodeURIComponent(h.slice(1));if(Object.hasOwn(m,k))h='#'+encodeURIComponent(m[k])}catch(e){}location.replace(${JSON.stringify(target)}+location.search+h)`;
  await fs.writeFile(out+redirect.from+'.html',`<!doctype html><html lang="zh-CN"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>${escapeHtml(redirect.title)}</title><link rel="canonical" href="${canonical}"><meta name="robots" content="noindex,follow"><script>${script}</script><meta http-equiv="refresh" content="0;url=${target}"></head><body><main><h1>评阅历史工具</h1><p>请前往<a href="${target}">工具页面</a>查看评阅历史。</p></main></body></html>`);
 }
 const pages=seo.filter(p=>p.indexable),source=await fs.readFile('public/llms.txt','utf8');
 const lead=source.split('## 文档页面')[0],tail=source.includes('## 社群与友情链接')?'## 社群与友情链接'+source.split('## 社群与友情链接')[1]:'';
 const entries=pages.map(page=>`- [${page.title.replace(/ \| AI 批改助手$/,'')}](${page.canonical}): ${page.description}`).join('\n');
 await fs.writeFile(out+'/llms.txt',`${lead}## 文档页面\n\n${entries}\n\n## 完整文档\n\n- [AI 批改助手完整文档](${origin}/llms-full.txt)：按页面整理的可读正文，以各页规范链接为准。\n\n${tail}`);
 const full=['# AI 批改助手完整文档','',`文档站：${origin}/`,'','脚本本身开源免费；AI 服务可能收费。脚本运行在电脑浏览器，不支持手机批改。',''];
 for(const page of pages){
  const file=page.route==='/'?'index.html':page.route.endsWith('/')?page.route.slice(1)+'index.html':page.route.slice(1)+'.html';
  const $=load(await fs.readFile(out+'/'+file,'utf8')),content=page.route==='/'?$('.home-hero,.home-sections').clone():$('.vp-doc').first().clone();
  content.find('script,style,.header-anchor,.fp-anchor-alias,.fp-docs-context,[aria-hidden="true"]').remove();
  const absolute=href=>{const url=new URL(href,origin+base+page.route.slice(1));if(url.origin===origin&&base!=='/'&&url.pathname.startsWith(base))url.pathname='/'+url.pathname.slice(base.length);return url.href};
  content.find('a[href]').each((_,el)=>{const href=$(el).attr('href');if(!href.startsWith('#'))$(el).append(' ('+absolute(href)+')')});
  content.find('img[alt]').each((_,el)=>{$(el).replaceWith('\n图片：'+$(el).attr('alt')+' ('+absolute($(el).attr('src'))+')\n')});
  content.find('h1,h2,h3,h4,p,li,tr,pre,summary,figcaption').each((_,el)=>{$(el).prepend('\n').append('\n')});
  const text=content.text().replace(/[\u200b-\u200d]/g,'').split('\n').map(s=>s.replace(/[ \t]+/g,' ').trim()).filter(Boolean).join('\n');
  full.push(`## ${page.title}`,`来源：${page.canonical}`,'',text,'');
 }
 await fs.writeFile(out+'/llms-full.txt',full.join('\n'));
 console.log(`Discovery documents: ${pages.length} canonical pages; ${redirects.length} compatibility redirect.`);
}
