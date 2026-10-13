"use client";

// Dropout toy. Four units each output 1. In a training pass each unit is switched off with chance 0.5
// and the survivors are doubled (output 2), so a pass total is 0, 2, 4, 6 or 8 (expected 4 x 0.5 x 2 = 4).
// Passes come from one seeded stream (mulberry32 seed 3, one of three seeds looked at, not tuned),
// precomputed so the 1st, 21st and 221st pass are the same however the learner gets there.

import { useMemo, useState } from "react";
import { Lesson } from "@/kit/Lesson";
import { Control, Readout, Row } from "@/kit/controls";
import { Milestones } from "@/kit/milestones";
import { mulberry32 } from "@/kit/random";
import s from "./styles.module.css";

// MODEL START
const UNITS = 4;
const P_OFF = 0.5;
const SCALE = 1 / (1 - P_OFF); // survivors doubled
const SEED = 3;
const MAX_PASSES = 1000;
function makePasses(): boolean[][] {
  const r = mulberry32(SEED);
  return Array.from({ length: MAX_PASSES }, () => Array.from({ length: UNITS }, () => r() >= P_OFF));
}
const totalOf = (on: boolean[]) => on.filter(Boolean).length * SCALE;
// MODEL END

const f2 = (v: number) => v.toFixed(2);
const SETTLED = 200;

export default function SwitchHalfOff({ slug }: { slug: string }) {
  const passes = useMemo(makePasses, []);
  const totals = useMemo(() => passes.map(totalOf), [passes]);
  const [n, setN] = useState(0);

  const shown = totals.slice(0, n);
  const mean = (k: number) => totals.slice(0, k).reduce((a, b) => a + b, 0) / k;
  const avg = n > 0 ? mean(n) : null;
  const last = n > 0 ? passes[n - 1] : null;

  return (
    <Lesson
      slug={slug}
      predict={{
        question: `Four units each output 1 (all-on total ${UNITS}). In training each is switched off with chance 50% and the survivors are doubled. The average total over many passes:`,
        options: ["2", "4", "8"],
        answer: 1,
      }}
      exploreHint="Run one pass, then many, and watch the average line."
      minInteractions={2}
      reveal={() => (
        <>
          <p>
            In this toy, after {n} passes the average total was {avg === null ? "–" : f2(avg)}, although single passes ran from{" "}
            {Math.min(...shown)} to {Math.max(...shown)}.
          </p>
          <p>
            Each unit is on half the time and counts double when on, so its average is 1 and the four average {UNITS}: the same as
            all on. Another seed would differ a little: over 2000 seeds the average of 221 passes ran from 3.78 to 4.23 (5th to
            95th percentile).
          </p>
          <p>Dropout keeps the average right while stopping units from leaning on particular partners.</p>
        </>
      )}
    >
      {({ locked, interact }) => (
        <Milestones interact={interact} names={["one-pass", "settled"]}>
          {(reach) => {
            const run = (k: number) => {
              const next = Math.min(MAX_PASSES, n + k);
              setN(next);
              reach("one-pass");
              if (next >= SETTLED) reach("settled");
            };
            const xmax = Math.max(30, n);
            const L = 30;
            const R = 308;
            const X = (i: number) => L + ((R - L) * i) / xmax;
            const Y = (v: number) => 214 - (v / 8) * 112;
            const line = shown.map((_, i) => `${i ? "L" : "M"}${X(i + 1).toFixed(1)},${Y(mean(i + 1)).toFixed(1)}`).join("");
            return (
              <div className={s.wrap}>
                <span className={`tag ${s.model}`}>Toy: 4 units, each outputs 1</span>
                <p className={s.caption}>Each pass switches units off at random; survivors count double.</p>
                <svg viewBox="0 0 320 230" className="stage-svg" role="img" aria-label={`Pass ${n}`}>
                  {[0, 1, 2, 3].map((u) => {
                    const on = last ? last[u] : true;
                    return (
                      <g key={u}>
                        <circle cx={60 + u * 66} cy={32} r={20} fill={on ? "var(--domain)" : "var(--bg-2)"} stroke={on ? "var(--domain)" : "var(--muted)"} strokeWidth={2.5} strokeDasharray={on ? undefined : "4 3"} />
                        <text x={60 + u * 66} y={38} textAnchor="middle" className={s.small} fill="var(--fg)">
                          {last ? (on ? SCALE : 0) : 1}
                        </text>
                      </g>
                    );
                  })}
                  <line x1={L} y1={Y(0)} x2={R} y2={Y(0)} stroke="var(--line)" strokeWidth={1.5} />
                  <line x1={L} y1={Y(0)} x2={L} y2={Y(8)} stroke="var(--line)" strokeWidth={1.5} />
                  {[0, 4, 8].map((t) => (
                    <text key={t} x={L - 5} y={Y(t) + 3} textAnchor="end" className={s.tiny} fill="var(--muted)">
                      {t}
                    </text>
                  ))}
                  <text x={R} y={228} textAnchor="end" className={s.tiny} fill="var(--muted)">
                    pass {xmax}
                  </text>
                  {!locked && (
                    <>
                      <line x1={L} y1={Y(UNITS)} x2={R} y2={Y(UNITS)} stroke="var(--muted)" strokeWidth={1} strokeDasharray="4 4" />
                      <text x={R} y={Y(UNITS) - 4} textAnchor="end" className={s.tiny} fill="var(--muted)">
                        all on: {UNITS}
                      </text>
                      {shown.map((t, i) => (
                        <circle key={i} cx={X(i + 1)} cy={Y(t)} r={2.5} fill="var(--muted)" opacity={0.55} />
                      ))}
                      {n > 0 && <path d={line} fill="none" stroke="var(--domain)" strokeWidth={3} strokeLinejoin="round" />}
                    </>
                  )}
                </svg>
                <Row>
                  <Control disabled={locked} onClick={() => run(1)}>
                    One pass
                  </Control>
                  <Control disabled={locked} onClick={() => run(20)}>
                    +20 passes
                  </Control>
                  <Control disabled={locked} onClick={() => run(200)}>
                    +200 passes
                  </Control>
                </Row>
                <Row>
                  <Readout label="Passes" value={n} />
                  <Readout label="Last total" value={locked || n === 0 ? "–" : totals[n - 1]} />
                  <Readout label="Average" value={locked || avg === null ? "–" : f2(avg)} />
                </Row>
              </div>
            );
          }}
        </Milestones>
      )}
    </Lesson>
  );
}
