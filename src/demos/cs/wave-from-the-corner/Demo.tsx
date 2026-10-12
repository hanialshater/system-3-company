"use client";

// Breadth-first search as a wave. The learner grows the wave one ring at a time and
// each cell is labelled with its distance; walls bend the wave. The payoff: the goal's
// label is the shortest route length, found without trying a single route.
// One representation: the grid.

import { useMemo, useState } from "react";
import { Lesson } from "@/kit/Lesson";
import { Control, Readout, Row } from "@/kit/controls";
import s from "./styles.module.css";

const N = 5;
const START = 0;
const GOAL = N * N - 1;

function distances(walls: Set<number>) {
  const dist = Array<number>(N * N).fill(-1);
  dist[START] = 0;
  const q = [START];
  while (q.length) {
    const c = q.shift()!;
    const r = Math.floor(c / N);
    const col = c % N;
    const nb = [
      r > 0 ? c - N : -1,
      r < N - 1 ? c + N : -1,
      col > 0 ? c - 1 : -1,
      col < N - 1 ? c + 1 : -1,
    ];
    for (const x of nb) {
      if (x < 0 || walls.has(x) || dist[x] >= 0) continue;
      dist[x] = dist[c] + 1;
      q.push(x);
    }
  }
  return dist;
}

export default function WaveFromTheCorner({ slug }: { slug: string }) {
  const [walls, setWalls] = useState<Set<number>>(new Set());
  const [ring, setRing] = useState(0);

  const dist = useMemo(() => distances(walls), [walls]);
  const maxDist = Math.max(...dist);
  const goalD = dist[GOAL];
  const reached = goalD >= 0 && goalD <= ring;
  const labelled = dist.filter((d) => d >= 0 && d <= ring).length;

  return (
    <Lesson
      slug={slug}
      predict={{
        question:
          "On an open 5 × 5 grid, how many steps from one corner to the opposite corner, moving only up, down, left or right?",
        options: ["5", "8", "10"],
        answer: 1,
      }}
      exploreHint="Grow the wave until it reaches G. Then tap cells to add walls."
      minInteractions={1}
      reveal={() => (
        <>
          <p>
            On the open grid the wave reaches the far corner at ring <strong>8</strong>: 4 steps across and 4 down, in any
            order. Every cell gets one label, its distance from S, and the goal&apos;s label is the shortest route length.
          </p>
          <p>
            The wave never tried a route. Trying routes instead is hopeless: on this small grid there are already 70
            different shortest routes, and far more with detours. Walls only bend the wave; the labels stay true
            distances.
          </p>
          <p className="muted">Check the nearest cells first, then the next ring out. That is breadth-first search.</p>
        </>
      )}
    >
      {({ locked, interact }) => {
        const setRingTo = (r: number, d: number[] = dist) => {
          const g = d[GOAL];
          const was = goalD >= 0 && goalD <= ring;
          setRing(r);
          if (g >= 0 && g <= r && !was) interact();
        };
        const next = () => {
          if (locked || ring >= maxDist) return;
          setRingTo(ring + 1);
        };
        const all = () => {
          if (locked || ring >= maxDist) return;
          setRingTo(maxDist);
        };
        const restart = () => {
          if (locked) return;
          setRing(0);
        };
        const toggle = (c: number) => {
          if (locked || c === START || c === GOAL) return;
          const w = new Set(walls);
          if (w.has(c)) w.delete(c);
          else w.add(c);
          setWalls(w);
          const d = distances(w);
          const g = d[GOAL];
          const was = goalD >= 0 && goalD <= ring;
          if (g >= 0 && g <= ring && !was) interact();
        };

        const msg = locked
          ? "Make a prediction to start."
          : reached
            ? `G reached at ring ${goalD}: ${goalD} steps.`
            : goalD < 0
              ? "Walls block every way to G."
              : ring === 0
                ? "S is ring 0. Grow the wave."
                : `Ring ${ring}: every cell ${ring} step${ring === 1 ? "" : "s"} from S.`;

        return (
          <div className={s.wrap}>
            <p className={s.msg} aria-live="polite">
              {msg}
            </p>
            <Row>
              <Control className="active" disabled={locked || ring >= maxDist} onClick={next}>
                Next ring
              </Control>
              <Control disabled={locked || ring >= maxDist} onClick={all}>
                All rings
              </Control>
              <Control disabled={locked || ring === 0} onClick={restart}>
                Restart wave
              </Control>
              <Readout label="Cells labelled" value={labelled} />
            </Row>

            <div className={s.grid} style={{ gridTemplateColumns: `repeat(${N}, 1fr)` }}>
              {Array.from({ length: N * N }, (_, c) => {
                const d = dist[c];
                const lit = d >= 0 && d <= ring && !walls.has(c);
                const edge = lit && d === ring;
                const isWall = walls.has(c);
                const label = c === START ? "S" : c === GOAL ? (lit ? `G ${d}` : "G") : lit ? String(d) : "";
                return (
                  <Control
                    key={c}
                    className={`${s.cell} ${isWall ? s.wall : ""} ${lit ? s.lit : ""} ${edge ? s.edge : ""} ${
                      c === GOAL ? s.goal : ""
                    } ${c === START ? s.start : ""}`}
                    style={
                      lit && !isWall
                        ? { background: `color-mix(in srgb, var(--domain) ${Math.round(55 - (maxDist ? d / maxDist : 0) * 40)}%, var(--bg-2))` }
                        : undefined
                    }
                    disabled={locked || c === START || c === GOAL}
                    aria-label={
                      c === START ? "Start S" : c === GOAL ? "Goal G" : isWall ? "Wall: tap to remove" : `Cell${lit ? ` ${d} steps` : ""}: tap for a wall`
                    }
                    onClick={() => toggle(c)}
                  >
                    {isWall ? <span className={s.brick} aria-hidden="true" /> : label}
                  </Control>
                );
              })}
            </div>
            <p className="muted small" style={{ margin: 0, textAlign: "center" }}>
              Tap a cell to build or remove a wall.
            </p>
          </div>
        );
      }}
    </Lesson>
  );
}
