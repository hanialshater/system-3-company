// The claim-floor parity test plan 2026-10-21-m4-m7-plan.md §4 row gates.mjs names `tests/claimfloor-parity.test.mjs`:
// for every published lesson, gates.mjs claimFloor() (a copy of the protected, unexported tools/company.mjs
// claimGates) must equal `company check`'s `published but fails gate:` lines that are not readiness lines. It is
// the guard against drift (plan §6 risk 3; `gates.mjs --parity` runs it at every tick start).
//
// REPO (env S3C_REPO, default /home/user/s3c-wt/base) is only read. The mutation case writes in a throwaway
// `git worktree add --detach` removed in `after`. Run: node --test company/sibling/system3-meta/adapters/s3c/tests/

import { test, before, after } from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";
import { spawnSync, execFileSync } from "node:child_process";
import { fileURLToPath } from "node:url";

const HERE = path.dirname(fileURLToPath(import.meta.url));
const GATES = path.join(HERE, "..", "gates.mjs");
const REPO = process.env.S3C_REPO ?? "/home/user/s3c-wt/base";

function run(args) {
  const r = spawnSync(process.execPath, [GATES, ...args], { encoding: "utf8", timeout: 180_000 });
  const last = r.stdout.trim().split("\n").at(-1);
  return { exit: r.status, json: JSON.parse(last) };
}
const readJSON = (p) => JSON.parse(fs.readFileSync(p, "utf8"));
const writeJSON = (p, v) => fs.writeFileSync(p, JSON.stringify(v, null, 2) + "\n");

test("claim-floor parity: for all published lessons, claimFloor equals check's claim-gate lines (readiness lines excluded)", () => {
  const r = run(["--parity", `--repo=${REPO}`]);
  assert.equal(r.exit, 0, JSON.stringify(r.json.findings?.slice(0, 3)));
  assert.equal(r.json.compared, r.json.published);
  assert.equal(r.json.claimParity, r.json.compared);
  assert.equal(r.json.fullParity, r.json.compared);
  assert.ok(r.json.published >= 700);
});

let WT = null;
before(() => {
  WT = path.join(path.dirname(REPO), `adapt-gates-parity-${process.pid}`);
  execFileSync("git", ["worktree", "add", "--detach", WT, "HEAD"], { cwd: REPO, stdio: "ignore" });
});
after(() => {
  if (WT) execFileSync("git", ["worktree", "remove", "--force", WT], { cwd: REPO, stdio: "ignore" });
});

test("parity still holds when every claimGates branch fires on published lessons", () => {
  // Published lessons exercise only 12 claim-gate lines at 23aaeba66 (all others are readiness), so mutate seven
  // published lessons, one claimGates branch each, and require parity again. Mutations stay in the worktree.
  const pubs = [];
  for (const d of fs.readdirSync(path.join(WT, "src/demos"))) {
    const dd = path.join(WT, "src/demos", d);
    if (!fs.statSync(dd).isDirectory()) continue;
    for (const s of fs.readdirSync(dd)) {
      const p = path.join(dd, s, "meta.json");
      try {
        const m = readJSON(p);
        if (m.status === "published" && m.claims.length && m.claims[0].status === "verified" && m.evidence.qa.length) pubs.push(p);
      } catch {}
    }
  }
  const muts = [
    (m) => (m.claims[0].status = "unverified"),
    (m) => delete m.claims[0].checkedBy,
    (m) => (m.claims[0].checkedBy = m.owner.builder),
    (m) => (m.evidence.qa = []),
    (m) => (m.evidence.pairwise = ["company/reviews/no-such-file.md"]),
    (m) => ((m.confidence = "**"), (m.evidence.humanLearners = [])),
    (m) => (m.claims = []),
  ];
  const before = run(["--parity", `--repo=${WT}`]).json.claimLines;
  muts.forEach((f, i) => {
    const m = readJSON(pubs[i]);
    f(m);
    writeJSON(pubs[i], m);
  });
  const r = run(["--parity", `--repo=${WT}`]);
  assert.equal(r.exit, 0, JSON.stringify(r.json.findings?.slice(0, 3)));
  assert.equal(r.json.claimParity, r.json.compared);
  assert.ok(r.json.claimLines >= before + muts.length, `claimLines ${before} → ${r.json.claimLines}`);
});
