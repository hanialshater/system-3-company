"use client";

import { useState } from "react";
import { Lesson } from "@/kit/Lesson";
import { Control } from "@/kit/controls";
import { Diagram, type PhysicsCase } from "@/lib/physics/PhysicsCase";
import styles from "@/lib/physics/physics.module.css";

const lesson: PhysicsCase = {
  "question": "A large ideal radioactive population starts at 100 nuclei. Its expected count after one half-life is 50. What is the expected count after two half-lives?",
  "options": [
    "0",
    "25",
    "50"
  ],
  "answer": 1,
  "prompt": "Advance from one half-life to two.",
  "before": "After one half-life: expected 50 of 100 remain.",
  "after": "After two half-lives: expected 25 of 100 remain.",
  "explanation": "Each half-life halves the expected number still present. From 100 to 50, then from 50 to 25.",
  "limit": "The dots represent expected counts, not a prediction of exactly which nuclei decay. Individual decay is random.",
  "diagram": "decay"
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
