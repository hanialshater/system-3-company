"use client";
import { useState } from "react";
import { Lesson } from "@/kit/Lesson";
import { Control, Row } from "@/kit/controls";
const lesson = {
  "question": "A gecko climbs a clean vertical surface. What do many tiny structures on its toe pads help it do?",
  "options": [
    "Make close contact with the surface",
    "Pump liquid glue from the claws",
    "Grow roots into the wall"
  ],
  "answer": 0,
  "explanation": "The magnified toe shows many branching structures meeting a surface. These fine structures help a gecko make close contact and adhere; the sketch is not to scale and does not show every physical force involved.",
  "label": "The toe structures are greatly enlarged and reduced to a few lines; no nanoscale force is directly measured.",
  "shownLabel": "The toe structures are greatly enlarged and reduced to a few lines; no nanoscale force is directly measured. The magnified toe shows many branching structures meeting a surface. These fine structures help a gecko make close contact and adhere; the sketch is not to scale and does not show every physical force involved."
};
export default function Demo({slug}:{slug:string}) {
  const [step,setStep]=useState(0);
  return <Lesson slug={slug} predict={{question:lesson.question,options:lesson.options,answer:lesson.answer}} exploreHint="Inspect the subject, then trace the evidence." minInteractions={2} reveal={()=><p>{lesson.explanation}</p>}>
    {({locked,interact})=><div><svg viewBox="0 0 340 190" className="stage-svg" role="img" aria-label={step === 0 ? "Evidence hidden until you explore." : step === 1 ? lesson.label : lesson.shownLabel}>
      {step === 0 && <text x="170" y="96" textAnchor="middle" fill="var(--muted)" fontSize="16">Evidence hidden</text>}
      {step >= 1 && <g><path d="M63 130 Q110 47 176 80 Q192 89 190 115 L97 150 Z" fill="#b5c99c" stroke="var(--fg)" strokeWidth="3"/><path d="M228 34 V159" stroke="var(--fg)" strokeWidth="5"/><text x="229" y="178" textAnchor="middle" fill="var(--fg)" fontSize="13">Surface</text></g>}
      {step >= 2 && <g><path d="M190 90 L224 68 M190 100 L224 88 M190 110 L224 108 M189 120 L224 128 M185 130 L224 148" stroke="#c88c6b" strokeWidth="3"/><text x="154" y="37" textAnchor="middle" fill="var(--fg)" fontSize="13">Fine toe structures</text></g>}
    </svg><Row><Control disabled={locked || step !== 0} onClick={()=>{setStep(1);interact();}}>Inspect the subject</Control><Control disabled={locked || step !== 1} onClick={()=>{setStep(2);interact();}}>Trace the evidence</Control></Row></div>}
  </Lesson>;
}
