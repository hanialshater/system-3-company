"use client";
import {useState} from "react";
import {Lesson,type Phase} from "@/kit/Lesson";
import {Control} from "@/kit/controls";
import {useMilestones} from "@/kit/milestones";
import {compute,type Result} from "./model";
import s from "./styles.module.css";
const cases=["Original", "Mix", "Score1"];
const milestones=['0','1','2'];
type Witness=Result;
export function Figure({v}:{v:Witness|null}){
 return null;
}
function Stage({locked,phase,interact}:{locked:boolean;phase:Phase;interact:()=>void}){
 const [mode,setMode]=useState(-1),[value,setValue]=useState<Witness|null>(null);
 const [saved,setSaved]=useState<(Witness|null)[]>([null,null,null]);
 const {reach}=useMilestones(interact,milestones);
 const run=(next:number)=>{const result=compute(next);setMode(next);setValue(result);setSaved(old=>old.map((x,i)=>i===next?result:x));reach(String(next));};
 const shown=phase==='reveal'&&mode===-1?saved[0]:value;
 return <div className={s.wrap}><Figure v={shown}/><div className={s.readout} aria-live="polite">{shown?shown.lines.map((line,i)=><p key={i}>{line}</p>):<p className={s.blank}>Choose a case to see its result.</p>}</div><div className={s.controls}>{cases.map((label,i)=><Control key={label} disabled={locked||mode===i} aria-pressed={mode===i} onClick={()=>run(i)}>{label}</Control>)}<Control disabled={locked||mode===-1} onClick={()=>{setMode(-1);setValue(null);}}>Reset</Control></div><div className={s.saved} aria-label="Saved results">{saved.map((v,i)=>v?<p key={i}>{v.snapshot}</p>:null)}</div></div>;
}
export default function Demo({slug}:{slug:string}){return <Lesson slug={slug} predict={{"question": "You rate one fictional job's tasks for AI exposure. Fictional task shares Draft.4,Decide.35,Physical.25; exposure scores.8,.2,0. Weighted index Σshare×score. Do the same scores imply the same index for every job mix?", "options": ["No", "Yes"], "answer": 0}} minInteractions={3} exploreHint="Try each case and compare the saved results." reveal={()=><p className={s.explanation}>The original mix gave index .39; changing time shares gave .22. Raising only the draft score gave .47 while physical work remained. This fictional weighted exposure index is not the probability a job disappears or a forecast of employment, wages or replacement.</p>}>{({locked,phase,interact})=><Stage locked={locked} phase={phase} interact={interact}/>}</Lesson>}
