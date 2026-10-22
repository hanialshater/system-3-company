// Tests for adapters/s3c/learner-verdict.mjs (plan 2026-10-21-m4-m7-plan.md §2 stage 6, §4 row learner-verdict.mjs).
// Unit cases run judge() and the CLI against a tiny temp repo that holds a COPY of the company's real
// tools/lib/readiness.mjs, so the verdict rules under test are the company's, not a fake. Real cases run the CLI
// read-only against REPO (env S3C_REPO, default /home/user/s3c-wt/base; sandbox branch meta/m4, never written) and
// check that it agrees with the company's own readiness on lessons that are in review there today.
// Run: node --test company/sibling/system3-meta/adapters/s3c/tests/

import { test, before } from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import { spawnSync } from "node:child_process";
import { fileURLToPath, pathToFileURL } from "node:url";
import { judge, LEARNER_FILE } from "../learner-verdict.mjs";

const HERE = path.dirname(fileURLToPath(import.meta.url));
const ADAPTER = path.join(HERE, "..", "learner-verdict.mjs");
const REPO = process.env.S3C_REPO ?? "/home/user/s3c-wt/base";

function run(args) {
  const r = spawnSync(process.execPath, [ADAPTER, ...args], { encoding: "utf8", timeout: 60_000 });
  return { exit: r.status, json: JSON.parse(r.stdout.trim().split("\n").at(-1)) };
}
const review = (verdict, v, extra = "") => `*Simulated learner.*\n\n# Learner review\nlesson version: v${v}\nVerdict: ${verdict}\n${extra}`;

/** A minimal company-shaped repo: the real readiness lib, one lesson, its reviews. */
function fakeRepo(slug, version, reviews) {
  const root = fs.mkdtempSync(path.join(os.tmpdir(), "lv-"));
  fs.mkdirSync(path.join(root, "tools/lib"), { recursive: true });
  fs.copyFileSync(path.join(REPO, "tools/lib/readiness.mjs"), path.join(root, "tools/lib/readiness.mjs"));
  const d = path.join(root, "src/demos/math", slug);
  fs.mkdirSync(d, { recursive: true });
  fs.writeFileSync(path.join(d, "meta.json"), JSON.stringify({ slug, version, status: "review", claims: [], evidence: { qa: [], simulatedLearner: [] } }));
  const rd = path.join(root, "company/reviews", slug);
  fs.mkdirSync(rd, { recursive: true });
  for (const [f, t] of Object.entries(reviews)) fs.writeFileSync(path.join(rd, f), t);
  return root;
}

let lib;
before(async () => {
  lib = await import(pathToFileURL(path.join(REPO, "tools/lib/readiness.mjs")).href);
});

// ------------------------------------------------------------------ unit (judge with the real lib)

const rec = (f, t) => ({ f: `company/reviews/s/${f}`, t });

test("file pattern is the template's <date>-learner-<boundary>[-rN].md", () => {
  assert.ok(LEARNER_FILE.test("2026-10-16-learner-adult-beginner-r2.md"));
  assert.ok(!LEARNER_FILE.test("learner-notes.md"));
  assert.ok(!LEARNER_FILE.test("2026-10-16-learner-adult.txt"));
});

test("launch on the current version passes", () => {
  const r = judge(lib, { version: 2 }, "s", [rec("2026-10-20-learner-a.md", review("launch", 2))]);
  assert.equal(r.exit, 0);
  assert.equal(r.out.ok, true);
  assert.equal(r.out.verdict, "launch");
});

test("revise → exit 1, route build; fatal → exit 1, park:true, route park", () => {
  const rv = judge(lib, { version: 2 }, "s", [rec("2026-10-20-learner-a.md", review("revise", 2))]);
  assert.equal(rv.exit, 1);
  assert.equal(rv.out.park, false);
  assert.equal(rv.out.findings[0].route, "build");
  const ft = judge(lib, { version: 2 }, "s", [rec("2026-10-20-learner-a.md", review("fatal", 2))]);
  assert.equal(ft.exit, 1);
  assert.equal(ft.out.park, true);
  assert.equal(ft.out.findings[0].route, "park");
});

test("every verdict is version-checked first: revise/fatal stamped for another version → route learner, no park", () => {
  // K12: a mis-stamped or stale record is the evaluator's defect; it must not spend a builder session or park the order.
  for (const [verdict, stamp] of [["fatal", 1], ["revise", 1], ["revise", 3], ["launch", 1]]) {
    const r = judge(lib, { version: 2 }, "s", [rec("2026-10-20-learner-a.md", review(verdict, stamp))]);
    assert.equal(r.exit, 1, `${verdict} v${stamp}`);
    assert.equal(r.out.park, false, `${verdict} v${stamp}`);
    assert.equal(r.out.findings[0].kind, "version", `${verdict} v${stamp}`);
    assert.equal(r.out.findings[0].route, "learner", `${verdict} v${stamp}`);
  }
});

test("launch for an older version → revise, route learner", () => {
  const r = judge(lib, { version: 3 }, "s", [rec("2026-10-20-learner-a.md", review("launch", 2))]);
  assert.equal(r.exit, 1);
  assert.equal(r.out.findings[0].kind, "version");
  assert.equal(r.out.findings[0].route, "learner");
});

test("non-canonical word, missing stamp, no review → revise, route learner", () => {
  for (const t of [review("pass", 2), "Verdict: launch\n", review("launch", 2, "lesson version: v3\n")]) {
    const r = judge(lib, { version: 2 }, "s", [rec("2026-10-20-learner-a.md", t)]);
    assert.equal(r.exit, 1, t);
    assert.equal(r.out.findings[0].kind, "unreadable");
  }
  const none = judge(lib, { version: 2 }, "s", []);
  assert.equal(none.exit, 1);
  assert.equal(none.out.findings[0].kind, "no-review");
});

test("newest DATE wins, even over an older review stamped with the right version", () => {
  // Older day: launch v2 (the right version). Newer day: the evaluator's fresh record says revise for v2.
  const r = judge(lib, { version: 2 }, "s", [rec("2026-10-19-learner-a.md", review("launch", 2)), rec("2026-10-20-learner-a.md", review("revise", 2))]);
  assert.equal(r.exit, 1);
  assert.equal(r.out.file, "company/reviews/s/2026-10-20-learner-a.md");
});

test("same-day tie of launch and revise resolves to revise (company.mjs readinessCanary case)", () => {
  const r = judge(lib, { version: 2 }, "s", [rec("2026-10-20-learner-a.md", review("launch", 2)), rec("2026-10-20-learner-b.md", review("revise", 2))]);
  assert.equal(r.exit, 1);
  assert.equal(r.out.verdict, "revise");
});

test("same day, -r2 beats -r1 (readiness.mjs newer())", () => {
  const r = judge(lib, { version: 2 }, "s", [rec("2026-10-20-learner-a.md", review("revise", 2)), rec("2026-10-20-learner-a-r2.md", review("launch", 2))]);
  assert.equal(r.exit, 0);
  assert.equal(r.out.file, "company/reviews/s/2026-10-20-learner-a-r2.md");
});

test("a pass is withheld when the company's readiness over all learner files disagrees", () => {
  const cand = [rec("2026-10-20-learner-a.md", review("launch", 2))];
  // loadContext counts any "learner" file; an undated one is outside LEARNER_FILE but its revise still blocks stage 8.
  const all = [...cand, { f: "company/reviews/s/learner-z.md", t: review("revise", 2) }];
  const r = judge(lib, { version: 2 }, "s", cand, all);
  assert.equal(r.exit, 1);
  assert.equal(r.out.findings[0].kind, "company-readiness");
});

// ------------------------------------------------------------------ CLI on a temp repo

test("CLI: fatal exits 1 with park:true; usage exits 2", () => {
  const root = fakeRepo("four-cards-one-rule", 1, { "2026-10-21-learner-adult-beginner.md": review("fatal", 1) });
  const r = run(["four-cards-one-rule", `--repo=${root}`]);
  assert.equal(r.exit, 1);
  assert.equal(r.json.park, true);
  assert.equal(run([`--repo=${root}`]).exit, 2);
  assert.equal(run(["Bad_Slug", `--repo=${root}`]).exit, 2);
  assert.equal(run(["four-cards-one-rule", "--nope", `--repo=${root}`]).exit, 2);
  assert.equal(run(["four-cards-one-rule", `--repo=${path.join(root, "missing")}`]).exit, 3);
  fs.rmSync(root, { recursive: true, force: true });
});

test("CLI: launch on the current version exits 0", () => {
  const root = fakeRepo("four-cards-one-rule", 2, { "2026-10-20-learner-x.md": review("revise", 1), "2026-10-21-learner-x.md": review("launch", 2) });
  const r = run(["four-cards-one-rule", `--repo=${root}`]);
  assert.equal(r.exit, 0, JSON.stringify(r.json));
  assert.equal(r.json.version, 2);
  fs.rmSync(root, { recursive: true, force: true });
});

// ------------------------------------------------------------------ real REPO, read-only

test("real: agrees with company readiness on review lessons in the sandbox", { skip: !fs.existsSync(path.join(REPO, "src/demos")) }, () => {
  // Observed on meta/m4 23aaeba66 (`node tools/company.mjs publish <slug>` in a throwaway worktree):
  //   fifty-up-fifty-down     blocked only by QA        → learner passes
  //   zero-loses-to-this-crowd "learner review: verdict is for an older version" → version, route learner
  //   saved-or-die-same-600   "learner review: verdict revise", but that revise is stamped v2 and meta is v3 → the
  //                           builder already acted on it; no v3 review exists → version, route learner
  //   karatsuba-three-not-four "learner review: verdict revise", stamped v5, meta v5 → revise, route build
  const want = { "fifty-up-fifty-down": [0, null], "zero-loses-to-this-crowd": [1, "learner"], "saved-or-die-same-600": [1, "learner"], "karatsuba-three-not-four": [1, "build"] };
  for (const [slug, [exit, route]] of Object.entries(want)) {
    const r = run([slug, `--repo=${REPO}`]);
    assert.equal(r.exit, exit, `${slug}: ${JSON.stringify(r.json)}`);
    if (route) assert.equal(r.json.findings[0].route, route, slug);
  }
});
