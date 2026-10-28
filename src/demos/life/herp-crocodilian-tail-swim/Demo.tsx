"use client";
import { useRef, useState } from "react";
import { Lesson } from "@/kit/Lesson";
import { Control, Row } from "@/kit/controls";
const lesson={
  "question": "In the simplified swimming scene, which body part provides major propulsion for a crocodilian?",
  "options": [
    "Its eyelids",
    "Its tail",
    "Its teeth"
  ],
  "answer": 1,
  "explanation": "The long tail is highlighted in the schematic water scene. Crocodilians use lateral movements of body and tail in swimming; the drawing does not model fluid forces or the role of limbs."
};
export default function Demo({slug}:{slug:string}) {
 const [step,setStep]=useState(0); const stepRef=useRef(0);
 return <Lesson slug={slug} predict={{question:lesson.question,options:lesson.options,answer:lesson.answer}} exploreHint="Inspect the scene, then show the comparison." minInteractions={2} reveal={()=><p>{lesson.explanation}</p>}>
 {({locked,interact})=><div><svg viewBox="0 0 340 190" className="stage-svg" role="img" aria-label={step===0 ? "Diagram hidden until exploration." : step===1 ? "A schematic scene; its evidence is hidden." : lesson.explanation}>
 {step===0 && <text x="170" y="90" textAnchor="middle" fill="var(--muted)" fontSize="15">Evidence hidden</text>}
 {step>=1 && <g><path d="M25 135 H315" stroke="#76b5d5" strokeWidth="4"/></g>}
 {step>=2 && <g><path d="M35 92 Q90 53 180 78 L230 92 L180 105 Q95 125 35 92Z" fill="#8faa8b" stroke="var(--fg)" strokeWidth="3"/><path d="M180 90 Q245 55 305 83 Q245 100 180 100 Z" fill="var(--good)" stroke="var(--fg)" strokeWidth="3"/><circle cx="60" cy="85" r="4" fill="var(--fg)"/><text x="230" y="158" textAnchor="middle" fill="var(--fg)" fontSize="13">Tail · schematic</text><path d="M75 105 L60 127 M120 110 L125 128 M145 78 L153 69 L161 79 M120 74 L128 65 L136 76 M48 96 H80" stroke="var(--fg)" strokeWidth="3" fill="none"/></g>}
 </svg><Row><Control style={{minHeight:44}} disabled={locked||step!==0} onClick={()=>{if(stepRef.current!==0)return;stepRef.current=1;setStep(1);interact();}}>Inspect scene</Control><Control style={{minHeight:44}} disabled={locked||step!==1} onClick={()=>{if(stepRef.current!==1)return;stepRef.current=2;setStep(2);interact();}}>Show evidence</Control></Row></div>}
 </Lesson>;
}
