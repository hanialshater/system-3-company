#!/usr/bin/env node
// The session criterion's full run. Refused unless the criterion's status is `frozen` and the tree's candidate pin equals the
// frozen pin (freeze lock and pin check, harnessS.mjs).
//   NODE_NO_WARNINGS=1 NODE_OPTIONS=--max-old-space-size=12288 node company/personalization/eval/harness/cs/runS.mjs --seeds=<S> [--jobs=4] [--cells=<names>] [--out=<dir>]
//   ... runS.mjs --merge=<dir1>,<dir2>,... --out=<dir>   parts run with --cells: checks that the parts agree (commit, criterion
//       sha256, pin, S) and together cover every cell exactly once, then validity and the readings, as a single run would.
//   ... runS.mjs --seeds=3 --plumbing --jobs=4 --out=<tmp>   runner self-check: session arms served by fixture-session-default,
//       every other arm by the reference arm; every Δ is 0 by construction and the readings are meaningless.
// owner: personalization-eval (Uma) · run: eval-s1-1020 · criterion: company/personalization/eval/2026-10-20-session-criterion.md §2 to §6
//
// Order: judge checks S-ID0, T5c, K-e, GAM pin, S-ID1 (all non-session arms), S-ID2 (any failure stops the run: the eval's
// defect) -> candidate pin check (a mismatch stops the run) -> every unit in worker threads -> validity of each session arm
// (T1 replay; T2S, T3S, NM, T4S at every composition of one episode per persona; any unit error) -> K1-K5 and the context
// rows -> <out>/results.ndjson, verdicts.json, manifest.json. It writes no prose.
import { Worker } from "node:worker_threads";
import { createHash } from "node:crypto";
import { readFileSync, writeFileSync, mkdirSync, openSync, writeSync, closeSync } from "node:fs";
import { execSync } from "node:child_process";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";
import * as M from "../../../model/model.ts";
import { PERSONAS } from "../personas.copy.mjs";
import { E1, CRITERION2, EPISODE2 } from "../c2/world2.mjs";
import { E3 } from "../c3/world3.mjs";
import { judgePair2, outcome2, headroom, interval, mean, sd } from "../c2/scorer2.mjs";
import { assertScoringAllowedS, criterionStatusS, CRITERION_S_FILE, cellsS, REFERENCE_ARM, BASE_CELL, SESSION_ARMS, CONTEXT_ARMS, K3_CONTRASTS, SEEDS_S, pinCheck, candidatePin, catalog } from "./harnessS.mjs";
import { judgeChecks, identityS, sessionLoopIdentity, t1ReplayS, composeChecksS } from "./checksS.mjs";

const HERE = dirname(fileURLToPath(import.meta.url));
const sha = (s) => createHash("sha256").update(s).digest("hex");
const PLUMBING = process.argv.includes("--plumbing");
const impl = (arm) => (!PLUMBING ? arm : SESSION_ARMS.includes(arm) ? "fixture-session-default+fixed" : REFERENCE_ARM);
const arg = (k, d) => { const a = process.argv.find((x) => x.startsWith(`--${k}=`)); return a ? a.slice(k.length + 3) : d; };

/** The criterion's numbers that are new here (criterion §3, §4). Everything else is CRITERION2's (criterion 2 §2.1, §3). */
export const CRITERION_S = {
  k2FamilyAlpha: 0.05,             // simultaneous 95% intervals, Bonferroni within each family (base: 6; one-at-a-time: 26 x 6)
  k3FamilyAlpha: 0.05,             // the K3 "clear loss" family: 6 personas, base cell
  k4Margin: 0.05,                  // served outside-home share may fall by at most 5 points (lower end of the 95% interval)
  nearTie: 1e-9,                   // |reason value - margin| at or below this is counted as a near-tie (context, VP record §7 O8)
};
export const armsFor = (cell) => [REFERENCE_ARM, ...SESSION_ARMS, ...(cell.role === "base" ? CONTEXT_ARMS : [])];

// ---------------- statistics new in this criterion ----------------
/** Inverse standard normal CDF (Acklam's rational approximation, relative error below 1.2e-9). */
export function qnorm(p) {
  const a = [-3.969683028665376e1, 2.209460984245205e2, -2.759285104469687e2, 1.38357751867269e2, -3.066479806614716e1, 2.506628277459239];
  const b = [-5.447609879822406e1, 1.615858368580409e2, -1.556989798598866e2, 6.680131188771972e1, -1.328068155288572e1];
  const c = [-7.784894002430293e-3, -3.223964580411365e-1, -2.400758277161838, -2.549732539343734, 4.374664141464968, 2.938163982698783];
  const d = [7.784695709041462e-3, 3.224671290700398e-1, 2.445134137142996, 3.754408661907416];
  const pl = 0.02425;
  if (p < pl) { const q = Math.sqrt(-2 * Math.log(p)); return (((((c[0] * q + c[1]) * q + c[2]) * q + c[3]) * q + c[4]) * q + c[5]) / ((((d[0] * q + d[1]) * q + d[2]) * q + d[3]) * q + 1); }
  if (p > 1 - pl) return -qnorm(1 - p);
  const q = p - 0.5, r = q * q;
  return (((((a[0] * r + a[1]) * r + a[2]) * r + a[3]) * r + a[4]) * r + a[5]) * q / (((((b[0] * r + b[1]) * r + b[2]) * r + b[3]) * r + b[4]) * r + 1);
}
/** Student t quantile by the Cornish-Fisher expansion scorer2's t975 uses, at any upper-tail level. */
export function qt(p, df) {
  const z = qnorm(p), z3 = z ** 3, z5 = z ** 5, z7 = z ** 7;
  return z + (z3 + z) / (4 * df) + (5 * z5 + 16 * z3 + 3 * z) / (96 * df ** 2) + (3 * z7 + 19 * z5 + 17 * z3 - 15 * z) / (384 * df ** 3);
}
/** Mean and a two-sided simultaneous interval: each of m intervals at level 1 - alpha/m (Bonferroni). */
export function intervalAdj(d0, m, alpha) {
  const d = d0.filter((x) => !Number.isNaN(x)); const n = d.length, mu = mean(d), s = sd(d);
  const half = n > 1 ? qt(1 - alpha / (2 * m), n - 1) * s / Math.sqrt(n) : NaN;
  return { mean: mu, lo: mu - half, hi: mu + half, n, m, alpha };
}
const dR = (A, B, Rf, H) => A.map((s, i) => (s.K[H] - B[i].K[H]) / (Rf[i].nAll > 0 ? Rf[i].nAll : NaN));
const outShare = (s) => (s.extra.home && s.extra.servedNew > 0 ? s.extra.servedOutHome / s.extra.servedNew : NaN);

// ---------------- units ----------------
async function runUnits(list, jobs) {
  const results = new Array(list.length);
  let next = 0;
  const worker = () => new Promise((res, rej) => {
    const w = new Worker(join(HERE, "runS-worker.mjs"), { env: { ...process.env, NODE_NO_WARNINGS: "1" } });
    const feed = () => { if (next >= list.length) { w.terminate().then(res); return; } const i = next++; w.postMessage({ i, unit: list[i] }); };
    w.on("message", ({ i, scores, error }) => { results[i] = error ? { error } : scores; feed(); });
    w.on("error", rej);
    feed();
  });
  await Promise.all(Array.from({ length: Math.max(1, jobs) }, worker));
  return results;
}

/** Every reading of criterion §3 and §4 from the scores. Pure; also used by the tests on fixture data. */
export function readings({ R, cells, invalid, C = CRITERION2, CS = CRITERION_S, H = EPISODE2.primaryHorizonDays }) {
  const base = cells.find((c) => c.role === "base").name;
  const oat = cells.filter((c) => c.role === "oat").map((c) => c.name);
  const pass = [base, ...oat];
  const ref = (cell) => R[cell][REFERENCE_ARM];
  const pair = (cell, a, b = REFERENCE_ARM, g = "ordering") => judgePair2({ a: R[cell][a], b: R[cell][b], ref: ref(cell), C, H, guardrails: g });
  const v = { K1: {}, K2: {}, K3: {}, K4: {}, K5: {}, context: {}, cells: {} };
  for (const a of SESSION_ARMS) {
    // K1: criterion 2 §2.1's rule vs default-order, base and every one-at-a-time cell; outcome as phase A.
    const byCell = Object.fromEntries([...cells.map((c) => c.name)].map((cn) => [cn, pair(cn, a)]));
    v.cells[a] = byCell;
    const out = outcome2({ invalid: invalid[a], baseBeats: byCell[base].beats, oatBeats: Object.fromEntries(oat.map((cn) => [cn, byCell[cn].beats])) });
    v.K1[a] = { verdict: out.verdict, cells: out.cells, base: { wins: byCell[base].wins, harmed: byCell[base].harmed, guardrailFails: byCell[base].guardrailFails, beats: byCell[base].beats } };
    // K2: any persona with the upper end of its simultaneous 95% interval below 0. Families: base (6), one-at-a-time (26 x 6).
    const fam = (cns) => cns.flatMap((cn) => PERSONAS.map((p) => ({ cell: cn, persona: p.id, ...intervalAdj(dR(R[cn][a][p.id], ref(cn)[p.id], ref(cn)[p.id], H), cns.length * PERSONAS.length, CS.k2FamilyAlpha) })));
    const fb = fam([base]), fo = fam(oat);
    const losses = [...fb, ...fo].filter((x) => x.hi < 0).map((x) => `${x.cell}|${x.persona}`);
    const unadjusted = pass.flatMap((cn) => byCell[cn].rows.filter((r) => r.R.hi < 0).map((r) => `${cn}|${r.persona}`));
    v.K2[a] = { veto: invalid[a] ? null : losses.length > 0, losses, unadjustedClearLosses: unadjusted, base: fb.map(({ persona, mean: mu, lo, hi }) => ({ persona, mean: mu, lo, hi })) };
    // K4: outside-home share of served new cards, variant - default-order, per persona and cell: holds when lo >= -margin.
    const k4 = Object.fromEntries(pass.map((cn) => [cn, Object.fromEntries(PERSONAS.map((p) => {
      const A = R[cn][a][p.id], B = ref(cn)[p.id];
      const iv = interval(A.map((s, i) => outShare(s) - outShare(B[i])));
      return [p.id, { ...iv, refLevel: mean(B.map(outShare)), holds: iv.lo >= -CS.k4Margin }];
    }))]));
    const narrower = pass.flatMap((cn) => PERSONAS.filter((p) => !k4[cn][p.id].holds).map((p) => `${cn}|${p.id}`));
    const dropped = pass.reduce((q, cn) => q + PERSONAS.reduce((r, p) => r + k4[cn][p.id].dropped, 0), 0);
    v.K4[a] = { reading: invalid[a] ? "INVALID" : narrower.length ? "NARROWER" : "HOLDS", narrower, droppedEpisodes: dropped, base: k4[base], cells: k4 };
    // K5: served moved cards whose reason does not carry the move, pooled over base + one-at-a-time cells; per cell beside.
    const cnt = (cns) => { const z = { movedServed: 0, carriesFalse: 0, carriesTrue: 0, carriesNull: 0, nearTie: 0, servedNew: 0 };
      for (const cn of cns) for (const p of PERSONAS) for (const s of R[cn][a][p.id]) for (const k of Object.keys(z)) z[k] += s.extra[k] || 0; return z; };
    const pooled = cnt(pass);
    v.K5[a] = { gate: invalid[a] ? "INVALID" : pooled.carriesFalse + pooled.carriesNull > 0 ? "COPY-BLOCKED" : pooled.movedServed === 0 ? "NO-MOVES" : "COPY-CLEAR",
      falseShare: pooled.movedServed ? pooled.carriesFalse / pooled.movedServed : null, ...pooled,
      byCell: Object.fromEntries(pass.map((cn) => { const z = cnt([cn]); return [cn, { ...z, falseShare: z.movedServed ? z.carriesFalse / z.movedServed : null }]; })) };
  }
  // K3: complex vs simpler, base cell: prefer the complex one iff it beats the simpler under rule item 1 (4 of 6 wins, lo > 0,
  // Δ >= δ_min) and no persona has the upper end of its simultaneous 95% interval (6 personas) below 0.
  for (const [k, [cx, sm]] of Object.entries(K3_CONTRASTS)) {
    const j = judgePair2({ a: R[base][cx], b: R[base][sm], ref: ref(base), C, H, guardrails: "none" });
    const adj = PERSONAS.map((p) => ({ persona: p.id, ...intervalAdj(dR(R[base][cx][p.id], R[base][sm][p.id], ref(base)[p.id], H), PERSONAS.length, CS.k3FamilyAlpha) }));
    const losses = adj.filter((x) => x.hi < 0).map((x) => x.persona);
    v.K3[k] = { complex: cx, simpler: sm, wins: j.wins, clearLosses: losses, prefer: j.wins >= C.winsNeeded && losses.length === 0 ? cx : sm,
      rows: j.rows.map((r) => ({ persona: r.persona, R: r.R, win: r.win })), oat: Object.fromEntries(oat.map((cn) => [cn, judgePair2({ a: R[cn][cx], b: R[cn][sm], ref: ref(cn), C, H, guardrails: "none" }).wins])) };
  }
  // Context (no rule): base cell. Variants vs gam; gam, draft-rules, random vs default-order; oracle-order headroom.
  for (const a of SESSION_ARMS) if (R[base]["gam+fixed"]) v.context[`${a} vs gam+fixed`] = pair(base, a, "gam+fixed", "none");
  for (const a of CONTEXT_ARMS) if (R[base][a]) v.context[`${a} vs ${REFERENCE_ARM}`] = pair(base, a, REFERENCE_ARM, a === "oracle-order+fixed" ? "none" : "ordering");
  if (R[base]["oracle-order+fixed"]) v.context.headroom = headroom(v.context[`oracle-order+fixed vs ${REFERENCE_ARM}`], C);
  return v;
}

const RUN_FILES = ["harnessS.mjs", "checksS.mjs", "runS.mjs", "runS-worker.mjs",
  "../c3/harness3.mjs", "../c3/learner3.mjs", "../c3/world3.mjs", "../c3/checks3.mjs", "../c3b/checks3b.mjs", "../c3b/harness3b.mjs",
  "../c2/harness2.mjs", "../c2/learner2.mjs", "../c2/scorer2.mjs", "../c2/world2.mjs", "../harness.mjs", "../personas.copy.mjs"];
function baseManifest(S, seeds, pin, t0) {
  let commit = "unknown"; try { commit = execSync("git rev-parse HEAD", { cwd: HERE, encoding: "utf8" }).trim(); } catch {}
  return { plumbing: PLUMBING, criterionStatus: criterionStatusS(), criterionSha256: sha(readFileSync(CRITERION_S_FILE)), e1Sha256: sha(JSON.stringify(E1)), e3Sha256: sha(JSON.stringify(E3)),
    commit, node: process.version, S, seedList: `${seeds[0]}..${seeds.at(-1)}`, criterionS: CRITERION_S, candidatePin: candidatePin(), pinCheck: { ok: pin.ok, bad: pin.bad ?? null },
    modelVersion: M.MODEL_VERSION, fileSha256: Object.fromEntries(RUN_FILES.map((f) => [f, sha(readFileSync(join(HERE, f)))])), seconds: (Date.now() - t0) / 1000 };
}
function startChecks(seeds, out) {
  const nonSession = [REFERENCE_ARM, ...CONTEXT_ARMS].map(impl).filter((a, i, xs) => xs.indexOf(a) === i);
  const judge = { ...judgeChecks({ seeds }), id1: PLUMBING ? identityS({ cells: [BASE_CELL], seeds: [seeds[0]] }) : identityS({ arms: nonSession }),
    id2: PLUMBING ? sessionLoopIdentity({ cells: [BASE_CELL], seeds: [seeds[0]] }) : sessionLoopIdentity() };
  const judgeOk = judge.id0.ok && judge.t5c.ok && judge.ke.ok && judge.gam.ok && judge.id1.ok && judge.id2.ok;
  if (!judgeOk) { writeFileSync(join(out, "judge-tests.json"), JSON.stringify(judge, null, 2)); throw new Error("S-ID0/T5c/K-e/GAM/S-ID1/S-ID2 failed: run stopped (eval defect); see judge-tests.json"); }
  const pin = pinCheck();
  if (!PLUMBING && !pin.ok) { writeFileSync(join(out, "pin.json"), JSON.stringify(pin, null, 2)); throw new Error(`candidate pin differs from the frozen pin (${pin.bad?.join(", ") || pin.why}): run stopped`); }
  return { judge, pin };
}

/** Validity (criterion §5), readings, descriptive; writes verdicts.json. */
function finish({ R, errors, cells, seeds, out, judge }) {
  const validity = {}, invalid = {};
  for (const a of SESSION_ARMS) {
    const ia = impl(a);
    const t1 = ["curious-newcomer", "returning-expert"].map((persona) => ({ persona, ...t1ReplayS({ persona, seed: seeds[0], arm: ia }) }));
    const cc = PERSONAS.map((p) => ({ persona: p.id, ...composeChecksS({ persona: p.id, seed: seeds[0], arm: ia, t4: !PLUMBING }) }));
    const errs = Object.keys(errors).filter((k) => k.split("|")[1] === a);
    validity[a] = { t1, compose: cc.map((x) => ({ persona: x.persona, composes: x.composes, t2: x.t2.ok, t3: x.t3.ok, nm: x.nm.ok, t4: x.t4.ok, t4Checked: x.t4.checked, fails: [...x.t2.fails, ...x.t3.fails, ...x.nm.fails, ...x.t4.fails].slice(0, 5) })), errors: errs };
    invalid[a] = !t1.every((x) => x.ok) || !cc.every((x) => x.t2.ok && x.t3.ok && x.nm.ok && x.t4.ok) || errs.length > 0;
  }
  const missing = cells.some((c) => armsFor(c).some((a) => !R[c.name]?.[a] || PERSONAS.some((p) => !R[c.name][a][p.id])));
  const verdicts = missing ? { incomplete: true } : readings({ R, cells, invalid });
  const descriptive = {};
  const baseName = cells.find((c) => c.role === "base").name;
  if (R[baseName]?.[REFERENCE_ARM]) for (const [a, byP] of Object.entries(R[baseName])) descriptive[a] = Object.fromEntries(Object.entries(byP).map(([p, ss]) => [p, {
    ...Object.fromEntries(["nNew", "nAll", "revisits", "revisitShare", "cards", "reveal", "movedShare", "R1d", "g1TopDomainShare", "g2Concepts", "g3PrereqFirst", "g4Gain"].map((k) => [k, mean(ss.map((s) => s[k]))])),
    ...Object.fromEntries(["servedNew", "servedOutHome", "movedServed", "carriesFalse", "carriesTrue", "nearTie", "composes"].map((k) => [k, mean(ss.map((s) => s.extra[k]))])),
    movedBySlot: ss[0].extra.movedBySlot.map((_, j) => mean(ss.map((s) => s.extra.movedBySlot[j]))), servedBySlot: ss[0].extra.servedBySlot.map((_, j) => mean(ss.map((s) => s.extra.servedBySlot[j]))),
    circular: { label: M.COMPOSER_SESSION.circularLabel, needCoverageRate: mean(ss.map((s) => s.extra.circular?.needCoverageRate ?? NaN)), domainDiversity: mean(ss.map((s) => s.extra.circular?.domainDiversity ?? NaN)) },
    Rlevels: Object.fromEntries(EPISODE2.horizonsDays.map((h) => [h, mean(ss.map((s, i) => s.K[h] / R[baseName][REFERENCE_ARM][p][i].nAll))])),
  }]));
  writeFileSync(join(out, "verdicts.json"), JSON.stringify({ judge, validity, invalid, ...verdicts, descriptive }, null, 2) + "\n");
}

async function main() {
  const out = arg("out", join(HERE, "out")); mkdirSync(out, { recursive: true });
  const allCells = cellsS(E1, E3);
  const t0 = Date.now();
  if (arg("merge")) return merge(arg("merge").split(","), out, allCells, t0);
  const S = +arg("seeds");
  if (!S) throw new Error("--seeds=S is required (the S written in the session criterion §1.4)");
  const only = arg("cells") ? arg("cells").split(",") : null;
  if (only) for (const n of only) if (!allCells.some((c) => c.name === n)) throw new Error(`unknown cell ${n}`);
  const cells = only ? allCells.filter((c) => only.includes(c.name)) : allCells;
  assertScoringAllowedS([...new Set(cells.flatMap(armsFor))].map(impl));
  const jobs = +arg("jobs", 4);
  const seeds = Array.from({ length: S }, (_, i) => SEEDS_S.first + i);
  const { judge, pin } = startChecks(seeds, out);
  const list = [];
  for (const c of cells) for (const arm of armsFor(c)) for (const p of PERSONAS)
    list.push({ cell: c.name, role: c.role, world: c.world, arm: impl(arm), label: arm, persona: p.id, seeds, diagnostics: c.role === "base" });
  const scores = await runUnits(list, jobs);
  const R = {}; const errors = {};
  list.forEach((u, i) => { if (scores[i]?.error) errors[`${u.cell}|${u.label}|${u.persona}`] = scores[i].error; else ((R[u.cell] ??= {})[u.label] ??= {})[u.persona] = scores[i]; });
  const fd = openSync(join(out, "results.ndjson"), "w");
  for (const u of list) { const sc = R[u.cell]?.[u.label]?.[u.persona]; if (sc) writeSync(fd, JSON.stringify({ cell: u.cell, arm: u.label, implArm: u.arm, persona: u.persona, scores: sc }) + "\n"); }
  closeSync(fd);
  const complete = cells.length === allCells.length;
  if (complete) finish({ R, errors, cells: allCells, seeds, out, judge });
  else writeFileSync(join(out, "judge-tests.json"), JSON.stringify(judge, null, 2) + "\n");
  const manifest = { ...baseManifest(S, seeds, pin, t0), cells: cells.map((c) => c.name), part: !complete, errors };
  writeFileSync(join(out, "manifest.json"), JSON.stringify(manifest, null, 2) + "\n");
  console.log(`done in ${manifest.seconds}s; wrote ${out}/manifest.json, results.ndjson${complete ? ", verdicts.json" : " (a part: merge with --merge)"}`);
}

async function merge(dirs, out, allCells, t0) {
  const mans = dirs.map((d) => JSON.parse(readFileSync(join(d, "manifest.json"), "utf8")));
  const keys = ["commit", "criterionSha256", "S", "seedList", "e1Sha256", "e3Sha256", "plumbing"];
  for (const k of keys) if (new Set(mans.map((m) => JSON.stringify(m[k]))).size !== 1) throw new Error(`merge: parts differ in ${k}`);
  if (new Set(mans.map((m) => JSON.stringify(m.candidatePin))).size !== 1 || new Set(mans.map((m) => JSON.stringify(m.fileSha256))).size !== 1) throw new Error("merge: parts differ in the candidate pin or the harness files");
  const covered = mans.flatMap((m) => m.cells);
  if (covered.length !== allCells.length || allCells.some((c) => !covered.includes(c.name))) throw new Error("merge: the parts do not cover every cell exactly once");
  const here = baseManifest(mans[0].S, Array.from({ length: mans[0].S }, (_, i) => SEEDS_S.first + i), pinCheck(), t0);
  if (here.commit !== mans[0].commit || JSON.stringify(here.fileSha256) !== JSON.stringify(mans[0].fileSha256)) throw new Error("merge: run the merge at the parts' commit with the same harness files");
  const R = {}, errors = Object.assign({}, ...mans.map((m) => m.errors));
  for (const d of dirs) for (const line of readFileSync(join(d, "results.ndjson"), "utf8").split("\n")) {
    if (!line) continue; const u = JSON.parse(line); ((R[u.cell] ??= {})[u.arm] ??= {})[u.persona] = u.scores;
  }
  const seeds = Array.from({ length: mans[0].S }, (_, i) => SEEDS_S.first + i);
  const judge = JSON.parse(readFileSync(join(dirs[0], "judge-tests.json"), "utf8"));
  finish({ R, errors, cells: allCells, seeds, out, judge });
  writeFileSync(join(out, "manifest.json"), JSON.stringify({ ...here, merged: dirs, parts: mans.map((m) => ({ cells: m.cells, seconds: m.seconds })), errors }, null, 2) + "\n");
  console.log(`merged ${dirs.length} parts; wrote ${out}/manifest.json, verdicts.json`);
}

if (process.argv[1] && fileURLToPath(import.meta.url) === process.argv[1]) {
  main().catch((e) => { console.error(String(e.message || e)); process.exit(1); });
}
