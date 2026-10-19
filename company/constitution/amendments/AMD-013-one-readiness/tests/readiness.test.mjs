// AMD-013 (proposed): one readiness policy. Destination on ratification: tests/publish/readiness.test.mjs
// (picked up by `npm run test:publish`, which part (b) puts in CI). Runs from the companion directory too:
//   node --test company/constitution/amendments/AMD-013-one-readiness/tests/readiness.test.mjs
// Read-only against the repo: real lessons are read, never written; gate runs use a symlinked shadow tree in
// os.tmpdir() whose only real files are the patched tools/company.mjs and tools/lib/readiness.mjs.
import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import { spawnSync } from "node:child_process";
import { fileURLToPath, pathToFileURL } from "node:url";

const HERE = path.dirname(fileURLToPath(import.meta.url));
// The repo root: the nearest ancestor holding tools/company.mjs.
let ROOT = HERE;
while (!fs.existsSync(path.join(ROOT, "tools/company.mjs"))) {
  const up = path.dirname(ROOT);
  if (up === ROOT) throw new Error("repo root not found");
  ROOT = up;
}
// The lib: the companion copy while proposed, tools/lib/readiness.mjs once applied.
const COMPANION = path.join(ROOT, "company/constitution/amendments/AMD-013-one-readiness");
const LIB = fs.existsSync(path.join(COMPANION, "tools/lib/readiness.mjs")) ? path.join(COMPANION, "tools/lib/readiness.mjs") : path.join(ROOT, "tools/lib/readiness.mjs");
const lib = await import(pathToFileURL(LIB).href);
const { readiness, loadContext, loadHolds, gitAncestry, decide, readQa } = lib;

function findMeta(slug) {
  for (const d of fs.readdirSync(path.join(ROOT, "src/demos"))) {
    const p = path.join(ROOT, "src/demos", d, slug, "meta.json");
    if (fs.existsSync(p)) return JSON.parse(fs.readFileSync(p, "utf8"));
  }
  return null;
}

// Synthetic records.
const learner = (f, verdict, v, extra = "") => ({ f, t: `# Learner review\nlesson version: v${v}\n${extra}Verdict: ${verdict}\n` });
const qa = (f, result, { v = null, sha = null, linked = true } = {}) => ({
  f,
  t: `# Computer-use QA\n\ndate: ${f.slice(0, 10)} · harness: tests/qa/contract.spec.ts · recorded by: qa-tester (company qa-record) ·${v ? ` lesson version: v${v} ·` : ""} result: **${result}**\n${sha ? `\ntarget: http://localhost:3591 · mode: external · built from: ${sha}\n` : ""}`,
  linked,
});
const meta = (version = 1) => ({ slug: "fixture", version, evidence: { qa: [], simulatedLearner: [] } });

// ---------------------------------------------------------------- the three cases the brief asks for

test("(i) same-week-a-year-apart: passes the old gate, NOT ready under the new policy (current-version learner review says revise)", () => {
  const m = findMeta("same-week-a-year-apart");
  assert.ok(m, "lesson exists");
  const rec = path.join(ROOT, "company/reviews/same-week-a-year-apart/2026-10-16-learner-no-econ-adult-r1.md");
  const t = fs.readFileSync(rec, "utf8");
  assert.match(t, /^lesson version: v1$/m, "the review is stamped for v1");
  assert.match(t, /^Verdict: revise$/m, "the review says revise");
  assert.equal(m.version, 1, "and v1 is the current version");
  // Old gate: only file existence. Both evidence lists are non-empty and point at real files.
  assert.ok(m.evidence.qa.length && m.evidence.simulatedLearner.length);
  for (const r of [...m.evidence.qa, ...m.evidence.simulatedLearner]) assert.ok(fs.existsSync(path.join(ROOT, r)), r);
  const r = readiness(m, loadContext(ROOT, m, { holds: loadHolds(ROOT), isAncestor: gitAncestry(ROOT) }));
  assert.equal(r.ready, false);
  assert.ok(r.reasons.includes("learner review: verdict revise"), r.reasons.join("; "));
});

test("(ii) an active hold makes a lesson not ready, even when every verdict passes", () => {
  const ctx = { learner: [learner("2026-10-16-learner-a.md", "launch", 1)], qa: [qa("2026-10-16-qa.md", "pass", { v: 1 })], hold: null };
  assert.equal(readiness(meta(1), ctx).ready, true, "control: ready without the hold");
  const held = readiness(meta(1), { ...ctx, hold: "held by head-of-product ruling W-513" });
  assert.equal(held.ready, false);
  assert.deepEqual(held.reasons, ["active publish hold: held by head-of-product ruling W-513"]);
  // And on disk: every review-status lesson listed in company/ops/publish-holds.json is not ready.
  const holds = loadHolds(ROOT);
  let n = 0;
  for (const slug of Object.keys(holds)) {
    const m = findMeta(slug);
    if (!m || m.status !== "review") continue;
    const r = readiness(m, loadContext(ROOT, m, { holds }));
    assert.equal(r.ready, false, slug);
    assert.ok(r.reasons.some((x) => x.startsWith("active publish hold: ")), slug);
    n++;
  }
  assert.ok(n > 0, "at least one held review lesson on disk");
});

test("(iii) a lesson whose newest review passes is ready (an older revise does not hold it)", () => {
  const ctx = {
    learner: [learner("2026-10-16-learner-adult-beginner-r1.md", "revise", 1), learner("2026-10-16-learner-adult-beginner-r2.md", "launch", 2)],
    qa: [qa("2026-10-15-qa.md", "fail", { v: 1 }), qa("2026-10-16-qa.md", "pass", { v: 2 })],
    hold: null,
  };
  const r = readiness(meta(2), ctx);
  assert.equal(r.ready, true, r.reasons.join("; "));
  assert.equal(r.learner.latest.f, "2026-10-16-learner-adult-beginner-r2.md");
  assert.equal(r.qa.latest.f, "2026-10-16-qa.md");
});

// ---------------------------------------------------------------- QA verdict, version and order

test("QA: the newest record must pass; a same-day pass and fail with no order signal fails closed", () => {
  const L = [learner("2026-10-16-learner-a.md", "launch", 1)];
  assert.equal(readiness(meta(1), { learner: L, qa: [qa("2026-10-14-qa.md", "pass"), qa("2026-10-16-qa.md", "fail", { linked: false })] }).ready, false, "an unlinked newer fail still counts");
  const tie = readiness(meta(1), { learner: L, qa: [qa("2026-10-16-qa.md", "pass"), qa("2026-10-16-qa-pr6.md", "fail")] });
  assert.equal(tie.ready, false);
  assert.match(tie.reasons.join(), /newest QA record is a fail/);
});

test("QA: a stamped record must name the current version; an unstamped one is checked against the learner reviews' builds", () => {
  const L2 = [learner("2026-10-16-learner-a.md", "revise", 1, "built from aaaaaaa\n"), learner("2026-10-16-learner-a-r2.md", "launch", 2, "built from bbbbbbb\n")];
  assert.match(readiness(meta(2), { learner: L2, qa: [qa("2026-10-16-qa.md", "pass", { v: 1 })] }).reasons.join(), /for v1, lesson is v2/);
  // Unstamped, same day as the v1 review, no build: cannot tell, fails closed.
  assert.match(readiness(meta(2), { learner: L2, qa: [qa("2026-10-16-qa.md", "pass")] }).reasons.join(), /cannot tell which version/);
  // Unstamped, built from the build the v2 review saw: current.
  assert.equal(readiness(meta(2), { learner: L2, qa: [qa("2026-10-16-qa.md", "pass", { sha: "bbbbbbb" })] }).ready, true);
  // Unstamped, built from the build the v1 review saw: stale.
  assert.match(readiness(meta(2), { learner: L2, qa: [qa("2026-10-16-qa.md", "pass", { sha: "aaaaaaa" })] }).reasons.join(), /built before the current version/);
  // Unstamped and dated before the v1 review: stale; after it: current.
  assert.match(readiness(meta(2), { learner: L2, qa: [qa("2026-10-15-qa.md", "pass")] }).reasons.join(), /predates the current version/);
  assert.equal(readiness(meta(2), { learner: L2, qa: [qa("2026-10-17-qa.md", "pass")] }).ready, true);
  // From versionSince on, a record must carry its own stamp.
  assert.match(readiness(meta(2), { learner: L2, qa: [qa("2026-10-17-qa.md", "pass")], versionSince: "2026-10-17" }).reasons.join(), /no lesson version stamp/);
});

test("QA: exploratory notes are not verdicts; a newer linked unreadable record holds", () => {
  assert.equal(readQa("- Result: **no dead end**; reveal reachable.\nR4 result: no soft lock.\n").result, null);
  assert.equal(readQa("date: x · recorded by: qa-tester · result: **contract pass**\n").result, "pass");
  const L = [learner("2026-10-16-learner-a.md", "launch", 1)];
  const r = readiness(meta(1), { learner: L, qa: [qa("2026-10-14-qa.md", "pass"), { f: "2026-10-16-qa.md", t: "# QA\n| phone | pass |\n", linked: true }] });
  assert.match(r.reasons.join(), /newer linked QA record unreadable/);
});

test("QA: the recorder hook (AMD-010 part 3 step 10) is applied inside the one function", () => {
  const L = [learner("2026-10-16-learner-a.md", "launch", 1)];
  const recorder = (rec) => (/kind: independent/.test(rec.t) ? null : `evidence.qa ${rec.f} is not an independent QA record`);
  assert.match(readiness(meta(1), { learner: L, qa: [qa("2026-10-16-qa.md", "pass")], recorder }).reasons.join(), /not an independent QA record/);
});

test("learner: the policy is publish-ready's decide(), unchanged, on every lesson on disk", async () => {
  const pr = await import(pathToFileURL(path.join(ROOT, "tools/publish-ready.mjs")).href);
  const isAncestor = gitAncestry(ROOT);
  let n = 0;
  for (const d of fs.readdirSync(path.join(ROOT, "src/demos"))) {
    const dd = path.join(ROOT, "src/demos", d);
    if (!fs.statSync(dd).isDirectory()) continue;
    for (const slug of fs.readdirSync(dd)) {
      const mp = path.join(dd, slug, "meta.json");
      if (!fs.existsSync(mp)) continue;
      const m = JSON.parse(fs.readFileSync(mp, "utf8"));
      const rd = path.join(ROOT, "company/reviews", slug);
      const files = fs.existsSync(rd) ? fs.readdirSync(rd).filter((f) => f.includes("learner")).sort() : [];
      const reviews = files.map((f) => ({ f, t: fs.readFileSync(path.join(rd, f), "utf8") }));
      const a = pr.decide(reviews, m.version ?? 1, { isAncestor });
      const b = decide(reviews, m.version ?? 1, { isAncestor });
      assert.deepEqual([b.ready, b.reason, b.latest?.f], [a.ready, a.reason, a.latest?.f], slug);
      n++;
    }
  }
  assert.ok(n > 1000, `compared ${n} lessons`);
});

// ---------------------------------------------------------------- the gate in tools/company.mjs (patched)

// A shadow repo: symlinks to everything, except tools/company.mjs (patched copy) and tools/lib/readiness.mjs.
function shadow(libSource) {
  const dir = fs.mkdtempSync(path.join(os.tmpdir(), "s3c-amd013-"));
  for (const e of fs.readdirSync(ROOT)) if (e !== "tools") fs.symlinkSync(path.join(ROOT, e), path.join(dir, e));
  fs.mkdirSync(path.join(dir, "tools/lib"), { recursive: true });
  for (const e of fs.readdirSync(path.join(ROOT, "tools"))) if (e !== "lib" && e !== "company.mjs") fs.symlinkSync(path.join(ROOT, "tools", e), path.join(dir, "tools", e));
  for (const e of fs.readdirSync(path.join(ROOT, "tools/lib"))) if (e !== "readiness.mjs") fs.symlinkSync(path.join(ROOT, "tools/lib", e), path.join(dir, "tools/lib", e));
  fs.writeFileSync(path.join(dir, "tools/lib/readiness.mjs"), libSource);
  const applied = fs.readFileSync(path.join(ROOT, "tools/company.mjs"), "utf8").includes("readinessGates(");
  if (applied) fs.copyFileSync(path.join(ROOT, "tools/company.mjs"), path.join(dir, "tools/company.mjs"));
  else {
    // Apply only the company.mjs hunk of protected.diff to a private copy.
    const work = fs.mkdtempSync(path.join(os.tmpdir(), "s3c-amd013-apply-"));
    fs.mkdirSync(path.join(work, "tools"));
    fs.copyFileSync(path.join(ROOT, "tools/company.mjs"), path.join(work, "tools/company.mjs"));
    const r = spawnSync("git", ["apply", "--include=tools/company.mjs", path.join(COMPANION, "protected.diff")], { cwd: work, encoding: "utf8" });
    assert.equal(r.status, 0, r.stderr);
    fs.copyFileSync(path.join(work, "tools/company.mjs"), path.join(dir, "tools/company.mjs"));
    fs.rmSync(work, { recursive: true, force: true });
  }
  return dir;
}
const cli = (dir, ...args) => spawnSync(process.execPath, [path.join(dir, "tools/company.mjs"), ...args], { cwd: dir, encoding: "utf8" });

test("gate: patched status does not list same-week-a-year-apart, or any held lesson, as ready", () => {
  const dir = shadow(fs.readFileSync(LIB, "utf8"));
  try {
    const out = cli(dir, "status").stdout;
    const line = out.split("\n").find((l) => l.startsWith("Ready to publish:")) ?? "";
    const ready = line.replace("Ready to publish:", "").split(",").map((s) => s.trim()).filter(Boolean);
    assert.ok(!ready.includes("same-week-a-year-apart"), line);
    const holds = loadHolds(ROOT);
    for (const s of ready) assert.ok(!holds[s], `${s} is held but listed ready`);
    assert.match(out, /same-week-a-year-apart: learner review: verdict revise/);
  } finally {
    fs.rmSync(dir, { recursive: true, force: true });
  }
});

test("gate: patched check raises no readiness error on the repo as it is (grandfathered lessons warn)", () => {
  const dir = shadow(fs.readFileSync(LIB, "utf8"));
  try {
    const r = cli(dir, "check");
    const errs = r.stdout.split("\n").filter((l) => l.startsWith("error") && /readiness|learner review:|QA:|active publish hold/.test(l));
    assert.deepEqual(errs, []);
    assert.match(r.stdout, /grandfathered published lesson\(s\) still fail readiness/);
  } finally {
    fs.rmSync(dir, { recursive: true, force: true });
  }
});

test("gate: a lib tuned into 'always ready' fails the known-answer canary, and every gate closes", () => {
  const mutant = fs.readFileSync(LIB, "utf8") + "\nexport { readiness as _orig };\n";
  const always = mutant.replace("export function readiness(meta, ctx) {", "export function readiness(meta, ctx) {\n  return { ready: true, reasons: [], learner: null, qa: null };\n  // eslint-disable-next-line no-unreachable");
  assert.notEqual(always, mutant, "mutation applied");
  const dir = shadow(always);
  try {
    const st = cli(dir, "status").stdout;
    assert.ok(!/^Ready to publish:/m.test(st), "nothing is ready under a broken lib");
    assert.match(st, /known-answer canary/);
    const ck = cli(dir, "check");
    assert.notEqual(ck.status, 0, "check fails");
    assert.match(ck.stdout, /known-answer canary/);
  } finally {
    fs.rmSync(dir, { recursive: true, force: true });
  }
});

test("gate: a lib that ignores holds is caught by the canary too (the hold floor is in company.mjs as well)", () => {
  const src = fs.readFileSync(LIB, "utf8");
  const noHold = src.replace("if (ctx.hold) reasons.push(`active publish hold: ${ctx.hold}`);", "");
  assert.notEqual(noHold, src, "mutation applied");
  const dir = shadow(noHold);
  try {
    const st = cli(dir, "status").stdout;
    assert.match(st, /known-answer canary \(active hold/);
  } finally {
    fs.rmSync(dir, { recursive: true, force: true });
  }
});
