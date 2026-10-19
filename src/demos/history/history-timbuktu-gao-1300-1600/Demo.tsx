"use client";
import {useCallback,useEffect,useLayoutEffect,useId,useReducer,useRef,useState,type Dispatch} from "react";
import {Lesson,type StageContext} from "@/kit/Lesson";
import {Control} from "@/kit/controls";
import {Sources,RecordDetails} from "./Sources";
import {REQUIRED,FRAMES,PREDICTION,REVEAL,initialState,transition,frameText,requiredContexts,canComplete,canDeliverFinal,PERIOD_DISCLOSURE,PERIOD_CLAIM,EXPLORE_HINT,type State,type Action,type Proof} from "./model";
import s from "./styles.module.css";
export function readOrdinaryProof(node:HTMLElement|null,state:State):Proof|null{
 if(!node||!node.isConnected||!state.committed||!state.frame||node.hidden||node.closest('[hidden],[aria-hidden="true"]')||node.getClientRects().length===0)return null;
 for(let a:HTMLElement|null=node;a;a=a.parentElement){const style=window.getComputedStyle(a);if(style.display==="none"||style.visibility==="hidden"||style.visibility==="collapse"||style.opacity==="0"||style.contentVisibility==="hidden")return null;}
 const box=node.getBoundingClientRect();if(box.width<=0||box.height<=0||box.top<0||box.left<0||box.right>window.innerWidth||box.bottom>window.innerHeight)return null;
 for(let a=node.parentElement;a;a=a.parentElement){const style=window.getComputedStyle(a);const bounds=a.getBoundingClientRect();if(style.overflowX!=="visible"&&style.overflowX!==""&&(box.left<bounds.left||box.right>bounds.right))return null;if(style.overflowY!=="visible"&&style.overflowY!==""&&(box.top<bounds.top||box.bottom>bounds.bottom))return null;}
 if(node.dataset.generation!==String(state.generation)||node.dataset.frame!==state.frame||node.dataset.witness!==(state.displayWitness??""))return null;
 const text=node.textContent?.replace(/\s+/g," ").trim()??"";if(text!==frameText(state.frame))return null;
 return {generation:state.generation,witness:state.displayWitness,frame:state.frame,text,contexts:state.displayWitness?requiredContexts(state.displayWitness):[],ordinaryVisible:true};
}
function Stage({ctx,state,dispatch,open,paneId,onSources,onDismiss,onDetails,onReset,onPhase}:{ctx:StageContext;state:State;dispatch:Dispatch<Action>;open:boolean;paneId:string;onSources:()=>void;onDismiss:()=>void;onDetails:(id:string)=>void;onReset:(owner:HTMLElement)=>void;onPhase:(phase:StageContext["phase"])=>void}){
 const credited=useRef(new Set<string>());const frameNode=useRef<HTMLParagraphElement>(null);
 useEffect(()=>{if(ctx.locked){credited.current.clear();dispatch({type:"restart"});onDismiss();}else dispatch({type:"commit"});},[ctx.locked,dispatch,onDismiss]);
 useLayoutEffect(()=>onPhase(ctx.phase),[ctx.phase,onPhase]);
 useEffect(()=>{if(ctx.locked)return;const proof=readOrdinaryProof(frameNode.current,state);if(proof)dispatch({type:"mounted",proof});},[state.generation,state.frame,state.displayWitness,state.committed,ctx.locked,dispatch]);
 useEffect(()=>{if(ctx.locked)return;for(const id of state.earned){if(credited.current.has(id))continue;const finalCredit=state.earned.length===REQUIRED.length&&credited.current.size===REQUIRED.length-1;if(finalCredit&&!canDeliverFinal(state))continue;credited.current.add(id);ctx.interact();}},[state.earned,state.comparisonEverMounted,ctx.locked,ctx.interact]);
 const navigate=(id:string)=>{if(ctx.locked)return;dispatch({type:"navigate",target:id});onDismiss();if(ctx.phase==="reveal"&&id!=="comparison")onDetails(id);};
 return <div className={s.frame}>
 {!ctx.locked&&state.frame?<div className={s.evidence}><p ref={frameNode} data-frame={state.frame} data-generation={state.generation} data-witness={state.displayWitness??""} data-claim={FRAMES.find(f=>f.id===state.frame)?.claim}>{frameText(state.frame)}</p></div>:<div className={s.pending} aria-hidden="true"/>}
 <div className={s.controls}>{REQUIRED.map((id,i)=><Control key={id} data-record={id} disabled={ctx.locked||(state.active===id&&state.earned.includes(id))} data-earned={state.earned.includes(id)} aria-label={ctx.locked?`Record ${i+1}, locked`:`Record ${i+1}${state.earned.includes(id)?", retained":""}`} aria-pressed={!ctx.locked&&state.active===id} onClick={()=>navigate(id)}>{i+1}</Control>)}{!(ctx.phase==="reveal"&&state.frame==="comparison")&&<Control disabled={ctx.locked||state.active==="comparison"||(!state.comparisonReady&&!canComplete(state))} aria-label={ctx.locked?"Comparison, locked":"Retained comparison"} aria-pressed={!ctx.locked&&state.frame==="comparison"} onClick={()=>navigate("comparison")}>{REQUIRED.length+1}</Control>}<Control className={s.sourceControl} disabled={ctx.locked} aria-expanded={open} aria-controls={paneId} onClick={onSources}>{open?"Close":"Sources"}</Control><Control className={s.resetControl} disabled={ctx.locked||(!state.active&&!open)} onClick={event=>onReset(event.currentTarget)}>Reset</Control></div></div>;
}
type Intent={kind:"reset"|"reveal"|"close";owner:HTMLElement|null;token:number};
const enabled=(node:HTMLElement|null):node is HTMLElement=>!!node?.isConnected&&!node.matches(':disabled,[aria-disabled="true"]');
export default function Demo({slug}:{slug:string}){
 const[state,dispatch]=useReducer(transition,undefined,initialState);const[open,setOpen]=useState(false);const[details,setDetails]=useState<string|null>(null);
 const root=useRef<HTMLDivElement>(null);const explanation=useRef<HTMLParagraphElement>(null);const opener=useRef<HTMLElement|null>(null);const phase=useRef<StageContext["phase"]>("predict");const intent=useRef<Intent|null>(null);const serial=useRef(0);const raf=useRef<number|null>(null);const openRef=useRef(false);const uid=useId();const paneId=`history-records-${uid}`;
 const cancel=useCallback(()=>{serial.current++;intent.current=null;if(raf.current!==null)cancelAnimationFrame(raf.current);raf.current=null;},[]);
 const dismiss=useCallback(()=>{setOpen(false);openRef.current=false;setDetails(null);},[]);
 const fallback=useCallback(()=>root.current?.querySelector<HTMLElement>('button[data-record]:not(:disabled)')??root.current,[]);
 const begin=useCallback((kind:Intent["kind"],owner:HTMLElement|null)=>{cancel();intent.current={kind,owner,token:serial.current};},[cancel]);
 const flush=useCallback(()=>{const pending=intent.current;if(!pending)return;if(pending.kind==="reveal"&&phase.current!=="reveal")return;if(raf.current!==null)cancelAnimationFrame(raf.current);raf.current=requestAnimationFrame(()=>{raf.current=null;if(intent.current!==pending||pending.token!==serial.current)return;
 const active=document.activeElement;const target=pending.kind==="reveal"?explanation.current:pending.kind==="close"&&enabled(opener.current)?opener.current:fallback();
 if(active instanceof HTMLElement&&active!==document.body&&active!==pending.owner&&active!==target&&enabled(active)&&!root.current?.querySelector('[data-history-disclosure]')?.contains(active)){cancel();return;}
 if(pending.kind==="reveal"&&phase.current!=="reveal"){cancel();return;}intent.current=null;if(enabled(target))target.focus({preventScroll:true});
 });},[cancel,fallback]);
 useLayoutEffect(()=>{flush();},[state.generation,open,details,flush]);
 useEffect(()=>{const focus=(event:FocusEvent)=>{const p=intent.current;const target=event.target;if(p&&target instanceof HTMLElement&&target!==document.body&&target!==p.owner)cancel();};document.addEventListener("focusin",focus);return()=>{document.removeEventListener("focusin",focus);cancel();};},[cancel]);
 const close=useCallback(()=>{begin("close",document.activeElement instanceof HTMLElement?document.activeElement:null);dismiss();},[begin,dismiss]);
 const sources=()=>{if(open){close();return;}cancel();opener.current=document.activeElement instanceof HTMLElement?document.activeElement:null;setDetails(null);openRef.current=true;setOpen(true);};
 const showDetails=(id:string)=>{cancel();opener.current=document.activeElement instanceof HTMLElement?document.activeElement:null;setOpen(false);openRef.current=false;setDetails(id);};
 const reset=useCallback((owner:HTMLElement)=>{begin("reset",owner);dispatch({type:"reset"});dismiss();},[begin,dismiss]);
 const onPhase=useCallback((next:StageContext["phase"])=>{const old=phase.current;phase.current=next;if(old===next)return;if(next==="predict"){cancel();dismiss();}else if(next==="reveal"){if(old!=="explore"||intent.current?.kind!=="reveal")cancel();dismiss();flush();}},[cancel,dismiss,flush]);
 return <div ref={root} className={s.root} tabIndex={-1} aria-label="History records" onClickCapture={event=>{const button=(event.target as HTMLElement).closest<HTMLButtonElement>('[data-testid="reveal-button"]');if(button&&!button.disabled&&openRef.current&&phase.current==="explore")begin("reveal",button);}}>{PERIOD_DISCLOSURE&&<p className={s.period} data-claim={PERIOD_CLAIM}>{PERIOD_DISCLOSURE}</p>}<Lesson slug={slug} minInteractions={REQUIRED.length} predict={PREDICTION} exploreHint={EXPLORE_HINT} reveal={()=><p ref={explanation} tabIndex={-1} aria-label="Explanation" data-claim="history.history-timbuktu-gao-1300-1600.c18">{REVEAL}</p>}>{ctx=><Stage ctx={ctx} state={state} dispatch={dispatch} open={open} paneId={paneId} onSources={sources} onDismiss={dismiss} onDetails={showDetails} onReset={reset} onPhase={onPhase}/>}</Lesson>
 {open&&<Sources id={paneId} onClose={close}/>} {details&&<RecordDetails id={`${paneId}-record`} witness={details} onClose={close}/>}</div>;
}
export {Stage};
