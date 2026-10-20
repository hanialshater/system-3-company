"use client";
import {useState} from "react";
import {Lesson,type Phase} from "@/kit/Lesson";
import {Control} from "@/kit/controls";
import {useMilestones} from "@/kit/milestones";
import {compute,type Result} from "./model";
import s from "./styles.module.css";
const cases=["Front", "Weight.5", "Move B"];
const milestones=['0','1','2'];
type Witness=Result;
export function Figure({v}:{v:Witness|null}){ if(v?.points)return <svg className={s.figure} viewBox="0 0 280 86" role="img" aria-label="Maximize both objectives; B is visible between endpoint A and C."><path d="M15 65H260M15 65V8M15 9L255 65"/>{v.points.map(([x,y],i)=><g key={i}><circle cx={15+x*60} cy={65-y*14} r="3"/><text x={20+x*60} y={65-y*14}>{['A','B','C','D'][i]}</text></g>)}<text x="235" y="82">x→</text><text x="2" y="12">y</text></svg>;
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
export default function Demo({slug}:{slug:string}){return <Lesson slug={slug} predict={{"question": "You rank four designs on two goals, higher is better on both, using a weighted score. Maximize x,y. A(0,4),B(2,1),C(4,0),D(1,.5). Weighted score wx+(1−w)y. Must every nondominated point win some w∈[0,1]?", "options": ["No", "Yes"], "answer": 0}} minInteractions={3} exploreHint="Try each case and compare the saved results." reveal={()=><p className={s.explanation}>B was nondominated yet required w≥.6 to beat A and w≤⅓ to beat C: impossible together. Moving B to (2,3) made it win at w=.5. The exact inequalities, rather than a slider sample, establish the original discrete counterexample.</p>}>{({locked,phase,interact})=><Stage locked={locked} phase={phase} interact={interact}/>}</Lesson>}
