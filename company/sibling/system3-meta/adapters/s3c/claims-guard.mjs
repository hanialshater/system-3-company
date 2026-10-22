#!/usr/bin/env node
// claims-guard.mjs: the post-check on the fact-check stage (plan 2026-10-21-m4-m7-plan.md §2 stage 5 "check",
// §3 K12 "post-checks on human stages", §4 row `claims-guard.mjs`). It runs at `room leave` of the fact-checker's
// session, before `advance`, against the order worktree. Three jobs, in this order:
//
//   1. Diff guard. `git diff <base>` (committed + staged + unstaged) plus untracked files. Allowed:
//        - src/demos/<d>/<slug>/meta.json, where per claim only status / checkedBy / checkedOn / note change, and new
//          claims are appended as `unverified`; every other key of meta.json is unchanged (compared as data, so a
//          whitespace-only reformat is not a change);
//        - NEW files under company/reviews/<slug>/, narrowed from plan §4's "new files" to the two kinds a checker
//          writes (company/roles/fact-checker.md: "writing company/reviews/<slug>/<date>-fact-check.md"): the dated
//          record (RECORD_RE) and anything inside a scratch folder fc-<date>[-suffix]/ (fc-2026-10-16/, fc-2026-10-17-v2/
//          on disk). The plan's wider rule let a checker plant a learner review or a QA record that the publish gate
//          reads off disk (tools/lib/readiness.mjs loadContext: any file whose name includes "learner", any QA_FILE
//          not QA_NOT_EVIDENCE), turning a "learner review: verdict revise" hold into "published" (review 2026-10-22).
//          So a new name the company reads as gate evidence refuses even when it matches RECORD_RE, judged by running
//          the company's own loadContext on this worktree (evidenceProbe), not by a copy of its rules.
//        - and the index may not hide anything: an assume-unchanged / skip-worktree bit (`git ls-files -v` tag
//          lowercase or "S") makes an edit invisible to `git diff`, while build/QA/walkthrough in the same worktree
//          still see it; untracked files are listed with the repo's .gitignore files only, so .git/info/exclude or a
//          global excludesFile cannot hide a planted file either.
//      Anything else refuses (exit 1, nothing written). This is what stops a checker editing claim text or Demo.tsx
//      and then verifying its own rewrite (maps.json claims risks[3]; company/roles/fact-checker.md "Out of scope:
//      Editing Demo.tsx or claim text"), and what keeps the single-writer files (board.json, progress.md,
//      events.jsonl, founder-inbox.json) out of a checker's leave (plan §6 risk 1).
//   2. Stamp. Code, not the agent, writes the signature (plan §M4 risks "Independence": "an agent never types
//      checkedBy"; maps.json claims meta_mapping[2]). For every claim whose status differs from base:
//      checkedBy:"fact-checker", checkedOn:<clock date>; on a change TO unverified both keys are deleted (the stale
//      pair on lifehacks.mail-exact-phrase.c1 is the failure this prevents, maps.json claims facts[6]). On a claim
//      whose status did not change, checkedBy/checkedOn are put back to base (an agent-typed date is not a stamp).
//      New claims never carry them. The literal "fact-checker" is the company role id that claimGates compares with
//      owner.builder (tools/company.mjs claimGates: `c.checkedBy === meta.owner.builder`; plan §1 role table).
//   3. Record rows + claim floor. The new record company/reviews/<slug>/<date>-fact-check*.md must have a table row
//      per changed claim id (status changed, or new), and that row must name the claim's new status (the code-signed
//      stamp may not rest on a record that says otherwise; held counts as unverified). Then the check-time claim floor: every claim verified or
//      withdrawn, verified ones signed, none signed by owner.builder (the claim half of claimGates; the evidence
//      half, QA and simulatedLearner, belongs to later stages and is gates.mjs --stage=ship's job).
//
//   node claims-guard.mjs <slug> --base=<sha> [--verdict=pass|revise] [--today=YYYY-MM-DD] [--dry-run] [--repo=<path>]
//
// Exit codes (plan §4 contract): 0 pass, 1 revise/refuse (findings), 2 usage, 3 stage-error (environment: git
// failed, base has no such lesson, the company's claim schema moved, tools/lib/readiness.mjs missing or failing the
// evidence probe's canary). Last stdout line: one JSON object.
//   Without --verdict (a plain cmd stage, K1): exit 0 iff guard ok AND the floor is closed; an open floor is exit 1
//     with routed findings (K11: disputed → build, held/unrecorded → check).
//   With --verdict (K12 post-check; the agent's own leave verdict): exit 0 means "the leave may proceed".
//     pass + open floor refuses (a pass the publish gate would bounce); revise is allowed whatever the floor, and the
//     JSON's `floor` / `route` say where the order should go.
// Writes: only meta.json, only when the guard passed and stamping changes it, and never with --dry-run. Re-running is
// idempotent for a given --today (stamps are recomputed from base every time).

import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import { execFileSync } from "node:child_process";
import { fileURLToPath, pathToFileURL } from "node:url";
import { DEFAULT_REPO, findLesson, parseArgs } from "./gates.mjs";

export const STAMP_BY = "fact-checker";
// Allowed per-claim fields (plan §4 row claims-guard). Everything else on a claim (id, text, support, source, and the
// off-schema address/addresses/location/kind/supportPins found on disk, maps.json claims facts[4]) is frozen.
export const CLAIM_MUTABLE = new Set(["status", "checkedBy", "checkedOn", "note"]);
// Enums as tools/company.mjs cmdCheck validates them (lines 387-388 at 23aaeba66). schemaDrift() re-reads them from
// the source text so a change there is a stage-error, not a silent mismatch.
export const SUPPORTS = ["derivation", "simulation", "source", "convention"];
export const STATUSES = ["unverified", "verified", "disputed", "withdrawn"];
// Record name: company/reviews/<slug>/<date>-fact-check.md (plan §2 stage 5). Lanes add suffixes on disk
// (zero-loses-to-this-crowd/2026-10-16-fact-check-lane-a.md), so anything after "fact-check" up to .md is allowed.
export const RECORD_RE = /^(\d{4}-\d{2}-\d{2})-fact-check[^/]*\.md$/;
// The checker's scratch folder (own.py and friends): fc-<date>/ plus the suffixes found on disk (fc-2026-10-17-v2/,
// fc-2026-10-17-c5/). loadContext reads only the top level of company/reviews/<slug>/ (fs.readdirSync(dir), no
// recursion), so nothing inside it is gate evidence.
export const SCRATCH_RE = /^fc-\d{4}-\d{2}-\d{2}(?:-[a-z0-9-]+)?\//;
// Names the company's non-gate readers take as a learner review or a QA record, which loadContext's probe does not
// cover: tools/publish-ready.mjs:78 links every `f.includes("learner")` file into meta.evidence.simulatedLearner,
// tools/metrics.mjs:46-56 counts "learner" verdicts and `-qa.md` passes, tools/qa-changed.mjs:166 takes `-qa.md`
// files as green QA anchors. A record name carrying either is refused too.
export const EVIDENCE_NAME_RE = /learner|-qa\.md$/i;
// The verdict words a row's later cells may carry, mapped to the claim status they mean (company.mjs STATUSES;
// "held" is the role doc's word for an unverified claim waiting on a source: company/roles/fact-checker.md).
const ROW_STATUS_RE = /\b(unverified|verified|disputed|withdrawn|held)\b/i;
const ROW_STATUS = { unverified: "unverified", held: "unverified", verified: "verified", disputed: "disputed", withdrawn: "withdrawn" };
// Same clock as tools/company.mjs `const today = () => new Date().toISOString().slice(0, 10);` (UTC date).
const clockDate = () => new Date().toISOString().slice(0, 10);

// ------------------------------------------------------------------ helpers

/** Order-insensitive deep equality on JSON values (meta.json is compared as data, not text). */
export function same(a, b) {
  if (a === b) return true;
  if (typeof a !== typeof b || a === null || b === null || typeof a !== "object") return false;
  if (Array.isArray(a) !== Array.isArray(b)) return false;
  if (Array.isArray(a)) return a.length === b.length && a.every((x, i) => same(x, b[i]));
  const ka = Object.keys(a), kb = Object.keys(b);
  return ka.length === kb.length && ka.every((k) => Object.hasOwn(b, k) && same(a[k], b[k]));
}

/** company/constitution/protected-paths.txt glob (only `**` and `*` appear in it), for a sharper refusal message. */
export function protectedMatcher(repo) {
  let lines = [];
  try {
    lines = fs.readFileSync(path.join(repo, "company/constitution/protected-paths.txt"), "utf8").split("\n").map((l) => l.trim()).filter((l) => l && !l.startsWith("#"));
  } catch {}
  const res = lines.map((g) => new RegExp("^" + g.split("**").map((p) => p.split("*").map((s) => s.replace(/[.+?^${}()|[\]\\]/g, "\\$&")).join("[^/]*")).join(".*") + "$"));
  return (p) => res.some((r) => r.test(p));
}

/** Why a path is out of bounds, in the company's words; the agent reads this in-session (K12) and can undo it. */
function pathHint(p, slug, where, isProtected) {
  if (isProtected(p)) return "protected path (company/constitution/protected-paths.txt): changes only by ratified amendment";
  if (/^company\/ops\/(board\.json|progress\.md|events\.jsonl|founder-inbox\.json)$/.test(p)) return "single-writer file: code writes it, not a reviewing role (plan §6 risk 1)";
  if (p.startsWith("company/roles/memory/")) return "role memory: under Meta it goes through `room leave --learned`, not tools/memory.mjs (plan §6 risk 2)";
  if (p.startsWith(`${where}/`)) return "lesson source: the fact-checker may not edit code or claim text; report the fix as a finding and the builder makes it (company/roles/fact-checker.md Out of scope)";
  if (p.startsWith(`company/reviews/${slug}/`)) return "an existing review file: only new files under company/reviews/<slug>/ are allowed (plan §4)";
  return "outside the fact-checker's write set (meta.json claim status/checkedBy/checkedOn/note, a new company/reviews/<slug>/<date>-fact-check*.md, scratch under company/reviews/<slug>/fc-<date>/; plan §4)";
}

const gitOut = (repo, args) => execFileSync("git", args, { cwd: repo, encoding: "utf8", maxBuffer: 64 << 20, stdio: ["ignore", "pipe", "pipe"] });

/**
 * Every path that differs from base in the working tree: `git diff -z --name-status --no-renames <base>` (base vs the
 * working tree, so commits on top of base, the index and unstaged edits all count; a rename is a D plus an A, both
 * judged) plus `git ls-files -z --others --exclude-per-directory=.gitignore` (new untracked files). Only the repo's own
 * .gitignore files hide a file: artifacts/ and test-results/ are ignored there and never reach the branch through K7's
 * `git add -A`. --exclude-standard is deliberately not used, because it also reads .git/info/exclude and the user's
 * core.excludesFile. Those are untracked config that a session can write, and a file they hide still sits on disk where
 * loadContext, build and QA read it (review 2026-10-22, the skip-worktree finding's sibling). Returns [{status, path}].
 */
export function changedPaths(repo, base) {
  const out = [];
  const parts = gitOut(repo, ["diff", "-z", "--name-status", "--no-renames", base, "--"]).split("\0").filter(Boolean);
  for (let i = 0; i + 1 < parts.length; i += 2) out.push({ status: parts[i][0], path: parts[i + 1] });
  for (const p of gitOut(repo, ["ls-files", "-z", "--others", "--exclude-per-directory=.gitignore"]).split("\0").filter(Boolean)) out.push({ status: "?", path: p });
  return out;
}

/**
 * Tracked paths whose index entry tells git to stop looking at the working tree: `git ls-files -v` tags an
 * assume-unchanged entry with a lowercase letter and a skip-worktree entry with "S" (git-ls-files(1) -v / -t). Either
 * one hides an edit from `git diff <base>` and from K7's `git add -A`, yet build, QA and walkthrough in the same order
 * worktree still read the edited file (review 2026-10-22: skip-worktree on Demo.tsx plus an appended line passed).
 * K5 worktrees are full checkouts (no sparse-checkout, which is the one legitimate source of S bits), so any such bit
 * is refused. Returns [path].
 */
export function hiddenIndexPaths(repo) {
  return gitOut(repo, ["ls-files", "-z", "-v"])
    .split("\0")
    .filter(Boolean)
    .filter((l) => /^[a-zS] /.test(l))
    .map((l) => l.slice(2));
}

/**
 * Which files under company/reviews/<slug>/ the publish gate reads as a learner review or a QA record, according to the
 * company's own tools/lib/readiness.mjs loadContext (ordinary surface, imported from --repo the way gates.mjs does;
 * company.mjs readinessGates feeds the same function). A copy of its filters would go stale silently. So the guard
 * calls the function itself, on this worktree, with no linked evidence (meta.evidence is frozen by judgeMeta anyway)
 * and holds:{} (so publish-holds.json is not read). First a canary on a temp root: a "-learner-" name and a "-qa.md"
 * name must come back and a "-fact-check.md" name must not. If they do not, the company moved its rules and the probe
 * would be blind, which is a stage-error. Returns {learner:Set, qa:Set} of repo-relative paths, or {error}.
 */
export async function evidenceProbe(repo, slug) {
  let lib;
  try {
    lib = await import(pathToFileURL(path.join(repo, "tools/lib/readiness.mjs")).href);
  } catch (e) {
    return { error: `cannot import tools/lib/readiness.mjs: ${String(e.message).split("\n")[0]}` };
  }
  if (typeof lib.loadContext !== "function") return { error: "tools/lib/readiness.mjs no longer exports loadContext; update claims-guard.mjs evidenceProbe" };
  const read = (root, s) => {
    const ctx = lib.loadContext(root, { slug: s, evidence: {} }, { holds: {} });
    return { learner: new Set((ctx.learner ?? []).map((r) => r.f)), qa: new Set((ctx.qa ?? []).map((r) => r.f)) };
  };
  const tmp = fs.mkdtempSync(path.join(os.tmpdir(), "claims-guard-probe-"));
  try {
    const d = "company/reviews/probe-lesson";
    fs.mkdirSync(path.join(tmp, d), { recursive: true });
    for (const f of ["2026-01-01-learner-probe.md", "2026-01-01-qa.md", "2026-01-01-fact-check.md"]) fs.writeFileSync(path.join(tmp, d, f), "probe\n");
    const c = read(tmp, "probe-lesson");
    const ok = c.learner.has(`${d}/2026-01-01-learner-probe.md`) && c.qa.has(`${d}/2026-01-01-qa.md`) && !c.learner.has(`${d}/2026-01-01-fact-check.md`) && !c.qa.has(`${d}/2026-01-01-fact-check.md`);
    if (!ok) return { error: "tools/lib/readiness.mjs loadContext failed the evidence probe's canary (learner/QA file rules moved); update claims-guard.mjs evidenceProbe" };
  } catch (e) {
    return { error: `readiness loadContext canary threw: ${String(e.message).split("\n")[0]}` };
  } finally {
    fs.rmSync(tmp, { recursive: true, force: true });
  }
  try {
    return read(repo, slug);
  } catch (e) {
    return { error: `readiness loadContext failed on ${repo}: ${String(e.message).split("\n")[0]}` };
  }
}

/**
 * The claim schema still matches what this guard enforces: tools/company.mjs is protected and not importable (its
 * CLI runs on load), so its cmdCheck enum lines are read as text. Missing = the company moved = stage-error.
 */
export function schemaDrift(repo) {
  let src;
  try {
    src = fs.readFileSync(path.join(repo, "tools/company.mjs"), "utf8");
  } catch (e) {
    return [`cannot read tools/company.mjs: ${e.message}`];
  }
  const want = [`${JSON.stringify(SUPPORTS).replace(/,/g, ", ")}.includes(c.support)`, `${JSON.stringify(STATUSES).replace(/,/g, ", ")}.includes(c.status)`];
  return want.filter((w) => !src.includes(w)).map((w) => `tools/company.mjs no longer validates claims with ${w}; update claims-guard.mjs SUPPORTS/STATUSES`);
}

// ------------------------------------------------------------------ the meta.json judgement (pure)

/**
 * Compares the checker's meta.json with base and returns {refusals[], next, stamps[], notes[], changedIds[]}.
 * `next` is the meta to write (stamped); refusals non-empty means nothing may be written. Pure, so tests drive it
 * without git.
 */
export function judgeMeta(baseMeta, curMeta, { today, slug }) {
  const refusals = [];
  const notes = [];
  const stamps = [];
  const changedIds = [];
  const R = (message) => refusals.push({ severity: "block", kind: "diff", route: "check", message });

  for (const k of new Set([...Object.keys(baseMeta), ...Object.keys(curMeta)]))
    if (k !== "claims" && !same(baseMeta[k], curMeta[k])) R(`meta.json "${k}" changed; the fact-checker may change only claims[].status/checkedBy/checkedOn/note`);
  if (!Array.isArray(curMeta.claims)) {
    R("meta.json claims is not an array");
    return { refusals, next: null, stamps, notes, changedIds };
  }

  const baseById = new Map(baseMeta.claims.map((c) => [c.id, c]));
  const seen = new Set();
  const order = [];
  const next = structuredClone(curMeta);
  next.claims.forEach((c, i) => {
    const at = `claims[${i}]${typeof c?.id === "string" ? ` (${c.id})` : ""}`;
    if (!c || typeof c !== "object" || typeof c.id !== "string") return R(`${at} has no string id`);
    if (seen.has(c.id)) return R(`duplicate claim id ${c.id}`);
    seen.add(c.id);
    if (!STATUSES.includes(c.status)) R(`${c.id} status "${c.status}" is not one of ${STATUSES.join("|")}`);
    const b = baseById.get(c.id);
    if (b) {
      order.push(c.id);
      for (const k of new Set([...Object.keys(b), ...Object.keys(c)])) if (!CLAIM_MUTABLE.has(k) && !same(b[k], c[k])) R(`${c.id} "${k}" changed; claim ${k === "text" ? "text" : "fields"} belong to the builder: report the fix as a finding (company/roles/fact-checker.md)`);
      if (c.status !== b.status) {
        changedIds.push(c.id);
        if (c.status === "unverified") {
          delete c.checkedBy;
          delete c.checkedOn;
          stamps.push({ id: c.id, from: b.status, to: c.status, action: "cleared" });
        } else {
          c.checkedBy = STAMP_BY;
          c.checkedOn = today;
          stamps.push({ id: c.id, from: b.status, to: c.status, action: "stamped", checkedBy: STAMP_BY, checkedOn: today });
        }
      } else {
        // Status unchanged: the signature stays what base had. Restore silently-typed values and say so.
        for (const k of ["checkedBy", "checkedOn"]) {
          if (same(b[k], c[k])) continue;
          notes.push({ severity: "advisory", kind: "stamp", message: `${c.id} ${k} reset to base (${b[k] === undefined ? "absent" : JSON.stringify(b[k])}): status did not change, and only code signs` });
          if (b[k] === undefined) delete c[k];
          else c[k] = b[k];
        }
        if (b.status === "unverified" && (b.checkedBy || b.checkedOn)) notes.push({ severity: "advisory", kind: "stale", message: `${c.id} is unverified but base carries checkedBy/checkedOn; left as inherited` });
      }
    } else {
      // A new claim: the checker recording a learner-visible sentence nobody recorded (role doc working agreement 2:
      // "record it as unverified"). It must pass cmdCheck's schema (company.mjs lines 383-389).
      changedIds.push(c.id);
      if (c.status !== "unverified") R(`new claim ${c.id} is "${c.status}"; a claim the checker records goes in as unverified (another checker verifies it)`);
      if (!c.id.startsWith(`${curMeta.domain}.${slug}.`)) R(`new claim id "${c.id}" must start with ${curMeta.domain}.${slug}. (company check)`);
      if (typeof c.text !== "string" || !c.text.trim()) R(`new claim ${c.id} has no text`);
      if (!SUPPORTS.includes(c.support)) R(`new claim ${c.id} bad support ${c.support} (company check)`);
      if (typeof c.source !== "string" || !c.source.trim()) R(`new claim ${c.id} has no source: a claim without a trail is a feather (company check)`);
      for (const k of ["checkedBy", "checkedOn"]) if (k in c) delete c[k];
      stamps.push({ id: c.id, from: null, to: c.status, action: "recorded" });
    }
  });
  for (const id of baseById.keys()) if (!seen.has(id)) R(`claim ${id} removed; removal is the builder's (a claim leaves with its sentence), the checker sets "withdrawn" instead`);
  const baseOrder = baseMeta.claims.map((c) => c.id).filter((id) => seen.has(id));
  if (refusals.length === 0 && order.join("\n") !== baseOrder.join("\n")) R("claims reordered; keep base order and append new claims");
  return { refusals, next: refusals.length ? null : next, stamps, notes, changedIds };
}

const LIST_SEP = /\s*(?:[,/&]|\band\b)\s*/i;

/**
 * The rows of a fact-check record, per claim. A row is a markdown table line; its first cell names the claim. It is
 * matched against the claim's full id (physics.pendulum-period.c3) or the short form after the last dot, compared
 * exactly (case-insensitive). The short form is usually c<N> (467 of the last 600 records), but 760 of the 13,365 claims
 * on disk end in another word (`<domain>.<slug>.recall` in 216 lessons, .world/.locator/.book/.bibliography in books,
 * .toy, .seen, .model), and records write those as `| recall | verified | … |`
 * (company/reviews/vaccinate-at-the-peak/2026-10-14-fact-check.md:44). Bold, backticks and underscores are stripped.
 * The cell may hold one id with prose after it (`c9 sum of odd numbers`, `recall (card 4)`), a plain list of ids
 * (`c4, c5`, `recall, world`) or a c<N> range (`c1-c3`). A range counts only when both ends are claims of this lesson,
 * so `| c1-c99 | … |` on a seven-claim lesson covers nothing rather than everything (review 2026-10-22).
 * Returns Map<claim id, (status|null)[]>: per row, the first verdict word (ROW_STATUS) in the cells after the first, or
 * null when the row names none.
 */
export function recordRows(text, claimIds) {
  const short = new Map();
  for (const id of claimIds) short.set(id.split(".").at(-1).toLowerCase(), id);
  const full = new Map(claimIds.map((id) => [id.toLowerCase(), id]));
  const lookup = (t) => full.get(t.toLowerCase()) ?? short.get(t.toLowerCase());
  const rows = new Map();
  for (const line of text.split("\n")) {
    if (!/^\s*\|/.test(line)) continue;
    const cells = line.split("|").slice(1);
    const cell = cells[0].replace(/[*`_]/g, "").trim();
    const ids = new Set();
    // 1. c<N> lists and ranges, with prose allowed after them.
    const lead = cell.match(/^([a-z0-9.-]*c\d+[a-z]?(?:\s*(?:[,/&]|and|[-–])\s*[a-z0-9.-]*c\d+[a-z]?)*)/i);
    if (lead) {
      for (const t of lead[1].split(LIST_SEP)) {
        const rg = t.match(/^(?:([a-z0-9.-]*\.))?c(\d+)\s*[-–]\s*(?:([a-z0-9.-]*\.))?c(\d+)$/i);
        if (!rg) {
          if (lookup(t)) ids.add(lookup(t));
          continue;
        }
        const pre = rg[1] ?? rg[3] ?? "";
        const end = (n) => lookup(pre ? `${pre}c${n}` : `c${n}`);
        if (!end(rg[2]) || !end(rg[4])) continue; // both ends must be claims of this lesson
        for (let n = +rg[2]; n <= +rg[4]; n++) if (end(n)) ids.add(end(n));
      }
    }
    // 2. Any id shape, matched exactly: every item of a plain id list, else the cell's first word (prose after it).
    const items = cell.split(LIST_SEP).map((s) => s.trim());
    const cands = items.length && items.every((t) => /^[a-z0-9._-]+$/i.test(t)) ? items : [cell.match(/^[a-z0-9._-]+/i)?.[0]];
    for (const t of cands) if (t && lookup(t.replace(/\.+$/, ""))) ids.add(lookup(t.replace(/\.+$/, "")));
    if (!ids.size) continue;
    const word = cells.slice(1).join("|").replace(/[*`_]/g, "").match(ROW_STATUS_RE)?.[1]?.toLowerCase();
    for (const id of ids) {
      if (!rows.has(id)) rows.set(id, []);
      rows.get(id).push(word ? ROW_STATUS[word] : null);
    }
  }
  return rows;
}

/** Ids that have a row at all (recordRows' keys). */
export function rowIds(text, claimIds) {
  return new Set(recordRows(text, claimIds).keys());
}

/** The check-time claim floor: claimGates' claim lines (company.mjs claimGates), each routed for K11. */
export function floor(meta, { changedNote = new Set(), recorded = new Set() } = {}) {
  const out = [];
  if (!meta.claims.length) out.push({ severity: "block", kind: "floor", route: "build", message: "no claims recorded: every lesson asserts something; write it down" });
  for (const c of meta.claims) {
    if (c.status === "disputed") out.push({ severity: "block", kind: "floor", route: "build", message: `${c.id} disputed${c.note ? `: ${c.note}` : ""}` });
    else if (c.status === "unverified")
      out.push({
        severity: "block",
        kind: "floor",
        route: "check",
        message: recorded.has(c.id) ? `${c.id} recorded by this check as unverified; a checker who did not record it must verify it` : `${c.id} still unverified${changedNote.has(c.id) ? " (held: note changed)" : ""}`,
      });
    if (c.status === "verified" && (!c.checkedBy || !c.checkedOn)) out.push({ severity: "block", kind: "floor", route: "check", message: `${c.id} verified without checkedBy/checkedOn` });
    if (c.status === "verified" && c.checkedBy === meta.owner?.builder) out.push({ severity: "block", kind: "floor", route: "check", message: `${c.id} verified by its own builder` });
  }
  return out;
}

// ------------------------------------------------------------------ the stage

export async function guard(repo, slug, { base, verdict = null, today = clockDate(), dryRun = false }) {
  const env = (message) => ({ exit: 3, out: { ok: false, slug, base, findings: [{ severity: "environment", kind: "env", message }] } });
  const drift = schemaDrift(repo);
  if (drift.length) return env(drift.join("; "));
  // The lesson's place is taken from base (where the built lesson must be), so a deleted meta.json is a refusal of
  // the checker's diff, not a missing lesson. Same lookup rule as company.mjs loadDemos: src/demos/<d>/<slug>/.
  let metaRel;
  try {
    metaRel = gitOut(repo, ["ls-tree", "-r", "--name-only", base, "--", "src/demos"]).split("\n").find((p) => p.endsWith(`/${slug}/meta.json`) && p.split("/").length === 5);
  } catch (e) {
    return env(`git ls-tree ${base} failed: ${String(e.message).split("\n")[0]}`);
  }
  if (!metaRel) return env(`base ${base} has no src/demos/<domain>/${slug}/meta.json: the check stage needs the built lesson at base`);
  const where = path.posix.dirname(metaRel);
  const L = findLesson(repo, slug) ?? { where, meta: null, parseError: "meta.json is missing from the worktree" };
  let baseRaw, baseMeta;
  try {
    baseRaw = gitOut(repo, ["show", `${base}:${metaRel}`]);
    baseMeta = JSON.parse(baseRaw);
  } catch (e) {
    return env(`base ${base} has no readable ${metaRel} (${String(e.message).split("\n")[0]}): the check stage needs the built lesson at base`);
  }
  if (!Array.isArray(baseMeta.claims)) return env(`base ${metaRel} has no claims array`);
  let changes, hidden;
  try {
    changes = changedPaths(repo, base);
    hidden = hiddenIndexPaths(repo);
  } catch (e) {
    return env(`git diff against ${base} failed: ${String(e.message).split("\n")[0]}`);
  }
  const probe = await evidenceProbe(repo, slug);
  if (probe.error) return env(probe.error);

  const findings = [];
  const isProtected = protectedMatcher(repo);
  const reviewsDir = `company/reviews/${slug}/`;
  const records = [];
  let metaChanged = false;
  for (const c of changes) {
    // K5 workspaces symlink node_modules into each order worktree (plan §3 K5 nodeModules "symlink:..."), and the
    // company's .gitignore says `node_modules/`, which matches a directory but not a symlink, so git lists the link
    // as untracked. It is the harness's, not the checker's: skip it, and only it (a real directory is ignored anyway).
    if (c.path === "node_modules" && c.status === "?" && fs.lstatSync(path.join(repo, c.path), { throwIfNoEntry: false })?.isSymbolicLink()) {
      findings.push({ severity: "advisory", kind: "workspace", message: "node_modules symlink (K5 workspace) is untracked; skipped. K7 must not commit it" });
      continue;
    }
    if (c.path === metaRel && c.status === "M") {
      metaChanged = true;
      continue;
    }
    if (c.path.startsWith(reviewsDir) && (c.status === "A" || c.status === "?")) {
      // Only the record and fc-<date>/ scratch (header job 1); a record name the company reads as a learner review or
      // a QA record is refused here by name and again below by the loadContext probe.
      const name = c.path.slice(reviewsDir.length);
      if (SCRATCH_RE.test(name)) continue;
      if (RECORD_RE.test(name) && !EVIDENCE_NAME_RE.test(name)) {
        records.push(c.path);
        continue;
      }
      findings.push({
        severity: "block",
        kind: "diff",
        route: "check",
        message: `${c.path} (new): ${EVIDENCE_NAME_RE.test(name) ? "the company reads this name as a learner review or QA record (tools/lib/readiness.mjs loadContext, tools/publish-ready.mjs, tools/metrics.mjs); a fact-checker may not write gate evidence" : `only <date>-fact-check*.md records and scratch under ${reviewsDir}fc-<date>/ are the fact-checker's (company/roles/fact-checker.md)`}`,
      });
      continue;
    }
    findings.push({ severity: "block", kind: "diff", route: "check", message: `${c.path} (${{ M: "modified", A: "added", D: "deleted", T: "type changed", "?": "untracked" }[c.status] ?? c.status}): ${pathHint(c.path, slug, where, isProtected)}` });
  }
  // Hidden from the diff above: index bits (hiddenIndexPaths) and gate evidence on disk that git does not list. The
  // probe's answer is compared with base's tree, so any learner/QA file the publish gate would read that base did not
  // have refuses, however it got there (untracked, ignored, or under an allowed-looking name).
  for (const p of hidden) findings.push({ severity: "block", kind: "diff", route: "check", message: `${p} (assume-unchanged/skip-worktree): an index bit hides this path from git diff while build and QA still read it; run \`git update-index --no-assume-unchanged --no-skip-worktree ${p}\`` });
  const baseReviews = new Set(gitOut(repo, ["ls-tree", "-r", "--name-only", base, "--", reviewsDir]).split("\n").filter(Boolean));
  for (const [kind, set] of [["learner review", probe.learner], ["QA record", probe.qa]])
    for (const p of [...set].sort())
      if (!baseReviews.has(p) && !findings.some((f) => f.message.startsWith(`${p} `)))
        findings.push({ severity: "block", kind: "diff", route: "check", message: `${p} (not in base): tools/lib/readiness.mjs loadContext reads it as a ${kind} for the publish gate; a fact-checker may not add gate evidence` });

  let cur = baseMeta;
  if (metaChanged) {
    if (L.parseError || !L.meta) findings.push({ severity: "block", kind: "diff", route: "check", message: `meta.json unreadable: ${L.parseError}` });
    else cur = L.meta;
  }
  const j = findings.some((f) => f.severity === "block") ? null : judgeMeta(baseMeta, cur, { today, slug });
  if (j) findings.push(...j.refusals, ...j.notes);

  // Record rows. The record is required even when no status changed (a HELD-only pass is still evidence, plan §2).
  let rows = null;
  if (j && !j.refusals.length) {
    if (!records.length) findings.push({ severity: "block", kind: "record", route: "check", message: `no new company/reviews/${slug}/<date>-fact-check.md since base (plan §2 stage 5 evidence)` });
    else {
      const ids = j.next.claims.map((c) => c.id);
      const text = records.map((r) => fs.readFileSync(path.join(repo, r), "utf8")).join("\n");
      rows = recordRows(text, ids);
      const missing = j.changedIds.filter((id) => !rows.has(id));
      if (missing.length) findings.push({ severity: "block", kind: "record", route: "check", message: `${records.join(", ")} has no table row for changed claim(s) ${missing.join(", ")} (a | <id> | <verdict> | <basis> | row each)` });
      // The row must say what meta.json now says (review 2026-10-22: a "| c2 | disputed |" row beside a verified c2
      // passed, and code then signed a verdict its own record contradicts). One agreeing row is enough (a record may
      // keep an earlier pass's table); with none, a contradicting word or no verdict word at all refuses.
      const status = new Map(j.next.claims.map((c) => [c.id, c.status]));
      for (const id of j.changedIds.filter((x) => rows.has(x))) {
        const said = rows.get(id);
        if (said.includes(status.get(id))) continue;
        const other = [...new Set(said.filter(Boolean))];
        findings.push({
          severity: "block",
          kind: "record",
          route: "check",
          message: other.length
            ? `${id}: the record says ${other.join("/")}, meta.json sets ${status.get(id)}; make them agree before the stamp is signed`
            : `${id}: the record's row names no verdict (${Object.keys(ROW_STATUS).join("|")}); meta.json sets ${status.get(id)}`,
        });
      }
      for (const r of records) {
        const d = path.basename(r).match(RECORD_RE)[1];
        if (d !== today) findings.push({ severity: "advisory", kind: "record", message: `${r} is dated ${d}, the clock says ${today}` });
      }
    }
  }

  const refused = findings.some((f) => f.severity === "block");
  let wrote = false;
  let fl = [];
  if (!refused) {
    const changedNote = new Set(j.next.claims.filter((c) => baseMeta.claims.some((b) => b.id === c.id && !same(b.note, c.note))).map((c) => c.id));
    const recorded = new Set(j.stamps.filter((s) => s.action === "recorded").map((s) => s.id));
    fl = floor(j.next, { changedNote, recorded });
    const abs = path.join(repo, metaRel);
    // Data equal to base: put base's exact bytes back (a reformat-only edit leaves no diff). Otherwise the company's
    // meta.json writer, JSON.stringify(meta, null, 2) + "\n" (tools/publish-ready.mjs:84; 1614 of 1621 files on disk).
    const text = same(j.next, baseMeta) ? baseRaw : JSON.stringify(j.next, null, 2) + "\n";
    if (!dryRun && fs.existsSync(abs) && fs.readFileSync(abs, "utf8") !== text) {
      fs.writeFileSync(abs, text);
      wrote = true;
    }
  }

  const floorOk = fl.length === 0;
  const routes = [...new Set(fl.map((f) => f.route))];
  const route = floorOk ? null : routes.includes("build") ? "build" : "check"; // a disputed text needs the builder first
  let exit;
  if (refused) exit = 1;
  else if (verdict === "pass" && !floorOk) {
    findings.push({ severity: "block", kind: "verdict", route: "check", message: "verdict pass, but the claim floor is open (below); leave with revise, or close every claim" });
    exit = 1;
  } else if (verdict) exit = 0;
  else exit = floorOk ? 0 : 1;
  // With --verdict the floor lines are information for the leave (advisory); without it they are the verdict.
  findings.push(...fl.map((f) => (verdict === "revise" ? { ...f, severity: "advisory" } : f)));
  if (verdict === "revise" && floorOk) findings.push({ severity: "advisory", kind: "verdict", message: "verdict revise with every claim closed: the findings must say what the builder fixes" });
  return {
    exit,
    out: {
      ok: exit === 0,
      slug,
      base,
      verdict: refused ? null : verdict ?? (floorOk ? "pass" : "revise"),
      route: refused ? "check" : route,
      refused,
      floor: refused ? null : { ok: floorOk, open: fl.map((f) => f.message) },
      stamps: j?.stamps ?? [],
      records,
      wrote: wrote ? metaRel : null,
      dryRun,
      today,
      findings,
    },
  };
}

// ------------------------------------------------------------------ CLI

const USAGE = "usage: claims-guard.mjs <slug> --base=<sha> [--verdict=pass|revise] [--today=YYYY-MM-DD] [--dry-run] [--repo=<path>]";

export async function main(argv) {
  const o = parseArgs(argv);
  const usage = (message) => ({ exit: 2, out: { ok: false, findings: [{ severity: "environment", kind: "usage", message }], usage: USAGE } });
  for (const k of Object.keys(o)) if (!["repo", "positional", "base", "verdict", "today", "dry-run"].includes(k)) return usage(`unknown flag --${k}`);
  const repo = path.resolve(String(o.repo ?? DEFAULT_REPO));
  const [slug, ...extra] = o.positional;
  if (!slug || extra.length || !/^[a-z0-9]+(-[a-z0-9]+)*$/.test(slug)) return usage("one kebab-case <slug> is required");
  if (typeof o.base !== "string" || !o.base) return usage("--base=<sha> is required (the order's commit before the check stage)");
  if (o.verdict !== undefined && !["pass", "revise"].includes(o.verdict)) return usage("--verdict must be pass or revise");
  if (o.today !== undefined && !(typeof o.today === "string" && /^\d{4}-\d{2}-\d{2}$/.test(o.today))) return usage("--today must be YYYY-MM-DD");
  if (!fs.existsSync(path.join(repo, "tools/company.mjs"))) return { exit: 3, out: { ok: false, findings: [{ severity: "environment", kind: "repo", message: `${repo} is not a System 3 Company checkout (no tools/company.mjs)` }] } };
  let base;
  try {
    base = gitOut(repo, ["rev-parse", "--verify", `${o.base}^{commit}`]).trim();
  } catch {
    return usage(`--base=${o.base} is not a commit in ${repo}`);
  }
  return guard(repo, slug, { base, verdict: o.verdict ?? null, today: o.today ?? clockDate(), dryRun: o["dry-run"] === true });
}

if (process.argv[1] && path.resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
  let r;
  try {
    r = await main(process.argv.slice(2));
  } catch (e) {
    r = { exit: 3, out: { ok: false, findings: [{ severity: "environment", kind: "crash", message: e.stack?.split("\n").slice(0, 3).join(" | ") ?? String(e) }] } };
  }
  for (const f of r.out.findings ?? []) if (f.severity !== "advisory") console.log(`${f.severity} ${f.kind}: ${f.message}`);
  console.log(JSON.stringify(r.out));
  process.exitCode = r.exit;
}
