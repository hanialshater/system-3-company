"use client";

// A made-up reaction whose measured rate = k [A] [B]^2, shown relative to the first run (rate 1).
// Runs: base (A×1, B×1), double A, double B, double both. Bars are drawn on one scale 0..8.
// Key state: all three experiments done (milestones a, b, both); the "both" run reads ×8, not 2+4-1=5 or 6.
// Buttons are disabled after use; "Clear table" is last so QA ends with all three runs reached.

import { useState } from "react";
import { Lesson } from "@/kit/Lesson";
import { Control, Row } from "@/kit/controls";
import { Milestones } from "@/kit/milestones";
import s from "./styles.module.css";

const M = 1; // measured exponent of A
const N = 2; // measured exponent of B
const rate = (a: number, b: number) => a ** M * b ** N;
type Run = { id: "a" | "b" | "both"; label: string; a: number; b: number };
const RUNS: Run[] = [
  { id: "a", label: "Run: double A only", a: 2, b: 1 },
  { id: "b", label: "Run: double B only", a: 1, b: 2 },
  { id: "both", label: "Run: double both", a: 2, b: 2 },
];
const NAMES = ["a", "b", "both"] as const;
const BOTH = rate(2, 2);

const W = 320;
const ROW = 38;
const X0 = 108;
const SPAN = 190;
const wOf = (r: number) => (r / BOTH) * SPAN;

export default function MultiplyRates({ slug }: { slug: string }) {
  const [done, setDone] = useState<string[]>([]);
  const rows = [{ id: "base", label: "start: [A]×1 [B]×1", a: 1, b: 1 }, ...RUNS.filter((r) => done.includes(r.id)).map((r) => ({ id: r.id, label: `[A]×${r.a} [B]×${r.b}`, a: r.a, b: r.b }))];

  return (
    <Lesson
      slug={slug}
      predict={{
        question: `In a made-up reaction, doubling reactant A alone doubles the rate. Doubling B alone makes it ${rate(1, 2)} times faster. Doubling both A and B makes the rate…`,
        options: [`${rate(2, 1) + rate(1, 2)} times faster`, `${BOTH} times faster`, `${rate(1, 2)} times faster`],
        answer: 1,
      }}
      exploreHint="Run the three experiments and compare the bars."
      minInteractions={NAMES.length}
      reveal={() => (
        <>
          <p>
            Doubling both made the rate <strong>{BOTH} times</strong> faster. Not {rate(2, 1) + rate(1, 2)}: the effects multiply, they do not add.
          </p>
          <p>
            Doubling A gave ×{rate(2, 1)}, doubling B gave ×{rate(1, 2)}, so together {rate(2, 1)} × {rate(1, 2)} = {BOTH}. That fits rate = k[A][B]², with k a fixed constant, where the
            exponents were read from experiments like these, not from the equation.
          </p>
        </>
      )}
    >
      {({ locked, interact }) => (
        <Milestones interact={interact} names={NAMES}>
          {(reach) => {
            const run = (r: Run) => {
              if (!done.includes(r.id)) setDone([...done, r.id]);
              reach(r.id);
            };
            return (
              <div className={s.wrap}>
                <svg viewBox={`0 0 ${W} ${4 * ROW + 24}`} className="stage-svg" role="img" aria-label={`${rows.length} runs`}>
                  <text x={6} y={14} className={s.small}>
                    Made-up reaction. [A], [B] = amount per litre.
                  </text>
                  {rows.map((r, i) => (
                    <g key={r.id}>
                      <text x={6} y={24 + i * ROW + 24} className={s.lab}>
                        {r.label}
                      </text>
                      <rect x={X0 + 40} y={24 + i * ROW + 10} width={Math.max(2, wOf(rate(r.a, r.b)) * 0.55)} height={20} className={r.id === "both" ? s.hi : s.bar} />
                      <text x={X0 + 40 + wOf(rate(r.a, r.b)) * 0.55 + 6} y={24 + i * ROW + 25} className={s.val}>
                        ×{rate(r.a, r.b)}
                      </text>
                    </g>
                  ))}
                </svg>
                <Row>
                  {RUNS.map((r) => (
                    <Control key={r.id} onClick={() => run(r)} disabled={locked || done.includes(r.id)}>
                      {r.label}
                    </Control>
                  ))}
                  <Control onClick={() => setDone([])} disabled={locked || done.length === 0}>
                    Clear table
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
