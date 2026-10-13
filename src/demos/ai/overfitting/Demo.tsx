"use client";

// Overfitting with a real least-squares fit. Eight noisy temperature readings train a
// polynomial; five readings it never saw judge it. Bends allowed = degree − 1. At six
// bends the curve threads all eight training dots (zero training miss) and misses the
// new dots worse than a straight line does (true for this seed, not a rule). Data are seeded and
// simulated, and the stage says so. v2: tap-to-choose bends with a record of each miss, gated on
// seeing 1-3 bends and 6 bends.

import { useId, useRef, useState } from "react";
import { Lesson } from "@/kit/Lesson";
import { Control, Readout, Row } from "@/kit/controls";
import { useMilestones } from "@/kit/milestones";
import s from "./styles.module.css";

type Pt = [number, number]; // [t in 0..1 across the day, temperature °C]

function rng(seed: number) {
  let v = seed >>> 0;
  return () => {
    v = (Math.imul(v, 1664525) + 1013904223) >>> 0;
    return v / 4294967296;
  };
}

function gauss(r: () => number) {
  const u = Math.max(r(), 1e-9);
  const w = r();
  return Math.sqrt(-2 * Math.log(u)) * Math.cos(2 * Math.PI * w);
}

const truth = (t: number) => 0.15 + 2.8 * t * (1 - t);
const toC = (y: number) => 8 + 20 * y;

function makeData(seed: number) {
  const r = rng(seed);
  const train: Pt[] = [];
  const test: Pt[] = [];
  for (let i = 0; i < 8; i++) {
    const t = (i + 0.15 + 0.7 * r()) / 8;
    train.push([t, toC(truth(t) + 0.09 * gauss(r))]);
  }
  for (let i = 0; i < 5; i++) {
    const t = (i + 0.2 + 0.6 * r()) / 5;
    test.push([t, toC(truth(t) + 0.09 * gauss(r))]);
  }
  return { train, test };
}

/** Least-squares polynomial of the given degree (normal equations, x rescaled to [-1, 1]). */
function fitPoly(pts: Pt[], degree: number) {
  const n = degree + 1;
  const A = Array.from({ length: n }, () => Array<number>(n + 1).fill(0));
  for (const [t, y] of pts) {
    const x = 2 * t - 1;
    const p = Array.from({ length: n }, (_, k) => x ** k);
    for (let i = 0; i < n; i++) {
      for (let j = 0; j < n; j++) A[i][j] += p[i] * p[j];
      A[i][n] += p[i] * y;
    }
  }
  for (let c = 0; c < n; c++) {
    let m = c;
    for (let r = c + 1; r < n; r++) if (Math.abs(A[r][c]) > Math.abs(A[m][c])) m = r;
    [A[c], A[m]] = [A[m], A[c]];
    for (let r = 0; r < n; r++) {
      if (r === c) continue;
      const k = A[r][c] / A[c][c];
      for (let j = c; j <= n; j++) A[r][j] -= k * A[c][j];
    }
  }
  const coef = A.map((row, i) => row[n] / row[i]);
  return (t: number) => {
    const x = 2 * t - 1;
    return coef.reduce((acc, c, k) => acc + c * x ** k, 0);
  };
}

const meanMiss = (f: (t: number) => number, pts: Pt[]) =>
  pts.reduce((acc, [t, y]) => acc + Math.abs(f(t) - y), 0) / pts.length;

const { train, test } = makeData(5);
const FITS = Array.from({ length: 7 }, (_, bends) => {
  const f = fitPoly(train, bends + 1);
  return { f, trainMiss: meanMiss(f, train), testMiss: meanMiss(f, test) };
});
// Plot geometry (viewBox 320 × 200): 6am..6pm across, 0..30 °C up.
// v2: the floor is 0 °C (was 6 °C) so the 6-bend curve's misses at 5.9 °C and 4.1 °C are drawn, not clipped.
const L = 30;
const R = 310;
const TOP = 22;
const BOT = 176;
const CMIN = 0;
const CMAX = 30;
const px = (t: number) => L + t * (R - L);
const py = (c: number) => BOT - ((c - CMIN) / (CMAX - CMIN)) * (BOT - TOP);

function curvePath(f: (t: number) => number) {
  return Array.from({ length: 141 }, (_, i) => {
    const t = i / 140;
    const y = Math.max(-40, Math.min(80, f(t))); // keep wild values finite; the clip hides them
    return `${i === 0 ? "M" : "L"}${px(t).toFixed(1)},${py(y).toFixed(1)}`;
  }).join(" ");
}

const fmt = (c: number) => `${c < 0.05 ? "0.0" : c.toFixed(1)} °C`;
const BENDS = [0, 1, 2, 3, 4, 5, 6];
const MILESTONES = ["few-bends", "six-bends"] as const;

export default function Overfitting({ slug }: { slug: string }) {
  const [bends, setBends] = useState(0);
  const [seen, setSeen] = useState<number[]>([0]); // bend settings the learner has looked at
  const clip = useId().replace(/:/g, "");
  const fit = FITS[bends];
  const interactRef = useRef<() => void>(() => {});
  const { reach } = useMilestones(() => interactRef.current(), MILESTONES);

  const message = (locked: boolean) => {
    if (locked) return "Lock in a guess to start.";
    if (bends === 0) return "A straight line. Tap a number to allow bends.";
    if (bends <= 3) return "A gentle curve. Compare both misses.";
    if (bends < 6) return "Now it chases single solid dots.";
    return "Through all 8 solid dots. Check the hollow ones.";
  };

  // The gentle curve the reveal quotes: the best of 1–3 bends the learner actually looked at.
  const gentle = seen.filter((b) => b >= 1 && b <= 3).sort((a, b) => FITS[a].testMiss - FITS[b].testMiss)[0] ?? 1;
  const sixLosesToLine = FITS[6].testMiss > FITS[0].testMiss;

  return (
    <Lesson
      slug={slug}
      predict={{
        question:
          "The curve learns from the 8 solid dots. Let it bend up to 6 times and it passes through all 8. Which misses the 5 hollow dots, held back, least?",
        options: ["A straight line (0 bends)", "Up to 1 to 3 bends", "Up to 6 bends (hits all 8)"],
        answer: 1,
      }}
      exploreHint="Tap 1, 2, 3 … up to 6 bends. Watch both misses."
      minInteractions={MILESTONES.length}
      reveal={() => (
        <>
          <p>
            Allowed 6 bends, the curve hit every solid dot (miss <strong>0.0 °C</strong>) but missed the hollow ones by{" "}
            <strong>{FITS[6].testMiss.toFixed(1)} °C</strong> on average. With {gentle} bend{gentle === 1 ? "" : "s"}:{" "}
            <strong>{FITS[gentle].testMiss.toFixed(1)} °C</strong>.
            {sixLosesToLine
              ? ` On these dots it even lost to the straight line (${FITS[0].testMiss.toFixed(1)} °C). With other random dots it does not always lose to the line, but it usually loses to a gentle curve.`
              : null}
          </p>
          <p>
            These dots are simulated: a smooth rise and fall over the day (now dashed) plus random jitter. A curve
            flexible enough to hit every dot learns the jitter too, and new readings have different jitter. That is
            overfitting.
          </p>
          <p className="muted">
            The solid-dot miss cannot warn you: more bends push it toward zero. Only data held back from fitting can.
          </p>
        </>
      )}
    >
      {({ phase, locked, interact }) => {
        interactRef.current = interact;
        const choose = (b: number) => {
          setBends(b);
          setSeen((xs) => (xs.includes(b) ? xs : [...xs, b]));
          if (b >= 1 && b <= 3) reach("few-bends");
          if (b === 6) reach("six-bends");
        };
        return (
          <div className={s.of}>
            <svg viewBox="0 0 320 200" className="stage-svg" role="img" aria-label="Simulated temperature readings and a fitted curve">
              <defs>
                <clipPath id={clip}>
                  <rect x={L} y={TOP - 6} width={R - L} height={BOT - TOP + 6} />
                </clipPath>
              </defs>
              <line x1={L} y1={BOT} x2={R} y2={BOT} stroke="var(--line)" />
              <line x1={L} y1={TOP - 6} x2={L} y2={BOT} stroke="var(--line)" />
              {[0, 10, 20, 30].map((c) => (
                <g key={c}>
                  {c > 0 && <line x1={L} y1={py(c)} x2={R} y2={py(c)} stroke="var(--line)" strokeDasharray="2 4" />}
                  <text x={L - 4} y={py(c) + 4} textAnchor="end" className={s.axis} fill="var(--muted)">
                    {c}°
                  </text>
                </g>
              ))}
              {[
                [0, "6am"],
                [0.5, "noon"],
                [1, "6pm"],
              ].map(([t, lab]) => (
                <text
                  key={lab as string}
                  x={px(t as number)}
                  y={BOT + 14}
                  textAnchor={t === 0 ? "start" : t === 1 ? "end" : "middle"}
                  className={s.axis}
                  fill="var(--muted)"
                >
                  {lab}
                </text>
              ))}

              <g clipPath={`url(#${clip})`}>
                {phase === "reveal" && (
                  <path
                    d={curvePath((t) => toC(truth(t)))}
                    fill="none"
                    stroke="var(--fg)"
                    strokeWidth={1.5}
                    strokeDasharray="5 4"
                    opacity={0.7}
                  />
                )}
                {test.map(([t, c], i) => (
                  <line
                    key={`m${i}`}
                    x1={px(t)}
                    y1={py(c)}
                    x2={px(t)}
                    y2={py(fit.f(t))}
                    stroke="var(--bad)"
                    strokeWidth={2}
                    opacity={locked ? 0 : 0.8}
                  />
                ))}
                <path d={curvePath(fit.f)} fill="none" stroke="var(--domain)" strokeWidth={2.5} />
              </g>

              {train.map(([t, c], i) => (
                <circle key={`a${i}`} cx={px(t)} cy={py(c)} r={4.5} fill="var(--fg)" />
              ))}
              {test.map(([t, c], i) => (
                <circle
                  key={`b${i}`}
                  cx={px(t)}
                  cy={py(c)}
                  r={5}
                  fill="var(--bg-3)"
                  stroke="var(--bad)"
                  strokeWidth={2}
                />
              ))}

              <g className={s.axis}>
                <circle cx={L + 8} cy={9} r={4} fill="var(--fg)" />
                <text x={L + 16} y={13} fill="var(--fg)">
                  learns from
                </text>
                <circle cx={L + 100} cy={9} r={4.5} fill="var(--bg-3)" stroke="var(--bad)" strokeWidth={2} />
                <text x={L + 109} y={13} fill="var(--fg)">
                  held back
                </text>
                <text x={R} y={13} textAnchor="end" fill="var(--muted)">
                  simulated data
                </text>
              </g>
            </svg>

            <p className={s.msg} aria-live="polite">
              {message(locked)}
            </p>

            <div className={s.bendsHead}>
              <span>Bends allowed (at most)</span>
              <span>miss on hollow dots</span>
            </div>
            <div className={s.bends}>
              {BENDS.map((b) => (
                <div key={b} className={s.bend}>
                  <Control
                    className={bends === b ? "active" : ""}
                    disabled={locked || bends === b}
                    aria-pressed={bends === b}
                    aria-label={`Allow up to ${b} bends`}
                    onClick={() => choose(b)}
                  >
                    {b}
                  </Control>
                  <span className={s.bendMiss}>{!locked && seen.includes(b) ? FITS[b].testMiss.toFixed(1) : "·"}</span>
                </div>
              ))}
            </div>
            <Row>
              <Readout label="Miss: solid dots" value={fmt(fit.trainMiss)} />
              <Readout label="Miss: hollow dots" value={<span className={s.bad}>{fmt(fit.testMiss)}</span>} />
            </Row>
          </div>
        );
      }}
    </Lesson>
  );
}
