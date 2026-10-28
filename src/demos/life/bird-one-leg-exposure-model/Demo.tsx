"use client";
import { useRef, useState } from "react";
import { Lesson } from "@/kit/Lesson";
import { Control, Row } from "@/kit/controls";
const lesson={
  "question": "In this toy model both legs lose heat equally when exposed. If one is tucked under feathers, how many legs remain exposed?",
  "options": [
    "One",
    "Two",
    "None"
  ],
  "answer": 0,
  "explanation": "The model shows one leg outside the feather outline and one tucked inside. Reducing exposed leg area can reduce one route of heat loss in this toy comparison; real heat balance depends on more factors."
};
export default function Demo({slug}:{slug:string}) {
 const [step,setStep]=useState(0); const stepRef=useRef(0);
 return <Lesson slug={slug} predict={{question:lesson.question,options:lesson.options,answer:lesson.answer}} exploreHint="Inspect the scene, then show the comparison." minInteractions={2} reveal={()=><p>{lesson.explanation}</p>}>
 {({locked,interact})=><div><svg viewBox="0 0 340 190" className="stage-svg" role="img" aria-label={step===0 ? "Diagram hidden until exploration." : step===1 ? "A schematic scene; its evidence is hidden." : lesson.explanation}>
 {step===0 && <text x="170" y="90" textAnchor="middle" fill="var(--muted)" fontSize="15">Evidence hidden</text>}
 {step>=1 && <g><ellipse cx="170" cy="66" rx="72" ry="40" fill="#b2c8d2" stroke="var(--fg)" strokeWidth="3"/></g>}
 {step>=2 && <g><path d="M140 89 Q150 104 164 96" fill="none" stroke="var(--warn)" strokeWidth="5"/><path d="M190 105 V142" stroke="var(--warn)" strokeWidth="5"/><text x="170" y="160" textAnchor="middle" fill="var(--fg)" fontSize="13">One leg exposed</text></g>}
 </svg><Row><Control style={{minHeight:44}} disabled={locked||step!==0} onClick={()=>{if(stepRef.current!==0)return;stepRef.current=1;setStep(1);interact();}}>Inspect scene</Control><Control style={{minHeight:44}} disabled={locked||step!==1} onClick={()=>{if(stepRef.current!==1)return;stepRef.current=2;setStep(2);interact();}}>Show evidence</Control></Row></div>}
 </Lesson>;
}
