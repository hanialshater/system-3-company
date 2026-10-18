// Worker thread for run3.mjs: one unit (cell x arm x persona) over its seed list. Deterministic.
// owner: personalization-eval (Uma) · run: eval-k3-1017
import { parentPort } from "node:worker_threads";
import { runEpisode3, assertScoringAllowed3 } from "./harness3.mjs";
import { PERSONAS } from "../personas.copy.mjs";

parentPort.on("message", ({ i, unit, e3 }) => {
  try {
    assertScoringAllowed3([unit.arm]);
    const persona = PERSONAS.find((p) => p.id === unit.persona);
    const out = unit.seeds.map((seed) => { const r = runEpisode3({ persona, arm: unit.arm, seed, cell: unit.world, e3 }); return { ...r.score, extra: r.extra }; });
    parentPort.postMessage({ i, scores: out });
  } catch (e) {
    parentPort.postMessage({ i, error: String(e.message || e).slice(0, 300) });
  }
});
