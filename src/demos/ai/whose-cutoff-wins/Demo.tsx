"use client";

// Training-data bias. 100 people take a test: 90 in group A (qualified from 50) and
// 10 in group B (qualified from 30; their scores run 20 points low), scores spread
// evenly 0-100. One cutoff is learned for everyone by minimising total mistakes.
// The minimum is at 50, group A's line: 2 mistakes, both group B (20% of B, 0% of A).
// The reveal waits until the learner has seen the cutoff at the minimum.
// v3: "at-40" needs the cutoff to rest at 40 for DWELL_MS (a drag from 30 to 50 passes 40
// without counting), so the reveal's 40-vs-50 comparison is one the learner stood on.
// "Let the model learn a step" comes first and walks 30 -> 40 -> 50, reporting the total
// before and after, so "training lowers the total" is watched, not read.

import { useEffect, useRef, useState } from "react";
import { Lesson } from "@/kit/Lesson";
import { Control, Readout, Row, Slider } from "@/kit/controls";
import { useMilestones } from "@/kit/milestones";
import s from "./styles.module.css";

// MODEL START
const BINS = 10; // score bands 0-10, 10-20, ..., 90-100
const A_PER_BIN = 9;
const A_LINE = 50;
const B_LINE = 30;
// Group A: 9 people per band, spread evenly inside it. Group B: 1 person per band, mid-band.
const A_SCORES = Array.from({ length: BINS * A_PER_BIN }, (_, i) => Math.floor(i / A_PER_BIN) * 10 + (((i % A_PER_BIN) + 0.5) * 10) / A_PER_BIN);
const B_SCORES = Array.from({ length: BINS }, (_, b) => b * 10 + 5);

function mistakes(cut: number) {
  const a = A_SCORES.filter((x) => x >= cut !== x >= A_LINE).length;
  const b = B_SCORES.filter((x) => x >= cut !== x >= B_LINE).length;
  return { a, b, total: a + b };
}
const CUTS = Array.from({ length: BINS + 1 }, (_, i) => i * 10);
const BEST = CUTS.reduce((best, c) => (mistakes(c).total < mistakes(best).total ? c : best), CUTS[0]);
// MODEL END

// Geometry (viewBox 320 × 214).
const L = 20;
const R = 300;
const W = (R - L) / BINS;
const B_Y = 30;
const A_TOP = 54;
const CELL_H = 13;
const A_BOT = A_TOP + A_PER_BIN * CELL_H;
const px = (score: number) => L + (score / 100) * (R - L);
const DWELL_MS = 300;

export default function WhoseCutoffWins({ slug }: { slug: string }) {
  const [cut, setCut] = useState(30);
  const [seen, setSeen] = useState<number[]>([]);
  const [last, setLast] = useState<{ from: number; to: number } | null>(null);
  const m = mistakes(cut);
  const interactRef = useRef<() => void>(() => {});
  const { reach } = useMilestones(() => interactRef.current(), ["at-40", "at-best"]);

  // The reveal compares 40 with the best cutoff, so it waits until the learner has stood on both.
  // 40 counts only once the cutoff rests there, so a drag straight past it does not.
  useEffect(() => {
    if (cut !== 40) return;
    const t = setTimeout(() => {
      setSeen((p) => (p.includes(40) ? p : [...p, 40]));
      reach("at-40");
    }, DWELL_MS);
    return () => clearTimeout(t);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [cut]);

  const move = (c: number, byModel = false) => {
    setLast(byModel ? { from: cut, to: c } : null);
    setCut(c);
    if (c !== 40) setSeen((p) => (p.includes(c) ? p : [...p, c]));
    if (c === BEST) reach("at-best");
  };
  const step = () => move(cut < BEST ? cut + 10 : cut - 10, true);

  const message = (locked: boolean) => {
    if (locked) return "Lock in a guess to start.";
    const stepped = last && last.to === cut ? `Model step ${last.from}→${cut}: ${mistakes(last.from).total}→${m.total} mistakes. ` : "";
    if (cut === BEST) return stepped + (seen.includes(40) ? `Fewest: ${m.total}. Whose are they?` : `${m.total} mistakes. Now stop at 40 to compare.`);
    if (cut === 40) return stepped + `${m.total} mistakes: ${m.a} in A, ${m.b} in B.`;
    return stepped + `${m.total} mistakes. Stop at 40, then 50.`;
  };

  return (
    <Lesson
      slug={slug}
      predict={{
        question:
          "One pass/fail cutoff is learned from 90 people in group A (qualified at a score of 50 or more) and 10 in group B (qualified at 30 or more). Scores are spread evenly 0–100. For the fewest total mistakes, the cutoff lands:",
        options: ["At 50, group A's line", "At 40, halfway", "At 30, group B's line"],
        answer: 0,
      }}
      exploreHint="Let the model learn a step at a time, or stop the cutoff at 40, then 50. Count each group's red."
      minInteractions={2}
      reveal={() => (
        <>
          <p>
            The fewest mistakes came at <strong>{BEST}</strong>, group A&apos;s line: {mistakes(BEST).total} in 100,
            both group B people scoring 30–50, wrongly failed: <strong>20% of group B</strong>, 0% of group A.
          </p>
          <p>
            You stopped at 40: {mistakes(40).total} mistakes, {mistakes(40).a} in A and {mistakes(40).b} in B. Going from 40 to 50 breaks
            one group B person and fixes nine group A people, so the total drops and training lands on 50. The model never saw
            anyone&apos;s group. It fit the majority, and the rare group got the errors, hidden inside an overall 98% right.
          </p>
          <p className="muted">
            Real face-analysis tools misclassified darker-skinned women far more often than lighter-skinned men
            (Gender Shades, 2018).
          </p>
        </>
      )}
    >
      {({ locked, interact }) => {
        interactRef.current = interact;
        return (
        <div className={s.wrap}>
          <svg viewBox="0 0 320 214" className="stage-svg" role="img" aria-label={`Cutoff at ${cut}: ${m.a} group A and ${m.b} group B mistakes`}>
            <rect x={px(cut)} y={8} width={R - px(cut)} height={A_BOT - 4} fill="var(--good)" opacity={0.1} />
            <text x={R} y={18} textAnchor="end" className={s.small} fill="var(--good)">
              pass →
            </text>

            {B_SCORES.map((x, i) => {
              const wrong = !locked && x >= cut !== x >= B_LINE;
              return <circle key={`b${i}`} cx={px(x)} cy={B_Y} r={7} className={wrong ? s.wrong : s.b} />;
            })}
            {A_SCORES.map((x, i) => {
              const wrong = !locked && x >= cut !== x >= A_LINE;
              const bin = Math.floor(i / A_PER_BIN);
              const row = i % A_PER_BIN;
              return (
                <rect
                  key={`a${i}`}
                  x={L + bin * W + 4}
                  y={A_TOP + row * CELL_H + 1}
                  width={W - 8}
                  height={CELL_H - 3}
                  rx={2}
                  className={wrong ? s.wrong : s.a}
                />
              );
            })}

            <line x1={px(B_LINE)} y1={B_Y - 11} x2={px(B_LINE)} y2={B_Y + 11} stroke="var(--fg)" strokeWidth={1.5} strokeDasharray="3 2" />
            <line x1={px(A_LINE)} y1={A_TOP - 3} x2={px(A_LINE)} y2={A_BOT + 1} stroke="var(--fg)" strokeWidth={1.5} strokeDasharray="3 2" />

            <text x={px(B_LINE) - 4} y={B_Y - 13} textAnchor="end" className={s.tiny} fill="var(--fg)">
              B qualifies from 30 →
            </text>
            <text x={px(A_LINE) + 4} y={A_TOP - 6} className={s.tiny} fill="var(--fg)">
              ← A qualifies from 50
            </text>
            <line x1={px(cut)} y1={6} x2={px(cut)} y2={A_BOT + 6} stroke="var(--domain)" strokeWidth={3} />

            {[0, 30, 50, 100].map((v) => (
              <text key={v} x={px(v)} y={A_BOT + 20} textAnchor={v === 0 ? "start" : v === 100 ? "end" : "middle"} className={s.small} fill="var(--muted)">
                {v}
              </text>
            ))}
            <g className={s.small}>
              <circle cx={L + 6} cy={A_BOT + 36} r={5} className={s.b} />
              <text x={L + 14} y={A_BOT + 40} fill="var(--fg)">
                group B (10)
              </text>
              <rect x={L + 100} y={A_BOT + 31} width={12} height={10} rx={2} className={s.a} />
              <text x={L + 116} y={A_BOT + 40} fill="var(--fg)">
                group A (90)
              </text>
              <rect x={L + 200} y={A_BOT + 31} width={12} height={10} rx={2} className={s.wrong} />
              <text x={L + 216} y={A_BOT + 40} fill="var(--fg)">
                mistake
              </text>
            </g>
          </svg>
          <p className={s.msg} aria-live="polite">
            {message(locked)}
          </p>
          <Row>
            <Control disabled={locked || cut === BEST} onClick={step}>
              Let the model learn a step
            </Control>
          </Row>
          <Slider label="Cutoff" value={cut} min={0} max={100} step={10} disabled={locked} onChange={(v) => move(v)} />
          <Row>
            <Readout label="A wrong" value={locked ? "?" : `${m.a} of 90`} />
            <Readout label="B wrong" value={locked ? "?" : `${m.b} of 10`} />
          </Row>
        </div>
        );
      }}
    </Lesson>
  );
}
