"use client";
import { useState } from "react";
import { Lesson } from "@/kit/Lesson";
import { Control, Row } from "@/kit/controls";
const data = {
  "question": "A modeled deposit contains one specimen from an older layer and another from a younger layer, both transported into it. Can the mixed deposit alone prove they lived at the same time?",
  "options": [
    "The collection fixes one exact age",
    "No, their source ages differ",
    "Yes, every fossil must be contemporaneous"
  ],
  "answer": 1,
  "explanation": "The example combines specimens from two stipulated source ages in one later deposit. Their shared burial place alone does not show that the original animals lived together. Real sites require independent dating and context.",
  "labels": [
    "Older source",
    "Younger source"
  ]
};
export default function Demo({slug}:{slug:string}) {
 const [step,setStep]=useState(0);
 return <Lesson slug={slug} predict={{question:data.question,options:data.options,answer:data.answer}} exploreHint="Open both evidence panels before comparing them." reveal={()=><p>{data.explanation}</p>}>
 {({locked,interact})=><div>
 <svg viewBox="0 0 320 145" className="stage-svg" role="img" aria-label={step===0 ? "Two evidence panels are hidden." : step===1 ? data.labels[0]+" shown; second panel hidden." : data.labels.join(" and ")+" shown; schematic."}>
 <rect x="5" y="7" width="150" height="125" rx="12" fill="var(--bg-2)" stroke="var(--muted)"/><rect x="165" y="7" width="150" height="125" rx="12" fill="var(--bg-2)" stroke="var(--muted)"/>
 {step>=1 && <g transform="translate(10 14)"><rect x="6" y="10" width="50" height="50" fill="#b9a381"/><circle cx="31" cy="30" r="10" fill="#e6d9be"/><path d="M58 32 H80 M74 26 L80 32 L74 38" fill="none" stroke="var(--fg)" strokeWidth="3"/><rect x="84" y="14" width="50" height="46" fill="#a2b9ad"/><circle cx="105" cy="38" r="7" fill="#e6d9be"/></g>}{step>=2 && <g transform="translate(170 14)"><rect x="6" y="10" width="50" height="50" fill="#9bb8a8"/><path d="M20 40 L30 20 L40 40 Z" fill="#ece2cb"/><path d="M58 32 H80 M74 26 L80 32 L74 38" fill="none" stroke="var(--fg)" strokeWidth="3"/><rect x="84" y="14" width="50" height="46" fill="#a2b9ad"/><circle cx="95" cy="25" r="6" fill="#e6d9be"/><path d="M100 49 L109 32 L118 49 Z" fill="#ece2cb"/></g>}
 <text x="80" y="116" textAnchor="middle" fill="var(--fg)" fontSize="12">{step>=1?data.labels[0]:"Panel 1"}</text><text x="240" y="116" textAnchor="middle" fill="var(--fg)" fontSize="12">{step>=2?data.labels[1]:"Panel 2"}</text>
 </svg><Row><Control style={{minHeight:44}} disabled={locked||step!==0} onClick={()=>setStep(1)}>Open first</Control><Control style={{minHeight:44}} disabled={locked||step!==1} onClick={()=>{setStep(2);interact();}}>Open second</Control></Row>
 <p style={{textAlign:"center",color:"var(--muted)",fontSize:"0.8rem"}}>Illustrative schematic</p></div>}
 </Lesson>;
}
