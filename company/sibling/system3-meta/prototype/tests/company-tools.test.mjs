import { test } from "node:test";
import assert from "node:assert/strict";
import { build } from "../toy.mjs";
import * as B from "../building.mjs";
import * as CH from "../channels.mjs";
import * as T from "../tracker.mjs";
import * as G from "../goals.mjs";
import * as M from "../meetings.mjs";
import * as A from "../asks.mjs";
import * as RIT from "../rituals.mjs";

const DAY = 24 * 60;
const iso = (co, days) => new Date((co.clock.now() + days * DAY) * 60000).toISOString().slice(0, 10);
const S = [{ metric: "pages", target: 5, current: 0 }];

// ---------------------------------------------------------------- building
test("building: floors need the founder; meeting rooms by the floor's manager; retire refused while seated or booked", () => {
  const co = build();
  assert.throws(() => B.proposeFloor(co, { by: "mgr-w", floor: 4 }), /may not propose floors/);
  const a = B.proposeFloor(co, { by: "cos", floor: 4, name: "Research" });
  assert.throws(() => B.addRoom(co, { by: "cos", id: "lab", floor: 4, kind: "lane", lane: "x" }), /floor 4 does not exist/);
  co.engine.decide(a.id, { by: "founder", decision: "approve", words: "Approve the new floor", channel: "chat" });
  B.addRoom(co, { by: "cos", id: "lab", floor: 4, kind: "lane", lane: "x" });
  assert.throws(() => B.addRoom(co, { by: "mgr-w", id: "m3", floor: 3, kind: "meeting" }), /only on its own floor/);
  B.addRoom(co, { by: "mgr-w", id: "huddle", floor: 2, kind: "meeting", capacity: 3 });
  assert.throws(() => B.addRoom(co, { by: "mgr-w", id: "x2", floor: 2, kind: "lane", lane: "w" }), /only the chief of staff/);
  assert.throws(() => B.book(co, { by: "mgr-w", room: "huddle", start: 0, end: 30, attendees: ["b-w1", "b-w2", "chk-1"] }), /capacity/);
  const bk = B.book(co, { by: "mgr-w", room: "huddle", start: 0, end: 30, attendees: ["b-w1"] });
  assert.throws(() => B.book(co, { by: "mgr-g", room: "huddle", start: 15, end: 45 }), /is booked/);
  assert.throws(() => B.book(co, { by: "mgr-g", room: "widgets", start: 15, end: 45 }), /not a meeting room/);
  assert.throws(() => B.retireRoom(co, { by: "cos", id: "widgets" }), /still seats/);
  assert.throws(() => B.retireRoom(co, { by: "cos", id: "huddle" }), /has bookings/);
  B.cancelBooking(co, { by: "mgr-w", id: bk.id });
  B.retireRoom(co, { by: "cos", id: "huddle" });
  B.renameRoom(co, { by: "mgr-w", id: "widgets", to: "workshop" });
  assert.equal(co.org.role("b-w1").room, "workshop");
  assert.ok(B.plan(co).find((f) => f.floor === 4).rooms.some((r) => r.id === "lab"));
});

// ---------------------------------------------------------------- channels
test("channels: lane and company membership is computed; posting rights; acks make 'everyone was told' checkable; re-post deduped", () => {
  const co = build();
  CH.createChannel(co, { by: "cos", id: "company", kind: "company" });
  assert.throws(() => CH.createChannel(co, { by: "mgr-w", id: "lane:g", kind: "lane" }), /may not create/);
  CH.createChannel(co, { by: "mgr-w", id: "lane:w", kind: "lane" });
  assert.deepEqual(CH.membersOf(co, "lane:w").sort(), ["b-w1", "b-w2", "mgr-w"]);
  assert.throws(() => CH.post(co, { by: "b-w1", channel: "company", title: "hi" }), /may not post/);
  const p = CH.post(co, { by: "cos", channel: "company", title: "Freeze Friday", ack: true, key: "freeze-1" });
  assert.equal(CH.post(co, { by: "cos", channel: "company", title: "Freeze Friday", ack: true, key: "freeze-1" }).id, p.id);
  assert.ok(p.to.includes("founder") && !p.to.includes("cos"));
  CH.read(co, { by: "b-w1", post: p.id, ackIt: true });
  CH.read(co, { by: "mgr-g", post: p.id });
  const st = CH.status(co, p.id);
  assert.equal(st.acked, 1);
  assert.ok(st.missingAck.includes("mgr-g") && !st.missingAck.includes("b-w1"));
  assert.equal(CH.inbox(co, "b-w2").length, 1);
});

// ---------------------------------------------------------------- tracker
test("tracker: items, projects, cycles, symmetric links, board filters, search; orders mirrored and moved only by the flow", () => {
  const co = build();
  const prj = T.createProject(co, { by: "mgr-w", name: "Storybook", lead: "mgr-w" });
  const cyc = T.createCycle(co, { by: "mgr-w", name: "C1", start: 0, end: 7 * DAY });
  assert.throws(() => T.createCycle(co, { by: "mgr-w", name: "C2", start: DAY, end: 2 * DAY }), /overlaps/);
  const a = T.create(co, { by: "mgr-w", title: "Write the bible", project: prj.id, cycle: cyc.id, assignee: "b-w1", labels: ["writing"] });
  const b = T.create(co, { by: "mgr-w", title: "Page one draft about the moon", project: prj.id, assignee: "b-w2" });
  T.link(co, { by: "mgr-w", id: a.id, type: "blocks", to: b.id });
  assert.deepEqual(T.get(co, b.id).links, [{ type: "blocked-by", to: a.id }]);
  assert.throws(() => T.create(co, { by: "mgr-w", kind: "action", title: "x" }), /assignee and a due/);
  T.update(co, { by: "b-w1", id: a.id, state: "in-progress" });
  T.comment(co, { by: "chk-1", id: b.id, text: "mind the moon phases" });
  assert.equal(T.board(co, { assignee: "b-w1" })["in-progress"].length, 1);
  assert.deepEqual(T.search(co, "moon phases").map((x) => x.id), [b.id]);
  const o = co.engine.orderNew({ flow: "item", by: "cos", to: "mgr-w", budget: 100, accept: "x", title: "Order one" });
  co.engine.delegate(o.id, { by: "mgr-w", to: "b-w1", budget: 100 });
  T.syncOrders(co);
  const oi = [...co.data.tracker.items.values()].find((i) => i.order === o.id);
  assert.equal(oi.state, "in-progress");
  assert.throws(() => T.update(co, { by: "mgr-w", id: oi.id, state: "done" }), /moves with the flow/);
  co.engine.advance(o.id, { stage: "build", by: "b-w1", evidence: "e" });
  T.syncOrders(co);
  assert.equal(oi.state, "in-review");
});

// ---------------------------------------------------------------- goals
test("goals: levels match owners, contributors land before the goal they serve, yellow/red need reason and path", () => {
  const co = build();
  const top = G.createGoal(co, { by: "founder", title: "Ship a storybook", level: "company", owner: "founder", why: "proves Meta", what: "5 pages, read aloud", success: S, due: iso(co, 30) });
  assert.throws(() => G.createGoal(co, { by: "cos", title: "x", level: "org", owner: "mgr-w", why: "w", what: "w", success: S, due: iso(co, 10), contributesTo: [top.id] }), /tracked by chief-of-staff/);
  assert.throws(() => G.createGoal(co, { by: "cos", title: "x", level: "org", owner: "cos", why: "w", what: "w", success: S, due: iso(co, 40), contributesTo: [top.id] }), /cannot land after/);
  assert.throws(() => G.createGoal(co, { by: "cos", title: "x", level: "org", owner: "cos", why: "w", what: "w", success: S, due: iso(co, 10) }), /contributes to at least one/);
  assert.throws(() => G.createGoal(co, { by: "cos", title: "x", level: "org", owner: "cos", why: "w", what: "w", success: [{ metric: "a" }], due: iso(co, 10), contributesTo: [top.id] }), /success is a list/);
  const org = G.createGoal(co, { by: "cos", title: "Pipeline", level: "org", owner: "cos", why: "w", what: "w", success: S, due: iso(co, 20), contributesTo: [top.id] });
  assert.throws(() => G.updateGoal(co, { by: "cos", id: org.id, status: "yellow" }), /reason and the path/);
  const lane = G.createGoal(co, { by: "mgr-w", title: "Pages drafted", level: "lane", owner: "mgr-w", why: "w", what: "w", success: S, due: iso(co, 10), contributesTo: [org.id] });
  G.updateGoal(co, { by: "mgr-w", id: lane.id, status: "red", reason: "writer out", path: "hire a contractor" });
  assert.throws(() => G.updateGoal(co, { by: "cos", id: org.id, status: "green" }), /red contributor: green needs a divergence reason/);
  G.updateGoal(co, { by: "cos", id: org.id, status: "green", divergence: "slack in the plan absorbs a week" });
  assert.throws(() => G.updateGoal(co, { by: "mgr-g", id: lane.id, status: "green" }), /does not own/);
  assert.throws(() => G.updateGoal(co, { by: "mgr-w", id: lane.id, done: true }), /not met/);
  G.updateGoal(co, { by: "mgr-w", id: lane.id, status: "green", current: { pages: 5 }, done: true });
  assert.equal(G.view(co, G.getGoal(co, lane.id)).met, true);
  const b = G.goalBoard(co);
  assert.deepEqual(b.rows.map((r) => [r.id, r.depth]), [[top.id, 0], [org.id, 1], [lane.id, 2]]);
});

test("goals: past due and not done is red whatever the owner says; the review rolls only exceptions up to the CEO", () => {
  const co = build();
  const top = G.createGoal(co, { by: "founder", title: "Ship a storybook", level: "company", owner: "founder", why: "w", what: "w", success: S, due: iso(co, 30) });
  const org = G.createGoal(co, { by: "cos", title: "Pipeline", level: "org", owner: "cos", why: "w", what: "w", success: S, due: iso(co, 20), contributesTo: [top.id] });
  const fine = G.createGoal(co, { by: "mgr-w", title: "Fine", level: "lane", owner: "mgr-w", why: "w", what: "w", success: S, due: iso(co, 15), contributesTo: [org.id] });
  const late = G.createGoal(co, { by: "mgr-g", title: "Late", level: "lane", owner: "mgr-g", why: "w", what: "w", success: S, due: iso(co, 1), contributesTo: [org.id] });
  co.clock.t += 3 * DAY;
  assert.deepEqual(G.sweepGoals(co), [late.id]);
  assert.equal(G.view(co, late).status, "red");
  assert.equal(G.view(co, late).autoRed, true);
  const steps = G.rollUp(co);
  const orgStep = steps.find((s) => s.level === "org");
  assert.deepEqual(orgStep.exceptions.map((e) => e.id), [late.id], "only the exception travels up, not the green lane goal");
  assert.ok(!orgStep.exceptions.some((e) => e.id === fine.id));
  const ceo = steps.find((s) => s.level === "company");
  assert.deepEqual(ceo.own.map((g) => g.id), [top.id]);
  assert.throws(() => G.reviewLevel(co, { by: "mgr-w", level: "org" }), /does not review org/);
});

// ---------------------------------------------------------------- meetings
test("meetings: private positions until reveal, absentees named, objections must be answered, actions become tracker items, minutes", () => {
  const co = build();
  B.addRoom(co, { by: "cos", id: "story-room", floor: 2, kind: "meeting", capacity: 6 });
  CH.createChannel(co, { by: "cos", id: "company", kind: "company" });
  CH.createChannel(co, { by: "mgr-w", id: "lane:w", kind: "lane" });
  assert.throws(() => M.openMeeting(co, { by: "mgr-w", title: "x", invitees: ["b-w1"], channel: "company", agenda: [{ title: "a" }] }), /may not post minutes/);
  const m = M.openMeeting(co, { by: "mgr-w", title: "Story kickoff", room: "story-room", invitees: ["b-w1", "b-w2", "chk-1"], channel: "lane:w", agenda: [{ title: "Who is the hero?" }, { title: "Tone" }] });
  M.writePosition(co, { id: m.id, by: "b-w1", n: 1, text: "a shy fox" });
  assert.deepEqual(M.readRound(co, { id: m.id, by: "b-w2", n: 1 }).mine, null, "b-w2 sees nothing until it writes");
  assert.equal(M.readRound(co, { id: m.id, by: "b-w2", n: 1 }).positions, undefined);
  M.writePosition(co, { id: m.id, by: "b-w2", n: 1, text: "a brave hedgehog" });
  assert.throws(() => M.reveal(co, { id: m.id, by: "b-w1", n: 1 }), /only the chair/);
  assert.throws(() => M.reveal(co, { id: m.id, by: "mgr-w", n: 1 }), /waiting for/);
  assert.throws(() => M.decide(co, { id: m.id, by: "mgr-w", n: 1, decision: "fox" }), /no revealed round/);
  M.writePosition(co, { id: m.id, by: "mgr-w", n: 1, text: "fox" });
  const r = M.reveal(co, { id: m.id, by: "mgr-w", n: 1, force: true });
  assert.deepEqual(r.missing, ["chk-1"]);
  M.object(co, { id: m.id, by: "b-w2", n: 1, text: "foxes are tricksters in folk tales" });
  M.whiteboard(co, { id: m.id, by: "b-w1", section: "names", text: "Pip" });
  assert.throws(() => M.decide(co, { id: m.id, by: "mgr-w", n: 1, decision: "Pip the fox" }), /needs an answer/);
  M.decide(co, { id: m.id, by: "mgr-w", n: 1, decision: "Pip the fox", answers: { 1: { how: "answered", text: "Pip is a kind fox: we use the expectation" } }, actions: [{ title: "Write the story bible", owner: "b-w1", due: iso(co, 1) }] });
  assert.throws(() => M.closeMeeting(co, { id: m.id, by: "mgr-w" }), /not decided or deferred: 2/);
  M.defer(co, { id: m.id, by: "mgr-w", n: 2, reason: "after the bible" });
  const closed = M.closeMeeting(co, { id: m.id, by: "mgr-w" });
  assert.match(closed.minutes, /absent: chk-1/);
  assert.match(closed.minutes, /objection 1 \(b-w2\).*answered/);
  assert.match(closed.minutes, /Pip \(b-w1\)/);
  assert.equal([...co.data.tracker.items.values()].filter((i) => i.kind === "action").length, 1);
  assert.equal(co.data.channels.posts.size, 1, "minutes posted to the channel");
});

// ---------------------------------------------------------------- asks
test("asks: routed to the lowest level that can decide; addressed too high is rerouted; escalation needs a reason; info is not an ask", () => {
  const co = build();
  assert.equal(A.route(co, { by: "b-w1", kind: "budget", amount: 10_000 }), "mgr-w");
  assert.equal(A.route(co, { by: "mgr-w", kind: "budget", amount: 300_000 }), "cos");
  assert.equal(A.route(co, { by: "mgr-w", kind: "budget", amount: 900_000 }), "founder");
  assert.throws(() => A.route(co, { by: "mgr-w", kind: "budget", amount: 10_000 }), /within your own limit/);
  assert.equal(A.route(co, { by: "mgr-w", kind: "cross-lane" }), "cos");
  assert.equal(A.route(co, { by: "mgr-w", kind: "deploy" }), "founder");
  assert.throws(() => A.route(co, { by: "mgr-w", kind: "info" }), /not an ask/);
  const r = A.raise(co, { by: "mgr-w", kind: "cross-lane", title: "Borrow b-g1", why: "deadline", due: iso(co, 2), to: "founder" });
  assert.equal(r.assignee, "cos");
  assert.ok(r.labels.includes("rerouted"));
  const e = A.raise(co, { by: "mgr-w", kind: "cross-lane", title: "Change the plan", why: "w", due: iso(co, 2), to: "founder", escalate: "it changes the company goal's date" });
  assert.equal(e.assignee, "founder");
  assert.throws(() => A.answer(co, { by: "founder", id: r.id, decision: "yes", text: "ok" }), /cos's to answer/);
  A.answer(co, { by: "cos", id: r.id, decision: "yes", text: "two days" });
  const s = A.askSummary(co);
  assert.deepEqual([s.total, s.toFounder, s.rerouted, s.escalated, s.open.length], [2, 1, 1, 1, 1]);
});

// ---------------------------------------------------------------- rituals
test("WBR: code builds page 0, hits and misses, roadmap, goals and asks; the chair writes only the summary; posted to company", () => {
  const co = build();
  CH.createChannel(co, { by: "cos", id: "company", kind: "company" });
  const top = G.createGoal(co, { by: "founder", title: "Ship a storybook", level: "company", owner: "founder", why: "w", what: "w", success: S, due: iso(co, 30) });
  G.createGoal(co, { by: "cos", title: "Pipeline", level: "org", owner: "cos", why: "w", what: "w", success: S, due: iso(co, 20), contributesTo: [top.id], status: "yellow", reason: "one writer", path: "hire" });
  T.createProject(co, { by: "mgr-w", name: "Storybook", lead: "mgr-w", goals: [top.id] });
  A.raise(co, { by: "mgr-w", kind: "cross-lane", title: "Borrow a writer", why: "w", due: iso(co, 2), to: "founder" });
  const { meeting, pack } = RIT.wbrOpen(co, { by: "cos" });
  assert.equal(pack.page0.goals.yellow, 1);
  assert.ok(pack.misses.some((x) => /yellow/.test(x)));
  assert.equal(pack.asks.rerouted, 1);
  assert.equal(pack.roadmap[0].name, "Storybook");
  for (let n = 1; n <= 4; n++) {
    M.writePosition(co, { id: meeting, by: "cos", n, text: "noted" });
    M.reveal(co, { id: meeting, by: "cos", n, force: true });
    M.decide(co, { id: meeting, by: "cos", n, decision: "carry on" });
  }
  assert.throws(() => RIT.wbrClose(co, { by: "cos", meeting, summary: "ok" }), /summary is the chair's/);
  const rec = RIT.wbrClose(co, { by: "cos", meeting, summary: "One writer short; the asks went to the right levels." });
  assert.match(rec.doc, /## Page 0/);
  assert.match(rec.doc, /1 rerouted down/);
  assert.ok([...co.data.channels.posts.values()].some((p) => p.title.startsWith("WBR")));
  const rev = RIT.goalReview(co, { by: "cos" });
  assert.equal(rev.steps.at(-1).level, "company");
  assert.match(RIT.digest(co, { audience: "founder" }), /## Company and org goals/);
});

test("goals: a criterion with a source is measured by code from the record and cannot be typed over", () => {
  const co = build();
  assert.throws(() => G.createGoal(co, { by: "founder", title: "x", level: "company", owner: "founder", why: "w", what: "w", success: [{ metric: "pages", target: 2, source: "vibes:x" }], due: iso(co, 30) }), /a source is/);
  const g = G.createGoal(co, { by: "founder", title: "Book", level: "company", owner: "founder", why: "w", what: "w", success: [{ metric: "pages", target: 2, source: "shipped:PAGE" }, { metric: "bible", target: 1 }], due: iso(co, 30) });
  const a = co.engine.orderNew({ flow: "item", by: "cos", to: "mgr-w", budget: 100, accept: "x", title: "p1" });
  const b = co.engine.orderNew({ flow: "item", by: "cos", to: "mgr-w", budget: 100, accept: "x", title: "p2" });
  a.task = "PAGE1"; b.task = "PAGE2";
  assert.equal(G.view(co, g).success[0].current, 0);
  a.stage = "done";
  assert.equal(G.view(co, g).success[0].current, 1);
  assert.throws(() => G.updateGoal(co, { by: "founder", id: g.id, current: { pages: 2 } }), /computed by code/);
  b.stage = "done";
  assert.throws(() => G.updateGoal(co, { by: "founder", id: g.id, done: true }), /not met: bible/);
  G.updateGoal(co, { by: "founder", id: g.id, bind: { bible: "shipped:BIBLE" } });
  assert.throws(() => G.updateGoal(co, { by: "founder", id: g.id, done: true }), /bible 0\/1/);
});

test("benchmark 1 fixes: a closed meeting frees its room; orders carry their project; green-but-unmeasured is an exception", () => {
  const co = build();
  B.proposeFloor(co, { by: "cos", floor: 4, name: "Rooms" });
  co.engine.decide(co.engine.queue("founder").map((a) => a.id), { by: "founder", decision: "approve", words: "ok", channel: "test" });
  B.addRoom(co, { by: "cos", id: "story-room", floor: 4, kind: "meeting", capacity: 6 });
  const m = M.openMeeting(co, { by: "mgr-w", title: "Kickoff", room: "story-room", minutes: 60, invitees: ["b-w1"], agenda: [{ title: "a" }] });
  M.reveal(co, { id: m.id, by: "mgr-w", n: 1, force: true });
  M.decide(co, { id: m.id, by: "mgr-w", n: 1, decision: "d" });
  M.closeMeeting(co, { id: m.id, by: "mgr-w" });
  assert.ok(M.openMeeting(co, { by: "mgr-w", title: "Next", room: "story-room", invitees: ["b-w1"], agenda: [{ title: "b" }] }).booking);
  const prj = T.createProject(co, { by: "mgr-w", name: "Book", lead: "mgr-w" });
  const o = co.engine.orderNew({ flow: "item", by: "cos", to: "mgr-w", budget: 100, accept: "x", title: "p1" });
  o.project = prj.id;
  T.syncOrders(co);
  assert.equal([...co.data.tracker.items.values()].filter((i) => i.kind === "order" && i.project === prj.id).length, 1);
  const top = G.createGoal(co, { by: "founder", title: "Book", level: "company", owner: "founder", why: "w", what: "w", success: [{ metric: "pages", target: 5 }], due: iso(co, 30) });
  G.createGoal(co, { by: "cos", title: "Pipe", level: "org", owner: "cos", why: "w", what: "w", success: [{ metric: "orders", target: 5 }], due: iso(co, 20), contributesTo: [top.id] });
  const ceo = G.rollUp(co).at(-1);
  assert.ok(ceo.exceptions.some((g) => g.why_here.some((w) => /unmeasured: orders/.test(w))));
});

test("WBR pack: a first window starts at the first event; any revised order is a miss", () => {
  const co = build();
  co.log.add({ type: "shipped", order: "O-9", loops: 1 });
  co.log.add({ type: "shipped", order: "O-8", loops: 0 });
  const p = RIT.page0(co);
  assert.ok(p.window.from, "window.from is set");
  const hm = RIT.hitsAndMisses(co);
  assert.ok(hm.misses.includes("O-9 shipped after 1 revision"));
  assert.ok(hm.hits.includes("O-8 shipped first time"));
});
