// W-1319 (batch 2026-10-16-r5-tools.md#B4): publish-ready knows every flag, and only --link / --publish write.
// Each case runs a copy of the tool in a tmp root holding one lesson dir copied from the repo, so no
// real meta.json is ever written. --publish is not spawned here (it would run the gate CLI).
import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import { spawnSync } from "node:child_process";
import { fileURLToPath } from "node:url";
import { parseArgs } from "../../tools/publish-ready.mjs";

const REPO = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "../..");
const SLUG = "jacket-last-first";
const LESSON = path.join(REPO, "src/demos/lifehacks", SLUG);

function tmpRoot() {
  const root = fs.mkdtempSync(path.join(os.tmpdir(), "s3c-publish-ready-"));
  fs.mkdirSync(path.join(root, "tools"));
  fs.copyFileSync(path.join(REPO, "tools/publish-ready.mjs"), path.join(root, "tools/publish-ready.mjs"));
  const dest = path.join(root, "src/demos/lifehacks", SLUG);
  fs.mkdirSync(dest, { recursive: true });
  const meta = JSON.parse(fs.readFileSync(path.join(LESSON, "meta.json"), "utf8"));
  meta.evidence ??= {};
  meta.evidence.simulatedLearner = []; // so a write would show
  fs.writeFileSync(path.join(dest, "meta.json"), JSON.stringify(meta, null, 2) + "\n");
  const rd = path.join(root, "company/reviews", SLUG);
  fs.mkdirSync(rd, { recursive: true });
  fs.writeFileSync(path.join(rd, "2026-10-16-learner-adult-beginner.md"), "# Learner review\nlesson version: v1\nVerdict: launch\n");
  return { root, metaPath: path.join(dest, "meta.json") };
}

const run = (root, args) => spawnSync(process.execPath, [path.join(root, "tools/publish-ready.mjs"), ...args], { cwd: root, encoding: "utf8" });

test("--help, -h, a typo flag and a stray positional leave meta.json byte-identical", () => {
  for (const [args, code] of [[["--help"], 0], [["-h"], 0], [["--hlep"], 2], [["list"], 2], [["--publish", "extra"], 2], [["--publish=yes"], 2]]) {
    const { root, metaPath } = tmpRoot();
    const before = fs.readFileSync(metaPath);
    const r = run(root, args);
    assert.equal(r.status, code, `${args.join(" ")}: exit ${r.status}\n${r.stdout}${r.stderr}`);
    assert.match(r.stdout + r.stderr, /usage: node tools\/publish-ready\.mjs/, args.join(" "));
    assert.deepEqual(fs.readFileSync(metaPath), before, `${args.join(" ")} wrote meta.json`);
    if (code === 2) assert.match(r.stderr, /unknown argument/);
    fs.rmSync(root, { recursive: true, force: true });
  }
});

test("a plain list run writes nothing and says what it would link", () => {
  const { root, metaPath } = tmpRoot();
  const before = fs.readFileSync(metaPath);
  const r = run(root, []);
  assert.equal(r.status, 0, r.stderr);
  assert.match(r.stdout, /1 review file\(s\) not yet linked as evidence \(read-only run; --link writes them\)/);
  assert.match(r.stdout, /^candidates: /m);
  assert.deepEqual(fs.readFileSync(metaPath), before);
  fs.rmSync(root, { recursive: true, force: true });
});

test("--link writes the link, and a second --link changes nothing", () => {
  const { root, metaPath } = tmpRoot();
  const r = run(root, ["--link"]);
  assert.equal(r.status, 0, r.stderr);
  assert.match(r.stdout, /linked 1 review file\(s\) as evidence/);
  const meta = JSON.parse(fs.readFileSync(metaPath, "utf8"));
  assert.deepEqual(meta.evidence.simulatedLearner, [`company/reviews/${SLUG}/2026-10-16-learner-adult-beginner.md`]);
  const after = fs.readFileSync(metaPath);
  assert.match(run(root, ["--link"]).stdout, /linked 0 review file/);
  assert.deepEqual(fs.readFileSync(metaPath), after);
  fs.rmSync(root, { recursive: true, force: true });
});

test("list and --link print the same candidates and holds (linking does not change the list)", () => {
  const { root } = tmpRoot();
  const tail = (s) => s.split("\n").slice(1).join("\n");
  const list = run(root, []).stdout;
  const linked = run(root, ["--link"]).stdout;
  assert.equal(tail(list), tail(linked));
  fs.rmSync(root, { recursive: true, force: true });
});

test("parseArgs", () => {
  assert.deepEqual(parseArgs([]), { help: false, publish: false, link: false });
  assert.deepEqual(parseArgs(["--publish"]), { help: false, publish: true, link: true });
  assert.deepEqual(parseArgs(["--link"]), { help: false, publish: false, link: true });
  assert.equal(parseArgs(["-h", "--publish"]).help, true);
  assert.match(parseArgs(["--hlep", "x"]).error, /unknown arguments: --hlep x/);
});
