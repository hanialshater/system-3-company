#!/usr/bin/env node
// Phase A identity check (batch 3 K1): do the existing policies give byte-identical episodes in phase A's harness at
// readout 1's commit and at this tree? Prints episode HASHES only (no score), for base, learnRate-low and
// prereqPenalty-high, every POLICIES entry of readout 1, every persona, seeds 1001-1002.
// owner: personalization-eval (Uma) · run: eval-k1-1016
//   git archive 5725b10a company/personalization content src/demos | tar -x -C <dir>
//   NODE_NO_WARNINGS=1 node phase-a-identity.mjs <dir>  > a.json ;  NODE_NO_WARNINGS=1 node phase-a-identity.mjs <repo root> > b.json
//   node phase-a-identity.mjs --compare a.json b.json
import { readFileSync } from "node:fs";
if (process.argv[2] === "--compare") {
  const a = JSON.parse(readFileSync(process.argv[3], "utf8")), b = JSON.parse(readFileSync(process.argv[4], "utf8"));
  const by = {};
  for (const k of Object.keys(a)) { const pol = k.split("|")[1]; by[pol] ??= { same: 0, diff: 0 }; by[pol][a[k] === b[k] ? "same" : "diff"]++; }
  let s = 0, d = 0; // model-v0.2.2's gam (novelty gated off) against readout 1's gam-no-surprise-novelty
  for (const k of Object.keys(b)) { const [c, pol, p, seed] = k.split("|"); if (pol !== "gam") continue; (a[[c, "gam-no-surprise-novelty", p, seed].join("|")] === b[k] ? s++ : d++); }
  console.log(JSON.stringify({ byPolicy: by, "gam@b vs gam-no-surprise-novelty@a": { same: s, diff: d } }, null, 2));
} else {
  const root = process.argv[2];
  const H = await import(root + "/company/personalization/eval/harness/harness.mjs");
  const { PERSONAS } = await import(root + "/company/personalization/eval/harness/personas.copy.mjs");
  const cat = H.catalog(); const out = {};
  for (const cellName of ["base", "learnRate-low", "prereqPenalty-high"]) { const cell = H.cellByName(cellName);
    for (const policy of ["default-order", "draft-rules", "random", "epsilon-greedy", "gam", "gam-no-surprise-novelty", "gam-no-breadth"])
      for (const p of PERSONAS) for (const seed of [1001, 1002]) out[`${cellName}|${policy}|${p.id}|${seed}`] = H.runEpisode({ persona: p, policy, seed, cell, cat }).hash; }
  console.log(JSON.stringify(out));
}
