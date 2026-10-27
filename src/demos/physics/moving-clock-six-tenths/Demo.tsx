"use client";

import { useState } from "react";
import { Lesson } from "@/kit/Lesson";
import { Control } from "@/kit/controls";
import { Diagram, type PhysicsCase } from "@/lib/physics/PhysicsCase";
import styles from "@/lib/physics/physics.module.css";

const lesson: PhysicsCase = {
  "question": "A spacecraft passes at 0.6c. In the inertial frame where the observer is at rest, 10 seconds pass between two ticks recorded on the moving spacecraft's clock. How much time does that moving clock record?",
  "options": [
    "6 seconds",
    "8 seconds",
    "12.5 seconds"
  ],
  "answer": 1,
  "prompt": "Compare the clock moving at 0.6c.",
  "before": "At rest relative to the observer: 10 seconds on both clocks.",
  "after": "At 0.6c: 10 seconds in the observer frame correspond to 8 seconds on the moving clock.",
  "explanation": "The Lorentz factor at 0.6c is 1/sqrt(1−0.6²) = 1.25. The moving clock measures the proper time between its own two events: 10/1.25 = 8 seconds.",
  "limit": "Special relativity: inertial motion at constant speed; the observer uses synchronized clocks in their own frame.",
  "diagram": "clock"
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
