"use client";

// JavaScript numbers are doubles: 53 bits of precision. Every whole number up to 2^53 fits,
// but past 2^53 only every second one exists, so 2^53 + 1 is rounded back to 2^53. The learner
// counts up with real JavaScript arithmetic on a number line where dots mark the whole numbers
// a JavaScript number can hold. One picture: the number line with the tape of sums under it.

import { useState } from "react";
import { Lesson } from "@/kit/Lesson";
import { Control, Row } from "@/kit/controls";
import { Milestones } from "@/kit/milestones";
import s from "./styles.module.css";

const P = 2 ** 53; // 9007199254740992
const START = P - 2;
// the number line uses exact BigInt whole numbers (a double cannot even name 2^53 + 1)
const LO = BigInt(P) - 3n;
const HI = BigInt(P) + 6n;
const TICKS = Array.from({ length: Number(HI - LO) + 1 }, (_, i) => LO + BigInt(i));
// a whole number is representable if it survives a round trip through a double
const exact = (n: bigint) => BigInt(Number(n)) === n;
const big = (n: number) => String(n);
const tail = (n: number) => `…${String(n).slice(-3)}`;

type Step = { from: number; add: number; to: number; times: number };

const W = 320;
const X0 = 16;
const X1 = W - 16;
const xOf = (n: number | bigint) => X0 + (Number(BigInt(n) - LO) / Number(HI - LO)) * (X1 - X0);

export default function BigNumberSwallowsOne({ slug }: { slug: string }) {
  const [v, setV] = useState(START);
  const [tape, setTape] = useState<Step[]>([]);

  return (
    <Lesson
      slug={slug}
      predict={{
        question: `Your JavaScript program keeps a counter in an ordinary Number, which stores each value in a fixed amount of space. It holds ${big(P)}, which is 2^53 (53 twos multiplied together). You add 1. What comes out?`,
        options: [String(BigInt(P) + 1n), big(P + 1), "An error"],
        answer: 1,
      }}
      exploreHint="Count up past the edge, one at a time. Then try + 2."
      minInteractions={2}
      reveal={() => {
        const stuck = tape.find((t) => t.add === 1 && t.from === P && t.to === P);
        const two = tape.find((t) => t.add === 2 && t.from >= P);
        return (
          <>
            <p>
              {stuck ? `You saw ${big(P)} + 1 come out as ${big(P)}${stuck.times > 1 ? `, ${stuck.times} times in a row` : ""}. ` : ""}
              {two ? `Then + 2 moved it to ${big(two.to)}. ` : ""}
              No error and no warning: the 1 was simply rounded away.
            </p>
            <p>
              A JavaScript number has room for only 53 binary digits (bits) of detail. Every whole number up to 2^53 ={" "}
              {big(P)} fits exactly, but just beyond it only every second whole number can be stored: those are the filled
              dots; the red dashed marks cannot be. Adding 1 lands halfway between two storable numbers and is rounded to
              one of them, so the 1 can vanish. For exact big whole numbers, programmers use BigInt.
            </p>
          </>
        );
      }}
    >
      {({ locked, interact }) => (
        <Milestones interact={interact} names={["stuck", "plus-two"]}>
          {(reach) => {
            const add = (d: number, times = 1) => {
              if (locked) return;
              let x = v;
              const steps: Step[] = [];
              for (let k = 0; k < times; k++) {
                const y = x + d; // real double arithmetic
                const last = steps[steps.length - 1];
                if (last && last.from === x && last.to === y) last.times++;
                else steps.push({ from: x, add: d, to: y, times: 1 });
                if (d === 1 && x >= P && y === x) reach("stuck");
                if (d === 2 && x >= P && y !== x) reach("plus-two");
                x = y;
              }
              setV(x);
              setTape((t) => [...t, ...steps].slice(-4));
            };
            const back = () => {
              if (locked) return;
              setV(START);
              setTape([]);
            };

            return (
              <div className={s.wrap}>
                <div className={s.value} aria-live="polite">
                  {big(v).slice(0, -3)}
                  <b>{big(v).slice(-3)}</b>
                </div>
                <svg viewBox={`0 0 ${W} 74`} className="stage-svg" role="img" aria-label={`Number line around 2^53, value ${big(v)}`}>
                  <line x1={X0} x2={X1} y1={30} y2={30} stroke="var(--line)" strokeWidth={2} />
                  {TICKS.map((n) => {
                    const x = xOf(n);
                    const ok = exact(n);
                    return (
                      <g key={String(n)}>
                        <line x1={x} x2={x} y1={24} y2={36} stroke="var(--muted)" strokeWidth={1} />
                        {!locked && ok && <circle cx={x} cy={30} r={4.5} fill="var(--domain)" />}
                        {!locked && !ok && <circle cx={x} cy={30} r={4} fill="none" stroke="var(--bad)" strokeDasharray="2 2" />}
                        <text x={x} y={52} textAnchor="middle" className={`${s.tick} ${n === BigInt(P) ? s.edge : ""}`}>
                          {String(n).slice(-3)}
                        </text>
                      </g>
                    );
                  })}
                  <text x={xOf(P)} y={68} textAnchor="middle" className={s.edge}>
                    2^53
                  </text>
                  <path d={`M${xOf(v)} 20l-6 -10h12z`} fill="var(--fg)" />
                </svg>
                <p className={s.key}>{locked ? "Last 3 digits of each number shown." : "● the program can store it · ○ it can't"}</p>
                <div className={s.tape}>
                  {tape.map((t, i) => (
                    <div key={i} className={t.to === t.from ? s.same : ""}>
                      {tail(t.from)} + {t.add} = {tail(t.to)}
                      {t.times > 1 ? ` (×${t.times})` : ""}
                    </div>
                  ))}
                </div>
                <Row>
                  <Control disabled={locked || (v === START && tape.length === 0)} onClick={back}>
                    Back to {tail(START)}
                  </Control>
                  <Control className="active" disabled={locked} onClick={() => add(1)}>
                    + 1
                  </Control>
                  <Control disabled={locked} onClick={() => add(1, 5)}>
                    + 1, five times
                  </Control>
                  <Control disabled={locked} onClick={() => add(2)}>
                    + 2
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
