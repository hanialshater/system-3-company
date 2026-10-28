"use client";
import { useState } from "react";
import { Lesson } from "@/kit/Lesson";
import { Control, Row } from "@/kit/controls";
const lesson = {
  "question": "In a simplified model a gliding bird sinks 1 m/s relative to the air. If the air rises 2 m/s, how does its height change relative to the ground?",
  "options": [
    "Rises 1 m/s",
    "Falls 1 m/s",
    "Rises 3 m/s"
  ],
  "answer": 0,
  "hint": "Compare the two air conditions.",
  "explanation": "The schematic combines two vertical motions: the bird sinks 1 m/s relative to the air, while the air rises 2 m/s. Adding the signed velocities gives a 1 m/s rise relative to the ground. This is a toy model, not a measurement of a particular bird.",
  "label": "Toy velocity diagram, not a real bird or measurement.",
  "shownLabel": "Toy velocity diagram, not a real bird or measurement. The schematic combines two vertical motions: the bird sinks 1 m/s relative to the air, while the air rises 2 m/s. Adding the signed velocities gives a 1 m/s rise relative to the ground. This is a toy model, not a measurement of a particular bird."
};
export default function Demo({slug}:{slug:string}) {
  const [step,setStep]=useState(0);
  return <Lesson slug={slug} predict={{question:lesson.question,options:lesson.options,answer:lesson.answer}} exploreHint={lesson.hint} minInteractions={2} reveal={()=><p>{lesson.explanation}</p>}>
    {({locked,interact})=><div><svg viewBox="0 0 340 190" className="stage-svg" role="img" aria-label={step === 0 ? "Diagram hidden until you explore." : step === 1 ? lesson.label : lesson.shownLabel}>
      {step === 0 && <text x="170" y="96" textAnchor="middle" fill="var(--muted)" fontSize="16">Evidence hidden</text>}
      {step >= 1 && <g><path d="M78 52 Q95 38 110 48 Q125 38 141 52" fill="none" stroke="var(--fg)" strokeWidth="4" strokeLinecap="round"/><circle cx="110" cy="50" r="4" fill="var(--fg)"/><path d="M24 155 H315" stroke="var(--line)" strokeWidth="3"/><text x="170" y="178" textAnchor="middle" fill="var(--fg)" fontSize="13">Ground</text></g>}
      {step >= 2 && <g><path d="M192 140 V46 M182 57 L192 46 L202 57" fill="none" stroke="#438c79" strokeWidth="5"/><text x="202" y="60" fill="var(--fg)" fontSize="13">Air +2</text><path d="M118 64 V116 M109 107 L118 116 L127 107" fill="none" stroke="#a45651" strokeWidth="4"/><text x="30" y="100" fill="var(--fg)" fontSize="13">Bird in air −1</text><text x="214" y="119" fill="var(--fg)" fontSize="13">Ground: +1 m/s</text></g>}
    </svg><Row><Control disabled={locked || step !== 0} onClick={()=>{setStep(1);interact();}}>Inspect the subject</Control><Control disabled={locked || step !== 1} onClick={()=>{setStep(2);interact();}}>Trace the evidence</Control></Row></div>}
  </Lesson>;
}
