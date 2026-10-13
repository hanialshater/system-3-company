"use client";

// Preference ranking (Bradley-Terry). P(A preferred over B) = 1 / (1 + e^-(rA - rB)).
// People pick A in 75% of comparisons, so the fitted gap solves sigmoid(gap) = 0.75:
// odds 0.75 / 0.25 = 3, gap = ln 3 = 1.0986. Gap 0.75 -> 67.9%, 1 -> 73.1%, 1.1 -> 75.0%, 3 -> 95.3%.
// Deterministic.

import { useState } from "react";
import { Lesson } from "@/kit/Lesson";
import { Control, Readout, Row, Slider } from "@/kit/controls";
import { Milestones } from "@/kit/milestones";
import s from "./styles.module.css";

// MODEL START
const OBSERVED = 0.75;
const sigmoid = (g: number) => 1 / (1 + Math.exp(-g));
const fittedGap = (p: number) => Math.log(p / (1 - p));
const TOL = 0.005;
const matches = (g: number) => Math.abs(sigmoid(g) - OBSERVED) < TOL;
const PRESETS = [0.75, 1.1, 3] as const;
// MODEL END

const X = (g: number) => 30 + (g + 3) * 46.5;
const Y = (p: number) => 150 - p * 128;
const curve = Array.from({ length: 61 }, (_, i) => {
  const g = -3 + i * 0.1;
  return `${i ? "L" : "M"}${X(g).toFixed(1)},${Y(sigmoid(g)).toFixed(1)}`;
}).join(" ");
const pc = (p: number) => `${(p * 100).toFixed(1)}%`;

export default function WhichAnswerWins({ slug }: { slug: string }) {
  const [gap, setGap] = useState(0);
  const [matchedAt, setMatchedAt] = useState<number | null>(null);
  const [tried, setTried] = useState<number[]>([]);

  const p = sigmoid(gap);
  const ok = matches(gap);
  const G = fittedGap(OBSERVED);

  return (
    <Lesson
      slug={slug}
      predict={{
        question: `People pick answer A over B in ${OBSERVED * 100}% of comparisons. A reward model says P(A preferred) = 1 / (1 + e^-(rA − rB)). The reward gap rA − rB is:`,
        options: PRESETS.map(String),
        answer: 1,
      }}
      exploreHint="Set the gap until the model's win rate hits the people's 75%."
      minInteractions={1}
      reveal={() => (
        <>
          <p>
            {matchedAt !== null ? `You matched 75% at a gap of ${matchedAt.toFixed(2)}.` : "The curve meets 75% at a gap of 1.10."}{" "}
            Exactly: 75% to 25% is odds of 3 to 1, and the gap is ln 3 = <strong>{G.toFixed(2)}</strong>.{" "}
            {tried.includes(3) ? `A gap of 3, which you tried, predicts ${pc(sigmoid(3))}: far too sure.` : `A gap of 3 would predict ${pc(sigmoid(3))}.`}
          </p>
          <p>
            The reward model never stores anyone&apos;s score. It is fitted so that the gap between two answers&apos; numbers
            reproduces how often people preferred one. It sees only who won each comparison, not why.
          </p>
          <p className="muted">This is the Bradley-Terry rule used to train reward models from human comparisons.</p>
        </>
      )}
    >
      {({ locked, interact }) => (
        <Milestones interact={interact} names={["matched-75"]}>
          {(reach) => {
            const set = (g: number) => {
              const v = Math.round(g * 100) / 100;
              setGap(v);
              setTried((t) => (t.includes(v) ? t : [...t, v]));
              if (matches(v)) {
                setMatchedAt(v);
                reach("matched-75");
              }
            };
            return (
              <div className={s.wrap}>
                <span className={`tag ${s.model}`}>Toy: one pair of answers · 75% observed</span>
                <svg viewBox="0 0 320 176" className="stage-svg" role="img" aria-label={`Gap ${gap}, predicted ${pc(p)}`}>
                  <line x1={X(-3)} y1={Y(0)} x2={X(3)} y2={Y(0)} stroke="var(--line)" />
                  <line x1={X(0)} y1={Y(0)} x2={X(0)} y2={Y(1)} stroke="var(--line)" strokeDasharray="2 3" />
                  {[-3, -2, -1, 0, 1, 2, 3].map((t) => (
                    <text key={t} x={X(t)} y={Y(0) + 12} textAnchor="middle" className={s.tiny} fill="var(--muted)">
                      {t}
                    </text>
                  ))}
                  <text x={X(0)} y={172} textAnchor="middle" className={s.tiny} fill="var(--muted)">
                    reward gap rA − rB
                  </text>
                  {[0, 0.5, 1].map((t) => (
                    <text key={t} x={X(-3) - 4} y={Y(t) + 3} textAnchor="end" className={s.tiny} fill="var(--muted)">
                      {t * 100}%
                    </text>
                  ))}
                  <line x1={X(-3)} y1={Y(OBSERVED)} x2={X(3)} y2={Y(OBSERVED)} stroke="var(--good)" strokeWidth={1.5} strokeDasharray="6 3" />
                  <text x={X(-2.9)} y={Y(OBSERVED) - 5} className={s.small} fill="var(--good)">
                    people: A wins 75%
                  </text>
                  <path d={curve} fill="none" stroke="var(--domain)" strokeWidth={2.5} />
                  {!locked && (
                    <g>
                      <line x1={X(gap)} y1={Y(0)} x2={X(gap)} y2={Y(p)} stroke="var(--muted)" strokeDasharray="3 3" />
                      <circle cx={X(gap)} cy={Y(p)} r={6} fill={ok ? "var(--good)" : "var(--domain)"} stroke="var(--fg)" strokeWidth={1.5} />
                    </g>
                  )}
                </svg>
                <Row>
                  {PRESETS.map((g) => (
                    <Control key={g} className={gap === g ? "active" : ""} disabled={locked || gap === g} onClick={() => set(g)}>
                      Gap {g}
                    </Control>
                  ))}
                </Row>
                <Row>
                  <Slider label="Reward gap" value={gap} min={-3} max={3} step={0.05} disabled={locked} format={(v) => v.toFixed(2)} onChange={set} />
                  <Readout label="Model: A wins" value={locked ? "–" : pc(p)} />
                  <Readout label="Match?" value={locked ? "–" : ok ? "yes" : p < OBSERVED ? "too low" : "too high"} />
                </Row>
              </div>
            );
          }}
        </Milestones>
      )}
    </Lesson>
  );
}
