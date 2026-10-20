// Fixture tests for tools/reconcile.mjs (EXP-009). Run: node --test tests/reconcile/
import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import {
  run, collect, reconcile, buildEventRuns, matchRunItems, mergeRunItems, extractDispatchRequests, extractMemoryEntries,
  extractMailboxes, extractCommitRuns, extractPublishes, quotesInText, dedupeFounderQuotes, founderMatches, parseWindow,
  causeForRun, causeForFounder, PARAMS,
} from "../../tools/reconcile.mjs";

const ROLES = ["tools-lead", "demo-builder", "fact-checker", "chief-of-staff", "release-manager"];
const roleSet = new Set(ROLES);
const WIN = parseWindow("2026-10-15T00:00Z", "2026-10-19T23:59Z");
const T = (s) => Date.parse(s);

function fixture() {
  const root = fs.mkdtempSync(path.join(os.tmpdir(), "reconcile-"));
  const w = (rel, text) => { fs.mkdirSync(path.dirname(path.join(root, rel)), { recursive: true }); fs.writeFileSync(path.join(root, rel), text); };
  w("company/ops/dispatch-requests/2026-10-16-r1-tools.md", [
    "# Dispatch request", "", "## B1 · Guard fix · board W-1", "role: tools-lead", "", "## B2 · Other · board W-2", "role: demo-builder", "",
    "## Dispatched", "- B1 dispatched 10:00Z (wt) → returned abc1234. B2 waits for a builder slot.", "",
  ].join("\n"));
  w("company/roles/memory/fact-checker/2026-10-17-fc-run.md", "### 2026-10-17 · fc-run · fact-checker\n- did: x\n");
  w("company/roles/memory/chief-of-staff/2026-10-17-cos.md", "### 2026-10-17 · cos · chief-of-staff\n- did: x\n");
  w("company/decisions/2026-10-16-founder-x.md", 'owner: founder\n\nFounder verbatim (2026-10-16, this session): "Ship the guard fix today"\n');
  w("company/decisions/2026-10-18-founder-y.md", 'owner: founder\n\nFounder verbatim: "Keep it simple please"\n');
  w("company/ops/progress.md", '## 2026-10-15 · chief-of-staff · x\nThe founder said "Is history published"\n');
  w("company/ops/releases.json", JSON.stringify({ releases: [{ version: "r7", date: "2026-10-16T12:00:00.000Z", commit: "aaaaaaaa11" }] }));
  const ev = (o) => JSON.stringify(o);
  w("company/ops/events.jsonl", [
    ev({ id: "tx-1", ts: "2026-10-16T09:50:00.000Z", type: "dispatch", actor: "chief-of-staff", agent: "Tools B1 guard ·aaaa", subjects: ["tools-lead"], summary: "Dispatch tools-lead: B1" }),
    ev({ id: "tx-2", ts: "2026-10-16T10:40:00.000Z", type: "report", actor: "tools-lead", agent: "Tools B1 guard ·aaaa", summary: "done" }),
    ev({ id: "tx-3", ts: "2026-10-16T10:40:01.000Z", type: "usage", actor: "tools-lead", agent: "Tools B1 guard ·aaaa", tokens: 100 }),
    ev({ id: "tx-4", ts: "2026-10-16T10:55:00.000Z", type: "usage", actor: "tools-lead", agent: "Tools B1 guard ·aaaa", tokens: 150 }),
    ev({ id: "tx-5", ts: "2026-10-16T09:00:00.000Z", type: "founder", actor: "founder", summary: "Ship the guard fix today", body: "Ship the guard fix today" }),
    ev({ id: "ev-6", ts: "2026-10-18T09:00:00.000Z", type: "founder", actor: "chief-of-staff", summary: "decision: simplicity" }),
    ev({ id: "git-7", ts: "2026-10-16T12:00:05.000Z", type: "publish", actor: "release-manager", summary: "Release r7", refs: ["aaaaaaaa11"], subjects: [] }),
    "{not json",
  ].join("\n") + "\n");
  w("company/ops/ledger.jsonl", ev({ id: "L-tx-3", ts: "2026-10-16T10:40:01.000Z", agent: "Tools B1 guard ·aaaa", role: "tools-lead", tokens: 100 }) + "\n");
  const git = {
    head: () => "f".repeat(40), shallow: () => false, horizon: () => "2026-10-01T00:00:00.000Z",
    commits: () => [
      { sha: "c1".padEnd(40, "0"), ts: "2026-10-16T10:30:00.000Z", parents: ["p"], message: "tools-lead: guard fix" },
      { sha: "c2".padEnd(40, "0"), ts: "2026-10-16T10:50:00.000Z", parents: ["p"], message: "tools-lead: tests" },
      { sha: "c3".padEnd(40, "0"), ts: "2026-10-16T10:55:00.000Z", parents: ["p", "q"], message: "Merge tools-lead: guard" },
      { sha: "c4".padEnd(40, "0"), ts: "2026-10-16T11:00:00.000Z", parents: ["p"], message: "chief-of-staff: board" },
    ],
    statusDiffs: () => [
      "@@C bbbbbbbb22 2026-10-17T08:00:00Z p1",
      "diff --git a/src/demos/math/one-slug/meta.json b/src/demos/math/one-slug/meta.json",
      '-  "status": "review",', '+  "status": "published",',
    ].join("\n"),
  };
  return { root, git, opts: { root, git, roles: ROLES, from: "2026-10-15T00:00Z", to: "2026-10-19T23:59Z" } };
}

test("window: a --to without seconds covers its whole minute", () => {
  assert.equal(new Date(WIN.to).toISOString(), "2026-10-19T23:59:59.999Z");
});

test("dispatch requests: dispatched sentences only, role from the item, time from ~HH:MMZ", () => {
  const { root } = fixture();
  const items = extractDispatchRequests(root, WIN, roleSet);
  assert.equal(items.length, 1);
  assert.equal(items[0].role, "tools-lead");
  assert.equal(new Date(items[0].t).toISOString(), "2026-10-16T10:00:00.000Z");
  assert.equal(items[0].ended, true);
});

test("memory entries: main-session roles are not run items", () => {
  const { root } = fixture();
  const items = extractMemoryEntries(root, WIN);
  assert.deepEqual(items.map((x) => x.role), ["fact-checker"]);
  assert.equal(items[0].t, null);
  assert.equal(items[0].day, "2026-10-17");
});

test("commits: role subjects cluster, merges and chief-of-staff skipped", () => {
  const { git } = fixture();
  const runs = extractCommitRuns(git.commits(), WIN, roleSet);
  assert.equal(runs.length, 1);
  assert.equal(runs[0].shas.length, 2);
  assert.equal(new Date(runs[0].t).toISOString(), "2026-10-16T10:50:00.000Z");
});

test("usage dedupe: a resumed run's repeat usage events and its ledger line make one usage record", () => {
  const { root } = fixture();
  const events = fs.readFileSync(path.join(root, "company/ops/events.jsonl"), "utf8").split("\n").filter((l) => l.startsWith("{\"")).map((l) => JSON.parse(l));
  const ledger = [JSON.parse(fs.readFileSync(path.join(root, "company/ops/ledger.jsonl"), "utf8"))];
  const runs = buildEventRuns(events, ledger, roleSet);
  const r = runs.find((x) => x.label === "Tools B1 guard ·aaaa");
  assert.ok(r.hasDispatch && r.hasReport && r.hasUsage);
  assert.equal(r.role, "tools-lead");
  // three usage-like records (2 events + 1 ledger) for one label collapse to one, the 150-token event
  assert.equal(runs.filter((x) => x.label === "Tools B1 guard ·aaaa").length, 1);
  assert.equal(r.usageRecords, 1);
  assert.equal(r.tokens, 150);
});

test("matching: role + time inside the window; outside it no match", () => {
  const runs = [{ id: "r1", label: "x", suffix: null, role: "tools-lead", start: T("2026-10-16T10:00Z"), end: T("2026-10-16T11:00Z"), mails: [] }];
  const near = { source: "commit", ref: "a", role: "tools-lead", t: T("2026-10-16T11:20Z"), day: "2026-10-16", ended: true };
  const far = { source: "commit", ref: "b", role: "tools-lead", t: T("2026-10-16T12:00Z"), day: "2026-10-16", ended: true };
  assert.equal(matchRunItems([near], runs, 30 * 60_000).get("a")?.id, "r1");
  assert.equal(matchRunItems([near], runs, 10 * 60_000).get("a"), undefined);
  assert.equal(matchRunItems([far], runs, 30 * 60_000).get("b"), undefined);
  assert.equal(matchRunItems([far], runs, 60 * 60_000).get("b")?.id, "r1");
});

test("matching: one run per source, mail id beats role+time, items of two sources merge into one run", () => {
  const runs = [
    { id: "r1", label: "x", suffix: null, role: "tools-lead", start: T("2026-10-16T10:00Z"), end: T("2026-10-16T11:00Z"), mails: ["m1"] },
  ];
  const a = { source: "commit", ref: "a", role: "tools-lead", t: T("2026-10-16T10:30Z"), day: "2026-10-16", ended: true };
  const b = { source: "commit", ref: "b", role: "tools-lead", t: T("2026-10-16T10:31Z"), day: "2026-10-16", ended: true };
  const m = { source: "mailbox", ref: "mail:m1", mail: "m1", role: null, t: T("2026-10-16T09:00Z"), day: "2026-10-16", ended: true };
  const got = matchRunItems([a, b, m], runs, 30 * 60_000);
  assert.equal(got.get("a")?.id, "r1");
  assert.equal(got.get("b"), undefined);
  assert.equal(got.get("mail:m1")?.id, "r1");
  const merged = mergeRunItems([a, b, m], got);
  assert.equal(merged.length, 2);
  assert.equal(merged.find((x) => x.run)?.items.length, 2);
});

test("causes: usage after the stop, claimed runs, unknown stays unknown", () => {
  const ctx = { runs: [], windowMs: 30 * 60_000, txBackfillEnd: Infinity };
  assert.equal(causeForRun("usage", { t: T("2026-10-17T10:00Z"), day: "2026-10-17", role: "x", items: [] }, ctx), "usage-after-stop");
  assert.equal(causeForRun("usage", { t: null, day: "2026-10-16", role: "x", items: [] }, ctx), "usage-day-straddles-stop");
  assert.equal(causeForRun("dispatch", { t: T("2026-10-15T10:00Z"), day: "2026-10-15", role: "x", items: [] }, ctx), "unknown");
  assert.equal(causeForRun("dispatch", { t: null, day: "2026-10-15", role: null, items: [] }, ctx), "no-role");
  const run1 = { id: "r1", label: "x", suffix: null, role: "x", start: T("2026-10-15T10:00Z"), end: T("2026-10-15T11:00Z"), mails: [] };
  const it = { source: "memory", ref: "m2", role: "x", t: null, day: "2026-10-15", ended: true };
  assert.equal(causeForRun("dispatch", { t: null, day: "2026-10-15", role: "x", items: [it] }, { ...ctx, runs: [run1] }), "role-runs-claimed");
  assert.equal(causeForRun("dispatch", { t: T("2026-10-15T20:00Z"), day: "2026-10-15", role: "x", items: [{ ...it, t: T("2026-10-15T20:00Z") }] }, { ...ctx, runs: [run1] }), "outside-window");
  assert.equal(causeForRun("dispatch", { t: T("2026-10-17T20:00Z"), day: "2026-10-17", role: "x", items: [] }, { ...ctx, txBackfillEnd: T("2026-10-16T15:28Z") }), "after-transcript-backfill");
  const fctx = { founderEvents: [], founderBackfillEnd: T("2026-10-16T15:15Z"), summariesOnlyAfterStart: true };
  assert.equal(causeForFounder({ text: "Hold it (Recommended)", day: "2026-10-15" }, fctx), "founder-option-pick");
  assert.equal(causeForFounder({ text: "Go", day: "2026-10-17" }, fctx), "founder-before-log-start");
  assert.equal(causeForFounder({ text: "Go", day: "2026-10-18" }, fctx), "founder-events-are-summaries");
  assert.equal(causeForFounder({ text: "Go", day: "2026-10-15" }, fctx), "unknown");
  assert.ok(PARAMS.USAGE_STOP.startsWith("2026-10-16T15:27"));
});

test("founder quotes: verbatim and said-forms extracted, repeats merged, text match within a day", () => {
  const q = quotesInText('Founder verbatim: "Go ahead"\nthe founder said "Deploy only when you finish"\nSomeone wrote "not this"');
  assert.deepEqual(q.map((x) => x.text), ["Go ahead", "Deploy only when you finish"]);
  const d = dedupeFounderQuotes([{ text: "Go ahead", day: "2026-10-17", ref: "b" }, { text: "go ahead!", day: "2026-10-16", ref: "a" }]);
  assert.equal(d.length, 1);
  assert.equal(d[0].day, "2026-10-16");
  assert.ok(founderMatches({ text: "Ship the guard fix today", day: "2026-10-16" }, { ts: "2026-10-16T09:00:00Z", summary: "Ship the guard fix today" }));
  assert.ok(!founderMatches({ text: "Ship the guard fix today", day: "2026-10-19" }, { ts: "2026-10-16T09:00:00Z", summary: "Ship the guard fix today" }));
});

test("publishes: status to published counts; the shallow root and unchanged status do not", () => {
  const raw = [
    "@@C r00t 2026-10-16T10:00:00Z ",
    "diff --git a/src/demos/a/root-slug/meta.json b/src/demos/a/root-slug/meta.json", '+  "status": "published",',
    "@@C c111111111 2026-10-17T10:00:00Z p",
    "diff --git a/src/demos/a/new-pub/meta.json b/src/demos/a/new-pub/meta.json", '-  "status": "review",', '+  "status": "published",',
    "diff --git a/src/demos/a/same/meta.json b/src/demos/a/same/meta.json", '-  "status": "published",', '+  "status": "published",',
  ].join("\n");
  assert.deepEqual(extractPublishes(raw, WIN).map((x) => x.slug), ["new-pub"]);
});

test("mailboxes: absence is reported, not an error; launched markers become items", () => {
  assert.deepEqual(extractMailboxes(path.join(os.tmpdir(), "no-such-mailboxes-dir"), WIN), { present: false, items: [] });
  const dir = fs.mkdtempSync(path.join(os.tmpdir(), "mbx-"));
  fs.mkdirSync(path.join(dir, "dispatcher"));
  fs.writeFileSync(path.join(dir, "dispatcher", "m1.md"), "---\nid: m1\nkind: dispatch-request\nrole: demo-builder\nts: 2026-10-16T10:00:00Z\n---\nbrief\n");
  fs.writeFileSync(path.join(dir, "dispatcher", "m1.claimed"), JSON.stringify({ state: "launched", ts: "2026-10-16T10:01:00Z" }));
  fs.writeFileSync(path.join(dir, "dispatcher", "m1.done"), "{}");
  const r = extractMailboxes(dir, WIN);
  assert.equal(r.present, true);
  assert.deepEqual(r.items.map((x) => [x.mail, x.role, x.ended]), [["m1", "demo-builder", true]]);
});

test("end to end: coverage table, gaps with causes, deterministic output", async () => {
  const { opts } = fixture();
  const o1 = await run({ ...opts, windowMin: 30 });
  const o2 = await run({ ...opts, windowMin: 30 });
  assert.equal(JSON.stringify(o1), JSON.stringify(o2));
  assert.equal(o1.inputs.mailboxes, "absent");
  assert.deepEqual(o1.coverage.dispatch, { items: 2, matched: 1, unmatched: 1, coverage: 50 });
  assert.equal(o1.coverage["usage-before"].matched, 1);
  assert.equal(o1.coverage.founder.items, 3);
  assert.equal(o1.coverage.founder.matched, 1);
  assert.equal(o1.coverage["publish-after"].items, 1);
  assert.equal(o1.gaps["publish-after"][0].cause, "publish-after-last-event");
  assert.equal(o1.coverage.release.matched, 1);
  for (const list of Object.values(o1.gaps)) for (const g of list) assert.ok(g.cause in o1.causes);
  assert.ok(o1.spread.dispatch["±10"] !== undefined && o1.spread.dispatch["±60"] !== undefined);
  assert.equal(o1.generatedAt, undefined);
  const c = await collect(opts);
  assert.equal(reconcile(c, 30).coverage.dispatch.items, 2);
});
