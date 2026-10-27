"use client";

import { useState } from "react";
import { Lesson } from "@/kit/Lesson";
import { Control } from "@/kit/controls";
import { Diagram, type PhysicsCase } from "@/lib/physics/PhysicsCase";

const lesson: PhysicsCase = {
  "question": "On a distance–time graph, one straight line reaches 12 km in 2 hours. Another reaches 12 km in 1 hour. What does the steeper line mean?",
  "options": [
    "A shorter distance",
    "A higher constant speed",
    "A lower constant speed"
  ],
  "answer": 1,
  "prompt": "Reach the same distance in one hour instead of two.",
  "before": "12 km in 2 h: slope 6 km/h.",
  "after": "12 km in 1 h: slope 12 km/h.",
  "explanation": "Slope is distance change divided by time change. Both lines reach 12 km, but the steeper one reaches it in half the time: 12 rather than 6 km/h.",
  "limit": "A straight distance–time line represents constant speed over the interval.",
  "diagram": "graph"
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
