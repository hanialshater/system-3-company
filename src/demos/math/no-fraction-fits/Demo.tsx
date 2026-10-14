"use client";

// No fraction fits. A fraction p/q equals the diagonal of a unit square (sqrt 2) only if
// p^2 = 2 q^2. The learner picks q (1..70); the stage zooms a number line onto the two perfect
// squares around 2 q^2 and marks how close the nearest comes. "Next close call" jumps to the
// next q where the miss is only 1 (1, 2, 5, 12, 29, 70: the Pell numbers). It never hits.
// Key state: three different q tried, and one close call. The reveal gives the parity proof
// and says the near misses only illustrate it.

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
const EX = near(12); // the example quoted in the reveal

const W = 320;
const H = 96;
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
        options: ["Yes, with big enough numbers", "No, never", "Only with a calculator"],
        answer: 1,
      }}
      exploreHint="Try several q, then jump to a close call."
      minInteractions={MILESTONES.length}
      reveal={() => (
        <>
          <p>
            <strong>No, never.</strong> {seen.length <= 6 ? `For q = ${seen.join(", ")}` : `In the ${seen.length} values of q you tried`}, 2 × q² never
            landed on a perfect square, and some misses were only 1 (2 × 12² = {EX.t}, {EX.p}² = {EX.p * EX.p}). Those near
            misses can look like closing in, but close is not equal; this proves it.
          </p>
          <p>
            Suppose √2 = p/q in lowest terms. Then p² = 2q², so p² is even, so p is even: p = 2k. Then 4k² = 2q², so q² =
            2k² and q is even too. Both even is not lowest terms: a contradiction. No fraction is √2.
          </p>
        </>
      )}
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
          </g>
        ))}
        {!locked && (
          <g>
            <line x1={mx} y1={LY} x2={xOf(p * p)} y2={LY} className={s.gap} />
            <circle cx={mx} cy={LY} r={6} className={s.mark} />
            <text x={Math.min(Math.max(mx, X0 + 34), X1 - 34)} y={LY - 16} textAnchor="middle" className={s.markLab}>
              2 × {q}² = {t}
            </text>
          </g>
        )}
      </svg>

      <p className={s.caption} aria-live="polite">
        {locked
          ? "Make a prediction to start."
          : off === 1
            ? `Off by 1: ${p * p} is odd and ${t} is even. Not equal.`
            : `Nearest square ${p}² = ${p * p}: off by ${off}. Not equal.`}
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
