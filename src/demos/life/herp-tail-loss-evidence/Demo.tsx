"use client";
import { useRef, useState } from "react";
import { Lesson } from "@/kit/Lesson";
import { Control, Row } from "@/kit/controls";
const lesson={
  "question": "A salamander is seen without its tail. Does this observation alone establish a predator caused the loss?",
  "options": [
    "Yes; a predator is proven",
    "Yes; every salamander loses its tail this way",
    "No; other causes remain possible"
  ],
  "answer": 2,
  "explanation": "The picture shows a salamander with a missing tail; it does not show the event that caused the loss. Injury has multiple possible causes, so a predator explanation needs additional evidence."
};
export default function Demo({slug}:{slug:string}) {
 const [step,setStep]=useState(0); const stepRef=useRef(0);
 return <Lesson slug={slug} predict={{question:lesson.question,options:lesson.options,answer:lesson.answer}} exploreHint="Inspect the scene, then show the comparison." minInteractions={2} reveal={()=><p>{lesson.explanation}</p>}>
 {({locked,interact})=><div><svg viewBox="0 0 340 190" className="stage-svg" role="img" aria-label={step===0 ? "Diagram hidden until exploration." : step===1 ? "A schematic scene; its evidence is hidden." : lesson.explanation}>
 {step===0 && <text x="170" y="90" textAnchor="middle" fill="var(--muted)" fontSize="15">Evidence hidden</text>}
 {step>=1 && <g><path d="M35 130 H305" stroke="var(--muted)" strokeWidth="3"/></g>}
 {step>=2 && <g><path d="M50 95 Q90 65 160 85 L195 96 L160 108 Q90 125 50 95Z" fill="#a8bda4" stroke="var(--fg)" strokeWidth="3"/><path d="M95 111 L85 130 M135 111 L145 130" stroke="var(--fg)" strokeWidth="4"/><circle cx="65" cy="90" r="4" fill="var(--fg)"/><text x="170" y="162" textAnchor="middle" fill="var(--fg)" fontSize="13">Cause not observed</text><path d="M75 108 L65 125 M155 106 L165 125" stroke="var(--fg)" strokeWidth="4"/></g>}
 </svg><Row><Control style={{minHeight:44}} disabled={locked||step!==0} onClick={()=>{if(stepRef.current!==0)return;stepRef.current=1;setStep(1);interact();}}>Inspect scene</Control><Control style={{minHeight:44}} disabled={locked||step!==1} onClick={()=>{if(stepRef.current!==1)return;stepRef.current=2;setStep(2);interact();}}>Show evidence</Control></Row></div>}
 </Lesson>;
}
