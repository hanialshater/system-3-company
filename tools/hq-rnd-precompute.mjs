#!/usr/bin/env node
// Writes src/data/hq-rnd/leaderboards.json for the HQ R&D page (/hq/rnd, W-1654). The deployed build cannot
// read src/lab/ or spawn node, so the page serves this committed file only. Rows come from the same functions
// as `node tools/evolve.mjs board <project>` (tools/evolve-board.mjs); nothing is scored here.
//   node tools/hq-rnd-precompute.mjs          write the file
//   node tools/hq-rnd-precompute.mjs --check  exit 1 if the committed file is stale
import fs from "node:fs";
import path from "node:path";
import { readArchive, boardOf, boardWarning, boardLines } from "./evolve-board.mjs";

const root = path.resolve(import.meta.dirname, "..");
const EVO = "company/rnd/evolution", OUT = "src/data/hq-rnd/leaderboards.json";
const read = (p) => fs.readFileSync(path.join(root, p), "utf8");
const same = (a, b) => fs.existsSync(path.join(root, a)) && fs.existsSync(path.join(root, b)) && fs.readFileSync(path.join(root, a)).equals(fs.readFileSync(path.join(root, b)));
const title = (p) => (read(p).split("\n").find((l) => l.startsWith("# ")) ?? "# " + path.basename(p)).slice(2).trim();

export function build() {
  const projects = fs.readdirSync(path.join(root, EVO)).filter((f) => f.endsWith(".jsonl")).map((f) => f.slice(0, -6)).sort().map((name) => {
    const records = readArchive(path.join(root, EVO, `${name}.jsonl`));
    const cfg = JSON.parse(read(`src/lab/${name}/evolve.json`));
    const b = boardOf(records);
    // The kit's candidate: the one whose draw.mjs is byte-identical to src/kit/<project>/draw.mjs (evidence, not a claim).
    const kitDraw = `src/kit/${name}/draw.mjs`;
    const kitIds = fs.existsSync(path.join(root, kitDraw)) ? b.filter((r) => same(kitDraw, `src/lab/${name}/candidates/${r.id}/draw.mjs`)).map((r) => r.id) : [];
    const notes = fs.readdirSync(path.join(root, EVO)).filter((f) => f.startsWith(`${name}-`) && f.endsWith(".md")).sort()
      .map((f) => ({ path: `rnd/evolution/${f}`, name: f, title: title(`${EVO}/${f}`) }));
    const edds = fs.readdirSync(path.join(root, "company/engineering/edd")).filter((f) => f.endsWith(".md") && f.includes(name))
      .map((f) => ({ path: `engineering/edd/${f}`, name: f, title: title(`company/engineering/edd/${f}`) }));
    return {
      name, archive: `${EVO}/${name}.jsonl`, command: `node tools/evolve.mjs board ${name}`, records: records.length,
      weights: cfg.weights ?? null, warning: boardWarning(b), lines: boardLines(records),
      rows: b.map((r, i) => ({ rank: i + 1, id: r.id, score: r.score, pass: r.pass, fail: r.fail, gzBytes: r.gzBytes, seed: r.seed ?? null, parents: r.parents, gated: r.gated, problems: r.problems ?? [], ts: r.ts, kit: kitIds.includes(r.id) })),
      kit: { dir: `src/kit/${name}`, ids: kitIds, how: `draw.mjs in ${kitDraw} is byte-identical to the candidate's draw.mjs` },
      notes, edds,
    };
  });
  return { schema: "hq-rnd-leaderboards-v1", generatedBy: "node tools/hq-rnd-precompute.mjs", projects };
}

if (process.argv[1] === import.meta.filename) {
  const text = JSON.stringify(build(), null, 2) + "\n";
  const file = path.join(root, OUT);
  if (process.argv.includes("--check")) {
    if (!fs.existsSync(file) || fs.readFileSync(file, "utf8") !== text) (console.error(`${OUT} is stale; run node tools/hq-rnd-precompute.mjs`), process.exit(1));
    console.log(`${OUT} is current`);
  } else (fs.mkdirSync(path.dirname(file), { recursive: true }), fs.writeFileSync(file, text), console.log(`wrote ${OUT}`));
}
