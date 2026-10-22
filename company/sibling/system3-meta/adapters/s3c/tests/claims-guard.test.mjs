// Tests for adapters/s3c/claims-guard.mjs (plan 2026-10-21-m4-m7-plan.md §4 row claims-guard; §M5 exit criterion 1
// "a fact-checker changing claim text (claims-guard refuse)"). Every case runs the real CLI against a temp git repo
// holding a fake lesson: just enough of a company checkout for the guard (tools/company.mjs carrying cmdCheck's two
// claim-enum lines, protected-paths.txt, one lesson, its reviews folder, board.json). Nothing touches a real repo.
// Run: node --test company/sibling/system3-meta/adapters/s3c/tests/

import { test } from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import { spawnSync, execFileSync } from "node:child_process";
import { fileURLToPath } from "node:url";
import { rowIds, recordRows, judgeMeta, same, protectedMatcher } from "../claims-guard.mjs";

const HERE = path.dirname(fileURLToPath(import.meta.url));
const GUARD = path.join(HERE, "..", "claims-guard.mjs");
const TODAY = "2026-10-21";
const SLUG = "fake-lesson";
const META = `src/demos/math/${SLUG}/meta.json`;
const REC = `company/reviews/${SLUG}/${TODAY}-fact-check.md`;
// The guard runs the company's own readiness loadContext (evidenceProbe), so the fixture carries the real lib.
const READINESS = "/home/user/s3c-wt/base/tools/lib/readiness.mjs";

const sh = (cwd, ...args) => execFileSync("git", args, { cwd, encoding: "utf8", stdio: ["ignore", "pipe", "pipe"] }).trim();
const readJSON = (p) => JSON.parse(fs.readFileSync(p, "utf8"));
const writeJSON = (p, v) => fs.writeFileSync(p, JSON.stringify(v, null, 2) + "\n");

function baseMeta() {
  const c = (n, extra = {}) => ({ id: `math.${SLUG}.c${n}`, text: `Claim ${n} is true.`, support: "derivation", source: "own arithmetic", status: "unverified", ...extra });
  return {
    slug: SLUG,
    title: "Fake lesson",
    hook: "Is it?",
    domain: "math",
    status: "review",
    owner: { categoryManager: "cm-math", builder: "demo-builder" },
    claims: [c(1), c(2, { address: "Demo.tsx reveal" }), c(3, { status: "verified", checkedBy: "fact-checker", checkedOn: "2026-10-01", note: "old check" })],
    evidence: { qa: [], simulatedLearner: [], pairwise: [], humanLearners: [] },
    version: 2,
  };
}

/** A fresh temp company with the lesson committed; returns {dir, base}. */
function fixture() {
  const dir = fs.mkdtempSync(path.join(os.tmpdir(), "claims-guard-"));
  const w = (rel, text) => {
    fs.mkdirSync(path.dirname(path.join(dir, rel)), { recursive: true });
    fs.writeFileSync(path.join(dir, rel), text);
  };
  // The two lines schemaDrift() looks for, verbatim from tools/company.mjs cmdCheck.
  w("tools/company.mjs", '// fake\nif (!["derivation", "simulation", "source", "convention"].includes(c.support)) err();\nif (!["unverified", "verified", "disputed", "withdrawn"].includes(c.status)) err();\n');
  w("company/constitution/protected-paths.txt", "# test\ntools/company.mjs\ntests/qa/**\n");
  w(META, JSON.stringify(baseMeta(), null, 2) + "\n");
  w(`src/demos/math/${SLUG}/Demo.tsx`, "export default function Demo() { return <Lesson />; }\n");
  w(`company/reviews/${SLUG}/build.md`, "## Pre-flight v2\n");
  w("company/ops/board.json", '{"items":[]}\n');
  w("tools/lib/readiness.mjs", fs.readFileSync(READINESS, "utf8"));
  w(`company/reviews/${SLUG}/2026-10-01-learner-review.md`, "lesson version: v2\nVerdict: revise\n");
  w(".gitignore", "artifacts/\n");
  sh(dir, "init", "-q", "-b", "main");
  sh(dir, "-c", "user.email=t@t", "-c", "user.name=t", "add", "-A");
  sh(dir, "-c", "user.email=t@t", "-c", "user.name=t", "commit", "-qm", "base");
  return { dir, base: sh(dir, "rev-parse", "HEAD") };
}

function run(dir, base, ...extra) {
  const r = spawnSync(process.execPath, [GUARD, SLUG, `--base=${base}`, `--today=${TODAY}`, `--repo=${dir}`, ...extra], { encoding: "utf8", timeout: 30_000 });
  const last = r.stdout.trim().split("\n").at(-1);
  return { exit: r.status, json: JSON.parse(last), stdout: r.stdout, stderr: r.stderr };
}

/** The fact-checker's edit: set statuses (and anything else) on the working-tree meta.json. */
function edit(dir, fn) {
  const p = path.join(dir, META);
  const m = readJSON(p);
  fn(m);
  writeJSON(p, m);
}
function record(dir, rows, name = REC) {
  const p = path.join(dir, name);
  fs.mkdirSync(path.dirname(p), { recursive: true });
  // A row is "c1" (verdict verified) or "c3:unverified" (that verdict word in the second cell).
  const row = (r) => (r.includes(":") ? `| ${r.split(":")[0]} | ${r.split(":")[1]} | own |` : `| ${r} | verified | own |`);
  fs.writeFileSync(p, `# Fact-check: ${SLUG}\n\n| id | status | basis |\n|---|---|---|\n${rows.map(row).join("\n")}\n`);
}
const verifyAll = (m) => m.claims.forEach((c) => (c.status = "verified"));
const claim = (dir, n) => readJSON(path.join(dir, META)).claims[n - 1];

// ------------------------------------------------------------------ unit

test("rowIds: short and full ids, lists, ranges, prose after, c1 is not c10, non-table lines ignored", () => {
  const ids = Array.from({ length: 12 }, (_, i) => `math.x.c${i + 1}`);
  const t = ["| c1 | verified | a |", "| **c2** | v |", "| `math.x.c3` | v |", "| c4, c5 | v |", "| c6-c8 | v |", "| c9 sum of odd numbers | v |", "c11 in prose, not a row", "| c10x | v |"].join("\n");
  assert.deepEqual([...rowIds(t, ids)].sort(), ["math.x.c1", "math.x.c2", "math.x.c3", "math.x.c4", "math.x.c5", "math.x.c6", "math.x.c7", "math.x.c8", "math.x.c9"].sort());
  assert.ok(!rowIds("| c10 | v |", ["math.x.c1"]).has("math.x.c1"));
  assert.ok(!rowIds("| other.lesson.c1 | v |", ["math.x.c1"]).has("math.x.c1"), "another lesson's full id is not this one's row");
});

test("same() compares JSON as data (key order free), protectedMatcher reads the globs", () => {
  assert.ok(same({ a: 1, b: [1, { c: 2 }] }, { b: [1, { c: 2 }], a: 1 }));
  assert.ok(!same({ a: 1 }, { a: 1, b: undefined }));
  const { dir } = fixture();
  const p = protectedMatcher(dir);
  assert.ok(p("tests/qa/contract.spec.ts") && p("tools/company.mjs") && !p("tools/other.mjs"));
});

test("judgeMeta: stamps changed, clears reset, restores typed signatures, strips them from new claims", () => {
  const b = baseMeta();
  const c = structuredClone(b);
  c.claims[0].status = "verified";
  c.claims[0].checkedBy = "demo-builder"; // typed by the agent: overwritten
  c.claims[1].checkedOn = "2026-01-01"; // status unchanged: restored (deleted, base had none)
  c.claims[2].status = "unverified"; // reset: cleared
  c.claims.push({ id: `math.${SLUG}.c4`, text: "New.", support: "source", source: "x", status: "unverified", checkedBy: "fact-checker" });
  const j = judgeMeta(b, c, { today: TODAY, slug: SLUG });
  assert.deepEqual(j.refusals, []);
  assert.deepEqual([j.next.claims[0].checkedBy, j.next.claims[0].checkedOn], ["fact-checker", TODAY]);
  assert.ok(!("checkedOn" in j.next.claims[1]));
  assert.ok(!("checkedBy" in j.next.claims[2]) && !("checkedOn" in j.next.claims[2]));
  assert.ok(!("checkedBy" in j.next.claims[3]));
  assert.deepEqual(j.changedIds, [`math.${SLUG}.c1`, `math.${SLUG}.c3`, `math.${SLUG}.c4`]);
  assert.equal(j.notes.length, 1);
});

// ------------------------------------------------------------------ CLI against a temp git repo

test("pass: all claims verified + a row each → exit 0, code-stamped meta.json written", () => {
  const { dir, base } = fixture();
  edit(dir, verifyAll);
  record(dir, ["c1", "c2"]); // c3 was already verified: unchanged status, no row needed
  const r = run(dir, base);
  assert.equal(r.exit, 0, r.stdout);
  assert.equal(r.json.ok, true);
  assert.equal(r.json.verdict, "pass");
  assert.equal(r.json.wrote, META);
  assert.deepEqual([claim(dir, 1).checkedBy, claim(dir, 1).checkedOn], ["fact-checker", TODAY]);
  assert.deepEqual([claim(dir, 3).checkedBy, claim(dir, 3).checkedOn], ["fact-checker", "2026-10-01"], "inherited signature untouched");
  assert.deepEqual(r.json.stamps.map((s) => s.action), ["stamped", "stamped"]);
  const again = run(dir, base);
  assert.equal(again.exit, 0);
  assert.equal(again.json.wrote, null, "idempotent: the second run has nothing to write");
});

test("committed edits on top of base count the same as working-tree edits", () => {
  const { dir, base } = fixture();
  edit(dir, verifyAll);
  record(dir, ["c1", "c2"]);
  sh(dir, "-c", "user.email=t@t", "-c", "user.name=t", "add", "-A");
  sh(dir, "-c", "user.email=t@t", "-c", "user.name=t", "commit", "-qm", "check");
  const r = run(dir, base);
  assert.equal(r.exit, 0, r.stdout);
  assert.deepEqual(r.json.records, [REC]);
  assert.equal(claim(dir, 1).checkedBy, "fact-checker");
});

test("claim text changed → refuse, nothing written (M5: a fact-checker changing claim text)", () => {
  const { dir, base } = fixture();
  edit(dir, (m) => {
    verifyAll(m);
    m.claims[0].text = "Claim 1 is truer.";
  });
  record(dir, ["c1", "c2"]);
  const before = fs.readFileSync(path.join(dir, META), "utf8");
  const r = run(dir, base);
  assert.equal(r.exit, 1);
  assert.equal(r.json.refused, true);
  assert.equal(r.json.route, "check");
  assert.match(r.json.findings.map((f) => f.message).join("\n"), /c1 "text" changed/);
  assert.equal(fs.readFileSync(path.join(dir, META), "utf8"), before, "a refusal writes nothing");
  assert.equal(claim(dir, 1).checkedBy, undefined);
});

test("other frozen fields refuse: a non-claim meta key, a claim's source/address, a removed or reordered claim", () => {
  for (const [what, fn, re] of [
    ["hook", (m) => (m.hook = "Is it really?"), /meta\.json "hook" changed/],
    ["address", (m) => (m.claims[1].address = "elsewhere"), /c2 "address" changed/],
    ["source", (m) => (m.claims[1].source = "a book"), /c2 "source" changed/],
    ["removed", (m) => m.claims.splice(1, 1), /claim math\.fake-lesson\.c2 removed/],
    ["reordered", (m) => m.claims.reverse(), /claims reordered/],
  ]) {
    const { dir, base } = fixture();
    edit(dir, fn);
    record(dir, ["c1", "c2", "c3"]);
    const r = run(dir, base);
    assert.equal(r.exit, 1, what);
    assert.match(r.json.findings.map((f) => f.message).join("\n"), re, what);
  }
});

test("paths outside the write set refuse, each with the company's reason", () => {
  const cases = [
    [`src/demos/math/${SLUG}/Demo.tsx`, /may not edit code or claim text/],
    ["company/ops/board.json", /single-writer file/],
    ["tools/company.mjs", /protected path/],
    [`company/reviews/${SLUG}/build.md`, /existing review file/],
    ["company/roles/memory/fact-checker/2026-10-21-x.md", /room leave --learned/],
    ["notes.txt", /outside the fact-checker's write set/],
  ];
  for (const [rel, re] of cases) {
    const { dir, base } = fixture();
    edit(dir, verifyAll);
    record(dir, ["c1", "c2"]);
    fs.mkdirSync(path.dirname(path.join(dir, rel)), { recursive: true });
    fs.appendFileSync(path.join(dir, rel), "\n// touched\n");
    const r = run(dir, base);
    assert.equal(r.exit, 1, rel);
    const f = r.json.findings.find((x) => x.message.startsWith(rel));
    assert.ok(f, `${rel}: ${r.stdout}`);
    assert.match(f.message, re);
    assert.equal(claim(dir, 1).checkedBy, undefined, `${rel}: nothing stamped`);
  }
});

test("deleting meta.json or a review file refuses; ignored files (artifacts/) are not the guard's business", () => {
  const { dir, base } = fixture();
  fs.rmSync(path.join(dir, `company/reviews/${SLUG}/build.md`));
  fs.mkdirSync(path.join(dir, `artifacts/walkthroughs/${SLUG}`), { recursive: true });
  fs.writeFileSync(path.join(dir, `artifacts/walkthroughs/${SLUG}/transcript.md`), "x");
  fs.symlinkSync(os.tmpdir(), path.join(dir, "node_modules")); // K5's symlink: `node_modules/` in .gitignore misses it
  edit(dir, verifyAll);
  record(dir, ["c1", "c2"]);
  const r = run(dir, base);
  assert.equal(r.exit, 1);
  assert.deepEqual(r.json.findings.filter((f) => f.kind === "diff").map((f) => f.message.split(" (")[0]), [`company/reviews/${SLUG}/build.md`]);
  const d = fixture();
  fs.rmSync(path.join(d.dir, META));
  const r2 = run(d.dir, d.base);
  assert.equal(r2.exit, 1);
  assert.match(r2.stdout, /meta\.json \(deleted\)/);
});

test("record: missing → refuse; missing a row for a changed id → refuse naming it; extra scratch files are fine", () => {
  const { dir, base } = fixture();
  edit(dir, verifyAll);
  let r = run(dir, base);
  assert.equal(r.exit, 1);
  assert.match(r.stdout, /no new company\/reviews\/fake-lesson\/<date>-fact-check\.md/);
  record(dir, ["c1"]);
  fs.mkdirSync(path.join(dir, `company/reviews/${SLUG}/fc-${TODAY}`), { recursive: true });
  fs.writeFileSync(path.join(dir, `company/reviews/${SLUG}/fc-${TODAY}/own.py`), "print(1)\n");
  r = run(dir, base);
  assert.equal(r.exit, 1);
  assert.match(r.stdout, /no table row for changed claim\(s\) math\.fake-lesson\.c2/);
  record(dir, ["c2"], `company/reviews/${SLUG}/${TODAY}-fact-check-lane-b.md`); // rows may span this run's records
  r = run(dir, base);
  assert.equal(r.exit, 0, r.stdout);
});

test("a record dated another day is advisory, not a refusal", () => {
  const { dir, base } = fixture();
  edit(dir, verifyAll);
  record(dir, ["c1", "c2"], `company/reviews/${SLUG}/2026-10-20-fact-check.md`);
  const r = run(dir, base);
  assert.equal(r.exit, 0);
  assert.ok(r.json.findings.some((f) => f.severity === "advisory" && /dated 2026-10-20/.test(f.message)));
});

test("reset to unverified clears checkedBy/checkedOn; held claim leaves the floor open, routed to check", () => {
  const { dir, base } = fixture();
  edit(dir, (m) => {
    m.claims[0].status = "verified";
    m.claims[1].note = "HELD: host blocked at the proxy";
    m.claims[2].status = "unverified";
  });
  record(dir, ["c1", "c3:held"]);
  const r = run(dir, base);
  assert.equal(r.exit, 1, "no --verdict: an open floor is a revise");
  assert.equal(r.json.refused, false);
  assert.equal(r.json.route, "check");
  assert.ok(!("checkedBy" in claim(dir, 3)) && !("checkedOn" in claim(dir, 3)), "c3 cleared");
  assert.match(r.json.floor.open.join("\n"), /c2 still unverified \(held: note changed\)/);
  assert.equal(r.json.wrote, META, "stamps are written even when the floor is open");
});

test("disputed: plain run is revise→build; --verdict=revise lets the leave through; --verdict=pass refuses", () => {
  const { dir, base } = fixture();
  edit(dir, (m) => {
    verifyAll(m);
    m.claims[1].status = "disputed";
    m.claims[1].note = "should say 'about 3'";
  });
  record(dir, ["c1", "c2:disputed"]);
  let r = run(dir, base);
  assert.equal(r.exit, 1);
  assert.equal(r.json.route, "build");
  assert.deepEqual([claim(dir, 2).checkedBy, claim(dir, 2).checkedOn], ["fact-checker", TODAY], "disputed is a status change: stamped");
  r = run(dir, base, "--verdict=revise");
  assert.equal(r.exit, 0);
  assert.equal(r.json.verdict, "revise");
  assert.equal(r.json.route, "build");
  assert.ok(r.json.findings.every((f) => f.severity === "advisory"));
  r = run(dir, base, "--verdict=pass");
  assert.equal(r.exit, 1);
  assert.match(r.stdout, /verdict pass, but the claim floor is open/);
});

test("new claim: recorded as unverified is allowed (floor open → check); recorded as verified or off-schema refuses", () => {
  const add = (extra) => (m) => {
    verifyAll(m);
    m.claims.push({ id: `math.${SLUG}.c4`, text: "An unrecorded sentence.", support: "derivation", source: "Demo.tsx reveal", status: "unverified", ...extra });
  };
  let { dir, base } = fixture();
  edit(dir, add({}));
  record(dir, ["c1", "c2", "c4:unverified"]);
  let r = run(dir, base);
  assert.equal(r.exit, 1);
  assert.equal(r.json.refused, false);
  assert.equal(r.json.route, "check");
  assert.match(r.json.floor.open[0], /c4 recorded by this check as unverified/);
  for (const [extra, re] of [
    [{ status: "verified" }, /new claim math\.fake-lesson\.c4 is "verified"/],
    [{ support: "textbook" }, /bad support textbook/],
    [{ source: " " }, /has no source/],
    [{ id: "math.other.c4" }, /must start with math\.fake-lesson\./],
  ]) {
    ({ dir, base } = fixture());
    edit(dir, add(extra));
    record(dir, ["c1", "c2", "c4"]);
    r = run(dir, base);
    assert.equal(r.exit, 1);
    assert.equal(r.json.refused, true);
    assert.match(r.stdout, re);
  }
});

test("--dry-run judges and reports stamps but writes nothing", () => {
  const { dir, base } = fixture();
  edit(dir, verifyAll);
  record(dir, ["c1", "c2"]);
  const r = run(dir, base, "--dry-run");
  assert.equal(r.exit, 0);
  assert.equal(r.json.wrote, null);
  assert.equal(r.json.stamps.length, 2);
  assert.equal(claim(dir, 1).checkedBy, undefined);
});

test("a whitespace-only meta.json reformat is not a change, and base bytes are restored", () => {
  const { dir, base } = fixture();
  const p = path.join(dir, META);
  const orig = fs.readFileSync(p, "utf8");
  fs.writeFileSync(p, JSON.stringify(JSON.parse(orig)) + "\n");
  record(dir, []);
  const r = run(dir, base);
  assert.equal(r.exit, 1, "floor still open (c1, c2 unverified)");
  assert.equal(r.json.refused, false);
  assert.equal(fs.readFileSync(p, "utf8"), orig);
});

test("usage is exit 2; a base without the lesson or a drifted company schema is exit 3", () => {
  const { dir, base } = fixture();
  const cli = (...a) => spawnSync(process.execPath, [GUARD, ...a], { encoding: "utf8" });
  assert.equal(cli(SLUG, `--repo=${dir}`).status, 2, "no --base");
  assert.equal(cli(`--base=${base}`, `--repo=${dir}`).status, 2, "no slug");
  assert.equal(cli(SLUG, "--base=nope", `--repo=${dir}`).status, 2);
  assert.equal(cli(SLUG, `--base=${base}`, "--verdict=maybe", `--repo=${dir}`).status, 2);
  assert.equal(cli(SLUG, `--base=${base}`, "--bogus", `--repo=${dir}`).status, 2);
  assert.equal(cli("other-lesson", `--base=${base}`, `--repo=${dir}`).status, 3);
  fs.writeFileSync(path.join(dir, "tools/company.mjs"), "// the enums moved\n");
  const r = run(dir, base);
  assert.equal(r.exit, 3);
  assert.match(r.stdout, /update claims-guard\.mjs SUPPORTS\/STATUSES/);
  // The real company still carries the lines (read-only check of the sandbox, if present).
  const real = "/home/user/s3c-wt/base/tools/company.mjs";
  if (fs.existsSync(real)) {
    const src = fs.readFileSync(real, "utf8");
    assert.ok(src.includes('["derivation", "simulation", "source", "convention"].includes(c.support)') && src.includes('["unverified", "verified", "disputed", "withdrawn"].includes(c.status)'));
  }
});

// ------------------------------------------------------------------ review 2026-10-22 findings

test("planted gate evidence refuses: a learner review, a QA record, a QA-named record, an info/exclude-hidden file", () => {
  // The fixture's base already has 2026-10-01-learner-review.md (verdict revise); it is base's, so it is not refused.
  const cases = [
    [`company/reviews/${SLUG}/${TODAY}-learner-forged.md`, "lesson version: v2\nVerdict: launch\n", /learner review or QA record/],
    [`company/reviews/${SLUG}/${TODAY}-qa.md`, "lesson version: v2 · result: **pass**\n", /learner review or QA record/],
    [`company/reviews/${SLUG}/${TODAY}-fact-check-qa.md`, "| c1 | verified | x |\n", /learner review or QA record/],
    [`company/reviews/${SLUG}/${TODAY}-notes.md`, "scratch\n", /only <date>-fact-check\*\.md records and scratch/],
  ];
  for (const [rel, text, re] of cases) {
    const { dir, base } = fixture();
    edit(dir, verifyAll);
    record(dir, ["c1", "c2"]);
    fs.writeFileSync(path.join(dir, rel), text);
    const r = run(dir, base, "--verdict=pass");
    assert.equal(r.exit, 1, rel);
    const f = r.json.findings.find((x) => x.message.startsWith(rel));
    assert.ok(f, `${rel}: ${r.stdout}`);
    assert.match(f.message, re);
    assert.equal(claim(dir, 1).checkedBy, undefined, `${rel}: nothing stamped`);
  }
  // Hidden from `git ls-files --exclude-standard` by .git/info/exclude: still listed, and the probe names it too.
  const { dir, base } = fixture();
  edit(dir, verifyAll);
  record(dir, ["c1", "c2"]);
  const forged = `company/reviews/${SLUG}/${TODAY}-learner-forged.md`;
  fs.writeFileSync(path.join(dir, forged), "lesson version: v2\nVerdict: launch\n");
  fs.appendFileSync(path.join(dir, ".git/info/exclude"), "*learner-forged*\n");
  assert.ok(!sh(dir, "status", "--porcelain").includes("learner-forged"), "git status no longer shows it");
  const r = run(dir, base, "--verdict=pass");
  assert.equal(r.exit, 1, r.stdout);
  assert.ok(r.json.findings.some((x) => x.message.startsWith(forged)), r.stdout);
});

test("scratch under fc-<date>/ is allowed, even with evidence-looking names (loadContext does not recurse)", () => {
  const { dir, base } = fixture();
  edit(dir, verifyAll);
  record(dir, ["c1", "c2"]);
  fs.mkdirSync(path.join(dir, `company/reviews/${SLUG}/fc-${TODAY}-v2`), { recursive: true });
  fs.writeFileSync(path.join(dir, `company/reviews/${SLUG}/fc-${TODAY}-v2/learner-notes.md`), "Verdict: launch\n");
  const r = run(dir, base, "--verdict=pass");
  assert.equal(r.exit, 0, r.stdout);
});

test("index bits that hide an edit (skip-worktree, assume-unchanged) refuse", () => {
  for (const flag of ["--skip-worktree", "--assume-unchanged"]) {
    const { dir, base } = fixture();
    const demo = `src/demos/math/${SLUG}/Demo.tsx`;
    sh(dir, "update-index", flag, demo);
    fs.appendFileSync(path.join(dir, demo), "// hidden edit\n");
    edit(dir, verifyAll);
    record(dir, ["c1", "c2"]);
    const r = run(dir, base, "--verdict=pass");
    assert.equal(r.exit, 1, flag);
    assert.ok(r.json.findings.some((x) => x.message.startsWith(`${demo} (assume-unchanged/skip-worktree)`)), `${flag}: ${r.stdout}`);
  }
});

test("rows for non-c<N> ids (.recall, .world): short or full id, alone, in a list or with prose after", () => {
  const ids = ["books.x.c1", "books.x.recall", "books.x.world", "books.x.locator"];
  const rows = recordRows(["| recall | verified | a |", "| `books.x.world` | disputed |", "| locator (card 4) | held |", "| c1, recall | verified |", "| recalls | verified |"].join("\n"), ids);
  assert.deepEqual(Object.fromEntries(rows), { "books.x.recall": ["verified", "verified"], "books.x.world": ["disputed"], "books.x.locator": ["unverified"], "books.x.c1": ["verified"] });
  // CLI: a lesson whose last claim is <domain>.<slug>.recall passes with a `| recall | verified |` row.
  const { dir, base } = fixture();
  edit(dir, (m) => {
    m.claims[1].id = `math.${SLUG}.recall`;
  });
  sh(dir, "-c", "user.email=t@t", "-c", "user.name=t", "commit", "-qam", "recall id");
  const b2 = sh(dir, "rev-parse", "HEAD");
  edit(dir, verifyAll);
  record(dir, ["c1", "recall"]);
  const r = run(dir, b2, "--verdict=pass");
  assert.equal(r.exit, 0, r.stdout);
  assert.equal(claim(dir, 2).checkedBy, "fact-checker");
  assert.notEqual(base, b2);
});

test("a row must name the new status; ranges count only between real claims", () => {
  const ids = ["m.x.c1", "m.x.c2", "m.x.c3"];
  assert.deepEqual([...rowIds("| c1-c99 | verified |", ids)], [], "a range past the last claim covers nothing");
  assert.deepEqual([...rowIds("| c1-c3 | verified |", ids)].sort(), ids);
  for (const [rows, re] of [
    [["c1", "c2:disputed"], /c2: the record says disputed, meta\.json sets verified/],
    [["c1", "c2:ok"], /c2: the record's row names no verdict/],
  ]) {
    const { dir, base } = fixture();
    edit(dir, verifyAll);
    record(dir, rows);
    const r = run(dir, base, "--verdict=pass");
    assert.equal(r.exit, 1, rows.join());
    assert.match(r.stdout, re);
    assert.equal(claim(dir, 1).checkedBy, undefined, "nothing stamped");
  }
});

test("readiness lib missing or its rules moved → exit 3 (the evidence probe would be blind)", () => {
  const { dir, base } = fixture();
  edit(dir, verifyAll);
  record(dir, ["c1", "c2"]);
  const lib = path.join(dir, "tools/lib/readiness.mjs");
  fs.writeFileSync(lib, fs.readFileSync(lib, "utf8").replace('f.includes("learner")', 'f.includes("simulated-learner")'));
  let r = run(dir, base);
  assert.equal(r.exit, 3, r.stdout);
  assert.match(r.stdout, /canary/);
  fs.rmSync(lib);
  r = run(dir, base);
  assert.equal(r.exit, 3);
  assert.match(r.stdout, /cannot import tools\/lib\/readiness\.mjs/);
});
