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
  assert.equal(s.run("add", ROLE, "--run=b", "--open=QA record authorship audit pending (company/reviews/org/2026-10-17-external-assessment.md)").status, 0);
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
  assert.equal(s.run("add", ROLE, "--run=z", "--learned=cited (company/roles/memory/README.md)").status, 0);
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

// ---- citations resolve (assessment 2026-10-17 §2): a path must exist; a board id not on the board warns
test("validateEntry: a path citation must exist; commit shas pass as they are; W-n off the board only warns", async () => {
  const m = await import("../../tools/memory.mjs");
  const board = new Set(["W-1"]);
  // The assessment's example: accepted before, refused now.
  assert.match(m.validateEntry(["- learned: x (company/does-not-exist.md)"], { board }).join("\n"), /cites company\/does-not-exist\.md, which does not exist/);
  for (const ok of [
    "- learned: x (tools/memory.mjs)",
    "- learned: x (tools/memory.mjs:12-30)",
    "- learned: x (company/roles/memory/README.md#layout).",
    "- learned: x (tests/memory/)",
    "- learned: the root rules (CLAUDE.md)",
    "- know: a commit c08e3162 that is not looked up",
    "- open: board item W-1",
  ]) assert.deepEqual(m.checkEntry([ok], { board }), { errors: [], warnings: [] }, ok);
  assert.match(m.validateEntry(["- learned: bare name only (memory.mjs)"], { board }).join("\n"), /cites memory\.mjs, which does not exist/, "a bare file name resolves at the repo root");
  assert.match(m.validateEntry(["- learned: and/or is prose, not a path"], { board }).join("\n"), /must cite a file/);
  assert.deepEqual(m.validateEntry(["- did: did lines need no citation"], { board }), []);
  const w = m.checkEntry(["- open: board item W-999999 (tools/memory.mjs)"], { board });
  assert.deepEqual(w.errors, []);
  assert.match(w.warnings.join("\n"), /cites W-999999, which is not on company\/ops\/board\.json/);
  assert.match(m.validateEntry(["- learned: one good, one broken (tools/memory.mjs, company/nope.md)"], { board }).join("\n"), /company\/nope\.md/, "every path cited must exist");
});

test("add: a missing path is refused (exit 1, nothing written); an unknown board id warns and writes", () => {
  const s = sandbox();
  const bad = s.run("add", ROLE, "--run=bad", "--learned=x (company/does-not-exist.md)");
  assert.equal(bad.status, 1);
  assert.match(bad.stderr, /does not exist in this checkout/);
  const runFiles = () => (fs.existsSync(path.join(s.dir, ROLE)) ? fs.readdirSync(path.join(s.dir, ROLE)).filter((f) => f.endsWith(".md")) : []);
  assert.deepEqual(runFiles(), []);
  const warn = s.run("add", ROLE, "--run=warn", "--open=waits on W-999999 (company/roles/memory/README.md)");
  assert.equal(warn.status, 0, warn.stderr);
  assert.match(warn.stderr, /warn: memory: .*W-999999, which is not on company\/ops\/board\.json/);
  assert.equal(runFiles().length, 1);
});

// ---- read --craft-only (assessment 2026-10-17 §2; the evaluation-steward rules when it is required)
test("read --craft-only leaves out lines naming a lesson slug, a lesson's review folder or a prior verdict", () => {
  const s = sandbox();
  const slug = "children-dying-before-five"; // a real lesson folder under src/demos/
  assert.ok(fs.existsSync(path.join(ROOT, "src/demos/history", slug, "meta.json")));
  const text = fs.readFileSync(s.file, "utf8").replace("## Lessons\n", `## Lessons\n\n- 2026-10-15 · Open the source before marking a claim (company/roles/memory/README.md)\n- 2026-10-15 · ${slug} c3 needed the 1950 series (company/roles/memory/README.md)\n`);
  fs.writeFileSync(s.file, text);
  const add = (...a) => { const r = s.run("add", ROLE, ...a); assert.equal(r.status, 0, r.stderr); };
  add("--run=r1", "--did=QA pass", `--learned=the r2 result on ${slug} needs a second look (company/roles/memory/README.md)`, "--know=check focus order before contrast (tests/memory/memory.test.mjs)");
  add("--run=r2", "--learned=findings sit in the lesson folder (company/reviews/head-on-is-a-wall/)");
  add("--run=r3", "--learned=the launch verdict held the lesson (company/roles/memory/README.md)");
  const full = s.run("read", ROLE).stdout;
  const craft = s.run("read", ROLE, "--craft-only");
  assert.equal(craft.status, 0, craft.stderr);
  assert.match(full, new RegExp(slug));
  assert.match(full, /launch verdict/);
  assert.doesNotMatch(craft.stdout, new RegExp(slug), "no line naming the lesson");
  assert.doesNotMatch(craft.stdout, /launch verdict/, "no prior verdict");
  assert.doesNotMatch(craft.stdout, /company\/reviews\/head-on/, "no lesson review folder");
  assert.match(craft.stdout, /Open the source before marking a claim/, "craft lessons stay");
  assert.match(craft.stdout, /check focus order before contrast/, "craft lines of a mixed entry stay");
  assert.match(craft.stdout, /- did: QA pass/);
  assert.doesNotMatch(craft.stdout, /· r2 ·|· r3 ·/, "an entry with nothing left goes, heading and all");
  assert.match(craft.stdout, /## Lessons[\s\S]*## Entries/, "section headings stay");
  assert.match(craft.stdout, /read --craft-only: 4 line\(s\) naming a lesson slug/);
});

test("craftOnlyText is pure: the header is never filtered; one-word slugs match only as paths", async () => {
  const m = await import("../../tools/memory.mjs");
  const t = "# Memory: x\n\nThe verdict words in the header stay.\n\n## Lessons\n\n- a overfitting lesson about craft (tools/memory.mjs)\n- src/demos/ai/overfitting/ notes (tools/memory.mjs)\n- go-with-changes was ruled (tools/memory.mjs)\n";
  const r = m.craftOnlyText(t, new Set(["overfitting", "head-on-is-a-wall"]));
  assert.match(r.text, /The verdict words in the header stay/);
  assert.match(r.text, /a overfitting lesson about craft/, "a one-word slug is an ordinary word in prose");
  assert.doesNotMatch(r.text, /src\/demos/);
  assert.doesNotMatch(r.text, /go-with-changes/);
  assert.equal(r.omitted, 2);
});
