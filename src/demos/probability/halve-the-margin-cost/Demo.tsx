"use client";

// Poll margin of error. A slider steps the sample size through doublings (250 ... 8,000). 100 seeded
// polls of a 50/50 population appear as dots; the shaded band is the 95% margin of error.
// Key state: 2,000 seen (margin only falls to 2.2) and 4,000 seen (1.5). The slider starts at 1,000,
// so the QA path (two right-arrow presses) visits 2,000 and then 4,000.

import { useMemo, useState } from "react";
import { Lesson } from "@/kit/Lesson";
import { useMilestones } from "@/kit/milestones";
import { Readout, Row, Slider } from "@/kit/controls";
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
  const size = SIZES[idx];
  const res = useMemo(() => polls(size), [size]);
  const mg = margin(size);
  const inn = inside(res, size);

  return (
    <div className={s.wrap}>
      <p className={s.msg}>
        {locked ? "Make a prediction to start." : "Dot: one poll. True support: 50%. Band: the margin of error; about 95% of polls land inside."}
      </p>
      <svg viewBox="0 0 360 200" className={`stage-svg ${s.svg}`} role="img" aria-label={`Sample ${n(size)}: margin plus or minus ${m1(size)} points`}>
        <rect x={x(50 - mg)} y={8} width={x(50 + mg) - x(50 - mg)} height={164} className={s.band} />
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
          onChange={(i) => {
            setIdx(i);
            if (SIZES[i] === DOUBLE) reach("at-2000");
            if (SIZES[i] === QUAD) reach("at-4000");
          }}
        />
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
        question: `A poll of ${n(BASE)} people has a margin of error of about ${m1(BASE)} points. How many people must be polled to cut it to about ${m1(QUAD)} points?`,
        options: [n(DOUBLE), n(QUAD), n(BASE * 8)],
        answer: 1,
      }}
      exploreHint={`Slide from ${n(BASE)} to ${n(DOUBLE)}, then on to ${n(QUAD)}.`}
      minInteractions={MILESTONES.length}
      reveal={() => (
        <>
          <p>
            Doubling to {n(DOUBLE)} people only took the margin from ±{m1(BASE)} to ±{m1(DOUBLE)} points. It took{" "}
            <strong>{n(QUAD)}</strong>, four times as many, to reach ±{m1(QUAD)}: the band was half as wide.
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
