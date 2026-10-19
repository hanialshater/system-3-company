// AMD-013 (proposed): one readiness policy. Destination: tools/lib/readiness.mjs (ordinary surface).
//
// What lives here: the mechanics of reading verdicts (learner and QA), versions, holds and review
// ordering. What does NOT live here: the claim gates and the strictness parameters. Those stay in
// tools/company.mjs (protected), which calls readiness() from launchGates() and runs a known-answer
// canary against it before trusting it (see the company.mjs patch beside this file). So this file can
// be tuned (a new verdict format, a better ordering signal) without an amendment, but it cannot be
// tuned into saying "ready" for a revise verdict or an active hold without check failing.
//
// Moved here from tools/publish-ready.mjs unchanged: VERDICTS, readReview, builtFrom, newer, decide,
// gitAncestry (W-843, W-1596); the only edits are that decide() and newer() take the basename of r.f, so a
// repo-relative path works as well as a bare filename. publish-ready.mjs re-exports them, so tests/publish/ keeps passing.
//
// Pure core: readiness(meta, ctx) reads nothing from disk; loadContext(root, meta, opts) does the I/O.

import fs from "node:fs";
import path from "node:path";
import { execFileSync } from "node:child_process";

// ------------------------------------------------------------ learner reviews (from publish-ready.mjs)

export const VERDICTS = ["launch", "revise", "fatal"];
const VERDICT_LINE = /^[ \t>*_#-]*Verdict:[ \t]*[*_]*[ \t]*([A-Za-z-]+)/gim;
const VERSION_LINE = /^[ \t>*_-]*lesson version:[ \t]*v(\d+)\b/gim;

export function readReview(text) {
  const words = [...text.matchAll(VERDICT_LINE)].map((m) => m[1].toLowerCase());
  const canon = [...new Set(words.filter((w) => VERDICTS.includes(w)))];
  const other = [...new Set(words.filter((w) => !VERDICTS.includes(w)))];
  const stamps = [...new Set([...text.matchAll(VERSION_LINE)].map((m) => Number(m[1])))];
  let problem = null;
  let verdict = null;
  if (other.length) problem = `verdict wording "${other.join('", "')}" is not ${VERDICTS.join("|")}`;
  else if (canon.length > 1) problem = `conflicting verdicts (${canon.join(", ")})`;
  else if (!canon.length) problem = "verdict missing";
  else verdict = canon[0];
  let version = 0;
  if (stamps.length === 1) version = stamps[0];
  else if (stamps.length > 1) problem ??= `conflicting lesson version stamps (v${stamps.join(", v")})`;
  else problem ??= "no lesson version stamp";
  if (problem) verdict = null;
  return { verdict, version, problem };
}

const BUILT_FROM = /built from[ \t`*]*([0-9a-f]{7,40})\b/i;
const SUPERSEDES = /^[ \t>*_-]*supersedes:[ \t]*(.+)$/gim;
const SEVERITY = { launch: 0, revise: 1, fatal: 2 };
export function builtFrom(text) {
  return text.match(BUILT_FROM)?.[1]?.toLowerCase() ?? null;
}
function stem(f) {
  const m = f.match(/^(.*?)(?:-r(\d+))?\.md$/);
  return m ? { base: m[1], n: m[2] ? Number(m[2]) : 1 } : { base: f, n: 1 };
}
function supersedes(r, other) {
  const name = path.basename(other.f);
  return [...r.t.matchAll(SUPERSEDES)].some((m) => m[1].includes(name) || m[1].includes(name.replace(/\.md$/, "")));
}
export function newer(a, b, isAncestor = null, sha = builtFrom) {
  const sa = sha(a.t), sb = sha(b.t);
  if (isAncestor && sa && sb && sa !== sb && !sa.startsWith(sb) && !sb.startsWith(sa)) {
    if (isAncestor(sb, sa) === true) return 1;
    if (isAncestor(sa, sb) === true) return -1;
  }
  const supA = supersedes(a, b), supB = supersedes(b, a);
  if (supA !== supB) return supA ? 1 : -1;
  const ka = stem(path.basename(a.f)), kb = stem(path.basename(b.f));
  if (ka.base === kb.base && ka.n !== kb.n) return ka.n > kb.n ? 1 : -1;
  return 0;
}
const severity = (r) => (r.problem ? 3 : SEVERITY[r.verdict] ?? 3);
const dateOf = (f) => path.basename(f).slice(0, 10);

export function decide(reviews, metaVersion = 1, opts = {}) {
  if (!reviews.length) return { ready: false, reason: "no learner review" };
  const read = reviews.map((r) => ({ ...r, ...readReview(r.t), d: dateOf(r.f) }));
  const top = read.reduce((t, r) => (r.version > t.version || (r.version === t.version && r.d > t.d) ? r : t));
  const group = read.filter((r) => r.version === top.version && r.d === top.d);
  const unbeaten = group.filter((r) => !group.some((o) => o !== r && newer(o, r, opts.isAncestor) > 0));
  const pool = unbeaten.length ? unbeaten : group;
  const latest = [...pool].sort((a, b) => severity(b) - severity(a) || a.f.localeCompare(b.f))[0];
  const newerBad = read.find((r) => r !== latest && r.problem && r.d > latest.d);
  if (newerBad) return { ready: false, reason: `newer learner review unreadable (${newerBad.problem})`, latest };
  if (latest.problem) return { ready: false, reason: latest.problem, latest };
  if (latest.verdict !== "launch") return { ready: false, reason: `verdict ${latest.verdict}`, latest };
  if (latest.version !== metaVersion) return { ready: false, reason: "verdict is for an older version", latest };
  return { ready: true, reason: null, latest };
}

export function gitAncestry(cwd) {
  const cache = new Map();
  return (x, y) => {
    const k = `${x}..${y}`;
    if (cache.has(k)) return cache.get(k);
    let v = null;
    try {
      execFileSync("git", ["merge-base", "--is-ancestor", x, y], { cwd, stdio: "ignore" });
      v = true;
    } catch (e) {
      v = e.status === 1 ? false : null;
    }
    cache.set(k, v);
    return v;
  };
}

// ------------------------------------------------------------ QA records (new in AMD-013)

// A QA verdict is the header field `result: **pass**` (or `**contract pass**`) / `result: **fail**`, at the
// start of a line or after a ` · ` separator, as tools/company.mjs qa-record writes it. Exploratory notes
// ("- Result: **no dead end**", "R4 result: no soft lock") are not verdicts and are not read as one.
const QA_RESULT = /(?:^|·)[ \t*_]*result:[ \t]*[*_]*[ \t]*(contract pass|pass|fail)\b/gim;
const QA_VERSION = /lesson version:[ \t]*v?(\d+)\b/gi;
const QA_SEVERITY = { pass: 0, fail: 1 };

export function readQa(text) {
  const words = [...new Set([...text.matchAll(QA_RESULT)].map((m) => (m[1].toLowerCase() === "fail" ? "fail" : "pass")))];
  const stamps = [...new Set([...text.matchAll(QA_VERSION)].map((m) => Number(m[1])))];
  let problem = null;
  if (!words.length) problem = "QA result missing";
  else if (words.length > 1) problem = "conflicting QA results";
  else if (stamps.length > 1) problem = `conflicting lesson version stamps (v${stamps.join(", v")})`;
  return { result: problem ? null : words[0], version: stamps.length === 1 ? stamps[0] : 0, problem };
}

// Which QA records are evidence. A file in company/reviews/<slug>/ named like a contract QA record, plus
// whatever meta.evidence.qa links. Unlinked records count too: qa-record writes a fail record but links
// only passes, so the linked list alone would hide the newest failure.
export const QA_FILE = /^\d{4}-\d{2}-\d{2}-(?:.*-)?qa(?:-[a-z0-9-]+)?\.md$/i;
export const QA_NOT_EVIDENCE = /exploratory|integration|audit|summary/i; // AMD-010 part 3 names integration records

// QA records write `built from: <sha>` (qa-record, AMD-010 part 2) or `built-from SHA: <sha>` (hand-written).
const QA_BUILT_FROM = /built[ -]from(?: SHA)?[ \t:`*]*([0-9a-f]{7,40})\b/i;
export function qaBuiltFrom(text) {
  return text.match(QA_BUILT_FROM)?.[1]?.toLowerCase() ?? null;
}
// "Build a is the same build as b, or a descendant of it." true / false / null (cannot tell).
function atOrAfter(a, b, isAncestor) {
  if (!a || !b) return null;
  if (a === b || a.startsWith(b) || b.startsWith(a)) return true;
  return isAncestor ? isAncestor(b, a) : null;
}

// Is an unstamped QA record for the current version? Learner reviews carry a version stamp and a build, so
// they say which build showed which version. Signals, strongest first:
//   1. the QA build is the build (or a descendant of the build) a current-version learner review saw: current;
//   2. the QA build is the build (or an ancestor of the build) an older-version learner review saw: stale;
//   3. dates: after the newest older-version review: current; before it: stale; the same day: cannot tell,
//      and that fails closed (a stamped re-run settles it).
// Version 1 lessons, and lessons with no older-version review on disk, have nothing to contradict the record.
function qaVersionProblem(rec, v, opts) {
  if (v <= 1) return null;
  const old = opts.olderVersionReviews ?? [];
  const cur = opts.currentVersionReviews ?? [];
  const sha = qaBuiltFrom(rec.t);
  if (sha && cur.some((c) => atOrAfter(sha, c.sha, opts.isAncestor) === true)) return null;
  if (sha && old.some((o) => atOrAfter(o.sha, sha, opts.isAncestor) === true)) return "newest QA record was built before the current version";
  const lastOld = old.reduce((m, o) => (o.d > m ? o.d : m), "");
  if (!lastOld || rec.d > lastOld) return null;
  if (rec.d < lastOld) return "newest QA record predates the current version";
  return "newest QA record has no version stamp and is dated the same day as an older-version review (cannot tell which version it saw)";
}

// opts.metaVersion; opts.versionSince: the date (YYYY-MM-DD) from which a record must carry its own
// `lesson version:` stamp (company.mjs passes it; null = never required); opts.olderVersionReviews and
// opts.currentVersionReviews: [{ d, sha }] from the learner reviews (see qaVersionProblem); opts.recorder:
// optional (rec) => problem|null, the hook for AMD-010 part 3 step 10, so that its rule lands in this one
// function and not as a second gate line.
export function decideQa(records, opts = {}) {
  const v = opts.metaVersion ?? 1;
  if (!records.length) return { ready: false, reason: "no computer-use QA record" };
  const read = records.map((r) => ({ ...r, ...readQa(r.t), d: dateOf(r.f) }));
  const usable = read.filter((r) => !r.problem);
  if (!usable.length) return { ready: false, reason: `QA record unreadable (${read[0].problem})` };
  const top = usable.reduce((t, r) => (r.d > t.d ? r : t));
  const group = usable.filter((r) => r.d === top.d);
  const unbeaten = group.filter((r) => !group.some((o) => o !== r && newer(o, r, opts.isAncestor, qaBuiltFrom) > 0));
  const pool = unbeaten.length ? unbeaten : group;
  const latest = [...pool].sort((a, b) => QA_SEVERITY[b.result] - QA_SEVERITY[a.result] || a.f.localeCompare(b.f))[0];
  const newerBad = read.find((r) => r.problem && r.linked && r.d > latest.d);
  if (newerBad) return { ready: false, reason: `newer linked QA record unreadable (${newerBad.problem})`, latest };
  if (latest.result !== "pass") return { ready: false, reason: "newest QA record is a fail", latest };
  if (latest.version && latest.version !== v) return { ready: false, reason: `newest QA record is for v${latest.version}, lesson is v${v}`, latest };
  if (!latest.version) {
    if (opts.versionSince && latest.d >= opts.versionSince) return { ready: false, reason: "QA record has no lesson version stamp", latest };
    const p = qaVersionProblem(latest, v, opts);
    if (p) return { ready: false, reason: p, latest };
  }
  const who = opts.recorder?.(latest);
  if (who) return { ready: false, reason: who, latest };
  return { ready: true, reason: null, latest };
}

// ------------------------------------------------------------ the one function

// ctx: { learner: [{ f, t }], qa: [{ f, t, linked }], hold: string | null, isAncestor, versionSince, recorder }
// Returns { ready, reasons: string[], learner, qa }. Every reason is a gate failure in launchGates' words.
export function readiness(meta, ctx) {
  const v = meta.version ?? 1;
  const reasons = [];
  if (ctx.hold) reasons.push(`active publish hold: ${ctx.hold}`);
  const learner = decide(ctx.learner ?? [], v, { isAncestor: ctx.isAncestor });
  if (!learner.ready) reasons.push(`learner review: ${learner.reason}`);
  const stamped = (ctx.learner ?? []).map((r) => ({ d: dateOf(r.f), sha: builtFrom(r.t), ...readReview(r.t) })).filter((r) => r.version);
  const qa = decideQa(ctx.qa ?? [], {
    metaVersion: v,
    isAncestor: ctx.isAncestor,
    versionSince: ctx.versionSince,
    recorder: ctx.recorder,
    olderVersionReviews: stamped.filter((r) => r.version < v),
    currentVersionReviews: stamped.filter((r) => r.version === v),
  });
  if (!qa.ready) reasons.push(`QA: ${qa.reason}`);
  return { ready: reasons.length === 0, reasons, learner, qa };
}

// ------------------------------------------------------------ disk

export function loadHolds(root) {
  const p = path.join(root, "company/ops/publish-holds.json");
  return fs.existsSync(p) ? JSON.parse(fs.readFileSync(p, "utf8")).holds ?? {} : {};
}

// Builds ctx for one lesson from company/reviews/<slug>/ and meta.evidence. opts: { holds, isAncestor, versionSince, recorder }.
export function loadContext(root, meta, opts = {}) {
  const dir = path.join(root, "company/reviews", meta.slug);
  const files = fs.existsSync(dir) ? fs.readdirSync(dir).sort() : [];
  const read = (rel) => ({ f: rel, t: fs.readFileSync(path.join(root, rel), "utf8") });
  const union = (onDisk, linked) => [...new Set([...onDisk, ...linked])].filter((r) => fs.existsSync(path.join(root, r)));
  const learnerLinked = meta.evidence?.simulatedLearner ?? [];
  const learnerDisk = files.filter((f) => f.includes("learner") && f.endsWith(".md")).map((f) => `company/reviews/${meta.slug}/${f}`);
  const qaLinked = meta.evidence?.qa ?? [];
  const qaDisk = files.filter((f) => QA_FILE.test(f) && !QA_NOT_EVIDENCE.test(f)).map((f) => `company/reviews/${meta.slug}/${f}`);
  const holds = opts.holds ?? loadHolds(root);
  return {
    learner: union(learnerDisk, learnerLinked).map(read),
    qa: union(qaDisk, qaLinked).map((r) => ({ ...read(r), linked: qaLinked.includes(r) })),
    hold: holds[meta.slug] ?? null,
    isAncestor: opts.isAncestor ?? null,
    versionSince: opts.versionSince ?? null,
    recorder: opts.recorder ?? null,
  };
}
