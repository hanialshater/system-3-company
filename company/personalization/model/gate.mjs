#!/usr/bin/env node
// `npm run test:personalization` (W-1537, privacy T1). Plain JS, no dependencies, no TS imports,
// so it parses on any Node that runs this repo and can fail clearly before a `.ts` import does.
// 1. Node guard (review C1): the model's `.ts` files need type stripping, on by default from
//    Node 22.18. Older Node fails here with a clear message. It never skips: a skip would turn T1
//    back into a habit. Simulate an old Node with `--node-version=20.11.0` (testing only).
// 2. Runs ./self-check.mjs, then sim/privacy-n1-n3.test.mjs, then sim/review-timing.test.mjs (W-1547), with this Node.
// 3. On failure, names the owner and where to read (review C4).
// Why this is in `check`, not `verify`: CI's verify job runs only check, typecheck, build and qa
// (ci.yml is protected), so `check` is the only place that makes T1 a gate in CI
// (company/engineering/reviews/2026-10-16-w1537-check-wiring.md, finding 1).
import { spawnSync } from "node:child_process";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const MIN = [22, 18];
const arg = process.argv.find((a) => a.startsWith("--node-version="));
const have = arg ? arg.slice("--node-version=".length).replace(/^v/, "") : process.versions.node;
const [maj, min] = have.split(".").map((n) => parseInt(n, 10));
const ok = Number.isFinite(maj) && Number.isFinite(min) && (maj > MIN[0] || (maj === MIN[0] && min >= MIN[1]));

const OWNER = "owner: learner-model-engineer (escalate: vp-personalization)";
const READ = "read: company/personalization/model/sim/README.md (\"Wired in\") and company/personalization/model/README.md";

if (!ok) {
  console.error(`test:personalization needs Node >= ${MIN.join(".")} (have v${have}).`);
  console.error("The personalization model is TypeScript run by Node's built-in type stripping; older Node fails with ERR_UNKNOWN_FILE_EXTENSION.");
  console.error("Upgrade Node (package.json engines, .nvmrc). Do not remove this step from `npm run check`: it is privacy condition T1.");
  console.error(`${OWNER} · ${READ}`);
  process.exit(1);
}
if (arg) { console.log(`node guard: v${have} >= ${MIN.join(".")} (simulated), ok`); process.exit(0); }

const here = dirname(fileURLToPath(import.meta.url));
const steps = [
  ["self-check (invariants, boundaries, privacy P1/P2/N6)", [join(here, "self-check.mjs")]],
  ["privacy N1/N3 tests", ["--test", join(here, "sim", "privacy-n1-n3.test.mjs")]],
  ["review-timing candidate tests (W-1547: §I.4 rules, existing policies byte-identical)", ["--test", join(here, "sim", "review-timing.test.mjs")]],
];
for (const [name, args] of steps) {
  const r = spawnSync(process.execPath, args, { stdio: "inherit" });
  if (r.status !== 0) {
    console.error(`\ntest:personalization FAILED at: ${name} (exit ${r.status ?? r.signal}).`);
    console.error("This is the personalization privacy gate (T1). If your change did not touch company/personalization/ or import it from src/, do not remove the step: board it for the owner.");
    console.error(`${OWNER} · ${READ}`);
    process.exit(1);
  }
}
