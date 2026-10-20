"use client";
import {useEffect,useState} from "react";
import {Lesson,type Phase} from "@/kit/Lesson";
import {Control} from "@/kit/controls";
import {useMilestones} from "@/kit/milestones";
import {compute,f} from "./model";
import s from "./styles.module.css";
const cases=["Noise 0", "Noise 1"];
const milestones=cases.map((_,i)=>String(i));
type Witness=ReturnType<typeof compute>;
export function Figure({v}:{v:Witness|null}){return <svg className={s.figure} viewBox="0 0 280 110" role="img" aria-label="Condition a fixed one-point Gaussian process."><text x="8" y="15">m=k/(1+n) · v=1−k²/(1+n)</text><text x="8" y="38">query</text><text x="90" y="38">mean</text><text x="155" y="38">latent-v</text><text x="224" y="38">obs-v</text>{[0,1].map((i)=><g key={i}><text x="8" y={61+i*26}>{i===0?'0':'√(2ln2)'}</text><text x="90" y={61+i*26}>{v?f(v.rows[i].mean):'?'}</text><text x="163" y={61+i*26}>{v?f(v.rows[i].latent):'?'}</text><text x="228" y={61+i*26}>{v?f(v.rows[i].observation):'?'}</text></g>)}</svg>}
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
export default function Demo({slug}:{slug:string}){return <Lesson slug={slug} predict={{"question": "Zero-mean GP: k(x,z)=exp(−(x−z)²/2), observed (0,1). With noise variance 1, must latent variance at x=0 vanish?", "options": ["No", "Yes"], "answer": 0}} minInteractions={2} exploreHint="Try each case and compare the saved results." reveal={()=><p className={s.explanation}>Noiseless conditioning gave mean 1 and latent variance 0 at the observation. With noise variance 1, both became .5. At the farther query, k=.5. New-observation variance additionally includes noise. Kernel and length scale stay fixed; these are not coverage bands.</p>}>{({locked,phase,interact})=><Stage locked={locked} phase={phase} interact={interact}/>}</Lesson>}
