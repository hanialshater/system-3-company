"use client";

// Halving powers. Stacks of unit blocks for 2^3, 2^2, 2^1 (the question's values) stand in a row.
// Each step chip divides the last stack by 2 and draws the next power: 2^0, then 2^-1, 2^-2, so the
// stack goes 2 -> 1 -> 1/2 -> 1/4 block. Only the next chip is enabled. Values come from 2 ** n.
// Key state: the exponent stepped down to 0, the stack a single unit block.

import { Lesson } from "@/kit/Lesson";
import { Control, Readout, Row } from "@/kit/controls";
import { Milestones } from "@/kit/milestones";
import { useState } from "react";
import s from "./styles.module.css";

const GIVEN = [3, 2, 1];
const STEPS = [0, -1, -2];
const ALL = [...GIVEN, ...STEPS];
const MILESTONES = ["reached-zero"] as const;

const SUP: Record<string, string> = { "-": "⁻", "0": "⁰", "1": "¹", "2": "²", "3": "³" };
const pow = (n: number) => `2${String(n).split("").map((c) => SUP[c]).join("")}`;
const val = (n: number) => 2 ** n;
const frac = (v: number) => (v >= 1 ? String(v) : `1/${1 / v}`);

const U = 17; // px per unit block
const COL = 46;
const PAD = 14;
const BASE = 8 * U + 30;
const W = PAD * 2 + COL * ALL.length;
const H = BASE + 34;

export default function HalvingPowers({ slug }: { slug: string }) {
  const [down, setDown] = useState(0); // how many of STEPS are shown
  const [reached, setReached] = useState(0);

  return (
    <Lesson
      slug={slug}
      predict={{
        question: `${GIVEN.map((n) => `${pow(n)} = ${val(n)}`).join(", ")}. Following the pattern, what is ${pow(0)}?`,
        options: ["0", "1", "2"],
        answer: 1,
      }}
      exploreHint="Keep the pattern going: halve the last stack, one step at a time."
      minInteractions={MILESTONES.length}
      reveal={() => (
        <>
          <p>
            <strong>1.</strong> Each step down divides by 2: 8, 4, 2, then 2 ÷ 2 = 1, a single block.
            {reached >= 3
              ? " You kept going to 1/2 and 1/4, which are 2⁻¹ and 2⁻²."
              : reached >= 2
                ? " You kept going to 1/2, which is 2⁻¹."
                : ""}
          </p>
          <p>
            &quot;Zero 2s multiplied&quot; sounds like 0, but the pattern says otherwise, and so does multiplying: 2⁰ × 2³ must
            be 2⁰⁺³ = 2³, so 2⁰ has to be 1. Starting from 1 and multiplying by no 2s leaves 1. The same holds for any number
            other than 0 to the power 0.
          </p>
        </>
      )}
    >
      {({ locked, interact }) => (
        <Milestones interact={interact} names={MILESTONES}>
          {(reach) => (
            <Stage
              locked={locked}
              down={down}
              onStep={(k) => {
                setDown(k + 1);
                setReached(k + 1);
                if (STEPS[k] === 0) reach("reached-zero");
              }}
            />
          )}
        </Milestones>
      )}
    </Lesson>
  );
}

function Stage({ locked, down, onStep }: { locked: boolean; down: number; onStep: (k: number) => void }) {
  const shown = [...GIVEN, ...STEPS.slice(0, locked ? 0 : down)];
  const last = shown[shown.length - 1];
  const caption = locked
    ? "Make a prediction to start."
    : down === 0
      ? `${pow(3)} means 2 × 2 × 2. Each step down divides by 2.`
      : `${pow(last + 1)} ÷ 2 = ${frac(val(last + 1))} ÷ 2 = ${frac(val(last))}, so ${pow(last)} = ${frac(val(last))}.`;

  return (
    <div className={s.wrap}>
      <svg viewBox={`0 0 ${W} ${H}`} className={`stage-svg ${s.fit}`} role="img" aria-label={caption}>
        <line x1={PAD} y1={BASE} x2={W - PAD} y2={BASE} className={s.base} />
        {ALL.map((n, i) => {
          const x = PAD + i * COL + 8;
          const w = COL - 16;
          const on = shown.includes(n);
          const v = val(n);
          const whole = Math.floor(v);
          const part = v - whole;
          return (
            <g key={n}>
              {on &&
                Array.from({ length: whole }, (_, b) => (
                  <rect key={b} x={x} y={BASE - (b + 1) * U} width={w} height={U} className={n === 0 ? s.one : s.block} />
                ))}
              {on && part > 0 && <rect x={x} y={BASE - part * U} width={w} height={part * U} className={s.block} />}
              {!on && <rect x={x} y={BASE - U} width={w} height={U} className={s.slot} />}
              <text x={x + w / 2} y={on ? BASE - v * U - 6 : BASE - U - 6} className={on ? s.val : s.q}>
                {on ? frac(v) : "?"}
              </text>
              <text x={x + w / 2} y={BASE + 20} className={s.exp}>
                {pow(n)}
              </text>
              {i > 0 && on && (
                <text x={x - 8} y={BASE + 32} className={s.div}>
                  ÷2
                </text>
              )}
            </g>
          );
        })}
      </svg>

      <p className={s.caption} aria-live="polite">
        {caption}
      </p>

      <div className={s.chips} role="group" aria-label="Step down">
        {STEPS.map((n, k) => (
          <Control
            key={n}
            disabled={locked || k !== down}
            className={k < down ? "active" : ""}
            aria-label={`Halve again to get ${pow(n)}`}
            onClick={() => onStep(k)}
          >
            ÷ 2 → {pow(n)}
          </Control>
        ))}
      </div>
      <Row>
        <Readout label="Last stack" value={locked ? "?" : `${pow(last)} = ${frac(val(last))}`} />
      </Row>
    </div>
  );
}
