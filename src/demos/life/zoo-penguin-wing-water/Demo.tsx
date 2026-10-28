"use client";
import { useState } from "react";
import { Lesson } from "@/kit/Lesson";
import { Control, Row } from "@/kit/controls";
const lesson = {
  "question": "A penguin swims underwater using its wings. What do those wings chiefly do in this situation?",
  "options": [
    "Help propel it through water",
    "Act as gills",
    "Store drinking water"
  ],
  "answer": 0,
  "hint": "Show the wing and its modeled stroke.",
  "explanation": "The highlighted wing and water arrow sketch a propulsive stroke through water. Penguin wings are modified as flippers used for swimming, even though modern penguins cannot fly in air. The drawing simplifies the motion and does not measure speed or forces.",
  "label": "Schematic penguin and motion, not a reconstruction of a precise stroke.",
  "shownLabel": "Schematic penguin and motion, not a reconstruction of a precise stroke. The highlighted wing and water arrow sketch a propulsive stroke through water. Penguin wings are modified as flippers used for swimming, even though modern penguins cannot fly in air. The drawing simplifies the motion and does not measure speed or forces."
};
export default function Demo({slug}:{slug:string}) {
  const [step,setStep]=useState(0);
  return <Lesson slug={slug} predict={{question:lesson.question,options:lesson.options,answer:lesson.answer}} exploreHint={lesson.hint} minInteractions={2} reveal={()=><p>{lesson.explanation}</p>}>
    {({locked,interact})=><div><svg viewBox="0 0 340 190" className="stage-svg" role="img" aria-label={step === 0 ? "Diagram hidden until you explore." : step === 1 ? lesson.label : lesson.shownLabel}>
      {step === 0 && <text x="170" y="96" textAnchor="middle" fill="var(--muted)" fontSize="16">Evidence hidden</text>}
      {step >= 1 && <g><path d="M58 105 Q65 66 123 70 L218 79 Q242 84 247 99 Q243 120 217 127 L117 135 Q72 137 58 105 Z" fill="#9bb9c5" stroke="var(--fg)" strokeWidth="3"/><path d="M53 103 L30 108 L56 115" fill="#e7b76e" stroke="var(--fg)" strokeWidth="2"/><circle cx="79" cy="91" r="3" fill="var(--fg)"/><path d="M200 127 L214 154 M215 125 L232 150" stroke="var(--fg)" strokeWidth="4"/><path d="M117 103 Q149 90 170 120 Q148 143 117 103 Z" fill="#608291" stroke="var(--fg)" strokeWidth="2"/></g>}
      {step >= 2 && <g><path d="M130 108 Q151 94 168 120 Q145 140 130 108 Z" fill="#e4a75c" stroke="var(--fg)" strokeWidth="3"/><path d="M181 67 Q214 51 241 56 M231 48 L241 56 L230 64" fill="none" stroke="var(--fg)" strokeWidth="3"/><text x="140" y="165" textAnchor="middle" fill="var(--fg)" fontSize="13">Wing stroke</text><text x="214" y="42" textAnchor="middle" fill="var(--fg)" fontSize="12">Water pushed</text></g>}
    </svg><Row><Control disabled={locked || step !== 0} onClick={()=>{setStep(1);interact();}}>Inspect the subject</Control><Control disabled={locked || step !== 1} onClick={()=>{setStep(2);interact();}}>Trace the evidence</Control></Row></div>}
  </Lesson>;
}
