// First Light war room: status.json is valid and consistent with the board, risks and founder inbox;
// workstream statuses derive from the board; a manual override with a note wins; the room is on the plan.
// Run: npm run test:hq
import test from "node:test";
import assert from "node:assert/strict";
import { validateStatus, validateRefs, deriveStatus, workstreamViews, overallRag, daysUntil, nextOccurrence } from "../../src/lib/hq-firstlight.ts";
import { loadFirstLight, loadStandups } from "../../src/lib/hq-firstlight-server.ts";
import { ROOMS } from "../../src/lib/hq.ts";
import { boardIds } from "../../src/lib/hq-whiteboard-server.ts";

const data = loadFirstLight();
const st = data.status;
const clone = (x) => JSON.parse(JSON.stringify(x));
const NOW = new Date("2026-10-15T09:00:00Z");

test("status.json loads, is valid, and every id resolves against the board, risks and founder inbox", () => {
  assert.equal(data.error, null);
  assert.ok(st);
  assert.equal(validateStatus(st), null);
  assert.equal(validateRefs(st, new Set(data.boardIds), new Set(data.inbox.map((i) => i.id)), new Set(data.risks.map((r) => r.id))), null);
  assert.equal(st.code_name, "First Light");
  assert.equal(st.dates.go_no_go, "2026-11-23");
  assert.equal(st.dates.launch, "2026-11-30");
});

test("the thirteen workstreams are all there, each with an owner role, board ids and a next step", () => {
  assert.deepEqual(st.workstreams.map((w) => w.id), ["domain-brand", "auth-progress", "personalization", "mastery", "social", "ads", "legal", "infra", "surface-value", "launch-catalog", "budget", "team-role", "quality"]);
  for (const w of st.workstreams) assert.ok(w.owner && w.next, w.id);
  const tracked = new Set(st.workstreams.flatMap((w) => w.board));
  for (const id of ["W-904", "W-905", "W-906", "W-907", "W-908", "W-878", "W-884", "W-891", "W-892", "W-893", "W-894", "W-895"]) assert.ok(tracked.has(id), `${id} is not tracked`);
});

test("founder decisions cover F-17..F-20, F-22 and the domain name; proposed risks are well-formed", () => {
  const ids = st.founder_decisions.map((d) => d.id);
  for (const id of ["F-17", "F-18", "F-19", "F-20", "F-22", "domain-name"]) assert.ok(ids.includes(id), id);
  assert.ok(st.risks.some((r) => r.status === "proposed"));
  assert.ok(st.risks.some((r) => r.status !== "proposed"));
});

test("deriveStatus: from board states, dropped ignored, nothing tracked means not started", () => {
  assert.equal(deriveStatus([]), "not started");
  assert.equal(deriveStatus(["backlog", "next"]), "not started");
  assert.equal(deriveStatus(["backlog", "doing"]), "in progress");
  assert.equal(deriveStatus(["review"]), "in progress");
  assert.equal(deriveStatus(["done", "backlog"]), "in progress");
  assert.equal(deriveStatus(["done", "done", "dropped"]), "done");
  assert.equal(deriveStatus(["dropped"]), "not started");
});

test("workstream views follow the board and update when the board moves", () => {
  const w = { id: "x", name: "X", owner: "o", board: ["W-1", "W-2"], next: "n" };
  const status = { ...clone(st), workstreams: [w] };
  const board = (a, b) => [{ id: "W-1", title: "t", owner: "o", state: a }, { id: "W-2", title: "t", owner: "o", state: b }];
  assert.equal(workstreamViews(status, board("backlog", "backlog"))[0].status, "not started");
  assert.equal(workstreamViews(status, board("doing", "backlog"))[0].status, "in progress");
  assert.equal(workstreamViews(status, board("done", "done"))[0].status, "done");
  assert.deepEqual(workstreamViews(status, board("done", "done"))[0].items.map((i) => i.state), ["done", "done"]);
});

test("an override wins over the derived status, keeps the derived one, and needs a note", () => {
  const w = { id: "x", name: "X", owner: "o", board: ["W-1"], next: "n", override: { status: "blocked", note: "waiting on the founder" } };
  const status = { ...clone(st), workstreams: [w] };
  const v = workstreamViews(status, [{ id: "W-1", title: "t", owner: "o", state: "done" }])[0];
  assert.equal(v.status, "blocked");
  assert.equal(v.derived, "done");
  assert.equal(v.overridden, true);
  assert.equal(validateStatus(status), null);
  status.workstreams[0].override.note = " ";
  assert.match(validateStatus(status), /needs a note/);
});

test("the live data renders: derived statuses equal the board, overrides in status.json win", () => {
  const views = workstreamViews(st, data.board);
  const by = Object.fromEntries(views.map((v) => [v.id, v]));
  const state = Object.fromEntries(data.board.map((b) => [b.id, b.state]));
  for (const v of views) {
    assert.equal(v.derived, deriveStatus(v.board.map((id) => state[id])), v.id);
    assert.equal(v.status, v.override ? v.override.status : v.derived, v.id);
  }
  assert.equal(by["domain-brand"].status, "blocked");
  assert.ok(by["ads"].overridden);
});

test("validation refuses bad input", () => {
  const bad = (f) => { const x = clone(st); f(x); return validateStatus(x); };
  assert.match(bad((x) => (x.dates.go_no_go = "soon")), /yyyy-mm-dd/);
  assert.match(bad((x) => (x.dates.go_no_go = "2026-12-01")), /after launch/);
  assert.match(bad((x) => x.workstreams.push(clone(x.workstreams[0]))), /duplicate/);
  assert.match(bad((x) => (x.workstreams[0].board = ["905"])), /W-ids/);
  assert.match(bad((x) => (x.workstreams[0].override = { status: "late", note: "n" })), /override status/);
  const x = clone(st);
  x.workstreams[0].board = ["W-999999"];
  assert.match(validateRefs(x, new Set(data.boardIds), new Set(), new Set()), /not on the board/);
});

test("countdown, RAG and jour fixe dates", () => {
  assert.equal(daysUntil("2026-11-23", NOW), 39);
  assert.equal(daysUntil("2026-11-30", NOW), 46);
  assert.equal(daysUntil("2026-10-14", NOW), -1);
  assert.equal(nextOccurrence(["Mon", "Thu"], NOW), "2026-10-15");
  assert.equal(nextOccurrence(["Fri"], NOW), "2026-10-16");
  const v = (s) => ({ status: s });
  assert.equal(overallRag([v("in progress"), v("done")], 0, "2026-11-23", NOW).rag, "green");
  assert.equal(overallRag([v("in progress")], 1, "2026-11-23", NOW).rag, "amber");
  assert.equal(overallRag([v("blocked"), v("done")], 0, "2026-11-23", NOW).rag, "amber");
  assert.equal(overallRag([v("blocked"), v("done")], 0, "2026-11-23", new Date("2026-11-10T00:00:00Z")).rag, "red");
  assert.equal(overallRag([v("in progress")], 0, "2026-11-23", new Date("2026-11-24T00:00:00Z")).rag, "red");
});

test("stand-up records: latest of each kind by date, none is fine", () => {
  const none = loadStandups("/nonexistent");
  assert.equal(none.standup, null);
  assert.equal(none.review, null);
});

test("the war room is a meeting room on the CEO-office floor, so /hq/whiteboard/first-light exists", () => {
  const r = ROOMS.find((x) => x.id === "first-light");
  assert.equal(r.name, "War room: First Light");
  assert.equal(r.kind, "meeting");
  assert.equal(r.floor ?? 1, ROOMS.find((x) => x.id === "ceo-office").floor ?? 1);
  assert.ok(boardIds().includes(st.whiteboard));
});
