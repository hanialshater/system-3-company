"use client";
import { useRef, useState } from "react";
import { Lesson } from "@/kit/Lesson";
import { Control, Row } from "@/kit/controls";
const lesson={
  "question": "An ectothermic lizard rests on a warm rock. Must its body always be cold?",
  "options": [
    "Yes; ectothermic means permanently cold",
    "Its body temperature is unrelated to surroundings",
    "No; its body can become warm"
  ],
  "answer": 2,
  "explanation": "The arrows show heat moving from a stipulated warmer rock toward the lizard. Ectothermy describes dependence on external heat sources, not a fixed low body temperature; actual temperature varies with conditions and behavior."
};
export default function Demo({slug}:{slug:string}) {
 const [step,setStep]=useState(0); const stepRef=useRef(0);
 return <Lesson slug={slug} predict={{question:lesson.question,options:lesson.options,answer:lesson.answer}} exploreHint="Inspect the scene, then show the comparison." minInteractions={2} reveal={()=><p>{lesson.explanation}</p>}>
 {({locked,interact})=><div><svg viewBox="0 0 340 190" className="stage-svg" role="img" aria-label={step===0 ? "Diagram hidden until exploration." : step===1 ? "A schematic scene; its evidence is hidden." : lesson.explanation}>
 {step===0 && <text x="170" y="90" textAnchor="middle" fill="var(--muted)" fontSize="15">Evidence hidden</text>}
 {step>=1 && <g><path d="M25 130 H315 V160 H25Z" fill="#b49a7e"/><text x="170" y="155" textAnchor="middle" fill="#18222b" fontSize="13">Warmer rock · stipulated</text></g>}
 {step>=2 && <g><path d="M65 100 Q100 65 155 85 L185 92 L155 104 Q105 120 65 100Z" fill="#95bb8b" stroke="var(--fg)" strokeWidth="3"/><path d="M150 90 Q215 62 270 85 M90 108 L80 125 M120 108 L130 125" stroke="var(--fg)" strokeWidth="4" fill="none"/><path d="M155 130 V112 M146 120 L155 111 L164 120" stroke="var(--warn)" strokeWidth="3" fill="none"/></g>}
 </svg><Row><Control style={{minHeight:44}} disabled={locked||step!==0} onClick={()=>{if(stepRef.current!==0)return;stepRef.current=1;setStep(1);interact();}}>Inspect scene</Control><Control style={{minHeight:44}} disabled={locked||step!==1} onClick={()=>{if(stepRef.current!==1)return;stepRef.current=2;setStep(2);interact();}}>Show evidence</Control></Row></div>}
 </Lesson>;
}
