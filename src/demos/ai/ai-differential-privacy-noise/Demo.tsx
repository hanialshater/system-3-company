"use client";
import {useState} from "react";
import {Lesson,type Phase} from "@/kit/Lesson";
import {Control} from "@/kit/controls";
import {useMilestones} from "@/kit/milestones";
import {compute,type Result} from "./model";
import s from "./styles.module.css";
const cases=["b1", "b2", "Two releases"];
const milestones=['0','1','2'];
type Witness=Result;
export function Figure({v}:{v:Witness|null}){ if(v?.density){const pts=v.density;return <svg className={s.figure} viewBox="0 0 280 86" role="img" aria-label="Neighbouring count densities m0 solid and m1 dashed; these are not point probabilities."><path d="M8 65H270"/>{[1,2].map(j=><path key={j} strokeDasharray={j===2?'4 3':undefined} d={pts.map((p,i)=>`${i?'L':'M'}${8+(p[0]+3)*32.5},${65-p[j]*90}`).join(' ')}/>)}<text x="8" y="12">density m₀— m₁┄</text><text x="8" y="82">z: −3</text><text x="240" y="82">5</text></svg>;}
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
export default function Demo({slug}:{slug:string}){return <Lesson slug={slug} predict={{"question": "Add/remove adjacency; count sensitivity1. Density m_c(z)=exp(−|z−c|/b)/(2b), c0/1. At z0, can b=.5 keep the ε1 density-ratio bound?", "options": ["No", "Yes"], "answer": 0}} minInteractions={3} exploreHint="Try each case and compare the saved results." reveal={()=><p className={s.explanation}>At b1 the log-density ratio stayed within ±1; b2 reduced the bound to .5 while doubling expected absolute error. Independent repeated releases add log ratios, giving bound 2. Noise calibration, adjacency and release count matter. These are densities, not point probabilities or product certification.</p>}>{({locked,phase,interact})=><Stage locked={locked} phase={phase} interact={interact}/>}</Lesson>}
