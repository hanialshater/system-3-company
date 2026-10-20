"use client";
import {useState} from "react";
import {Lesson,type Phase} from "@/kit/Lesson";
import {Control} from "@/kit/controls";
import {useMilestones} from "@/kit/milestones";
import {compute,type Result} from "./model";
import s from "./styles.module.css";
const cases=["Prevalence1%", "Abstain", "Prevalence50%"];
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
export default function Demo({slug}:{slug:string}){return <Lesson slug={slug} predict={{"question": "A school runs submitted essays through an AI detector. A fictional set of 10,000 texts has 1% machine-written texts. The detector flags 90% of machine texts and 5% of human texts. Are most flagged texts machine-written? The alternative flags only high scores and leaves medium scores undecided.", "options": ["No", "Yes"], "answer": 0}} minInteractions={3} exploreHint="Try each case and compare the saved results." reveal={()=><p className={s.explanation}>At prevalence 1%, expected flags were 90 true and 495 false. High-only flagging improved precision to .377 but abstained on 426 texts and missed more machine texts. A different prevalence changed the posterior again. These stipulated expected counts do not establish individual authorship.</p>}>{({locked,phase,interact})=><Stage locked={locked} phase={phase} interact={interact}/>}</Lesson>}
