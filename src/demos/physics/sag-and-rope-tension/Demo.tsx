"use client";

import { useState } from "react";
import { Lesson } from "@/kit/Lesson";
import { Control } from "@/kit/controls";
import { Diagram, type PhysicsCase } from "@/lib/physics/PhysicsCase";
import styles from "@/lib/physics/physics.module.css";

const lesson: PhysicsCase = {
  "question": "A 200 N weight hangs from the centre of a symmetric rope. Each side makes 30° with the horizontal. If the angle is reduced to 10°, what happens to tension in each side?",
  "options": [
    "It falls",
    "It stays the same",
    "It rises"
  ],
  "answer": 2,
  "prompt": "Raise the ends so each rope is closer to horizontal.",
  "before": "30°: each side pulls with 200 N.",
  "after": "10°: each side pulls with about 576 N.",
  "explanation": "The two upward components must add to 200 N. At 30° each side needs 200 N; at 10° the vertical fraction is smaller, so each side needs about 576 N.",
  "limit": "Static, symmetric, ideal massless rope. Perfectly horizontal rope cannot supply an upward component in this model.",
  "diagram": "rope"
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
