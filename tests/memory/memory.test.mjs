// F-39 memory: threshold (50 KB), compaction (target 25 KB, archive, citations kept), append-safety, check warns only.
// Run: node --test tests/memory/*.test.mjs
import { test } from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import { spawnSync, spawn } from "node:child_process";
import { fileURLToPath } from "node:url";
import { MEMORY_POLICY as P } from "../../tools/org/memory-policy.mjs";

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "../..");
const CLI = path.join(ROOT, "tools/memory.mjs");
const ROLE = "qa-tester";
const DATE = "2026-10-16";

function sandbox() {
  const dir = fs.mkdtempSync(path.join(os.tmpdir(), "s3-memory-"));
  const env = { ...process.env, S3_MEMORY_DIR: dir, S3_MEMORY_DATE: DATE };
  const run = (...args) => spawnSync(process.execPath, [CLI, ...args], { env, encoding: "utf8" });
  assert.equal(run("init", ROLE).status, 0);
  return { dir, env, run, file: path.join(dir, `${ROLE}.md`), archive: path.join(dir, `${ROLE}.archive-${DATE}.md`) };
}

// Fill the Entries section with dated narrative entries (each with a cited lesson) up to `bytes`.
function fill(file, bytes) {
  let text = fs.readFileSync(file, "utf8");
  let i = 0;
  const entry = (n) =>
    `\n### 2026-10-${String(1 + (n % 15)).padStart(2, "0")} · fill-${n} · ${ROLE}\n- did: ran narrative pass ${n} ${"x".repeat(300)}\n- learned: lesson number ${n} holds (company/reviews/org/fill-${n}.md)\n`;
  while (Buffer.byteLength(text + entry(i)) < bytes) text += entry(i++);
  // Pad the last narrative line so the file is exactly `bytes` long.
  const gap = bytes - Buffer.byteLength(text);
  text = text.replace(/(- did: ran narrative pass \d+ x+)(?![\s\S]*- did:)/, (m) => m + "x".repeat(gap));
  assert.equal(Buffer.byteLength(text), bytes);
  fs.writeFileSync(file, text);
  return i;
}

const NEW = ["--run=final", "--did=checked the threshold", "--learned=the newest lesson stays (tests/memory/memory.test.mjs)"];

test("just under the threshold: add writes its own run file and does not compact", () => {
  const s = sandbox();
  fill(s.file, P.maxBytes - 1024); // 1 KB under; the new entry (~150 bytes) keeps it under
  const before = fs.readFileSync(s.file, "utf8");
  const r = s.run("add", ROLE, ...NEW);
  assert.equal(r.status, 0, r.stderr);
  assert.equal(fs.readFileSync(s.file, "utf8"), before, "memory file untouched");
  assert.ok(!fs.existsSync(s.archive), "no archive");
  assert.ok(fs.existsSync(path.join(s.dir, ROLE, `${DATE}-final.md`)));
  assert.match(s.run("read", ROLE).stdout, /Unmerged run entries \(1/);
});

test("just over the threshold: add compacts first, writes the archive, keeps cited lessons, lands under the target", () => {
  const s = sandbox();
  const n = fill(s.file, P.maxBytes + 1);
  assert.equal(fs.statSync(s.file).size, P.maxBytes + 1);
  const r = s.run("add", ROLE, ...NEW);
  assert.equal(r.status, 0, r.stderr);
  assert.match(r.stdout, /compacted/);
  const mem = fs.readFileSync(s.file, "utf8");
  assert.ok(Buffer.byteLength(mem) <= P.targetBytes, `memory is ${Buffer.byteLength(mem)} bytes`);
  assert.ok(fs.existsSync(s.archive), "archive written");
  const arch = fs.readFileSync(s.archive, "utf8");
  // Every lesson survives with its citation: in the Lessons section if its entry was archived, else in its entry.
  for (let i = 0; i < n; i++) assert.ok(mem.includes(`lesson number ${i} holds (company/reviews/org/fill-${i}.md)`), `lesson ${i} kept with citation`);
  // Narrative moved to the archive, nothing lost.
  assert.match(arch, /did: ran narrative pass 0 /);
  for (let i = 0; i < n; i++) assert.ok(mem.includes(`fill-${i} ·`) || arch.includes(`fill-${i} ·`), `entry ${i} is somewhere`);
  const lessons = mem.split("## Lessons")[1].split("## Mistakes")[0];
  assert.match(lessons, /^- 2026-10-\d\d · lesson number 0 holds \(company\/reviews\/org\/fill-0\.md\)$/m, "lifted lessons are dated");
  // The new run's entry is its own file, written after the compaction.
  assert.ok(fs.existsSync(path.join(s.dir, ROLE, `${DATE}-final.md`)));
});

test("over the threshold with --no-compact: add refuses with 'compact first'", () => {
  const s = sandbox();
  fill(s.file, P.maxBytes + 1024);
  const r = s.run("add", ROLE, ...NEW, "--no-compact");
  assert.equal(r.status, 1);
  assert.match(r.stderr, /compact first/);
  assert.ok(!fs.existsSync(path.join(s.dir, ROLE, `${DATE}-final.md`)));
});

test("check warns on a file over the threshold and on a missing file, and never fails", () => {
  const s = sandbox();
  fill(s.file, P.maxBytes + 1024);
  const r = s.run("check");
  assert.equal(r.status, 0);
  assert.match(r.stdout, new RegExp(`warn: memory: .*${ROLE}\\.md: \\d+ KB is over the 50 KB threshold`));
  assert.match(r.stdout, /warn: memory: .*demo-builder\.md: missing/);
});

test("compaction archives closed open threads and keeps open ones", () => {
  const s = sandbox();
  assert.equal(s.run("add", ROLE, "--run=a", "--open=walkthrough timeouts on the shared host (W-1200)").status, 0);
  assert.equal(s.run("add", ROLE, "--run=b", "--open=QA record authorship audit pending (company/reviews/org/x.md)").status, 0);
  assert.equal(s.run("add", ROLE, "--run=c", "--closed=walkthrough timeouts on the shared host (W-1200)").status, 0);
  assert.equal(s.run("compact", ROLE, "--force").status, 0);
  const mem = fs.readFileSync(s.file, "utf8");
  const open = mem.split("## Open threads")[1].split("## Entries")[0];
  assert.match(open, /QA record authorship audit pending/);
  assert.doesNotMatch(open, /walkthrough timeouts/);
  assert.match(fs.readFileSync(s.archive, "utf8"), /walkthrough timeouts/);
  assert.deepEqual(fs.readdirSync(path.join(s.dir, ROLE)).filter((f) => f.endsWith(".md")), [], "run files merged");
});

test("entries: at most 12 lines, and lessons must cite a file", () => {
  const s = sandbox();
  const many = Array.from({ length: 13 }, (_, i) => `--did=step ${i}`);
  assert.match(s.run("add", ROLE, "--run=x", ...many).stderr, /cap is 12/);
  assert.match(s.run("add", ROLE, "--run=y", "--learned=no source here").stderr, /must cite a file/);
  assert.equal(s.run("add", ROLE, "--run=z", "--learned=cited (company/x.md)").status, 0);
});

test("parallel runs of one role never write the same file", async () => {
  const s = sandbox();
  const N = 8;
  const codes = await Promise.all(
    Array.from({ length: N }, (_, i) =>
      new Promise((res) => spawn(process.execPath, [CLI, "add", ROLE, "--run=same-key", `--did=parallel ${i}`], { env: s.env }).on("exit", res)),
    ),
  );
  assert.deepEqual(codes, Array(N).fill(0));
  const files = fs.readdirSync(path.join(s.dir, ROLE)).filter((f) => f.endsWith(".md"));
  assert.equal(files.length, N);
  const all = files.map((f) => fs.readFileSync(path.join(s.dir, ROLE, f), "utf8")).join("\n");
  for (let i = 0; i < N; i++) assert.ok(all.includes(`parallel ${i}`));
  assert.equal(s.run("compact", ROLE).status, 0);
  const mem = fs.readFileSync(s.file, "utf8");
  for (let i = 0; i < N; i++) assert.ok(mem.includes(`parallel ${i}`), `entry ${i} merged`);
});
