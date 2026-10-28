"use client";
import { useState } from "react";
import { Lesson } from "@/kit/Lesson";
import { Control, Row } from "@/kit/controls";
const data = {
  "question": "One fossil is compared with a group of several fossil types from a stated single layer. Which gives a broader view of the sample?",
  "options": [
    "The group of several types",
    "The one specimen alone",
    "Both contain the same observations"
  ],
  "answer": 0,
  "explanation": "The second panel contains several stipulated fossil forms, while the first contains one. An assemblage offers more kinds of evidence, but this does not prove all organisms lived together or that sampling is complete.",
  "labels": [
    "One specimen",
    "Several types"
  ]
};
export default function Demo({slug}:{slug:string}) {
 const [step,setStep]=useState(0);
 return <Lesson slug={slug} predict={{question:data.question,options:data.options,answer:data.answer}} exploreHint="Open both evidence panels before comparing them." reveal={()=><p>{data.explanation}</p>}>
 {({locked,interact})=><div>
 <svg viewBox="0 0 320 145" className="stage-svg" role="img" aria-label={step===0 ? "Two evidence panels are hidden." : step===1 ? data.labels[0]+" shown; second panel hidden." : data.labels.join(" and ")+" shown; schematic."}>
 <rect x="5" y="7" width="150" height="125" rx="12" fill="var(--bg-2)" stroke="var(--muted)"/><rect x="165" y="7" width="150" height="125" rx="12" fill="var(--bg-2)" stroke="var(--muted)"/>
 {step>=1 && <g transform="translate(10 14)"><path d="M35 58 Q70 -1 105 58 Z" fill="#d7c6a5" stroke="var(--fg)" strokeWidth="2"/></g>}{step>=2 && <g transform="translate(170 14)"><circle cx="30" cy="38" r="13" fill="#d7c6a5"/><path d="M56 55 Q70 10 84 55 Z" fill="#a8c0b0"/><path d="M100 20 L116 55 M116 20 L100 55" stroke="#c7a883" strokeWidth="5"/></g>}
 <text x="80" y="116" textAnchor="middle" fill="var(--fg)" fontSize="12">{step>=1?data.labels[0]:"Panel 1"}</text><text x="240" y="116" textAnchor="middle" fill="var(--fg)" fontSize="12">{step>=2?data.labels[1]:"Panel 2"}</text>
 </svg><Row><Control style={{minHeight:44}} disabled={locked||step!==0} onClick={()=>setStep(1)}>Open first</Control><Control style={{minHeight:44}} disabled={locked||step!==1} onClick={()=>{setStep(2);interact();}}>Open second</Control></Row>
 <p style={{textAlign:"center",color:"var(--muted)",fontSize:"0.8rem"}}>Illustrative schematic</p></div>}
 </Lesson>;
}
