"use client";
import { useRef, useState } from "react";
import { Lesson } from "@/kit/Lesson";
import { Control, Row } from "@/kit/controls";
const lesson={
  "question": "In a simplified flamingo feeding model, water passes the bill’s filtering structures. What is retained?",
  "options": [
    "All of the water",
    "A whole fish",
    "Small food particles"
  ],
  "answer": 2,
  "explanation": "The diagram separates particles from water as water passes a filter in the bill. Flamingo feeding and filter anatomy vary among species; the particles, arrows and spacing here are schematic."
};
export default function Demo({slug}:{slug:string}) {
 const [step,setStep]=useState(0); const stepRef=useRef(0);
 return <Lesson slug={slug} predict={{question:lesson.question,options:lesson.options,answer:lesson.answer}} exploreHint="Inspect the scene, then show the comparison." minInteractions={2} reveal={()=><p>{lesson.explanation}</p>}>
 {({locked,interact})=><div><svg viewBox="0 0 340 190" className="stage-svg" role="img" aria-label={step===0 ? "Diagram hidden until exploration." : step===1 ? "A schematic scene; its evidence is hidden." : lesson.explanation}>
 {step===0 && <text x="170" y="90" textAnchor="middle" fill="var(--muted)" fontSize="15">Evidence hidden</text>}
 {step>=1 && <g><path d="M50 90 H285" stroke="#76aaca" strokeWidth="18"/><text x="160" y="157" textAnchor="middle" fill="var(--fg)" fontSize="13">Schematic water flow</text></g>}
 {step>=2 && <g><path d="M100 50 Q185 52 235 90 Q190 125 100 126 Z" fill="#e9abb0" stroke="var(--fg)" strokeWidth="3"/><path d="M170 62 V116 M185 66 V112 M200 73 V106" stroke="var(--fg)" strokeWidth="3"/><circle cx="157" cy="82" r="5" fill="#d18a47"/><circle cx="152" cy="99" r="5" fill="#d18a47"/><path d="M220 90 H290 M280 80 L290 90 L280 100" stroke="#508eb5" strokeWidth="3" fill="none"/></g>}
 </svg><Row><Control style={{minHeight:44}} disabled={locked||step!==0} onClick={()=>{if(stepRef.current!==0)return;stepRef.current=1;setStep(1);interact();}}>Inspect scene</Control><Control style={{minHeight:44}} disabled={locked||step!==1} onClick={()=>{if(stepRef.current!==1)return;stepRef.current=2;setStep(2);interact();}}>Show evidence</Control></Row></div>}
 </Lesson>;
}
