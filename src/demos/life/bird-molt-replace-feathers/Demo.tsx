"use client";
import { useRef, useState } from "react";
import { Lesson } from "@/kit/Lesson";
import { Control, Row } from "@/kit/controls";
const lesson={
  "question": "When a bird molts, what happens to an old feather in the illustrated sequence?",
  "options": [
    "It becomes a bone",
    "It never changes",
    "It is shed and replaced"
  ],
  "answer": 2,
  "explanation": "The sequence shows an old feather leaving and a replacement growing from the follicle. Molting patterns vary by species and feather type; this simple sequence does not show the entire molt."
};
export default function Demo({slug}:{slug:string}) {
 const [step,setStep]=useState(0); const stepRef=useRef(0);
 return <Lesson slug={slug} predict={{question:lesson.question,options:lesson.options,answer:lesson.answer}} exploreHint="Inspect the scene, then show the comparison." minInteractions={2} reveal={()=><p>{lesson.explanation}</p>}>
 {({locked,interact})=><div><svg viewBox="0 0 340 190" className="stage-svg" role="img" aria-label={step===0 ? "Diagram hidden until exploration." : step===1 ? "A schematic scene; its evidence is hidden." : lesson.explanation}>
 {step===0 && <text x="170" y="90" textAnchor="middle" fill="var(--muted)" fontSize="15">Evidence hidden</text>}
 {step>=1 && <g><path d="M25 132 H315" stroke="var(--line)" strokeWidth="3"/></g>}
 {step>=2 && <g><path d="M65 123 Q35 65 70 32 Q105 70 65 123 M65 123 V31 M170 123 V80 M270 123 Q248 81 275 57 Q300 85 270 123 M270 123 V57" fill="none" stroke="var(--fg)" strokeWidth="3"/><path d="M95 94 H135 M125 84 L135 94 L125 104 M200 94 H240 M230 84 L240 94 L230 104" fill="none" stroke="var(--good)" strokeWidth="3"/><text x="65" y="158" textAnchor="middle" fill="var(--fg)" fontSize="13">Old</text><text x="170" y="158" textAnchor="middle" fill="var(--fg)" fontSize="13">Shed</text><text x="270" y="158" textAnchor="middle" fill="var(--fg)" fontSize="13">New</text></g>}
 </svg><Row><Control style={{minHeight:44}} disabled={locked||step!==0} onClick={()=>{if(stepRef.current!==0)return;stepRef.current=1;setStep(1);interact();}}>Inspect scene</Control><Control style={{minHeight:44}} disabled={locked||step!==1} onClick={()=>{if(stepRef.current!==1)return;stepRef.current=2;setStep(2);interact();}}>Show evidence</Control></Row></div>}
 </Lesson>;
}
