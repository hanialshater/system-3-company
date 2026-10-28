"use client";
import { useState } from "react";
import { Lesson } from "@/kit/Lesson";
import { Control, Row } from "@/kit/controls";
const lesson = {
  "question": "A salamander loses a limb. What later outcome is possible in some salamanders?",
  "options": [
    "A limb can regrow",
    "It becomes a mammal",
    "It switches to a new species"
  ],
  "answer": 0,
  "explanation": "The two silhouettes represent a limb before and after a regrowth interval. Many salamanders can regenerate limbs, but this schematic does not show the cellular steps, the time required, or the outcome for every injured individual.",
  "label": "A before-and-after diagram, not a time-lapse of cellular mechanisms or a guarantee of full recovery.",
  "shownLabel": "A before-and-after diagram, not a time-lapse of cellular mechanisms or a guarantee of full recovery. The two silhouettes represent a limb before and after a regrowth interval. Many salamanders can regenerate limbs, but this schematic does not show the cellular steps, the time required, or the outcome for every injured individual."
};
export default function Demo({slug}:{slug:string}) {
  const [step,setStep]=useState(0);
  return <Lesson slug={slug} predict={{question:lesson.question,options:lesson.options,answer:lesson.answer}} exploreHint="Inspect the subject, then trace the evidence." minInteractions={2} reveal={()=><p>{lesson.explanation}</p>}>
    {({locked,interact})=><div><svg viewBox="0 0 340 190" className="stage-svg" role="img" aria-label={step === 0 ? "Evidence hidden until you explore." : step === 1 ? lesson.label : lesson.shownLabel}>
      {step === 0 && <text x="170" y="96" textAnchor="middle" fill="var(--muted)" fontSize="16">Evidence hidden</text>}
      {step >= 1 && <g><ellipse cx="86" cy="95" rx="48" ry="21" fill="#a5b79b" stroke="var(--fg)" strokeWidth="2"/><path d="M127 96 Q145 84 155 110 M66 110 L58 123" fill="none" stroke="var(--fg)" strokeWidth="4"/><ellipse cx="242" cy="95" rx="48" ry="21" fill="#a5b79b" stroke="var(--fg)" strokeWidth="2"/><path d="M283 96 Q301 84 311 110 M222 110 L214 123" fill="none" stroke="var(--fg)" strokeWidth="4"/><text x="86" y="160" textAnchor="middle" fill="var(--fg)" fontSize="13">Earlier</text><text x="242" y="160" textAnchor="middle" fill="var(--fg)" fontSize="13">Later</text></g>}
      {step >= 2 && <g><path d="M258 111 L269 128 L279 129" fill="none" stroke="#de9f63" strokeWidth="6"/><path d="M156 93 H195 M186 84 L195 93 L186 102" fill="none" stroke="var(--fg)" strokeWidth="3"/><text x="245" y="54" textAnchor="middle" fill="var(--fg)" fontSize="13">Regrown limb</text></g>}
    </svg><Row><Control disabled={locked || step !== 0} onClick={()=>{setStep(1);interact();}}>Inspect the subject</Control><Control disabled={locked || step !== 1} onClick={()=>{setStep(2);interact();}}>Trace the evidence</Control></Row></div>}
  </Lesson>;
}
