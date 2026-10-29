import React,{useEffect,useState} from 'react';
import {MarkerLogo,DocumentationLayout,DocumentationCards,ThemeToggle,TooltipProvider,ButtonLink,Button,DocumentationSearch,ProductStatementHero,ProductEditorialSection,ProductEditorialSections} from '@fiveplusone/ui/app-surfaces';
import '@fiveplusone/ui/app-surfaces.css';
import './site.css';
export function App({page,groups,base}){
 const [dark,setDark]=useState(false),[query,setQuery]=useState(''),[index,setIndex]=useState(null),[searchError,setSearchError]=useState(false);
 const [searchOpen,setSearchOpen]=useState(false);
 useEffect(()=>{const initialQuery=new URLSearchParams(location.search).get('q');if(initialQuery){setQuery(initialQuery);loadSearch()}const value=localStorage.getItem('marker-docs-theme');const next=value?value==='dark':matchMedia('(prefers-color-scheme: dark)').matches;setDark(next);document.documentElement.dataset.theme=next?'dark':'light';document.documentElement.style.colorScheme=next?'dark':'light';const key=e=>{if((e.ctrlKey||e.metaKey)&&e.key==='k'){e.preventDefault();document.querySelector('button[aria-label="搜索文档"]')?.click()}};window.addEventListener('keydown',key);return()=>window.removeEventListener('keydown',key)},[]);
 const toggle=next=>{setDark(next);document.documentElement.dataset.theme=next?'dark':'light';document.documentElement.style.colorScheme=next?'dark':'light';localStorage.setItem('marker-docs-theme',next?'dark':'light')};
 const loadSearch=()=>{setSearchOpen(true);setSearchError(false);if(!index)fetch(base+'search.json').then(r=>{if(!r.ok)throw Error();return r.json()}).then(setIndex).catch(()=>setSearchError(true))};
 const nav=[['快速上手','guide/'],['配置','config/'],['批改模式','modes/'],['平台','platforms/'],['进阶','advanced/'],['帮助','support']];
 const home=page.path==='/';const platform=page.path==='/platforms/';
 const platformItems=groups.find(g=>g.label==='支持平台')?.links.filter(l=>l.label!=='概述')||[];
 return <TooltipProvider><DocumentationLayout brand={<a href={base}><MarkerLogo size={32} decorative/>AI 批改助手</a>} navigation={nav.map(([label,path])=><a key={path} href={base+path}>{label}</a>)} actions={<><Button variant="ghost" onClick={loadSearch} aria-label="搜索文档" data-fp-tooltip="搜索文档 · Ctrl/⌘ K">搜索</Button><ThemeToggle dark={dark} onChange={toggle}/></>} groups={groups} currentPath={page.url} outline={platform?[]:page.outline} wide={home} footer={<><a href="https://five-plus-one.com">五加一</a><a href={base+'changelog'}>更新日志</a><a href={base+'tools'}>实用工具</a><a href="https://github.com/five-plus-one/AI-Marker-Suite">GitHub</a><p><a href="https://beian.miit.gov.cn/">苏ICP备2025155286号-1</a> · <a href="https://beian.mps.gov.cn/">苏公网安备32060202002665号</a></p><p>© 2026 5plus1 · 雨云提供云计算服务 · 又拍云提供文件下载 CDN 加速服务</p></>}>
 {page.path==='/404'?<article className="fp-docs-prose"><h1>未找到这个页面</h1><p>请检查地址，或搜索你需要的文档。</p><ButtonLink href={base}>返回首页</ButtonLink></article>:home?<Home base={base}/>:platform?<><article className="fp-docs-prose"><h1>支持平台</h1><p>查找你的阅卷平台，打开对应指南了解使用步骤。</p></article><DocumentationCards label="查找阅卷平台" items={platformItems}/></>:<><article className="fp-docs-prose" dangerouslySetInnerHTML={{__html:page.html}}/>{page.path==='/changelog'&&<ReleaseNotes base={base}/>}<div className="marker-edit"><a href={'https://github.com/five-plus-one/AI-Marker-Suite-Docs/edit/main/'+page.source}>在 GitHub 上编辑此页</a></div></>}
 </DocumentationLayout><DocumentationSearch open={searchOpen} onClose={()=>setSearchOpen(false)} entries={index||[]} loading={!index&&!searchError} error={searchError} onRetry={loadSearch} initialQuery={query}/></TooltipProvider>
}
function ReleaseNotes(){const [notes,setNotes]=useState(null),[error,setError]=useState(false);const load=()=>{setError(false);Promise.all(['https://auto-update.aimarking.five-plus-one.com/ota/manifest.json','https://auto-update.aimarking.five-plus-one.com/ota/preview/manifest.json'].map(url=>fetch(url).then(r=>{if(!r.ok)throw Error();return r.json()}))).then(setNotes).catch(()=>setError(true))};useEffect(load,[]);return <section className="fp-docs-prose">{error?<><p role="alert">更新日志暂时无法加载。</p><Button onClick={load}>重试</Button></>:!notes?<p role="status">正在读取更新日志…</p>:notes.map((n,i)=><section key={i}><h2>{i?'预览版':'稳定版'} · {n.version}</h2>{Object.entries(n.changelog||{}).sort(([a],[b])=>b.localeCompare(a,undefined,{numeric:true})).map(([v,items],j)=><details key={v} open={j===0}><summary>v{v} {n.changelogDates?.[v]}</summary><ul>{items.map((t,k)=><li key={k}>{t}</li>)}</ul></details>)}</section>)}</section>}

export {MarkerLogo};

function Home({base}){return <>
<ProductStatementHero eyebrow="Open source grading assistant" title="AI 批改助手" statement="让 AI 替你改卷" pattern="AI MARKER" description="基于多模态 AI 的在线阅卷自动批改工具，支持主流阅卷平台、双评仲裁、分小题评分与批改历史，适合日常批改和大批量试卷处理。" actions={<><ButtonLink href={base+'guide/installation'}>安装教程</ButtonLink><ButtonLink variant="secondary" href={base+'guide/quickstart'}>快速上手</ButtonLink><ButtonLink variant="secondary" href="https://github.com/five-plus-one/AI-Marker-Suite">GitHub</ButtonLink></>} meta={<><span>多平台</span><span>双评仲裁</span><span>批改历史</span><span>开源免费</span></>}/>
<ProductEditorialSections>
    <ProductEditorialSection kind="split">
      <div>
        <p className="fp-editorial-kicker">Why it matters</p>
        <h2>为什么你需要它？</h2>
        <p className="fp-editorial-lead">
          把重复、耗时、容易疲劳的主观题批改流程交给脚本处理，老师只需要把控评分标准与关键结果。
        </p>
      </div>

      <div className="fp-editorial-pain-grid">
        {comparisons.map(item=><div key={item.pain} className="fp-editorial-pain-card">
          <span>{item.pain}</span>
          <strong>{item.answer}</strong>
        </div>)}
      </div>
    </ProductEditorialSection>

    <ProductEditorialSection>
      <div className="fp-editorial-section-head">
        <div>
          <p className="fp-editorial-kicker">Modes</p>
          <h2>四种模式，按需选择</h2>
        </div>
        <p>从首次试改到夜间批量挂机，再到高精度双评仲裁，按照风险和效率切换工作方式。</p>
      </div>

      <div className="fp-editorial-mode-grid">
        {modes.map(mode=><article key={mode.name} className="fp-editorial-mode-card">
          <span>{mode.index}</span>
          <h3>{mode.name}</h3>
          <p>{mode.description}</p>
          <ul>
            {mode.points.map(point=><li key={point}>{point}</li>)}
          </ul>
        </article>)}
      </div>
    </ProductEditorialSection>

    <ProductEditorialSection kind="community">
      <div>
        <p className="fp-editorial-kicker">Community</p>
        <h2>加入交流群</h2>
        <p className="fp-editorial-lead">遇到问题、想分享使用经验，欢迎加入社群交流。</p>
      </div>

      <div className="fp-editorial-link-grid">
        <a href="https://r-l.ink/s/L9Akf">微信交流群</a>
        <a href="https://r-l.ink/s/WbMrR">QQ 交流群</a>
      </div>
    </ProductEditorialSection>

    <ProductEditorialSection kind="support">
      <div className="fp-editorial-support-main">
        <p className="fp-editorial-kicker">Support</p>
        <h2>支持这个项目继续走下去</h2>
        <p className="fp-editorial-lead">
          如果 AI 批改助手帮你少熬了一点夜、少做了一点重复劳动，欢迎用赞赏、转发或反馈支持它继续更新。
        </p>

        <div className="fp-editorial-story">
          <p>
            这两天我才真正意识到：做出一个功能，和把它交到真实用户手里，是完全不同的两件事。
          </p>
          <p>
            一个真正有用的工具，还需要文档、教程、反馈、稳定性和问题排查。很多看起来很小的改动，背后对应的都是老师们真实使用时遇到的问题。
          </p>
          <p>
            AI 像一根杠杆，把一个普通人的行动半径突然放大；表达也是一根杠杆，让工具被真正需要它的人看到。
          </p>
          <p>
            改变世界不一定从很大的事情开始，也可能只是先帮一个老师少盯一会儿屏幕，少做一点重复劳动。它很小，但它是真的。
          </p>
          <p className="fp-editorial-story__ending">世界不死，理想不灭。我想继续试试看。</p>
        </div>

        <a className="fp-editorial-story-link" href="https://v8515M.rk.r-l.ink/common/channel/redirect/?cid=569019">
          了解幕后故事
        </a>
      </div>

      <aside className="fp-editorial-donate-card" aria-label="赞赏信息">
        <h3>赞赏支持</h3>
        <p>你的支持会变成继续适配平台、维护文档和处理反馈的动力。</p>
        <div className="fp-editorial-donate-grid">
          <figure>
            <a href="https://r-l.ink/paywx1" target="_blank" rel="noopener noreferrer" aria-label="查看微信赞赏二维码大图"><img src="https://r-l.ink/paywx1" alt="微信赞赏二维码" loading="lazy" /></a>
            <figcaption>微信赞赏</figcaption>
          </figure>
          <figure>
            <a href="https://r-l.ink/payzfb1" target="_blank" rel="noopener noreferrer" aria-label="查看支付宝赞赏二维码大图"><img src="https://r-l.ink/payzfb1" alt="支付宝赞赏二维码" loading="lazy" /></a>
            <figcaption>支付宝赞赏</figcaption>
          </figure>
        </div>
      </aside>
    </ProductEditorialSection>

    <ProductEditorialSection kind="links">
      <div>
        <p className="fp-editorial-kicker">Links</p>
        <h2>友情链接</h2>
      </div>

      <div className="fp-editorial-link-grid">
        <a href="https://five-plus-one.com/">五加一的星空</a>
        <a href="https://api.ai.five-plus-one.com/">5+1API</a>
      </div>
    </ProductEditorialSection>
  </ProductEditorialSections>
</>}

const comparisons = [
  {
    pain: '一份主观题看 2~3 分钟',
    answer: 'AI 自动评分，生成分数和评语',
  },
  {
    pain: '改到半夜眼睛酸',
    answer: '无人值守模式，挂机自动批改',
  },
  {
    pain: '评分标准难统一',
    answer: '按同一套评分标准稳定执行',
  },
  {
    pain: '每道题都要手动输分',
    answer: '识别、打分、填入、提交自动完成',
  },
  {
    pain: '改完想回看某份试卷',
    answer: '评阅历史可回看并导出报告',
  },
]

const modes = [
  {
    index: '01',
    name: '普通模式',
    description: '适合日常少量批改。提交前保留确认机会，方便随时暂停或取消。',
    points: ['5 秒倒计时提交', '弹窗提示错误', '支持分数纠错'],
  },
  {
    index: '02',
    name: '试改模式',
    description: '适合首次使用和调优评分标准。先观察 AI 评分，再确认提交。',
    points: ['等待教师确认', '便于观察评分依据', '支持分数纠错'],
  },
  {
    index: '03',
    name: '无人值守模式',
    description: '适合大批量试卷和夜间挂机。流程稳定后，用它把重复动作交给脚本。',
    points: ['1 秒自动提交', '瞬态错误自动退避重试', '适合批量处理'],
  },
  {
    index: '04',
    name: '双评模式',
    description: '适合高精度要求的场景。两个模型独立评分，分差超阈值自动触发第三模型仲裁。',
    points: ['双模型独立评分', '超阈值自动仲裁', '结果更可靠'],
  },
]
