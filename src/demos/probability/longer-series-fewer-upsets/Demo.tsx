"use client";

// Series length and upsets. 1,000 seeded series drawn as a 40 x 25 grid of squares; series the
// underdog won are filled first (in reading order), so the filled part reads as a share.
// Length buttons 1 (start), 3, 7, 21, 101 in DOM order. Key state: best-of-7 and best-of-101 seen.

import { useState } from "react";
import { Lesson } from "@/kit/Lesson";
import { useMilestones } from "@/kit/milestones";
import { Control, Readout, Row } from "@/kit/controls";
import { LENGTHS, P, SERIES, SEVEN, exact, series, wins } from "./model";
import s from "./styles.module.css";

const MILESTONES = ["seven", "long"] as const;
const LONGEST = LENGTHS[LENGTHS.length - 1];
const WINS = new Map(LENGTHS.map((n) => [n, wins(series(n))] as const));
const won = (n: number) => WINS.get(n) ?? 0;
const pct = (p: number) => `${Math.round(p * 100)}%`;
const pct1 = (p: number) => `${(p * 100).toFixed(1)}%`;
const fmt = (v: number) => v.toLocaleString("en-US");
const COLS = 40;
const CELL = 8;

function Stage({ locked, interact, len, setLen }: { locked: boolean; interact: () => void; len: number; setLen: (n: number) => void }) {
  const { reach } = useMilestones(interact, MILESTONES);
  const w = won(len);

  return (
    <div className={s.wrap}>
      <p className={s.msg}>
        {locked ? "Make a prediction to start." : `Each square: one best-of-${len} series. Filled: the underdog (${pct(P)} per game) won it.`}
      </p>
      <svg viewBox={`0 0 ${COLS * CELL} ${(SERIES / COLS) * CELL}`} className={`stage-svg ${s.svg}`} role="img" aria-label={`Underdog won ${w} of ${SERIES} best-of-${len} series`}>
        {Array.from({ length: SERIES }, (_, i) => (
          <rect
            key={i}
            x={(i % COLS) * CELL + 0.5}
            y={Math.floor(i / COLS) * CELL + 0.5}
            width={CELL - 1}
            height={CELL - 1}
            rx={1}
            className={!locked && i < w ? s.won : s.lost}
          />
        ))}
      </svg>
      <Row>
        {LENGTHS.map((n) => (
          <Control
            key={n}
            className={len === n ? "active" : ""}
            disabled={locked || len === n}
            onClick={() => {
              setLen(n);
              if (n === SEVEN) reach("seven");
              if (n === LONGEST) reach("long");
            }}
          >
            Best of {n}
          </Control>
        ))}
      </Row>
      <Row>
        <Readout label="Underdog won" value={locked ? "?" : `${fmt(w)} of ${fmt(SERIES)}`} />
        <Readout label="Exact chance" value={locked ? "?" : pct1(exact(len))} />
      </Row>
    </div>
  );
}

export default function LongerSeries({ slug }: { slug: string }) {
  const [len, setLen] = useState(LENGTHS[0]);

  return (
    <Lesson
      slug={slug}
      predict={{
        question: `It's playoff time and your team is the underdog: it wins each game ${pct(P)} of the time, whatever happened the game before. What's its chance of taking a best-of-seven series (first to 4 wins)?`,
        options: [pct(P), `about ${pct(exact(SEVEN))}`, "about 10%"],
        answer: 1,
      }}
      exploreHint={`Change the series length: try ${SEVEN}, then ${LONGEST} games.`}
      minInteractions={MILESTONES.length}
      reveal={() => (
        <>
          <p>
            In your {fmt(SERIES)} best-of-{SEVEN} series the underdog won {fmt(won(SEVEN))}; the exact chance is{" "}
            <strong>{pct1(exact(SEVEN))}</strong>. Best-of-1 gave it {fmt(won(1))}, best-of-21 {fmt(won(21))}, best-of-{LONGEST} only{" "}
            {fmt(won(LONGEST))}.
          </p>
          <p>
            Each extra game is another chance for the better team to show it, so luck washes out. This assumes independent games at a
            steady {pct(P)}; real teams vary from game to game.
          </p>
        </>
      )}
    >
      {({ locked, interact }) => <Stage locked={locked} interact={interact} len={len} setLen={setLen} />}
    </Lesson>
  );
}
