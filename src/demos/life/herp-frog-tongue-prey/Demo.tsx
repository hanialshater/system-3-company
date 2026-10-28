"use client";
import { useRef, useState } from "react";
import { Lesson } from "@/kit/Lesson";
import { Control, Row } from "@/kit/controls";
const lesson={
  "question": "In the illustrated capture, which structure extends toward the insect?",
  "options": [
    "A frog wing",
    "The frog’s eye",
    "The frog’s tongue"
  ],
  "answer": 2,
  "explanation": "The drawing shows a tongue extending from the frog toward an insect. Frog tongue mechanics vary, and the simplified path does not show muscle motion or measure the capture."
};
export default function Demo({slug}:{slug:string}) {
 const [step,setStep]=useState(0); const stepRef=useRef(0);
 return <Lesson slug={slug} predict={{question:lesson.question,options:lesson.options,answer:lesson.answer}} exploreHint="Inspect the scene, then show the comparison." minInteractions={2} reveal={()=><p>{lesson.explanation}</p>}>
 {({locked,interact})=><div><svg viewBox="0 0 340 190" className="stage-svg" role="img" aria-label={step===0 ? "Diagram hidden until exploration." : step===1 ? "A schematic scene; its evidence is hidden." : lesson.explanation}>
 {step===0 && <text x="170" y="90" textAnchor="middle" fill="var(--muted)" fontSize="15">Evidence hidden</text>}
 {step>=1 && <g><path d="M30 125 H315" stroke="var(--muted)" strokeWidth="3"/><circle cx="270" cy="80" r="7" fill="var(--warn)"/></g>}
 {step>=2 && <g><path d="M35 110 Q50 60 110 75 Q145 80 145 110 Z" fill="#99bd8d" stroke="var(--fg)" strokeWidth="3"/><circle cx="75" cy="75" r="8" fill="#99bd8d" stroke="var(--fg)" strokeWidth="2"/><circle cx="75" cy="75" r="3" fill="var(--fg)"/><path d="M140 96 Q200 77 262 80" stroke="#db878a" strokeWidth="5" fill="none"/><text x="205" y="65" textAnchor="middle" fill="var(--fg)" fontSize="13">Tongue</text></g>}
 </svg><Row><Control style={{minHeight:44}} disabled={locked||step!==0} onClick={()=>{if(stepRef.current!==0)return;stepRef.current=1;setStep(1);interact();}}>Inspect scene</Control><Control style={{minHeight:44}} disabled={locked||step!==1} onClick={()=>{if(stepRef.current!==1)return;stepRef.current=2;setStep(2);interact();}}>Show evidence</Control></Row></div>}
 </Lesson>;
}
