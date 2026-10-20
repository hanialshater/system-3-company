"use client";

// Curse of dimensionality, edge version. 200 points uniform in a d-dimensional unit cube.
// A point is "near the wall" if in at least one dimension its coordinate is within 5% of a face
// (below 0.05 or above 0.95). Exact share: 1 - 0.9^d (d = 1, 2, 10, 100: 10%, 19%, 65.1%, ~100%).
// Draws are seeded with mulberry32 seeds 1, 2, 3, ... in order (untuned).

import { useState } from "react";
import { Lesson } from "@/kit/Lesson";
import { Control, Readout, Row } from "@/kit/controls";
import { Milestones } from "@/kit/milestones";
import { mulberry32 } from "@/kit/random";
import s from "./styles.module.css";

// MODEL START
const EDGE = 0.05;
const N = 200;
const DIMS = [1, 2, 10, 100] as const;
const Q_DIM = 10;
const exactShare = (d: number) => 1 - (1 - 2 * EDGE) ** d;

/** For each of N points, whether it is within EDGE of a face in at least one of d dimensions. */
function nearWall(d: number, seed: number): boolean[] {
  return place(d, seed).near;
}

/** Same draw, also returning the first two coordinates of each point (for the 1-D and 2-D pictures). */
function place(d: number, seed: number) {
  const rng = mulberry32(seed * 1000 + d);
  const near: boolean[] = [];
  const xy: [number, number][] = [];
  for (let i = 0; i < N; i++) {
    let isNear = false;
    const c: number[] = [];
    for (let k = 0; k < d; k++) {
      const u = rng();
      if (k < 2) c.push(u);
      if (u < EDGE || u > 1 - EDGE) isNear = true;
    }
    near.push(isNear);
    xy.push([c[0], c[1] ?? 0.5]);
  }
  return { near, xy };
}
const countNear = (d: number, seed: number) => nearWall(d, seed).filter(Boolean).length;

/** Spread of the near-wall count over seeds 1..runs (untuned), for the reveal. */
function spread(d: number, runs: number) {
  let lo = N;
  let hi = 0;
  for (let seed = 1; seed <= runs; seed++) {
    const c = countNear(d, seed);
    lo = Math.min(lo, c);
    hi = Math.max(hi, c);
  }
  return { lo, hi };
}
// MODEL END

const pct = (x: number) => `${Math.round(x * 100)}%`;
const COLS = 20;

export default function NearTheWall({ slug }: { slug: string }) {
  const [d, setD] = useState<number>(1);
  const [seed, setSeed] = useState(1);
  const [seen10, setSeen10] = useState<number[]>([]);

  const { near, xy: pts } = place(d, seed);
  const count = near.filter(Boolean).length;
  const SPREAD_RUNS = 500;

  const record = (dim: number, sd: number) => {
    if (dim === Q_DIM) setSeen10((xs) => [...xs, countNear(dim, sd)]);
  };

  return (
    <Lesson
      slug={slug}
      predict={{
        question: `${N} points are scattered evenly in a ${Q_DIM}-dimensional cube. What share lie within 5% of an outer face in at least one dimension?`,
        options: ["About 10%", "About 35%", "About 65%"],
        answer: 2,
      }}
      exploreHint="Raise the dimensions and watch how many points touch a wall."
      minInteractions={1}
      reveal={() => {
        const sp = spread(Q_DIM, SPREAD_RUNS);
        const mine = seen10.length ? seen10[seen10.length - 1] : null;
        return (
          <>
            <p>
              {mine !== null ? (
                <>
                  Your {Q_DIM}-D draw had <strong>{mine} of {N}</strong> points near a wall ({pct(mine / N)}).
                </>
              ) : (
                <>In {Q_DIM} dimensions about two thirds of the points sit near a wall.</>
              )}{" "}
              The exact share is 1 − 0.9<sup>{Q_DIM}</sup> = {(exactShare(Q_DIM) * 100).toFixed(1)}%; across {SPREAD_RUNS} seeded
              draws of {N} points it ranged {sp.lo}–{sp.hi}.
            </p>
            <p>
              Each dimension gives a point a 10% chance to sit at an edge, and it only has to be at an edge in one. Staying clear
              of all of them takes 0.9 × 0.9 × … ten times, which is only {pct(1 - exactShare(Q_DIM))}.
            </p>
            <p>
              At 100 dimensions the exact share is {(exactShare(100) * 100).toFixed(3)}%: almost no point is in the middle.
            </p>
          </>
        );
      }}
    >
      {({ locked, interact }) => (
        <Milestones interact={interact} names={["saw-10d"]}>
          {(reach) => {
            const choose = (dim: number) => {
              setD(dim);
              record(dim, seed);
              if (dim === Q_DIM) reach("saw-10d");
            };
            const resample = () => {
              const next = seed + 1;
              setSeed(next);
              record(d, next);
            };
            const rows = Math.ceil(N / COLS);
            return (
              <div className={s.wrap}>
                <span className={`tag ${s.model}`}>Toy: random points · “near” = within 5% of a face</span>
                <svg viewBox="0 0 320 170" className="stage-svg" role="img" aria-label={`${N} points in ${d} dimensions`}>
                  <text x={160} y={14} textAnchor="middle" className={s.small} fill="var(--muted)">
                    {locked ? `${N} points, waiting` : d <= 2 ? `${N} points in a ${d === 1 ? "line" : "square"} · red band = within 5% of an edge` : `${N} points in a ${d}-D cube · filled = near a wall`}
                  </text>
                  {!locked && d <= 2 && (
                    <>
                      <rect x={85} y={22} width={150} height={134} fill="none" stroke="var(--line)" />
                      {d === 2 ? (
                        <path
                          fillRule="evenodd"
                          fill="var(--bad)"
                          opacity={0.15}
                          d={`M85 22h150v134h-150z M${85 + 7.5} ${22 + 6.7}h135v120.6h-135z`}
                        />
                      ) : (
                        <>
                          <rect x={85} y={22} width={7.5} height={134} fill="var(--bad)" opacity={0.15} />
                          <rect x={227.5} y={22} width={7.5} height={134} fill="var(--bad)" opacity={0.15} />
                        </>
                      )}
                      {pts.map(([x, y], i) => (
                        <circle
                          key={i}
                          cx={85 + x * 150}
                          cy={d === 1 ? 22 + 8 + (i % 12) * 10.5 : 22 + y * 134}
                          r={2.2}
                          fill={near[i] ? "var(--bad)" : "var(--muted)"}
                        />
                      ))}
                    </>
                  )}
                  {(locked || d > 2) &&
                    near.map((isNear, i) => {
                      const cx = 18 + (i % COLS) * 15;
                      const cy = 32 + Math.floor(i / COLS) * 13.5;
                      const filled = !locked && isNear;
                      return (
                        <circle
                          key={i}
                          cx={cx}
                          cy={cy}
                          r={5}
                          fill={filled ? "var(--bad)" : "none"}
                          stroke={filled ? "var(--bad)" : "var(--muted)"}
                          strokeWidth={1.2}
                        />
                      );
                    })}
                  <text x={160} y={d <= 2 && !locked ? 166 : 32 + rows * 13.5 + 4} textAnchor="middle" className={s.tiny} fill="var(--muted)">
                    {locked ? "" : `draw ${seed}`}
                  </text>
                </svg>
                <Row>
                  {DIMS.map((dim) => (
                    <Control key={dim} className={d === dim ? "active" : ""} disabled={locked || d === dim} onClick={() => choose(dim)}>
                      {dim}-D
                    </Control>
                  ))}
                  <Control disabled={locked} onClick={resample}>
                    New {N} points
                  </Control>
                </Row>
                <Row>
                  <Readout label="Near a wall" value={locked ? "–" : `${count} of ${N} (${pct(count / N)})`} />
                  <Readout label="Exact share" value={locked ? "–" : `${(exactShare(d) * 100).toFixed(d === 100 ? 3 : 1)}%`} />
                </Row>
              </div>
            );
          }}
        </Milestones>
      )}
    </Lesson>
  );
}
