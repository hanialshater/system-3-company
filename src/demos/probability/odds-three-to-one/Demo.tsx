"use client";

// Odds versus probability. Four blocks sit in a Lose tray and a Win tray. Tapping a block moves it.
// Odds against compare losses to wins; the chance of winning compares wins to all blocks.
// Key state: 3 losing blocks and 1 winning block (3 to 1 against, 1 of 4 = 25%), then 2 and 2 (evens, 50%).
// Blocks keep a fixed DOM order (QA presses them in order); CSS grid places each in its tray.

import { useState } from "react";
import { Lesson } from "@/kit/Lesson";
import { useMilestones } from "@/kit/milestones";
import { Control, Readout, Row } from "@/kit/controls";
import s from "./styles.module.css";

const BLOCKS = 4;
const MILESTONES = ["three-to-one", "evens"] as const;
const chance = (wins: number, losses: number) => wins / (wins + losses);
const pct = (p: number) => `${Math.round(p * 100)}%`;

function Stage({ locked, interact, win, setWin }: { locked: boolean; interact: () => void; win: boolean[]; setWin: (w: boolean[]) => void }) {
  const { reach } = useMilestones(interact, MILESTONES);
  const wins = win.filter(Boolean).length;
  const losses = BLOCKS - wins;

  const toggle = (i: number) => {
    const next = win.map((w, j) => (j === i ? !w : w));
    setWin(next);
    const w = next.filter(Boolean).length;
    const l = BLOCKS - w;
    if (l === 3 && w === 1) reach("three-to-one");
    if (l === 2 && w === 2) reach("evens");
  };

  // Place each block in its tray without changing DOM order.
  const rank: number[] = [];
  let nl = 0;
  let nw = 0;
  for (const w of win) rank.push(w ? nw++ : nl++);

  return (
    <div className={s.wrap}>
      <p className={s.msg}>{locked ? "Make a prediction to start." : "Tap a block to move it."}</p>
      <div className={s.trays}>
        <div className={`${s.tray} ${s.loseTray}`} aria-hidden="true" />
        <div className={`${s.tray} ${s.winTray}`} aria-hidden="true" />
        <span className={s.head} style={{ gridColumn: "1 / 3", gridRow: 1 }}>
          Lose: {losses}
        </span>
        <span className={s.head} style={{ gridColumn: "4 / 6", gridRow: 1 }}>
          Win: {wins}
        </span>
        {win.map((w, i) => (
          <Control
            key={i}
            className={`${s.block} ${w ? s.blockWin : s.blockLose}`}
            style={{ gridColumn: (w ? 4 : 1) + (rank[i] % 2), gridRow: 2 + Math.floor(rank[i] / 2) }}
            disabled={locked}
            aria-label={`Block ${i + 1}: ${w ? "win" : "lose"}. Move it`}
            onClick={() => toggle(i)}
          >
            <span className={s.pip} />
          </Control>
        ))}
      </div>
      <svg viewBox="0 0 320 30" className={`stage-svg ${s.bar}`} role="img" aria-label={`Win share ${wins} of ${BLOCKS}`}>
        {win.map((_, i) => (
          <rect key={i} x={2 + i * 79} y={4} width={76} height={22} rx={5} className={i < wins ? s.segWin : s.segLose} />
        ))}
      </svg>
      <Row>
        <Readout label="Odds against (losses to wins)" value={`${losses} to ${wins}`} />
        <Readout label="Win chance" value={`${wins} of ${BLOCKS} = ${pct(chance(wins, losses))}`} />
      </Row>
    </div>
  );
}

export default function OddsThreeToOne({ slug }: { slug: string }) {
  const [win, setWin] = useState<boolean[]>(() => new Array(BLOCKS).fill(false));

  return (
    <Lesson
      slug={slug}
      predict={{
        question: "At the racetrack, the bookie shows your horse at 3 to 1 against. What chance of winning is that?",
        options: [pct(1 / 3), pct(chance(1, 3)), pct(chance(3, 1))],
        answer: 1,
      }}
      exploreHint="Move blocks until it reads 3 to 1 against. Then try 2 and 2."
      minInteractions={MILESTONES.length}
      reveal={() => (
        <>
          <p>
            With 3 blocks in Lose and 1 in Win you had odds of 3 to 1 against. The win is 1 block out of all {BLOCKS}:{" "}
            <strong>{pct(chance(1, 3))}</strong>, not 1 in 3.
          </p>
          <p>
            At 2 and 2 the odds were 2 to 2, the same as 1 to 1 (&ldquo;evens&rdquo;), and the chance was{" "}
            {pct(chance(2, 2))}. Odds compare wins with losses; a chance compares wins with everything.
          </p>
        </>
      )}
    >
      {({ locked, interact }) => <Stage locked={locked} interact={interact} win={win} setWin={setWin} />}
    </Lesson>
  );
}
