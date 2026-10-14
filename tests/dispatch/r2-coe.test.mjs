// W-715: dispatch-check R2 matches a COE to its incident id and needs `status: final`.
// W-782: and only after review: header status/incident/reviewers, `verdict: accept` from every named reviewer,
// no reviewer who is the owner (evaluation-steward review in company/rituals/records/2026-10-14-coe-ci-queue.md).
// Run: npm run test:dispatch
import { test } from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import { execFileSync } from "node:child_process";
import { fileURLToPath } from "node:url";
import { coeCoverage, readCoes } from "../../tools/lib/coe-coverage.mjs";

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "../..");
const REC = path.join(ROOT, "company/rituals/records");
const IDS = { ci: "ev-c33bee719d", deploy: "ev-b27f3b93ae", host: "ev-d362239a23" };
const FILES = { ci: "2026-10-14-coe-ci-queue.md", deploy: "2026-10-14-coe-deploy-bypass-and-quota.md", host: "2026-10-14-coe-host-exhaustion.md" };
const ev = (id, summary = `SEV2: planted ${id}`) => ({ id, ts: "2026-10-14T15:27:40.000Z", type: "incident", actor: "test", summary });
const EVENTS = Object.values(IDS).map((id) => ev(id));

function tmpDir(files) {
  const d = fs.mkdtempSync(path.join(os.tmpdir(), "r2-coe-"));
  for (const [f, body] of Object.entries(files)) fs.writeFileSync(path.join(d, f), body);
  return d;
}
// A planted COE. reviews: { role: verdict } adds one `## Review (role, date)` section each (verdict null = no line).
// reviewers: null leaves the reviewers: field out of the header.
const ACCEPT_BOTH = { "evaluation-steward": "accept", "pattern-librarian": "accept" };
const coe = (incident, status, { owner = "test-author", reviewers = "evaluation-steward, pattern-librarian", reviews = ACCEPT_BOTH, body = "" } = {}) =>
  `# COE\n\nowner: ${owner} (author)${reviewers === null ? "" : ` · reviewers: ${reviewers}`}\nstatus: ${status}\n${incident ? `incident: ${incident} (SEV2)\n` : ""}\n## Five whys\n${body}\n` +
  Object.entries(reviews).map(([r, v]) => `## Review (${r}, 2026-10-14)\n${v === null ? "" : `verdict: ${v} (planted)\n`}notes\n\n`).join("");
// The real text of a record: from records/ if it is there, else from drafts/ (a COE whose author has not finalised it yet).
const realText = (f) => fs.readFileSync(fs.existsSync(path.join(REC, f)) ? path.join(REC, f) : path.join(REC, "drafts", f), "utf8");
const asFinal = (t) => (/^status:\s*final\b/im.test(t) ? t : t.replace(/^status:.*$/m, "status: final"));
// The record as it will read once every named reviewer accepts: each Review section gets `verdict: accept`.
const asAccepted = (t) => asFinal(t).split(/^(?=## )/m).map((p) => {
  if (!/^## Review \(/.test(p)) return p;
  return /^verdict:/m.test(p) ? p.replace(/^verdict:.*$/m, "verdict: accept") : p.replace(/^(## Review .*\n)/, "$1verdict: accept\n");
}).join("");
const runCheck = (kind, dir, evFile) => {
  try { return JSON.parse(execFileSync("node", [path.join(ROOT, "tools/dispatch-check.mjs"), `--kind=${kind}`, "--running=0", "--builders=0", "--json"], { env: { ...process.env, S3_COE_DIR: dir, S3_EVENTS: evFile }, encoding: "utf8" })); }
  catch (e) { return JSON.parse(e.stdout); }
};
const eventsFile = (d) => {
  const f = path.join(d, "events.jsonl");
  fs.writeFileSync(f, EVENTS.map((e) => JSON.stringify(e)).join("\n") + "\n");
  return f;
};

test("a same-day stub with no incident id clears nothing (the old date-only bug)", () => {
  const d = tmpDir({ "2026-10-14-coe.md": "# stub\nstatus: final\n" });
  const { covered, uncovered } = coeCoverage(EVENTS, d);
  assert.equal(covered.length, 0);
  assert.equal(uncovered.length, 3);
});

test("a COE that names the id but is still a draft does not clear it, and says why", () => {
  const d = tmpDir({ "2026-10-14-coe-x.md": coe(IDS.deploy, "DRAFT. Ops wrote the timeline.") });
  const { uncovered } = coeCoverage([ev(IDS.deploy)], d);
  assert.equal(uncovered.length, 1);
  assert.match(uncovered[0].why, /not status: final/);
});

test("a final, accepted COE clears only the incident it names", () => {
  const d = tmpDir({ "2026-10-14-coe-x.md": coe(IDS.deploy, "final") });
  const { covered, uncovered } = coeCoverage(EVENTS, d);
  assert.deepEqual(covered.map((e) => e.id), [IDS.deploy]);
  assert.deepEqual(uncovered.map((e) => e.id).sort(), [IDS.ci, IDS.host].sort());
});

test("records in drafts/ are not read; SEV3 and non-incident events are ignored", () => {
  const d = tmpDir({});
  fs.mkdirSync(path.join(d, "drafts"));
  fs.writeFileSync(path.join(d, "drafts", "2026-10-14-coe-x.md"), coe(IDS.deploy, "final"));
  const events = [ev(IDS.deploy), ev("ev-sev3", "SEV3: minor"), { id: "ev-note", ts: "2026-10-14T00:00:00Z", type: "note", summary: "SEV2 mentioned" }];
  const { uncovered } = coeCoverage(events, d);
  assert.deepEqual(uncovered.map((e) => e.id), [IDS.deploy]);
});

test("an incident event with no id is never covered", () => {
  const d = tmpDir({ "2026-10-14-coe-x.md": coe(IDS.deploy, "final") });
  const { uncovered } = coeCoverage([{ ts: "2026-10-14T00:00:00Z", type: "incident", summary: "SEV1: no id" }], d);
  assert.equal(uncovered.length, 1);
});

test("the real events.jsonl has exactly these three SEV1/SEV2 incidents (if this fails, add the new id here)", () => {
  const events = fs.readFileSync(path.join(ROOT, "company/ops/events.jsonl"), "utf8").split("\n").filter(Boolean).map((l) => JSON.parse(l));
  const sev = events.filter((e) => e.type === "incident" && /SEV ?[12]\b/i.test(e.summary ?? "")).map((e) => e.id).sort();
  assert.deepEqual(sev, Object.values(IDS).sort());
});

test("every real 10-14 COE names its own incident id on its header incident: line, and names two reviewers who are not its owner", () => {
  for (const k of Object.keys(IDS)) {
    const d = tmpDir({ [FILES[k]]: realText(FILES[k]) });
    const c = readCoes(d)[0];
    assert.deepEqual(c.incidents, [IDS[k]], FILES[k]);
    assert.deepEqual(c.reviewers, ["evaluation-steward", "pattern-librarian"], FILES[k]);
    assert.ok(c.owner && !c.reviewers.includes(c.owner), `${FILES[k]} owner ${c.owner}`);
  }
});

test("the real records clear an incident only when every reviewer has accepted", () => {
  for (const k of Object.keys(IDS)) {
    const c = readCoes(REC).find((x) => x.file === FILES[k]);
    if (!c) continue; // still in drafts/: the end-to-end tests below use its text
    const allAccept = c.final && c.reviewers.length > 0 && c.reviewers.every((r) => c.verdicts[r] === "accept") && !c.reviewers.includes(c.owner);
    assert.equal(c.covers, allAccept, `${FILES[k]}: ${c.why}`);
  }
});

test("the real records in company/rituals/records/ as they stand clear all three incidents (both reviewers accepted: 907772b, b49adad)", () => {
  // If a re-review later says revise, this fails on purpose: R2 is holding, and the COE needs another accept.
  const { covered, uncovered } = coeCoverage(EVENTS, REC);
  assert.deepEqual(uncovered.map((e) => `${e.id}: ${e.why}`), []);
  assert.deepEqual(covered.map((e) => e.id).sort(), Object.values(IDS).sort());
  const r2 = runCheck("wave", REC, eventsFile(tmpDir({}))).fails.filter((f) => f.startsWith("R2"));
  assert.equal(r2.length, 0, r2.join("\n"));
});

test("W-782, intended: while a reviewer says revise (as all three did before b49adad), wave and build fail R2 and check only warns", () => {
  // The real records with the evaluation steward's verdict set back to revise and the pattern librarian's
  // verdict line removed: the state of 8ddd9fd, the first reviews.
  const revised = (t) => t.split(/^(?=## )/m).map((p) => {
    if (/^## Review \(evaluation-steward,/.test(p)) return p.replace(/^verdict:.*$/m, "verdict: revise (planted)");
    if (/^## Review \(pattern-librarian,/.test(p)) return p.replace(/^verdict:.*\n/m, "");
    return p;
  }).join("");
  const d = tmpDir(Object.fromEntries(Object.keys(IDS).map((k) => [FILES[k], revised(realText(FILES[k]))])));
  const evFile = eventsFile(d);
  for (const kind of ["wave", "build"]) {
    const r2 = runCheck(kind, d, evFile).fails.filter((f) => f.startsWith("R2"));
    assert.equal(r2.length, 1, kind);
    for (const k of Object.keys(IDS)) assert.match(r2[0], new RegExp(`${IDS[k]}: COE ${FILES[k].replace(/\./g, "\\.")} revise by evaluation-steward, no verdict by pattern-librarian`));
  }
  const check = runCheck("check", d, evFile);
  assert.equal(check.fails.filter((f) => f.startsWith("R2")).length, 0);
  assert.ok(check.warns.some((w) => w.startsWith("R2")), "a check dispatch warns on R2");
});

test("W-782: reviewers: parses both header forms (own line, and on the owner line after ' · ')", () => {
  const own = "# COE\n\nowner: test-author (author)\nreviewers: evaluation-steward, pattern-librarian\nstatus: final\nincident: ev-own1 (SEV2)\n\n## Review (evaluation-steward, 2026-10-14)\nverdict: accept\n\n## Review (pattern-librarian, 2026-10-14)\nverdict: accept\n";
  const same = own.replace("owner: test-author (author)\nreviewers:", "owner: test-author (author) · reviewers:").replace("ev-own1", "ev-same1");
  const d = tmpDir({ "2026-10-14-coe-own.md": own, "2026-10-14-coe-same.md": same });
  for (const c of readCoes(d)) {
    assert.equal(c.owner, "test-author", c.file);
    assert.deepEqual(c.reviewers, ["evaluation-steward", "pattern-librarian"], c.file);
  }
  assert.deepEqual(coeCoverage([ev("ev-own1"), ev("ev-same1")], d).covered.map((e) => e.id), ["ev-own1", "ev-same1"]);
});

test("the three records, once final and accepted by both reviewers, clear R2 in dispatch-check itself (end to end)", () => {
  const d = tmpDir(Object.fromEntries(Object.keys(IDS).map((k) => [FILES[k], asAccepted(realText(FILES[k]))])));
  const evFile = eventsFile(d);
  const ok = runCheck("wave", d, evFile);
  assert.equal(ok.fails.filter((f) => f.startsWith("R2")).length, 0, ok.fails.join("\n"));
  // Control: drop one record and R2 fails, naming the missing id.
  fs.rmSync(path.join(d, FILES.ci));
  const r2 = runCheck("wave", d, evFile).fails.filter((f) => f.startsWith("R2"));
  assert.equal(r2.length, 1);
  assert.match(r2[0], new RegExp(IDS.ci));
});

// ---- W-782: the evaluation steward's cases
test("W-782: final with no review is not covered", () => {
  const d = tmpDir({ "2026-10-14-coe-x.md": coe(IDS.deploy, "final", { reviews: {} }) });
  const { uncovered } = coeCoverage([ev(IDS.deploy)], d);
  assert.equal(uncovered.length, 1);
  assert.match(uncovered[0].why, /no review by evaluation-steward/);
});

test("W-782: one reviewer accepts and one is missing, not covered", () => {
  const d = tmpDir({ "2026-10-14-coe-x.md": coe(IDS.deploy, "final", { reviews: { "evaluation-steward": "accept" } }) });
  const { uncovered } = coeCoverage([ev(IDS.deploy)], d);
  assert.equal(uncovered.length, 1);
  assert.match(uncovered[0].why, /no review by pattern-librarian/);
});

test("W-782: a review section with no verdict line is not an accept", () => {
  const d = tmpDir({ "2026-10-14-coe-x.md": coe(IDS.deploy, "final", { reviews: { "evaluation-steward": "accept", "pattern-librarian": null } }) });
  const { uncovered } = coeCoverage([ev(IDS.deploy)], d);
  assert.equal(uncovered.length, 1);
  assert.match(uncovered[0].why, /no verdict by pattern-librarian/);
});

test("W-782: a revise is not covered, with the reason 'revise by <role>'", () => {
  const d = tmpDir({ "2026-10-14-coe-x.md": coe(IDS.deploy, "final", { reviews: { "evaluation-steward": "revise", "pattern-librarian": "accept" } }) });
  const { uncovered } = coeCoverage([ev(IDS.deploy)], d);
  assert.equal(uncovered.length, 1);
  assert.match(uncovered[0].why, /revise by evaluation-steward/);
});

test("W-782: the owner as a reviewer is not covered, even when every review accepts", () => {
  const d = tmpDir({ "2026-10-14-coe-x.md": coe(IDS.deploy, "final", { owner: "tools-lead", reviewers: "evaluation-steward, tools-lead", reviews: { "evaluation-steward": "accept", "tools-lead": "accept" } }) });
  const { uncovered } = coeCoverage([ev(IDS.deploy)], d);
  assert.equal(uncovered.length, 1);
  assert.match(uncovered[0].why, /owner tools-lead/);
});

test("W-782: status: final only in the body is not covered (the header's status counts)", () => {
  const d = tmpDir({ "2026-10-14-coe-x.md": coe(IDS.deploy, "draft", { body: "status: final\n" }) });
  const { uncovered } = coeCoverage([ev(IDS.deploy)], d);
  assert.equal(uncovered.length, 1);
  assert.match(uncovered[0].why, /not status: final/);
  // An incident: line only in the body names nothing either.
  const d2 = tmpDir({ "2026-10-14-coe-y.md": coe(null, "final", { body: `incident: ${IDS.deploy}\n` }) });
  assert.match(coeCoverage([ev(IDS.deploy)], d2).uncovered[0].why, /no COE record names this incident id/);
});

test("W-782: no reviewers: line in the header is not covered", () => {
  const d = tmpDir({ "2026-10-14-coe-x.md": coe(IDS.deploy, "final", { reviewers: null }) });
  const { uncovered } = coeCoverage([ev(IDS.deploy)], d);
  assert.equal(uncovered.length, 1);
  assert.match(uncovered[0].why, /no reviewers/);
});

test("W-782: both reviewers accept, covered; a later re-review that revises un-covers it", () => {
  const d = tmpDir({ "2026-10-14-coe-x.md": coe(IDS.deploy, "final") });
  assert.deepEqual(coeCoverage([ev(IDS.deploy)], d).covered.map((e) => e.id), [IDS.deploy]);
  fs.appendFileSync(path.join(d, "2026-10-14-coe-x.md"), "## Review (pattern-librarian, 2026-10-15)\nverdict: revise\n");
  assert.match(coeCoverage([ev(IDS.deploy)], d).uncovered[0]?.why ?? "", /revise by pattern-librarian/);
});
