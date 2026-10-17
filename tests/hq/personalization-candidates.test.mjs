// HQ Personalization Lab: the frozen candidates reachable-v2 and reachable-v3 (W-1648; batch 5 §20.2,
// company/personalization/batches/2026-10-17-batch-5.md). These tests show: the adapter imports only the two frozen
// files and refuses a changed byte, a missing file and reachable-v1 before importing anything; its episode loop is
// the lab simulator's (default-order parity); the committed documents are current, carry the §20.2 label, hold the
// six simulated personas only, and store no rank number; the labels and RC lines are verbatim from their records;
// the page renders the label on every candidate view, marks L3, and shows no reason line for v2; production reads
// committed files only.
// Run: npm run test:hq
import { register } from "node:module";
import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import zlib from "node:zlib";

register("../lifehacks/render-loader.mjs", import.meta.url);
register("./lab-render-loader.mjs", import.meta.url);
const A = await import("../../tools/hq-lab-candidates.mjs");
const L = await import("../../src/lib/hq-personalization-candidates.ts");
const { readCandidate, candidateEntries, clearPrecomputedCache, PRECOMPUTED_DIR } = await import("../../src/lib/hq-personalization-precomputed.ts");
const { PERSONAS } = await import("../../company/personalization/model/personas.ts");

const ROOT = process.cwd();
const read = (rel) => fs.readFileSync(path.join(ROOT, rel), "utf8");
const manifest = JSON.parse(read(`${PRECOMPUTED_DIR}/manifest.json`));
const SIMULATED = PERSONAS.map((p) => p.id).sort();

test("adapter: refuses a changed byte, a missing file and reachable-v1 before importing; the frozen files load", async () => {
  const tmp = fs.mkdtempSync(path.join(os.tmpdir(), "hq-cand-"));
  try {
    const pol = path.join(tmp, "company/personalization/policies");
    fs.mkdirSync(pol, { recursive: true });
    const src = read("company/personalization/policies/reachable-v3.ts");
    fs.writeFileSync(path.join(pol, "reachable-v3.ts"), src.replace("const P = {", "const P  = {")); // one byte more
    await assert.rejects(A.loadCandidate("reachable-v3", tmp), (e) => e instanceof A.CandidateRefused && /is not the frozen 53981ab0/.test(e.message));
    await assert.rejects(A.loadCandidate("reachable-v2", tmp), (e) => e instanceof A.CandidateRefused && /sha256 missing/.test(e.message));
    fs.writeFileSync(path.join(pol, "reachable-v3.ts"), src); // the right bytes, but not this repository's file: still refused
    await assert.rejects(A.loadCandidate("reachable-v3", tmp), (e) => e instanceof A.CandidateRefused && /only from this repository/.test(e.message));
  } finally { fs.rmSync(tmp, { recursive: true, force: true }); }
  for (const n of ["reachable-v1", "reachable-v4", "gam"]) await assert.rejects(A.loadCandidate(n), (e) => e instanceof A.CandidateRefused && /not a candidate the lab may show/.test(e.message));
  const v2 = await A.loadCandidate("reachable-v2");
  const v3 = await A.loadCandidate("reachable-v3");
  assert.equal(v2.name, "reachable-v2"); assert.equal(typeof v2.moves, "undefined", "v2 has no moves (batch 5 §20.1 (a))");
  assert.equal(v3.name, "reachable-v3"); assert.equal(typeof v3.moves, "function");
  assert.deepEqual(Object.keys(L.CANDIDATES).sort(), ["reachable-v2", "reachable-v3"]);
});

test("generator: the candidates are computed before anything is written, so a refusal writes nothing", () => {
  const g = read("tools/hq-lab-precompute.mjs");
  const adapter = g.indexOf("execFileSync(process.execPath, [path.join(ROOT, ADAPTER)]");
  assert.ok(adapter > 0 && adapter < g.indexOf("writeFileSync("), "the adapter runs before the first write");
  assert.match(g, /candidates refused, nothing written[^\n]*\n\s*process\.exit\(3\)/);
  assert.ok(!/eval\/harness/.test(read("tools/hq-lab-candidates.mjs").replace(/^\/\/.*$/gm, "")), "the adapter's code names no harness path");
});

test("adapter: its episode loop is the lab simulator's (default-order parity, six simulated personas)", () => {
  const sim = A.simulator();
  for (const p of sim.PERSONAS) {
    const ref = sim.S.runEpisode({ persona: p, policy: "default-order", seed: 1, params: sim.Lr.BASE_PARAMS, cat: sim.cat, trace: true, days: 7 });
    const mine = A.runWith(sim, { persona: p, policy: "default-order", seed: 1, days: 7, choose: A.defaultChoose(sim) });
    const seq = (steps) => steps.map((s) => (s.kind === "new" ? `${s.day}:${s.served}` : `${s.day}:r:${s.slug}`));
    assert.deepEqual(seq(mine.steps), seq(ref.trace.steps), `${p.id}: served sequence`);
    assert.deepEqual(mine.score, ref.score, `${p.id}: score`);
  }
  assert.deepEqual(A.ruleOrder(sim.cat.dims), sim.cat.defaultOrder, "lab default order = default-order-rule.md");
});

test("committed data: v2 and v3 × the six simulated personas, frozen hashes, §20.2 label, current, no rank numbers", async () => {
  clearPrecomputedCache();
  assert.equal(manifest.candidateLabel, L.CANDIDATE_LABEL);
  assert.deepEqual(manifest.candidatePolicies.sort(), ["reachable-v2", "reachable-v3"]);
  assert.ok(!JSON.stringify(manifest.candidates).includes("reachable-v1"));
  const list = candidateEntries(ROOT);
  assert.ok(list.ok, list.error);
  assert.equal(list.data.length, 12);
  assert.deepEqual([...new Set(list.data.map((e) => e.persona))].sort(), SIMULATED);
  const fresh = await A.candidateDocs(); // in memory: the committed documents are what the adapter makes today
  const ALLOWED_ROW = ["slug", "title", "rankPos", "defaultPos", "rankCode", "versus", "move"];
  const ALLOWED_MOVE = ["moved", "direction", "code", "key", "line", "named", "namedTitle"];
  for (const e of list.data) {
    const r = readCandidate(e.persona, e.policy, ROOT);
    assert.ok(r.ok, r.ok ? "" : r.error);
    const d = r.data;
    assert.equal(d.label, L.CANDIDATE_LABEL);
    assert.equal(d.candidate.sha256, L.CANDIDATES[e.policy].sha256);
    const f = fresh.find((x) => x.persona.id === e.persona && x.candidate.name === e.policy);
    assert.deepEqual(d, f, `${e.file} is stale: run node tools/hq-lab-precompute.mjs`);
    for (const row of [...d.start.rows, ...d.steps.filter((s) => s.kind === "new")]) {
      for (const k of Object.keys(row)) assert.ok([...ALLOWED_ROW, "step", "day", "kind", "served", "servedTitle", "defaultCard", "moved"].includes(k), `stored field ${k}`);
      if (row.move) for (const k of Object.keys(row.move)) assert.ok(ALLOWED_MOVE.includes(k), `stored move field ${k}`);
      assert.equal(!!row.move, e.policy === "reachable-v3", "moves only for v3");
    }
    assert.ok(!/"(?:value|pKnown|estimate|defaultIndex|versusDefaultIndex|daysSinceLastEvent|rightPredictions|wrongPredictions|recallsRight|recallsWrong|recall|score)"/.test(JSON.stringify(d)), "no rank number or score stored");
  }
  const bad = readCandidate("wanderer", "reachable-v1", ROOT);
  assert.ok(!bad.ok);
  // a damaged candidate file fails closed
  const tmp = fs.mkdtempSync(path.join(os.tmpdir(), "hq-cand-data-"));
  try {
    fs.cpSync(path.join(ROOT, PRECOMPUTED_DIR), path.join(tmp, PRECOMPUTED_DIR), { recursive: true });
    const e = list.data[0];
    fs.writeFileSync(path.join(tmp, PRECOMPUTED_DIR, e.file), zlib.gzipSync(Buffer.from("{}")));
    clearPrecomputedCache();
    const r = readCandidate(e.persona, e.policy, tmp);
    assert.ok(!r.ok && /does not match its hash/.test(r.error));
  } finally { fs.rmSync(tmp, { recursive: true, force: true }); clearPrecomputedCache(); }
});

test("labels and lines: §20.2's label and §20.1's draft-lines label verbatim in batch 5; RC's L1-L7 verbatim in the RC record", () => {
  const b5 = read("company/personalization/batches/2026-10-17-batch-5.md");
  assert.ok(b5.includes(`"${L.CANDIDATE_LABEL}"`));
  assert.ok(b5.includes(`"${L.DRAFT_LINES_LABEL}"`));
  assert.ok(b5.includes("L3 is marked \"wording pending (W-1642)\"") && L.L3_PENDING === "wording pending (W-1642)");
  const rc = read(L.RC_RECORD);
  assert.equal(L.RC_LINES.length, 7);
  for (const l of L.RC_LINES) {
    const row = rc.split("\n").find((x) => x.startsWith(`| ${l.id} | \`${l.key}\` |`));
    assert.ok(row, `RC row ${l.id}`);
    assert.ok(row.endsWith(`| ${l.template} |`), `${l.id} template verbatim`);
  }
});

test("renderLine: keys map to RC lines, L3 is pending, A3-2 renders L5's first sentence alone, no key no line", () => {
  const mv = (key, line, namedTitle = null) => ({ moved: true, direction: key.split(":")[0], code: key.split(":")[1], key, line, named: namedTitle ? "x" : null, namedTitle });
  assert.deepEqual(L.renderLine(mv("earlier:prerequisites", "L1")), { id: "L1", text: "This lesson moved ahead of some lessons that build on other lessons.", pending: false });
  assert.equal(L.renderLine(mv("earlier:concept-known", "L3", "Dice")).pending, true);
  assert.equal(L.renderLine(mv("later:concept-known", "L4", "Dice")).text, "Some lessons moved ahead of this one. You've finished Dice, which is on the same idea.");
  assert.equal(L.renderLine(mv("earlier:refresh", "L5")).text, "This lesson moved ahead of some lessons.");
  assert.equal(L.renderLine(mv("later:concept-known", "L4")), null, "a titled line never renders without its title");
  assert.equal(L.renderLine(mv("earlier:passed-known", "L1")), null, "a line id that is not the key's never renders");
  assert.equal(L.renderLine(undefined), null);
});

test("page: the label on every candidate view, the draft-lines label, L3 marked; v2 shows codes and no line", async () => {
  const { createElement: h } = await import("react");
  const { renderToStaticMarkup } = await import("react-dom/server");
  const { default: Candidates } = await import("../../src/app/hq/personalization/candidates/Candidates.tsx");
  const personas = PERSONAS.map((p) => ({ id: p.id, name: p.name }));
  const v3 = readCandidate("single-subject-crammer", "reachable-v3", ROOT).data;
  const html = renderToStaticMarkup(h(Candidates, { doc: v3, error: null, personas, persona: "single-subject-crammer", policy: "reachable-v3", all: true }));
  const esc = (t) => t.replace(/'/g, "&#x27;");
  const count = (hay, needle) => hay.split(needle).length - 1;
  assert.equal(count(html, "data-candidate-label"), 5, "header, candidate, start order, episode, RC table");
  assert.ok(count(html, esc(L.CANDIDATE_LABEL)) >= 5);
  assert.ok(html.includes(L.DRAFT_LINES_LABEL));
  assert.ok(html.includes(L.L3_PENDING));
  assert.ok(html.includes("later:concept-known") && html.includes(esc("You've finished")), "a titled line renders with its named lesson");
  const v2 = readCandidate("single-subject-crammer", "reachable-v2", ROOT).data;
  const h2 = renderToStaticMarkup(h(Candidates, { doc: v2, error: null, personas, persona: "single-subject-crammer", policy: "reachable-v2", all: false }));
  assert.equal(count(h2, "data-candidate-label"), 4);
  assert.ok(!h2.includes(L.DRAFT_LINES_LABEL) && !h2.includes("moved ahead of"), "v2 renders no reason line");
  assert.ok(h2.includes("<code>prerequisites</code>") || h2.includes("<code>default-order</code>"), "v2 renders rank's reason codes");
  const err = renderToStaticMarkup(h(Candidates, { doc: null, error: "unavailable", personas: [], persona: "", policy: "reachable-v3", all: false }));
  assert.ok(err.includes("unavailable") && err.includes(esc(L.CANDIDATE_LABEL)));
});

test("production: the candidate page reads committed files only (no process, no live mode)", () => {
  const page = read("src/app/hq/personalization/candidates/page.tsx");
  assert.ok(!/runSim|child_process|hq-personalization-server/.test(page), "the page never reaches the live simulator");
  assert.ok(/readCandidate/.test(page));
  assert.ok(!/child_process/.test(read("src/lib/hq-personalization-precomputed.ts")));
});
