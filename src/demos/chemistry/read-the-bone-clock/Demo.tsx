"use client";

// Running a half-life backwards. The learner drags a bone's age; the decay curve traces
// itself only as far as they have dragged, and each time the remaining carbon-14 crosses
// a halving line (1/2, 1/4, 1/8) a pin drops with the age at that moment. Reading the
// age of a 1/8 bone is counting pins, not multiplying by 8.

import { useEffect, useRef, useState } from "react";
import { Lesson } from "@/kit/Lesson";
import { Control, Readout, Row, Slider } from "@/kit/controls";
import s from "./styles.module.css";

const T_HALF = 5700; // years, about
const MAX_AGE = 9 * T_HALF; // 51,300
const STEP = T_HALF / 10;
const W = 320;
const H = 200;
const L = 34; // left margin
const R = 10;
const TOP = 10;
const BOT = 26;
const PW = W - L - R;
const PH = H - TOP - BOT;

const frac = (age: number) => Math.pow(0.5, age / T_HALF);
const X = (age: number) => L + (age / MAX_AGE) * PW;
const Y = (f: number) => TOP + (1 - f) * PH;
const yrs = (a: number) => a.toLocaleString("en-US");

const GRID = [
  { f: 1, label: "all" },
  { f: 1 / 2, label: "1/2" },
  { f: 1 / 4, label: "1/4" },
  { f: 1 / 8, label: "1/8" },
];

function curvePath(upTo: number) {
  const n = Math.max(1, Math.round((upTo / MAX_AGE) * 120));
  const pts: string[] = [];
  for (let i = 0; i <= n; i++) {
    const a = (upTo * i) / n;
    pts.push(`${X(a).toFixed(1)} ${Y(frac(a)).toFixed(1)}`);
  }
  return `M ${pts.join(" L ")}`;
}

export default function ReadTheBoneClock({ slug }: { slug: string }) {
  const [age, setAge] = useState(0);
  const [reach, setReach] = useState(0); // oldest age the learner has dragged to
  const [auto, setAuto] = useState(false);
  const autoStep = useRef<() => boolean>(() => true);
  // "Run the clock" ages the bone in small steps up to 1/8 left, so every pin is seen dropping.
  useEffect(() => {
    if (!auto) return;
    const id = setInterval(() => {
      if (autoStep.current()) setAuto(false);
    }, 160);
    return () => clearInterval(id);
  }, [auto]);

  const f = frac(age);
  const pins = [1, 2, 3].filter((k) => reach >= k * T_HALF);
  const pct = f * 100;
  const pctText = pct >= 10 ? `${pct.toFixed(0)}%` : pct >= 1 ? `${pct.toFixed(1)}%` : `${pct.toFixed(2)}%`;

  return (
    <Lesson
      slug={slug}
      predict={{
        question:
          "On a dig, you find a bone with 1/8 of its original carbon-14. Carbon-14 is a radioactive form of carbon that slowly disappears after an animal dies. Its half-life, the time for half of it to disappear, is about 5,700 years. About how old is the bone?",
        options: ["About 5,700 years", "About 17,000 years", "About 46,000 years"],
        answer: 1,
      }}
      exploreHint="Age the bone until the carbon-14 left is down to 1/8, and watch the pins."
      minInteractions={1}
      reveal={() => (
        <>
          <p>
            You saw three pins drop on the way to 1/8: half gone at 5,700 years, a quarter left at 11,400, an eighth at <strong>17,100 years</strong>. 1/8 is
            ½ × ½ × ½, so it is three half-lives, not eight.
          </p>
          <p>
            To date a bone, count how many times you must halve to reach what is left, then multiply by the half-life.
            After about nine half-lives, roughly 50,000 years, only 1/512 is left, too little to measure well.
          </p>
          <p className="muted">46,000 years is 8 × 5,700: the &ldquo;eighth means eight&rdquo; slip.</p>
        </>
      )}
    >
      {({ locked, interact }) => {
        const goto = (v: number) => {
          setAge(v);
          setReach((r) => Math.max(r, v));
          if (v >= 3 * T_HALF && reach < 3 * T_HALF) interact(); // the reveal quotes the three pins, so they must be seen
        };
        autoStep.current = () => {
          const next = Math.min(3 * T_HALF, Math.max(age, reach) + 2 * STEP);
          goto(next);
          return next >= 3 * T_HALF;
        };
        return (
        <div className={s.wrap}>
          <div className={s.head}>
            <span className={s.big}>{pctText}</span>
            <span className="muted small">of its carbon-14 left</span>
          </div>
          <svg viewBox={`0 0 ${W} ${H}`} className={`stage-svg ${s.fit}`} role="img" aria-label={`At ${yrs(age)} years, ${pctText} of the carbon-14 is left`}>
            {(locked ? GRID.slice(0, 1) : GRID).map((g) => (
              <g key={g.label}>
                <line x1={L} x2={L + PW} y1={Y(g.f)} y2={Y(g.f)} className={s.grid} />
                <text x={L - 4} y={Y(g.f) + 3} textAnchor="end" className={s.axisLabel}>
                  {g.label}
                </text>
              </g>
            ))}
            <line x1={L} x2={L + PW} y1={Y(0)} y2={Y(0)} className={s.axis} />
            {[0, 10000, 20000, 30000, 40000, 50000].map((a) => (
              <text key={a} x={X(a)} y={H - 12} textAnchor="middle" className={s.axisLabel}>
                {a === 0 ? "0" : `${a / 1000}k`}
              </text>
            ))}
            <text x={L + PW} y={H - 1} textAnchor="end" className={s.axisLabel}>
              years
            </text>
            {/* the curve, traced only as far as the learner has dragged */}
            {reach > 0 && <path d={curvePath(reach)} className={s.curve} />}
            {pins.map((k) => (
              <g key={k}>
                <circle cx={X(k * T_HALF)} cy={Y(Math.pow(0.5, k))} r={4} className={s.pin} />
                <text x={X(k * T_HALF) + 6} y={Y(Math.pow(0.5, k)) - 6} className={s.pinLabel}>
                  {yrs(k * T_HALF)}
                </text>
              </g>
            ))}
            {/* the bone now */}
            <line x1={X(age)} x2={X(age)} y1={Y(0)} y2={Y(f)} className={s.marker} />
            <circle cx={X(age)} cy={Y(f)} r={6} className={s.now} />
            {age >= 50000 && (
              <text x={X(age) - 6} y={Y(0) - 10} textAnchor="end" className={s.pinLabel}>
                too little to measure
              </text>
            )}
          </svg>
          <Slider
            label="Age of the bone"
            value={age}
            min={0}
            max={MAX_AGE}
            step={STEP}
            disabled={locked || auto}
            format={(v) => `${yrs(v)} years`}
            onChange={goto}
          />
          <Row>
            <Control disabled={locked || auto || reach >= 3 * T_HALF} onClick={() => { setAge(0); setReach(0); setAuto(true); }}>
              Run the clock until 1/8 is left
            </Control>
          </Row>
          <Row>
            <Readout label="Half-lives passed" value={(age / T_HALF).toFixed(1)} />
          </Row>
        </div>
        );
      }}
    </Lesson>
  );
}
