"use client";
import { useState } from "react";
import { Lesson } from "@/kit/Lesson";
import { Control, Row } from "@/kit/controls";
const lesson = {
  "question": "In this simple landscape model, frogs can move along wet habitat but cannot cross the dry barrier. What happens when a wet corridor joins the ponds?",
  "options": [
    "A movement route becomes available",
    "The ponds become oceans",
    "Frogs become reptiles"
  ],
  "answer": 0,
  "explanation": "The green corridor connects the two blue wetland patches in the stipulated model, so a route appears where the barrier previously blocked it. Real animals and landscapes differ: a corridor’s success requires separate evidence.",
  "label": "A conditional toy landscape: movement rules and barrier impermeability are assumptions, not species measurements.",
  "shownLabel": "A conditional toy landscape: movement rules and barrier impermeability are assumptions, not species measurements. The green corridor connects the two blue wetland patches in the stipulated model, so a route appears where the barrier previously blocked it. Real animals and landscapes differ: a corridor’s success requires separate evidence."
};
export default function Demo({slug}:{slug:string}) {
  const [step,setStep]=useState(0);
  return <Lesson slug={slug} predict={{question:lesson.question,options:lesson.options,answer:lesson.answer}} exploreHint="Inspect the subject, then trace the evidence." minInteractions={2} reveal={()=><p>{lesson.explanation}</p>}>
    {({locked,interact})=><div><svg viewBox="0 0 340 190" className="stage-svg" role="img" aria-label={step === 0 ? "Evidence hidden until you explore." : step === 1 ? lesson.label : lesson.shownLabel}>
      {step === 0 && <text x="170" y="96" textAnchor="middle" fill="var(--muted)" fontSize="16">Evidence hidden</text>}
      {step >= 1 && <g><rect x="16" y="24" width="308" height="136" rx="12" fill="#d5c3a7"/><ellipse cx="75" cy="92" rx="46" ry="32" fill="#8fb8c8" stroke="var(--fg)" strokeWidth="2"/><ellipse cx="265" cy="92" rx="46" ry="32" fill="#8fb8c8" stroke="var(--fg)" strokeWidth="2"/><text x="170" y="48" textAnchor="middle" fill="var(--fg)" fontSize="13">Dry barrier</text></g>}
      {step >= 2 && <g><path d="M121 90 H220" stroke="#70a77b" strokeWidth="22"/><path d="M120 90 H220 M210 81 L220 90 L210 99" fill="none" stroke="var(--fg)" strokeWidth="3"/><text x="170" y="141" textAnchor="middle" fill="var(--fg)" fontSize="13">Wet corridor</text></g>}
    </svg><Row><Control disabled={locked || step !== 0} onClick={()=>{setStep(1);interact();}}>Inspect the subject</Control><Control disabled={locked || step !== 1} onClick={()=>{setStep(2);interact();}}>Trace the evidence</Control></Row></div>}
  </Lesson>;
}
