"use client";
import {useEffect,useState} from "react";
import {Lesson,type Phase} from "@/kit/Lesson";
import {Control} from "@/kit/controls";
import {useMilestones} from "@/kit/milestones";
import {compute,f} from "./model";
import s from "./styles.module.css";
const cases=["ε=.15", "ε=.05", "ε=1"];
const milestones=cases.map((_,i)=>String(i));
type Witness=ReturnType<typeof compute>;
export function Figure({v}:{v:Witness|null}){return <svg className={s.figure} viewBox="0 0 280 110" role="img" aria-label="Compute neighborhoods, connectivity, and noise."><text x="8" y="15">ordinal:count/cluster;min2(self),≤ε</text>{[0,.1,.2,1,1.1,1.2,5].map((x,i)=><g key={i}><circle cx={17+i*40} cy="48" r="17" strokeDasharray={v?.labels[i]===1?'3 2':undefined} className={v&&v.labels[i]>=0?s.mark:undefined}/><text x={5+i*40} y="53">{v?`${v.neighbors[i].length}/${v.labels[i]<0?'N':v.labels[i]}`:'?/?'}</text><text x={8+i*40} y="79">{x}</text></g>)}</svg>}
function Stage({locked,phase,interact}:{locked:boolean;phase:Phase;interact:()=>void}){
 const [mode,setMode]=useState(-1);
 const [value,setValue]=useState<Witness|null>(null);
 const [saved,setSaved]=useState<(string|null)[]>(()=>cases.map(()=>null));
 const {reach}=useMilestones(interact,milestones);
 // Reveal restores the primary witness only after every named case was earned.
 // Reset clears the current computation, while retained witnesses survive.
 useEffect(()=>{if(phase==="reveal"){setMode(0);setValue(compute(0));}},[phase]);
 const run=(next:number)=>{const result=compute(next);setMode(next);setValue(result);setSaved(old=>old.map((x,i)=>i===next?result.snapshot:x));reach(String(next));};
 return <div className={s.wrap}><Figure v={value}/><div className={s.controls}>{cases.map((label,i)=><Control key={label} disabled={locked||mode===i} aria-pressed={mode===i} onClick={()=>run(i)}>{label}</Control>)}<Control disabled={locked||mode===-1} onClick={()=>{setMode(-1);setValue(null);}}>Reset</Control></div><div className={s.evidence} aria-label="Retained computed witnesses" aria-live="polite">{saved.map((x,i)=>x===null?null:<p key={i}>{x}</p>)}</div></div>;
}
export default function Demo({slug}:{slug:string}){return <Lesson slug={slug} predict={{"question": "Points 0,.1,.2,1,1.1,1.2,5. Radius .15, min-samples=2 including self. Which point is noise?", "options": ["5", "None"], "answer": 0}} minInteractions={3} exploreHint="Compute every case; compare the retained witnesses." reveal={()=><p className={s.explanation}>Radius .15 formed two density-connected groups and left 5 as noise. Radius .05 left every point below the two-sample threshold. Radius 1 connected the first six into one group, still excluding 5. Density parameters request neighborhoods, not a chosen number of populations.</p>}>{({locked,phase,interact})=><Stage locked={locked} phase={phase} interact={interact}/>}</Lesson>}
