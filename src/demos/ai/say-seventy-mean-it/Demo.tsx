"use client";

// Calibration toy: a model was right on 14 of 20 questions. It states one confidence r for all.
// Squared gap per question: (r - 1)^2 if right, r^2 if wrong (the Brier score for one yes/no forecast).
// Average = (14 (1 - r)^2 + 6 r^2) / 20 = 0.7 (1 - r)^2 + 0.3 r^2: 0.250 at 0.9 and at 0.5, 0.210 at 0.7
// (the minimum, r = 14/20). Which 6 positions are wrong: mulberry32(1) shuffle, untuned, layout only.

import { useState } from "react";
import { Lesson } from "@/kit/Lesson";
import { Control, Readout, Row, Slider } from "@/kit/controls";
import { Milestones } from "@/kit/milestones";
import { mulberry32 } from "@/kit/random";
import s from "./styles.module.css";

// MODEL START
const N = 20;
const HITS = 14;
const OUTCOMES = (() => {
  const a = Array.from({ length: N }, (_, i) => i < HITS);
  const r = mulberry32(1);
  for (let i = N - 1; i > 0; i--) {
    const j = Math.floor(r() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
})();
const gap = (r: number, right: boolean) => (right ? (r - 1) ** 2 : r * r);
const avgGap = (r: number) => OUTCOMES.reduce((a, ok) => a + gap(r, ok), 0) / N;
const BEST = HITS / N; // 0.7
const PRESETS = [90, 70, 50] as const;
const START = 50;
// MODEL END

const f3 = (v: number) => v.toFixed(3);

export default function SaySeventyMeanIt({ slug }: { slug: string }) {
  const [pct, setPct] = useState(START);
  const r = pct / 100;
  const avg = avgGap(r);

  return (
    <Lesson
      slug={slug}
      predict={{
        question: `Your quiz bot was right on ${HITS} of ${N} questions (${Math.round(BEST * 100)}%). It must state one confidence, r, every time, scored by the squared gap: (r − 1)² if right, r² if wrong. Which r gives the lowest average?`,
        options: ["90%", "70%", "50%"],
        answer: 1,
      }}
      exploreHint="Try sounding surer, then less sure. Watch the average gap line."
      minInteractions={2}
      reveal={() => (
        <>
          <p>
            At 50% and at 90% the average squared gap was {f3(avgGap(0.5))}: a tie. At 70% it fell to {f3(avgGap(0.7))}.
            Saying 90% made each of the {N - HITS} misses cost {f3(gap(0.9, false))}; saying 50% made every one of the {HITS} hits cost{" "}
            {f3(gap(0.5, true))}.
          </p>
          <p>
            The average is 0.7(1 − r)² + 0.3r², which is lowest exactly at r = {BEST}, the model&apos;s real hit rate. This score
            (the Brier score) cannot be gamed by sounding surer or by hedging.
          </p>
          <p>The best confidence to state is the true hit rate: overconfidence and underconfidence both cost.</p>
        </>
      )}
    >
      {({ locked, interact }) => (
        <Milestones interact={interact} names={["ninety", "seventy"]}>
          {(reach) => {
            const set = (v: number) => {
              setPct(v);
              if (v === 90) reach("ninety");
              if (v === 70) reach("seventy");
            };
            const H = 110;
            const base = 128;
            const bw = 13;
            return (
              <div className={s.wrap}>
                <span className={`tag ${s.model}`}>Toy model · right on {HITS} of {N}</span>
                <svg viewBox="0 0 320 160" className="stage-svg" role="img" aria-label={locked ? "20 answers" : `Stated ${pct}%, average gap ${f3(avg)}`}>
                  <line x1={14} y1={base} x2={306} y2={base} stroke="var(--line)" />
                  {OUTCOMES.map((ok, i) => {
                    const x = 18 + i * 14.5;
                    const g = gap(r, ok);
                    return (
                      <g key={i}>
                        {!locked && (
                          <rect x={x} y={base - g * H} width={bw} height={g * H} rx={2} fill={ok ? "var(--good)" : "var(--bad)"} opacity={0.75} />
                        )}
                        <text x={x + bw / 2} y={base + 14} textAnchor="middle" className={s.small} fill={ok ? "var(--good)" : "var(--bad)"}>
                          {ok ? "✓" : "✗"}
                        </text>
                      </g>
                    );
                  })}
                  {!locked && (
                    <>
                      <line x1={14} y1={base - avg * H} x2={306} y2={base - avg * H} stroke="var(--fg)" strokeWidth={1.5} strokeDasharray="5 3" />
                      <text x={306} y={12} textAnchor="end" className={s.tiny} fill="var(--fg)">
                        dashed line = average {f3(avg)}
                      </text>
                    </>
                  )}
                  <text x={14} y={154} className={s.tiny} fill="var(--muted)">
                    bar = squared gap for that answer
                  </text>
                </svg>
                <Row>
                  {PRESETS.map((p) => (
                    <Control key={p} className={pct === p ? "active" : ""} disabled={locked || pct === p} onClick={() => set(p)}>
                      Say {p}%
                    </Control>
                  ))}
                </Row>
                <Slider label="Stated confidence" value={pct} min={0} max={100} step={5} disabled={locked} format={(v) => `${v}%`} onChange={set} />
                <Row>
                  <Readout label="Average squared gap" value={locked ? "–" : f3(avg)} />
                </Row>
              </div>
            );
          }}
        </Milestones>
      )}
    </Lesson>
  );
}
