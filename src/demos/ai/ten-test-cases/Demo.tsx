"use client";

// A test score is a noisy measurement. The model is right on each fresh case with
// probability 0.8. One "test" draws `size` cases and records how many it got right.
// At size 10, P(6 or fewer right) = 12.1% (Binomial(10, 0.8)), about 1 in 8; the spread
// (standard deviation) is 12.6 points at 10 cases and 1.3 points at 1,000.
// Draws come from mulberry32 seed 1, untuned, restarted when the test size changes.

import { useRef, useState } from "react";
import { Lesson } from "@/kit/Lesson";
import { Control, Readout, Row } from "@/kit/controls";
import { useMilestones } from "@/kit/milestones";
import { mulberry32 } from "@/kit/random";
import s from "./styles.module.css";

// MODEL START
const TRUE_ACC = 0.8;
const SEED = 1; // untuned
const SIZES = [10, 100, 1000] as const;
const LOW = 0.6; // "6 or fewer right out of 10", i.e. a score of 60% or less
const MANY = 100; // runs at size 10 before the reveal unlocks

/** One test: how many of `size` fresh cases the model gets right. */
function runTest(rng: () => number, size: number) {
  let right = 0;
  for (let i = 0; i < size; i++) if (rng() < TRUE_ACC) right++;
  return right;
}

/** Exact P(X <= k) for X ~ Binomial(n, p). */
function binomCdf(n: number, p: number, k: number) {
  let term = Math.pow(1 - p, n);
  let sum = term;
  for (let i = 1; i <= k; i++) {
    term *= ((n - i + 1) / i) * (p / (1 - p));
    sum += term;
  }
  return sum;
}
const spreadPts = (n: number) => 100 * Math.sqrt((TRUE_ACC * (1 - TRUE_ACC)) / n);
// MODEL END

const P_LOW_10 = binomCdf(10, TRUE_ACC, 6);

// Histogram geometry: scores 30%..100% across x = 26..300.
const X0 = 26;
const X1 = 300;
const BASE = 160;
const H = 118;
/** x of a score; bins are `width` points wide and the axis runs 30 .. 100 + width. */
const scaleX = (width: number) => (pct: number) => X0 + ((pct - 30) / (70 + width)) * (X1 - X0);

export default function TenTestCases({ slug }: { slug: string }) {
  const [size, setSize] = useState<number>(10);
  // Each test size keeps its own runs and its own seeded stream, so switching never erases anything.
  const [runs, setRuns] = useState<Record<number, number[]>>({ 10: [], 100: [], 1000: [] });
  const rngs = useRef<Record<number, () => number>>({});
  const interactRef = useRef<() => void>(() => {});
  const { reach } = useMilestones(() => interactRef.current(), ["many-at-10", "big-tests"]);

  const scores = runs[size];
  const ten = runs[10];
  const add = (n: number, k: number) => {
    rngs.current[n] = rngs.current[n] ?? mulberry32(SEED);
    const next = [...runs[n]];
    for (let i = 0; i < k; i++) next.push(runTest(rngs.current[n], n));
    setRuns({ ...runs, [n]: next });
    if (n === 10 && next.length >= MANY) reach("many-at-10");
    if (n === 1000 && next.length >= MANY) reach("big-tests");
  };
  const run = (k: number) => add(size, k);
  // Choosing a bigger test also runs 100 of them, so the narrower histogram appears at once.
  const changeSize = (n: number) => {
    setSize(n);
    if (runs[n].length === 0 && n !== 10) add(n, MANY);
  };
  const tenLow = ten.filter((r) => r <= 6).length;
  const sdOf = (xs: number[], n: number) => {
    const pts = xs.map((r) => (100 * r) / n);
    const m = pts.reduce((a, b) => a + b, 0) / pts.length;
    return Math.sqrt(pts.reduce((a, b) => a + (b - m) ** 2, 0) / pts.length);
  };

  // Bins: one per possible count at size 10 (10% wide), 1% wide otherwise.
  const width = size === 10 ? 10 : 1;
  const sx = scaleX(width);
  const mid = (p: number) => sx(p + width / 2);
  const bins = new Map<number, number>();
  for (const r of scores) {
    const pct = Math.max(30, Math.floor(((100 * r) / size) / width) * width);
    bins.set(pct, (bins.get(pct) ?? 0) + 1);
  }
  const maxBin = Math.max(1, ...bins.values());
  const low = scores.filter((r) => r / size <= LOW + 1e-9).length;

  return (
    <Lesson
      slug={slug}
      predict={{
        question: "A model is truly right 80% of the time. You test it on 10 fresh cases. How often will you see 6 or fewer right?",
        options: ["Almost never", "About 1 time in 8", "About half the time"],
        answer: 1,
      }}
      exploreHint="Run the 10-case test 100 times. Then press 1,000 cases to see the same model tested bigger."
      minInteractions={2}
      reveal={() => (
        <>
          <p>
            The model never changed: it is right 80% of the time. Yet in your tests of 10, scores of 60% or less came up{" "}
            {ten.length ? (
              <>
                <strong>
                  {tenLow} times in {ten.length}
                </strong>{" "}
                ({((100 * tenLow) / ten.length).toFixed(0)}%)
              </>
            ) : (
              "again and again"
            )}
            . The exact chance is <strong>{(100 * P_LOW_10).toFixed(1)}%</strong>, about 1 in 8.
          </p>
          <p>
            A score on a handful of cases is itself a noisy measurement. At 10 cases it typically wanders about{" "}
            {spreadPts(10).toFixed(1)} points either way; at 1,000 cases about {spreadPts(1000).toFixed(1)}
            {runs[1000].length >= 2 && <> (your 1,000-case tests: ±{sdOf(runs[1000], 1000).toFixed(1)})</>}. In this toy,
            more held-out cases shrink the noise: the spread falls as 1/√n.
          </p>
        </>
      )}
    >
      {({ locked, interact }) => {
        interactRef.current = interact;
        return (
          <div className={s.wrap}>
            <svg viewBox="0 0 320 186" className="stage-svg" role="img" aria-label={`${scores.length} tests of ${size} cases`}>
              <text x={160} y={14} textAnchor="middle" className={s.small} fill="var(--muted)">
                Each bar: how many tests got that score. Truly right: 80%
              </text>
              <rect x={X0} y={BASE - H - 4} width={sx(60 + width) - X0} height={H + 4} fill="var(--bad)" opacity={0.05} stroke="var(--bad)" strokeDasharray="2 3" strokeWidth={0.8} />
              <line x1={X0} y1={BASE} x2={X1} y2={BASE} stroke="var(--line)" strokeWidth={2} />
              {!locked && scores.length === 0 && (
                <text x={160} y={BASE - 60} textAnchor="middle" className={s.label} fill="var(--muted)">
                  No tests yet at {size} cases: press Run
                </text>
              )}
              <line x1={mid(80)} y1={BASE - H - 6} x2={mid(80)} y2={BASE} stroke="var(--fg)" strokeDasharray="3 3" />
              {[...bins.entries()].map(([pct, c]) => {
                const h = (c / maxBin) * H;
                const w = sx(pct + width) - sx(pct);
                return (
                  <rect
                    key={pct}
                    x={sx(pct) + (w > 4 ? 1 : 0)}
                    y={BASE - h}
                    width={Math.max(1.5, w - (w > 4 ? 2 : 0))}
                    height={h}
                    fill={pct <= 60 ? "var(--bad)" : "var(--domain)"}
                  />
                );
              })}
              {[30, 40, 50, 60, 70, 80, 90, 100].map((p) => (
                <text key={p} x={mid(p)} y={BASE + 14} textAnchor="middle" className={s.tiny} fill="var(--muted)">
                  {p === 30 ? "≤30" : p}%
                </text>
              ))}
              <text x={X0 + 2} y={BASE + 26} className={s.tiny} fill="var(--bad)">
                red: 60% or less
              </text>
              <text x={X1} y={BASE + 26} textAnchor="end" className={s.tiny} fill="var(--muted)">
                score on a test of {size}
              </text>
            </svg>
            <Row>
              <Control disabled={locked} onClick={() => run(1)}>
                Run 1 test
              </Control>
              <Control disabled={locked} onClick={() => run(100)}>
                Run 100 tests
              </Control>
              <Readout label="Tests run" value={scores.length} />
              <Readout label="60% or less" value={scores.length ? `${low} (${((100 * low) / scores.length).toFixed(0)}%)` : "–"} />
              <Readout label="Spread of scores" value={scores.length >= 2 ? `±${sdOf(scores, size).toFixed(1)} pts` : "–"} />
            </Row>
            <Row>
              <span className={s.small}>Cases per test:</span>
              {SIZES.map((n) => (
                <Control
                  key={n}
                  className={size === n ? "active" : ""}
                  aria-pressed={size === n}
                  disabled={locked || size === n}
                  onClick={() => changeSize(n)}
                >
                  {n.toLocaleString("en-US")}
                </Control>
              ))}
            </Row>
          </div>
        );
      }}
    </Lesson>
  );
}
