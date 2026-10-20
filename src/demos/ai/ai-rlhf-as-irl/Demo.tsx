"use client";
import {useEffect,useState} from "react";
import {Lesson,type Phase} from "@/kit/Lesson";
import {Control} from "@/kit/controls";
import {useMilestones} from "@/kit/milestones";
import {compute} from "./model";
import s from "./styles.module.css";
const cases=["θ=(ln3,0)", "θ=(0,−ln3)"];
const neutral=["A>B=3; B>A=1 · P=σ(rA−rB)", "features A=1/0 B=0/1 C=1/1"];
const milestones=cases.map((_,i)=>String(i));
type Witness=ReturnType<typeof compute>;
export function Figure({value}:{value:Witness|null}){
 const rows=value?value.rows:neutral;
 const height=rows.length*19+9;
 return <svg className={s.figure} viewBox={`0 0 300 ${height}`} role="img" aria-label="Fit a difference, then inspect a new pair.">{rows.map((row,i)=><g key={i}><text x="3" y={18+i*19}>{row}</text>{i<rows.length-1?<line x1="3" x2="297" y1={22+i*19} y2={22+i*19}/>:null}</g>)}</svg>;
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
export default function Demo({slug}:{slug:string}){return <Lesson slug={slug} predict={{"question": "A>B occurs 3 times; B>A once. Features A=(1,0), B=(0,1), C=(1,1). Does this fix both reward weights?", "options": ["No", "Yes"], "answer": 0}} minInteractions={2} exploreHint="Try each case and compare the saved results." reveal={()=><p>Both reward hypotheses fitted the observed pair with probability .75 and equal likelihood. Their heldout A-versus-C predictions differed. Fitting a reward difference is not unique reward recovery, a full trajectory-IRL algorithm, or recovered human values.</p>}>{({locked,phase,interact})=><Stage locked={locked} phase={phase} interact={interact}/>}</Lesson>}
