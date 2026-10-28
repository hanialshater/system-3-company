"use client";
import { useState } from "react";
import { Lesson } from "@/kit/Lesson";
import { Control, Row } from "@/kit/controls";
const lesson = {
  "question": "In the illustrated scenario, a hornbill eats a fruit and later drops a viable seed away from the parent plant. What has the bird done?",
  "options": [
    "Dispersed the seed",
    "Pollinated the flower",
    "Made the seed by photosynthesis"
  ],
  "answer": 0,
  "hint": "Trace the fruit, bird and deposited seed.",
  "explanation": "The diagram follows a fruit from the parent plant to the bird, then a seed to a different location. Moving a viable seed away is seed dispersal. The particular scene is illustrative: the outcome of a real seed depends on the species and conditions.",
  "label": "A stipulated seed journey; bird and plants are schematic and not to scale.",
  "shownLabel": "A stipulated seed journey; bird and plants are schematic and not to scale. The diagram follows a fruit from the parent plant to the bird, then a seed to a different location. Moving a viable seed away is seed dispersal. The particular scene is illustrative: the outcome of a real seed depends on the species and conditions."
};
export default function Demo({slug}:{slug:string}) {
  const [step,setStep]=useState(0);
  return <Lesson slug={slug} predict={{question:lesson.question,options:lesson.options,answer:lesson.answer}} exploreHint={lesson.hint} minInteractions={2} reveal={()=><p>{lesson.explanation}</p>}>
    {({locked,interact})=><div><svg viewBox="0 0 340 190" className="stage-svg" role="img" aria-label={step === 0 ? "Diagram hidden until you explore." : step === 1 ? lesson.label : lesson.shownLabel}>
      {step === 0 && <text x="170" y="96" textAnchor="middle" fill="var(--muted)" fontSize="16">Evidence hidden</text>}
      {step >= 1 && <g><path d="M55 143 V72 M33 83 Q55 42 77 83" fill="#8eba92" stroke="var(--fg)" strokeWidth="3"/><circle cx="55" cy="83" r="6" fill="#d27b6d"/><ellipse cx="166" cy="92" rx="37" ry="23" fill="#93b5bc" stroke="var(--fg)" strokeWidth="2"/><path d="M139 82 Q113 72 102 80 Q109 99 135 101 Z" fill="#e9bd77" stroke="var(--fg)" strokeWidth="2"/><path d="M132 83 Q116 67 108 76 Q120 75 133 88 Z" fill="#e9bd77" stroke="var(--fg)" strokeWidth="2"/><circle cx="144" cy="87" r="3" fill="var(--fg)"/><path d="M271 143 V117 M261 125 Q272 107 282 125" fill="none" stroke="var(--fg)" strokeWidth="3"/><text x="55" y="169" textAnchor="middle" fill="var(--fg)" fontSize="12">Parent plant</text><text x="272" y="169" textAnchor="middle" fill="var(--fg)" fontSize="12">New site</text></g>}
      {step >= 2 && <g><path d="M80 67 Q106 52 129 67 M121 57 L129 67 L118 70 M205 67 Q227 52 252 67 M243 57 L252 67 L241 70" fill="none" stroke="var(--fg)" strokeWidth="3"/><ellipse cx="267" cy="139" rx="5" ry="3" fill="#805d3b"/><text x="170" y="41" textAnchor="middle" fill="var(--fg)" fontSize="13">Fruit → bird → seed</text></g>}
    </svg><Row><Control disabled={locked || step !== 0} onClick={()=>{setStep(1);interact();}}>Inspect the subject</Control><Control disabled={locked || step !== 1} onClick={()=>{setStep(2);interact();}}>Trace the evidence</Control></Row></div>}
  </Lesson>;
}
