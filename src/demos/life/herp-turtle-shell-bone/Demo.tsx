"use client";
import { useRef, useState } from "react";
import { Lesson } from "@/kit/Lesson";
import { Control, Row } from "@/kit/controls";
const lesson={
  "question": "Why can a turtle not leave its shell as a hermit crab leaves a borrowed shell?",
  "options": [
    "Both shells are borrowed",
    "The turtle is glued into an empty shell",
    "The turtle shell includes its own skeleton"
  ],
  "answer": 2,
  "explanation": "The turtle outline connects its shell to its own ribs and spine, while the separate spiral represents a borrowed hermit crab shell. These are simplified diagrams, not complete anatomical reconstructions."
};
export default function Demo({slug}:{slug:string}) {
 const [step,setStep]=useState(0); const stepRef=useRef(0);
 return <Lesson slug={slug} predict={{question:lesson.question,options:lesson.options,answer:lesson.answer}} exploreHint="Inspect the scene, then show the comparison." minInteractions={2} reveal={()=><p>{lesson.explanation}</p>}>
 {({locked,interact})=><div><svg viewBox="0 0 340 190" className="stage-svg" role="img" aria-label={step===0 ? "Diagram hidden until exploration." : step===1 ? "A schematic scene; its evidence is hidden." : lesson.explanation}>
 {step===0 && <text x="170" y="90" textAnchor="middle" fill="var(--muted)" fontSize="15">Evidence hidden</text>}
 {step>=1 && <g><text x="80" y="30" textAnchor="middle" fill="var(--fg)" fontSize="13">Turtle</text><text x="260" y="30" textAnchor="middle" fill="var(--fg)" fontSize="13">Hermit crab</text></g>}
 {step>=2 && <g><path d="M20 95 Q45 35 115 65 Q140 85 135 105 H20Z" fill="#94ad84" stroke="var(--fg)" strokeWidth="3"/><path d="M35 105 V125 M115 105 V125 M130 84 L155 88" stroke="var(--fg)" strokeWidth="5"/><path d="M40 88 Q75 60 115 88 M75 65 V104" fill="none" stroke="var(--warn)" strokeWidth="3"/><path d="M215 85 C215 40 290 42 295 85 C300 120 245 128 245 92 C245 73 275 72 275 90" fill="none" stroke="var(--fg)" strokeWidth="6"/><text x="80" y="158" textAnchor="middle" fill="var(--fg)" fontSize="12">Connected bones</text><text x="260" y="158" textAnchor="middle" fill="var(--fg)" fontSize="12">Borrowed shell</text><ellipse cx="148" cy="88" rx="11" ry="7" fill="#94ad84" stroke="var(--fg)" strokeWidth="2"/><circle cx="151" cy="85" r="2" fill="var(--fg)"/></g>}
 </svg><Row><Control style={{minHeight:44}} disabled={locked||step!==0} onClick={()=>{if(stepRef.current!==0)return;stepRef.current=1;setStep(1);interact();}}>Inspect scene</Control><Control style={{minHeight:44}} disabled={locked||step!==1} onClick={()=>{if(stepRef.current!==1)return;stepRef.current=2;setStep(2);interact();}}>Show evidence</Control></Row></div>}
 </Lesson>;
}
