// Builds tests/eval/fixtures/sample.jsonl: SYNTHETIC judgements for developing the HQ page. Not real data.
//   node tests/eval/fixtures/make.mjs
// then: node tools/eval/bt.mjs --dir=tests/eval/fixtures/dir --out=<file>   (dir holds sample.jsonl)
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { mulberry32 } from "../../../tools/eval/bt.mjs";

const here = path.dirname(fileURLToPath(import.meta.url));
const crit = ["learning", "shown-not-told", "prediction", "clarity", "engagement", "trust"];
const main = { "attention-shares-one@v3": 2.2, "background-shortcut@v1": 1.2, "bad-start-kmeans@v1": 0.5, "border-follows-point@v1": -0.3, "chain-of-blame@v1": -1.1 };
const island = { "enemy-of-my-enemy@v1": 0.4, "broker-between-two-groups@v1": -0.4 };
const rng = mulberry32(7);
const lines = [];
let n = 0;
const judge = (a, b, truth, c, j) => {
  const pa = 1 / (1 + Math.exp(truth[b] - truth[a]));
  const u = rng();
  const winner = u < 0.08 ? "tie" : u < 0.08 + 0.92 * pa ? "a" : "b";
  lines.push(JSON.stringify({ id: `fx-${++n}`, date: "2026-10-14", judge: j, criterion: c, a, b, winner, reason: "synthetic fixture", artifacts: [], blind: true }));
};
const names = Object.keys(main);
for (const c of crit)
  for (let i = 0; i < names.length; i++)
    for (let k = i + 1; k < names.length; k++) {
      if (rng() < 0.3) continue;
      judge(names[i], names[k], main, c, "judge-a");
      if (rng() < 0.5) judge(names[k], names[i], main, c, "judge-b");
    }
judge("enemy-of-my-enemy@v1", "broker-between-two-groups@v1", island, "learning", "judge-a");
judge("enemy-of-my-enemy@v1", "broker-between-two-groups@v1", island, "clarity", "judge-a");
fs.mkdirSync(path.join(here, "dir"), { recursive: true });
fs.writeFileSync(path.join(here, "dir/sample.jsonl"), lines.join("\n") + "\n");
console.log(lines.length, "synthetic records");
