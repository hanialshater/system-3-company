"use client";
import {useState} from "react";
import {Lesson} from "@/kit/Lesson";
import {Control} from "@/kit/controls";
import {row,threeRows} from "./model";
import s from "./styles.module.css";
export default function Demo({slug}:{slug:string}){
const [step,setStep]=useState(0),[mode,setMode]=useState(0),[flipped,setFlipped]=useState(false),[rowsSeen,setRowsSeen]=useState(false);const result=row(mode,Math.max(1,step)),rows=threeRows();
return <Lesson slug={slug} predict={{"question": "a has count5, b count2; same bucket. Signs a=+1, b=\u22121. Can the signed estimate of a fall below5?", "options": ["Yes", "No"], "answer": 0}} minInteractions={2} exploreHint="Add each signed update, then reverse the collision sign." reveal={()=><><p id="reveal-compact">Counter 5−2=3 estimates a below its true 5; flipping b’s sign gives 7. These two fixed alternatives average 5; one run need not cancel error. An expectation argument requires symmetric independent signs. Count Sketch uses a median across rows, not a minimum.{rowsSeen?" Illustrated rows 3,7,5 have median 5.":""}</p></>}>
{({locked,interact})=><div className={s.root}>
<svg className={s.picture} viewBox="0 0 290 76" role="img" aria-label="Signed inputs flow into counter then target sign correction; third row separates b">
 <text x="1" y="15">a:5 ×(+1)</text><text x="1" y="39">b:2 ×({mode===1?"+1":"−1"})</text>
 <path d={mode===2?"M82 12 H111 V23 M82 36 V60 H112":"M82 12 H111 V23 M82 36 H111 V23"} fill="none" stroke="var(--domain)"/>
 <rect x="112" y="12" width="35" height="24" fill="var(--bg-2)" stroke="var(--domain)"/><text x="120" y="29">{step?result.counter:"?"}</text>
 <text x="150" y="28">×s(a)=+1 → {step?result.estimate:"?"}</text>
 {mode===2?<><rect x="112" y="42" width="36" height="24" fill="var(--bg-2)" stroke="var(--domain)"/><text x="119" y="58">−2</text><text x="154" y="58">b separate</text></>:<text x="1" y="58">{step?`0 → +5${step>1?` → ${result.counter}`:""}`:"Signed updates → counter"}</text>}
 <text x="1" y="74">C[h(i)]+=s(i)Δ</text>
</svg>
<div className={s.proof} aria-live="polite"><div>estimate=s(a)C[h(a)] · true a=5</div>{flipped?<div>Retained alternatives 3 / 7 · mean 5</div>:null}{rowsSeen?<div>Rows {rows.estimates.join(",")} · median {rows.estimate}</div>:null}</div>
<div className={s.controls}><Control disabled={locked||step>0} onClick={()=>setStep(1)}>Add a</Control><Control disabled={locked||step!==1} onClick={()=>{setStep(2);interact();}}>Add b</Control><Control disabled={locked||step!==2||flipped} onClick={()=>{setMode(1);setFlipped(true);interact();}}>Flip b</Control><Control disabled={locked||!flipped||rowsSeen} onClick={()=>{setRowsSeen(true);setMode(2);}}>Three rows</Control><Control disabled={locked||!flipped||mode===0} onClick={()=>setMode(0)}>Reset</Control></div>
</div>}
</Lesson>;
}
