"use client";

// Two one-row cellular automata grown side by side from the same single live cell under one Step control.
// A cell's next value is bit (left*4 + self*2 + right) of the rule number; cells beyond the 17-cell row are dead
// (at 8 steps the pattern is 17 wide, so the edge is never reached). Rule 30 live counts by step 0..8:
// 1, 3, 3, 6, 4, 9, 5, 12, 7; Rule 90: 1, 2, 2, 4, 2, 4, 4, 8, 2. Centre columns 110111001 / 100000000.
// One representation: two panels of the same kind, compared row by row.

import { useEffect, useRef, useState } from "react";
import { Lesson } from "@/kit/Lesson";
import { Control, Row } from "@/kit/controls";
import { Milestones } from "@/kit/milestones";
import s from "./styles.module.css";

const W = 17;
const STEPS = 8;
const MID = 8;
const CELL = 10;

function grow(rule: number): number[][] {
  let row: number[] = Array.from({ length: W }, (_, i) => (i === MID ? 1 : 0));
  const rows = [row];
  for (let t = 0; t < STEPS; t++) {
    const prev = row;
    row = prev.map((c, i) => (rule >> ((prev[i - 1] ?? 0) * 4 + c * 2 + (prev[i + 1] ?? 0))) & 1);
    rows.push(row);
  }
  return rows;
}
const PANELS = [
  { rule: 30, rows: grow(30), x: 8 },
  { rule: 90, rows: grow(90), x: 216 },
];
const counts = (rows: number[][]) => rows.map((r) => r.reduce((a, b) => a + b, 0));
const C30 = counts(PANELS[0].rows);
const C90 = counts(PANELS[1].rows);
const centre = (rows: number[][]) => rows.map((r) => r[MID]).join("");

// The question's rule tiles, in its order: 111, 110, 101, 100, 011, 010, 001, 000.
const TILES = [7, 6, 5, 4, 3, 2, 1, 0].map((n) => ({ n, l: (n >> 2) & 1, c: (n >> 1) & 1, r: n & 1, out: (30 >> n) & 1 }));

const GRID_Y = 48;

const reducedMotion = () =>
  typeof window !== "undefined" && window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;

export default function OneCellRule30({ slug }: { slug: string }) {
  const [step, setStep] = useState(0);
  const [col, setCol] = useState(false);
  const [colSeen, setColSeen] = useState(false);
  const [busy, setBusy] = useState(false);
  const timers = useRef<ReturnType<typeof setTimeout>[]>([]);
  useEffect(() => () => timers.current.forEach(clearTimeout), []);
  const done = step >= STEPS;

  return (
    <Lesson
      slug={slug}
      predict={{
        question:
          "Rule 30: a cell's next value depends on itself and its left and right neighbours (111→0, 110→0, 101→0, 100→1, 011→1, 010→1, 001→1, 000→0). Start with one live cell. After 8 steps, how many cells are alive in the row?",
        options: ["2", "7", "9"],
        answer: 1,
      }}
      exploreHint="Step both rules and compare the rows."
      minInteractions={1}
      reveal={() => (
        <>
          <p>
            Same single cell, same kind of rule. Rule 90&apos;s row 8 had {C90[STEPS]} live cells, in a neat nested
            triangle. Rule 30&apos;s had {C30[STEPS]}, and its counts went {C30.join(", ")}.
          </p>
          <p>
            Rule 30 treats every cell the same, yet its right side turns irregular within a few rows, and no simple
            formula for its counts is known. A simple rule does not promise a simple picture.
          </p>
          {colSeen && (
            <p>
              Its centre column read {centre(PANELS[0].rows)} against Rule 90&apos;s {centre(PANELS[1].rows)}. Rule
              30&apos;s centre column has been used as a random number source in Mathematica.
            </p>
          )}
        </>
      )}
    >
      {({ locked, interact }) => (
        <Milestones interact={interact} names={["step-8"]}>
          {(reach) => {
            const to = (k: number) => {
              setStep(k);
              if (k >= STEPS) reach("step-8");
            };
            const stepOne = () => {
              if (locked || busy || done) return;
              to(step + 1);
            };
            const stepAll = () => {
              if (locked || busy || done) return;
              if (reducedMotion()) {
                to(STEPS);
                return;
              }
              setBusy(true);
              for (let k = step + 1; k <= STEPS; k++) {
                timers.current.push(
                  setTimeout(() => {
                    to(k);
                    if (k === STEPS) setBusy(false);
                  }, 50 * (k - step)),
                );
              }
            };
            const toggleCol = () => {
              if (locked) return;
              setCol(!col);
              setColSeen(true);
            };

            return (
              <div className={s.wrap}>
                <svg
                  viewBox="0 0 400 180"
                  className={`stage-svg ${s.panels}`}
                  role="img"
                  aria-label={`Rule 30, step ${step}: ${C30[step]} live cells. Rule 90, step ${step}: ${C90[step]} live cells.`}
                  data-step={step}
                >
                  <text x={8} y={12} className={s.head}>
                    Rule 30
                  </text>
                  <text x={216} y={12} className={s.head}>
                    Rule 90
                  </text>
                  {TILES.map((t, i) => {
                    const x = 8 + i * 21;
                    return (
                      <g key={t.n}>
                        {[t.l, t.c, t.r].map((v, j) => (
                          <rect
                            key={j}
                            x={x + j * 6}
                            y={20}
                            width={5.5}
                            height={5.5}
                            fill={v ? "var(--fg)" : "var(--bg-2)"}
                            stroke="var(--line)"
                            strokeWidth={0.5}
                          />
                        ))}
                        <rect
                          x={x + 6}
                          y={29}
                          width={5.5}
                          height={5.5}
                          fill={t.out ? "var(--fg)" : "var(--bg-2)"}
                          stroke="var(--muted)"
                          strokeWidth={0.6}
                        />
                      </g>
                    );
                  })}
                  <text x={216} y={26} className={s.rule}>
                    alive if exactly one
                  </text>
                  <text x={216} y={37} className={s.rule}>
                    neighbour is
                  </text>
                  {PANELS.map((p, pi) => {
                    const cs = pi === 0 ? C30 : C90;
                    return (
                      <g key={p.rule}>
                        <line
                          x1={p.x + MID * CELL + CELL / 2}
                          x2={p.x + MID * CELL + CELL / 2}
                          y1={GRID_Y - 2}
                          y2={GRID_Y + (STEPS + 1) * CELL + 2}
                          stroke="var(--line)"
                          strokeWidth={1}
                          opacity={0.6}
                        />
                        {p.rows.slice(0, step + 1).map((row, t) => (
                          <g key={t}>
                            {row.map((v, i) => (
                              <rect
                                key={i}
                                x={p.x + i * CELL + 0.5}
                                y={GRID_Y + t * CELL + 0.5}
                                width={CELL - 1}
                                height={CELL - 1}
                                fill={v ? "var(--fg)" : "var(--bg-2)"}
                              />
                            ))}
                            <text
                              x={p.x + W * CELL + 4}
                              y={GRID_Y + t * CELL + 8.5}
                              className={t === step ? s.countNew : s.count}
                            >
                              {cs[t]}
                            </text>
                          </g>
                        ))}
                        {col && (
                          <>
                            <rect
                              x={p.x + MID * CELL - 1}
                              y={GRID_Y - 1}
                              width={CELL + 2}
                              height={(step + 1) * CELL + 2}
                              fill="none"
                              stroke="var(--domain)"
                              strokeWidth={2}
                              strokeDasharray="3 2"
                            />
                            <text x={p.x} y={GRID_Y + (STEPS + 1) * CELL + 20} className={s.colLab}>
                              Centre column
                            </text>
                            <text x={p.x} y={GRID_Y + (STEPS + 1) * CELL + 36} className={s.bits}>
                              {centre(p.rows.slice(0, step + 1))}
                            </text>
                          </>
                        )}
                      </g>
                    );
                  })}
                </svg>
                <Row>
                  <Control className="tap" disabled={locked || busy || done} onClick={stepOne}>
                    Step
                  </Control>
                  <Control className="tap" disabled={locked || busy || done} onClick={stepAll}>
                    Step to 8
                  </Control>
                  <Control className="tap" aria-pressed={col} disabled={locked || busy} onClick={toggleCol}>
                    {col ? "Centre column: on" : "Centre column: off"}
                  </Control>
                </Row>
              </div>
            );
          }}
        </Milestones>
      )}
    </Lesson>
  );
}
