"use client";
import { useState } from "react";
import { Lesson } from "@/kit/Lesson";
import { Control, Row } from "@/kit/controls";
const data = {
  "question": "Two modeled rock sequences contain the same short-lived, widespread fossil type. What can that shared fossil help scientists do?",
  "options": [
    "Correlate the fossil-bearing layers",
    "Prove the rocks formed at the same place",
    "Measure the fossil’s exact age alone"
  ],
  "answer": 0,
  "explanation": "The same marked fossil occurs in one layer at each modeled site. Under the stated short-lived, widespread assumption it helps correlate layers; additional evidence is needed to determine an absolute age.",
  "labels": [
    "Site A",
    "Site B"
  ]
};
export default function Demo({slug}:{slug:string}) {
 const [step,setStep]=useState(0);
 return <Lesson slug={slug} predict={{question:data.question,options:data.options,answer:data.answer}} exploreHint="Open both evidence panels before comparing them." reveal={()=><p>{data.explanation}</p>}>
 {({locked,interact})=><div>
 <svg viewBox="0 0 320 145" className="stage-svg" role="img" aria-label={step===0 ? "Two evidence panels are hidden." : step===1 ? data.labels[0]+" shown; second panel hidden." : data.labels.join(" and ")+" shown; schematic."}>
 <rect x="5" y="7" width="150" height="125" rx="12" fill="var(--bg-2)" stroke="var(--muted)"/><rect x="165" y="7" width="150" height="125" rx="12" fill="var(--bg-2)" stroke="var(--muted)"/>
 {step>=1 && <g transform="translate(10 14)"><rect x="24" y="12" width="92" height="18" fill="#a4b9c5"/><rect x="24" y="30" width="92" height="18" fill="#c2aa89"/><rect x="24" y="48" width="92" height="18" fill="#a0b8a5"/><circle cx="70" cy="39" r="5" fill="#323642"/></g>}{step>=2 && <g transform="translate(170 14)"><rect x="24" y="12" width="92" height="18" fill="#c2aa89"/><rect x="24" y="30" width="92" height="18" fill="#a0b8a5"/><rect x="24" y="48" width="92" height="18" fill="#a4b9c5"/><circle cx="70" cy="21" r="5" fill="#323642"/></g>}
 <text x="80" y="116" textAnchor="middle" fill="var(--fg)" fontSize="12">{step>=1?data.labels[0]:"Panel 1"}</text><text x="240" y="116" textAnchor="middle" fill="var(--fg)" fontSize="12">{step>=2?data.labels[1]:"Panel 2"}</text>
 </svg><Row><Control style={{minHeight:44}} disabled={locked||step!==0} onClick={()=>setStep(1)}>Open first</Control><Control style={{minHeight:44}} disabled={locked||step!==1} onClick={()=>{setStep(2);interact();}}>Open second</Control></Row>
 <p style={{textAlign:"center",color:"var(--muted)",fontSize:"0.8rem"}}>Illustrative schematic</p></div>}
 </Lesson>;
}
