"use client";
import {useEffect,useState} from "react";
import {Lesson,type Phase} from "@/kit/Lesson";
import {Control} from "@/kit/controls";
import {useMilestones} from "@/kit/milestones";
import {compute} from "./model";
import s from "./styles.module.css";
const cases=["Free", "b fixed", "Cap a≤1"];
const neutral=["approval: a+b≥2 · start0/0", "grid0,.5,1,1.5,2 · minimize a²+b²", "immutable b; cap a≤1"];
const milestones=cases.map((_,i)=>String(i));
type Witness=ReturnType<typeof compute>;
export function Figure({value}:{value:Witness|null}){
 const rows=value?value.rows:neutral;
 const height=rows.length*19+9;
 return <svg className={s.figure} viewBox={`0 0 300 ${height}`} role="img" aria-label="Search edits under explicit constraints.">{rows.map((row,i)=><g key={i}><text x="3" y={18+i*19}>{row}</text>{i<rows.length-1?<line x1="3" x2="297" y1={22+i*19} y2={22+i*19}/>:null}</g>)}</svg>;
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
export default function Demo({slug}:{slug:string}){return <Lesson slug={slug} predict={{"question": "Your application is declined, and a tool searches for the smallest edit that would get it approved. Approval needs a+b≥2 from (0,0); edits lie on .5-grid. Is the closest unconstrained edit always actionable?", "options": ["No", "Yes"], "answer": 0}} minInteractions={3} exploreHint="Try each case and compare the saved results." reveal={()=><p>The nearest unconstrained edit changed both coordinates. Fixing b required a larger edit; capping a then made the target infeasible. These supplied constraints distinguish geometric proximity from actionability without claiming a causal real-world intervention.</p>}>{({locked,phase,interact})=><Stage locked={locked} phase={phase} interact={interact}/>}</Lesson>}
