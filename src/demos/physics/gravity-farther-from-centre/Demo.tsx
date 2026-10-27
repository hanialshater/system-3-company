"use client";

import { useState } from "react";
import { Lesson } from "@/kit/Lesson";
import { Control } from "@/kit/controls";
import { Diagram, type PhysicsCase } from "@/lib/physics/PhysicsCase";
import styles from "@/lib/physics/physics.module.css";

const lesson: PhysicsCase = {
  "question": "Outside a spherical planet, a spacecraft's distance from the centre increases from r to 4r. How does the planet's gravitational acceleration compare?",
  "options": [
    "It is one quarter",
    "It is one sixteenth",
    "It is unchanged"
  ],
  "answer": 1,
  "prompt": "Move the spacecraft to four times its original distance from the centre.",
  "before": "At distance r, acceleration is g.",
  "after": "At distance 4r, acceleration is g/16.",
  "explanation": "Outside a spherical mass, gravitational acceleration is GM/r². Four times the distance gives 4² = 16 times the denominator, so the acceleration is one sixteenth.",
  "limit": "Spherical planet, outside its surface; ignore other gravitating bodies. Distance is measured from the centre.",
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
      <Control className={styles.tap} disabled={locked || changed} onClick={() => { setChanged(true); interact(); }}>Try the second case</Control>
    </div>}
  </Lesson>;
}
