"use client";
import { useState } from "react";
import { Lesson } from "@/kit/Lesson";
import { Slider } from "@/kit/controls";
import { useMilestones } from "@/kit/milestones";
import { StageControl, StageStatus } from "@/components/lifehacks/a11y";
import { study_spaced_beats_cram as spec } from "@/lib/lifehacks/studyCatalog";
import { PLAN_A, PLAN_B, TESTS, both, recallAt } from "./model";
import s from "./styles.module.css";

// v2 (W-1075): a lesson-local stage. Both plans reread for 3 hours; only the calendar differs (no recall
// step in either). The toy model in model.ts has cram ahead right after study and spacing ahead later.
const milestones = ["right-after", "month"] as const;
const fg = "var(--fg)";
const x = (d: number) => 40 + (d + 2) * 8.25; // day -2 .. 30 -> 40 .. 304
const y = (v: number) => 126 - v * 62; // 0% .. 100% -> 126 .. 64
const right = both(TESTS.rightAfter), month = both(TESTS.month);

function curve(sessions: readonly number[]) {
  const ts = new Set<number>();
  for (let i = 0; i <= 320; i++) ts.add(-2 + i / 10);
  for (const t of sessions) { ts.add(t); ts.add(t - 1e-4); }
  return [...ts].sort((a, b) => a - b).map((t, i) => `${i ? "L" : "M"}${x(t).toFixed(1)},${y(recallAt(sessions, t)).toFixed(1)}`).join(" ");
}
const pathA = curve(PLAN_A), pathB = curve(PLAN_B);

interface State { day: number; tested0: boolean; tested30: boolean }

export default function Demo({ slug }: { slug: string }) {
  const [state, setState] = useState<State>({ day: 0, tested0: false, tested30: false });
  return <Lesson
    slug={slug}
    predict={{ question: spec.question, options: spec.options, answer: spec.answer }}
    minInteractions={milestones.length}
    exploreHint="Run both tests, then drag the day to see where the plans cross."
    reveal={() => <>
      <p>Right after the last hour, A led, {right.a}% to {right.b}%. A month later, B led, {month.b}% to {month.a}%. {spec.boundary}</p>
      <p>{spec.principle} One explanation: each later session reminds you of something half-forgotten, and that strengthens memory more than rereading what is still fresh.</p>
    </>}
  >
    {({ locked, interact }) => <Stage state={state} setState={setState} locked={locked} interact={interact} />}
  </Lesson>;
}

function Stage({ state, setState, locked, interact }:
  { state: State; setState: (f: (p: State) => State) => void; locked: boolean; interact: () => void }) {
  const { reach } = useMilestones(interact, milestones);
  const now = both(state.day);
  const tested: number[] = [];
  if (state.tested0) tested.push(TESTS.rightAfter);
  if (state.tested30) tested.push(TESTS.month);
  const label = locked
    ? "Calendars: A rereads for 3 hours on day 0. B rereads for 1 hour on each of days minus 2, minus 1 and 0. Recall curves hidden until you predict."
    : `Toy recall curves. Day ${state.day}: A ${now.a} percent, B ${now.b} percent. Chosen model, not measured memory.`;
  const status = locked ? "" : [
    `Day ${state.day}: A ${now.a}%, B ${now.b}%`,
    state.tested0 ? `Right after: A ${right.a}%, B ${right.b}%` : "",
    state.tested30 ? `A month later: A ${month.a}%, B ${month.b}%` : "",
  ].filter(Boolean).join(". ");
  return <div className={s.wrap}>
    <svg viewBox="0 0 320 142" className={`stage-svg ${s.diagram}`} role="img" aria-label={label}>
      {/* Calendars: bar height is hours studied. A: one 3-hour block on day 0. B: three 1-hour blocks. */}
      <rect x={x(0) - 3.5} y="4" width="7" height="18" rx="1.5" fill="var(--domain)" stroke={fg} />
      <path d="M66 13h14" stroke="var(--lh-ink)" strokeWidth="3" /><circle cx="73" cy="13" r="3.5" fill="var(--domain)" stroke={fg} />
      <text x="86" y="17" fill={fg}>A: 3 hours on day 0</text>
      {PLAN_B.map((d) => <rect key={d} x={x(d) - 3.5} y="36" width="7" height="6" rx="1.5" fill="var(--good)" stroke={fg} />)}
      <path d="M66 39h14" stroke="var(--good)" strokeWidth="3" strokeDasharray="4 2" /><rect x="69.5" y="35.5" width="7" height="7" fill="var(--good)" stroke={fg} />
      <text x="86" y="43" fill={fg}>B: 1 hour on each of 3 days</text>
      <path d="M40 62 V126 H304" fill="none" stroke="var(--line)" />
      <text x="36" y="68" textAnchor="end" fill={fg}>100%</text><text x="36" y="126" textAnchor="end" fill={fg}>0%</text>
      <text x={x(-2)} y="139" textAnchor="middle" fill={fg}>−2</text><text x={x(0) + 2} y="139" textAnchor="start" fill={fg}>0</text>
      <text x="304" y="139" textAnchor="end" fill={fg}>30 days</text>
      <text x="304" y="58" textAnchor="end" fill={fg}>toy model</text>
      {!locked && <>
        <path d={pathA} stroke="var(--lh-ink)" strokeWidth="2.5" fill="none" />
        <path d={pathB} stroke="var(--good)" strokeWidth="2.5" strokeDasharray="5 3" fill="none" />
        <line x1={x(state.day)} x2={x(state.day)} y1="62" y2="126" stroke={fg} strokeWidth="1.5" />
        {tested.map((d) => { const v = both(d); return <g key={d}>
          <circle cx={x(d)} cy={y(v.a / 100)} r="4" fill="var(--domain)" stroke={fg} />
          <rect x={x(d) - 4} y={y(v.b / 100) - 4} width="8" height="8" fill="var(--good)" stroke={fg} />
        </g>; })}
      </>}
    </svg>
    <StageStatus locked={locked} text={status} />
    <div className={s.controls}>
      <StageControl locked={locked} inactive={state.tested0 && state.day === TESTS.rightAfter}
        onClick={() => { setState((p) => ({ ...p, day: TESTS.rightAfter, tested0: true })); reach("right-after"); }}>
        <span className={s.test}>Test right after</span>
        <span className={s.score}>{!locked && state.tested0 ? `A ${right.a}% · B ${right.b}%` : "A ? · B ?"}</span>
      </StageControl>
      <StageControl locked={locked} inactive={state.tested30 && state.day === TESTS.month}
        onClick={() => { setState((p) => ({ ...p, day: TESTS.month, tested30: true })); reach("month"); }}>
        <span className={s.test}>Test a month later</span>
        <span className={s.score}>{!locked && state.tested30 ? `A ${month.a}% · B ${month.b}%` : "A ? · B ?"}</span>
      </StageControl>
    </div>
    <Slider label="Day" min={0} max={30} value={state.day} disabled={locked}
      format={(d) => locked ? String(d) : `${d}: A ${now.a}% · B ${now.b}%`}
      onChange={(day) => setState((p) => ({ ...p, day }))} />
  </div>;
}
