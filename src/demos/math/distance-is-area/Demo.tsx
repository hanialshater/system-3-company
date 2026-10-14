"use client";

// Distance is area. Speed rises steadily from 0 to VMAX m/s over T s (model: constant
// acceleration). Strips (1 to 20) cut time into equal slices; each bar uses the speed at the
// end of its slice, so the bars' area is a right sum, 100 (n + 1) / n m, which overshoots and
// closes in on the triangle under the line, 1/2 x T x VMAX = 100 m.
// Key state: more than two strips seen, then the triangle shown.

import { Lesson, type StageContext } from "@/kit/Lesson";
import { Control, Readout, Row, Slider } from "@/kit/controls";
import { useMilestones } from "@/kit/milestones";
import { useState } from "react";
import s from "./styles.module.css";

const T = 10; // s
const VMAX = 20; // m/s
const EXACT = 0.5 * T * VMAX;
const MILESTONES = ["more-strips", "triangle"] as const;

const W = 320;
const H = 200;
const L = 34;
const R = 12;
const TOPY = 26;
const BASE = H - 26;
const px = (t: number) => L + (t / T) * (W - L - R);
const py = (v: number) => BASE - (v / VMAX) * (BASE - TOPY);
const speed = (t: number) => (VMAX / T) * t;
const rightSum = (n: number) => Array.from({ length: n }, (_, k) => (T / n) * speed(((k + 1) * T) / n)).reduce((a, b) => a + b, 0);
const m = (v: number) => `${Math.round(v * 10) / 10} m`;

export default function DistanceIsArea({ slug }: { slug: string }) {
  const [n, setN] = useState(1);
  const [tri, setTri] = useState(false);
  const [seen, setSeen] = useState({ lo: 1, hi: 1 }); // fewest and most strips the learner tried
  const setStrips = (v: number) => {
    setN(v);
    setSeen((p) => ({ lo: Math.min(p.lo, v), hi: Math.max(p.hi, v) }));
  };

  return (
    <Lesson
      slug={slug}
      predict={{
        question: `A car speeds up steadily from 0 to ${VMAX} m/s over ${T} s. How far does it go?`,
        options: [`${VMAX * T} m`, `${EXACT} m`, `${VMAX} m`],
        answer: 1,
      }}
      exploreHint="Cut time into more strips, then show the triangle."
      minInteractions={MILESTONES.length}
      reveal={() => (
        <>
          <p>
            <strong>{EXACT} m.</strong> Each strip is speed × a short time, which is metres: a small distance. Adding
            strips adds distances.{" "}
            {seen.hi > seen.lo
              ? `You saw ${seen.lo} strip${seen.lo === 1 ? "" : "s"} give ${m(rightSum(seen.lo))} and ${seen.hi} give ${m(rightSum(seen.hi))}, each bar poking a little above the line.`
              : `You saw ${seen.lo} strip${seen.lo === 1 ? "" : "s"} give ${m(rightSum(seen.lo))}.`}
          </p>
          <p>
            The thinner the strips, the closer they get to the triangle under the speed line: ½ × {T} s × {VMAX} m/s ={" "}
            {EXACT} m, the same as the average speed {VMAX / 2} m/s for {T} s. Distance travelled is the area under the
            speed graph.
          </p>
        </>
      )}
    >
      {(ctx) => <Stage {...ctx} n={n} setN={setStrips} tri={tri} setTri={setTri} />}
    </Lesson>
  );
}

function Stage({
  locked,
  interact,
  n,
  setN,
  tri,
  setTri,
}: StageContext & { n: number; setN: (v: number) => void; tri: boolean; setTri: (v: boolean) => void }) {
  const { reach } = useMilestones(interact, MILESTONES);
  const area = rightSum(n);
  const dt = T / n;

  const strips = (v: number) => {
    setN(v);
    if (v >= 3) reach("more-strips");
  };
  const toggle = () => {
    setTri(!tri);
    if (!tri) reach("triangle");
  };

  return (
    <div className={s.wrap}>
      <svg viewBox={`0 0 ${W} ${H}`} className={`stage-svg ${s.fit}`} role="img" aria-label={`Speed rising from 0 to ${VMAX} metres per second; ${n} strips`}>
        <rect x={L + 4} y={4} width={150} height={17} rx={8} className={s.chip} />
        <text x={L + 79} y={16} textAnchor="middle" className={s.chipText}>
          Model: steady speed-up
        </text>
        {[0, 10, 20].map((v) => (
          <g key={v}>
            <line x1={L} y1={py(v)} x2={W - R} y2={py(v)} className={s.grid} />
            <text x={L - 5} y={py(v) + 4} textAnchor="end" className={s.tick}>
              {v}
            </text>
          </g>
        ))}
        {[0, 5, 10].map((t) => (
          <text key={t} x={px(t)} y={BASE + 14} textAnchor="middle" className={s.tick}>
            {t}
          </text>
        ))}
        <text x={W - R} y={BASE + 24} textAnchor="end" className={s.axis}>
          time (s)
        </text>
        <text x={L - 30} y={TOPY - 12} className={s.axis}>
          m/s
        </text>
        {!locked &&
          Array.from({ length: n }, (_, k) => {
            const v = speed((k + 1) * dt);
            return <rect key={k} x={px(k * dt)} y={py(v)} width={px(dt) - px(0)} height={BASE - py(v)} className={s.bar} />;
          })}
        {tri && <polygon points={`${px(0)},${py(0)} ${px(T)},${py(0)} ${px(T)},${py(VMAX)}`} className={s.tri} />}
        <line x1={px(0)} y1={py(0)} x2={px(T)} y2={py(VMAX)} className={s.speed} />
        <line x1={L} y1={BASE} x2={W - R} y2={BASE} className={s.axisLine} />
        {tri && (
          <text x={px(T * 0.68)} y={py(VMAX * 0.2)} textAnchor="middle" className={s.triText}>
            {EXACT} m
          </text>
        )}
      </svg>

      <p className={s.caption} aria-live="polite">
        {locked
          ? "Make a prediction to start."
          : tri
            ? `Triangle: ½ × ${T} s × ${VMAX} m/s = ${EXACT} m. Bars: ${m(area)}.`
            : n === 1
              ? `1 strip at top speed: ${VMAX} m/s × ${T} s = ${m(area)}. Too much?`
              : `${n} strips. The first is ${Math.round(speed(dt) * 100) / 100} m/s × ${Math.round(dt * 100) / 100} s ≈ ${m(speed(dt) * dt)}. Bars poke above the line.`}
      </p>

      <Slider label="Strips" value={n} min={1} max={20} disabled={locked} onChange={strips} />
      <Row>
        <Control disabled={locked} onClick={toggle} className={tri ? "active" : ""} aria-pressed={tri}>
          {tri ? "Hide the triangle" : "Show the triangle"}
        </Control>
        <Readout label="Strips add up to" value={locked ? "?" : m(area)} />
      </Row>
    </div>
  );
}
