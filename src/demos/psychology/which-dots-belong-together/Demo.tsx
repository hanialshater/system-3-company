"use client";

import { useState } from "react";
import { Lesson } from "@/kit/Lesson";
import { Control, Row } from "@/kit/controls";
import { Milestones } from "@/kit/milestones";
import s from "./styles.module.css";

// Coordinates are stimulus units. A has horizontal gap 40 and vertical gap 88;
// B swaps the gaps. Selecting a case records it permanently, including on Reset.
// Proximity is a perceptual grouping cue, not a guarantee about an individual's percept.
type Case = "A" | "B";
const cases: Record<Case, { across: number; down: number }> = {
  A: { across: 40, down: 88 },
  B: { across: 88, down: 40 },
};

function Diagram({ name, shown }: { name: Case; shown: boolean }) {
  const { across, down } = cases[name];
  const x = [70 - across / 2, 70 + across / 2];
  const y = [70 - down / 2, 70 + down / 2];
  return (
    <div className={s.panel}>
      <div className={s.caseTitle}>Case {name}</div>
      <svg viewBox="0 0 140 140" className={s.drawing} role="img" aria-label={shown
        ? `Case ${name}: four dots; horizontal spacing ${across} units, vertical spacing ${down} units.`
        : `Case ${name}: hidden until selected.`}>
        {shown && x.flatMap((xx) => y.map((yy) => (
          <circle key={`${xx}-${yy}`} cx={xx} cy={yy} r={7} className={s.dot} />
        )))}
      </svg>
      <p className={s.gaps}>{shown ? `Across ${across} · Down ${down}` : "Across ? · Down ?"}</p>
    </div>
  );
}

export default function WhichDotsBelongTogether({ slug }: { slug: string }) {
  const [seen, setSeen] = useState<Case[]>([]);
  const [focus, setFocus] = useState<Case | null>(null);
  return (
    <Lesson
      slug={slug}
      predict={{
        question: "Four dots form a rectangle. The horizontal gap is 40 units and the vertical gap is 88 units. Which neighboring dots are closer?",
        options: ["Side by side", "Above and below", "Both equally close"],
        answer: 0,
      }}
      exploreHint="Show both arrangements and compare their gaps."
      minInteractions={2}
      reveal={() => (
        <>
          <p>In A, the gap across is <strong>40</strong> and the gap down is <strong>88</strong>, so the closest neighbors sit side by side. In B, the two gaps swap, making the vertical neighbors closer.</p>
          <p>Closeness is one cue people can use to group what they see. The dots have no connecting lines: another arrangement can suggest a different grouping. Your perception may differ.</p>
        </>
      )}
    >
      {({ locked, interact }) => (
        <Milestones interact={interact} names={["A", "B"]}>
          {(reach) => {
            const select = (name: Case) => {
              setSeen((prev) => prev.includes(name) ? prev : [...prev, name]);
              setFocus(name);
              reach(name);
            };
            return (
              <div className={s.wrap}>
                <div className={s.panels}>
                  <Diagram name="A" shown={!locked && seen.includes("A")} />
                  <Diagram name="B" shown={!locked && seen.includes("B")} />
                </div>
                <p className={s.focus} aria-live="polite">Focus: {focus ?? "none"}</p>
                <Row>
                  <Control disabled={locked || focus === "A"} onClick={() => select("A")}>Show A</Control>
                  <Control disabled={locked || focus === "B"} onClick={() => select("B")}>Show B</Control>
                  <Control disabled={locked || focus === null} onClick={() => setFocus(null)}>Reset view</Control>
                </Row>
              </div>
            );
          }}
        </Milestones>
      )}
    </Lesson>
  );
}
