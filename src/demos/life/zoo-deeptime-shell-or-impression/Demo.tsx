"use client";
import { useState } from "react";
import { Lesson } from "@/kit/Lesson";
import { Control, Row } from "@/kit/controls";
const data = {
  "question": "A shell fossil and the hollow it left in surrounding rock are found. Which is the impression?",
  "options": [
    "The retained shell",
    "Both are the original shell",
    "The hollow in the rock"
  ],
  "answer": 2,
  "explanation": "The first panel represents a retained shell. The second shows the hollow surface that records its shape: an impression. Both are simplified; preservation can be more complicated.",
  "labels": [
    "Shell retained",
    "Hollow in rock"
  ]
};
export default function Demo({slug}:{slug:string}) {
 const [step,setStep]=useState(0);
 return <Lesson slug={slug} predict={{question:data.question,options:data.options,answer:data.answer}} exploreHint="Open both evidence panels before comparing them." reveal={()=><p>{data.explanation}</p>}>
 {({locked,interact})=><div>
 <svg viewBox="0 0 320 145" className="stage-svg" role="img" aria-label={step===0 ? "Two evidence panels are hidden." : step===1 ? data.labels[0]+" shown; second panel hidden." : data.labels.join(" and ")+" shown; schematic."}>
 <rect x="5" y="7" width="150" height="125" rx="12" fill="var(--bg-2)" stroke="var(--muted)"/><rect x="165" y="7" width="150" height="125" rx="12" fill="var(--bg-2)" stroke="var(--muted)"/>
 {step>=1 && <g transform="translate(10 14)"><path d="M20 60 Q70 -10 120 60 Z" fill="#d8c6a4" stroke="var(--fg)" strokeWidth="3"/><path d="M45 55 Q70 20 95 55 M60 58 Q70 35 80 58" fill="none" stroke="#805d48" strokeWidth="3"/></g>}{step>=2 && <g transform="translate(170 14)"><rect x="14" y="10" width="112" height="58" rx="5" fill="#ccb892"/><path d="M25 58 Q70 -2 115 58" fill="none" stroke="#564637" strokeWidth="5"/></g>}
 <text x="80" y="116" textAnchor="middle" fill="var(--fg)" fontSize="12">{step>=1?data.labels[0]:"Panel 1"}</text><text x="240" y="116" textAnchor="middle" fill="var(--fg)" fontSize="12">{step>=2?data.labels[1]:"Panel 2"}</text>
 </svg><Row><Control style={{minHeight:44}} disabled={locked||step!==0} onClick={()=>setStep(1)}>Open first</Control><Control style={{minHeight:44}} disabled={locked||step!==1} onClick={()=>{setStep(2);interact();}}>Open second</Control></Row>
 <p style={{textAlign:"center",color:"var(--muted)",fontSize:"0.8rem"}}>Illustrative schematic</p></div>}
 </Lesson>;
}
