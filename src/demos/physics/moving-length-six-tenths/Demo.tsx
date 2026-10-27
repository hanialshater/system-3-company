"use client";

import { useState } from "react";
import { Lesson } from "@/kit/Lesson";
import { Control } from "@/kit/controls";
import { Diagram, type PhysicsCase } from "@/lib/physics/PhysicsCase";

const lesson: PhysicsCase = {
  "question": "A spacecraft is 100 m long in its own rest frame. It passes you at 0.6c. What length do you measure along its direction of motion?",
  "options": [
    "80 m",
    "100 m",
    "125 m"
  ],
  "answer": 0,
  "prompt": "Observe the spacecraft moving at 0.6c.",
  "before": "At rest relative to you: measured length 100 m.",
  "after": "At 0.6c: measured length 80 m.",
  "explanation": "Length along the direction of motion is L = L₀ / gamma. At 0.6c, gamma = 1.25, so 100 m / 1.25 = 80 m.",
  "limit": "Special relativity; the endpoints are measured simultaneously in the observer's inertial frame. Transverse dimensions are unaffected.",
  "diagram": "length"
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
