#!/usr/bin/env node
// The session criterion's chunk list and the check every chunk and the merge must pass (eval-owned, W-2013).
// It computes no score and no verdict. It reads only manifests, judge-tests.json, and the keys (cell, arm, persona) and the
// seed count of each line of results.ndjson. It is NOT in runS.mjs's hashed RUN_FILES: it was added after the freeze commit,
// beside the criterion's §11, and its own sha256 is recorded there (with the formatter's).
//
// Why chunks: this host allows one background command about 2 h; criterion §8's three parts are 4.0, 2.6 and 2.4 h at
// --jobs=4 (timing sample, RUN-PLAN-s1.md). Each chunk below is a subset of exactly one §8 part, and every §8 part is the
// union of its chunks, so the parts are recoverable. runS.mjs already runs any --cells list and merges any number of parts
// (refusing on a cell missing or covered twice, and on parts that differ in commit, criterion sha256, pin or harness files);
// no file runS.mjs hashes, and no file of the candidate pin, was changed.
//
// What this adds on top of runS.mjs --merge (refuses on any failure, exit 1):
//   - every chunk's directory holds exactly its chunk's cells (CHUNKS below), not plumbing, S = 2000 on 70001..72000;
//   - every chunk ran at one commit that is the freeze commit or a descendant of it, where: the criterion differs from the
//     freeze text only in §11; every runS.mjs RUN_FILES hash equals that file at the freeze commit; the candidate pin equals
//     the pin frozen in the criterion at the freeze commit and pinCheck was ok; the formatter and this file have the sha256s
//     §11 records; no path outside ALLOWED_AFTER_FREEZE changed between the freeze and the run commit;
//   - the criterion sha256 in each manifest equals the criterion at the run commit (the run used the committed file);
//   - judge-tests.json: S-ID0, T5c, K-e, GAM pin, S-ID1, S-ID2 all ok;
//   - results.ndjson: one line per (cell, arm, persona) of the chunk, none duplicated, none outside the chunk, each with S
//     scores; units in manifest.errors are reported (criterion §3: they make that arm INVALID) and are the only ones allowed
//     to be absent;
//   - with --merged: the merged manifest lists the chunk directories in CHUNKS order, at the same commit, pin and harness
//     files, not plumbing, and verdicts.json exists and is complete.
// Usage (repository root of the run worktree):
//   node company/personalization/eval/harness/cs/partsCheckS.mjs plan                       the chunk list (JSON)
//   node company/personalization/eval/harness/cs/partsCheckS.mjs check --root=<out root> [--merged=<dir>] [--plumbing-test]
//     <out root>/<chunk id>/ for every chunk id. --plumbing-test: accept plumbing chunks at any S (smoke test only; the
//     output says so and the formatter prints it in its first line).
// owner: personalization-eval (Uma) · run: eval-s1-1020 (W-2013) · criterion: company/personalization/eval/2026-10-20-session-criterion.md §8, §11
import { createHash } from "node:crypto";
import { readFileSync, existsSync, createReadStream } from "node:fs";
import { createInterface } from "node:readline";
import { execFileSync } from "node:child_process";
import { join, dirname, resolve, relative } from "node:path";
import { fileURLToPath } from "node:url";
import { PERSONAS } from "../personas.copy.mjs";
import { cellsS, ROOT } from "./harnessS.mjs";
import { armsFor } from "./runS.mjs";

const HERE = dirname(fileURLToPath(import.meta.url));
const sha = (s) => createHash("sha256").update(s).digest("hex");
const CRIT = "company/personalization/eval/2026-10-20-session-criterion.md";
export const FREEZE_COMMIT = "bdebacc27be85077074a43397bfce4876420d1a2";
export const FROZEN_CRITERION_SHA256 = "40a82a40fb2b4005083c259ee63681d61674fbd33d8e299cedd5fa4ba9d64ef9";
export const S_FROZEN = 2000, SEEDLIST_FROZEN = "70001..72000";
const CS = "company/personalization/eval/harness/cs/";
/** The only paths that may differ between the freeze commit and the run commit. */
export const ALLOWED_AFTER_FREEZE = [CRIT, `${CS}partsCheckS.mjs`, `${CS}readoutS-tables.mjs`, `${CS}RUN-PLAN-s1.md`, `${CS}README.md`,
  "company/ops/progress.md", "company/ops/board.json", /^company\/roles\/memory\//];
/** runS.mjs RUN_FILES (paths relative to harness/cs/), copied here so the check does not depend on the file it checks. */
const RUN_FILES = ["harnessS.mjs", "checksS.mjs", "runS.mjs", "runS-worker.mjs",
  "../c3/harness3.mjs", "../c3/learner3.mjs", "../c3/world3.mjs", "../c3/checks3.mjs", "../c3b/checks3b.mjs", "../c3b/harness3b.mjs",
  "../c2/harness2.mjs", "../c2/learner2.mjs", "../c2/scorer2.mjs", "../c2/world2.mjs", "../harness.mjs", "../personas.copy.mjs"];

/** The chunks: each a subset of one criterion §8 part, in §8's cell order. Estimated minutes at --jobs=4: RUN-PLAN-s1.md. */
export const CHUNKS = [
  { id: "A1", part: "A", cells: ["interleave:base", "interleave:price-corner"] },
  { id: "A2", part: "A", cells: ["interleave:forgetScale-low", "interleave:forgetScale-high"] },
  { id: "A3", part: "A", cells: ["interleave:forgetShape-low", "interleave:forgetShape-high"] },
  { id: "A4", part: "A", cells: ["interleave:priorRateMult-outer", "interleave:kSpread-low", "interleave:kSpread-high"] },
  { id: "A5", part: "A", cells: ["interleave:revisitStrengthen-low", "interleave:revisitStrengthen-high"] },
  { id: "B1", part: "B", cells: ["interleave:relearn-low", "interleave:relearn-high", "interleave:priorKnowledgeMean-low"] },
  { id: "B2", part: "B", cells: ["interleave:priorKnowledgeMean-high", "interleave:learnRate-low", "interleave:learnRate-high"] },
  { id: "B3", part: "B", cells: ["interleave:prereqPenalty-low", "interleave:prereqPenalty-high", "interleave:pullScale-low"] },
  { id: "C1", part: "C", cells: ["interleave:pullScale-high", "interleave:revisitSlotCost-low", "interleave:revisitSlotCost-high"] },
  { id: "C2", part: "C", cells: ["interleave:revisitStopScale-low", "interleave:revisitStopScale-high", "interleave:slots-low"] },
  { id: "C3", part: "C", cells: ["interleave:slots-high", "interleave:priorRateMult-low", "interleave:priorRateMult-high"] },
];
/** Criterion §8's three parts, as written there (used to show each chunk lies inside one part). */
export const PARTS_S8 = {
  A: ["base", "priorRateMult-outer", "price-corner", "forgetScale-low", "forgetScale-high", "forgetShape-low", "forgetShape-high", "kSpread-low", "kSpread-high", "revisitStrengthen-low", "revisitStrengthen-high"],
  B: ["relearn-low", "relearn-high", "priorKnowledgeMean-low", "priorKnowledgeMean-high", "learnRate-low", "learnRate-high", "prereqPenalty-low", "prereqPenalty-high", "pullScale-low"],
  C: ["pullScale-high", "revisitSlotCost-low", "revisitSlotCost-high", "revisitStopScale-low", "revisitStopScale-high", "slots-low", "slots-high", "priorRateMult-low", "priorRateMult-high"],
};

/** The chunk list itself: every cell exactly once; each chunk inside one §8 part; each §8 part = union of its chunks. */
export function chunkListCheck(all = cellsS()) {
  const bad = [];
  const flat = CHUNKS.flatMap((c) => c.cells);
  for (const c of all) { const k = flat.filter((x) => x === c.name).length; if (k !== 1) bad.push(`${c.name} in ${k} chunks`); }
  for (const x of flat) if (!all.some((c) => c.name === x)) bad.push(`unknown cell ${x}`);
  for (const ch of CHUNKS) for (const x of ch.cells) if (!PARTS_S8[ch.part].includes(x.replace(/^interleave:/, ""))) bad.push(`${ch.id}: ${x} not in §8 part ${ch.part}`);
  for (const [p, names] of Object.entries(PARTS_S8)) {
    const u = CHUNKS.filter((c) => c.part === p).flatMap((c) => c.cells).map((x) => x.replace(/^interleave:/, "")).sort();
    if (JSON.stringify(u) !== JSON.stringify([...names].sort())) bad.push(`§8 part ${p} is not the union of its chunks`);
  }
  return { ok: bad.length === 0, bad };
}

const git = (...a) => execFileSync("git", a, { cwd: ROOT, encoding: "utf8", maxBuffer: 64 << 20 });
const gitBuf = (...a) => execFileSync("git", a, { cwd: ROOT, maxBuffer: 64 << 20 });
const pinFrom = (text) => { const m = text.match(/candidate-pin:\s*\n```json\n([\s\S]*?)\n```/); return m ? JSON.parse(m[1]) : null; };
/** The criterion's text with §11 cut out (from the line "## 11." to the end). */
const without11 = (text) => text.replace(/\n## 11\.[\s\S]*$/, "\n");
/** §11's recorded hashes: lines "formatter: <path> sha256 <hex>" and "parts-check: <path> sha256 <hex>". */
export function recordedHashes(text) {
  const g = (k) => { const m = text.match(new RegExp(`^${k}: (\\S+) sha256 ([0-9a-f]{64})\\s*$`, "m")); return m ? { path: m[1], sha256: m[2] } : null; };
  return { formatter: g("formatter"), partsCheck: g("parts-check") };
}

/** The run commit against the freeze (one call per distinct commit). */
export function commitCheck(commit) {
  const bad = [];
  const freezeText = gitBuf("show", `${FREEZE_COMMIT}:${CRIT}`);
  if (sha(freezeText) !== FROZEN_CRITERION_SHA256) bad.push("criterion at the freeze commit does not have the frozen sha256");
  try { git("merge-base", "--is-ancestor", FREEZE_COMMIT, commit); } catch { bad.push(`run commit ${commit} is not the freeze commit or a descendant of it`); return { ok: false, bad }; }
  const runText = gitBuf("show", `${commit}:${CRIT}`);
  if (without11(runText.toString("utf8")) !== without11(freezeText.toString("utf8"))) bad.push("the criterion at the run commit differs from the freeze outside §11");
  const changed = git("diff", "--name-only", FREEZE_COMMIT, commit).split("\n").filter(Boolean);
  const outside = changed.filter((p) => !ALLOWED_AFTER_FREEZE.some((a) => (typeof a === "string" ? a === p : a.test(p))));
  if (outside.length) bad.push(`paths changed after the freeze outside the allowed list: ${outside.slice(0, 10).join(", ")}`);
  const rec = recordedHashes(runText.toString("utf8"));
  for (const [k, r] of Object.entries(rec)) {
    if (!r) { bad.push(`§11 at the run commit records no ${k} hash`); continue; }
    let have = null; try { have = sha(gitBuf("show", `${commit}:${r.path}`)); } catch { bad.push(`${k} ${r.path} absent at the run commit`); continue; }
    if (have !== r.sha256) bad.push(`${k} ${r.path} at the run commit has sha256 ${have}, §11 records ${r.sha256}`);
  }
  const self = sha(readFileSync(fileURLToPath(import.meta.url)));
  if (rec.partsCheck && self !== rec.partsCheck.sha256) bad.push(`this checker on disk (${self}) is not the one §11 records`);
  const freezeFiles = Object.fromEntries(RUN_FILES.map((f) => [f, sha(gitBuf("show", `${FREEZE_COMMIT}:${relative(ROOT, join(HERE, f))}`))]));
  return { ok: bad.length === 0, bad, changed, criterionAtRunSha256: sha(runText), freezeFiles, frozenPin: pinFrom(freezeText.toString("utf8")), recorded: rec };
}

async function resultsCheck(file, cells, S, errors) {
  const want = new Set(cells.flatMap((cn) => { const c = cellsS().find((x) => x.name === cn); return armsFor(c).flatMap((a) => PERSONAS.map((p) => `${cn}|${a}|${p.id}`)); }));
  const seen = new Set(); const bad = []; const h = createHash("sha256");
  const rl = createInterface({ input: createReadStream(file).on("data", (b) => h.update(b)), crlfDelay: Infinity });
  for await (const line of rl) {
    if (!line) continue;
    const u = JSON.parse(line); const k = `${u.cell}|${u.arm}|${u.persona}`;
    if (!want.has(k)) bad.push(`unit outside the chunk: ${k}`);
    if (seen.has(k)) bad.push(`duplicated unit: ${k}`);
    seen.add(k);
    if (!Array.isArray(u.scores) || u.scores.length !== S) bad.push(`unit ${k} has ${u.scores?.length} scores, not ${S}`);
  }
  const errKeys = new Set(Object.keys(errors || {}));
  const missing = [...want].filter((k) => !seen.has(k) && !errKeys.has(k));
  if (missing.length) bad.push(`units missing without an error: ${missing.slice(0, 5).join(", ")}${missing.length > 5 ? " …" : ""}`);
  return { ok: bad.length === 0, bad: bad.slice(0, 10), lines: seen.size, expected: want.size, errored: errKeys.size, sha256: h.digest("hex") };
}

/** The whole check. Returns { ok, problems, chunks: [...], merged?, commit }. Pure reading; never writes. */
export async function checkRun({ root, merged = null, plumbingTest = false }) {
  const problems = []; const P = (s) => problems.push(s);
  const list = chunkListCheck(); if (!list.ok) P(`chunk list: ${list.bad.join("; ")}`);
  const chunks = [];
  for (const ch of CHUNKS) {
    const dir = resolve(root, ch.id), r = { id: ch.id, part: ch.part, dir };
    chunks.push(r);
    for (const f of ["manifest.json", "results.ndjson", "judge-tests.json"]) if (!existsSync(join(dir, f))) { P(`${ch.id}: ${f} missing (chunk not run or not finished)`); r.missing = true; }
    if (r.missing) continue;
    const m = JSON.parse(readFileSync(join(dir, "manifest.json"), "utf8")); r.manifest = m;
    if (m.part !== true) P(`${ch.id}: manifest is not a part`);
    if (JSON.stringify([...m.cells].sort()) !== JSON.stringify([...ch.cells].sort())) P(`${ch.id}: cells ${m.cells.join(",")} are not the chunk's`);
    if (plumbingTest ? m.plumbing !== true : m.plumbing !== false) P(`${ch.id}: plumbing is ${m.plumbing}`);
    if (!plumbingTest && (m.S !== S_FROZEN || m.seedList !== SEEDLIST_FROZEN)) P(`${ch.id}: S ${m.S} seeds ${m.seedList}, not ${S_FROZEN} on ${SEEDLIST_FROZEN}`);
    if (!/^frozen\b/.test(m.criterionStatus)) P(`${ch.id}: criterion status not frozen`);
    if (!plumbingTest && m.pinCheck?.ok !== true) P(`${ch.id}: pinCheck not ok (${JSON.stringify(m.pinCheck)})`);
    const j = JSON.parse(readFileSync(join(dir, "judge-tests.json"), "utf8"));
    for (const k of ["id0", "t5c", "ke", "gam", "id1", "id2"]) if (j[k]?.ok !== true) P(`${ch.id}: judge check ${k} not ok`);
    r.results = await resultsCheck(join(dir, "results.ndjson"), ch.cells, m.S, m.errors);
    if (!r.results.ok) P(`${ch.id}: results: ${r.results.bad.join("; ")}`);
    if (Object.keys(m.errors || {}).length) P(`${ch.id}: NOTE ${Object.keys(m.errors).length} unit errors (criterion §3: the arm is INVALID); not a refusal`);
    r.seconds = m.seconds;
  }
  const done = chunks.filter((c) => c.manifest);
  const one = (k) => new Set(done.map((c) => JSON.stringify(c.manifest[k]))).size <= 1;
  for (const k of ["commit", "criterionSha256", "S", "seedList", "fileSha256", "candidatePin", "e1Sha256", "e3Sha256", "plumbing", "node"]) if (!one(k)) P(`chunks differ in ${k}`);
  let cc = null;
  const commit = done[0]?.manifest.commit;
  if (commit) {
    cc = commitCheck(commit);
    for (const b of cc.bad) P(`commit ${commit.slice(0, 12)}: ${b}`);
    for (const c of done) {
      const m = c.manifest;
      if (m.criterionSha256 !== cc.criterionAtRunSha256) P(`${c.id}: criterion sha256 ${m.criterionSha256} is not the criterion at the run commit (${cc.criterionAtRunSha256})`);
      const fb = RUN_FILES.filter((f) => m.fileSha256?.[f] !== cc.freezeFiles[f]);
      if (fb.length) P(`${c.id}: harness files differ from the freeze commit: ${fb.join(", ")}`);
      for (const k of ["files", "catalogSha256", "variants", "servingMode", "sessionSize", "lessons", "modelVersion", "composer"]) if (JSON.stringify(m.candidatePin?.[k]) !== JSON.stringify(cc.frozenPin?.[k])) P(`${c.id}: candidate pin ${k} differs from the frozen pin`);
    }
  }
  let mg = null;
  if (merged) {
    mg = { dir: resolve(merged) };
    if (!existsSync(join(merged, "manifest.json")) || !existsSync(join(merged, "verdicts.json"))) P("merged: manifest.json or verdicts.json missing");
    else {
      const m = JSON.parse(readFileSync(join(merged, "manifest.json"), "utf8")); mg.manifest = m;
      const v = JSON.parse(readFileSync(join(merged, "verdicts.json"), "utf8"));
      mg.verdictsSha256 = sha(readFileSync(join(merged, "verdicts.json"))); mg.manifestSha256 = sha(readFileSync(join(merged, "manifest.json")));
      if (JSON.stringify((m.merged || []).map((d) => resolve(d))) !== JSON.stringify(chunks.map((c) => c.dir))) P("merged: its parts are not the chunk directories in CHUNKS order");
      for (const k of ["commit", "fileSha256", "candidatePin", "plumbing", "criterionSha256"]) if (done[0] && JSON.stringify(m[k]) !== JSON.stringify(done[0].manifest[k])) P(`merged: ${k} differs from the chunks`);
      if (v.incomplete) P("merged: verdicts.json is incomplete");
    }
  }
  return { ok: problems.filter((p) => !/: NOTE /.test(p)).length === 0, plumbingTest, problems, commit, freezeCommit: FREEZE_COMMIT, frozenCriterionSha256: FROZEN_CRITERION_SHA256,
    commitCheck: cc && { ok: cc.ok, changedAfterFreeze: cc.changed, criterionAtRunSha256: cc.criterionAtRunSha256, recorded: cc.recorded },
    chunks: chunks.map((c) => ({ id: c.id, part: c.part, dir: c.dir, seconds: c.seconds ?? null, results: c.results ? { lines: c.results.lines, expected: c.results.expected, errored: c.results.errored, sha256: c.results.sha256 } : null,
      manifestSha256: c.manifest ? sha(readFileSync(join(c.dir, "manifest.json"))) : null })), merged: mg && { dir: mg.dir, verdictsSha256: mg.verdictsSha256, manifestSha256: mg.manifestSha256 } };
}

if (process.argv[1] && fileURLToPath(import.meta.url) === process.argv[1]) {
  const arg = (k) => { const a = process.argv.find((x) => x.startsWith(`--${k}=`)); return a ? a.slice(k.length + 3) : null; };
  const cmd = process.argv[2];
  if (cmd === "plan") { console.log(JSON.stringify({ check: chunkListCheck(), chunks: CHUNKS }, null, 2)); }
  else if (cmd === "check" && arg("root")) {
    checkRun({ root: arg("root"), merged: arg("merged"), plumbingTest: process.argv.includes("--plumbing-test") }).then((r) => {
      console.log(JSON.stringify(r, null, 2));
      console.error(r.ok ? `parts check: OK${r.plumbingTest ? " (PLUMBING TEST, not a readout)" : ""}` : `parts check: REFUSED (${r.problems.filter((p) => !/: NOTE /.test(p)).length} problems)`);
      process.exit(r.ok ? 0 : 1);
    }).catch((e) => { console.error(String(e.stack || e)); process.exit(1); });
  } else { console.error("usage: partsCheckS.mjs plan | check --root=<out root> [--merged=<dir>] [--plumbing-test]"); process.exit(2); }
}
