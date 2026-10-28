"use client";
import { useState } from "react";
import { Lesson } from "@/kit/Lesson";
import { Control, Row } from "@/kit/controls";
const lesson = {
  "question": "Which part of a frog can contribute to gas exchange when kept moist?",
  "options": [
    "Its skin",
    "Its toe nails only",
    "Its shadow"
  ],
  "answer": 0,
  "explanation": "The arrows show oxygen crossing a simplified moist skin surface toward a blood vessel. Skin can contribute to gas exchange in many amphibians; the drawing does not imply all amphibians breathe only through skin.",
  "label": "This cross-section is schematic, and its oxygen arrows do not represent flow rate or all respiratory organs.",
  "shownLabel": "This cross-section is schematic, and its oxygen arrows do not represent flow rate or all respiratory organs. The arrows show oxygen crossing a simplified moist skin surface toward a blood vessel. Skin can contribute to gas exchange in many amphibians; the drawing does not imply all amphibians breathe only through skin."
};
export default function Demo({slug}:{slug:string}) {
  const [step,setStep]=useState(0);
  return <Lesson slug={slug} predict={{question:lesson.question,options:lesson.options,answer:lesson.answer}} exploreHint="Inspect the subject, then trace the evidence." minInteractions={2} reveal={()=><p>{lesson.explanation}</p>}>
    {({locked,interact})=><div><svg viewBox="0 0 340 190" className="stage-svg" role="img" aria-label={step === 0 ? "Evidence hidden until you explore." : step === 1 ? lesson.label : lesson.shownLabel}>
      {step === 0 && <text x="170" y="96" textAnchor="middle" fill="var(--muted)" fontSize="16">Evidence hidden</text>}
      {step >= 1 && <g><path d="M38 67 H302 V98 H38 Z" fill="#a4c7a2" stroke="var(--fg)" strokeWidth="2"/><path d="M50 139 Q170 102 290 139" fill="none" stroke="#bf7d79" strokeWidth="8"/><text x="170" y="50" textAnchor="middle" fill="var(--fg)" fontSize="13">Moist skin</text><text x="170" y="171" textAnchor="middle" fill="var(--fg)" fontSize="13">Blood vessel</text></g>}
      {step >= 2 && <g><path d="M95 27 V123 M86 113 L95 123 L104 113 M245 27 V123 M236 113 L245 123 L254 113" stroke="var(--fg)" strokeWidth="3" fill="none"/><text x="116" y="116" fill="var(--fg)" fontSize="13">O₂</text><text x="264" y="116" fill="var(--fg)" fontSize="13">O₂</text></g>}
    </svg><Row><Control disabled={locked || step !== 0} onClick={()=>{setStep(1);interact();}}>Inspect the subject</Control><Control disabled={locked || step !== 1} onClick={()=>{setStep(2);interact();}}>Trace the evidence</Control></Row></div>}
  </Lesson>;
}
