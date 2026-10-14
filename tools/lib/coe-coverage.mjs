// COE coverage for dispatch-check rule R2 (W-715, tightened by W-782).
// A SEV1/SEV2 incident event is covered only by a COE record that
//   1. sits directly in company/rituals/records/ with a name starting YYYY-MM-DD-coe,
//   2. has, in its HEADER (the lines before the first `## ` heading), `status: final`,
//      `incident: <ev-id>` naming the incident, and `reviewers: <role>, <role>`,
//   3. has, for EACH named reviewer, a `## Review (<role>, YYYY-MM-DD)` section whose `verdict:` line says
//      `accept` (if a reviewer has several sections, the last one counts), and
//   4. names no reviewer who is also the `owner:`.
// Why: before W-782 any line anywhere starting `status: final` cleared an incident, so R2 read the author's own
// word (evaluation-steward review in company/rituals/records/2026-10-14-coe-ci-queue.md, "R2 proposal").
// Header fields may share a line, separated by " · " (e.g. `owner: x (author) · reviewers: a, b`).
import fs from "node:fs";
import path from "node:path";

export const isSevere = (e) => e?.type === "incident" && /SEV ?[12]\b/i.test(e.summary ?? "");

const role = (s) => (String(s).trim().match(/^[a-z0-9][a-z0-9-]*/i)?.[0] ?? "").toLowerCase();

// Header fields: { key: [values] } from the lines before the first `## `.
export function headerFields(text) {
  const head = [];
  for (const l of text.split("\n")) { if (/^##\s/.test(l)) break; head.push(l); }
  const fields = {};
  for (const line of head) for (const seg of line.split(/\s+·\s+/)) {
    const m = seg.match(/^\s*([a-z][a-z0-9_-]*):\s*(.*)$/i);
    if (m) (fields[m[1].toLowerCase()] ??= []).push(m[2].trim());
  }
  return fields;
}

// Review sections: Map role -> verdict of its last `## Review (<role>, <date>)` section ("" if no verdict line).
export function reviewVerdicts(text) {
  const out = new Map();
  const parts = text.split(/^(?=##\s)/m);
  for (const p of parts) {
    const h = p.match(/^##\s+Review\s*\(\s*([a-z0-9-]+)\s*,\s*\d{4}-\d{2}-\d{2}\s*\)/i);
    if (!h) continue;
    const v = p.match(/^verdict:\s*([a-z-]+)/im);
    out.set(h[1].toLowerCase(), v ? v[1].toLowerCase() : "");
  }
  return out;
}

// Read one COE text into { final, incidents, owner, reviewers, verdicts, covers, why }.
export function parseCoe(text) {
  const f = headerFields(text);
  const final = (f.status ?? []).some((v) => /^final\b/i.test(v));
  const incidents = (f.incident ?? []).flatMap((v) => v.match(/\bev-[0-9a-z]+\b/gi) ?? []);
  const owner = role((f.owner ?? [""])[0]);
  const reviewers = [...new Set((f.reviewers ?? []).flatMap((v) => v.split(",")).map(role).filter(Boolean))];
  const verdicts = reviewVerdicts(text);
  let why = "";
  if (!final) why = "is not status: final (in its header)";
  else if (!reviewers.length) why = "has no reviewers: line in its header";
  else if (owner && reviewers.includes(owner)) why = `names its owner ${owner} as a reviewer`;
  else {
    const missing = reviewers.filter((r) => !verdicts.has(r));
    const notAccept = reviewers.filter((r) => verdicts.has(r) && verdicts.get(r) !== "accept");
    const reasons = [
      ...notAccept.map((r) => `${verdicts.get(r) || "no verdict"} by ${r}`),
      ...missing.map((r) => `no review by ${r}`),
    ];
    if (reasons.length) why = reasons.join(", ");
  }
  return { final, incidents, owner, reviewers, verdicts: Object.fromEntries(verdicts), covers: !why, why };
}

// Read the COE records in recDir: [{ file, final, incidents, owner, reviewers, verdicts, covers, why }].
export function readCoes(recDir) {
  if (!fs.existsSync(recDir)) return [];
  return fs.readdirSync(recDir)
    .filter((f) => /^\d{4}-\d{2}-\d{2}-coe.*\.md$/.test(f) && fs.statSync(path.join(recDir, f)).isFile())
    .sort()
    .map((f) => ({ file: f, ...parseCoe(fs.readFileSync(path.join(recDir, f), "utf8")) }));
}

// Split severe incidents into covered and uncovered. Each uncovered item says why.
export function coeCoverage(events, recDir) {
  const coes = readCoes(recDir);
  const coverIds = new Set(coes.filter((c) => c.covers).flatMap((c) => c.incidents));
  const whyById = new Map();
  for (const c of coes) for (const id of c.incidents) if (!whyById.has(id)) whyById.set(id, `COE ${c.file} ${c.why}`);
  const covered = [], uncovered = [];
  for (const e of events.filter(isSevere)) {
    if (e.id && coverIds.has(e.id)) covered.push(e);
    else uncovered.push({ ...e, why: (e.id && whyById.get(e.id)) || "no COE record names this incident id in its header" });
  }
  return { covered, uncovered, coes };
}
