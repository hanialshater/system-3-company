#!/usr/bin/env node
// Org evaluation (founder, 2026-10-21: "assess if agents learn, if we have process improvement and auto correction
// (fallible agents work) also if collaboration between agents is beneficial"). The org-evaluator reports to vp-meta.
//
// Code computes every number from the runs' records; the org-evaluator agent writes only judgments, each citing a
// number in the pack (the WBR's rule: if a number appears in a report, code wrote it). Four questions:
//   learning          does a role stop making a mistake class after it has been told (findings) or noted it (memory)?
//                     Memory does not travel between companies, so across runs learning can only live in process.
//   process           across runs in time order: tokens per shipped item, first-pass yield, the share of defects code
//                     catches, the share of human-caught defects that code could have caught
//   auto-correction   fallible agents: which stage catches defects (code, checker, orderer, integration) and which
//                     escape to ship (given as an escapes file from fact-checks, judges and reviews)
//   collaboration     meetings (positions, objections, decisions, rules, actions) and review: what they changed
//
//   node orgeval.mjs pack --runs=<live dir>,<live dir>… [--escapes=<json>] [--compare=<json>] [--out=<dir>]
//        writes pack.json and pack.md: the numbers the org-evaluator reads
// escapes: { "<run name>": [{ "class": "giveaway", "what": "…", "found_by": "judge|fact-check|wbr|reader" }] }
// compare: { "<run name>": { "label": "current method", "items": n, "tokens": n, "revisions": n, "judges": "…" } }
import fs from "node:fs";
import path from "node:path";
import { workStagesOf } from "./lib.mjs";

const rev = (k, v) => (v && v.__map ? new Map(v.__map) : v && v.__set ? new Set(v.__set) : v);

// A defect class from findings text. Classes code can check today are marked checkable.
export const CLASSES = [
  { id: "length", re: /\b(\d+\s*words?|word limit|too long|over the \d+|> ?\d+ words|longer than)\b/i, checkable: true },
  { id: "format", re: /\b(heading|title line|format|intro line|outside the decided|layout|first line)\b/i, checkable: true },
  { id: "numbers", re: /\b(digits?|numbers? (as|are|is)|spelled|"about"|rounded|precise number|exact (date|count))\b/i, checkable: true },
  { id: "banned", re: /\bbanned\b/i, checkable: true },
  { id: "readability", re: /\breading ease\b/i, checkable: true },
  { id: "duplicate", re: /\b(repeats? (an|another|the same)|duplicate|appears twice|give[- ]?s? away|give-away|spoiler)\b/i, checkable: true },
  { id: "fact", re: /\b(not (quite )?true|isn't (quite )?true|untrue|wrong fact|incorrect|false|actually|in fact|misleading|myth|only an? [\w -]{1,24}'s|do(es)? (breathe|have))\b/i, checkable: false },
  { id: "consistency", re: /\b(pronouns?|tense|inconsistent|contradict\w*|clash\w*|does not match|mismatch)\b/i, checkable: false },
  { id: "clarity", re: /\b(repeats the question|restates|unclear|explain|vague|confusing)\b/i, checkable: false },
];
/** Classify the head of a finding: the class line or first sentence, not the instances (a finding that lists a
 *  banned word among the things that passed is not a banned-word defect). */
export function classify(text, { whole = false } = {}) {
  const full = String(text ?? "");
  // every "Class n: …" head counts (a finding may name several classes); otherwise the first sentence
  const heads = [...full.matchAll(/class(?:\s*\d+)?\s*[:,]\s*([^.(]{0,200})/gi)].map((m) => m[1]);
  const t = (whole ? full : heads.length ? heads.join(" | ") : full.split(/[.;]|instances/i)[0]).slice(0, 600);
  const hit = CLASSES.filter((c) => c.re.test(t)).map((c) => c.id);
  return hit.length ? hit : ["other"];
}
const checkable = (cls) => CLASSES.find((c) => c.id === cls)?.checkable ?? false;
const r2 = (x) => (x == null || Number.isNaN(x) ? null : Math.round(x * 100) / 100);
const share = (a, b) => (b ? r2(a / b) : null);

export function loadRun(dir) {
  const s = JSON.parse(fs.readFileSync(path.join(dir, "state.json"), "utf8"), rev);
  return { name: path.basename(dir), dir, s };
}

/** One run's numbers. */
export function evaluateRun({ name, s, dir }, escapes = []) {
  const ev = s.log.events;
  const orders = [...s.engine.orders.values()];
  const shipped = orders.filter((o) => o.stage === "done");
  const usage = ev.filter((e) => e.type === "usage");
  const tokens = usage.reduce((a, e) => a + (e.tokens ?? 0), 0);
  const t0 = ev[0]?.t ?? 0;
  const lastShip = Math.max(...ev.filter((e) => e.type === "shipped").map((e) => e.t), t0);

  // every revise: who caught it, and what class (findings kept in history from now on; older runs: the order's last
  // findings stand for its only revise, and a revise with no findings text is "unrecorded")
  const revises = [];
  for (const o of orders) {
    const rv = o.history.filter((h) => h.verdict === "revise");
    rv.forEach((h, i) => {
      const text = h.findings ?? (rv.length === 1 || i === rv.length - 1 ? o.findings : null);
      const by = h.by === "code" ? "code" : h.stage === "check" ? "checker" : h.stage === "uat" ? "orderer" : h.stage;
      // when the work this revise judged was built: the last build before it (K25: any stage its builder signs, the
      // flow's work stages: a draft's revise judged the draft)
      const work = new Set(workStagesOf(s.engine.flows?.get?.(o.flow)));
      const built = [...o.history].filter((x) => (work.size ? work.has(x.stage) : x.stage === "build") && x.t <= h.t).at(-1)?.t ?? null;
      revises.push({ order: o.id, task: o.task, stage: h.stage, by, builder: o.builder, t: h.t, built, classes: text ? classify(text) : ["unrecorded"], text: text ? String(text).slice(0, 160) : null });
    });
  }
  const caughtBy = {};
  for (const r of revises) caughtBy[r.by] = (caughtBy[r.by] ?? 0) + 1;
  const humanCaught = revises.filter((r) => r.by !== "code");
  const humanCheckable = humanCaught.filter((r) => r.classes.some(checkable));
  const integration = orders.filter((o) => /^PACK|BOOK|ASSEMBL/i.test(o.task ?? "")).map((o) => o.task);

  // learning inside the run: a builder revised twice for the same class, the second time after being told
  const byBuilder = new Map();
  for (const r of [...revises].sort((a, b) => a.t - b.t)) {
    if (!r.builder) continue;
    const seen = byBuilder.get(r.builder) ?? new Map();
    for (const c of r.classes) { if (c === "unrecorded" || c === "other") continue; seen.set(c, [...(seen.get(c) ?? []), r]); }
    byBuilder.set(r.builder, seen);
  }
  // a repeat counts only when the later work was built after the builder had been told (work judged in the same
  // review session was built before anyone told it anything)
  const repeats = [];
  for (const [role, m] of byBuilder) for (const [c, rs] of m) {
    const told = rs[0].t;
    const later = rs.filter((x) => x.order !== rs[0].order && x.built != null && x.built > told);
    if (later.length) repeats.push({ role, class: c, told_at: rs[0].order, repeated_on: later.map((x) => x.order) });
  }
  const sameSession = [];
  for (const [role, m] of byBuilder) for (const [c, rs] of m) if (new Set(rs.map((x) => x.order)).size > 1 && !repeats.some((r) => r.role === role && r.class === c)) sameSession.push({ role, class: c, orders: [...new Set(rs.map((x) => x.order))] });
  const memory = [...(s.rooms.memory?.entries() ?? [])].map(([role, es]) => ({ role, entries: es.length, learned: es.filter((e) => e.learned).length, mistakes: es.filter((e) => e.mistake).length }));
  // a role with more than one session in the run had a chance to apply what it learned
  const sessions = [...(s.rooms.sessions?.values() ?? [])];
  const multi = [...new Set(sessions.map((x) => x.role))].filter((r) => sessions.filter((x) => x.role === r).length > 1);

  // collaboration: meetings and what they changed
  const meetings = [...(s.data?.meetings?.meetings?.values() ?? [])].map((m) => ({
    id: m.id, kind: m.kind, invitees: m.invitees.length, items: m.agenda.length,
    positions: m.agenda.reduce((a, x) => a + x.rounds.reduce((b, r) => b + Object.keys(r.positions).length, 0), 0),
    objections: m.agenda.reduce((a, x) => a + x.objections.length, 0),
    decisions: m.agenda.filter((x) => x.decision).length,
    rules: m.agenda.reduce((a, x) => a + (x.decision?.rules?.length ?? 0), 0),
    actions: m.agenda.reduce((a, x) => a + (x.decision?.actions?.length ?? 0), 0),
  }));
  const actions = [...(s.data?.tracker?.items?.values() ?? [])].filter((i) => i.kind === "action");
  const ruleHits = ev.filter((e) => e.type === "rule-applied").length;

  // code's catches before hand-in: failed self-checks (meta.mjs check logs every run of it, from ISS-2 on)
  const selfChecks = ev.filter((e) => e.type === "self-check");
  const codeCatches = selfChecks.filter((e) => !e.pass).map((e) => ({ order: e.order, task: e.task, by: e.by, classes: classify(e.output, { whole: true }), text: e.output.slice(0, 160) }));
  const integrationFixes = [];
  for (const t of integration) {
    const f = path.join(dir, "shipped", t, "page.md");
    if (!fs.existsSync(f)) continue;
    const ch = (fs.readFileSync(f, "utf8").split(/^## Changes/m)[1] ?? "").split("\n").filter((l) => /^\s*[-*]\s+\S/.test(l) && !/\bnone\b/i.test(l));
    for (const l of ch) integrationFixes.push({ task: t, classes: classify(l, { whole: true }), text: l.trim().slice(0, 160) });
  }
  const esc = escapes ?? [];
  const defectsFound = revises.length + integrationFixes.length + codeCatches.length;
  return {
    run: name,
    items: { ordered: orders.length, shipped: shipped.length, integration },
    cost: { sessions: usage.length, tokens, tokensPerShipped: shipped.length ? Math.round(tokens / shipped.length) : null, minutesToLastShip: r2(lastShip - t0) },
    autoCorrection: {
      firstPassYield: share(shipped.filter((o) => o.loops === 0).length, shipped.length),
      revises: revises.length, caughtBy: { ...caughtBy, ...(codeCatches.length ? { "code (self-check)": codeCatches.length } : {}), ...(integrationFixes.length ? { integration: integrationFixes.length } : {}) }, integrationFixes,
      selfChecks: { runs: selfChecks.length, failed: codeCatches.length, byClass: codeCatches.flatMap((c) => c.classes).reduce((a, c) => ({ ...a, [c]: (a[c] ?? 0) + 1 }), {}) },
      escaped: esc.length, escapedByClass: esc.reduce((a, e) => ({ ...a, [e.class]: (a[e.class] ?? 0) + 1 }), {}), escapedFoundBy: esc.reduce((a, e) => ({ ...a, [e.found_by]: (a[e.found_by] ?? 0) + 1 }), {}),
      caughtBeforeShip: share(defectsFound, defectsFound + esc.length),
      codeShareOfCatches: share((caughtBy.code ?? 0) + codeCatches.length, defectsFound),
      defectsFound,
      humanCatchesCodeCouldHaveMade: humanCheckable.length, ofHumanCatches: humanCaught.length,
      revisesByClass: revises.flatMap((r) => r.classes).reduce((a, c) => ({ ...a, [c]: (a[c] ?? 0) + 1 }), {}),
      revisesList: revises.map(({ order, task, by, classes, text }) => ({ order, task, by, classes, text })),
    },
    learning: { repeatsAfterBeingTold: repeats, sameClassBeforeBeingTold: sameSession, rolesWithRepeatSessions: multi, memory },
    collaboration: { meetings, rulesApplied: ruleHits, actions: { total: actions.length, done: actions.filter((a) => a.state === "done").length, cancelled: actions.filter((a) => a.state === "cancelled").length } },
  };
}

/** Across runs, in the order given (oldest first): the trend the vp reads first. */
export function trend(runs) {
  const keys = [["defectsFound", (r) => r.autoCorrection.defectsFound], ["tokensPerShipped", (r) => r.cost.tokensPerShipped], ["firstPassYield", (r) => r.autoCorrection.firstPassYield], ["caughtBeforeShip", (r) => r.autoCorrection.caughtBeforeShip], ["codeShareOfCatches", (r) => r.autoCorrection.codeShareOfCatches], ["humanCatchesCodeCouldHaveMade", (r) => r.autoCorrection.humanCatchesCodeCouldHaveMade], ["escaped", (r) => r.autoCorrection.escaped], ["rulesApplied", (r) => r.collaboration.rulesApplied]];
  return Object.fromEntries(keys.map(([k, f]) => [k, runs.map((r) => ({ run: r.run, value: f(r) }))]));
}

export function pack({ runs, escapes = {}, compare = {} }) {
  const evals = runs.map((r) => evaluateRun(r, escapes[r.name] ?? []));
  return { generated: new Date().toISOString(), runs: evals, trend: trend(evals), compare, notes: [
    "Agent memory is per company: a role's memory does not travel to the next run, so learning across runs can only show up as process (rules, checks, briefs).",
    "Revises in runs before findings were kept per revise use the order's last findings; 'unrecorded' means a revise with no findings text.",
    "Escapes come from the escapes file (blind fact-checks, judges, WBRs), not from the run's own record.",
  ] };
}

export function render(p) {
  const L = ["# Org evaluation pack (numbers by code)", "", `generated ${p.generated} · runs: ${p.runs.map((r) => r.run).join(", ")}`, ""];
  L.push("## Trend across runs (oldest first)", "| measure | " + p.runs.map((r) => r.run).join(" | ") + " |", "|---|" + p.runs.map(() => "---|").join(""));
  for (const [k, vs] of Object.entries(p.trend)) L.push(`| ${k} | ${vs.map((v) => v.value ?? "-").join(" | ")} |`);
  for (const r of p.runs) {
    const a = r.autoCorrection;
    L.push("", `## ${r.run}`, `- items: ${r.items.shipped}/${r.items.ordered} shipped${r.items.integration.length ? ` (integration: ${r.items.integration.join(", ")})` : ""}; ${r.cost.sessions} sessions, ${r.cost.tokens} tokens, ${r.cost.tokensPerShipped} per shipped item, ${r.cost.minutesToLastShip} min to the last ship`);
    L.push(`- auto-correction: first-pass yield ${a.firstPassYield}; ${a.revises} revises caught by ${JSON.stringify(a.caughtBy)}; ${a.escaped} escaped ${JSON.stringify(a.escapedByClass)} found by ${JSON.stringify(a.escapedFoundBy)}; caught before ship ${a.caughtBeforeShip}; ${a.humanCatchesCodeCouldHaveMade} of ${a.ofHumanCatches} human catches were a class code can check`);
    L.push(`- revises by class: ${JSON.stringify(a.revisesByClass)}`, ...a.revisesList.map((x) => `  - ${x.order} ${x.task} (${x.by}, ${x.classes.join("/")}): ${x.text ?? "-"}`));
    L.push(`- self-checks (code, before hand-in): ${a.selfChecks.runs} run, ${a.selfChecks.failed} failed ${JSON.stringify(a.selfChecks.byClass)}${a.selfChecks.runs ? "" : " (not logged in this run)"}`);
    if (a.integrationFixes.length) L.push(`- fixed at integration: ${a.integrationFixes.map((x) => `${x.classes.join("/")}: ${x.text}`).join(" | ")}`);
    L.push(`- learning: repeats after being told: ${r.learning.repeatsAfterBeingTold.length ? r.learning.repeatsAfterBeingTold.map((x) => `${x.role} ${x.class} (told on ${x.told_at}, again on ${x.repeated_on.join(",")})`).join("; ") : "none"}; same class on several items before any telling: ${r.learning.sameClassBeforeBeingTold.map((x) => `${x.role} ${x.class} ${x.orders.join(",")}`).join("; ") || "none"}; roles with more than one session: ${r.learning.rolesWithRepeatSessions.join(", ") || "none"}; memory ${r.learning.memory.map((m) => `${m.role} ${m.learned}/${m.entries} learned`).join(", ")}`);
    L.push(`- collaboration: ${r.collaboration.meetings.map((m) => `${m.id} (${m.kind}): ${m.positions} positions, ${m.objections} objections, ${m.decisions} decisions, ${m.rules} rules, ${m.actions} actions`).join("; ") || "no meetings"}; rules applied to orders ${r.collaboration.rulesApplied}; actions ${r.collaboration.actions.done}/${r.collaboration.actions.total} done`);
    if (p.compare[r.run]) { const c = p.compare[r.run]; L.push(`- compared with ${c.label}: ${Object.entries(c).filter(([k]) => k !== "label").map(([k, v]) => `${k} ${v}`).join(", ")}`); }
  }
  L.push("", "## Notes", ...p.notes.map((n) => `- ${n}`));
  return L.join("\n");
}

if (import.meta.url === `file://${process.argv[1]}`) {
  const opt = Object.fromEntries(process.argv.slice(2).filter((a) => a.startsWith("--")).map((a) => { const [k, ...v] = a.slice(2).split("="); return [k, v.join("=") || true]; }));
  const cmd = process.argv.slice(2).find((a) => !a.startsWith("--"));
  if (cmd !== "pack" || !opt.runs) { console.error("usage: node orgeval.mjs pack --runs=<dir>,<dir>… [--escapes=<json>] [--compare=<json>] [--out=<dir>]"); process.exit(2); }
  const runs = String(opt.runs).split(",").map((d) => loadRun(d));
  const p = pack({ runs, escapes: opt.escapes ? JSON.parse(fs.readFileSync(opt.escapes, "utf8")) : {}, compare: opt.compare ? JSON.parse(fs.readFileSync(opt.compare, "utf8")) : {} });
  if (opt.out) { fs.mkdirSync(opt.out, { recursive: true }); fs.writeFileSync(path.join(opt.out, "pack.json"), JSON.stringify(p, null, 1)); fs.writeFileSync(path.join(opt.out, "pack.md"), render(p)); }
  console.log(JSON.stringify({ ok: true, out: opt.out ?? null, runs: p.runs.map((r) => r.run), trend: p.trend }, null, 1));
}
