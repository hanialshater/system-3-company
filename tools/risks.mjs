#!/usr/bin/env node
// Risk register report and check (read-only). Register: company/ops/risks.json; format: company/ops/risks.md.
//   node tools/risks.mjs report [--top=N] [--json]   top risks by likelihood x impact; exit 1 on a malformed entry
//   node tools/risks.mjs check                       validation only; exit 1 on a malformed entry
// Owner: principal-engineer-ops. It never writes a file.
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const CATEGORIES = ["operational", "data", "security", "ux", "strategic"];
const STATUSES = ["open", "mitigating", "accepted", "closed"];
const REALITY = ["in-place", "partial", "paper"];

export function validate(reg, { board = null, exists = () => true } = {}) {
  const errors = [];
  const warnings = [];
  if (!reg || !Array.isArray(reg.risks)) return { errors: ["risks.json has no `risks` array"], warnings };
  const seen = new Set();
  for (const [i, r] of reg.risks.entries()) {
    const at = r?.id ?? `entry ${i}`;
    const bad = (m) => errors.push(`${at}: ${m}`);
    if (!/^R-\d{3}$/.test(r?.id ?? "")) bad("id must be R-NNN");
    if (seen.has(r.id)) bad("duplicate id");
    seen.add(r.id);
    for (const k of ["title", "description", "owner", "opened", "lastReviewed"]) if (typeof r[k] !== "string" || !r[k].trim()) bad(`missing ${k}`);
    if (!CATEGORIES.includes(r.category)) bad(`category must be one of ${CATEGORIES.join(", ")}`);
    for (const k of ["likelihood", "impact"]) if (!Number.isInteger(r[k]) || r[k] < 1 || r[k] > 5) bad(`${k} must be an integer 1-5`);
    if (!STATUSES.includes(r.status)) bad(`status must be one of ${STATUSES.join(", ")}`);
    for (const k of ["opened", "lastReviewed"]) if (r[k] && !/^\d{4}-\d{2}-\d{2}$/.test(r[k])) bad(`${k} must be YYYY-MM-DD`);
    const m = r.mitigation;
    if (!m || typeof m.summary !== "string" || !m.summary.trim()) bad("mitigation.summary missing");
    else {
      if (!REALITY.includes(m.reality)) bad(`mitigation.reality must be one of ${REALITY.join(", ")}`);
      if (m.reality !== "in-place" && !(m.paperOnly ?? "").trim()) bad("mitigation.paperOnly must say what exists only on paper");
      if (r.status !== "accepted" && r.status !== "closed" && (!Array.isArray(m.board) || m.board.length === 0)) bad("mitigation.board needs at least one board id (or status accepted)");
      for (const id of m.board ?? []) {
        if (!/^W-\d+$/.test(id)) bad(`board id ${id} is not W-<n>`);
        else if (board && !board.has(id)) bad(`board id ${id} not on company/ops/board.json`);
      }
    }
    if (!Array.isArray(r.links)) bad("links must be an array");
    else for (const l of r.links) if (!exists(l)) bad(`link not on disk: ${l}`);
    if (r.status === "accepted" && !(r.acceptedBy ?? "").trim()) bad("an accepted risk names acceptedBy (a role) and why, in acceptedWhy");
  }
  return { errors, warnings };
}

export const score = (r) => r.likelihood * r.impact;
export const ranked = (risks) =>
  [...risks].filter((r) => r.status !== "closed").sort((a, b) => score(b) - score(a) || b.impact - a.impact || a.id.localeCompare(b.id));

if (process.argv[1] && fileURLToPath(import.meta.url) === path.resolve(process.argv[1])) {
  const cmd = process.argv[2] ?? "report";
  const arg = (k, d) => (process.argv.find((a) => a.startsWith(`--${k}=`)) ?? `=${d}`).split("=")[1];
  const reg = JSON.parse(fs.readFileSync(path.join(ROOT, "company/ops/risks.json"), "utf8"));
  let board = null;
  try { board = new Set(JSON.parse(fs.readFileSync(path.join(ROOT, "company/ops/board.json"), "utf8")).items.map((x) => x.id)); } catch {}
  const { errors } = validate(reg, { board, exists: (l) => fs.existsSync(path.join(ROOT, l)) });
  if (cmd === "report") {
    const top = Number(arg("top", 10));
    const rows = ranked(reg.risks).slice(0, top);
    if (process.argv.includes("--json")) console.log(JSON.stringify(rows.map((r) => ({ id: r.id, score: score(r), ...r })), null, 2));
    else {
      console.log(`Risk register: ${reg.risks.length} entries, ${reg.risks.filter((r) => r.status !== "closed").length} not closed. Top ${rows.length} by likelihood x impact:`);
      for (const r of rows)
        console.log(`${String(score(r)).padStart(2)}  ${r.id}  L${r.likelihood} I${r.impact}  ${r.category.padEnd(11)} ${r.status.padEnd(10)} ${(r.mitigation?.reality ?? "?").padEnd(8)} ${r.owner.padEnd(26)} ${r.title}`);
      const paper = reg.risks.filter((r) => r.status !== "closed" && r.mitigation?.reality === "paper").map((r) => r.id);
      console.log(`Mitigation only on paper: ${paper.length ? paper.join(", ") : "none"}`);
    }
  } else if (cmd !== "check") {
    console.error("usage: node tools/risks.mjs report [--top=N] [--json] | check");
    process.exit(2);
  }
  if (errors.length) {
    console.error(`\n${errors.length} malformed entr${errors.length === 1 ? "y" : "ies"}:`);
    for (const e of errors) console.error(`  ${e}`);
    process.exit(1);
  }
  if (cmd === "check") console.log(`risks.json ok: ${reg.risks.length} entries`);
}
