"use client";

// Toy pond (chemostat-style resource competition). One nutrient R flows in toward 10 units and
// washes out at rate D = 0.1/day; both species also die / wash out at D. Growth rate of each is
// 0.5 R / (K + R) per day per unit of plant (each unit of growth uses one unit of nutrient).
// K is set so the break-even nutrient level (growth = death) is 2 for A and the chosen value for B.
// Start: nutrient 5, A 0.5, B 4 (B eight times as common). Euler step 0.01 day. Deterministic.
// Re-run in artifacts/scratch/w4life/chemo2.mjs.

import { useState } from "react";
import { Lesson } from "@/kit/Lesson";
import { Control, Row } from "@/kit/controls";
import { Milestones } from "@/kit/milestones";
import s from "./styles.module.css";

const D = 0.1, MU = 0.5, SUPPLY = 10, A_NEED = 2;
const DAYS = [0, 20, 100, 400] as const;
const B_NEEDS = [5, 3, 1] as const;
type BNeed = (typeof B_NEEDS)[number];
const MILESTONES = ["a-wins", "b-needs-less"] as const;
const K = (need: number) => (need * (MU - D)) / D;

interface Snap { A: number; B: number; R: number }
function simulate(bNeed: number): Record<number, Snap> {
  const ka = K(A_NEED), kb = K(bNeed), dt = 0.01, per = Math.round(1 / dt);
  let R = 5, A = 0.5, B = 4;
  const out: Record<number, Snap> = {};
  const last = DAYS[DAYS.length - 1];
  for (let k = 0; k <= last * per; k++) {
    if (k % per === 0 && (DAYS as readonly number[]).includes(k / per)) out[k / per] = { A, B, R };
    const ga = (MU * R) / (ka + R), gb = (MU * R) / (kb + R);
    const dA = A * (ga - D), dB = B * (gb - D), dR = D * (SUPPLY - R) - ga * A - gb * B;
    A += dA * dt;
    B += dB * dt;
    R += dR * dt;
  }
  return out;
}
const RUNS: Record<BNeed, Record<number, Snap>> = { 5: simulate(5), 3: simulate(3), 1: simulate(1) };
const dots = (x: number) => Math.round(10 * x); // 1 dot = 0.1 unit of plant
const one = (x: number) => x.toFixed(1);

function Stage({ locked, day, bNeed, onDay, onB }: {
  locked: boolean; day: number; bNeed: BNeed; onDay: (d: number) => void; onB: (b: BNeed) => void;
}) {
  const snap = RUNS[bNeed][day];
  const nA = dots(snap.A), nB = dots(snap.B);
  const msg = locked
    ? "Toy pond. Break-even: the nutrient level where a species' births just match its deaths."
    : `Day ${day}: A ${nA} dots, B ${nB} dots. Nutrient ${one(snap.R)} (A breaks even at ${A_NEED}, B at ${bNeed}).`;
  const COLS = 20, G = 14, W = COLS * G;
  const bx = (v: number) => 4 + (v / SUPPLY) * (W - 8);
  return (
    <div className={s.wrap}>
      <svg viewBox={`0 0 ${W} 130`} className={`stage-svg ${s.svg}`} role="img" aria-label={msg}>
        {Array.from({ length: 100 }, (_, i) => {
          const cls = i < nA ? s.on : i < nA + nB ? s.bad : s.hollow;
          return <circle key={i} cx={(i % COLS) * G + G / 2} cy={Math.floor(i / COLS) * G + G / 2} r={4.6} className={cls} />;
        })}
        <rect x={4} y={86} width={W - 8} height={12} rx={3} className={s.track} />
        <rect x={4} y={86} width={Math.max(0, bx(snap.R) - 4)} height={12} rx={3} className={s.fill} />
        {[{ v: A_NEED, t: "A", c: s.on }, { v: bNeed, t: "B", c: s.bad }].map((m) => (
          <g key={m.t}>
            <line x1={bx(m.v)} x2={bx(m.v)} y1={82} y2={102} className={s.need} />
            <text x={bx(m.v)} y={114} textAnchor="middle" className={s.small}>{m.t} {m.v}</text>
          </g>
        ))}
        <text x={W - 4} y={126} textAnchor="end" className={s.axis}>nutrient, 0 to {SUPPLY}</text>
      </svg>
      <div className={s.legend} aria-hidden>
        <span><i className={s.on} />species A</span>
        <span><i className={s.bad} />species B</span>
      </div>
      <p className={s.msg} aria-live="polite">{msg}</p>
      <Row>
        {DAYS.slice(1).map((d) => (
          <Control key={d} className={day === d ? "active" : ""} disabled={locked || day === d} onClick={() => onDay(d)}>Day {d}</Control>
        ))}
      </Row>
      <Row>
        {B_NEEDS.map((b) => (
          <Control key={b} className={bNeed === b ? "active" : ""} disabled={locked || bNeed === b} onClick={() => onB(b)}>B needs {b}</Control>
        ))}
      </Row>
    </div>
  );
}

export default function OneResourceOneWinner({ slug }: { slug: string }) {
  const [day, setDay] = useState<number>(0);
  const [bNeed, setB] = useState<BNeed>(5);
  const end = DAYS[DAYS.length - 1];
  const fin5 = RUNS[5][end], fin1 = RUNS[1][end], start = RUNS[5][0];
  return (
    <Lesson
      slug={slug}
      predict={{
        question: `Toy pond: two plant species live on one nutrient and die at the same rate. A breaks even at ${A_NEED} units of nutrient, B needs 5. B starts ${Math.round(start.B / start.A)} times as common. In the long run:`,
        options: ["They settle and share it", "A takes over", "B takes over"],
        answer: 1,
      }}
      exploreHint="Jump ahead to day 400 and watch the nutrient bar. Then make B need less."
      minInteractions={MILESTONES.length}
      reveal={() => (
        <>
          <p>
            By day {end}: A {dots(fin5.A)} dots, B {dots(fin5.B)}, and the nutrient sat at <strong>{one(fin5.R)}</strong>, exactly A's
            break-even. When B needed only 1, B won instead: {dots(fin1.B)} dots to {dots(fin1.A)}, nutrient {one(fin1.R)}.
          </p>
          <p>
            A keeps growing until it pulls the nutrient down to the level it can just live on. Below B's break-even, B shrinks every day, however
            common it started. With one limiting nutrient, the species that can live on less wins. Several nutrients can let species coexist.
          </p>
        </>
      )}
    >
      {({ locked, interact }) => (
        <Milestones interact={interact} names={MILESTONES}>
          {(reach) => {
            const check = (d: number, b: BNeed) => {
              if (d === end && b === 5) reach("a-wins");
              if (d === end && b === 1) reach("b-needs-less");
            };
            return (
              <Stage
                locked={locked}
                day={day}
                bNeed={bNeed}
                onDay={(d) => { setDay(d); check(d, bNeed); }}
                onB={(b) => { setB(b); check(day, b); }}
              />
            );
          }}
        </Milestones>
      )}
    </Lesson>
  );
}
