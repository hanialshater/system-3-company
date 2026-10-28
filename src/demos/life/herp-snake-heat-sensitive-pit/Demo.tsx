"use client";
import { useRef, useState } from "react";
import { Lesson } from "@/kit/Lesson";
import { Control, Row } from "@/kit/controls";
const lesson={
  "question": "A warm object and cooler surroundings are shown. What can infrared-sensitive pits help some snakes detect?",
  "options": [
    "The object’s name",
    "Only its color",
    "A thermal difference"
  ],
  "answer": 2,
  "explanation": "In the schematic, a warm target sends infrared cues toward a pit-bearing snake. Pit organs occur in some snakes, not all, and the illustration does not claim to reproduce the animal’s subjective visual experience."
};
export default function Demo({slug}:{slug:string}) {
 const [step,setStep]=useState(0); const stepRef=useRef(0);
 return <Lesson slug={slug} predict={{question:lesson.question,options:lesson.options,answer:lesson.answer}} exploreHint="Inspect the scene, then show the comparison." minInteractions={2} reveal={()=><p>{lesson.explanation}</p>}>
 {({locked,interact})=><div><svg viewBox="0 0 340 190" className="stage-svg" role="img" aria-label={step===0 ? "Diagram hidden until exploration." : step===1 ? "A schematic scene; its evidence is hidden." : lesson.explanation}>
 {step===0 && <text x="170" y="90" textAnchor="middle" fill="var(--muted)" fontSize="15">Evidence hidden</text>}
 {step>=1 && <g><rect x="20" y="25" width="300" height="135" rx="12" fill="#273b48"/><circle cx="270" cy="92" r="24" fill="#e7a06c"/></g>}
 {step>=2 && <g><path d="M40 110 Q65 55 125 82 L155 90 L125 105 Q80 130 40 110Z" fill="#a9ba8d" stroke="var(--fg)" strokeWidth="3"/><circle cx="130" cy="92" r="4" fill="var(--fg)"/><path d="M245 70 Q215 60 190 75 M245 110 Q215 120 190 105" fill="none" stroke="#f2bd7a" strokeWidth="3"/><text x="210" y="150" textAnchor="middle" fill="#fff" fontSize="13">Warm target · schematic</text><path d="M65 115 Q15 135 40 145 Q75 155 105 130" fill="none" stroke="#8ea47d" strokeWidth="10"/><circle cx="143" cy="99" r="3" fill="#fff"/><text x="113" y="64" fill="#fff" fontSize="13">Pit</text></g>}
 </svg><Row><Control style={{minHeight:44}} disabled={locked||step!==0} onClick={()=>{if(stepRef.current!==0)return;stepRef.current=1;setStep(1);interact();}}>Inspect scene</Control><Control style={{minHeight:44}} disabled={locked||step!==1} onClick={()=>{if(stepRef.current!==1)return;stepRef.current=2;setStep(2);interact();}}>Show evidence</Control></Row></div>}
 </Lesson>;
}
