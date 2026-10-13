"use client";

// Gambler's ruin in a fair game. 30 seeded games are drawn as bankroll lines (green = ended with all $110, red =
// ruined). A second button plays 300 more games at the same stake so the tally gets close to the exact stake/110.
// Key state: $10 stake with 30 then 330 games, then a $50 stake. Numbers all come from model.ts.

import { useState } from "react";
import { Lesson } from "@/kit/Lesson";
import { Milestones } from "@/kit/milestones";
import { Control, Readout, Row } from "@/kit/controls";
import { MORE, SHOWN, TOTAL, exact, games, wins } from "./model";
import s from "./styles.module.css";

const MILESTONES = ["ten", "ten-many", "fifty"] as const;
const W = 320;
const H = 130;
const PL = 26;
const PT = 6;
const PB = 118;
const px = (f: number) => PL + f * (W - PL - 6);
const py = (v: number) => PB - (v / TOTAL) * (PB - PT);
const pct = (p: number) => `${Math.round(p * 100)}%`;
const pct1 = (p: number) => `${(p * 100).toFixed(1)}%`;

type Counts = Record<number, number>;

function Stage({ locked, reach, stake, setStake, played, setPlayed }: {
  locked: boolean;
  reach: (n: string) => void;
  stake: number | null;
  setStake: (v: number) => void;
  played: Counts;
  setPlayed: (c: Counts) => void;
}) {
  const n = stake ? played[stake] ?? SHOWN : 0;
  const shown = stake ? games(stake, SHOWN) : [];
  const maxSteps = Math.max(1, ...shown.map((g) => g.steps));
  const k = stake ? wins(stake, n) : 0;
  const start = (v: number) => {
    setStake(v);
    setPlayed({ ...played, [v]: played[v] ?? SHOWN });
    reach(v === 10 ? "ten" : "fifty");
  };

  return (
    <div className={s.wrap}>
      <p className={s.msg}>
        {locked
          ? "Make a prediction to start."
          : `Each line is one game of fair $1 bets until someone holds all $${TOTAL}. Green: you took it all. Red: ruined.`}
      </p>
      <svg viewBox={`0 0 ${W} ${H}`} className={`stage-svg ${s.svg}`} role="img" aria-label={stake ? `${SHOWN} games starting with $${stake}` : "No games yet"}>
        {[0, TOTAL].map((v) => (
          <g key={v}>
            <line x1={PL} x2={W - 6} y1={py(v)} y2={py(v)} className={s.edge} />
            <text x={PL - 3} y={py(v) + 3} textAnchor="end" className={s.lab}>${v}</text>
          </g>
        ))}
        {stake && (
          <>
            <line x1={PL} x2={W - 6} y1={py(stake)} y2={py(stake)} className={s.start} />
            <text x={PL - 3} y={py(stake) + 3} textAnchor="end" className={s.lab}>${stake}</text>
          </>
        )}
        {shown.map((g, gi) => (
          <polyline
            key={gi}
            fill="none"
            className={g.won ? s.win : s.lose}
            points={g.path.map((v, i) => `${px(Math.sqrt(((i / (g.path.length - 1)) * g.steps) / maxSteps)).toFixed(1)},${py(v).toFixed(1)}`).join(" ")}
          />
        ))}
        <text x={W - 6} y={H - 2} textAnchor="end" className={s.lab}>bets (compressed) →</text>
      </svg>
      <Row>
        <Control disabled={locked} onClick={() => start(10)}>Start with $10</Control>
        <Control
          disabled={locked || !stake || (played[stake] ?? 0) > SHOWN}
          onClick={() => {
            if (!stake) return;
            setPlayed({ ...played, [stake]: SHOWN + MORE });
            if (stake === 10) reach("ten-many");
          }}
        >
          Play {MORE} more games
        </Control>
        <Control disabled={locked} onClick={() => start(50)}>Start with $50</Control>
      </Row>
      <Row>
        <Readout label="You hold" value={locked || !stake ? "?" : `$${stake}`} />
        <Readout label={`Took all $${TOTAL}`} value={locked || !stake ? "?" : `${k} of ${n}`} />
      </Row>
    </div>
  );
}

export default function FairGameStillRuins({ slug }: { slug: string }) {
  const [stake, setStake] = useState<number | null>(null);
  const [played, setPlayed] = useState<Counts>({});
  const n10 = played[10] ?? SHOWN;
  const n50 = played[50] ?? SHOWN;
  return (
    <Lesson
      slug={slug}
      predict={{
        question: `Fair coin, $1 bets. You hold $10 and the house holds $${TOTAL - 10}. You play until one side has all $${TOTAL}. Your chance of taking it all?`,
        options: ["50%", `about ${pct(exact(10))}`, "about 1%"],
        answer: 1,
      }}
      exploreHint="Start with $10, play 300 more games, then try $50."
      minInteractions={MILESTONES.length}
      reveal={() => (
        <>
          <p>
            With $10 you took all ${TOTAL} in {wins(10, n10)} of {n10} games ({pct1(wins(10, n10) / n10)}); the exact fair-game chance is stake / total = 10 / {TOTAL} = {pct1(exact(10))}. With $50 it was{" "}
            {wins(50, n50)} of {n50}; exact {pct1(exact(50))}.
          </p>
          <p>
            Each bet is fair, yet the poorer side is usually ruined, while the rare wins run far. Fair odds do not mean an even chance of ending richer.
          </p>
        </>
      )}
    >
      {({ locked, interact }) => (
        <Milestones interact={interact} names={MILESTONES}>
          {(reach) => <Stage locked={locked} reach={reach} stake={stake} setStake={setStake} played={played} setPlayed={setPlayed} />}
        </Milestones>
      )}
    </Lesson>
  );
}
