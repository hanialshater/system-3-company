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
//   node learn.mjs retro --store=<dir> [--min=2]   the built-in code retro: a proposal (JSON) from the store alone
import fs from "node:fs";
import path from "node:path";
import { spawnSync } from "node:child_process";
import { validateCmd } from "./state.mjs";
import { sampleBounds } from "./lib.mjs";

export const RULE_MAX_CHARS = 300;
export const DEFAULT_MAX_RULES = 12;
export const DEFAULT_RETIRE_AFTER = 2;
const VAR = /^[a-z][a-z0-9_]*$/;
const LEARN_KEYS = ["store", "roles", "retro", "maxRules", "retireAfter", "classify"];
const DEFAULT_CLASSIFY = "^(?:[-*•]\\s*)?(?:failed:\\s*)?([A-Za-z][\\w ./-]{0,40}?)\\s*(?::|—|–| - )\\s";

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
  else { const st = fillVars(L.store, s.vars ?? {}); if (/\$\{/.test(st)) p.push(`learn.store: ${st} names a variable the spec's vars do not set`); else if (!path.isAbsolute(st)) p.push("learn.store is an absolute directory outside the live dir (it persists across runs)"); }
  if (!(Array.isArray(L.roles) && L.roles.length && L.roles.every((r) => roles.get(r) && !roles.get(r).human))) p.push("learn.roles is a list of the spec's agent roles (whose packs carry the playbook)");
  const R = L.retro;
  if (!R || typeof R !== "object" || Array.isArray(R) || Object.keys(R).some((k) => !["role", "run", "every"].includes(k)) || (R.role == null) === (R.run == null)) p.push("learn.retro is {role: <agent role>} or {run: <cmd>}, with an optional every: <orders>");
  else {
    if (R.role != null && !(roles.get(R.role) && !roles.get(R.role).human)) p.push(`learn.retro.role ${R.role} is an agent role of the spec`);
    if (R.run != null) { const e = validateCmd(R.run, { stages: [] }); if (e) p.push(`learn.retro.run: ${e}`); else if (R.run.route) p.push("learn.retro.run has no route (a retro signs nothing)"); }
    if (R.every != null && !(Number.isInteger(R.every) && R.every >= 1 && R.every <= 100)) p.push("learn.retro.every is a whole number of orders 1-100");
  }
  if (L.maxRules != null && !(Number.isInteger(L.maxRules) && L.maxRules >= 1 && L.maxRules <= 50)) p.push("learn.maxRules is a whole number 1-50");
  if (L.retireAfter != null && !(Number.isInteger(L.retireAfter) && L.retireAfter >= 1 && L.retireAfter <= 10)) p.push("learn.retireAfter is a whole number of runs 1-10");
  if (L.classify != null) { let ok = typeof L.classify === "string"; try { ok = ok && /\((?!\?)/.test(L.classify) && !!new RegExp(L.classify); } catch { ok = false; } if (!ok) p.push("learn.classify is a regular expression with a capture group (the defect class)"); }
  return p;
}

// ---- the store
const file = (store, f) => path.join(store, f);
export function readPlaybook(store) {
  try { return JSON.parse(fs.readFileSync(file(store, "playbook.json"), "utf8")); } catch { return { version: 0, nextId: 1, rules: [], knobs: { sample: {} }, runs: [] }; }
}
export function readEvidence(store) {
  try { return fs.readFileSync(file(store, "evidence.jsonl"), "utf8").split("\n").filter(Boolean).map((l) => JSON.parse(l)); } catch { return []; }
}
const atomic = (f, text) => { const tmp = `${f}.${process.pid}.tmp`; fs.writeFileSync(tmp, text); fs.renameSync(tmp, f); };
export function playbookMd(pb) {
  const act = pb.rules.filter((r) => r.status === "active"), old = pb.rules.filter((r) => r.status !== "active");
  const L = [`# Playbook (version ${pb.version}; written by code from validated retro proposals: do not edit)`, "", "## Active rules", ""];
  if (!act.length) L.push("none yet");
  for (const r of act) L.push(`- **${r.id}** (${(r.roles ?? []).join(", ") || "all learning roles"}; targets ${r.targets.join(", ")}): ${r.text} _helped ${r.helpedCount}, hurt ${r.hurtCount}; evidence ${r.why.join(", ")}_`);
  if (Object.keys(pb.knobs?.sample ?? {}).length) L.push("", "## Knobs", "", ...Object.entries(pb.knobs.sample).map(([k, v]) => `- sample rate ${k}: ${v}`));
  if (old.length) L.push("", "## Retired", "", ...old.map((r) => `- ${r.id}: ${r.text} (${r.retiredWhy ?? r.status})`));
  return L.join("\n") + "\n";
}
export function writePlaybook(store, pb) {
  fs.mkdirSync(store, { recursive: true });
  pb.version = (pb.version ?? 0) + 1;
  atomic(file(store, "playbook.json"), JSON.stringify(pb, null, 1) + "\n");
  atomic(file(store, "playbook.md"), playbookMd(pb));
  return pb;
}

export const learnOf = (co) => (co.spec?.learn && co.data?.learn?.store ? co.data.learn : null);
/** The active rules a role's pack carries. */
export function activeRules(co, role) {
  const L = learnOf(co);
  if (!L || !co.spec.learn.roles.includes(role)) return [];
  return readPlaybook(L.store).rules.filter((r) => r.status === "active" && (r.roles ?? co.spec.learn.roles).includes(role)).map((r) => ({ id: r.id, text: r.text }));
}

/** At init: the store (outside the live dir), this run's id, and the knobs carried from earlier runs (inside bounds). */
export function initLearn(co, { vars = {}, live }) {
  if (!co.spec.learn) return null;
  const store = path.resolve(fillVars(co.spec.learn.store, vars));
  const rel = path.relative(path.resolve(live), store);
  if (!rel || (!rel.startsWith("..") && !path.isAbsolute(rel))) throw new Error(`learn.store ${store} is inside the live dir ${live}: it must persist across runs`);
  fs.mkdirSync(store, { recursive: true });
  const run = `r${new Date().toISOString().replace(/\D/g, "").slice(0, 14)}-${Math.random().toString(36).slice(2, 6)}`;
  co.data.learn = { store, run, gathered: [], retros: [], closed: false };
  co.data.vars = vars;
  const pb = readPlaybook(store), carried = [];
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
  const revises = o.history.filter((h) => h.verdict === "revise").map((h) => ({ stage: h.stage, by: h.by, classes: classesOf(h, sdOf(h.stage), co.spec.learn.classify), findings: String(h.findings ?? "").slice(0, 400) }));
  const stages = {};
  for (const h of o.history) if (sdOf(h.stage)) (stages[h.stage] ??= []).push(h.verdict);
  const reviews = Object.fromEntries(def.stages.filter((x) => x.sample).map((x) => [x.stage, { ran: (stages[x.stage] ?? []).filter((v) => v !== "sampled-out").length, revised: (stages[x.stage] ?? []).filter((v) => v === "revise").length, sampledOut: (stages[x.stage] ?? []).filter((v) => v === "sampled-out").length, rate: engine.sampleRate(o, x) }]));
  const checks = log.events.filter((e) => e.type === "self-check" && e.order === o.id);
  // cost: the order's charged tokens, and its share of each charged launch's estimate
  let cost = 0;
  for (const c of log.events.filter((e) => e.type === "charge" && e.orders?.some((x) => x.order === o.id))) {
    const f = log.events.find((e) => e.type === "launch-finished" && e.launch === c.launch);
    if (f?.cost && c.tokens) cost += f.cost * (c.orders.find((x) => x.order === o.id).tokens / c.tokens);
  }
  const lastWork = Math.max(o.created, ...log.events.filter((e) => e.type === "enter" && e.order === o.id && engine.isWorkStage(o, e.stage)).map((e) => e.t));
  return {
    id: `E-${L.run}-${o.id}`, run: L.run, order: o.id, task: o.task ?? null, flow: def.name, outcome: o.stage, t: new Date().toISOString(),
    loops: o.loops, loopsBy: o.loopsBy ?? null, stages, reviews, revises, classes: [...new Set(revises.flatMap((r) => r.classes))],
    selfChecks: { n: checks.length, failed: checks.filter((e) => !e.pass).length }, tokens: o.spent ?? 0, costUSD: Math.round(cost * 1e4) / 1e4,
    leadMin: Math.round(((log.events.find((e) => e.type === "shipped" && e.order === o.id)?.t ?? engine.clock.now()) - o.created) * 10) / 10,
    lastWorkMs: Math.round(lastWork * 60000),
  };
}

/** Score the active rules on one order's evidence: helped when none of its target classes recurred, hurt when one did.
 *  Only rules in force before the order's last work-stage session (that session's pack carried them). */
function score(co, pb, rec) {
  const out = [];
  for (const r of pb.rules) {
    if (r.status !== "active" || !(r.addedMs <= rec.lastWorkMs)) continue;
    const hit = r.targets.filter((c) => rec.classes.includes(c));
    const k = hit.length ? "hurt" : "helped";
    r[`${k}Count`]++;
    const t = ((r.runs ??= {})[rec.run] ??= { helped: 0, hurt: 0 }); t[k]++;
    co.log.add({ type: "learn-score", rule: r.id, order: rec.order, evidence: rec.id, outcome: k, recurred: hit });
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
  const steps = [], spec = co.spec.learn, os = [...co.engine.orders.values()];
  const fresh = os.filter((o) => terminal(o) && !L.gathered.includes(o.id));
  let pb = null;
  if (fresh.length) {
    pb = readPlaybook(L.store);
    for (const o of fresh) {
      const rec = evidenceFor(co, o);
      fs.appendFileSync(file(L.store, "evidence.jsonl"), JSON.stringify(rec) + "\n");
      L.gathered.push(o.id);
      const sc = score(co, pb, rec);
      co.log.add({ type: "learn-evidence", order: o.id, evidence: rec.id, outcome: rec.outcome, loops: rec.loops, classes: rec.classes, scored: sc.length });
      steps.push({ step: "learn-evidence", order: o.id, result: rec.outcome, output: `${rec.id}: ${rec.classes.join(", ") || "no defects"}` });
    }
  }
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
 *  the harness's own machinery (a negation before the verb, "never skip the tests", is a fine rule). */
const WEAKEN = [
  { re: /\b(skip|skipping|bypass|disable|ignore|omit|avoid|turn off|leave out|don'?t run|do not run|no need to run|without running|without checking|instead of running)\b[^.;]{0,60}?\b(checks?|tests?|testing|eval|evaluation|evaluator|reviews?|guards?|hooks?|self-?tests?|self-?checks?|acceptance|test1|verification|verify)\b/i, why: "it tells someone to skip or weaken a check", negatable: true },
  { re: /\b(builder'?s? notes|build notes|NOTES\.md|hidden tests?|acceptance (?:tests?|cmd|runner|suite)|state\.json|evidence\.jsonl|playbook\.(?:json|md)|history_withheld)\b/i, why: "it points at what independence keeps out of a pack (builder notes, hidden tests) or at code's own records" },
  { re: /\b(sampled?[- ]?out|sample rate|independen\w*|--no-verify|--force|META_ROLE|META_LIVE_DIR|--by=|--verdict=pass)\b/i, why: "it touches the harness's guards (independence, sampling, roles, verdicts)" },
  { re: /\b(pass|approve|sign|accept)\b[^.;]{0,30}\b(anyway|regardless|without (?:reading|playing|running|checking))\b/i, why: "it tells a reviewer to pass work it did not judge" },
];
export function weakens(text) {
  for (const w of WEAKEN) {
    const m = w.re.exec(text);
    if (!m) continue;
    if (w.negatable && /\b(never|not|no|n't)\b[^.;]{0,25}$/i.test(text.slice(0, m.index))) continue;
    return w.why;
  }
  return null;
}
const normText = (t) => String(t).toLowerCase().replace(/\s+/g, " ").trim();
/** Why a proposed rule is refused, or null. */
export function ruleProblem(r, { evidence, pb, learn, pending = 0 }) {
  if (!r || typeof r !== "object" || Array.isArray(r) || Object.keys(r).some((k) => !["text", "why", "targets", "roles"].includes(k))) return "a rule is {text, why, targets, roles}";
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
  if (pb.rules.some((x) => x.status === "active" && normText(x.text) === normText(r.text))) return "an active rule says this already";
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
  const pb = readPlaybook(L.store), evidence = readEvidence(L.store), learn = co.spec.learn, now = new Date();
  for (const r of P.add ?? []) {
    const e = ruleProblem(r, { evidence, pb, learn });
    if (e) { refuse("add", r, e); continue; }
    const byId = new Map(evidence.map((x) => [x.id, x]));
    const rule = { id: `P-${pb.nextId++}`, text: r.text.trim(), why: r.why, targets: r.targets ?? [...new Set(r.why.flatMap((x) => byId.get(x).classes))], ...(r.roles ? { roles: r.roles } : {}), status: "active", added: now.toISOString(), addedMs: now.getTime(), run: L.run, by, retro, helpedCount: 0, hurtCount: 0, runs: {}, streak: 0 };
    pb.rules.push(rule); res.added.push(rule.id);
    co.log.add({ type: "learn-rule-add", rule: rule.id, by, retro, targets: rule.targets, why: rule.why, text: rule.text });
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
  const targeted = new Set(pb.rules.filter((r) => r.status === "active").flatMap((r) => r.targets));
  const by = new Map();
  for (const e of ev) for (const c of e.classes ?? []) (by.get(c) ?? by.set(c, []).get(c)).push(e);
  const add = [];
  for (const [c, es] of [...by].sort((a, b) => b[1].length - a[1].length)) {
    if (es.length < min || targeted.has(c)) continue;
    const ex = es.flatMap((e) => e.revises).find((r) => r.classes.includes(c));
    const eg = String(ex?.findings ?? "").split("\n").map((l) => l.trim()).find((l) => l && l.length < 120 && !/^node |exit \d/.test(l)) ?? "";
    let text = `Before you hand in, check your work for "${c}" defects: ${es.length} earlier orders were sent back for it${eg ? ` (e.g. ${eg.replace(/["\n]/g, "'")})` : ""}.`;
    if (text.length > RULE_MAX_CHARS || weakens(text)) text = `Before you hand in, check your work for "${c}" defects: ${es.length} earlier orders were sent back for it.`;
    add.push({ text, why: es.slice(-5).map((e) => e.id), targets: [c] });
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
