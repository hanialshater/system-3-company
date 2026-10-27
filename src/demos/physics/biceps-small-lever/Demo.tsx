"use client";

import { useState } from "react";
import { Lesson } from "@/kit/Lesson";
import { Control } from "@/kit/controls";
import { Diagram, type PhysicsCase } from "@/lib/physics/PhysicsCase";

const lesson: PhysicsCase = {
  "question": "A 20 N load is 30 cm from your elbow. Your biceps pulls perpendicularly 4 cm from the elbow. In a static model, how large is the biceps force?",
  "options": [
    "20 N",
    "75 N",
    "150 N"
  ],
  "answer": 2,
  "prompt": "Move the load from 10 cm to 30 cm from the elbow.",
  "before": "Load 20 N at 10 cm; muscle moment arm 4 cm: muscle force 50 N.",
  "after": "Load 20 N at 30 cm; muscle moment arm 4 cm: muscle force 150 N.",
  "explanation": "Balance the turning effects: 20 N × 30 cm = muscle force × 4 cm. The muscle needs 150 N because its moment arm is much shorter.",
  "limit": "Static, perpendicular forces; arm weight and other muscles are ignored.",
  "diagram": "lever"
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
