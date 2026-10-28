"use client";
import { useRef, useState } from "react";
import { Lesson } from "@/kit/Lesson";
import { Control, Row } from "@/kit/controls";
const lesson={
  "question": "In a typical two-habitat example, where are the aquatic tadpoles shown?",
  "options": [
    "In the pond",
    "On the dry rock",
    "Inside a bird nest"
  ],
  "answer": 0,
  "explanation": "The schematic places tadpoles in water and an adult frog on adjacent land. This is a typical example, not a rule for every frog; some species develop directly or use other habitats."
};
export default function Demo({slug}:{slug:string}) {
 const [step,setStep]=useState(0); const stepRef=useRef(0);
 return <Lesson slug={slug} predict={{question:lesson.question,options:lesson.options,answer:lesson.answer}} exploreHint="Inspect the scene, then show the comparison." minInteractions={2} reveal={()=><p>{lesson.explanation}</p>}>
 {({locked,interact})=><div><svg viewBox="0 0 340 190" className="stage-svg" role="img" aria-label={step===0 ? "Diagram hidden until exploration." : step===1 ? "A schematic scene; its evidence is hidden." : lesson.explanation}>
 {step===0 && <text x="170" y="90" textAnchor="middle" fill="var(--muted)" fontSize="15">Evidence hidden</text>}
 {step>=1 && <g><path d="M20 120 Q75 100 155 120 V160 H20Z" fill="#80b6cc"/><path d="M155 120 Q235 90 320 110 V160 H155Z" fill="#a5b78b"/></g>}
 {step>=2 && <g><circle cx="75" cy="130" r="9" fill="#4f7168"/><path d="M83 130 Q100 115 110 132 Q100 143 83 130" fill="#4f7168"/><ellipse cx="245" cy="103" rx="30" ry="16" fill="#779d73" stroke="var(--fg)" strokeWidth="2"/><circle cx="230" cy="89" r="6" fill="#779d73"/><text x="80" y="178" textAnchor="middle" fill="var(--fg)" fontSize="13">Pond</text><text x="245" y="178" textAnchor="middle" fill="var(--fg)" fontSize="13">Land</text><circle cx="235" cy="87" r="4" fill="var(--fg)"/><path d="M225 111 L210 120 M263 111 L277 120" stroke="var(--fg)" strokeWidth="3"/></g>}
 </svg><Row><Control style={{minHeight:44}} disabled={locked||step!==0} onClick={()=>{if(stepRef.current!==0)return;stepRef.current=1;setStep(1);interact();}}>Inspect scene</Control><Control style={{minHeight:44}} disabled={locked||step!==1} onClick={()=>{if(stepRef.current!==1)return;stepRef.current=2;setStep(2);interact();}}>Show evidence</Control></Row></div>}
 </Lesson>;
}
