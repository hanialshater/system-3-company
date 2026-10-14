"use client";

// Fold a list with XOR, one number at a time: running = running XOR next. Three bit lamps (4, 2, 1) show the running
// value. When a number's partner arrives, the lamps it switched on switch back off, so pairs vanish and only the
// single number is left: 7 3 5 4 5 3 4 -> 7. "New order" reshuffles with a seeded generator; the result stays 7.

import { useState } from "react";
import { Lesson } from "@/kit/Lesson";
import { Control, Readout, Row } from "@/kit/controls";
import { Milestones } from "@/kit/milestones";
import { mulberry32 } from "@/kit/random";
import s from "./styles.module.css";

const BASE = [7, 3, 5, 4, 5, 3, 4];
const N = BASE.length;
const BITS = [4, 2, 1];
const xorAll = (a: number[]) => a.reduce((x, y) => x ^ y, 0);
const RESULT = xorAll(BASE); // 7
const OTHER = [4, 1, 2, 1, 2];
const OTHER_RESULT = xorAll(OTHER); // 4
const bin = (v: number) => v.toString(2).padStart(3, "0");

// Seeded reshuffle (Fisher-Yates); seed k gives the k-th "new order". Never returns the same order it was given.
function shuffled(prev: number[], k: number): number[] {
  const rng = mulberry32(1000 + k);
  for (;;) {
    const a = [...BASE];
    for (let i = a.length - 1; i > 0; i--) {
      const j = Math.floor(rng() * (i + 1));
      [a[i], a[j]] = [a[j], a[i]];
    }
    if (a.join() !== prev.join()) return a;
  }
}

const CW = 36;
const GAP = 6;
const X0 = (320 - (N * CW + (N - 1) * GAP)) / 2;
const chipX = (i: number) => X0 + i * (CW + GAP);

function Stage({ locked, reach }: { locked: boolean; reach: (n: string) => void }) {
  const [order, setOrder] = useState(BASE);
  const [shuffles, setShuffles] = useState(0);
  const [t, setT] = useState(0); // numbers folded in

  const go = (m: number) => {
    if (locked) return;
    const next = Math.min(N, m);
    if (next > 0) reach("fold");
    if (next === N) reach("all");
    setT(next);
  };
  const reorder = () => {
    if (locked) return;
    const k = shuffles + 1;
    setShuffles(k);
    setOrder(shuffled(order, k));
    setT(0);
  };

  const folded = order.slice(0, t);
  const running = xorAll(folded);
  // A folded number is cancelled if it has been folded an even number of times so far.
  const count = (v: number) => folded.filter((x) => x === v).length;
  const cancelled = (i: number) => i < t && count(order[i]) % 2 === 0;
  const prev = xorAll(order.slice(0, Math.max(0, t - 1)));
  const last = t > 0 ? order[t - 1] : null;

  const msg = locked
    ? "Predict first, then fold the numbers in."
    : last === null
      ? "Running value starts at 0. Fold in one number at a time."
      : `${bin(prev)} XOR ${bin(last)} = ${bin(running)}, so ${prev} becomes ${running}.`;

  return (
    <div className={s.wrap}>
      <p className={s.msg} aria-live="polite">
        {msg}
      </p>
      <svg viewBox="0 0 320 196" className="stage-svg" role="img" aria-label={`Running XOR ${running} after ${t} of ${N} numbers`}>
        {order.map((v, i) => {
          const done = i < t;
          const gone = cancelled(i);
          const isLast = i === t - 1;
          return (
            <g key={`${shuffles}-${i}`}>
              <rect
                x={chipX(i)}
                y={8}
                width={CW}
                height={40}
                rx={7}
                fill={isLast ? "var(--domain)" : "var(--bg-2)"}
                fillOpacity={isLast ? 0.5 : 1}
                stroke={gone ? "var(--muted)" : done ? "var(--fg)" : "var(--line)"}
                strokeWidth={done && !gone ? 2 : 1}
                strokeDasharray={gone ? "4 3" : undefined}
                opacity={gone ? 0.45 : 1}
              />
              <text x={chipX(i) + CW / 2} y={34} textAnchor="middle" className={s.v} opacity={gone ? 0.45 : 1}>
                {v}
              </text>
              <text x={chipX(i) + CW / 2} y={62} textAnchor="middle" className={s.b}>
                {bin(v)}
              </text>
              {gone && <line x1={chipX(i) + 6} x2={chipX(i) + CW - 6} y1={28} y2={28} stroke="var(--muted)" strokeWidth={2} />}
            </g>
          );
        })}
        <text x={160} y={92} textAnchor="middle" className={s.lab}>
          running value
        </text>
        {BITS.map((b, k) => {
          const on = (running & b) !== 0;
          const x = 160 + (k - 1) * 62;
          return (
            <g key={b}>
              <circle cx={x} cy={128} r={22} fill={on ? "var(--good)" : "var(--bg-2)"} stroke={on ? "var(--good)" : "var(--line)"} strokeWidth={2} />
              <text x={x} y={134} textAnchor="middle" className={`${s.lamp} ${on ? s.lampOn : ""}`}>
                {on ? 1 : 0}
              </text>
              <text x={x} y={166} textAnchor="middle" className={s.lab}>
                {b}
              </text>
            </g>
          );
        })}
        <text x={160} y={190} textAnchor="middle" className={s.total}>
          = {running}
        </text>
      </svg>
      <Row>
        <Control className={`${s.tap} active`} disabled={locked || t >= N} onClick={() => go(t + 1)}>
          Fold next
        </Control>
        <Control className={s.tap} disabled={locked || t >= N} onClick={() => go(N)}>
          Fold the rest
        </Control>
        <Control className={s.tap} disabled={locked} onClick={reorder}>
          New order
        </Control>
        <Control className={s.tap} disabled={locked || t === 0} onClick={() => go(0)}>
          Start over
        </Control>
      </Row>
      <Row>
        <Readout label="Folded" value={`${t} of ${N}`} />
        <Readout label="Orders tried" value={shuffles + 1} />
      </Row>
    </div>
  );
}

export default function PairsCancelUnderXor({ slug }: { slug: string }) {
  return (
    <Lesson
      slug={slug}
      predict={{
        question: `In ${BASE.join(" ")}, every number but one appears twice. XOR all seven together. What do you get?`,
        options: ["0", String(RESULT), "28"],
        answer: 1,
      }}
      exploreHint="Fold the numbers in one at a time and watch the lamps."
      minInteractions={2}
      reveal={() => (
        <>
          <p>
            The lamps ended at <strong>{bin(RESULT)}</strong>, which is {RESULT}. Each time a number's partner arrived, the
            lamps it had switched on switched back off: a XOR a = 0, and a XOR 0 = a. Every pair cancelled, and only the
            lone {RESULT} was left.
          </p>
          <p>
            XOR also ignores order, so any order ends at {RESULT}: one pass, no sorting, no table of counts. On{" "}
            {OTHER.join(" ")} it gives {OTHER_RESULT}. It needs every other number to appear an even number of times: one
            that appears three times does not cancel, and spoils the answer.
          </p>
        </>
      )}
    >
      {({ locked, interact }) => (
        <Milestones interact={interact} names={["fold", "all"]}>
          {(reach) => <Stage locked={locked} reach={reach} />}
        </Milestones>
      )}
    </Lesson>
  );
}
