"use client";

import { useState } from "react";
import { Lesson } from "@/kit/Lesson";
import { Control } from "@/kit/controls";
import { Diagram, type PhysicsCase } from "@/lib/physics/PhysicsCase";

const lesson: PhysicsCase = {
  "question": "An ideal reversible engine works between 600 K and 300 K. What is the greatest fraction of input heat it can turn into work?",
  "options": [
    "25%",
    "50%",
    "100%"
  ],
  "answer": 1,
  "prompt": "Cool the cold reservoir from 450 K to 300 K.",
  "before": "Hot 600 K; cold 450 K: ideal maximum efficiency 25%.",
  "after": "Hot 600 K; cold 300 K: ideal maximum efficiency 50%.",
  "explanation": "For an ideal reversible engine the maximum efficiency is 1 − T_cold / T_hot. At 600 K and 300 K, at most half the input heat becomes work; the rest is rejected to the cold reservoir.",
  "limit": "Temperatures must be absolute. Real engines have additional losses and perform below this ideal bound.",
  "diagram": "engine"
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
