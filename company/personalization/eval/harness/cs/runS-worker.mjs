// Worker thread for runS.mjs: one unit (cell x arm x persona) over its seed list. Deterministic.
// owner: personalization-eval (Uma) · run: eval-s1-1020 · criterion: company/personalization/eval/2026-10-20-session-criterion.md
import { parentPort } from "node:worker_threads";
import { runEpisodeS, assertScoringAllowedS } from "./harnessS.mjs";
import { PERSONAS } from "../personas.copy.mjs";

parentPort.on("message", ({ i, unit }) => {
  try {
    assertScoringAllowedS([unit.arm]);
    const persona = PERSONAS.find((p) => p.id === unit.persona);
    const out = unit.seeds.map((seed) => { const r = runEpisodeS({ persona, arm: unit.arm, seed, cell: unit.world, diagnostics: unit.diagnostics }); return { ...r.score, extra: r.extra }; });
    parentPort.postMessage({ i, scores: out });
  } catch (e) {
    parentPort.postMessage({ i, error: String(e.message || e).slice(0, 300) });
  }
});
