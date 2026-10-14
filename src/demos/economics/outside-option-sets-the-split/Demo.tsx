"use client";

// Nash bargaining over $1. A's outside option (what A gets with no deal) is set by the learner; B's is $0.
// Each side first gets its outside option, and the rest is split evenly: A = a + (1 - a - b) / 2, B = 1 - A.
// The deal always happens (its total, $1, beats the outside options' total), so A never takes the outside option;
// it only moves the split. Amounts are whole cents to avoid float drift. Key state: A's option at $0.40 (the question).
// Model (a simplification): money-like payoffs, both value a dollar the same, the deal is sure to be reached.

import { useState } from "react";
import { Lesson } from "@/kit/Lesson";
import { Control, Readout, Row, Slider } from "@/kit/controls";
import { Milestones } from "@/kit/milestones";
import s from "./styles.module.css";

const PIE = 100; // cents
const B_OUT = 0;
const QUESTION = 40;
const PRESETS = [0, 20, QUESTION, 60];
const split = (a: number) => {
  const A = a + (PIE - a - B_OUT) / 2;
  return { A, B: PIE - A, rest: PIE - a - B_OUT };
};
const usd = (c: number) => `$${(c / 100).toFixed(2)}`;

// Geometry (viewBox 340 × 170): $0..$1 → x 20..320.
const X = (c: number) => 20 + c * 3;

export default function OutsideOptionSetsTheSplit({ slug }: { slug: string }) {
  const [a, setA] = useState(0);
  const { A, B, rest } = split(a);
  const q = split(QUESTION);

  return (
    <Lesson
      slug={slug}
      predict={{
        question: "A and B split $1. A could get $0.40 elsewhere; B gets nothing elsewhere. Under Nash bargaining, A gets?",
        options: ["$0.50", "$0.70", "$0.40"],
        answer: 1,
      }}
      exploreHint="Change A's outside option. Watch the split, and whether anyone walks away."
      minInteractions={1}
      reveal={() => (
        <>
          <p>
            With a $0.40 option, A got <strong>{usd(q.A)}</strong> and B {usd(q.B)}, and the deal still happened: A never took
            the outside $0.40. Each side first gets its fallback, then what is left ({usd(q.rest)}) is split evenly: $0.40 +
            $0.30 = $0.70.
          </p>
          <p>
            Every 10 cents added to A&apos;s option moved 5 cents of the deal to A. The option works as a threat, not as a move:
            it matters even though A never uses it.
          </p>
          <p className="muted">A model: money payoffs, both value a dollar the same, and the deal is sure to happen.</p>
        </>
      )}
    >
      {({ locked, interact }) => (
        <Milestones interact={interact} names={["at-question"]}>
          {(reach) => {
            const choose = (v: number) => {
              if (v === a) return;
              setA(v);
              if (v === QUESTION) reach("at-question");
            };
            return (
              <div className={s.wrap}>
                <p className={s.chip}>Split $1 · B&apos;s outside option $0</p>
                <svg viewBox="0 0 340 170" className="stage-svg" role="img" aria-label={`A gets ${usd(A)}, B gets ${usd(B)}`}>
                  <text x={20} y={22} className={s.axis}>
                    No deal: A {usd(a)}, B {usd(B_OUT)}
                  </text>
                  <text x={20} y={44} className={s.label}>
                    Deal: A {usd(A)}, B {usd(B)}
                  </text>
                  {a > 0 && <rect x={X(0)} y={58} width={X(a) - X(0)} height={40} className={s.barFirm} />}
                  <rect x={X(a)} y={58} width={X(A) - X(a)} height={40} className={s.bar} />
                  <rect x={X(A)} y={58} width={X(PIE) - X(A)} height={40} className={s.barB} />
                  <line x1={X(A)} x2={X(A)} y1={52} y2={104} className={s.price} />
                  {a > 0 && (
                    <text x={X(a / 2)} y={82} textAnchor="middle" className={s.inBar}>
                      {usd(a)}
                    </text>
                  )}
                  <text x={X(a + rest / 4)} y={82} textAnchor="middle" className={s.inBar}>
                    {usd(rest / 2)}
                  </text>
                  <text x={X(A + rest / 4)} y={82} textAnchor="middle" className={s.inBar}>
                    {usd(rest / 2)}
                  </text>
                  <text x={X(0)} y={120} className={s.axis}>
                    A&apos;s fallback, then half the rest
                  </text>
                  <text x={X(PIE)} y={120} textAnchor="end" className={s.axis}>
                    B: half the rest
                  </text>
                  <text x={X(A)} y={140} textAnchor="middle" className={s.priceText}>
                    split
                  </text>
                </svg>
                <Row>
                  {PRESETS.map((v) => (
                    <Control
                      key={v}
                      className={`${s.tap} ${v === a ? "active" : ""}`}
                      disabled={locked || v === a}
                      onClick={() => choose(v)}
                    >
                      {usd(v)}
                    </Control>
                  ))}
                </Row>
                <Slider label="A's outside option" value={a} min={0} max={80} step={10} disabled={locked} onChange={choose} format={usd} />
                <Row>
                  <Readout label="A gets" value={usd(A)} />
                  <Readout label="B gets" value={usd(B)} />
                </Row>
              </div>
            );
          }}
        </Milestones>
      )}
    </Lesson>
  );
}
