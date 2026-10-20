"use client";

// Running median with two heaps: a max-heap holds the lower half, a min-heap the upper half, and
// they are kept equal in size (the lower half may hold one extra). The median is the lower top,
// or the mean of both tops. Stream 5, 15, 1, 3 gives medians 5, 10, 5, 4.
// One representation: the two little heap trees side by side with the median between them.
// v2 (r6): the question asks how many stored numbers must cross when 3 arrives (the method), not the medians
// (which sorting in your head answers). A log row records every arrival (side, what moved, median) and keeps the
// last full run after Start over; the reveal quotes that record. "Next number" no longer relabels itself.

import { useState } from "react";
import { Lesson } from "@/kit/Lesson";
import { Control, Readout, Row } from "@/kit/controls";
import { Milestones } from "@/kit/milestones";
import s from "./styles.module.css";

const STREAM = [5, 15, 1, 3];

// array heaps; better(a, b) is true when a belongs above b
type Better = (a: number, b: number) => boolean;
const maxFirst: Better = (a, b) => a > b;
const minFirst: Better = (a, b) => a < b;
function push(h: number[], x: number, better: Better) {
  const a = [...h, x];
  let i = a.length - 1;
  while (i > 0) {
    const p = Math.floor((i - 1) / 2);
    if (!better(a[i], a[p])) break;
    [a[i], a[p]] = [a[p], a[i]];
    i = p;
  }
  return a;
}
function pop(h: number[], better: Better) {
  const a = [...h];
  const top = a[0];
  const last = a.pop()!;
  if (a.length) {
    a[0] = last;
    let i = 0;
    for (;;) {
      const l = 2 * i + 1;
      const r = l + 1;
      let m = i;
      if (l < a.length && better(a[l], a[m])) m = l;
      if (r < a.length && better(a[r], a[m])) m = r;
      if (m === i) break;
      [a[i], a[m]] = [a[m], a[i]];
      i = m;
    }
  }
  return { top, rest: a };
}

type Entry = { x: number; side: "lower" | "upper"; moved: number | null; median: number };
type State = { lo: number[]; hi: number[]; medians: number[]; note: string; log: Entry[] };
const START: State = { lo: [], hi: [], medians: [], note: "Two halves of the stream. The median sits at their tops.", log: [] };

function feed(st: State, x: number): State {
  let { lo, hi } = st;
  let note: string;
  let moved: number | null = null;
  const side: Entry["side"] = !lo.length || x <= lo[0] ? "lower" : "upper";
  if (side === "lower") {
    lo = push(lo, x, maxFirst);
    note = lo.length === 1 ? `${x} starts the lower half.` : `${x} ≤ ${st.lo[0]}: into the lower half.`;
  } else {
    hi = push(hi, x, minFirst);
    note = `${x} > ${lo[0]}: into the upper half.`;
  }
  if (lo.length > hi.length + 1) {
    const r = pop(lo, maxFirst);
    lo = r.rest;
    hi = push(hi, r.top, minFirst);
    note += ` Lower is too big: ${r.top} moves up.`;
    moved = r.top;
  } else if (hi.length > lo.length) {
    const r = pop(hi, minFirst);
    hi = r.rest;
    lo = push(lo, r.top, maxFirst);
    note += ` Upper is too big: ${r.top} moves down.`;
    moved = r.top;
  }
  const median = lo.length > hi.length ? lo[0] : (lo[0] + hi[0]) / 2;
  return { lo, hi, medians: [...st.medians, median], note, log: [...st.log, { x, side, moved, median }] };
}
const FINAL = STREAM.reduce(feed, START);
const LAST = STREAM[STREAM.length - 1]; // 3, the question's case
const crossings = (e: Entry) => (e.moved === null ? 0 : 1);
const AFTER3 = STREAM.slice(0, -1).reduce(feed, START); // 1 5 | 15
const sorted = (xs: number[]) => [...xs].sort((a, b) => a - b).join(" ");
const fmt = (xs: number[]) => xs.join(", ");
const MILLION_LEVELS = Math.floor(Math.log2(500_000)) + 1; // each heap holds half a million: 19 levels

// tree slots for up to 3 nodes, relative to the heap's centre x
const SLOT = [
  [0, 64],
  [-34, 122],
  [34, 122],
];

function Heap({ cx, items, label }: { cx: number; items: number[]; label: string }) {
  return (
    <g>
      <text x={cx} y={18} textAnchor="middle" className={s.label}>
        {label}
      </text>
      {items.length === 0 ? (
        <text x={cx} y={70} textAnchor="middle" className={s.empty}>
          empty
        </text>
      ) : null}
      {items.map((_, i) =>
        i === 0 ? null : (
          <line
            key={`e${i}`}
            x1={cx + SLOT[0][0]}
            y1={SLOT[0][1]}
            x2={cx + SLOT[i][0]}
            y2={SLOT[i][1]}
            stroke="var(--line)"
            strokeWidth={1.5}
          />
        ),
      )}
      {items.map((v, i) => (
        <g key={`n${i}`}>
          <circle
            cx={cx + SLOT[i][0]}
            cy={SLOT[i][1]}
            r={19}
            fill={i === 0 ? "var(--domain)" : "var(--bg-2)"}
            stroke={i === 0 ? "var(--domain)" : "var(--fg)"}
            strokeWidth={1.5}
          />
          <text x={cx + SLOT[i][0]} y={SLOT[i][1] + 6} textAnchor="middle" className={`${s.v} ${i === 0 ? s.vTop : ""}`}>
            {v}
          </text>
        </g>
      ))}
    </g>
  );
}

export default function RunningMedianTwoHeaps({ slug }: { slug: string }) {
  const [st, setSt] = useState<State>(START);
  const [lastRun, setLastRun] = useState<Entry[] | null>(null); // the last full run, kept after Start over
  const shown = st.log.length === STREAM.length || !lastRun ? st.log : lastRun;
  const qEntry = (lastRun ?? (st.log.length === STREAM.length ? st.log : null))?.[STREAM.length - 1] ?? null;
  const fed = st.medians.length;
  const done = fed === STREAM.length;
  const median = fed ? st.medians[fed - 1] : null;

  return (
    <Lesson
      slug={slug}
      predict={{
        question: `Lower half: biggest on top. Upper half: smallest on top. Sizes kept equal (lower may hold one extra). After ${fmt(STREAM.slice(0, -1))} the halves are ${sorted(AFTER3.lo)} | ${sorted(AFTER3.hi)}. When ${LAST} arrives, how many stored numbers must cross to the other half?`,
        options: ["0", "1", "2", "3"],
        answer: crossings(FINAL.log[STREAM.length - 1]),
      }}
      exploreHint="Feed the numbers in one at a time and read the median off the two tops."
      minInteractions={2}
      reveal={() => {
        const run = lastRun ?? st.log;
        const q = qEntry ?? FINAL.log[STREAM.length - 1];
        const quiet = run.filter((e) => e.moved === null).length;
        return (
        <>
          <p>
            When {q.x} arrived it went into the {q.side} half.{" "}
            {q.moved === null ? (
              <>The sizes stayed balanced, so nothing crossed: 0 moves.</>
            ) : (
              <>
                That half was then too big, so one number, <strong>{q.moved}</strong>, crossed: 1 move.
              </>
            )}{" "}
            The other{" "}
            {quiet} arrivals moved nothing across. Your medians, {fmt(run.map((e) => e.median))}, were read off the tops;
            nothing was ever re-sorted.
          </p>
          <p>
            Keep the smaller half in a heap with its biggest on top and the larger half in a heap with its smallest on top, with sizes differing by at most one. The median is one top or the mean of both. Each new number costs one heap insert and at most one
            move, about log n steps: around {MILLION_LEVELS} levels for a million numbers.
          </p>
        </>
        );
      }}
    >
      {({ locked, interact }) => (
        <Milestones interact={interact} names={["first-number", "all-fed"]}>
          {(reach) => {
            const goTo = (n: number) => {
              const next = STREAM.slice(0, n).reduce(feed, START);
              setSt(next);
              reach("first-number");
              if (n === STREAM.length) {
                setLastRun(next.log);
                reach("all-fed");
              }
            };
            const next = () => {
              if (locked || done) return;
              goTo(fed + 1);
            };
            const rest = () => {
              if (locked || done) return;
              goTo(STREAM.length);
            };
            const restart = () => {
              if (locked || fed === 0) return;
              setSt(START);
            };

            return (
              <div className={s.wrap}>
                <p className={s.note}>{st.note}</p>
                <div className={s.stream} aria-label="stream">
                  {STREAM.map((x, i) => (
                    <span key={i} className={`${s.chip} ${i < fed ? s.chipFed : ""} ${i === fed ? s.chipNext : ""}`}>
                      {x}
                    </span>
                  ))}
                </div>
                <svg viewBox="0 0 320 150" className="stage-svg" role="img" aria-label={`Median ${median ?? "none yet"}`}>
                  <Heap cx={72} items={st.lo} label="Lower · biggest on top" />
                  <Heap cx={248} items={st.hi} label="Upper · smallest on top" />
                  <text x={160} y={58} textAnchor="middle" className={s.label}>
                    median
                  </text>
                  <text x={160} y={88} textAnchor="middle" className={s.median}>
                    {median ?? "–"}
                  </text>
                </svg>
                <Row>
                  <Control className="active" disabled={locked || done} onClick={next}>
                    Next number
                  </Control>
                  <Control disabled={locked || done} onClick={rest}>
                    Feed the rest
                  </Control>
                  <Control disabled={locked || fed === 0} onClick={restart}>
                    Start over
                  </Control>
                </Row>
                <Row>
                  <Readout label="Sizes" value={`${st.lo.length} | ${st.hi.length}`} />
                </Row>
                <ol className={s.log} aria-label={shown === st.log ? "arrivals" : "last full run"}>
                  {!locked &&
                    shown.map((e, i) => (
                      <li key={i} className={e.moved !== null ? s.logMove : ""}>
                        {e.x} → {e.side}
                        {e.moved !== null ? `, ${e.moved} crosses` : ", nothing crosses"} · median {e.median}
                      </li>
                    ))}
                </ol>
              </div>
            );
          }}
        </Milestones>
      )}
    </Lesson>
  );
}
