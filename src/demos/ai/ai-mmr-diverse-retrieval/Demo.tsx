"use client";
import {useEffect,useState} from "react";
import {Lesson,type Phase} from "@/kit/Lesson";
import {Control} from "@/kit/controls";
import {useMilestones} from "@/kit/milestones";
import {compute,f} from "./model";
import s from "./styles.module.css";
const cases=["λ=.5", "λ=.9"];
const milestones=cases.map((_,i)=>String(i));
type Witness=ReturnType<typeof compute>;
export function Figure({v}:{v:Witness|null}){return <svg className={s.figure} viewBox="0 0 280 110" role="img" aria-label="Penalize redundancy with the already selected result."><text x="8" y="15">A-selected · MMR=λr−(1−λ)s</text><circle cx="35" cy="54" r="13"/><text x="30" y="59">A</text><path d="M49 47L117 33M49 62L117 79"/><text x="121" y="35">B sim=.95</text><text x="121" y="80">C sim=.1</text><text x="212" y="35">{v?f(v.scores[0]):'?'}</text><text x="212" y="80">{v?f(v.scores[1]):'?'}</text></svg>}
function Stage({locked,phase,interact}:{locked:boolean;phase:Phase;interact:()=>void}){
 const [mode,setMode]=useState(-1);
 const [value,setValue]=useState<Witness|null>(null);
 const [saved,setSaved]=useState<(string|null)[]>(()=>cases.map(()=>null));
 const {reach}=useMilestones(interact,milestones);
 // Reveal restores the primary witness only after every named case was earned.
 // Reset clears the current computation, while retained witnesses survive.
 useEffect(()=>{if(phase==="reveal"){setMode(0);setValue(compute(0));}},[phase]);
 const run=(next:number)=>{const result=compute(next);setMode(next);setValue(result);setSaved(old=>old.map((x,i)=>i===next?result.snapshot:x));reach(String(next));};
 return <div className={s.wrap}><Figure v={value}/><div className={s.controls}>{cases.map((label,i)=><Control key={label} disabled={locked||mode===i} aria-pressed={mode===i} onClick={()=>run(i)}>{label}</Control>)}<Control disabled={locked||mode===-1} onClick={()=>{setMode(-1);setValue(null);}}>Reset</Control></div><div className={s.evidence} aria-label="Saved results" aria-live="polite">{saved.map((x,i)=>x===null?null:<p key={i}>{x}</p>)}</div></div>;
}
export default function Demo({slug}:{slug:string}){return <Lesson slug={slug} predict={{"question": "A is already selected. B/C relevance=.85/.7 and redundancy-to-A=.95/.1. At λ=.5, MMR=λ relevance−(1−λ) redundancy. Which comes next?", "options": ["C", "B"], "answer": 0}} minInteractions={2} exploreHint="Try each case and compare the saved results." reveal={()=><p className={s.explanation}>With A already selected, equal relevance and redundancy weights gave B −.05 and C .3, selecting C. Raising relevance weight to .9 gave B .67 and C .62, selecting B. Diversity depends on this explicit tradeoff and similarity measure; it is not guaranteed improvement.</p>}>{({locked,phase,interact})=><Stage locked={locked} phase={phase} interact={interact}/>}</Lesson>}
