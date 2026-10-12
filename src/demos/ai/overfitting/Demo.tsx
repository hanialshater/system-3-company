"use client";

// Overfitting with a real least-squares fit. Eight noisy temperature readings train a
// polynomial; five readings it never saw judge it. Bends allowed = degree − 1. At six
// bends the curve threads all eight training dots (zero training miss) and misses the
// new dots worse than a straight line does. Data are seeded, so every number is fixed.

import { useId, useState } from "react";
import { Lesson } from "@/kit/Lesson";
import { Readout, Row, Slider } from "@/kit/controls";
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

// Plot geometry (viewBox 320 × 200): 6am..6pm across, 6..30 °C up.
const L = 30;
const R = 310;
const TOP = 22;
const BOT = 176;
const CMIN = 6;
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

export default function Overfitting({ slug }: { slug: string }) {
  const [bends, setBends] = useState(0);
  const clip = useId().replace(/:/g, "");
  const fit = FITS[bends];

  const message = (locked: boolean) => {
    if (locked) return "Lock in a guess to start.";
    if (bends === 0) return "A straight line. Drag to allow bends.";
    if (bends <= 3) return "Compare both misses as you drag.";
    if (bends < 6) return "Now it chases single training dots.";
    return "Through all 8 training dots. Check the new ones.";
  };

  return (
    <Lesson
      slug={slug}
      predict={{
        question:
          "A curve is fitted to the 8 solid dots. Allow up to 6 bends and it passes through all 8. Which misses the 5 new (hollow) dots least?",
        options: ["0 bends (a line)", "1 to 3 bends", "6 bends (hits all 8)"],
        answer: 1,
      }}
      exploreHint="Drag the bends from 0 to 6. Watch both misses."
      reveal={() => (
        <>
          <p>
            At 6 bends the training miss hit <strong>0.0 °C</strong>, yet the new dots were missed by{" "}
            <strong>{FITS[6].testMiss.toFixed(1)} °C</strong> on average, worse than the straight line (
            {FITS[0].testMiss.toFixed(1)} °C). With 1 bend: <strong>{FITS[1].testMiss.toFixed(1)} °C</strong>.
          </p>
          <p>
            Each reading is the day&apos;s smooth warming plus random jitter. A curve flexible enough to hit every dot
            learns the jitter too, and the jitter of new readings is different. That is overfitting.
          </p>
          <p className="muted">
            The training miss cannot warn you: more bends push it toward zero. Only data held back from training can.
          </p>
        </>
      )}
    >
      {({ locked, interact }) => (
        <div className={s.of}>
          <svg viewBox="0 0 320 200" className="stage-svg" role="img" aria-label="Temperature readings and a fitted curve">
            <defs>
              <clipPath id={clip}>
                <rect x={L} y={TOP - 6} width={R - L} height={BOT - TOP + 6} />
              </clipPath>
            </defs>
            <line x1={L} y1={BOT} x2={R} y2={BOT} stroke="var(--line)" />
            <line x1={L} y1={TOP - 6} x2={L} y2={BOT} stroke="var(--line)" />
            {[10, 20].map((c) => (
              <g key={c}>
                <line x1={L} y1={py(c)} x2={R} y2={py(c)} stroke="var(--line)" strokeDasharray="2 4" />
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
                fitted on
              </text>
              <circle cx={L + 92} cy={9} r={4.5} fill="var(--bg-3)" stroke="var(--bad)" strokeWidth={2} />
              <text x={L + 101} y={13} fill="var(--fg)">
                new
              </text>
            </g>
          </svg>

          <p className={s.msg} aria-live="polite">
            {message(locked)}
          </p>

          <Slider
            label="Bends allowed"
            value={bends}
            min={0}
            max={6}
            disabled={locked}
            onChange={(v) => {
              setBends(v);
              interact();
            }}
          />
          <Row>
            <Readout label="Miss: solid dots" value={fmt(fit.trainMiss)} />
            <Readout label="Miss: new dots" value={<span className={s.bad}>{fmt(fit.testMiss)}</span>} />
          </Row>
        </div>
      )}
    </Lesson>
  );
}
