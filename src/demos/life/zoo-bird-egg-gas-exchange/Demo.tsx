"use client";
import { useState } from "react";
import { Lesson } from "@/kit/Lesson";
import { Control, Row } from "@/kit/controls";
const lesson = {
  "question": "A developing bird embryo is enclosed by an intact eggshell. How can oxygen reach it?",
  "options": [
    "Through tiny pores in the shell",
    "Through an open crack",
    "The embryo needs no oxygen"
  ],
  "answer": 0,
  "hint": "Show the simplified gas paths.",
  "explanation": "The arrows show oxygen moving inward through pores and carbon dioxide moving outward. The shell protects the developing embryo but allows gas exchange; the diagram exaggerates pore sizes and simplifies the membranes inside.",
  "label": "Egg and pore diagram: pores exaggerated, membranes simplified.",
  "shownLabel": "Egg and pore diagram: pores exaggerated, membranes simplified. The arrows show oxygen moving inward through pores and carbon dioxide moving outward. The shell protects the developing embryo but allows gas exchange; the diagram exaggerates pore sizes and simplifies the membranes inside."
};
export default function Demo({slug}:{slug:string}) {
  const [step,setStep]=useState(0);
  return <Lesson slug={slug} predict={{question:lesson.question,options:lesson.options,answer:lesson.answer}} exploreHint={lesson.hint} minInteractions={2} reveal={()=><p>{lesson.explanation}</p>}>
    {({locked,interact})=><div><svg viewBox="0 0 340 190" className="stage-svg" role="img" aria-label={step === 0 ? "Diagram hidden until you explore." : step === 1 ? lesson.label : lesson.shownLabel}>
      {step === 0 && <text x="170" y="96" textAnchor="middle" fill="var(--muted)" fontSize="16">Evidence hidden</text>}
      {step >= 1 && <g><path d="M171 26 C119 26 99 95 112 132 C120 157 143 165 170 165 C197 165 220 157 228 132 C241 95 222 26 171 26 Z" fill="#f0e4c9" stroke="var(--fg)" strokeWidth="4"/><ellipse cx="170" cy="108" rx="34" ry="26" fill="#dfbd82" stroke="var(--fg)" strokeWidth="2"/><text x="170" y="112" textAnchor="middle" fill="var(--fg)" fontSize="13">Embryo</text></g>}
      {step >= 2 && <g><circle cx="111" cy="96" r="4" fill="var(--fg)"/><circle cx="229" cy="96" r="4" fill="var(--fg)"/><path d="M40 96 H101 M90 86 L101 96 L90 106 M235 96 H300 M289 86 L300 96 L289 106" fill="none" stroke="var(--fg)" strokeWidth="3"/><text x="39" y="80" fill="var(--fg)" fontSize="13">O₂ in</text><text x="241" y="80" fill="var(--fg)" fontSize="13">CO₂ out</text></g>}
    </svg><Row><Control disabled={locked || step !== 0} onClick={()=>{setStep(1);interact();}}>Inspect the subject</Control><Control disabled={locked || step !== 1} onClick={()=>{setStep(2);interact();}}>Trace the evidence</Control></Row></div>}
  </Lesson>;
}
