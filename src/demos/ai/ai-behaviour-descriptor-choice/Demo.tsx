"use client";
import {useState} from "react";
import {Lesson,type Phase} from "@/kit/Lesson";
import {Control} from "@/kit/controls";
import {useMilestones} from "@/kit/milestones";
import {compute,type Result} from "./model";
import s from "./styles.module.css";
const cases=["Position", "Speed3", "Speed2"];
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
export default function Demo({slug}:{slug:string}){return <Lesson slug={slug} predict={{"question": "A:(position0,0;speed1,energy4;q5), B:(.2,.2;4,1;6), C:(1.2,.2;2,2;4), D:(1.2,1.2;3,3;7). Can rebinned identical candidates change coverage?", "options": ["Yes", "No"], "answer": 0}} minInteractions={3} exploreHint="Try each case and compare the saved results." reveal={()=><p className={s.explanation}>Position bins retained three elites with quality sum 17; speed/energy split at 3 retained four with sum 22. Lowering the speed boundary to 2 merged B/C again. Maximum quality remained 7. Coverage depends on descriptor axes and boundaries, not only the candidates.</p>}>{({locked,phase,interact})=><Stage locked={locked} phase={phase} interact={interact}/>}</Lesson>}
