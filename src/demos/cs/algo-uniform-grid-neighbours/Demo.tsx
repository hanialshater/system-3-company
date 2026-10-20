"use client";
import {useState} from "react";
import {Lesson} from "@/kit/Lesson";
import {Control} from "@/kit/controls";
import {run} from "./model";
import s from "./styles.module.css";
export default function Demo({slug}:{slug:string}){
const [step,setStep]=useState(0),[contrast,setContrast]=useState(false),[adjacent,setAdjacent]=useState(false),[seenContrast,setSeenContrast]=useState(false),[seenAdjacent,setSeenAdjacent]=useState(false);const result=run(contrast,adjacent),w=run();const px=(x:number)=>34+x*15,py=(y:number)=>53-y*15;const low=contrast?-1.2:-1,high=contrast?2.4:3;const lines=Array.from({length:Math.round((high-low)/result.h)+1},(_,i)=>low+i*result.h);
return <Lesson slug={slug} predict={{"question": "q=(.9,.9), radius 1. A=(1.1,.9), B=(1.9,1.9), C=(2.1,.9). Which points are within the radius?", "options": ["A only", "A and B", "All three"], "answer": 0}} minInteractions={3} exploreHint="Find candidate cells, filter distances, then test smaller cells." reveal={()=><p id="reveal-compact">Primary candidate cells offered {w.candidates.map(p=>p.id).join(",")}; distance filtering kept {w.neighbours.map(p=>p.id).join(",")}. C was outside those cells. With h=.4, nearby A is two cells away: safe offsets are ceil(1/.4)={run(true).k}; eight-adjacent-only misses A. Cell candidates are not radius matches. Dense buckets can contain every point; no universal speedup follows.</p>}>
{({locked,interact})=><div className={s.root}>
<svg className={s.picture} viewBox="0 0 290 76" role="img" aria-label="Uniform grid candidates and exact radius filtering">
 {step>0?<rect x={px((result.home[0]-result.k)*result.h)} y={py((result.home[1]+result.k+1)*result.h)} width={(2*result.k+1)*result.h*15} height={(2*result.k+1)*result.h*15} fill="var(--domain)" opacity=".14"/>:null}
 {lines.map((n,i)=><g key={i}><line x1={px(n)} x2={px(n)} y1={py(low)} y2={py(high)} stroke="var(--line)"/><line x1={px(low)} x2={px(high)} y1={py(n)} y2={py(n)} stroke="var(--line)"/></g>)}
 <circle cx={px(result.q.x)} cy={py(result.q.y)} r={result.r*15} fill="none" stroke="var(--domain)" strokeDasharray="4 3"/><circle cx={px(result.q.x)} cy={py(result.q.y)} r="2" fill="var(--fg)"/><text x={px(result.q.x)-13} y={py(result.q.y)+13}>q</text>
 {result.points.map(p=><g key={p.id}><circle cx={px(p.x)} cy={py(p.y)} r={step>0&&result.candidates.some(c=>c.id===p.id)?3:2} fill={step>=2&&result.neighbours.some(c=>c.id===p.id)?"var(--good)":"var(--fg)"}/><text x={px(p.x)+4} y={py(p.y)+(p.id==="C"?13:-5)}>{p.id}</text></g>)}
 <text x="112" y="14">h={result.h} · r={result.r} · q({result.q.x},{result.q.y})</text>
 <text x="112" y="32">{step>0?`offset ±${result.k}`:"floor(x/h), floor(y/h)"}</text>
 {step>=2?<><text x="112" y="50">candidates: {result.candidates.map(p=>p.id).join(",")||"∅"}</text><text x="112" y="68">within: {result.neighbours.map(p=>p.id).join(",")||"∅"}</text></>:null}
 </svg>
<div className={s.proof} aria-live="polite">{step>=2?<div>Primary A,B → A</div>:null}{seenContrast?<div>h=.4: A@offset2 · safe±{run(true).k} → A</div>:null}{seenAdjacent?<div>Eight-adjacent ±1 → ∅</div>:null}</div>
<div className={s.controls}><Control disabled={locked||step>0} onClick={()=>setStep(1)}>Find cells</Control><Control disabled={locked||step!==1} onClick={()=>{setStep(2);interact();}}>Filter</Control><Control disabled={locked||step!==2||contrast} onClick={()=>{setContrast(true);if(!seenContrast){setSeenContrast(true);interact();}}}>h=.4</Control><Control disabled={locked||!contrast||adjacent} onClick={()=>{setAdjacent(true);if(!seenAdjacent){setSeenAdjacent(true);interact();}}}>±1 only</Control><Control disabled={locked||(!contrast&&!adjacent)} onClick={()=>{setContrast(false);setAdjacent(false);}}>Reset</Control></div>
</div>}
</Lesson>;
}
