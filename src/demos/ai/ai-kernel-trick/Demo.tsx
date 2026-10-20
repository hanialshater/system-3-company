"use client";
import {useEffect,useState} from "react";
import {Lesson,type Phase} from "@/kit/Lesson";
import {Control} from "@/kit/controls";
import {useMilestones} from "@/kit/milestones";
import {compute,f} from "./model";
import s from "./styles.module.css";
const cases=["Map", "K(2,1)", "Negative"];
const milestones=cases.map((_,i)=>String(i));
type Witness=ReturnType<typeof compute>;
export function Figure({v}:{v:Witness|null}){return <svg className={s.figure} viewBox="0 0 280 110" role="img" aria-label="Compare a feature inner product with its exact kernel."><text x="8" y="15">φ(x)=(x,x²) · K=xz+x²z²</text><line x1="20" x2="198" y1="58" y2="58" className={s.cut}/>{[-1,0,1].map((x,i)=><g key={x}><circle cx={40+i*70} cy={v?80-x*x*44:80} r="6" className={s.mark}/><text x={30+i*70} y="98">{x}</text></g>)}<text x="209" y="45">.5</text><text x="8" y="35">{v?`${v.x},${v.z}: ${f(v.kernel)}=${f(v.explicit)}`:'labels=+/−/+'}</text></svg>}
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
export default function Demo({slug}:{slug:string}){return <Lesson slug={slug} predict={{"question": "Inputs −1/0/1 have labels +/−/+. Can the squared coordinate separate them with threshold .5?", "options": ["Yes", "No"], "answer": 0}} minInteractions={3} exploreHint="Compute every case; compare the retained witnesses." reveal={()=><p className={s.explanation}>The squared coordinate put outer inputs at 1 and the middle at 0, separable at .5. The explicit kernel xz+x²z² matched feature dot products: K(2,1)=6 and K(.5,−1)=−.25. A negative off-diagonal entry is allowed; arbitrary similarities are not automatically valid kernels.</p>}>{({locked,phase,interact})=><Stage locked={locked} phase={phase} interact={interact}/>}</Lesson>}
