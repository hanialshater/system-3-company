"use client";
import { useState } from "react";
import { Lesson } from "@/kit/Lesson";
import { Control, Row } from "@/kit/controls";
const lesson = {
  "question": "A newly hatched robin and a newly hatched domestic chicken are compared. Which is typically more able to move around shortly after hatching?",
  "options": [
    "The chicken",
    "The robin",
    "They are equally developed"
  ],
  "answer": 0,
  "hint": "Compare the two schematic hatchlings.",
  "explanation": "The illustrated domestic chicken chick is downy, eyes open, and can move soon after hatching; a newly hatched robin is comparatively helpless and depends heavily on parental care. These are examples of precocial and altricial development, not a rule for every bird.",
  "label": "Newly hatched chicks shown schematically; species and stages vary.",
  "shownLabel": "Newly hatched chicks shown schematically; species and stages vary. The illustrated domestic chicken chick is downy, eyes open, and can move soon after hatching; a newly hatched robin is comparatively helpless and depends heavily on parental care. These are examples of precocial and altricial development, not a rule for every bird."
};
export default function Demo({slug}:{slug:string}) {
  const [step,setStep]=useState(0);
  return <Lesson slug={slug} predict={{question:lesson.question,options:lesson.options,answer:lesson.answer}} exploreHint={lesson.hint} minInteractions={2} reveal={()=><p>{lesson.explanation}</p>}>
    {({locked,interact})=><div><svg viewBox="0 0 340 190" className="stage-svg" role="img" aria-label={step === 0 ? "Diagram hidden until you explore." : step === 1 ? lesson.label : lesson.shownLabel}>
      {step === 0 && <text x="170" y="96" textAnchor="middle" fill="var(--muted)" fontSize="16">Evidence hidden</text>}
      {step >= 1 && <g><ellipse cx="87" cy="100" rx="42" ry="29" fill="#e6b6a3" stroke="var(--fg)" strokeWidth="2"/><path d="M122 95 L138 102 L121 108 Z" fill="#e3b56c"/><path d="M68 88 Q75 94 82 88" stroke="var(--fg)" fill="none" strokeWidth="3"/><ellipse cx="244" cy="100" rx="42" ry="31" fill="#e8cc7e" stroke="var(--fg)" strokeWidth="2"/><path d="M276 95 L291 102 L275 108 Z" fill="#e3a95c"/><circle cx="257" cy="88" r="3" fill="var(--fg)"/><text x="87" y="157" textAnchor="middle" fill="var(--fg)" fontSize="13">Robin chick</text><text x="244" y="157" textAnchor="middle" fill="var(--fg)" fontSize="13">Chicken chick</text></g>}
      {step >= 2 && <g><path d="M227 130 L220 143 M248 130 L252 143" stroke="var(--fg)" strokeWidth="3"/><path d="M197 65 L194 55 M216 64 L213 52 M235 64 L235 52 M254 65 L257 53 M273 70 L279 61" stroke="#b9904e" strokeWidth="2"/><text x="87" y="180" textAnchor="middle" fill="var(--fg)" fontSize="12">Eyes closed</text><text x="244" y="180" textAnchor="middle" fill="var(--fg)" fontSize="12">Down; eyes open</text></g>}
    </svg><Row><Control disabled={locked || step !== 0} onClick={()=>{setStep(1);interact();}}>Inspect the subject</Control><Control disabled={locked || step !== 1} onClick={()=>{setStep(2);interact();}}>Trace the evidence</Control></Row></div>}
  </Lesson>;
}
