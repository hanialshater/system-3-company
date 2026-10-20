"use client";
import {useEffect,useState} from "react";
import {Lesson,type Phase} from "@/kit/Lesson";
import {Control} from "@/kit/controls";
import {useMilestones} from "@/kit/milestones";
import {compute,f} from "./model";
import s from "./styles.module.css";
const cases=["λ=.5", "λ=.2", "Scale×10"];
const milestones=cases.map((_,i)=>String(i));
type Witness=ReturnType<typeof compute>;
export function Figure({v}:{v:Witness|null}){return <svg className={s.figure} viewBox="0 0 280 110" role="img" aria-label="Fuse declared scores and test their scale."><text x="8" y="15">K={v?v.keyword.map(x=>x*v.scale).join('/'):'1/0/.5'} · V=.1/.9/.4</text>{[0,1,2].map(i=><g key={i}><text x="8" y={40+i*24}>{'ABC'[i]}</text><rect x="34" y={27+i*24} width={v?Math.min(160,v.scores[i]*29):0} height="16" className={s.mark}/><text x="206" y={40+i*24}>{v?f(v.scores[i]):'?'}</text></g>)}</svg>}
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
export default function Demo({slug}:{slug:string}){return <Lesson slug={slug} predict={{"question": "A/B/C keyword=1/0/.5; vector=.1/.9/.4, all on [0,1]. With keyword weight .5, which ranks first?", "options": ["A", "B"], "answer": 0}} minInteractions={3} exploreHint="Compute every case; compare the retained witnesses." reveal={()=><p className={s.explanation}>At equal weights, A scored .55 and led. Reducing keyword weight to .2 made B lead at .72. Multiplying keyword scores by 10 made A score 5.05 at equal weights. Weight interpretation depends on declared score scales; hybrid fusion need not improve retrieval.</p>}>{({locked,phase,interact})=><Stage locked={locked} phase={phase} interact={interact}/>}</Lesson>}
