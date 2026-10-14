"use client";
import { useState } from "react";
import { Lesson } from "@/kit/Lesson";
import { Control, Slider } from "@/kit/controls";
import { useMilestones } from "@/kit/milestones";
import { compareLabel, shuffledLabels, scanLabels, type LabelSearchStep } from "@/lib/lifehacks/studySearch";
import s from "./StudyLesson.module.css";

const names=["scanned","found"] as const;
interface SearchState { scan: number; steps: LabelSearchStep[]; }
function SearchStage({count,setCount,state,setState,locked,interact}:{count:number;setCount:(n:number)=>void;state:SearchState;setState:(s:SearchState)=>void;locked:boolean;interact:()=>void}) {
  const {reach}=useMilestones(interact,names);
  const fixture=shuffledLabels(count),last=state.steps.at(-1),done=last?.verdict==="found";
  const sorted=state.steps.length>0,labels=sorted?fixture.sorted:fixture.shuffled;
  const lo=last?.keptLo??0,hi=last?.keptHi??count-1;
  const advance=(finish:boolean)=> {
    if(locked||!state.scan||done)return;
    const steps=[...state.steps];let low=lo,high=hi;
    do {const next=compareLabel(fixture.sorted,fixture.target,low,high);steps.push(next);low=next.keptLo;high=next.keptHi;if(next.verdict==="found"){reach("found");break;}} while(finish&&low<=high);
    setState({...state,steps});
  };
  const description=locked?`Target ${fixture.target}. Shuffled labels: ${fixture.shuffled.join(", ")}. Search not yet performed.`:sorted?`Sorted labels: ${fixture.sorted.join(", ")}. Target ${fixture.target}. Compared ${last!.value} with ${fixture.target}: ${last!.verdict}. Remaining candidates ${fixture.sorted.slice(lo,hi+1).join(", ")}. Scan used ${state.scan} checks; sorted search has used ${state.steps.length} checks.`:`Target ${fixture.target}. Shuffled labels: ${fixture.shuffled.join(", ")}. ${state.scan?`A full scan used ${state.scan} checks and found the target last.`:"Search not yet performed."}`;
  return <div className={s.wrap}>
    <div className={s.caption}>Target:{fixture.target} {sorted?"Sorted":"Shuffled"}</div>
    <svg viewBox="0 0 320 96" className={`stage-svg ${s.diagram}`} role="img" aria-label={description}>
      {labels.map((label,index)=>{
        const remaining=!sorted||(index>=lo&&index<=hi),compared=sorted&&index===last!.mid;
        const x=7+(index%5)*63,y=5+Math.floor(index/5)*45;
        return <g key={label} opacity={remaining?1:.25}>
          <rect x={x} y={y} width="55" height="34" rx="6" fill={(done||(!sorted&&state.scan>0))&&label===fixture.target?"var(--good)":!sorted&&state.scan>index?"var(--line)":"var(--bg-2)"} stroke={compared?"var(--domain)":remaining?"var(--fg)":"var(--line)"} strokeWidth={compared?3:1}/>
          <text x={x+27.5} y={y+23} textAnchor="middle" fill="var(--fg)">{label}</text>
          {!remaining&&<path d={`M${x+9} ${y+7} l37 20`} stroke="var(--muted)" strokeWidth="1.5"/>}
        </g>;
      })}
    </svg>
    <div className={s.results}>
      <span className={s.result}>Scan <strong>{state.scan||"?"}</strong></span>
      <span className={s.result}>Sorted <strong>{state.steps.length||"?"}</strong></span>
    </div>
    <div className={s.caption}>Comparisons: {state.steps.length?state.steps.map(step=>`${step.value}${step.verdict==="found"?"=":"<"}${fixture.target}${step.verdict==="found"?"✓":"→right"}`).join("·"):"?"}</div>
    <Slider label="Count" value={count} min={4} max={10} disabled={locked||state.scan>0} onChange={setCount}/>
    <div className={s.controls}>
      <Control disabled={locked||state.scan>0} onClick={()=>{setState({scan:scanLabels(fixture.shuffled,fixture.target).checked.length,steps:[]});reach("scanned");}}>Scan all</Control>
      <Control disabled={locked||!state.scan||done} onClick={()=>advance(false)}>Compare</Control>
      <Control disabled={locked||!state.scan||done} onClick={()=>advance(true)}>Finish</Control>
    </div>
  </div>;
}
export function AlphabetSearchLesson({slug}:{slug:string}) {
  const [count,setCount]=useState(8),[state,setState]=useState<SearchState>({scan:0,steps:[]});
  const target=shuffledLabels(count).target;
  return <Lesson slug={slug} minInteractions={2}
    predict={{question:"To find the target, which method can rule out labels without checking every label?",options:["Halve sorted candidates","Scan shuffled labels"],answer:0}}
    exploreHint="Scan the shuffled list, then compare the middle of sorted candidates. Faded labels were ruled out."
    reveal={()=> <><p>You found {target}: the disclosed target-last scan needed {state.scan} checks. Your sorted search needed {state.steps.length}, with comparisons {state.steps.map(step=>`${step.value}${step.verdict==="found"?"=":"<"}${target}`).join(" → ")}.</p><p>When the middle label is below the target, it and all earlier labels can be ruled out because the list is sorted. The faded tiles show that elimination. An unsorted list supplies no such ordering guarantee. Sorting takes work; this exercise counts only search comparisons.</p></>}
  >{({locked,interact})=><SearchStage count={count} setCount={setCount} state={state} setState={setState} locked={locked} interact={interact}/>}</Lesson>;
}
