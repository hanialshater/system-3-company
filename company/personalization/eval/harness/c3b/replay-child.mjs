// Child process for validity check V3 (criterion 3b §4.1): loads the candidate fresh and prints, for each input in a JSON
// file, JSON.stringify([decide(input), rank(input)]), one line each. Inputs are deep-frozen first, as the harness gives them.
// owner: personalization-eval (Uma) · run: eval-k5-1017
import { readFileSync } from "node:fs";
import { loadCandidate } from "./slot.mjs";
const [path, inputsFile] = process.argv.slice(2);
const deepFreeze = (o) => { if (o && typeof o === "object" && !Object.isFrozen(o)) { Object.freeze(o); for (const v of Object.values(o)) deepFreeze(v); } return o; };
const cand = await loadCandidate(path);
for (const inp of JSON.parse(readFileSync(inputsFile, "utf8"))) {
  const x = deepFreeze(inp);
  process.stdout.write(JSON.stringify([cand.decide(x) ?? null, cand.rank(x)]) + "\n");
}
