"use client";

// Up then down. $100 and four percentage tiles. Each tap applies a percentage change to the
// CURRENT value and adds a bar. +50% then −50% lands on $75, not $100. The task is to find
// a way back to exactly $100, which shows that undoing +50% needs −33⅓% (and −50% needs +100%).
// Arbitrary example numbers, not a claim about any market.

import { useRef, useState } from "react";
import { Lesson } from "@/kit/Lesson";
import { Control, Row } from "@/kit/controls";
import s from "./styles.module.css";

const START = 100;
const MAX_STEPS = 6;
const TILES = [
  { label: "+50%", f: 1.5 },
  { label: "−50%", f: 0.5 },
  { label: "+100%", f: 2 },
  { label: "−33⅓%", f: 2 / 3 },
];

// Plot geometry (viewBox 320 × 200).
const L = 12;
const R = 308;
const TOP = 18;
const BOT = 178;
const SLOT = (R - L) / (MAX_STEPS + 1);
const BAR = SLOT * 0.62;

const fmt = (v: number) => `$${Math.abs(v - Math.round(v)) < 0.005 ? Math.round(v) : v.toFixed(2)}`;
const isHundred = (v: number) => Math.abs(v - START) < 1e-6;

export default function UpThenDownTrap({ slug }: { slug: string }) {
  const [steps, setSteps] = useState<number[]>([]); // indexes into TILES
  const sawPair = useRef(false);
  const madeIt = useRef(false);

  const values = steps.reduce<number[]>((acc, i) => [...acc, acc[acc.length - 1] * TILES[i].f], [START]);
  const now = values[values.length - 1];
  const ymax = Math.max(200, ...values) * 1.08;
  const py = (v: number) => BOT - (v / ymax) * (BOT - TOP);
  const back = steps.length >= 2 && isHundred(now);

  return (
    <Lesson
      slug={slug}
      predict={{
        question: "$100 rises 50%, then falls 50%. What is it worth?",
        options: ["$100", "$75", "$125"],
        answer: 1,
      }}
      exploreHint="Tap +50% then −50%. Then start over: which two taps end at exactly $100?"
      minInteractions={2}
      reveal={() => (
        <>
          <p>
            +50% then −50% gives <strong>$75</strong>: $100 becomes $150, and half of $150 is $75. The fall is taken
            from a bigger number than the rise was.
          </p>
          <p>
            To undo +50% you needed <strong>−33⅓%</strong> ($150 × ⅔ = $100), and to undo −50% you needed{" "}
            <strong>+100%</strong>. Percent changes multiply on the current value, so a loss always needs a bigger
            percentage gain to recover, and order does not matter: −50% then +50% is also $75.
          </p>
          <p className="muted">Made-up example numbers, not a claim about any market.</p>
        </>
      )}
    >
      {({ locked, interact }) => {
        const apply = (next: number[]) => {
          setSteps(next);
          const vals = next.reduce<number[]>((acc, i) => [...acc, acc[acc.length - 1] * TILES[i].f], [START]);
          const hasPair = next.includes(0) && next.includes(1);
          if (hasPair && !sawPair.current) {
            sawPair.current = true;
            interact();
          }
          if (next.length >= 2 && isHundred(vals[vals.length - 1]) && !madeIt.current) {
            madeIt.current = true;
            interact();
          }
        };
        return (
          <div className={s.wrap}>
            <svg viewBox="0 0 320 200" className="stage-svg" role="img" aria-label={`Value after ${steps.length} changes: ${fmt(now)}`}>
              <line x1={L} y1={py(START)} x2={R} y2={py(START)} className={s.hundred} />
              <text x={R} y={py(START) - 4} textAnchor="end" className={s.axis}>
                $100
              </text>
              <line x1={L} y1={BOT} x2={R} y2={BOT} stroke="var(--line)" />
              {values.map((v, k) => {
                const x = L + k * SLOT + (SLOT - BAR) / 2;
                const cls = k === 0 ? s.barStart : isHundred(v) ? s.barGood : v < START ? s.barLow : s.barHigh;
                return (
                  <g key={k}>
                    <rect x={x} y={py(v)} width={BAR} height={BOT - py(v)} rx={3} className={cls} />
                    <text x={x + BAR / 2} y={py(v) - 4} textAnchor="middle" className={s.value} fill="var(--fg)">
                      {fmt(v)}
                    </text>
                    {k > 0 && (
                      <text x={x + BAR / 2} y={BOT + 14} textAnchor="middle" className={s.axis}>
                        {TILES[steps[k - 1]].label}
                      </text>
                    )}
                  </g>
                );
              })}
            </svg>

            <p className={s.msg} aria-live="polite">
              {locked ? "Lock in a guess to start." : back ? "Back to exactly $100." : "Goal: get back to exactly $100."}
            </p>

            <Row>
              {TILES.map((t, i) => (
                <Control
                  key={t.label}
                  className={s.tile}
                  disabled={locked || steps.length >= MAX_STEPS}
                  onClick={() => apply([...steps, i])}
                  aria-label={`Change by ${t.label}`}
                >
                  {t.label}
                </Control>
              ))}
            </Row>
            <Row>
              <Control disabled={locked || steps.length === 0} onClick={() => apply(steps.slice(0, -1))}>
                Undo
              </Control>
              <Control disabled={locked || steps.length === 0} onClick={() => apply([])}>
                Start over
              </Control>
            </Row>
          </div>
        );
      }}
    </Lesson>
  );
}
