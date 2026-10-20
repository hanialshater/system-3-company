"use client";

// Poll margin of error. A slider steps the sample size through doublings (250 ... 8,000). 100 seeded
// polls of a 50/50 population appear as dots; the shaded band is the 95% margin of error.
// Key state: 2,000 seen (margin only falls to 2.2) and 4,000 seen (1.5). The slider starts at 1,000,
// so the QA path (two right-arrow presses) visits 2,000 and then 4,000.
// v3: 4,000 only counts when the learner stops on it ("Double the people", or the slider resting
// 300 ms), so dragging past 4,000 no longer opens the reveal. The slider comes first in DOM order. Only the 1,000 and 2,000 bands leave
// dashed, labelled ghosts, so "half as wide" can be read against the 1,000 band.

import { useEffect, useMemo, useRef, useState } from "react";
import { Lesson } from "@/kit/Lesson";
import { useMilestones } from "@/kit/milestones";
import { Control, Readout, Row, Slider } from "@/kit/controls";
import { POLLS, SIZES, START, inside, margin, polls } from "./model";
import s from "./styles.module.css";

const MILESTONES = ["at-2000", "at-4000"] as const;
const n = (v: number) => v.toLocaleString("en-US");
const m1 = (v: number) => margin(v).toFixed(1);
const BASE = SIZES[START];
const DOUBLE = BASE * 2;
const QUAD = BASE * 4;
const LO = 40;
const HI = 60;
const X0 = 16;
const W = 328;
const x = (pct: number) => X0 + ((pct - LO) / (HI - LO)) * W;
const ROWS = 20;

function Stage({ locked, interact, idx, setIdx }: { locked: boolean; interact: () => void; idx: number; setIdx: (i: number) => void }) {
  const { reach } = useMilestones(interact, MILESTONES);
  const [visited, setVisited] = useState<number[]>([BASE]);
  const visitedRef = useRef(visited);
  visitedRef.current = visited;
  const rest = useRef<ReturnType<typeof setTimeout> | null>(null);
  useEffect(() => () => {
    if (rest.current) clearTimeout(rest.current);
  }, []);
  // A stop: the learner settled on this size, so its margin and band were on screen to read.
  const stop = (i: number) => {
    const v = SIZES[i];
    const before = visitedRef.current;
    if (!before.includes(v)) setVisited([...before, v]);
    if (v === DOUBLE) reach("at-2000");
    // 4,000 only counts after a stop at 2,000, so the "only 2.2" step is never skipped.
    if (v === QUAD && before.includes(DOUBLE)) reach("at-4000");
  };
  const go = (i: number, settled: boolean) => {
    setIdx(i);
    if (rest.current) clearTimeout(rest.current);
    // 2,000 counts on the way past (its band stays as a ghost); 4,000 needs a real stop.
    if (settled || SIZES[i] === DOUBLE) stop(i);
    else rest.current = setTimeout(() => stop(i), 300);
  };
  const size = SIZES[idx];
  const res = useMemo(() => polls(size), [size]);
  const mg = margin(size);
  const inn = inside(res, size);

  return (
    <div className={s.wrap}>
      <p className={s.msg}>
        {locked ? "Make a prediction to start." : "Dot: one poll. True support: 50%. Band: the margin of error. Dashed: the 1,000 and 2,000 bands."}
      </p>
      <svg viewBox="0 -4 360 204" className={`stage-svg ${s.svg}`} role="img" aria-label={`Sample ${n(size)}: margin plus or minus ${m1(size)} points`}>
        <rect x={x(50 - mg)} y={8} width={x(50 + mg) - x(50 - mg)} height={164} className={s.band} />
        {!locked &&
          [BASE, DOUBLE]
            .filter((v) => visited.includes(v) && v !== size)
            .flatMap((v) => [-1, 1].map((sg) => (
              <line key={`${v}${sg}`} x1={x(50 + sg * margin(v))} y1={8} x2={x(50 + sg * margin(v))} y2={172} className={s.ghost} />
            )))}
        {!locked &&
          [BASE, DOUBLE]
            .filter((v) => visited.includes(v) && v !== size)
            .map((v) => (
              <text key={`l${v}`} x={x(50 + (v === BASE ? 1 : -1) * margin(v))} y={6} textAnchor="middle" className={s.tick}>
                {n(v)}
              </text>
            ))}
        <line x1={x(50)} y1={4} x2={x(50)} y2={176} className={s.truth} />
        {res.map((r, i) => (
          <circle key={i} cx={x(Math.max(LO, Math.min(HI, r)))} cy={14 + (i % ROWS) * 8} r={3} className={Math.abs(r - 50) <= mg ? s.dotIn : s.dotOut} />
        ))}
        {[40, 45, 50, 55, 60].map((t) => (
          <text key={t} x={x(t)} y={190} textAnchor="middle" className={s.tick}>
            {t}%
          </text>
        ))}
      </svg>
      <Row>
        <Slider
          label="People polled"
          value={idx}
          min={0}
          max={SIZES.length - 1}
          disabled={locked}
          format={(i) => n(SIZES[i])}
          onChange={(i) => go(i, false)}
        />
      </Row>
      <Row>
        <Control disabled={locked || idx >= SIZES.length - 1} onClick={() => go(idx + 1, true)}>
          Double the people
        </Control>
      </Row>
      <Row>
        <Readout label="Margin of error" value={`±${m1(size)} points`} />
        <Readout label="Polls inside band" value={`${inn} of ${POLLS}`} />
      </Row>
    </div>
  );
}

export default function HalveTheMarginCost({ slug }: { slug: string }) {
  const [idx, setIdx] = useState(START);

  return (
    <Lesson
      slug={slug}
      predict={{
        question: `Your poll of ${n(BASE)} people comes back at plus or minus ${m1(BASE)} points. Your editor wants about ${m1(QUAD)}. How many people must you poll?`,
        options: [n(DOUBLE), n(QUAD), n(BASE * 8)],
        answer: 1,
      }}
      exploreHint={`Slide from ${n(BASE)} to ${n(DOUBLE)}, then stop at ${n(QUAD)} and compare the bands.`}
      minInteractions={MILESTONES.length}
      reveal={() => (
        <>
          <p>
            Doubling to {n(DOUBLE)} people only took the margin from ±{m1(BASE)} to ±{m1(DOUBLE)} points. It took{" "}
            <strong>{n(QUAD)}</strong>, four times as many, to reach ±{m1(QUAD)}: half as wide as the dashed {n(BASE)}{" "}
            band.
          </p>
          <p>
            The margin shrinks with the square root of the sample size, so half the error costs four times the people.
          </p>
          <p className="muted">The margin covers only random sampling luck: not people who refuse to answer or a biased list.</p>
        </>
      )}
    >
      {({ locked, interact }) => <Stage locked={locked} interact={interact} idx={idx} setIdx={setIdx} />}
    </Lesson>
  );
}
