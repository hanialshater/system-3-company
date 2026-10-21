// Rituals as APIs: the WBR and the goal review, built on meetings, goals, the tracker and asks; and digests.
//
// WBR (founder, 2026-10-21: "page 0 metrics, summary, hits and misses, review of roadmap and goals status and if we
// have leadership asks (to whom and try to not send everything to CEO)"):
//   wbr open    code builds the pack: page 0 (metrics from events), hits and misses, roadmap (projects) and goals,
//               leadership asks (routed, with how many reached the founder); opens a meeting with those four items
//   (meeting)   positions, objections and decisions through meetings.mjs
//   wbr close   the chair writes the summary (the only prose code does not write); the record joins pack, summary
//               and minutes, and is posted to the company channel
// Goal review: lane → org → company (goals.rollUp); only exceptions travel up; the record goes to the founder.
// Digests: written by code from the record, per audience (founder, lane:<l>, company); `publish` posts one.
import { Refused, flowMetrics } from "./lib.mjs";
import { openMeeting, closeMeeting, getMeeting } from "./meetings.mjs";
import { goalBoard, rollUp, effective } from "./goals.mjs";
import { overdue, board } from "./tracker.mjs";
import { askSummary } from "./asks.mjs";
import { post } from "./channels.mjs";

const refuse = (m) => { throw new Refused(`HARD: ${m}`); };
const store = (co) => (co.data.rituals ??= { wbr: [], goalReviews: [], digests: [] });
const now = (co) => co.engine.clock.now();
const r1 = (x) => (x == null || Number.isNaN(x) ? null : Math.round(x * 100) / 100);

/** Page 0: the numbers, from events since `since` (the last WBR). */
export function page0(co, since = -Infinity) {
  const ev = co.log.events.filter((e) => e.t > since);
  const fm = flowMetrics({ events: ev }, co.engine.orders);
  const eff = fm.orders.map((o) => o.flowEfficiency).sort((a, b) => a - b);
  const leads = fm.orders.map((o) => o.lead).sort((a, b) => a - b);
  const cols = board(co);
  return {
    window: { from: since === -Infinity ? null : new Date(since * 60000).toISOString(), to: new Date(now(co) * 60000).toISOString() },
    shipped: fm.shipped,
    tokensPerShipped: Math.round(fm.tokensPerShipped),
    leadP50Min: r1(leads[Math.floor(leads.length / 2)] ?? null),
    flowEfficiencyMedian: r1(eff[Math.floor(eff.length / 2)] ?? null),
    revisionsPerShipped: r1(fm.loopsPerShipped),
    refusals: ev.filter((e) => e.type === "refuse").length,
    work: Object.fromEntries(Object.entries(cols).map(([k, v]) => [k, v.length])),
    overdue: overdue(co).length,
    goals: goalBoard(co).counts,
  };
}

export function hitsAndMisses(co, since = -Infinity) {
  const ev = co.log.events.filter((e) => e.t > since);
  const goals = [...(co.data.goals?.goals?.values() ?? [])];
  const doneNow = new Set(ev.filter((e) => e.type === "goal-update" && e.done).map((e) => e.goal));
  const greenNow = new Set(ev.filter((e) => e.type === "goal-update" && e.status === "green").map((e) => e.goal));
  const hits = [
    ...goals.filter((g) => doneNow.has(g.id)).map((g) => `goal ${g.id} met: ${g.title}`),
    ...goals.filter((g) => !doneNow.has(g.id) && greenNow.has(g.id) && g.updates.slice(0, -1).some((u) => u.status !== "green")).map((g) => `goal ${g.id} back to green: ${g.title}`),
    ...ev.filter((e) => e.type === "shipped" && e.loops === 0).map((e) => `${e.order} shipped first time`),
  ];
  const misses = [
    ...goals.filter((g) => effective(co, g) === "red").map((g) => `goal ${g.id} red${g.status !== "red" ? " (past due)" : ""}: ${g.title}${g.reason ? ` · ${g.reason}` : ""}`),
    ...goals.filter((g) => effective(co, g) === "yellow").map((g) => `goal ${g.id} yellow: ${g.title} · ${g.reason}`),
    ...overdue(co).map((i) => `${i.id} overdue (${i.kind}, ${i.assignee ?? "unassigned"}): ${i.title}`),
    ...ev.filter((e) => e.type === "shipped" && e.loops >= 2).map((e) => `${e.order} needed ${e.loops} revisions`),
  ];
  return { hits, misses };
}

export function roadmap(co) {
  const t = co.data.tracker;
  const goals = co.data.goals?.goals ?? new Map();
  return [...(t?.projects?.values() ?? [])].map((p) => {
    const items = [...t.items.values()].filter((i) => i.project === p.id);
    return { project: p.id, name: p.name, lead: p.lead, done: items.filter((i) => i.state === "done").length, total: items.length, goals: p.goals.map((g) => ({ id: g, status: goals.get(g) ? effective(co, goals.get(g)) : "unknown" })) };
  });
}

export function wbrOpen(co, { by, room = null, invitees = null, channel = null }) {
  if (co.org.role(by)?.level !== "chief-of-staff") refuse("the chief of staff chairs the WBR");
  const s = store(co);
  const since = s.wbr.at(-1)?.closed ?? -Infinity;
  const pack = { page0: page0(co, since), ...hitsAndMisses(co, since), roadmap: roadmap(co), goals: goalBoard(co).rows.filter((r) => r.level !== "team"), asks: askSummary(co) };
  const who = invitees ?? co.org.active().filter((r) => r.level === "manager").map((r) => r.id);
  const m = openMeeting(co, { by, title: `WBR ${new Date(now(co) * 60000).toISOString().slice(0, 10)}`, room, invitees: who, channel, kind: "wbr",
    agenda: [{ title: "Page 0: metrics" }, { title: "Hits and misses" }, { title: "Roadmap and goal status" }, { title: "Leadership asks" }] });
  m.pack = pack;
  co.log.add({ type: "wbr-open", meeting: m.id, since });
  return { meeting: m.id, pack };
}

export function wbrClose(co, { by, meeting, summary }) {
  const m = getMeeting(co, meeting);
  if (m.kind !== "wbr") refuse(`${meeting} is not a WBR`);
  if (!summary || summary.length < 20) refuse("the WBR summary is the chair's to write (at least a sentence)");
  closeMeeting(co, { id: meeting, by });
  const doc = renderWbr(m, summary);
  const rec = { meeting, closed: now(co), summary, pack: m.pack, doc };
  store(co).wbr.push(rec);
  const company = co.data.channels?.channels?.get("company");
  if (company) post(co, { by, channel: "company", title: m.title, body: doc, key: `${meeting}:wbr` });
  co.log.add({ type: "wbr-close", meeting, by });
  return rec;
}

function renderWbr(m, summary) {
  const p = m.pack;
  const L = [`# ${m.title}`, "", "## Summary", summary, "", "## Page 0", "| measure | value |", "|---|---|"];
  for (const [k, v] of Object.entries(p.page0)) L.push(`| ${k} | ${typeof v === "object" ? JSON.stringify(v) : v} |`);
  L.push("", "## Hits", ...(p.hits.length ? p.hits.map((h) => `- ${h}`) : ["- none"]), "", "## Misses", ...(p.misses.length ? p.misses.map((h) => `- ${h}`) : ["- none"]));
  L.push("", "## Roadmap", ...(p.roadmap.length ? p.roadmap.map((r) => `- ${r.name} (${r.lead}): ${r.done}/${r.total} done · goals ${r.goals.map((g) => `${g.id} ${g.status}`).join(", ") || "none"}`) : ["- no projects"]));
  L.push("", "## Goals", ...p.goals.map((g) => `- ${"  ".repeat(g.depth)}${g.id} [${g.status}] ${g.title} (${g.owner}, due ${g.due})${g.autoRed ? " · auto-red" : ""}${g.divergence ? ` · divergent: ${g.divergence}` : ""}`));
  L.push("", "## Leadership asks", `${p.asks.total} asks · ${p.asks.toFounder} to the founder · ${p.asks.rerouted} rerouted down · ${p.asks.escalated} escalated with a reason`, ...p.asks.open.map((a) => `- ${a.id} → ${a.to} (${a.kind}, due ${a.due}): ${a.title}`));
  L.push("", "## Minutes", m.minutes);
  return L.join("\n");
}

export function goalReview(co, { by }) {
  if (!["chief-of-staff", "founder"].includes(co.org.role(by)?.level)) refuse("the chief of staff or the founder runs the goal review");
  const steps = rollUp(co);
  const ceo = steps.at(-1);
  const rec = { t: now(co), by, steps: steps.map((s) => ({ level: s.level, by: s.by, own: s.own.length, exceptions: s.exceptions.length })), ceo: ceo ? { own: ceo.own, exceptions: ceo.exceptions } : null };
  store(co).goalReviews.push(rec);
  co.log.add({ type: "goal-review-ritual", by, levels: steps.length, toCeo: ceo ? ceo.own.length + ceo.exceptions.length : 0 });
  return rec;
}

/** A digest, written by code from the record. */
export function digest(co, { audience, since = null }) {
  const s = store(co);
  const from = since ?? s.digests.filter((d) => d.audience === audience).at(-1)?.t ?? -Infinity;
  const p0 = page0(co, from);
  const hm = hitsAndMisses(co, from);
  const goals = goalBoard(co).rows;
  const L = [`# Digest for ${audience}`, "", `shipped ${p0.shipped} · tokens/shipped ${p0.tokensPerShipped} · goals green ${p0.goals.green} / yellow ${p0.goals.yellow} / red ${p0.goals.red} · overdue ${p0.overdue}`, ""];
  if (audience === "founder") {
    const founder = co.org.active().find((r) => r.level === "founder")?.id;
    const a = askSummary(co);
    L.push("## Needs you", ...(a.open.filter((x) => x.to === founder).map((x) => `- ${x.id} (${x.kind}, due ${x.due}): ${x.title}`) || []), "");
    L.push("## Company and org goals", ...goals.filter((g) => ["company", "org"].includes(g.level)).map((g) => `- ${g.id} [${g.status}] ${g.title}`), "");
    const last = s.goalReviews.at(-1);
    if (last?.ceo?.exceptions?.length) L.push("## Exceptions that reached you", ...last.ceo.exceptions.map((g) => `- ${g.id} [${g.status}] ${g.title}: ${g.why_here.join("; ")}`), "");
    L.push(`Asks: ${a.total} in all, ${a.toFounder} to you, ${a.rerouted} rerouted to a lower level.`);
  } else if (audience.startsWith("lane:")) {
    const lane = audience.slice(5);
    const mgr = co.org.lanePOC(lane)?.id;
    L.push("## Lane goals", ...goals.filter((g) => g.level === "lane" && g.owner === mgr).map((g) => `- ${g.id} [${g.status}] ${g.title} (due ${g.due})`), "");
  }
  L.push("## Hits", ...(hm.hits.slice(0, 10).map((h) => `- ${h}`)), "", "## Misses", ...(hm.misses.slice(0, 10).map((h) => `- ${h}`)));
  const doc = L.join("\n");
  s.digests.push({ t: now(co), audience, doc });
  co.log.add({ type: "digest", audience });
  return doc;
}

export function publishDigest(co, { by, audience, channel }) {
  const doc = digest(co, { audience });
  return post(co, { by, channel, title: `Digest: ${audience}`, body: doc });
}
