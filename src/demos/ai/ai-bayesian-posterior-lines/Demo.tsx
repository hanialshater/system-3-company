"use client";
import {useEffect,useState} from "react";
import {Lesson,type Phase} from "@/kit/Lesson";
import {Control} from "@/kit/controls";
import {useMilestones} from "@/kit/milestones";
import {compute,f} from "./model";
import s from "./styles.module.css";
const cases=["y=1", "y=0", "x=0"];
const milestones=cases.map((_,i)=>String(i));
type Witness=ReturnType<typeof compute>;
export function Figure({v}:{v:Witness|null}){return <svg className={s.figure} viewBox="0 0 280 110" role="img" aria-label="Update two candidate slopes with explicit likelihoods."><path d="M24 72H192M24 72V20M24 72L164 24"/>{v&&<circle cx={24+v.x*70} cy={72-v.average*24} r="4" className={s.mark}/>}<text x="8" y="14">prior=.5/.5 · L={v&&v.mass[0]>.5?'.8/.2':'.2/.8'}</text><text x="195" y="38">s=1</text><text x="195" y="72">s=0</text><text x="8" y="95">{v?`p=${v.mass.map(f).join('/')} μ=${f(v.average)} v=${f(v.variance)}`:'x=2 · p=? μ=? v=?'}</text></svg>}
function Stage({locked,phase,interact}:{locked:boolean;phase:Phase;interact:()=>void}){
 const [mode,setMode]=useState(-1);
 const [value,setValue]=useState<Witness|null>(null);
 const [saved,setSaved]=useState<(string|null)[]>(()=>cases.map(()=>null));
 const {reach}=useMilestones(interact,milestones);
 // Reveal restores the primary witness only after every named case was earned.
 // Reset clears the current computation, while retained witnesses survive.
 useEffect(()=>{if(phase==="reveal"){setMode(0);setValue(compute(0));}},[phase]);
 const run=(next:number)=>{const result=compute(next);setMode(next);setValue(result);setSaved(old=>old.map((x,i)=>i===next?result.snapshot:x));reach(String(next));};
 return <div className={s.wrap}><Figure v={value}/><div className={s.controls}>{cases.map((label,i)=><Control key={label} disabled={locked||mode===i} aria-pressed={mode===i} onClick={()=>run(i)}>{label}</Control>)}<Control disabled={locked||mode===-1} onClick={()=>{setMode(-1);setValue(null);}}>Reset</Control></div><div className={s.evidence} aria-label="Retained computed witnesses" aria-live="polite">{saved.map((x,i)=>x===null?null:<p key={i}>{x}</p>)}</div></div>;
}
export default function Demo({slug}:{slug:string}){return <Lesson slug={slug} predict={{"question": "Slopes 0/1 have equal priors. Observing y=1 at x=1 has likelihoods .2/.8. Which slope gains weight?", "options": ["Slope 1", "Slope 0"], "answer": 0}} minInteractions={3} exploreHint="Compute every case; compare the retained witnesses." reveal={()=><p className={s.explanation}>The y=1 likelihoods produced weights .2/.8. At x=2, candidate predictions 0/2 gave mean 1.6 and variance .64. Reversing likelihoods moved the mean to .4. At x=0 both lines agreed. These are declared finite hypotheses, not a fitted Gaussian regression.</p>}>{({locked,phase,interact})=><Stage locked={locked} phase={phase} interact={interact}/>}</Lesson>}
