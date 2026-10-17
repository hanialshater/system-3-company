// HQ Evaluation view (W-1648; batch 5 §20.3, company/personalization/batches/2026-10-17-batch-5.md).
// Every verdict and status the view shows is a verbatim quote from a committed record: these tests check that each
// quote appears in its cited file at its cited line, that no source is harness code or output, that each criterion's
// sha256 matches the file at its freeze commit, that criterion 3b stays "pending" exactly while K6's readout is not
// committed, that the timeline covers batch 5 §1 to §20 and the readout decisions, that the committed index is
// current, and that the page renders each study, review and path.
// Run: npm run test:hq
import { register } from "node:module";
import test from "node:test";
import assert from "node:assert/strict";
import { execFileSync } from "node:child_process";
import { createHash } from "node:crypto";
import fs from "node:fs";
import path from "node:path";

register("../lifehacks/render-loader.mjs", import.meta.url);
register("./lab-render-loader.mjs", import.meta.url);
const { buildIndex, OUT } = await import("../../tools/hq-eval-index.mjs");

const ROOT = process.cwd();
const read = (rel) => fs.readFileSync(path.join(ROOT, rel), "utf8");
const index = JSON.parse(read(OUT));

/** Every quote object in the index, wherever it sits. */
function quotes(o, out = []) {
  if (Array.isArray(o)) o.forEach((x) => quotes(x, out));
  else if (o && typeof o === "object") {
    if (typeof o.quote === "string" && typeof o.path === "string") out.push(o);
    else Object.values(o).forEach((x) => quotes(x, out));
  }
  return out;
}
const all = quotes(index);

test("quotes: each one is verbatim in its cited file, at its cited line, and no source is the harness", () => {
  assert.ok(all.length >= 30, `${all.length} quotes`);
  for (const q of all) {
    assert.ok(!/^company\/personalization\/eval\/harness\//.test(q.path), `harness path ${q.path}`);
    assert.ok(q.path.startsWith("company/") && q.path.endsWith(".md"), q.path);
    const t = read(q.path);
    const at = t.indexOf(q.quote);
    assert.ok(at >= 0, `${q.path}: quote not found: ${q.quote.slice(0, 100)}`);
    assert.equal(t.slice(0, at).split("\n").length, q.line, `${q.path}: line of ${q.quote.slice(0, 60)}`);
  }
});

test("hashes: each criterion's sha256 is stated in the criterion and the readout, and matches the file at its freeze commit", () => {
  const studies = index.studies.filter((s) => !s.pending);
  assert.equal(studies.length, 3);
  for (const s of studies) {
    const c = s.criterion;
    assert.ok(read(c.path).includes(c.sha256) && read(c.path).includes(c.freezeCommit), `${c.path} states its hash and commit`);
    assert.ok(read(s.readout.path).includes(c.sha256.slice(0, 16)) || read(s.readout.path).includes(c.freezeCommit.slice(0, 7)), `${s.readout.path} names the criterion it ran`);
    let bytes;
    try { bytes = execFileSync("git", ["show", `${c.freezeCommit}:${c.path}`], { cwd: ROOT, maxBuffer: 64 * 1024 * 1024 }); }
    catch { assert.fail(`git object ${c.freezeCommit} is not available (shallow clone?); CI checks out with fetch-depth 0`); }
    assert.equal(createHash("sha256").update(bytes).digest("hex"), c.sha256, `${c.path} at ${c.freezeCommit}`);
  }
});

test("studies and reviews: the four studies, criterion 3b pending exactly while K6's readout is not committed; the six reviews", () => {
  assert.deepEqual(index.studies.map((s) => s.id), ["phase-a", "criterion-2", "criterion-3", "criterion-3b"]);
  const k6 = fs.readdirSync(path.join(ROOT, "company/personalization/eval")).filter((f) => /criterion-3b.*readout/.test(f));
  const b = index.studies.find((s) => s.id === "criterion-3b");
  assert.equal(k6.length, 0, `K6's readout is committed (${k6.join(", ")}): transcribe it in tools/hq-eval-index.mjs; the view must stop saying pending`);
  assert.match(b.pending, /^pending/);
  for (const s of index.studies.filter((x) => !x.pending)) {
    assert.ok(s.readout.verdicts.length && s.repro.status.quote.startsWith("**Byte-identical.**") && s.decision.status.quote.startsWith("status:"), s.id);
    assert.match(s.decision.path, /^company\/decisions\/2026-10-1[67]-vp-personalization-.*readout-[123]-decisions\.md$/);
  }
  assert.deepEqual(index.reviews.map((r) => r.id), ["F5b", "F6", "F7", "RC", "fc2", "fact-check of head-of-product's copy"]);
  for (const r of index.reviews) assert.ok(r.verdict.length && r.decision.path === "company/personalization/batches/2026-10-17-batch-5.md", r.id);
});

test("timeline: batch 5 §1 to §20, the three readout decision records and the reachable-v1 line", () => {
  const secs = index.timeline.filter((t) => /^Batch 5 §\d+$/.test(t.what)).map((t) => Number(t.what.split("§")[1]));
  for (let i = 1; i <= 20; i++) assert.ok(secs.includes(i), `§${i}`);
  for (const n of [1, 2, 3]) assert.ok(index.timeline.some((t) => t.what === `Readout ${n} decisions`), `readout ${n}`);
  assert.ok(index.timeline.some((t) => t.quote.quote.includes("`reachable-v1` is retired, unscored")));
});

test("index: the committed evaluation.json is what the records give today (node tools/hq-eval-index.mjs)", () => {
  assert.deepEqual(index, JSON.parse(JSON.stringify(buildIndex())), `${OUT} is stale: run node tools/hq-eval-index.mjs`);
});

test("page: every study, review and cited path renders; criterion 3b shows pending; no lab candidate number", async () => {
  const { createElement: h } = await import("react");
  const { renderToStaticMarkup } = await import("react-dom/server");
  const { default: Evaluation } = await import("../../src/app/hq/personalization/evaluation/Evaluation.tsx");
  const html = renderToStaticMarkup(h(Evaluation, { index }));
  for (const s of index.studies) assert.ok(html.includes(s.name.replace(/'/g, "&#x27;")), s.name);
  for (const r of index.reviews) assert.ok(html.includes(`>${r.id.replace(/'/g, "&#x27;")}<`), r.id);
  for (const q of all) assert.ok(html.includes(q.path), q.path);
  assert.ok(html.includes("pending: K6"));
  assert.ok(html.includes("<strong>FAIL</strong>") && html.includes("REACHABLE"), "verdict tables render");
  assert.ok(!/reachable-v[23]\.seed|candidateLabel/.test(html), "no candidate document is read by this view");
  const page = read("src/app/hq/personalization/evaluation/page.tsx");
  assert.ok(!/readFileSync|child_process|runSim/.test(page), "the page bundles the index; it reads nothing at run time");
});
