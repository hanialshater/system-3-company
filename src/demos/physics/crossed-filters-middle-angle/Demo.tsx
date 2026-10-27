"use client";

import { useState } from "react";
import { Lesson } from "@/kit/Lesson";
import { Control } from "@/kit/controls";
import { Diagram, type PhysicsCase } from "@/lib/physics/PhysicsCase";
import styles from "@/lib/physics/physics.module.css";

const lesson: PhysicsCase = {
  "question": "Unpolarized light of intensity 100 reaches two ideal crossed polarizers. If a third ideal polarizer is inserted between them at 45° to both, what intensity emerges?",
  "options": [
    "0",
    "12.5",
    "50"
  ],
  "answer": 1,
  "prompt": "Insert the middle polarizer at 45°.",
  "before": "Two crossed filters: transmitted intensity 0.",
  "after": "Middle filter at 45°: transmitted intensity 12.5.",
  "explanation": "The first filter passes 50. The middle passes half of that, and the last passes half again: 100 × ½ × ½ × ½ = 12.5. The middle filter changes the polarization direction.",
  "limit": "Ideal polarizers and unpolarized input; real filters absorb additional light.",
  "diagram": "filter"
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
      <Control className={styles.tap} disabled={locked || changed} onClick={() => { setChanged(true); interact(); }}>Try the second case</Control>
    </div>}
  </Lesson>;
}
