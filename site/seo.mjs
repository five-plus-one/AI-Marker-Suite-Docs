const origin='https://aimarking.five-plus-one.com';
export function applyPageSeo($,{route,title,article,groups,base}){
 const canonical=origin+route,home=route==='/',excluded=route==='/404'||route==='/feedback/thankyou';
 const clean=text=>text.replace(/[\u200b-\u200d]/g,'').replace(/\s+/g,' ').trim();
 const original=$('title').text();
 const pageTitle=home?'AI 批改助手 — 让 AI 替你改卷':route==='/404'?'页面未找到 | AI 批改助手':original.replace(/\s*(?:—|\||-)\s*AI 批改助手/g,'').trim()+' | AI 批改助手';
 const descriptions={
  '/':'AI 批改助手是免费的开源浏览器脚本，通过多模态 AI 识别手写答案，按评分标准批改主观题。支持主流阅卷平台、双评仲裁、分小题评分与批改历史，提供安装教程和配置指南。',
  '/guide/introduction':'了解 AI 批改助手的工作方式、适用场景与核心功能。通过浏览器脚本连接阅卷平台和多模态 AI，完成手写识别、按标准评分、双评仲裁与批改记录管理。',
  '/platforms/':'查看 AI 批改助手支持的阅卷平台，按名称查找智学网、七天网络、好分数等平台的使用指南，了解各平台的安装、评分与操作注意事项。',
  '/feedback/thankyou':'感谢你为 AI 批改助手提供反馈。查看后续交流方式，或返回文档首页继续阅读。',
  '/404':'此页面暂时无法找到。请返回 AI 批改助手文档首页，或搜索安装、配置与阅卷平台指南。',
  '/tools':'AI 批改助手的实用工具入口。安装并启用脚本后，查看评阅历史、检查脚本更新与管理设置。'
 };
 const description=descriptions[route]||clean($('meta[name="description"]').first().attr('content')||article.find('p').first().text()||title);
 $('title').text(pageTitle);
 const meta=(attribute,name,content)=>{$(`meta[${attribute}="${name}"]`).remove();$('head').append($('<meta>').attr(attribute,name).attr('content',content))};
 meta('name','description',description);meta('name','robots',excluded?'noindex, follow':'index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1');
 for(const [name,value] of Object.entries({'og:title':pageTitle,'og:description':description,'og:url':canonical,'og:type':home?'website':'article','og:site_name':'AI 批改助手','og:locale':'zh_CN','og:image':origin+'/img/1.png','og:image:alt':'AI 批改助手在线阅卷界面','og:image:width':'2086','og:image:height':'1342'}))meta('property',name,value);
 for(const [name,value] of Object.entries({'twitter:card':'summary_large_image','twitter:title':pageTitle,'twitter:description':description,'twitter:image':origin+'/img/1.png','twitter:image:alt':'AI 批改助手在线阅卷界面'}))meta('name',name,value);
 $('link[rel="canonical"]').remove();$('head').append($('<link>').attr('rel','canonical').attr('href',canonical));
 $('html').attr('lang','zh-CN');
 $('meta[name="ai-purpose"]').remove();$('link[rel="alternate"][type="text/plain"]').attr('href',origin+'/llms.txt');
 $('script[type="application/ld+json"]').remove();
 if(excluded)return {route,title:pageTitle,description,canonical,indexable:false,schemas:[]};
 const context='https://schema.org',schemas=[];
 const webpage={'@context':context,'@type':route==='/guide/faq'?'FAQPage':'WebPage','@id':canonical+'#page',url:canonical,name:pageTitle,description,inLanguage:'zh-CN',isPartOf:{'@id':origin+'/#website'}};
 if(route==='/guide/faq')webpage.mainEntity=article.find('h3[id]').toArray().map(el=>({'@type':'Question',name:clean($(el).text()),acceptedAnswer:{'@type':'Answer',text:clean($(el).nextUntil('h2,h3').text())}})).filter(q=>q.acceptedAnswer.text);
 schemas.push(webpage);
 if(home){schemas.push({'@context':context,'@type':'WebSite','@id':origin+'/#website',name:'AI 批改助手',url:origin+'/',inLanguage:'zh-CN',potentialAction:{'@type':'SearchAction',target:{'@type':'EntryPoint',urlTemplate:origin+'/?q={search_term_string}'},'query-input':'required name=search_term_string'}});schemas.push({'@context':context,'@type':'SoftwareApplication',name:'AI 批改助手',url:origin+'/',description,applicationCategory:'EducationalApplication',operatingSystem:'浏览器（Tampermonkey）',isAccessibleForFree:true,license:'https://github.com/five-plus-one/AI-Marker-Suite/blob/stable/LICENSE',author:{'@type':'Organization',name:'5plus1',url:'https://five-plus-one.com'},screenshot:origin+'/img/1.png'})}
 else {const group=groups.find(g=>(base+route.slice(1)).startsWith(g.prefix));const crumbs=[{name:'首页',item:origin+'/'}];if(group&&route!==group.prefix.slice(base.length-1))crumbs.push({name:group.label,item:origin+group.prefix.slice(base.length-1)});crumbs.push({name:clean(title),item:canonical});schemas.push({'@context':context,'@type':'BreadcrumbList',itemListElement:crumbs.map((c,i)=>({'@type':'ListItem',position:i+1,...c}))})}
 if(route==='/guide/installation'){schemas.push({'@context':context,'@type':'HowTo',name:clean(title),url:canonical,description,step:article.find('h2[id]').toArray().filter(el=>/第[一二三]步/.test($(el).text())).map(el=>({'@type':'HowToStep',name:clean($(el).text()),url:canonical+'#'+$(el).attr('id'),text:clean($(el).nextUntil('h2').text())}))})}
 for(const schema of schemas)$('head').append($('<script>').attr('type','application/ld+json').text(JSON.stringify(schema).replaceAll('<','\\u003c')));
 return {route,title:pageTitle,description,canonical,indexable:true,schemas:schemas.map(s=>s['@type'])};
}
