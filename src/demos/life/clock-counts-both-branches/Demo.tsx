"use client";

// Molecular clock toy: two species split T million years ago. Each line gains changes at a made-up
// rate of 0.1% of letters per million years (one dot per million years = 0.1%). The difference
// between the species is the dots on BOTH branches: 2 x rate x T. Counted in tenths of a percent
// (integers) to avoid float noise. Constant rate, no letter changed twice.

import { useState } from "react";
import { Lesson } from "@/kit/Lesson";
import { Control, Row, Slider } from "@/kit/controls";
import { Milestones } from "@/kit/milestones";
import s from "./styles.module.css";

const RATE = 1; // tenths of a percent per million years, per line
const OBS = 12; // observed difference, tenths of a percent (1.2%)
const Q_T = (OBS / (2 * RATE)); // split time that matches, 6
const MAXT = 12;
const PRESETS = [3, 6, 12, 9];
const diff = (t: number) => 2 * RATE * t; // tenths of a percent
const pct = (tenths: number) => (tenths / 10).toFixed(1) + "%";

const W = 320, H = 190, TOP = 22, TIP = 168, X0 = 105, X1 = 215, XF = 160;
const yOf = (t: number) => TIP - (t * (TIP - TOP)) / MAXT;

function Stage({ locked, t, setT }: { locked: boolean; t: number; setT: (t: number) => void }) {
  const fy = yOf(t);
  const dots = (xt: number) =>
    Array.from({ length: t }, (_, k) => {
      const f = (k + 0.5) / t;
      return { x: XF + (xt - XF) * f, y: fy + (TIP - fy) * f };
    });
  const msg = locked
    ? `Made-up clock: each line changes 0.1% of its letters per million years. The two species differ at ${pct(OBS)}.`
    : `Split ${t} million years ago: ${t} + ${t} changes × 0.1% = ${pct(diff(t))} apart.${diff(t) === OBS ? " Matches the observed 1.2%." : ` Observed: ${pct(OBS)}.`}`;
  return (
    <div className={s.wrap}>
      <svg viewBox={`0 0 ${W} ${H}`} className={`stage-svg ${s.svg}`} role="img" aria-label={msg}>
        {[0, 3, 6, 9, 12].map((m) => (
          <g key={m}>
            <line x1={34} x2={W - 8} y1={yOf(m)} y2={yOf(m)} className={s.grid} />
            <text x={30} y={yOf(m) + 3} textAnchor="end" className={s.axis}>{m}</text>
          </g>
        ))}
        <text x={34} y={12} className={s.axis}>million years ago</text>
        {!locked && (
          <>
            <line x1={XF} y1={fy} x2={X0} y2={TIP} className={s.branch} />
            <line x1={XF} y1={fy} x2={X1} y2={TIP} className={s.branch} />
            <line x1={XF} y1={fy} x2={XF} y2={fy - 10} className={s.branch} />
            {dots(X0).map((d, i) => <circle key={`a${i}`} cx={d.x} cy={d.y} r={3.4} className={s.dot} />)}
            {dots(X1).map((d, i) => <circle key={`b${i}`} cx={d.x} cy={d.y} r={3.4} className={s.dot} />)}
          </>
        )}
        {locked && (
          <>
            <line x1={XF} y1={TOP + 20} x2={X0} y2={TIP} className={s.branch} />
            <line x1={XF} y1={TOP + 20} x2={X1} y2={TIP} className={s.branch} />
          </>
        )}
        <text x={X0} y={H - 6} textAnchor="middle" className={s.axis}>species A</text>
        <text x={X1} y={H - 6} textAnchor="middle" className={s.axis}>species B</text>
      </svg>
      <p className={s.msg} aria-live="polite">{msg}</p>
      <Row>
        {PRESETS.map((p) => (
          <Control key={p} className={t === p ? "active" : ""} disabled={locked || t === p} onClick={() => setT(p)}>
            {p} million
          </Control>
        ))}
      </Row>
      <Slider label="Split, million years ago" value={t} min={1} max={MAXT} step={1} disabled={locked} onChange={setT} />
    </div>
  );
}

export default function ClockCountsBothBranches({ slug }: { slug: string }) {
  const [t, setT] = useState(1);
  const [seen, setSeen] = useState<number[]>([]);
  return (
    <Lesson
      slug={slug}
      predict={{
        question: `Two species differ at ${pct(OBS)} of their DNA letters. In this toy, each line changes at 0.1% per million years. When did they split?`,
        options: ["3 million years ago", "6 million years ago", "12 million years ago"],
        answer: 1,
      }}
      exploreHint={`Move the split back in time until the stage matches ${pct(OBS)}.`}
      minInteractions={1}
      reveal={() => {
        const others = seen.filter((x) => x !== Q_T && PRESETS.includes(x)).sort((a, b) => a - b);
        return (
          <>
            <p>
              You found it: a split {Q_T} million years ago puts {Q_T} changes on each branch, {2 * Q_T} in all, <strong>{pct(diff(Q_T))}</strong>.
              {others.length ? ` Other splits you tried: ${others.map((x) => `${x} gave ${pct(diff(x))}`).join("; ")}.` : ""}
            </p>
            <p>
              The two species have each been changing since the split, so the difference is counted on both branches: 2 × 0.1% × time. If one line had gained it all, the answer would be {OBS / RATE} million, twice as old. Toy clock: constant, made-up rate, no letter changed twice.
            </p>
          </>
        );
      }}
    >
      {({ locked, interact }) => (
        <Milestones interact={interact} names={["matches"]}>
          {(reach) => (
            <Stage
              locked={locked}
              t={t}
              setT={(v) => {
                setT(v);
                setSeen((x) => (x.includes(v) ? x : [...x, v]));
                if (diff(v) === OBS) reach("matches");
              }}
            />
          )}
        </Milestones>
      )}
    </Lesson>
  );
}
