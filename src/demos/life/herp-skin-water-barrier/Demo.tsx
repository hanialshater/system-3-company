"use client";
import { useRef, useState } from "react";
import { Lesson } from "@/kit/Lesson";
import { Control, Row } from "@/kit/controls";
const lesson={
  "question": "In this simplified comparison, which outer covering provides a stronger barrier against drying?",
  "options": [
    "The keratinized reptile scales",
    "The exposed moist amphibian skin",
    "Both are identical barriers"
  ],
  "answer": 0,
  "explanation": "The schematic compares a keratinized scaly surface with exposed moist skin. Many reptiles have a skin barrier that limits water loss; amphibian skin is often more permeable. Real water balance depends on species and conditions."
};
export default function Demo({slug}:{slug:string}) {
 const [step,setStep]=useState(0); const stepRef=useRef(0);
 return <Lesson slug={slug} predict={{question:lesson.question,options:lesson.options,answer:lesson.answer}} exploreHint="Inspect the scene, then show the comparison." minInteractions={2} reveal={()=><p>{lesson.explanation}</p>}>
 {({locked,interact})=><div><svg viewBox="0 0 340 190" className="stage-svg" role="img" aria-label={step===0 ? "Diagram hidden until exploration." : step===1 ? "A schematic scene; its evidence is hidden." : lesson.explanation}>
 {step===0 && <text x="170" y="90" textAnchor="middle" fill="var(--muted)" fontSize="15">Evidence hidden</text>}
 {step>=1 && <g><text x="85" y="34" textAnchor="middle" fill="var(--fg)" fontSize="14">A</text><text x="255" y="34" textAnchor="middle" fill="var(--fg)" fontSize="14">B</text></g>}
 {step>=2 && <g><path d="M25 80 Q45 55 65 80 Q85 55 105 80 Q125 55 145 80 V115 H25Z" fill="#bbbc8c" stroke="var(--fg)" strokeWidth="3"/><path d="M195 80 Q225 65 255 80 Q285 65 315 80 V115 H195Z" fill="#98c7be" stroke="var(--fg)" strokeWidth="3"/><path d="M235 75 V48 M255 75 V48 M275 75 V48" stroke="#76b5d5" strokeWidth="3"/><text x="85" y="150" textAnchor="middle" fill="var(--fg)" fontSize="13">Scaly barrier</text><text x="255" y="150" textAnchor="middle" fill="var(--fg)" fontSize="13">Moist skin</text></g>}
 </svg><Row><Control style={{minHeight:44}} disabled={locked||step!==0} onClick={()=>{if(stepRef.current!==0)return;stepRef.current=1;setStep(1);interact();}}>Inspect scene</Control><Control style={{minHeight:44}} disabled={locked||step!==1} onClick={()=>{if(stepRef.current!==1)return;stepRef.current=2;setStep(2);interact();}}>Show evidence</Control></Row></div>}
 </Lesson>;
}
