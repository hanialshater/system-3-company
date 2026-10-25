// AMD-017 (ratified 2026-10-25, F-51): risk tiers and the sampled learner walk. Picked up by `npm run test:publish`.
// The lib is ordinary surface (tools/lib/tiers.mjs); tools/company.mjs (protected) holds the parameters and a
// known-answer canary. These tests pin the lib's behaviour and check that the installed gate's canary passes.
import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import { spawnSync } from "node:child_process";
import { fileURLToPath } from "node:url";
import * as t from "../../tools/lib/tiers.mjs";

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "../..");
const P = { sampleRate: 1 / 5, stopNumerator: 1, stopDenominator: 10, newFormatBelow: 3, riskRoutes: ["sensitive", "safety", "copyright"] };
const fc = new Map([["single-card", 50], ["multi-card-sequence", 2], ["before-after", 3]]);
const m = (slug, extra = {}) => ({ slug, domain: "math", status: "review", version: 1, format: "single-card", ...extra });
const batch = (id, date, slugs, extra = {}) => ({ id, date, domain: "math", drawnBy: "evaluation-steward", lessons: slugs.map((slug) => ({ slug, version: 1 })), ...extra });
const ten = (p) => Array.from({ length: 10 }, (_, i) => `${p}${i}`);

test("normFormat folds spellings of one format", () => {
  assert.equal(t.normFormat("Before / after toggle"), "before-after-toggle");
  assert.equal(t.normFormat("Single card"), "single-card");
  assert.equal(t.normFormat(undefined), "(none)");
});

test("tiers: N for a format with fewer than 3 other published lessons, R for risk, S otherwise", () => {
  assert.equal(t.tierOf(m("a"), { formatCounts: fc }, P).tier, "S");
  assert.equal(t.tierOf(m("a", { format: "Multi card sequence" }), { formatCounts: fc }, P).tier, "N");
  // the third published before-after lesson does not count itself
  assert.equal(t.tierOf(m("a", { format: "before-after", status: "published" }), { formatCounts: fc }, P).tier, "N");
  assert.equal(t.tierOf(m("a", { format: "before-after" }), { formatCounts: fc }, P).tier, "S");
  assert.equal(t.tierOf(m("a", { reviewRoute: { route: "copyright" } }), { formatCounts: fc }, P).tier, "R");
  assert.equal(t.tierOf(m("a", { reviewRoute: { route: "standard" } }), { formatCounts: fc }, P).tier, "S");
  assert.equal(t.tierOf(m("a"), { formatCounts: fc, concept: { reviewRoute: "sensitive" } }, P).tier, "R");
  assert.equal(t.tierOf(m("a"), { formatCounts: fc, concept: { sensitive: "  " } }, P).tier, "S");
  assert.equal(t.tierOf(m("a"), { formatCounts: fc, concept: { sensitive: "colonial violence" } }, P).tier, "R");
  assert.equal(t.tierOf(m("a"), { formatCounts: fc, domainStatus: "incubating" }, P).tier, "R");
});

test("sample: at least 1 in 5, drawn by hash, stable, full on the stop rule", () => {
  const b = batch("2026-10-26-math-1", "2026-10-26", ten("a"));
  const s = t.drawSample(b, P.sampleRate);
  assert.equal(s.length, 2);
  assert.deepEqual(t.drawSample(b, P.sampleRate), s);
  assert.equal(t.drawSample(batch("x", "d", ["a", "b", "c"]), P.sampleRate).length, 1);
  assert.equal(t.drawSample(batch("x", "d", ten("b").concat(["c"])), P.sampleRate).length, 3);
  assert.equal(t.drawSample(b, P.sampleRate, true).length, 10);
});

test("coverage: unsampled lessons pass on a walked, clean sample; nothing else does", () => {
  const b = batch("2026-10-26-math-1", "2026-10-26", ten("a"));
  const s = t.drawSample(b, P.sampleRate);
  const un = ten("a").find((x) => !s.includes(x));
  const launch = () => "launch";
  assert.equal(t.coverage(m(un), "S", [b], launch, P).covered, true);
  assert.match(t.coverage(m(s[0]), "S", [b], launch, P).reason, /sampled/);
  assert.match(t.coverage(m(un), "S", [b], (x) => (x === s[0] ? null : "launch"), P).reason, /not walked/);
  assert.equal(t.coverage(m(un), "S", [b], (x) => (x === s[0] ? "revise" : "launch"), P).covered, true);
  assert.match(t.coverage(m(un), "S", [b], (x) => (x === s[0] ? "fatal" : "launch"), P).reason, /stop rule/);
  assert.equal(t.coverage(m(un), "N", [b], launch, P).covered, false);
  assert.equal(t.coverage(m(un), "R", [b], launch, P).covered, false);
  assert.equal(t.coverage(m(un, { domain: "cs" }), "S", [b], launch, P).covered, false);
  assert.equal(t.coverage(m(un, { version: 2 }), "S", [b], launch, P).covered, false);
  assert.equal(t.coverage(m(un), "S", [b], launch, P, { ownCurrentReviews: 1 }).covered, false);
  assert.equal(t.coverage(m(un), "S", [b], launch, P, { revoked: "audit" }).covered, false);
  assert.equal(t.coverage(m(un), "S", [{ ...b, drawnBy: "" }], launch, P).covered, false);
  assert.equal(t.coverage(m(un), "S", [b], launch, { ...P, builders: () => ["evaluation-steward"] }).covered, false);
  assert.match(t.coverage(m(un), "S", [{ ...b, sample: [un] }], launch, P).reason, /not the drawn sample/);
});

test("coverage: only the earliest batch listing a lesson counts (no re-rolling the sample)", () => {
  const first = batch("2026-10-26-math-1", "2026-10-26", ten("a"));
  const s = t.drawSample(first, P.sampleRate);
  const later = batch("2026-10-27-math-1", "2026-10-27", ten("a"));
  const sl = t.drawSample(later, P.sampleRate);
  const target = s.find((x) => !sl.includes(x));
  if (target) assert.match(t.coverage(m(target), "S", [later, first], () => "launch", P).reason, /sampled in batch 2026-10-26-math-1/);
});

test("stop rule: the batch after a tripped batch walks every lesson; it clears after a clean full batch", () => {
  const b1 = batch("2026-10-26-math-1", "2026-10-26", ten("a"));
  const s1 = t.drawSample(b1, P.sampleRate);
  const b2 = batch("2026-10-27-math-1", "2026-10-27", ten("b"));
  const b3 = batch("2026-10-28-math-1", "2026-10-28", ten("c"));
  const s3 = t.drawSample(b3, P.sampleRate);
  const fatalIn1 = (x) => (x === s1[0] ? "fatal" : "launch");
  assert.deepEqual(t.batchState(b2, fatalIn1, P, true).sample.length, 10);
  for (const x of ten("b")) assert.equal(t.coverage(m(x), "S", [b1, b2], fatalIn1, P).covered, false);
  const un3 = ten("c").find((x) => !s3.includes(x));
  assert.equal(t.coverage(m(un3), "S", [b1, b2, b3], fatalIn1, P).covered, true);
  // other categories are not affected
  const cs = { ...batch("2026-10-27-cs-1", "2026-10-27", ten("d")), domain: "cs" };
  const sc = t.drawSample(cs, P.sampleRate);
  const unc = ten("d").find((x) => !sc.includes(x));
  assert.equal(t.coverage(m(unc, { domain: "cs" }), "S", [b1, cs], fatalIn1, P).covered, true);
});

test("audit revocation: more than 1 fatal in 10 in a category, two audits running", () => {
  const a = (date, f, n, domain = "math") => ({ date, lessons: Array.from({ length: n }, (_, i) => ({ domain, fatal: i < f })) });
  assert.ok(t.auditRevoked("math", [a("2026-11-01", 1, 5), a("2026-11-08", 1, 4)], P));
  assert.equal(t.auditRevoked("math", [a("2026-11-01", 1, 10), a("2026-11-08", 1, 4)], P), null); // exactly 1 in 10 is allowed
  assert.equal(t.auditRevoked("math", [a("2026-11-01", 1, 5)], P), null); // one audit is not two weeks running
  assert.equal(t.auditRevoked("math", [a("2026-10-25", 3, 5), a("2026-11-01", 1, 5), a("2026-11-08", 0, 5)], P), null); // only the last two count
  assert.equal(t.auditRevoked("cs", [a("2026-11-01", 1, 5), a("2026-11-08", 1, 4)], P), null);
});

test("worstAt reads only readable verdicts stamped with the version", () => {
  const r = [{ verdict: "launch", version: 1 }, { verdict: "revise", version: 1 }, { verdict: "fatal", version: 2 }, { verdict: null, problem: "x", version: 3 }];
  assert.equal(t.worstAt(r, 1), "revise");
  assert.equal(t.worstAt(r, 2), "fatal");
  assert.equal(t.worstAt(r, 3), null);
  assert.equal(t.worstAt(r, 4), null);
});

test("learnerVerdicts reads a lesson's review files", () => {
  const dir = fs.mkdtempSync(path.join(os.tmpdir(), "tiers-"));
  fs.mkdirSync(path.join(dir, "company/reviews/x"), { recursive: true });
  fs.writeFileSync(path.join(dir, "company/reviews/x/2026-10-26-learner-a.md"), "lesson version: v2\nVerdict: fatal\n");
  fs.writeFileSync(path.join(dir, "company/reviews/x/2026-10-26-qa.md"), "lesson version: v2\nresult: **pass**\n");
  const r = t.learnerVerdicts(dir, "x");
  assert.equal(r.length, 1);
  assert.equal(t.worstAt(r, 2), "fatal");
  assert.deepEqual(t.loadBatches(dir), []);
  fs.rmSync(dir, { recursive: true, force: true });
});

test("the installed gate's tiers canary passes", () => {
  const r = spawnSync("node", [path.join(ROOT, "tools/company.mjs"), "check"], { cwd: ROOT, encoding: "utf8" });
  assert.doesNotMatch(r.stdout, /tiers lib (failed|canary threw)/);
});
