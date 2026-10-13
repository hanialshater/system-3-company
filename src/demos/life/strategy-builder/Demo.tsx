"use client";

// Repeated prisoner's dilemma, tit-for-tat (TFT) vs always-cheat, random pairing,
// very large population (deterministic shares). A pair plays 10 rounds:
// both help 3 each, helper vs cheat 0 vs 5, both cheat 1 each.
// Average score per pairing with TFT share f: TFT 30f + 9(1-f), cheat 14f + 10(1-f).
// Copying: players switch to the other strategy with a chance proportional to the
// score gap, so f' = f + f(1-f)(W_TFT - W_cheat)/15 (imitation dynamics, clamped to 0..1).
// The grid shows 100 players; which ones play TFT follows an untuned order (mulberry32(8)).

import { useMemo, useState } from "react";
import { Lesson } from "@/kit/Lesson";
import { Control, Readout, Row, Slider } from "@/kit/controls";
import { useMilestones } from "@/kit/milestones";
import { mulberry32 } from "@/kit/random";
import s from "./styles.module.css";

const GENS = 60;
const SETTLED = 50;
const STARTS = [0.05, 0.07];
const MILESTONES = ["low-end", "high-end"] as const;
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
const TRAJ = new Map(STARTS.map((f) => [f, trajectory(f)]));

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

function Stage({ locked, interact }: { locked: boolean; interact: () => void }) {
  const [start, setStart] = useState(STARTS[0]);
  const [gen, setGen] = useState(0);
  const { reach } = useMilestones(interact, MILESTONES);
  const f = TRAJ.get(start)![gen];
  const n = Math.round(100 * f);
  const go = (g: number, st: number) => {
    setGen(g);
    setStart(st);
    if (g >= SETTLED) reach(st === STARTS[0] ? "low-end" : "high-end");
  };
  const cells = useMemo(() => RANK, []);

  return (
    <div className={s.wrap}>
      <svg viewBox="0 0 300 160" className={`stage-svg ${s.svg}`} role="img" aria-label={`Generation ${gen}: ${n} of 100 play tit-for-tat`}>
        {cells.map((rk, i) => {
          const x = 15 + (i % 20) * 13.5 + 6, y = 8 + Math.floor(i / 20) * 13.5 + 6;
          return rk < n ? (
            <circle key={i} cx={x} cy={y} r={5.2} className={s.tft} />
          ) : (
            <rect key={i} x={x - 4.6} y={y - 4.6} width={9.2} height={9.2} rx={1.5} className={s.cheat} />
          );
        })}
        <text x={150} y={100} textAnchor="middle" className={s.big}>
          {n} of 100 play tit-for-tat
        </text>
        <text x={150} y={122} textAnchor="middle" className={s.small}>
          {locked ? "average score per 10-round pairing: ?" : `average per 10 rounds: tit-for-tat ${wT(f).toFixed(1)}, cheat ${wD(f).toFixed(1)}`}
        </text>
        <text x={150} y={142} textAnchor="middle" className={s.small}>
          <tspan className={s.tftT}>●</tspan> tit-for-tat <tspan className={s.cheatT}>■</tspan> always cheat
        </text>
      </svg>

      <p className={s.msg} aria-live="polite">
        {locked
          ? "Make a prediction to start. Toy game: random pairs; players copy higher scorers."
          : `Generation ${gen}, from a ${pct(start)} start.`}
      </p>

      <Row>
        <Control className={s.chip} disabled={locked || gen === GENS} onClick={() => go(GENS, start)}>
          To gen {GENS}
        </Control>
        {STARTS.slice()
          .reverse()
          .map((st) => (
            <Control key={st} className={`${s.chip} ${start === st ? "active" : ""}`} aria-pressed={start === st} disabled={locked || start === st} onClick={() => go(gen, st)}>
              Start at {pct(st)}
            </Control>
          ))}
      </Row>
      <Slider label="Generation" value={gen} min={0} max={GENS} disabled={locked} onChange={(v) => go(v, start)} />
      <Row>
        <Readout label="Tit-for-tat" value={locked ? "?" : `${n} of 100`} />
      </Row>
    </div>
  );
}

export default function StrategyBuilder({ slug }: { slug: string }) {
  return (
    <Lesson
      slug={slug}
      predict={{
        question:
          "Pairs play 10 rounds: both help, 3 each; helper vs cheat, 0 vs 5; both cheat, 1 each. Tit-for-tat helps first, then copies its partner's last move. Players copy higher scorers. What share of tit-for-tat is enough to take over from cheats?",
        options: [`About ${THR}`, "About 50%", "About 95%"],
        answer: 0,
      }}
      exploreHint="Run 60 generations from 5% tit-for-tat, then switch the start to 7%."
      minInteractions={MILESTONES.length}
      reveal={() => (
        <>
          <p>
            From 5% tit-for-tat, cheats won. From 7%, <strong>tit-for-tat took over</strong>. The tipping point is 1 in 17,
            about {THR}.
          </p>
          <p>
            Tit-for-tat loses only round one to a cheat (9 vs 14 points) but earns 30 with its own kind, while two cheats
            earn 10. Once tit-for-tat players meet each other often enough, those 30-point games outweigh their losses:
            21f + 9 = 4f + 10 at f = 1/17. Cooperation can win when helpers keep meeting again.
          </p>
          <p className="muted">
            Model: two fixed strategies, chosen payoffs, 10 rounds, random pairing in a huge population. It is not a
            claim about people.
          </p>
        </>
      )}
    >
      {({ locked, interact }) => <Stage locked={locked} interact={interact} />}
    </Lesson>
  );
}
