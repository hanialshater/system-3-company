"use client";

// Michaelis-Menten as 100 enzyme "stations". Substrate S is measured in units of
// the half-way concentration Km (S = 1 means half the enzymes are busy).
// Busy share = S / (1 + S); rate = busy share x top speed. Deterministic.
// The pool above shows substrate waiting (10 dots per unit, positions from an
// untuned seed, mulberry32(9)); it is a picture of "more substrate", not a count.

import { useState } from "react";
import { Lesson } from "@/kit/Lesson";
import { Control, Readout, Row, Slider } from "@/kit/controls";
import { useMilestones } from "@/kit/milestones";
import { mulberry32 } from "@/kit/random";
import s from "./styles.module.css";

const MAX_S = 20;
const MILESTONES = ["high-double", "low-double"] as const;
const busy = (S: number) => S / (1 + S);
const gain = (S: number) => busy(S) / busy(S / 2) - 1; // speed-up from doubling S/2 -> S
const pct = (x: number) => `${Math.round(100 * x)}%`;

const POOL = (() => {
  const rng = mulberry32(9);
  return Array.from({ length: MAX_S * 10 }, () => [8 + rng() * 284, 8 + rng() * 64]);
})();

// Numbers in the question and reveal come from the same functions as the stage.
const HI = pct(gain(20)); // "5%"
const LO = pct(gain(2)); // "33%"

function Stage({ locked, interact }: { locked: boolean; interact: () => void }) {
  const [S, setS] = useState(10);
  const { reach } = useMilestones(interact, MILESTONES);
  const go = (v: number) => {
    setS(v);
    if (v === 20) reach("high-double");
    if (v === 2) reach("low-double");
  };
  const nBusy = Math.round(100 * busy(S));

  return (
    <div className={s.wrap}>
      <svg viewBox="0 0 300 260" className={`stage-svg ${s.svg}`} role="img" aria-label={`${nBusy} of 100 enzymes busy`}>
        <rect x={2} y={2} width={296} height={76} rx={8} className={s.pool} />
        {POOL.slice(0, S * 10).map(([x, y], i) => (
          <circle key={i} cx={x} cy={y} r={2.2} className={s.sub} />
        ))}
        {Array.from({ length: 100 }, (_, i) => {
          const x = 8 + (i % 20) * 14.4, y = 92 + Math.floor(i / 20) * 33;
          const on = !locked && i < nBusy;
          return (
            <g key={i}>
              <path d={`M${x},${y} h12 v16 h-3 a3,3 0 0 0 -6,0 h-3 z`} className={on ? s.busy : s.enz} />
              {on && <circle cx={x + 6} cy={y + 15} r={2.6} className={s.sub} />}
            </g>
          );
        })}
      </svg>

      <p className={s.msg} aria-live="polite">
        {locked
          ? "Make a prediction to start. 100 enzymes; each handles one molecule at a time."
          : `Substrate ${S}× half-way: ${nBusy} of 100 busy. Versus half as much: +${pct(gain(S))} speed.`}
      </p>

      <Row>
        <Control className={s.chip} disabled={locked || S === 20} onClick={() => go(20)}>
          Double 10 → 20
        </Control>
        <Control className={s.chip} disabled={locked || S === 2} onClick={() => go(2)}>
          Double 1 → 2
        </Control>
      </Row>
      <Slider label="Substrate (× half-way)" value={S} min={1} max={MAX_S} disabled={locked} onChange={go} />
      <Row>
        <Readout label="Speed" value={locked ? "?" : `${pct(busy(S))} of top`} />
        <Readout label="From doubling" value={locked ? "?" : `+${pct(gain(S))}`} />
      </Row>
    </div>
  );
}

export default function SaturatedEnzyme({ slug }: { slug: string }) {
  return (
    <Lesson
      slug={slug}
      predict={{
        question:
          "An enzyme works at 10 times its half-way concentration (where half the enzymes are busy). Doubling the substrate then speeds it up by about…",
        options: ["2 times", "50%", HI],
        answer: 2,
      }}
      exploreHint="Double the substrate from 10 to 20, then from 1 to 2, and watch the busy stations."
      minInteractions={MILESTONES.length}
      reveal={() => (
        <>
          <p>
            From 10 to 20, busy enzymes went from 91 to 95 of 100: only <strong>{HI} faster</strong>. From 1 to 2 they went
            from 50 to 67: {LO} faster. Twice the substrate never meant twice the speed.
          </p>
          <p>
            Each enzyme handles one molecule at a time. When almost all are busy, extra substrate only waits its turn, so
            the speed levels off at a top rate. Speed &prop; S &divide; (half-way + S).
          </p>
          <p className="muted">Model: Michaelis-Menten kinetics for one substrate; the stations are a simplification.</p>
        </>
      )}
    >
      {({ locked, interact }) => <Stage locked={locked} interact={interact} />}
    </Lesson>
  );
}
