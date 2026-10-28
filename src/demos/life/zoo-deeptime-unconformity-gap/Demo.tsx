"use client";
import { useState } from "react";
import { Lesson } from "@/kit/Lesson";
import { Control, Row } from "@/kit/controls";
const data = {
  "question": "A sequence is known to have layers A, B and C. At one exposure A and C meet across an erosion surface and B is missing. What can the contact represent?",
  "options": [
    "A record of every interval",
    "A gap in the local record",
    "Proof B formed there unchanged"
  ],
  "answer": 1,
  "explanation": "The stipulated sequence includes B, but the exposure shows A directly below C across an erosional surface. That contact can mark missing time locally; the diagram alone does not date the gap.",
  "labels": [
    "Reference order",
    "Eroded exposure"
  ]
};
export default function Demo({slug}:{slug:string}) {
 const [step,setStep]=useState(0);
 return <Lesson slug={slug} predict={{question:data.question,options:data.options,answer:data.answer}} exploreHint="Open both evidence panels before comparing them." reveal={()=><p>{data.explanation}</p>}>
 {({locked,interact})=><div>
 <svg viewBox="0 0 320 145" className="stage-svg" role="img" aria-label={step===0 ? "Two evidence panels are hidden." : step===1 ? data.labels[0]+" shown; second panel hidden." : data.labels.join(" and ")+" shown; schematic."}>
 <rect x="5" y="7" width="150" height="125" rx="12" fill="var(--bg-2)" stroke="var(--muted)"/><rect x="165" y="7" width="150" height="125" rx="12" fill="var(--bg-2)" stroke="var(--muted)"/>
 {step>=1 && <g transform="translate(10 14)"><rect x="18" y="48" width="104" height="16" fill="#c2aa89"/><rect x="18" y="30" width="104" height="18" fill="#a0b8a5"/><rect x="18" y="12" width="104" height="18" fill="#a4b9c5"/><text x="70" y="24" fill="#202630" textAnchor="middle" fontSize="13">C</text><text x="70" y="43" fill="#202630" textAnchor="middle" fontSize="13">B</text><text x="70" y="61" fill="#202630" textAnchor="middle" fontSize="13">A</text></g>}{step>=2 && <g transform="translate(170 14)"><rect x="18" y="41" width="104" height="23" fill="#c2aa89"/><rect x="18" y="12" width="104" height="29" fill="#a4b9c5"/><path d="M18 41 Q38 34 58 41 T98 41 T122 41" fill="none" stroke="#604c38" strokeWidth="3"/><text x="70" y="28" fill="#202630" textAnchor="middle" fontSize="13">C</text><text x="70" y="59" fill="#202630" textAnchor="middle" fontSize="13">A</text></g>}
 <text x="80" y="116" textAnchor="middle" fill="var(--fg)" fontSize="12">{step>=1?data.labels[0]:"Panel 1"}</text><text x="240" y="116" textAnchor="middle" fill="var(--fg)" fontSize="12">{step>=2?data.labels[1]:"Panel 2"}</text>
 </svg><Row><Control style={{minHeight:44}} disabled={locked||step!==0} onClick={()=>setStep(1)}>Open first</Control><Control style={{minHeight:44}} disabled={locked||step!==1} onClick={()=>{setStep(2);interact();}}>Open second</Control></Row>
 <p style={{textAlign:"center",color:"var(--muted)",fontSize:"0.8rem"}}>Illustrative schematic</p></div>}
 </Lesson>;
}
