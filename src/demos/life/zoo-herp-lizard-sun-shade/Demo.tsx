"use client";
import { useState } from "react";
import { Lesson } from "@/kit/Lesson";
import { Control, Row } from "@/kit/controls";
const lesson = {
  "question": "In a simple scene the sunny rock is warmer than the shaded rock. Which move exposes a lizard on the sunny rock to the cooler place?",
  "options": [
    "Move into shade",
    "Stay on the sunny rock",
    "Move closer to the sun"
  ],
  "answer": 0,
  "explanation": "The arrow moves the modeled lizard from the sunny rock to the shaded rock, stipulated here to be cooler. Some ectothermic reptiles use behavior to influence body temperature; real temperatures depend on time, weather and the animal.",
  "label": "The rock temperatures are stipulated qualitative model conditions, not measurements or universal rules.",
  "shownLabel": "The rock temperatures are stipulated qualitative model conditions, not measurements or universal rules. The arrow moves the modeled lizard from the sunny rock to the shaded rock, stipulated here to be cooler. Some ectothermic reptiles use behavior to influence body temperature; real temperatures depend on time, weather and the animal."
};
export default function Demo({slug}:{slug:string}) {
  const [step,setStep]=useState(0);
  return <Lesson slug={slug} predict={{question:lesson.question,options:lesson.options,answer:lesson.answer}} exploreHint="Inspect the subject, then trace the evidence." minInteractions={2} reveal={()=><p>{lesson.explanation}</p>}>
    {({locked,interact})=><div><svg viewBox="0 0 340 190" className="stage-svg" role="img" aria-label={step === 0 ? "Evidence hidden until you explore." : step === 1 ? lesson.label : lesson.shownLabel}>
      {step === 0 && <text x="170" y="96" textAnchor="middle" fill="var(--muted)" fontSize="16">Evidence hidden</text>}
      {step >= 1 && <g><circle cx="65" cy="42" r="20" fill="#e6c369"/><path d="M26 132 Q72 96 134 132 Z" fill="#d1b69a" stroke="var(--fg)" strokeWidth="2"/><path d="M201 132 Q252 96 311 132 Z" fill="#a6adb0" stroke="var(--fg)" strokeWidth="2"/><path d="M204 64 H310 V81 H204 Z" fill="#829496"/><text x="77" y="161" textAnchor="middle" fill="var(--fg)" fontSize="13">Sun</text><text x="254" y="161" textAnchor="middle" fill="var(--fg)" fontSize="13">Shade</text></g>}
      {step >= 2 && <g><g fill="#759d72" stroke="var(--fg)" strokeWidth="2" strokeLinecap="round"><g transform="translate(83 114)"><ellipse rx="13" ry="6"/><circle cx="-14" cy="-1" r="4"/><path d="M-8 -4 L-13 -9 M-8 4 L-13 9 M8 -4 L13 -9 M8 4 L13 9 M13 0 Q24 1 27 -7" fill="none"/></g><g transform="translate(256 114)"><ellipse rx="13" ry="6"/><circle cx="-14" cy="-1" r="4"/><path d="M-8 -4 L-13 -9 M-8 4 L-13 9 M8 -4 L13 -9 M8 4 L13 9 M13 0 Q24 1 27 -7" fill="none"/></g></g><path d="M114 94 Q165 64 221 94 M209 84 L221 94 L209 101" fill="none" stroke="var(--fg)" strokeWidth="3"/><text x="168" y="60" textAnchor="middle" fill="var(--fg)" fontSize="13">Move</text></g>}
    </svg><Row><Control style={{minWidth:44,minHeight:44}} disabled={locked || step !== 0} onClick={()=>{setStep(1);interact();}}>Inspect the subject</Control><Control style={{minWidth:44,minHeight:44}} disabled={locked || step !== 1} onClick={()=>{setStep(2);interact();}}>Trace the evidence</Control></Row></div>}
  </Lesson>;
}
