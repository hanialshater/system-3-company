"use client";
import { useRef, useState } from "react";
import { Lesson } from "@/kit/Lesson";
import { Control, Row } from "@/kit/controls";
const lesson={
  "question": "A dabbling duck takes in water with small food particles. What do bill-edge structures help it do?",
  "options": [
    "Produce the food particles",
    "Retain food as water leaves",
    "Keep every drop of water"
  ],
  "answer": 1,
  "explanation": "The comb-like bill edges are shown retaining particles while water exits. This is a simplified feeding step; ducks differ in diet and bill structure, and the drawing is not an anatomical cross-section."
};
export default function Demo({slug}:{slug:string}) {
 const [step,setStep]=useState(0); const stepRef=useRef(0);
 return <Lesson slug={slug} predict={{question:lesson.question,options:lesson.options,answer:lesson.answer}} exploreHint="Inspect the scene, then show the comparison." minInteractions={2} reveal={()=><p>{lesson.explanation}</p>}>
 {({locked,interact})=><div><svg viewBox="0 0 340 190" className="stage-svg" role="img" aria-label={step===0 ? "Diagram hidden until exploration." : step===1 ? "A schematic scene; its evidence is hidden." : lesson.explanation}>
 {step===0 && <text x="170" y="90" textAnchor="middle" fill="var(--muted)" fontSize="15">Evidence hidden</text>}
 {step>=1 && <g><path d="M55 68 Q155 40 275 82 Q155 130 55 105 Z" fill="#e8bf69" stroke="var(--fg)" strokeWidth="3"/></g>}
 {step>=2 && <g><path d="M140 68 V111 M155 70 V109 M170 73 V106 M185 76 V103 M200 79 V100" stroke="var(--fg)" strokeWidth="3"/><circle cx="130" cy="90" r="5" fill="#b47c41"/><path d="M210 92 H280 M271 83 L280 92 L271 101" fill="none" stroke="#76b5d5" strokeWidth="3"/><text x="167" y="152" textAnchor="middle" fill="var(--fg)" fontSize="14">Particles held · water out</text></g>}
 </svg><Row><Control style={{minHeight:44}} disabled={locked||step!==0} onClick={()=>{if(stepRef.current!==0)return;stepRef.current=1;setStep(1);interact();}}>Inspect scene</Control><Control style={{minHeight:44}} disabled={locked||step!==1} onClick={()=>{if(stepRef.current!==1)return;stepRef.current=2;setStep(2);interact();}}>Show evidence</Control></Row></div>}
 </Lesson>;
}
