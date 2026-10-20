"use client";
import {useEffect,useState} from "react";
import {Lesson,type Phase} from "@/kit/Lesson";
import {Control} from "@/kit/controls";
import {useMilestones} from "@/kit/milestones";
import {compute,f} from "./model";
import s from "./styles.module.css";
const cases=["Original", "Rescale"];
const milestones=cases.map((_,i)=>String(i));
type Witness=ReturnType<typeof compute>;
export function Figure({v}:{v:Witness|null}){return <svg className={s.figure} viewBox="0 0 280 110" role="img" aria-label="Multiply factors, then rescale without changing predictions."><text x="8" y="15">base-U=10/01/11 · V=20/03/11</text><text x="8" y="40">{v?`U3=${v.users[2].join('/')} C=${v.items[2].join('/')}`:'U3·C=?'}</text>{[0,1,2].map(i=><text key={i} x="37" y={61+i*18}>{v?v.matrix[i].join('/'):'?/?/?'}</text>)}</svg>}
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
export default function Demo({slug}:{slug:string}){return <Lesson slug={slug} predict={{"question": "U3=[1,1], item C=[1,1]. What score does their dot product produce?", "options": ["2", "1"], "answer": 0}} minInteractions={2} exploreHint="Compute every case; compare the retained witnesses." reveal={()=><p className={s.explanation}>Dot products produced rows [2,0,1], [0,3,1], and [2,3,2]. Doubling user factors and halving item factors preserved every prediction. Different coordinates therefore fit the same scores; these latent axes do not uniquely identify psychological tastes. No training procedure is implied.</p>}>{({locked,phase,interact})=><Stage locked={locked} phase={phase} interact={interact}/>}</Lesson>}
