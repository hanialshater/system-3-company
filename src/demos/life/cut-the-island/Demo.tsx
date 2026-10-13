"use client";

// Species-area rule as a toy: species kept (eventually) = 100 x (area kept)^z,
// z = 0.25. Left: the forest as 100 patches (kept patches in reading order).
// Right: 100 species; which ones are lost follows an untuned shuffled order
// (mulberry32(4)), only the count comes from the rule. Deterministic.

import { useState } from "react";
import { Lesson } from "@/kit/Lesson";
import { Control, Readout, Row, Slider } from "@/kit/controls";
import { useMilestones } from "@/kit/milestones";
import { mulberry32 } from "@/kit/random";
import s from "./styles.module.css";

const Z = 0.25;
const MILESTONES = ["ten", "half"] as const;
const species = (areaPct: number) => Math.round(100 * (areaPct / 100) ** Z);

const LOSE_RANK = (() => {
  const rng = mulberry32(4);
  const idx = Array.from({ length: 100 }, (_, i) => i);
  for (let i = 99; i > 0; i--) {
    const j = Math.floor(rng() * (i + 1));
    [idx[i], idx[j]] = [idx[j], idx[i]];
  }
  const r = Array(100).fill(0);
  idx.forEach((spot, k) => (r[spot] = k));
  return r;
})();

// Numbers in the question and reveal come from the same rule as the stage.
const AT10 = species(10); // 56
const AT50 = species(50); // 84

function Stage({ locked, interact }: { locked: boolean; interact: () => void }) {
  const [area, setArea] = useState(100);
  const { reach } = useMilestones(interact, MILESTONES);
  const kept = species(area);
  const go = (v: number) => {
    setArea(v);
    if (v === 10) reach("ten");
    if (v >= 30 && v <= 70) reach("half");
  };

  return (
    <div className={s.wrap}>
      <svg viewBox="0 0 300 168" className={`stage-svg ${s.svg}`} role="img" aria-label={`${area}% of forest kept, ${locked ? "?" : kept} of 100 species kept`}>
        <text x={70} y={12} textAnchor="middle" className={s.head}>forest</text>
        <text x={230} y={12} textAnchor="middle" className={s.head}>species</text>
        {Array.from({ length: 100 }, (_, i) => (
          <rect key={i} x={6 + (i % 10) * 13.5} y={20 + Math.floor(i / 10) * 14.5} width={12} height={13} rx={2} className={i < area ? s.tree : s.cut} />
        ))}
        {LOSE_RANK.map((rk, i) => {
          const x = 166 + (i % 10) * 13.5 + 6, y = 20 + Math.floor(i / 10) * 14.5 + 6.5;
          const alive = locked || rk < kept;
          return alive ? (
            <circle key={i} cx={x} cy={y} r={4.6} className={s.sp} />
          ) : (
            <path key={i} d={`M${x - 3.5},${y - 3.5} l7,7 m0,-7 l-7,7`} className={s.gone} />
          );
        })}
      </svg>

      <p className={s.msg} aria-live="polite">
        {locked
          ? "Make a prediction to start. Rule of thumb: species ∝ area^0.25. Losses take years."
          : `${area}% of the forest kept: eventually ${kept} of 100 species survive.`}
      </p>

      <Row>
        <Control className={s.chip} disabled={locked || area === 10} onClick={() => go(10)}>
          Keep 10%
        </Control>
        <Control className={s.chip} disabled={locked || area === 50} onClick={() => go(50)}>
          Keep 50%
        </Control>
        <Control className={s.chip} disabled={locked || area === 100} onClick={() => go(100)}>
          Whole forest
        </Control>
      </Row>
      <Slider label="Forest kept" value={area} min={10} max={100} step={10} disabled={locked} format={(v) => `${v}%`} onChange={go} />
      <Row>
        <Readout label="Area kept" value={`${area}%`} />
        <Readout label="Species kept" value={locked ? "?" : `${kept}%`} />
      </Row>
    </div>
  );
}

export default function CutTheIsland({ slug }: { slug: string }) {
  return (
    <Lesson
      slug={slug}
      predict={{
        question:
          "A forest keeps only 10% of its area. With a typical species-area exponent of 0.25, about what share of its species does it eventually keep?",
        options: ["About 10%", `About ${AT10}%`, "About 90%"],
        answer: 1,
      }}
      exploreHint="Cut the forest to 10% and count the species left. Then try keeping half."
      minInteractions={MILESTONES.length}
      reveal={() => (
        <>
          <p>
            With 10% of the forest left, <strong>{AT10} of 100 species</strong> survived in the long run, not 10. Keeping
            half kept {AT50}. Species fall off far less steeply than area.
          </p>
          <p>
            The rule of thumb is species &prop; area<sup>0.25</sup>: 0.1<sup>0.25</sup> &asymp; 0.56. Many species live
            across much of a forest, so a small piece still holds a lot of them. But they still fall: losing 90% of the
            forest cost 44% of its species.
          </p>
          <p className="muted">
            An empirical regularity, not a law: real exponents run about 0.15 to 0.35, and the losses take years to
            decades to arrive.
          </p>
        </>
      )}
    >
      {({ locked, interact }) => <Stage locked={locked} interact={interact} />}
    </Lesson>
  );
}
