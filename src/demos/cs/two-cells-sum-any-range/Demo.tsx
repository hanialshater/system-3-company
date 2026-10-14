"use client";

// Prefix sums (brief cs.algorithms #81). Eight days of sales, 3 1 4 1 5 9 2 6. The learner builds the running-total
// row (each new total = the total to its left + the day above; "Next total" one at a time, "Build the rest" for the
// remainder), then picks a range with the from / to sliders: the range's day cells are outlined, the two running
// totals it needs are ringed, and one line reads "25 − 4 = 21 · reads 2" beside "adding: 5 numbers".
// "Day 3 + 1" changes one day; every running total from day 3 on keeps its old value and turns red (stale).
// Milestones: row-built (additions recorded, 7), question-range (days 3–7: 25, 4, 21 recorded), long-range
// (a range of 6+ days starting after day 1: its 2 reads recorded), edited (stale count recorded, 6).
// Recorded values stay on the stage as trace lines and dashed rings, so Reset cannot change what the reveal quotes.

import { useState } from "react";
import { Lesson } from "@/kit/Lesson";
import { Control, Row, Slider } from "@/kit/controls";
import { Milestones } from "@/kit/milestones";
import s from "./styles.module.css";

const SALES = [3, 1, 4, 1, 5, 9, 2, 6];
const N = SALES.length;
const Q_FROM = 3;
const Q_TO = 7;
const EDIT_DAY = 3;
const prefix = (v: number[]) => v.reduce<number[]>((acc, x, i) => [...acc, (i ? acc[i - 1] : 0) + x], []);

type QSeen = { hi: number; lo: number; sum: number; days: number[] };

export default function TwoCellsSumAnyRange({ slug }: { slug: string }) {
  const [vals, setVals] = useState<number[]>(SALES);
  const [built, setBuilt] = useState<number[]>([]); // running totals as built (may go stale)
  const [from, setFrom] = useState(1);
  const [to, setTo] = useState(6);
  const [adds, setAdds] = useState<number | null>(null);
  const [qSeen, setQSeen] = useState<QSeen | null>(null);
  const [longSeen, setLongSeen] = useState<{ from: number; to: number } | null>(null);
  const [staleSeen, setStaleSeen] = useState<number | null>(null);

  const truth = prefix(vals);
  const isBuilt = built.length === N;
  const stale = built.map((b, i) => b !== truth[i]);
  const staleCount = stale.filter(Boolean).length;
  const changed = vals.some((v, i) => v !== SALES[i]) || built.length > 0 || from !== 1 || to !== 6;

  return (
    <Lesson
      slug={slug}
      predict={{
        question: `Sales: ${SALES.join(" ")}. Running totals are built once. How many numbers must you read to total days ${Q_FROM}–${Q_TO}?`,
        options: [String(Q_TO - Q_FROM + 1), "2", String(Q_TO)],
        answer: 1,
      }}
      exploreHint="Build the running totals, then slide from and to. Finally change day 3."
      minInteractions={4}
      reveal={() => (
        <>
          <p>
            Building the running-total row took {adds ?? N - 1} additions, once. Then days {Q_FROM} to {Q_TO} needed just two
            cells: {qSeen?.hi} minus {qSeen?.lo} is {qSeen?.sum}, the same as {qSeen?.days.join(" + ")}.
          </p>
          <p>
            The total up to day {Q_TO} already holds days 1 and 2, so subtracting the total up to day {Q_FROM - 1} leaves the
            range. Any range costs at most one subtraction, however long. When you changed day {EDIT_DAY}, {staleSeen} of the {N} totals
            went stale: that is the price.
          </p>
        </>
      )}
    >
      {({ locked, interact }) => (
        <Milestones interact={interact} names={["row-built", "question-range", "long-range", "edited"]}>
          {(reach) => {
            const checkRange = (f: number, t: number, row: number[]) => {
              if (row.length !== N) return;
              const st = row.some((b, i) => b !== truth[i]);
              if (st) return;
              if (f === Q_FROM && t === Q_TO) {
                setQSeen({ hi: row[t - 1], lo: row[f - 2], sum: row[t - 1] - row[f - 2], days: vals.slice(f - 1, t) });
                reach("question-range");
              }
              if (t - f + 1 >= 6 && f > 1) {
                setLongSeen({ from: f, to: t });
                reach("long-range");
              }
            };
            const finish = (row: number[]) => {
              if (row.length === N && adds === null) {
                setAdds(N - 1);
                reach("row-built");
              }
            };
            const next = () => {
              if (locked || built.length >= N) return;
              const row = [...built, truth[built.length]];
              setBuilt(row);
              finish(row);
            };
            const rest = () => {
              if (locked) return;
              setBuilt(truth);
              finish(truth);
            };
            const setF = (v: number) => {
              if (locked) return;
              const t = Math.max(to, v);
              setFrom(v);
              setTo(t);
              checkRange(v, t, built);
            };
            const setT = (v: number) => {
              if (locked) return;
              const f = Math.min(from, v);
              setTo(v);
              setFrom(f);
              checkRange(f, v, built);
            };
            const edit = () => {
              if (locked) return;
              const nv = vals.map((v, i) => (i === EDIT_DAY - 1 ? v + 1 : v));
              setVals(nv);
              if (built.length === N) {
                const tr = prefix(nv);
                const c = built.filter((b, i) => b !== tr[i]).length;
                setStaleSeen(c);
                reach("edited");
              }
            };
            const reset = () => {
              if (locked) return;
              setVals(SALES);
              setBuilt([]);
              setFrom(1);
              setTo(6);
            };

            const showRange = !locked && isBuilt;
            const inRange = (i: number) => showRange && i + 1 >= from && i + 1 <= to;
            const hiIdx = to - 1;
            const loIdx = from - 2; // -1 when from = 1
            const traceQ = !locked && qSeen && !(from === Q_FROM && to === Q_TO);
            const last = built.length - 1;
            const readout = !showRange
              ? locked
                ? " "
                : `Build the running totals: ${built.length} of ${N}.`
              : loIdx < 0
                ? `Days 1–${to}: total ${built[hiIdx]} · reads 1 · adding: ${to} numbers`
                : `Days ${from}–${to}: ${built[hiIdx]} − ${built[loIdx]} = ${built[hiIdx] - built[loIdx]} · reads 2 · adding: ${to - from + 1} numbers${staleCount ? " (stale!)" : ""}`;
            const msg = locked
              ? "Make a prediction to start."
              : !isBuilt
                ? "Each new total = the total to its left + the day above."
                : staleCount
                  ? `Day ${EDIT_DAY} changed: ${staleCount} totals are now wrong (red).`
                  : "Slide from and to: which totals does a range need?";

            return (
              <div className={s.wrap}>
                <p className={s.msg} aria-live="polite">{msg}</p>
                <p className={s.cap}>Sales by day</p>
                <div className={s.cells}>
                  {vals.map((v, i) => (
                    <span
                      key={i}
                      className={`${s.cell} ${inRange(i) ? s.range : ""} ${!locked && i === last && built.length > 1 && !isBuilt ? s.flash : ""} ${v !== SALES[i] ? s.edited : ""}`}
                    >
                      <span className={s.day}>day {i + 1}</span>
                      {v}
                    </span>
                  ))}
                </div>
                <p className={s.cap}>
                  Running total{adds !== null && !locked ? ` · building it took ${adds} additions` : ""}
                </p>
                <div className={s.cells}>
                  {Array.from({ length: N }, (_, i) => {
                    const has = !locked && i < built.length;
                    const ring = showRange && (i === hiIdx || i === loIdx);
                    const ghost = traceQ && isBuilt && (i === Q_TO - 1 || i === Q_FROM - 2);
                    const flash = !locked && !isBuilt && built.length > 1 && i === last - 1;
                    return (
                      <span
                        key={i}
                        className={`${s.cell} ${s.total} ${ring ? s.ring : ""} ${ghost ? s.ghost : ""} ${has && stale[i] ? s.stale : ""} ${flash ? s.flash : ""}`}
                      >
                        <span className={s.day}>to {i + 1}</span>
                        {has ? built[i] : "·"}
                      </span>
                    );
                  })}
                </div>
                <p className={s.readout}>{readout}</p>
                <div className={s.trace}>
                  <span>{!locked && qSeen ? `Days ${Q_FROM}–${Q_TO}: ${qSeen.hi} − ${qSeen.lo} = ${qSeen.sum}` : " "}</span>
                  <span>
                    {!locked && longSeen ? `Days ${longSeen.from}–${longSeen.to}: also 2 reads.` : ""}
                    {!locked && staleSeen !== null ? ` Day ${EDIT_DAY} + 1: ${staleSeen} of ${N} stale.` : ""}
                  </span>
                </div>
                <Row>
                  <Control disabled={locked || built.length >= N} onClick={next}>
                    Next total
                  </Control>
                  <Control disabled={locked || (isBuilt && staleCount === 0)} onClick={rest}>
                    {isBuilt && staleCount ? "Rebuild totals" : "Build the rest"}
                  </Control>
                </Row>
                <Row>
                  <Slider label="from day" value={from} min={1} max={N} onChange={setF} disabled={locked || !isBuilt} />
                  <Slider label="to day" value={to} min={1} max={N} onChange={setT} disabled={locked || !isBuilt} />
                </Row>
                <Row>
                  <Control disabled={locked} onClick={edit}>
                    Day {EDIT_DAY} + 1
                  </Control>
                  <Control disabled={locked || !changed} onClick={reset}>
                    Reset
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
