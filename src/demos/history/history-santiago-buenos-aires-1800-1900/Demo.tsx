"use client";
import {useEffect,useId,useReducer,useRef,useState,type Dispatch} from "react";
import {Lesson,type StageContext} from "@/kit/Lesson";
import {Control} from "@/kit/controls";
import {DOCUMENTS,REQUIRED,PREDICTION,REVEAL,PROVENANCE,CONTEXT,initialState,transition,type Action,type State} from "./model";
import s from "./styles.module.css";
function Stage({ctx,state,dispatch,open,onSources,onDismiss,paneId}:{ctx:StageContext;state:State;dispatch:Dispatch<Action>;open:boolean;onSources:()=>void;onDismiss:()=>void;paneId:string}){
 const credited=useRef(new Set<string>());const previousPhase=useRef(ctx.phase);
 useEffect(()=>{if(ctx.locked){credited.current.clear();dispatch({type:"restart"});onDismiss();}},[ctx.locked,dispatch,onDismiss]);
 useEffect(()=>{if(previousPhase.current!==ctx.phase){onDismiss();previousPhase.current=ctx.phase;}},[ctx.phase,onDismiss]);
 const select=(id:string)=>{if(ctx.locked)return;dispatch({type:"select",id});if(REQUIRED.includes(id)&&!credited.current.has(id)){credited.current.add(id);ctx.interact();}};
 const loaded=!ctx.locked&&state.loaded.length>0;
 return <div className={s.frame}>
 {loaded?<div className={s.evidence}>{DOCUMENTS.filter(d=>state.loaded.includes(d.id)).map(d=><div key={d.id} className={s.evidenceRow} data-active={state.active===d.id} data-claim={d.claims.join(" ")}><span className={s.datum}>{d.label} {d.display}</span>{CONTEXT[d.id]&&<> <span className={s.context} data-claim={`context.${d.id}`}>{CONTEXT[d.id]}</span></>}</div>)}{PROVENANCE&&<p className={s.provenance} data-claim="provenance">{PROVENANCE}</p>}</div>:<div className={s.pending} aria-hidden="true"/>}
 <div className={s.actions}>{DOCUMENTS.map((d,index)=><Control key={d.id} className={s.tile} disabled={ctx.locked||state.active===d.id} aria-pressed={!ctx.locked&&state.active===d.id} aria-label={ctx.locked?`Record ${index+1}, locked`:`Record ${index+1}: ${d.label}`} onClick={()=>select(d.id)}>{index+1}</Control>)}<Control className={s.sourceControl} disabled={ctx.locked} aria-expanded={open} aria-controls={paneId} onClick={onSources}>{open?"Close":"Sources"}</Control><Control className={s.resetControl} disabled={ctx.locked||(state.active===null&&!open)} onClick={()=>{dispatch({type:"reset"});onDismiss();}}>Reset</Control></div>
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
 {open&&<section id={paneId} className={s.sources} aria-labelledby={`${paneId}-heading`} onKeyDown={e=>{if(e.key==="Escape"){e.preventDefault();close();}}}><h2 id={`${paneId}-heading`} tabIndex={-1} ref={heading}>Sources and scope</h2><button type="button" onClick={close}>Close sources</button><p data-claim="source.provinces">{"1816: MJP French edition; Buenos Aires linked through earlier junta in editorial context. "}<a href={"https://mjp.univ-perp.fr/constit/ar1816.htm"} target="_blank" rel="noreferrer">{"United Provinces — source, lines 45–45"}</a>{" "}<a href={"https://mjp.univ-perp.fr/constit/ar1816.htm"} target="_blank" rel="noreferrer">{"Tucumán — source, lines 35–35"}</a>{" "}</p><p data-claim="source.chile">{"1818: MJP French edition; 1 January textual date distinct from 21 February publication date The act orders Santiago deposit; performance/custody is not established.. "}<a href={"https://mjp.univ-perp.fr/constit/cl1818.htm"} target="_blank" rel="noreferrer">{"Chile — source, lines 68–68"}</a>{" "}<a href={"https://mjp.univ-perp.fr/constit/cl1818.htm"} target="_blank" rel="noreferrer">{"Santiago deposit ordered — source, lines 82–83"}</a>{" "}</p><p data-claim="asset-boundary">Original nongeographic schematic and own English factual summaries; no source image or official translation. Selected documentary relations do not establish current borders or residents’ consent.</p></section>}</div>;
}
