"use client";

// Variance and risk. Two games both average +$1 a play. The stage draws 20 seeded players'
// wealth over 100 plays on one fixed axis. Game Y's lines fan out far wider, and more of them
// finish below zero. Then 1,000 players per game count it.
// Key state: Game Y's fan, then the 1,000-player count.

import { useMemo, useState } from "react";
import { Lesson } from "@/kit/Lesson";
import { useMilestones } from "@/kit/milestones";
import { Control, Readout, Row } from "@/kit/controls";
import { GAMES, PLAYS, SHOWN, crowd, ev, exactBehind, players } from "./model";
import s from "./styles.module.css";

const CROWDS = GAMES.map((g) => crowd(g));
const EXACT = GAMES.map((g) => exactBehind(g));
const MILESTONES = ["saw-y", "crowd"] as const;
const pct = (p: number) => `${Math.round(p * 100)}%`;

const W = 340;
const H = 210;
const L = 40;
const R = 8;
const T = 10;
const B = 20;
const YMIN = -400;
const YMAX = 900;
const sx = (i: number) => L + (i / PLAYS) * (W - L - R);
const sy = (v: number) => T + ((YMAX - Math.max(YMIN, Math.min(YMAX, v))) / (YMAX - YMIN)) * (H - T - B);
const money = (v: number) => `${v < 0 ? "-" : "+"}$${Math.abs(Math.round(v))}`;

interface State {
  game: number;
  batch: number;
  crowd: boolean;
}

function Stage({ locked, interact, st, set }: { locked: boolean; interact: () => void; st: State; set: (s: State) => void }) {
  const { reach } = useMilestones(interact, MILESTONES);
  const g = GAMES[st.game];
  const paths = useMemo(() => players(g, st.batch), [g, st.batch]);
  const ends = paths.map((p) => p[PLAYS]);
  const behind = ends.filter((e) => e < 0).length;
  const avg = ends.reduce((a, b) => a + b, 0) / ends.length;

  return (
    <div className={s.wrap}>
      <p className={s.chip}>
        Game {g.id}: {g.rule}
      </p>
      <svg viewBox={`0 0 ${W} ${H}`} className={`stage-svg ${s.svg}`} role="img" aria-label={`Game ${g.id}: ${SHOWN} players, ${behind} ended behind`}>
        {[-400, 0, 400, 800].map((v) => (
          <g key={v}>
            <line x1={L} x2={W - R} y1={sy(v)} y2={sy(v)} className={v === 0 ? s.zero : s.grid} />
            <text x={L - 4} y={sy(v) + 3.5} textAnchor="end" className={s.tick}>
              {v === 0 ? "$0" : money(v)}
            </text>
          </g>
        ))}
        {paths.map((p, k) => (
          <polyline
            key={k}
            points={p.map((v, i) => `${sx(i).toFixed(1)},${sy(v).toFixed(1)}`).join(" ")}
            className={p[PLAYS] < 0 ? s.lineBad : s.line}
          />
        ))}
        {ends.map((e, k) => (
          <circle key={k} cx={sx(PLAYS)} cy={sy(e)} r={2.6} className={e < 0 ? s.endBad : s.end} />
        ))}
        <text x={L} y={H - 5} className={s.tick}>
          play 0
        </text>
        <text x={W - R} y={H - 5} textAnchor="end" className={s.tick}>
          play {PLAYS}
        </text>
      </svg>
      <p className={s.msg} aria-live="polite">
        {locked
          ? "Make a prediction to start."
          : st.crowd
            ? `1,000 players each. Behind: X ${pct(CROWDS[0].behind / 1000)}, Y ${pct(CROWDS[1].behind / 1000)}.`
            : `Red lines ended below $0.`}
      </p>
      <Row>
        {GAMES.map((x, i) => (
          <Control
            key={x.id}
            className={i === st.game ? "active" : ""}
            aria-pressed={i === st.game}
            disabled={locked || i === st.game}
            onClick={() => {
              set({ ...st, game: i });
              if (x.id === "Y") reach("saw-y");
            }}
          >
            Game {x.id}
          </Control>
        ))}
        <Control disabled={locked} onClick={() => set({ ...st, batch: st.batch + 1 })}>
          20 new players
        </Control>
        <Control
          disabled={locked || st.crowd}
          onClick={() => {
            set({ ...st, crowd: true });
            reach("crowd");
          }}
        >
          1,000 players each
        </Control>
      </Row>
      <Row>
        <Readout label={`Behind (of ${SHOWN})`} value={locked ? "?" : behind} />
        <Readout label="Average end" value={locked ? "?" : money(avg)} />
      </Row>
    </div>
  );
}

export default function SameAverage({ slug }: { slug: string }) {
  const [st, set] = useState<State>({ game: 0, batch: 0, crowd: false });
  const [X, Y] = GAMES;

  return (
    <Lesson
      slug={slug}
      predict={{
        question: `Game X: coin flip, win $${X.win} or lose $${X.lose}. Game Y: ${Y.p * 100}% chance to win $${Y.win}, else lose $${Y.lose}. Both average +$${ev(X)} per play. After ${PLAYS} plays, which leaves you behind more often?`,
        options: ["X", "Y", "Equally often"],
        answer: 1,
      }}
      exploreHint="Switch to Game Y and watch the spread. Then run 1,000 players each."
      minInteractions={MILESTONES.length}
      reveal={() => (
        <>
          <p>
            Both crowds averaged about +$100 after {PLAYS} plays ({money(CROWDS[0].mean)} and {money(CROWDS[1].mean)} in your
            runs). But <strong>Game Y</strong> left {pct(CROWDS[1].behind / 1000)} of its players behind, against{" "}
            {pct(CROWDS[0].behind / 1000)} for X. The exact chances are {pct(EXACT[1])} and {pct(EXACT[0])}.
          </p>
          <p>
            Y pays through rare big wins. Most players lose $5 a time and wait; if fewer than 9 of 100 plays win, they end
            behind. X is steadier: small wins and losses, half the time each.
          </p>
          <p className="muted">The average tells you where the crowd ends up. The spread tells you how many people get there.</p>
        </>
      )}
    >
      {({ locked, interact }) => <Stage locked={locked} interact={interact} st={st} set={set} />}
    </Lesson>
  );
}
