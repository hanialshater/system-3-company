"use client";
import { useState } from "react";
import { Lesson } from "@/kit/Lesson";
import { Control, Row } from "@/kit/controls";
const data = {
  "question": "A suspected impact is investigated using a crater-shaped structure and minerals with impact-related shock features. Why inspect both?",
  "options": [
    "The minerals make geology unnecessary",
    "They are different lines of evidence",
    "Either alone gives the full history"
  ],
  "answer": 1,
  "explanation": "The modeled investigation separates a large-scale structure from microscopic mineral features. Different observations can support or challenge an impact interpretation; each must be identified and dated independently.",
  "labels": [
    "Structure",
    "Mineral feature"
  ]
};
export default function Demo({slug}:{slug:string}) {
 const [step,setStep]=useState(0);
 return <Lesson slug={slug} predict={{question:data.question,options:data.options,answer:data.answer}} exploreHint="Open both evidence panels before comparing them." reveal={()=><p>{data.explanation}</p>}>
 {({locked,interact})=><div>
 <svg viewBox="0 0 320 145" className="stage-svg" role="img" aria-label={step===0 ? "Two evidence panels are hidden." : step===1 ? data.labels[0]+" shown; second panel hidden." : data.labels.join(" and ")+" shown; schematic."}>
 <rect x="5" y="7" width="150" height="125" rx="12" fill="var(--bg-2)" stroke="var(--muted)"/><rect x="165" y="7" width="150" height="125" rx="12" fill="var(--bg-2)" stroke="var(--muted)"/>
 {step>=1 && <g transform="translate(10 14)"><path d="M12 26 Q70 70 128 26" fill="none" stroke="var(--fg)" strokeWidth="4"/><path d="M12 26 H128" stroke="var(--muted)" strokeWidth="2"/></g>}{step>=2 && <g transform="translate(170 14)"><path d="M42 13 L100 20 L94 62 L34 55 Z" fill="#a2b9ca" stroke="var(--fg)" strokeWidth="2"/><path d="M48 20 L80 53 M57 18 L89 51 M67 17 L96 46" stroke="#304b60" strokeWidth="2"/></g>}
 <text x="80" y="116" textAnchor="middle" fill="var(--fg)" fontSize="12">{step>=1?data.labels[0]:"Panel 1"}</text><text x="240" y="116" textAnchor="middle" fill="var(--fg)" fontSize="12">{step>=2?data.labels[1]:"Panel 2"}</text>
 </svg><Row><Control style={{minHeight:44}} disabled={locked||step!==0} onClick={()=>setStep(1)}>Open first</Control><Control style={{minHeight:44}} disabled={locked||step!==1} onClick={()=>{setStep(2);interact();}}>Open second</Control></Row>
 <p style={{textAlign:"center",color:"var(--muted)",fontSize:"0.8rem"}}>Illustrative schematic</p></div>}
 </Lesson>;
}
