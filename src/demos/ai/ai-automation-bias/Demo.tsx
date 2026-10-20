"use client";
import {useState} from "react";
import {Lesson,type Phase} from "@/kit/Lesson";
import {Control} from "@/kit/controls";
import {useMilestones} from "@/kit/milestones";
import {compute,type Result} from "./model";
import s from "./styles.module.css";
const cases=["Machine A", "Machine B", "Fixed review"];
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
export default function Demo({slug}:{slug:string}){return <Lesson slug={slug} predict={{"question": "In 1,000 cases, reviewers correct every error they check and add none. A has a 10% error rate and 80% review rate; B has a 4% error rate and 10% review rate. Which combined system leaves fewer errors?", "options": ["A", "B"], "answer": 0}} minInteractions={3} exploreHint="Try each case and compare the saved results." reveal={()=><p className={s.explanation}>A left 20 expected errors; more accurate B left 36 under its stipulated lower review rate. Holding review at .8 reduced B to 8. The vigilance change is assumed, not measured or caused by accuracy here; these expected counts do not establish actual human behavior.</p>}>{({locked,phase,interact})=><Stage locked={locked} phase={phase} interact={interact}/>}</Lesson>}
