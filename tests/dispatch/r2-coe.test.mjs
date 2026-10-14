// W-715: dispatch-check R2 matches a COE to its incident id and needs `status: final`.
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
const coe = (incident, status) => `# COE\n\nowner: test\nstatus: ${status}\n${incident ? `incident: ${incident} (SEV2)\n` : ""}\n## Five whys\n`;
// The real text of a record: from records/ if it is there, else from drafts/ (a COE whose author has not finalised it yet).
const realText = (f) => fs.readFileSync(fs.existsSync(path.join(REC, f)) ? path.join(REC, f) : path.join(REC, "drafts", f), "utf8");
const asFinal = (t) => (/^status:\s*final\b/im.test(t) ? t : t.replace(/^status:.*$/m, "status: final"));

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

test("a final COE clears only the incident it names", () => {
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

test("every real 10-14 COE names its own incident id on its incident: line", () => {
  for (const k of Object.keys(IDS)) {
    const d = tmpDir({ [FILES[k]]: realText(FILES[k]) });
    assert.deepEqual(readCoes(d)[0].incidents, [IDS[k]], FILES[k]);
  }
});

test("the real final records in company/rituals/records/ clear their incidents", () => {
  const finals = readCoes(REC).filter((c) => c.final);
  const ids = new Set(finals.flatMap((c) => c.incidents));
  for (const k of ["deploy", "host"]) assert.ok(ids.has(IDS[k]), `${FILES[k]} should be final and name ${IDS[k]}`);
});

test("the three records, once final, clear R2 in dispatch-check itself (end to end)", () => {
  const d = tmpDir(Object.fromEntries(Object.keys(IDS).map((k) => [FILES[k], asFinal(realText(FILES[k]))])));
  const evFile = path.join(d, "events.jsonl");
  fs.writeFileSync(evFile, EVENTS.map((e) => JSON.stringify(e)).join("\n") + "\n");
  const run = (dir) => {
    try { return execFileSync("node", [path.join(ROOT, "tools/dispatch-check.mjs"), "--kind=wave", "--running=0", "--builders=0", "--json"], { env: { ...process.env, S3_COE_DIR: dir, S3_EVENTS: evFile }, encoding: "utf8" }); }
    catch (e) { return e.stdout; }
  };
  const ok = JSON.parse(run(d));
  assert.equal(ok.fails.filter((f) => f.startsWith("R2")).length, 0, ok.fails.join("\n"));
  // Control: drop one final record and R2 fails, naming the missing id.
  fs.rmSync(path.join(d, FILES.ci));
  const bad = JSON.parse(run(d));
  const r2 = bad.fails.filter((f) => f.startsWith("R2"));
  assert.equal(r2.length, 1);
  assert.match(r2[0], new RegExp(IDS.ci));
});
