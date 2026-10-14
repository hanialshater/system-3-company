"use client";

// Nash bargaining over $1. A's outside option (what A gets with no deal) is set by the learner; B's is $0.
// Each side first gets its outside option, and the rest is split evenly: A = a + (1 - a - b) / 2, B = 1 - A.
// The deal always happens (its total, $1, beats the outside options' total), so A never takes the outside option;
// it only moves the split. Amounts are whole cents to avoid float drift. Key state: A's option at $0.40 (the question).
// Model (a simplification): money-like payoffs, both value a dollar the same, the deal is sure to be reached.
// v2: the rule labels ("A's fallback, then half the rest") appear only after the commit; the previous split stays as
// a dashed "before" line, and the reveal quotes the learner's last change (previous option -> current option).
// Milestones: moved (any change of A's option), at-question ($0.40).
// v3 (r7): the reveal quoted the last slider stop ($0.70 -> $0.80), which a two-press slider move passes
// in a blink. Now every option the learner has set is logged in a "Tried" row under the bar
// (option -> A's deal, sorted), and the reveal quotes the lowest and highest tries from that row.
// v4 (r8, phone fit): reveal cut to <= 90 words (the 'every 10 cents' restatement is gone; the model line moved to the
// stage chip); the A/B readouts are gone (the svg's 'Deal: A ..., B ...' line says the same); the svg is 34 units shorter.

import { useState } from "react";
import { Lesson } from "@/kit/Lesson";
import { Control, Row, Slider } from "@/kit/controls";
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
  const [prev, setPrev] = useState<number | null>(null); // A's option before the latest change
  const [sawQ, setSawQ] = useState(false); // the $0.40 case has been set at least once (its line stays on stage)
  const [tried, setTried] = useState<number[]>([0]); // every option set so far, sorted (the "Tried" row)
  const { A, B, rest } = split(a);
  const pA = prev === null ? null : split(prev).A;
  const q = split(QUESTION);
  const lo = tried[0];
  const hi = tried[tried.length - 1];

  return (
    <Lesson
      slug={slug}
      predict={{
        question:
          "A and B split $1 by bargaining (the Nash model). A could get $0.40 elsewhere; B gets nothing elsewhere. How much does A get?",
        options: ["$0.50", "$0.70", "$0.40"],
        answer: 1,
      }}
      exploreHint="Change A's outside option. Does A ever walk away?"
      minInteractions={2}
      reveal={() => (
        <>
          <p>
            With your $0.40 option, A got <strong>{usd(q.A)}</strong> and B {usd(q.B)}, and the deal still happened: A never took
            the outside $0.40. Each side first gets its fallback, then what is left ({usd(q.rest)}) is split evenly: $0.40 +
            $0.30 = $0.70.
          </p>
          <p>
            {hi > lo
              ? `Your Tried row: raising A's option from ${usd(lo)} to ${usd(hi)} (${hi - lo} cents) moved A's deal from ${usd(split(lo).A)} to ${usd(split(hi).A)} (${split(hi).A - split(lo).A} cents). `
              : ""}
            The option works as a threat, not as a move: it matters even though A never uses it.
          </p>
        </>
      )}
    >
      {({ locked, interact }) => (
        <Milestones interact={interact} names={["moved", "at-question"]}>
          {(reach) => {
            const choose = (v: number) => {
              if (v === a) return;
              setPrev(a);
              setA(v);
              setTried((t) => (t.includes(v) ? t : [...t, v].sort((x, y) => x - y)));
              reach("moved");
              if (v === QUESTION) {
                setSawQ(true);
                reach("at-question");
              }
            };
            return (
              <div className={s.wrap}>
                <p className={s.chip}>Model: money payoffs; the deal always happens</p>
                <svg viewBox="0 0 340 150" className="stage-svg" role="img" aria-label={`A gets ${usd(A)}, B gets ${usd(B)}`}>
                  <text x={20} y={14} className={s.axis}>
                    No deal: A {usd(a)}, B {usd(B_OUT)}
                  </text>
                  <text x={20} y={32} className={s.label}>
                    Deal: A {usd(A)}, B {usd(B)}
                  </text>
                  {a > 0 && <rect x={X(0)} y={40} width={X(a) - X(0)} height={36} className={s.barFirm} />}
                  <rect x={X(a)} y={40} width={X(A) - X(a)} height={36} className={s.bar} />
                  <rect x={X(A)} y={40} width={X(PIE) - X(A)} height={36} className={s.barB} />
                  {pA !== null && pA !== A && (
                    <g>
                      <line x1={X(pA)} x2={X(pA)} y1={34} y2={82} className={s.before} />
                      <text x={X(pA)} y={127} textAnchor="middle" className={s.axis}>
                        before {usd(pA)}
                      </text>
                    </g>
                  )}
                  <line x1={X(A)} x2={X(A)} y1={34} y2={82} className={s.price} />
                  {a > 0 && (
                    <text x={X(a / 2)} y={62} textAnchor="middle" className={s.inBar}>
                      {usd(a)}
                    </text>
                  )}
                  {rest / 2 >= 15 && (
                    <>
                      <text x={X(a + rest / 4)} y={62} textAnchor="middle" className={s.inBar}>
                        {usd(rest / 2)}
                      </text>
                      <text x={X(A + rest / 4)} y={62} textAnchor="middle" className={s.inBar}>
                        {usd(rest / 2)}
                      </text>
                    </>
                  )}
                  {!locked && (
                    <>
                      <text x={X(0)} y={95} className={s.axis}>
                        A&apos;s fallback, then half the rest
                      </text>
                      <text x={X(PIE)} y={95} textAnchor="end" className={s.axis}>
                        B: half the rest
                      </text>
                    </>
                  )}
                  <text x={X(A)} y={112} textAnchor="middle" className={s.priceText}>
                    split
                  </text>
                  {sawQ && (
                    <text x={20} y={145} className={s.label}>
                      Your {usd(QUESTION)} case: A {usd(q.A)}, B {usd(q.B)}, deal made
                    </text>
                  )}
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
                <p className={s.tried} aria-live="polite">
                  {locked || tried.length < 2
                    ? " "
                    : `Tried (option → A gets): ${tried.map((t) => `${usd(t)} → ${usd(split(t).A)}`).join(" · ")}`}
                </p>
              </div>
            );
          }}
        </Milestones>
      )}
    </Lesson>
  );
}
