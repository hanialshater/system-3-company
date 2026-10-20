"use client";
import {useState} from "react";
import {Lesson} from "@/kit/Lesson";
import {Control} from "@/kit/controls";
import {impulse} from "./model";
import s from "./styles.module.css";
export default function Demo({slug}:{slug:string}){
const [step,setStep]=useState(0),[corner,setCorner]=useState(false),[zero,setZero]=useState(false);const result=impulse(corner,zero),w=impulse();
return <Lesson slug={slug} predict={{"question": "Your image network stacks two small filters, each looking at a 3×3 patch. Two stride-one 3\u00d73 valid layers: how wide is the final input footprint?", "options": ["3", "5", "9"], "answer": 1}} minInteractions={1} exploreHint="Trace the first window, combine dependencies, then move the impulse." reveal={()=><><p>Each first-layer window read 9 input cells. Combining all nine windows connected the final cell to {w.dependencies} inputs: a 5×5 structural footprint.</p><p>The center impulse produced {w.output}; the corner produced 1. Dependency count and output value differ. These two all-ones layers use stride one, valid windows and no bias or nonlinearity. Zero learned weights or cancellation could remove effective influence in another model.</p></>}>
{({locked,interact})=><>
<svg className={s.picture} viewBox="0 0 340 190" role="img" aria-label="Input grid, indexed local windows and their computed layer outputs">
 <text x="15" y="19">input 5×5</text><text x="154" y="19">layer1 3×3</text><text x="271" y="19">final</text>
 {result.input.flatMap((row,y)=>row.map((v,x)=><g key={`${x},${y}`}><rect x={10+x*23} y={35+y*23} width="22" height="22" fill={step>=2?"var(--domain)":step===1&&x<3&&y<3?"var(--good)":"var(--bg-2)"} fillOpacity={step>=1?.25:1} stroke="var(--line)"/><text x={16+x*23} y={51+y*23}>{v}</text></g>))}
 <text x="131" y="94">→</text>
 {step>0?result.hidden.flatMap((row,y)=>row.map((v,x)=><g key={`${x},${y}`}><rect x={158+x*23} y={59+y*23} width="22" height="22" fill="var(--bg-2)" stroke="var(--line)"/><text x={164+x*23} y={75+y*23}>{v}</text></g>)):null}
 {step>=2?<><text x="237" y="94">→</text><rect x="267" y="70" width="40" height="40" fill="var(--bg-2)" stroke="var(--domain)"/><text x="282" y="95">{result.output}</text><text x="13" y="174">footprint {result.dependencies} · center9{step===3?" / corner1":""}</text></>:null}
 </svg>
<p className={s.summary} aria-live="polite"><>3×3 ones · stride1 · valid</></p>
<div className={s.controls}><Control disabled={locked||step>0} onClick={()=>setStep(1)}>Layer 1</Control><Control disabled={locked||step!==1} onClick={()=>setStep(2)}>Layer 2</Control><Control disabled={locked||step!==2} onClick={()=>{setCorner(true);setStep(3);interact();}}>Corner</Control><Control disabled={locked||step!==3||zero} onClick={()=>setZero(true)}>Zero input</Control><Control disabled={locked||step!==3||(!corner&&!zero)} onClick={()=>{setCorner(false);setZero(false);}}>Reset</Control></div>
</>}
</Lesson>;
}
