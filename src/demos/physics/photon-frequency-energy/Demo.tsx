"use client";

import { useState } from "react";
import { Lesson } from "@/kit/Lesson";
import { Control } from "@/kit/controls";
import { Diagram, type PhysicsCase } from "@/lib/physics/PhysicsCase";

const lesson: PhysicsCase = {
  "question": "A single photon has frequency f and energy E. What is the energy of one photon with frequency 2f?",
  "options": [
    "E/2",
    "E",
    "2E"
  ],
  "answer": 2,
  "prompt": "Double the frequency of the single photon.",
  "before": "One photon at frequency f has energy E.",
  "after": "One photon at frequency 2f has energy 2E.",
  "explanation": "A photon's energy is E = hf, where h is Planck's constant. Doubling the frequency doubles the energy of each photon.",
  "limit": "This compares individual photons, not the total power of light beams containing different numbers of photons.",
  "diagram": "spectrum"
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
