// The hidden acceptance rubric for the quiz-pack benchmark (Benchmark 2): both arms are judged by this file.
import fs from "node:fs";
import path from "node:path";
export const ROOT = () => process.env.BOOK_ROOT;
const syl = (w) => Math.max(1, (w.toLowerCase().replace(/e\b/, "").match(/[aeiouy]+/g) || []).length);
const BANNED = ["stupid", "dumb", "kill", "dead", "blood", "hate"];
export const read = (task) => { const f = path.join(ROOT(), task, "page.md"); return fs.existsSync(f) ? fs.readFileSync(f, "utf8") : null; };
export function stats(text) {
  const lines = text.split("\n");
  const body = lines.filter((l) => !/^#/.test(l)).join(" ").replace(/\*\*/g, "");
  const words = body.split(/\s+/).filter((w) => /[\p{L}\p{N}]/u.test(w));
  const sentences = Math.max(1, (body.match(/[.!?]+(\s|$)/g) || []).length);
  const ease = 206.835 - 1.015 * (words.length / sentences) - 84.6 * (words.reduce((s, w) => s + syl(w.replace(/[^\p{L}]/gu, "")), 0) / Math.max(1, words.length));
  return { words: words.length, ease, banned: BANNED.filter((b) => new RegExp(`\\b${b}\\b`, "i").test(text)) };
}
export function round(task) {
  const t = read(task);
  if (t == null) return { missing: true };
  const n = Number(task.replace(/\D/g, ""));
  return { ...stats(t), title: new RegExp(`^# Round ${n}: \\S`).test(t.split("\n")[0] ?? ""), q: (t.match(/^\s*\*\*Q\d+\.\*\*/gm) || []).length, a: (t.match(/\*\*Answer:\*\*/g) || []).length, why: (t.match(/\*\*Why:\*\*/g) || []).length, answers: answersOf(t) };
}
export const norm = (s) => s.toLowerCase().replace(/\*\*/g, "").replace(/\([^)]*\)/g, "").replace(/[^a-z0-9 ]/g, " ").replace(/\b(the|a|an|planet|it is|its)\b/g, " ").replace(/\s+/g, " ").trim();
export const answersOf = (t) => [...t.matchAll(/\*\*Answer:\*\*\s*([^\n]*)/g)].map((m) => norm(m[1].split(/[.;,—–-]/)[0]));
export function style() {
  const t = read("STYLE");
  if (t == null) return { missing: true };
  // fixed during the run (2026-10-21, before either arm's STYLE was scored): count only "- Round n:" lines inside the
  // Rounds section; the first version also counted ownership lines such as "- **Round 1** owns …"
  const rounds = (t.split(/^##\s*Rounds[^\n]*\n/im)[1] ?? "").split(/^##\s/m)[0];
  return { format: /^##\s*Format/im.test(t), rounds: (rounds.match(/^\s*[-*]\s*(?:\*\*)?Round\s*\d+(?:\*\*)?\s*:/gim) || []).length };
}
/** Answers repeated across rounds (normalised text). */
export function duplicates(tasks = ["ROUND1", "ROUND2", "ROUND3", "ROUND4", "ROUND5"]) {
  const seen = new Map(), dups = [];
  for (const task of tasks) for (const a of round(task).answers ?? []) { if (!a) continue; if (seen.has(a) && seen.get(a) !== task) dups.push(`${a} (${seen.get(a)}, ${task})`); else seen.set(a, task); }
  return dups;
}
/** Answers repeated across the round sections of one assembled text. */
export function duplicatesIn(text) {
  const parts = text.split(/^(?=# Round \d+:)/m).filter((p) => /^# Round \d+:/.test(p));
  const seen = new Map(), dups = [];
  for (const p of parts) { const r = p.match(/^# Round (\d+)/)[1]; for (const a of answersOf(p)) { if (!a) continue; if (seen.has(a) && seen.get(a) !== r) dups.push(`${a} (round ${seen.get(a)}, round ${r})`); else seen.set(a, r); } }
  return dups;
}
