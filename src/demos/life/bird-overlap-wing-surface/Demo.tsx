"use client";
import { useRef, useState } from "react";
import { Lesson } from "@/kit/Lesson";
import { Control, Row } from "@/kit/controls";
const lesson={
  "question": "A bird spreads its flight feathers. What does their overlap help form?",
  "options": [
    "A continuous surface",
    "A row of separate gaps",
    "A rigid solid bone"
  ],
  "answer": 0,
  "explanation": "The simplified fan shows neighboring feather vanes overlapping. That overlap helps make a continuous wing surface as the feathers spread; this sketch does not model airflow or flight forces."
};
export default function Demo({slug}:{slug:string}) {
 const [step,setStep]=useState(0); const stepRef=useRef(0);
 return <Lesson slug={slug} predict={{question:lesson.question,options:lesson.options,answer:lesson.answer}} exploreHint="Inspect the scene, then show the comparison." minInteractions={2} reveal={()=><p>{lesson.explanation}</p>}>
 {({locked,interact})=><div><svg viewBox="0 0 340 190" className="stage-svg" role="img" aria-label={step===0 ? "Diagram hidden until exploration." : step===1 ? "A schematic scene; its evidence is hidden." : lesson.explanation}>
 {step===0 && <text x="170" y="90" textAnchor="middle" fill="var(--muted)" fontSize="15">Evidence hidden</text>}
 {step>=1 && <g><path d="M50 115 Q160 10 285 105" fill="none" stroke="var(--muted)" strokeWidth="5"/></g>}
 {step>=2 && <g><path d="M70 108 Q95 45 125 85 Q150 30 175 75 Q200 35 225 85 Q250 55 272 105 L250 118 L220 106 L190 119 L160 107 L130 120 L100 110 Z" fill="#a8c9dd" stroke="var(--fg)" strokeWidth="3"/><text x="170" y="150" textAnchor="middle" fill="var(--fg)" fontSize="14">Overlapping vanes</text></g>}
 </svg><Row><Control style={{minHeight:44}} disabled={locked||step!==0} onClick={()=>{if(stepRef.current!==0)return;stepRef.current=1;setStep(1);interact();}}>Inspect scene</Control><Control style={{minHeight:44}} disabled={locked||step!==1} onClick={()=>{if(stepRef.current!==1)return;stepRef.current=2;setStep(2);interact();}}>Show evidence</Control></Row></div>}
 </Lesson>;
}
