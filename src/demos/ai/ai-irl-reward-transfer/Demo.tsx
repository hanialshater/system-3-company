"use client";
import {useEffect,useState} from "react";
import {Lesson,type Phase} from "@/kit/Lesson";
import {Control} from "@/kit/controls";
import {useMilestones} from "@/kit/milestones";
import {compute} from "./model";
import s from "./styles.module.css";
const cases=["Goal G", "Wrong E"];
const neutral=["S—M—G / D—E—F; vertical links", "M–G blocked · cost1 · goal reward10", "horizon4 · ties Right,Down,Left,Up"];
const milestones=cases.map((_,i)=>String(i));
type Witness=ReturnType<typeof compute>;
export function Figure({value}:{value:Witness|null}){
 const rows=value?value.rows:neutral;
 const height=rows.length*19+9;
 return <svg className={s.figure} viewBox={`0 0 300 ${height}`} role="img" aria-label="Replan a declared goal instead of replaying actions.">{rows.map((row,i)=><g key={i}><text x="3" y={18+i*19}>{row}</text>{i<rows.length-1?<line x1="3" x2="297" y1={22+i*19} y2={22+i*19}/>:null}</g>)}</svg>;
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
export default function Demo({slug}:{slug:string}){return <Lesson slug={slug} predict={{"question": "A robot learned to reach goal G, and then a wall goes up. S–M–G top row; D–E–F bottom; vertical links. M–G closes. Does Right,Right still reach G?", "options": ["No", "Yes"], "answer": 0}} minInteractions={2} exploreHint="Try each case and compare the saved results." reveal={()=><p>The old two-right-action clone hit the wall and returned −2. Replanning the same goal found a four-move route worth 6. Replanning a wrongly inferred E goal worked mechanically but earned true G-return −2. Suitable reward and dynamics assumptions matter.</p>}>{({locked,phase,interact})=><Stage locked={locked} phase={phase} interact={interact}/>}</Lesson>}
