"use client";

// No fraction fits. A fraction p/q equals the diagonal of a unit square (sqrt 2) only if
// p^2 = 2 q^2. The learner picks q (1..70); the stage zooms a number line onto the two perfect
// squares around 2 q^2 and marks how close the nearest comes. "Next close call" jumps to the
// next q where the miss is only 1 (1, 2, 5, 12, 29, 70: the Pell numbers). It never hits.
// Key state: three different q tried, and one close call.
// v3: the cause is on the stage. Every number on the line carries its count of factor 2s: a square
// p² always has an even count (p's 2s twice), 2 × q² always an odd count (q's 2s twice, plus one).
// Even never equals odd, at any q, so the close calls cannot ever close. The reveal points at the
// counts and quotes the learner's own closest call.

import { Lesson, type StageContext } from "@/kit/Lesson";
import { Control, Readout, Row, Slider } from "@/kit/controls";
import { useMilestones } from "@/kit/milestones";
import { useState } from "react";
import s from "./styles.module.css";

const QMAX = 70;
const MILESTONES = ["three-q", "close-call"] as const;

function near(q: number) {
  const t = 2 * q * q;
  const lo = Math.floor(Math.sqrt(t));
  const hi = lo + 1;
  const p = t - lo * lo <= hi * hi - t ? lo : hi;
  return { t, lo, hi, p, off: Math.abs(t - p * p) };
}
const CLOSE = Array.from({ length: QMAX }, (_, i) => i + 1).filter((q) => near(q).off === 1);
/** How many factors of 2 a whole number has. */
const twos = (n: number) => {
  let k = 0;
  while (n > 0 && n % 2 === 0) {
    n /= 2;
    k++;
  }
  return k;
};
/** The learner's closest call: smallest miss, then largest q. */
const closest = (qs: number[]) =>
  [...qs].sort((a, b) => near(a).off - near(b).off || b - a)[0];

const W = 320;
const H = 100;
const X0 = 30;
const X1 = W - 30;
const LY = 50;

export default function NoFractionFits({ slug }: { slug: string }) {
  const [q, setQ] = useState(1);
  const [seen, setSeen] = useState<number[]>([1]);

  return (
    <Lesson
      slug={slug}
      predict={{
        question: "The diagonal of a 1-by-1 square is √2. Can it be written exactly as a fraction of two whole numbers?",
        options: ["Yes, with big enough numbers", "No, never", "Yes: 99,999 / 70,710"],
        answer: 1,
      }}
      exploreHint="Try several q, then jump to a close call."
      minInteractions={MILESTONES.length}
      reveal={() => {
        const c = near(closest(seen));
        const cq = closest(seen);
        return (
          <>
            <p>
              <strong>No, never.</strong> {seen.length <= 6 ? `For q = ${seen.join(", ")}` : `In the ${seen.length} values of q you tried`},
              2 × q² never landed on a perfect square. Your closest call: 2 × {cq}² = {c.t} next to {c.p}² = {c.p * c.p}, off
              by {c.off}. Close calls keep coming, so closeness cannot settle it. The 2s can.
            </p>
            <p>
              Look at the count of 2s under each number. A square p² has each 2 of p twice, so its count is even: {c.p}² had{" "}
              {twos(c.p * c.p)}. 2 × q² has q&rsquo;s 2s twice plus one, so its count is odd: {c.t} had {twos(c.t)}. Even never
              equals odd, so no whole p and q, however big, give p² = 2 × q². No fraction is √2.
            </p>
          </>
        );
      }}
    >
      {(ctx) => <Stage {...ctx} q={q} setQ={setQ} seen={seen} setSeen={setSeen} />}
    </Lesson>
  );
}

function Stage({
  locked,
  interact,
  q,
  setQ,
  seen,
  setSeen,
}: StageContext & { q: number; setQ: (v: number) => void; seen: number[]; setSeen: (v: number[]) => void }) {
  const { reach } = useMilestones(interact, MILESTONES);
  const { t, lo, hi, p, off } = near(q);

  const go = (v: number, jumped: boolean) => {
    setQ(v);
    const next = seen.includes(v) ? seen : [...seen, v];
    setSeen(next);
    if (next.length >= 3) reach("three-q");
    if (jumped) reach("close-call");
  };
  const jump = () => go(CLOSE.find((c) => c > q) ?? CLOSE[0], true);

  const xOf = (v: number) => X0 + ((v - lo * lo) / (hi * hi - lo * lo)) * (X1 - X0);
  const mx = xOf(t);

  return (
    <div className={s.wrap}>
      <p className={s.rule}>
        If p/q = √2, squaring gives p² = 2 × q². So: is 2 × q² ever a perfect square?
      </p>
      <svg viewBox={`0 0 ${W} ${H}`} className={`stage-svg ${s.fit}`} role="img" aria-label={`2 times ${q} squared is ${t}, between ${lo} squared and ${hi} squared`}>
        <line x1={X0} y1={LY} x2={X1} y2={LY} className={s.line} />
        {[lo, hi].map((v) => (
          <g key={v}>
            <line x1={xOf(v * v)} y1={LY - 10} x2={xOf(v * v)} y2={LY + 10} className={v === p ? s.sqNear : s.sq} />
            <text x={xOf(v * v)} y={LY + 26} textAnchor={v === lo ? "start" : "end"} className={v === p ? s.labNear : s.lab}>
              {v}² = {v * v}
            </text>
            {!locked && (
              <text x={xOf(v * v)} y={LY + 41} textAnchor={v === lo ? "start" : "end"} className={s.even}>
                2s: {twos(v * v)} (even)
              </text>
            )}
          </g>
        ))}
        {!locked && (
          <g>
            <line x1={mx} y1={LY} x2={xOf(p * p)} y2={LY} className={s.gap} />
            <circle cx={mx} cy={LY} r={6} className={s.mark} />
            <text x={Math.min(Math.max(mx, X0 + 70), X1 - 70)} y={LY - 16} textAnchor="middle" className={s.markLab}>
              2 × {q}² = {t} · <tspan className={s.odd}>2s: {twos(t)} (odd)</tspan>
            </text>
          </g>
        )}
      </svg>

      <p className={s.caption} aria-live="polite">
        {locked
          ? "Make a prediction to start."
          : `Nearest square ${p}² = ${p * p}: off by ${off}. Its 2s: ${twos(p * p)}, even; ${t}'s: ${twos(t)}, odd.`}
      </p>

      <Slider label="q (bottom of the fraction)" value={q} min={1} max={QMAX} disabled={locked} onChange={(v) => go(v, false)} />
      <Row>
        <Control disabled={locked} onClick={jump}>
          Next close call
        </Control>
        <Readout label="Nearest p/q" value={locked ? "?" : `${p}/${q}`} />
        <Readout label="(p/q)², want 2" value={locked ? "?" : ((p * p) / (q * q)).toFixed(4)} />
      </Row>
    </div>
  );
}
