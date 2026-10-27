"use client";

import { useState } from "react";
import { Lesson } from "@/kit/Lesson";
import { Control } from "@/kit/controls";
import { Diagram, type PhysicsCase } from "@/lib/physics/PhysicsCase";

const lesson: PhysicsCase = {
  "question": "A heat pump delivers 3 kWh of heat to a room using 1 kWh of electricity. In this example, how much heat comes from outside?",
  "options": [
    "0 kWh",
    "2 kWh",
    "3 kWh"
  ],
  "answer": 1,
  "prompt": "Run the same idealized heat pump for twice as long.",
  "before": "Electricity 1 kWh; outside heat 2 kWh; room heat 3 kWh.",
  "after": "Electricity 2 kWh; outside heat 4 kWh; room heat 6 kWh.",
  "explanation": "The pump moves heat from outside and adds the energy it consumes: 2 kWh from outside plus 1 kWh of electricity makes 3 kWh delivered indoors.",
  "limit": "Illustrative constant coefficient of performance of 3. Actual performance varies with operating conditions.",
  "diagram": "pump"
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
