"use client";

import { useState } from "react";
import { Lesson } from "@/kit/Lesson";
import { Control } from "@/kit/controls";
import { Diagram, type PhysicsCase } from "@/lib/physics/PhysicsCase";

const lesson: PhysicsCase = {
  "question": "You travel 60 km out at 30 km/h and 60 km back at 60 km/h. What is your average speed for the whole trip?",
  "options": [
    "40 km/h",
    "45 km/h",
    "60 km/h"
  ],
  "answer": 0,
  "prompt": "Increase the return speed from 30 to 60 km/h.",
  "before": "Out 30, back 30 km/h: 120 km in 4 h, average 30 km/h.",
  "after": "Out 30, back 60 km/h: 120 km in 3 h, average 40 km/h.",
  "explanation": "The outward trip takes 2 h and the return takes 1 h. Divide the full 120 km by the full 3 h: 40 km/h. You spend longer at the slower speed.",
  "limit": "Each leg has constant speed; stops and acceleration are excluded.",
  "diagram": "speed"
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
