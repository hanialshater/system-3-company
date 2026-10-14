"use client";

// x & (x - 1) clears exactly the lowest 1 bit of x: subtracting 1 turns that 1 into 0 and the zeros
// below it into 1s, and the AND keeps only the bits the two share. 10110 -> 10100 -> 10000 -> 0:
// 3 repeats, one per 1 bit. 255 takes 8. x is a power of two iff x > 0 and x & (x - 1) = 0.
// Shown on 8 bits; the learner can toggle any bit to try another x.
//
// v2 (wave E r6): the ones count and the mechanism caption are hidden until the learner acts.
// Every finished run is kept in a history list on the stage, and the reveal quotes that list,
// so "Back to 10110" or bit toggles cannot erase what the reveal names. The power-of-two test is
// shown by a run from 10000 (milestone), and the 255 run is a milestone too.

import { useState } from "react";
import { Lesson } from "@/kit/Lesson";
import { Control, Readout, Row } from "@/kit/controls";
import { Milestones } from "@/kit/milestones";
import s from "./styles.module.css";

const BITS = 8;
const START = 0b10110; // 22
const POW = 0b10000; // 16
const b8 = (x: number) => (x & 0xff).toString(2).padStart(BITS, "0");
const short = (x: number) => x.toString(2);
const ones = (x: number) => b8(x).split("").filter((c) => c === "1").length;
const chainFrom = (x: number) => {
  const t = [x];
  for (let y = x; y; ) {
    y &= y - 1;
    t.push(y);
  }
  return t;
};
const START_REPEATS = chainFrom(START).length - 1; // 3
const START_ZEROS = short(START).length - ones(START); // 2

type Run = { start: number; chain: number[] };

export default function ClearTheLowestOne({ slug }: { slug: string }) {
  const [x, setX] = useState(START);
  const [trail, setTrail] = useState<number[]>([START]); // values since the last change of x by hand
  const [runs, setRuns] = useState<Run[]>([]); // every run that reached 0, latest per start value
  const [pressed, setPressed] = useState(false);

  const repeats = trail.length - 1;
  const xm1 = x - 1;
  const and = x & xm1;
  const lowest = x === 0 ? -1 : Math.log2(x & -x); // bit index of the lowest 1

  const note = !pressed
    ? "Press x = x & (x − 1) and watch the three rows."
    : x === 0
      ? repeats > 0
        ? `x is 0 after ${repeats} repeat${repeats === 1 ? "" : "s"}.`
        : "x is 0: nothing to clear. Toggle a bit."
      : "Green: bits x − 1 changed. Red: the bit the AND cleared.";

  const startRun = runs.find((r) => r.start === START);
  const powRun = runs.find((r) => r.start !== START && r.chain.length === 2);
  const longRun = runs.reduce<Run | undefined>((m, r) => (!m || r.chain.length > m.chain.length ? r : m), undefined);
  const second = startRun ? startRun.chain[1] : START & (START - 1); // 10100

  return (
    <Lesson
      slug={slug}
      predict={{
        question: `Take x = 0b${short(START)}. Repeat x = x & (x − 1) until x is 0. How many repeats?`,
        options: [
          `${short(START).length}, one per bit position`,
          `${START_REPEATS}, one per 1 bit`,
          `${START_ZEROS}, one per 0 bit`,
        ],
        answer: 1,
      }}
      exploreHint="Apply it, run to 0, then run the other two starting values."
      minInteractions={4}
      reveal={() => (
        <>
          <p>
            {startRun
              ? `From ${short(START)} it took ${startRun.chain.length - 1} repeats: ${startRun.chain.map(short).join(" → ")}. `
              : ""}
            Each time exactly one bit vanished, the lowest 1, so the repeats counted the ones.
          </p>
          <p>
            Minus 1 is not a last-digit change: {short(second)} − 1 = {short(second - 1)}, three digits flipped. The lowest 1
            becomes 0 and every 0 below it becomes 1. The AND keeps only bits the two share, so it clears that one bit.
          </p>
          <p>
            {powRun ? `${short(powRun.start)} has one 1 bit, and one repeat gave 0. ` : ""}
            That is the test: x &gt; 0 is a power of two exactly when one repeat gives 0.
            {longRun && longRun !== powRun && longRun !== startRun
              ? ` ${short(longRun.start)} took ${longRun.chain.length - 1}, one per 1 bit again.`
              : ""}
          </p>
        </>
      )}
    >
      {({ locked, interact }) => (
        <Milestones interact={interact} names={["one-clear", "start-zero", "pow2", "long-run"]}>
          {(reach) => {
            const record = (chain: number[]) => {
              const start = chain[0];
              setRuns((rs) => [...rs.filter((r) => r.start !== start), { start, chain }]);
              if (start === START) reach("start-zero");
              if (chain.length === 2 && start !== START) reach("pow2");
              if (chain.length - 1 >= 5) reach("long-run");
            };
            const apply = () => {
              if (locked || x === 0) return;
              const n = x & (x - 1);
              const t = [...trail, n];
              setX(n);
              setTrail(t);
              setPressed(true);
              reach("one-clear");
              if (n === 0) record(t);
            };
            const applyAll = () => {
              if (locked || x === 0) return;
              const t = [...trail, ...chainFrom(x).slice(1)];
              setX(0);
              setTrail(t);
              setPressed(true);
              reach("one-clear");
              record(t);
            };
            const runFrom = (v: number) => {
              if (locked) return;
              const t = chainFrom(v);
              setX(0);
              setTrail(t);
              setPressed(true);
              record(t);
            };
            const set = (v: number) => {
              if (locked) return;
              setX(v);
              setTrail([v]);
            };
            const flip = (bit: number) => set(x ^ (1 << bit));
            const showing = (v: number) => x === 0 && trail[0] === v && trail.length > 1;

            const cells = (v: number, mark: (i: number) => string) =>
              b8(v)
                .split("")
                .map((c, k) => (
                  <span key={k} className={`${s.bit} ${pressed ? mark(BITS - 1 - k) : ""}`}>
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
                  <Control disabled={locked || showing(POW)} onClick={() => runFrom(POW)}>
                    Run from {short(POW)}
                  </Control>
                  <Control disabled={locked || showing(255)} onClick={() => runFrom(255)}>
                    Run from 11111111
                  </Control>
                  <Control disabled={locked || (x === START && repeats === 0)} onClick={() => set(START)}>
                    Back to {short(START)}
                  </Control>
                </Row>
                <div className={s.grid} role="group" aria-label="Bits of x">
                  <span className={s.rowLab}>x</span>
                  {Array.from({ length: BITS }, (_, k) => BITS - 1 - k).map((bit) => (
                    <Control
                      key={`t${bit}`}
                      className={`${s.tog} ${(x >> bit) & 1 ? s.one : ""} ${pressed && bit === lowest ? s.low : ""}`}
                      disabled={locked}
                      onClick={() => flip(bit)}
                      aria-label={`Bit ${bit} of x is ${(x >> bit) & 1}. Tap to flip.`}
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
                </Row>
                {runs.length > 0 && (
                  <div className={s.trail} aria-label="Finished runs">
                    {runs.map((r) => (
                      <div key={r.start}>
                        {short(r.start)}: {r.chain.length - 1} repeat{r.chain.length === 2 ? "" : "s"}, 1 bits: {ones(r.start)}
                        {r.chain.length === 2 ? " (power of two)" : ""}
                      </div>
                    ))}
                  </div>
                )}
                <p className={s.trail}>Tap a bit of x to flip it.</p>
              </div>
            );
          }}
        </Milestones>
      )}
    </Lesson>
  );
}
