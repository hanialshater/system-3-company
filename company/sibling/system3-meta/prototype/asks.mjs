// Leadership asks, routed to the lowest level that can decide (founder, 2026-10-21: "leadership asks (to whom and try
// to not send everything to CEO)").
//
// An ask is a tracker item (kind "ask") assigned to its decider, with a due date. The router picks the decider from the
// ask's kind; an ask addressed higher than needed is rerouted down, unless the asker escalates with a reason. Every
// reroute and every escalation is an event, so the WBR can show how much reached the CEO and why.
//
//   kind                      decider
//   deploy, org-change        founder
//   budget                    over the chief of staff's limit → founder; over the manager's → chief of staff;
//                             otherwise the asker's lane manager (a manager asking within its own limit: refused, it is theirs)
//   cross-lane, priority      chief of staff
//   lane                      the lane's manager
//   decision                  the asker's manager (reportsTo)
//   info                      not an ask: post it to a channel or the digest
import { Refused } from "./lib.mjs";
import { create, update, comment, get } from "./tracker.mjs";

const refuse = (m) => { throw new Refused(`HARD: ${m}`); };
export const ASK_KINDS = ["deploy", "org-change", "budget", "cross-lane", "priority", "lane", "decision"];
const RANK = { founder: 0, "chief-of-staff": 1, manager: 2, builder: 3, checker: 3, release: 3, contractor: 4 };

export function route(co, { by, kind, amount = 0, lane = null }) {
  const asker = co.org.role(by);
  if (!asker?.active) refuse(`no active role ${by}`);
  const role = (lvl) => co.org.active().find((r) => r.level === lvl)?.id;
  const laneMgr = (l) => co.org.lanePOC(l)?.id;
  if (kind === "info") refuse("info is not an ask: post it to a channel or put it in the digest");
  if (!ASK_KINDS.includes(kind)) refuse(`ask kind is ${ASK_KINDS.join(", ")} (or info, which is not an ask)`);
  let to;
  if (kind === "deploy" || kind === "org-change") to = role("founder");
  else if (kind === "budget") {
    if (amount > co.engine.limits["chief-of-staff"]) to = role("founder");
    else if (amount > co.engine.limits.manager) to = role("chief-of-staff");
    else to = asker.level === "manager" ? null : laneMgr(asker.lane) ?? role("chief-of-staff");
    if (!to) refuse(`${amount} is within your own limit (${co.engine.limits.manager}): decide it yourself`);
  } else if (kind === "cross-lane" || kind === "priority") to = role("chief-of-staff");
  else if (kind === "lane") to = laneMgr(lane ?? asker.lane);
  else if (kind === "decision") to = asker.reportsTo;
  if (!to) refuse(`no one to decide a ${kind} ask`);
  if (to === by) refuse(`a ${kind} ask from ${by} is ${by}'s own to decide`);
  return to;
}

/** K14: an ask's options, from `--options` as a JSON list or `|`-separated words; null when none were given. M5
 *  review: commas no longer split ("A: deploy now, after the WBR" is one option), and a bare `--options` is refused. */
export function parseOptions(v) {
  if (v == null) return null;
  if (v === true || v === "") refuse("--options needs a value: a JSON list of strings, or options separated by |");
  let xs = v;
  if (typeof v === "string") { if (v.trim().startsWith("[")) { try { xs = JSON.parse(v); } catch { refuse("--options is a JSON list of strings or |-separated"); } } else xs = v.split("|"); }
  if (!Array.isArray(xs)) refuse("--options is a JSON list of strings or |-separated");
  xs = xs.map((x) => (typeof x === "string" ? x.trim() : x));
  if (!xs.length || xs.length > 8 || !xs.every((x) => typeof x === "string" && x && x.length <= 300)) refuse("--options are 1 to 8 non-empty strings (300 characters at most)");
  if (new Set(xs).size !== xs.length) refuse("--options are distinct");
  return xs;
}

/** M5 review: a recommendation names one of the options on offer: the option itself, or its label (the words before
 *  its first colon: "B" for "B: after M6"), alone or followed by a colon, a space or a comma and its reasons. */
export function recommends(options, rec) {
  const r = String(rec ?? "").trim().toLowerCase();
  return options.some((x) => {
    const o = x.toLowerCase(), l = o.includes(":") ? o.slice(0, o.indexOf(":")).trim() : o;
    return r === o || r.startsWith(o) || r === l || (!!l && (r.startsWith(`${l}:`) || r.startsWith(`${l} `) || r.startsWith(`${l},`)));
  });
}

export function raise(co, { by, kind, title, why, due, to = null, amount = 0, lane = null, escalate = null, goal = null, options = null, recommend = null, decider: forced = null }) {
  if (!title || !why || !due) refuse("an ask states what, why and by when");
  // K14 (plan 2026-10-21 §M5): the founder inbox gives every item its options and a recommendation
  const opts = parseOptions(options);
  if (recommend != null && (typeof recommend !== "string" || !recommend.trim())) refuse("--recommend is the asker's recommendation, in words");
  if (recommend != null && opts && !recommends(opts, recommend)) refuse(`--recommend "${recommend.trim().slice(0, 80)}" is not one of the options (${opts.join(" | ")}): recommend one of them, by its label or in full`);
  // `decider` is code's own routing (budgetDecider: a budget ask on an order), never a CLI flag
  if (forced && !co.org.role(by)?.active) refuse(`no active role ${by}`);
  const decider = forced ?? route(co, { by, kind, amount, lane });
  let assignee = decider, rerouted = false, escalated = false;
  if (to && to !== decider) {
    const higher = (RANK[co.org.role(to)?.level] ?? 9) < (RANK[co.org.role(decider).level] ?? 9);
    if (higher && escalate) { assignee = to; escalated = true; }
    else if (higher) rerouted = true;
    else refuse(`${to} cannot decide a ${kind} ask: it goes to ${decider}`);
  }
  const it = create(co, { by, kind: "ask", title, body: why, assignee, due, goal, labels: [`ask:${kind}`, ...(rerouted ? ["rerouted"] : []), ...(escalated ? ["escalated"] : [])], state: "todo", priority: 2 });
  // routedTo is the router's choice, frozen: the assignee is a tracker field anyone may edit (K8+K9 review: a builder
  // reassigned its own park ask to itself and then resumed past its own loop cap)
  it.ask = { kind, amount, from: by, addressedTo: to, decider, escalate, routedTo: assignee, answer: null, ...(opts ? { options: opts } : {}), ...(recommend != null ? { recommend: recommend.trim() } : {}) };
  if (rerouted) co.log.add({ type: "ask-reroute", item: it.id, from: by, addressedTo: to, to: decider, kind });
  if (escalated) co.log.add({ type: "ask-escalate", item: it.id, from: by, to, over: decider, reason: escalate });
  co.log.add({ type: "ask", item: it.id, from: by, to: assignee, kind });
  return it;
}

export function answer(co, { by, id, decision, text, viaOrder = false }) {
  const it = get(co, id);
  if (it.kind !== "ask") refuse(`${id} is not an ask`);
  if (by !== it.assignee) refuse(`${id} is ${it.assignee}'s to answer`);
  // K8+K9 review: a plain answer closed the loop-cap ask and left its order parked for good (settled() false, serve ran
  // to maxMin); a park ask is answered only by deciding its order
  const po = parkedOn(co, it);
  if (!viaOrder && po) refuse(`${id} asks whether parked ${po.id} goes on: answer it with \`order resume ${po.id} --by=${by} --reason='…'\` or \`order cancel ${po.id} --by=${by} --reason='…'\``);
  if (!["yes", "no", "redirect"].includes(decision) || !text) refuse("an answer is yes, no or redirect, with text");
  // K13: a budget ask on an order is decided by the router's frozen choice, never by whoever the (editable) assignee
  // now is (the builder whose order is stopped could reassign it to itself and approve its own top-up)
  const bo = budgetOrder(co, it);
  if (bo && by !== it.ask.routedTo) refuse(`${id} is a budget ask on ${bo.id}: ${it.ask.routedTo} decides it`);
  // M5 review: a yes topped up a cancelled order (its ask stayed open after the cancel)
  if (bo && ["cancelled", "done"].includes(bo.stage)) refuse(`${id} asks for a top-up of ${bo.id}, which is ${bo.stage}: there is nothing to top up`);
  if (["done", "cancelled"].includes(it.state)) refuse(`${id} is ${it.state}: it was answered or closed`);
  it.ask.answer = { decision, text, t: co.engine.clock.now() };
  comment(co, { by, id, text: `${decision}: ${text}` });
  update(co, { by, id, state: "done" });
  co.log.add({ type: "ask-answer", item: id, by, decision });
  if (bo && decision === "yes") co.engine.topUp(bo.id, { amount: it.ask.amount, by, ask: id }); // the planner takes it up again
  // M5 review: a no (or a redirect) is in force on the order itself, until its owner resumes or reopens it (Engine)
  else if (bo && bo.budgetHold?.ask === id) { bo.budgetHold.no = { decision, by, text: String(text).slice(0, 300), t: co.engine.clock.now() }; co.log.add({ type: "budget-no", order: bo.id, item: id, by, decision }); }
  return it;
}

// a top-up ask (raiseBudgetAsk); a budget park ask (raiseBudgetParkAsk) is answered by resuming its order, never a top-up
const budgetOrder = (co, it) => (it?.ask?.kind === "budget" && it.ask.order && !it.labels?.includes("parked") ? co.engine.orders.get(it.ask.order) ?? null : null);

/** K13 (plan 2026-10-21 §M5): the top-up a stopped order asks for: what it has overspent plus half its budget again. */
export const topUpFor = (o) => Math.max(0, Math.ceil((o.spent ?? 0) - o.budget)) + Math.ceil(o.budget / 2);

/** M5 review: who decides a top-up of `amount` on order `o`: over the chief of staff's limit the founder, over the
 *  manager's the chief of staff, otherwise the order's own manager (route()'s budget rule, as code applies it: an ask
 *  from the manager itself, which builds its own order or has not delegated it, was refused "decide it yourself", and
 *  the order stayed stopped with no ask anywhere, since a top-up is reachable only by answering one). */
export function budgetDecider(co, o, amount) {
  const role = (lvl) => co.org.active().find((r) => r.level === lvl)?.id ?? null;
  if (amount > co.engine.limits["chief-of-staff"]) return role("founder");
  if (amount > co.engine.limits.manager) return role("chief-of-staff");
  const m = co.org.role(o.manager);
  return (m?.active && m.level === "manager" ? m.id : null) ?? co.org.lanePOC(co.org.role(o.builder)?.lane)?.id ?? role("chief-of-staff");
}

/** K13: an order at or over its budget gets one `kind:budget` ask for a top-up, routed by amount (budgetDecider). It is
 *  raised by the order's builder (whose work stops), or its manager when there is none; one ask per budget
 *  (o.budgetHold): no repeat while it is open, nor after a no (recorded as budgetHold.no) until the budget changes or
 *  the order's owner resumes or reopens it (Engine.resume/reopen drop the hold: then it is asked again). A failed raise
 *  is retried when the order's builder or manager changes, and logged once per budget. A parked, done or cancelled
 *  order gets none (a cancelled order's open ask is closed: closeBudgetAsk). Never throws. */
export function raiseBudgetAsk(co, o) {
  if (o.stage === "cancelled") { closeBudgetAsk(co, o, { by: "engine", text: "the order is cancelled" }); return null; }
  if (!co.engine.overBudget(o) || ["done", "parked"].includes(o.stage)) return null;
  const askers = [...new Set([o.builder, o.manager].filter(Boolean))], h = o.budgetHold;
  if (h?.budget === o.budget && (h.ask || h.askers === askers.join(","))) return null;
  const amount = topUpFor(o);
  const why = [`${o.id}${o.title ? ` (${o.title})` : ""} has spent ${o.spent} of its ${o.budget}-token budget (charged from its launches' cumulative tokens). The planner starts no session on it until the budget is raised.`,
    `Asked: a top-up of ${amount} tokens (what it overspent plus half its budget again).`,
    `Decide: \`node meta.mjs ask answer --by=<you> --id=<this ask> --decision=yes --text='…'\` raises the budget by ${amount}; \`--decision=no\` keeps it stopped (then park or cancel it: \`node meta.mjs order park|cancel ${o.id} --by=<you> --reason='…'\`; a resume asks again).`].join("\n");
  const base = { kind: "budget", title: `Budget: ${o.id} at ${o.spent} of ${o.budget} tokens, top up ${amount}?`, why, due: co.engine.clock.now() + 24 * 60, amount, options: [`yes: raise the budget by ${amount}`, "no: keep it stopped (then park or cancel it)"] };
  let it = null, failed = null;
  const decider = budgetDecider(co, o, amount);
  for (const by of askers) {
    try { it = raise(co, { ...base, by, decider }); break; } catch (e) { if (!e.refused) throw e; failed = e.message; }
  }
  if (!it && !askers.length) failed = `${o.id} has no builder or manager to raise it`;
  o.budgetHold = { budget: o.budget, spent: o.spent, amount, ask: it?.id ?? null, t: co.engine.clock.now(), ...(it ? {} : { askers: askers.join(","), failed }) };
  if (!it) { co.log.add({ type: "budget-ask-failed", order: o.id, why: failed }); return null; }
  it.ask.order = o.id; it.labels.push("budget");
  co.log.add({ type: "budget-stop", order: o.id, spent: o.spent, budget: o.budget, amount, item: it.id, to: it.assignee });
  return it;
}

/** M5 review: a cancelled order's open budget ask is closed (state cancelled), so no decider is asked to top up an
 *  order that no longer runs (and the founder inbox drops it). */
export function closeBudgetAsk(co, o, { by, text }) {
  const it = o?.budgetHold?.ask && co.data.tracker?.items?.get(o.budgetHold.ask);
  if (!it || it.kind !== "ask" || ["done", "cancelled"].includes(it.state)) return null;
  comment(co, { by, id: it.id, text: `closed: ${text}` });
  update(co, { by: "engine", id: it.id, state: "cancelled" });
  co.log.add({ type: "budget-ask-closed", order: o.id, item: it.id, by, why: text });
  return it;
}

/** Asks as the WBR shows them: open asks by decider, and how much reached the founder. */
export function askSummary(co) {
  const asks = [...(co.data.tracker?.items?.values() ?? [])].filter((i) => i.kind === "ask");
  const open = asks.filter((i) => !["done", "cancelled"].includes(i.state));
  const founder = co.org.active().find((r) => r.level === "founder")?.id;
  return {
    open: open.map((i) => ({ id: i.id, title: i.title, to: i.assignee, kind: i.ask?.kind, due: i.due, from: i.ask?.from })),
    total: asks.length,
    toFounder: asks.filter((i) => i.assignee === founder).length,
    rerouted: asks.filter((i) => i.labels.includes("rerouted")).length,
    escalated: asks.filter((i) => i.labels.includes("escalated")).length,
  };
}

/** K9 (plan 2026-10-21 §3): a loop-cap park asks the order's orderer (kind decision) to resume or cancel it, with every
 *  finding so far: the decider judges the whole loop, not the last revise. Routed as any ask from the order's manager;
 *  addressed to the orderer, escalated past the manager's own report when the orderer is higher (cos → founder), and
 *  routed normally when the orderer cannot decide it. Never throws: the park has already happened. */
export function raiseParkAsk(co, o, { reason, findings = [], budget = null }) {
  if (budget) return raiseBudgetParkAsk(co, o, { reason, findings, budget });
  const lines = findings.map((f, i) => `${i + 1}. ${f.stage} (${f.verdict} by ${f.by}): ${f.findings}`);
  const why = [`${o.id}${o.title ? ` (${o.title})` : ""} is parked at ${o.parked.stage}: ${reason}.`, `Findings so far (${findings.length}):`, ...(lines.length ? lines : ["(none recorded)"]),
    `Decide: \`node meta.mjs order resume ${o.id} --by=<you> --reason='…' [--extra-loops=<n>]\` (back to ${o.parked.stage}${o.parked.loopCap ? ", one more loop by default" : ""}) or \`node meta.mjs order cancel ${o.id} --by=<you> --reason='…'\`. Either answers this ask.`].join("\n");
  const base = { by: o.manager, kind: "decision", title: `Parked ${o.id}: resume or cancel?`, why, due: co.engine.clock.now() + 24 * 60 };
  let it = null;
  for (const extra of [o.orderer && o.orderer !== o.manager ? { to: o.orderer, escalate: `${o.parked.loopCap ? "loop cap" : "parked"}: the orderer decides whether its order goes on` } : null, {}].filter(Boolean)) {
    try { it = raise(co, { ...base, ...extra }); break; } catch (e) { if (!e.refused) throw e; base.failed = e.message; }
  }
  if (!it) { co.log.add({ type: "park-ask-failed", order: o.id, why: base.failed }); return null; }
  it.ask.order = o.id; it.labels.push("parked");
  o.parked.ask = it.id;
  co.log.add({ type: "park-ask", order: o.id, item: it.id, to: it.assignee, findings: findings.length });
  return it;
}

/** M5 review: a pre-check or cmd that parks for budget (ledger-gate.mjs: the company's project gate fails) asks kind
 *  budget, routed by amount (the order's budget, or the amount the check names: budgetDecider), with the check's own
 *  text. It is still a park ask: the decider answers it by resuming the order (once the project is topped up through
 *  the project review) or cancelling it. Before, every routed park asked the orderer kind decision, and the gate's text
 *  was dropped. Never throws. */
function raiseBudgetParkAsk(co, o, { reason, findings, budget }) {
  const amount = budget.amount ?? (o.budget > 0 ? o.budget : 0);
  const why = [`${o.id}${o.title ? ` (${o.title})` : ""} is parked at ${o.parked.stage} for budget: ${reason}.`, ...(budget.text ? [budget.text] : []),
    `Findings so far (${findings.length}):`, ...findings.map((f, i) => `${i + 1}. ${f.stage} (${f.verdict} by ${f.by}): ${f.findings}`),
    `Decide: \`node meta.mjs order resume ${o.id} --by=<you> --reason='…'\` (its pre-check runs again first) or \`node meta.mjs order cancel ${o.id} --by=<you> --reason='…'\`. Either answers this ask.`].join("\n");
  const decider = budgetDecider(co, o, amount);
  let it = null, failed = decider ? null : `no one to decide a budget of ${amount}`;
  for (const by of decider ? [...new Set([o.builder, o.manager].filter(Boolean))] : []) {
    try { it = raise(co, { by, kind: "budget", title: `Parked ${o.id} for budget: resume or cancel?`, why, due: co.engine.clock.now() + 24 * 60, amount, decider, options: ["resume: once the project's budget is topped up", "cancel: stop it for good"] }); break; } catch (e) { if (!e.refused) throw e; failed = e.message; }
  }
  if (!it) { co.log.add({ type: "park-ask-failed", order: o.id, why: failed }); return null; }
  it.ask.order = o.id; it.labels.push("parked", "budget");
  o.parked.ask = it.id;
  co.log.add({ type: "park-ask", order: o.id, item: it.id, to: it.assignee, findings: findings.length, kind: "budget" });
  return it;
}

/** K8+K9 review: the order parked on ask `it` (the loop-cap ask), while it is parked on it; else null. */
export function parkedOn(co, it) {
  const po = it?.kind === "ask" && it.ask?.order && co.engine.orders.get(it.ask.order);
  return po?.stage === "parked" && po.parked?.ask === it.id ? po : null;
}

/** K8+K9 review: who may decide a park ask: the router's choice when it was raised (or the escalated `to`), never its
 *  current assignee. */
export function parkDecider(co, id) {
  const it = id && co.data.tracker?.items?.get(id);
  return it?.kind === "ask" ? it.ask?.routedTo ?? (it.labels.includes("escalated") ? it.ask?.addressedTo : it.ask?.decider) ?? null : null;
}

/** K8: `order resume` or `order cancel` answers the park's open ask (the decider's own act), or notes it when someone
 *  else (the manager, the founder) decided. */
export function closeParkAsk(co, id, { by, decision, text }) {
  const it = id && co.data.tracker?.items?.get(id);
  if (!it || it.kind !== "ask" || ["done", "cancelled"].includes(it.state)) return null;
  if (by === it.assignee) return answer(co, { by, id, decision, text, viaOrder: true });
  comment(co, { by, id, text: `${by} decided: ${text}` });
  return update(co, { by, id, state: "done" });
}
