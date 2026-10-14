"use client";

// Repeated prisoner's dilemma, tit-for-tat (TFT) vs always-cheat, random pairing,
// very large population (deterministic shares). A pairing is 10 rounds:
// both help 3 each, helper vs cheat 0 vs 5, both cheat 1 each.
// Average score per pairing with TFT share f: TFT 30f + 9(1-f), cheat 14f + 10(1-f).
// Copying: players switch to the other strategy with a chance proportional to the
// score gap, so f' = f + f(1-f)(W_TFT - W_cheat)/15 (imitation dynamics, clamped to 0..1).
// The learner picks the starting share (1-30%) and runs generations. The grid shows
// 100 players; which ones play TFT follows an untuned order (mulberry32(8)).

import { useMemo, useState } from "react";
import { Lesson } from "@/kit/Lesson";
import { Control, Readout, Row, Slider } from "@/kit/controls";
import { useMilestones } from "@/kit/milestones";
import { mulberry32 } from "@/kit/random";
import s from "./styles.module.css";

const GENS = 60;
const STEP = 10;
const START_LOW = 3; // opening start (percent): cheats win from here
const START_A = 4; // bracketing start buttons: below / above the tipping point, neither names it
const START_B = 8;
const MILESTONES = ["cheats-won", "tft-grew"] as const;
const wT = (f: number) => 30 * f + 9 * (1 - f);
const wD = (f: number) => 14 * f + 10 * (1 - f);
const THRESHOLD = 1 / 17; // where wT = wD

function trajectory(f0: number) {
  const out = [f0];
  let f = f0;
  for (let g = 1; g <= GENS; g++) {
    f = Math.min(1, Math.max(0, f + (f * (1 - f) * (wT(f) - wD(f))) / 15));
    out.push(f);
  }
  return out;
}

// Score chart: starting share 0..30% on x, average score 8..16 on y.
const CX0 = 14, CX1 = 290, CY0 = 8, CY1 = 62;
const cx = (v: number) => CX0 + ((CX1 - CX0) * v) / 30;
const cy = (w: number) => CY1 - ((CY1 - CY0) * (w - 8)) / 8;

const RANK = (() => {
  const rng = mulberry32(8);
  const idx = Array.from({ length: 100 }, (_, i) => i);
  for (let i = 99; i > 0; i--) {
    const j = Math.floor(rng() * (i + 1));
    [idx[i], idx[j]] = [idx[j], idx[i]];
  }
  const r = Array(100).fill(0);
  idx.forEach((spot, k) => (r[spot] = k));
  return r;
})();

const pct = (x: number) => `${Math.round(100 * x)}%`;
const THR = pct(THRESHOLD); // "6%"
/** Outcome after GENS generations from a start percent: has the TFT share grown (not shrunk)? */
const tftWins = (startPct: number) => {
  const tr = trajectory(startPct / 100);
  return tr[GENS] > tr[0];
};

type Runs = { lose: number | null; win: number | null }; // highest losing start, lowest winning start

function Stage({ locked, interact, runs, setRuns }: { locked: boolean; interact: () => void; runs: Runs; setRuns: (r: Runs) => void }) {
  const [start, setStart] = useState(START_LOW);
  const [gen, setGen] = useState(0);
  const { reach } = useMilestones(interact, MILESTONES);
  const traj = useMemo(() => trajectory(start / 100), [start]);
  const f = traj[gen];
  const n = Math.round(100 * f);

  const go = (g: number, st: number) => {
    setGen(g);
    setStart(st);
    if (g === GENS) {
      const won = tftWins(st);
      // The gate asks for runs that bracket the tipping point, not just any win and any loss.
      if (won && st <= START_B) reach("tft-grew");
      if (!won && st >= START_A) reach("cheats-won");
      setRuns({
        lose: !won ? Math.max(runs.lose ?? 0, st) : runs.lose,
        win: won ? Math.min(runs.win ?? 100, st) : runs.win,
      });
    }
  };

  return (
    <div className={s.wrap}>
      <svg viewBox="0 0 300 108" className={`stage-svg ${s.svg}`} role="img" aria-label={`Generation ${gen}: ${n} of 100 play tit-for-tat`}>
        {RANK.map((rk, i) => {
          const x = 15 + (i % 20) * 13.5 + 6, y = 8 + Math.floor(i / 20) * 13.5 + 6;
          return rk < n ? (
            <circle key={i} cx={x} cy={y} r={5.2} className={s.tft} />
          ) : (
            <rect key={i} x={x - 4.6} y={y - 4.6} width={9.2} height={9.2} rx={1.5} className={s.cheat} />
          );
        })}
        <text x={150} y={92} textAnchor="middle" className={s.small}>
          <tspan className={s.tftT}>●</tspan> tit-for-tat <tspan className={s.cheatT}>■</tspan> always cheat
        </text>
      </svg>

      <table className={s.pay}>
        <thead>
          <tr>
            <th>Row scores…</th>
            <th>against tit-for-tat</th>
            <th>against cheat</th>
            <th>average now</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <th>tit-for-tat</th>
            <td>30</td>
            <td>9</td>
            <td>{locked || n === 0 ? "–" : wT(f).toFixed(1)}</td>
          </tr>
          <tr>
            <th>cheat</th>
            <td>14</td>
            <td>10</td>
            <td>{locked || n === 100 ? "–" : wD(f).toFixed(1)}</td>
          </tr>
        </tbody>
      </table>

      <p className={s.how}>Points in 10 rounds. 30 = 10 × 3. 9 = 0, then 9 × 1. 14 = 5, then 9 × 1. 10 = 10 × 1.</p>

      {!locked && (
        <svg viewBox="0 0 300 76" className={`stage-svg ${s.chart}`} role="img" aria-label={`Average scores by starting share: tit-for-tat ${wT(start / 100).toFixed(1)}, cheat ${wD(start / 100).toFixed(1)} at a ${start}% start`}>
          <line x1={CX0} y1={CY1} x2={CX1} y2={CY1} className={s.axisL} />
          <polyline className={s.lineT} points={Array.from({ length: 31 }, (_, i) => `${cx(i)},${cy(wT(i / 100))}`).join(" ")} />
          <polyline className={s.lineC} points={Array.from({ length: 31 }, (_, i) => `${cx(i)},${cy(wD(i / 100))}`).join(" ")} />
          <line x1={cx(start)} x2={cx(start)} y1={CY0} y2={CY1} className={s.cursor} />
          {[0, 10, 20, 30].map((v) => (
            <text key={v} x={cx(v)} y={CY1 + 10} textAnchor="middle" className={s.small}>{v}%</text>
          ))}
          <text x={CX0} y={CY0 + 7} className={s.small}>average score at generation 0, by start</text>
          <text x={cx(30) - 2} y={cy(wT(0.3)) - 3} textAnchor="end" className={s.tftT}>tit-for-tat</text>
          <text x={cx(30) - 2} y={cy(wD(0.3)) + 10} textAnchor="end" className={s.cheatT}>cheat</text>
        </svg>
      )}

      <p className={s.msg} aria-live="polite">
        {locked
          ? "Make a prediction to start. Players meet at random; each generation they copy whoever scored more."
          : `Generation ${gen}, from a ${start}% start: ${n} of 100 play tit-for-tat. ${n === 0 || n === 100 ? "" : wT(f) > wD(f) ? "Tit-for-tat scores more." : "Cheats score more."}`}
      </p>

      <Row>
        <Control className={s.chip} disabled={locked || gen >= GENS} onClick={() => go(Math.min(GENS, gen + STEP), start)}>
          +{STEP} generations
        </Control>
        <Control className={s.chip} disabled={locked || gen >= GENS} onClick={() => go(GENS, start)}>
          To gen {GENS}
        </Control>
        {!locked && (
          <>
            <Control className={s.chip} disabled={start === START_A && gen === GENS} onClick={() => go(GENS, START_A)}>
              Start at {START_A}%, run
            </Control>
            <Control className={s.chip} disabled={start === START_B && gen === GENS} onClick={() => go(GENS, START_B)}>
              Start at {START_B}%, run
            </Control>
          </>
        )}
      </Row>
      <Slider label="Starting share of tit-for-tat" value={start} min={1} max={30} disabled={locked} format={(v) => `${v}%`} onChange={(v) => go(0, v)} />
      <Row>
        <Readout label="Tit-for-tat" value={locked ? "?" : `${n} of 100`} />
      </Row>
    </div>
  );
}

export default function StrategyBuilder({ slug }: { slug: string }) {
  const [runs, setRuns] = useState<Runs>({ lose: null, win: null });
  return (
    <Lesson
      slug={slug}
      predict={{
        question:
          "Players meet in pairs for 10 rounds. Both help: 3 points each. Helper vs cheat: 0 vs 5. Both cheat: 1 each. Tit-for-tat helps first, then copies its partner's last move. Players copy whoever scores more. What share of tit-for-tat players is enough to take over from cheats?",
        options: [`About ${THR}`, "About 25%", "About 50%", "About 95%"],
        answer: 0,
      }}
      exploreHint="Run 60 generations from the start shown, then try the other starts. Slide the start and watch where the two score lines cross."
      minInteractions={MILESTONES.length}
      reveal={() => (
        <>
          <p>
            {runs.lose !== null && runs.win !== null
              ? `Up to a ${runs.lose}% start, cheats won; from ${runs.win}%, `
              : "Below the tipping point cheats won; above it, "}
            <strong>tit-for-tat grew</strong>. The tipping point is where the two average-score lines on the chart cross: 1 in 17, about {THR}.
          </p>
          <p>
            Tit-for-tat loses only round one to a cheat (9 vs 14 points) but earns 30 with its own kind, while two cheats
            earn 10. Once tit-for-tat players meet each other often enough, its average beats the cheats&rsquo;.
            Cooperation can win when helpers keep meeting again.
          </p>
          <p className="muted">
            Model: two fixed strategies, chosen payoffs, 10 rounds, random pairing in a huge population. It is not a
            claim about people.
          </p>
        </>
      )}
    >
      {({ locked, interact }) => <Stage locked={locked} interact={interact} runs={runs} setRuns={setRuns} />}
    </Lesson>
  );
}
