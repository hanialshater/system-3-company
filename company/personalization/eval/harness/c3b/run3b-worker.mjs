// Worker thread for run3b.mjs: one unit (cell x arm x persona) over its seed list. Deterministic.
// owner: personalization-eval (Uma) · run: eval-k5-1017
import { parentPort } from "node:worker_threads";
import { PERSONAS } from "../personas.copy.mjs";
import { candidateRunner, referenceEpisode, oracleEpisode, assertOracleAllowed, CANDIDATE_ARM, ORACLE_ARM } from "./harness3b.mjs";
import { REFERENCE_ARM } from "../c3/harness3.mjs";

let runner = null;
parentPort.on("message", async ({ i, unit, candidatePath, plumbing }) => {
  try {
    const persona = PERSONAS.find((p) => p.id === unit.persona);
    let episode;
    if (unit.arm === CANDIDATE_ARM) { runner ??= await candidateRunner(candidatePath); episode = runner.run; }
    else if (unit.arm === ORACLE_ARM && !plumbing) { assertOracleAllowed(); episode = oracleEpisode; }
    else if (unit.arm === REFERENCE_ARM || (unit.arm === ORACLE_ARM && plumbing)) episode = referenceEpisode; // plumbing: the oracle row is the reference arm
    else throw new Error(`unknown arm ${unit.arm}`);
    const t0 = performance.now();
    const out = unit.seeds.map((seed) => { const r = episode({ persona, seed, cell: unit.world }); return { ...r.score, extra: r.extra }; });
    parentPort.postMessage({ i, scores: out, ms: performance.now() - t0 });
  } catch (e) {
    parentPort.postMessage({ i, error: String(e.message || e).slice(0, 300) });
  }
});
