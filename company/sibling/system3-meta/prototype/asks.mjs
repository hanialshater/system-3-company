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

export function answer(co, { by, id, decision, text }) {
  const it = get(co, id);
  if (it.kind !== "ask") refuse(`${id} is not an ask`);
  if (by !== it.assignee) refuse(`${id} is ${it.assignee}'s to answer`);
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
