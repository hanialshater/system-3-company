"use client";

// Incomplete-dominance toy flower. Each flower has two copies of a colour gene, R (red) or W (white).
// RR = red, RW = pink, WW = white. Both parents are RW. Each seed gets one random copy from each
// parent (50/50). The seeds are a fixed seeded sequence, mulberry32(1), untuned (seed 1 was the first
// tried); pots fill in that order. After 100 seeds: 22 white, 51 pink, 27 red.

import { useState } from "react";
import { Lesson } from "@/kit/Lesson";
import { Control, Row } from "@/kit/controls";
import { Milestones } from "@/kit/milestones";
import { mulberry32 } from "@/kit/random";
import s from "./styles.module.css";

const TOTAL = 100, COLS = 20;
const SEEDS: number[] = (() => {
  const r = mulberry32(1);
  return Array.from({ length: TOTAL }, () => (r() < 0.5 ? 1 : 0) + (r() < 0.5 ? 1 : 0)); // copies of R
})();
const cls = [s.white, s.pink, s.red];
const tally = (n: number) => {
  const c = [0, 0, 0];
  SEEDS.slice(0, n).forEach((k) => c[k]++);
  return { white: c[0], pink: c[1], red: c[2] };
};

function Stage({ locked, n, setN }: { locked: boolean; n: number; setN: (n: number) => void }) {
  const t = tally(n);
  const msg = locked
    ? "Made-up flower: R copy red, W copy white, one of each pink. Both parents are R W (pink)."
    : n === 0
      ? "Plant seeds from the two pink parents."
      : `${n} seed${n > 1 ? "s" : ""} grown: ${t.red} red, ${t.pink} pink, ${t.white} white.`;
  const GAP = 15;
  return (
    <div className={s.wrap}>
      <svg viewBox={`0 0 ${COLS * GAP} 128`} className={`stage-svg ${s.svg}`} role="img" aria-label={msg}>
        {[95, 205].map((x, i) => (
          <g key={i} transform={`translate(${x},16)`}>
            <circle r={13} className={s.pink} />
            <text y={4} textAnchor="middle" className={s.lab}>R W</text>
          </g>
        ))}
        {SEEDS.map((k, i) => {
          const cx = (i % COLS) * GAP + GAP / 2, cy = 50 + Math.floor(i / COLS) * GAP + GAP / 2;
          return <circle key={i} cx={cx} cy={cy} r={5.5} className={i < n ? cls[k] : s.empty} />;
        })}
      </svg>
      <div className={s.legend} aria-hidden>
        <span><i className={s.lr} />R R red</span>
        <span><i className={s.lp} />R W pink</span>
        <span><i className={s.lw} />W W white</span>
      </div>
      <p className={s.msg} aria-live="polite">{msg}</p>
      <Row>
        <Control disabled={locked || n >= TOTAL} onClick={() => setN(Math.min(TOTAL, n + 1))}>Plant 1 seed</Control>
        <Control disabled={locked || n >= TOTAL} onClick={() => setN(Math.min(TOTAL, n + 10))}>Plant 10 more</Control>
        <Control disabled={locked || n >= TOTAL} onClick={() => setN(TOTAL)}>Fill all {TOTAL}</Control>
        <Control disabled={locked || n === 0} onClick={() => setN(0)}>Clear pots</Control>
      </Row>
    </div>
  );
}

export default function PinkFromRedWhite({ slug }: { slug: string }) {
  const [n, setN] = useState(0);
  return (
    <Lesson
      slug={slug}
      predict={{
        question: "In your garden, a made-up flower is pink when it has one red copy plus one white copy of the gene. You cross two pink parents. What share of their seeds grow pink?",
        options: ["All of them", "About half", "None"],
        answer: 1,
      }}
      exploreHint="Plant seeds, then fill all 100 pots and count the colours."
      minInteractions={1}
      reveal={() => {
        const t = tally(TOTAL);
        return (
          <>
            <p>
              Your {TOTAL} pots: <strong>{t.pink} pink</strong>, {t.red} red, {t.white} white. Close to a quarter red, half pink, a quarter white.
            </p>
            <p>
              Each pink parent hands on its R or its W with equal chance. A seed gets R R, R W, W R or W W: red 1, pink 2, white 1 of 4, so pink is half. Here the pair shows directly in the colour; pink parents still carry red and white. The random seeds are one run, so the counts wobble around 25 : 50 : 25.
            </p>
          </>
        );
      }}
    >
      {({ locked, interact }) => (
        <Milestones interact={interact} names={["all-100"]}>
          {(reach) => <Stage locked={locked} n={n} setN={(v) => { setN(v); if (v === TOTAL) reach("all-100"); }} />}
        </Milestones>
      )}
    </Lesson>
  );
}
