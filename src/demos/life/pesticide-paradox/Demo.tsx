"use client";

// Lotka-Volterra pests (x) and predators (y), in thousands, time in months:
//   dx/dt = x - x y - e x      dy/dt = x y - y - e y
// The spray adds the same extra death rate e to both species. Long-run averages
// are computed numerically (600 months, RK4) and match the equilibrium
// x* = 1 + e, y* = 1 - e. Deterministic: no randomness.

import { useMemo, useState } from "react";
import { Lesson } from "@/kit/Lesson";
import { Milestones } from "@/kit/milestones";
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

const BASE = run(0, 600);
const MILESTONES = ["spray-20", "spray-40"] as const;
const kk = (v: number) => (Math.round(v * 100) * 10).toLocaleString("en-US");

function Stage({ locked, reach, onTry, revealing, shown }: { locked: boolean; reach: (n: string) => void; onTry: (v: number) => void; revealing: boolean; shown: number }) {
  const [sprayNow, setSpray] = useState(0);
  const spray = revealing ? shown : sprayNow;
  const setLevel = (v: number) => {
    setSpray(v);
    if (v >= 20) {
      onTry(v);
      reach("spray-20");
    }
    if (v >= 40) reach("spray-40");
  };
  const sim = useMemo(() => run(spray / 100, 600), [spray]);
  const base = BASE;
  const path = (k: 1 | 2) => sim.pts.map(([t, ...v], i) => `${i ? "L" : "M"}${X(t).toFixed(1)} ${Y(v[k - 1]).toFixed(1)}`).join(" ");
  const k = kk;

  return (
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
          </g>
        )}
        <path d={path(2)} className={s.pred} />
        <path d={path(1)} className={s.pest} />
        {!locked && <line x1={34} x2={292} y1={Y(sim.avgY)} y2={Y(sim.avgY)} className={s.predAvg} />}
        {!locked && <line x1={34} x2={292} y1={Y(sim.avgX)} y2={Y(sim.avgX)} className={s.pestAvg} />}
        <text x={38} y={14} className={s.keyPest}>— pests</text>
        <text x={98} y={14} className={s.keyPred}>— predators</text>
        {!locked && <text x={165} y={14} className={s.keyAvg}>- - averages</text>}
        {!locked && spray > 0 && <text x={292} y={14} textAnchor="end" className={s.keyGhost}>··· no spray</text>}
      </svg>

      <p className={s.msg} aria-live="polite">
        {locked
          ? "Make a prediction to start."
          : spray === 0
            ? "No spray. Pests and predators rise and fall in cycles."
            : "Spray kills both equally. Predators only hold steady at the pest level where their food covers their losses: the pest average."}
      </p>

      <Row>
        <Control disabled={locked || spray === 20} onClick={() => setLevel(20)}>
          Spray 20%
        </Control>
        <Control disabled={locked || spray === 40} onClick={() => setLevel(40)}>
          Spray 40%
        </Control>
        <Control disabled={locked || spray === 0} onClick={() => setSpray(0)}>
          Spray off
        </Control>
      </Row>
      <Slider
        label="Spray strength"
        value={spray}
        min={0}
        max={60}
        step={10}
        format={(v) => `${v}%`}
        disabled={locked}
        onChange={setLevel}
      />
      <Row>
        <Readout label="Avg pests" value={locked ? "?" : k(sim.avgX)} />
        <Readout label="Avg predators" value={locked ? "?" : k(sim.avgY)} />
      </Row>
    </div>
  );
}

export default function PesticideParadox({ slug }: { slug: string }) {
  const [levels, setLevels] = useState<number[]>([]); // spray strengths (>= 20) the learner set
  const lo = levels.length ? Math.min(...levels) : 20;
  const hi = levels.length ? Math.max(...levels) : 40;
  const mineLo = useMemo(() => run(lo / 100, 600), [lo]);
  const mineHi = useMemo(() => run(hi / 100, 600), [hi]);
  const onTry = (v: number) => setLevels((l) => (l.includes(v) ? l : [...l, v]));
  return (
    <Lesson
      slug={slug}
      predict={{
        question:
          "On your farm (a simple model), pests breed freely and predators grow only by eating pests. Each month you spray, killing the same share of pests and of predators. Over time, what does the average number of pests do?",
        options: ["falls", "stays the same", "rises"],
        answer: 2,
      }}
      exploreHint="Try 20%, then 40% spray, and watch the two dashed averages."
      minInteractions={MILESTONES.length}
      reveal={() => (
        <>
          <p>
            With no spray the average was {kk(BASE.avgX)} pests. At spray strength {lo}% it rose to{" "}
            <strong>{kk(mineLo.avgX)}</strong> while predators fell to {kk(mineLo.avgY)}
            {hi !== lo && <>; at {hi}% pests rose to <strong>{kk(mineHi.avgX)}</strong> and predators fell to {kk(mineHi.avgY)}</>}.
            Pests breed on their own; predators grow only by eating pests, so the same spray costs them more.
          </p>
          <p>
            The dashed pest line is the pest level at which predators exactly keep their numbers steady: what they eat
            just covers what they lose. Spray makes predators die faster, so they need more pests to keep steady, and the
            pests settle higher.
          </p>
          <p className="muted">Toy model: real farms are messier.</p>
        </>
      )}
    >
      {({ phase, locked, interact }) => (
        <Milestones interact={interact} names={MILESTONES}>
          {(reach) => <Stage locked={locked} reach={reach} onTry={onTry} revealing={phase === "reveal"} shown={hi} />}
        </Milestones>
      )}
    </Lesson>
  );
}
