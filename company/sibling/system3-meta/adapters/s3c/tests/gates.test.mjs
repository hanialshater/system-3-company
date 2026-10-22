// Tests for adapters/s3c/gates.mjs (plan 2026-10-21-m4-m7-plan.md §4 row gates.mjs). The claim-floor parity test
// the plan names lives in its own file, tests/claimfloor-parity.test.mjs. Real where it matters: the company's own `check` runs against the
// sandbox worktree (read-only), and every write happens in a throwaway `git worktree add --detach` that is removed
// in `after`. Unit cases use temp dirs. Run: node --test company/sibling/system3-meta/adapters/s3c/tests/
//
// REPO (env S3C_REPO, default /home/user/s3c-wt/base) must be a company checkout; it is never written.

import { test, before, after } from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import { spawnSync, execFileSync } from "node:child_process";
import { fileURLToPath } from "node:url";
import { parseArgs, parseCheck, preflightRe, routeFor, claimFindings, claimChanges, claimFloor, companyConstants, fnHash, PINNED, findPublishTarget, withPendingLink } from "../gates.mjs";

const HERE = path.dirname(fileURLToPath(import.meta.url));
const GATES = path.join(HERE, "..", "gates.mjs");
const REPO = process.env.S3C_REPO ?? "/home/user/s3c-wt/base";

function run(args) {
  const r = spawnSync(process.execPath, [GATES, ...args], { encoding: "utf8", timeout: 180_000 });
  const last = r.stdout.trim().split("\n").at(-1);
  return { exit: r.status, json: JSON.parse(last), stdout: r.stdout, stderr: r.stderr };
}
const tmp = (p) => fs.mkdtempSync(path.join(os.tmpdir(), `gates-${p}-`));
const readJSON = (p) => JSON.parse(fs.readFileSync(p, "utf8"));
const writeJSON = (p, v) => fs.writeFileSync(p, JSON.stringify(v, null, 2) + "\n");

// ------------------------------------------------------------------ unit

test("parseArgs keeps positionals and --k=v / --flag", () => {
  assert.deepEqual(parseArgs(["s", "--stage=build", "--parity", "--repo=/x"]), { repo: "/x", positional: ["s"], stage: "build", parity: true });
});

test("parseCheck splits error/warn lines, strips ANSI, finds the summary", () => {
  const out = parseCheck(
    ["\x1b[33mwarn  \x1b[0msrc/demos/math/a: durationSec 130 > 120: is this still one idea?", "\x1b[31merror \x1b[0msrc/demos/math/a: published but fails gate: QA: x: y", "error company/decisions/x.md: needs an owner: line", "", "check failed: 2 error(s), 1 warning(s)"].join("\n"),
  );
  assert.equal(out.errors.length, 2);
  assert.deepEqual([out.errors[0].where, out.errors[0].msg], ["src/demos/math/a", "published but fails gate: QA: x: y"]);
  assert.equal(out.warnings[0].where, "src/demos/math/a");
  assert.match(out.summary, /^check failed/);
});

test("preflightRe: per version, annotations allowed, v1 is not v10, ### is not ##", () => {
  assert.ok(preflightRe(3).test("x\n## Pre-flight v3 (demo-builder, wave G)\n"));
  assert.ok(!preflightRe(1).test("## Pre-flight v10\n"));
  assert.ok(!preflightRe(2).test("## Pre-flight\n"));
  assert.ok(!preflightRe(2).test("### Pre-flight v2\n"));
});

test("routeFor maps launchGates wording to K11 routes", () => {
  assert.equal(routeFor("claims not verified: a.b.c1"), "check");
  assert.equal(routeFor("a.b.c1 verified by its own builder"), "check");
  assert.equal(routeFor("learner review: verdict revise"), "build");
  assert.equal(routeFor("learner review: verdict fatal"), "park");
  assert.equal(routeFor("learner review: verdict is for an older version"), "learner");
  assert.equal(routeFor("QA: newest QA record is a fail"), "qa");
  assert.equal(routeFor("active publish hold: x"), "park");
  assert.equal(routeFor("no borrowed-mind learner review"), "learner");
});

test("claimFindings: strict without base; inherits unchanged claims with base; self-verify always blocks", () => {
  const meta = (claims) => ({ owner: { builder: "demo-builder" }, claims });
  const v = { id: "m.s.c1", status: "verified", checkedBy: "fact-checker", checkedOn: "2026-10-01" };
  assert.deepEqual(claimFindings(meta([{ id: "m.s.c1", status: "unverified" }]), null), []);
  assert.equal(claimFindings(meta([v]), null)[0].severity, "block");
  assert.deepEqual(claimFindings(meta([v]), meta([v])), [], "an unchanged fact-checker verification is inherited");
  assert.equal(claimFindings(meta([v]), meta([{ ...v, status: "unverified" }]))[0].severity, "block", "the builder flipped it to verified");
  assert.equal(claimFindings(meta([{ ...v, checkedBy: "demo-builder" }]), meta([{ ...v, checkedBy: "demo-builder" }]))[0].severity, "block");
  assert.equal(claimFindings(meta([{ id: "m.s.c1", status: "disputed" }]), null)[0].severity, "block");
});

test("claimFindings: a verified claim reworded since base is not inherited (text, source, support, address)", () => {
  const meta = (claims) => ({ owner: { builder: "demo-builder" }, claims });
  const v = { id: "m.s.c1", text: "The Moon orbits the Earth.", source: "NASA", support: "source", address: "reveal", status: "verified", checkedBy: "fact-checker", checkedOn: "2026-10-01" };
  for (const [k, val] of [["text", "The Moon is made of cheese."], ["source", "trust me"], ["support", "convention"], ["address", "hook"], ["addresses", ["x"]]]) {
    const f = claimFindings(meta([{ ...v, [k]: val }]), meta([v]));
    assert.equal(f.length, 1, k);
    assert.equal(f[0].severity, "block", k);
    assert.match(f[0].message, new RegExp(`changed since base: ${k}`), k);
  }
  assert.deepEqual(claimFindings(meta([{ ...v, note: "builder note" }]), meta([v])), [], "note is commentary, not the claim");
  assert.deepEqual(claimFindings(meta([{ checkedOn: v.checkedOn, ...v }]), meta([v])), [], "key order is not a change");
  assert.deepEqual(claimFindings(meta([{ ...v, text: "reworded", status: "unverified" }]), meta([v])), [], "reworded and reopened is the documented practice");
  assert.deepEqual(claimChanges({ ...v, text: "x", note: "n" }, v), ["text"]);
});

test("claimFindings: withdrawn is the fact-checker's; blocks unless inherited, and an all-withdrawn lesson blocks", () => {
  const meta = (claims) => ({ owner: { builder: "demo-builder" }, claims });
  const u = { id: "m.s.c1", text: "t", status: "unverified" };
  const w = { ...u, status: "withdrawn", checkedBy: "fact-checker", checkedOn: "2026-10-01" };
  assert.equal(claimFindings(meta([{ ...u, status: "withdrawn" }, { ...u, id: "m.s.c2" }]), null)[0].severity, "block", "no base: withdrawn blocks");
  assert.equal(claimFindings(meta([{ ...u, status: "withdrawn" }, { ...u, id: "m.s.c2" }]), meta([u, { ...u, id: "m.s.c2" }]))[0].severity, "block", "the builder withdrew it");
  assert.deepEqual(claimFindings(meta([w, { ...u, id: "m.s.c2" }]), meta([w, { ...u, id: "m.s.c2" }])), [], "the fact-checker's withdrawal is inherited");
  const all = claimFindings(meta([w]), meta([w]));
  assert.equal(all.length, 1);
  assert.match(all[0].message, /every claim is withdrawn/);
  assert.ok(claimFindings(meta([{ ...u, status: "withdrawn" }]), null).every((f) => f.severity === "block"));
});

test("findPublishTarget matches meta.slug in loadDemos order, as company.mjs cmdPublish does; withPendingLink copies publish's link rule", () => {
  const root = tmp("target");
  const put = (d, s, meta) => {
    fs.mkdirSync(path.join(root, "src/demos", d, s), { recursive: true });
    if (meta) writeJSON(path.join(root, "src/demos", d, s, "meta.json"), meta);
    else fs.writeFileSync(path.join(root, "src/demos", d, s, "meta.json"), "{ not json");
  };
  put("math", "renamed-dir", { slug: "wanted" });
  put("physics", "wanted", { slug: "something-else" });
  put("ai", "broken", null);
  const t = findPublishTarget(root, "wanted");
  assert.equal(t.where, "src/demos/math/renamed-dir", "publish acts on the meta.slug match, not the directory");
  assert.deepEqual(t.others, ["src/demos/physics/wanted"]);
  assert.equal(findPublishTarget(root, "broken"), null, "an unreadable meta never matches (cmdPublish: no lesson)");
  // link preview: every reviews file whose name includes "learner", sorted, appended when unlinked; in memory only
  fs.mkdirSync(path.join(root, "company/reviews/wanted"), { recursive: true });
  for (const f of ["2026-10-02-learner-b.md", "2026-10-01-learner-a.md", "2026-10-01-qa.md"]) fs.writeFileSync(path.join(root, "company/reviews/wanted", f), "x");
  const m = { slug: "wanted", evidence: { simulatedLearner: ["company/reviews/wanted/2026-10-02-learner-b.md"] } };
  const r = withPendingLink(root, m, "wanted");
  assert.deepEqual(r.add, ["company/reviews/wanted/2026-10-01-learner-a.md"]);
  assert.deepEqual(r.meta.evidence.simulatedLearner, ["company/reviews/wanted/2026-10-02-learner-b.md", "company/reviews/wanted/2026-10-01-learner-a.md"]);
  assert.equal(m.evidence.simulatedLearner.length, 1, "the input meta is not mutated");
  fs.rmSync(root, { recursive: true, force: true });
});

test("claimFloor reproduces each claimGates branch (company.mjs:303-321)", () => {
  const root = tmp("floor");
  fs.writeFileSync(path.join(root, "qa.md"), "x");
  const base = { owner: { builder: "demo-builder" }, confidence: "", evidence: { qa: ["qa.md"], simulatedLearner: ["qa.md"] } };
  assert.deepEqual(claimFloor({ ...base, claims: [{ id: "a", status: "verified", checkedBy: "fc", checkedOn: "d" }] }, root), []);
  const all = claimFloor(
    { ...base, confidence: "**", evidence: { qa: [], simulatedLearner: [], pairwise: ["gone.md"] }, claims: [{ id: "a", status: "unverified" }, { id: "b", status: "verified" }, { id: "c", status: "verified", checkedBy: "demo-builder", checkedOn: "d" }] },
    root,
  );
  assert.deepEqual(all, [
    "claims not verified: a",
    "b verified without checkedBy/checkedOn",
    "c verified by its own builder",
    "no computer-use QA record (company/reviews/...)",
    "no borrowed-mind learner review",
    "evidence.pairwise points at missing file gone.md",
    'confidence "**" needs human-learner evidence; simulated learners are not learners',
  ]);
  assert.deepEqual(claimFloor({ ...base, claims: [] }, root), ["no claims recorded: every lesson asserts something; write it down"]);
  fs.rmSync(root, { recursive: true, force: true });
});

test("the mirror is pinned to the company.mjs in REPO (no drift), and its constants parse", () => {
  const c = companyConstants(REPO);
  assert.deepEqual(c.problems, []);
  assert.deepEqual(c.drift, [], "tools/company.mjs changed a mirrored function: update gates.mjs and PINNED");
  assert.equal(c.readinessSince, "2026-10-17");
  assert.equal(c.qaIndependentSince, null);
  assert.equal(c.grandfathered.size, 268); // company.mjs comment: "268 of 720"
});

// ------------------------------------------------------------------ real, read-only against REPO

test("--baseline reports the company-wide check error count", () => {
  const r = run(["--baseline", `--repo=${REPO}`]);
  assert.equal(r.exit, 0);
  assert.equal(typeof r.json.errors, "number");
  assert.equal(r.json.errors, r.json.lessonErrors + r.json.otherErrors);
  assert.ok(r.json.errors > 0, "the baseline is red at 23aaeba66 (811); if it is ever green, this still holds");
});

test("ship on a published lesson that passes launchGates → exit 0; a review lesson with revise → exit 1 routed", () => {
  const ok = run(["left-or-right", "--stage=ship", `--repo=${REPO}`]);
  assert.equal(ok.exit, 0, JSON.stringify(ok.json));
  const no = run(["same-week-a-year-apart", "--stage=ship", `--repo=${REPO}`]);
  assert.equal(no.exit, 1);
  assert.ok(no.json.findings.some((f) => f.message === "learner review: verdict revise" && f.route === "build"));
});

test("build with --base=HEAD inherits the fact-checker's verifications", () => {
  const strict = run(["same-week-a-year-apart", "--stage=build", `--repo=${REPO}`]);
  assert.ok(strict.json.findings.some((f) => f.kind === "claims" && f.severity === "block"));
  const inherit = run(["same-week-a-year-apart", "--stage=build", "--base=HEAD", `--repo=${REPO}`]);
  assert.ok(!inherit.json.findings.some((f) => f.kind === "claims" && f.severity === "block"), JSON.stringify(inherit.json.findings));
});

test("usage errors exit 2; a non-company repo exits 3", () => {
  assert.equal(run(["x", `--repo=${REPO}`]).exit, 2);
  assert.equal(run(["Bad_Slug", "--stage=build", `--repo=${REPO}`]).exit, 2);
  assert.equal(run(["x", "--stage=build", "--base=nope-not-a-ref", `--repo=${REPO}`]).exit, 2);
  assert.equal(run(["x", "--stage=build", "--bogus", `--repo=${REPO}`]).exit, 2);
  const empty = tmp("empty");
  assert.equal(run(["x", "--stage=build", `--repo=${empty}`]).exit, 3);
  fs.rmSync(empty, { recursive: true, force: true });
});

test("stage-error (3) when company check prints no summary, or when company.mjs drifted from the mirror", () => {
  const fake = tmp("fake");
  fs.mkdirSync(path.join(fake, "tools/lib"), { recursive: true });
  fs.mkdirSync(path.join(fake, "src/demos/math/s"), { recursive: true });
  fs.copyFileSync(path.join(REPO, "tools/lib/readiness.mjs"), path.join(fake, "tools/lib/readiness.mjs"));
  writeJSON(path.join(fake, "src/demos/math/s/meta.json"), { slug: "s", status: "review", version: 1, claims: [], owner: {}, evidence: {} });
  fs.writeFileSync(path.join(fake, "tools/company.mjs"), "process.exit(1);\n");
  const b = run(["s", "--stage=build", `--repo=${fake}`]);
  assert.equal(b.exit, 3);
  assert.equal(b.json.findings[0].kind, "check");
  // a copy of the real company.mjs with one claimGates message changed: ship must refuse, not guess
  const src = fs.readFileSync(path.join(REPO, "tools/company.mjs"), "utf8").replace("no borrowed-mind learner review", "no learner review");
  fs.writeFileSync(path.join(fake, "tools/company.mjs"), src);
  assert.notEqual(fnHash(src, "claimGates"), PINNED.claimGates);
  const s = run(["s", "--stage=ship", `--repo=${fake}`]);
  assert.equal(s.exit, 3);
  assert.ok(s.json.findings.some((f) => /claimGates\(\) changed/.test(f.message)));
  fs.rmSync(fake, { recursive: true, force: true });
});

// ------------------------------------------------------------------ real, writes in a throwaway worktree

let WT = null;
before(() => {
  WT = path.join(path.dirname(REPO), `adapt-gates-test-${process.pid}`);
  execFileSync("git", ["worktree", "add", "--detach", WT, "HEAD"], { cwd: REPO, stdio: "ignore" });
});
after(() => {
  if (WT) execFileSync("git", ["worktree", "remove", "--force", WT], { cwd: REPO, stdio: "ignore" });
});

test("build stage end to end on a scaffolded lesson: revise with findings, then pass, then the builder verifies → revise", () => {
  const slug = "gates-e2e-probe";
  const baseFile = path.join(tmp("baseline"), "baseline.json");
  const bl = run(["--baseline", `--repo=${WT}`, `--out=${baseFile}`]);
  assert.equal(bl.exit, 0);
  execFileSync(process.execPath, ["tools/company.mjs", "new-demo", "math", slug], { cwd: WT, stdio: "ignore" });
  const r1 = run([slug, "--stage=build", `--repo=${WT}`, `--baseline-file=${baseFile}`]);
  assert.equal(r1.exit, 1);
  const kinds = new Set(r1.json.findings.filter((f) => f.severity === "block").map((f) => f.kind));
  for (const k of ["check", "status", "design", "preflight", "baseline"]) assert.ok(kinds.has(k), `expected a ${k} finding: ${JSON.stringify(r1.json.findings)}`);

  const metaPath = path.join(WT, "src/demos/math", slug, "meta.json");
  const meta = readJSON(metaPath);
  meta.concept = readJSON(path.join(WT, "content/curriculum/math.json")).concepts[0].id;
  meta.status = "review";
  writeJSON(metaPath, meta);
  const rev = path.join(WT, "company/reviews", slug);
  fs.mkdirSync(rev, { recursive: true });
  fs.writeFileSync(path.join(rev, "design.md"), "# Design\n");
  fs.writeFileSync(path.join(rev, "build.md"), "# Build\n\n## Pre-flight v1\n1. ...\n");
  const r2 = run([slug, "--stage=build", `--repo=${WT}`, `--baseline-file=${baseFile}`]);
  assert.equal(r2.exit, 0, JSON.stringify(r2.json.findings));
  assert.equal(r2.json.ok, true);

  meta.version = 2; // a new version needs its own Pre-flight
  meta.claims[0] = { ...meta.claims[0], status: "verified", checkedBy: "fact-checker", checkedOn: "2026-10-21" };
  writeJSON(metaPath, meta);
  const r3 = run([slug, "--stage=build", `--repo=${WT}`]);
  assert.equal(r3.exit, 1);
  assert.ok(r3.json.findings.some((f) => f.kind === "preflight"));
  assert.ok(r3.json.findings.some((f) => f.kind === "claims" && f.severity === "block"));
  fs.rmSync(path.dirname(baseFile), { recursive: true, force: true });
});

// Puts WT back to HEAD for the given paths (tracked files restored, untracked ones removed).
const restore = (...paths) => {
  const tracked = paths.filter((p) => execFileSync("git", ["ls-tree", "--name-only", "HEAD", "--", p], { cwd: WT, encoding: "utf8" }).trim());
  if (tracked.length) execFileSync("git", ["checkout", "HEAD", "--", ...tracked], { cwd: WT, stdio: "ignore" });
  execFileSync("git", ["clean", "-fdq", "--", ...paths], { cwd: WT, stdio: "ignore" });
};

test("build blocks a slug already used in another domain, though check files the error under the other lesson", () => {
  // Review finding: `new-demo ai antarctica-vs-australia` (the slug exists in geography) passed test1, because cmdCheck
  // reports "duplicate slug" against src/demos/geography/... (it sorts second), not the new lesson's address.
  const slug = "antarctica-vs-australia";
  const baseFile = path.join(tmp("baseline-dup"), "baseline.json");
  assert.equal(run(["--baseline", `--repo=${WT}`, `--out=${baseFile}`]).exit, 0);
  const bl = readJSON(baseFile);
  assert.equal(bl.errorLines.length, bl.errors, "the baseline file holds every error line");
  execFileSync(process.execPath, ["tools/company.mjs", "new-demo", "ai", slug], { cwd: WT, stdio: "ignore" });
  try {
    const r = run([slug, "--stage=build", `--repo=${WT}`]);
    assert.equal(r.exit, 1);
    assert.ok(r.json.findings.some((f) => f.kind === "slug" && f.severity === "block" && f.message.includes("src/demos/geography/antarctica-vs-australia")), JSON.stringify(r.json.findings));
    // The baseline guard sees the line even when the count would not: inflate the count, keep the lines.
    writeJSON(baseFile, { ...bl, errors: bl.errors + 100 });
    const r2 = run([slug, "--stage=build", `--repo=${WT}`, `--baseline-file=${baseFile}`]);
    assert.ok(r2.json.findings.some((f) => f.kind === "baseline" && f.severity === "block" && f.message.endsWith("error src/demos/geography/antarctica-vs-australia: duplicate slug")), JSON.stringify(r2.json.findings));
  } finally {
    restore(`src/demos/ai/${slug}`, "src/demos/index.generated.ts", "src/demos/loaders.generated.ts");
    fs.rmSync(path.dirname(baseFile), { recursive: true, force: true });
  }
});

test("build with --base=HEAD refuses a verified claim whose text and source were reworded", () => {
  // Review finding: same-week-a-year-apart claims[1] reworded to "The Moon is made of cheese." / "trust me" and left
  // verified by fact-checker passed --base. HEAD is the base: the edit is uncommitted in WT.
  const metaPath = path.join(WT, "src/demos/behavioral/same-week-a-year-apart/meta.json");
  const m = readJSON(metaPath);
  assert.equal(m.claims[1].status, "verified");
  m.claims[1] = { ...m.claims[1], text: "The Moon is made of cheese.", source: "trust me" };
  writeJSON(metaPath, m);
  try {
    const r = run(["same-week-a-year-apart", "--stage=build", "--base=HEAD", `--repo=${WT}`]);
    const hit = r.json.findings.filter((f) => f.kind === "claims" && f.severity === "block");
    assert.equal(hit.length, 1, JSON.stringify(r.json.findings));
    assert.match(hit[0].message, new RegExp(`^${m.claims[1].id.replace(/\./g, "\\.")} is verified \\(changed since base: source, text;`));
  } finally {
    restore("src/demos/behavioral/same-week-a-year-apart");
  }
});

test("ship judges the meta publish.mjs will hand to company publish: unlinked learner records count (no learner loop)", () => {
  // Review finding: left-or-right with simulatedLearner=[] and status=review was a ship revise routed to learner,
  // although publish.mjs (stage 9) links the record before `company publish` and publish-ready lists it.
  const metaPath = path.join(WT, "src/demos/math/left-or-right/meta.json");
  const m = readJSON(metaPath);
  m.evidence.simulatedLearner = [];
  m.status = "review";
  writeJSON(metaPath, m);
  try {
    const r = run(["left-or-right", "--stage=ship", `--repo=${WT}`]);
    assert.equal(r.exit, 0, JSON.stringify(r.json));
    assert.deepEqual(r.json.pendingLink, ["company/reviews/left-or-right/2026-10-17-learner-walk.md"]);
    assert.deepEqual(readJSON(metaPath).evidence.simulatedLearner, [], "ship writes nothing");
    // With no learner record on disk at all, the floor still fails and routes to learner.
    fs.renameSync(path.join(WT, "company/reviews/left-or-right/2026-10-17-learner-walk.md"), path.join(WT, "company/reviews/left-or-right/2026-10-17-walk.md.off"));
    const r2 = run(["left-or-right", "--stage=ship", `--repo=${WT}`]);
    assert.equal(r2.exit, 1);
    assert.ok(r2.json.findings.some((f) => f.message === "no borrowed-mind learner review" && f.route === "learner"));
  } finally {
    restore("src/demos/math/left-or-right", "company/reviews/left-or-right");
  }
});
