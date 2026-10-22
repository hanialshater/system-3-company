#!/usr/bin/env node
// inbox-export.mjs: System 3 Meta's founder-facing items in the company's founder-inbox format (plan
// 2026-10-21-m4-m7-plan.md §M5 K14 and exit criterion 2: "Every founder-facing item (asks to the founder, `approval
// queue --approver=founder`) also appears in company/ops/founder-inbox.json format through the exporter. It is
// written on the sandbox branch only, by the chief-of-staff role's code step (that file has a single writer)").
//
//   node inbox-export.mjs [--live=<dir>] [--base=<inbox.json>|none] [--repo=<path>] [--write=<path> [--allow-main]]
//        --live: the Meta live dir (default META_LIVE_DIR; the state file is META_STATE or state.json in it)
//        --base: the inbox the Meta items merge into (default: the --write file when it exists, else the --repo
//                checkout's company/ops/founder-inbox.json, read only; `none`: start empty)
//        --write: write the merged inbox there (atomic: a temp file, then rename); without it, the merged inbox is
//                 printed in the last line's `inbox`. It refuses the main checkout's company/ops/founder-inbox.json
//                 (the chief of staff's single-writer file) unless --allow-main.
//
// Contract (plan §4): the LAST stdout line is one JSON object {ok, findings[], ...}. Exit 0 pass, 1 revise (an open
// founder item has no options: the founder inbox standard is "the options, a recommendation", so its asker raises it
// again with `ask raise --options --recommend`; the export is still produced, so the founder sees everything), 2
// usage (including a refused --write), 3 stage-error (the state or the base cannot be read, the write failed).
//
// The format, read from the company, not guessed: company/ops/founder-inbox.json is {note, items:[…]}; an item is
// {id:"F-NN", title, category, priority (1 first … 5), status ("open" | "decided" | …), blocks, options, recommendation,
// links:[repo paths], …} with `decision`/`decided` once decided and `budget` on spend (src/lib/hq.ts FounderItem and
// founderQueue: HQ shows every item whose status is not "decided"; tools/lib/ledger.mjs inboxBudgetWarnings: an open
// decision proposing spend carries `budget`, a projects.json id). Ids continue after the base's highest F number. Each
// exported item carries `meta` {source:"system3-meta", state, ref, kind, order, answer_with}: a re-export keeps its id
// and updates it in place (matched by state + ref); base items that are not Meta's are never changed.
//
// Mapping. Asks (tracker items kind "ask") assigned to the founder: category deploy for ask:deploy, approval for
// ask:org-change, decision otherwise; status open, decided once answered (decision = the answer), superseded when
// cancelled. Founder approvals (engine approvals, approver founder): release → deploy, org-change and budget →
// approval; decided once decided (decision = the founder's words), superseded when withdrawn. An item that was never
// exported and is already superseded is left out (nothing waits on the founder, nothing was decided).

import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { parseArgs } from "./lib/proc.mjs";

export const MAIN_REPO = process.env.S3C_MAIN_REPO ?? "/home/user/system-3-company"; // the chief of staff's checkout
export const INBOX = "company/ops/founder-inbox.json";
const USAGE = "usage: inbox-export.mjs [--live=<dir>] [--base=<inbox.json>|none] [--repo=<path>] [--write=<path> [--allow-main]]";
const SOURCE = "system3-meta";
const rev = (k, v) => (v && v.__map ? new Map(v.__map) : v && v.__set ? new Set(v.__set) : v); // state.mjs rev
const day = (min) => (Number.isFinite(min) ? new Date(min * 60000).toISOString().slice(0, 10) : null);
const env = (kind, message) => ({ severity: "environment", kind, message });
/** A path with its existing parent directories resolved (the file itself may not exist yet). */
const real = (p) => { const abs = path.resolve(p); try { return fs.realpathSync(abs); } catch { try { return path.join(fs.realpathSync(path.dirname(abs)), path.basename(abs)); } catch { return abs; } } };

/** The founder-inbox items for one Meta state (plain JSON as state.mjs saves it, Maps as {__map}). */
export function metaItems(st, { statePath = null } = {}) {
  const roles = st.org?.roles instanceof Map ? [...st.org.roles.values()] : [];
  const founder = roles.find((r) => r.level === "founder")?.id ?? "founder";
  const orders = st.engine?.orders instanceof Map ? st.engine.orders : new Map();
  const events = st.log?.events ?? [];
  const blocks = (id) => { const o = orders.get(id); return o ? `${o.id}${o.title ? ` (${o.title})` : ""}${o.task ? ` [${o.task}]` : ""}, ${o.stage === "parked" ? `parked at ${o.parked?.stage}` : `at ${o.stage}`}` : null; };
  const out = [];
  for (const it of st.data?.tracker?.items instanceof Map ? st.data.tracker.items.values() : []) {
    if (it.kind !== "ask" || it.assignee !== founder) continue;
    const a = it.ask ?? {}, o = orders.get(a.order);
    const parked = it.labels?.includes("parked") && o;
    const options = a.options ?? (parked ? [`resume: back to ${o.parked?.stage ?? o.cancelled?.stage ?? "its stage"}`, "cancel: stop it for good"] : null);
    const status = it.state === "done" ? "decided" : it.state === "cancelled" ? "superseded" : "open";
    const answerWith = parked ? `node meta.mjs order resume ${o.id} --by=${founder} --reason='…' | node meta.mjs order cancel ${o.id} --by=${founder} --reason='…'` : `node meta.mjs ask answer --by=${founder} --id=${it.id} --decision=yes|no|redirect --text='…'`;
    out.push(item({
      title: it.title, category: a.kind === "deploy" ? "deploy" : a.kind === "org-change" ? "approval" : "decision",
      priority: Math.min(5, Math.max(1, Number.isInteger(it.priority) ? it.priority : 2)), status,
      blocks: a.order ? blocks(a.order) : null, options, recommendation: a.recommend ?? null,
      budget: a.kind === "budget" && o?.project ? o.project : null, note: it.body ? String(it.body).slice(0, 600) : null,
      ...(status === "decided" ? { decision: a.answer ? `${a.answer.decision}: ${a.answer.text}` : (it.comments?.at(-1)?.text ?? "closed"), decided: day(a.answer?.t ?? it.updated) } : {}),
      meta: { source: SOURCE, state: statePath, ref: it.id, kind: `ask:${a.kind}`, order: a.order ?? null, answer_with: answerWith },
    }));
  }
  const changes = st.org?.changes instanceof Map ? st.org.changes : new Map();
  for (const ap of st.engine?.approvals instanceof Map ? st.engine.approvals.values() : []) {
    if (ap.approver !== founder) continue;
    const o = orders.get(ap.order), c = changes.get(ap.ref);
    const title = ap.kind === "release" ? `Release ${o?.id ?? ap.order}${o?.title ? ` (${o.title})` : ""}: approve the ${ap.stage} stage?`
      : ap.kind === "org-change" ? `Org change ${ap.ref}${c ? `: ${c.op} ${c.role?.id}${c.reason ? ` (${c.reason})` : ""}` : ""}: approve?`
      : ap.kind === "budget" ? `Budget: ${o?.id ?? ap.order}${o?.title ? ` (${o.title})` : ""} asks ${o?.budget ?? "?"} tokens, over its orderer's limit: approve?` : `${ap.kind} ${ap.ref ?? ap.order}: approve?`;
    const dec = events.filter((e) => e.type === "decide" && e.approval === ap.id).at(-1);
    const status = ["approved", "denied"].includes(ap.state) ? "decided" : ap.state === "withdrawn" ? "superseded" : "open";
    out.push(item({
      title, category: ap.kind === "release" ? "deploy" : "approval", priority: ap.timedOut ? 1 : 2, status,
      blocks: ap.order ? blocks(ap.order) : ap.ref ?? null, options: ["approve", "deny"], recommendation: null,
      budget: ap.kind === "budget" && o?.project ? o.project : null, note: null,
      ...(status === "decided" ? { decision: `${ap.state}${dec?.words ? `: "${dec.words}"` : ""}`, decided: day(dec?.t) } : {}),
      meta: { source: SOURCE, state: statePath, ref: ap.id, kind: `approval:${ap.kind}`, order: ap.order ?? null, answer_with: `node meta.mjs approval decide --ids=${ap.id} --by=${founder} --decision=approve|deny --words='…' --channel=<where you said it>` },
    }));
  }
  return out;
}

/** One item in the inbox's key order, with the keys it has no value for left out (as the hand-written items do). */
function item({ title, category, priority, status, blocks, options, recommendation, budget, note, decision, decided, meta }) {
  const x = { id: null, title, category, priority, status };
  if (blocks) x.blocks = blocks;
  if (options?.length) x.options = options;
  if (recommendation) x.recommendation = recommendation;
  x.links = [];
  if (budget) x.budget = budget;
  if (note) x.note = note;
  if (decision != null) { x.decision = decision; if (decided) x.decided = decided; }
  x.meta = meta;
  return x;
}

const fnum = (id) => Number(/^F-(\d+)$/.exec(String(id ?? ""))?.[1] ?? 0);
const key = (m) => `${m?.state ?? ""}#${m?.ref ?? ""}`;

/** Merge Meta's items into a base inbox: its own items keep their place and id, new ones are numbered after the
 *  highest F id, the rest of the base is untouched. */
export function merge(base, items) {
  const doc = { note: base?.note ?? "Everything waiting on the founder, in one place. System 3 Meta's founder-facing asks and approvals are exported here by adapters/s3c/inbox-export.mjs.", ...base, items: [...(base?.items ?? [])] };
  const at = new Map(doc.items.map((x, i) => [x.meta?.source === SOURCE ? key(x.meta) : null, i]).filter(([k]) => k));
  let n = Math.max(0, ...doc.items.map((x) => fnum(x.id)));
  const exported = [];
  for (const x of items) {
    const i = at.get(key(x.meta));
    if (i != null) { doc.items[i] = { ...x, id: doc.items[i].id }; exported.push({ id: doc.items[i].id, ref: x.meta.ref, status: x.status, updated: true }); continue; }
    if (x.status === "superseded") continue; // never shown, never decided: nothing to keep
    const id = `F-${String(++n).padStart(2, "0")}`;
    doc.items.push({ ...x, id });
    exported.push({ id, ref: x.meta.ref, status: x.status, updated: false });
  }
  return { doc, exported };
}

export function main(argv) {
  const o = parseArgs(argv);
  const usage = (message) => ({ exit: 2, out: { ok: false, stage: "inbox-export", findings: [{ severity: "environment", kind: "usage", message }], usage: USAGE } });
  for (const k of Object.keys(o)) if (!["live", "base", "repo", "write", "allow-main", "positional"].includes(k)) return usage(`unknown flag --${k}`);
  if (o.positional.length) return usage(`unexpected argument ${o.positional[0]}`);
  for (const k of ["live", "base", "repo", "write"]) if (o[k] === true || o[k] === "") return usage(`--${k} needs a value`);
  const live = o.live ?? process.env.META_LIVE_DIR;
  if (!live) return usage("no Meta state: --live=<dir> or META_LIVE_DIR");
  const statePath = path.resolve(live, process.env.META_STATE || "state.json");
  const write = o.write ? path.resolve(String(o.write)) : null;
  const mainInbox = real(path.join(MAIN_REPO, INBOX));
  if (write && real(write) === mainInbox && !o["allow-main"])
    return usage(`--write=${write} is the main checkout's ${INBOX}: the chief of staff is its single writer and Meta writes it on the sandbox branch only (pass --allow-main to override)`);
  let st;
  try { st = JSON.parse(fs.readFileSync(statePath, "utf8"), rev); }
  catch (e) { return { exit: 3, out: { ok: false, stage: "inbox-export", findings: [env("state", `cannot read the Meta state ${statePath}: ${e.message}`)] } }; }
  const basePath = o.base === "none" ? null : o.base ? path.resolve(String(o.base)) : write && fs.existsSync(write) ? write : path.join(path.resolve(String(o.repo ?? MAIN_REPO)), INBOX);
  let base = { items: [] };
  if (basePath && (o.base || fs.existsSync(basePath))) {
    try { base = JSON.parse(fs.readFileSync(basePath, "utf8")); if (!base || !Array.isArray(base.items)) throw new Error("no items list"); }
    catch (e) { return { exit: 3, out: { ok: false, stage: "inbox-export", findings: [env("base", `cannot read the base inbox ${basePath}: ${e.message}`)] } }; }
  }
  const items = metaItems(st, { statePath });
  const { doc, exported } = merge(base, items);
  const findings = items.filter((x) => x.status === "open" && !x.options?.length).map((x) => ({ severity: "block", kind: "options", route: "build", message: `${x.meta.ref} (${x.title}) reaches the founder with no options: raise it again with --options and --recommend (the founder inbox gives each item its options and a recommendation)` }));
  // a park or budget ask's options are code's, and code recommends nothing; an agent's own ask should recommend one
  const ownAsk = (x) => x.meta.kind.startsWith("ask:") && x.meta.kind !== "ask:budget" && !x.meta.answer_with.includes("order resume");
  for (const x of items) if (x.status === "open" && x.options?.length && !x.recommendation && ownAsk(x)) findings.push({ severity: "advisory", kind: "recommendation", message: `${x.meta.ref} (${x.title}) has options but no recommendation` });
  const summary = { ok: !findings.some((f) => f.severity === "block"), stage: "inbox-export", state: statePath, base: basePath && (o.base || fs.existsSync(basePath)) ? basePath : null, items: doc.items.length, founder: items.length, open: items.filter((x) => x.status === "open").length, exported, findings };
  if (write) {
    try {
      fs.mkdirSync(path.dirname(write), { recursive: true });
      const tmp = `${write}.${process.pid}.tmp`;
      fs.writeFileSync(tmp, JSON.stringify(doc, null, 2) + "\n");
      fs.renameSync(tmp, write);
    } catch (e) { return { exit: 3, out: { ...summary, ok: false, findings: [...findings, env("write", `cannot write ${write}: ${e.message}`)] } }; }
    summary.written = write;
  } else summary.inbox = doc;
  return { exit: summary.ok ? 0 : 1, out: summary };
}

if (process.argv[1] && path.resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
  let r;
  try { r = main(process.argv.slice(2)); }
  catch (e) { r = { exit: 3, out: { ok: false, stage: "inbox-export", findings: [env("crash", e.stack?.split("\n").slice(0, 3).join(" | ") ?? String(e))] } }; }
  for (const x of r.out.exported ?? []) console.log(`${x.id} ${x.status} ${x.ref}${x.updated ? " (updated)" : ""}`);
  for (const f of r.out.findings ?? []) console.log(`${f.severity} ${f.kind}: ${f.message}`);
  console.log(JSON.stringify(r.out));
  process.exitCode = r.exit;
}
