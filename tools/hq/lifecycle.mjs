#!/usr/bin/env node
// Where every lesson is in its content type's life cycle: the dashboard contract's `pipeline`
// (system3-city pages/pipeline/PAGE.md): { types: [{ id, title, states: [{ id, title, owner, kind }] }],
// items: [{ id, title, type, state, since, version, waitingOn[], category, ... }], staleDays }.
//
// The state machines are data: company/ops/projects.json, each lane's `lifecycle` block (lane S: principal-pm-verticals,
// lane M: design-lead; the register is portfolio-manager's). This file holds one rule per state id.
//
// The rules read only the records, and reuse the gates rather than restating them:
//   - readiness() from tools/lib/readiness.mjs, the function tools/company.mjs launchGates() calls (learner verdicts,
//     QA records, version stamps, holds), with the same options (READINESS_SINCE and QA_INDEPENDENT_SINCE are read
//     from the text of tools/company.mjs, so they cannot drift; that file is protected and is not changed here);
//   - the claim floor as claimGates() in tools/company.mjs states it (unverified or disputed claims, none recorded);
//   - lane M extras from the lane flow: sequence probe in the current QA record, the first-3 design review, the
//     interaction review (unless interaction-designer wrote the spec), the post-publish pairwise for the first 3;
//   - status and version from meta.json, publish and version dates from git, deploys from company/ops/releases.json,
//     open board items naming the slug (company/ops/board.json).
//
// Each type also carries its transitions (transitionsOf: the forward path in state order, the skips of an optional
// state, and the back edges these rules can produce), and each item its group (the category, meta.domain: the unit of
// scale), its subgroup (the strand: meta.curriculum.strand, else the concept's subarea in content/curriculum, a
// logical grouping) and its history (historyOf: dates the records already hold, no extra git calls).
//
// itemOf() and pipelineOf() are pure (no disk, no git): tests feed them fixtures. loadPipeline(root) does the I/O.
// Read-only.   node tools/hq/lifecycle.mjs [<root>] [--summary] [--slug=<slug>]
import fs from "node:fs";
import path from "node:path";
import { execFileSync } from "node:child_process";
import { fileURLToPath } from "node:url";
import { readiness, readReview, QA_FILE, QA_NOT_EVIDENCE, gitAncestry } from "../lib/readiness.mjs";

export const STATE_IDS = ["brief", "build", "checks", "revise", "launch", "published", "pairwise", "live"];
const RISK_ROUTES = /^(sensitive|safety|copyright|health|money)$/i;
const ACTIVE = new Set(["doing", "next"]);
const CLOSED = new Set(["done", "dropped"]);
const DATED = /^\d{4}-\d{2}-\d{2}-/;
const base = (f) => path.basename(f);
const dateOf = (f) => (DATED.test(base(f)) ? base(f).slice(0, 10) : null);
const short = (s, n = 72) => (s.length > n ? s.slice(0, n - 1).trimEnd() + "…" : s);
const plural = (n, w) => `${n} ${w}${n === 1 ? "" : "s"}`;

// ------------------------------------------------------------ the types (data)

/** company/ops/projects.json → the lanes that carry a lifecycle block, as pipeline types plus their rules' data. */
export function typesOf(registry) {
  return (registry.projects ?? []).filter((p) => p.kind === "lane" && p.lifecycle?.states?.length).map((p) => {
    const l = p.lifecycle;
    return {
      id: l.type?.id ?? p.contentType ?? p.id, title: l.type?.title ?? p.title, lane: p.id, manager: p.manager ?? null, editedBy: l.editedBy ?? null,
      formats: Array.isArray(l.formats) ? l.formats : null, firstN: l.firstN ?? 0,
      states: l.states.map((s) => ({ id: s.id, title: s.title ?? s.id, owner: s.owner ?? null, kind: s.kind ?? null, what: s.what ?? null, ...(s.checks ? { checks: s.checks } : {}), ...(s.applies ? { applies: s.applies } : {}) })),
      ...(Array.isArray(l.transitions) ? { extraTransitions: l.transitions } : {}),
    };
  });
}

// The edges these rules can move an item along, by state id: [from, to, kind, label]. Only the edges whose two states a
// type keeps are emitted. "forward" is the path in state order, "skip" passes an optional state, "back" is rework.
const EDGES = [
  ["brief", "build", "forward", "a builder takes the brief"],
  ["build", "checks", "forward", "hand-off: a check record for this version, or status review"],
  ["checks", "launch", "forward", "every gate passes for the current version"],
  ["launch", "published", "forward", "release-manager publishes from the batch launch record"],
  ["published", "pairwise", "forward", "one of the first N items: pairwise after publish"],
  ["pairwise", "live", "forward", "pairwise record, and a production deploy the founder approved"],
  ["published", "live", "forward", "a production deploy the founder approved (company/ops/releases.json)"],
  ["checks", "revise", "back", "a check said revise or fail, or a claim is disputed"],
  ["revise", "checks", "back", "one fix: re-run only the failed check"],
  ["checks", "build", "back", "a failed gate needs a new version: back to the maker, checks restart at hand-off"],
  ["revise", "build", "back", "the fix is a new version: hand it off again"],
  ["live", "checks", "back", "a newer version with check records of its own (the live version stays up)"],
];
/** A type's transitions [{ from, to, kind, label }]: forward in state order, skips, back edges; plus the lane's own `transitions`. */
export function transitionsOf(type) {
  const ids = type.states.map((s) => s.id), has = (id) => ids.includes(id), at = (id) => ids.indexOf(id);
  const optional = new Set(type.states.filter((s) => s.applies).map((s) => s.id));
  const out = [];
  for (const [from, to, kind, label] of EDGES) {
    if (!has(from) || !has(to)) continue;
    // a forward edge that jumps a state the type keeps is a skip, and only if every state it jumps is optional
    const between = ids.slice(at(from) + 1, at(to)).filter((x) => x !== "revise");
    if (kind === "forward" && between.length) { if (between.every((x) => optional.has(x))) out.push({ from, to, kind: "skip", label: `${label} (not one of the first N: no ${between.join(", ")})` }); continue; }
    out.push({ from, to, kind, label });
  }
  for (const t of type.extraTransitions ?? []) if (has(t.from) && has(t.to) && !out.some((x) => x.from === t.from && x.to === t.to)) out.push({ from: t.from, to: t.to, kind: ["forward", "back", "skip"].includes(t.kind) ? t.kind : "forward", label: t.label ?? "" });
  return out;
}

/**
 * Pure. An item's path so far, [{ state, since }], oldest first, from dates the records already hold: the first commit of
 * its meta.json, the commit that set its current version, its dated review records, its launch record, the commit that
 * published it and the first production deploy containing it. It ends at the item's current state. A step with no
 * dated record is left out, so a path can skip states it went through.
 */
export function historyOf(lesson, type, cur) {
  const ids = type.states.map((s) => s.id), has = (id) => ids.includes(id), g = lesson.git ?? {}, slug = lesson.meta.slug;
  const dated = (lesson.records ?? []).filter((r) => r.f.startsWith(`company/reviews/${slug}/`) && dateOf(r.f)).map((r) => dateOf(r.f)).sort();
  const steps = [];
  const add = (state, since) => { if (since && has(state)) steps.push({ state, since }); };
  add(lesson.built || !has("brief") ? "build" : "brief", g.firstAt?.date);
  const pub = g.publishedAt?.date ?? null, ver = g.versionAt?.date ?? null;
  const firstCheck = dated.find((d) => !pub || d <= pub) ?? null;
  add("checks", firstCheck);
  const launchAt = lesson.launchRecord ? dateOf(lesson.launchRecord) : null;
  if (launchAt && (!pub || launchAt <= pub)) add("launch", launchAt);
  add("published", pub);
  // a version made after the publish: its build and checks come before the deploy (lesson.deploy is that version's)
  if (ver && pub && ver > pub) { add("build", ver); add("checks", dated.find((d) => d >= ver)); if (launchAt > pub && cur.state === "launch") add("launch", launchAt); }
  if (lesson.deploy && cur.state !== "pairwise") add("live", lesson.deploy.date);
  // oldest first; on one day, in the order the steps were added above (the order an item moves in; sort is stable)
  steps.sort((a, b) => a.since.localeCompare(b.since));
  const out = [];
  for (const s of steps) { if (cur.since && s.since > cur.since) continue; if (out.at(-1)?.state !== s.state) out.push(s); }
  if (out.at(-1)?.state === cur.state) out.pop();
  out.push({ state: cur.state, since: cur.since ?? null });
  return out;
}

/** Which type a lesson belongs to: a type listing its format (or the brief's lane letter), else the type with no format list. */
export function typeFor(meta, types) {
  const fmt = String(meta.format ?? meta.brief?.format ?? "").toLowerCase();
  const lane = String(meta.brief?.lane ?? "").toUpperCase();
  return types.find((t) => t.formats?.includes(fmt)) || (lane && types.find((t) => t.lane?.toUpperCase().endsWith(lane === "M" ? "MULTI-CARD" : "SINGLE-CARD"))) || types.find((t) => !t.formats) || types[0];
}

/** AMD-017 (a): N if the type has fewer than 3 published items, R by review route, else S. */
export function tierOf(meta, publishedInType) {
  const route = meta.reviewRoute?.route ?? meta.reviewRoute ?? meta.brief?.reviewRoute ?? null;
  if (publishedInType < 3) return "N";
  return typeof route === "string" && RISK_ROUTES.test(route) ? "R" : "S";
}

// ------------------------------------------------------------ record readers

/** A design or interaction review: its verdict word and the version it saw ("lesson version: vN", or "(vN)" in the title). */
export function readCraft(text) {
  const verdict = /^[ \t>*_#-]*Verdict:[ \t*_]*([A-Za-z-]+)/im.exec(text)?.[1]?.toLowerCase() ?? null;
  const v = /lesson version:[ \t]*v(\d+)/i.exec(text)?.[1] ?? /^#[^\n]*\(v(\d+)\)/m.exec(text)?.[1] ?? null;
  return { verdict, version: v ? Number(v) : null };
}

/** ctx for readiness() from records already in memory: what loadContext() in tools/lib/readiness.mjs reads from disk. */
export function readinessCtx(meta, records, opts = {}) {
  const linkedQa = meta.evidence?.qa ?? [], linkedLearner = meta.evidence?.simulatedLearner ?? [];
  const inDir = (r) => r.f.startsWith(`company/reviews/${meta.slug}/`) && !r.f.slice(`company/reviews/${meta.slug}/`.length).includes("/");
  return {
    learner: records.filter((r) => (inDir(r) && base(r.f).includes("learner") && r.f.endsWith(".md")) || linkedLearner.includes(r.f)),
    qa: records.filter((r) => (inDir(r) && QA_FILE.test(base(r.f)) && !QA_NOT_EVIDENCE.test(base(r.f))) || linkedQa.includes(r.f)).map((r) => ({ ...r, linked: linkedQa.includes(r.f) })),
    hold: opts.hold ?? null,
    isAncestor: opts.isAncestor ?? null,
    versionSince: opts.versionSince ?? null,
    recorder: opts.recorder ?? null,
  };
}

// ------------------------------------------------------------ one lesson

/**
 * Pure. lesson: { meta, records: [{ f, t }] (company/reviews/<slug>/ and linked evidence), board: [open board items naming
 * the slug], git: { versionAt, publishedAt, firstAt } (each { commit, date } or null), deploy: { id, date } | null (the
 * first production deploy containing the version that is published), launchRecord: path | null, spec: { owner } | null,
 * hold: string | null }. type: from typesOf(). env: { readiness: opts for readiness(), firstN: Set of slugs, tier, today }.
 */
export function itemOf(lesson, type, env = {}) {
  const { meta } = lesson, v = meta.version ?? 1, records = lesson.records ?? [], board = lesson.board ?? [];
  const has = (id) => type.states.some((s) => s.id === id);
  const checksDef = type.states.find((s) => s.id === "checks")?.checks ?? [];
  const first = lesson.git?.firstAt?.date ?? env.today ?? null;
  const wants = (rule) => checksDef.some((c) => c.rule === rule && (c.applies !== "firstN" || env.firstN?.has(meta.slug)) && (c.applies !== "tierR" || env.tier === "R") && (!c.since || !first || first >= c.since));
  const versionDate = lesson.git?.versionAt?.date ?? lesson.git?.firstAt?.date ?? null;
  const dated = records.filter((r) => r.f.startsWith(`company/reviews/${meta.slug}/`) && dateOf(r.f));
  const current = dated.filter((r) => !versionDate || dateOf(r.f) >= versionDate);
  const notes = [];
  const publishedDate = lesson.git?.publishedAt?.date ?? (meta.status === "published" ? env.today ?? null : null); // uncommitted publish: today

  // was the current version published, or is it a newer version made after the publish?
  const published = meta.status === "published";
  const bumpedAfterPublish = published && lesson.git?.publishedAt && lesson.git?.versionAt && lesson.git.versionAt.date > lesson.git.publishedAt.date;

  // the gates, as launchGates() reads them
  const ctx = readinessCtx(meta, records, { ...env.readiness, hold: lesson.hold ?? null });
  const r = readiness(meta, ctx);
  const claims = meta.claims ?? [];
  const unverified = claims.filter((c) => !["verified", "withdrawn", "disputed"].includes(c.status));
  const disputed = claims.filter((c) => c.status === "disputed");
  const missing = [], revise = [];
  if (!claims.length) missing.push("claims: none recorded");
  if (unverified.length) missing.push(`fact-check: ${plural(unverified.length, "unverified claim")}`);
  if (disputed.length) revise.push(`fact-check: ${plural(disputed.length, "disputed claim")} (${disputed.map((c) => c.id.split(".").pop()).join(", ")})`);
  const L = r.learner, Q = r.qa;
  if (!L.ready) {
    const lv = L.latest?.version;
    if (L.latest && ["revise", "fatal"].includes(L.latest.verdict) && lv === v) revise.push(`learner walk v${v} said ${L.latest.verdict} (${base(L.latest.f)})`);
    else if (!L.latest || L.reason === "no learner review") missing.push(`learner walk for v${v}`);
    else if (L.reason === "verdict is for an older version" || (lv && lv < v)) missing.push(`learner walk for v${v} (newest is v${lv})`);
    else missing.push(`learner review: ${L.reason}`);
  }
  if (!Q.ready) {
    if (Q.latest?.result === "fail" && (!Q.latest.version || Q.latest.version === v)) revise.push(`QA fail on v${v} (${base(Q.latest.f)})`);
    else if (!Q.latest || /no computer-use QA record|is for v\d+|predates|built before/.test(Q.reason)) missing.push(`QA for v${v}`);
    else missing.push(`QA: ${Q.reason}`);
  }
  if (wants("probe") && !(Q.ready && /sequence[- ]probe/i.test(Q.latest?.t ?? ""))) missing.push(`sequence probe for v${v}`);
  if (wants("design")) {
    const d = dated.filter((x) => /-design(-r\d+)?\.md$/.test(x.f)).map((x) => ({ ...x, ...readCraft(x.t) })).sort((a, b) => a.f.localeCompare(b.f)).pop();
    if (!d) missing.push("design review (first 3 items)");
    else if (d.verdict === "revise" && (d.version ?? v) === v) revise.push(`design review v${v} said revise (${base(d.f)})`);
    else if (d.verdict === "revise") notes.push(`design review v${d.version}: revise; v${v} is the revision round (no re-check recorded)`);
  }
  if (wants("interaction")) {
    const wroteSpec = /interaction-designer/.test(lesson.spec?.owner ?? "");
    const ir = dated.filter((x) => /-interaction(-review)?(-r\d+)?\.md$/.test(x.f)).map((x) => ({ ...x, ...readCraft(x.t) })).sort((a, b) => a.f.localeCompare(b.f)).pop();
    if (wroteSpec) notes.push("interaction review: not applicable, interaction-designer wrote the spec (F-52 G1)");
    else if (!ir) missing.push("interaction review");
    else if (ir.verdict === "revise" && (ir.version ?? v) === v) revise.push(`interaction review v${v} said revise (${base(ir.f)})`);
  }
  if (wants("route") && !dated.some((x) => /route|safety|cultural|copyright/.test(base(x.f)) && dateOf(x.f) >= (versionDate ?? ""))) missing.push("route verdict (tier R)");
  if (lesson.hold) missing.push(`publish hold: ${short(lesson.hold, 60)}`);
  const gatesPass = !missing.length && !revise.length;

  // board items: active ones are waits; the revise round names the builder's items in any open state
  const label = (i) => `${i.id} (${i.owner}): ${short(i.title, 60)}`;
  const cap = (xs, n = 3) => (xs.length > n ? [...xs.slice(0, n), `+${xs.length - n} more board items naming it`] : xs);
  const activeBoard = cap(board.filter((i) => ACTIVE.has(i.state)).map(label));

  let state, since, waitingOn;
  const deployWait = lesson.deploy ? [] : ["deploy: founder's approval, then a release in company/ops/releases.json"];
  // a newer version made after the publish, with check records of its own: it is back in the pipeline
  const reworking = bumpedAfterPublish && current.length > 0 && !gatesPass;
  const where = lesson.deploy ? `v${v} is live (${lesson.deploy.id})` : "the live lesson is an earlier version";
  if (published && !reworking) {
    // a published version is not re-judged by today's gates (AMD-013 grandfathers it; company check warns): its gaps are reported, not waited on
    const gaps = [...missing, ...revise];
    if (bumpedAfterPublish && gaps.length) notes.push(`v${v} made ${lesson.git.versionAt.date}, after the publish of ${lesson.git.publishedAt.date}, with no check record for it; ${where}`);
    const needsPairwise = has("pairwise") && env.firstN?.has(meta.slug) && !(meta.evidence?.pairwise?.length || dated.some((x) => /pairwise/.test(base(x.f))));
    if (needsPairwise) { state = "pairwise"; since = publishedDate; waitingOn = ["pairwise vs the single-card twin (first 3 items)", ...deployWait, ...activeBoard]; }
    else if (lesson.deploy) { state = "live"; since = lesson.deploy.date; waitingOn = []; }
    else { state = "published"; since = publishedDate; waitingOn = [...deployWait]; }
    return finish({ gaps });
  }
  if (reworking) notes.push(`v${v} made ${lesson.git.versionAt.date}, after the publish of ${lesson.git.publishedAt.date}; ${where}`);
  const handedOff = meta.status === "review" || current.length > 0;
  if (!lesson.built && has("brief")) { state = "brief"; since = lesson.git?.firstAt?.date ?? null; waitingOn = ["build"]; }
  else if (!handedOff) { state = "build"; since = versionDate; waitingOn = ["the maker's hand-off: a check record for this version, or status review", ...activeBoard]; }
  else if (revise.length) {
    const reviseDates = dated.filter((x) => revise.some((w) => w.includes(base(x.f)))).map((x) => dateOf(x.f)).sort();
    const builderItems = cap(board.filter((i) => /builder|engineer/.test(i.owner ?? "") && !ACTIVE.has(i.state)).map(label), 2);
    state = "revise"; since = reviseDates.pop() ?? versionDate;
    waitingOn = [...revise.map((w) => `one revision round: ${w}`), ...builderItems, ...activeBoard, ...missing.map((w) => `then ${w}`)];
  } else if (missing.length) {
    state = "checks"; since = current.map((x) => dateOf(x.f)).sort()[0] ?? versionDate;
    waitingOn = [...missing, ...activeBoard];
  } else {
    state = "launch"; since = current.map((x) => dateOf(x.f)).sort().pop() ?? versionDate;
    waitingOn = [lesson.launchRecord ? `publish (release-manager; launch record ${base(lesson.launchRecord)})` : "batch launch record (head-of-product)", ...activeBoard];
  }
  return finish();

  function finish(extra = {}) {
    let st = state;
    if (!has(st)) { const later = STATE_IDS.slice(STATE_IDS.indexOf(st)).find(has) ?? type.states.at(-1).id; notes.push(`state ${st} is not in ${type.id}'s lifecycle; shown as ${later}`); st = later; }
    return {
      id: `${meta.domain}/${meta.slug}`, title: meta.title ?? meta.slug, type: type.id, state: st, since: since ?? null, version: v, waitingOn,
      category: meta.domain ?? null, group: meta.domain ?? null, subgroup: lesson.subgroup ?? meta.curriculum?.strand ?? null,
      history: historyOf(lesson, type, { state: st, since: since ?? null }),
      status: meta.status ?? null, tier: env.tier ?? null,
      openBoard: board.map((i) => i.id), ...(extra.gaps?.length ? { gaps: extra.gaps } : {}), ...(notes.length ? { notes } : {}),
      ...(lesson.deploy ? { deployedIn: lesson.deploy.id } : {}),
    };
  }
}

/** Pure. lessons: as itemOf() takes them, each with its meta. Returns the dashboard contract's pipeline. */
export function pipelineOf(types, lessons, env = {}) {
  const typed = lessons.map((l) => ({ l, t: typeFor(l.meta, types) }));
  const publishedBy = {}; for (const { l, t } of typed) if (l.meta.status === "published") publishedBy[t.id] = (publishedBy[t.id] ?? 0) + 1;
  const firstN = new Set();
  for (const t of types) if (t.firstN) typed.filter((x) => x.t === t).sort((a, b) => String(a.l.git?.firstAt?.date ?? "9").localeCompare(String(b.l.git?.firstAt?.date ?? "9")) || a.l.meta.slug.localeCompare(b.l.meta.slug)).slice(0, t.firstN).forEach((x) => firstN.add(x.l.meta.slug));
  env = { today: new Date().toISOString().slice(0, 10), ...env };
  const items = typed.map(({ l, t }) => itemOf(l, t, { ...env, firstN, tier: tierOf(l.meta, publishedBy[t.id] ?? 0) }));
  return {
    staleDays: env.staleDays ?? 7,
    types: types.map((t) => ({ id: t.id, title: t.title, lane: t.lane, editedBy: t.editedBy, states: t.states.map(({ id, title, owner, kind, what }) => ({ id, title, owner, kind, what })), transitions: transitionsOf(t) })),
    groupBy: "category", subgroupBy: "strand",
    ...(env.groups ? { groups: env.groups } : {}),
    items,
    source: "tools/hq/lifecycle.mjs from company/ops/projects.json (lanes' lifecycle), src/demos/*/*/meta.json, company/reviews/, company/ops/board.json, company/ops/releases.json, git",
    historySource: "the first commit of each meta.json, the commits that set its version and its published status, its dated records in company/reviews/<slug>/, its launch record and the first production deploy containing it (company/ops/releases.json); a step with no dated record is left out",
  };
}

/** Counts per type and state, for a summary. */
export function counts(p) {
  const out = {};
  for (const t of p.types) out[t.id] = Object.fromEntries(t.states.map((s) => [s.id, 0]));
  for (const i of p.items) out[i.type][i.state] = (out[i.type][i.state] ?? 0) + 1;
  return out;
}

// ------------------------------------------------------------ disk and git

function git(root, args) {
  try { return execFileSync("git", args, { cwd: root, encoding: "utf8", maxBuffer: 256 * 1024 * 1024, stdio: ["ignore", "pipe", "ignore"] }); } catch { return ""; }
}
/** git log --name-only → Map(file → [{ commit, date }], newest first). */
function fileCommits(root, args) {
  const m = new Map(); let cur = null;
  for (const line of git(root, ["log", "--format=>%H %as", "--name-only", ...args]).split("\n")) {
    if (line.startsWith(">")) { const [commit, date] = line.slice(1).split(" "); cur = { commit, date }; }
    else if (line.trim() && cur) { if (!m.has(line)) m.set(line, []); m.get(line).push(cur); }
  }
  return m;
}
/** The constants launchGates() passes to readiness(), read from tools/company.mjs's text (protected; not imported, not changed). */
export function gateOptions(root) {
  const t = (() => { try { return fs.readFileSync(path.join(root, "tools/company.mjs"), "utf8"); } catch { return ""; } })();
  const since = /const READINESS_SINCE = "(\d{4}-\d{2}-\d{2})"/.exec(t)?.[1] ?? null;
  const qaSince = /const QA_INDEPENDENT_SINCE = (?:"(\d{4}-\d{2}-\d{2})"|null)/.exec(t)?.[1] ?? null;
  const recorder = qaSince ? (rec) => (rec.d < qaSince ? null : /recorded by:[ \t]*qa-tester\b/.test(rec.t) && /kind:[ \t]*independent\b/.test(rec.t) ? null : `evidence.qa ${rec.f} is not an independent QA record`) : null;
  return { versionSince: since, recorder };
}

export function loadPipeline(root, { slugs = null } = {}) {
  const read = (f) => { try { return fs.readFileSync(path.join(root, f), "utf8"); } catch { return null; } };
  const json = (f, d) => { try { return JSON.parse(read(f)); } catch { return d; } };
  const types = typesOf(json("company/ops/projects.json", {}));
  const holds = json("company/ops/publish-holds.json", {}).holds ?? {};
  const isAncestor = gitAncestry(root);
  const readinessOpts = { ...gateOptions(root), isAncestor };

  // git: first commit of each meta.json, the newest commit that touched its version line, and its status line
  const metaGlob = "src/demos/*/*/meta.json";
  const all = fileCommits(root, ["--", metaGlob]);
  const ver = fileCommits(root, ["-G", '^  "version": *[0-9]', "--", metaGlob]);
  const pub = fileCommits(root, ["-G", '^  "status": *"published"', "--", metaGlob]);

  // deploys, oldest first: canonical releases and the historical production deploys
  const rel = json("company/ops/releases.json", {});
  const deploys = [...(rel.releases ?? []).map((r) => ({ id: r.version, date: String(r.date).slice(0, 10), at: Date.parse(r.date), commit: r.commit, target: r.target })), ...(rel.historical_deployments ?? []).map((r) => ({ id: r.id ?? `deployment-${String(r.commit).slice(0, 8)}`, date: String(r.date).slice(0, 10), at: Date.parse(r.date), commit: r.commit, target: r.target }))]
    .filter((d) => d.commit && (d.target ?? "production") === "production").sort((a, b) => a.at - b.at);
  const deployCache = new Map();
  const firstDeploy = (c) => {
    if (!c?.commit) return null;
    if (deployCache.has(c.commit)) return deployCache.get(c.commit);
    let hit = null;
    const newest = deploys.at(-1);
    if (newest && isAncestor(c.commit, newest.commit) === true) hit = deploys.filter((d) => d.date >= c.date).find((d) => isAncestor(c.commit, d.commit) === true) ?? newest;
    deployCache.set(c.commit, hit ? { id: hit.id, date: hit.date } : null);
    return deployCache.get(c.commit);
  };

  // board: open items, indexed by the slug-like words in their title and links
  const words = new Map();
  for (const i of json("company/ops/board.json", { items: [] }).items ?? []) {
    if (CLOSED.has(i.state)) continue;
    for (const w of new Set(`${i.title ?? ""} ${(i.links ?? []).join(" ")}`.toLowerCase().match(/[a-z0-9]+(?:-[a-z0-9]+)+/g) ?? [])) { if (!words.has(w)) words.set(w, []); words.get(w).push(i); }
  }
  // groups: the categories (content/domains.json) and their strands; a lesson's strand is meta.curriculum.strand, else its
  // concept's subarea in content/curriculum/<domain>.json
  const subareaOf = {};
  for (const f of fs.existsSync(path.join(root, "content/curriculum")) ? fs.readdirSync(path.join(root, "content/curriculum")).filter((x) => x.endsWith(".json")) : []) {
    const c = json(`content/curriculum/${f}`, {}); for (const x of c.concepts ?? []) if (x.subarea) subareaOf[`${c.domain}:${x.id}`] = x.subarea;
  }
  const groups = (json("content/domains.json", {}).domains ?? []).map((d) => ({ id: d.id, title: d.name ?? d.id, subgroups: (d.subareas ?? []).map((s) => ({ id: s.id, title: s.name ?? s.id })) }));
  const launches = fs.existsSync(path.join(root, "company/rituals/records")) ? fs.readdirSync(path.join(root, "company/rituals/records")).filter((f) => /launch/.test(f)).map((f) => ({ f: `company/rituals/records/${f}`, t: read(`company/rituals/records/${f}`) ?? "" })) : [];

  const lessons = [];
  for (const dom of fs.readdirSync(path.join(root, "src/demos"), { withFileTypes: true })) {
    if (!dom.isDirectory()) continue;
    for (const s of fs.readdirSync(path.join(root, "src/demos", dom.name), { withFileTypes: true })) {
      if (!s.isDirectory()) continue;
      const mf = `src/demos/${dom.name}/${s.name}/meta.json`;
      const meta = json(mf, null); if (!meta?.slug) continue;
      const dir = `company/reviews/${meta.slug}`;
      const files = fs.existsSync(path.join(root, dir)) ? fs.readdirSync(path.join(root, dir)).filter((f) => f.endsWith(".md")).map((f) => `${dir}/${f}`) : [];
      const linked = Object.values(meta.evidence ?? {}).flat().filter((f) => typeof f === "string" && !files.includes(f));
      const records = [...files, ...linked].map((f) => ({ f, t: read(f) })).filter((r) => r.t != null);
      const versionAt = ver.get(mf)?.[0] ?? null, publishedAt = meta.status === "published" ? pub.get(mf)?.[0] ?? null : null, firstAt = all.get(mf)?.at(-1) ?? null;
      const live = meta.status === "published" ? firstDeploy(versionAt && publishedAt && versionAt.date > publishedAt.date ? versionAt : publishedAt ?? versionAt) : null;
      const specText = read(`company/design/specs/${meta.slug}.md`);
      const spec = specText ? { owner: /^owner:[ \t]*([^\n·]+)/m.exec(specText)?.[1]?.trim() ?? null } : null;
      const demo = read(`src/demos/${dom.name}/${s.name}/Demo.tsx`);
      lessons.push({
        meta, records, subgroup: meta.curriculum?.strand ?? subareaOf[meta.curriculum?.primary] ?? null, board: words.get(meta.slug) ?? [], git: { versionAt, publishedAt, firstAt }, deploy: live, hold: holds[meta.slug] ?? null, spec,
        built: demo != null && demo !== read("tools/templates/Demo.tsx.tpl"),
        launchRecord: launches.find((l) => new RegExp(`(?<![a-z0-9-])${meta.slug}(?![a-z0-9-])`).test(l.t))?.f ?? null,
      });
    }
  }
  const p = pipelineOf(types, lessons, { readiness: readinessOpts, groups });
  if (slugs) p.items = p.items.filter((i) => slugs.includes(i.id.split("/").pop()));
  return p;
}

if (process.argv[1] && fileURLToPath(import.meta.url) === path.resolve(process.argv[1])) {
  const args = process.argv.slice(2), pos = args.filter((a) => !a.startsWith("--"));
  const root = path.resolve(pos[0] ?? path.join(path.dirname(fileURLToPath(import.meta.url)), "../.."));
  const slug = args.find((a) => a.startsWith("--slug="))?.slice(7);
  const p = loadPipeline(root, slug ? { slugs: [slug] } : {});
  if (args.includes("--summary")) console.log(JSON.stringify(counts(p), null, 1));
  else console.log(JSON.stringify(slug ? p.items : p, null, 1));
}
