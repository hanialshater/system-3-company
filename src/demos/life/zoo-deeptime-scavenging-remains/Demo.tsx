"use client";
import { useState } from "react";
import { Lesson } from "@/kit/Lesson";
import { Control, Row } from "@/kit/controls";
const data = {
  "question": "In the pictured toy sequence, a scavenger displaces several bones after death. Which arrangement is harder to interpret as an intact body?",
  "options": [
    "Both show identical arrangement",
    "The scattered bones",
    "The connected bones"
  ],
  "answer": 1,
  "explanation": "Before disturbance the toy bones are connected. Afterwards they are scattered. Scattered remains can have many causes: this example illustrates one stipulated process, not proof that a scavenger acted at a real site.",
  "labels": [
    "Connected",
    "Displaced"
  ]
};
export default function Demo({slug}:{slug:string}) {
 const [step,setStep]=useState(0);
 return <Lesson slug={slug} predict={{question:data.question,options:data.options,answer:data.answer}} exploreHint="Open both evidence panels before comparing them." reveal={()=><p>{data.explanation}</p>}>
 {({locked,interact})=><div>
 <svg viewBox="0 0 320 145" className="stage-svg" role="img" aria-label={step===0 ? "Two evidence panels are hidden." : step===1 ? data.labels[0]+" shown; second panel hidden." : data.labels.join(" and ")+" shown; schematic."}>
 <rect x="5" y="7" width="150" height="125" rx="12" fill="var(--bg-2)" stroke="var(--muted)"/><rect x="165" y="7" width="150" height="125" rx="12" fill="var(--bg-2)" stroke="var(--muted)"/>
 {step>=1 && <g transform="translate(10 14)"><circle cx="28" cy="40" r="10" fill="#ddd2ba"/><path d="M40 40 H100 M60 40 L48 65 M75 40 L90 65" stroke="#ddd2ba" strokeWidth="7" strokeLinecap="round"/></g>}{step>=2 && <g transform="translate(170 14)"><circle cx="25" cy="22" r="9" fill="#ddd2ba"/><path d="M48 55 L73 46 M92 19 L114 28 M18 60 L35 56" stroke="#ddd2ba" strokeWidth="7" strokeLinecap="round"/></g>}
 <text x="80" y="116" textAnchor="middle" fill="var(--fg)" fontSize="12">{step>=1?data.labels[0]:"Panel 1"}</text><text x="240" y="116" textAnchor="middle" fill="var(--fg)" fontSize="12">{step>=2?data.labels[1]:"Panel 2"}</text>
 </svg><Row><Control style={{minHeight:44}} disabled={locked||step!==0} onClick={()=>setStep(1)}>Open first</Control><Control style={{minHeight:44}} disabled={locked||step!==1} onClick={()=>{setStep(2);interact();}}>Open second</Control></Row>
 <p style={{textAlign:"center",color:"var(--muted)",fontSize:"0.8rem"}}>Illustrative schematic</p></div>}
 </Lesson>;
}
