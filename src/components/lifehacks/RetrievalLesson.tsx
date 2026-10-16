"use client";

// TP-3 (company/decisions/2026-10-15-lifehacks-r11-fix-plan.md): the retrieval stage for v1 recall lessons
// whose spec carries `retrieval`. The attempt starts empty, the studied card is covered while the learner
// answers, and each answer box cycles through fixed choices that include plausible wrong ones.
// Recall specs without `retrieval` (rebuild-the-procedure) never reach this file.

import { useId, useState, type Dispatch, type SetStateAction } from "react";
import { Lesson } from "@/kit/Lesson";
import { useMilestones } from "@/kit/milestones";
import { StageControl, StageStatus, resultText } from "./a11y";
import type { RecallSpec } from "@/lib/lifehacks/studyModels";
import { EMPTY, markAttempt, nextChoice, scoreRow, type CompoundRetrieval, type FeedbackRetrieval, type RowsRetrieval, type StudyCard } from "@/lib/lifehacks/studyRecall";
import s from "./StudyLesson.module.css";

const fg = "var(--fg)";
type Mark = boolean | null;

/** The studied card: one box per item, optional arrows (a chain), optional tick or cross per box. */
function Cards({ cards, arrow, marks, label }: { cards: StudyCard[]; arrow?: string; marks?: Mark[]; label: string }) {
  const n = cards.length, gap = arrow ? 36 : 10, w = (316 - (n - 1) * gap) / n;
  const head = `lh-arrow-${useId().replace(/[^a-zA-Z0-9_-]/g, "")}`;
  return <svg viewBox="0 0 320 70" className={`stage-svg ${s.diagram}`} role="img" aria-label={label}>
    <defs><marker id={head} viewBox="0 0 8 8" refX="7" refY="4" markerWidth="7" markerHeight="7" orient="auto"><path d="M0 0 L8 4 L0 8 Z" fill={fg} /></marker></defs>
    {cards.map((c, i) => {
      const x = 2 + i * (w + gap), m = marks?.[i];
      return <g key={i}>
        <rect x={x} y="4" width={w} height="60" rx="9" fill="var(--bg-2)" stroke={m === undefined || m === null ? "var(--line)" : m ? "var(--good)" : "var(--bad)"} strokeWidth={m === undefined || m === null ? 1 : 2} />
        {c.top && <text x={x + w / 2} y="24" textAnchor="middle" fill="var(--muted)" className={s.rowLabel}>{c.top}</text>}
        <text x={x + w / 2} y={c.top ? 48 : 39} textAnchor="middle" fill={fg} className={s.cardMain}>{c.main}</text>
        {m !== undefined && m !== null && <text x={x + w - 7} y="20" textAnchor="end" fill={m ? "var(--good)" : "var(--bad)"} fontWeight={700} aria-hidden="true">{m ? "✓" : "✗"}</text>}
        {arrow && i < n - 1 && <g>
          <line x1={x + w + 3} x2={x + w + gap - 4} y1="38" y2="38" stroke={fg} strokeWidth="1.5" markerEnd={`url(#${head})`} />
          <text x={x + w + gap / 2} y="30" textAnchor="middle" fill={fg} className={s.rowLabel}>{arrow}</text>
        </g>}
      </g>;
    })}
  </svg>;
}

function Chips({ locked, items }: { locked: boolean; items: Array<[string, string]> }) {
  return <><div className={s.results}>{items.map(([label, value]) => <span key={label} className={s.result}><span>{label}</span><strong>{value}</strong></span>)}</div>
    <StageStatus locked={locked} text={resultText(items)} /></>;
}

const describe = (cards: StudyCard[]) => cards.map((c) => [c.top, c.main].filter(Boolean).join(" ")).join("; ");

export function RetrievalLesson({ slug, spec }: { slug: string; spec: RecallSpec }) {
  const r = spec.retrieval!;
  if (r.kind === "compound") return <CompoundLesson slug={slug} spec={spec} r={r} />;
  if (r.kind === "feedback") return <FeedbackLesson slug={slug} spec={spec} r={r} />;
  return <RowsLesson slug={slug} spec={spec} r={r} />;
}

/* ------------------------------------------------------------------ rows: cover, then answer from memory */

interface RowsState { picks: number[][]; checked: boolean[] }

function rowsObservation(r: RowsRetrieval, st: RowsState): string {
  const parts: string[] = r.lead ? [r.lead] : [];
  const results = r.rows.map((row, i) => scoreRow(row, st.picks[i]));
  r.rows.forEach((row, i) => {
    const v = results[i];
    if (!st.checked[i]) { parts.push(`${row.label}: not checked yet.`); return; }
    const fits = row.fits ? ` (${row.fits})` : "";
    if (v.total === 1) {
      const p = row.prompts[0], chose = p.choices[st.picks[i][0]];
      parts.push(`${row.label}: ${v.right ? `right, ${p.answer}` : `${chose}, but ${p.answer} was meant`}${fits}.`);
      return;
    }
    const misses = v.misses.map((m) => `${m.cue}${/[?:]$/.test(m.cue) ? "" : ":"} ${m.answer}, not ${m.chose}`).join("; ");
    parts.push(`${row.label}: ${v.right} of ${v.total} right${misses ? `; ${misses}` : ""}${fits}.`);
  });
  if (r.allRight && st.checked.every(Boolean) && results.every((v) => v.right === v.total)) parts.push(r.allRight);
  return parts.join(" ");
}

function RowsLesson({ slug, spec, r }: { slug: string; spec: RecallSpec; r: RowsRetrieval }) {
  const [st, setSt] = useState<RowsState>(() => ({ picks: r.rows.map((row) => row.prompts.map(() => EMPTY)), checked: r.rows.map(() => false) }));
  return <Lesson slug={slug} predict={{ question: spec.question, options: spec.options, answer: spec.answer }} minInteractions={2} exploreHint={r.hint}
    reveal={() => <><p>{rowsObservation(r, st)}</p><p>{spec.principle}</p></>}>
    {({ locked, interact }) => <RowsStage r={r} st={st} setSt={setSt} locked={locked} interact={interact} />}
  </Lesson>;
}

function RowsStage({ r, st, setSt, locked, interact }: { r: RowsRetrieval; st: RowsState; setSt: Dispatch<SetStateAction<RowsState>>; locked: boolean; interact: () => void }) {
  const single = r.rows.length === 1;
  const { reach } = useMilestones(interact, single ? ["answered", "checked"] : r.rows.map((_, i) => `checked-${i + 1}`));
  const results = r.rows.map((row, i) => scoreRow(row, st.picks[i]));
  // The card stays covered until every row is checked, so checking one direction never gives away the other.
  const open = locked || st.checked.every(Boolean);
  const cards = open ? r.study : r.covered;
  const tap = (i: number, j: number) => {
    if (locked || st.checked[i]) return;
    setSt((p) => ({ ...p, picks: p.picks.map((row, a) => a !== i ? row : row.map((c, b) => b !== j ? c : nextChoice(r.rows[i].prompts[j].choices, c))) }));
    if (single) reach("answered");
  };
  const check = (i: number) => {
    if (locked || st.checked[i] || !results[i].complete) return;
    setSt((p) => ({ ...p, checked: p.checked.map((c, a) => a === i ? true : c) }));
    reach(single ? "checked" : `checked-${i + 1}`);
  };
  const chips: Array<[string, string]> = [...(r.contrast ? [r.contrast] : []), ...r.rows.map((row, i): [string, string] => [row.label, !locked && st.checked[i] ? `${results[i].right}/${results[i].total}` : "?"])];
  return <div className={s.wrap}>
    <div className={s.caption}>{locked ? r.studyCaption : open ? "Card uncovered after your checks" : r.caption}</div>
    <Cards cards={cards} arrow={open ? r.arrow : undefined} label={`${open ? "Studied card" : "Card covered"}: ${describe(cards)}.`} />
    {r.rows.map((row, i) => {
      const v = results[i], done = !locked && st.checked[i];
      return <div key={i} className={s.attemptRow} role="group" aria-label={row.label}>
        <div className={s.rowHead}>{row.label}{done && row.fits ? ` · ${row.fits}` : ""}</div>
        <div className={s.controls}>
          {row.prompts.map((p, j) => {
            const pick = st.picks[i][j], shown = pick < 0 ? "?" : p.choices[pick];
            return <StageControl key={j} locked={locked} inactive={done} className={s.slot} onClick={() => tap(i, j)}
              aria-label={`${p.cue}: ${pick < 0 ? "no answer yet" : shown}${done ? (v.marks[j] ? ", right" : ", wrong") : ". Tap to change"}`}>
              <span className={s.slotCue}>{p.cue}</span>
              <strong>{shown}{done && <span aria-hidden="true" className={v.marks[j] ? s.good : s.bad}> {v.marks[j] ? "✓" : "✗"}</span>}</strong>
            </StageControl>;
          })}
          <StageControl locked={locked} inactive={done || !v.complete} onClick={() => check(i)}>{row.check}</StageControl>
        </div>
      </div>;
    })}
    <Chips locked={locked} items={chips} />
  </div>;
}

/* ------------------------------------------------------------------ compound: one card or three, same attempt */

interface CompoundState { view: "one" | "split" | null; seen: { one: boolean; split: boolean } }

function compoundObservation(r: CompoundRetrieval, st: CompoundState): string {
  const misses = r.parts.filter((p) => p.given !== p.answer);
  const out: string[] = [];
  out.push(st.seen.one ? `As one card, the record is a single “right”: the missed ${misses.map((m) => m.label).join(" and ")} left no trace.` : "You did not mark it as one card.");
  out.push(st.seen.split ? `As three cards, ${misses.map((m) => `the ${m.label} card is marked wrong (${m.given}, not ${m.answer})`).join(" and ")}.` : "You did not split it into three cards.");
  return out.join(" ");
}

function CompoundLesson({ slug, spec, r }: { slug: string; spec: RecallSpec; r: CompoundRetrieval }) {
  const [st, setSt] = useState<CompoundState>({ view: null, seen: { one: false, split: false } });
  return <Lesson slug={slug} predict={{ question: spec.question, options: spec.options, answer: spec.answer }} minInteractions={2} exploreHint={r.hint}
    reveal={() => <><p>{compoundObservation(r, st)}</p><p>{spec.principle}</p></>}>
    {({ locked, interact }) => <CompoundStage r={r} st={st} setSt={setSt} locked={locked} interact={interact} />}
  </Lesson>;
}

function CompoundStage({ r, st, setSt, locked, interact }: { r: CompoundRetrieval; st: CompoundState; setSt: Dispatch<SetStateAction<CompoundState>>; locked: boolean; interact: () => void }) {
  const { reach } = useMilestones(interact, ["one", "split"]);
  const view = locked ? null : st.view;
  const press = (v: "one" | "split") => { setSt((p) => ({ view: v, seen: { ...p.seen, [v]: true } })); reach(v); };
  const right = r.parts.filter((p) => p.given === p.answer).length;
  const given = r.parts.map((p) => p.given).join(" · ");
  const label = view === "split"
    ? `Three cards: ${r.parts.map((p) => `${p.label}: ${p.given}, ${p.given === p.answer ? "right" : `wrong, it is ${p.answer}`}`).join("; ")}.`
    : `One card: ${r.card} Your answers: ${given}.${view === "one" ? " Recorded: one mark, right." : ""}`;
  return <div className={s.wrap}>
    <div className={s.caption}>{r.caption}</div>
    <svg viewBox="0 0 320 96" className={`stage-svg ${s.diagram}`} role="img" aria-label={label}>
      {view === "split"
        ? r.parts.map((p, i) => {
          const x = 2 + i * 106, ok = p.given === p.answer;
          return <g key={i}>
            <rect x={x} y="4" width="98" height="86" rx="9" fill="var(--bg-2)" stroke={ok ? "var(--good)" : "var(--bad)"} strokeWidth="2" />
            <text x={x + 49} y="24" textAnchor="middle" fill="var(--muted)" className={s.rowLabel}>{p.label}?</text>
            <text x={x + 49} y="50" textAnchor="middle" fill={fg} className={s.cardMain}>{p.given} {ok ? "✓" : "✗"}</text>
            {!ok && <text x={x + 49} y="74" textAnchor="middle" fill={fg} className={s.rowLabel}>it is {p.answer}</text>}
          </g>;
        })
        : <g>
          <rect x="2" y="4" width="316" height="86" rx="9" fill="var(--bg-2)" stroke={view === "one" ? "var(--good)" : "var(--line)"} strokeWidth={view === "one" ? 2 : 1} />
          <text x="160" y="28" textAnchor="middle" fill={fg} className={s.cardMain}>{r.card}</text>
          <text x="160" y="52" textAnchor="middle" fill="var(--muted)" className={s.rowLabel}>your answers: {given}</text>
          {view === "one" && <text x="160" y="78" textAnchor="middle" fill="var(--good)" fontWeight={700}>✓ one mark: right</text>}
        </g>}
    </svg>
    <div className={s.controls}>
      <StageControl locked={locked} inactive={view === "one"} aria-pressed={view === "one"} onClick={() => press("one")}>{r.one}</StageControl>
      <StageControl locked={locked} inactive={view === "split"} aria-pressed={view === "split"} onClick={() => press("split")}>{r.split}</StageControl>
    </div>
    <Chips locked={locked} items={[["One card", !locked && st.seen.one ? "right" : "?"], ["Three cards", !locked && st.seen.split ? `${right} right, ${r.parts.length - right} wrong` : "?"]]} />
  </div>;
}

/* ------------------------------------------------------------------ feedback: a try count, or each item marked */

interface FeedbackState { attempt: number[]; tried: number[]; tries: number; mode: "count" | "marks" | null; seen: { count: boolean; marks: boolean } }

function feedbackObservation(r: FeedbackRetrieval, st: FeedbackState): string {
  const first = markAttempt(r, r.attempt), wrong = first.map((ok, i) => ok ? -1 : i).filter((i) => i >= 0);
  const out: string[] = [];
  if (st.seen.count) out.push(`“${r.tries} tries, still locked” did not say which ${r.label} was wrong.`);
  if (st.seen.marks) out.push(`The marks did: ${wrong.map((i) => `${r.label} ${i + 1} (${r.choices[i][r.attempt[i]]})`).join(" and ")} wrong, the rest right.`);
  const now = markAttempt(r, st.tried);
  if (st.tries > r.tries) out.push(now.every(Boolean) ? `On try ${st.tries} the lock opened.` : `Try ${st.tries} is still locked.`);
  return out.join(" ");
}

function FeedbackLesson({ slug, spec, r }: { slug: string; spec: RecallSpec; r: FeedbackRetrieval }) {
  const [st, setSt] = useState<FeedbackState>({ attempt: [...r.attempt], tried: [...r.attempt], tries: r.tries, mode: null, seen: { count: false, marks: false } });
  return <Lesson slug={slug} predict={{ question: spec.question, options: spec.options, answer: spec.answer }} minInteractions={2} exploreHint={r.hint}
    reveal={() => <><p>{feedbackObservation(r, st)}</p><p>{spec.principle}</p></>}>
    {({ locked, interact }) => <FeedbackStage r={r} st={st} setSt={setSt} locked={locked} interact={interact} />}
  </Lesson>;
}

function FeedbackStage({ r, st, setSt, locked, interact }: { r: FeedbackRetrieval; st: FeedbackState; setSt: Dispatch<SetStateAction<FeedbackState>>; locked: boolean; interact: () => void }) {
  const { reach } = useMilestones(interact, ["count", "marks"]);
  const mode = locked ? null : st.mode;
  const marks = markAttempt(r, st.tried), open = marks.every(Boolean);
  const status = `${st.tries} tries · ${open ? "open" : "still locked"}`;
  const show = (m: "count" | "marks") => { setSt((p) => ({ ...p, mode: m, seen: { ...p.seen, [m]: true } })); reach(m); };
  const turn = (i: number) => setSt((p) => ({ ...p, attempt: p.attempt.map((c, k) => k === i ? nextChoice(r.choices[i], c) : c) }));
  const retry = () => setSt((p) => p.attempt.every((c, i) => c === p.tried[i]) ? p : ({ ...p, tried: [...p.attempt], tries: p.tries + 1 }));
  const shownMarks: Mark[] = mode === "marks" ? marks : r.code.map(() => null);
  const feedback = mode === "count" ? status : mode === "marks" ? `${status} · ${marks.map((m) => m ? "✓" : "✗").join(" ")}` : "Feedback: pick a kind below";
  return <div className={s.wrap}>
    <div className={s.caption}>{r.name} · last try: {st.tried.map((c, i) => r.choices[i][c]).join(" · ")}</div>
    <Cards cards={st.tried.map((c, i) => ({ top: `${r.label} ${i + 1}`, main: r.choices[i][c] }))} marks={shownMarks}
      label={`Last try ${st.tried.map((c, i) => r.choices[i][c]).join(", ")}. ${mode ? feedback.replace(/✓/g, "right").replace(/✗/g, "wrong") : "No feedback shown yet"}.`} />
    <div className={s.feedbackLine} aria-hidden="true">{locked ? "Feedback: ?" : feedback}</div>
    <div className={s.controls}>
      <StageControl locked={locked} inactive={mode === "count"} aria-pressed={mode === "count"} onClick={() => show("count")}>{r.countButton}</StageControl>
      <StageControl locked={locked} inactive={mode === "marks"} aria-pressed={mode === "marks"} onClick={() => show("marks")}>{r.markButton}</StageControl>
    </div>
    <div className={s.controls}>
      {st.attempt.map((c, i) => <StageControl key={i} locked={locked} className={s.slot} onClick={() => turn(i)} aria-label={`${r.label} ${i + 1}: ${r.choices[i][c]}. Tap to change`}>
        <span className={s.slotCue}>{r.label} {i + 1}</span><strong>{r.choices[i][c]}</strong></StageControl>)}
      <StageControl locked={locked} inactive={open || st.attempt.every((c, i) => c === st.tried[i])} onClick={retry}>{r.retryButton}</StageControl>
    </div>
    <Chips locked={locked} items={[["First try, count only", !locked && st.seen.count ? `${r.tries} tries` : "?"], ["First try, marked", !locked && st.seen.marks ? `${markAttempt(r, r.attempt).filter((m) => !m).length} wrong` : "?"]]} />
  </div>;
}
