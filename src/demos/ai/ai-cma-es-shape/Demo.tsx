"use client";
import {useState} from "react";
import {Lesson} from "@/kit/Lesson";
import {Control} from "@/kit/controls";
import {adapt,candidates} from "./model";
import s from "./styles.module.css";
export default function Demo({slug}:{slug:string}){
const [step,setStep]=useState(0),[contrast,setContrast]=useState(false);const result=adapt(contrast),w=adapt(),fmt=(n:number)=>Number(n.toFixed(3));const px=(n:number)=>105+n*22,py=(n:number)=>92-n*22;
return <Lesson slug={slug} predict={{"question": "A/B lie on y=x with loss 1.6; C/D on y=\u2212x have loss 16. Which diagonal gets more next spread?", "options": ["y=x", "y=\u2212x"], "answer": 0}} minInteractions={1} exploreHint="Score, adapt the covariance, then generate candidates from it." reveal={()=><><p>The selected A/B steps produced covariance [[2.5,2],[2,2.5]]. Its larger eigenvalue, 4.5, lies along y=x; spread is √4.5, not 4.5.</p><p>Multiplying fixed z by its Cholesky factor generated (1.581,1.265) and (0,0.949), with their opposites. The mean stayed zero. Reversing the loss diagonal makes the off-diagonal negative and rotates the cloud. This fixed-sigma, rank-μ component omits evolution paths and is not a full CMA-ES optimizer.</p></>}>
{({locked,interact})=><>
<svg className={s.picture} viewBox="0 0 340 190" role="img" aria-label="Candidate offsets, computed covariance ellipse and generated next population">
 <line x1="25" x2="185" y1="92" y2="92" stroke="var(--line)"/><line x1="105" x2="105" y1="12" y2="172" stroke="var(--line)"/>
 {step>=2?<ellipse cx="105" cy="92" rx={22*result.spreads[0]} ry={22*result.spreads[1]} transform={`rotate(${-result.angle} 105 92)`} fill="var(--domain)" fillOpacity=".12" stroke="var(--domain)"/>:null}
 {candidates.map(c=><g key={c.id}><circle cx={px(c.v[0])} cy={py(c.v[1])} r="4" fill={step>=1&&result.winners.some(w=>w.id===c.id)?"var(--good)":"var(--muted)"}/><text x={px(c.v[0])+6} y={py(c.v[1])-5}>{c.id}{step>=1?` ${result.scored.find(q=>q.id===c.id)?.loss}`:""}</text></g>)}
 {step>=3?result.next.map(([x,y],i)=><rect key={i} x={px(x)-3} y={py(y)-3} width="6" height="6" fill="var(--domain)"/>):null}
 {step>=2?<><text x="208" y="30">C=.5I+.5M</text><text x="208" y="57">[2.5, {result.covariance[0][1]}]</text><text x="208" y="81">[{result.covariance[1][0]}, 2.5]</text><text x="208" y="108">LLᵀ=C</text></>:null}
 {step>=3?<><text x="195" y="137">({fmt(result.next[0][0])},{fmt(result.next[0][1])})</text><text x="195" y="159">({fmt(result.next[2][0])},{fmt(result.next[2][1])})</text><text x="12" y="185">m=(0,0) · λ=4.5,.5 · σ=1</text></>:null}
 </svg>
<p className={s.summary} aria-live="polite"><>Fixed replay · rank-μ only{contrast?<><br/>Primary [[2.5,2],[2,2.5]] · next (1.581,1.265), (0,.949)</>:null}</></p>
<div className={s.controls}><Control disabled={locked||step>0} onClick={()=>setStep(1)}>Score</Control><Control disabled={locked||step!==1} onClick={()=>setStep(2)}>Adapt</Control><Control disabled={locked||step!==2} onClick={()=>{setStep(3);interact();}}>Generate</Control><Control disabled={locked||step!==3||contrast} onClick={()=>setContrast(true)}>Reverse loss</Control><Control disabled={locked||!contrast} onClick={()=>setContrast(false)}>Reset</Control></div>
</>}
</Lesson>;
}
