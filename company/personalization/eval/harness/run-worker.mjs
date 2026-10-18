// Worker thread for run.mjs: runs one unit (cell × policy × persona) over the seed list. Deterministic: the result
// depends only on the unit, the seeds and the inputs, never on which worker ran it or in what order.
// owner: personalization-eval (Uma) · run: eval-c1-1016
import { parentPort } from "node:worker_threads";
import { runEpisode, assertScoringAllowed } from "./harness.mjs";
import { PERSONAS } from "./personas.copy.mjs";

parentPort.on("message", ({ i, unit, seeds, b2 }) => {
  assertScoringAllowed([unit.policy]);
  const persona = PERSONAS.find((p) => p.id === unit.persona);
  const scores = seeds.map((seed) => runEpisode({ persona, policy: unit.policy, seed, cell: unit.world, b2 }).score);
  parentPort.postMessage({ i, scores });
});
