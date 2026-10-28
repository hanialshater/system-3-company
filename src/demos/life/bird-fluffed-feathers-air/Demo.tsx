"use client";
import { useRef, useState } from "react";
import { Lesson } from "@/kit/Lesson";
import { Control, Row } from "@/kit/controls";
const lesson={
  "question": "A bird fluffs its feathers in cool air. What can the expanded feather layer help hold?",
  "options": [
    "A supply of water inside each feather",
    "An insulating layer of air",
    "A layer of solid ice"
  ],
  "answer": 1,
  "explanation": "The fluffed feathers create a thicker layer that can trap air near the body. This schematic shows insulation, not an exact temperature or a guarantee that the bird cannot lose heat."
};
export default function Demo({slug}:{slug:string}) {
 const [step,setStep]=useState(0); const stepRef=useRef(0);
 return <Lesson slug={slug} predict={{question:lesson.question,options:lesson.options,answer:lesson.answer}} exploreHint="Inspect the scene, then show the comparison." minInteractions={2} reveal={()=><p>{lesson.explanation}</p>}>
 {({locked,interact})=><div><svg viewBox="0 0 340 190" className="stage-svg" role="img" aria-label={step===0 ? "Diagram hidden until exploration." : step===1 ? "A schematic scene; its evidence is hidden." : lesson.explanation}>
 {step===0 && <text x="170" y="90" textAnchor="middle" fill="var(--muted)" fontSize="15">Evidence hidden</text>}
 {step>=1 && <g><ellipse cx="170" cy="91" rx="48" ry="42" fill="#c7b49a" stroke="var(--fg)" strokeWidth="3"/><circle cx="158" cy="82" r="3" fill="var(--fg)"/></g>}
 {step>=2 && <g><path d="M105 90 L90 72 L110 66 L100 48 L124 48 L125 30 L146 39 L160 23 L175 38 L194 25 L202 44 L225 39 L229 60 L248 64 L237 83 L251 98 L231 109 L239 128 L216 129 L211 148 L191 140 L177 157 L161 143 L143 156 L129 139 L108 145 L107 123 L87 118 L99 101 Z" fill="none" stroke="var(--good)" strokeWidth="3"/><text x="170" y="176" textAnchor="middle" fill="var(--fg)" fontSize="13">Air in feather layer</text></g>}
 </svg><Row><Control style={{minHeight:44}} disabled={locked||step!==0} onClick={()=>{if(stepRef.current!==0)return;stepRef.current=1;setStep(1);interact();}}>Inspect scene</Control><Control style={{minHeight:44}} disabled={locked||step!==1} onClick={()=>{if(stepRef.current!==1)return;stepRef.current=2;setStep(2);interact();}}>Show evidence</Control></Row></div>}
 </Lesson>;
}
