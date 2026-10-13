"use client";

// Heavy tails. Two running averages on one chart: fair die rolls (settle at 3.5) and draws from
// a Cauchy distribution (a heavy-tailed toy whose rare giant values knock the average around
// forever). Five runs of each are drawn at once, so one calm run cannot pass for the rule.
// Key state: 10,000+ draws, then a second set of draws at that length.

import { useMemo, useState } from "react";
import { Lesson } from "@/kit/Lesson";
import { useMilestones } from "@/kit/milestones";
import { Control, Readout, Row } from "@/kit/controls";
import { EVERY, MAX, PER_BATCH, at, batchRuns, cauchyTail } from "./model";
import s from "./styles.module.css";

const MILESTONES = ["ten-thousand", "another"] as const;
const BIG = 10_000;
const fmt = (n: number) => n.toLocaleString("en-US");
const range = (vals: number[], d = 1) => `${Math.min(...vals).toFixed(d)} to ${Math.max(...vals).toFixed(d)}`;

const W = 340;
const H = 210;
const L = 30;
const R = 8;
const T = 10;
const B = 20;
const YMIN = -6;
const YMAX = 12;
const sx = (n: number) => L + (n / MAX) * (W - L - R);
const sy = (v: number) => T + ((YMAX - Math.max(YMIN, Math.min(YMAX, v))) / (YMAX - YMIN)) * (H - T - B);

function Stage({ locked, interact, n, setN, batch, setBatch }: {
  locked: boolean;
  interact: () => void;
  n: number;
  setN: (n: number) => void;
  batch: number;
  setBatch: (b: number) => void;
}) {
  const { reach } = useMilestones(interact, MILESTONES);
  const rs = useMemo(() => batchRuns(batch), [batch]);
  const line = (series: number[]) =>
    series
      .slice(0, n / EVERY)
      .map((v, i) => `${sx((i + 1) * EVERY).toFixed(1)},${sy(v).toFixed(1)}`)
      .join(" ");
  const add = (k: number) => {
    const next = Math.min(MAX, n + k);
    setN(next);
    if (next >= BIG) reach("ten-thousand");
  };

  return (
    <div className={s.wrap}>
      <svg viewBox={`0 0 ${W} ${H}`} className={`stage-svg ${s.svg}`} role="img" aria-label={`Running averages after ${fmt(n)} draws`}>
        {[-5, 0, 3.5, 10].map((v) => (
          <g key={v}>
            <line x1={L} x2={W - R} y1={sy(v)} y2={sy(v)} className={v === 3.5 ? s.ref : v === 0 ? s.zero : s.grid} />
            <text x={L - 4} y={sy(v) + 3.5} textAnchor="end" className={s.tick}>
              {v}
            </text>
          </g>
        ))}
        {n > 0 && rs.map((r, i) => <polyline key={`c${i}`} points={line(r.cau)} className={s.cauchy} />)}
        {n > 0 && rs.map((r, i) => <polyline key={`d${i}`} points={line(r.die)} className={s.die} />)}
        <text x={W - R} y={sy(3.5) - 5} textAnchor="end" className={s.dieLabel}>
          die
        </text>
        <text x={W - R} y={sy(-5) - 5} textAnchor="end" className={s.cauchyLabel}>
          Cauchy
        </text>
        <text x={L} y={H - 5} className={s.tick}>
          0
        </text>
        <text x={W - R} y={H - 5} textAnchor="end" className={s.tick}>
          {fmt(MAX)} draws
        </text>
      </svg>
      <p className={s.chip}>Cauchy: a toy distribution with rare, giant values</p>
      <Row>
        <Control disabled={locked || n >= MAX} onClick={() => add(1000)}>
          Add 1,000 draws
        </Control>
        <Control disabled={locked || n >= MAX} onClick={() => add(BIG)}>
          Add 10,000 draws
        </Control>
        <Control
          disabled={locked || n === 0}
          onClick={() => {
            setBatch(batch + 1);
            if (n >= BIG) reach("another");
          }}
        >
          New draws
        </Control>
      </Row>
      <Row>
        <Readout label="Draws" value={fmt(n)} />
        <Readout label={`${PER_BATCH} die averages`} value={locked || !n ? "?" : range(rs.map((r) => at(r.die, n)), 2)} />
        <Readout label={`${PER_BATCH} Cauchy averages`} value={locked || !n ? "?" : range(rs.map((r) => at(r.cau, n)))} />
      </Row>
    </div>
  );
}

export default function AverageNeverSettles({ slug }: { slug: string }) {
  const [n, setN] = useState(0);
  const [batch, setBatch] = useState(0);
  const rs = batchRuns(batch);
  const shownN = Math.max(n, EVERY);
  const dieAt = rs.map((r) => at(r.die, shownN));
  const cauAt = rs.map((r) => at(r.cau, shownN));

  return (
    <Lesson
      slug={slug}
      predict={{
        question:
          "A running average of fair die rolls settles near 3.5. A running average of draws from a Cauchy (very heavy-tailed) distribution:",
        options: ["Settles too", "Keeps jumping, no matter how many draws", "Drifts steadily to zero"],
        answer: 1,
      }}
      exploreHint="Add draws past 10,000. Then try new draws and compare."
      minInteractions={MILESTONES.length}
      reveal={() => (
        <>
          <p>
            After {fmt(shownN)} draws your {PER_BATCH} die averages all fell within {range(dieAt, 2)}: pinned at 3.5.
            Your {PER_BATCH} Cauchy averages ranged from {range(cauAt)}, and they <strong>keep jumping</strong>: now and
            then one giant draw drags a whole average away.
          </p>
          <p>
            For a Cauchy distribution the average of 10,000 draws is exactly as spread out as a single draw. Adding data
            never tames it: at any length, the average lands more than 1 away from 0 half the time
            ({Math.round(cauchyTail(1) * 100)}%).
          </p>
          <p className="muted">Any one run can look calm for a while; that is luck, not settling. New draws give new paths.</p>
        </>
      )}
    >
      {({ locked, interact }) => <Stage locked={locked} interact={interact} n={n} setN={setN} batch={batch} setBatch={setBatch} />}
    </Lesson>
  );
}
