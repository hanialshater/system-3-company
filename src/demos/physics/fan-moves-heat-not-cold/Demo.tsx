"use client";

import { useState } from "react";
import { Lesson } from "@/kit/Lesson";
import { Control } from "@/kit/controls";
import { Diagram, type PhysicsCase } from "@/lib/physics/PhysicsCase";

const lesson: PhysicsCase = {
  "question": "In an ideal illustration, still room air removes 20 W from a warm surface. A fan moving air at the same temperature raises removal to 60 W. What changed?",
  "options": [
    "Air temperature fell",
    "Heat transfer from the surface increased",
    "The surface made cold air"
  ],
  "answer": 1,
  "prompt": "Turn on the airflow.",
  "before": "Still air: illustrative heat loss 20 W.",
  "after": "Moving air at the same temperature: illustrative heat loss 60 W.",
  "explanation": "The faster flow removes warm air next to the surface and increases convective heat transfer. A fan can cool a person without lowering the room's air temperature.",
  "limit": "Illustrative heat-flow values; actual cooling depends on airflow, humidity, temperatures, and evaporation. A running fan also adds its own electrical energy as heat.",
  "diagram": "fan"
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
