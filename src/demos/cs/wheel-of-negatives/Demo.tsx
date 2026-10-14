"use client";

// Eight bits are a wheel of 256 positions, not a ruler. In two's complement the top bit is
// worth -128, so the second half of the wheel is the negatives: 01111111 + 1 = 10000000 = -128,
// and 11111111 + 1 wraps to 0. The learner turns the wheel by +1, -1 or half a turn and reads
// the pointer, the value and the 8 bits together. One representation: the wheel with its bits.

import { useState } from "react";
import { Lesson } from "@/kit/Lesson";
import { Control, Row } from "@/kit/controls";
import { Milestones } from "@/kit/milestones";
import s from "./styles.module.css";

const BITS = 8;
const SIZE = 2 ** BITS; // 256 positions
const HALF = SIZE / 2; // 128
const START = HALF - 1; // 127
const WEIGHTS = Array.from({ length: BITS }, (_, i) => (i === 0 ? -(2 ** (BITS - 1)) : 2 ** (BITS - 1 - i)));

/** Signed value of an 8-bit pattern (0..255) in two's complement. */
const signed = (raw: number) => (raw >= HALF ? raw - SIZE : raw);
const bitsOf = (raw: number) => raw.toString(2).padStart(BITS, "0");

const CX = 160;
const CY = 116;
const R = 84;
const at = (raw: number, r = R) => {
  const a = -Math.PI / 2 + (2 * Math.PI * raw) / SIZE;
  return [CX + r * Math.cos(a), CY + r * Math.sin(a)] as const;
};
const arc = (from: number, to: number, r: number) => {
  const [x1, y1] = at(from, r);
  const [x2, y2] = at(to, r);
  return `M${x1} ${y1} A${r} ${r} 0 0 1 ${x2} ${y2}`;
};

export default function WheelOfNegatives({ slug }: { slug: string }) {
  const [raw, setRaw] = useState(START);
  const [log, setLog] = useState<string[]>([]); // wraps the learner saw, e.g. "127 + 1 = -128"

  const v = signed(raw);
  const answer = signed(START + 1);

  return (
    <Lesson
      slug={slug}
      predict={{
        question: `Eight on/off switches (bits) store a whole number, negatives included. They show ${bitsOf(START)}, which is ${START}. Add 1. What number do they show?`,
        options: [String(START + 1), String(answer), "0"],
        answer: 1,
      }}
      exploreHint="Add 1 and watch the pointer cross. Then go round to 0."
      minInteractions={2}
      reveal={() => (
        <>
          <p>
            {log.length ? `You saw ${log.slice(0, 3).join(", ")}. ` : ""}
            {bitsOf(START)} + 1 is {bitsOf(START + 1)}. In two&apos;s complement, the usual way to store negatives, the top
            switch is worth −128, not 128, so the value is <strong>{answer}</strong>. Eight bits only go from −128 to 127.
          </p>
          <p>
            The 256 patterns sit on a circle: 0 to 127, then the negatives −128 up to −1 ({bitsOf(SIZE - 1)} is −128 + 127).
            Adding 1 steps one notch round, so past the top you wrap to the most negative number, and −1 + 1 wraps to 0.
            That wrap is overflow: a counter that grows too big comes out negative.
          </p>
        </>
      )}
    >
      {({ locked, interact }) => (
        <Milestones interact={interact} names={["over-top", "past-zero"]}>
          {(reach) => {
            const turn = (d: number, label: string) => {
              if (locked) return;
              const next = (((raw + d) % SIZE) + SIZE) % SIZE;
              setRaw(next);
              // which boundary did the step cross?
              const a = raw;
              const crossedTop = d > 0 ? a < HALF && a + d >= HALF : a >= HALF && a + d < HALF;
              const crossedZero = d > 0 ? a + d >= SIZE : a + d < 0;
              if (crossedTop || crossedZero) {
                setLog((x) => [...x, `${signed(a)} ${label} = ${signed(next)}`]);
                reach(crossedTop ? "over-top" : "past-zero");
              }
            };
            const back = () => {
              if (locked) return;
              setRaw(START);
            };

            const [px, py] = at(raw, R - 4);
            const pattern = bitsOf(raw);

            return (
              <div className={s.wrap}>
                <svg viewBox="0 0 320 240" className="stage-svg" role="img" aria-label={`Pattern ${pattern} is ${locked ? START : v}`}>
                  <path d={arc(0, HALF - 0.5, R)} stroke={locked ? "var(--line)" : "var(--domain)"} strokeWidth={12} fill="none" />
                  <path d={arc(HALF + 0.5, SIZE - 0.5, R)} stroke={locked ? "var(--line)" : "var(--bad)"} strokeWidth={12} fill="none" opacity={0.8} />
                  {[0, 64, HALF - 1, HALF, 192].map((t) => {
                    const [x, y] = at(t + (t === HALF - 1 ? -9 : t === HALF ? 9 : 0), R + 20);
                    if (locked && t >= HALF) return null;
                    return (
                      <text key={t} x={x} y={y + 4} textAnchor="middle" className={s.tick}>
                        {signed(t)}
                      </text>
                    );
                  })}
                  <line x1={CX} y1={CY} x2={px} y2={py} stroke="var(--fg)" strokeWidth={3} strokeLinecap="round" />
                  <circle cx={px} cy={py} r={7} fill="var(--fg)" />
                  <circle cx={CX} cy={CY} r={36} fill="var(--bg-2)" stroke="var(--line)" />
                  <text x={CX} y={CY + 9} textAnchor="middle" className={s.val}>
                    {v}
                  </text>
                </svg>

                <div className={s.bits} aria-label={`Bits ${pattern}`}>
                  {[...pattern].map((b, i) => (
                    <div key={i} className={`${s.cell} ${b === "1" ? s.on : ""}`}>
                      <b>{b}</b>
                      <span className={i === 0 ? s.top : ""}>{i === 0 && locked ? "?" : WEIGHTS[i]}</span>
                    </div>
                  ))}
                </div>

                <Row>
                  <Control className="active" disabled={locked} onClick={() => turn(1, "+ 1")}>
                    + 1
                  </Control>
                  <Control disabled={locked} onClick={() => turn(HALF, `+ ${HALF}`)}>
                    Half turn (+{HALF})
                  </Control>
                  <Control disabled={locked} onClick={() => turn(-1, "− 1")}>
                    − 1
                  </Control>
                  <Control disabled={locked || raw === START} onClick={back}>
                    Back to {START}
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
