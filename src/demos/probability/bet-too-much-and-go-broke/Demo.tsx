"use client";

// Kelly staking. 31 seeded players, same coin flips at every stake, drawn as money lines on a
// x10-per-gridline chart over 100 rounds; the middle player (16th of 31 by heads) is bold. The learner
// picks the stake: 5% (start), 10%, 20%, 30%, 40%, 60%. Key state: 20% and 60% both seen.
// Stake buttons come first in DOM order, so QA visits every stake the question and reveal name.

import { useState } from "react";
import { Lesson } from "@/kit/Lesson";
import { useMilestones } from "@/kit/milestones";
import { Control, Readout, Row } from "@/kit/controls";
import { BEST, P_HEADS, PLAYERS, ROUNDS, STAKES, flips, middle, path } from "./model";
import s from "./styles.module.css";

const MILESTONES = ["twenty", "sixty"] as const;
const FLIPS = flips();
const MID = middle(FLIPS);
const pct = (f: number) => `${Math.round(f * 100)}%`;
const times = (v: number) => `×${v >= 1 ? v.toFixed(2) : v.toPrecision(2)}`;
const final = (f: number, i = MID) => path(FLIPS[i], f)[ROUNDS];
const above = (f: number) => FLIPS.filter((_, i) => final(f, i) > 1).length;
const LOW = STAKES[0];
const HIGH = STAKES[STAKES.length - 1];

const X0 = 48;
const X1 = 332;
const Y0 = 8;
const Y1 = 178;
const TOP = 3; // 10^3
const BOT = -4; // 10^-4
const x = (t: number) => X0 + (t / ROUNDS) * (X1 - X0);
const y = (v: number) => {
  const l = Math.min(TOP, Math.max(BOT, Math.log10(v)));
  return Y0 + ((TOP - l) / (TOP - BOT)) * (Y1 - Y0);
};
const GRID = [3, 2, 1, 0, -1, -2, -3, -4];
const gridLabel = (e: number) => (e >= 0 ? `×${(10 ** e).toLocaleString("en-US")}` : `×${10 ** e}`);
const pts = (p: number[]) => p.map((v, t) => `${x(t).toFixed(1)},${y(v).toFixed(1)}`).join(" ");

function Stage({ locked, interact, f, setF }: { locked: boolean; interact: () => void; f: number; setF: (f: number) => void }) {
  const { reach } = useMilestones(interact, MILESTONES);

  return (
    <div className={s.wrap}>
      <p className={s.msg}>
        {locked ? "Make a prediction to start." : `${PLAYERS} players, same flips. Bold: the middle player. Each gridline is 10 times the one below.`}
      </p>
      <p className={s.msg} aria-live="polite">
        {locked ? "" : `At ${pct(f)}: a win multiplies your money by ${(1 + f).toFixed(2)}, a loss by ${(1 - f).toFixed(2)}; one of each, by ${((1 + f) * (1 - f)).toFixed(2)}.`}
      </p>
      <svg viewBox="0 0 340 192" className={`stage-svg ${s.svg}`} role="img" aria-label={`Money of ${PLAYERS} players staking ${pct(f)} each round`}>
        {GRID.map((e) => (
          <g key={e}>
            <line x1={X0} y1={y(10 ** e)} x2={X1} y2={y(10 ** e)} className={e === 0 ? s.start : s.grid} />
            <text x={X0 - 4} y={y(10 ** e) + 3.5} textAnchor="end" className={s.tick}>
              {gridLabel(e)}
            </text>
          </g>
        ))}
        <text x={X1} y={190} textAnchor="end" className={s.tick}>
          round {ROUNDS}
        </text>
        {FLIPS.map((row, i) => (i === MID ? null : <polyline key={i} points={pts(path(row, f))} className={s.line} />))}
        <polyline points={pts(path(FLIPS[MID], f))} className={s.mid} />
      </svg>
      <Row>
        {STAKES.map((st) => (
          <Control
            key={st}
            className={f === st ? "active" : ""}
            disabled={locked || f === st}
            onClick={() => {
              setF(st);
              if (st === BEST) reach("twenty");
              if (st === HIGH) reach("sixty");
            }}
          >
            Stake {pct(st)}
          </Control>
        ))}
      </Row>
      <Row>
        <Readout label="Middle player ends" value={locked ? "?" : times(final(f))} />
        <Readout label="Players above start" value={locked ? "?" : `${above(f)} of ${PLAYERS}`} />
      </Row>
    </div>
  );
}

export default function BetTooMuch({ slug }: { slug: string }) {
  const [f, setF] = useState(LOW);
  const win = 1 + HIGH;
  const lose = 1 - HIGH;

  return (
    <Lesson
      slug={slug}
      predict={{
        question: `A coin lands heads ${pct(P_HEADS)} of the time and pays even money. Each round you stake the same share of your money. Which share leaves the middle player (half do better, half worse) richest after ${ROUNDS} rounds?`,
        options: [pct(LOW), pct(BEST), pct(HIGH)],
        answer: 1,
      }}
      exploreHint={`Raise the stake from ${pct(LOW)} to ${pct(HIGH)} and watch the bold line.`}
      minInteractions={MILESTONES.length}
      reveal={() => (
        <>
          <p>
            Your middle player ended with {times(final(LOW))} at {pct(LOW)}, <strong>{times(final(BEST))} at {pct(BEST)}</strong> and{" "}
            {times(final(HIGH))} at {pct(HIGH)}, where only {above(HIGH)} of {PLAYERS} stayed above their start. Every bet favoured you.
          </p>
          <p>
            A loss at a big stake costs more than a win gains back: at {pct(HIGH)}, one win then one loss leaves {win.toFixed(1)} ×{" "}
            {lose.toFixed(1)} = {(win * lose).toFixed(2)}. The best share is 2 × {P_HEADS} − 1 = {pct(BEST)} (the Kelly rule), for this model coin; real bets differ. Not advice.
          </p>
        </>
      )}
    >
      {({ locked, interact }) => <Stage locked={locked} interact={interact} f={f} setF={setF} />}
    </Lesson>
  );
}
