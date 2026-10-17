// Criterion 3 §5 checks as functions, for tests3.test.mjs (K3, before the freeze) and run3.mjs (K4).
// owner: personalization-eval (Uma) · run: eval-k3-1017 · criterion: company/personalization/eval/2026-10-17-criterion-3.md §5
import { spawnSync } from "node:child_process";
import { readFileSync } from "node:fs";
import { createHash } from "node:crypto";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";
import * as M from "../../../model/model.ts";
import { staticIsolation } from "../checks.mjs";
import { seedHistory, poolFor } from "../harness.mjs";
import { PERSONAS } from "../personas.copy.mjs";
import { E1, EPISODE2, CRITERION2, cells2, personaWorld2 } from "../c2/world2.mjs";
import { hiddenPull } from "../c2/learner2.mjs";
import { runEpisode2 } from "../c2/harness2.mjs";
import { makeLearner3 } from "./learner3.mjs";
import { E3, c2Equivalent, personaWorld3 } from "./world3.mjs";
import { runEpisode3, catalog, reachableInput, reachablePop, cellByName3, BASE_CELL } from "./harness3.mjs";
import { makeReachableOracle } from "./reachable-oracle.mjs";

const HERE = dirname(fileURLToPath(import.meta.url));
const DAY = 86_400_000;
const sha = (s) => createHash("sha256").update(s).digest("hex");

/** The identity subset (criterion 3 §9): criterion 2's arms (no candidate: pre-commitment 1) at criterion 2's cells. */
export const ID_ARMS = ["default-order+fixed", "draft-rules+fixed", "random+fixed", "gam+fixed", "oracle-order+fixed", "default-order+none", "default-order+oracle-review@0.3", "default-order+oracle-review@0.7"];
export const ID_CELLS = ["base", "learnRate-low", "prereqPenalty-high", "revisitStopScale-low", "kSpread-high", "forgetShape-high"];
/** C3-ID1: runEpisode3 at the c2-equivalent world equals runEpisode2, episode hash and world hash. Booleans only. */
export function identityC2({ arms = ID_ARMS, cells = ID_CELLS, seeds = [1001, 1002] } = {}) {
  const c2 = cells2(E1);
  let n = 0; const diffs = [];
  for (const cn of cells) {
    const w = c2.find((c) => c.name === cn).world;
    for (const arm of arms) for (const p of PERSONAS) for (const seed of seeds) {
      const a = runEpisode2({ persona: p, arm, seed, cell: w });
      const b = runEpisode3({ persona: p, arm, seed, cell: c2Equivalent(w) });
      n++;
      if (a.hash !== b.hash || a.worldHash !== b.worldHash) diffs.push(`${cn}|${arm}|${p.id}|${seed}`);
    }
  }
  return { ok: diffs.length === 0 && n > 0, n, diffs: diffs.slice(0, 10) };
}
/** C3-ID2: the c2 harness files equal readout 2's manifest hashes (so ID1 compares against readout 2's own code). */
export function identityFiles() {
  const man = JSON.parse(readFileSync(join(HERE, "..", "records", "2026-10-16-readout-2", "main", "manifest.json"), "utf8"));
  const c2dir = join(HERE, "..", "c2");
  const bad = Object.entries(man.fileSha256).filter(([f, h]) => sha(readFileSync(join(c2dir, f))) !== h).map(([f]) => f);
  return { ok: bad.length === 0, files: Object.keys(man.fileSha256).length, bad, commit: man.commit };
}

/** T5c: criterion 3's judge modules and the reachable oracle import nothing; the judge modules never name the rating field. */
export function t5Static3() {
  const out = {};
  for (const f of ["world3.mjs", "learner3.mjs"]) out[f] = staticIsolation(readFileSync(join(HERE, f), "utf8"));
  const ro = readFileSync(join(HERE, "reachable-oracle.mjs"), "utf8");
  out["reachable-oracle.mjs"] = staticIsolation(ro).filter((x) => x !== "names the rating field"); // a policy may read dims' rating
  const code = ro.split("\n").filter((l) => !/^\s*(\/\/|\*|\/\*\*)/.test(l)).join("\n");
  for (const w of ["persona", "kfactor", "keptAt", "oracle.", "seed", "Math.random", "Date", "process", "globalThis"]) if (code.includes(w)) out["reachable-oracle.mjs"].push(`names ${w}`);
  return { ok: Object.values(out).every((p) => !p.length), files: out };
}

/** A realistic reachable-oracle input: a persona's pre-history drawn by the episode's law, at the episode's first session. */
export function sampleReachableInput(persona, seed, cellName = BASE_CELL) {
  const cat = catalog(); const cell = cellByName3(cellName);
  const world = personaWorld3(personaWorld2(persona, PERSONAS, cell, E1), cell);
  const dimsLite = Object.fromEntries(cat.lessons.map((l) => [l.slug, { slug: l.slug, concept: l.concept, domain: l.domain }]));
  const pulls = Object.fromEntries(cat.lessons.map((l) => [l.slug, hiddenPull(seed, l.slug, E1.pull)]));
  const L = makeLearner3({ seed, personaId: persona.id, world, graph: { prereqsOf: (c) => cat.prereqsByConcept[c] || [], pilotConcepts: cat.pilotConcepts }, pullOf: (s) => pulls[s], startTime: EPISODE2.baseTime });
  const pre = L.seedKnowledge2(seedHistory(persona, cat, seed), dimsLite);
  const dims = Object.fromEntries(poolFor(cat, seed, CRITERION2.rho.value, { b2: E1 }).map((d) => [d.slug, structuredClone(d)]));
  return { input: reachableInput(pre, EPISODE2.baseTime + EPISODE2.sessionStartHour * 3_600_000, dims, cell.slots), pop: reachablePop(E1, E3, cell) };
}
const shiftInput = (inp, ms) => reachableInput(inp.history.map((h) => ({ ...h, completedAt: h.completedAt + ms, recalls: h.recalls.map((r) => ({ ...r, at: r.at + ms })) })), inp.now + ms, inp.dims, inp.slots);

/** C3-RS1 to RS6 on one input: fields, replay, no mutation (frozen), time translation, forbidden fields, no state. */
export function reachableChecks(input, pop, other = null) {
  const res = {};
  const out = (d) => JSON.stringify(d);
  res.RS1 = JSON.stringify(Object.keys(input).sort()) === JSON.stringify(["dims", "history", "now", "slots"]);
  const o = makeReachableOracle(pop);
  let a; try { a = out(o.decide(input)); res.RS3 = Object.isFrozen(input) && Object.isFrozen(input.history); } catch (e) { res.RS3 = false; a = `throw ${e.message}`; }
  res.RS2 = out(o.decide(input)) === a;
  res.RS4 = [37 * DAY + 12_345, -400 * DAY].every((ms) => out(makeReachableOracle(pop).decide(shiftInput(input, ms))) === a);
  res.RS5 = [...M.FORBIDDEN_INPUTS, "gapDays", "settings", "persona", "fixedDue"].every((k) => {
    const v = [1, 7].map((val) => out(makeReachableOracle(pop).decide({ ...input, [k]: val })));
    return v[0] === v[1] && v[0] === a;
  });
  if (other) { const o2 = makeReachableOracle(pop); o2.decide(other); res.RS6 = out(o2.decide(input)) === a; } else res.RS6 = true;
  return { ok: Object.values(res).every(Boolean), ...res };
}

/** T1 replay through the CLI (two processes). Used by run3 for the reachable arm after the freeze. */
export function t1Replay3({ persona, seed, cell = BASE_CELL, arm }) {
  const args = [join(HERE, "harness3.mjs"), "episode", `--persona=${persona}`, `--seed=${seed}`, `--cell=${cell}`, `--arm=${arm}`];
  const run = () => spawnSync(process.execPath, args, { encoding: "utf8", env: { ...process.env, NODE_NO_WARNINGS: "1" } });
  const a = run(), b = run();
  if (a.status !== 0 || b.status !== 0) return { ok: false, why: (a.stderr || b.stderr).slice(0, 200) };
  return { ok: a.stdout.trim() === b.stdout.trim() && /^[0-9a-f]{64}$/.test(a.stdout.trim()), a: a.stdout.trim() };
}
export { runEpisode3 };
