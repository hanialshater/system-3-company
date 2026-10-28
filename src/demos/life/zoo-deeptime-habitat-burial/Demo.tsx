"use client";
import { useState } from "react";
import { Lesson } from "@/kit/Lesson";
import { Control, Row } from "@/kit/controls";
const data = {
  "question": "A toy model shows a bone carried by a stream before burial downstream. Which location does the burial site identify directly?",
  "options": [
    "Where the bone was buried",
    "Exactly where the animal lived",
    "Every place the animal traveled"
  ],
  "answer": 0,
  "explanation": "The bone starts upstream in this stipulated scenario and is buried downstream. Its burial site is the direct location of the deposit; the animal’s habitat needs additional evidence. The arrows show a model, not a real find.",
  "labels": [
    "Upstream",
    "Burial"
  ]
};
export default function Demo({slug}:{slug:string}) {
 const [step,setStep]=useState(0);
 return <Lesson slug={slug} predict={{question:data.question,options:data.options,answer:data.answer}} exploreHint="Open both evidence panels before comparing them." reveal={()=><p>{data.explanation}</p>}>
 {({locked,interact})=><div>
 <svg viewBox="0 0 320 145" className="stage-svg" role="img" aria-label={step===0 ? "Two evidence panels are hidden." : step===1 ? data.labels[0]+" shown; second panel hidden." : data.labels.join(" and ")+" shown; schematic."}>
 <rect x="5" y="7" width="150" height="125" rx="12" fill="var(--bg-2)" stroke="var(--muted)"/><rect x="165" y="7" width="150" height="125" rx="12" fill="var(--bg-2)" stroke="var(--muted)"/>
 {step>=1 && <g transform="translate(10 14)"><path d="M15 48 H124" stroke="var(--good)" strokeWidth="5"/><circle cx="35" cy="34" r="8" fill="#d7c6a5"/><path d="M48 30 H92 M84 23 L93 30 L84 37" fill="none" stroke="var(--fg)" strokeWidth="3"/></g>}{step>=2 && <g transform="translate(170 14)"><path d="M15 30 H124" stroke="var(--good)" strokeWidth="5"/><rect x="20" y="30" width="100" height="34" fill="#b9a381"/><circle cx="100" cy="48" r="8" fill="#e0d1b6"/></g>}
 <text x="80" y="116" textAnchor="middle" fill="var(--fg)" fontSize="12">{step>=1?data.labels[0]:"Panel 1"}</text><text x="240" y="116" textAnchor="middle" fill="var(--fg)" fontSize="12">{step>=2?data.labels[1]:"Panel 2"}</text>
 </svg><Row><Control style={{minHeight:44}} disabled={locked||step!==0} onClick={()=>setStep(1)}>Open first</Control><Control style={{minHeight:44}} disabled={locked||step!==1} onClick={()=>{setStep(2);interact();}}>Open second</Control></Row>
 <p style={{textAlign:"center",color:"var(--muted)",fontSize:"0.8rem"}}>Illustrative schematic</p></div>}
 </Lesson>;
}
