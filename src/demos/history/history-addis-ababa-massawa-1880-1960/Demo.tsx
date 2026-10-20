"use client";
import {useCallback,useEffect,useId,useReducer,useRef,useState,type Dispatch} from "react";
import {Lesson,type StageContext} from "@/kit/Lesson";
import {Control} from "@/kit/controls";
import {Sources,RecordDetails} from "./Sources";
import {DOCUMENTS,CASE_MECHANISM,REQUIRED,FRAMES,PREDICTION,REVEAL,PERIOD_PROVENANCE,initialState,transition,frameText,requiredContexts,canComplete,canDeliverFinal,type State,type Action,type Proof} from "./model";
import { HistoryLocator } from "@/components/history/HistoryLocator";
import s from "./styles.module.css";
export function readOrdinaryProof(node:HTMLElement|null,state:State):Proof|null{
 if(!node||!node.isConnected||!state.frame||node.hidden||node.closest('[hidden],[aria-hidden="true"]')||node.getClientRects().length===0)return null;
 for(let ancestor:HTMLElement|null=node;ancestor;ancestor=ancestor.parentElement){const style=window.getComputedStyle(ancestor);if(style.display==="none"||style.visibility==="hidden"||style.visibility==="collapse"||style.opacity==="0"||style.contentVisibility==="hidden")return null;}
 if(node.dataset.generation!==String(state.generation)||node.dataset.frame!==state.frame||node.dataset.witness!==(state.displayWitness??""))return null;
 const text=node.textContent?.replace(/\s+/g," ").trim()??"";if(text!==frameText(state.frame))return null;
 return {generation:state.generation,witness:state.displayWitness,frame:state.frame,text,contexts:state.displayWitness?requiredContexts(state.displayWitness):[],ordinaryVisible:true};
}
function Stage({ctx,state,dispatch,open,paneId,onSources,onDismiss,onDetails}:{ctx:StageContext;state:State;dispatch:Dispatch<Action>;open:boolean;paneId:string;onSources:()=>void;onDismiss:()=>void;onDetails:(id:string)=>void}){
 const credited=useRef(new Set<string>());const frameNode=useRef<HTMLParagraphElement>(null);const previousPhase=useRef(ctx.phase);
 useEffect(()=>{if(ctx.locked){credited.current.clear();dispatch({type:"restart"});onDismiss();}else dispatch({type:"commit"});},[ctx.locked,dispatch,onDismiss]);
 useEffect(()=>{if(previousPhase.current!==ctx.phase){onDismiss();previousPhase.current=ctx.phase;}},[ctx.phase,onDismiss]);
 const shownFrame=ctx.phase==="reveal"&&state.comparisonReady?"comparison":state.frame;
 useEffect(()=>{if(ctx.locked||shownFrame!==state.frame)return;const proof=readOrdinaryProof(frameNode.current,state);if(proof)dispatch({type:"mounted",proof});},[state.generation,state.frame,state.displayWitness,shownFrame,ctx.locked,dispatch]);
 useEffect(()=>{if(ctx.locked)return;for(const id of state.earned){if(credited.current.has(id))continue;const finalCredit=state.earned.length===REQUIRED.length&&credited.current.size===REQUIRED.length-1;if(finalCredit&&!canDeliverFinal(state))continue;credited.current.add(id);ctx.interact();}},[state.earned,state.comparisonEverMounted,ctx.locked,ctx.interact]);
 const navigate=(id:string)=>{if(ctx.locked)return;dispatch({type:"navigate",target:id});onDismiss();if(ctx.phase==="reveal"&&id!=="comparison")onDetails(id);};
 const actualComparison=shownFrame==="comparison";const comparisonDisabled=ctx.locked||actualComparison||(!state.comparisonReady&&!canComplete(state));const omitCompletedComparison=ctx.phase==="reveal"&&actualComparison&&comparisonDisabled;
 return <div className={s.frame} data-mechanism={CASE_MECHANISM}>
 <HistoryLocator slug="history-addis-ababa-massawa-1880-1960" places={["Addis Ababa", "Massawa"]} /><div className={s.controls}>{REQUIRED.map((id,i)=><Control key={id} data-witness={id} disabled={ctx.locked||(ctx.phase!=="reveal"&&state.active===id&&state.earned.includes(id))} data-earned={!ctx.locked&&state.earned.includes(id)} aria-label={ctx.locked?`Record ${i+1}, locked`:`Record ${i+1}${state.earned.includes(id)?", saved":""}`} aria-pressed={!ctx.locked&&!actualComparison&&state.active===id} onClick={()=>navigate(id)}>{i+1}</Control>)}{!omitCompletedComparison&&<Control disabled={comparisonDisabled} aria-label={ctx.locked?"Comparison, locked":"Saved comparison"} aria-pressed={!ctx.locked&&actualComparison} onClick={()=>navigate("comparison")}>{REQUIRED.length+1}</Control>}<Control className={s.sourceControl} disabled={ctx.locked} aria-expanded={open} aria-controls={paneId} onClick={onSources}>{open?"Close":"Sources"}</Control><Control disabled={ctx.locked||(!state.active&&!open)} onClick={()=>{dispatch({type:"reset"});onDismiss();}}>Reset</Control></div>
 {!ctx.locked&&shownFrame?<div className={s.evidence} role="group" aria-label="Selected source relation"><p ref={frameNode} data-frame={shownFrame} data-generation={state.generation} data-witness={shownFrame===state.frame?(state.displayWitness??""):""} data-claim={FRAMES.find(f=>f.id===shownFrame)?.claim}>{frameText(shownFrame)}</p></div>:null}</div>;

}
export default function Demo({slug}:{slug:string}){
 const[state,dispatch]=useReducer(transition,undefined,initialState);const[open,setOpen]=useState(false);const[details,setDetails]=useState<string|null>(null);const opener=useRef<HTMLElement|null>(null);const root=useRef<HTMLDivElement>(null);const expanded=useRef(false);expanded.current=open||details!==null;const uid=useId();const paneId=`history-evidence-${uid}`;
 const returnFocus=useCallback(()=>{const target=opener.current;if(target?.isConnected&&!(target instanceof HTMLButtonElement&&target.disabled)){target.focus({preventScroll:true});return;}const next=root.current?.querySelector<HTMLButtonElement>('button[data-witness]:not(:disabled)');if(next?.isConnected){next.focus({preventScroll:true});return;}if(root.current?.isConnected)root.current.focus({preventScroll:true});},[]);
 const dismiss=useCallback((restore?:boolean)=>{const active=document.activeElement instanceof HTMLElement?document.activeElement:null;const shouldRestore=restore!==false&&expanded.current&&!!active?.closest('[data-history-disclosure="true"]');setOpen(false);setDetails(null);expanded.current=false;if(shouldRestore)requestAnimationFrame(returnFocus);},[returnFocus]);
 const close=useCallback(()=>{dismiss(false);requestAnimationFrame(returnFocus);},[dismiss,returnFocus]);
 const sources=()=>{if(open){close();return;}opener.current=document.activeElement instanceof HTMLElement?document.activeElement:null;setDetails(null);setOpen(true);};
 const showDetails=(id:string)=>{if(details===id){close();return;}opener.current=document.activeElement instanceof HTMLElement?document.activeElement:null;setOpen(false);setDetails(id);};
 return <div className={s.root} ref={root} tabIndex={-1} aria-label="History records">{state.committed&&PERIOD_PROVENANCE&&<p className={s.period} data-claim="period-provenance">{PERIOD_PROVENANCE}</p>}<Lesson slug={slug} minInteractions={REQUIRED.length} predict={PREDICTION} exploreHint="Read each record, then compare them." reveal={()=><p data-claim="reveal">{REVEAL}</p>}>{ctx=><Stage ctx={ctx} state={state} dispatch={dispatch} open={open} paneId={paneId} onSources={sources} onDismiss={dismiss} onDetails={showDetails}/>}</Lesson>
 {open&&<Sources id={paneId} onClose={close}/>} {details&&<RecordDetails id={`${paneId}-record`} witness={details} onClose={close}/>}</div>;
}

export {Stage};
