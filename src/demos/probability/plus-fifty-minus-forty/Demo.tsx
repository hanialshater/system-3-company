"use client";

// Multiplicative bets. 50 seeded players each start with $100; every round a fair coin
// multiplies their money by 1.5 or 0.6. On a log axis the crowd sinks while a few soar.
// The overlay shows the average of the 50 (pulled up by the few) and the typical (median) player.
// Key state: round 100, with the average and typical lines shown.

import { useMemo, useState } from "react";
import { Lesson } from "@/kit/Lesson";
import { useMilestones } from "@/kit/milestones";
import { Control, Readout, Row } from "@/kit/controls";
import { DOWN, PLAYERS, ROUNDS, START, UP, headsToGain, meanFactor, pAtLeast, paths, stats } from "./model";
import s from "./styles.module.css";

const MILESTONES = ["round-100", "lines", "pair"] as const;
const K_GAIN = headsToGain(); // 56
const P_GAIN = pAtLeast(K_GAIN); // 13.6%
const GAIN_PCT = Math.round((meanFactor - 1) * 100); // 5

const W = 340;
const H = 210;
const L = 44;
const R = 8;
const T = 8;
const B = 20;
const LMIN = -2; // $0.01
const LMAX = 6; // $1,000,000
const sx = (i: number) => L + (i / ROUNDS) * (W - L - R);
const sy = (v: number) => {
  const lv = Math.max(LMIN, Math.min(LMAX, Math.log10(Math.max(v, 1e-9))));
  return T + ((LMAX - lv) / (LMAX - LMIN)) * (H - T - B);
};
const dollars = (v: number) =>
  v >= 1000 ? `$${Math.round(v).toLocaleString("en-US")}` : v >= 10 ? `$${v.toFixed(0)}` : v >= 0.01 ? `$${v.toFixed(2)}` : "under 1¢";
const TICKS: [number, string][] = [
  [0.01, "1¢"],
  [1, "$1"],
  [100, "$100"],
  [10000, "$10k"],
  [1e6, "$1M"],
];

interface State {
  t: number;
  batch: number;
  lines: boolean;
  pair: boolean;
}

function Stage({ locked, interact, st, set }: { locked: boolean; interact: () => void; st: State; set: (s: State) => void }) {
  const { reach } = useMilestones(interact, MILESTONES);
  const all = useMemo(() => paths(st.batch), [st.batch]);
  const now = stats(all, st.t);
  const series = useMemo(() => Array.from({ length: ROUNDS + 1 }, (_, i) => stats(all, i)), [all]);
  const line = (vals: number[]) => vals.slice(0, st.t + 1).map((v, i) => `${sx(i).toFixed(1)},${sy(v).toFixed(1)}`).join(" ");

  const play = (n: number) => {
    const t = Math.min(ROUNDS, st.t + n);
    set({ ...st, t });
    if (t === ROUNDS) reach("round-100");
    if (t === ROUNDS && st.lines) reach("lines");
  };

  return (
    <div className={s.wrap}>
      <p className={s.chip}>
        Fair coin each round: ×{UP} or ×{DOWN}. Log scale: each gridline is 100× the one below, so $100 to $1 is a 99% loss.
      </p>
      <svg viewBox={`0 0 ${W} ${H}`} className={`stage-svg ${s.svg}`} role="img" aria-label={`${PLAYERS} players after ${st.t} rounds; typical ${dollars(now.median)}`}>
        {TICKS.map(([v, lab]) => (
          <g key={v}>
            <line x1={L} x2={W - R} y1={sy(v)} y2={sy(v)} className={v === START ? s.start : s.grid} />
            <text x={L - 4} y={sy(v) + 3.5} textAnchor="end" className={s.tick}>
              {lab}
            </text>
          </g>
        ))}
        {all.map((p, k) => (
          <polyline key={k} points={line(p)} className={st.lines ? s.faint : s.player} />
        ))}
        {st.lines && (
          <>
            <polyline points={line(series.map((x) => x.mean))} className={s.mean} />
            <polyline points={line(series.map((x) => x.median))} className={s.median} />
            <text x={sx(st.t) - 2} y={sy(now.mean) - 6} textAnchor="end" className={s.meanLabel}>
              average {dollars(now.mean)}
            </text>
            <text x={sx(st.t) - 2} y={sy(now.median) + 14} textAnchor="end" className={s.medianLabel}>
              typical {dollars(now.median)}
            </text>
          </>
        )}
        <text x={L} y={H - 5} className={s.tick}>
          round 0
        </text>
        <text x={W - R} y={H - 5} textAnchor="end" className={s.tick}>
          round {st.t}
        </text>
      </svg>
      <Row>
        <Control disabled={locked || st.t >= ROUNDS} onClick={() => play(10)}>
          Play 10 rounds
        </Control>
        <Control disabled={locked || st.t >= ROUNDS} onClick={() => play(ROUNDS)}>
          Play to round {ROUNDS}
        </Control>
        <Control
          disabled={locked}
          onClick={() => {
            set({ ...st, lines: !st.lines });
            if (!st.lines && st.t === ROUNDS) reach("lines");
          }}
        >
          {st.lines ? "Hide average and typical" : "Show average and typical"}
        </Control>
        <Control disabled={locked} onClick={() => set({ ...st, batch: st.batch + 1 })}>
          New {PLAYERS} players
        </Control>
      </Row>
      <Row>
        <Control
          disabled={locked}
          className={st.pair ? "active" : ""}
          onClick={() => {
            set({ ...st, pair: !st.pair });
            if (!st.pair) reach("pair");
          }}
        >
          {st.pair ? "Hide heads then tails" : "Try heads then tails"}
        </Control>
      </Row>
      {st.pair && (
        <p className={s.chip}>
          ${START} → ×{UP} → ${START * UP} → ×{DOWN} → ${Math.round(START * UP * DOWN)}: a loss, though heads and tails
          are equally likely.
        </p>
      )}
      <Row>
        <Readout label="Round" value={st.t} />
        <Readout label="Typical (median) player" value={locked ? "?" : dollars(now.median)} />
        <Readout label={`Above $${START}`} value={locked ? "?" : `${now.above} of ${PLAYERS}`} />
      </Row>
    </div>
  );
}

export default function PlusFiftyMinusForty({ slug }: { slug: string }) {
  const [st, set] = useState<State>({ t: 0, batch: 0, lines: false, pair: false });
  const end = stats(paths(st.batch), ROUNDS);

  return (
    <Lesson
      slug={slug}
      predict={{
        question: `Each round a fair coin: heads multiplies your money by ${UP}, tails by ${DOWN}. The average round gains ${GAIN_PCT}%. After ${ROUNDS} rounds, what happens to a typical player?`,
        options: [`Grows about ${GAIN_PCT}% per round`, "Shrinks", "Roughly breaks even"],
        answer: 1,
      }}
      exploreHint="Play to round 100, show the average and typical player, and try heads then tails."
      minInteractions={MILESTONES.length}
      reveal={() => (
        <>
          <p>
            Your typical player (the median: half the players ended below) <strong>shrank</strong> from ${START} to {dollars(end.median)}, and only {end.above} of {PLAYERS}{" "}
            ended above the start. Yet the average of the {PLAYERS} was {dollars(end.mean)}: a few lucky players carried it.
          </p>
          <p>
            A head then a tail is ×{UP} × {DOWN} = ×{(UP * DOWN).toFixed(1)}: a loss. A typical player gets about {ROUNDS / 2} heads
            and {ROUNDS / 2} tails, so about {ROUNDS / 2} such pairs: ×0.9 fifty times leaves about half a percent of the start.
            You need {K_GAIN}+ heads in {ROUNDS} to end up ahead; only {Math.round(P_GAIN * 100)}% of players get them.
          </p>
          <p className="muted">
            Averaged over every possible player, the result would be far above the average of any {PLAYERS} you drew: it rests on
            rare, huge winners. Almost nobody lives on that average.
          </p>
        </>
      )}
    >
      {({ locked, interact }) => <Stage locked={locked} interact={interact} st={st} set={set} />}
    </Lesson>
  );
}
