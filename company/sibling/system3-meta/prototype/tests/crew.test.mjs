import { test } from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import { spawnSync } from "node:child_process";

// crew.mjs: the dynamic-workflow archetype in the kernel (Benchmarks 11-13). A toy referee scores a tree by the number
// in score.txt, so lands that raise, keep or lower it can be made at will.
const crewMod = await import("../crew.mjs");
const { openCrew, startCrew, sync, land, note, readNotes, unread, post, board, claim, dropClaim, claims, status, CrewRefusal } = crewMod;
const HERE = path.dirname(new URL(import.meta.url).pathname);
const git = (cwd, ...a) => { const r = spawnSync("git", ["-c", "user.name=t", "-c", "user.email=t@t", "-C", cwd, ...a], { encoding: "utf8" }); if (r.status !== 0) throw new Error(r.stderr); return r.stdout.trim(); };

function setup() {
  const dir = fs.mkdtempSync(path.join(os.tmpdir(), "crew-")), main = path.join(dir, "main");
  fs.mkdirSync(main); git(dir, "init", "-q", "-b", "main", main); fs.writeFileSync(path.join(main, "score.txt"), "0.5\n"); git(main, "add", "-A"); git(main, "commit", "-qm", "start");
  const members = ["a", "b"].map((id) => { const tree = path.join(dir, id); git(dir, "clone", "-q", main, tree); return { id, tree, model: "m", role: "r" }; });
  const referee = `node -e 'const fs=require("fs");console.log(JSON.stringify({rate:Number(fs.readFileSync("{dir}/score.txt","utf8"))}))'`;
  fs.writeFileSync(path.join(dir, "crew.json"), JSON.stringify({ members, main, referee: { cmd: referee }, budget: 10, minutes: 60 }));
  const crew = openCrew(dir); startCrew(crew); return { crew, dir, main, members };
}
const commit = (tree, score, msg = "w") => { fs.writeFileSync(path.join(tree, "score.txt"), `${score}\n`); git(tree, "add", "-A"); git(tree, "commit", "-qm", msg); };
const refusal = (fn, re) => assert.throws(fn, (e) => e instanceof CrewRefusal && re.test(e.message));

test("start: main's score comes from the referee", () => {
  const { crew } = setup();
  assert.equal(status(crew).main.rate, 0.5);
});

test("land: a gain lands; a fall is refused; main never falls", () => {
  const { crew, members } = setup(), [a, b] = members;
  commit(a.tree, 0.6); assert.deepEqual(land(crew, "a").after, 0.6);
  sync(crew, "b"); commit(b.tree, 0.4); refusal(() => land(crew, "b"), /main would fall/);
  assert.equal(status(crew).main.rate, 0.6); assert.equal(status(crew).refused, 1);
  commit(b.tree, 0.6, "keeps"); assert.equal(land(crew, "b").after, 0.6); // keeping the score lands
});

test("land: uncommitted work, nothing new, and a stale base are refused", () => {
  const { crew, members } = setup(), [a, b] = members;
  refusal(() => land(crew, "a"), /nothing to land/);
  fs.writeFileSync(path.join(a.tree, "score.txt"), "0.7\n"); refusal(() => land(crew, "a"), /commit your work first/);
  git(a.tree, "commit", "-qam", "x"); land(crew, "a");
  commit(b.tree, 0.8); refusal(() => land(crew, "b"), /main has moved on/);
});

test("land: a stale lock (its holder gone) is broken; refusals release the lock", () => {
  const { crew, dir, members } = setup(), [a] = members;
  fs.mkdirSync(path.join(dir, "land.lock")); fs.writeFileSync(path.join(dir, "land.lock", "pid"), "999999");
  commit(a.tree, 0.4); refusal(() => land(crew, "a"), /main would fall/);
  assert.equal(fs.existsSync(path.join(dir, "land.lock")), false);
  commit(a.tree, 0.9); assert.equal(land(crew, "a").after, 0.9);
});

test("notes: direct and to all; unread counts until read", () => {
  const { crew } = setup();
  note(crew, "a", "b", "hello"); note(crew, "b", "all", "to everyone");
  assert.equal(unread(crew, "b"), 1); assert.equal(unread(crew, "a"), 1);
  assert.equal(readNotes(crew, "b")[0].text, "hello"); assert.equal(unread(crew, "b"), 0);
  refusal(() => note(crew, "a", "nobody", "x"), /no member/);
});

test("board: evidence and wrong-if are required; claims expire and drop", () => {
  const { crew } = setup();
  refusal(() => post(crew, "a", { kind: "finding", area: "x", text: "t", evidence: "", wrongIf: "w" }), /needs evidence/);
  post(crew, "a", { kind: "finding", area: "parser", text: "t", evidence: "e", wrongIf: "w" });
  assert.equal(board(crew, "parser").length, 1);
  claim(crew, "a", "parser", "rewriting"); claim(crew, "b", "values", "x"); dropClaim(crew, "b", "values");
  assert.deepEqual(claims(crew).map((c) => c.by), ["a"]);
  assert.equal(claims(crew, Date.now() + 41 * 60000).length, 0);
});

test("the event log is the contract: every action is a v1 event", () => {
  const { crew, members } = setup(); commit(members[0].tree, 0.7); land(crew, "a"); note(crew, "a", "b", "n");
  const types = crew.events().map((e) => e.type);
  for (const t of ["crew.start", "land", "note"]) assert.ok(types.includes(t), t);
  assert.ok(crew.events().every((e) => e.v === 1 && e.t && e.by));
});

test("the CLI: status and a refusal's exit code", () => {
  const { dir, members } = setup(); commit(members[0].tree, 0.3);
  const run = (...a) => spawnSync(process.execPath, [path.join(HERE, "..", "crew.mjs"), ...a], { encoding: "utf8", env: { ...process.env, CREW_DIR: dir, CREW_ME: "a" } });
  assert.match(run("status").stdout, /at 0\.5/);
  const r = run("land", "worse"); assert.equal(r.status, 1); assert.match(r.stderr, /main would fall/);
});

test("crew-run: a fake crew runs until every member is idle, lands, spends, and ends", async () => {
  const { dir } = setup();
  const { runCrew, recordOffboard } = await import("../crew-run.mjs");
  const { crew } = await runCrew(dir, { fake: true });
  const ev = crew.events(), types = ev.map((e) => e.type);
  assert.ok(types.includes("land") && types.includes("spend") && types.includes("idle") && types.at(-1) === "crew.end");
  assert.ok(status(crew).spent > 0);
  const kb = path.join(dir, "kb"), n = recordOffboard(kb, "T", { id: "a", model: "m" }, 'x BEGIN-KB [{"topic":"t","kind":"practice","text":"x","evidence":"e","belief":0.7}] END-KB');
  assert.equal(n, 1); assert.equal(fs.readFileSync(path.join(kb, "entries.jsonl"), "utf8").trim().split("\n").length, 1);
});
