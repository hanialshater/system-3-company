"use client";
import {useEffect,useState} from "react";
import {Lesson,type Phase} from "@/kit/Lesson";
import {Control} from "@/kit/controls";
import {useMilestones} from "@/kit/milestones";
import {compute,f} from "./model";
import s from "./styles.module.css";
const cases=["k=2", "k=3"];
const milestones=cases.map((_,i)=>String(i));
type Witness=ReturnType<typeof compute>;
export function Figure({v}:{v:Witness|null}){return <svg className={s.figure} viewBox="0 0 280 110" role="img" aria-label="Run Lloyd updates on equally spaced points."><text x="8" y="15">equal-gaps · Lloyd nearest→mean</text>{[0,1,2,3,4,5].map((x,i)=><g key={x}><circle cx={22+i*45} cy="50" r="9" className={v&&v.assign[i]%2===0?s.mark:undefined}/><text x={18+i*45} y="80">{x}</text></g>)}{v?.centers.map(c=><path key={c} d={`M${22+c*45-5} 30L${22+c*45+5} 30M${22+c*45} 25V35`}/>)}<text x="8" y="99">centers={v?v.centers.map(f).join('/'):'?'} · SSE={v?f(v.sse):'?'}</text></svg>}
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
export default function Demo({slug}:{slug:string}){return <Lesson slug={slug} predict={{"question": "Points 0/1/2/3/4/5 have equal gaps. If requested k rises from 2 to 3, can k-means still return three groups?", "options": ["Yes", "No"], "answer": 0}} minInteractions={2} exploreHint="Try each case and compare the saved results." reveal={()=><p className={s.explanation}>With centers 1/4, Lloyd updates retained two groups and SSE 4. With centers .5/2.5/4.5, they retained three pairs and SSE 1.5. Adjacent data gaps stayed equal. Lower within-group error alone does not establish a true population count.</p>}>{({locked,phase,interact})=><Stage locked={locked} phase={phase} interact={interact}/>}</Lesson>}
