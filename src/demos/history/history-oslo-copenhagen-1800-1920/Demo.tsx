"use client";
import {useEffect,useReducer,useRef,useState,type Dispatch} from 'react';
import {Lesson,type StageContext} from '@/kit/Lesson';
import {Control} from '@/kit/controls';
import {initialState,transition,visibleColumns,type State,type Action,type DateId} from './model';
import s from './styles.module.css';
const nov='https://www.stortinget.no/globalassets/pdf/stortingsarkivet/overordentlig-storting-1814/01_protokoll_stortinget.pdf';
const june='https://stortinget.no/no/Stortinget-og-demokratiet/Historikk/stortinget-og-unionen-med-sverige/ut-av-unionen/ordenes-makt--revolusjon-med-blyant/';
function Stage({ctx,state,dispatch,open,onSources,setSourcesOpen}:{ctx:StageContext;state:State;dispatch:Dispatch<Action>;open:boolean;onSources:()=>void;setSourcesOpen:Dispatch<boolean>}){
 const seen=useRef(new Set<string>());
 useEffect(()=>{if(ctx.locked){seen.current.clear();dispatch({type:'restart'});setSourcesOpen(false);}},[ctx.locked,dispatch,setSourcesOpen]);
 const cols=visibleColumns(state,ctx.locked);
 const select=(date:DateId)=>{const next=transition(state,{type:'select',date});dispatch({type:'select',date});for(const m of next.earned)if(!seen.current.has(m)){seen.current.add(m);ctx.interact();}};
 return <div className={s.frame}>
 <div className={s.dates}><span/>{(['nov1814','jun1905'] as DateId[]).map((date,i)=><Control key={date} disabled={ctx.locked||state.focus===date} aria-pressed={!ctx.locked&&state.focus===date} onClick={()=>select(date)}>{i===0?'Nov1814':'Jun1905'}</Control>)}</div>
 <svg viewBox="0 0 340 170" width="340" height="170" className={s.diagram} role="group" aria-label={ctx.locked?'Document frame, not opened':'Selected official document fields'}>
 <text x="2" y="44" className={s.label}>King</text><text x="2" y="108" className={s.label}>Constitution</text>
 {(['nov1814','jun1905'] as DateId[]).map((date,i)=>{const x=72+i*133,r=cols[date];return <g key={date}><rect x={x} y="3" width="128" height="162" rx="7" fill="none" stroke={state.focus===date&&!ctx.locked?'var(--fg)':'var(--line)'} strokeWidth={state.focus===date&&!ctx.locked?2:1}/>{!r?<g><title>Unvisited document</title><path d={`M${x+33} 43 h62 M${x+33} 106 h62`} stroke="var(--muted)" strokeDasharray="4 4"/></g>:<>
 <text x={x+64} y="34" textAnchor="middle" className={s.value} data-claim={r.kingClaim}>{date==='nov1814'?<><tspan x={x+64}>Shared with</tspan><tspan x={x+64} dy="15">Sweden</tspan></>:<><tspan x={x+64}>Storting declares</tspan><tspan x={x+64} dy="15">union dissolved</tspan></>}</text>
 <text x={x+64} y="95" textAnchor="middle" className={s.value} data-claim={r.constitutionClaim}>{date==='nov1814'?<><tspan x={x+64}>Revised</tspan><tspan x={x+64} dy="15">4 November 1814</tspan></>:<><tspan x={x+64}>Invoked by</tspan><tspan x={x+64} dy="15">resolution</tspan></>}</text>
 {r.qualifier&&<text x={x+64} y="141" textAnchor="middle" className={s.qualifier} data-claim="history.history-oslo-copenhagen-1800-1920.c5"><tspan x={x+64}>Declaration,</tspan><tspan x={x+64} dy="14">not recognition</tspan></text>}</>}</g>;})}
 </svg><p className={s.caption}>Selected official documents</p><div className={s.actions}><Control disabled={ctx.locked} aria-expanded={open} aria-controls="oslo-sources-pane" aria-label={open?'Close sources':'Open sources'} onClick={onSources}>{open?'Close':'Sources'}</Control><Control disabled={ctx.locked||state.focus===null} onClick={()=>dispatch({type:'reset'})}>Reset</Control></div></div>;
}
export default function Demo({slug}:{slug:string}){
 const [state,dispatch]=useReducer(transition,undefined,initialState);const [open,setOpen]=useState(false);const heading=useRef<HTMLHeadingElement>(null);const opener=useRef<HTMLElement|null>(null);
 useEffect(()=>{if(open)heading.current?.focus();},[open]);
 const close=()=>{setOpen(false);requestAnimationFrame(()=>opener.current?.isConnected&&opener.current.focus());};
 return <div className={s.root}><p className={s.orientation}>Norwegian institutions; modern city names orient the case.</p><Lesson slug={slug} minInteractions={2} predict={{question:"In November 1814, could Norway share Sweden's king and still keep its own constitution?",options:['Both could be present','Only the shared king could be present'],answer:0}} exploreHint="Open both documents; compare what each establishes." reveal={()=><><p>The November 1814 constitution describes Norway sharing a king with Sweden. A constitution and a shared monarchy could therefore coexist. The 7 June 1905 resolution declares that union dissolved; this is a declaration record, not Swedish recognition. It invokes Norway&apos;s constitution and laws, with necessary changes.</p><p>These selected official documents describe institutions, not universal voting rights, everyone&apos;s consent or the whole history of 1814.</p></>}>
 {ctx=><Stage ctx={ctx} state={state} dispatch={dispatch} open={open} setSourcesOpen={setOpen} onSources={()=>{if(open){close();return;}opener.current=document.activeElement instanceof HTMLElement?document.activeElement:null;setOpen(true);}}/>}</Lesson>
 <div className={s.sr} role="status" aria-live="polite">{state.focus?`${state.focus}: ${state.columns[state.focus]?.king}; ${state.columns[state.focus]?.constitution}. ${state.columns[state.focus]?.qualifier}`:state.earned.length?'Selection cleared; documentary evidence retained.':''}</div>
 {open&&<section id="oslo-sources-pane" className={s.sources} aria-labelledby="oslo-sources" onKeyDown={event=>{if(event.key==='Escape'){event.preventDefault();close();}}}><h2 id="oslo-sources" tabIndex={-1} ref={heading}>Sources and scope</h2><button type="button" onClick={close}>Close sources</button>
 <p>Stortinget / Stortingsarkivet. <a href={nov+'#page=83'} target="_blank" rel="noreferrer">O-NOV: Forhandlinger i det overordentlige Storting i 1814, protocol transcription</a>. Hosted proceedings transcription, PDF index82, printed83: constitutional heading (November revision date); §1 (Norway and Sweden under one king).</p>
 <p><a href={june} target="_blank" rel="noreferrer">O-JUNE: Ordenes makt – revolusjon med blyant</a>. Modern Stortinget exhibition reproducing the 7 June 1905 resolution; section “7. juni-beslutningen”, final resolution: union-dissolution clause and constitution/laws authority clause with necessary changes. The resolution authorizes provisional exercise of royal authority following the king&apos;s nonfunctioning; this is its asserted reasoning, not Swedish recognition.</p>
 <p>Sources acquired 19 October 2026 in the independent source records. Own-English factual summaries and original schematic; not an official translation. No source images reproduced.</p>
 <p><a href="https://www.stortinget.no/no/Stortinget-og-demokratiet/Galleri/bruksvilkar-stortingets-fotografier-illustrasjoner-og-videoer" target="_blank" rel="noreferrer">Storting media terms</a> restrict media use, including AI use; no covered media is used here. No blanket text licence or official endorsement is implied.</p></section>}</div>;
}
