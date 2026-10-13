"use client";

// Diffie-Hellman on a 23-position clock. Public: the clock (23) and the base (5). Alice's secret 6
// gives her public number 8, Bob's secret 15 gives 19 (computed below, not typed). Bob starts at 1
// and multiplies by Alice's 8, fifteen times; Alice multiplies by Bob's 19, six times. Each multiply
// wraps around the clock. Both hands stop on the same mark, 2. One picture: the clock.

import { useState } from "react";
import { Lesson } from "@/kit/Lesson";
import { Control, Readout, Row } from "@/kit/controls";
import { Milestones } from "@/kit/milestones";
import s from "./styles.module.css";

const N = 23;
const BASE = 5;
const A_SECRET = 6;
const B_SECRET = 15;
/** Start at 1 and multiply by k, `times` times, wrapping on the N-clock. Returns every stop. */
const walk = (k: number, times: number) => {
  const stops = [1];
  for (let i = 0; i < times; i++) stops.push((stops[stops.length - 1] * k) % N);
  return stops;
};
const A_PUBLIC = walk(BASE, A_SECRET)[A_SECRET]; // 8
const B_PUBLIC = walk(BASE, B_SECRET)[B_SECRET]; // 19
const BOB = walk(A_PUBLIC, B_SECRET); // Bob multiplies by Alice's public number
const ALICE = walk(B_PUBLIC, A_SECRET); // Alice multiplies by Bob's public number
const SHARED = BOB[B_SECRET];
const SAME = SHARED === ALICE[A_SECRET];
const BOTH = A_SECRET * B_SECRET; // 90
const DIRECT = walk(BASE, BOTH)[BOTH]; // 5 multiplied 90 times: 2

// clock geometry
const C = 160;
const R = 112;
const at = (v: number, r: number) => {
  const a = (v / N) * 2 * Math.PI - Math.PI / 2;
  return { x: C + r * Math.cos(a), y: C + r * Math.sin(a) };
};

export default function PaintMixSharedSecret({ slug }: { slug: string }) {
  const [bob, setBob] = useState(0); // multiplies done
  const [alice, setAlice] = useState(0);
  const [checked, setChecked] = useState(false);

  return (
    <Lesson
      slug={slug}
      predict={{
        question: `On a ${N}-hour clock you multiply, then wrap around. Alice keeps secret ${A_SECRET} and sends ${A_PUBLIC}; Bob keeps ${B_SECRET} and sends ${B_PUBLIC}. From 1, Bob multiplies by ${A_PUBLIC} ${B_SECRET} times; Alice multiplies by ${B_PUBLIC} ${A_SECRET} times. Where do they stop?`,
        options: [`Same mark, ${SHARED}`, `Same mark, ${A_PUBLIC}`, "Different marks"],
        answer: SAME ? 0 : 2,
      }}
      exploreHint="Step each person once, then let each finish. Compare the two hands."
      minInteractions={2}
      reveal={() => (
        <>
          <p>
            You watched Bob multiply by {A_PUBLIC} {B_SECRET} times and Alice multiply by {B_PUBLIC} {A_SECRET} times.
            Both hands stopped on <strong>{SHARED}</strong>. Not luck: Alice made {A_PUBLIC} by multiplying {BASE}{" "}
            {A_SECRET} times, and Bob made {B_PUBLIC} with {BASE} {B_SECRET} times. So each of them really multiplied{" "}
            {BASE} by itself {A_SECRET} × {B_SECRET} = {BOTH} times
            {checked ? `, and your check (×${BASE}, ${BOTH} times) also stopped on ${DIRECT}.` : "."}
          </p>
          <p>
            Eve heard only {A_PUBLIC} and {B_PUBLIC}, never {A_SECRET} or {B_SECRET}. On a {N}-clock she could try
            every secret; real systems use enormous clocks where that is hopeless. This is the Diffie-Hellman key
            exchange.
          </p>
        </>
      )}
    >
      {({ locked, interact }) => (
        <Milestones interact={interact} names={["bob-done", "alice-done"]}>
          {(reach) => {
            const stepBob = (to: number) => {
              if (locked) return;
              setBob(to);
              if (to === B_SECRET) reach("bob-done");
            };
            const stepAlice = (to: number) => {
              if (locked) return;
              setAlice(to);
              if (to === A_SECRET) reach("alice-done");
            };
            const bv = BOB[bob];
            const av = ALICE[alice];
            const done = bob === B_SECRET && alice === A_SECRET;
            const bp = at(bv, R - 30);
            const ap = at(av, R - 54);
            return (
              <div className={s.wrap}>
                <p className={s.msg} aria-live="polite">
                  {locked
                    ? "Make a prediction to start."
                    : done
                      ? checked ? `×${BASE}, ${BOTH} times, also lands on ${DIRECT}.` : `Both stop on ${SHARED}.`
                      : `Multiply, then wrap past ${N - 1} back to 0.`}
                </p>
                <svg viewBox="0 0 320 320" className="stage-svg" role="img"
                  aria-label={`A ${N}-hour clock. Bob's hand at ${bv}, Alice's hand at ${av}.`}>
                  <circle cx={C} cy={C} r={R} className={s.rim} />
                  {Array.from({ length: N }, (_, v) => {
                    const p = at(v, R + 18);
                    const t1 = at(v, R - 6);
                    const t2 = at(v, R + 6);
                    const hot = !locked && ((bob > 0 && v === bv) || (alice > 0 && v === av));
                    return (
                      <g key={v}>
                        <line x1={t1.x} y1={t1.y} x2={t2.x} y2={t2.y} className={s.tick} />
                        <text x={p.x} y={p.y + 4} className={`${s.num} ${hot ? s.hot : ""}`}>{v}</text>
                      </g>
                    );
                  })}
                  {/* trails: every stop so far */}
                  {!locked && BOB.slice(1, bob + 1).map((v, i) => {
                    const p = at(v, R - 30);
                    return <circle key={`b${i}`} cx={p.x} cy={p.y} r={3} className={s.bobTrail} />;
                  })}
                  {!locked && ALICE.slice(1, alice + 1).map((v, i) => {
                    const p = at(v, R - 54);
                    return <circle key={`a${i}`} cx={p.x} cy={p.y} r={3} className={s.aliceTrail} />;
                  })}
                  <line x1={C} y1={C} x2={bp.x} y2={bp.y} className={s.bobHand} />
                  <circle cx={bp.x} cy={bp.y} r={11} className={s.bobDot} />
                  <text x={bp.x} y={bp.y + 4} className={s.who}>B</text>
                  <line x1={C} y1={C} x2={ap.x} y2={ap.y} className={s.aliceHand} />
                  <circle cx={ap.x} cy={ap.y} r={11} className={s.aliceDot} />
                  <text x={ap.x} y={ap.y + 4} className={s.whoA}>A</text>
                  {checked && (() => {
                    const p = at(DIRECT, R - 6);
                    return <circle cx={p.x} cy={p.y} r={16} className={s.check} />;
                  })()}
                  <text x={C} y={C + 34} className={s.eve}>Eve hears {A_PUBLIC}, {B_PUBLIC}</text>
                </svg>
                <Row>
                  <Readout label={`Bob ×${A_PUBLIC}`} value={`${bob}/${B_SECRET} · at ${bv}`} />
                  <Readout label={`Alice ×${B_PUBLIC}`} value={`${alice}/${A_SECRET} · at ${av}`} />
                </Row>
                <Row>
                  <Control disabled={locked || bob >= B_SECRET} onClick={() => stepBob(bob + 1)}>
                    Bob: ×{A_PUBLIC}
                  </Control>
                  <Control disabled={locked || bob >= B_SECRET} onClick={() => stepBob(B_SECRET)}>
                    Bob: finish
                  </Control>
                  <Control disabled={locked || alice >= A_SECRET} onClick={() => stepAlice(alice + 1)}>
                    Alice: ×{B_PUBLIC}
                  </Control>
                  <Control disabled={locked || alice >= A_SECRET} onClick={() => stepAlice(A_SECRET)}>
                    Alice: finish
                  </Control>
                  <Control disabled={locked || !done || checked} onClick={() => { if (!locked) setChecked(true); }}>
                    Check: ×{BASE}, {BOTH} times
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
