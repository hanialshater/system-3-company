// Tests for adapters/s3c/holds.mjs (plan 2026-10-21-m4-m7-plan.md §4 row holds.mjs). Unit cases use temp dirs with
// a company/ops/publish-holds.json; the real case reads REPO (env S3C_REPO, default /home/user/s3c-wt/base) read-only.
// Run: node --test company/sibling/system3-meta/adapters/s3c/tests/

import { test } from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import { spawnSync } from "node:child_process";
import { fileURLToPath } from "node:url";

const HERE = path.dirname(fileURLToPath(import.meta.url));
const ADAPTER = path.join(HERE, "..", "holds.mjs");
const REPO = process.env.S3C_REPO ?? "/home/user/s3c-wt/base";

function run(args) {
  const r = spawnSync(process.execPath, [ADAPTER, ...args], { encoding: "utf8", timeout: 30_000 });
  return { exit: r.status, json: JSON.parse(r.stdout.trim().split("\n").at(-1)) };
}
/** holdsText: file body, or undefined for no file. tools/company.mjs is a placeholder (the adapter checks it exists). */
function repo(holdsText) {
  const root = fs.mkdtempSync(path.join(os.tmpdir(), "holds-"));
  fs.mkdirSync(path.join(root, "tools"), { recursive: true });
  fs.writeFileSync(path.join(root, "tools/company.mjs"), "// placeholder\n");
  if (holdsText !== undefined) {
    fs.mkdirSync(path.join(root, "company/ops"), { recursive: true });
    fs.writeFileSync(path.join(root, "company/ops/publish-holds.json"), holdsText);
  }
  return root;
}

test("an active hold → exit 1, park:true, route park, ask to head-of-product", () => {
  const root = repo(JSON.stringify({ note: "x", holds: { "a-b": "held by W-1 ruling" } }));
  const r = run(["a-b", `--repo=${root}`]);
  assert.equal(r.exit, 1);
  assert.equal(r.json.park, true);
  assert.equal(r.json.hold, "held by W-1 ruling");
  assert.equal(r.json.findings[0].route, "park");
  assert.equal(r.json.findings[0].message, "active publish hold: held by W-1 ruling");
  assert.equal(r.json.ask.to, "head-of-product");
});

test("no hold, empty-string hold, missing file → exit 0", () => {
  const a = repo(JSON.stringify({ holds: { other: "x", "a-b": "" } }));
  assert.equal(run(["a-b", `--repo=${a}`]).exit, 0); // readiness(): `if (ctx.hold)`, so "" is no hold
  assert.equal(run(["c-d", `--repo=${a}`]).exit, 0);
  assert.equal(run(["a-b", `--repo=${repo(undefined)}`]).exit, 0); // company.mjs readHolds: no file → {}
});

test("inherited key: slug \"constructor\" is held, as company.mjs `opts.holds[meta.slug]` sees it", () => {
  const root = repo(JSON.stringify({ holds: { other: "x" } }));
  const r = run(["constructor", `--repo=${root}`]);
  assert.equal(r.exit, 1);
  assert.equal(r.json.inherited, true);
  assert.equal(r.json.findings[0].message, `active publish hold: ${String({}.constructor)}`); // readinessGates' line
  assert.match(r.json.ask.text, /no hold file edit can lift it/);
  assert.equal(run(["a-b", `--repo=${root}`]).json.inherited, undefined); // no hold → no flag
});

test("unreadable hold file or non-object holds → exit 3 (AMD-013 hold floor; environment, not a park)", () => {
  for (const body of ["{not json", JSON.stringify({ holds: ["a-b"] })]) {
    const r = run(["a-b", `--repo=${repo(body)}`]);
    assert.equal(r.exit, 3, body);
    assert.equal(r.json.findings[0].kind, "hold-file");
  }
});

test("usage → exit 2; not a company checkout → exit 3", () => {
  const root = repo("{}");
  assert.equal(run([`--repo=${root}`]).exit, 2);
  assert.equal(run(["a-b", "c-d", `--repo=${root}`]).exit, 2);
  assert.equal(run(["a-b", "--x=1", `--repo=${root}`]).exit, 2);
  assert.equal(run(["a-b", `--repo=${os.tmpdir()}`]).exit, 3);
});

test("real: the sandbox's holds", { skip: !fs.existsSync(path.join(REPO, "company/ops/publish-holds.json")) }, () => {
  const holds = JSON.parse(fs.readFileSync(path.join(REPO, "company/ops/publish-holds.json"), "utf8")).holds;
  const held = Object.keys(holds).find((k) => holds[k]);
  const r = run([held, `--repo=${REPO}`]);
  assert.equal(r.exit, 1);
  assert.equal(r.json.hold, holds[held]);
  assert.equal(run(["one-metre-more-rope", `--repo=${REPO}`]).exit, holds["one-metre-more-rope"] ? 1 : 0);
});
