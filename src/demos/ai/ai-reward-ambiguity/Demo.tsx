"use client";
import {useState} from "react";
import {Lesson} from "@/kit/Lesson";
import {Control} from "@/kit/controls";
import {compare,tables,probability} from "./model";
import s from "./styles.module.css";
export default function Demo({slug}:{slug:string}){
const [step,setStep]=useState(0),[opposite,setOpposite]=useState(false);const result=compare(step>=2?2:1),fmt=(n:number)=>Number((100*n).toFixed(1));
return <Lesson slug={slug} predict={{"question": "H1 rewards Red2/Blue0; H2 rewards Red10/Blue9. Can both predict the same choices?", "options": ["Yes", "No"], "answer": 0}} minInteractions={2} exploreHint="Compare their predicted choices, then observe another Red." reveal={()=><><p>H1 and H2 have different reward numbers but both predict Red with probability 0.8 under this better-action rule. Their posteriors stayed equal: 8/21 after one Red, then 64/153 after two.</p><p>The tied-reward H0 retained lower but nonzero probability. We identified a favoured ordering, not a unique reward table.{opposite?" Reversing the ordering predicts Red only 0.2, so this toy can distinguish some rewards.":""}</p></>}>
{({locked,interact})=><>
<svg className={s.picture} viewBox="0 0 340 190" role="img" aria-label="Distinct reward tables alongside the same predicted Red probabilities and posterior weights">
 <text x="10" y="20">Red / Blue</text><text x="150" y="20">P(Red)</text><text x="240" y="20">posterior</text>
 {tables.map((t,i)=><g key={i}><text x="10" y={52+i*35}>H{i===2?0:i+1}: {t.join(" / ")}</text>{step>0?<><text x="161" y={52+i*35}>{result.predictions[i]}</text><text x="250" y={52+i*35}>{fmt(result.posterior[i])}%</text></>:null}</g>)}
 <text x="10" y="157">{step>=2?"Red → Red":"Red"} · equal priors</text>
 {opposite?<text x="10" y="183">0 / 2 → P(Red)={probability([0,2])}</text>:null}
 </svg>
<p className={s.summary} aria-live="polite"><>Better .8 · worse .2 · ties .5{step>=2?<><br/>H1=H2: 8/21→64/153</>:null}</></p>
<div className={s.controls}><Control disabled={locked||step>0} onClick={()=>{setStep(1);interact();}}>Compare</Control><Control disabled={locked||step!==1} onClick={()=>{setStep(2);interact();}}>Second Red</Control><Control disabled={locked||step!==2||opposite} onClick={()=>setOpposite(true)}>Reverse</Control><Control disabled={locked||!opposite} onClick={()=>setOpposite(false)}>Reset</Control></div>
</>}
</Lesson>;
}
