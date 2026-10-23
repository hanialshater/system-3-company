// K28 (founder 2026-10-22: "a fast and more accurate harness with self-improvement"): a playbook the company learns
// across runs. Spec `learn: {store, roles, retro, maxRules, retireAfter, classify}`:
//   store        a directory outside the live dir that persists across runs (a spec variable: `vars` + init --vars)
//   roles        the roles whose packs carry the playbook's active rules
//   retro        {role: <agent role>} (one cheap session: a judgment task) or {run: <cmd>} (code), and `every: k`
//                orders (default: once, at the end of the run)
//   maxRules     active rules at most (default 12); retireAfter: runs hurt or idle in a row before code retires a rule
//   classify     a regular expression whose group 1 names a finding's defect class (default: "<class>: …" lines)
// After each order ends, code gathers its outcome evidence (the stages' verdicts, the external evaluator's and the
// acceptance cmd's findings by defect class, revise reasons, loops, self-checks, cost) into <store>/evidence.jsonl.
// A retro proposes changes ({add, retire, sample}); code validates each one (it cites evidence that exists and targets a
// defect class that evidence shows; one line, at most RULE_MAX_CHARS; never an instruction to skip a check or weaken
// independence or a guard; the size cap) and writes <store>/playbook.json and playbook.md atomically. Code scores the
// active rules on every later order (helped: the defect class it targets did not recur; hurt: it did), and at the end
// of each run retires a rule hurt or idle for retireAfter runs in a row. A retro may also move a K27 sample rate, inside
// the founder's bounds of the spec. Every decision is an event (learn-*, sample-rate).
// B7 review: only an author independent of the work (code, the founder, a reviewer) writes rules for an independent
// reviewer, and those may only add a check; a retro role proposes only during an open retro; a rule scores only when
// a stage that catches its class judged the order (else "unobserved"); the store is locked across companies, survives
// a torn evidence line, never overwrites a corrupt playbook, and is a guard root (workspace.mjs launchConfig).
//   node learn.mjs retro --store=<dir> [--min=2]   the built-in code retro: a proposal (JSON) from the store alone
import fs from "node:fs";
import path from "node:path";
import { spawnSync } from "node:child_process";
import { validateCmd, lockHolderAlive } from "./state.mjs";
import { sampleBounds, isIndependent, signerRole, classTag, DEFAULT_CLASSIFY } from "./lib.mjs";
import { ownershipOf } from "./owners.mjs";

export const RULE_MAX_CHARS = 300;
export const DEFAULT_MAX_RULES = 12;
export const DEFAULT_RETIRE_AFTER = 2;
const VAR = /^[a-z][a-z0-9_]*$/;
const LEARN_KEYS = ["store", "roles", "retro", "maxRules", "retireAfter", "classify"];

/** A spec's `vars` ({name: string}), overridden by init --vars; ${name} in learn.store. */
export const fillVars = (s, vars = {}) => String(s).replace(/\$\{([a-z][a-z0-9_]*)\}/g, (m, k) => (Object.hasOwn(vars, k) ? String(vars[k]) : m));
export function varsProblems(v) {
  if (v == null) return [];
  if (typeof v !== "object" || Array.isArray(v)) return ["vars is {<name>: <string>}"];
  return Object.entries(v).filter(([k, x]) => !VAR.test(k) || typeof x !== "string").map(([k]) => `vars.${k}: a lower_snake name with a string value`);
}

/** Why a spec's `learn` is invalid ([] when fine or absent). `roles`: the spec's roles by id. */
export function learnProblems(s, roles = new Map()) {
  const L = s?.learn;
  if (L == null) return [];
  if (typeof L !== "object" || Array.isArray(L)) return [`learn is {${LEARN_KEYS.join(", ")}}`];
  const p = [], extra = Object.keys(L).filter((k) => !LEARN_KEYS.includes(k));
  if (extra.length) p.push(`learn has unknown key${extra.length > 1 ? "s" : ""} ${extra.join(", ")} (${LEARN_KEYS.join(", ")})`);
  p.push(...varsProblems(s.vars));
  if (typeof L.store !== "string" || !L.store) p.push("learn.store is a directory (a spec variable such as ${playbook_store})");
  else {
    // B7 review: a var the spec declares as "" is set at init (--vars), so a repo spec names no machine's directory;
    // initLearn refuses an init that leaves it unset
    const st = fillVars(L.store, s.vars ?? {}), atInit = [...L.store.matchAll(/\$\{([a-z][a-z0-9_]*)\}/g)].some(([, k]) => s.vars?.[k] === "");
    if (/\$\{/.test(st)) p.push(`learn.store: ${st} names a variable the spec's vars do not set`);
    else if (!atInit && !path.isAbsolute(st)) p.push("learn.store is an absolute directory outside the live dir (it persists across runs)");
  }
  if (!(Array.isArray(L.roles) && L.roles.length && L.roles.every((r) => roles.get(r) && !roles.get(r).human))) p.push("learn.roles is a list of the spec's agent roles (whose packs carry the playbook)");
  const R = L.retro;
  if (!R || typeof R !== "object" || Array.isArray(R) || Object.keys(R).some((k) => !["role", "run", "every"].includes(k)) || (R.role == null) === (R.run == null)) p.push("learn.retro is {role: <agent role>} or {run: <cmd>}, with an optional every: <orders>");
  else {
    if (R.role != null && !(roles.get(R.role) && !roles.get(R.role).human)) p.push(`learn.retro.role ${R.role} is an agent role of the spec`);
    // B7 review: the worker never writes the playbook it is scored by (a builder-level role, or one that signs work)
    else if (R.role != null && workSide(s).has(R.role) && roles.get(R.role)?.level === "builder") p.push(`learn.retro.role ${R.role} does the work the playbook is scored on: a retro is its manager's, a reviewer's or code's`);
    if (R.run != null) { const e = validateCmd(R.run, { stages: [] }); if (e) p.push(`learn.retro.run: ${e}`); else if (R.run.route) p.push("learn.retro.run has no route (a retro signs nothing)"); }
    if (R.every != null && !(Number.isInteger(R.every) && R.every >= 1 && R.every <= 100)) p.push("learn.retro.every is a whole number of orders 1-100");
  }
  if (L.maxRules != null && !(Number.isInteger(L.maxRules) && L.maxRules >= 1 && L.maxRules <= 50)) p.push("learn.maxRules is a whole number 1-50");
  if (L.retireAfter != null && !(Number.isInteger(L.retireAfter) && L.retireAfter >= 1 && L.retireAfter <= 10)) p.push("learn.retireAfter is a whole number of runs 1-10");
  if (L.classify != null) { let ok = typeof L.classify === "string"; try { ok = ok && /\((?!\?)/.test(L.classify) && !!new RegExp(L.classify); } catch { ok = false; } if (!ok) p.push("learn.classify is a regular expression with a capture group (the defect class)"); }
  return p;
}

// ---- who is independent of the work (B7 review: the lead, the builder's manager, wrote free text into the evaluator's
// pack, even at a stage with pack.history false)
const specStages = (s) => [...(s?.flow ? [s.flow] : []), ...Object.values(s?.flows && typeof s.flows === "object" && !Array.isArray(s.flows) ? s.flows : {})].flatMap((f) => f?.stages ?? []);
const NOT_REVIEWERS = ["code", "founder", "builder", "orderer", "chair", "release"];
/** The spec's independent reviewers: the agent roles that sign an independent stage (a {role} signer, or a level). */
export function reviewerRoles(s) {
  const out = new Set();
  for (const st of specStages(s)) {
    if (!isIndependent(st) || st.run != null || (typeof st.signer === "string" && NOT_REVIEWERS.includes(st.signer))) continue;
    if (signerRole(st)) out.add(signerRole(st));
    else for (const r of s.roles ?? []) if (!r.human && r.level === st.signer) out.add(r.id);
  }
  return out;
}
/** The roles on the work side: builder- and manager-level roles (the worker and its chain) and any role that signs a
 *  stage that is not independent. They may write rules for the work side only. */
export function workSide(s) {
  const out = new Set((s?.roles ?? []).filter((r) => !r.human && ["builder", "manager", "chief-of-staff"].includes(r.level)).map((r) => r.id));
  for (const st of specStages(s)) if (!isIndependent(st) && signerRole(st)) out.add(signerRole(st));
  return out;
}
/** May `by` write rules for an independent reviewer? Code, the founder, or a reviewer that is not on the work side. */
export const independentAuthor = (s, by) => by === "code" || by === "founder" || (reviewerRoles(s).has(by) && !workSide(s).has(by));

// ---- the store
const file = (store, f) => path.join(store, f);
export class StoreError extends Error { constructor(m) { super(m); this.store = true; } }
const EMPTY = () => ({ version: 0, nextId: 1, rules: [], knobs: { sample: {} }, runs: [] });
/** The playbook. Missing: an empty one. Unreadable (B7 review: it read as empty and the next write destroyed every
 *  rule and reused their ids): a StoreError, and code writes nothing over it until a person restores it (each write
 *  keeps the version before it as playbook.json.bak). */
export function readPlaybook(store) {
  const f = file(store, "playbook.json");
  let text;
  try { text = fs.readFileSync(f, "utf8"); } catch (e) { if (e.code === "ENOENT") return EMPTY(); throw new StoreError(`${f} cannot be read (${e.code}): code writes nothing to the store until it can`); }
  let pb = null; try { pb = JSON.parse(text); } catch {}
  if (!pb || typeof pb !== "object" || !Array.isArray(pb.rules) || !Number.isInteger(pb.nextId) || !Number.isInteger(pb.version)) throw new StoreError(`${f} is corrupt: code will not overwrite it (restore it from playbook.json.bak, or move it aside to start empty)`);
  pb.knobs ??= { sample: {} }; pb.knobs.sample ??= {}; pb.runs ??= [];
  return pb;
}
/** Evidence records and the lines that could not be read (B7 review: one torn line made the whole store read as
 *  empty, and every later proposal cited "evidence that does not exist"). A bad line is skipped and reported. */
export function readEvidenceFile(store) {
  let text = "";
  try { text = fs.readFileSync(file(store, "evidence.jsonl"), "utf8"); } catch (e) { if (e.code !== "ENOENT") throw new StoreError(`evidence.jsonl cannot be read (${e.code})`); }
  const records = [], bad = [];
  text.split("\n").forEach((l, i) => { if (!l.trim()) return; try { const r = JSON.parse(l); if (r && typeof r.id === "string") records.push(r); else bad.push(i + 1); } catch { bad.push(i + 1); } });
  return { records, bad };
}
export const readEvidence = (store) => readEvidenceFile(store).records;
/** Append one record on a line of its own (a torn last line is closed first, so it never swallows the next record). */
export function appendEvidence(store, rec) {
  const f = file(store, "evidence.jsonl");
  let lead = "";
  try { const fd = fs.openSync(f, "r"), st = fs.fstatSync(fd); if (st.size) { const b = Buffer.alloc(1); fs.readSync(fd, b, 0, 1, st.size - 1); if (b[0] !== 10) lead = "\n"; } fs.closeSync(fd); } catch {}
  fs.appendFileSync(f, lead + JSON.stringify(rec) + "\n");
}
/** The store's own lock (B7 review: two companies sharing a store lost updates and handed out one rule id twice; the
 *  per-company state lock covers one company). Re-entrant within a process; a dead holder's lock is broken. */
const held = new Map();
export function withStoreLock(store, fn) {
  const key = path.resolve(store);
  if (held.get(key)) { held.set(key, held.get(key) + 1); try { return fn(); } finally { held.set(key, held.get(key) - 1); } }
  fs.mkdirSync(store, { recursive: true });
  const lock = file(store, ".lock"), until = Date.now() + 15_000;
  for (;;) {
    try { fs.writeFileSync(lock, String(process.pid), { flag: "wx" }); break; }
    catch (e) {
      if (e.code !== "EEXIST") throw e;
      let age = 0, text = "";
      try { age = Date.now() - fs.statSync(lock).mtimeMs; text = fs.readFileSync(lock, "utf8"); } catch { continue; }
      if (!lockHolderAlive(text) || age > 10 * 60_000) { fs.rmSync(lock, { force: true }); continue; }
      if (Date.now() > until) throw new StoreError(`the playbook store ${store} is locked by process ${text.trim()} (15 s)`);
      Atomics.wait(new Int32Array(new SharedArrayBuffer(4)), 0, 0, 25);
    }
  }
  held.set(key, 1);
  try { return fn(); } finally { held.delete(key); fs.rmSync(lock, { force: true }); }
}
const atomic = (f, text) => { const tmp = `${f}.${process.pid}.tmp`; fs.writeFileSync(tmp, text); fs.renameSync(tmp, f); };
export function playbookMd(pb) {
  const act = pb.rules.filter((r) => r.status === "active"), old = pb.rules.filter((r) => r.status !== "active");
  const L = [`# Playbook (version ${pb.version}; written by code from validated retro proposals: do not edit)`, "", "## Active rules", ""];
  if (!act.length) L.push("none yet");
  // K33: an owner's domain playbook is the rules in its scope (by module or role), under the global ones
  const scopeOf = (r) => (r.scope?.module ? `module ${r.scope.module}` : r.scope?.role ? `role ${r.scope.role}` : "");
  for (const r of [...act].sort((a, b) => scopeOf(a).localeCompare(scopeOf(b)))) L.push(`- **${r.id}** (${scopeOf(r) ? `${scopeOf(r)}; ` : ""}${(r.roles ?? []).join(", ") || (scopeOf(r) ? "" : "all learning roles")}${(r.roles ?? []).length || !scopeOf(r) ? "; " : ""}targets ${r.targets.join(", ")}): ${r.text} _helped ${r.helpedCount}, hurt ${r.hurtCount}; evidence ${r.why.join(", ")}_`);
  if (Object.keys(pb.knobs?.sample ?? {}).length) L.push("", "## Knobs", "", ...Object.entries(pb.knobs.sample).map(([k, v]) => `- sample rate ${k}: ${v}`));
  if (old.length) L.push("", "## Retired", "", ...old.map((r) => `- ${r.id}: ${r.text} (${r.retiredWhy ?? r.status})`));
  return L.join("\n") + "\n";
}
export function writePlaybook(store, pb) {
  fs.mkdirSync(store, { recursive: true });
  const f = file(store, "playbook.json");
  if (fs.existsSync(f)) { readPlaybook(store); fs.copyFileSync(f, `${f}.bak`); } // never over an unreadable one; keep the last good
  pb.version = (pb.version ?? 0) + 1;
  atomic(file(store, "playbook.json"), JSON.stringify(pb, null, 1) + "\n");
  atomic(file(store, "playbook.md"), playbookMd(pb));
  return pb;
}

export const learnOf = (co) => (co.spec?.learn && co.data?.learn?.store ? co.data.learn : null);
/** The active rules a role's pack carries. An independent reviewer's pack carries only rules an author independent of
 *  the work wrote (code, the founder, a reviewer), whatever the rule's roles say (B7 review). An unreadable store gives
 *  none (the supervisor's tick records the store error). */
export function activeRules(co, role) {
  const L = learnOf(co);
  if (!L || !co.spec.learn.roles.includes(role)) return [];
  let pb; try { pb = readPlaybook(L.store); } catch { return []; }
  const reviewer = reviewerRoles(co.spec).has(role);
  return pb.rules.filter((r) => r.status === "active" && (r.roles ?? co.spec.learn.roles).includes(role) && inScope(co, r, role) && (!reviewer || independentAuthor(co.spec, r.by))).map((r) => ({ id: r.id, text: r.text, ...(r.scope ? { scope: r.scope } : {}) }));
}
/** K33: is rule `r` in role `role`'s scope? A rule with no scope is global; a scope names a role, a module (its owner's
 *  rule), or both. */
export function inScope(co, r, role) {
  if (!r.scope) return true;
  if (r.scope.role != null && r.scope.role !== role) return false;
  if (r.scope.module != null && ownershipOf(co.spec)?.modules.find((m) => m.name === r.scope.module)?.owner !== role) return false;
  return true;
}
/** K33: why a rule's scope is invalid ({role, module}: a learning role, a spec module whose owner learns), or null. */
export function scopeProblem(scope, { learn, spec }) {
  if (scope == null) return null;
  if (typeof scope !== "object" || Array.isArray(scope) || !Object.keys(scope).length || Object.keys(scope).some((k) => !["role", "module"].includes(k))) return "scope is {role, module} (either or both)";
  if (scope.role != null && !learn.roles.includes(scope.role)) return `scope.role ${scope.role} is a learning role (${learn.roles.join(", ")})`;
  if (scope.module != null) {
    const m = ownershipOf(spec)?.modules.find((x) => x.name === scope.module);
    if (!m) return `scope.module ${scope.module} is none of the spec's modules`;
    if (!learn.roles.includes(m.owner)) return `scope.module ${scope.module}: its owner ${m.owner} is not a learning role (the rule would reach no pack)`;
    if (scope.role != null && scope.role !== m.owner) return `scope: module ${scope.module} is ${m.owner}'s, not ${scope.role}'s`;
  }
  return null;
}

/** At init: the store (outside the live dir), this run's id, and the knobs carried from earlier runs (inside bounds). */
export function initLearn(co, { vars = {}, live }) {
  if (!co.spec.learn) return null;
  const raw = fillVars(co.spec.learn.store, vars);
  if (/\$\{/.test(raw) || !path.isAbsolute(raw)) throw new Error(`learn.store ${raw} is not an absolute directory: set it with init --vars (the spec leaves it to init)`);
  const store = path.resolve(raw);
  const inside = (p, root) => { const rel = path.relative(root, p); return !rel || (!rel.startsWith("..") && !path.isAbsolute(rel)); };
  const realish = (p) => { let head = path.resolve(p), tail = []; while (!fs.existsSync(head) && path.dirname(head) !== head) { tail.unshift(path.basename(head)); head = path.dirname(head); } try { head = fs.realpathSync(head); } catch {} return path.join(head, ...tail); };
  // B7 review: by its real path too (a symlink into the live dir), and never the kernel's own folder
  const here = path.dirname(new URL(import.meta.url).pathname);
  for (const [root, what] of [[live, "the live dir"], [here, "the kernel's folder"]]) if (inside(store, path.resolve(root)) || inside(realish(store), realish(root))) throw new Error(`learn.store ${store} is inside ${what} ${root}: it must persist across runs, outside the kernel and the live dir`);
  fs.mkdirSync(store, { recursive: true });
  const run = `r${new Date().toISOString().replace(/\D/g, "").slice(0, 14)}-${Math.random().toString(36).slice(2, 6)}`;
  co.data.learn = { store, run, gathered: [], retros: [], closed: false };
  co.data.vars = vars;
  let pb, carried = [];
  try { pb = readPlaybook(store); } catch (e) { co.log.add({ type: "learn-store-error", store, why: e.message }); pb = EMPTY(); }
  for (const [k, rate] of Object.entries(pb.knobs?.sample ?? {})) {
    const [flow, stage] = k.split(":");
    try { co.engine.setSampleRate(flow, stage, rate, { by: "learn", why: `carried from ${store}` }); carried.push(k); }
    catch (e) { co.log.add({ type: "learn-refuse", what: "sample", key: k, rate, why: `not carried: ${e.message}` }); }
  }
  co.log.add({ type: "learn-init", store, run, rules: pb.rules.filter((r) => r.status === "active").length, carried });
  return co.data.learn;
}

// ---- evidence
const norm = (s) => String(s).toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "").slice(0, 40);
/** The defect classes of one history entry's findings: "<class>: …" lines (spec classify), a code check's category
 *  lines (its output line first), a failing node test as `<stage>-tests`; none named: the stage itself. */
export function classesOf(h, sd, classify = null) {
  const re = new RegExp(classify ?? DEFAULT_CLASSIFY);
  const lines = String(h.findings ?? "").split("\n").map((l) => l.trim()).filter(Boolean);
  const out = new Set();
  for (const l of sd?.run ? lines.slice(1) : lines) {
    if (/^# (tests|pass|fail|suites|duration|cancelled|skipped|todo)\b/.test(l) || /^\[route: /.test(l)) continue;
    if (/^not ok \d+/.test(l)) { out.add(norm(`${h.stage}-tests`)); continue; }
    const m = re.exec(l);
    if (m?.[1]) { out.add(norm(m[1])); continue; }
    if (h.by === "code" && l.length <= 40) out.add(norm(l));
  }
  if (!out.size) out.add(norm(h.stage));
  return [...out].filter(Boolean);
}
export function evidenceFor(co, o) {
  const L = learnOf(co), { engine, log } = co;
  const def = engine.flows.get(o.flow), sdOf = (st) => def?.stages.find((x) => x.stage === st);
  // K33: where K30 routed each category of a revise (its owner and module): the evidence an owner's playbook learns from
  const revises = o.history.filter((h) => h.verdict === "revise").map((h) => ({ stage: h.stage, by: h.by, classes: classesOf(h, sdOf(h.stage), co.spec.learn.classify), findings: String(h.findings ?? "").slice(0, 400), ...(h.routed ? { routed: h.routed } : {}) }));
  const owners = {}, modules = {};
  for (const r of revises) for (const [c, x] of Object.entries(r.routed ?? {})) { if (x.owner) owners[c] = x.owner; if (x.module) modules[c] = x.module; }
  const stages = {};
  for (const h of o.history) if (sdOf(h.stage)) (stages[h.stage] ??= []).push(h.verdict);
  const reviews = Object.fromEntries(def.stages.filter((x) => x.sample).map((x) => [x.stage, { ran: (stages[x.stage] ?? []).filter((v) => v !== "sampled-out").length, revised: (stages[x.stage] ?? []).filter((v) => v === "revise").length, sampledOut: (stages[x.stage] ?? []).filter((v) => v === "sampled-out").length, rate: engine.sampleRate(o, x) }]));
  const checks = log.events.filter((e) => e.type === "self-check" && e.order === o.id);
  // B7 dry run 2: the classes each stage run said it checked (a run's findings.checked), as tags
  const checked = {}; for (const h of o.history) if (Array.isArray(h.checked)) checked[h.stage] = [...new Set([...(checked[h.stage] ?? []), ...h.checked])];
  // cost: the order's charged tokens, and its share of each charged launch's estimate
  let cost = 0;
  for (const c of log.events.filter((e) => e.type === "charge" && e.orders?.some((x) => x.order === o.id))) {
    const f = log.events.find((e) => e.type === "launch-finished" && e.launch === c.launch);
    if (f?.cost && c.tokens) cost += f.cost * (c.orders.find((x) => x.order === o.id).tokens / c.tokens);
  }
  const lastWork = Math.max(o.created, ...log.events.filter((e) => e.type === "enter" && e.order === o.id && engine.isWorkStage(o, e.stage)).map((e) => e.t));
  return {
    id: `E-${L.run}-${o.id}`, run: L.run, order: o.id, task: o.task ?? null, flow: def.name, outcome: o.stage, t: new Date().toISOString(),
    loops: o.loops, loopsBy: o.loopsBy ?? null, stages, reviews, revises, ...(Object.keys(checked).length ? { checked } : {}), classes: [...new Set(revises.flatMap((r) => r.classes))],
    ...(Object.keys(owners).length ? { owners, modules } : {}),
    selfChecks: { n: checks.length, failed: checks.filter((e) => !e.pass).length }, tokens: o.spent ?? 0, costUSD: Math.round(cost * 1e4) / 1e4,
    leadMin: Math.round(((log.events.find((e) => e.type === "shipped" && e.order === o.id)?.t ?? engine.clock.now()) - o.created) * 10) / 10,
    lastWorkMs: Math.round(lastWork * 60000),
  };
}

/** The stages that have caught defect class `c` in any evidence record: where the class can be seen at all. */
const detectors = (evidence, c) => new Set(evidence.flatMap((e) => (e.revises ?? []).filter((r) => (r.classes ?? []).includes(c)).map((r) => r.stage)));
/** The stages that judged this order: any verdict but a sampled-out one (B7 review). */
export const judgedBy = (rec) => new Set(Object.entries(rec.stages ?? {}).filter(([, vs]) => vs.some((v) => v !== "sampled-out")).map(([st]) => st));
/** Score the active rules on one order's evidence: hurt when a target class recurred; helped when none did and a stage
 *  that catches it (one that caught it in some record) judged this order; otherwise unobserved, which scores nothing
 *  (B7 review: a cancelled order with no work, or one whose eval was sampled out, counted as helped, so sampling and
 *  K28 together kept rules that nothing had tested). Only rules in force before the order's last work-stage session. */
function score(co, pb, rec, evidence) {
  const out = [], ran = judgedBy(rec);
  for (const r of pb.rules) {
    if (r.status !== "active" || !(r.addedMs <= rec.lastWorkMs)) continue;
    const hit = r.targets.filter((c) => rec.classes.includes(c));
    // B7 dry run 2: a stage that lists the classes it checked (findings.checked) observes only those: G1's "padlock"
    // rule scored helped on G2, whose hidden suite has no padlock category, so a game-specific rule never retired
    const sees = (st, c) => ran.has(st) && (rec.checked?.[st] == null || rec.checked[st].includes(classTag(c)));
    const seen = r.targets.filter((c) => [...detectors(evidence, c)].some((st) => sees(st, c)));
    const k = hit.length ? "hurt" : seen.length ? "helped" : "unobserved";
    if (k !== "unobserved") { r[`${k}Count`]++; const t = ((r.runs ??= {})[rec.run] ??= { helped: 0, hurt: 0 }); t[k]++; }
    co.log.add({ type: "learn-score", rule: r.id, order: rec.order, evidence: rec.id, outcome: k, recurred: hit, ...(k === "unobserved" ? { why: `no stage that catches ${r.targets.join(", ")} judged ${rec.order} and checked it (${[...ran].join(", ") || "none ran"})` } : {}) });
    out.push({ rule: r.id, outcome: k });
  }
  return out;
}

/** The end of a run (every order ended): each active rule's run is helped, hurt (a target class recurred) or idle (no
 *  order scored it); a rule hurt or idle for retireAfter runs in a row is retired by code. Idempotent per run: orders
 *  placed after a close end the run again, and its outcome is recomputed from all of its scores (one entry per run). */
function closeRun(co, pb) {
  const L = learnOf(co), k = co.spec.learn.retireAfter ?? DEFAULT_RETIRE_AFTER, out = [];
  for (const r of pb.rules) {
    if (r.status !== "active") continue;
    const t = r.runs?.[L.run] ?? { helped: 0, hurt: 0 }, outcome = t.hurt ? "hurt" : t.helped ? "helped" : "idle";
    r.history = [...(r.history ?? []).filter((h) => h.run !== L.run), { run: L.run, outcome }];
    let n = 0; for (const h of [...r.history].reverse()) { if (h.outcome === "helped") break; n++; }
    r.streak = n;
    if (r.streak >= k) { r.status = "retired"; r.retired = new Date().toISOString(); r.retiredWhy = `code: ${outcome} ${r.streak} runs in a row (retireAfter ${k})`; co.log.add({ type: "learn-rule-retire", rule: r.id, by: "code", why: r.retiredWhy }); out.push(r.id); }
  }
  pb.runs = [...(pb.runs ?? []).filter((x) => x.run !== L.run), { run: L.run, orders: L.gathered.length, closed: new Date().toISOString() }];
  co.log.add({ type: "learn-run-closed", run: L.run, orders: L.gathered.length, retired: out });
  return out;
}

const terminal = (o) => ["done", "cancelled"].includes(o.stage);
/** Supervisor tick: gather each ended order's evidence once, score the rules, and open (and for code, run) a retro
 *  every `every` orders and once at the end of the run. Returns the steps. */
export function learnTick(co) {
  const L = learnOf(co);
  if (!L) return [];
  try { return withStoreLock(L.store, () => tickUnlocked(co, L)); }
  catch (e) {
    if (!e.store) throw e;
    // the store cannot be read or locked: nothing is gathered or written (the evidence waits), once per distinct error
    if (L.storeError !== e.message) { L.storeError = e.message; co.log.add({ type: "learn-store-error", store: L.store, why: e.message }); }
    return [{ step: "learn-store", result: "error", output: e.message }];
  }
}
function tickUnlocked(co, L) {
  const steps = [], spec = co.spec.learn, os = [...co.engine.orders.values()];
  const fresh = os.filter((o) => terminal(o) && !L.gathered.includes(o.id));
  let pb = null;
  if (fresh.length) {
    pb = readPlaybook(L.store);
    const { records: evidence, bad } = readEvidenceFile(L.store);
    if (bad.length && L.badLines !== bad.join(",")) { L.badLines = bad.join(","); co.log.add({ type: "learn-store-error", store: L.store, why: `evidence.jsonl lines ${bad.join(", ")} cannot be read: skipped` }); }
    for (const o of fresh) {
      const rec = evidenceFor(co, o);
      appendEvidence(L.store, rec); evidence.push(rec);
      L.gathered.push(o.id);
      const sc = score(co, pb, rec, evidence);
      co.log.add({ type: "learn-evidence", order: o.id, evidence: rec.id, outcome: rec.outcome, loops: rec.loops, classes: rec.classes, scored: sc.length });
      steps.push({ step: "learn-evidence", order: o.id, result: rec.outcome, output: `${rec.id}: ${rec.classes.join(", ") || "no defects"}` });
    }
  }
  delete L.storeError;
  const last = Math.max(0, ...L.retros.map((r) => r.at)), since = L.gathered.length - last;
  if (os.some((o) => !terminal(o))) L.closed = false; // new work after a close: the run ends again when it is done
  const end = os.length > 0 && os.every(terminal) && !L.closed;
  if (end) { pb ??= readPlaybook(L.store); for (const id of closeRun(co, pb)) steps.push({ step: "learn-retire", id, result: "retired" }); L.closed = true; }
  if (pb) writePlaybook(L.store, pb);
  const open = L.retros.find((r) => r.state === "open");
  if (!open && since > 0 && ((spec.retro.every && since >= spec.retro.every) || end)) {
    const r = { id: `RETRO-${L.retros.length + 1}`, state: "open", kind: spec.retro.role ? "role" : "code", role: spec.retro.role ?? null, at: L.gathered.length, orders: L.gathered.slice(last), final: end, opened: co.engine.clock.now() };
    L.retros.push(r);
    co.log.add({ type: "learn-retro-open", retro: r.id, kind: r.kind, role: r.role, orders: r.orders, final: end });
    steps.push({ step: "learn-retro", id: r.id, result: "opened", output: r.kind === "role" ? `for ${r.role}` : "code" });
    if (r.kind === "code") steps.push(runCodeRetro(co, r));
  }
  return steps;
}
/** Work the run is not done without: an open retro, or evidence not yet gathered (supervisor.mjs settled). */
export const learnPending = (co) => { const L = learnOf(co); return !!L && (L.retros.some((r) => r.state === "open") || [...co.engine.orders.values()].some((o) => terminal(o) && !L.gathered.includes(o.id)) || ([...co.engine.orders.values()].length > 0 && !L.closed)); };

function runCodeRetro(co, r) {
  const L = learnOf(co), c = co.spec.learn.retro.run, here = path.dirname(new URL(import.meta.url).pathname);
  const vars = { store: L.store, live: process.env.META_LIVE_DIR ?? "", kernel: here };
  const argv = c.argv.map((a) => a.replace(/\$\{(store|live|kernel)\}/g, (m, k) => vars[k]));
  const { NODE_TEST_CONTEXT, ...env } = process.env;
  const x = spawnSync(argv[0] === "node" ? process.execPath : argv[0], argv.slice(1), { cwd: L.store, env: { ...env, ...(c.env ?? {}) }, encoding: "utf8", timeout: c.timeoutMs ?? 60_000 });
  let proposal = null;
  for (const l of String(x.stdout ?? "").trim().split("\n").reverse()) { try { proposal = JSON.parse(l); break; } catch {} }
  if (x.status !== 0 || !proposal || typeof proposal !== "object") {
    r.state = "done"; r.error = `retro cmd: exit ${x.status}${proposal ? "" : ", no JSON proposal"}`;
    co.log.add({ type: "learn-retro-close", retro: r.id, by: "code", error: r.error });
    return { step: "learn-retro", id: r.id, result: "error", output: r.error };
  }
  const res = applyProposal(co, proposal, { by: "code", retro: r.id });
  return { step: "learn-retro", id: r.id, result: "applied", output: `added ${res.added.length}, refused ${res.refused.length}, retired ${res.retired.length}, sample ${res.sample.length}` };
}

// ---- proposals: validated change by change
/** Instructions a playbook rule may never give: skip or weaken a check, read what independence keeps out, or touch
 *  the harness's own machinery. B7 review: the list missed plain phrasings ("Tests are optional", "Don't bother with
 *  the selftest", "a waste of turns") and a negation anywhere before the verb ("It is not a problem to skip …")
 *  excused the rule; now only a prohibition right before the verb ("never skip", "do not hand in without running") is
 *  a fine rule, and every match in the text is judged. A deny list stays best effort: rules for an independent
 *  reviewer are held to more (reviewerNarrows), and only an independent author may write them (ruleProblem). */
const CHECK = "(?:checks?|checking|tests?|testing|test ?suites?|node --test|self-?tests?|self-?checks?|selftests?|evals?|evaluations?|evaluators?|reviews?|reviewing|reviewers?|guards?|hooks?|acceptance|test1|verif(?:y|ying|ication)|replay(?:s|ing)?|play-?throughs?|edge cases?)";
const WEAKEN = [
  { re: new RegExp(`\\b(skip|skipping|skips|bypass|disable|ignore|omit|avoid|drop|turn off|leave out|don'?t run|do not run|no need to run|without running|without checking|without testing|instead of running|stop running)\\b[^.;]{0,60}?\\b${CHECK}\\b`, "gi"), why: "it tells someone to skip or weaken a check", negatable: true },
  { re: new RegExp(`\\b${CHECK}\\b[^.;]{0,40}?\\b(?:is|are|seem|seems|feel|feels)\\s+(?:\\w+\\s+)?(?:optional|unnecessary|not needed|not necessary|not required|overkill|redundant|pointless|useless|a waste|wasted|enough once|not worth)`, "gi"), why: "it calls a check optional" },
  { re: new RegExp(`\\b(?:optional|unnecessary|needless|pointless|redundant|overkill|no need for|no point in|not worth|waste of (?:time|turns|tokens)|don'?t bother|do not bother|needn'?t|need not|can be skipped|may be skipped)\\b[^.;]{0,40}?\\b${CHECK}\\b`, "gi"), why: "it calls a check optional" },
  { re: new RegExp(`\\b${CHECK}\\b[^.;]{0,40}?\\b(?:waste of|wastes?|can be skipped|may be skipped|is optional|are optional)\\b`, "gi"), why: "it calls a check optional" },
  { re: /\b(?:don'?t|do not) bother\b/gi, why: "it tells someone not to bother with part of the work" },
  { re: /\b(?:never|do not|don'?t|no need to|needn'?t|stop)\s+(?:\w+\s+){0,2}?(?:run|re-?run|replay|play|test|re-?test|check|re-?check|verify|exercise|try)\b/gi, why: "it tells someone not to run, play or check part of the work" },
  { re: /\bhand(?:s|ing)?(?: it| your work| the game| the work)? in\b[^.;]{0,15}?\b(?:as soon as|right away|immediately|early|first|before (?:you )?(?:test|check|run|verif|play|replay))/gi, why: "it tells the worker to hand in before checking" },
  { re: /\b(?:pass|approve|sign|accept)\w*\b[^.;]{0,40}?\bif\b[^.;]{0,40}?\b(?:green|pass(?:es|ing)?|loads?|runs?|compiles?|starts?)\b/gi, why: "it lets a reviewer pass work on a proxy instead of judging it" },
  { re: /\balready\b[^.;]{0,30}?\b(?:verified|checked|tested|reviewed|covered|validated)\b/gi, why: "it tells someone to trust an earlier check instead of making their own" },
  { re: /\b(builder'?s? notes|build notes|NOTES\.md|hidden tests?|acceptance (?:tests?|cmd|runner|suite)|state\.json|evidence\.jsonl|playbook\.(?:json|md)|history_withheld)\b/gi, why: "it points at what independence keeps out of a pack (builder notes, hidden tests) or at code's own records" },
  { re: /\b(sampled?[- ]?out|sample rate|independen\w*|--no-verify|--force|META_ROLE|META_LIVE_DIR|--by=|--verdict=pass)\b/gi, why: "it touches the harness's guards (independence, sampling, roles, verdicts)" },
  { re: /\b(pass|approve|sign|accept)\b[^.;]{0,30}\b(anyway|regardless|without (?:reading|playing|running|checking))\b/gi, why: "it tells a reviewer to pass work it did not judge" },
];
// a prohibition right before the verb (no clause break): "never skip", "do not hand in without running"
const PROHIBIT = /\b(?:never|do not|don'?t|must not|mustn'?t|should not|shouldn'?t)\s+(?:ever\s+)?(?:(?:hand|turn)(?: it| your work| the game| the work)? in|ship|submit|finish|stop|move on|sign off)?\s*$/i;
export function weakens(text) {
  const t = String(text);
  for (const w of WEAKEN) {
    for (const m of t.matchAll(w.re)) {
      if (w.negatable && PROHIBIT.test(t.slice(0, m.index))) continue;
      return w.why;
    }
  }
  return null;
}
/** A rule for an independent reviewer may only add a check: no word that narrows, excuses or pre-decides the review. */
const NARROW = /\b(?:only|just|solely|merely|focus(?:es|ed|ing)?|limit(?:s|ed)?|restrict\w*|skip\w*|ignore\w*|trust\w*|assum\w*|already|approve\w*|sign(?:s|ed)? off|accept\w*|enough|suffic\w*|instead|rather than|don'?t|do not|never|no need|not|unless|except|lenient\w*|benefit of the doubt)\b/i;
export const reviewerNarrows = (text) => NARROW.test(String(text)) ? "a rule for an independent reviewer may only add a check: it may not narrow, excuse or pre-decide the review" : null;
const normText = (t) => String(t).toLowerCase().replace(/\s+/g, " ").trim();
/** Why a proposed rule is refused, or null. `reviewers`: the spec's independent reviewers; `independent`: whether the
 *  author is independent of the work (code, the founder, a reviewer); only such an author writes rules for a reviewer. */
export function ruleProblem(r, { evidence, pb, learn, pending = 0, reviewers = new Set(), independent = true, spec = null }) {
  if (!r || typeof r !== "object" || Array.isArray(r) || Object.keys(r).some((k) => !["text", "why", "targets", "roles", "scope"].includes(k))) return "a rule is {text, why, targets, roles, scope}";
  { const e = scopeProblem(r.scope, { learn, spec }); if (e) return e; }
  if (typeof r.text !== "string" || r.text.trim().length < 10 || r.text.length > RULE_MAX_CHARS || /\n/.test(r.text)) return `text is one line of 10-${RULE_MAX_CHARS} characters`;
  if (!(Array.isArray(r.why) && r.why.length && r.why.every((x) => typeof x === "string"))) return "why lists the evidence ids it rests on";
  const byId = new Map(evidence.map((e) => [e.id, e])), missing = r.why.filter((x) => !byId.has(x));
  if (missing.length) return `why cites evidence that does not exist: ${missing.join(", ")}`;
  const seen = new Set(r.why.flatMap((x) => byId.get(x).classes ?? []));
  const targets = r.targets ?? [...seen];
  if (!(Array.isArray(targets) && targets.length && targets.length <= 10 && targets.every((c) => typeof c === "string"))) return "a rule targets 1-10 defect classes (its cited evidence shows none)";
  const off = targets.filter((c) => !seen.has(c));
  if (off.length) return `targets ${off.join(", ")}: no defect class of the cited evidence (${[...seen].join(", ") || "none"})`;
  if (r.roles != null && !(Array.isArray(r.roles) && r.roles.length && r.roles.every((x) => learn.roles.includes(x)))) return `roles are learning roles (${learn.roles.join(", ")})`;
  const w = weakens(r.text);
  if (w) return `refused: ${w}`;
  const forReviewer = (r.roles ?? learn.roles).filter((x) => reviewers.has(x));
  if (forReviewer.length && r.roles != null && !independent) return `refused: ${forReviewer.join(", ")} review${forReviewer.length > 1 ? "" : "s"} independently: only code, the founder or a reviewer writes its rules, never the work side`;
  if (forReviewer.length && (r.roles != null || independent)) { const n = reviewerNarrows(r.text); if (n) return `refused: ${n}`; }
  if (pb.rules.some((x) => x.status === "active" && normText(x.text) === normText(r.text) && JSON.stringify(x.scope ?? null) === JSON.stringify(r.scope ?? null))) return "an active rule says this already";
  const cap = learn.maxRules ?? DEFAULT_MAX_RULES;
  if (pb.rules.filter((x) => x.status === "active").length + pending >= cap) return `the playbook holds at most ${cap} active rules (retire one first)`;
  return null;
}

/** Validate and apply a retro's proposal {add, retire, sample}: each change on its own (a refused one is an event, the
 *  rest still apply); the playbook is written atomically. */
export function applyProposal(co, proposal, { by, retro = null }) {
  const L = learnOf(co);
  if (!L) throw new Error("this company has no learn spec");
  const res = { added: [], refused: [], retired: [], sample: [] };
  const refuse = (what, item, why) => { res.refused.push({ what, item, why }); co.log.add({ type: "learn-refuse", by, retro, what, why, item: JSON.stringify(item).slice(0, 400) }); };
  const P = proposal && typeof proposal === "object" && !Array.isArray(proposal) ? proposal : null;
  const keys = P ? Object.keys(P).filter((k) => !["add", "retire", "sample", "note"].includes(k)) : [];
  const lists = P ? ["add", "retire", "sample"].every((k) => P[k] == null || Array.isArray(P[k])) : false;
  if (!P || keys.length || !lists) { refuse("proposal", proposal, "a proposal is {add: [rules], retire: [{id, why}], sample: [{stage, rate, why}], note}"); return close(co, retro, by, res); }
  return withStoreLock(L.store, () => applyUnlocked(co, P, { by, retro, res, refuse }));
}
function applyUnlocked(co, P, { by, retro, res, refuse }) {
  const L = learnOf(co);
  const pb = readPlaybook(L.store), evidence = readEvidence(L.store), learn = co.spec.learn, now = new Date();
  const reviewers = reviewerRoles(co.spec), independent = independentAuthor(co.spec, by);
  for (const r of P.add ?? []) {
    const e = ruleProblem(r, { evidence, pb, learn, reviewers, independent, spec: co.spec });
    if (e) { refuse("add", r, e); continue; }
    const byId = new Map(evidence.map((x) => [x.id, x]));
    // a work-side author's rule with no roles is for the work side's learning roles only (never a reviewer's pack)
    const roles = r.roles ?? (independent ? null : learn.roles.filter((x) => !reviewers.has(x)));
    if (roles && !roles.length) { refuse("add", r, "refused: every learning role reviews independently, and this author is on the work side"); continue; }
    const rule = { id: `P-${pb.nextId++}`, text: r.text.trim(), why: r.why, targets: r.targets ?? [...new Set(r.why.flatMap((x) => byId.get(x).classes))], ...(roles ? { roles } : {}), ...(r.scope ? { scope: r.scope } : {}), status: "active", added: now.toISOString(), addedMs: now.getTime(), run: L.run, by, retro, helpedCount: 0, hurtCount: 0, runs: {}, streak: 0 };
    pb.rules.push(rule); res.added.push(rule.id);
    co.log.add({ type: "learn-rule-add", rule: rule.id, by, retro, targets: rule.targets, why: rule.why, text: rule.text, ...(rule.scope ? { scope: rule.scope } : {}) });
  }
  for (const x of P.retire ?? []) {
    const r = pb.rules.find((y) => y.id === x?.id && y.status === "active");
    if (!r || typeof x.why !== "string" || !x.why) { refuse("retire", x, r ? "a retire says why" : `no active rule ${x?.id}`); continue; }
    r.status = "retired"; r.retired = now.toISOString(); r.retiredWhy = `${by}: ${x.why.slice(0, 200)}`; res.retired.push(r.id);
    co.log.add({ type: "learn-rule-retire", rule: r.id, by, retro, why: r.retiredWhy });
  }
  const ids = new Set(evidence.map((e) => e.id));
  for (const x of P.sample ?? []) {
    const flow = x?.flow ?? [...co.engine.active.keys()][0];
    const st = co.engine.flows.get(co.engine.active.get(flow))?.stages.find((s) => s.stage === x?.stage);
    if (!st?.sample) { refuse("sample", x, `${flow}:${x?.stage} is not a sampled stage`); continue; }
    if (!(Array.isArray(x.why) && x.why.length && x.why.every((i) => ids.has(i)))) { refuse("sample", x, "why cites evidence ids that exist"); continue; }
    const { min, max } = sampleBounds(st);
    if (!(typeof x.rate === "number" && x.rate >= min && x.rate <= max)) { refuse("sample", x, `rate ${x.rate} is outside the founder's bounds [${min}, ${max}]`); continue; }
    co.engine.setSampleRate(flow, x.stage, x.rate, { by: `learn:${by}`, why: x.why });
    ((pb.knobs ??= {}).sample ??= {})[`${flow}:${x.stage}`] = x.rate; res.sample.push({ flow, stage: x.stage, rate: x.rate });
  }
  writePlaybook(L.store, pb);
  return close(co, retro, by, res);
}
function close(co, retro, by, res) {
  const r = retro && learnOf(co)?.retros.find((x) => x.id === retro);
  if (r && r.state === "open") { r.state = "done"; r.by = by; r.result = { added: res.added, refused: res.refused.length, retired: res.retired, sample: res.sample }; co.log.add({ type: "learn-retro-close", retro: r.id, by, ...r.result }); }
  return res;
}

/** The built-in code retro: from the store alone, a rule for each defect class that recurred in at least `min` orders
 *  and no active rule targets; a lower sample rate for a sampled review that ran on 3+ orders and revised none. */
export function codeRetro(store, { min = 2 } = {}) {
  const ev = readEvidence(store), pb = readPlaybook(store);
  const targeted = new Set(pb.rules.filter((r) => r.status === "active").flatMap((r) => r.targets.map((c) => `${c}|${JSON.stringify(r.scope ?? null)}`)));
  const by = new Map();
  for (const e of ev) for (const c of e.classes ?? []) (by.get(c) ?? by.set(c, []).get(c)).push(e);
  // K33: a class K30 routed to a module (or an owner) gets a rule in that scope: the owner's own domain playbook
  const most = (xs) => { const n = new Map(); for (const x of xs.filter(Boolean)) n.set(x, (n.get(x) ?? 0) + 1); return [...n].sort((a, b) => b[1] - a[1])[0]?.[0] ?? null; };
  const add = [];
  for (const [c, es] of [...by].sort((a, b) => b[1].length - a[1].length)) {
    const mod = most(es.map((e) => e.modules?.[c])), owner = mod ? null : most(es.map((e) => e.owners?.[c]));
    const scope = mod ? { module: mod } : owner ? { role: owner } : null;
    if (es.length < min || targeted.has(`${c}|${JSON.stringify(scope)}`)) continue;
    const ex = es.flatMap((e) => e.revises).find((r) => r.classes.includes(c));
    const eg = String(ex?.findings ?? "").split("\n").map((l) => l.trim()).find((l) => l && l.length < 120 && !/^node |exit \d/.test(l)) ?? "";
    const yours = mod ? `your ${mod} module` : "your work";
    let text = `Before you hand in, check ${yours} for "${c}" defects: ${es.length} earlier orders were sent back for it${eg ? ` (e.g. ${eg.replace(/["\n]/g, "'")})` : ""}.`;
    if (text.length > RULE_MAX_CHARS || weakens(text)) text = `Before you hand in, check ${yours} for "${c}" defects: ${es.length} earlier orders were sent back for it.`;
    add.push({ text, why: es.slice(-5).map((e) => e.id), targets: [c], ...(scope ? { scope } : {}) });
  }
  const sample = [], last = ev.slice(-10);
  for (const st of new Set(last.flatMap((e) => Object.keys(e.reviews ?? {})))) {
    const rs = last.filter((e) => e.reviews?.[st]);
    if (rs.length >= 3 && rs.every((e) => e.reviews[st].ran > 0 && e.reviews[st].revised === 0)) sample.push({ flow: rs.at(-1).flow, stage: st, rate: Math.round(rs.at(-1).reviews[st].rate * 0.75 * 100) / 100, why: rs.map((e) => e.id) });
  }
  return { add, sample, note: `code retro over ${ev.length} evidence records` };
}

if (import.meta.url === `file://${process.argv[1]}`) {
  const opt = Object.fromEntries(process.argv.slice(3).filter((a) => a.startsWith("--")).map((a) => { const [k, ...v] = a.slice(2).split("="); return [k, v.join("=") || true]; }));
  if (process.argv[2] === "retro" && typeof opt.store === "string") console.log(JSON.stringify(codeRetro(opt.store, { min: Number(opt.min ?? 2) })));
  else { console.error("usage: node learn.mjs retro --store=<dir> [--min=2]"); process.exit(2); }
}
