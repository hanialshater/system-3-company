"use client";
import { useRef, useState } from "react";
import { Lesson } from "@/kit/Lesson";
import { Control, Row } from "@/kit/controls";
const lesson={
  "question": "After taking in excess salt, which structure helps some seabirds remove it?",
  "options": [
    "Salt glands near the eyes",
    "A feather vane",
    "The beak tip alone"
  ],
  "answer": 0,
  "explanation": "The simplified arrows carry excess salt from the body toward glands near the eyes and out through the nasal region. Species vary, and the diagram does not quantify salt balance or show all excretion."
};
export default function Demo({slug}:{slug:string}) {
 const [step,setStep]=useState(0); const stepRef=useRef(0);
 return <Lesson slug={slug} predict={{question:lesson.question,options:lesson.options,answer:lesson.answer}} exploreHint="Inspect the scene, then show the comparison." minInteractions={2} reveal={()=><p>{lesson.explanation}</p>}>
 {({locked,interact})=><div><svg viewBox="0 0 340 190" className="stage-svg" role="img" aria-label={step===0 ? "Diagram hidden until exploration." : step===1 ? "A schematic scene; its evidence is hidden." : lesson.explanation}>
 {step===0 && <text x="170" y="90" textAnchor="middle" fill="var(--muted)" fontSize="15">Evidence hidden</text>}
 {step>=1 && <g><path d="M50 90 Q75 35 145 48 Q185 50 202 74 L275 91 L202 105 Q165 145 95 128 Z" fill="#b4c8d0" stroke="var(--fg)" strokeWidth="3"/><circle cx="155" cy="74" r="4" fill="var(--fg)"/></g>}
 {step>=2 && <g><ellipse cx="153" cy="57" rx="22" ry="8" fill="var(--good)"/><path d="M145 115 L145 70 M145 70 L155 59 M175 61 L222 83" stroke="var(--good)" strokeWidth="3" fill="none"/><text x="95" y="160" fill="var(--fg)" fontSize="13">Salt gland → nasal region</text></g>}
 </svg><Row><Control style={{minHeight:44}} disabled={locked||step!==0} onClick={()=>{if(stepRef.current!==0)return;stepRef.current=1;setStep(1);interact();}}>Inspect scene</Control><Control style={{minHeight:44}} disabled={locked||step!==1} onClick={()=>{if(stepRef.current!==1)return;stepRef.current=2;setStep(2);interact();}}>Show evidence</Control></Row></div>}
 </Lesson>;
}
