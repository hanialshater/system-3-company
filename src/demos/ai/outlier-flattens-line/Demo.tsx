"use client";

// Least-squares line through (1,1), (2,2), (3,3), (4,4) and a fifth point (5, y5) the learner moves.
// y5 = 5: slope 1 (all on y = x). y5 = 0: slope 0, intercept 2 (x deviations -2..2, y deviations
// -1, 0, 1, 2, -2, covariance 0). Sum of squared misses: fitted line 10; keeping y = x costs 25
// (the stray point alone is 5 off). Deterministic.

import { useRef, useState, type PointerEvent } from "react";
import { Lesson } from "@/kit/Lesson";
import { Control, Readout, Row, Slider } from "@/kit/controls";
import { Milestones } from "@/kit/milestones";
import s from "./styles.module.css";

// MODEL START
const FIXED: [number, number][] = [
  [1, 1],
  [2, 2],
  [3, 3],
  [4, 4],
];
const X5 = 5;
const Y5_START = 5;
const Y5_Q = 0;
/** Ordinary least squares: slope and intercept minimising the sum of squared vertical misses. */
function fit(pts: [number, number][]) {
  const n = pts.length;
  const mx = pts.reduce((a, p) => a + p[0], 0) / n;
  const my = pts.reduce((a, p) => a + p[1], 0) / n;
  let sxy = 0;
  let sxx = 0;
  for (const [x, y] of pts) {
    sxy += (x - mx) * (y - my);
    sxx += (x - mx) ** 2;
  }
  const m = sxy / sxx;
  return { m, b: my - m * mx };
}
const pointsWith = (y5: number): [number, number][] => [...FIXED, [X5, y5]];
const sse = (pts: [number, number][], m: number, b: number) => pts.reduce((a, [x, y]) => a + (y - (m * x + b)) ** 2, 0);
const Q_FIT = fit(pointsWith(Y5_Q)); // m 0, b 2
const Q_SSE_FIT = sse(pointsWith(Y5_Q), Q_FIT.m, Q_FIT.b); // 10
const Q_SSE_OLD = sse(pointsWith(Y5_Q), 1, 0); // 25
const START_SLOPE = fit(pointsWith(Y5_START)).m; // 1
// MODEL END

const U = 30; // px per unit, both axes (so squares are honest)
const PX = (x: number) => 40 + x * U * 1.35;
const PY = (y: number) => 200 - (y + 1) * U * 0.85;
const SQ = U * 0.85; // square side per unit of miss, on the y scale
const f2 = (v: number) => (Math.abs(v) < 0.005 ? "0.00" : v.toFixed(2));

export default function OutlierFlattensLine({ slug }: { slug: string }) {
  const [y5, setY5] = useState(Y5_START);
  const [compare, setCompare] = useState(false);
  const [sawFlat, setSawFlat] = useState(false);
  const [sawCompare, setSawCompare] = useState(false);
  const dragging = useRef(false);

  const pts = pointsWith(y5);
  const { m, b } = fit(pts);
  const shownM = compare ? 1 : m;
  const shownB = compare ? 0 : b;
  const total = sse(pts, shownM, shownB);

  return (
    <Lesson
      slug={slug}
      predict={{
        question: `Points (1,1), (2,2), (3,3), (4,4) lie on a line of slope ${START_SLOPE}. Add (${X5},${Y5_Q}). The best-fit (least-squares) line's slope becomes:`,
        options: ["About 0.8", "About 0.5", `Exactly ${Q_FIT.m.toFixed(0)}`],
        answer: 2,
      }}
      exploreHint="Drag the red point down to the floor. Then compare with the old line."
      minInteractions={2}
      reveal={() => (
        <>
          <p>
            {sawFlat
              ? `You moved one point from (${X5},${Y5_START}) to (${X5},${Y5_Q}) and the slope went from ${START_SLOPE} to ${f2(Q_FIT.m)}: a flat line at y = ${f2(Q_FIT.b)}.`
              : `With the fifth point at (${X5},${Y5_Q}) the slope is ${f2(Q_FIT.m)}.`}
          </p>
          <p>
            The best-fit line is the one with the smallest sum of squared misses (the shaded squares).{" "}
            {sawCompare
              ? `Keeping y = x left the stray point 5 off, costing 25 on its own (${Q_SSE_OLD} in all). The flat line spreads the misses: ${Q_SSE_FIT} in all.`
              : `Keeping y = x would cost ${Q_SSE_OLD}; the flat line costs ${Q_SSE_FIT}.`}
          </p>
          <p>Squaring makes one far miss count more than several small ones, so a single stray point can move the whole fit.</p>
        </>
      )}
    >
      {({ locked, interact }) => (
        <Milestones interact={interact} names={["flat", "compare"]}>
          {(reach) => {
            const setPoint = (v: number) => {
              setY5(v);
              if (v === Y5_Q) {
                setSawFlat(true);
                reach("flat");
                if (compare) {
                  setSawCompare(true);
                  reach("compare");
                }
              }
            };
            const toggleCompare = () => {
              const next = !compare;
              setCompare(next);
              if (next && y5 === Y5_Q) {
                setSawCompare(true);
                reach("compare");
              }
            };
            const onMove = (e: PointerEvent<SVGSVGElement>) => {
              if (!dragging.current || locked) return;
              const svg = e.currentTarget;
              const ctm = svg.getScreenCTM();
              if (!ctm) return;
              const vy = new DOMPoint(e.clientX, e.clientY).matrixTransform(ctm.inverse()).y;
              const y = (200 - vy) / (U * 0.85) - 1;
              const snapped = Math.max(0, Math.min(5, Math.round(y * 2) / 2));
              if (snapped !== y5) setPoint(snapped);
            };
            const lineY = (x: number) => shownM * x + shownB;
            return (
              <div className={s.wrap}>
                <span className={`tag ${s.model}`}>Invented points · least-squares line</span>
                <svg
                  viewBox="0 0 320 210"
                  className="stage-svg"
                  role="img"
                  aria-label={locked ? "Five points" : `Fifth point at height ${y5}, slope ${f2(shownM)}`}
                  onPointerMove={onMove}
                  onPointerUp={() => (dragging.current = false)}
                  onPointerLeave={() => (dragging.current = false)}
                  style={{ touchAction: "none" }}
                >
                  <line x1={PX(0)} y1={PY(0)} x2={PX(6)} y2={PY(0)} stroke="var(--line)" />
                  <line x1={PX(0)} y1={PY(-1)} x2={PX(0)} y2={PY(6)} stroke="var(--line)" />
                  {[1, 2, 3, 4, 5].map((t) => (
                    <text key={t} x={PX(t)} y={PY(0) + 12} textAnchor="middle" className={s.tiny} fill="var(--muted)">
                      {t}
                    </text>
                  ))}
                  {!locked &&
                    pts.map(([x, y], i) => {
                      const r = y - lineY(x);
                      const side = Math.abs(r) * SQ;
                      if (side < 0.5) return null;
                      return (
                        <rect
                          key={`sq${i}`}
                          x={PX(x) - side}
                          y={r > 0 ? PY(y) : PY(lineY(x))}
                          width={side}
                          height={side}
                          fill={compare ? "color-mix(in srgb, var(--bad) 22%, transparent)" : "color-mix(in srgb, var(--domain) 22%, transparent)"}
                          stroke={compare ? "var(--bad)" : "var(--domain)"}
                          strokeWidth={0.8}
                        />
                      );
                    })}
                  {!locked && (
                    <line
                      x1={PX(0)}
                      y1={PY(lineY(0))}
                      x2={PX(6)}
                      y2={PY(lineY(6))}
                      stroke={compare ? "var(--bad)" : "var(--domain)"}
                      strokeWidth={2.5}
                    />
                  )}
                  {FIXED.map(([x, y]) => (
                    <circle key={x} cx={PX(x)} cy={PY(y)} r={5} fill="var(--fg)" />
                  ))}
                  <circle
                    cx={PX(X5)}
                    cy={PY(y5)}
                    r={9}
                    fill="var(--bad)"
                    stroke="var(--fg)"
                    strokeWidth={1.5}
                    style={{ cursor: locked ? "default" : "ns-resize" }}
                    onPointerDown={(e) => {
                      if (locked) return;
                      dragging.current = true;
                      (e.currentTarget.ownerSVGElement as SVGSVGElement | null)?.setPointerCapture?.(e.pointerId);
                    }}
                  />
                  <text x={PX(X5) + 14} y={PY(y5) + 4} className={s.small} fill="var(--fg)">
                    ({X5},{y5})
                  </text>
                  {!locked && (
                    <text x={PX(0) + 6} y={14} className={s.small} fill={compare ? "var(--bad)" : "var(--domain)"}>
                      {compare ? "Old line y = x" : "Best-fit line"}
                    </text>
                  )}
                </svg>
                <Row>
                  <Control disabled={locked || y5 === Y5_Q} onClick={() => setPoint(Y5_Q)}>
                    Drop to y = {Y5_Q}
                  </Control>
                  <Control className={compare ? "active" : ""} aria-pressed={compare} disabled={locked} onClick={toggleCompare}>
                    {compare ? "Show best fit" : "Compare: y = x"}
                  </Control>
                </Row>
                <Row>
                  <Readout label={compare ? "Slope (old)" : "Slope"} value={locked ? "–" : f2(shownM)} />
                  <Readout label="Sum of squares" value={locked ? "–" : total.toFixed(1)} />
                </Row>
                <Row>
                  <Slider label="Red point height" value={y5} min={0} max={5} step={0.5} disabled={locked} onChange={setPoint} />
                  <Control disabled={locked || y5 === Y5_START} onClick={() => setPoint(Y5_START)}>
                    Back to {Y5_START}
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
