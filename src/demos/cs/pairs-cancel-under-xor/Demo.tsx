"use client";

// Fold a list with XOR, one number at a time: running = running XOR next. Three bit lamps (4, 2, 1) show the running
// value; a ring marks the lamps the last number flipped. Whatever lamps a number flips, its partner flips the same
// lamps back, so pairs vanish and only the single number is left: 5 3 3 4 7 5 4 -> 7.
// v3 (r6): the question no longer says "every number but one appears twice". "Fold to next twin" stops on the
// first partner (the second 3 right after the first: the lamps go 5 -> 6 -> 5), and is a milestone. "New order"
// deals a seeded reshuffle and folds it to the end; each fully folded order is kept in a history row, which
// "Start over" does not clear. The reveal quotes the twin and the history.

import { useState } from "react";
import { Lesson } from "@/kit/Lesson";
import { Control, Readout, Row } from "@/kit/controls";
import { Milestones } from "@/kit/milestones";
import { mulberry32 } from "@/kit/random";
import s from "./styles.module.css";

const BASE = [5, 3, 3, 4, 7, 5, 4];
const N = BASE.length;
const BITS = [4, 2, 1];
const xorAll = (a: number[]) => a.reduce((x, y) => x ^ y, 0);
const RESULT = xorAll(BASE); // 7
const bin = (v: number) => v.toString(2).padStart(3, "0");
const lampsOf = (v: number) => {
  const l = BITS.filter((b) => v & b).map(String);
  return l.length > 1 ? `${l.slice(0, -1).join(", ")} and ${l[l.length - 1]}` : l[0] ?? "none";
};

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
// Index after the next fold (from t) that brings in a number's second copy.
function nextTwin(order: number[], t: number): number | null {
  for (let i = t; i < order.length; i++) if (order.slice(0, i).includes(order[i])) return i + 1;
  return null;
}

const CW = 36;
const GAP = 6;
const X0 = (320 - (N * CW + (N - 1) * GAP)) / 2;
const chipX = (i: number) => X0 + i * (CW + GAP);

export type Twin = { v: number; before: number; after: number };
export type Done = { order: number[]; result: number };

function Stage({
  locked,
  reach,
  onTwin,
  twin,
  history,
  onDone,
}: {
  locked: boolean;
  reach: (n: string) => void;
  onTwin: (t: Twin) => void;
  twin: Twin | null;
  history: Done[];
  onDone: (d: Done) => void;
}) {
  const [order, setOrder] = useState(BASE);
  const [shuffles, setShuffles] = useState(0);
  const [t, setT] = useState(0); // numbers folded in

  // Each fully folded order counts once: the first is "all", a second different one is "second-order".
  const finish = (o: number[]) => {
    const known = history.map((h) => h.order.join());
    onDone({ order: o, result: xorAll(o) });
    if (known.includes(o.join())) return;
    reach("all");
    if (known.length + 1 >= 2) reach("second-order");
  };
  // stepped: the learner asked for this fold on its own (Fold next, or Fold to next twin), not Fold the rest.
  const go = (m: number, stepped: boolean) => {
    if (locked) return;
    const next = Math.min(N, m);
    setT(next);
    if (next > t && (stepped || next - t === 1)) {
      const v = order[next - 1];
      if (order.slice(0, next - 1).includes(v)) {
        onTwin({ v, before: xorAll(order.slice(0, next - 1)), after: xorAll(order.slice(0, next)) });
        reach("twin");
      }
    }
    if (next === N && t < N) finish(order);
  };
  const toTwin = () => {
    const m = nextTwin(order, t);
    if (m !== null) go(m, true);
  };
  const reorder = () => {
    if (locked) return;
    const k = shuffles + 1;
    const o = shuffled(order, k);
    setShuffles(k);
    setOrder(o);
    setT(N);
    finish(o);
  };

  const folded = order.slice(0, t);
  const running = xorAll(folded);
  // A folded number is cancelled if it has been folded an even number of times so far.
  const count = (v: number) => folded.filter((x) => x === v).length;
  const cancelled = (i: number) => i < t && count(order[i]) % 2 === 0;
  const prev = xorAll(order.slice(0, Math.max(0, t - 1)));
  const last = t > 0 ? order[t - 1] : null;
  const isTwin = last !== null && order.slice(0, t - 1).includes(last);

  const msg = locked
    ? "Predict first, then fold the numbers in."
    : last === null
      ? "Running value starts at 0. Fold in one number at a time."
      : isTwin
        ? `${bin(prev)} XOR ${bin(last)} = ${bin(running)}: the second ${last} flips lamps ${lampsOf(last)} back, as the first did.`
        : `${bin(prev)} XOR ${bin(last)} = ${bin(running)}, so ${prev} becomes ${running}.`;

  const nt = nextTwin(order, t);
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
          const flipped = !locked && last !== null && (last & b) !== 0;
          const x = 160 + (k - 1) * 62;
          return (
            <g key={b}>
              {flipped && <circle cx={x} cy={128} r={27} fill="none" stroke="var(--domain)" strokeWidth={2} strokeDasharray="4 3" />}
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
        <Control className={`${s.tap} active`} disabled={locked || t >= N} onClick={() => go(t + 1, true)}>
          Fold next
        </Control>
        <Control className={s.tap} disabled={locked || nt === null} onClick={toTwin}>
          Fold to next twin
        </Control>
        <Control className={s.tap} disabled={locked || t >= N} onClick={() => go(N, false)}>
          Fold the rest
        </Control>
        <Control className={s.tap} disabled={locked} onClick={reorder}>
          New order
        </Control>
        <Control className={s.tap} disabled={locked || t === 0} onClick={() => go(0, false)}>
          Start over
        </Control>
      </Row>
      <Row>
        <Readout label="Folded" value={`${t} of ${N}`} />
      </Row>
      <p className={s.hist}>
        {locked || !twin ? "" : `First twin: the second ${twin.v} flipped lamps ${lampsOf(twin.v)} back, ${twin.before} → ${twin.after}.`}
      </p>
      <p className={s.hist}>
        {locked || history.length === 0 ? "" : `Ended at: ${history.map((h) => `${h.result} (${h.order.join(" ")})`).join(", ")}`}
      </p>
    </div>
  );
}

export default function PairsCancelUnderXor({ slug }: { slug: string }) {
  const [twin, setTwin] = useState<Twin | null>(null);
  const [history, setHistory] = useState<Done[]>([]);
  const onDone = (d: Done) =>
    setHistory((h) => (h.some((x) => x.order.join() === d.order.join()) ? h : [...h, d].slice(0, 3)));
  const first = history[0];
  const other = history[1];
  return (
    <Lesson
      slug={slug}
      predict={{
        question: `Fold ${BASE.join(" ")} with XOR, left to right, starting from 0. What is the final value?`,
        options: ["0", String(RESULT), "31"],
        answer: 1,
      }}
      exploreHint="Fold to the first twin and watch which lamps it flips. Then finish, and try a new order."
      minInteractions={3}
      reveal={() => (
        <>
          <p>
            Your lamps ended at <strong>{bin(first?.result ?? RESULT)}</strong>, which is {first?.result ?? RESULT}.
            {twin
              ? ` When the second ${twin.v} came in, it flipped lamps ${lampsOf(twin.v)} back, the same lamps its twin flipped, and ${twin.before} went to ${twin.after}.`
              : ""}{" "}
            a XOR a = 0, and a XOR 0 = a: every pair cancelled, and only the lone {RESULT} was left.
          </p>
          <p>
            {other ? `Your other order, ${other.order.join(" ")}, ended at ${other.result} too: ` : ""}XOR ignores order,
            so one pass finds the lone number, with no sorting and no table of counts. It needs every other number to
            appear an even number of times: one that appears three times does not cancel.
          </p>
        </>
      )}
    >
      {({ locked, interact }) => (
        <Milestones interact={interact} names={["twin", "all", "second-order"]}>
          {(reach) => <Stage locked={locked} reach={reach} onTwin={(x) => setTwin((p) => p ?? x)} twin={twin} history={history} onDone={onDone} />}
        </Milestones>
      )}
    </Lesson>
  );
}
