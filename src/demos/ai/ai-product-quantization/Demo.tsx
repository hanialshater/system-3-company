"use client";
import {useEffect,useState} from "react";
import {Lesson,type Phase} from "@/kit/Lesson";
import {Control} from "@/kit/controls";
import {useMilestones} from "@/kit/milestones";
import {compute,f} from "./model";
import s from "./styles.module.css";
const cases=["Coarse", "Richer"];
const milestones=cases.map((_,i)=>String(i));
type Witness=ReturnType<typeof compute>;
export function Figure({v}:{v:Witness|null}){return <svg className={s.figure} viewBox="0 0 280 110" role="img" aria-label="Separate reconstruction distortion from query-distance error."><text x="8" y="15">v=(.2,.6)|(1.2,1.6) · query=0</text><text x="8" y="36">{v&&v.distortion<.2?'add:(0,.5)|(1,1.5)':'book:(0,0)/(1,1)/(2,2)'}</text><text x="8" y="57">codes={v?v.codes.map(c=>c.join(',')).join('|'):'?|?'}</text><text x="8" y="78">D={v?f(v.distortion):'?'} · exact-d²={v?f(v.exact):'?'}</text><text x="8" y="99">lookup={v?v.lookups.map(f).join('+'):'?+?'}={v?f(v.approximate):'?'}</text></svg>}
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
export default function Demo({slug}:{slug:string}){return <Lesson slug={slug} predict={{"question": "v=[.2,.6,1.2,1.6], query=0. Each 2D subcodebook has (0,0),(1,1),(2,2). Does lookup distance equal exact squared distance?", "options": ["No", "Yes"], "answer": 0}} minInteractions={2} exploreHint="Compute every case; compare the retained witnesses." reveal={()=><p className={s.explanation}>Two subspace codes reconstructed [0,0,1,1], distortion .8. Squared distance to zero became 2 versus exact 4.4. Richer codes reconstructed [0,.5,1,1.5], distortion .1 and query distance 3.5. Reconstruction distortion and query-distance error differ; rankings need not survive compression.</p>}>{({locked,phase,interact})=><Stage locked={locked} phase={phase} interact={interact}/>}</Lesson>}
