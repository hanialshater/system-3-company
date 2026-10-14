"use client";

// Memorising-noise toy. Six points at x = 0, 0.2, ..., 1 with coin-flip labels +1 / -1
// (label set n uses mulberry32(n), untuned; set 1 = -1, 1, -1, -1, -1, 1). A least-squares polynomial of
// degree 1, 3 or 5 is fitted. Degree 5 has six coefficients, so it passes through all six dots for ANY labels
// (largest miss < 1e-10 over 1,000 label sets). Set 1: degree 1 misses by up to 1.51, degree 3 by 0.76,
// degree 5 by 0.00 with a biggest coefficient of 833; set 2: degree 5 biggest coefficient 625.

import { useState } from "react";
import { Lesson } from "@/kit/Lesson";
import { Control, Readout, Row } from "@/kit/controls";
import { Milestones } from "@/kit/milestones";
import { mulberry32 } from "@/kit/random";
import s from "./styles.module.css";

// MODEL START
const XS = [0, 0.2, 0.4, 0.6, 0.8, 1];
const DEGREES = [1, 3, 5];
const labelsFor = (set: number) => {
  const rng = mulberry32(set);
  return XS.map(() => (rng() < 0.5 ? 1 : -1));
};
function solve(A: number[][], b: number[]) {
  const n = b.length;
  const M = A.map((r, i) => [...r, b[i]]);
  for (let c = 0; c < n; c++) {
    let p = c;
    for (let r = c + 1; r < n; r++) if (Math.abs(M[r][c]) > Math.abs(M[p][c])) p = r;
    [M[c], M[p]] = [M[p], M[c]];
    for (let r = 0; r < n; r++) {
      if (r === c) continue;
      const f = M[r][c] / M[c][c];
      for (let k = c; k <= n; k++) M[r][k] -= f * M[c][k];
    }
  }
  return M.map((r, i) => r[n] / r[i]);
}
/** Least-squares polynomial fit (coefficients c0..cd). */
function fit(ys: number[], deg: number) {
  const m = deg + 1;
  const A = Array.from({ length: m }, (_, i) => Array.from({ length: m }, (_, j) => XS.reduce((acc, x) => acc + x ** (i + j), 0)));
  const b = Array.from({ length: m }, (_, i) => XS.reduce((acc, x, k) => acc + ys[k] * x ** i, 0));
  return solve(A, b);
}
const evalPoly = (c: number[], x: number) => c.reduce((acc, ci, i) => acc + ci * x ** i, 0);
const report = (set: number, deg: number) => {
  const ys = labelsFor(set);
  const c = fit(ys, deg);
  const miss = Math.max(...XS.map((x, i) => Math.abs(evalPoly(c, x) - ys[i])));
  const big = Math.max(...c.map(Math.abs));
  return { ys, c, miss, big };
};
/** A held-out point at x = 0.5 gets its own coin-flip label; the fitted curve calls it by its sign. */
const NEW_X = 0.5;
const newLabel = (set: number) => (mulberry32(set * 7919 + 13)() < 0.5 ? 1 : -1);
const callsRight = (set: number, deg: number) => (evalPoly(fit(labelsFor(set), deg), NEW_X) > 0 ? 1 : -1) === newLabel(set);
// MODEL END

const f2 = (v: number) => (Math.abs(v) < 0.005 ? "0.00" : v.toFixed(2));

export default function MemoriseCoinFlips({ slug }: { slug: string }) {
  const [deg, setDeg] = useState(1);
  const [set, setSet] = useState(1);
  const [fits5, setFits5] = useState<number[]>([]);
  const r = report(set, deg);
  const rightCount = fits5.filter((n) => callsRight(n, 5)).length;

  return (
    <Lesson
      slug={slug}
      predict={{
        question: `Six points at x = 0, 0.2, …, 1 get random labels, +1 or −1, by coin flip. A degree-5 curve (six numbers to tune) is fitted to them. Its largest miss on those six points:`,
        options: ["Zero", "About half the dots are missed", "It cannot fit random labels"],
        answer: 0,
      }}
      exploreHint="Raise the degree to 5, re-flip the labels, then try 20 more sets."
      minInteractions={3}
      reveal={() => (
        <>
          <p>
            At degree 5 the largest miss was 0.00 on {fits5.length} different label set{fits5.length === 1 ? "" : "s"}. Six tunable
            numbers can pass through any six dots.
          </p>
          <p>
            But the new point at {NEW_X} had its own coin-flip label. The curve called it right on {rightCount} of {fits5.length}{" "}
            sets ({Math.round((100 * rightCount) / Math.max(1, fits5.length))}%): about half. With no pattern to find, its guesses on
            new points are coin flips too.
          </p>
          <p>
            A perfect fit on training data is not evidence of a pattern. Large neural networks have been shown to fit randomly shuffled
            labels perfectly too.
          </p>
        </>
      )}
    >
      {({ locked, interact }) => (
        <Milestones interact={interact} names={["degree-5-fit", "reflip-at-5", "many-sets"]}>
          {(reach) => {
            const X = (x: number) => 44 + x * 262;
            const Y = (y: number) => 95 - y * 40; // y in [-2, 2]
            const curve = Array.from({ length: 101 }, (_, i) => i / 100)
              .map((x) => `${X(x).toFixed(1)},${Y(Math.max(-2.2, Math.min(2.2, evalPoly(r.c, x)))).toFixed(1)}`)
              .join(" ");
            const show = !locked;
            const note5 = (n: number) => setFits5((xs) => (xs.includes(n) ? xs : [...xs, n]));
            return (
              <div className={s.wrap}>
                <span className={`tag ${s.model}`}>Coin-flip labels · toy fit</span>
                <p className={s.caption}>A degree-d curve has d + 1 numbers to tune.</p>
                <svg viewBox="0 0 320 190" className="stage-svg" role="img" aria-label={`degree ${deg}, label set ${set}`}>
                  <line x1={X(0)} y1={Y(0)} x2={X(1)} y2={Y(0)} stroke="var(--line)" />
                  <line x1={X(0)} y1={Y(1)} x2={X(1)} y2={Y(1)} stroke="var(--line)" strokeDasharray="2 4" />
                  <line x1={X(0)} y1={Y(-1)} x2={X(1)} y2={Y(-1)} stroke="var(--line)" strokeDasharray="2 4" />
                  <text x={X(0) - 12} y={Y(1) + 4} textAnchor="end" className={s.tiny} fill="var(--muted)">
                    +1
                  </text>
                  <text x={X(0) - 12} y={Y(-1) + 4} textAnchor="end" className={s.tiny} fill="var(--muted)">
                    −1
                  </text>
                  {show && <polyline points={curve} fill="none" stroke="var(--domain)" strokeWidth={3} />}
                  {XS.map((x, i) => (
                    <g key={x}>
                      {show && <line x1={X(x)} y1={Y(r.ys[i])} x2={X(x)} y2={Y(evalPoly(r.c, x))} stroke="var(--bad)" strokeWidth={2} />}
                      <circle cx={X(x)} cy={Y(r.ys[i])} r={6} fill={r.ys[i] > 0 ? "var(--fg)" : "var(--bg-2)"} stroke="var(--fg)" strokeWidth={2} />
                      <text x={X(x)} y={182} textAnchor="middle" className={s.tiny} fill="var(--muted)">
                        {x}
                      </text>
                    </g>
                  ))}
                  {show && (
                    <g>
                      <line x1={X(NEW_X)} y1={Y(newLabel(set))} x2={X(NEW_X)} y2={Y(evalPoly(r.c, NEW_X))} stroke="var(--muted)" strokeWidth={2} strokeDasharray="3 3" />
                      <rect x={X(NEW_X) - 6} y={Y(newLabel(set)) - 6} width={12} height={12} transform={`rotate(45 ${X(NEW_X)} ${Y(newLabel(set))})`} fill={newLabel(set) > 0 ? "var(--fg)" : "var(--bg-2)"} stroke="var(--warn)" strokeWidth={2.5} />
                      <text x={X(NEW_X)} y={newLabel(set) > 0 ? Y(1) - 12 : Y(-1) + 22} textAnchor="middle" className={s.tiny} fill="var(--warn)">
                        new point
                      </text>
                    </g>
                  )}
                  {show && (
                    <text x={312} y={14} textAnchor="end" className={s.tiny} fill="var(--muted)">
                      label set {set} · degree {deg}
                    </text>
                  )}
                </svg>
                <Row>
                  {DEGREES.map((d) => (
                    <Control
                      key={d}
                      className={deg === d ? "active" : ""}
                      disabled={locked || deg === d}
                      onClick={() => {
                        setDeg(d);
                        if (d === 5) {
                          note5(set);
                          reach("degree-5-fit");
                        }
                      }}
                    >
                      Degree {d}
                    </Control>
                  ))}
                  <Control
                    disabled={locked}
                    onClick={() => {
                      const n = set + 1;
                      setSet(n);
                      if (deg === 5) {
                        note5(n);
                        reach("reflip-at-5");
                      }
                    }}
                  >
                    Re-flip labels
                  </Control>
                  <Control
                    disabled={locked || deg !== 5}
                    onClick={() => {
                      const from = set + 1;
                      setSet(set + 20);
                      setFits5((xs) => [...xs, ...Array.from({ length: 20 }, (_, k) => from + k).filter((n) => !xs.includes(n))]);
                      reach("many-sets");
                    }}
                  >
                    Try 20 more label sets
                  </Control>
                </Row>
                <Row>
                  <Readout label="Largest miss" value={show ? f2(r.miss) : "–"} />
                  <Readout label="New point called right (degree 5)" value={show && fits5.length ? `${rightCount} of ${fits5.length}` : "–"} />
                </Row>
              </div>
            );
          }}
        </Milestones>
      )}
    </Lesson>
  );
}
