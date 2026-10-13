"use client";

// Efron's dice: A {4,4,4,4,0,0}, B {3 x 6}, C {6,6,2,2,2,2}, D {5,5,5,1,1,1}. Each die beats the next (A>B>C>D>A)
// with probability 24/36 = 2/3 (enumerated, no ties). A match is 100 rolls of both dice, higher face wins.
// Seeds mulberry32(pair * 1000 + batch + 1); batch 0 is the first seed tried, untuned.
// Key states: all four matches (A-B, B-C, C-D, then D-A) played once. "Roll again" plays the next batch.

import { useState } from "react";
import { Lesson } from "@/kit/Lesson";
import { Control, Readout, Row } from "@/kit/controls";
import { useMilestones } from "@/kit/milestones";
import { mulberry32 } from "@/kit/random";
import s from "./styles.module.css";

const DICE: Record<string, number[]> = { A: [4, 4, 4, 4, 0, 0], B: [3, 3, 3, 3, 3, 3], C: [6, 6, 2, 2, 2, 2], D: [5, 5, 5, 1, 1, 1] };
const NAMES = ["A", "B", "C", "D"];
const PAIRS: [string, string][] = [["A", "B"], ["B", "C"], ["C", "D"], ["D", "A"]];
const ROLLS = 100;
const MILESTONES = PAIRS.map(([x, y]) => `played-${x}${y}`);

function exactWins(x: string, y: string): number {
  let w = 0;
  for (const a of DICE[x]) for (const b of DICE[y]) if (a > b) w++;
  return w;
}
const EXACT = PAIRS.map(([x, y]) => exactWins(x, y)); // each 24 of 36
const mean = (d: string) => DICE[d].reduce((a, b) => a + b, 0) / 6;

function match(pi: number, batch: number): number {
  const [x, y] = PAIRS[pi];
  const rng = mulberry32(pi * 1000 + batch + 1);
  let w = 0;
  for (let r = 0; r < ROLLS; r++) {
    const a = DICE[x][Math.floor(rng() * 6)], b = DICE[y][Math.floor(rng() * 6)];
    if (a > b) w++;
  }
  return w;
}
const FIRST = PAIRS.map((_, i) => match(i, 0));
const AVG_OF_EXACT = `${EXACT[0]} in 36`;

function Stage({ locked, interact }: { locked: boolean; interact: () => void }) {
  const { reach } = useMilestones(interact, MILESTONES);
  const [cur, setCur] = useState<number | null>(null);
  const [batches, setBatches] = useState<number[]>([0, 0, 0, 0]);
  const [wins, setWins] = useState<(number | null)[]>([null, null, null, null]);

  const play = (pi: number) => {
    const b = batches[pi];
    setBatches(batches.map((v, i) => (i === pi ? v + 1 : v)));
    setWins(wins.map((v, i) => (i === pi ? match(pi, b) : v)));
    setCur(pi);
    reach(`played-${PAIRS[pi][0]}${PAIRS[pi][1]}`);
  };
  const [cx, cy] = cur === null ? ["", ""] : PAIRS[cur];
  const w = cur === null ? null : wins[cur];
  const msg = locked
    ? "Toy dice, no ties. A match: 100 rolls, higher face wins."
    : cur === null
      ? "Pick a match. Each plays 100 rolls."
      : `${cx} beat ${cy} in ${w} of ${ROLLS} rolls; ${cy} won ${ROLLS - w!}.`;
  return (
    <div className={s.wrap}>
      <p className={s.msg} aria-live="polite">{msg}</p>
      <svg viewBox="0 0 340 128" className={`stage-svg ${s.svg}`} role="img" aria-label={cur === null ? "Four dice, no match played" : `${cx} beat ${cy} ${w} times in ${ROLLS}`}>
        {NAMES.map((n, i) => {
          const on = n === cx || n === cy;
          return (
            <g key={n}>
              <text className={on ? s.nameOn : s.name} x={14} y={22 + i * 22}>{n}</text>
              {DICE[n].map((f, j) => (
                <g key={j}>
                  <rect className={on ? s.faceOn : s.face} x={34 + j * 38} y={6 + i * 22} width={32} height={18} rx={4} />
                  <text className={s.num} x={50 + j * 38} y={19 + i * 22}>{f}</text>
                </g>
              ))}
            </g>
          );
        })}
        {w !== null && (
          <g>
            <rect className={s.barA} x={34} y={100} width={(w / ROLLS) * 226} height={14} rx={3} />
            <rect className={s.barB} x={34 + (w / ROLLS) * 226} y={100} width={((ROLLS - w) / ROLLS) * 226} height={14} rx={3} />
            <text className={s.tally} x={34} y={125}>{cx} wins {w}</text>
            <text className={s.tallyR} x={260} y={125}>{cy} wins {ROLLS - w}</text>
          </g>
        )}
      </svg>
      <Row>
        {PAIRS.map(([x, y], i) => (
          <Control key={i} className={cur === i ? "active" : ""} disabled={locked} onClick={() => play(i)}>
            {x} vs {y}
          </Control>
        ))}
        <Control disabled={locked || cur === null} onClick={() => play(cur!)}>Roll {ROLLS} again</Control>
      </Row>
      <Row>
        <Readout label="Match" value={cur === null ? "?" : `${cx} vs ${cy}`} />
        <Readout label={cur === null ? "Winner" : `${cx} won`} value={locked || w === null ? "?" : `${w} of ${ROLLS}`} />
      </Row>
    </div>
  );
}

export default function DiceThatChaseEachOther({ slug }: { slug: string }) {
  return (
    <Lesson
      slug={slug}
      predict={{
        question: "Four dice. A beats B two times in three. B beats C two times in three. C beats D two times in three. How often does D beat A?",
        options: ["Under half the time", "Half the time", "Two times in three"],
        answer: 2,
      }}
      exploreHint="Play A vs B, B vs C, C vs D, then close the loop with D vs A."
      minInteractions={MILESTONES.length}
      reveal={() => (
        <>
          <p>
            Your first four matches: A beat B {FIRST[0]}, B beat C {FIRST[1]}, C beat D {FIRST[2]}, and D beat A <strong>{FIRST[3]}</strong> of {ROLLS}. Counting
            all 36 face pairs, each of the four wins {AVG_OF_EXACT}, two in three, round the loop.
          </p>
          <p>
            Winning belongs to a pair, not to a die. A has a lower average ({mean("A").toFixed(2)}) than B ({mean("B").toFixed(2)}) yet beats it, and B beats C ({mean("C").toFixed(2)}). Rolls of {ROLLS} scatter by
            about five.
          </p>
        </>
      )}
    >
      {({ locked, interact }) => <Stage locked={locked} interact={interact} />}
    </Lesson>
  );
}
