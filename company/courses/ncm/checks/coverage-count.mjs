#!/usr/bin/env node
// Recounts NCM section coverage from content/courses/ncm/chapters.json and src/demos, and flags map rows
// that have drifted (a covered_by slug with no lesson, a stale status, a not_yet_published list that is wrong,
// an NCM-referenced lesson missing from the map). Run from the repo root:
//   node company/courses/ncm/checks/coverage-count.mjs
// Owner: cm-course-ncm, 2026-10-16. Prints; writes nothing.
import fs from "node:fs";
import path from "node:path";

const root = process.cwd();
const map = JSON.parse(fs.readFileSync(path.join(root, "content/courses/ncm/chapters.json"), "utf8"));
const lessons = {};
for (const dom of fs.readdirSync(path.join(root, "src/demos"))) {
  const dp = path.join(root, "src/demos", dom);
  if (!fs.statSync(dp).isDirectory()) continue;
  for (const slug of fs.readdirSync(dp)) {
    const p = path.join(dp, slug, "meta.json");
    if (!fs.existsSync(p)) continue;
    const m = JSON.parse(fs.readFileSync(p, "utf8"));
    lessons[slug] = { status: m.status, ncm: (m.curriculum?.references ?? []).some((r) => r.work === map.work) };
  }
}
const drift = [];
const inMap = new Set();
let sections = 0, demoable = 0, built = 0, published = 0;
const gaps = [], reviewOnly = [];
for (const ch of map.chapters) for (const s of ch.sections) {
  sections++;
  for (const l of s.covered_by) { inMap.add(l); if (!lessons[l]) drift.push(`${s.id}: covered_by ${l} has no lesson`); }
  const live = s.covered_by.filter((l) => lessons[l]);
  const want = !s.demoable ? "not-demoable" : live.length ? "covered" : "gap";
  if (s.status !== want) drift.push(`${s.id}: status ${s.status}, should be ${want}`);
  const np = Object.fromEntries(live.filter((l) => lessons[l].status !== "published").map((l) => [l, lessons[l].status]));
  if (JSON.stringify(np) !== JSON.stringify(s.not_yet_published ?? {})) drift.push(`${s.id}: not_yet_published should be ${JSON.stringify(np)}`);
  for (const l of s.briefed_not_built ?? []) if (lessons[l]) drift.push(`${s.id}: ${l} is built; move it to covered_by`);
  if (!s.demoable) continue;
  demoable++;
  if (!live.length) { gaps.push(s.id); continue; }
  built++;
  if (live.some((l) => lessons[l].status === "published")) published++; else reviewOnly.push(s.id);
}
for (const [slug, l] of Object.entries(lessons)) if (l.ncm && !inMap.has(slug)) drift.push(`${slug}: cites ${map.work} but is in no covered_by`);
const ref = Object.values(lessons).filter((l) => l.ncm);
const by = (xs) => xs.reduce((o, l) => ((o[l.status] = (o[l.status] ?? 0) + 1), o), {});
const pct = (a, b) => `${((100 * a) / b).toFixed(1)}%`;
console.log(`sections ${sections} · demo-able ${demoable} · built ${built} (${pct(built, demoable)}) · published ${published} (${pct(published, demoable)})`);
console.log(`gaps: ${gaps.join(", ") || "none"} · covered only by unpublished lessons: ${reviewOnly.join(", ") || "none"}`);
console.log(`lessons in map ${inMap.size} ${JSON.stringify(by([...inMap].filter((l) => lessons[l]).map((l) => lessons[l])))} · NCM-referenced ${ref.length} ${JSON.stringify(by(ref))}`);
console.log(drift.length ? `DRIFT (${drift.length}):\n  ${drift.join("\n  ")}` : "map in sync with src/demos");
