"use client";
import { useState } from "react";
import { Lesson } from "@/kit/Lesson";
import { Control, Row } from "@/kit/controls";
const lesson = {
  "question": "A turtle’s shell is part of its skeleton. Which bones are integrated with the upper shell?",
  "options": [
    "Ribs and vertebrae",
    "Detached teeth",
    "The tongue"
  ],
  "answer": 0,
  "explanation": "The exposed lines in this schematic represent ribs integrated with the shell. A turtle shell is connected to the skeleton; it is not a detachable shelter. The figure omits many bones and is not a scale dissection.",
  "label": "The shell is cut away schematically; the number and arrangement of individual bones are simplified.",
  "shownLabel": "The shell is cut away schematically; the number and arrangement of individual bones are simplified. The exposed lines in this schematic represent ribs integrated with the shell. A turtle shell is connected to the skeleton; it is not a detachable shelter. The figure omits many bones and is not a scale dissection."
};
export default function Demo({slug}:{slug:string}) {
  const [step,setStep]=useState(0);
  return <Lesson slug={slug} predict={{question:lesson.question,options:lesson.options,answer:lesson.answer}} exploreHint="Inspect the subject, then trace the evidence." minInteractions={2} reveal={()=><p>{lesson.explanation}</p>}>
    {({locked,interact})=><div><svg viewBox="0 0 340 190" className="stage-svg" role="img" aria-label={step === 0 ? "Evidence hidden until you explore." : step === 1 ? lesson.label : lesson.shownLabel}>
      {step === 0 && <text x="170" y="96" textAnchor="middle" fill="var(--muted)" fontSize="16">Evidence hidden</text>}
      {step >= 1 && <g><path d="M68 110 Q170 8 272 110 L258 141 H82 Z" fill="#94b4a5" stroke="var(--fg)" strokeWidth="3"/><path d="M82 141 H258" stroke="var(--fg)" strokeWidth="3"/><text x="170" y="170" textAnchor="middle" fill="var(--fg)" fontSize="13">Upper shell</text></g>}
      {step >= 2 && <g><path d="M170 44 V139 M170 64 Q129 69 101 121 M170 64 Q211 69 239 121 M170 82 Q135 89 117 132 M170 82 Q205 89 223 132" fill="none" stroke="#f3dfaa" strokeWidth="5"/><text x="170" y="30" textAnchor="middle" fill="var(--fg)" fontSize="13">Schematic spine and ribs</text></g>}
    </svg><Row><Control disabled={locked || step !== 0} onClick={()=>{setStep(1);interact();}}>Inspect the subject</Control><Control disabled={locked || step !== 1} onClick={()=>{setStep(2);interact();}}>Trace the evidence</Control></Row></div>}
  </Lesson>;
}
