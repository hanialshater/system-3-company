"use client";
import {useEffect,useState} from "react";
import {Lesson,type Phase} from "@/kit/Lesson";
import {Control} from "@/kit/controls";
import {useMilestones} from "@/kit/milestones";
import {compute} from "./model";
import s from "./styles.module.css";
const cases=["Checks .5", "Checks 2"];
const neutral=["A2 ∥ B2 → checkA → checkB → C1", "2 workers; serial5", "each handoff valid .9 independently"];
const milestones=cases.map((_,i)=>String(i));
type Witness=ReturnType<typeof compute>;
export function Figure({value}:{value:Witness|null}){
 const rows=value?value.rows:neutral;
 const height=rows.length*19+9;
 return <svg className={s.figure} viewBox={`0 0 300 ${height}`} role="img" aria-label="Schedule dependencies and interface checks.">{rows.map((row,i)=><g key={i}><text x="3" y={18+i*19}>{row}</text>{i<rows.length-1?<line x1="3" x2="297" y1={22+i*19} y2={22+i*19}/>:null}</g>)}</svg>;
}
function Stage({locked,phase,interact}:{locked:boolean;phase:Phase;interact:()=>void}){
 const [mode,setMode]=useState(-1);
 const [value,setValue]=useState<Witness|null>(null);
 const [saved,setSaved]=useState<(string|null)[]>(()=>cases.map(()=>null));
 const {reach}=useMilestones(interact,milestones);
 useEffect(()=>{if(phase==="reveal"){setMode(0);setValue(compute(0));}},[phase]);
 const run=(next:number)=>{const result=compute(next);setMode(next);setValue(result);setSaved(old=>old.map((x,i)=>i===next?result.receipt:x));reach(String(next));};
 return <div className={s.wrap}><Figure value={value}/><div className={s.controls}>{cases.map((label,i)=><Control key={label} disabled={locked||mode===i} aria-pressed={mode===i} onClick={()=>run(i)}>{label}</Control>)}<Control disabled={locked||mode===-1} onClick={()=>{setMode(-1);setValue(null);}}>Reset</Control></div><div className={s.evidence} aria-label="Saved results" aria-live="polite">{saved.map((x,i)=>x===null?null:<p key={i}>{x}</p>)}</div></div>;
}
export default function Demo({slug}:{slug:string}){return <Lesson slug={slug} predict={{"question": "A2 and B2 are independent; C1 needs both. Two serial checks cost .5 each. When can C begin?", "options": ["Time 3", "Time 0"], "answer": 0}} minInteractions={2} exploreHint="Try each case and compare the saved results." reveal={()=><p>Parallel tasks saved time only after paying interface checks. Raising each check to 2 made the split slower than serial work. Starting C before its inputs was invalid. Completion time and the .81 joint handoff-validity probability measure different things.</p>}>{({locked,phase,interact})=><Stage locked={locked} phase={phase} interact={interact}/>}</Lesson>}
