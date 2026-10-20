"use client";
import {useEffect,useReducer,useRef,useState,type Dispatch} from 'react';
import {Lesson,type StageContext} from '@/kit/Lesson';
import {Control} from '@/kit/controls';
import {lessonData as data} from './data';
import {initialState,transition,visibleColumns,RECORDS,type State,type Action,type DocumentId} from './model';
import { HistoryLocator } from "@/components/history/HistoryLocator";
import s from './styles.module.css';
function DocumentaryStage({ctx,state,dispatch,open,setOpen,onSources,sourceId}:{ctx:StageContext;state:State;dispatch:Dispatch<Action>;open:boolean;setOpen:Dispatch<boolean>;onSources:()=>void;sourceId:string}){
 const earned=useRef(new Set<DocumentId>()); const phase=useRef(ctx.phase);
 useEffect(()=>{if(ctx.locked){earned.current.clear();dispatch({type:'restart'});setOpen(false);}},[ctx.locked,dispatch,setOpen]);
 useEffect(()=>{if(phase.current!==ctx.phase){phase.current=ctx.phase;setOpen(false);}},[ctx.phase,setOpen]);
 const cols=visibleColumns(state,ctx.locked);
 function select(id:DocumentId){const next=transition(state,{type:'select',id});dispatch({type:'select',id});for(const witness of next.earned)if(!earned.current.has(witness)){earned.current.add(witness);ctx.interact();}}
 return <div className={`${s.frame} ${open?s.sourcesActive:''}`}>
 <HistoryLocator slug="history-warsaw-krakow-1700-1920" places={["Warsaw", "Kraków"]} /><div className={s.dates}>{RECORDS.map(doc=><Control key={doc.id} disabled={ctx.locked||state.focus===doc.id} aria-pressed={!ctx.locked&&state.focus===doc.id} onClick={()=>select(doc.id)}>{doc.label}</Control>)}</div>
 <div className={s.columns}>{RECORDS.map((doc,i)=>{const r=cols[doc.id];return <div key={doc.id} className={s.record} data-selected={!ctx.locked&&state.focus===doc.id} data-kind="branch">
 {!r?<div className={s.empty} aria-label="Unvisited document"><svg viewBox="0 0 64 32" aria-hidden="true"><rect x="6" y="2" width="52" height="28" rx="3" fill="none" stroke="var(--line)"/><path d="M18 12h28M18 20h28" stroke="var(--line)" strokeDasharray="3 3"/></svg></div>:<><svg viewBox="0 0 126 17" className={s.drawing} aria-hidden="true"><path d="M8 8h27m0 0 17-6m-17 6 17 6 M78 8h40" fill="none" stroke="currentColor" strokeDasharray={undefined} /></svg>{r.fields.map(f=><p key={f.address} className={s.field} data-claim={f.claim}>{f.text}</p>)}</>}

 {!ctx.locked&&r&&i===0&&data.qualifiers.map(q=><p className={s.qualifier} key={q}>{q}</p>)}
 </div>})}</div>
 <div className={s.actions}><Control disabled={ctx.locked} aria-expanded={open} aria-controls={sourceId} aria-label={open?'Close sources':'Open sources'} onClick={onSources}>{open?'Close':'Sources'}</Control><Control disabled={ctx.locked||state.focus===null} onClick={()=>{dispatch({type:'reset'});setOpen(false);}}>Reset</Control><svg className={s.sourceMark} viewBox="0 0 20 20" aria-hidden="true"><path d={open?'M2 4h8l7 5v8H2z M10 4v6h7':'M4 3h12v14H4z M7 7h6M7 11h6'} fill="none" stroke="currentColor"/></svg></div></div>;
}
export default function Demo({slug}:{slug:string}){
 const [state,dispatch]=useReducer(transition,undefined,initialState);const [open,setOpen]=useState(false);const heading=useRef<HTMLHeadingElement>(null);const opener=useRef<HTMLElement|null>(null);
 useEffect(()=>{if(!open)return;heading.current?.focus();const escape=(event:KeyboardEvent)=>{if(event.key==='Escape'){event.stopPropagation();setOpen(false);requestAnimationFrame(()=>{const el=opener.current;if(el?.isConnected&&el.getClientRects().length)el.focus();});}};document.addEventListener('keydown',escape);return()=>document.removeEventListener('keydown',escape);},[open]);
 function close(){setOpen(false);requestAnimationFrame(()=>{const el=opener.current;if(el?.isConnected&&el.getClientRects().length)el.focus();});}
 return <div className={s.root}><Lesson slug={slug} minInteractions={2} predict={{...data.prediction,options:[...data.prediction.options]}} exploreHint="Open both records; compare their fields." reveal={()=><p className={s.reveal}>{data.reveal}</p>}>
 {ctx=><DocumentaryStage sourceId={`${slug}-sources-pane`} ctx={ctx} state={state} dispatch={dispatch} open={open} setOpen={setOpen} onSources={()=>{if(open){close();return;}opener.current=document.activeElement instanceof HTMLElement?document.activeElement:null;setOpen(true);}}/>}</Lesson>
 <div className={s.sr} role="status" aria-live="polite">{state.focus?state.columns[state.focus]?.fields.map(f=>f.text).join('; '):state.earned.length?'Selection cleared; documentary records retained.':''}</div>
 {open&&<section id={`${slug}-sources-pane`} className={s.sources} aria-labelledby={`${slug}-sources`} onKeyDown={e=>{if(e.key==='Escape'){e.stopPropagation();close();}}}><h2 ref={heading} tabIndex={-1} id={`${slug}-sources`}>Sources and scope</h2><button type="button" onClick={close}>Close sources</button>
 <p>{data.commonNotice}</p><p>{data.provenance}</p>{data.sources.map(source=><p key={source.id}><a href={source.url} target="_blank" rel="noreferrer">{source.id} · {source.maker}</a>. Custodian/editor: {source.custodian}. {source.type}. {source.language}. Locator: {source.locator}. Accessed {source.accessed}. Acquisition/scope: {source.limitation}</p>)}<p>{data.credit}</p>{data.links.map((link:{url:string;label:string})=><p key={link.url}><a href={link.url} target="_blank" rel="noreferrer">{link.label}</a></p>)}</section>}</div>;
}
