"use client";

// Heavy tails. 30 independent runs of each kind; each dot is one run's average after n draws.
// Die dots collapse onto 3.5 as n grows. Cauchy dots stay as spread out at 10,000 draws as at 1.
// Key state: the learner has seen the dots at 1 draw and at 10,000 draws (same dots, same axis).
// Every number in the reveal is computed from dots(), the function that draws the stage (seed 1853, untuned).

import { useState } from "react";
import { Lesson } from "@/kit/Lesson";
import { useMilestones } from "@/kit/milestones";
import { Control, Readout, Row } from "@/kit/controls";
import { CHECK, RUNS, cauchyTail, dots } from "./model";
import s from "./styles.module.css";

const MILESTONES = ["one-draw", "ten-thousand"] as const;
const fmt = (n: number) => n.toLocaleString("en-US");
const span = (v: number[]) => Math.max(...v) - Math.min(...v);
const beyond = (v: number[]) => v.filter((x) => Math.abs(x) > 1).length;
const LAST = CHECK.length - 1;

const W = 340;
const H = 150;
const L = 14;
const R = 14;
const XMIN = -6;
const XMAX = 10;
const sx = (v: number) => L + ((Math.max(XMIN, Math.min(XMAX, v)) - XMIN) / (XMAX - XMIN)) * (W - L - R);
const AXIS = [-5, 0, 3.5, 10];

function Dots30({ vals, y, cls }: { vals: number[]; y: number; cls: string }) {
  return (
    <>
      {vals.map((v, i) => (
        <circle
          key={i}
          cx={sx(v)}
          cy={y + (i % 5) * 5 - 10}
          r={3.2}
          className={v < XMIN || v > XMAX ? s.edge : cls}
        />
      ))}
    </>
  );
}

function Stage({ locked, interact }: { locked: boolean; interact: () => void }) {
  const { reach } = useMilestones(interact, MILESTONES);
  const [k, setK] = useState(-1);
  const d = dots();
  const pick = (i: number) => {
    setK(i);
    if (i === 0) reach("one-draw");
    if (i === LAST) reach("ten-thousand");
  };
  const show = !locked && k >= 0;
  return (
    <div className={s.wrap}>
      <svg
        viewBox={`0 0 ${W} ${H}`}
        className={`stage-svg ${s.svg}`}
        role="img"
        aria-label={show ? `${RUNS} averages of ${fmt(CHECK[k])} draws` : "Empty number line"}
      >
        {AXIS.map((v) => (
          <g key={v}>
            <line x1={sx(v)} x2={sx(v)} y1={14} y2={H - 22} className={v === 3.5 ? s.ref : v === 0 ? s.zero : s.grid} />
            <text x={sx(v)} y={H - 8} textAnchor="middle" className={s.tick}>
              {v}
            </text>
          </g>
        ))}
        <text x={L} y={12} className={s.dieLabel}>
          die averages
        </text>
        <text x={L} y={82} className={s.cauchyLabel}>
          Cauchy averages
        </text>
        {show && <Dots30 vals={d.die[k]} y={42} cls={s.die} />}
        {show && <Dots30 vals={d.cau[k]} y={112} cls={s.cauchy} />}
      </svg>
      <p className={s.chip}>
        {show
          ? `Each dot averages ${fmt(CHECK[k])} draw${k === 0 ? "" : "s"}. Hollow: off the chart.`
          : "Each dot: one run's average. Cauchy: rare, enormous draws."}
      </p>
      <Row>
        {CHECK.map((n, i) => (
          <Control key={n} disabled={locked} onClick={() => pick(i)}>
            {n === 1 ? "1 draw" : fmt(n)}
          </Control>
        ))}
      </Row>
      <Row>
        <Readout label="Die dots span" value={show ? span(d.die[k]).toFixed(2) : "?"} />
        <Readout label="Cauchy beyond ±1" value={show ? `${beyond(d.cau[k])} of ${RUNS}` : "?"} />
      </Row>
    </div>
  );
}

export default function AverageNeverSettles({ slug }: { slug: string }) {
  const d = dots();
  const dieSpan1 = span(d.die[0]);
  const dieSpanBig = span(d.die[LAST]);
  const b1 = beyond(d.cau[0]);
  const bBig = beyond(d.cau[LAST]);
  let far = 0;
  d.cau[LAST].forEach((v, i) => {
    if (Math.abs(v) > Math.abs(d.cau[LAST][far])) far = i;
  });
  const farVal = d.cau[LAST][far];
  const farBig = d.big[far];

  return (
    <Lesson
      slug={slug}
      predict={{
        question:
          "Averaging more die rolls squeezes the average onto 3.5. Now average numbers where a rare draw can be enormous (a Cauchy distribution). With more draws, the average:",
        options: ["Squeezes in too, just more slowly", "Stays as spread out as one draw", "Drifts steadily to zero"],
        answer: 1,
      }}
      exploreHint="Compare the dots at 1 draw with the dots at 10,000."
      minInteractions={MILESTONES.length}
      reveal={() => (
        <>
          <p>
            Die dots: spread {dieSpan1.toFixed(2)} at 1 draw, {dieSpanBig.toFixed(2)} at {fmt(CHECK[LAST])}: squeezed onto
            3.5. Cauchy dots: {b1} of {RUNS} beyond ±1 at 1 draw, {bBig} of {RUNS} at {fmt(CHECK[LAST])}. They did{" "}
            <strong>not narrow</strong>.
          </p>
          <p>
            Why: the farthest Cauchy dot ({farVal.toFixed(1)}) contains one draw of size {fmt(Math.round(farBig))}. Even
            divided by {fmt(CHECK[LAST])}, that single draw moves the average by {(farBig / CHECK[LAST]).toFixed(1)}.
          </p>
          <p className="muted">
            In theory, the average of any number of Cauchy draws is as spread out as one draw: beyond ±1 half the time (
            {Math.round(cauchyTail(1) * 100)}%). These 30 dots are one seeded batch, not the rule.
          </p>
        </>
      )}
    >
      {({ locked, interact }) => <Stage locked={locked} interact={interact} />}
    </Lesson>
  );
}
