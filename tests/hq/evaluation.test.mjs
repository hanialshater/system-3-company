// HQ Evaluation page (W-1841): the data it renders equals `tools/eval/bt.mjs` run on the committed records,
// the tab is wired in both bars, the page is gated by hqEnabled, and the README's rule is on the page.
// Run: npm run test:hq
import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import { execFileSync } from "node:child_process";

const DATA = "src/app/hq/evaluation/leaderboard.generated.json";
const committed = JSON.parse(fs.readFileSync(DATA, "utf8"));

test("the page's data equals bt.mjs output on the committed records", () => {
  const dir = fs.mkdtempSync(path.join(os.tmpdir(), "bt-"));
  const out = path.join(dir, "lb.json");
  execFileSync(process.execPath, ["tools/eval/bt.mjs", `--out=${out}`], { stdio: "pipe" });
  assert.deepEqual(JSON.parse(fs.readFileSync(out, "utf8")), committed, "run `node tools/eval/bt.mjs` and commit the result");
  fs.rmSync(dir, { recursive: true, force: true });
});

test("every criterion has rows with intervals and record counts, and no overall is listed", () => {
  assert.ok(committed.criteria.length >= 6);
  assert.ok(!committed.criteria.some((c) => c.id === "overall"));
  for (const c of committed.criteria) {
    const rows = committed.rows.filter((r) => r.criterion === c.id);
    assert.ok(rows.length > 0, c.id);
    for (const r of rows) assert.ok(r.lo <= r.rating && r.rating <= r.hi && r.comparisons > 0, `${c.id} ${r.item}`);
  }
});

test("the tab is in both bars and the page is gated by hqEnabled", () => {
  assert.match(fs.readFileSync("src/app/hq/HqTop.tsx", "utf8"), /id: "evaluation", label: "Evaluation", href: "\/hq\/evaluation"/);
  assert.match(fs.readFileSync("src/app/hq/HQ.tsx", "utf8"), /href="\/hq\/evaluation"/);
  assert.match(fs.readFileSync("src/app/hq/evaluation/page.tsx", "utf8"), /if \(!hqEnabled\(\)\) notFound\(\)/);
});

test("the README rule is visible on the page", () => {
  const t = fs.readFileSync("src/app/hq/evaluation/Evaluation.tsx", "utf8");
  assert.match(t, /preference\. It is not a publish gate and not evidence of learning/);
});
