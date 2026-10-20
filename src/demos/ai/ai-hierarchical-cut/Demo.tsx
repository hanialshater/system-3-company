"use client";
import {useEffect,useState} from "react";
import {Lesson,type Phase} from "@/kit/Lesson";
import {Control} from "@/kit/controls";
import {useMilestones} from "@/kit/milestones";
import {compute,f} from "./model";
import s from "./styles.module.css";
const cases=["Single 2", "Single 3", "Complete"];
const milestones=cases.map((_,i)=>String(i));
type Witness=ReturnType<typeof compute>;
export function Figure({v}:{v:Witness|null}){return <svg className={s.figure} viewBox="0 0 280 110" role="img" aria-label="Compute merges from distances instead of naming a group count."><text x="8" y="15">x=0/1/4/8 · {v?.complete?'complete=max':'single=min'}</text>{v?.branches.map((b,i)=><g key={i}><path d={b.path}/><text x={b.x+5} y={b.y-3}>{b.height}</text></g>)}<line x1="8" x2="264" y1={88-(v?.cut??3)*7} y2={88-(v?.cut??3)*7} className={s.cut}/>{[0,1,4,8].map((x,i)=><text key={x} x={20+i*66} y="106">{x}</text>)}<text x="186" y="15">groups={v?v.count:'?'}</text></svg>}
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
export default function Demo({slug}:{slug:string}){return <Lesson slug={slug} predict={{"question": "Points 0/1/4/8; single-link merges at 1/3/4. At cut 3, how many groups remain?", "options": ["2", "3"], "answer": 0}} minInteractions={3} exploreHint="Try each case and compare the saved results." reveal={()=><p className={s.explanation}>Single-link retained one merge at cut 2, leaving three groups. At cut 3 it retained two, leaving two. Complete-link measured the farthest pair: joining &#123;0,1&#125; with 4 cost 4, so cut 3 retained three groups. The linkage rule changes merge-height meaning.</p>}>{({locked,phase,interact})=><Stage locked={locked} phase={phase} interact={interact}/>}</Lesson>}
