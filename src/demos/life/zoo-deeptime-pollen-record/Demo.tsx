"use client";
import { useState } from "react";
import { Lesson } from "@/kit/Lesson";
import { Control, Row } from "@/kit/controls";
const data = {
  "question": "A sediment sample contains many grains matching a plant group. What can those grains contribute to a reconstruction?",
  "options": [
    "Evidence about past vegetation",
    "Proof of every animal present",
    "The exact date without other evidence"
  ],
  "answer": 0,
  "explanation": "The modeled sample contains many grains of one illustrated form. Identified pollen can inform past vegetation, but transport, preservation and identification complicate the interpretation. The toy sample is not field data.",
  "labels": [
    "Sample viewed",
    "Grains sorted"
  ]
};
export default function Demo({slug}:{slug:string}) {
 const [step,setStep]=useState(0);
 return <Lesson slug={slug} predict={{question:data.question,options:data.options,answer:data.answer}} exploreHint="Open both evidence panels before comparing them." reveal={()=><p>{data.explanation}</p>}>
 {({locked,interact})=><div>
 <svg viewBox="0 0 320 145" className="stage-svg" role="img" aria-label={step===0 ? "Two evidence panels are hidden." : step===1 ? data.labels[0]+" shown; second panel hidden." : data.labels.join(" and ")+" shown; schematic."}>
 <rect x="5" y="7" width="150" height="125" rx="12" fill="var(--bg-2)" stroke="var(--muted)"/><rect x="165" y="7" width="150" height="125" rx="12" fill="var(--bg-2)" stroke="var(--muted)"/>
 {step>=1 && <g transform="translate(10 14)"><rect x="22" y="12" width="96" height="54" rx="8" fill="#c9b998"/><circle cx="45" cy="30" r="6" fill="#5c6951"/><circle cx="73" cy="40" r="6" fill="#5c6951"/><circle cx="93" cy="25" r="6" fill="#5c6951"/></g>}{step>=2 && <g transform="translate(170 14)"><circle cx="30" cy="37" r="8" fill="#7e9d65"/><circle cx="57" cy="37" r="8" fill="#7e9d65"/><circle cx="84" cy="37" r="8" fill="#7e9d65"/><circle cx="111" cy="37" r="8" fill="#7e9d65"/></g>}
 <text x="80" y="116" textAnchor="middle" fill="var(--fg)" fontSize="12">{step>=1?data.labels[0]:"Panel 1"}</text><text x="240" y="116" textAnchor="middle" fill="var(--fg)" fontSize="12">{step>=2?data.labels[1]:"Panel 2"}</text>
 </svg><Row><Control style={{minHeight:44}} disabled={locked||step!==0} onClick={()=>setStep(1)}>Open first</Control><Control style={{minHeight:44}} disabled={locked||step!==1} onClick={()=>{setStep(2);interact();}}>Open second</Control></Row>
 <p style={{textAlign:"center",color:"var(--muted)",fontSize:"0.8rem"}}>Illustrative schematic</p></div>}
 </Lesson>;
}
