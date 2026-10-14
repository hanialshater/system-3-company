"use client";

// Sensitive dependence (Big Ideas brief #6, chaos-butterfly, with the W-537 re-check lines that override the draft).
// One exact rule, the logistic map x -> 4x(1 - x), run from 0.3 and from 0.3 + gap. Two traces on one chart.
// Numbers (company/domains/briefs/checks/big-ideas-cycle1-check.mjs, re-run in node by the builder):
//   gap 0.0001: the runs first differ by more than 0.1 at step 11; gap at step 30 = 0.616.
//   gap 0.0000001 (1,000x more precise): first differ by 0.1 at step 21, so only 10 more steps.
//   1,000-step averages from 0.3 and 0.3001: 0.51 and 0.48 (the exact mean of the r = 4 map is 0.5).
// Presets (DOM order = QA order): Run 30 steps (milestone run, records 11) / 1,000x more precise: run
// (milestone precise, records 21) / Average 1,000 steps (records 0.51 and 0.48, not a gate) / Step 1 / Reset.
// Reveal unlocks after run and precise. Recorded values and their chart markers survive Reset.
// Deterministic: no randomness; the starting values are the lesson's choice (claim c5).

import { useState } from "react";
import { Lesson } from "@/kit/Lesson";
import { Control } from "@/kit/controls";
import { Milestones } from "@/kit/milestones";
import s from "./styles.module.css";

const X_START = 0.3;
const COARSE = 1e-4;
const FINE = 1e-7;
const KMAX = 40;
const f = (x: number) => 4 * x * (1 - x);

function series(x0: number, n: number): number[] {
  const out = [x0];
  let x = x0;
  for (let i = 0; i < n; i++) {
    x = f(x);
    out.push(x);
  }
  return out;
}
function splitStep(gap: number): number {
  let x = X_START;
  let y = X_START + gap;
  for (let i = 1; i < 200; i++) {
    x = f(x);
    y = f(y);
    if (Math.abs(x - y) > 0.1) return i;
  }
  return -1;
}
function longAverage(x0: number): number {
  let x = x0;
  let t = 0;
  for (let i = 0; i < 1000; i++) {
    x = f(x);
    t += x;
  }
  return t / 1000;
}

const RUNS = {
  [COARSE]: { a: series(X_START, KMAX), b: series(X_START + COARSE, KMAX), split: splitStep(COARSE) },
  [FINE]: { a: series(X_START, KMAX), b: series(X_START + FINE, KMAX), split: splitStep(FINE) },
} as Record<number, { a: number[]; b: number[]; split: number }>;
const AVG_A = longAverage(X_START).toFixed(2); // 0.51
const AVG_B = longAverage(X_START + COARSE).toFixed(2); // 0.48

const gapText = (g: number) => (g < 0.001 ? g.toFixed(7).replace(/0+$/, "") : g.toFixed(3));

// chart geometry (viewBox 340 x 178)
const X0 = 30;
const X1 = 332;
const Y0 = 150;
const Y1 = 14;
const xs = (k: number) => X0 + (k / KMAX) * (X1 - X0);
const ys = (v: number) => Y0 - v * (Y0 - Y1);

type Rec = { run: number | null; precise: number | null; avg: [string, string] | null };

export default function OneTenThousandthApart({ slug }: { slug: string }) {
  const [gap, setGap] = useState(COARSE);
  const [k, setK] = useState(0);
  const [avgOn, setAvgOn] = useState(false);
  const [rec, setRec] = useState<Rec>({ run: null, precise: null, avg: null });

  const n = rec.run ?? RUNS[COARSE].split;
  const extra = (rec.precise ?? RUNS[FINE].split) - n;

  return (
    <Lesson
      slug={slug}
      predict={{
        question: "Run the same exact rule, x → 4x(1 − x), from 0.3 and from 0.3001. After 30 steps, how far apart are the two runs?",
        options: ["Still about 0.0001 apart", "About 0.01 apart", "Up to 1 apart, like two random numbers"],
        answer: 2,
      }}
      exploreHint="Run 30 steps, then try a start 1,000 times more precise."
      minInteractions={2}
      reveal={() => (
        <>
          <p>
            The runs stayed within 0.1 until step {n}, then wandered apart like strangers. A start 1,000 times more precise
            bought only {extra} more steps: the gap roughly doubles each step.
          </p>
          <p>Edward Lorenz found this in a weather model in 1963.</p>
          {rec.avg ? (
            <p>
              Where it stops: each step was unpredictable, but the long-run averages matched, {rec.avg[0]} and {rec.avg[1]}.
              Chaos limits forecasting a particular day, not the average.
            </p>
          ) : (
            <p>
              Where it stops: chaos limits forecasting a particular day, not necessarily the average. Average 1,000 steps
              compares the two runs’ long-run averages.
            </p>
          )}
        </>
      )}
    >
      {({ locked, interact }) => (
        <Milestones interact={interact} names={["run", "precise"]}>
          {(reach) => {
            const settle = (g: number, nk: number) => {
              if (nk >= 30 && g === COARSE) {
                setRec((r) => (r.run === null ? { ...r, run: RUNS[COARSE].split } : r));
                reach("run");
              }
              if (nk >= 30 && g === FINE) {
                setRec((r) => (r.precise === null ? { ...r, precise: RUNS[FINE].split } : r));
                reach("precise");
              }
            };
            const go = (g: number, nk: number, avg: boolean) => {
              if (locked) return;
              setGap(g);
              setK(nk);
              setAvgOn(avg);
              settle(g, nk);
            };
            const runCoarse = () => go(COARSE, 30, false);
            const runFine = () => go(FINE, 30, false);
            const average = () => {
              if (locked) return;
              setRec((r) => (r.avg === null ? { ...r, avg: [AVG_A, AVG_B] } : r));
              go(COARSE, Math.max(k, 30), true);
            };
            const step = () => go(gap, Math.min(KMAX, k + 1), avgOn);
            const reset = () => go(COARSE, 0, false);

            const run = RUNS[gap];
            const a = run.a.slice(0, k + 1);
            const b = run.b.slice(0, k + 1);
            const gapNow = Math.abs(run.a[k] - run.b[k]);
            // split markers: every recorded split, plus the current pair's split once the trace passes it
            const marks = new Map<number, boolean>();
            if (rec.run !== null) marks.set(rec.run, gap === COARSE);
            if (rec.precise !== null) marks.set(rec.precise, gap === FINE);
            if (k >= run.split) marks.set(run.split, true);
            const showAvg = rec.avg !== null && (avgOn || k === 0 || gap === COARSE);
            const pts = (v: number[]) => v.map((y, i) => `${xs(i).toFixed(1)},${ys(y).toFixed(1)}`).join(" ");

            return (
              <div className={s.wrap}>
                <p className={s.readout} aria-live="polite">
                  step {k} · gap {gapText(gapNow)}
                </p>
                <svg
                  viewBox="0 0 340 178"
                  className={`stage-svg ${s.chart}`}
                  role="img"
                  aria-label={`Two runs from 0.3 and 0.3 plus ${gapText(gap)}, step ${k}, gap ${gapText(gapNow)}`}
                >
                  {[0, 0.5, 1].map((v) => (
                    <g key={`y${v}`}>
                      <line x1={X0} x2={X1} y1={ys(v)} y2={ys(v)} stroke="var(--line)" strokeWidth={v === 0 ? 1 : 0.5} />
                      <text x={X0 - 4} y={ys(v) + 4} textAnchor="end" className={s.tick}>
                        {v}
                      </text>
                    </g>
                  ))}
                  {[0, 10, 20, 30, 40].map((t) => (
                    <text key={`x${t}`} x={xs(t)} y={Y0 + 15} textAnchor="middle" className={s.tick}>
                      {t}
                    </text>
                  ))}
                  <text x={(X0 + X1) / 2} y={176} textAnchor="middle" className={s.tick}>
                    steps
                  </text>
                  {[...marks.entries()].map(([m, current]) => (
                    <g key={`m${m}`} data-split={m}>
                      <line
                        x1={xs(m)}
                        x2={xs(m)}
                        y1={Y1 + 12}
                        y2={Y0}
                        stroke={current ? "var(--bad)" : "var(--muted)"}
                        strokeWidth={1.5}
                        strokeDasharray="4 3"
                      />
                      <text x={xs(m)} y={Y1 + 8} textAnchor="middle" className={current ? s.markOn : s.mark}>
                        split {m}
                      </text>
                    </g>
                  ))}
                  {showAvg && rec.avg ? (
                    <g data-avg={`${rec.avg[0]} ${rec.avg[1]}`}>
                      <line x1={X0} x2={X1} y1={ys(Number(rec.avg[0]))} y2={ys(Number(rec.avg[0]))} stroke="var(--fg)" strokeWidth={2} strokeDasharray="8 4" />
                      <line x1={X0} x2={X1} y1={ys(Number(rec.avg[1]))} y2={ys(Number(rec.avg[1]))} stroke="var(--domain)" strokeWidth={2} strokeDasharray="8 4" />
                      <text x={X1 - 4} y={ys(Number(rec.avg[0])) - 16} textAnchor="end" className={s.avgA}>
                        avg {rec.avg[0]}
                      </text>
                      <text x={X1 - 4} y={ys(Number(rec.avg[1])) + 10} textAnchor="end" className={s.avgB}>
                        avg {rec.avg[1]}
                      </text>
                    </g>
                  ) : null}
                  {a.length > 1 ? <polyline points={pts(a)} fill="none" stroke="var(--fg)" strokeWidth={2} strokeLinejoin="round" /> : null}
                  {b.length > 1 ? (
                    <polyline points={pts(b)} fill="none" stroke="var(--domain)" strokeWidth={2} strokeLinejoin="round" strokeDasharray="5 2" />
                  ) : null}
                  <circle cx={xs(k)} cy={ys(run.a[k])} r={3.5} fill="var(--fg)" />
                  <circle cx={xs(k)} cy={ys(run.b[k])} r={3.5} fill="var(--domain)" />
                </svg>
                <div className={s.controls}>
                  <Control disabled={locked || (gap === COARSE && k === 30 && !avgOn)} onClick={runCoarse}>
                    Run 30 steps
                  </Control>
                  <Control disabled={locked || (gap === FINE && k === 30)} onClick={runFine}>
                    1,000× more precise: run
                  </Control>
                </div>
                <div className={s.controls}>
                  <Control disabled={locked || (avgOn && gap === COARSE)} onClick={average}>
                    Average 1,000 steps
                  </Control>
                  <Control disabled={locked || k >= KMAX} onClick={step}>
                    Step 1
                  </Control>
                  <Control disabled={locked || (gap === COARSE && k === 0 && !avgOn)} onClick={reset}>
                    Reset
                  </Control>
                </div>
              </div>
            );
          }}
        </Milestones>
      )}
    </Lesson>
  );
}
