"use client";
import { useState } from "react";
import { Lesson } from "@/kit/Lesson";
import { Control, Row } from "@/kit/controls";
const data = {
  "question": "A modeled measurement reports 100 ± 2 million years. Which interval represents that reported uncertainty?",
  "options": [
    "2 to 100 million years",
    "98 to 102 million years",
    "100 million years exactly"
  ],
  "answer": 1,
  "explanation": "The marked interval runs from 98 to 102 million years for the stated ±2 example. Real radiometric dates require method-specific uncertainty and geological interpretation; this is an arithmetic illustration.",
  "labels": [
    "Reported center",
    "Stated range"
  ]
};
export default function Demo({slug}:{slug:string}) {
 const [step,setStep]=useState(0);
 return <Lesson slug={slug} predict={{question:data.question,options:data.options,answer:data.answer}} exploreHint="Open both evidence panels before comparing them." reveal={()=><p>{data.explanation}</p>}>
 {({locked,interact})=><div>
 <svg viewBox="0 0 320 145" className="stage-svg" role="img" aria-label={step===0 ? "Two evidence panels are hidden." : step===1 ? data.labels[0]+" shown; second panel hidden." : data.labels.join(" and ")+" shown; schematic."}>
 <rect x="5" y="7" width="150" height="125" rx="12" fill="var(--bg-2)" stroke="var(--muted)"/><rect x="165" y="7" width="150" height="125" rx="12" fill="var(--bg-2)" stroke="var(--muted)"/>
 {step>=1 && <g transform="translate(10 14)"><path d="M12 44 H128" stroke="var(--fg)" strokeWidth="3"/><circle cx="70" cy="44" r="6" fill="var(--good)"/><text x="70" y="68" fill="var(--fg)" textAnchor="middle" fontSize="13">100</text></g>}{step>=2 && <g transform="translate(170 14)"><path d="M12 44 H128" stroke="var(--fg)" strokeWidth="3"/><path d="M35 44 H105 M35 35 V53 M105 35 V53" stroke="var(--good)" strokeWidth="5"/><text x="35" y="68" fill="var(--fg)" textAnchor="middle" fontSize="13">98</text><text x="105" y="68" fill="var(--fg)" textAnchor="middle" fontSize="13">102</text></g>}
 <text x="80" y="116" textAnchor="middle" fill="var(--fg)" fontSize="12">{step>=1?data.labels[0]:"Panel 1"}</text><text x="240" y="116" textAnchor="middle" fill="var(--fg)" fontSize="12">{step>=2?data.labels[1]:"Panel 2"}</text>
 </svg><Row><Control style={{minHeight:44}} disabled={locked||step!==0} onClick={()=>setStep(1)}>Open first</Control><Control style={{minHeight:44}} disabled={locked||step!==1} onClick={()=>{setStep(2);interact();}}>Open second</Control></Row>
 <p style={{textAlign:"center",color:"var(--muted)",fontSize:"0.8rem"}}>Illustrative schematic</p></div>}
 </Lesson>;
}
