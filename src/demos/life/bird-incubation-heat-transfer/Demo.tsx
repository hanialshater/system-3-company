"use client";
import { useRef, useState } from "react";
import { Lesson } from "@/kit/Lesson";
import { Control, Row } from "@/kit/controls";
const lesson={
  "question": "A bird settles over a cooler egg. In this simplified comparison, which way does heat move by contact?",
  "options": [
    "From cooler egg to warmer bird",
    "No heat can move by contact",
    "From warmer bird to cooler egg"
  ],
  "answer": 2,
  "explanation": "The arrow runs from the warmer bird toward the cooler egg in this contact model. Incubation conditions vary among species, and the drawing does not predict the egg’s exact temperature."
};
export default function Demo({slug}:{slug:string}) {
 const [step,setStep]=useState(0); const stepRef=useRef(0);
 return <Lesson slug={slug} predict={{question:lesson.question,options:lesson.options,answer:lesson.answer}} exploreHint="Inspect the scene, then show the comparison." minInteractions={2} reveal={()=><p>{lesson.explanation}</p>}>
 {({locked,interact})=><div><svg viewBox="0 0 340 190" className="stage-svg" role="img" aria-label={step===0 ? "Diagram hidden until exploration." : step===1 ? "A schematic scene; its evidence is hidden." : lesson.explanation}>
 {step===0 && <text x="170" y="90" textAnchor="middle" fill="var(--muted)" fontSize="15">Evidence hidden</text>}
 {step>=1 && <g><ellipse cx="170" cy="125" rx="40" ry="27" fill="#e8ddbf" stroke="var(--fg)" strokeWidth="3"/><text x="170" y="166" textAnchor="middle" fill="var(--fg)" fontSize="13">Cooler egg</text></g>}
 {step>=2 && <g><path d="M55 55 Q145 15 250 55 L245 88 Q155 104 60 88 Z" fill="#adc5cf" stroke="var(--fg)" strokeWidth="3"/><path d="M170 86 V112 M161 104 L170 113 L179 104" stroke="var(--warn)" strokeWidth="4" fill="none"/><text x="170" y="48" textAnchor="middle" fill="var(--fg)" fontSize="13">Warmer bird</text></g>}
 </svg><Row><Control style={{minHeight:44}} disabled={locked||step!==0} onClick={()=>{if(stepRef.current!==0)return;stepRef.current=1;setStep(1);interact();}}>Inspect scene</Control><Control style={{minHeight:44}} disabled={locked||step!==1} onClick={()=>{if(stepRef.current!==1)return;stepRef.current=2;setStep(2);interact();}}>Show evidence</Control></Row></div>}
 </Lesson>;
}
