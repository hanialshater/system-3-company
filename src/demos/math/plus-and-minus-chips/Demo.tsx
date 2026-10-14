"use client";

// Plus and minus chips. The learner holds START_P plus-chips and START_M minus-chips. A plus
// and a minus together are worth zero; cancelling a pair moves it to the zero pile, and the
// total (hidden until the first cancel) never changes. Adding chips changes it by one.
// Key state: every pair cancelled, so only one kind of chip is left.

import { Lesson, type StageContext } from "@/kit/Lesson";
import { Control, Readout, Row } from "@/kit/controls";
import { useMilestones } from "@/kit/milestones";
import { useState } from "react";
import s from "./styles.module.css";

const START_P = 3;
const START_M = 5;
const MAX = 10;
const MILESTONES = ["one-pair", "all-cancelled"] as const;

const W = 320;
const H = 196;
const R = 13;
const STEP = 30;

type Chips = { p: number; m: number; z: number };
const START: Chips = { p: START_P, m: START_M, z: 0 };
const fmt = (v: number) => (v < 0 ? `−${-v}` : String(v));

export default function PlusAndMinusChips({ slug }: { slug: string }) {
  const [chips, setChips] = useState<Chips>(START);

  return (
    <Lesson
      slug={slug}
      predict={{
        question: `You hold ${START_P} plus-chips and ${START_M} minus-chips. A plus and a minus cancel. What is your total?`,
        options: [String(START_P + START_M), String(START_M - START_P), fmt(START_P - START_M)],
        answer: 2,
      }}
      exploreHint="Cancel pairs until only one kind of chip is left."
      minInteractions={MILESTONES.length}
      reveal={() => (
        <>
          <p>
            <strong>{fmt(START_P - START_M)}.</strong>{" "}
            {chips.z > 0 && (chips.p === 0 || chips.m === 0)
              ? `You cancelled ${chips.z} pair${chips.z === 1 ? "" : "s"} and ${chips.p > 0 ? `${chips.p} plus-chip${chips.p === 1 ? " was" : "s were"}` : `${chips.m} minus-chip${chips.m === 1 ? " was" : "s were"}`} left, so the total on the stage is ${fmt(chips.p - chips.m)}.`
              : `${Math.min(START_P, START_M)} pairs cancel and ${Math.abs(START_P - START_M)} minus-chips are left.`}{" "}
            Taking away a pair never moved the total, because a plus and a minus together are worth zero.
          </p>
          <p>
            A negative number is not a positive one with a sign painted on: {START_M} minus-chips are not worth +{START_M}. A minus cancels a plus, like a debt against cash, and here the debts win by{" "}
            {START_M - START_P}. That is why {START_P} + ({fmt(-START_M)}) = {START_P} − {START_M} = {fmt(START_P - START_M)}.
          </p>
        </>
      )}
    >
      {(ctx) => <Stage {...ctx} chips={chips} setChips={setChips} />}
    </Lesson>
  );
}

function Stage({ locked, interact, chips, setChips }: StageContext & { chips: Chips; setChips: (c: Chips) => void }) {
  const { reach } = useMilestones(interact, MILESTONES);
  const { p, m, z } = chips;
  const [added, setAdded] = useState<"plus" | "minus" | null>(null); // set by +/- chip, cleared by a cancel or start over
  const canCancel = p > 0 && m > 0;
  const atStart = p === START.p && m === START.m && z === 0;
  const total = p - m;

  const cancel = (k: number) => {
    const next = { p: p - k, m: m - k, z: z + k };
    setChips(next);
    setAdded(null);
    reach("one-pair");
    if (next.p === 0 || next.m === 0) reach("all-cancelled");
  };

  const row = (n: number, y: number, cls: string, sign: string) => {
    const x0 = (W - (n - 1) * STEP) / 2;
    return Array.from({ length: n }, (_, i) => (
      <g key={`${sign}${i}`}>
        <circle cx={x0 + i * STEP} cy={y} r={R} className={cls} />
        <text x={x0 + i * STEP} y={y + 5} textAnchor="middle" className={s.sign}>
          {sign}
        </text>
      </g>
    ));
  };

  const zx0 = (W - (Math.min(z, 8) - 1) * 36) / 2;

  return (
    <div className={s.wrap}>
      <svg viewBox={`0 0 ${W} ${H}`} className={`stage-svg ${s.fit}`} role="img" aria-label={`${p} plus chips, ${m} minus chips, ${z} cancelled pairs`}>
        {row(p, 30, s.plus, "+")}
        {row(m, 82, s.minus, "−")}
        <line x1={16} y1={118} x2={W - 16} y2={118} className={s.rule} />
        <text x={16} y={136} className={s.small}>
          {z === 0 ? "cancelled pairs land here" : `${z} cancelled pair${z === 1 ? "" : "s"}, each worth 0`}
        </text>
        {Array.from({ length: Math.min(z, 8) }, (_, i) => (
          <g key={`z${i}`} className={s.pop}>
            <circle cx={zx0 + i * 36 - 7} cy={164} r={9} className={s.plusFaded} />
            <circle cx={zx0 + i * 36 + 7} cy={164} r={9} className={s.minusFaded} />
            <text x={zx0 + i * 36} y={186} textAnchor="middle" className={s.small}>
              0
            </text>
          </g>
        ))}
      </svg>

      <p className={s.caption} aria-live="polite">
        {locked
          ? "Make a prediction to start."
          : added
            ? canCancel
              ? `Added a ${added} chip, so the total changed. Cancel pairs again to read it.`
              : `Added a ${added} chip. Only ${p > 0 ? "plus" : "minus"} chips left, so the total is ${fmt(total)}.`
            : z === 0
            ? `${p} plus, ${m} minus. Cancel a plus with a minus.`
            : !canCancel
              ? `Only ${p > 0 ? "plus" : m > 0 ? "minus" : "no"} chips left, so the total is ${fmt(total)}.`
              : `${z} pair${z === 1 ? "" : "s"} cancelled to zero. The total did not move.`}
      </p>

      <Row>
        <Readout label="Total" value={locked || canCancel ? "?" : fmt(total)} />
      </Row>
      <Row>
        <Control disabled={locked || !canCancel} onClick={() => cancel(1)}>
          Cancel a pair
        </Control>
        <Control disabled={locked || !canCancel} onClick={() => cancel(Math.min(p, m))}>
          Cancel every pair
        </Control>
      </Row>
      <Row>
        <Control disabled={locked || p >= MAX} aria-label="Add a plus chip" onClick={() => {
            setChips({ ...chips, p: p + 1 });
            setAdded("plus");
          }}>
          + chip
        </Control>
        <Control disabled={locked || m >= MAX} aria-label="Add a minus chip" onClick={() => {
            setChips({ ...chips, m: m + 1 });
            setAdded("minus");
          }}>
          − chip
        </Control>
        <Control disabled={locked || atStart} onClick={() => {
            setChips(START);
            setAdded(null);
          }}>
          Start over
        </Control>
      </Row>
    </div>
  );
}
