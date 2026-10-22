// K23 (plan 2026-10-21 §M7, exit criterion 6: "Demo Crit decisions map onto orders with no exceptions: keep → nothing,
// revise → `order reopen`, kill → `order cancel` (K8)"): a code stage whose cmd decides what happens to OTHER orders.
// The decision is the chair's (a Demo Crit record's table, adapters/s3c/rituals.mjs); reading it and turning it into
// order acts is code's, done here under the tick's lock, never by an agent's `meta.mjs order …` (a code stage runs under
// the state lock, which is not re-entrant: a cmd that ran meta.mjs from inside the tick would wait 10 s and fail).
//
//   stage { stage: "ship", signer: "code", run: {…}, acts: { by: "chair" | "<role id>", allow: ["reopen", "cancel",
//           "notice"], notify: "<role id>" } }
//
// When the stage PASSES, the last JSON line of its cmd may name `acts: [{act, order | slug (+ flow), findings | reason
// | text}]`. Each is applied as `by` (the order's chair, or the role named), once (the stage is signed once per loop):
//   reopen  a done order back to its first stage (Engine.reopen: a loop, K9's cap counts it), with the findings
//   cancel  an open or parked order (Engine.cancel; its running runs abandoned and its jobs stopped, as `order cancel`)
//   notice  a line to `notify`'s mailbox (what code could not map: a lesson with no order in this run)
// `slug` names the newest order of that slug in `flow` (default: any flow but the acting order's own). The actor must
// have the order's authority: its orderer, its manager, the founder, or a role its manager reports to (the head of
// product over cm-math's orders). Anything refused (no such order, a reopen of an open order, no authority, an act not
// in `allow`) is an `act-refused` event and a notice to `notify` with why: it never throws, and never undoes the
// stage that was signed. Applied acts are `act` events.

import { closeBudgetAsk, closeParkAsk } from "./asks.mjs";
import * as JOBS from "./jobs.mjs";

export const ACTS = ["reopen", "cancel", "notice"];
export const ACT_KEYS = ["by", "allow", "notify"];

/** Why a stage's `acts` setting is invalid, or null. `roles`: the spec's roles (Map id → role). */
export function actsProblem(x, roles) {
  const a = x?.acts;
  if (a == null) return null;
  if (typeof a !== "object" || Array.isArray(a)) return "acts is {by, allow, notify}";
  const bad = Object.keys(a).filter((k) => !ACT_KEYS.includes(k));
  if (bad.length) return `acts has unknown key ${bad.join(", ")} (${ACT_KEYS.join(", ")})`;
  if (x.signer !== "code" || x.run == null || x.async) return "acts are for a code stage with a sync run (its cmd's last JSON line names them)";
  if (a.by !== "chair" && !(roles.has(a.by) && !roles.get(a.by).human)) return `acts.by is "chair" or an agent role of the spec, not ${JSON.stringify(a.by)}`;
  if (!(Array.isArray(a.allow) && a.allow.length && a.allow.every((k) => ACTS.includes(k)))) return `acts.allow is a list of ${ACTS.join(", ")}`;
  if (a.notify != null && !(roles.has(a.notify) && !roles.get(a.notify).human)) return "acts.notify is an agent role (whose mailbox gets what code could not map)";
  return null;
}

/** Does `by` have order `t`'s authority? Its orderer, its manager, the founder, or a role above its manager. */
export function hasAuthority(co, by, t) {
  if ([t.orderer, t.manager, "founder"].includes(by)) return true;
  const seen = new Set();
  for (let r = co.org.role(t.manager); r && !seen.has(r.id); r = co.org.role(r.reportsTo)) { seen.add(r.id); if (r.id === by) return true; }
  return false;
}

const flowName = (k) => String(k ?? "").split("@")[0];
/** The order an act names: by id, or the newest order with that slug (in `flow`, else any other flow). */
export function actTarget(co, o, a) {
  const all = [...co.engine.orders.values()];
  if (typeof a.order === "string") return co.engine.orders.get(a.order) ?? null;
  if (typeof a.slug !== "string" || !a.slug) return null;
  const hits = all.filter((x) => x.id !== o.id && x.slug === a.slug && (a.flow ? flowName(x.flow) === a.flow : flowName(x.flow) !== flowName(o.flow)));
  return hits.sort((x, y) => Number(y.id.slice(2)) - Number(x.id.slice(2)))[0] ?? null;
}

/** Apply the acts the passed stage `s` of order `o` returned. Returns the steps (one per act). */
export function applyActs(co, o, s, acts, { stage } = {}) {
  const cfg = s?.acts;
  if (!cfg || !Array.isArray(acts) || !acts.length) return [];
  const { engine, rooms, mailbox, log } = co;
  const by = cfg.by === "chair" ? o.chair : cfg.by;
  const notify = cfg.notify ?? o.orderer;
  const steps = [];
  const tell = (i, text) => {
    if (!co.org.role(notify)?.active) return null;
    return mailbox.send({ from: "code", to: notify, kind: "notice", key: `act:${o.id}:${o.loops}:${i}`, ref: o.id, body: { stage, text: String(text).slice(0, 1200) } });
  };
  const refuse = (i, a, why, target = null) => {
    log.add({ type: "act-refused", order: o.id, stage, act: a?.act ?? null, target, by, why });
    tell(i, `${o.id} ${stage}: ${a?.act ?? "?"}${target ? ` ${target}` : a?.slug ? ` (slug ${a.slug})` : ""} not applied: ${why}`);
    steps.push({ step: "act", order: o.id, result: "refused", output: why });
  };
  acts.slice(0, 50).forEach((a, i) => {
    if (!a || typeof a !== "object" || !ACTS.includes(a.act)) return refuse(i, a, `an act is one of ${ACTS.join(", ")}`);
    if (!cfg.allow.includes(a.act)) return refuse(i, a, `this stage's acts allow ${cfg.allow.join(", ")}, not ${a.act}`);
    if (a.act === "notice") {
      const text = typeof a.text === "string" && a.text.trim() ? a.text : null;
      if (!text) return refuse(i, a, "a notice has text");
      tell(i, `${o.id} ${stage}: ${text}`);
      log.add({ type: "act", order: o.id, stage, act: "notice", by, to: notify, text: text.slice(0, 400) });
      return steps.push({ step: "act", order: o.id, result: "notice", output: text.slice(0, 200) });
    }
    const t = actTarget(co, o, a);
    if (!t) return refuse(i, a, typeof a.order === "string" ? `no order ${a.order}` : `no order of slug ${a.slug ?? "?"} in this run${a.flow ? ` (flow ${a.flow})` : ""}`);
    if (t.id === o.id) return refuse(i, a, "an order does not act on itself", t.id);
    if (!by || !hasAuthority(co, by, t)) return refuse(i, a, `${by ?? "nobody"} has no authority over ${t.id} (its orderer ${t.orderer}, its manager ${t.manager}, the founder, or a role its manager reports to)`, t.id);
    const words = String(a.act === "reopen" ? a.findings ?? "" : a.reason ?? a.findings ?? "").trim();
    if (!words) return refuse(i, a, `a ${a.act} says why (${a.act === "reopen" ? "findings" : "reason"})`, t.id);
    const why = `${words.slice(0, 1500)} (${o.slug ?? o.task ?? o.id}, ${o.id} ${stage})`;
    try {
      if (a.act === "reopen") {
        if (t.stage !== "done") return refuse(i, a, `${t.id} is at ${t.stage}: only a shipped order is reopened (an open one is judged by its own stages)`, t.id);
        engine.reopen(t.id, { by, findings: why, reason: `${flowName(o.flow)} ${o.slug ?? o.id}` });
      } else {
        if (["done", "cancelled"].includes(t.stage)) return refuse(i, a, `${t.id} is ${t.stage}: a shipped or cancelled order is not cancelled`, t.id);
        const ask = t.parked?.ask ?? null;
        for (const x of rooms.runs.values()) if (x.state === "running" && x.order === t.id) rooms.abandon(x.run, { by, reason: `order cancelled: ${why}` });
        engine.cancel(t.id, { by, reason: why });
        JOBS.staleFor(co, t, "order cancelled");
        if (co.data?.tracker) { closeParkAsk(co, ask, { by, decision: "no", text: `cancelled: ${why}` }); closeBudgetAsk(co, t, { by, text: `${t.id} cancelled: ${why}` }); }
      }
    } catch (e) { return refuse(i, a, String(e.message).slice(0, 300), t.id); }
    log.add({ type: "act", order: o.id, stage, act: a.act, target: t.id, by, why: why.slice(0, 400) });
    steps.push({ step: "act", order: t.id, result: a.act, output: `${a.act} ${t.id} by ${by}: ${why.slice(0, 200)}` });
  });
  return steps;
}
