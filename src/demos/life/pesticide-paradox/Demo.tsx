"use client";

// Lotka-Volterra pests (x) and predators (y), in thousands, time in months:
//   dx/dt = x - x y - e x      dy/dt = x y - y - e y
// The spray adds the same extra death rate e to both species. Long-run averages
// are computed numerically (600 months, RK4) and match the equilibrium
// x* = 1 + e, y* = 1 - e. Deterministic: no randomness.

import { useMemo, useState } from "react";
import { Lesson } from "@/kit/Lesson";
import { Control, Readout, Row, Slider } from "@/kit/controls";
import s from "./styles.module.css";

const SHOW = 36; // months drawn
const DT = 0.01;
const X0 = 1.5;
const Y0 = 1;

function run(e: number, months: number) {
  const f = (x: number, y: number) => [x * (1 - e) - x * y, x * y - y * (1 + e)];
  let x = X0, y = Y0;
  const pts: [number, number, number][] = [[0, x, y]];
  let sx = 0, sy = 0;
  const steps = Math.round(months / DT);
  for (let i = 1; i <= steps; i++) {
    const k1 = f(x, y);
    const k2 = f(x + (DT / 2) * k1[0], y + (DT / 2) * k1[1]);
    const k3 = f(x + (DT / 2) * k2[0], y + (DT / 2) * k2[1]);
    const k4 = f(x + DT * k3[0], y + DT * k3[1]);
    x += (DT / 6) * (k1[0] + 2 * k2[0] + 2 * k3[0] + k4[0]);
    y += (DT / 6) * (k1[1] + 2 * k2[1] + 2 * k3[1] + k4[1]);
    sx += x * DT;
    sy += y * DT;
    if (i % 10 === 0 && i * DT <= SHOW + 1e-9) pts.push([i * DT, x, y]);
  }
  return { pts, avgX: sx / months, avgY: sy / months };
}

const X = (t: number) => 34 + (t / SHOW) * 258;
const Y = (v: number) => 176 - (v / 3) * 160;

export default function PesticideParadox({ slug }: { slug: string }) {
  const [spray, setSpray] = useState(0);
  const sim = useMemo(() => run(spray / 100, 600), [spray]);
  const base = useMemo(() => run(0, 600), []);
  const path = (k: 1 | 2) => sim.pts.map(([t, ...v], i) => `${i ? "L" : "M"}${X(t).toFixed(1)} ${Y(v[k - 1]).toFixed(1)}`).join(" ");
  const k = (v: number) => (Math.round(v * 100) * 10).toLocaleString("en-US");

  return (
    <Lesson
      slug={slug}
      predict={{
        question:
          "In a simple predator–prey model, a spray kills the same share of pests and of their predators every month. Over time, the average number of pests…",
        options: ["falls", "stays the same", "rises"],
        answer: 2,
      }}
      exploreHint="Turn the spray up to 20% or more and watch the dashed pest average."
      reveal={() => (
        <>
          <p>
            Spraying both at the same rate <strong>raised</strong> the average pest number: at strength 20%, from about 1,000 to
            1,200, while predators fell to about 800. Pests breed on their own and bounce back. Predators can only grow
            by eating pests, so the spray hurts them more.
          </p>
          <p>
            In this model the average pest number is whatever predators need to break even. Spray makes predators die
            faster, so they need more pests to break even, and the pests settle higher.
          </p>
          <p className="muted">
            Volterra built this model in 1926 to explain why predatory fish made up more of the Adriatic catch when
            fishing paused in World War I. Real farms are messier than this toy model.
          </p>
        </>
      )}
    >
      {({ locked, interact }) => (
        <div className={s.wrap}>
          <svg viewBox="0 0 300 200" className={`stage-svg ${s.svg}`} role="img" aria-label={`Spray ${spray}%: average pests ${k(sim.avgX)}, predators ${k(sim.avgY)}`}>
            {[0, 1, 2, 3].map((v) => (
              <g key={v}>
                <line x1={34} x2={292} y1={Y(v)} y2={Y(v)} className={s.grid} />
                <text x={28} y={Y(v) + 4} className={s.tick} textAnchor="end">{v === 0 ? "0" : `${v}k`}</text>
              </g>
            ))}
            <text x={292} y={194} className={s.tick} textAnchor="end">36 months</text>
            {!locked && spray > 0 && (
              <g>
                <line x1={34} x2={292} y1={Y(base.avgX)} y2={Y(base.avgX)} className={s.ghost} />
                <text x={290} y={Y(base.avgX) + 12} className={s.tick} textAnchor="end">average with no spray</text>
              </g>
            )}
            <path d={path(2)} className={s.pred} />
            <path d={path(1)} className={s.pest} />
            {!locked && <line x1={34} x2={292} y1={Y(sim.avgX)} y2={Y(sim.avgX)} className={s.pestAvg} />}
            <text x={38} y={14} className={s.keyPest}>— pests</text>
            <text x={98} y={14} className={s.keyPred}>— predators</text>
            {!locked && <text x={190} y={14} className={s.keyAvg}>- - pest average</text>}
          </svg>

          <p className={s.msg} aria-live="polite">
            {locked
              ? "Make a prediction to start."
              : spray === 0
                ? "No spray. Pests and predators rise and fall in cycles."
                : "Spray adds the same extra death rate to both species."}
          </p>

          <Slider
            label="Spray strength"
            value={spray}
            min={0}
            max={60}
            step={10}
            format={(v) => `${v}%`}
            disabled={locked}
            onChange={(v) => {
              setSpray(v);
              if (v >= 20) interact();
            }}
          />
          <Row>
            <Control disabled={locked || spray === 0} onClick={() => setSpray(0)}>
              Spray off
            </Control>
            <Readout label="Avg pests" value={locked ? "?" : k(sim.avgX)} />
            <Readout label="Avg predators" value={locked ? "?" : k(sim.avgY)} />
          </Row>
        </div>
      )}
    </Lesson>
  );
}
