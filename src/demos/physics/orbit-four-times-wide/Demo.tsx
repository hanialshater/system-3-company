"use client";

import { useState } from "react";
import { Lesson } from "@/kit/Lesson";
import { Control } from "@/kit/controls";
import { Diagram, type PhysicsCase } from "@/lib/physics/PhysicsCase";

const lesson: PhysicsCase = {
  "question": "A spacecraft moves in a circular orbit around a planet. If a second circular orbit has four times the radius, how does its period compare?",
  "options": [
    "Twice as long",
    "Four times as long",
    "Eight times as long"
  ],
  "answer": 2,
  "prompt": "Move to a circular orbit four times the radius.",
  "before": "Orbit radius r: period T.",
  "after": "Orbit radius 4r: period 8T.",
  "explanation": "For circular orbits around the same mass, period is proportional to radius to the power 3/2. The radius grows by 4, so the period grows by 4^(3/2) = 8.",
  "limit": "Circular Keplerian orbits around the same dominant spherical mass, with orbital radius measured from its centre.",
  "diagram": "sphere"
};

export default function Demo({ slug }: { slug: string }) {
  const [changed, setChanged] = useState(false);
  return <Lesson slug={slug}
    predict={{ question: lesson.question, options: lesson.options, answer: lesson.answer }}
    exploreHint={lesson.prompt}
    minInteractions={1}
    reveal={() => <><p>{lesson.explanation}</p><p>{lesson.limit}</p></>}>
    {({ locked, interact }) => <div>
      <Diagram kind={lesson.diagram} changed={changed}/>
      <p aria-live="polite">{locked ? "Make a prediction to explore." : changed ? lesson.after : lesson.before}</p>
      <Control disabled={locked || changed} onClick={() => { setChanged(true); interact(); }}>Try the second case</Control>
    </div>}
  </Lesson>;
}
