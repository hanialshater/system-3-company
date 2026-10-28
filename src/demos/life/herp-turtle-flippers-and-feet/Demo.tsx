"use client";
import { useRef, useState } from "react";
import { Lesson } from "@/kit/Lesson";
import { Control, Row } from "@/kit/controls";
const lesson={
  "question": "In these schematic examples, which limb is shaped for moving through water?",
  "options": [
    "Both are identical",
    "The flattened flipper",
    "The weight-bearing foot"
  ],
  "answer": 1,
  "explanation": "The first drawing shows a broad flattened flipper; the second shows a foot contacting a surface. These represent selected aquatic and terrestrial examples, not every turtle species or a measurement of movement."
};
export default function Demo({slug}:{slug:string}) {
 const [step,setStep]=useState(0); const stepRef=useRef(0);
 return <Lesson slug={slug} predict={{question:lesson.question,options:lesson.options,answer:lesson.answer}} exploreHint="Inspect the scene, then show the comparison." minInteractions={2} reveal={()=><p>{lesson.explanation}</p>}>
 {({locked,interact})=><div><svg viewBox="0 0 340 190" className="stage-svg" role="img" aria-label={step===0 ? "Diagram hidden until exploration." : step===1 ? "A schematic scene; its evidence is hidden." : lesson.explanation}>
 {step===0 && <text x="170" y="90" textAnchor="middle" fill="var(--muted)" fontSize="15">Evidence hidden</text>}
 {step>=1 && <g><text x="85" y="30" textAnchor="middle" fill="var(--fg)" fontSize="13">A</text><text x="255" y="30" textAnchor="middle" fill="var(--fg)" fontSize="13">B</text></g>}
 {step>=2 && <g><path d="M30 70 Q80 45 145 95 Q115 130 60 112 Z" fill="#90bdb3" stroke="var(--fg)" strokeWidth="3"/><path d="M215 55 L265 60 L270 105 L300 115 L295 130 H220Z" fill="#b7af8b" stroke="var(--fg)" strokeWidth="3"/><path d="M195 135 H315" stroke="var(--muted)" strokeWidth="3"/><text x="85" y="165" textAnchor="middle" fill="var(--fg)" fontSize="13">Water</text><text x="255" y="165" textAnchor="middle" fill="var(--fg)" fontSize="13">Land</text></g>}
 </svg><Row><Control style={{minHeight:44}} disabled={locked||step!==0} onClick={()=>{if(stepRef.current!==0)return;stepRef.current=1;setStep(1);interact();}}>Inspect scene</Control><Control style={{minHeight:44}} disabled={locked||step!==1} onClick={()=>{if(stepRef.current!==1)return;stepRef.current=2;setStep(2);interact();}}>Show evidence</Control></Row></div>}
 </Lesson>;
}
