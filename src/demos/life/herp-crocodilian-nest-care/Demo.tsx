"use client";
import { useRef, useState } from "react";
import { Lesson } from "@/kit/Lesson";
import { Control, Row } from "@/kit/controls";
const lesson={
  "question": "A crocodilian stays close to a nest in this illustrated example. What could it help protect?",
  "options": [
    "The eggs or young",
    "The nest from ever getting wet",
    "Every animal in the habitat"
  ],
  "answer": 0,
  "explanation": "The diagram shows an adult near a nest with eggs. Some crocodilians guard nests or care for young; this illustrative scene does not claim every adult or every species behaves identically."
};
export default function Demo({slug}:{slug:string}) {
 const [step,setStep]=useState(0); const stepRef=useRef(0);
 return <Lesson slug={slug} predict={{question:lesson.question,options:lesson.options,answer:lesson.answer}} exploreHint="Inspect the scene, then show the comparison." minInteractions={2} reveal={()=><p>{lesson.explanation}</p>}>
 {({locked,interact})=><div><svg viewBox="0 0 340 190" className="stage-svg" role="img" aria-label={step===0 ? "Diagram hidden until exploration." : step===1 ? "A schematic scene; its evidence is hidden." : lesson.explanation}>
 {step===0 && <text x="170" y="90" textAnchor="middle" fill="var(--muted)" fontSize="15">Evidence hidden</text>}
 {step>=1 && <g><ellipse cx="250" cy="115" rx="55" ry="25" fill="#a99772" stroke="var(--fg)" strokeWidth="3"/><ellipse cx="235" cy="110" rx="8" ry="12" fill="#e9e1cb"/><ellipse cx="255" cy="110" rx="8" ry="12" fill="#e9e1cb"/></g>}
 {step>=2 && <g><path d="M25 112 Q58 70 135 89 L190 105 L135 120 Q70 140 25 112Z" fill="#8eab8a" stroke="var(--fg)" strokeWidth="3"/><path d="M134 93 Q180 65 205 90" stroke="var(--fg)" strokeWidth="6" fill="none"/><circle cx="48" cy="104" r="4" fill="var(--fg)"/><text x="170" y="160" textAnchor="middle" fill="var(--fg)" fontSize="13">Illustrative adult + nest</text><path d="M65 118 L55 132 M100 121 L110 134 M45 111 H70 M88 84 L95 76 L102 85" stroke="var(--fg)" strokeWidth="3" fill="none"/></g>}
 </svg><Row><Control style={{minHeight:44}} disabled={locked||step!==0} onClick={()=>{if(stepRef.current!==0)return;stepRef.current=1;setStep(1);interact();}}>Inspect scene</Control><Control style={{minHeight:44}} disabled={locked||step!==1} onClick={()=>{if(stepRef.current!==1)return;stepRef.current=2;setStep(2);interact();}}>Show evidence</Control></Row></div>}
 </Lesson>;
}
