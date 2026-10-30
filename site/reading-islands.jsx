import React,{useEffect,useRef,useState} from 'react';
import {createRoot} from 'react-dom/client';
import {DocumentationSearch,Button} from '@fiveplusone/ui/app-surfaces';
import '@fiveplusone/ui/app-surfaces.css';

function SharedSearch(){
 const [open,setOpen]=useState(false),[entries,setEntries]=useState(null),[error,setError]=useState(false),trigger=useRef(null);
 const [initialQuery]=useState(()=>new URLSearchParams(location.search).get('q')||'');
 const load=()=>{setError(false);if(!entries)fetch(import.meta.env.BASE_URL+'search.json').then(r=>{if(!r.ok)throw Error('Search unavailable');return r.json()}).then(setEntries).catch(()=>setError(true))};
 const show=()=>{setOpen(true);load()};
 useEffect(()=>{if(initialQuery)show()},[]);
 useEffect(()=>{document.documentElement.classList.add('fp-search-ready');const key=e=>{if((e.ctrlKey||e.metaKey)&&e.key.toLowerCase()==='k'){e.preventDefault();e.stopImmediatePropagation();show()}};window.addEventListener('keydown',key,true);return()=>{document.documentElement.classList.remove('fp-search-ready');window.removeEventListener('keydown',key,true)}},[entries]);
 const close=()=>{setOpen(false);trigger.current?.focus()};
 return <><button ref={trigger} className="fp-docs-search-trigger" onClick={show} aria-label="搜索文档" data-fp-tooltip="搜索文档 · Ctrl/⌘ K"><svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true"><circle cx="10.5" cy="10.5" r="6.5"/><path d="m16 16 5 5"/></svg><span>搜索文档</span><kbd>Ctrl K</kbd></button><DocumentationSearch open={open} onClose={close} entries={entries||[]} loading={!entries&&!error} error={error} onRetry={load} initialQuery={initialQuery}/></>;
}
function ReadingActions(){
 const [state,setState]=useState(''),[minutes,setMinutes]=useState(1);
 useEffect(()=>{setMinutes(Math.max(1,Math.ceil((document.querySelector('.vp-doc')?.textContent.length||0)/500)))},[]);
 const copy=async()=>{try{await navigator.clipboard.writeText(location.href);setState('已复制')}catch{setState('复制失败，请重试')}};
 return <><span>约 {minutes} 分钟阅读</span><Button variant="ghost" onClick={copy} data-fp-tooltip="复制当前页面链接">{state||'复制链接'}</Button><span role="status" className="fp-sr-only">{state}</span></>;
}
export function mountSharedSearch(host){const root=createRoot(host);root.render(<SharedSearch/>);return root}
export function mountReadingActions(host){const root=createRoot(host);root.render(<ReadingActions/>);return root}
