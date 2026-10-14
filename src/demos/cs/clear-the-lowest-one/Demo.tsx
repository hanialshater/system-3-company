"use client";

// x & (x - 1) clears exactly the lowest 1 bit of x: subtracting 1 turns that 1 into 0 and the zeros
// below it into 1s, and the AND keeps only the bits the two share. 10110 -> 10100 -> 10000 -> 0:
// 3 repeats, one per 1 bit. 255 takes 8. x is a power of two iff x > 0 and x & (x - 1) = 0.
// Shown on 8 bits; the learner can toggle any bit to try another x.

import { useState } from "react";
import { Lesson } from "@/kit/Lesson";
import { Control, Readout, Row } from "@/kit/controls";
import { Milestones } from "@/kit/milestones";
import s from "./styles.module.css";

const BITS = 8;
const START = 0b10110; // 22
const b8 = (x: number) => (x & 0xff).toString(2).padStart(BITS, "0");
const short = (x: number) => x.toString(2);
const ones = (x: number) => b8(x).split("").filter((c) => c === "1").length;
const repeatsToZero = (x: number) => {
  let n = 0;
  for (let y = x; y; y &= y - 1) n++;
  return n;
};
const START_REPEATS = repeatsToZero(START); // 3
const R255 = repeatsToZero(255); // 8
const R2_30 = repeatsToZero(2 ** 30); // 1
const SHIFTS_2_30 = (() => {
  let n = 0;
  for (let y = 2 ** 30; y; y >>>= 1) n++;
  return n;
})(); // 31

export default function ClearTheLowestOne({ slug }: { slug: string }) {
  const [x, setX] = useState(START);
  const [trail, setTrail] = useState<number[]>([START]); // values since the last change of x by hand

  const repeats = trail.length - 1;
  const xm1 = x - 1;
  const and = x & xm1;
  const lowest = x === 0 ? -1 : Math.log2(x & -x); // bit index of the lowest 1

  const note =
    x === 0
      ? repeats > 0
        ? `x is 0 after ${repeats} repeat${repeats === 1 ? "" : "s"}. It had ${ones(trail[0])} ones.`
        : "x is 0: nothing to clear. Toggle a bit."
      : `x − 1 flips the lowest 1 and the zeros below it. The AND keeps the rest.`;

  return (
    <Lesson
      slug={slug}
      predict={{
        question: `Take x = 0b${short(START)}. Repeat x = x & (x − 1) until x is 0. How many repeats?`,
        options: [`${short(START).length}, one per bit position`, `${START_REPEATS}, one per 1 bit`, "2"],
        answer: 1,
      }}
      exploreHint="Apply x & (x − 1) and watch which bit disappears each time."
      minInteractions={2}
      reveal={() => (
        <>
          <p>
            From {short(START)} it took {START_REPEATS} repeats: {short(START)} → 10100 → 10000 → 0. Each time exactly one bit
            vanished, the lowest 1, so the repeats counted the ones.
          </p>
          <p>
            Subtracting 1 is not a last-digit change: it turns the lowest 1 into 0 and every 0 below it into 1 ({short(START)} − 1 ={" "}
            {short(START - 1)}). The AND keeps only bits the two share, so it clears that one bit and nothing else. 255 takes {R255}{" "}
            repeats. If one repeat gives 0, x was a power of two: 2^30 takes {R2_30}, where shifting right one place at a time
            needs {SHIFTS_2_30} to reach 0.
          </p>
        </>
      )}
    >
      {({ locked, interact }) => (
        <Milestones interact={interact} names={["one-clear", "zero"]}>
          {(reach) => {
            const apply = () => {
              if (locked || x === 0) return;
              const n = x & (x - 1);
              setX(n);
              setTrail([...trail, n]);
              reach("one-clear");
              if (n === 0) reach("zero");
            };
            const applyAll = () => {
              if (locked || x === 0) return;
              const t = [...trail];
              for (let y = x; y; ) {
                y &= y - 1;
                t.push(y);
              }
              setX(0);
              setTrail(t);
              reach("one-clear");
              reach("zero");
            };
            const set = (v: number) => {
              if (locked) return;
              setX(v);
              setTrail([v]);
            };
            const flip = (bit: number) => set(x ^ (1 << bit));

            const cells = (v: number, mark: (i: number) => string) =>
              b8(v)
                .split("")
                .map((c, k) => (
                  <span key={k} className={`${s.bit} ${mark(BITS - 1 - k)}`}>
                    {c}
                  </span>
                ));

            return (
              <div className={s.wrap}>
                <p className={s.note}>{note}</p>
                <Row>
                  <Control className={x !== 0 ? "active" : ""} disabled={locked || x === 0} onClick={apply}>
                    x = x & (x − 1)
                  </Control>
                  <Control disabled={locked || x === 0} onClick={applyAll}>
                    Repeat until 0
                  </Control>
                  <Control disabled={locked || (x === START && repeats === 0)} onClick={() => set(START)}>
                    Back to {short(START)}
                  </Control>
                  <Control disabled={locked || (x === 255 && repeats === 0)} onClick={() => set(255)}>
                    Try 11111111
                  </Control>
                </Row>
                <div className={s.grid} role="group" aria-label="Bits of x">
                  <span className={s.rowLab}>x</span>
                  {Array.from({ length: BITS }, (_, k) => BITS - 1 - k).map((bit) => (
                    <Control
                      key={`t${bit}`}
                      className={`${s.tog} ${(x >> bit) & 1 ? s.one : ""} ${bit === lowest ? s.low : ""}`}
                      disabled={locked}
                      onClick={() => flip(bit)}
                      aria-label={`Bit ${bit} of x is ${(x >> bit) & 1}`}
                    >
                      {(x >> bit) & 1}
                    </Control>
                  ))}
                  <span className={s.dec}>{x}</span>

                  <span className={s.rowLab}>x − 1</span>
                  {x === 0 ? <span className={s.none}>(x is 0)</span> : cells(xm1, (i) => (i <= lowest ? s.flipped : ""))}
                  <span className={s.dec}>{x === 0 ? "" : xm1}</span>

                  <span className={s.rowLab}>AND</span>
                  {x === 0 ? <span className={s.none} /> : cells(and, (i) => (i === lowest ? s.cleared : ""))}
                  <span className={s.dec}>{x === 0 ? "" : and}</span>
                </div>
                <p className={s.trail}>{trail.map(short).join(" → ")}</p>
                <Row>
                  <Readout label="Repeats" value={repeats} />
                  <Readout label="1 bits in x" value={ones(x)} />
                </Row>
              </div>
            );
          }}
        </Milestones>
      )}
    </Lesson>
  );
}
