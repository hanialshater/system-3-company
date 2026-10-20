"use client";

// Law of large numbers, the part people get backwards. 20 seeded runs of fair flips drawn
// two ways on the same axes: the heads-minus-tails gap, and the heads share.
// The payoff: as flips grow from 10 to 10,000 the gap spreads wider while the share
// squeezes onto 50%. The law is about fractions, not counts.

import { useMemo, useState } from "react";
import { Lesson } from "@/kit/Lesson";
import { Control, Readout, Row } from "@/kit/controls";
import { Milestones } from "@/kit/milestones";
import { meanAbsGap, runs, share } from "./model";
import s from "./styles.module.css";

const RUN = runs();
const STEPS = [10, 100, 1000, 10000];
const MILESTONES = ["gap-100", "gap-1000", "gap-10000", "share-10000"] as const;
const fmt = (k: number) => k.toLocaleString("en-US");
/** typical (theory) average |heads - tails| after k fair flips: sqrt(2k/pi) */
const typical = (k: number) => {
  const v = Math.sqrt((2 * k) / Math.PI);
  return v < 10 ? v.toFixed(1) : String(Math.round(v));
};
const W = 340;
const H = 220;
const L = 40;
const R = 8;
const T = 22;
const B = 24;
const GAP_MAX = 250;

export default function CoinGap({ slug }: { slug: string }) {
  const [n, setN] = useState(10);
  const [view, setView] = useState<"gap" | "share">("gap");

  const sx = (k: number) => L + (k / n) * (W - L - R);
  const sy = (v: number) =>
    view === "gap" ? T + ((GAP_MAX - v) / (2 * GAP_MAX)) * (H - T - B) : T + (1 - v) * (H - T - B);

  const paths = useMemo(() => {
    const pts = Math.min(n, 200);
    return RUN.map((g) => {
      let d = "";
      for (let i = 1; i <= pts; i++) {
        const k = Math.round((i / pts) * n);
        const v = view === "gap" ? g[k] : share(g, k);
        d += `${i === 1 ? "M" : "L"}${sx(k).toFixed(1)},${sy(v).toFixed(1)}`;
      }
      return d;
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [n, view]);

  const avgGap = meanAbsGap(RUN, n);
  const shares = RUN.map((g) => share(g, n));
  const lo = Math.min(...shares);
  const hi = Math.max(...shares);
  const ticks = view === "gap" ? [-200, -100, 0, 100, 200] : [0, 0.25, 0.5, 0.75, 1];

  return (
    <Lesson
      slug={slug}
      predict={{
        question:
          "You flip a fair coin 10,000 times. On average, how big will the gap between the heads and tails counts be?",
        options: ["Under 5", "About 80", "About 1,000"],
        answer: 1,
      }}
      exploreHint="Step up through 100, 1,000 and 10,000 flips, then switch to the heads share."
      minInteractions={MILESTONES.length}
      reveal={() => (
        <>
          <p>
            Your 20 runs were on average {STEPS.map((k) => meanAbsGap(RUN, k).toFixed(1)).join(", ")} apart after{" "}
            {STEPS.map(fmt).join(", ")} flips: <strong>the gap did not shrink</strong>. Across many runs it typically
            grows like the square root of the flips: about {STEPS.map(typical).join(", ")}. (Twenty runs wobble around
            that.)
          </p>
          <p>
            But {typical(10000)} out of 10,000 is tiny. The heads share squeezes toward 50%: in these 20 runs it ended
            between {(Math.min(...RUN.map((g) => share(g, 10000))) * 100).toFixed(1)}% and{" "}
            {(Math.max(...RUN.map((g) => share(g, 10000))) * 100).toFixed(1)}%. The law of large numbers (the share of heads
            settles toward 50%) is about the share, not the count.
          </p>
        </>
      )}
    >
      {({ locked, interact }) => (
        <Milestones interact={interact} names={MILESTONES}>
          {(reach) => (
        <div className={s.wrap}>
          <svg viewBox={`0 0 ${W} ${H}`} className={`stage-svg ${s.svg}`} role="img" aria-label={`${view === "gap" ? "Heads minus tails" : "Heads share"} for 20 runs of ${n} flips`}>
            {ticks.map((t) => (
              <g key={t}>
                <line x1={L} x2={W - R} y1={sy(t)} y2={sy(t)} className={t === (view === "gap" ? 0 : 0.5) ? s.zero : s.grid} />
                <text x={L - 5} y={sy(t) + 3.5} textAnchor="end" className={s.tick}>
                  {view === "gap" ? (t > 0 ? `+${t}` : t) : `${t * 100}%`}
                </text>
              </g>
            ))}
            {paths.map((d, i) => (
              <path key={i} d={d} className={s.run} />
            ))}
            {view === "gap" && !locked && [1, -1].map((sg) => (
              <path
                key={sg}
                className={s.theory}
                fill="none"
                d={Array.from({ length: 61 }, (_, i) => {
                  const k = Math.max(1, (i / 60) * n);
                  return `${i ? "L" : "M"}${sx(k).toFixed(1)},${sy(sg * Math.sqrt((2 * k) / Math.PI)).toFixed(1)}`;
                }).join("")}
              />
            ))}
            <text x={W - R} y={H - 6} textAnchor="end" className={s.tick}>
              {fmt(n)} flips
            </text>
            <text x={L} y={H - 6} className={s.tick}>
              0
            </text>
            <text x={L} y={13} className={s.title}>
              {view === "gap" ? "Heads minus tails" : "Share of heads"}
            </text>
          </svg>
          <Row>
            {STEPS.map((k) => (
              <Control
                key={k}
                className={k === n ? "active" : ""}
                aria-pressed={k === n}
                disabled={locked || k === n}
                onClick={() => {
                  setN(k);
                  if (view === "gap" && k === 100) reach("gap-100");
                  if (view === "gap" && k === 1000) reach("gap-1000");
                  if (view === "gap" && k === 10000) reach("gap-10000");
                  if (view === "share" && k === 10000) reach("share-10000");
                }}
              >
                {fmt(k)}
              </Control>
            ))}
            <Control
              disabled={locked}
              onClick={() => {
                const next = view === "gap" ? "share" : "gap";
                setView(next);
                if (next === "share" && n === 10000) reach("share-10000");
              }}
            >
              {view === "gap" ? "Show heads share" : "Show the gap"}
            </Control>
          </Row>
          <p className={s.key}>Gap = heads minus tails. Share = heads ÷ flips. Dashed: the typical gap, from theory.</p>
          <Row>
            <Readout label="Average gap" value={locked ? "?" : avgGap.toFixed(1)} />
            <Readout label="Typical (dashed)" value={locked ? "?" : typical(n)} />
            <Readout label="Heads share, all runs" value={locked ? "?" : `${(lo * 100).toFixed(1)}–${(hi * 100).toFixed(1)}%`} />
          </Row>
        </div>
          )}
        </Milestones>
      )}
    </Lesson>
  );
}
