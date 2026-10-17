// HQ R&D page (W-1654): its rows equal `node tools/evolve.mjs board knots`, the committed data is current,
// and the kit's candidate is fix1-bigon while another candidate tops the board.
// Run: npm run test:hq
import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import { execFileSync } from "node:child_process";
import { loadRnd, noteHref, tests as testsOf } from "../../src/lib/hq-rnd.ts";
import { build } from "../../tools/hq-rnd-precompute.mjs";

const { projects, error } = loadRnd();
const knots = projects.find((p) => p.name === "knots");
const cli = execFileSync(process.execPath, ["tools/evolve.mjs", "board", "knots"], { encoding: "utf8" }).trimEnd().split("\n");

test("the committed data loads", () => {
  assert.equal(error, null);
  assert.ok(knots);
  assert.match(loadRnd("/nonexistent").error, /unavailable.*hq-rnd-precompute/);
});

test("the page's rows equal `evolve.mjs board knots`, line for line", () => {
  const warn = cli[0].startsWith("warning:") ? cli.shift() : null;
  assert.equal(knots.warning, warn);
  assert.ok(warn, "knots mixes bench seeds today, so the warning must show");
  assert.deepEqual(knots.lines, warn ? [warn, ...cli] : cli);
  assert.equal(knots.rows.length, cli.length);
  knots.rows.forEach((r, i) => {
    const m = cli[i].match(/^\s*(\d+)\. (\S+)\s+(\S+)\s+tests (\d+)\/(\d+)\s+(\d+) B\s+seed (\S+)\s+parents: (\S+)$/);
    assert.ok(m, cli[i]);
    assert.deepEqual(
      [r.rank, r.id, String(r.score), testsOf(r), String(r.gzBytes), r.seed == null ? "-" : String(r.seed), r.parents.join(",") || "-"],
      [Number(m[1]), m[2], m[3], `${m[4]}/${m[5]}`, m[6], m[7], m[8]],
    );
  });
});

test("the kit's candidate is shown next to the top score", () => {
  assert.equal(knots.rows[0].id, "gen2-force-smooth");
  assert.deepEqual(knots.kit.ids, ["fix1-bigon"]);
  assert.deepEqual(knots.rows.filter((r) => r.kit).map((r) => r.id), ["fix1-bigon"]);
});

test("every generation note and the EDD exist and link into the Library", () => {
  for (const n of ["knots-gen0.md", "knots-gen1.md", "knots-gen2.md", "knots-fix1.md"]) assert.ok(knots.notes.some((d) => d.name === n), n);
  assert.ok(knots.edds.some((d) => d.name === "EDD-004-knots-kit.md"));
  for (const d of [...knots.notes, ...knots.edds]) {
    assert.ok(fs.existsSync(`company/${d.path}`), d.path);
    assert.equal(noteHref(d), `/hq/library/${d.path}`);
  }
});

test("the committed file is current (regenerate with node tools/hq-rnd-precompute.mjs)", () => {
  assert.equal(fs.readFileSync("src/data/hq-rnd/leaderboards.json", "utf8"), JSON.stringify(build(), null, 2) + "\n");
});

test("the read side spawns nothing and reads only the committed file", () => {
  const src = fs.readFileSync("src/lib/hq-rnd.ts", "utf8");
  assert.doesNotMatch(src.replace(/^\s*\/\/.*$/gm, ""), /child_process|spawn|exec\(|src\/lab/);
});
