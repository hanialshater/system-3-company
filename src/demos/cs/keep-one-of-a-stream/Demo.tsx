"use client";

// Reservoir sampling with one slot. Four stream items; item i replaces the kept item when a seeded draw is under 1/i.
// The bars are the exact chances (computed, not simulated): after i arrivals every arrived item has 1/i. Item 1's
// survival chain builds 1 x 1/2 x 2/3 x 3/4. "Run 1,000 streams" replays the rule with the same seed and ticks the
// tallies on the bars. Seed 1 is disclosed in claim c5. Milestones: stream-end, thousand
// (spec company/design/specs/keep-one-of-a-stream.md).

import { useEffect, useState } from "react";
import { Lesson } from "@/kit/Lesson";
import { Control, Row } from "@/kit/controls";
import { useMilestones } from "@/kit/milestones";
import { mulberry32 } from "@/kit/random";
import s from "./styles.module.css";

const N = 4;
const SEED = 1;
const RUNS = 1000;

// The shown stream: draws for items 2..N and who is kept after each arrival.
const STREAM = (() => {
  const rng = mulberry32(SEED);
  let kept = 1;
  const out: { i: number; u: number; kept: number }[] = [{ i: 1, u: NaN, kept: 1 }];
  for (let i = 2; i <= N; i++) {
    const u = rng();
    if (u < 1 / i) kept = i;
    out.push({ i, u, kept });
  }
  return out;
})();

// 1,000 streams with the same seed (the first of them is the shown stream).
const TALLY = (() => {
  const rng = mulberry32(SEED);
  const t = Array<number>(N).fill(0);
  for (let r = 0; r < RUNS; r++) {
    let kept = 1;
    for (let i = 2; i <= N; i++) if (rng() < 1 / i) kept = i;
    t[kept - 1]++;
  }
  return t;
})();

// Item 1's survival chain: 1, then (i - 1)/i for arrivals i = 2..N (1/2, 2/3, 3/4).
const CHAIN = ["1", ...Array.from({ length: N - 1 }, (_, j) => `${j + 1}/${j + 2}`)];

const reduced = () => typeof window !== "undefined" && !!window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;

const CARD = 76;
const GAP = 12;
const BAR_H = 120;
const BAR_TOP = 64;
const x0 = (i: number) => i * (CARD + GAP);

function Stage({ locked, interact, k, next, runTo, busy, ran, run }: {
  locked: boolean;
  interact: () => void;
  k: number;
  next: () => void;
  runTo: () => void;
  busy: boolean;
  ran: boolean;
  run: () => void;
}) {
  const { reach } = useMilestones(interact, ["stream-end", "thousand"]);
  useEffect(() => {
    if (k >= N) reach("stream-end");
  }, [k]); // eslint-disable-line react-hooks/exhaustive-deps
  useEffect(() => {
    if (ran) reach("thousand");
  }, [ran]); // eslint-disable-line react-hooks/exhaustive-deps
  const kept = STREAM[k - 1].kept;
  const last = STREAM[k - 1];
  const chain = CHAIN.slice(0, k).join(" × ");
  return (
    <div className={s.wrap}>
      <p className={s.rule}>Keep item 1. Item i replaces the kept one with chance 1/i.</p>
      <svg
        viewBox="0 0 340 236"
        className="stage-svg"
        role="img"
        aria-label={`After item ${k}: each item kept with chance 1/${k}${ran ? `; 1,000 streams kept ${TALLY.join(", ")}` : ""}`}
      >
        {Array.from({ length: N }, (_, j) => {
          const i = j + 1;
          const arrived = i <= k;
          const isKept = i === kept;
          const p = arrived ? 1 / k : 0;
          const bh = p * BAR_H;
          const tick = ran ? (TALLY[j] / RUNS) * BAR_H : 0;
          return (
            <g key={i}>
              {isKept && (
                <text x={x0(j) + CARD / 2} y={11} textAnchor="middle" className={s.kept}>
                  kept
                </text>
              )}
              <rect
                x={x0(j) + 1}
                y={16}
                width={CARD - 2}
                height={34}
                rx={6}
                fill={arrived ? "var(--bg-2)" : "none"}
                stroke={isKept ? "var(--fg)" : "var(--muted)"}
                strokeWidth={isKept ? 3 : 1}
                strokeDasharray={arrived ? undefined : "4 3"}
              />
              <text x={x0(j) + CARD / 2} y={38} textAnchor="middle" className={arrived ? s.item : s.waiting}>
                Item {i}
              </text>
              <rect x={x0(j) + 18} y={BAR_TOP} width={CARD - 36} height={BAR_H} fill="none" stroke="var(--line)" />
              {arrived && (
                <rect x={x0(j) + 18} y={BAR_TOP + BAR_H - bh} width={CARD - 36} height={bh} fill="var(--domain)" opacity={0.85} />
              )}
              {arrived && (
                <text x={x0(j) + CARD / 2} y={BAR_TOP + BAR_H - bh - 4} textAnchor="middle" className={s.frac}>
                  {k === 1 ? "1" : `1/${k}`}
                </text>
              )}
              {ran && (
                <g>
                  <line
                    x1={x0(j) + 10}
                    x2={x0(j) + CARD - 10}
                    y1={BAR_TOP + BAR_H - tick}
                    y2={BAR_TOP + BAR_H - tick}
                    stroke="var(--fg)"
                    strokeWidth={2}
                  />
                  <text x={x0(j) + CARD / 2} y={BAR_TOP + BAR_H + 14} textAnchor="middle" className={s.count}>
                    {TALLY[j]}
                  </text>
                </g>
              )}
            </g>
          );
        })}
        <text x={2} y={BAR_TOP + BAR_H + 32} className={s.chain}>
          Item 1 stays: {chain}
        </text>
        <text x={2} y={BAR_TOP + BAR_H + 48} className={s.draw}>
          {k === 1
            ? "Item 1 arrives and is kept."
            : `Item ${k}: draw ${last.u.toFixed(3)}, needs under 1/${k}: keep item ${last.kept}`}
        </text>
        <text x={338} y={BAR_TOP + BAR_H + 32} textAnchor="end" className={s.seed}>
          seed {SEED}
        </text>
      </svg>
      <Row>
        <Control className={s.tap} disabled={locked || k >= N || busy} onClick={next}>
          Next item
        </Control>
        <Control className={s.tap} disabled={locked || k >= N || busy} onClick={runTo}>
          Rest of the stream
        </Control>
        <Control className={s.tap} disabled={locked || ran} onClick={run}>
          Run 1,000 streams
        </Control>
      </Row>
    </div>
  );
}

export default function KeepOneOfAStream({ slug }: { slug: string }) {
  const [k, setK] = useState(1);
  const [target, setTarget] = useState(1);
  const [ran, setRan] = useState(false);
  useEffect(() => {
    if (k >= target) return;
    const t = setTimeout(() => setK((x) => x + 1), 120);
    return () => clearTimeout(t);
  }, [k, target]);
  const next = () => {
    setTarget(k + 1);
    setK(k + 1);
  };
  const runTo = () => {
    setTarget(N);
    setK(reduced() ? N : k + 1);
  };
  return (
    <Lesson
      slug={slug}
      predict={{
        question:
          "A stream has 4 items. Keep item 1. For item i (i = 2, 3, 4), replace the kept one with the new item with probability 1/i. What is the chance that item 1 is the one kept at the end?",
        options: ["1/2", "1/4", "1/8"],
        answer: 1,
      }}
      exploreHint="Bring in the items one by one and watch item 1's bar."
      minInteractions={2}
      reveal={() => (
        <>
          <p>
            Item 1 had to survive three draws: 1/2, then 2/3, then 3/4. Multiply them: <strong>1/4</strong>. Each later
            item had a smaller chance to get in, but fewer draws left to survive, and every bar ended at 1/4.
          </p>
          <p>
            Your 1,000 streams kept the four items {TALLY[0]}, {TALLY[1]}, {TALLY[2]} and {TALLY[3]} times.
          </p>
          <p className="muted">
            The rule held one item in memory and never needed to know the stream would stop at 4.
          </p>
        </>
      )}
    >
      {({ locked, interact }) => (
        <Stage
          locked={locked}
          interact={interact}
          k={k}
          next={next}
          runTo={runTo}
          busy={k < target}
          ran={ran}
          run={() => setRan(true)}
        />
      )}
    </Lesson>
  );
}
