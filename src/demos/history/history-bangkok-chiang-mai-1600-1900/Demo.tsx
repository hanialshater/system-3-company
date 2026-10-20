"use client";
import {useCallback,useEffect,useLayoutEffect,useId,useReducer,useRef,useState,type Dispatch,type RefObject,type MouseEvent} from "react";
import {Lesson,type StageContext} from "@/kit/Lesson";
import {Control} from "@/kit/controls";
import {Sources,RecordDetails} from "./Sources";
import {DOCUMENTS,CASE_MECHANISM,REQUIRED,FRAMES,PREDICTION,REVEAL,PERIOD_PROVENANCE,initialState,transition,frameText,requiredContexts,canComplete,canDeliverFinal,type State,type Action,type Proof} from "./model";
import { HistoryLocator } from "@/components/history/HistoryLocator";
import s from "./styles.module.css";

// A request belongs to one activation, never merely to a later BODY focus.
export function useHistoryFocus(root:RefObject<HTMLDivElement|null>, explanation:RefObject<HTMLParagraphElement|null>, opener:RefObject<HTMLElement|null>){
 const phase=useRef<StageContext["phase"]>("predict");
 const pending=useRef<{kind:"reset"|"reveal"|"return";owner:Element|null;active:Element|null;phase:StageContext["phase"]}|null>(null);
 const frame=useRef<number|null>(null);
 const cancel=useCallback(()=>{pending.current=null;if(frame.current!==null)cancelAnimationFrame(frame.current);frame.current=null;},[]);
 const enabled=(node:HTMLElement|null):node is HTMLElement=>!!node?.isConnected&&!(node instanceof HTMLButtonElement&&node.disabled);
 const firstRecord=()=>root.current?.querySelector<HTMLButtonElement>('button[data-history-record]:not(:disabled)')??null;
 const request=useCallback((kind:"reset"|"reveal"|"return",owner:Element|null)=>{
  cancel();const intent={kind,owner,active:document.activeElement,phase:kind==="reveal"?"reveal" as const:phase.current};pending.current=intent;
  frame.current=requestAnimationFrame(()=>{
   frame.current=null;if(pending.current!==intent)return;
   const active=document.activeElement;
   const owns=active===intent.owner||active===intent.active||(active===document.body&&(!intent.owner?.isConnected||(intent.owner instanceof HTMLButtonElement&&intent.owner.disabled)));
   pending.current=null;if(!owns||phase.current!==intent.phase)return;
   const target=kind==="reveal"?explanation.current:kind==="return"&&enabled(opener.current)?opener.current:firstRecord()??root.current;
   if(enabled(target))target.focus({preventScroll:true});
  });
 },[cancel,root,explanation,opener]);
 useEffect(()=>{const interrupt=()=>cancel();document.addEventListener("focusin",interrupt);document.addEventListener("click",interrupt,true);document.addEventListener("keydown",interrupt,true);return()=>{document.removeEventListener("focusin",interrupt);document.removeEventListener("click",interrupt,true);document.removeEventListener("keydown",interrupt,true);cancel();};},[cancel]);
 const capture=(event:MouseEvent<HTMLDivElement>)=>{
  cancel();const button=event.target instanceof Element?event.target.closest<HTMLButtonElement>("button"):null;
  if(!button||button.disabled||!root.current?.contains(button))return;
  if(button.hasAttribute("data-history-reset"))request("reset",button);
  else if(button.dataset.testid==="reveal-button"&&phase.current==="explore"&&root.current.querySelector('[aria-expanded="true"][aria-controls]'))request("reveal",button);
 };
 const observe=useCallback((next:StageContext["phase"])=>{phase.current=next;},[]);
 const restore=useCallback(()=>request("return",document.activeElement),[request]);
 return {capture,observe,restore,pending,cancel};
}

export function readOrdinaryProof(node:HTMLElement|null,state:State):Proof|null{
 if(!node||!node.isConnected||!state.frame||node.hidden||node.closest('[hidden],[aria-hidden="true"]')||node.getClientRects().length===0)return null;
 for(let ancestor:HTMLElement|null=node;ancestor;ancestor=ancestor.parentElement){const style=window.getComputedStyle(ancestor);if(style.display==="none"||style.visibility==="hidden"||style.visibility==="collapse"||style.opacity==="0"||style.contentVisibility==="hidden")return null;}
 if(node.dataset.generation!==String(state.generation)||node.dataset.frame!==state.frame||node.dataset.witness!==(state.displayWitness??""))return null;
 const text=node.textContent?.replace(/\s+/g," ").trim()??"";if(text!==frameText(state.frame))return null;
 return {generation:state.generation,witness:state.displayWitness,frame:state.frame,text,contexts:state.displayWitness?requiredContexts(state.displayWitness):[],ordinaryVisible:true};
}
function Stage({ctx,state,dispatch,open,paneId,onSources,onDismiss,onDetails,onPhase}:{ctx:StageContext;state:State;dispatch:Dispatch<Action>;open:boolean;paneId:string;onSources:()=>void;onDismiss:()=>void;onDetails:(id:string)=>void;onPhase:(phase:StageContext["phase"])=>void}){
 const credited=useRef(new Set<string>());const frameNode=useRef<HTMLParagraphElement>(null);const previousPhase=useRef(ctx.phase);
 useEffect(()=>{if(ctx.locked){credited.current.clear();dispatch({type:"restart"});onDismiss();}else dispatch({type:"commit"});},[ctx.locked,dispatch,onDismiss]);
 useLayoutEffect(()=>{onPhase(ctx.phase);},[ctx.phase,onPhase]);
 useEffect(()=>{if(previousPhase.current!==ctx.phase){onDismiss();previousPhase.current=ctx.phase;}},[ctx.phase,onDismiss]);
 const shownFrame=ctx.phase==="reveal"&&state.comparisonReady?"comparison":state.frame;
 useEffect(()=>{if(ctx.locked||shownFrame!==state.frame)return;const proof=readOrdinaryProof(frameNode.current,state);if(proof)dispatch({type:"mounted",proof});},[state.generation,state.frame,state.displayWitness,shownFrame,ctx.locked,dispatch]);
 useEffect(()=>{if(ctx.locked)return;for(const id of state.earned){if(credited.current.has(id))continue;const finalCredit=state.earned.length===REQUIRED.length&&credited.current.size===REQUIRED.length-1;if(finalCredit&&!canDeliverFinal(state))continue;credited.current.add(id);ctx.interact();}},[state.earned,state.comparisonEverMounted,ctx.locked,ctx.interact]);
 const navigate=(id:string)=>{if(ctx.locked)return;dispatch({type:"navigate",target:id});onDismiss();if(ctx.phase==="reveal"&&id!=="comparison")onDetails(id);};
 const actualComparison=shownFrame==="comparison";const comparisonDisabled=ctx.locked||actualComparison||(!state.comparisonReady&&!canComplete(state));const omitCompletedComparison=ctx.phase==="reveal"&&actualComparison&&comparisonDisabled;
 return <div className={s.frame} data-mechanism={CASE_MECHANISM}>
 <HistoryLocator slug="history-bangkok-chiang-mai-1600-1900" places={["Bangkok", "Chiang Mai"]} /><div className={s.controls}>{REQUIRED.map((id,i)=><Control data-history-record="true" key={id} data-witness={id} disabled={ctx.locked||(ctx.phase!=="reveal"&&state.active===id&&state.earned.includes(id))} data-earned={!ctx.locked&&state.earned.includes(id)} aria-label={ctx.locked?`Record ${i+1}, locked`:`Record ${i+1}${state.earned.includes(id)?", saved":""}`} aria-pressed={!ctx.locked&&!actualComparison&&state.active===id} onClick={()=>navigate(id)}>{i+1}</Control>)}{!omitCompletedComparison&&<Control disabled={comparisonDisabled} aria-label={ctx.locked?"Comparison, locked":"Saved comparison"} aria-pressed={!ctx.locked&&actualComparison} onClick={()=>navigate("comparison")}>{REQUIRED.length+1}</Control>}<Control className={s.sourceControl} disabled={ctx.locked} aria-expanded={open} aria-controls={paneId} onClick={onSources}>{open?"Close":"Sources"}</Control><Control disabled={ctx.locked||(!state.active&&!open)} data-history-reset="true" onClick={()=>{dispatch({type:"reset"});onDismiss();}}>Reset</Control></div>
 {!ctx.locked&&shownFrame?<div className={s.evidence} role="group" aria-label="Selected source relation"><p ref={frameNode} data-frame={shownFrame} data-generation={state.generation} data-witness={shownFrame===state.frame?(state.displayWitness??""):""} data-claim={FRAMES.find(f=>f.id===shownFrame)?.claim}>{frameText(shownFrame)}</p></div>:null}</div>;

}
export default function Demo({slug}:{slug:string}){
 const[state,dispatch]=useReducer(transition,undefined,initialState);const[open,setOpen]=useState(false);const[details,setDetails]=useState<string|null>(null);const opener=useRef<HTMLElement|null>(null);const root=useRef<HTMLDivElement>(null);const uid=useId();const paneId=`history-evidence-${uid}`;
 const explanation=useRef<HTMLParagraphElement>(null);const focus=useHistoryFocus(root,explanation,opener);
 const {pending,restore}=focus;
 const dismiss=useCallback((restorePane=true)=>{const active=document.activeElement;const pane=active instanceof Element&&(active.closest('[data-history-disclosure="true"]')||active.closest(`[id="${paneId}"],[id="${paneId}-record"]`));const shouldRestore=restorePane&&!!pane&&!pending.current;setOpen(false);setDetails(null);if(shouldRestore)restore();},[paneId,pending,restore]);
 const close=useCallback(()=>{dismiss(false);restore();},[dismiss,restore]);
 const sources=()=>{if(open){close();return;}opener.current=document.activeElement instanceof HTMLElement?document.activeElement:null;setDetails(null);setOpen(true);};
 const showDetails=(id:string)=>{if(details===id){close();return;}opener.current=document.activeElement instanceof HTMLElement?document.activeElement:null;setOpen(false);setDetails(id);};
 return <div className={s.root} ref={root} tabIndex={-1} aria-label="History records" onClickCapture={focus.capture}>{state.committed&&PERIOD_PROVENANCE&&<p className={s.period} data-claim="period-provenance">{PERIOD_PROVENANCE}</p>}<Lesson slug={slug} minInteractions={REQUIRED.length} predict={PREDICTION} exploreHint="Read each record, then compare them." reveal={()=><p ref={explanation} tabIndex={-1} aria-label="Explanation" data-claim="reveal">{REVEAL}</p>}>{ctx=><Stage ctx={ctx} state={state} dispatch={dispatch} open={open} paneId={paneId} onSources={sources} onDismiss={dismiss} onDetails={showDetails} onPhase={focus.observe}/>}</Lesson>
 {open&&<Sources id={paneId} onClose={close}/>} {details&&<RecordDetails id={`${paneId}-record`} witness={details} onClose={close}/>}</div>;
}

export {Stage};
