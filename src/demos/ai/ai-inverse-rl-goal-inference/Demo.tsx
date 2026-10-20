"use client";
import {useState} from "react";
import {Lesson} from "@/kit/Lesson";
import {Control} from "@/kit/controls";
import {infer,observations} from "./model";
import s from "./styles.module.css";
export default function Demo({slug}:{slug:string}){
const [step,setStep]=useState(0),[noise,setNoise]=useState(.8);const result=infer(observations.slice(0,step),noise),w=infer(observations);const fmt=(n:number)=>Number(n.toFixed(3));
return <Lesson slug={slug} predict={{"question": "Red, Red, Blue came from a noisy demonstrator. Is the Red goal impossible, certain, or favoured?", "options": ["Impossible", "Certain", "Favoured, uncertain"], "answer": 2}} minInteractions={1} exploreHint="Observe each choice; compare likelihoods and posterior beliefs." reveal={()=><><p>Two Reds raised belief in the Red goal to 16/17. The Blue choice reduced it to {w.posterior[0].toFixed(1)}, rather than ruling it out.</p><p>The ordered observations had likelihoods 0.128 and 0.032 under the two goals. Equal priors made the posterior 0.8/0.2. This uses independent episodes and our specified 0.8 chance of choosing the better action.{noise===.5?" At noise 0.5, both goals remain equally likely.":""}</p></>}>
{({locked,interact})=><>
<svg className={s.picture} viewBox="0 0 340 190" role="img" aria-label="Two reward hypotheses with likelihood and posterior after independent terminal choices">
 <text x="10" y="22">R: Red2, Blue0</text><text x="175" y="22">B: Red0, Blue2</text><text x="10" y="47">prior .5/.5 · better {noise}</text>
 <text x="10" y="72">{observations.slice(0,step).join(" → ")||"One-state terminal choices"}</text>
 {[0,1].map((i)=><g key={i}><rect x={25+i*160} y="90" width="130" height="18" fill="var(--bg-2)"/><rect x={25+i*160} y="90" width={130*result.posterior[i]} height="18" fill="var(--domain)"/><text x={25+i*160} y="134">likelihood {fmt(result.likelihoods[i])}</text><text x={25+i*160} y="158">posterior {fmt(result.posterior[i])}</text></g>)}
 </svg>
<p className={s.summary} aria-live="polite"><>Independent episodes{step===3?" · R:16/17→.8":""}{noise===.5?<><br/>Primary .128/.032 · .8/.2</>:null}</></p>
<div className={s.controls}><Control disabled={locked||step>0} onClick={()=>setStep(1)}>Red</Control><Control disabled={locked||step!==1} onClick={()=>setStep(2)}>+Red</Control><Control disabled={locked||step!==2} onClick={()=>{setStep(3);interact();}}>Blue</Control><Control disabled={locked||step!==3||noise===.5} onClick={()=>setNoise(.5)}>Noise .5</Control><Control disabled={locked||noise===.8} onClick={()=>setNoise(.8)}>Reset</Control></div>
</>}
</Lesson>;
}
