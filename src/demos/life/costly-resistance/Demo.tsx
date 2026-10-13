"use client";

// Toy dish with no drug: resistant cells leave (1 - cost) offspring for every 1 left by normal
// cells, each generation. Resistant share r_g = r0 (1-c)^g / ((1 - r0) + r0 (1-c)^g), r0 = 10%.
// The dish shows 400 cells, round(400 r) of them resistant. Deterministic.

import { useState } from "react";
import { Lesson } from "@/kit/Lesson";
import { Control, Row } from "@/kit/controls";
import { Milestones } from "@/kit/milestones";
import s from "./styles.module.css";

const R0 = 0.1, CELLS = 400, COLS = 20, Q_COST = 5, Q_GEN = 20, LATE = 60;
const GENS = [5, 10, Q_GEN, LATE] as const;
const COSTS = [Q_COST, 1, 10] as const;
const MILESTONES = ["gen-20", "gen-60"] as const;
const share = (g: number, costPct: number) => {
  const k = R0 * Math.pow(1 - costPct / 100, g);
  return k / (1 - R0 + k);
};
const pct = (x: number) => `${(100 * x).toFixed(x < 0.01 ? 2 : 1)}%`;
// scatter order so resistant cells look spread through the dish
const ORDER = Array.from({ length: CELLS }, (_, i) => (i * 151) % CELLS);

function Stage({ locked, gen, cost, onGen, onCost }: {
  locked: boolean; gen: number; cost: number; onGen: (g: number) => void; onCost: (c: number) => void;
}) {
  const r = share(gen, cost);
  const n = Math.round(CELLS * r);
  const red = new Set(ORDER.slice(0, n));
  const msg = locked
    ? "Toy dish, no drug. Red: resistant cells, 10% at the start."
    : `Generation ${gen}, ${cost}% slower: ${pct(r)} resistant (${n} of ${CELLS}).`;
  const G = 14;
  return (
    <div className={s.wrap}>
      <svg viewBox={`0 0 ${COLS * G} ${(CELLS / COLS) * G}`} className={`stage-svg ${s.svg}`} role="img" aria-label={msg}>
        {Array.from({ length: CELLS }, (_, i) => (
          <circle key={i} cx={(i % COLS) * G + G / 2} cy={Math.floor(i / COLS) * G + G / 2} r={5} className={red.has(i) ? s.bad : s.half} />
        ))}
      </svg>
      <p className={s.msg} aria-live="polite">{msg}</p>
      <Row>
        {GENS.map((g) => (
          <Control key={g} className={gen === g ? "active" : ""} disabled={locked || gen === g} onClick={() => onGen(g)}>Gen {g}</Control>
        ))}
      </Row>
      <Row>
        {COSTS.map((c) => (
          <Control key={c} className={cost === c ? "active" : ""} disabled={locked || cost === c} onClick={() => onCost(c)}>{c}% slower</Control>
        ))}
      </Row>
    </div>
  );
}

export default function CostlyResistance({ slug }: { slug: string }) {
  const [gen, setGen] = useState(0);
  const [cost, setCost] = useState<number>(Q_COST);
  return (
    <Lesson
      slug={slug}
      predict={{
        question: `Toy dish, no drug. ${Math.round(100 * R0)}% of the bacteria are resistant, and they grow ${Q_COST}% slower each generation. After ${Q_GEN} generations the resistant share is about:`,
        options: ["0%", `About ${Math.round(100 * share(Q_GEN, Q_COST))}%`, `Still ${Math.round(100 * R0)}%`],
        answer: 1,
      }}
      exploreHint="Step through the generations at 5% slower. Count the red cells."
      minInteractions={MILESTONES.length}
      reveal={() => (
        <>
          <p>
            At generation {Q_GEN} the resistant share was <strong>{pct(share(Q_GEN, Q_COST))}</strong>, down from {pct(R0)} but not gone. At{" "}
            {LATE}, still {pct(share(LATE, Q_COST))}.
          </p>
          <p>
            A {Q_COST}% cost shrinks the resistant-to-normal ratio by only 5% a generation, so the decline is slow and never quite reaches zero.
            Real bacteria often gain extra mutations that cut the cost, so resistance can linger longer still. A model, not treatment advice.
          </p>
        </>
      )}
    >
      {({ locked, interact }) => (
        <Milestones interact={interact} names={MILESTONES}>
          {(reach) => {
            const check = (g: number, c: number) => {
              if (c === Q_COST && g === Q_GEN) reach("gen-20");
              if (c === Q_COST && g === LATE) reach("gen-60");
            };
            return (
              <Stage
                locked={locked}
                gen={gen}
                cost={cost}
                onGen={(g) => { setGen(g); check(g, cost); }}
                onCost={(c) => { setCost(c); check(gen, c); }}
              />
            );
          }}
        </Milestones>
      )}
    </Lesson>
  );
}
