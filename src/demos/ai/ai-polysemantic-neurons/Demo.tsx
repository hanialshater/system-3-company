"use client";
import {useEffect,useState} from "react";
import {Lesson,type Phase} from "@/kit/Lesson";
import {Control} from "@/kit/controls";
import {useMilestones} from "@/kit/milestones";
import {compute} from "./model";
import s from "./styles.module.css";
const cases=["T only", "S only", "Both"];
const neutral=["h=ReLU(T+S−.5)", "binary T/S · supplied toy neuron"];
const milestones=cases.map((_,i)=>String(i));
type Witness=ReturnType<typeof compute>;
export function Figure({value}:{value:Witness|null}){
 const rows=value?value.rows:neutral;
 const height=rows.length*19+9;
 return <svg className={s.figure} viewBox={`0 0 300 ${height}`} role="img" aria-label="Find distinct inputs with the same activation.">{rows.map((row,i)=><g key={i}><text x="3" y={18+i*19}>{row}</text>{i<rows.length-1?<line x1="3" x2="297" y1={22+i*19} y2={22+i*19}/>:null}</g>)}</svg>;
}
function Stage({locked,phase,interact}:{locked:boolean;phase:Phase;interact:()=>void}){
 const [mode,setMode]=useState(-1);
 const [value,setValue]=useState<Witness|null>(null);
 const [saved,setSaved]=useState<(string|null)[]>(()=>cases.map(()=>null));
 const {reach}=useMilestones(interact,milestones);
 useEffect(()=>{if(phase==="reveal"){setMode(0);setValue(compute(0));}},[phase]);
 const run=(next:number)=>{const result=compute(next);setMode(next);setValue(result);setSaved(old=>old.map((x,i)=>i===next?result.receipt:x));reach(String(next));};
 return <div className={s.wrap}><Figure value={value}/><div className={s.controls}>{cases.map((label,i)=><Control key={label} disabled={locked||mode===i} aria-pressed={mode===i} onClick={()=>run(i)}>{label}</Control>)}<Control disabled={locked||mode===-1} onClick={()=>{setMode(-1);setValue(null);}}>Reset</Control></div><div className={s.evidence} aria-label="Retained computed witnesses" aria-live="polite">{saved.map((x,i)=>x===null?null:<p key={i}>{x}</p>)}</div></div>;
}
export default function Demo({slug}:{slug:string}){return <Lesson slug={slug} predict={{"question": "h=max(0,T+S−.5). T/S are binary features. Does h=.5 uniquely identify T?", "options": ["No", "Yes"], "answer": 0}} minInteractions={3} exploreHint="Compute each case; compare retained witnesses." reveal={()=><p>Either singleton input produced activation .5, so this neuron’s value did not uniquely identify the active feature. Coactivation produced 1.5. These are declared binary features in one constructed unit, not identified meanings / prevalence in a trained model.</p>}>{({locked,phase,interact})=><Stage locked={locked} phase={phase} interact={interact}/>}</Lesson>}
