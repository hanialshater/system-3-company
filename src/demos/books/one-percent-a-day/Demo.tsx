"use client";

// One percent a day (Atomic Habits, Clear 2018; brief company/domains/briefs/books.md #2).
// Compounded: skill(day) = (1 + g)^day, so at g = 1% day 365 gives 1.01^365 = 37.78 times the start.
// Added (no compounding): 1 + g × day, 4.65 at 1%. Practice curve: an illustrative power law,
// skill(day) = day^0.4 (day 1 = 1), 365^0.4 = 10.59; day 30 is 3.90, about 37% of the year's level.
// Learner r10 (W-840): the reveal no longer quotes the made-up curve's 10.6x as if measured; the stage caption is plain words.
// The practice curve is the lesson's illustration, not fitted to any data; it does not depend on g.
// Controls (DOM order): daily-gain slider (0.1% to 2%, starts at 0.5%), [Add practice curve],
// [Compound at 1%] (the question's own case, last). Milestones: "practice" (practice curve drawn,
// 10.6x recorded) and "compound" (compounded at exactly 1%: 37.8x recorded). The practice curve stays
// drawn once added, so both quoted states are on the chart when the reveal opens.

import { useState } from "react";
import { Lesson } from "@/kit/Lesson";
import { Control, Readout, Row, Slider } from "@/kit/controls";
import { Milestones } from "@/kit/milestones";
import s from "./styles.module.css";

const DAYS = 365;
const EXP = 0.4;
const MILESTONES = ["practice", "compound"] as const;

const compound = (g: number, d: number) => Math.pow(1 + g / 100, d);
const added = (g: number, d: number) => 1 + (g / 100) * d;
const practice = (d: number) => Math.pow(Math.max(1, d), EXP);
const fmt = (v: number) => (v >= 100 ? Math.round(v).toLocaleString("en-US") : v.toFixed(1));

// Geometry (viewBox 320 × 170).
const XL = 36;
const XR = 288;
const YT = 12;
const YB = 146;
const px = (d: number) => XL + (d / DAYS) * (XR - XL);

function niceMax(v: number) {
  const steps = [5, 10, 20, 40, 50, 100, 200, 500, 1000, 1500];
  return steps.find((x) => x >= v) ?? Math.ceil(v / 500) * 500;
}

const SAMPLE = Array.from({ length: 74 }, (_, i) => Math.min(DAYS, i * 5));

export default function OnePercentADay({ slug }: { slug: string }) {
  const [g, setG] = useState(0.5);
  const [showPractice, setShowPractice] = useState(false);
  const [rec, setRec] = useState<{ compound?: number; practice?: number }>({});
  const end = compound(g, DAYS);
  const pEnd = practice(DAYS);
  const ymax = niceMax(Math.max(end, showPractice ? pEnd : 0, added(g, DAYS)));
  const py = (v: number) => YB - (Math.min(v, ymax) / ymax) * (YB - YT);
  const path = (f: (d: number) => number) => SAMPLE.map((d, i) => `${i ? "L" : "M"}${px(d).toFixed(1)},${py(f(d)).toFixed(1)}`).join(" ");

  return (
    <Lesson
      slug={slug}
      predict={{
        question: "Get 1% better every day, each day building on the last. After one year, how much better are you?",
        options: ["About 4.7 times", "About 37.8 times", "About 365 times"],
        answer: 1,
      }}
      exploreHint="Slide the daily gain, add the practice curve, then set 1% a day."
      minInteractions={MILESTONES.length}
      reveal={() => (
        <>
          <p>
            At 1% a day the compounded curve reached <strong>{fmt(rec.compound ?? 37.78)}×</strong>, not 4.7×. Gains on gains add up
            fast, and that arithmetic is what <em>Atomic Habits</em> uses to argue that tiny habits matter.
          </p>
          <p>
            Does it hold up as a picture of learning? Mostly not: practice studies find gains come fast at first and then slow.
            The practice curve here is made up, not data. Small habits can still matter. They just don&apos;t
            compound at a fixed rate.
          </p>
        </>
      )}
    >
      {({ locked, interact }) => (
        <Milestones interact={interact} names={MILESTONES}>
          {(reach) => {
            const atOne = Math.abs(g - 1) < 1e-9;
            const setOne = (v: number) => {
              setG(v);
              if (Math.abs(v - 1) > 1e-9) return;
              const c = compound(1, DAYS);
              setRec((x) => (x.compound === undefined ? { ...x, compound: c } : x));
              reach("compound");
            };
            const ticks = [0, ymax / 2, ymax];
            return (
              <div className={s.wrap}>
                <p className={s.chip}>Practice curve: made up, rises fast, then slows</p>
                <Row>
                  <Readout label="Compounded, day 365" value={locked ? "?" : `${fmt(end)}×`} />
                  <Readout label="Practice curve" value={locked || !showPractice ? "–" : `${fmt(pEnd)}×`} />
                </Row>
                <svg
                  viewBox="0 0 330 170"
                  className="stage-svg"
                  role="img"
                  aria-label={
                    locked
                      ? "Chart of skill over 365 days"
                      : `Compounded at ${g.toFixed(1)}% a day: ${fmt(end)} times after a year${showPractice ? `; practice curve ${fmt(pEnd)} times` : ""}`
                  }
                >
                  <line x1={XL} y1={YB} x2={XR} y2={YB} className={s.edge} />
                  <line x1={XL} y1={YT} x2={XL} y2={YB} className={s.edge} />
                  {!locked &&
                    ticks.map((t) => (
                      <g key={t}>
                        <line x1={XL} y1={py(t)} x2={XR} y2={py(t)} className={s.grid} />
                        <text x={XL - 4} y={py(t) + 4} textAnchor="end" className={s.axis}>
                          {fmt(t).replace(".0", "")}×
                        </text>
                      </g>
                    ))}
                  <text x={XL} y={YB + 16} className={s.axis}>
                    day 0
                  </text>
                  <text x={XR} y={YB + 16} textAnchor="end" className={s.axis}>
                    day 365
                  </text>
                  {!locked && (
                    <>
                      <path d={path((d) => added(g, d))} className={s.ghost} />
                      <text x={XR + 3} y={py(added(g, DAYS)) + 4} className={s.axis}>
                        {fmt(added(g, DAYS))}
                      </text>
                      {showPractice && <path d={path(practice)} className={s.practice} />}
                      {showPractice && (
                        <text x={XR + 3} y={py(pEnd) + 4} className={s.practiceLabel}>
                          {fmt(pEnd)}
                        </text>
                      )}
                      <path d={path((d) => compound(g, d))} className={s.line} />
                      <text x={XR + 3} y={Math.max(YT + 4, py(end) + 4)} className={s.value}>
                        {fmt(end)}
                      </text>
                    </>
                  )}
                </svg>
                <p className={s.legend}>
                  <span className={s.kLine}>compounded</span> <span className={s.kGhost}>no compounding</span>{" "}
                  {showPractice && <span className={s.kPractice}>practice</span>}
                </p>
                <Slider
                  label="Daily gain"
                  value={g}
                  min={0.1}
                  max={2}
                  step={0.1}
                  disabled={locked}
                  format={(v) => `${v.toFixed(1)}%`}
                  onChange={(v) => setOne(Math.round(v * 10) / 10)}
                />
                <Row>
                  <Control
                    className={showPractice ? "active" : ""}
                    disabled={locked || showPractice}
                    onClick={() => {
                      setShowPractice(true);
                      setRec((x) => (x.practice === undefined ? { ...x, practice: pEnd } : x));
                      reach("practice");
                    }}
                  >
                    Add practice curve
                  </Control>
                  <Control
                    className={atOne ? "active" : ""}
                    disabled={locked || atOne}
                    onClick={() => setOne(1)}
                  >
                    Compound at 1%
                  </Control>
                </Row>
              </div>
            );
          }}
        </Milestones>
      )}
    </Lesson>
  );
}
