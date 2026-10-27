"use client";

import { useState } from "react";
import { Lesson } from "@/kit/Lesson";
import { Control } from "@/kit/controls";
import { Diagram, type PhysicsCase } from "@/lib/physics/PhysicsCase";

const lesson: PhysicsCase = {
  "question": "A rigid object rests on a level table. Its centre of mass moves horizontally until its vertical line falls beyond the support edge. What happens if nothing restrains it?",
  "options": [
    "It can tip about the edge",
    "Its weight becomes zero",
    "The support edge moves outward"
  ],
  "answer": 0,
  "prompt": "Move the centre of mass past the edge.",
  "before": "Centre of mass above the base: gravity alone does not tip it over that edge.",
  "after": "Centre of mass beyond the edge: gravity creates a tipping moment.",
  "explanation": "The weight acts downward through the centre of mass. Once that line falls outside the base, its turning effect about the edge tends to rotate the object over.",
  "limit": "Rigid object, level surface, and no other support or restraint. At the edge itself the idealized tipping moment is zero.",
  "diagram": "balance"
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
