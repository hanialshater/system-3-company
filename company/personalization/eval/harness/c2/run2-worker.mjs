// Worker thread for run2.mjs: one unit (cell x arm x persona) over its seed list. Deterministic: the result depends only
// on the unit, the seeds, the inputs and the candidate file, never on which worker ran it or in what order.
// owner: personalization-eval (Uma) · run: eval-k1-1016
import { parentPort } from "node:worker_threads";
import { runEpisode2, assertScoringAllowed2, loadCandidate } from "./harness2.mjs";
import { PERSONAS } from "../personas.copy.mjs";

let loaded = null;
parentPort.on("message", async ({ i, unit, e1, candidate }) => {
  try {
    assertScoringAllowed2([unit.arm]);
    if (unit.arm.endsWith("+candidate") && loaded !== candidate) { await loadCandidate(candidate); loaded = candidate; }
    const persona = PERSONAS.find((p) => p.id === unit.persona);
    const scores = unit.seeds.map((seed) => runEpisode2({ persona, arm: unit.arm, seed, cell: unit.world, e1 }).score);
    parentPort.postMessage({ i, scores });
  } catch (e) {
    parentPort.postMessage({ i, error: String(e.message || e).slice(0, 300) });
  }
});
