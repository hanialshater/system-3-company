"use client";

// Reservoir sampling with one slot. Item i replaces the kept item when a seeded draw is under 1/i.
// The bars are the exact chances (computed, not simulated): after k arrivals every arrived item has 1/k. Under each
// bar its two factors are drawn, gets in 1/i x stays i/k, so the trade-off is on stage for every item, not only
// item 1. Item 1's survival chain builds 1 x 1/2 x 2/3 x 3/4. The question's stream has 4 items; "A 5th item
// arrives" shows the same rule carrying on without knowing the length (bars go to 1/5; a dashed mark keeps the 1/4
// level the bars held at item 4). "Run 1,000 streams" replays the rule at the current length with seed 1 and ticks
// the tallies on the bars. Seed 1 is disclosed in claims c4/c5/c8.
// Milestones (v2): stream-end (4 items), fifth (5 items), thousand
// (spec company/design/specs/keep-one-of-a-stream.md).

import { useEffect, useState } from "react";
import { Lesson } from "@/kit/Lesson";
import { Control, Row } from "@/kit/controls";
import { useMilestones } from "@/kit/milestones";
import { mulberry32 } from "@/kit/random";
import s from "./styles.module.css";

const N = 4; // the question's stream
const NMAX = 5; // one more item, to show the rule never used the length
const SEED = 1;
const RUNS = 1000;

// The shown stream: draws for items 2..NMAX and who is kept after each arrival (items 2..4 are the v1 stream).
const STREAM = (() => {
  const rng = mulberry32(SEED);
  let kept = 1;
  const out: { i: number; u: number; kept: number }[] = [{ i: 1, u: NaN, kept: 1 }];
  for (let i = 2; i <= NMAX; i++) {
    const u = rng();
    if (u < 1 / i) kept = i;
    out.push({ i, u, kept });
  }
  return out;
})();

// 1,000 streams of length n with the same seed.
function tally(n: number) {
  const rng = mulberry32(SEED);
  const t = Array<number>(n).fill(0);
  for (let r = 0; r < RUNS; r++) {
    let kept = 1;
    for (let i = 2; i <= n; i++) if (rng() < 1 / i) kept = i;
    t[kept - 1]++;
  }
  return t;
}
const TALLY: Record<number, number[]> = { [N]: tally(N), [NMAX]: tally(NMAX) };

// Item 1's survival chain: 1, then (i - 1)/i for arrivals i = 2..k.
const CHAIN = ["1", ...Array.from({ length: NMAX - 1 }, (_, j) => `${j + 1}/${j + 2}`)];
const frac = (a: number, b: number) => (a === b ? "1" : `${a}/${b}`);

const reduced = () => typeof window !== "undefined" && !!window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;

const CARD = 60;
const GAP = 8;
const BAR_H = 112;
const BAR_TOP = 62;
const x0 = (i: number) => i * (CARD + GAP);

function Stage({ locked, interact, k, next, runTo, more, busy, ran, run }: {
  locked: boolean;
  interact: () => void;
  k: number;
  next: () => void;
  runTo: () => void;
  more: () => void;
  busy: boolean;
  ran: boolean;
  run: () => void;
}) {
  const { reach } = useMilestones(interact, ["stream-end", "fifth", "thousand"]);
  useEffect(() => {
    if (k >= N) reach("stream-end");
    if (k >= NMAX) reach("fifth");
  }, [k]); // eslint-disable-line react-hooks/exhaustive-deps
  useEffect(() => {
    if (ran) reach("thousand");
  }, [ran]); // eslint-disable-line react-hooks/exhaustive-deps
  const kept = STREAM[k - 1].kept;
  const last = STREAM[k - 1];
  const chain = CHAIN.slice(0, k).join(" × ");
  const t = TALLY[k];
  const showTally = ran && !!t;
  return (
    <div className={s.wrap}>
      <p className={s.rule}>Keep item 1. Item i replaces the kept one with chance 1/i. Bars: chance each is kept.</p>
      <svg
        viewBox="0 0 340 250"
        className="stage-svg"
        role="img"
        aria-label={`After item ${k}: each item kept with chance 1/${k}${showTally ? `; 1,000 streams kept ${t.join(", ")}` : ""}`}
      >
        {Array.from({ length: NMAX }, (_, j) => {
          const i = j + 1;
          const arrived = i <= k;
          const isKept = i === kept;
          const p = arrived ? 1 / k : 0;
          const bh = p * BAR_H;
          const tick = showTally ? (t[j] / RUNS) * BAR_H : 0;
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
                height={32}
                rx={6}
                fill={arrived ? "var(--bg-2)" : "none"}
                stroke={isKept ? "var(--fg)" : "var(--muted)"}
                strokeWidth={isKept ? 3 : 1}
                strokeDasharray={arrived ? undefined : "4 3"}
              />
              <text x={x0(j) + CARD / 2} y={37} textAnchor="middle" className={arrived ? s.item : s.waiting}>
                {i > N && !arrived ? "5th?" : `Item ${i}`}
              </text>
              <rect x={x0(j) + 12} y={BAR_TOP} width={CARD - 24} height={BAR_H} fill="none" stroke="var(--line)" />
              {arrived && (
                <rect x={x0(j) + 12} y={BAR_TOP + BAR_H - bh} width={CARD - 24} height={bh} fill="var(--domain)" opacity={0.85} />
              )}
              {arrived && k > N && i <= N && (
                <line
                  x1={x0(j) + 6}
                  x2={x0(j) + CARD - 6}
                  y1={BAR_TOP + BAR_H - BAR_H / N}
                  y2={BAR_TOP + BAR_H - BAR_H / N}
                  stroke="var(--muted)"
                  strokeWidth={1.5}
                  strokeDasharray="3 2"
                />
              )}
              {arrived && (
                <text x={x0(j) + CARD / 2} y={BAR_TOP + BAR_H - bh - 4} textAnchor="middle" className={s.frac}>
                  {k === 1 ? "1" : `1/${k}`}
                </text>
              )}
              {arrived && k > 1 && (
                <text x={x0(j) + CARD / 2} y={BAR_TOP + BAR_H + 13} textAnchor="middle" className={s.factor}>
                  {frac(1, i)} × {frac(i, k)}
                </text>
              )}
              {showTally && (
                <g>
                  <line
                    x1={x0(j) + 6}
                    x2={x0(j) + CARD - 6}
                    y1={BAR_TOP + BAR_H - tick}
                    y2={BAR_TOP + BAR_H - tick}
                    stroke="var(--fg)"
                    strokeWidth={2}
                  />
                  <text x={x0(j) + CARD / 2} y={BAR_TOP + BAR_H + 27} textAnchor="middle" className={s.count}>
                    {t[j]}
                  </text>
                </g>
              )}
            </g>
          );
        })}
        <text x={2} y={BAR_TOP + BAR_H + 44} className={s.chain}>
          {k > 1 ? "Under bars: gets in × stays. " : ""}Item 1 stays: {chain}
        </text>
        <text x={2} y={BAR_TOP + BAR_H + 60} className={s.draw}>
          {k === 1
            ? "Item 1 arrives and is kept."
            : `Item ${k}: draw ${last.u.toFixed(3)}, needs under 1/${k}: keep item ${last.kept}`}
          {k > N ? ` · dashes: 1/${N} at item ${N}` : ""}
        </text>
        <text x={338} y={11} textAnchor="end" className={s.seed}>
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
        <Control className={s.tap} disabled={locked || k !== N || busy} onClick={more}>
          A 5th item arrives
        </Control>
        <Control className={s.tap} disabled={locked || ran || k < N || busy} onClick={run}>
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
  const more = () => {
    setTarget(NMAX);
    setK(NMAX);
  };
  const t = TALLY[k] ?? TALLY[N];
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
      minInteractions={3}
      reveal={() => (
        <>
          <p>
            Item 1 had to survive three draws: 1/2, then 2/3, then 3/4. Multiply them: <strong>1/4</strong>. Under the
            bars, item 3 got in with 1/3 and stays with 3/{k}: each later item had a smaller chance to get in, but fewer
            draws left to survive. Every bar reached 1/4 at item 4 (the dashes).
          </p>
          <p>
            Your 1,000 streams of {t.length} kept the items {t.join(", ")} times.
          </p>
          <p className="muted">
            Then a 5th item came, and the same rule took every bar to 1/5. It held one item in memory and never needed to
            know the length.
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
          more={more}
          busy={k < target}
          ran={ran}
          run={() => setRan(true)}
        />
      )}
    </Lesson>
  );
}
