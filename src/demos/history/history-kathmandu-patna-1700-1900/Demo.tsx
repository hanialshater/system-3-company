"use client";
import {useEffect,useId,useReducer,useRef,useState,type CSSProperties,type Dispatch} from "react";
import {Lesson,type StageContext} from "@/kit/Lesson";
import {Control} from "@/kit/controls";
import {DOCUMENTS,REQUIRED,PREDICTION,REVEAL,PROVENANCE,RELATION,CONTEXT,initialState,transition,type Action,type State} from "./model";
import { HistoryLocator } from "@/components/history/HistoryLocator";
import s from "./styles.module.css";
function Stage({ctx,state,dispatch,open,onSources,onDismiss,paneId}:{ctx:StageContext;state:State;dispatch:Dispatch<Action>;open:boolean;onSources:()=>void;onDismiss:()=>void;paneId:string}){
 const credited=useRef(new Set<string>());const previousPhase=useRef(ctx.phase);
 useEffect(()=>{if(ctx.locked){credited.current.clear();dispatch({type:"restart"});onDismiss();}},[ctx.locked,dispatch,onDismiss]);
 useEffect(()=>{if(previousPhase.current!==ctx.phase){onDismiss();previousPhase.current=ctx.phase;}},[ctx.phase,onDismiss]);
 const select=(id:string)=>{if(ctx.locked)return;dispatch({type:"select",id});if(REQUIRED.includes(id)&&!credited.current.has(id)){credited.current.add(id);ctx.interact();}};
 const loaded=!ctx.locked&&state.loaded.length>0;
 return <div className={s.frame}>
 <HistoryLocator slug="history-kathmandu-patna-1700-1900" places={["Kathmandu", "Patna"]} />
 <div className={s.tiles} style={{"--columns":DOCUMENTS.length===4?2:DOCUMENTS.length} as CSSProperties}>
 {DOCUMENTS.map((d,index)=>{const seen=!ctx.locked&&state.loaded.includes(d.id);return <Control key={d.id} className={s.tile} disabled={ctx.locked||state.active===d.id} aria-pressed={!ctx.locked&&state.active===d.id} aria-label={ctx.locked?`Record ${index+1}, locked`:undefined} onClick={()=>select(d.id)}><span>{ctx.locked?`Record ${index+1}`:d.label}</span>{seen&&DOCUMENTS.length===4&&<span className={s.datum} data-claim={d.claims.join(" ")}>{d.display}</span>}</Control>;})}</div>
 {loaded?<>{DOCUMENTS.length!==4&&<div className={s.evidence}>{DOCUMENTS.filter(d=>state.loaded.includes(d.id)).map(d=><div key={d.id} className={s.evidenceRow} data-active={state.active===d.id} data-claim={d.claims.join(" ")}><span className={s.datum}>{d.display}</span>{CONTEXT[d.id]&&<span className={s.context} data-claim={`context.${d.id}`}>{CONTEXT[d.id]}</span>}</div>)}</div>}<svg viewBox="0 0 300 12" className={s.relation} aria-hidden="true"><path d={RELATION} fill="none" stroke="var(--muted)" strokeWidth="1.5"/></svg><p className={s.provenance} data-claim="provenance">{PROVENANCE}</p>{DOCUMENTS.length===4&&Object.entries(CONTEXT).filter(([id])=>state.loaded.includes(id)).map(([id,text])=><p key={id} className={s.context} data-claim={`context.${id}`}>{text}</p>)}</>:<div className={s.pending} aria-hidden="true"/>}
 <div className={s.actions}><Control disabled={ctx.locked} aria-expanded={open} aria-controls={paneId} onClick={onSources}>{open?"Close":"Sources"}</Control><Control disabled={ctx.locked||(state.active===null&&!open)} onClick={()=>{dispatch({type:"reset"});onDismiss();}}>Reset</Control></div>
 </div>;
}
export default function Demo({slug}:{slug:string}){
 const[state,dispatch]=useReducer(transition,undefined,initialState);const[open,setOpen]=useState(false);const opener=useRef<HTMLElement|null>(null);const heading=useRef<HTMLHeadingElement>(null);const uid=useId();const paneId=`history-sources-${uid}`;
 const dismiss=useRef(()=>setOpen(false)).current;
 useEffect(()=>{if(open)heading.current?.focus();},[open]);
 const close=()=>{setOpen(false);requestAnimationFrame(()=>{if(opener.current?.isConnected)opener.current.focus();});};
 const sources=()=>{if(open){close();return;}opener.current=document.activeElement instanceof HTMLElement?document.activeElement:null;setOpen(true);};
 return <div className={s.root}><Lesson slug={slug} minInteractions={REQUIRED.length} predict={PREDICTION} exploreHint="Open each record and compare its evidence." reveal={()=><p data-claim="reveal">{REVEAL}</p>}>{ctx=><Stage ctx={ctx} state={state} dispatch={dispatch} open={open} onSources={sources} onDismiss={dismiss} paneId={paneId}/>}</Lesson>
 <span className={s.sr} role="status" aria-live="polite">{state.active?DOCUMENTS.find(d=>d.id===state.active)?.display:state.loaded.length?"Selection cleared; loaded evidence retained.":""}</span>
 {open&&<section id={paneId} className={s.sources} aria-labelledby={`${paneId}-heading`} onKeyDown={e=>{if(e.key==="Escape"){e.preventDefault();close();}}}><h2 id={`${paneId}-heading`} tabIndex={-1} ref={heading}>Sources and scope</h2><button type="button" onClick={close}>Close sources</button><p data-claim="source.patna">{"Patna: British Library India Office catalogue, not unseen council instructions or full Bengal/Bihar legal hierarchy. "}<a href={"https://searcharchives.bl.uk/catalog/036-000177185"} target="_blank" rel="noreferrer">{"Revenue council — source, lines 38–38"}</a>{" "}</p><p data-claim="source.treaty">{"Sugauli: High Court Sikkim modern English edition, compiler Yangchen Doma Gyatso; courtesy Namgyal Institute; not original Nepal manuscript or modern boundary adjudication. "}<a href={"https://museum.hcs.gov.in/flip/mobile/javascript/search_config.js"} target="_blank" rel="noreferrer">{"Kali–Rapti lowlands — source, lines 1–1"}</a>{" "}<a href={"https://museum.hcs.gov.in/flip/mobile/javascript/search_config.js"} target="_blank" rel="noreferrer">{"Nepal; East India Company — source, lines 1–1"}</a>{" "}<a href={"https://museum.hcs.gov.in/flip/mobile/javascript/search_config.js"} target="_blank" rel="noreferrer">{"2 December 1815; exchange 4 March 1816 — source, lines 1–1"}</a>{" "}</p><p data-claim="asset-boundary">Original nongeographic schematic and own English factual summaries; no source image or official translation. Selected documentary relations do not establish current borders or residents’ consent.</p></section>}</div>;
}
