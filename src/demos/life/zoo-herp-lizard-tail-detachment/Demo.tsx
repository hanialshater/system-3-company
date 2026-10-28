"use client";
import { useState } from "react";
import { Lesson } from "@/kit/Lesson";
import { Control, Row } from "@/kit/controls";
const lesson = {
  "question": "A predator grabs the tail of a lizard with a natural tail break point. What can some lizards do?",
  "options": [
    "Detach the tail",
    "Detach the skull",
    "Turn into a frog"
  ],
  "answer": 0,
  "explanation": "The diagram marks a break point and then shows the tail separated. Some lizards can shed a tail as a defense; survival is not guaranteed, and a later regrown tail need not match the original.",
  "label": "The detached tail is drawn below the starting tail to indicate a later state, not two tails on one animal.",
  "shownLabel": "The detached tail is drawn below the starting tail to indicate a later state, not two tails on one animal. The diagram marks a break point and then shows the tail separated. Some lizards can shed a tail as a defense; survival is not guaranteed, and a later regrown tail need not match the original."
};
export default function Demo({slug}:{slug:string}) {
  const [step,setStep]=useState(0);
  return <Lesson slug={slug} predict={{question:lesson.question,options:lesson.options,answer:lesson.answer}} exploreHint="Inspect the subject, then trace the evidence." minInteractions={2} reveal={()=><p>{lesson.explanation}</p>}>
    {({locked,interact})=><div><svg viewBox="0 0 340 190" className="stage-svg" role="img" aria-label={step === 0 ? "Evidence hidden until you explore." : step === 1 ? lesson.label : lesson.shownLabel}>
      {step === 0 && <text x="170" y="96" textAnchor="middle" fill="var(--muted)" fontSize="16">Evidence hidden</text>}
      {step >= 1 && <g><ellipse cx="126" cy="93" rx="62" ry="26" fill="#95b897" stroke="var(--fg)" strokeWidth="3"/><circle cx="66" cy="83" r="14" fill="#95b897" stroke="var(--fg)" strokeWidth="2"/><circle cx="62" cy="79" r="3" fill="var(--fg)"/><path d="M176 95 Q224 79 275 113 M94 110 L79 132 M151 111 L164 130" fill="none" stroke="var(--fg)" strokeWidth="7" strokeLinecap="round"/></g>}
      {step >= 2 && <g><path d="M198 83 L204 105" stroke="#da836b" strokeWidth="4" strokeDasharray="4 3"/><path d="M217 129 Q254 117 290 137" fill="none" stroke="#789879" strokeWidth="7"/><text x="248" y="160" fill="var(--fg)" fontSize="13">Detached tail</text><text x="181" y="69" fill="var(--fg)" fontSize="13">Break point</text></g>}
    </svg><Row><Control disabled={locked || step !== 0} onClick={()=>{setStep(1);interact();}}>Inspect the subject</Control><Control disabled={locked || step !== 1} onClick={()=>{setStep(2);interact();}}>Trace the evidence</Control></Row></div>}
  </Lesson>;
}
