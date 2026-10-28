"use client";
import { useState } from "react";
import { Lesson } from "@/kit/Lesson";
import { Control, Row } from "@/kit/controls";
const lesson = {
  "question": "An animal delivers a toxin through a bite. Which term describes that delivery?",
  "options": [
    "Venom",
    "Poison",
    "Photosynthesis"
  ],
  "answer": 0,
  "explanation": "The first arrow depicts a toxin delivered into another animal by a bite. Venom is delivered by an animal; poison is harmful when taken in or contacted by another route. The diagrams classify delivery, not a substance’s danger.",
  "label": "The two generic icons illustrate delivery routes, not specific species, doses or safety advice.",
  "shownLabel": "The two generic icons illustrate delivery routes, not specific species, doses or safety advice. The first arrow depicts a toxin delivered into another animal by a bite. Venom is delivered by an animal; poison is harmful when taken in or contacted by another route. The diagrams classify delivery, not a substance’s danger."
};
export default function Demo({slug}:{slug:string}) {
  const [step,setStep]=useState(0);
  return <Lesson slug={slug} predict={{question:lesson.question,options:lesson.options,answer:lesson.answer}} exploreHint="Inspect the subject, then trace the evidence." minInteractions={2} reveal={()=><p>{lesson.explanation}</p>}>
    {({locked,interact})=><div><svg viewBox="0 0 340 190" className="stage-svg" role="img" aria-label={step === 0 ? "Evidence hidden until you explore." : step === 1 ? lesson.label : lesson.shownLabel}>
      {step === 0 && <text x="170" y="96" textAnchor="middle" fill="var(--muted)" fontSize="16">Evidence hidden</text>}
      {step >= 1 && <g><circle cx="75" cy="80" r="27" fill="#a7bc91" stroke="var(--fg)" strokeWidth="2"/><circle cx="260" cy="80" r="27" fill="#c3a9a6" stroke="var(--fg)" strokeWidth="2"/><path d="M75 116 V147 M260 116 V147" stroke="var(--line)" strokeWidth="3"/><text x="75" y="171" textAnchor="middle" fill="var(--fg)" fontSize="13">Bite</text><text x="260" y="171" textAnchor="middle" fill="var(--fg)" fontSize="13">Eaten</text></g>}
      {step >= 2 && <g><path d="M106 80 H154 M145 72 L154 80 L145 88 M226 80 H180 M188 72 L180 80 L188 88" fill="none" stroke="var(--fg)" strokeWidth="3"/><text x="75" y="45" textAnchor="middle" fill="var(--fg)" fontSize="13">Delivered</text><text x="260" y="45" textAnchor="middle" fill="var(--fg)" fontSize="13">Taken in</text></g>}
    </svg><Row><Control disabled={locked || step !== 0} onClick={()=>{setStep(1);interact();}}>Inspect the subject</Control><Control disabled={locked || step !== 1} onClick={()=>{setStep(2);interact();}}>Trace the evidence</Control></Row></div>}
  </Lesson>;
}
