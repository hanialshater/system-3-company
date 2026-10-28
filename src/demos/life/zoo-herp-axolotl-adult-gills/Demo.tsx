"use client";
import { useState } from "react";
import { Lesson } from "@/kit/Lesson";
import { Control, Row } from "@/kit/controls";
const lesson = {
  "question": "A reproductively mature axolotl still has a feature usually associated with a larval form. Which feature can it retain?",
  "options": [
    "External gills",
    "Bird wings",
    "An insect exoskeleton"
  ],
  "answer": 0,
  "explanation": "The diagram highlights external gills beside an adult axolotl and depicts eggs as evidence of reproduction in this scenario. Axolotls commonly mature while retaining larval characteristics; the sketch is not evidence that every individual follows an identical path.",
  "label": "The scene stipulates reproduction and highlights gills; external anatomy and reproductive stages are simplified.",
  "shownLabel": "The scene stipulates reproduction and highlights gills; external anatomy and reproductive stages are simplified. The diagram highlights external gills beside an adult axolotl and depicts eggs as evidence of reproduction in this scenario. Axolotls commonly mature while retaining larval characteristics; the sketch is not evidence that every individual follows an identical path."
};
export default function Demo({slug}:{slug:string}) {
  const [step,setStep]=useState(0);
  return <Lesson slug={slug} predict={{question:lesson.question,options:lesson.options,answer:lesson.answer}} exploreHint="Inspect the subject, then trace the evidence." minInteractions={2} reveal={()=><p>{lesson.explanation}</p>}>
    {({locked,interact})=><div><svg viewBox="0 0 340 190" className="stage-svg" role="img" aria-label={step === 0 ? "Evidence hidden until you explore." : step === 1 ? lesson.label : lesson.shownLabel}>
      {step === 0 && <text x="170" y="96" textAnchor="middle" fill="var(--muted)" fontSize="16">Evidence hidden</text>}
      {step >= 1 && <g><ellipse cx="145" cy="95" rx="70" ry="25" fill="#d7b3a9" stroke="var(--fg)" strokeWidth="2"/><path d="M206 95 Q248 77 275 105 M110 114 L100 132 M174 115 L184 132" fill="none" stroke="var(--fg)" strokeWidth="5"/><circle cx="92" cy="89" r="3" fill="var(--fg)"/></g>}
      {step >= 2 && <g><path d="M84 77 L70 52 M95 72 L91 44 M106 72 L112 45" stroke="#ba7774" strokeWidth="5"/><circle cx="255" cy="140" r="7" fill="#e6ceae" stroke="var(--fg)"/><circle cx="275" cy="143" r="7" fill="#e6ceae" stroke="var(--fg)"/><text x="87" y="35" textAnchor="middle" fill="var(--fg)" fontSize="13">External gills</text><text x="263" y="168" textAnchor="middle" fill="var(--fg)" fontSize="13">Eggs</text></g>}
    </svg><Row><Control disabled={locked || step !== 0} onClick={()=>{setStep(1);interact();}}>Inspect the subject</Control><Control disabled={locked || step !== 1} onClick={()=>{setStep(2);interact();}}>Trace the evidence</Control></Row></div>}
  </Lesson>;
}
