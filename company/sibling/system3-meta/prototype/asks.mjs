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

export function raise(co, { by, kind, title, why, due, to = null, amount = 0, lane = null, escalate = null, goal = null }) {
  if (!title || !why || !due) refuse("an ask states what, why and by when");
  const decider = route(co, { by, kind, amount, lane });
  let assignee = decider, rerouted = false, escalated = false;
  if (to && to !== decider) {
    const higher = (RANK[co.org.role(to)?.level] ?? 9) < (RANK[co.org.role(decider).level] ?? 9);
    if (higher && escalate) { assignee = to; escalated = true; }
    else if (higher) rerouted = true;
    else refuse(`${to} cannot decide a ${kind} ask: it goes to ${decider}`);
  }
  const it = create(co, { by, kind: "ask", title, body: why, assignee, due, goal, labels: [`ask:${kind}`, ...(rerouted ? ["rerouted"] : []), ...(escalated ? ["escalated"] : [])], state: "todo", priority: 2 });
  it.ask = { kind, amount, from: by, addressedTo: to, decider, escalate, answer: null };
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
  const po = it.ask?.order && co.engine.orders.get(it.ask.order);
  if (!viaOrder && po?.stage === "parked" && po.parked?.ask === id) refuse(`${id} asks whether parked ${po.id} goes on: answer it with \`order resume ${po.id} --by=${by} --reason='…'\` or \`order cancel ${po.id} --by=${by} --reason='…'\``);
  if (!["yes", "no", "redirect"].includes(decision) || !text) refuse("an answer is yes, no or redirect, with text");
  it.ask.answer = { decision, text, t: co.engine.clock.now() };
  comment(co, { by, id, text: `${decision}: ${text}` });
  update(co, { by, id, state: "done" });
  co.log.add({ type: "ask-answer", item: id, by, decision });
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
export function raiseParkAsk(co, o, { reason, findings = [] }) {
  const lines = findings.map((f, i) => `${i + 1}. ${f.stage} (${f.verdict} by ${f.by}): ${f.findings}`);
  const why = [`${o.id}${o.title ? ` (${o.title})` : ""} is parked at ${o.parked.stage}: ${reason}.`, `Findings so far (${findings.length}):`, ...(lines.length ? lines : ["(none recorded)"]),
    `Decide: \`node meta.mjs order resume ${o.id} --by=<you> --reason='…' [--extra-loops=<n>]\` (back to ${o.parked.stage}, one more loop by default) or \`node meta.mjs order cancel ${o.id} --by=<you> --reason='…'\`. Either answers this ask.`].join("\n");
  const base = { by: o.manager, kind: "decision", title: `Parked ${o.id}: resume or cancel?`, why, due: co.engine.clock.now() + 24 * 60 };
  let it = null;
  for (const extra of [o.orderer && o.orderer !== o.manager ? { to: o.orderer, escalate: "loop cap: the orderer decides whether its order goes on" } : null, {}].filter(Boolean)) {
    try { it = raise(co, { ...base, ...extra }); break; } catch (e) { if (!e.refused) throw e; base.failed = e.message; }
  }
  if (!it) { co.log.add({ type: "park-ask-failed", order: o.id, why: base.failed }); return null; }
  it.ask.order = o.id; it.labels.push("parked");
  o.parked.ask = it.id;
  co.log.add({ type: "park-ask", order: o.id, item: it.id, to: it.assignee, findings: findings.length });
  return it;
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
