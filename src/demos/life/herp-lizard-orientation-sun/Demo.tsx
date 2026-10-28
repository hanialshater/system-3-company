"use client";
import { useRef, useState } from "react";
import { Lesson } from "@/kit/Lesson";
import { Control, Row } from "@/kit/controls";
const lesson={
  "question": "A flat surface is compared face-on and edge-on to incoming rays. Which orientation presents the larger area?",
  "options": [
    "The same area",
    "Face-on",
    "Edge-on"
  ],
  "answer": 1,
  "explanation": "The first panel presents a broad surface to the illustrated rays; the second is nearly edge-on. Some lizards can alter exposure by orientation, but real heat gain also depends on radiation, shape and conditions."
};
export default function Demo({slug}:{slug:string}) {
 const [step,setStep]=useState(0); const stepRef=useRef(0);
 return <Lesson slug={slug} predict={{question:lesson.question,options:lesson.options,answer:lesson.answer}} exploreHint="Inspect the scene, then show the comparison." minInteractions={2} reveal={()=><p>{lesson.explanation}</p>}>
 {({locked,interact})=><div><svg viewBox="0 0 340 190" className="stage-svg" role="img" aria-label={step===0 ? "Diagram hidden until exploration." : step===1 ? "A schematic scene; its evidence is hidden." : lesson.explanation}>
 {step===0 && <text x="170" y="90" textAnchor="middle" fill="var(--muted)" fontSize="15">Evidence hidden</text>}
 {step>=1 && <g><path d="M30 35 L95 95 M65 35 L130 95 M200 35 L265 95 M235 35 L300 95" stroke="var(--warn)" strokeWidth="3"/></g>}
 {step>=2 && <g><path d="M45 112 L120 37" stroke="var(--good)" strokeWidth="9"/><path d="M215 78 L235 98" stroke="var(--good)" strokeWidth="9"/><text x="85" y="155" textAnchor="middle" fill="var(--fg)" fontSize="13">Broad face</text><text x="255" y="155" textAnchor="middle" fill="var(--fg)" fontSize="13">Edge-on</text></g>}
 </svg><Row><Control style={{minHeight:44}} disabled={locked||step!==0} onClick={()=>{if(stepRef.current!==0)return;stepRef.current=1;setStep(1);interact();}}>Inspect scene</Control><Control style={{minHeight:44}} disabled={locked||step!==1} onClick={()=>{if(stepRef.current!==1)return;stepRef.current=2;setStep(2);interact();}}>Show evidence</Control></Row></div>}
 </Lesson>;
}
