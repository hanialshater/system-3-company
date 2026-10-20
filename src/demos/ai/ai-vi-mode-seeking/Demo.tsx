"use client";
import {useEffect,useState} from "react";
import {Lesson,type Phase} from "@/kit/Lesson";
import {Control} from "@/kit/controls";
import {useMilestones} from "@/kit/milestones";
import {compute,f} from "./model";
import s from "./styles.module.css";
const cases=["Delta", "Two-mode"];
const milestones=cases.map((_,i)=>String(i));
type Witness=ReturnType<typeof compute>;
export function Figure({v}:{v:Witness|null}){return <svg className={s.figure} viewBox="0 0 280 110" role="img" aria-label="Minimize reverse KL within an explicit finite family."><text x="8" y="15">p(−1,0,1)=.45/.1/.45</text>{[0,1,2].map(i=><g key={i}><rect x={40+i*75} y={75-[.45,.1,.45][i]*90} width="27" height={[.45,.1,.45][i]*90}/><text x={40+i*75} y="96">{i-1}</text></g>)}<text x="8" y="36">{v?`${v.family.length===1?'two-mode':'delta'}:KL=${f(v.minimum)}`:'single-point-q · KL=?'}</text></svg>}
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
export default function Demo({slug}:{slug:string}){return <Lesson slug={slug} predict={{"question": "Target mass at −1/0/1 is .45/.1/.45. A single-point q minimizes KL(q‖p). Which locations are tied best?", "options": ["−1 and 1", "0 only"], "answer": 0}} minInteractions={2} exploreHint="Try each case and compare the saved results." reveal={()=><p className={s.explanation}>For a single-point family, either outer mode minimized reverse KL at .799, versus center 2.303. Allowing q=[.5,0,.5] lowered KL to .105 and represented both modes. Omission depended on the family and objective; it is not a universal result about variational inference.</p>}>{({locked,phase,interact})=><Stage locked={locked} phase={phase} interact={interact}/>}</Lesson>}
