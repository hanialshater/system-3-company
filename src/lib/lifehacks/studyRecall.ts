/**
 * TP-3 retrieval stage for v1 recall lessons (company/decisions/2026-10-15-lifehacks-r11-fix-plan.md).
 * A recall spec opts in with a `retrieval` field; specs without it (rebuild-the-procedure) keep the v1 swap stage.
 * The attempt starts empty, the studied card is covered while the learner answers, and every answer box
 * cycles through a fixed list of choices that includes plausible wrong ones, so a miss is possible.
 * Pure and deterministic: no randomness, no rendering imports.
 */

/** One box of the studied card: a small label above the main text. */
export interface StudyCard { top?: string; main: string }
/** One answer box: the cue it shows, the right answer and the fixed cycle of choices (the answer is one of them). */
export interface RetrievalPrompt { cue: string; answer: string; choices: string[] }
/** A row of answer boxes checked together. `fits`: how many studied items this row's cue matches (shown after the check). */
export interface RetrievalRow { label: string; check: string; prompts: RetrievalPrompt[]; fits?: string }

/** Cover-and-answer lessons: study a card at predict, answer one or two rows of boxes with the card covered. */
export interface RowsRetrieval {
  kind: "rows";
  hint: string;
  studyCaption: string;
  caption: string;
  study: StudyCard[];
  covered: StudyCard[];
  /** Word drawn on the arrows between studied boxes (a chain); arrows are hidden while covered. */
  arrow?: string;
  rows: RetrievalRow[];
  /** A readout for the other kind of check, which needs no attempt (answers showing, words listed). */
  contrast?: [string, string];
  /** First reveal sentence, about the contrast readout. */
  lead?: string;
  /** Reveal sentence when every checked row is fully right. */
  allRight?: string;
}
/** One compound card versus three single cards, scored on the same stipulated attempt. */
export interface CompoundRetrieval {
  kind: "compound";
  hint: string;
  caption: string;
  card: string;
  parts: Array<{ label: string; given: string; answer: string }>;
  one: string;
  split: string;
}
/** Feedback after a stipulated wrong attempt: a try count alone, or each item marked. */
export interface FeedbackRetrieval {
  kind: "feedback";
  hint: string;
  /** What the code opens, shown in the caption. */
  name: string;
  label: string;
  code: string[];
  choices: string[][];
  /** Index into each item's choices: the stipulated attempt. */
  attempt: number[];
  tries: number;
  countButton: string;
  markButton: string;
  retryButton: string;
}
export type Retrieval = RowsRetrieval | CompoundRetrieval | FeedbackRetrieval;

/** No choice yet: the box shows "?". */
export const EMPTY = -1;

/** One tap moves a box to its next choice; an empty box shows the first. */
export function nextChoice(choices: readonly string[], current: number): number {
  return current < 0 ? 0 : (current + 1) % choices.length;
}

export interface RowResult { marks: boolean[]; right: number; total: number; complete: boolean; misses: Array<{ cue: string; answer: string; chose: string }> }

/** Score a row of picks against its answers. An empty box counts as a miss and makes the row incomplete. */
export function scoreRow(row: RetrievalRow, picks: readonly number[]): RowResult {
  const marks = row.prompts.map((p, i) => picks[i] >= 0 && p.choices[picks[i]] === p.answer);
  const misses = row.prompts.flatMap((p, i) => marks[i] ? [] : [{ cue: p.cue, answer: p.answer, chose: picks[i] >= 0 ? p.choices[picks[i]] : "nothing" }]);
  return { marks, right: marks.filter(Boolean).length, total: row.prompts.length, complete: picks.length === row.prompts.length && picks.every((p) => p >= 0), misses };
}

/** Per-item marks for a feedback attempt (choice indices) against the code. */
export function markAttempt(spec: FeedbackRetrieval, attempt: readonly number[]): boolean[] {
  return spec.code.map((c, i) => spec.choices[i][attempt[i]] === c);
}

/** Problems in a retrieval fixture; empty when it is usable. Checked by the build, not by the learner. */
export function retrievalProblems(r: Retrieval): string[] {
  const out: string[] = [];
  if (r.kind === "rows") {
    if (r.study.length !== r.covered.length) out.push("study and covered differ in length");
    for (const row of r.rows) for (const p of row.prompts) {
      if (!p.choices.includes(p.answer)) out.push(`${p.cue}: answer not among choices`);
      if (p.choices.length < 2) out.push(`${p.cue}: no distractor`);
      if (new Set(p.choices).size !== p.choices.length) out.push(`${p.cue}: repeated choice`);
    }
  } else if (r.kind === "feedback") {
    r.code.forEach((c, i) => { if (!r.choices[i]?.includes(c)) out.push(`item ${i + 1}: code not among choices`); });
    if (markAttempt(r, r.attempt).every(Boolean)) out.push("the stipulated attempt has no error");
  } else if (r.parts.every((p) => p.given === p.answer)) out.push("the stipulated attempt has no miss");
  return out;
}
