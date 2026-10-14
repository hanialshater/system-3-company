"use client";

// Engines v2 Study stage (W-608, company/design/specs/lifehacks-engines-v2.md section 4). Only lessons with
// `engine: 2` reach this file; StudyLesson.tsx keeps the v1 stage byte for byte for everything else.
// Families with a v2 stage: schedule, files, message, recall (STUDY_V2_FAMILIES). Mode A and mode B are the two
// fixture snapshots; the exploration control (schedule Start slider, recall swaps) fills a live "Yours" column.

import { useId, useState } from "react";
import { Lesson } from "@/kit/Lesson";
import { Slider } from "@/kit/controls";
import { ModeControl, StageControl, StageStatus } from "./a11y";
import { SeenTable, type SeenRow } from "./SeenTable";
import { useMilestones } from "@/kit/milestones";
import { fileResult, reconstructionMatches, swapPositions, type FilesSpec, type MessageSpec, type RecallSpec, type ScheduleSpec, type StudySpec } from "@/lib/lifehacks/studyModels";
import { RECALL_INITIAL, messageFilled, recallColumn, scheduleColumn, scheduleStarts, studyColumn, studyHasYours, studyRevealLine, type Mode, type StudyColumn } from "@/lib/lifehacks/engine-v2";
import s from "./StudyLesson.module.css";

type View = Mode | "yours" | null;
interface V2State { view: View; seen: Record<Mode, boolean>; starts: number[]; order: number[]; yoursSeen: boolean }
const textColor = "var(--fg)";

function initial(spec: StudySpec): V2State {
  return { view: null, seen: { a: false, b: false }, starts: spec.family === "schedule" ? scheduleStarts(spec, "a") : [], order: [...RECALL_INITIAL], yoursSeen: false };
}
function Frame({ label, children }: { label: string; children: React.ReactNode }) {
  return <svg viewBox="0 0 320 142" className={`stage-svg ${s.diagram}`} role="img" aria-label={label}>{children}</svg>;
}

function yoursColumn(spec: StudySpec, st: V2State): StudyColumn | null {
  if (!st.yoursSeen) return null;
  if (spec.family === "schedule") return scheduleColumn(spec, st.starts, null);
  if (spec.family === "recall") return st.seen.b ? recallColumn(spec, "yours", st.order) : { amounts: [], result: ["Match", "not checked"] };
  return null;
}

/** The Seen table rows: amounts first, then the result row; "?" until a column is seen. */
function seenRows(spec: StudySpec, st: V2State, locked: boolean): SeenRow[] {
  const cols = { a: studyColumn(spec, "a"), b: studyColumn(spec, "b") };
  const yours = yoursColumn(spec, st);
  const hasYours = studyHasYours(spec);
  const cell = (m: Mode, value: string) => !locked && st.seen[m] ? value : "?";
  const labels = cols.a.amounts.map(([l]) => l);
  const rows: SeenRow[] = labels.map((label, i) => ({ label, cells: [cell("a", cols.a.amounts[i][1]), cell("b", cols.b.amounts[i][1]), ...(hasYours ? [yours?.amounts[i]?.[1] ?? "–"] : [])] }));
  rows.push({ label: cols.a.result[0], cells: [cell("a", cols.a.result[1]), cell("b", cols.b.result[1]), ...(hasYours ? [yours && !locked ? yours.result[1] : "–"] : [])] });
  return rows;
}

export function StudyLessonV2({ slug, spec }: { slug: string; spec: StudySpec }) {
  const [st, setSt] = useState<V2State>(() => initial(spec));
  const hint = spec.exploreHint ?? `Press A, then B.${spec.family === "schedule" ? " Then move the start." : spec.family === "recall" ? " Then swap the attempt into order." : ""}`;
  return <Lesson
    slug={slug}
    predict={{ question: spec.question, options: spec.options, answer: spec.answer }}
    minInteractions={2}
    exploreHint={hint}
    reveal={({ prediction }) => <><p>{studyRevealLine(spec, prediction, yoursColumn(spec, st))}</p><p>{spec.principle}</p></>}
  >
    {({ locked, interact }) => <StageV2 spec={spec} st={st} setSt={setSt} locked={locked} interact={interact} />}
  </Lesson>;
}

function StageV2({ spec, st, setSt, locked, interact }: { spec: StudySpec; st: V2State; setSt: React.Dispatch<React.SetStateAction<V2State>>; locked: boolean; interact: () => void }) {
  const { reach } = useMilestones(interact, ["tested-a", "tested-b"]);
  const hatch = `lh-hatch-${useId().replace(/[^a-zA-Z0-9_-]/g, "")}`;
  const hatchDefs = <defs><pattern id={hatch} width="6" height="6" patternUnits="userSpaceOnUse" patternTransform="rotate(45)"><line x1="0" y1="0" x2="0" y2="6" stroke={textColor} strokeWidth="1.5" strokeOpacity=".6" /></pattern></defs>;
  const [A, B] = spec.modeLabels ?? ["A", "B"];
  // Pressing a mode puts that fixture on the stage (and resets the exploration state to it).
  const press = (m: Mode) => {
    setSt((p) => ({ ...p, view: m, seen: { ...p.seen, [m]: true }, starts: spec.family === "schedule" ? scheduleStarts(spec, m) : p.starts, order: [...RECALL_INITIAL] }));
    reach(m === "a" ? "tested-a" : "tested-b");
  };
  const view: View = locked ? null : st.view;
  const hasYours = studyHasYours(spec);
  const rows = seenRows(spec, st, locked);
  const columns = [{ head: "A", current: view === "a" }, { head: "B", current: view === "b" }, ...(hasYours ? [{ head: "Yours", current: view === "yours" }] : [])];
  const col = view === "a" ? 0 : view === "b" ? 1 : view === "yours" ? 2 : -1;
  const status = col < 0 ? "" : `${col === 0 ? A : col === 1 ? B : "Yours"}: ${rows.map((r) => `${r.label} ${r.cells[col]}`).join("; ")}`;
  const modes = <>
    <ModeControl locked={locked} pressed={view === "a"} letter="A" label={A} onPress={() => press("a")} />
    <ModeControl locked={locked} pressed={view === "b"} letter="B" label={B} onPress={() => press("b")} />
  </>;
  const table = <SeenTable label="Seen results" columns={columns} rows={rows} labelWidth={hasYours ? "31%" : "34%"} />;
  const tail = <StageStatus locked={locked} text={status} />;

  if (spec.family === "schedule") {
    const shownStarts = st.starts;
    const limit = 100, x = (v: number) => 82 + v / limit * 220, w = (m: number) => m / limit * 220;
    const label = view
      ? `One-person calendar, ${view === "yours" ? "your layout" : view === "a" ? A : B}: ${spec.rows.map((r, i) => `${r.label} ${shownStarts[i]} to ${shownStarts[i] + r.duration}${spec.event?.row === i ? `, plus ${spec.event.minutes} late` : ""}`).join("; ")}.`
      : `One-person calendar: ${spec.rows.map((r, i) => `${r.label} ${shownStarts[i]} to ${shownStarts[i] + r.duration}${spec.event?.row === i ? `, plus ${spec.event.minutes} late` : ""}`).join("; ")}. Results not yet tested.`;
    return <div className={s.wrap}>
      <div className={s.caption}>One person · minutes</div>
      <Frame label={label}>
        {hatchDefs}
        {spec.rows.map((r, i) => {
          const start = shownStarts[i], late = spec.event?.row === i ? spec.event : null;
          const range = r.parts ? r.parts.map((part) => `${part.label} ${part.minutes}`).join(" · ") : `${start}–${start + r.duration}${late ? ` ${late.label}` : ""}`;
          let offset = 0;
          return <g key={r.label}>
            <text x="2" y={32 + i * 36} fill={textColor} className={s.rowLabel}>{r.label}</text>
            {r.parts
              ? r.parts.map((part, k) => { const at = offset; offset += part.minutes; return <rect key={k} x={x(start + at)} y={15 + i * 36} width={w(part.minutes)} height="19" rx="3" fill={k === 0 ? "var(--bg-2)" : i === spec.movable ? "var(--domain)" : "var(--line)"} stroke={textColor} />; })
              : <rect x={x(start)} y={15 + i * 36} width={w(r.duration)} height="19" rx="4" fill={i === spec.movable ? "var(--domain)" : "var(--line)"} stroke={textColor} />}
            {i === spec.movable && <rect x={x(start)} y={15 + i * 36} width={w(r.duration)} height="19" rx="4" fill={`url(#${hatch})`} stroke={textColor} strokeWidth="2" />}
            {late && <rect x={x(start + r.duration)} y={15 + i * 36} width={w(late.minutes)} height="19" fill={`url(#${hatch})`} stroke="var(--bad)" strokeWidth="2" strokeDasharray="3 2" />}
            <text x={x(start)} y={46 + i * 36} fill={textColor}>{range}</text>
          </g>;
        })}
        <text x="82" y="140" fill={textColor}>0</text><text x="302" y="140" textAnchor="end" fill={textColor}>100</text>
      </Frame>
      {table}
      <div className={s.controls}>{modes}</div>
      <Slider label={`Start (${spec.rows[spec.movable].label})`} value={shownStarts[spec.movable]} min={0} max={70} disabled={locked} format={(v) => `${v} min`}
        onChange={(v) => setSt((p) => ({ ...p, view: "yours", yoursSeen: true, starts: p.starts.map((n, i) => i === spec.movable ? v : n) }))} />
      {tail}
    </div>;
  }

  if (spec.family === "recall") return <RecallV2 spec={spec} st={st} setSt={setSt} view={view} locked={locked} modes={modes} table={table} tail={tail} />;
  if (spec.family === "files") return <FilesV2 spec={spec} view={view} modes={modes} table={table} tail={tail} />;
  if (spec.family === "message") return <MessageV2 spec={spec} view={view} modes={modes} table={table} tail={tail} />;
  throw new Error(`No v2 stage for the ${spec.family} family (${spec.slug})`);
}

type Parts = { view: View; modes: React.ReactNode; table: React.ReactNode; tail: React.ReactNode };

function RecallV2({ spec, st, setSt, view, locked, modes, table, tail }: Parts & { spec: RecallSpec; st: V2State; setSt: React.Dispatch<React.SetStateAction<V2State>>; locked: boolean }) {
  const order = view === "yours" ? st.order : [...RECALL_INITIAL];
  const checking = view === "b" || (view === "yours" && st.seen.b);
  const targetShown = checking || (!spec.hideTarget && view === null);
  const matches = reconstructionMatches(spec.words, order);
  // A vague-cue lesson (it declares `candidates`) shows the same cue on every target box in mode A.
  const cues = spec.candidates && (view === "a" || view === null) ? spec.labels.map(() => "capital?") : spec.labels;
  const [targetLabel, attemptLabel] = spec.rowLabels ?? ["target", "your attempt"];
  const swap = (i: number, j: number) => setSt((p) => ({ ...p, view: "yours", yoursSeen: true, order: swapPositions(p.order, i, j) }));
  const words = spec.words.map((word) => targetShown ? word : "?");
  const label = `${targetLabel}: ${spec.labels.map((l, i) => `${cues[i]} ${words[i] === "?" ? "covered" : words[i]}`).join(", ")}. ${attemptLabel}: ${order.map((id) => spec.words[id]).join(", ")}. ${checking ? `${matches.filter(Boolean).length} of ${spec.words.length} in place` : "Not checked"}.`;
  return <div className={s.wrap}>
    <Frame label={label}>
      <text x="7" y="11" fill="var(--muted)" className={s.rowLabel}>{targetLabel}</text>
      <text x="7" y="76" fill="var(--muted)" className={s.rowLabel}>{attemptLabel}</text>
      {spec.words.map((_, i) => <g key={i}>
        <rect x={7 + i * 106} y="16" width="94" height="44" rx="9" fill="var(--bg-2)" stroke="var(--line)" />
        <text x={54 + i * 106} y="31" textAnchor="middle" fill="var(--muted)" className={s.rowLabel}>{cues[i]}</text>
        <text x={54 + i * 106} y="51" textAnchor="middle" fill={textColor}>{words[i]}</text>
        <rect x={7 + i * 106} y="82" width="94" height="42" rx="9" fill="var(--bg-2)" stroke={checking ? (matches[i] ? "var(--good)" : "var(--bad)") : "var(--lh-ink)"} strokeWidth="2" />
        <text x={54 + i * 106} y="109" textAnchor="middle" fill={textColor}>{spec.words[order[i]]}</text>
        {checking && <text x={93 + i * 106} y="97" textAnchor="end" fill={matches[i] ? "var(--good)" : "var(--bad)"} fontWeight={700} aria-hidden="true">{matches[i] ? "✓" : "✗"}</text>}
      </g>)}
    </Frame>
    {table}
    <div className={s.controls}>
      {modes}
      <StageControl locked={locked} onClick={() => swap(0, 1)}>Swap 1↔2</StageControl>
      <StageControl locked={locked} onClick={() => swap(1, 2)}>Swap 2↔3</StageControl>
    </div>
    {tail}
  </div>;
}

function FilesV2({ spec, view, modes, table, tail }: Parts & { spec: FilesSpec }) {
  const step = view === "a" ? 1 : view === "b" ? 2 : 0;
  const v = fileResult(spec, step);
  const transforms = ["dateNames", "versions", "prefix", "extension", "paths", "sort"];
  const shown = transforms.includes(spec.operation) ? v.rows : spec.items;
  const label = step ? `${view === "a" ? spec.modeLabels?.[0] : spec.modeLabels?.[1]}: ${shown.map((r) => `${r.name} ${v.rows.some((x) => x.name === r.name && x.value === r.value) || transforms.includes(spec.operation) ? r.value : "not in results"}`).join("; ")}.` : `Exercise records: ${spec.items.map((r) => `${r.name} ${r.value}`).join("; ")}. Results not yet tested.`;
  return <div className={s.wrap}>
    <div className={s.caption}>Exercise records</div>
    <Frame label={label}>
      {shown.map((item, i) => {
        const inResults = !step || transforms.includes(spec.operation) || v.rows.some((r) => r.name === item.name && r.value === item.value);
        return <g key={i}>
          <rect x="6" y={7 + i * 32} width="308" height="28" rx="5" fill="var(--bg-2)" stroke={step && inResults ? "var(--lh-ink)" : "var(--line)"} strokeDasharray={inResults ? undefined : "4 3"} />
          <path d={`M12 ${13 + i * 32} h7 l3 3 v12 h-10 Z`} fill="none" stroke={textColor} />
          <text x="28" y={25 + i * 32} fill={textColor} className={s.fileName}>{item.name}</text>
          {!inResults && <line x1="27" x2={30 + item.name.length * 6.6} y1={21 + i * 32} y2={21 + i * 32} stroke={textColor} strokeWidth="1.5" />}
          <text x="306" y={25 + i * 32} textAnchor="end" fill="var(--muted)" className={s.fileValue}>{inResults ? item.value : "not in results"}</text>
        </g>;
      })}
    </Frame>
    {table}
    <div className={s.controls}>{modes}</div>
    {tail}
  </div>;
}

function MessageV2({ spec, view, modes, table, tail }: Parts & { spec: MessageSpec }) {
  const filled = messageFilled(spec, view === "b" ? "b" : view === "a" ? "a" : null);
  return <div className={s.wrap}>
    <div className={s.caption}>Exercise checklist</div>
    <Frame label={`Note fields ${spec.fields.map((f, i) => `${f}: ${i < filled ? spec.words[i] : "missing"}`).join("; ")}`}>
      {spec.fields.map((field, i) => <g key={field}>
        <rect x="10" y={6 + i * 43} width="300" height="36" rx="6" fill="var(--bg-2)" stroke={i < filled ? "var(--lh-ink)" : "var(--line)"} />
        <text x="24" y={29 + i * 43} fill="var(--muted)">{field}</text>
        <text x="294" y={29 + i * 43} textAnchor="end" fill={textColor}>{i < filled ? spec.words[i] : "?"}</text>
      </g>)}
    </Frame>
    {table}
    <div className={s.controls}>{modes}</div>
    {tail}
  </div>;
}
