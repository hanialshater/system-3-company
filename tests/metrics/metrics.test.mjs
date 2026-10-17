// Metrics fitness (assessment company/reviews/org/2026-10-17-external-assessment.md, Appendix B "Founder leverage"
// and "Measurement fitness"): founder attention per accepted outcome (company/ops/metrics.md §C), and the three
// relabelled lines in tools/metrics.mjs (stock ratio, non-causal model split, never-dispatched caveat).

import { test } from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import { execFileSync, spawnSync } from "node:child_process";
import { fileURLToPath } from "node:url";
import {
  founderCounts,
  acceptedFromEvents,
  lessonsAcceptedSince,
  leverage,
  leverageText,
  isCheckedPublished,
} from "../../tools/lib/founder-leverage.mjs";

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "../..");
const sandbox = () => {
  const d = fs.mkdtempSync(path.join(os.tmpdir(), "metrics-"));
  return { dir: d, events: path.join(d, "events.jsonl") };
};
const msg = (id, ts, extra = {}) => ({ id, ts, type: "founder", room: "lobby", actor: "founder", summary: id, ...extra });
const cls = (id, ts, corrects, c, extra = {}) => ({ id, ts, type: "founder", room: "lobby", actor: "chief-of-staff", corrects, class: c, summary: `class: ${c}`, ...extra });

test("founder messages are unclassified unless a classification names them; newest wins; orphans counted", () => {
  const evs = [
    msg("m1", "2026-10-12T10:00:00Z"),
    msg("m2", "2026-10-17T10:00:00Z"),
    msg("m3", "2026-10-17T11:00:00Z", { class: "routing", minutes: 4 }),
    cls("c1", "2026-10-17T10:05:00Z", "m2", "decision"),
    cls("c2", "2026-10-17T10:06:00Z", "m2", "correction", { minutes: 3 }),
    cls("c3", "2026-10-17T10:07:00Z", "nope", "decision"),
    cls("c4", "2026-10-17T10:08:00Z", "m1", "bogus"),
  ];
  const all = founderCounts(evs);
  assert.deepEqual(all, { messages: 3, decision: 0, correction: 1, routing: 1, unclassified: 1, minutes: 7, minutesN: 2, orphans: 1 });
  const since = founderCounts(evs, { since: "2026-10-17" });
  assert.equal(since.messages, 2);
  assert.equal(since.unclassified, 0);
});

test("accepted library and opfix outcomes come only from accepted events; lessons dated by first publish event", () => {
  const evs = [
    { id: "a1", ts: "2026-10-16T00:00:00Z", type: "verify", accepted: "library" },
    { id: "a2", ts: "2026-10-17T00:00:00Z", type: "note", accepted: "opfix" },
    { id: "a3", ts: "2026-10-17T00:00:00Z", type: "note", accepted: "lesson" },
    { id: "p1", ts: "2026-10-13T00:00:00Z", type: "publish", subjects: ["old", "held"] },
    { id: "p2", ts: "2026-10-17T05:00:00Z", type: "publish", subjects: ["new", "old"] },
  ];
  assert.deepEqual(acceptedFromEvents(evs), { library: 1, opfix: 1 });
  assert.deepEqual(acceptedFromEvents(evs, { since: "2026-10-17" }), { library: 0, opfix: 1 });
  const checked = new Set(["old", "new", "never-published-event"]);
  assert.equal(lessonsAcceptedSince(evs, checked, null), 3);
  assert.equal(lessonsAcceptedSince(evs, checked, "2026-10-17"), 1);
});

test("checked published lesson needs status, fact-check, QA pass and only launch verdicts", () => {
  const ok = { l: { status: "published" }, r: { factCheck: true, qa: true, learner: ["launch"] } };
  assert.equal(isCheckedPublished(ok), true);
  assert.equal(isCheckedPublished({ ...ok, l: { status: "review" } }), false);
  assert.equal(isCheckedPublished({ ...ok, r: { ...ok.r, qa: false } }), false);
  assert.equal(isCheckedPublished({ ...ok, r: { ...ok.r, learner: ["launch", "revise"] } }), false);
  assert.equal(isCheckedPublished({ ...ok, r: { ...ok.r, learner: [] } }), false);
});

test("the per-outcome ratio is withheld below 80% classified and printed above it", () => {
  const unclassified = Array.from({ length: 5 }, (_, i) => msg(`u${i}`, "2026-10-12T00:00:00Z"));
  const low = leverage(unclassified, new Set(["a"]));
  assert.equal(low.ratio, null);
  assert.match(leverageText(low).per, /not computed \(only 0 of 5 founder messages classified \(needs 80%\)\)/);
  const evs = [
    msg("m1", "2026-10-17T01:00:00Z"), cls("c1", "2026-10-17T01:01:00Z", "m1", "decision"),
    msg("m2", "2026-10-17T02:00:00Z"), cls("c2", "2026-10-17T02:01:00Z", "m2", "correction"),
    { id: "p", ts: "2026-10-17T03:00:00Z", type: "publish", subjects: ["a", "b"] },
    { id: "x", ts: "2026-10-17T04:00:00Z", type: "note", accepted: "opfix" },
    ...unclassified,
  ];
  const L = leverage(evs, new Set(["a", "b"]), { since: "2026-10-17" });
  assert.equal(L.outcomes, 3);
  assert.deepEqual(L.ratio, { decision: 1 / 3, correction: 1 / 3, routing: 0 });
  assert.match(leverageText(L).per, /decision 0\.33 · correction 0\.33 · routing 0/);
  assert.equal(leverage(evs, new Set(["a", "b"])).ratio, null, "all-of-log view still has the 5 unclassified");
});

test("metrics prints the leverage block, the stock-ratio cutoff, the non-causal model line and the retirement caveat", () => {
  const sb = sandbox();
  const now = new Date().toISOString();
  const lines = [
    { id: "d1", ts: now, type: "dispatch", room: "tools", actor: "chief-of-staff", agent: "x ·abcd", subjects: ["tools-lead"], summary: "Dispatch tools-lead: x" },
    msg("m1", now),
    cls("c1", now, "m1", "routing"),
    msg("m2", now),
  ];
  fs.writeFileSync(sb.events, lines.map((e) => JSON.stringify(e)).join("\n") + "\n");
  const env = { ...process.env, S3_EVENTS: sb.events };
  const out = execFileSync("node", [path.join(ROOT, "tools/metrics.mjs")], { env, encoding: "utf8" });
  assert.match(out, /Founder founder messages 2: decision 0 · correction 0 · routing 1 · unclassified 1/);
  assert.match(out, /per accepted outcome: not computed \(only 1 of 2 founder messages classified \(needs 80%\)\)/);
  assert.match(out, /stock ratio \S+\/published lesson = tokens recorded to (\d{4}-\d\d-\d\dT\d\d:\d\d|—)Z ÷ \d+ lessons published at \d{4}-\d\d-\d\d; not marginal cost/);
  assert.doesNotMatch(out, /launch-on-first-review opus \d+% vs sonnet/);
  assert.match(out, /first-review launch by builder model: (no model comparison \(non-causal|opus .* non-causal)/);
  assert.match(out, /ledger rows without a model label \d+ of \d+/);
  assert.match(out, /never dispatched \(\d+\/\d+; unsuitable for retirement decisions until dispatch telemetry is reconciled\)/);
  const md = execFileSync("node", [path.join(ROOT, "tools/metrics.mjs"), "--md"], { env, encoding: "utf8" });
  assert.match(md, /### Founder leverage/);
  assert.match(md, /\| Founder attention per accepted outcome since 2026-10-17 \|/);
  assert.match(md, /Roles never dispatched \| \d+ of \d+ \(unsuitable for retirement decisions until dispatch telemetry is reconciled\)/);
  assert.match(md, /\| First-review launch rate by builder model \(EXP-003\) \| (no model comparison|opus .*non-causal)/);
  assert.match(md, /### Budget \(token ledger: .*stock ratio .*not marginal cost\)/);
});

test("events.mjs add writes class, minutes and accepted, and refuses bad values", () => {
  const sb = sandbox();
  const env = { ...process.env, S3_EVENTS: sb.events, S3_SPOOL: path.join(sb.dir, "spool") };
  const add = (...a) => spawnSync("node", [path.join(ROOT, "tools/events.mjs"), "add", ...a], { env, encoding: "utf8" });
  let r = add("--type=founder", "--room=lobby", "--actor=chief-of-staff", "--corrects=tx-1", "--class=correction", "--minutes=2", "--summary=class: correction");
  assert.equal(r.status, 0, r.stderr);
  r = add("--type=note", "--room=tools", "--actor=qa-tester", "--accepted=opfix", "--summary=guard fires live");
  assert.equal(r.status, 0, r.stderr);
  const evs = fs.readFileSync(sb.events, "utf8").trim().split("\n").map((l) => JSON.parse(l));
  assert.equal(evs[0].class, "correction");
  assert.equal(evs[0].minutes, 2);
  assert.equal(evs[0].corrects, "tx-1");
  assert.equal(evs[1].accepted, "opfix");
  assert.notEqual(add("--type=founder", "--room=lobby", "--actor=chief-of-staff", "--class=maybe", "--summary=x").status, 0);
  assert.notEqual(add("--type=note", "--room=lobby", "--actor=chief-of-staff", "--class=decision", "--summary=y").status, 0);
  assert.notEqual(add("--type=note", "--room=tools", "--actor=qa-tester", "--accepted=lesson", "--summary=z").status, 0);
  assert.equal(fs.readFileSync(sb.events, "utf8").trim().split("\n").length, 2);
});
