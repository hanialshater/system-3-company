"use client";
import { useState } from "react";
import { Lesson } from "@/kit/Lesson";
import { Control, Row } from "@/kit/controls";
const data = {
  "question": "A modeled sediment layer contains marks formed before and after later material settled on top. Does the whole layer represent one instant?",
  "options": [
    "The marks must be the same age",
    "No, it accumulated over time",
    "Yes, every grain arrived together"
  ],
  "answer": 1,
  "explanation": "In the model the lower mark was covered before the upper mark formed. A layer can accumulate over an interval rather than in one instant. Real accumulation rates and interruptions require independent evidence.",
  "labels": [
    "Earlier mark",
    "Later mark"
  ]
};
export default function Demo({slug}:{slug:string}) {
 const [step,setStep]=useState(0);
 return <Lesson slug={slug} predict={{question:data.question,options:data.options,answer:data.answer}} exploreHint="Open both evidence panels before comparing them." reveal={()=><p>{data.explanation}</p>}>
 {({locked,interact})=><div>
 <svg viewBox="0 0 320 145" className="stage-svg" role="img" aria-label={step===0 ? "Two evidence panels are hidden." : step===1 ? data.labels[0]+" shown; second panel hidden." : data.labels.join(" and ")+" shown; schematic."}>
 <rect x="5" y="7" width="150" height="125" rx="12" fill="var(--bg-2)" stroke="var(--muted)"/><rect x="165" y="7" width="150" height="125" rx="12" fill="var(--bg-2)" stroke="var(--muted)"/>
 {step>=1 && <g transform="translate(10 14)"><rect x="8" y="42" width="124" height="25" fill="#c6b18c"/><path d="M42 49 L48 58 L54 49" stroke="#534a3e" strokeWidth="3" fill="none"/></g>}{step>=2 && <g transform="translate(170 14)"><rect x="8" y="14" width="124" height="53" fill="#c6b18c"/><path d="M42 48 L48 57 L54 48 M86 21 L92 30 L98 21" stroke="#534a3e" strokeWidth="3" fill="none"/></g>}
 <text x="80" y="116" textAnchor="middle" fill="var(--fg)" fontSize="12">{step>=1?data.labels[0]:"Panel 1"}</text><text x="240" y="116" textAnchor="middle" fill="var(--fg)" fontSize="12">{step>=2?data.labels[1]:"Panel 2"}</text>
 </svg><Row><Control style={{minHeight:44}} disabled={locked||step!==0} onClick={()=>setStep(1)}>Open first</Control><Control style={{minHeight:44}} disabled={locked||step!==1} onClick={()=>{setStep(2);interact();}}>Open second</Control></Row>
 <p style={{textAlign:"center",color:"var(--muted)",fontSize:"0.8rem"}}>Illustrative schematic</p></div>}
 </Lesson>;
}
