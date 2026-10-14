"use client";

// Lesson scaffold. Read company/product/demo-standard.md before building.
// Fill meta.json first (learner boundary, misconception, objective, claims):
// the brief decides what to build, not the other way round.

import { useState } from "react";
import { Lesson } from "@/kit/Lesson";
import { Control, Readout, Row, Slider } from "@/kit/controls";

export default function NewLesson({ slug }: { slug: string }) {
  const [value, setValue] = useState(1);

  return (
    <Lesson
      slug={slug}
      predict={{
        question: "TODO: a question the learner can answer with a guess before seeing anything",
        options: ["TODO A", "TODO B", "TODO C"],
        answer: 0,
      }}
      exploreHint="TODO: one sentence telling the learner what to try."
      reveal={() => <p>TODO: compare the prediction with what happened, then say why in two or three sentences.</p>}
    >
      {({ locked, interact }) => (
        <div>
          <svg viewBox="0 0 320 200" className="stage-svg" role="img" aria-label="TODO describe the picture">
            <circle cx={40 + value * 20} cy={100} r={16} fill="var(--accent)" />
          </svg>
          <Row>
            <Slider label="TODO" value={value} min={1} max={12} disabled={locked} onChange={(v) => { setValue(v); interact(); }} />
            <Readout label="TODO" value={value} />
            <Control disabled={locked} onClick={() => { setValue(1); interact(); }}>Reset</Control>
          </Row>
        </div>
      )}
    </Lesson>
  );
}
