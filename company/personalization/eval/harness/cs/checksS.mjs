// The session criterion's checks as functions (criterion §5), for testsS.test.mjs (before the freeze: reference arm and
// fixtures only) and runS.mjs (after the freeze: every arm). A judge or identity failure stops the run (the eval's defect);
// a candidate check failure makes that arm INVALID.
// owner: personalization-eval (Uma) · run: eval-s1-1020 · criterion: company/personalization/eval/2026-10-20-session-criterion.md §5
import { spawnSync } from "node:child_process";
import { readFileSync } from "node:fs";
import { createHash } from "node:crypto";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";
import * as M from "../../../model/model.ts";
import { reasonTermValue } from "../../../model/sim/composer-session.ts";
import { PERSONAS } from "../personas.copy.mjs";
import { gamFingerprint, gamModelVersion, GAM_FROZEN_VERSION } from "../c2/harness2.mjs";
import { runEpisode3 } from "../c3/harness3.mjs";
import { t5Static3 } from "../c3/checks3.mjs";
import { keGate } from "../c3b/checks3b.mjs";
import { runEpisodeS, composeS, cellByNameS, catalog, REFERENCE_ARM, BASE_CELL, SEEDS_S } from "./harnessS.mjs";

const HERE = dirname(fileURLToPath(import.meta.url));
const sha = (s) => createHash("sha256").update(s).digest("hex");
const orderOf = (comp) => JSON.stringify(comp.picks.map((p) => [p.slug, p.moved, p.reason, p.reasonCarriesMove ?? null]));

// ---------------- S-ID0: the judge is criterion 3's, byte for byte ----------------
/** The judge and world files equal readout 3's manifest (b1ae294). ../c2/harness2.mjs is left out: W-1996 changed its GAM
 *  version pin only (criterion §5); S-ID1 shows the episodes are unchanged. */
export const JUDGE_FILES = ["../c3/harness3.mjs", "../c3/learner3.mjs", "../c3/world3.mjs", "../c2/learner2.mjs", "../c2/scorer2.mjs", "../c2/world2.mjs", "../harness.mjs", "../personas.copy.mjs"];
export function judgeIdentity() {
  const man = JSON.parse(readFileSync(join(HERE, "..", "records", "2026-10-17-readout-3", "interleave", "manifest.json"), "utf8"));
  const bad = JUDGE_FILES.filter((f) => sha(readFileSync(join(HERE, f))) !== man.fileSha256[f.replace(/^\.\.\/c3\//, "").replace(/^\.\.\//, "../")]);
  return { ok: bad.length === 0, files: JUDGE_FILES.length, bad, commit: man.commit };
}

// ---------------- S-ID1: runEpisodeS = runEpisode3 for non-session arms ----------------
export const ID_CELLS_S = ["interleave:base", "interleave:slots-low", "interleave:slots-high", "interleave:prereqPenalty-high", "interleave:revisitSlotCost-high", "interleave:price-corner"];
export function identityS({ arms = [REFERENCE_ARM], cells = ID_CELLS_S, seeds = [SEEDS_S.first, SEEDS_S.first + 1] } = {}) {
  let n = 0; const diffs = [];
  for (const cn of cells) {
    const w = cellByNameS(cn);
    for (const arm of arms) for (const p of PERSONAS) for (const seed of seeds) {
      const a = runEpisode3({ persona: p, arm, seed, cell: w });
      const b = runEpisodeS({ persona: p, arm, seed, cell: w });
      n++;
      if (a.hash !== b.hash || a.worldHash !== b.worldHash) diffs.push(`${cn}|${arm}|${p.id}|${seed}`);
    }
  }
  return { ok: diffs.length === 0 && n > 0, n, diffs: diffs.slice(0, 10) };
}

// ---------------- S-ID2: the session serving loop with the default order as a plan is the reference arm ----------------
export function sessionLoopIdentity({ cells = ID_CELLS_S, seeds = [SEEDS_S.first, SEEDS_S.first + 1] } = {}) {
  let n = 0; const diffs = [];
  for (const cn of cells) {
    const w = cellByNameS(cn);
    for (const p of PERSONAS) for (const seed of seeds) {
      const a = runEpisodeS({ persona: p, arm: REFERENCE_ARM, seed, cell: w });
      const b = runEpisodeS({ persona: p, arm: "fixture-session-default+fixed", seed, cell: w });
      n++;
      if (a.hash !== b.hash) diffs.push(`${cn}|${p.id}|${seed}`);
    }
  }
  return { ok: diffs.length === 0 && n > 0, n, diffs: diffs.slice(0, 10) };
}

// ---------------- T1: cross-process replay ----------------
export function t1ReplayS({ persona, seed, cell = BASE_CELL, arm }) {
  const run = () => spawnSync(process.execPath, [join(HERE, "harnessS.mjs"), "episode", `--persona=${persona}`, `--seed=${seed}`, `--cell=${cell}`, `--arm=${arm}`],
    { encoding: "utf8", env: { ...process.env, NODE_NO_WARNINGS: "1" } });
  const a = run(), b = run();
  if (a.status !== 0 || b.status !== 0) return { ok: false, why: `process failed: ${(a.stderr || b.stderr).slice(0, 300)}` };
  const ha = a.stdout.trim(), hb = b.stdout.trim();
  return { ok: ha === hb && /^[0-9a-f]{64}$/.test(ha), a: ha, b: hb };
}

// ---------------- T2S-T4S, NM: at every composition of one episode ----------------
const deepFreeze = (o) => { if (o && typeof o === "object" && !Object.isFrozen(o)) { Object.freeze(o); for (const v of Object.values(o)) deepFreeze(v); } return o; };
/**
 * T2S compose replay: the same input (deep copy) gives the same plan. T3S: every FORBIDDEN_INPUTS entry at two values, on the
 * input and on the fingerprint, gives the same plan. NM: a deep-frozen copy of the input composes without throwing and gives
 * the same plan (the composer mutates nothing it is given). T4S (variants only, `t4`): per new pick, terms sum to the score
 * (1e-9); a moved pick out-scores its slot's default card (margin > 0) and is the best eligible-to-move candidate; an
 * unmoved pick is the slot's default card; reasonCarriesMove is null on unmoved picks and, on moved picks, equals the VP
 * record §7 formula (reasonTermValue(reason, terms) >= margin) recomputed here. Fails capped at 5 examples each.
 */
export function composeChecksS({ persona, seed, cell = BASE_CELL, arm, t4 = true }) {
  const cat = catalog();
  const res = { t2: { ok: true, fails: [] }, t3: { ok: true, fails: [] }, nm: { ok: true, fails: [] }, t4: { ok: true, fails: [], checked: 0 }, composes: 0 };
  const fail = (k, x) => { res[k].ok = false; if (res[k].fails.length < 5) res[k].fails.push(x); };
  const order = arm.split("+")[0];
  runEpisodeS({ persona: PERSONAS.find((p) => p.id === persona), arm, seed, cell: cellByNameS(cell), cat, onCompose: (input, comp, ctx) => {
    res.composes++;
    const o = orderOf(comp);
    if (orderOf(composeS(order, structuredClone(input), cat)) !== o) fail("t2", { day: ctx.day, t: ctx.t });
    for (const k of M.FORBIDDEN_INPUTS) {
      const v = [1, 7].map((val) => { const x = structuredClone(input); x[k] = val; x.fingerprint[k] = val; return orderOf(composeS(order, x, cat)); });
      if (v[0] !== v[1]) fail("t3", { input: k, day: ctx.day });
    }
    try { if (orderOf(composeS(order, deepFreeze(structuredClone(input)), cat)) !== o) fail("nm", { day: ctx.day, why: "frozen input gave another plan" }); }
    catch (e) { fail("nm", { day: ctx.day, why: String(e.message || e).slice(0, 120) }); }
    if (!t4) return;
    const r = t4Session(comp);
    res.t4.checked += r.checked;
    for (const f of r.fails) fail("t4", { day: ctx.day, ...f });
  } });
  return res;
}

/** T4S on one composition (pure; also tested on the builder's own sample input and on broken copies). */
export function t4Session(comp) {
  const fails = []; let checked = 0;
  const picks = comp.picks.filter((p) => p.reason !== "due-revisit"), slots = comp.slots.filter((s) => s.kind === "new");
  if (picks.length !== slots.length) return { ok: false, checked, fails: [{ why: "picks and slots differ in number" }] };
  picks.forEach((p, i) => {
    checked++;
    const s = slots[i];
    const sum = p.terms.reduce((a, b) => a + b.value, 0);
    if (!p.terms.length || Math.abs(sum - p.score) > 1e-9) fails.push({ why: "terms do not sum to the score", slug: p.slug });
    if (s.winner !== p.slug) fails.push({ why: "slot winner is not the pick", slug: p.slug });
    if (p.moved) {
      if (!(s.margin > 0)) fails.push({ why: "moved without out-scoring the default card", slug: p.slug, margin: s.margin });
      const best = s.candidates.filter((c) => c.eligibleToMove && !c.isDefault).sort((a, b) => b.score - a.score || (a.slug < b.slug ? -1 : 1))[0];
      if (!best || best.slug !== p.slug) fails.push({ why: "moved pick is not the best eligible departure in its slot trace", slug: p.slug });
      const want = reasonTermValue(p.reason, p.terms) >= s.margin;
      if (p.reasonCarriesMove !== want || s.reasonCarriesMove !== want) fails.push({ why: "reasonCarriesMove differs from the VP record §7 formula", slug: p.slug, got: p.reasonCarriesMove, want });
    } else {
      if (s.defaultCard !== p.slug) fails.push({ why: "unmoved pick is not the default card", slug: p.slug });
      if (p.reasonCarriesMove !== null) fails.push({ why: "reasonCarriesMove set on an unmoved pick", slug: p.slug });
    }
  });
  return { ok: fails.length === 0, checked, fails: fails.slice(0, 5) };
}

// ---------------- judge checks run at the start of every run ----------------
export function gamPinned() {
  const fp = gamFingerprint(), want = readFileSync(join(HERE, "..", "c2", "gam-v0.2.2.sha256"), "utf8").trim();
  return { ok: gamModelVersion() === GAM_FROZEN_VERSION && fp === want && !M.COMPOSER.noveltyGate.active && !M.COMPOSER.surpriseGate.active, fp };
}
export function judgeChecks({ seeds = [SEEDS_S.first] } = {}) {
  return { id0: judgeIdentity(), t5c: t5Static3(), ke: keGate(seeds, catalog()), gam: gamPinned() };
}
