"use client";
import { useState } from "react";
import { Lesson } from "@/kit/Lesson";
import { Control, Row } from "@/kit/controls";
const lesson = {
  "question": "When a lizard extends its dewlap during a display, which structure comes into view?",
  "options": [
    "A flap under its throat",
    "A detached tail",
    "A pair of gills"
  ],
  "answer": 0,
  "explanation": "The highlighted flap in this schematic is a dewlap, a throat structure that some lizards extend during displays. A visible display can have different functions; a single image does not establish an animal’s intention.",
  "label": "A generic lizard display; no particular species, sex, purpose or behavioral outcome is established.",
  "shownLabel": "A generic lizard display; no particular species, sex, purpose or behavioral outcome is established. The highlighted flap in this schematic is a dewlap, a throat structure that some lizards extend during displays. A visible display can have different functions; a single image does not establish an animal’s intention."
};
export default function Demo({slug}:{slug:string}) {
  const [step,setStep]=useState(0);
  return <Lesson slug={slug} predict={{question:lesson.question,options:lesson.options,answer:lesson.answer}} exploreHint="Inspect the subject, then trace the evidence." minInteractions={2} reveal={()=><p>{lesson.explanation}</p>}>
    {({locked,interact})=><div><svg viewBox="0 0 340 190" className="stage-svg" role="img" aria-label={step === 0 ? "Evidence hidden until you explore." : step === 1 ? lesson.label : lesson.shownLabel}>
      {step === 0 && <text x="170" y="96" textAnchor="middle" fill="var(--muted)" fontSize="16">Evidence hidden</text>}
      {step >= 1 && <g><ellipse cx="175" cy="95" rx="90" ry="28" fill="#a4bc91" stroke="var(--fg)" strokeWidth="2"/><circle cx="81" cy="85" r="20" fill="#a4bc91" stroke="var(--fg)" strokeWidth="2"/><circle cx="76" cy="80" r="3" fill="var(--fg)"/><path d="M256 96 Q285 85 306 110 M125 116 L109 132 M213 116 L228 132" fill="none" stroke="var(--fg)" strokeWidth="5"/></g>}
      {step >= 2 && <g><path d="M72 101 Q93 147 119 105 Z" fill="#e19a73" stroke="var(--fg)" strokeWidth="2"/><text x="97" y="165" textAnchor="middle" fill="var(--fg)" fontSize="13">Dewlap</text></g>}
    </svg><Row><Control disabled={locked || step !== 0} onClick={()=>{setStep(1);interact();}}>Inspect the subject</Control><Control disabled={locked || step !== 1} onClick={()=>{setStep(2);interact();}}>Trace the evidence</Control></Row></div>}
  </Lesson>;
}
