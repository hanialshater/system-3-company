"use client";
import { useState } from "react";
import { Lesson } from "@/kit/Lesson";
import { Control, Row } from "@/kit/controls";
const lesson = {
  "question": "A bird has contour feathers on its body and soft down beneath them. Which typically has a more coherent, flattened vane?",
  "options": [
    "Contour feather",
    "Down feather",
    "Neither kind"
  ],
  "answer": 0,
  "hint": "Compare the two drawn structures.",
  "explanation": "In the drawing, the contour feather has a more coherent vane while the down feather has loose branches. Contour feathers help shape the outer plumage; the fluffy down layer helps trap insulating air. Real feathers vary.",
  "label": "Schematic feather structures, not scale drawings.",
  "shownLabel": "Schematic feather structures, not scale drawings. In the drawing, the contour feather has a more coherent vane while the down feather has loose branches. Contour feathers help shape the outer plumage; the fluffy down layer helps trap insulating air. Real feathers vary."
};
export default function Demo({slug}:{slug:string}) {
  const [step,setStep]=useState(0);
  return <Lesson slug={slug} predict={{question:lesson.question,options:lesson.options,answer:lesson.answer}} exploreHint={lesson.hint} minInteractions={2} reveal={()=><p>{lesson.explanation}</p>}>
    {({locked,interact})=><div><svg viewBox="0 0 340 190" className="stage-svg" role="img" aria-label={step === 0 ? "Diagram hidden until you explore." : step === 1 ? lesson.label : lesson.shownLabel}>
      {step === 0 && <text x="170" y="96" textAnchor="middle" fill="var(--muted)" fontSize="16">Evidence hidden</text>}
      {step >= 1 && <g><path d="M85 115 L155 25" stroke="var(--fg)" strokeWidth="3"/><path d="M92 105 Q62 84 140 22 Q168 15 153 47 Q131 85 92 105 Z" fill="#8dbbc6" stroke="var(--fg)" strokeWidth="2"/><path d="M89 113 L151 28" stroke="var(--fg)" strokeWidth="3"/><path d="M224 115 L224 55 M224 97 Q197 76 189 61 M224 96 Q247 74 259 57 M224 83 Q199 64 204 48 M224 80 Q241 56 240 41" stroke="var(--fg)" strokeWidth="3" fill="none" strokeLinecap="round"/><text x="116" y="150" textAnchor="middle" fill="var(--fg)" fontSize="14">Contour</text><text x="226" y="150" textAnchor="middle" fill="var(--fg)" fontSize="14">Down</text></g>}
      {step >= 2 && <g><path d="M91 99 Q118 87 145 49 M100 91 Q124 80 148 44 M109 82 Q131 73 150 39" stroke="#416a74" strokeWidth="2" fill="none"/><text x="115" y="174" textAnchor="middle" fill="var(--fg)" fontSize="12">Coherent vane</text><text x="226" y="174" textAnchor="middle" fill="var(--fg)" fontSize="12">Loose branches</text></g>}
    </svg><Row><Control disabled={locked || step !== 0} onClick={()=>{setStep(1);interact();}}>Inspect the subject</Control><Control disabled={locked || step !== 1} onClick={()=>{setStep(2);interact();}}>Trace the evidence</Control></Row></div>}
  </Lesson>;
}
