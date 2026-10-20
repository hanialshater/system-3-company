"use client";
import {useEffect,useState} from "react";
import {Lesson,type Phase} from "@/kit/Lesson";
import {Control} from "@/kit/controls";
import {useMilestones} from "@/kit/milestones";
import {compute,f} from "./model";
import s from "./styles.module.css";
const cases=["One", "Group", "Unused x1"];
const milestones=cases.map((_,i)=>String(i));
type Witness=ReturnType<typeof compute>;
export function Figure({v}:{v:Witness|null}){return <svg className={s.figure} viewBox="0 0 280 110" role="img" aria-label="Recompute held-out loss after explicit permutations."><text x="8" y="15">baseline:x1=x2=y=0/1/2 · MSE=0</text><text x="8" y="39">x1={v?v.x1.join('/'):'2/1/0'}</text><text x="145" y="39">x2={v?v.x2.join('/'):'0/1/2'}</text><text x="8" y="66">ŷ={v?v.predictions.join('/'):'?'} · y=0/1/2</text><text x="8" y="95">MSE={v?f(v.loss):'?'}</text></svg>}
function Stage({locked,phase,interact}:{locked:boolean;phase:Phase;interact:()=>void}){
 const [mode,setMode]=useState(-1);
 const [value,setValue]=useState<Witness|null>(null);
 const [saved,setSaved]=useState<(string|null)[]>(()=>cases.map(()=>null));
 const {reach}=useMilestones(interact,milestones);
 // Reveal restores the primary witness only after every named case was earned.
 // Reset clears the current computation, while retained witnesses survive.
 useEffect(()=>{if(phase==="reveal"){setMode(0);setValue(compute(0));}},[phase]);
 const run=(next:number)=>{const result=compute(next);setMode(next);setValue(result);setSaved(old=>old.map((x,i)=>i===next?result.snapshot:x));reach(String(next));};
 return <div className={s.wrap}><Figure v={value}/><div className={s.controls}>{cases.map((label,i)=><Control key={label} disabled={locked||mode===i} aria-pressed={mode===i} onClick={()=>run(i)}>{label}</Control>)}<Control disabled={locked||mode===-1} onClick={()=>{setMode(-1);setValue(null);}}>Reset</Control></div><div className={s.evidence} aria-label="Saved results" aria-live="polite">{saved.map((x,i)=>x===null?null:<p key={i}>{x}</p>)}</div></div>;
}
export default function Demo({slug}:{slug:string}){return <Lesson slug={slug} predict={{"question": "You test which inputs your model leans on by scrambling columns in held-out data. x1=x2=y=[0,1,2]; predictor=(x1+x2)/2. Which hurts more: reversing x1 alone, or both columns together?", "options": ["Both together", "x1 alone"], "answer": 0}} minInteractions={3} exploreHint="Try each case and compare the saved results." reveal={()=><p className={s.explanation}>Reversing x1 alone made predictions [1,1,1], MSE .667. Reversing both paired columns gave [2,1,0], MSE 2.667. Under a predictor using x2 alone, reversing x1 had zero effect. Importance depends on the fixed predictor, data, and perturbation; it is not causal credit.</p>}>{({locked,phase,interact})=><Stage locked={locked} phase={phase} interact={interact}/>}</Lesson>}
