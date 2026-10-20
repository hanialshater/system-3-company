"use client";

// Small vs large beetles in a very large, randomly mixing population (deterministic shares).
// Score = surviving offspring per meeting, with NO baseline (row against column):
//   small vs small 6, small vs large 2, large vs small 8, large vs large 4.
// With large share x: large averages 8(1 - x) + 4x, small 6(1 - x) + 2x. Large is ahead by 2 at every mix.
// Replicator update: x' = x * W_large / mean W. Starts at 1% large.
// The learner steps generations, can turn 5% of a mostly-large population back to small,
// and reads the population's average score (6 when all small, 4 when all large).
// v2: the curve is marked where it crosses 99% ("99% at gen 24"); "Turn 5% small, run 5" dips the share and then
// runs 5 generations so the mutants are seen shrinking back (milestone "mutated"); Restart keeps the last run as a
// faded trace with its mark, so the reveal's numbers stay on stage.

import { useState } from "react";
import { Lesson } from "@/kit/Lesson";
import { Control, Readout, Row } from "@/kit/controls";
import { useMilestones } from "@/kit/milestones";
import s from "./styles.module.css";

const START = 0.01;
const MAX_GEN = 60;
const STEP = 5;
const RUN_TO = 30;
const MUTANTS = 0.05;
const MILESTONES = ["stepped", "took-over", "mutated"] as const;

const wL = (x: number) => 8 * (1 - x) + 4 * x;
const wS = (x: number) => 6 * (1 - x) + 2 * x;
const avg = (x: number) => x * wL(x) + (1 - x) * wS(x);
const next = (x: number) => (x * wL(x)) / avg(x);

// Chart: generation 0..60 on x, large share 0..100% on y.
const X0 = 34, X1 = 290, Y0 = 10, Y1 = 100;
const gx = (g: number) => X0 + ((X1 - X0) * g) / MAX_GEN;
const py = (x: number) => Y1 - (Y1 - Y0) * x;
const first99 = (h: number[]) => h.findIndex((v) => v >= 0.99);
type Mutation = { at: number; small: number; large: number; after: number };
const pct = (x: number) => {
  const p = 100 * x;
  return p > 0 && p < 10 ? `${p.toFixed(1)}%` : `${Math.round(p)}%`;
};

function Stage({ locked, interact, onTakeover }: { locked: boolean; interact: () => void; onTakeover: (g: number) => void }) {
  const [hist, setHist] = useState<number[]>([START]);
  const [mutated, setMutated] = useState<Mutation | null>(null);
  const [ghost, setGhost] = useState<number[] | null>(null); // the run before the last Restart
  const { reach } = useMilestones(interact, MILESTONES);
  const gen = hist.length - 1;
  const x = hist[gen];

  const advance = (to: number) => {
    const h = [...hist];
    while (h.length - 1 < to) h.push(next(h[h.length - 1]));
    setHist(h);
    reach("stepped");
    const g99 = first99(h);
    if (g99 >= 0) {
      reach("took-over");
      onTakeover(g99);
    }
  };
  const mutate = () => {
    const h = [...hist];
    const dipped = x * (1 - MUTANTS);
    h[h.length - 1] = dipped;
    for (let i = 0; i < STEP; i++) h.push(next(h[h.length - 1]));
    setHist(h);
    setMutated({ at: gen, small: wS(dipped), large: wL(dipped), after: h[h.length - 1] });
    reach("mutated");
  };
  const restart = () => {
    setGhost(hist);
    setHist([START]);
    setMutated(null);
  };

  const line = (h: number[]) => h.map((v, g) => `${gx(g).toFixed(1)},${py(v).toFixed(1)}`).join(" ");
  const pts = line(hist);
  const mark = (h: number[], faded: boolean) => {
    const g = first99(h);
    if (g < 0) return null;
    return (
      <g opacity={faded ? 0.5 : 1}>
        <circle cx={gx(g)} cy={py(h[g])} r={3} className={s.dot} />
        <text x={gx(g) + 4} y={py(h[g]) + 12} className={s.small}>
          99% at gen {g}
        </text>
      </g>
    );
  };
  const ahead = wL(x) > wS(x);

  return (
    <div className={s.wrap}>
      <table className={s.pay}>
        <thead>
          <tr>
            <th>Offspring of…</th>
            <th>vs small</th>
            <th>vs large</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <th className={s.smallT}>small</th>
            <td>6</td>
            <td>2</td>
          </tr>
          <tr>
            <th className={s.largeT}>large</th>
            <td>8</td>
            <td>4</td>
          </tr>
        </tbody>
      </table>
      <p className={s.how}>Score = surviving offspring, no baseline. Beetles meet at random.</p>

      <svg viewBox="0 0 300 120" className={`stage-svg ${s.chart}`} role="img" aria-label={locked ? "Chart of large share, hidden until you predict" : `Generation ${gen}: ${pct(x)} large`}>
        <line x1={X0} y1={Y1} x2={X1} y2={Y1} className={s.axis} />
        <line x1={X0} y1={Y0} x2={X0} y2={Y1} className={s.axis} />
        {[0, 0.5, 1].map((v) => (
          <text key={v} x={X0 - 4} y={py(v) + 4} textAnchor="end" className={s.small}>{Math.round(100 * v)}%</text>
        ))}
        {[0, 20, 40, 60].map((g) => (
          <text key={g} x={gx(g)} y={Y1 + 11} textAnchor="middle" className={s.small}>{g}</text>
        ))}
        <text x={(X0 + X1) / 2} y={118} textAnchor="middle" className={s.small}>generation</text>
        <text x={X0 + 4} y={Y0 + 2} className={s.small}>share of large beetles</text>
        {!locked && ghost && gen === 0 && (
          <>
            <polyline points={line(ghost)} className={s.line} opacity={0.35} />
            {mark(ghost, true)}
          </>
        )}
        {!locked && (
          <>
            <polyline points={pts} className={s.line} />
            {mark(hist, false)}
            <circle cx={gx(gen)} cy={py(x)} r={3.5} className={s.dot} />
          </>
        )}
      </svg>

      <p className={s.msg} aria-live="polite">
        {locked
          ? "Predict first. Then run the generations."
          : ghost && gen === 0
            ? `Restarted. Faded: your last run, which ended at average ${avg(ghost[ghost.length - 1]).toFixed(1)}, not 6.`
            : mutated && gen === mutated.at + STEP
            ? `Mutants scored ${mutated.small.toFixed(1)} vs ${mutated.large.toFixed(1)}. ${STEP} generations on: ${pct(mutated.after)} large.`
            : x >= 0.99
            ? `Generation ${gen}: ${pct(x)} large. Everyone now averages ${avg(x).toFixed(1)}, not 6.`
            : `Generation ${gen}: large ${wL(x).toFixed(1)}, small ${wS(x).toFixed(1)}. ${ahead ? "Large spread." : ""}`}
      </p>

      <Row>
        <Control className={s.chip} disabled={locked || gen >= MAX_GEN} onClick={() => advance(Math.min(MAX_GEN, gen + STEP))}>
          +{STEP} generations
        </Control>
        <Control className={s.chip} disabled={locked || gen >= RUN_TO} onClick={() => advance(RUN_TO)}>
          Run to gen {RUN_TO}
        </Control>
        <Control className={s.chip} disabled={locked || x < 0.9 || gen + STEP > MAX_GEN} onClick={mutate}>
          Turn {Math.round(MUTANTS * 100)}% small, run {STEP}
        </Control>
        <Control className={s.chip} disabled={locked || gen === 0} onClick={restart}>
          Restart
        </Control>
      </Row>
      <Row>
        <Readout label="Large beetles" value={locked ? "?" : pct(x)} />
        <Readout label="Average score" value={locked ? "?" : avg(x).toFixed(1)} />
      </Row>
    </div>
  );
}

export default function BiggerBeetlesEveryoneLoses({ slug }: { slug: string }) {
  const [g99, setG99] = useState<number | null>(null);
  return (
    <Lesson
      slug={slug}
      predict={{
        question:
          "In your beetle colony, offspring per meeting are: small vs small 6, small vs large 2, large vs small 8, large vs large 4. All are small now, averaging 6. A few large beetles appear and take over. What is the average then?",
        options: ["Higher than 6", "The same, 6", "Lower than 6"],
        answer: 2,
      }}
      exploreHint="Step the generations until large beetles take over, and watch the average score."
      minInteractions={MILESTONES.length}
      reveal={() => (
        <>
          <p>
            Large beetles went from 1% to 99% {g99 !== null ? `by generation ${g99}` : "in a few dozen generations"} (the mark on
            the curve), and the average score fell from 6 to <strong>4</strong>. Everyone is worse off.
          </p>
          <p>
            Large beats small against either opponent (8 vs 6 against small, 4 vs 2 against large), so it spreads
            whatever the mix. Once nearly everyone is large, a small mutant scores about 2 where the large score about 4, so
            your 5% of mutants shrank back within {STEP} generations. A strategy that, once common, no small group of mutants can invade is
            evolutionarily stable, even when it leaves everyone with less.
          </p>
          <p className="muted">A model with chosen payoffs and no baseline offspring; it is not a claim about real beetles.</p>
        </>
      )}
    >
      {({ locked, interact }) => <Stage locked={locked} interact={interact} onTakeover={setG99} />}
    </Lesson>
  );
}
