"use client";

// Hat check. N people check hats and get them back in a random order (a uniform random permutation).
// Choosing a crowd size runs 1,000 seeded shuffles at once and draws the share of shuffles where at least
// one person got their own hat. Seeds mulberry32(size * 7919 + batch): batch 0 is the first seed tried,
// untuned. Exact: 1 - sum_{k=0..n} (-1)^k / k! (3: 0.6667, 10: 0.6321, 100 and 1,000: 0.6321).
// Key states: runs at 3, 10, 100 and 1,000 people. "Shuffle again" runs the next batch. Deterministic.

import { useMemo, useState } from "react";
import { Lesson } from "@/kit/Lesson";
import { Control, Readout, Row } from "@/kit/controls";
import { useMilestones } from "@/kit/milestones";
import { mulberry32 } from "@/kit/random";
import s from "./styles.module.css";

const SIZES = [3, 10, 100, 1000], SHUFFLES = 1000, Q_SIZE = 10;
const MILESTONES = SIZES.map((n) => `ran-${n}`);

function exact(n: number): number {
  let sum = 0, f = 1;
  for (let k = 0; k <= n; k++) {
    if (k > 0) f *= k;
    sum += (k % 2 ? -1 : 1) / f;
    if (!isFinite(f)) break;
  }
  return 1 - sum;
}
/** Percent (one decimal) of 1,000 shuffles where somebody got their own hat. */
function run(n: number, batch: number): number {
  const rng = mulberry32(n * 7919 + batch);
  const p = new Array<number>(n);
  let matched = 0;
  for (let r = 0; r < SHUFFLES; r++) {
    for (let i = 0; i < n; i++) p[i] = i;
    for (let i = n - 1; i > 0; i--) {
      const j = Math.floor(rng() * (i + 1));
      [p[i], p[j]] = [p[j], p[i]];
    }
    for (let i = 0; i < n; i++) if (p[i] === i) { matched++; break; }
  }
  return matched / (SHUFFLES / 100);
}
const pct = (x: number) => `${(Math.round(x * 10) / 10).toFixed(1)}%`;
const ex = (n: number) => pct(exact(n) * 100);
const label = (n: number) => n.toLocaleString("en-US");

function Stage({ locked, interact }: { locked: boolean; interact: () => void }) {
  const { reach } = useMilestones(interact, MILESTONES);
  const [size, setSize] = useState<number | null>(null);
  const [batches, setBatches] = useState<Record<number, number>>({});
  const [result, setResult] = useState<Record<number, number>>({});

  const go = (n: number) => {
    const b = batches[n] ?? 0;
    setSize(n);
    setBatches({ ...batches, [n]: b + 1 });
    setResult({ ...result, [n]: run(n, b) });
    reach(`ran-${n}`);
  };
  const msg = locked
    ? "Toy: each shuffle hands every hat to a random person."
    : size === null
      ? `Pick a crowd size. ${label(SHUFFLES)} shuffles run at once.`
      : `${label(size)} people, ${label(SHUFFLES)} shuffles: someone got their own hat in ${pct(result[size])} of them.`;
  const W = 52, GAP = 22, H = 90;
  return (
    <div className={s.wrap}>
      <p className={s.msg} aria-live="polite">{msg}</p>
      <svg viewBox="0 -10 340 140" className={`stage-svg ${s.svg}`} role="img" aria-label="Share of shuffles with at least one match, for each crowd size run so far">
        <line className={s.axis} x1={8} x2={332} y1={H + 6} y2={H + 6} />
        {[0, 50, 100].map((v) => (
          <g key={v}>
            <line className={s.grid} x1={8} x2={332} y1={H + 6 - (v / 100) * H} y2={H + 6 - (v / 100) * H} />
            <text className={s.tick} x={6} y={H + 3 - (v / 100) * H} style={{ textAnchor: "start" }}>{v}%</text>
          </g>
        ))}
        {SIZES.map((n, i) => {
          const x = 52 + i * (W + GAP), r = result[n];
          const h = r === undefined ? 0 : (r / 100) * H;
          return (
            <g key={n}>
              <rect className={s.bar} x={x} y={H + 6 - h} width={W} height={h} rx={3} />
              {r !== undefined && <text className={s.val} x={x + W / 2} y={H + 2 - h}>{pct(r)}</text>}
              <text className={s.tick} x={x + W / 2} y={H + 20}>{label(n)} people</text>
            </g>
          );
        })}
      </svg>
      <Row>
        {SIZES.map((n) => (
          <Control key={n} className={size === n ? "active" : ""} disabled={locked} onClick={() => go(n)}>
            {label(n)} people
          </Control>
        ))}
        <Control disabled={locked || size === null} onClick={() => go(size!)}>Shuffle {label(SHUFFLES)} again</Control>
      </Row>
      <Row>
        <Readout label="Crowd" value={size === null ? "?" : label(size)} />
        <Readout label="Someone matched" value={locked || size === null ? "?" : pct(result[size])} />
      </Row>
    </div>
  );
}

export default function EveryoneGetsHatsBack({ slug }: { slug: string }) {
  const first = useMemo(() => SIZES.map((n) => run(n, 0)), []);
  return (
    <Lesson
      slug={slug}
      predict={{
        question: `${Q_SIZE} people check their hats. The hats come back in random order. How likely is it that at least one person gets their own hat?`,
        options: ["About 10%", `About ${Math.round(exact(Q_SIZE) * 100)}%`, "About 90%"],
        answer: 1,
      }}
      exploreHint="Run each crowd size: 3, 10, 100 and 1,000 people."
      minInteractions={MILESTONES.length}
      reveal={() => (
        <>
          <p>
            Your first run at each size, 3 / 10 / 100 / 1,000 people: <strong>{first.map(pct).join(" / ")}</strong>. The exact chances are{" "}
            {SIZES.map(ex).join(" / ")}. More people hardly changes it.
          </p>
          <p>
            More people means more chances for a match, but each is smaller (1 in n). The two cancel, and the chance settles near 1 − 1/e,{" "}
            {pct((1 - 1 / Math.E) * 100)}. Runs of {label(SHUFFLES)} scatter by about a point or two.
          </p>
        </>
      )}
    >
      {({ locked, interact }) => <Stage locked={locked} interact={interact} />}
    </Lesson>
  );
}
