"use client";

// Toy model: two towns of equal size with no contact between them, a made-up disease with
// R0 = 12, perfect vaccine protection and random mixing inside each town. In each town
// R = R0 x unvaccinated share; the herd threshold is 1 - 1/R0 = 91.7%. Each town is drawn as
// 100 people (filled = vaccinated). Deterministic.

import { useState } from "react";
import { Lesson } from "@/kit/Lesson";
import { Control, Row, Slider } from "@/kit/controls";
import { Milestones } from "@/kit/milestones";
import { mulberry32 } from "@/kit/random";
import s from "./styles.module.css";

const R0 = 12;
const THR = 1 - 1 / R0; // 0.9167
const A_Q = 98, B_Q = 88;
const A0 = 98, B0 = 95;
const SIDE = 10, GAP = 12, SEP = 22;
const MILESTONES = ["pocket", "raise-other"] as const;

const rIn = (cov: number) => R0 * (1 - cov / 100);
const pct1 = (x: number) => `${(100 * x).toFixed(1)}%`;
const THR_TXT = pct1(THR); // "91.7%"
const comb = (a: number, b: number) => (a + b) / 2;

// Where the unvaccinated people sit: a fixed shuffle per town (seeds 28 and 29, layout only).
const slots = (seed: number) => {
  const rng = mulberry32(seed);
  const idx = Array.from({ length: 100 }, (_, i) => i);
  for (let i = 99; i > 0; i--) {
    const j = Math.floor(rng() * (i + 1));
    [idx[i], idx[j]] = [idx[j], idx[i]];
  }
  const rank = Array(100).fill(0);
  idx.forEach((cell, r) => (rank[cell] = r));
  return rank;
};
const SLOTS = [slots(28), slots(29)];

function Town({ cov, x0, name, locked, k }: { cov: number; x0: number; name: string; locked: boolean; k: number }) {
  const unvax = 100 - cov;
  const grows = rIn(cov) > 1;
  return (
    <g>
      <text x={x0 + (SIDE * GAP) / 2} y={10} className={s.name} textAnchor="middle">{name}</text>
      {Array.from({ length: 100 }, (_, i) => {
        const isUnvax = SLOTS[k][i] < unvax;
        return (
          <circle
            key={i}
            cx={x0 + (i % SIDE) * GAP + GAP / 2}
            cy={16 + Math.floor(i / SIDE) * GAP + GAP / 2}
            r={4.3}
            className={isUnvax ? (grows && !locked ? s.risk : s.unvax) : s.vax}
          />
        );
      })}
    </g>
  );
}

function Stage({
  locked,
  a,
  b,
  setA,
  setB,
}: {
  locked: boolean;
  a: number;
  b: number;
  setA: (v: number) => void;
  setB: (v: number) => void;
}) {
  const W = 2 * SIDE * GAP + SEP;
  const c = comb(a, b);
  const line = (cov: number, name: string) => {
    const r = rIn(cov);
    return locked ? `${name}: ${cov}%` : `${name}: ${cov}%, R ${r.toFixed(2)}, ${r > 1 ? "can grow" : "fades"}`;
  };
  return (
    <div className={s.wrap}>
      <svg viewBox={`0 0 ${W} ${16 + SIDE * GAP + 2}`} className={`stage-svg ${s.svg}`} role="img" aria-label={`Town A ${a}%, town B ${b}%`}>
        <Town cov={a} x0={0} name="Town A" locked={locked} k={0} />
        <Town cov={b} x0={SIDE * GAP + SEP} name="Town B" locked={locked} k={1} />
      </svg>

      <div className={s.legend} aria-hidden>
        <span><i className={s.vax} />vaccinated</span>
        <span><i className={s.unvax} />not vaccinated</span>
      </div>
      <div className={s.lines} aria-live="polite">
        <span>{line(a, "A")}</span>
        <span>{line(b, "B")}</span>
        <strong>
          {locked
            ? `Toy: R0 ${R0}, no contact between towns. Make a prediction to start.`
            : `Both towns: ${c.toFixed(1).replace(".0", "")}% vaccinated, ${c / 100 >= THR ? "above" : "below"} the ${THR_TXT} threshold.`}
        </strong>
      </div>

      <Row>
        <Control className={b === B_Q ? "active" : ""} disabled={locked || b === B_Q} onClick={() => setB(B_Q)}>Town B {B_Q}%</Control>
        <Control className={a === 100 ? "active" : ""} disabled={locked || a === 100} onClick={() => setA(100)}>Town A 100%</Control>
      </Row>
      <Slider label="Town A vaccinated" value={a} min={80} max={100} disabled={locked} format={(v) => `${v}%`} onChange={setA} />
      <Slider label="Town B vaccinated" value={b} min={80} max={100} disabled={locked} format={(v) => `${v}%`} onChange={setB} />
    </div>
  );
}

export default function PocketsBelowThreshold({ slug }: { slug: string }) {
  const [a, setAState] = useState(A0);
  const [b, setBState] = useState(B0);
  const [best, setBest] = useState<{ a: number; b: number } | null>(null); // highest combined with B growing
  return (
    <Lesson
      slug={slug}
      predict={{
        question: `Made-up disease, R0 = ${R0} (threshold ${THR_TXT}), perfect vaccine. Two equal towns, ${A_Q}% and ${B_Q}% vaccinated: ${comb(A_Q, B_Q)}% overall. Can an outbreak grow in the ${B_Q}% town?`,
        options: [`No: ${comb(A_Q, B_Q)}% is above ${THR_TXT}`, `Yes: R there is about ${rIn(B_Q).toFixed(1)}`, `Only if the ${A_Q}% town is hit too`],
        answer: 1,
      }}
      exploreHint={`Set town B to ${B_Q}%, then push town A to 100%. Watch B's R.`}
      minInteractions={MILESTONES.length}
      reveal={() => (
        <>
          <p>
            At {B_Q}%, town B has {100 - B_Q} unvaccinated people in every 100, so a case there infects {R0} &times; {(100 - B_Q) / 100} ={" "}
            <strong>{rIn(B_Q).toFixed(2)}</strong>: more than 1, so it can grow, while the {comb(A_Q, B_Q)}% average sits above {THR_TXT}.
            {best ? ` You had the average at ${comb(best.a, best.b)}% and B still above 1.` : ""}
          </p>
          <p>
            The threshold applies inside each group that mixes, not to the average. Raising town A only pushes the average up; it cannot
            protect people in town B who never meet town A.
          </p>
          <p className="muted">Toy model: no contact between towns, random mixing inside each, perfect protection. Numbers made up.</p>
        </>
      )}
    >
      {({ locked, interact }) => (
        <Milestones interact={interact} names={MILESTONES}>
          {(reach) => {
            const check = (na: number, nb: number) => {
              if (rIn(nb) > 1 && comb(na, nb) / 100 >= THR) {
                reach("pocket");
                setBest((x) => (!x || comb(na, nb) > comb(x.a, x.b) ? { a: na, b: nb } : x));
              }
              // Raising town A while town B is still above R 1.
              if (na > a && rIn(nb) > 1) reach("raise-other");
            };
            return (
              <Stage
                locked={locked}
                a={a}
                b={b}
                setA={(v) => { setAState(v); check(v, b); }}
                setB={(v) => { setBState(v); check(a, v); }}
              />
            );
          }}
        </Milestones>
      )}
    </Lesson>
  );
}

