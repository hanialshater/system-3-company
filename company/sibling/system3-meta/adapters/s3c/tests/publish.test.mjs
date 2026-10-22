// Tests for adapters/s3c/publish.mjs (plan 2026-10-21-m4-m7-plan.md §2 stage 9 + ship routing table, §3 K11, §4 row
// publish.mjs). Unit cases cover the parser and router. Real cases run the REAL `node tools/company.mjs publish` in a
// throwaway `git worktree add --detach` of REPO (env S3C_REPO, default /home/user/s3c-wt/base), removed in `after`;
// REPO itself is never written. The success case makes the one missing piece of evidence with the company's own
// `company qa-record` from a synthetic Playwright JSON report (only inside the throwaway worktree), then ships.
// Run: node --test company/sibling/system3-meta/adapters/s3c/tests/

import { test, before, after } from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import { spawnSync, execFileSync } from "node:child_process";
import { fileURLToPath } from "node:url";
import { parsePublish, routeReasons } from "../publish.mjs";

const HERE = path.dirname(fileURLToPath(import.meta.url));
const ADAPTER = path.join(HERE, "..", "publish.mjs");
const REPO = process.env.S3C_REPO ?? "/home/user/s3c-wt/base";
const REAL = fs.existsSync(path.join(REPO, "tools/company.mjs"));

function run(args) {
  const r = spawnSync(process.execPath, [ADAPTER, ...args], { encoding: "utf8", timeout: 120_000 });
  return { exit: r.status, json: JSON.parse(r.stdout.trim().split("\n").at(-1)), stdout: r.stdout };
}
const readJSON = (p) => JSON.parse(fs.readFileSync(p, "utf8"));
function metaPath(root, slug) {
  for (const d of fs.readdirSync(path.join(root, "src/demos"))) {
    const p = path.join(root, "src/demos", d, slug, "meta.json");
    if (fs.existsSync(p)) return p;
  }
  return null;
}

// ------------------------------------------------------------------ unit

test("parsePublish reads cmdPublish's three shapes", () => {
  const ref = parsePublish("\x1b[31ms-x cannot publish:\x1b[0m\n  - claims not verified: a.c1\n  - QA: newest QA record is a fail\n", "s-x");
  assert.deepEqual(ref, { published: false, refused: true, noLesson: false, reasons: ["claims not verified: a.c1", "QA: newest QA record is a fail"] });
  assert.equal(parsePublish("s-x published. Record the launch review in company/rituals/records/.\n", "s-x").published, true);
  assert.equal(parsePublish("no lesson s-x\n", "s-x").noLesson, true);
});

test("routeReasons: the plan §2 table, earliest stage wins, park overrides", () => {
  const r = (xs, learner) => routeReasons(xs, learner);
  assert.equal(r(["claims not verified: a.c1"]).route, "check");
  assert.equal(r(["learner review: verdict is for an older version"]).route, "learner");
  // step 3a: "verdict revise|fatal" keeps build/park only when the company's decide().latest is the current version.
  const cur = { file: "company/reviews/x/2026-10-20-learner-a.md", version: 3, metaVersion: 3 };
  const old = { ...cur, version: 2 };
  assert.equal(r(["learner review: verdict revise"], cur).route, "build"); // plan §2 stage 6: revise → build
  assert.equal(r(["learner review: verdict fatal"], cur).route, "park");
  assert.equal(r(["learner review: verdict fatal"], cur).park, true);
  const stale = routeReasons(["learner review: verdict revise"], old);
  assert.equal(stale.route, "learner"); // the builder already acted on the v2 revise; v3 needs a review
  assert.deepEqual(stale.findings[0].stale, old);
  assert.equal(routeReasons(["learner review: verdict fatal"], old).park, false);
  assert.equal(r(["learner review: verdict revise"]).route, "learner"); // no context → never guess build
  assert.equal(r(["QA: newest QA record is a fail"]).route, "qa");
  assert.equal(r(["no borrowed-mind learner review"]).route, "learner");
  const hold = r(["active publish hold: W-1", "claims not verified: a.c1"]);
  assert.equal(hold.route, "park");
  assert.equal(hold.park, true);
  assert.equal(r(["learner review: verdict is for an older version", "QA: x", "claims not verified: a.c1"]).route, "qa"); // qa < check < learner
  assert.deepEqual(r(["learner review: verdict is for an older version", "QA: x"]).routes, ["learner", "qa"]);
  const env = r(["company/ops/publish-holds.json is unreadable; every gate is closed until it parses (AMD-013 hold floor)"]);
  assert.equal(env.env, true);
  assert.equal(env.findings[0].severity, "environment");
});

// ------------------------------------------------------------------ usage and safety refusals (write nothing)

test("refuses: no --repo, the shared base, a primary working tree", () => {
  assert.equal(run(["zero-loses-to-this-crowd"]).exit, 2);
  assert.equal(run(["zero-loses-to-this-crowd", "--repo=/home/user/s3c-wt/base"]).exit, 2);
  const prim = fs.mkdtempSync(path.join(os.tmpdir(), "pub-prim-"));
  execFileSync("git", ["init", "-q"], { cwd: prim });
  fs.mkdirSync(path.join(prim, "tools"));
  fs.writeFileSync(path.join(prim, "tools/company.mjs"), "process.exit(9)\n");
  const r = run(["a-b", `--repo=${prim}`]);
  assert.equal(r.exit, 2);
  assert.match(r.json.findings[0].message, /not a linked git worktree/);
  fs.rmSync(prim, { recursive: true, force: true });
  assert.equal(run(["Bad", "--repo=/x"]).exit, 2);
});

// ------------------------------------------------------------------ real, in a throwaway worktree

let WT = null;
before(() => {
  if (!REAL) return;
  WT = fs.mkdtempSync(path.join(os.tmpdir(), "pub-wt-"));
  fs.rmdirSync(WT);
  execFileSync("git", ["-C", REPO, "worktree", "add", "--detach", "-q", WT, "HEAD"]);
});
after(() => {
  if (WT) execFileSync("git", ["-C", REPO, "worktree", "remove", "--force", WT]);
});
const changed = () => execFileSync("git", ["status", "--porcelain"], { cwd: WT, encoding: "utf8" }).trimEnd().split("\n").filter(Boolean);

test("real: refusal with several reasons routes to the earliest stage, writes nothing", { skip: !REAL }, () => {
  // saved-or-die-same-600 (review, v3): claims not verified c8 / "learner review: verdict revise" / QA built before
  // v3. The revise is stamped v2 (2026-10-16-learner-adult-beginner-r2.md), so it is stale → learner, not build.
  const r = run(["saved-or-die-same-600", `--repo=${WT}`]);
  assert.equal(r.exit, 1, r.stdout);
  assert.equal(r.json.status, "review");
  assert.ok(r.json.routes.includes("check"));
  assert.ok(!r.json.routes.includes("build"), r.stdout);
  assert.deepEqual(r.json.learnerLatest, { file: "company/reviews/saved-or-die-same-600/2026-10-16-learner-adult-beginner-r2.md", version: 2, metaVersion: 3 });
  assert.equal(r.json.findings.find((f) => f.message === "learner review: verdict revise").route, "learner");
  assert.equal(r.json.route, "qa"); // earliest of qa < check < learner; K11 re-runs check and learner after
  assert.deepEqual(changed(), []);
});

test("real: a revise for the CURRENT version still routes to build", { skip: !REAL }, () => {
  // karatsuba-three-not-four (review, v5, no publish hold): newest learner review is revise stamped v5. (The other 11
  // current-version revises in the sandbox are all held, and a hold parks, overriding build.)
  const r = run(["karatsuba-three-not-four", `--repo=${WT}`]);
  assert.equal(r.exit, 1, r.stdout);
  assert.equal(r.json.learnerLatest.version, r.json.learnerLatest.metaVersion);
  assert.equal(r.json.findings.find((f) => f.message === "learner review: verdict revise").route, "build");
  assert.equal(r.json.route, "build");
  execFileSync("git", ["checkout", "--", "."], { cwd: WT }); // linkLearner may have linked its reviews
});

test("real: an active hold parks with an ask", { skip: !REAL }, () => {
  const r = run(["suitcase-rotate-block", `--repo=${WT}`]);
  assert.equal(r.exit, 1);
  assert.equal(r.json.park, true);
  assert.equal(r.json.route, "park");
  assert.equal(r.json.ask.to, "head-of-product");
});

test("real: unlinked learner reviews are linked for this slug only (publish-ready --link body)", { skip: !REAL }, () => {
  // the-equals-sign-balances has company/reviews/.../2026-10-16-learner-adult-beginner-r10-reading.md unlinked.
  const mp = metaPath(WT, "the-equals-sign-balances");
  const before = readJSON(mp).evidence.simulatedLearner;
  const r = run(["the-equals-sign-balances", `--repo=${WT}`]);
  assert.deepEqual(r.json.linked, ["company/reviews/the-equals-sign-balances/2026-10-16-learner-adult-beginner-r10-reading.md"]);
  assert.deepEqual(readJSON(mp).evidence.simulatedLearner, [...before, ...r.json.linked]);
  assert.deepEqual(changed(), [` M ${path.relative(WT, mp)}`]); // only this lesson's meta.json
  const again = run(["the-equals-sign-balances", `--repo=${WT}`]);
  assert.deepEqual(again.json.linked, []); // idempotent
  execFileSync("git", ["checkout", "--", "."], { cwd: WT });
});

test("real: unreadable hold file is a stage-error (exit 3), not a revise", { skip: !REAL }, () => {
  const hp = path.join(WT, "company/ops/publish-holds.json");
  const keep = fs.readFileSync(hp, "utf8");
  fs.writeFileSync(hp, "{broken");
  try {
    const r = run(["fifty-up-fifty-down", `--repo=${WT}`]);
    assert.equal(r.exit, 3, r.stdout);
    assert.equal(r.json.findings.find((f) => f.severity === "environment").kind, "gate-machinery");
  } finally {
    fs.writeFileSync(hp, keep);
  }
});

test("real: company qa-record supplies the missing QA → publish exits 0 and status is published", { skip: !REAL }, () => {
  // fifty-up-fifty-down (review, v3) fails only "QA: newest QA record has no version stamp and is dated the same
  // day as an older-version review". A stamped, today-dated pass record from the company's own qa-record clears it.
  const slug = "fifty-up-fifty-down";
  const out = "test-results/adapt-publish-test"; // qa-record joins QA_OUT onto ROOT, so it must be relative
  fs.mkdirSync(path.join(WT, out), { recursive: true });
  const passed = (projectName) => ({ projectName, results: [{ status: "passed" }] });
  const report = { suites: [{ title: "tests/qa/contract.spec.ts", suites: [{ title: slug, specs: [{ title: "contract", tests: [passed("phone"), passed("desktop")] }] }] }] };
  fs.writeFileSync(path.join(WT, out, "qa-report.json"), JSON.stringify(report));
  const qa = spawnSync(process.execPath, ["tools/company.mjs", "qa-record"], { cwd: WT, encoding: "utf8", env: { ...process.env, QA_OUT: out } });
  assert.equal(qa.status, 0, qa.stdout + qa.stderr);
  assert.match(qa.stdout, /pass fifty-up-fifty-down/);

  const r = run([slug, `--repo=${WT}`]);
  assert.equal(r.exit, 0, r.stdout);
  assert.equal(r.json.ok, true);
  assert.equal(r.json.status, "published");
  assert.equal(readJSON(metaPath(WT, slug)).status, "published");
  execFileSync("git", ["checkout", "--", "."], { cwd: WT });
  execFileSync("git", ["clean", "-fdq", "company/reviews", out], { cwd: WT });
});
