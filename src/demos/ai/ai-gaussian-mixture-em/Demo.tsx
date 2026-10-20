"use client";
import {useEffect,useState} from "react";
import {Lesson,type Phase} from "@/kit/Lesson";
import {Control} from "@/kit/controls";
import {useMilestones} from "@/kit/milestones";
import {compute,f} from "./model";
import s from "./styles.module.css";
const cases=["Apart", "Same"];
const milestones=cases.map((_,i)=>String(i));
type Witness=ReturnType<typeof compute>;
export function Figure({v}:{v:Witness|null}){return <svg className={s.figure} viewBox="0 0 280 110" role="img" aria-label="Compute soft responsibilities before moving means."><text x="8" y="15">σ²=1 · w=.5/.5 · r(μ{v?v.initial.join('/μ'):'0/μ2'})</text>{[0,1].map(i=><g key={i}><text x="8" y={43+i*25}>x={i*2}</text><rect x="46" y={29+i*25} width={v?v.responsibilities[i][0]*148:0} height="18"/><rect className={s.mark} x={46+(v?v.responsibilities[i][0]*148:0)} y={29+i*25} width={v?v.responsibilities[i][1]*148:0} height="18"/><text x="200" y={43+i*25}>{v?v.responsibilities[i].map(x=>f(x).replace(/^0/,'' )).join('/'):'?/?'}</text></g>)}<text x="8" y="95">μ′=Σ(rx)/Σr={v?v.means.map(f).join('/'):'?'}</text></svg>}
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
export default function Demo({slug}:{slug:string}){return <Lesson slug={slug} predict={{"question": "You sort two points into two groups with a mixture model. Points 0/2; equal Gaussian weights, variance 1, means 0/2. Does EM give each point exclusive membership?", "options": ["No, responsibilities are fractional", "Yes, nearest means get full membership"], "answer": 0}} minInteractions={2} exploreHint="Try each case and compare the saved results." reveal={()=><p className={s.explanation}>With means 0/2, each nearby component received responsibility .881 and the other .119. Weighted means moved to .238/1.762. Coincident means 1/1 gave equal responsibilities and stayed together. This is one fixed-variance EM step, not a global-optimum or covariance-fitting claim.</p>}>{({locked,phase,interact})=><Stage locked={locked} phase={phase} interact={interact}/>}</Lesson>}
