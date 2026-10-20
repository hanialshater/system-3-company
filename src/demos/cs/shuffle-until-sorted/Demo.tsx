"use client";

// Shuffle-and-check ("bogosort") as a waiting time. Each shuffle is a fresh seeded Fisher-Yates shuffle of 1..n,
// so it is in order with probability 1/n!. The learner shuffles by hand (ticks show cards that happen to be in
// their place), lets one run go until sorted, then runs 100 runs and reads the average off a strip of bars.
// Seeds (disclosed in claim c1, not chosen for the result): mulberry32(42 + n) for the single-run stream (hand
// shuffles and "until sorted" share it, so the run length does not depend on press order), mulberry32(4200 + n)
// for the 100 runs, mulberry32(7 + n) for the first deal. One representation: the row of cards; the strip
// and the table are readouts of runs the learner made.

import { useEffect, useRef, useState } from "react";
import { Lesson } from "@/kit/Lesson";
import { Control, Row } from "@/kit/controls";
import { Milestones } from "@/kit/milestones";
import { mulberry32 } from "@/kit/random";
import s from "./styles.module.css";

const NS = [3, 4, 5] as const;
type N = (typeof NS)[number];
const CAP = 5000; // a single run stops here (P(more) at n = 5 is about e^-41.7)
const FACT: Record<N, number> = { 3: 6, 4: 24, 5: 120 };

const base = (n: number) => Array.from({ length: n }, (_, i) => i + 1);
function fisherYates(n: number, rng: () => number) {
  const a = base(n);
  for (let i = n - 1; i > 0; i--) {
    const j = Math.floor(rng() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}
const inOrder = (a: number[]) => a.every((v, i) => v === i + 1);

// Single-run stream per n, extended lazily but always in order, so it is deterministic.
const streams = new Map<number, { rng: () => number; perms: number[][] }>();
function perm(n: N, i: number) {
  let st = streams.get(n);
  if (!st) {
    st = { rng: mulberry32(42 + n), perms: [] };
    streams.set(n, st);
  }
  while (st.perms.length <= i) st.perms.push(fisherYates(n, st.rng));
  return st.perms[i];
}

type Avg = { runs: number[]; mean: number; max: number; min: number };
const avgCache = new Map<number, Avg>();
function average(n: N): Avg {
  const hit = avgCache.get(n);
  if (hit) return hit;
  const rng = mulberry32(4200 + n);
  const runs: number[] = [];
  for (let r = 0; r < 100; r++) {
    let k = 1;
    while (k < CAP && !inOrder(fisherYates(n, rng))) k++;
    runs.push(k);
  }
  const res = { runs, mean: runs.reduce((a, b) => a + b, 0) / 100, max: Math.max(...runs), min: Math.min(...runs) };
  avgCache.set(n, res);
  return res;
}

function firstDeal(n: N) {
  const rng = mulberry32(7 + n);
  let a = fisherYates(n, rng);
  while (inOrder(a)) a = fisherYates(n, rng);
  return a;
}

type Rec = {
  order: number[];
  idx: number; // perms consumed from the single-run stream
  runStart: number;
  done: boolean; // current run ended sorted
  capped: boolean;
  hand: number; // hand shuffles at this n
  one?: number; // first completed run length
  oneCapped?: boolean;
  avg?: Avg;
  bars: number; // bars of the strip shown
};
const freshRec = (n: N): Rec => ({ order: firstDeal(n), idx: 0, runStart: 0, done: false, capped: false, hand: 0, bars: 0 });
const START: Record<N, Rec> = { 3: freshRec(3), 4: freshRec(4), 5: freshRec(5) };

const CARD_W = 56;
const CARD_H = 72;
const PITCH = 64;
const STRIP_H = 120;

const reducedMotion = () =>
  typeof window !== "undefined" && window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;

export default function ShuffleUntilSorted({ slug }: { slug: string }) {
  const [n, setN] = useState<N>(5);
  const [recs, setRecs] = useState<Record<N, Rec>>(START);
  const [busy, setBusy] = useState(false);
  const timers = useRef<ReturnType<typeof setTimeout>[]>([]);
  const recsRef = useRef(recs);
  recsRef.current = recs;

  useEffect(() => () => timers.current.forEach(clearTimeout), []);
  const later = (ms: number, f: () => void) => {
    timers.current.push(setTimeout(f, ms));
  };
  const put = (m: N, patch: Partial<Rec>) => setRecs((r) => ({ ...r, [m]: { ...r[m], ...patch } }));

  const rec = recs[n];
  const tally = rec.idx - rec.runStart;
  const usedChips = recs[3].avg !== undefined || recs[4].avg !== undefined || recs[3].one !== undefined || recs[4].one !== undefined;

  return (
    <Lesson
      slug={slug}
      predict={{
        question:
          "A sort shuffles the cards at random and stops when they happen to be in order. With 5 cards, about how many shuffles does it need on average?",
        options: ["About 5", "About 25", "About 120"],
        answer: 2,
      }}
      exploreHint="Shuffle a few times, then let it run until sorted."
      minInteractions={2}
      reveal={() => {
        const r5 = recs[5];
        const first = r5.one !== undefined
          ? `Your 5-card run took ${r5.one.toLocaleString("en-US")} shuffles`
          : `After ${r5.hand} shuffles by hand, your 5 cards were still out of order`;
        const avg = r5.avg ? `; 100 runs averaged ${Math.round(r5.avg.mean)}, from ${r5.avg.min} to ${r5.avg.max}` : "";
        const chips: string[] = [];
        if (recs[3].avg) chips.push(`3 cards averaged ${Math.round(recs[3].avg.mean)} (3! = 6)`);
        if (recs[4].avg) chips.push(`4 cards ${Math.round(recs[4].avg.mean)} (4! = 24)`);
        return (
          <>
            <p>
              {first}
              {avg}. Rows with two or three ticks came and went, but only one order counts.
            </p>
            <p>
              Five cards can be ordered 5! = 120 ways, and each shuffle is equally likely to give any of them, so one
              shuffle in 120 comes out sorted and you wait about 120 on average.
              {usedChips && chips.length > 0 ? ` ${chips.join(" and ")}.` : ""}
            </p>
            <p>
              Each extra card multiplies the wait. With 10 cards there are 3,628,800 orders, so about 3.6 million
              shuffles. Independent uniform shuffling needs n! attempts on average, though one run can finish sooner or later.
            </p>
          </>
        );
      }}
    >
      {({ locked, interact }) => (
        <Milestones interact={interact} names={["sorted-once", "average-of-100"]}>
          {(reach) => {
            const shuffleOnce = () => {
              if (locked || busy) return;
              const r = recsRef.current[n];
              const runStart = r.done || r.capped ? r.idx : r.runStart;
              const idx = r.idx + 1;
              const order = perm(n, idx - 1);
              const done = inOrder(order);
              const len = idx - runStart;
              const capped = !done && len >= CAP;
              const hand = r.hand + 1;
              const patch: Partial<Rec> = { order, idx, runStart, done, capped, hand };
              if ((done || capped) && r.one === undefined) {
                patch.one = len;
                patch.oneCapped = capped;
              }
              put(n, patch);
              if (n === 5 && (done || hand >= 30)) reach("sorted-once");
            };

            // Run from the current shuffle to the next sorted one. Frames are a sample; the tally counts all.
            const playRun = (m: N, ms: number, then?: () => void) => {
              const r = recsRef.current[m];
              const runStart = r.done || r.capped ? r.idx : r.runStart;
              let end = r.idx;
              let done = false;
              while (end - runStart < CAP) {
                end += 1;
                if (inOrder(perm(m, end - 1))) {
                  done = true;
                  break;
                }
              }
              const len = end - runStart;
              const finish = () => {
                const cur = recsRef.current[m];
                const patch: Partial<Rec> = { order: perm(m, end - 1), idx: end, runStart, done, capped: !done };
                if (cur.one === undefined) {
                  patch.one = len;
                  patch.oneCapped = !done;
                }
                put(m, patch);
                if (m === 5) reach("sorted-once");
                if (then) then();
                else setBusy(false);
              };
              if (reducedMotion() || ms <= 0) {
                finish();
                return;
              }
              setBusy(true);
              const frames = 16;
              for (let f = 1; f < frames; f++) {
                const at = r.idx + Math.max(1, Math.round(((end - r.idx) * f) / frames));
                if (at >= end) continue;
                later((ms * f) / frames, () => put(m, { order: perm(m, at - 1), idx: at, runStart, done: false, capped: false }));
              }
              later(ms, finish);
            };

            const playAverage = (m: N, ms: number) => {
              const a = average(m);
              const finish = () => {
                put(m, { avg: a, bars: 100 });
                if (m === 5) reach("average-of-100");
                setBusy(false);
              };
              if (reducedMotion() || ms <= 0) {
                finish();
                return;
              }
              setBusy(true);
              const frames = 10;
              for (let f = 1; f < frames; f++) later((ms * f) / frames, () => put(m, { bars: Math.round((100 * f) / frames) }));
              later(ms, finish);
            };

            const untilSorted = () => {
              if (locked || busy) return;
              playRun(n, 400);
            };
            const runAverage = () => {
              if (locked || busy || rec.avg) return;
              playAverage(n, 400);
            };
            const pick = (m: N) => {
              if (locked || busy || m === n) return;
              const prev = recsRef.current[n];
              const target = recsRef.current[m];
              setN(m);
              const prevFilled = prev.one !== undefined && prev.avg !== undefined;
              const targetEmpty = target.one === undefined && target.avg === undefined;
              if (prevFilled && targetEmpty) {
                // replay this n's run and its 100 runs, as the learner did for the last n
                setBusy(true);
                playRun(m, 180, () => later(0, () => playAverage(m, 180)));
              }
            };

            const scale = 48 / FACT[n]; // px per shuffle: the true mean sits near 48 px
            const a = rec.avg;
            const shown = a ? a.runs.slice(0, rec.bars) : average(n).runs.slice(0, rec.bars);
            const meanY = a && rec.bars >= 100 ? STRIP_H - Math.min(STRIP_H, a.mean * scale) : null;
            const sortedNow = rec.done;
            const rowW = n * PITCH;
            const x0 = (340 - rowW) / 2 + (PITCH - CARD_W) / 2;
            const tallyText = sortedNow
              ? `Sorted after ${tally.toLocaleString("en-US")} shuffles`
              : rec.capped
                ? `Stopped at ${CAP.toLocaleString("en-US")}`
                : `Shuffles: ${tally.toLocaleString("en-US")}`;

            return (
              <div className={s.wrap}>
                <p className={s.rule}>Shuffle at random. Stop when the cards are in order.</p>
                <svg
                  viewBox="0 0 340 104"
                  className={`stage-svg ${s.cards}`}
                  role="img"
                  aria-label={`${n} cards: ${rec.order.join(" ")}${sortedNow ? ", sorted" : ""}`}
                >
                  {rec.order.map((v, i) => {
                    const right = v === i + 1;
                    return (
                      <g key={v} className={s.card} style={{ transform: `translate(${x0 + i * PITCH}px, 4px)` }}>
                        <rect
                          width={CARD_W}
                          height={CARD_H}
                          rx={8}
                          fill="var(--bg-2)"
                          stroke={sortedNow ? "var(--good-fill)" : "var(--line)"}
                          strokeWidth={sortedNow ? 3 : 1.5}
                        />
                        <text x={CARD_W / 2} y={CARD_H / 2 + 9} textAnchor="middle" className={s.digit}>
                          {v}
                        </text>
                        <text x={CARD_W / 2} y={CARD_H + 20} textAnchor="middle" className={s.tick}>
                          {right ? "✓" : ""}
                        </text>
                      </g>
                    );
                  })}
                </svg>
                <p className={`${s.tally} ${sortedNow ? s.good : ""}`} aria-live="polite">
                  {tallyText}
                </p>
                <svg
                  viewBox={`0 0 340 ${STRIP_H + 14}`}
                  className={`stage-svg ${s.strip}`}
                  role="img"
                  aria-label={a ? `100 runs, average ${Math.round(a.mean)} shuffles, longest ${a.max}` : "No runs yet"}
                  data-bars={rec.bars}
                >
                  {shown.map((len, i) => {
                    const h = Math.max(1, len * scale);
                    const clip = h > STRIP_H;
                    const hh = Math.min(h, STRIP_H);
                    const x = 5 + i * 3.3;
                    return (
                      <g key={i}>
                        <rect x={x} y={STRIP_H + 12 - hh} width={2.6} height={hh} fill="var(--domain)" />
                        {clip && (
                          <text x={x + 1.3} y={11} textAnchor="middle" className={s.clip}>
                            ▲
                          </text>
                        )}
                      </g>
                    );
                  })}
                  {meanY !== null && a && (
                    <g>
                      <line x1={4} x2={336} y1={meanY + 12} y2={meanY + 12} stroke="var(--fg)" strokeWidth={1.5} strokeDasharray="5 4" />
                      <text x={336} y={meanY + 8} textAnchor="end" className={s.meanLab}>
                        average {Math.round(a.mean)}
                      </text>
                    </g>
                  )}
                </svg>
                <div className={s.table} role="group" aria-label="Shuffles needed">
                  <span />
                  <span className={s.th}>One run</span>
                  <span className={s.th}>Average of 100</span>
                  {NS.map((m) => {
                    const r = recs[m];
                    return (
                      <div key={m} className={`${s.tr} ${m === n ? s.cur : ""}`}>
                        <span className={s.th}>{m} cards</span>
                        <span className={`${s.td} ${r.one !== undefined ? s.on : ""}`}>
                          {r.one !== undefined ? `${r.oneCapped ? "> " : ""}${r.one.toLocaleString("en-US")}` : "?"}
                        </span>
                        <span className={`${s.td} ${r.avg ? s.on : ""}`}>{r.avg ? Math.round(r.avg.mean) : "?"}</span>
                      </div>
                    );
                  })}
                </div>
                <Row>
                  <Control className="tap" disabled={locked || busy} onClick={shuffleOnce}>
                    Shuffle
                  </Control>
                  <Control className="tap" disabled={locked || busy} onClick={untilSorted}>
                    Shuffle until sorted
                  </Control>
                  <Control className="tap" disabled={locked || busy || !!rec.avg} onClick={runAverage}>
                    Average of 100 runs
                  </Control>
                </Row>
                <Row>
                  <span className={s.lab}>Cards</span>
                  {NS.map((m) => (
                    <Control
                      key={m}
                      className={`tap ${m === n ? "active" : ""}`}
                      disabled={locked || busy || m === n}
                      onClick={() => pick(m)}
                    >
                      {m} cards
                    </Control>
                  ))}
                </Row>
              </div>
            );
          }}
        </Milestones>
      )}
    </Lesson>
  );
}
