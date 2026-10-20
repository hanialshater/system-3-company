"use client";
import {useEffect,useState} from "react";
import {Lesson,type Phase} from "@/kit/Lesson";
import {Control} from "@/kit/controls";
import {useMilestones} from "@/kit/milestones";
import {compute,f} from "./model";
import s from "./styles.module.css";
const cases=["Future", "Past weak", "Past exact"];
const milestones=cases.map((_,i)=>String(i));
type Witness=ReturnType<typeof compute>;
export function Figure({v}:{v:Witness|null}){return <svg className={s.figure} viewBox="0 0 280 110" role="img" aria-label="Check timestamps independently of the final score."><text x="8" y="15">labels=next-day-demand · y=0/1/0</text><path d="M20 50H258M126 39V62"/><text x="93" y="81">predict:t1</text><circle cx={v?.featureTime===2?225:28} cy="50" r="6" className={s.mark}/><text x="8" y="104">feature:t{v?v.featureTime:'?'} · {v?(v.admissible?'admit':'reject'):'?'} · hits={v?v.hits:'?'}/3</text></svg>}
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
export default function Demo({slug}:{slug:string}){return <Lesson slug={slug} predict={{"question": "Predict at t=1; labels are next-day demand. A feature available at t=2 gives 3/3 accuracy. Is it admissible for that prediction?", "options": ["No", "Yes"], "answer": 0}} minInteractions={3} exploreHint="Try each case and compare the saved results." reveal={()=><p className={s.explanation}>The future feature scored 3/3 but arrived after prediction and was inadmissible. One past feature scored 0/3; another scored 3/3. Accuracy alone did not diagnose leakage. Admission depends on availability at prediction time; shuffling cannot move future information into the past.</p>}>{({locked,phase,interact})=><Stage locked={locked} phase={phase} interact={interact}/>}</Lesson>}
