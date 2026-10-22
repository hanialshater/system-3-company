// Tests for adapters/s3c/claims-draft.mjs (B6: the draft stage's post-check, kernel K25) and for the plan check that
// follows it: claims-guard.mjs as plan-check's post on a draft (no Demo.tsx yet), then gates.mjs's build-stage claim
// rule with --base at the plan check's commit (${head_of:plan-check}), so the claims verified before the build are
// inherited, not reset. Every case runs against a temp git repo shaped like a company checkout; nothing real is written.
// Run: node --test company/sibling/system3-meta/adapters/s3c/tests/

import { test } from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import { spawnSync, execFileSync } from "node:child_process";
import { fileURLToPath } from "node:url";
import { judgeDraft, draftCheckFindings } from "../claims-draft.mjs";
import { parseCheck } from "../gates.mjs";
import { claimFindings } from "../gates.mjs";

const HERE = path.dirname(fileURLToPath(import.meta.url));
const DRAFT = path.join(HERE, "..", "claims-draft.mjs"), GUARD = path.join(HERE, "..", "claims-guard.mjs");
const READINESS = "/home/user/s3c-wt/base/tools/lib/readiness.mjs";
const SLUG = "half-the-pizza", META = `src/demos/math/${SLUG}/meta.json`, BRIEF = "company/domains/briefs/math.fractions.md", TODAY = "2026-10-22";
const sh = (cwd, ...args) => execFileSync("git", ["-c", "user.email=t@t", "-c", "user.name=t", ...args], { cwd, encoding: "utf8", stdio: ["ignore", "pipe", "pipe"] }).trim();
const c = (n, extra = {}) => ({ id: `math.${SLUG}.c${n}`, text: `Claim ${n} holds.`, address: n === 1 ? "meta.json hook" : "Demo.tsx reveal card", support: "derivation", source: "own arithmetic: 1/2 = 2/4", status: "unverified", brief: n, ...extra });
const draft = (claims = [c(1), c(2)], extra = {}) => ({ slug: SLUG, title: "Half the pizza", hook: "Is 2/4 more pizza than 1/2?", domain: "math", status: "draft", version: 1, owner: { categoryManager: "cm-math", builder: "demo-builder" }, claims, recall: { question: "q", options: ["a", "b"], answer: 0, why: "2/4 = 1/2" }, evidence: { qa: [], simulatedLearner: [], pairwise: [], humanLearners: [] }, ...extra });
const BRIEF_TEXT = `# Fractions briefs\n\n## Wave A\n\nShared rules.\n\n### 1. ${SLUG} · concept: equivalent-fractions · core · demand 2 · format: Single card\n- Misconception: a bigger denominator means more.\n- Planned claims:\n  1. 1/2 and 2/4 name the same amount. support: derivation; source: arithmetic.\n  2. Doubling top and bottom keeps the value. support: derivation; source: arithmetic.\n  3. Not claimed: anything about pizza sizes.\n`;

function fixture(meta = null) {
  const dir = fs.mkdtempSync(path.join(os.tmpdir(), "claims-draft-"));
  const w = (rel, text) => { fs.mkdirSync(path.dirname(path.join(dir, rel)), { recursive: true }); fs.writeFileSync(path.join(dir, rel), text); };
  // a fake company CLI: claims-guard greps its claim enums; `check` (claims-draft rule 6) prints the lines a test put in
  // fake-check.txt, then the summary line gates.mjs parseCheck needs
  w("tools/company.mjs", 'import fs from "node:fs";\nconst rules = (c, err) => {\nif (!["derivation", "simulation", "source", "convention"].includes(c.support)) err();\nif (!["unverified", "verified", "disputed", "withdrawn"].includes(c.status)) err();\n};\nconst lines = fs.existsSync("fake-check.txt") ? fs.readFileSync("fake-check.txt", "utf8") : "";\nprocess.stdout.write(lines + `check ${lines ? "failed" : "passed"}: 0 error(s), 0 warning(s)\\n`);\n');
  w("tools/lib/readiness.mjs", fs.readFileSync(READINESS, "utf8"));
  w("company/constitution/protected-paths.txt", "tools/company.mjs\n");
  w(BRIEF, BRIEF_TEXT);
  w(".gitignore", "artifacts/\n");
  if (meta) w(META, JSON.stringify(meta, null, 2) + "\n");
  sh(dir, "init", "-q", "-b", "main"); sh(dir, "add", "-A"); sh(dir, "commit", "-qm", "base");
  return { dir, w, head: sh(dir, "rev-parse", "HEAD"), commit: (m) => { sh(dir, "add", "-A"); sh(dir, "commit", "-qm", m); return sh(dir, "rev-parse", "HEAD"); } };
}
const run = (bin, dir, ...args) => { const r = spawnSync(process.execPath, [bin, SLUG, `--repo=${dir}`, ...args], { encoding: "utf8", timeout: 30_000 }); return { exit: r.status, json: JSON.parse(r.stdout.trim().split("\n").at(-1)), stdout: r.stdout }; };
const kinds = (j) => j.findings.filter((f) => f.severity !== "advisory").map((f) => f.kind);

test("judgeDraft: every planned sentence a claim with address, support and source; none marked by its builder; brief claims covered", () => {
  const planned = [{ n: 1, text: "a" }, { n: 2, text: "b" }, { n: 3, text: "Not claimed: x", notClaimed: true }];
  assert.deepEqual(judgeDraft(draft(), { slug: SLUG, domain: "math", planned }).filter((f) => f.severity === "block"), []);
  const bad = (claims, extra = {}, opt = {}) => judgeDraft(draft(claims, extra), { slug: SLUG, domain: "math", planned, ...opt }).filter((f) => f.severity === "block").map((f) => f.message).join("\n");
  assert.match(bad([c(1, { address: "" }), c(2)]), /c1 has no address/);
  assert.match(bad([c(1, { source: " " }), c(2)]), /c1 has no source/);
  assert.match(bad([c(1, { support: "intuition" }), c(2)]), /support "intuition" is not one of/);
  assert.match(bad([c(1, { status: "verified", checkedBy: "fact-checker", checkedOn: TODAY }), c(2)]), /c1 is verified with checkedBy\/checkedOn: a claim the builder writes/);
  assert.match(bad([c(1), c(2, { id: "physics.x.c2" })]), /must start with math\.half-the-pizza\./);
  assert.match(bad([c(1)]), /planned claim 2 \("b"\) is made by no claim/, "planned claim 2 has no claim");
  assert.match(bad([c(1), c(2, { brief: [2, 7] })]), /names the brief's planned claim 7, which the brief does not have/);
  assert.match(bad([c(1), c(2)], { status: "review" }), /status is "review"; a draft hands over at "draft"/);
  assert.match(bad([]), /no claims/);
  // a claim exactly as at base keeps the status the fact-checker gave it (a plan revise, or a re-plan)
  const verified = c(1, { status: "verified", checkedBy: "fact-checker", checkedOn: "2026-10-21" });
  assert.equal(bad([verified, c(2)], {}, { baseMeta: draft([verified, c(2)]) }), "");
  assert.match(bad([{ ...verified, text: "Claim 1 holds, changed." }, c(2)], {}, { baseMeta: draft([verified, c(2)]) }), /c1 is verified/, "changed since base: back to unverified");
  // advisory only: the recall's why with no claim addressed to it
  const adv = judgeDraft(draft(), { slug: SLUG, domain: "math" }).filter((f) => f.severity === "advisory").map((f) => f.kind);
  assert.deepEqual(adv, ["recall"]);
});

test("CLI: a meta.json-only draft passes; a Demo.tsx made in the draft refuses; the brief is read from --brief", () => {
  const f = fixture();
  f.w(META, JSON.stringify(draft(), null, 2) + "\n");
  let r = run(DRAFT, f.dir, `--brief=${BRIEF}`, `--base=${f.head}`);
  assert.equal(r.exit, 0, r.stdout);
  assert.deepEqual([r.json.ok, r.json.claims, r.json.planned], [true, 2, [1, 2]]);
  f.w(`src/demos/math/${SLUG}/Demo.tsx`, "export default () => null;\n");
  r = run(DRAFT, f.dir, `--brief=${BRIEF}`, `--base=${f.head}`);
  assert.equal(r.exit, 1);
  assert.match(r.stdout, /block built: src\/demos\/math\/half-the-pizza\/Demo\.tsx changed since the draft started/);
  fs.rmSync(path.join(f.dir, `src/demos/math/${SLUG}/Demo.tsx`));
  // an unfilled ${brief_file} (an order with no brief line) is advisory, not a refusal
  r = run(DRAFT, f.dir, "--brief=${brief_file}", `--base=${f.head}`);
  assert.equal(r.exit, 0);
  assert.ok(r.json.findings.some((x) => x.kind === "brief" && x.severity === "advisory"));
  // no lesson at all; usage; not a company checkout
  const g = fixture();
  assert.deepEqual([run(DRAFT, g.dir, `--base=${g.head}`).exit, kinds(run(DRAFT, g.dir, `--base=${g.head}`).json)], [1, ["lesson"]]);
  assert.equal(run(DRAFT, g.dir, "--nope", `--base=${g.head}`).exit, 2);
  // K24/K25 review: the base is a sha the kernel recorded, never HEAD or missing (an agent's own commit moves HEAD)
  for (const b of [[], ["--base=HEAD"], ["--base=main"], ["--base=${head_sha}"]]) assert.equal(run(DRAFT, g.dir, ...b).exit, 2, b.join(" "));
  const h = fs.mkdtempSync(path.join(os.tmpdir(), "claims-draft-x-"));
  assert.equal(run(DRAFT, h, `--base=${"a".repeat(40)}`).exit, 3);
});

test("a loop back to draft keeps the built Demo.tsx as it was, and the claims the plan check verified", () => {
  const verified = c(1, { status: "verified", checkedBy: "fact-checker", checkedOn: "2026-10-21" });
  const f = fixture(draft([verified, c(2)], { status: "review" }));
  f.w(`src/demos/math/${SLUG}/Demo.tsx`, "built\n");
  const built = f.commit("built");
  f.w(META, JSON.stringify(draft([verified, c(2), c(3, { brief: 1, text: "Altitude does not change halves." })]), null, 2) + "\n");
  const r = run(DRAFT, f.dir, `--brief=${BRIEF}`, `--base=${built}`);
  assert.equal(r.exit, 0, r.stdout);
});

test("K24/K25 review: a builder that commits its self-verified draft and Demo.tsx itself is still judged against the kernel's base", () => {
  const f = fixture();
  const base = f.head; // the commit the draft started from, as K7 recorded it (${head_sha})
  f.w(META, JSON.stringify(draft([c(1, { status: "verified", checkedBy: "fact-checker", checkedOn: "2026-10-01" }), c(2)]), null, 2) + "\n");
  f.w(`src/demos/math/${SLUG}/Demo.tsx`, "export default () => null;\n");
  f.commit("wip"); // the agent's own commit: HEAD is now its draft
  const r = run(DRAFT, f.dir, `--brief=${BRIEF}`, `--base=${base}`);
  assert.equal(r.exit, 1, r.stdout);
  assert.match(r.stdout, /c1 is verified with checkedBy\/checkedOn/);
  assert.match(r.stdout, /Demo\.tsx changed since the draft started/);
});

test("the plan check: claims-guard on the draft verifies before build; gates' build rule with --base at that commit inherits them", () => {
  const f = fixture();
  f.w(META, JSON.stringify(draft(), null, 2) + "\n");
  const afterDraft = f.commit("meta: O-1 draft half-the-pizza");
  // the fact-checker verifies both claims and writes its plan record (claims-guard: only status changes, a row each)
  const m = JSON.parse(fs.readFileSync(path.join(f.dir, META), "utf8"));
  for (const x of m.claims) x.status = "verified";
  f.w(META, JSON.stringify(m, null, 2) + "\n");
  f.w(`company/reviews/${SLUG}/${TODAY}-fact-check-plan.md`, `| claim | verdict | basis |\n|---|---|---|\n| c1 | verified | 1/2 = 2/4 |\n| c2 | verified | (2a)/(2b) = a/b |\n`);
  let r = run(GUARD, f.dir, `--base=${afterDraft}`, "--verdict=pass", `--today=${TODAY}`);
  assert.equal(r.exit, 0, r.stdout);
  const stamped = JSON.parse(fs.readFileSync(path.join(f.dir, META), "utf8"));
  assert.deepEqual(stamped.claims.map((x) => [x.status, x.checkedBy, x.checkedOn]), [["verified", "fact-checker", TODAY], ["verified", "fact-checker", TODAY]], "code stamped them");
  const afterPlan = f.commit("meta: O-1 plan-check half-the-pizza");
  // build: the builder writes Demo.tsx and sets status review; the approved claims are kept exactly
  const built = { ...stamped, status: "review" };
  const baseMeta = JSON.parse(sh(f.dir, "show", `${afterPlan}:${META}`));
  assert.deepEqual(claimFindings(built, baseMeta).filter((x) => x.severity === "block"), [], "inherited from the plan check's commit: no reset");
  assert.ok(claimFindings(built, draft()).some((x) => x.severity === "block"), "against the order's base (the M6 --base) they would be refused");
  const edited = { ...built, claims: [{ ...built.claims[0], text: "changed in build" }, built.claims[1]] };
  assert.ok(claimFindings(edited, baseMeta).some((x) => x.severity === "block" && /c1/.test(x.message)), "a claim changed in build must go back to unverified");
  // a revise at the plan check: a claim disputed, allowed with --verdict=revise
  const g = fixture();
  g.w(META, JSON.stringify(draft(), null, 2) + "\n");
  const d2 = g.commit("draft");
  const m2 = JSON.parse(fs.readFileSync(path.join(g.dir, META), "utf8"));
  m2.claims[1].status = "disputed"; m2.claims[1].note = "doubling the top only changes the value";
  g.w(META, JSON.stringify(m2, null, 2) + "\n");
  g.w(`company/reviews/${SLUG}/${TODAY}-fact-check-plan.md`, `| c2 | disputed | counterexample |\n`);
  r = run(GUARD, g.dir, `--base=${d2}`, "--verdict=revise", `--today=${TODAY}`);
  assert.equal(r.exit, 0, r.stdout);
  assert.equal(r.json.route, "build", "claims-guard's own route word; the plan-check post has no route map, so the kernel sends it to draft");
});

test("B6 dry run: rule 6, the draft passes the company's own check for its lesson (Demo.tsx rules wait for the build)", () => {
  const where = `src/demos/math/${SLUG}`;
  const chk = parseCheck([
    `error ${where}: meta.evidence should be object`,
    `error ${where}: hook is 102 chars; the hook budget is 90`,
    `error ${where}: missing Demo.tsx`,
    `error ${where}: Demo.tsx must render <Lesson> (the predict → explore → reveal contract)`,
    `error ${where}: no stage controls found (Control, Slider or data-qa="control")`,
    `error ${where}-two: meta.evidence should be object`,
    `error src/demos/history/x: x.c1 bad support y`,
    `warn  ${where}: durationSec 130 > 120: is this still one idea?`,
    "check failed: 7 error(s), 1 warning(s)",
  ].join("\n"));
  assert.deepEqual(draftCheckFindings(chk, where).map((f) => f.message.split(" (the draft")[0]), ["company check: meta.evidence should be object", "company check: hook is 102 chars; the hook budget is 90"], "this lesson's errors only, Demo.tsx rules excepted, warnings not blocking");
  // the CLI: a draft the company check fails is refused at the leave, and passes once fixed
  const f = fixture();
  f.w(META, JSON.stringify(draft(), null, 2) + "\n");
  f.w("fake-check.txt", `error ${where}: meta.confidence should be string\nerror ${where}: missing Demo.tsx\nerror src/demos/math/other: missing Demo.tsx\n`);
  let r = run(DRAFT, f.dir, `--brief=${BRIEF}`, `--base=${f.head}`);
  assert.equal(r.exit, 1, r.stdout);
  assert.match(r.stdout, /^block check: company check: meta\.confidence should be string/m);
  assert.doesNotMatch(r.stdout, /missing Demo\.tsx/);
  f.w("fake-check.txt", `error ${where}: missing Demo.tsx\n`);
  r = run(DRAFT, f.dir, `--brief=${BRIEF}`, `--base=${f.head}`);
  assert.equal(r.exit, 0, r.stdout);
  // a check that prints no summary line is the environment's (exit 3), not the draft's
  f.w("tools/company.mjs", "process.exit(1);\n");
  r = run(DRAFT, f.dir, `--brief=${BRIEF}`, `--base=${f.head}`);
  assert.equal(r.exit, 3, r.stdout);
  assert.match(r.json.findings[0].message, /company check printed no summary line/);
});
