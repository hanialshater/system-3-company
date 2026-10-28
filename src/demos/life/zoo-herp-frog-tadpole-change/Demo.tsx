"use client";
import { useState } from "react";
import { Lesson } from "@/kit/Lesson";
import { Control, Row } from "@/kit/controls";
const lesson = {
  "question": "In a familiar frog life cycle, what changes as a tadpole develops toward a typical adult frog?",
  "options": [
    "Legs develop and the tail is reduced",
    "The tadpole becomes a flowering plant",
    "The tail becomes a second head"
  ],
  "answer": 0,
  "explanation": "The schematic compares a tadpole with a later frog form: legs appear and the tail becomes reduced. This is a simplified example; amphibian development varies across species, and not every species has a free-swimming tadpole.",
  "label": "The diagram omits intermediate stages and is not a life history of all amphibian species.",
  "shownLabel": "The diagram omits intermediate stages and is not a life history of all amphibian species. The schematic compares a tadpole with a later frog form: legs appear and the tail becomes reduced. This is a simplified example; amphibian development varies across species, and not every species has a free-swimming tadpole."
};
export default function Demo({slug}:{slug:string}) {
  const [step,setStep]=useState(0);
  return <Lesson slug={slug} predict={{question:lesson.question,options:lesson.options,answer:lesson.answer}} exploreHint="Inspect the subject, then trace the evidence." minInteractions={2} reveal={()=><p>{lesson.explanation}</p>}>
    {({locked,interact})=><div><svg viewBox="0 0 340 190" className="stage-svg" role="img" aria-label={step === 0 ? "Evidence hidden until you explore." : step === 1 ? lesson.label : lesson.shownLabel}>
      {step === 0 && <text x="170" y="96" textAnchor="middle" fill="var(--muted)" fontSize="16">Evidence hidden</text>}
      {step >= 1 && <g><ellipse cx="80" cy="90" rx="30" ry="20" fill="#90b68e" stroke="var(--fg)" strokeWidth="2"/><path d="M107 91 Q134 75 147 101 Q127 95 107 106" fill="#90b68e" stroke="var(--fg)" strokeWidth="2"/><ellipse cx="252" cy="95" rx="32" ry="22" fill="#90b68e" stroke="var(--fg)" strokeWidth="2"/><text x="82" y="158" textAnchor="middle" fill="var(--fg)" fontSize="13">Tadpole</text><text x="252" y="158" textAnchor="middle" fill="var(--fg)" fontSize="13">Later form</text></g>}
      {step >= 2 && <g><path d="M234 108 L219 129 L205 132 M268 108 L281 129 L296 132 M236 88 L225 76 M267 88 L278 76" fill="none" stroke="var(--fg)" strokeWidth="4"/><path d="M155 90 H203 M194 81 L203 90 L194 99" fill="none" stroke="var(--fg)" strokeWidth="3"/><text x="252" y="45" textAnchor="middle" fill="var(--fg)" fontSize="13">Legs; reduced tail</text></g>}
    </svg><Row><Control disabled={locked || step !== 0} onClick={()=>{setStep(1);interact();}}>Inspect the subject</Control><Control disabled={locked || step !== 1} onClick={()=>{setStep(2);interact();}}>Trace the evidence</Control></Row></div>}
  </Lesson>;
}
