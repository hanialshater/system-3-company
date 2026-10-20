"use client";
import {useState} from "react";
import {Lesson} from "@/kit/Lesson";
import {Control} from "@/kit/controls";
import {compare} from "./model";
import s from "./styles.module.css";
export default function Demo({slug}:{slug:string}){
const [step,setStep]=useState(-1);const result=compare(Math.max(step,0));
return <Lesson slug={slug} predict={{"question": "Your image filter slides along a row of pixels that wraps around at the edges. Circular stride-one filtering: shift the input right one. Does the output stay unchanged or shift?", "options": ["Unchanged", "Shifted"], "answer": 1}} minInteractions={2} exploreHint="Compare operation orders, then test stride and cropped boundaries." reveal={()=><><p>With circular boundaries and stride one, recomputing after the input shift matched shifting the old output: [1,2,1,0,0,0]. The values moved; they did not stay unchanged.</p><p>Stride two broke that equality for a one-cell input shift: [1,1,0] versus [0,2,0]. A two-cell input shift does correspond to one output cell. Cropping a zero-filled shift can also break equality. These conditions matter; this demonstrates conditional equivariance, not invariance.</p></>}>
{({locked,interact})=><>
<svg className={s.picture} viewBox="0 0 340 190" role="img" aria-label="Recomputed shift then filter and filter then shift arrays">
 <text x="10" y="20">{result.circular?"circular":"zero-filled / cropped"} · stride{result.stride} · shift{result.amount}</text>
 <text x="10" y="48">input [{result.input.join(",")}]</text>
 {step>=0?<><text x="10" y="80">shift → filter</text><text x="150" y="80">[{result.shiftThenFilter.join(",")}]</text><text x="10" y="110">filter → shift</text><text x="150" y="110">[{result.filterThenShift.join(",")}]</text><text x="10" y="142">{result.equal?"= match":"≠ mismatch"}</text></>:null}
 {step>=1?<text x="10" y="175">Primary: [1,2,1,0,0,0] = [1,2,1,0,0,0]</text>:null}
 </svg>
<p className={s.summary} aria-live="polite"><>Filter [1,2,1]{step>=1?<><br/>Stride2: [1,1,0] ≠ [0,2,0]</>:null}</></p>
<div className={s.controls}><Control disabled={locked||step!==-1} onClick={()=>{setStep(0);interact();}}>Circular</Control><Control disabled={locked||step!==0} onClick={()=>{setStep(1);interact();}}>Stride 2</Control><Control disabled={locked||step!==1} onClick={()=>setStep(2)}>Shift 2</Control><Control disabled={locked||step!==2} onClick={()=>setStep(3)}>Crop edge</Control><Control disabled={locked||step<2} onClick={()=>setStep(1)}>Reset</Control></div>
</>}
</Lesson>;
}
