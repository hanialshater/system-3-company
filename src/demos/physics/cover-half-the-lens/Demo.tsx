"use client";

import { useState } from "react";
import { Lesson } from "@/kit/Lesson";
import { Control } from "@/kit/controls";
import { Diagram, type PhysicsCase } from "@/lib/physics/PhysicsCase";

const lesson: PhysicsCase = {
  "question": "A lens forms a focused image on a screen. You cover the upper half of the lens. What happens to the image, in an ideal ray model?",
  "options": [
    "The upper half disappears",
    "The whole image gets dimmer",
    "The image becomes twice as large"
  ],
  "answer": 1,
  "prompt": "Cover the top half of the lens.",
  "before": "Both parts of the lens receive rays from each object point.",
  "after": "The remaining lens passes rays from each object point to the whole image.",
  "explanation": "Light from each object point can reach the image through different parts of the lens. Covering half blocks some rays from each point; it does not select half the picture.",
  "limit": "Ideal geometric optics: a focused image, uniform illumination, and diffraction neglected.",
  "diagram": "lens"
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
