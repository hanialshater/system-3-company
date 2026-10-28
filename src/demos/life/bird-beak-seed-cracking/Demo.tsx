"use client";
import { useRef, useState } from "react";
import { Lesson } from "@/kit/Lesson";
import { Control, Row } from "@/kit/controls";
const lesson={
  "question": "In the diagram, which beak is positioned to crack a hard seed?",
  "options": [
    "Both have the same shown contact",
    "The short, deep beak",
    "The long, narrow probe"
  ],
  "answer": 1,
  "explanation": "The short deep beak meets the seed between its upper and lower parts. The long narrow beak is shown probing a crevice. These are simplified examples, not a claim that beak shape alone determines every bird’s diet."
};
export default function Demo({slug}:{slug:string}) {
 const [step,setStep]=useState(0); const stepRef=useRef(0);
 return <Lesson slug={slug} predict={{question:lesson.question,options:lesson.options,answer:lesson.answer}} exploreHint="Inspect the scene, then show the comparison." minInteractions={2} reveal={()=><p>{lesson.explanation}</p>}>
 {({locked,interact})=><div><svg viewBox="0 0 340 190" className="stage-svg" role="img" aria-label={step===0 ? "Diagram hidden until exploration." : step===1 ? "A schematic scene; its evidence is hidden." : lesson.explanation}>
 {step===0 && <text x="170" y="90" textAnchor="middle" fill="var(--muted)" fontSize="15">Evidence hidden</text>}
 {step>=1 && <g><text x="85" y="28" textAnchor="middle" fill="var(--fg)" fontSize="14">A</text><text x="255" y="28" textAnchor="middle" fill="var(--fg)" fontSize="14">B</text></g>}
 {step>=2 && <g><path d="M30 65 L100 82 L30 105 Z" fill="#e8c377" stroke="var(--fg)" strokeWidth="3"/><circle cx="92" cy="83" r="8" fill="#b99367" stroke="var(--fg)" strokeWidth="2"/><path d="M200 76 L292 85 L200 94 Z" fill="#e8c377" stroke="var(--fg)" strokeWidth="3"/><path d="M285 52 V126 M301 52 V126" stroke="var(--muted)" strokeWidth="4"/><text x="83" y="150" textAnchor="middle" fill="var(--fg)" fontSize="14">Seed contact</text><text x="255" y="150" textAnchor="middle" fill="var(--fg)" fontSize="14">Crevice probe</text></g>}
 </svg><Row><Control style={{minHeight:44}} disabled={locked||step!==0} onClick={()=>{if(stepRef.current!==0)return;stepRef.current=1;setStep(1);interact();}}>Inspect scene</Control><Control style={{minHeight:44}} disabled={locked||step!==1} onClick={()=>{if(stepRef.current!==1)return;stepRef.current=2;setStep(2);interact();}}>Show evidence</Control></Row></div>}
 </Lesson>;
}
