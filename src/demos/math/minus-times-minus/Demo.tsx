"use client";

// Minus times minus. The second factor is fixed at B = -2. The learner steps the first
// factor a down from 3 to -3 (one button per value; choosing a value shows every row from 3
// down to it). Each product is plotted as a dot, with "+2" between neighbours, so the
// column climbs through zero without a break and lands on (-3) x (-2) = 6.
// Key state: a row below zero, then a = -3.

import { Lesson, type StageContext } from "@/kit/Lesson";
import { Control, Row } from "@/kit/controls";
import { useMilestones } from "@/kit/milestones";
import { useState } from "react";
import s from "./styles.module.css";

const B = -2;
const TOP_A = 3;
const LOW_A = -3;
const AS = Array.from({ length: TOP_A - LOW_A + 1 }, (_, i) => TOP_A - i); // 3, 2, ..., -3
const MILESTONES = ["below-zero", "minus-three"] as const;

const W = 320;
const H = 222;
const X0 = 46;
const X1 = W - 20;
const MID = 108;
const DY = 14;

const fmt = (v: number) => (v < 0 ? `−${-v}` : String(v === 0 ? 0 : v));
const paren = (v: number) => (v < 0 ? `(${fmt(v)})` : fmt(v));
const xOf = (a: number) => X0 + ((TOP_A - a) * (X1 - X0)) / (TOP_A - LOW_A);
const yOf = (v: number) => MID - v * DY;

export default function MinusTimesMinus({ slug }: { slug: string }) {
  const [a, setA] = useState(TOP_A);

  return (
    <Lesson
      slug={slug}
      predict={{
        question: `What is ${paren(LOW_A)} × ${paren(B)}?`,
        options: [fmt(-LOW_A * -B * -1), fmt(LOW_A * B), fmt(LOW_A + B)],
        answer: 1,
      }}
      exploreHint={`Step the first factor down from ${TOP_A}, one value at a time.`}
      minInteractions={MILESTONES.length}
      reveal={() => (
        <>
          <p>
            <strong>{fmt(LOW_A * B)}.</strong> Each step down in the first factor added {-B} to the product:{" "}
            {AS.map((x) => fmt(x * B)).join(", ")}. Nothing special happens at zero, so the climb carries on and lands on{" "}
            {fmt(LOW_A * B)}.
          </p>
          <p>
            The pattern is forced. {paren(LOW_A)} × {paren(B)} plus {paren(LOW_A)} × {-B} is {paren(LOW_A)} × 0 = 0, and{" "}
            {paren(LOW_A)} × {-B} = {fmt(LOW_A * -B)}. So {paren(LOW_A)} × {paren(B)} must be its opposite,{" "}
            {fmt(LOW_A * B)}. Minus times minus is plus because anything else would break the rules that already work.
          </p>
        </>
      )}
    >
      {(ctx) => <Stage {...ctx} a={a} setA={setA} />}
    </Lesson>
  );
}

function Stage({ locked, interact, a, setA }: StageContext & { a: number; setA: (v: number) => void }) {
  const { reach } = useMilestones(interact, MILESTONES);
  const shown = AS.filter((x) => x >= a);

  const pick = (v: number) => {
    setA(v);
    if (v < 0) reach("below-zero");
    if (v === LOW_A) reach("minus-three");
  };

  return (
    <div className={s.wrap}>
      <svg viewBox={`0 0 ${W} ${H}`} className={`stage-svg ${s.fit}`} role="img" aria-label={`Products of the first factor times ${fmt(B)}, from ${TOP_A} down to ${fmt(a)}`}>
        {[-6, -4, -2, 2, 4, 6].map((v) => (
          <g key={v}>
            <line x1={X0 - 14} y1={yOf(v)} x2={X1 + 8} y2={yOf(v)} className={s.grid} />
            <text x={X0 - 18} y={yOf(v) + 4} textAnchor="end" className={s.tick}>
              {fmt(v)}
            </text>
          </g>
        ))}
        <line x1={X0 - 14} y1={MID} x2={X1 + 8} y2={MID} className={s.zero} />
        <text x={X0 - 18} y={MID + 4} textAnchor="end" className={s.tick}>
          0
        </text>
        {AS.map((x) => (
          <text key={x} x={xOf(x)} y={H - 6} textAnchor="middle" className={x === a ? s.tickOn : s.tick}>
            {fmt(x)}
          </text>
        ))}
        <text x={X1 + 8} y={H - 22} textAnchor="end" className={s.axis}>
          first factor →
        </text>
        {shown.slice(1).map((x) => (
          <g key={`s${x}`}>
            <line x1={xOf(x + 1)} y1={yOf((x + 1) * B)} x2={xOf(x)} y2={yOf(x * B)} className={s.step} />
            <text x={(xOf(x + 1) + xOf(x)) / 2 + 6} y={(yOf((x + 1) * B) + yOf(x * B)) / 2 + 2} className={s.plus}>
              +{-B}
            </text>
          </g>
        ))}
        {shown.map((x) => (
          <g key={`d${x}`} className={s.pop}>
            <circle cx={xOf(x)} cy={yOf(x * B)} r={7} className={x * B > 0 ? s.dotPos : x * B < 0 ? s.dotNeg : s.dotZero} />
            <text x={x === TOP_A ? xOf(x) + 11 : xOf(x) - 9} y={yOf(x * B) + (x === TOP_A ? 4 : -8)} textAnchor={x === TOP_A ? "start" : "end"} className={s.val}>
              {fmt(x * B)}
            </text>
          </g>
        ))}
      </svg>

      <p className={s.caption} aria-live="polite">
        {locked
          ? "Make a prediction to start."
          : a === TOP_A
            ? `${TOP_A} × ${paren(B)} = ${fmt(TOP_A * B)}. Step the first factor down.`
            : a === LOW_A
              ? `${paren(a)} × ${paren(B)} = ${fmt(a * B)}. The +${-B} steps never broke.`
              : `${paren(a)} × ${paren(B)} = ${fmt(a * B)}. Each step down adds ${-B}.`}
      </p>

      <div className={s.label}>First factor, times {paren(B)}</div>
      <Row>
        {AS.map((x) => (
          <Control key={x} disabled={locked || x === a} className={x === a ? "active" : ""} aria-pressed={x === a} aria-label={`First factor ${fmt(x)}`} onClick={() => pick(x)}>
            {fmt(x)}
          </Control>
        ))}
      </Row>
    </div>
  );
}
