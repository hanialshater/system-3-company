"use client";

// Toy selection model: a very large asexual population, one new type with a constant edge s
// (it leaves 1 + s offspring for every 1 of the old type). Share p each generation:
// p' = p (1 + s) / (1 + s p), starting at p = 1%. Deterministic: no random numbers.
// The ring of 100 dots shows round(100 p) new-type dots.

import { useState } from "react";
import { Lesson } from "@/kit/Lesson";
import { Control, Row } from "@/kit/controls";
import { Milestones } from "@/kit/milestones";
import s from "./styles.module.css";

const P0 = 0.01;
const EDGES = [5, 10, 1] as const; // percent
type Edge = (typeof EDGES)[number];
const MAX_GEN = 600;
const DOTS = 100;
const MILESTONES = ["half-at-5", "other-edge"] as const;

function trajectory(edgePct: number): number[] {
  const e = edgePct / 100;
  const out = [P0];
  let p = P0;
  for (let g = 1; g <= MAX_GEN; g++) {
    p = (p * (1 + e)) / (1 + e * p);
    out.push(p);
  }
  return out;
}
const TRAJ: Record<Edge, number[]> = { 5: trajectory(5), 10: trajectory(10), 1: trajectory(1) };
const HALF: Record<Edge, number> = {
  5: TRAJ[5].findIndex((p) => p >= 0.5),
  10: TRAJ[10].findIndex((p) => p >= 0.5),
  1: TRAJ[1].findIndex((p) => p >= 0.5),
};
// 5: 95, 10: 49, 1: 462
const MID5 = Math.round(HALF[5] / 2);
const pct = (x: number) => (x < 0.1 ? `${(100 * x).toFixed(1)}%` : `${Math.round(100 * x)}%`);

function Stage({ locked, edge, gen, half, onStep, onHalf, onEdge, onReset }: {
  locked: boolean; edge: Edge; gen: number; half: boolean;
  onStep: () => void; onHalf: () => void; onEdge: (e: Edge) => void; onReset: () => void;
}) {
  const p = TRAJ[edge][gen];
  const n = Math.round(DOTS * p);
  const mid = Math.round(gen / 2);
  const msg = locked
    ? "Toy: huge population, asexual reproduction. Filled dots: the new type, 1% at the start."
    : half
      ? `${edge}% edge: half after ${gen} generations. At generation ${mid} it was only ${pct(TRAJ[edge][mid])}.`
      : `${edge}% edge, generation ${gen}: new type is ${pct(p)}.`;
  const R = 92, C = 110;
  return (
    <div className={s.wrap}>
      <svg viewBox="0 0 220 220" className={`stage-svg ${s.svg}`} role="img" aria-label={msg}>
        {Array.from({ length: DOTS }, (_, i) => {
          const a = (i / DOTS) * 2 * Math.PI - Math.PI / 2;
          return <circle key={i} cx={C + R * Math.cos(a)} cy={C + R * Math.sin(a)} r={2.6} className={i < n ? s.on : s.hollow} />;
        })}
        <text x={C} y={C - 4} textAnchor="middle" className={s.big}>{pct(p)}</text>
        <text x={C} y={C + 16} textAnchor="middle" className={s.small}>generation {gen}</text>
      </svg>
      <p className={s.msg} aria-live="polite">{msg}</p>
      <Row>
        <Control disabled={locked || gen + 10 > MAX_GEN} onClick={onStep}>+10 generations</Control>
        <Control disabled={locked || half} onClick={onHalf}>Run to half</Control>
      </Row>
      <Row>
        {EDGES.map((e) => (
          <Control key={e} className={edge === e ? "active" : ""} disabled={locked || edge === e} onClick={() => onEdge(e)}>
            Edge {e}%
          </Control>
        ))}
        <Control disabled={locked || gen === 0} onClick={onReset}>Start over</Control>
      </Row>
    </div>
  );
}

export default function OnePercentEdge({ slug }: { slug: string }) {
  const [edge, setEdge] = useState<Edge>(5);
  const [gen, setGen] = useState(0);
  const [half, setHalf] = useState(false);
  const [tried, setTried] = useState<Edge[]>([]);
  return (
    <Lesson
      slug={slug}
      predict={{
        question: `Toy population, very large, asexual reproduction. A new type starts at 1% and leaves 5% more offspring than the old type each generation. About how many generations until it is half?`,
        options: ["About 20", `About ${HALF[5]}`, "About 500"],
        answer: 1,
      }}
      exploreHint="Step a few times, then run to half. Then try another edge."
      minInteractions={MILESTONES.length}
      reveal={() => {
        const others = tried.filter((e) => e !== 5);
        return (
          <>
            <p>
              With a 5% edge the new type reached half after <strong>{HALF[5]} generations</strong>. At generation {MID5} it was still only{" "}
              {pct(TRAJ[5][MID5])}: slow for a long time, then fast.
            </p>
            <p>
              Each generation multiplies the ratio of new to old by 1.05; from 1 : 99 to 1 : 1 takes about {HALF[5]} such steps.
              {others.length ? ` You also tried ${others.map((e) => `a ${e}% edge (${HALF[e]} generations)`).join(" and ")}: double the edge, about half the time.` : ""}
            </p>
          </>
        );
      }}
    >
      {({ locked, interact }) => (
        <Milestones interact={interact} names={MILESTONES}>
          {(reach) => (
            <Stage
              locked={locked}
              edge={edge}
              gen={gen}
              half={half}
              onStep={() => { setGen((g) => Math.min(MAX_GEN, g + 10)); setHalf(false); }}
              onHalf={() => {
                setGen(HALF[edge]);
                setHalf(true);
                if (edge === 5) reach("half-at-5");
                else { reach("other-edge"); setTried((t) => (t.includes(edge) ? t : [...t, edge])); }
              }}
              onEdge={(e) => {
                setEdge(e);
                if (half) {
                  setGen(HALF[e]);
                  if (e === 5) reach("half-at-5");
                  else { reach("other-edge"); setTried((t) => (t.includes(e) ? t : [...t, e])); }
                }
              }}
              onReset={() => { setGen(0); setHalf(false); }}
            />
          )}
        </Milestones>
      )}
    </Lesson>
  );
}
