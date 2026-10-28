"use client";
import { useRef, useState } from "react";
import { Lesson } from "@/kit/Lesson";
import { Control, Row } from "@/kit/controls";
const lesson={
  "question": "An insect lies deep inside a narrow wood tunnel. Which structure can extend into the tunnel after a woodpecker opens it?",
  "options": [
    "Its tongue",
    "Its tail feathers",
    "Its outer wing"
  ],
  "answer": 0,
  "explanation": "The schematic shows the tongue extending past the beak into the tunnel. Tongue length and surface features vary among woodpeckers; the diagram illustrates reach and is not a scale model."
};
export default function Demo({slug}:{slug:string}) {
 const [step,setStep]=useState(0); const stepRef=useRef(0);
 return <Lesson slug={slug} predict={{question:lesson.question,options:lesson.options,answer:lesson.answer}} exploreHint="Inspect the scene, then show the comparison." minInteractions={2} reveal={()=><p>{lesson.explanation}</p>}>
 {({locked,interact})=><div><svg viewBox="0 0 340 190" className="stage-svg" role="img" aria-label={step===0 ? "Diagram hidden until exploration." : step===1 ? "A schematic scene; its evidence is hidden." : lesson.explanation}>
 {step===0 && <text x="170" y="90" textAnchor="middle" fill="var(--muted)" fontSize="15">Evidence hidden</text>}
 {step>=1 && <g><rect x="215" y="25" width="90" height="135" rx="12" fill="#b78e69"/><path d="M215 87 H280" stroke="#51402e" strokeWidth="14"/><circle cx="278" cy="87" r="5" fill="#f7c65f"/></g>}
 {step>=2 && <g><path d="M35 55 Q75 34 110 70 L165 80 L110 96 Q75 120 35 100 Z" fill="#aec1c8" stroke="var(--fg)" strokeWidth="3"/><path d="M150 86 H273" stroke="#d97c81" strokeWidth="4"/><text x="126" y="145" fill="var(--fg)" fontSize="13">Tongue extends</text></g>}
 </svg><Row><Control style={{minHeight:44}} disabled={locked||step!==0} onClick={()=>{if(stepRef.current!==0)return;stepRef.current=1;setStep(1);interact();}}>Inspect scene</Control><Control style={{minHeight:44}} disabled={locked||step!==1} onClick={()=>{if(stepRef.current!==1)return;stepRef.current=2;setStep(2);interact();}}>Show evidence</Control></Row></div>}
 </Lesson>;
}
