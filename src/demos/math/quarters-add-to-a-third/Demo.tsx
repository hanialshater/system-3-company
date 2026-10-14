"use client";

// Quarters add to a third. A unit square; each level splits the leftover top-right corner into four
// equal squares: one solid (the series term), one hatched, one dotted, one left over for the next level.
// The three patterns always cover equal areas and the leftover shrinks, so each tends to 1/3.
// Milestones: two or more levels drawn; level 6 reached (solid 0.3333, recorded with its level).
// When the reveal opens the stage returns to level 6 (learner r10, W-822), so the leftover the reveal names
// ("down to 0.0002") is the one on screen whatever was pressed last. "Start over" goes to level 0.
// Brief: company/domains/briefs/math.algebra.md, Wave J, brief 5 (check A5).

import { Lesson, type StageContext } from "@/kit/Lesson";
import { Control, Row } from "@/kit/controls";
import { useMilestones } from "@/kit/milestones";
import { useEffect, useId, useRef, useState } from "react";
import s from "./styles.module.css";

const TARGET = 6;
const MAX = 8;
const MILESTONES = ["two-levels", "level-six"] as const;
const S = 232;
const M = 4;

const solid = (n: number) => {
  let t = 0;
  for (let k = 1; k <= n; k++) t += 1 / 4 ** k;
  return t;
};
const d4 = (x: number) => x.toFixed(4);

type Seen = { six: string | null };

export default function QuartersAddToAThird({ slug }: { slug: string }) {
  const [level, setLevel] = useState(0);
  const seen = useRef<Seen>({ six: null });

  return (
    <Lesson
      slug={slug}
      predict={{
        question: "1/4 + 1/16 + 1/64 + … forever. What does the total get closer and closer to?",
        options: ["1/2", "3/8", "1/3"],
        answer: 2,
      }}
      exploreHint="Step a level or two, then jump to level 6."
      minInteractions={MILESTONES.length}
      reveal={() => (
        <>
          <p>
            By level {TARGET} the solid pieces covered {seen.current.six ?? d4(solid(TARGET))} of the square, and the leftover
            corner was down to {d4(1 / 4 ** TARGET)}. At every level the corner split into four: one solid, one hatched, one
            dotted, one left over.
          </p>
          <p>
            The three patterns always matched, and the leftover corner shrank toward nothing, so each pattern ends with a
            third of the square. That is 1/4 + 1/16 + 1/64 + … = 1/3, read straight off the picture.
          </p>
        </>
      )}
    >
      {(ctx) => <Stage {...ctx} level={level} setLevel={setLevel} seen={seen.current} />}
    </Lesson>
  );
}

function Stage({ locked, phase, interact, level, setLevel, seen }: StageContext & { level: number; setLevel: (n: number) => void; seen: Seen }) {
  const { reach } = useMilestones(interact, MILESTONES);
  const uid = useId().replace(/:/g, "");
  const hatch = `hatch-${uid}`;
  const dots = `dots-${uid}`;

  useEffect(() => {
    if (phase === "reveal" && seen.six) setLevel(TARGET);
  }, [phase, seen, setLevel]);

  const go = (n: number) => {
    setLevel(n);
    if (n >= 2) reach("two-levels");
    if (n === TARGET) {
      seen.six = d4(solid(TARGET));
      reach("level-six");
    }
  };

  const pieces = [];
  for (let k = 1; k <= level; k++) {
    const h = S / 2 ** k;
    const x = M + S - 2 * h;
    const y = M;
    pieces.push(
      <g key={k}>
        <rect x={x} y={y} width={h} height={h} className={s.solid} />
        <rect x={x} y={y + h} width={h} height={h} fill={`url(#${dots})`} className={s.cell} />
        <rect x={x + h} y={y + h} width={h} height={h} fill={`url(#${hatch})`} className={s.cell} />
      </g>,
    );
  }
  const left = S / 2 ** level;
  const sum = solid(level);

  return (
    <div className={s.wrap}>
      <p className={s.trace}>{locked ? " " : "Hatched and dotted pieces match the solid ones."}</p>
      <svg viewBox={`0 0 ${S + 2 * M} ${S + 2 * M}`} className={`stage-svg ${s.fit}`} role="img" aria-label={`Square split to level ${level}`}>
        <defs>
          <pattern id={hatch} width={5} height={5} patternUnits="userSpaceOnUse" patternTransform="rotate(45)">
            <rect width={5} height={5} className={s.patBg} />
            <line x1={0} y1={0} x2={0} y2={5} className={s.hatchLine} />
          </pattern>
          <pattern id={dots} width={5} height={5} patternUnits="userSpaceOnUse">
            <rect width={5} height={5} className={s.patBg} />
            <circle cx={2.5} cy={2.5} r={1.2} className={s.dot} />
          </pattern>
        </defs>
        <rect x={M} y={M} width={S} height={S} className={s.square} />
        {pieces}
        {level > 0 && <rect x={M + S - left} y={M} width={left} height={left} className={s.leftover} />}
      </svg>

      <p className={s.readout} aria-live="polite">
        {locked || level === 0 ? "Level 0: the whole square" : `Level ${level} · solid: ${d4(sum)}`}
      </p>
      <p className={s.trace}>
        {!locked && level > 0 ? `hatched ${d4(sum)} · dotted ${d4(sum)} · left over ${d4(1 / 4 ** level)}` : " "}
      </p>

      <Row>
        <Control disabled={locked || level >= MAX} className={s.tap} onClick={() => go(level + 1)}>
          Step
        </Control>
        <Control
          disabled={locked || level === TARGET}
          className={`${s.tap} ${level === TARGET ? "active" : ""}`}
          aria-pressed={level === TARGET}
          onClick={() => go(TARGET)}
        >
          To level {TARGET}
        </Control>
        <Control disabled={locked || level === 0} className={s.tap} onClick={() => go(0)}>
          Start over
        </Control>
      </Row>
    </div>
  );
}
