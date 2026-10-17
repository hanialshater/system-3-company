// The leaderboard logic of tools/evolve.mjs, with no side effects on import, so the CLI (`board`) and the HQ
// R&D page (tools/hq-rnd-precompute.mjs) share one implementation. The evaluator scores; this only reads
// the archive (company/rnd/evolution/<project>.jsonl) and ranks it.
import fs from "node:fs";

export function readArchive(file) {
  return fs.existsSync(file) ? fs.readFileSync(file, "utf8").trim().split("\n").filter(Boolean).map((l) => JSON.parse(l)) : [];
}

// Latest record per candidate (not the best: with a fresh bench seed per run, best-of-N would select noise).
export function boardOf(records) {
  const latest = new Map();
  for (const r of records) latest.set(r.id, r);
  return [...latest.values()].sort((a, b) => b.score - a.score);
}

export function boardWarning(b) {
  const seeds = new Set(b.map((r) => r.seed));
  return seeds.size > 1 ? `warning: these candidates were scored with different bench seeds (${[...seeds].join(", ")}); re-score them in one run before selecting` : null;
}

export function boardLine(i, r) {
  return `${String(i + 1).padStart(2)}. ${r.id.padEnd(24)} ${String(r.score).padStart(9)}  tests ${r.pass}/${r.pass + r.fail}  ${r.gzBytes} B  seed ${r.seed ?? "-"}  parents: ${r.parents.join(",") || "-"}`;
}

/** The exact lines `node tools/evolve.mjs board <project>` prints. */
export function boardLines(records) {
  const b = boardOf(records), w = boardWarning(b);
  return [...(w ? [w] : []), ...b.map((r, i) => boardLine(i, r))];
}
