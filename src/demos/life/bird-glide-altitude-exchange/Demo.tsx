"use client";
import { useRef, useState } from "react";
import { Lesson } from "@/kit/Lesson";
import { Control, Row } from "@/kit/controls";
const lesson={
  "question": "In still air, a bird glides without flapping and loses height. Which energy store falls?",
  "options": [
    "Energy stored in the bird’s altitude rises",
    "The ground moves upward",
    "Gravitational potential energy"
  ],
  "answer": 2,
  "explanation": "The dotted path slopes downward as the bird moves forward. In this simplified still-air glide, falling height reduces gravitational potential energy; the diagram does not specify the bird’s speed or all energy losses."
};
export default function Demo({slug}:{slug:string}) {
 const [step,setStep]=useState(0); const stepRef=useRef(0);
 return <Lesson slug={slug} predict={{question:lesson.question,options:lesson.options,answer:lesson.answer}} exploreHint="Inspect the scene, then show the comparison." minInteractions={2} reveal={()=><p>{lesson.explanation}</p>}>
 {({locked,interact})=><div><svg viewBox="0 0 340 190" className="stage-svg" role="img" aria-label={step===0 ? "Diagram hidden until exploration." : step===1 ? "A schematic scene; its evidence is hidden." : lesson.explanation}>
 {step===0 && <text x="170" y="90" textAnchor="middle" fill="var(--muted)" fontSize="15">Evidence hidden</text>}
 {step>=1 && <g><path d="M35 145 H305" stroke="var(--muted)" strokeWidth="3"/><text x="170" y="168" textAnchor="middle" fill="var(--fg)" fontSize="13">Still air · schematic</text></g>}
 {step>=2 && <g><path d="M60 40 Q160 75 270 130" fill="none" stroke="var(--good)" strokeWidth="4" strokeDasharray="7 5"/><path d="M45 43 Q58 30 72 43 M255 132 Q268 119 282 132" fill="none" stroke="var(--fg)" strokeWidth="4"/><path d="M255 119 L270 130 L253 134" fill="none" stroke="var(--good)" strokeWidth="3"/></g>}
 </svg><Row><Control style={{minHeight:44}} disabled={locked||step!==0} onClick={()=>{if(stepRef.current!==0)return;stepRef.current=1;setStep(1);interact();}}>Inspect scene</Control><Control style={{minHeight:44}} disabled={locked||step!==1} onClick={()=>{if(stepRef.current!==1)return;stepRef.current=2;setStep(2);interact();}}>Show evidence</Control></Row></div>}
 </Lesson>;
}
