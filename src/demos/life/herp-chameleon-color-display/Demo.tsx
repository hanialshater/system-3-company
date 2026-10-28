"use client";
import { useRef, useState } from "react";
import { Lesson } from "@/kit/Lesson";
import { Control, Row } from "@/kit/controls";
const lesson={
  "question": "Two chameleons face one another. A color change in a display can serve which role?",
  "options": [
    "Communication",
    "A guarantee of matching any background",
    "A replacement for the skeleton"
  ],
  "answer": 0,
  "explanation": "The schematic shows two differently colored animals facing one another. In some chameleons color change participates in communication, and temperature and other conditions can also matter; these colors are illustrative."
};
export default function Demo({slug}:{slug:string}) {
 const [step,setStep]=useState(0); const stepRef=useRef(0);
 return <Lesson slug={slug} predict={{question:lesson.question,options:lesson.options,answer:lesson.answer}} exploreHint="Inspect the scene, then show the comparison." minInteractions={2} reveal={()=><p>{lesson.explanation}</p>}>
 {({locked,interact})=><div><svg viewBox="0 0 340 190" className="stage-svg" role="img" aria-label={step===0 ? "Diagram hidden until exploration." : step===1 ? "A schematic scene; its evidence is hidden." : lesson.explanation}>
 {step===0 && <text x="170" y="90" textAnchor="middle" fill="var(--muted)" fontSize="15">Evidence hidden</text>}
 {step>=1 && <g><path d="M45 145 H300" stroke="var(--muted)" strokeWidth="4"/></g>}
 {step>=2 && <g><path d="M45 90 Q60 50 105 65 L125 80 L105 105 Q75 115 55 105 Q25 115 35 128" fill="#76a982" stroke="var(--fg)" strokeWidth="3"/><path d="M295 90 Q280 50 235 65 L215 80 L235 105 Q265 115 285 105 Q315 115 305 128" fill="#d8ad6d" stroke="var(--fg)" strokeWidth="3"/><circle cx="108" cy="78" r="4" fill="var(--fg)"/><circle cx="232" cy="78" r="4" fill="var(--fg)"/><text x="170" y="165" textAnchor="middle" fill="var(--fg)" fontSize="13">Illustrative display</text><path d="M65 104 L55 140 M90 107 L100 140 M275 104 L285 140 M250 107 L240 140" stroke="var(--fg)" strokeWidth="4"/><path d="M35 128 Q20 142 30 152 Q40 160 49 148 M305 128 Q320 142 310 152 Q300 160 291 148" stroke="var(--fg)" strokeWidth="4" fill="none"/></g>}
 </svg><Row><Control style={{minHeight:44}} disabled={locked||step!==0} onClick={()=>{if(stepRef.current!==0)return;stepRef.current=1;setStep(1);interact();}}>Inspect scene</Control><Control style={{minHeight:44}} disabled={locked||step!==1} onClick={()=>{if(stepRef.current!==1)return;stepRef.current=2;setStep(2);interact();}}>Show evidence</Control></Row></div>}
 </Lesson>;
}
