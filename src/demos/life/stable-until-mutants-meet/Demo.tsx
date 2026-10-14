"use client";

// Everyone plays A; mutants play B. Very large, randomly mixing population (deterministic shares).
// Score = surviving offspring per meeting, with NO baseline (row against column):
//   A vs A 2, A vs B 1, B vs A 2, B vs B 3.
// (A, A) is a Nash equilibrium (B gains nothing against A: 2 = 2) but not an ESS (B vs B 3 > A vs B 1).
// With B share y: A averages 2 - y, B averages 2 + y, so B's edge is 2y: tiny while B is rare.
// Replicator update: y' = y * W_B / mean W. Starts at 1% B.

import { useState } from "react";
import { Lesson } from "@/kit/Lesson";
import { Control, Readout, Row } from "@/kit/controls";
import { useMilestones } from "@/kit/milestones";
import s from "./styles.module.css";

const START = 0.01;
const MAX_GEN = 130;
const STEP = 10;
const RUN_TO = 120;
const MILESTONES = ["stepped", "swept"] as const;

const wA = (y: number) => 2 * (1 - y) + 1 * y;
const wB = (y: number) => 2 * (1 - y) + 3 * y;
const next = (y: number) => (y * wB(y)) / (y * wB(y) + (1 - y) * wA(y));

const TRAJ = (() => {
  const t = [START];
  for (let g = 1; g <= MAX_GEN; g++) t.push(next(t[g - 1]));
  return t;
})();
const G99 = TRAJ.findIndex((v) => v >= 0.99); // 111

// Chart: generation 0..130 on x, B share 0..100% on y.
const X0 = 34, X1 = 290, Y0 = 10, Y1 = 100;
const gx = (g: number) => X0 + ((X1 - X0) * g) / MAX_GEN;
const py = (y: number) => Y1 - (Y1 - Y0) * y;
const pct = (y: number) => {
  const p = 100 * y;
  return p < 10 ? `${p.toFixed(1)}%` : `${Math.round(p)}%`;
};

function Stage({ locked, interact }: { locked: boolean; interact: () => void }) {
  const [gen, setGen] = useState(0);
  const { reach } = useMilestones(interact, MILESTONES);
  const y = TRAJ[gen];

  const go = (to: number) => {
    setGen(to);
    reach("stepped");
    if (to >= G99) reach("swept");
  };

  const pts = TRAJ.slice(0, gen + 1).map((v, g) => `${gx(g).toFixed(1)},${py(v).toFixed(1)}`).join(" ");

  return (
    <div className={s.wrap}>
      <table className={s.pay}>
        <thead>
          <tr>
            <th>Offspring of…</th>
            <th>vs A</th>
            <th>vs B</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <th className={s.aT}>A</th>
            <td>2</td>
            <td>1</td>
          </tr>
          <tr>
            <th className={s.bT}>B (mutant)</th>
            <td>2</td>
            <td>3</td>
          </tr>
        </tbody>
      </table>
      <p className={s.how}>Score = surviving offspring, no baseline. Meetings are random.</p>

      <svg viewBox="0 0 300 120" className={`stage-svg ${s.chart}`} role="img" aria-label={locked ? "Chart of B share, hidden until you predict" : `Generation ${gen}: ${pct(y)} play B`}>
        <line x1={X0} y1={Y1} x2={X1} y2={Y1} className={s.axis} />
        <line x1={X0} y1={Y0} x2={X0} y2={Y1} className={s.axis} />
        {[0, 0.5, 1].map((v) => (
          <text key={v} x={X0 - 4} y={py(v) + 4} textAnchor="end" className={s.small}>{Math.round(100 * v)}%</text>
        ))}
        {[0, 50, 100].map((g) => (
          <text key={g} x={gx(g)} y={Y1 + 11} textAnchor="middle" className={s.small}>{g}</text>
        ))}
        <text x={(X0 + X1) / 2} y={118} textAnchor="middle" className={s.small}>generation</text>
        <text x={X0 + 4} y={Y0 + 2} className={s.small}>share playing B</text>
        {!locked && (
          <>
            <polyline points={pts} className={s.line} />
            <circle cx={gx(gen)} cy={py(y)} r={3.5} className={s.dot} />
          </>
        )}
      </svg>

      <p className={s.msg} aria-live="polite">
        {locked
          ? "Predict first. Then run the generations."
          : `Generation ${gen}: A averages ${wA(y).toFixed(2)}, B ${wB(y).toFixed(2)}. B's edge grows as B's meet.`}
      </p>

      <Row>
        <Control className={s.chip} disabled={locked || gen >= MAX_GEN} onClick={() => go(Math.min(MAX_GEN, gen + STEP))}>
          +{STEP} generations
        </Control>
        <Control className={s.chip} disabled={locked || gen >= RUN_TO} onClick={() => go(RUN_TO)}>
          Run to gen {RUN_TO}
        </Control>
        <Control className={s.chip} disabled={locked || gen === 0} onClick={() => setGen(0)}>
          Restart
        </Control>
      </Row>
      <Row>
        <Readout label="Playing B" value={locked ? "?" : pct(y)} />
        <Readout label="B's edge over A" value={locked ? "?" : `+${(wB(y) - wA(y)).toFixed(2)}`} />
      </Row>
    </div>
  );
}

export default function StableUntilMutantsMeet({ slug }: { slug: string }) {
  return (
    <Lesson
      slug={slug}
      predict={{
        question:
          "Everyone plays A. 1% mutants play B. B ties A against A (2 each), but against B, B scores 3 and A scores 1. Do the B's spread?",
        options: ["No, they die out", "Yes: slowly, then fast", "They stay at about 1%"],
        answer: 1,
      }}
      exploreHint="Step ten generations at a time, then run on. Watch B's edge."
      minInteractions={MILESTONES.length}
      reveal={() => (
        <>
          <p>
            B crept from 1% to only 2% by generation 50, reached 21% by 100, then swept to 99% by generation {G99}.
          </p>
          <p>
            All-A is a Nash equilibrium: a lone B earns 2 against A, the same as A, so nobody gains by switching
            alone. But it is not evolutionarily stable, because B does better against B (3) than A does (1). B's
            edge is tiny while B's rarely meet, so they creep; each gain makes meetings more common, so they
            speed up and take over.
          </p>
          <p className="muted">Toy model with chosen payoffs and no baseline offspring; it is not a claim about a real species.</p>
        </>
      )}
    >
      {({ locked, interact }) => <Stage locked={locked} interact={interact} />}
    </Lesson>
  );
}
