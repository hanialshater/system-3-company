"use client";
import { useState } from "react";
import { Lesson } from "@/kit/Lesson";
import { Control, Row } from "@/kit/controls";
const lesson = {
  "question": "Which pair shares a more recent common ancestor: crocodilians, birds or lizards?",
  "options": [
    "Crocodilians and birds",
    "Lizards and birds",
    "Lizards and crocodilians"
  ],
  "answer": 0,
  "explanation": "The highlighted branching point joins crocodilians with birds before their branch meets the lizard branch. This simplified tree shows relative common ancestry, not a claim that a living crocodilian is the direct ancestor of birds.",
  "label": "The phylogeny is a simplified cladogram, not a dated tree or depiction of every living lineage.",
  "shownLabel": "The phylogeny is a simplified cladogram, not a dated tree or depiction of every living lineage. The highlighted branching point joins crocodilians with birds before their branch meets the lizard branch. This simplified tree shows relative common ancestry, not a claim that a living crocodilian is the direct ancestor of birds."
};
export default function Demo({slug}:{slug:string}) {
  const [step,setStep]=useState(0);
  return <Lesson slug={slug} predict={{question:lesson.question,options:lesson.options,answer:lesson.answer}} exploreHint="Inspect the subject, then trace the evidence." minInteractions={2} reveal={()=><p>{lesson.explanation}</p>}>
    {({locked,interact})=><div><svg viewBox="0 0 340 190" className="stage-svg" role="img" aria-label={step === 0 ? "Evidence hidden until you explore." : step === 1 ? lesson.label : lesson.shownLabel}>
      {step === 0 && <text x="170" y="96" textAnchor="middle" fill="var(--muted)" fontSize="16">Evidence hidden</text>}
      {step >= 1 && <g><text x="225" y="48" fill="var(--fg)" fontSize="14">Lizards</text><text x="225" y="102" fill="var(--fg)" fontSize="14">Crocodilians</text><text x="225" y="156" fill="var(--fg)" fontSize="14">Birds</text></g>}
      {step >= 2 && <g><path d="M24 100 H80 M80 44 V150 M80 44 H210 M80 150 H135 M135 98 V150 M135 98 H210 M135 150 H210" fill="none" stroke="var(--fg)" strokeWidth="3"/><circle cx="135" cy="150" r="7" fill="#e0ad64"/><text x="90" y="180" fill="var(--fg)" fontSize="12">Shared branch</text></g>}
    </svg><Row><Control disabled={locked || step !== 0} onClick={()=>{setStep(1);interact();}}>Inspect the subject</Control><Control disabled={locked || step !== 1} onClick={()=>{setStep(2);interact();}}>Trace the evidence</Control></Row></div>}
  </Lesson>;
}
