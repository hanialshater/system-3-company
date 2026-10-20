"use client";

// Statistical power. A coin is secretly 60% heads. One experiment = n flips; the test declares "biased" only at
// or above a bar chosen so a fair coin reaches it at most 5% of the time. 100 seeded experiments are drawn as a
// histogram of head counts, split at the bar. Key state: 100 experiments at 50 flips (about a third reach the bar),
// then the same 100 at 200 flips (most reach the new bar).

import { useMemo, useRef, useState } from "react";
import { Lesson } from "@/kit/Lesson";
import { Milestones } from "@/kit/milestones";
import { Control, Readout, Row } from "@/kit/controls";
import { LONG, P_TRUE, RUNS, SHORT, bar, caught, experiments, falseAlarm, power } from "./model";
import s from "./styles.module.css";

const MILESTONES = ["hundred-short", "hundred-long"] as const;
const W = 320;
const H = 130;
const PLOT_T = 18;
const PLOT_B = 112;
const BINS = 20; // 2% bins from 40% to 80% of flips
const BW = (W - 16) / BINS;
const ALL_SHORT = experiments(SHORT);
const ALL_LONG = experiments(LONG);
const C_SHORT = caught(ALL_SHORT, SHORT);
const C_LONG = caught(ALL_LONG, LONG);

function Stage({ locked, reach }: { locked: boolean; reach: (n: string) => void }) {
  const [runs, setRuns] = useState(0);
  const [n, setN] = useState(SHORT);
  const b = bar(n);
  const all = n === SHORT ? ALL_SHORT : ALL_LONG;
  const shown = all.slice(0, runs);
  const nCaught = caught(shown, n);

  const bins = useMemo(() => {
    const miss = new Array(BINS).fill(0);
    const hit = new Array(BINS).fill(0);
    for (const h of shown) {
      const k = Math.min(BINS - 1, Math.max(0, Math.floor((h / n - 0.4) / 0.02)));
      if (h >= b) hit[k]++;
      else miss[k]++;
    }
    return { miss, hit };
  }, [shown, n, b]);
  const maxStack = Math.max(1, ...bins.miss.map((m, i) => m + bins.hit[i]));
  const unit = (PLOT_B - PLOT_T) / Math.max(maxStack, 6);
  const barX = 8 + ((b / n - 0.4) / 0.02) * BW;

  const sawShort = useRef(false);
  const check = (r: number, nn: number) => {
    if (r >= RUNS && nn === SHORT) {
      sawShort.current = true;
      reach("hundred-short");
    }
    if (r >= RUNS && nn === LONG && sawShort.current) reach("hundred-long");
  };

  return (
    <div className={s.wrap}>
      <p className={s.msg}>
        {locked
          ? "Make a prediction to start."
          : `The coin is secretly ${P_TRUE * 100}% heads. Each experiment flips it ${n} times. Right of the line, the test says biased.`}
      </p>
      <svg viewBox={`0 0 ${W} ${H}`} className={`stage-svg ${s.svg}`} role="img" aria-label={`${runs} experiments of ${n} flips`}>
        {bins.miss.map((m, i) => (
          <g key={i}>
            <rect x={8 + i * BW + 0.5} y={PLOT_B - m * unit} width={BW - 1} height={m * unit} className={s.miss} />
            <rect x={8 + i * BW + 0.5} y={PLOT_B - (m + bins.hit[i]) * unit} width={BW - 1} height={bins.hit[i] * unit} className={s.hit} />
          </g>
        ))}
        <line x1={8} x2={W - 8} y1={PLOT_B} y2={PLOT_B} className={s.axis} />
        <line x1={barX} x2={barX} y1={PLOT_T - 4} y2={PLOT_B} className={s.bar} />
        <text x={barX} y={9} textAnchor="middle" className={s.lab}>bar: {b} heads of {n}</text>
        <text x={8} y={H - 3} className={s.lab}>40% heads</text>
        <text x={W - 8} y={H - 3} textAnchor="end" className={s.lab}>80% heads</text>
      </svg>
      <Row>
        <Control
          disabled={locked || runs > 0}
          onClick={() => {
            setRuns(10);
          }}
        >
          Run 10 experiments
        </Control>
        <Control
          disabled={locked || runs >= RUNS}
          onClick={() => {
            setRuns(RUNS);
            check(RUNS, n);
          }}
        >
          Run all {RUNS}
        </Control>
        <Control
          className={n === LONG ? "active" : ""}
          disabled={locked}
          onClick={() => {
            const nn = n === SHORT ? LONG : SHORT;
            setN(nn);
            check(runs, nn);
          }}
        >
          {n === SHORT ? `Use ${LONG} flips` : `Back to ${SHORT} flips`}
        </Control>
      </Row>
      <Row>
        <Readout label="Experiments" value={locked ? "?" : runs} />
        <Readout label="Bias caught" value={locked ? "?" : runs === 0 ? "none yet" : `${nCaught} of ${runs}`} />
      </Row>
    </div>
  );
}

const pct = (p: number) => `${Math.round(p * 100)}%`;

export default function RealEffectMissed({ slug }: { slug: string }) {
  return (
    <Lesson
      slug={slug}
      predict={{
        question: `Your friend's coin is secretly ${P_TRUE * 100}% heads. You flip it ${SHORT} times and cry foul only if heads reaches ${bar(SHORT)} (a fair coin does that ${(falseAlarm(SHORT) * 100).toFixed(1)}% of the time). How often do you catch it?`,
        options: ["about 90%", "about 60%", `about ${pct(power(SHORT))}`],
        answer: 2,
      }}
      exploreHint={`Run the ${RUNS} experiments, then try ${LONG} flips.`}
      minInteractions={MILESTONES.length}
      reveal={() => (
        <>
          <p>
            In your {RUNS} experiments, {C_SHORT} reached the bar of {bar(SHORT)} with {SHORT} flips: most missed a bias that was really there. The exact catch rate is{" "}
            {(power(SHORT) * 100).toFixed(1)}%.
          </p>
          <p>
            With {LONG} flips and a bar of {bar(LONG)}, {C_LONG} of the {RUNS} were caught (exactly {(power(LONG) * 100).toFixed(1)}%). &ldquo;No significant result&rdquo; from a small test is not
            &ldquo;no effect&rdquo;.
          </p>
        </>
      )}
    >
      {({ locked, interact }) => (
        <Milestones interact={interact} names={MILESTONES}>
          {(reach) => <Stage locked={locked} reach={reach} />}
        </Milestones>
      )}
    </Lesson>
  );
}
