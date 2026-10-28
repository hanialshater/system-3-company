"use client";
import { useRef, useState } from "react";
import { Lesson } from "@/kit/Lesson";
import { Control, Row } from "@/kit/controls";
const lesson={
  "question": "In a typical frog life cycle, which structure is associated with an adult frog breathing air?",
  "options": [
    "Lungs",
    "External tadpole gills only",
    "A bird’s air sac"
  ],
  "answer": 0,
  "explanation": "The schematic contrasts tadpole gills in water with adult lungs in air. Frog skin can also participate in gas exchange, and timing and structures vary across amphibians."
};
export default function Demo({slug}:{slug:string}) {
 const [step,setStep]=useState(0); const stepRef=useRef(0);
 return <Lesson slug={slug} predict={{question:lesson.question,options:lesson.options,answer:lesson.answer}} exploreHint="Inspect the scene, then show the comparison." minInteractions={2} reveal={()=><p>{lesson.explanation}</p>}>
 {({locked,interact})=><div><svg viewBox="0 0 340 190" className="stage-svg" role="img" aria-label={step===0 ? "Diagram hidden until exploration." : step===1 ? "A schematic scene; its evidence is hidden." : lesson.explanation}>
 {step===0 && <text x="170" y="90" textAnchor="middle" fill="var(--muted)" fontSize="15">Evidence hidden</text>}
 {step>=1 && <g><text x="85" y="30" textAnchor="middle" fill="var(--fg)" fontSize="13">Tadpole</text><text x="255" y="30" textAnchor="middle" fill="var(--fg)" fontSize="13">Adult frog</text></g>}
 {step>=2 && <g><ellipse cx="65" cy="90" rx="28" ry="20" fill="#9bc8c1"/><path d="M90 90 Q120 70 145 95 Q120 115 90 90" fill="#9bc8c1" stroke="var(--fg)" strokeWidth="2"/><path d="M38 80 L25 70 M38 90 H20 M38 100 L25 110" stroke="var(--good)" strokeWidth="4"/><ellipse cx="255" cy="95" rx="50" ry="31" fill="#9aba92"/><ellipse cx="240" cy="93" rx="9" ry="15" fill="var(--good)"/><ellipse cx="270" cy="93" rx="9" ry="15" fill="var(--good)"/><text x="85" y="150" textAnchor="middle" fill="var(--fg)" fontSize="13">Gills</text><text x="255" y="150" textAnchor="middle" fill="var(--fg)" fontSize="13">Lungs · simplified</text><circle cx="230" cy="70" r="9" fill="#9aba92" stroke="var(--fg)" strokeWidth="2"/><circle cx="280" cy="70" r="9" fill="#9aba92" stroke="var(--fg)" strokeWidth="2"/><path d="M220 112 L205 125 M290 112 L305 125" stroke="var(--fg)" strokeWidth="4"/></g>}
 </svg><Row><Control style={{minHeight:44}} disabled={locked||step!==0} onClick={()=>{if(stepRef.current!==0)return;stepRef.current=1;setStep(1);interact();}}>Inspect scene</Control><Control style={{minHeight:44}} disabled={locked||step!==1} onClick={()=>{if(stepRef.current!==1)return;stepRef.current=2;setStep(2);interact();}}>Show evidence</Control></Row></div>}
 </Lesson>;
}
