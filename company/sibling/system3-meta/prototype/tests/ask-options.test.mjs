import { test } from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import { spawnSync } from "node:child_process";

// K14 (plan 2026-10-21 §M5): `ask raise` takes the options and the recommendation the founder inbox shows
// (adapters/s3c/inbox-export.mjs maps them to founder-inbox.json `options` and `recommendation`).
const LIVE = fs.mkdtempSync(path.join(os.tmpdir(), "meta-k14-"));
process.env.META_LIVE_DIR = LIVE;
const { parseOptions } = await import("../asks.mjs");
const HERE = path.dirname(new URL(import.meta.url).pathname);
const cli = (...args) => {
  const env = { ...process.env, META_LIVE_DIR: LIVE }; delete env.NODE_TEST_CONTEXT; delete env.META_ROLE;
  const r = spawnSync("node", [path.join(HERE, "..", "meta.mjs"), ...args], { env, encoding: "utf8" });
  return { code: r.status, out: r.stdout ? JSON.parse(r.stdout) : null, err: r.stderr };
};

test("K14: parseOptions takes a JSON list or comma-separated words, and refuses empty, duplicate or too many", () => {
  assert.equal(parseOptions(null), null);
  assert.equal(parseOptions(true), null);
  assert.deepEqual(parseOptions("a, b ,c"), ["a", "b", "c"]);
  assert.deepEqual(parseOptions('["A: now, in full", "B: later"]'), ["A: now, in full", "B: later"], "a JSON list keeps its commas");
  for (const bad of ["[1,2]", "[", "a,,b", "a,a", "[]", Array(9).fill("x").map((x, i) => x + i).join(",")]) assert.throws(() => parseOptions(bad), /options/, bad);
});

test("K14 CLI: ask raise --options --recommend are kept on the ask; without them the ask is as before", () => {
  assert.equal(cli("init", "--spec=toy").code, 0);
  const r = cli("ask", "raise", "--by=cos", "--kind=deploy", "--title=Deploy?", "--why=w", "--due=2026-10-30", '--options=["A: now","B: after M6"]', "--recommend=B: after M6");
  assert.equal(r.code, 0, r.err);
  assert.deepEqual([r.out.assignee, r.out.ask.options, r.out.ask.recommend], ["founder", ["A: now", "B: after M6"], "B: after M6"]);
  const plain = cli("ask", "raise", "--by=cos", "--kind=deploy", "--title=Deploy 2?", "--why=w", "--due=2026-10-30");
  assert.equal(plain.code, 0, plain.err);
  assert.equal("options" in plain.out.ask || "recommend" in plain.out.ask, false);
  assert.equal(cli("ask", "raise", "--by=cos", "--kind=deploy", "--title=x", "--why=w", "--due=2026-10-30", "--options=a,a").code, 1);
  assert.equal(cli("ask", "raise", "--by=cos", "--kind=deploy", "--title=x", "--why=w", "--due=2026-10-30", "--recommend").code, 1);
});
