// The candidate slot's stand-in for ../c3/reachable-oracle.mjs (criterion 3b §1.2). Never imported by name from c3.
// owner: personalization-eval (Uma) · run: eval-k5-1017 · criterion: company/personalization/eval/2026-10-17-criterion-3b.md
//
// slot.mjs installs a resolve hook so that ONE extra instance of ../c3/harness3.mjs (URL with "?c3b-slot=candidate")
// resolves its import "./reachable-oracle.mjs" to this file. Criterion 3's runEpisode3 then serves, in its unchanged
// "reachable" branch, whatever decide() this module was given: the candidate's (or, in identity test 3b-ID1, the
// reachable oracle's own). Every other line of the episode (placements, slot cost, the learner, the judge) is criterion
// 3's code, byte-checked against readout 3's manifest (3b-ID0).
//
// `pop` (criterion 3's population constants for the oracle) is ignored: a candidate holds its own constants (batch 5 §3).
let CURRENT = null;
/** c: { name, decide(input) }. One per thread; set before any episode. */
export function setSlot(c) {
  if (!c || typeof c.decide !== "function") throw new Error("slot: setSlot needs { name, decide }");
  CURRENT = c;
}
export const slotName = () => (CURRENT ? CURRENT.name : null);
export function makeReachableOracle(pop) {
  if (!CURRENT) throw new Error("slot: no candidate set (call setSlot first)");
  const c = CURRENT;
  if (c.usesPop) return { name: c.name, version: "slot", decide: c.withPop(pop).decide }; // identity test only (the oracle needs pop)
  return { name: c.name, version: "slot", decide: (input) => c.decide(input) };
}
