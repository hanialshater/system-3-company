"use client";

import { useState } from "react";
import { Lesson } from "@/kit/Lesson";
import { Control } from "@/kit/controls";
import { Diagram, type PhysicsCase } from "@/lib/physics/PhysicsCase";

const lesson: PhysicsCase = {
  "question": "Ignoring other bodies and drag, escape speed at distance r from a planet's centre is v. What is it at 4r?",
  "options": [
    "v/4",
    "v/2",
    "2v"
  ],
  "answer": 1,
  "prompt": "Move the launch point to four times the original radius.",
  "before": "At distance r, escape speed is v.",
  "after": "At distance 4r, escape speed is v/2.",
  "explanation": "Escape speed is proportional to the inverse square root of distance: v_escape = sqrt(2GM/r). Four times the distance reduces the threshold to half.",
  "limit": "Newtonian idealization: spherical mass, no drag or other gravitating bodies, and enough energy to reach infinity with zero remaining speed.",
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
