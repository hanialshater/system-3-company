"use client";
import { useState } from "react";
import { Lesson } from "@/kit/Lesson";
import { Control, Row } from "@/kit/controls";
const data = {
  "question": "In this toy comparison, two remains start alike. One stays exposed longer while one is buried sooner. Which is protected from surface scavengers sooner?",
  "options": [
    "The earlier-buried remains",
    "The longer-exposed remains",
    "Neither can be protected"
  ],
  "answer": 0,
  "explanation": "In the stipulated comparison the earlier-buried remains are covered sooner, while the other remains stay exposed at the surface. Burial can help preservation, but does not guarantee a fossil.",
  "labels": [
    "Exposed longer",
    "Buried sooner"
  ]
};
export default function Demo({slug}:{slug:string}) {
 const [step,setStep]=useState(0);
 return <Lesson slug={slug} predict={{question:data.question,options:data.options,answer:data.answer}} exploreHint="Open both evidence panels before comparing them." reveal={()=><p>{data.explanation}</p>}>
 {({locked,interact})=><div>
 <svg viewBox="0 0 320 145" className="stage-svg" role="img" aria-label={step===0 ? "Two evidence panels are hidden." : step===1 ? data.labels[0]+" shown; second panel hidden." : data.labels.join(" and ")+" shown; schematic."}>
 <rect x="5" y="7" width="150" height="125" rx="12" fill="var(--bg-2)" stroke="var(--muted)"/><rect x="165" y="7" width="150" height="125" rx="12" fill="var(--bg-2)" stroke="var(--muted)"/>
 {step>=1 && <g transform="translate(10 14)"><path d="M8 60 H132" stroke="var(--fg)" strokeWidth="3"/><path d="M38 48 L90 48" stroke="#cfb89a" strokeWidth="10" strokeLinecap="round"/><path d="M70 11 V35 M65 29 L70 36 L75 29" stroke="#d46a58" strokeWidth="3" fill="none"/></g>}{step>=2 && <g transform="translate(170 14)"><rect x="8" y="28" width="124" height="36" fill="#a78b6c"/><path d="M8 28 H132" stroke="var(--fg)" strokeWidth="3"/><path d="M38 48 L90 48" stroke="#e8d6b9" strokeWidth="10" strokeLinecap="round"/></g>}
 <text x="80" y="116" textAnchor="middle" fill="var(--fg)" fontSize="12">{step>=1?data.labels[0]:"Panel 1"}</text><text x="240" y="116" textAnchor="middle" fill="var(--fg)" fontSize="12">{step>=2?data.labels[1]:"Panel 2"}</text>
 </svg><Row><Control style={{minHeight:44}} disabled={locked||step!==0} onClick={()=>setStep(1)}>Open first</Control><Control style={{minHeight:44}} disabled={locked||step!==1} onClick={()=>{setStep(2);interact();}}>Open second</Control></Row>
 <p style={{textAlign:"center",color:"var(--muted)",fontSize:"0.8rem"}}>Illustrative schematic</p></div>}
 </Lesson>;
}
