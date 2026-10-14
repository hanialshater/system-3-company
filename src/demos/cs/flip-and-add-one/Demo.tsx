"use client";

// In 8-bit two's complement, -5 is "flip every bit of 5, then add 1": 00000101 -> 11111010 ->
// 11111011, which reads -128 + 123 = -5. Adding 5 to it gives 1 00000000: the carry falls off
// the end and leaves 0. One representation: rows of 8 bits under their place values.

import { useState } from "react";
import { Lesson } from "@/kit/Lesson";
import { Control, Row } from "@/kit/controls";
import { Milestones } from "@/kit/milestones";
import s from "./styles.module.css";

const BITS = 8;
const SIZE = 2 ** BITS;
const N = 5;
const WEIGHTS = Array.from({ length: BITS }, (_, i) => (i === 0 ? -(2 ** (BITS - 1)) : 2 ** (BITS - 1 - i)));
const bitsOf = (raw: number) => raw.toString(2).padStart(BITS, "0");
const signed = (raw: number) => (raw >= SIZE / 2 ? raw - SIZE : raw);
const flip = (raw: number) => ~raw & (SIZE - 1);
const NEG = (flip(N) + 1) & (SIZE - 1); // 251 = 11111011
const SIGN_MAG = (SIZE / 2) | N; // 10000101, the "minus-sign bit" guess
const SUB = 9;
const fmt = (v: number) => (v < 0 ? `−${-v}` : String(v));

export default function FlipAndAddOne({ slug }: { slug: string }) {
  const [raw, setRaw] = useState(N);
  const [sum, setSum] = useState<number | null>(null); // addend + raw before dropping the carry
  const [addend, setAddend] = useState(N); // the number added to the bits row: 5 or 9
  const [didSub, setDidSub] = useState(false); // added 9 to the pattern for -5
  const [log, setLog] = useState<string[]>([]);

  const shownSum = sum === null ? null : addend + raw; // stays live while bits change

  return (
    <Lesson
      slug={slug}
      predict={{
        question: `A bit is one binary digit, 0 or 1. In 8 bits, ${N} is ${bitsOf(N)}. Flip every bit (0 becomes 1, 1 becomes 0), then add 1 in binary. What do you get?`,
        options: [bitsOf(flip(N)), bitsOf(NEG), bitsOf(SIGN_MAG)],
        answer: 1,
      }}
      exploreHint={`Flip all, add 1, read the value. Then add ${N} to it.`}
      minInteractions={2}
      reveal={() => (
        <>
          <p>
            {log.length ? `You went ${log.slice(0, 4).join(", ")}. ` : ""}
            Flipping {bitsOf(N)} gives {bitsOf(flip(N))} ({fmt(signed(flip(N)))}); adding 1 gives {bitsOf(NEG)}, which reads −128
            + {NEG - SIZE / 2} = <strong>{fmt(signed(NEG))}</strong>. Adding {N} to it gives 1 {bitsOf(0)}: the carry falls off the
            end of 8 bits and leaves 0.
          </p>
          <p>
            So flip-and-add-1 makes exactly the pattern that cancels the number.{didSub ? ` You added ${SUB} to it and got ${SUB - N}: that is ${SUB} − ${N}, done by adding.` : ""} That is why a machine can subtract by
            adding: a − b is a + (flip b, add 1), with the same adder. A minus-sign bit would not work: {bitsOf(SIGN_MAG)} reads{" "}
            {fmt(signed(SIGN_MAG))} here, and adding it to {N} does not give 0.
          </p>
        </>
      )}
    >
      {({ locked, interact }) => (
        <Milestones interact={interact} names={["negated", "cancelled"]}>
          {(reach) => {
            const set = (next: number, label: string) => {
              setRaw(next);
              setLog((l) => [...l, label]);
              if (next === NEG) reach("negated");
            };
            const flipAll = () => {
              if (locked) return;
              const next = flip(raw);
              set(next, `flip → ${bitsOf(next)}`);
            };
            const addOne = () => {
              if (locked) return;
              const next = (raw + 1) & (SIZE - 1);
              set(next, `+1 → ${bitsOf(next)}`);
            };
            const addN = (a: number) => {
              if (locked) return;
              setAddend(a);
              setSum(a + raw);
              setLog((l) => [...l, `${a} + ${bitsOf(raw)} → ${bitsOf((a + raw) & (SIZE - 1))}`]);
              if (raw === NEG && a === N) reach("cancelled");
              if (raw === NEG && a === SUB) setDidSub(true);
            };
            const toggle = (i: number) => {
              if (locked) return;
              setRaw(raw ^ (1 << (BITS - 1 - i)));
            };
            const back = () => {
              if (locked) return;
              setRaw(N);
              setSum(null);
              setAddend(N);
            };

            const pattern = bitsOf(raw);
            const total = shownSum ?? 0;
            const carry = total >= SIZE;

            return (
              <div className={s.wrap}>
                <Row>
                  <Control disabled={locked || (raw === N && sum === null)} onClick={back}>
                    Back to {N}
                  </Control>
                  <Control className="active" disabled={locked} onClick={flipAll}>
                    Flip all
                  </Control>
                  <Control disabled={locked} onClick={addOne}>
                    + 1
                  </Control>
                  <Control disabled={locked} onClick={() => addN(N)}>
                    Add {N} to it
                  </Control>
                  <Control disabled={locked} onClick={() => addN(SUB)}>
                    Add {SUB} to it
                  </Control>
                </Row>
                <div className={s.grid}>
                  <span className={s.lab} />
                  {WEIGHTS.map((w, i) => (
                    <span key={i} className={`${s.w} ${i === 0 ? s.top : ""}`}>
                      {w}
                    </span>
                  ))}
                  <span className={s.val} />

                  <span className={s.lab}>{addend}</span>
                  {[...bitsOf(addend)].map((b, i) => (
                    <span key={i} className={s.fixed}>
                      {b}
                    </span>
                  ))}
                  <span className={s.val}>= {addend}</span>

                  <span className={s.lab}>bits</span>
                  {[...pattern].map((b, i) => (
                    <Control
                      key={i}
                      className={`${s.bit} ${b === "1" ? s.on : ""}`}
                      disabled={locked}
                      aria-label={`Bit worth ${WEIGHTS[i]}`}
                      onClick={() => toggle(i)}
                    >
                      {b}
                    </Control>
                  ))}
                  <span className={`${s.val} ${raw === NEG ? s.good : ""}`}>= {fmt(signed(raw))}</span>

                  {shownSum !== null && (
                    <>
                      <span className={s.lab}>sum</span>
                      {[...bitsOf(total & (SIZE - 1))].map((b, i) => (
                        <span key={i} className={s.fixed}>
                          {b}
                        </span>
                      ))}
                      <span className={`${s.val} ${(total & (SIZE - 1)) === 0 ? s.good : ""}`}>
                        = {fmt(signed(total & (SIZE - 1)))}
                      </span>
                    </>
                  )}
                </div>
                <p className={s.carry}>
                  {raw >= SIZE / 2 ? `${pattern} = −128 + ${raw - SIZE / 2} = ${fmt(signed(raw))}` : "Left bit is worth −128; add the bits that are 1. Tap a bit to try your own."}
                </p>
                {shownSum !== null && (
                  <p className={s.carry}>{carry ? "Carry 1 falls off the 8th bit" : "No carry out"}</p>
                )}
              </div>
            );
          }}
        </Milestones>
      )}
    </Lesson>
  );
}
