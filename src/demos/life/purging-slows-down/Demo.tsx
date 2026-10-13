"use client";

// Toy model of selection against a recessive lethal: large random-mating population, two gene
// copies per person, the bad copy kills in two copies and does nothing in one, no new mutations.
// Share of bad copies at birth: q' = q / (1 + q), so 1/q rises by exactly 1 each generation.
// The stage draws 100 people (200 copies) at birth: round(200 q) bad copies, round(100 q^2)
// people with two (who die before breeding), the rest in carriers. Deterministic.

import { useState } from "react";
import { Lesson } from "@/kit/Lesson";
import { Control, Row } from "@/kit/controls";
import { Milestones } from "@/kit/milestones";
import s from "./styles.module.css";

const Q0 = 0.1, TARGET = 0.01, MAX_GEN = 400, PEOPLE = 100, COLS = 10;
const Q: number[] = [Q0];
for (let g = 1; g <= MAX_GEN; g++) Q.push(Q[g - 1] / (1 + Q[g - 1]));
const TO_TARGET = Q.findIndex((q) => q <= TARGET + 1e-12); // 90
const STEP = 10;
const MILESTONES = ["gen-10", "one-percent"] as const;
const pct = (x: number) => `${(100 * x).toFixed(1)}%`;
const oneIn = (q: number) => Math.round(1 / (q * q)).toLocaleString("en-US");

function picture(q: number) {
  const copies = Math.round(2 * PEOPLE * q);
  const sick = Math.round(PEOPLE * q * q);
  const carriers = copies - 2 * sick;
  // spread carriers through the grid with a fixed stride so the picture reads as "scattered"
  const kind = Array<"ok" | "carrier" | "sick">(PEOPLE).fill("ok");
  for (let k = 0; k < sick; k++) kind[(k * 37 + 5) % PEOPLE] = "sick";
  let placed = 0;
  for (let k = 0; placed < carriers && k < PEOPLE * 4; k++) {
    const i = (k * 23 + 11) % PEOPLE;
    if (kind[i] === "ok") { kind[i] = "carrier"; placed++; }
  }
  return { kind, copies, sick, carriers };
}

function Stage({ locked, gen, onStep, onRun, onReset }: {
  locked: boolean; gen: number; onStep: () => void; onRun: () => void; onReset: () => void;
}) {
  const q = Q[gen];
  const { kind, copies } = picture(q);
  const msg = locked
    ? "Toy: two bad copies kill before adulthood; one does nothing. Red dot: a bad copy."
    : `Generation ${gen}: ${pct(q)} of copies bad (${copies} of 200 here). Born with two: 1 in ${oneIn(q)}.`;
  const W = 30, H = 22;
  return (
    <div className={s.wrap}>
      <svg viewBox={`0 0 ${COLS * W} ${(PEOPLE / COLS) * H}`} className={`stage-svg ${s.svg}`} role="img" aria-label={msg}>
        {kind.map((k, i) => {
          const x = (i % COLS) * W + 4, y = Math.floor(i / COLS) * H + 3;
          return (
            <g key={i}>
              <rect x={x} y={y} width={W - 8} height={H - 6} rx={8} className={k === "sick" ? s.sick : s.person} />
              <circle cx={x + 6} cy={y + (H - 6) / 2} r={4} className={k === "ok" ? s.okc : s.bad} />
              <circle cx={x + W - 14} cy={y + (H - 6) / 2} r={4} className={k === "sick" ? s.bad : s.okc} />
            </g>
          );
        })}
      </svg>
      <div className={s.legend} aria-hidden>
        <span><i className={s.lc} />carrier: healthy, one bad copy</span>
        <span><i className={s.ls} />two bad copies: dies</span>
      </div>
      <p className={s.msg} aria-live="polite">{locked ? msg : `${msg} ${Math.round(100 * (1 - q))}% hide in carriers.`}</p>
      <Row>
        <Control disabled={locked || gen + STEP > MAX_GEN} onClick={onStep}>+{STEP} generations</Control>
        <Control disabled={locked || gen === TO_TARGET} onClick={onRun}>Run until 1%</Control>
        <Control disabled={locked || gen === 0} onClick={onReset}>Start over</Control>
      </Row>
    </div>
  );
}

export default function PurgingSlowsDown({ slug }: { slug: string }) {
  const [gen, setGen] = useState(0);
  return (
    <Lesson
      slug={slug}
      predict={{
        question: `Toy population, large, random mating. A gene copy kills in two copies, does nothing in one. It is ${Math.round(100 * Q0)}% of copies. About how many generations until it falls to 1%?`,
        options: ["About 10", `About ${TO_TARGET}`, "About 900"],
        answer: 1,
      }}
      exploreHint="Step 10 generations, then run until 1%. Watch where the red dots sit."
      minInteractions={MILESTONES.length}
      reveal={() => (
        <>
          <p>
            The first {STEP} generations took it from {pct(Q0)} to {pct(Q[STEP])}. Reaching 1% took <strong>{TO_TARGET} generations</strong>{" "}
            in all.
          </p>
          <p>
            Selection only sees people with two bad copies: 1 in {oneIn(Q0)} at the start, 1 in {oneIn(Q[TO_TARGET])} at 1%. The rarer the
            copy, the more of it hides in healthy carriers, so each step down is slower than the last. In this model 1 / share rises by exactly 1
            per generation: 10, 11, 12 ... 100.
          </p>
        </>
      )}
    >
      {({ locked, interact }) => (
        <Milestones interact={interact} names={MILESTONES}>
          {(reach) => {
            const go = (g: number) => {
              setGen(g);
              if (g === STEP) reach("gen-10");
              if (g === TO_TARGET) reach("one-percent");
            };
            return (
              <Stage
                locked={locked}
                gen={gen}
                onStep={() => go(Math.min(MAX_GEN, gen + STEP))}
                onRun={() => go(TO_TARGET)}
                onReset={() => go(0)}
              />
            );
          }}
        </Milestones>
      )}
    </Lesson>
  );
}
