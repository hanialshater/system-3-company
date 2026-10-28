"use client";
import { useRef, useState } from "react";
import { Lesson } from "@/kit/Lesson";
import { Control, Row } from "@/kit/controls";
const lesson={
  "question": "In the illustrated sea turtle life cycle, where are eggs laid?",
  "options": [
    "In a bird’s tree nest",
    "In a nest on land",
    "Floating on the ocean surface"
  ],
  "answer": 1,
  "explanation": "The schematic path goes from water to a nest on shore. Female sea turtles lay eggs on land; the drawing does not show exact nesting sites, migration routes or the behavior of every turtle."
};
export default function Demo({slug}:{slug:string}) {
 const [step,setStep]=useState(0); const stepRef=useRef(0);
 return <Lesson slug={slug} predict={{question:lesson.question,options:lesson.options,answer:lesson.answer}} exploreHint="Inspect the scene, then show the comparison." minInteractions={2} reveal={()=><p>{lesson.explanation}</p>}>
 {({locked,interact})=><div><svg viewBox="0 0 340 190" className="stage-svg" role="img" aria-label={step===0 ? "Diagram hidden until exploration." : step===1 ? "A schematic scene; its evidence is hidden." : lesson.explanation}>
 {step===0 && <text x="170" y="90" textAnchor="middle" fill="var(--muted)" fontSize="15">Evidence hidden</text>}
 {step>=1 && <g><path d="M15 110 H170 V160 H15Z" fill="#79b4cd"/><path d="M170 110 H325 V160 H170Z" fill="#d0b68c"/><text x="85" y="180" textAnchor="middle" fill="var(--fg)" fontSize="13">Ocean</text><text x="245" y="180" textAnchor="middle" fill="var(--fg)" fontSize="13">Shore</text></g>}
 {step>=2 && <g><ellipse cx="90" cy="84" rx="32" ry="17" fill="#90ac88" stroke="var(--fg)" strokeWidth="2"/><path d="M65 85 L42 73 M65 85 L43 99 M115 85 L138 73 M115 85 L138 99" stroke="var(--fg)" strokeWidth="4"/><path d="M135 83 H225 M215 73 L225 83 L215 93" stroke="var(--good)" strokeWidth="3" fill="none"/><ellipse cx="255" cy="126" rx="38" ry="15" fill="#9e866c"/><ellipse cx="245" cy="122" rx="5" ry="7" fill="#ece6d2"/><ellipse cx="261" cy="122" rx="5" ry="7" fill="#ece6d2"/></g>}
 </svg><Row><Control style={{minHeight:44}} disabled={locked||step!==0} onClick={()=>{if(stepRef.current!==0)return;stepRef.current=1;setStep(1);interact();}}>Inspect scene</Control><Control style={{minHeight:44}} disabled={locked||step!==1} onClick={()=>{if(stepRef.current!==1)return;stepRef.current=2;setStep(2);interact();}}>Show evidence</Control></Row></div>}
 </Lesson>;
}
