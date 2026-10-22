// Tests for adapters/s3c/brief.mjs (plan 2026-10-21-m4-m7-plan.md §4 row "brief.mjs").
//   node --test company/sibling/system3-meta/adapters/s3c/tests/brief.test.mjs
// S3C_REPO=<company worktree> overrides the repo the real-data tests read (default /home/user/s3c-wt/base).
// Every write happens in a mkdtemp repo; the real repo is only read.

import { test, after } from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import { spawnSync } from "node:child_process";
import { fileURLToPath } from "node:url";
import { HEADING_RE, SPLIT_RE, FORMAT_RE, readBrief, queue, parseNeedsSpec, splitInline, claimRootOf, defaultLockRoots, lockState, MAIN_CHECKOUT } from "../brief.mjs";

const HERE = path.dirname(fileURLToPath(import.meta.url));
const ADAPTER = path.join(HERE, "..", "brief.mjs");
const REPO = process.env.S3C_REPO ?? "/home/user/s3c-wt/base";
const CLAIM = path.join(REPO, "tools/claim.mjs");

const TMP = [];
after(() => { for (const d of TMP) fs.rmSync(d, { recursive: true, force: true }); });
// Fixture runs read locks from the fixture only (--locks=<fixture>), so a lock in the real main checkout
// (brief.mjs defaultLockRoots) can never change a fixture result.
const run = (args, opts = {}) => {
  const repo = args.find((a) => a.startsWith("--repo="))?.slice(7);
  const extra = repo && repo.startsWith(os.tmpdir()) && !args.some((a) => a.startsWith("--locks")) ? [`--locks=${repo}`] : [];
  const r = spawnSync(process.execPath, [ADAPTER, ...args, ...extra], { encoding: "utf8", ...opts });
  const lines = r.stdout.trim().split("\n");
  return { code: r.status, json: JSON.parse(lines.at(-1)), lines, stderr: r.stderr };
};

// A fixture company: domains.json, curriculum, briefs, skips, locks, built lessons, and a copy of the
// REAL tools/claim.mjs so the parity tests drive company code, not a model of it.
function fixture({ briefs, skips = {}, built = [], locks = {}, copyClaim = true }) {
  const root = fs.mkdtempSync(path.join(os.tmpdir(), "brief-fx-")); TMP.push(root);
  const w = (rel, s) => { fs.mkdirSync(path.dirname(path.join(root, rel)), { recursive: true }); fs.writeFileSync(path.join(root, rel), s); };
  w("content/domains.json", JSON.stringify({ domains: [
    { id: "math", categoryManager: "cm-math", status: "active", subareas: [{ id: "geometry", categoryManager: "cm-math-geometry" }] },
    { id: "cs", categoryManager: "cm-cs", status: "active" },
    { id: "orphan", categoryManager: "cm-orphan", status: "active" },
  ] }));
  w("content/curriculum/math.json", JSON.stringify({ concepts: [{ id: "c-one" }, { id: "c-two" }] }));
  for (const [f, s] of Object.entries(briefs)) w(`company/domains/briefs/${f}`, s);
  w("company/ops/brief-skips.json", JSON.stringify({ skips }));
  fs.mkdirSync(path.join(root, "src/demos/math"), { recursive: true });
  for (const [d, s] of built) w(`src/demos/${d}/${s}/meta.json`, "{}");
  for (const [s, body] of Object.entries(locks)) w(`company/ops/claims/${s}.json`, body);
  if (copyClaim) w("tools/claim.mjs", fs.readFileSync(CLAIM, "utf8"));
  return root;
}

const MATH = `# Math briefs

## Wave A (cm-math)

Shared build rules: stage text ≤ 25 words.

### 1. alpha-one · concept: c-one · core · demand 3 · format: Single card
- Learner knows: x / does not know: y.
- Misconception: z.
- Prediction (kit text): "Which?" options: A. one / B. two (answer: B).
- Milestones: (1) a; (2) b. QA path: chips 1 and 2.
- Reveal (draft, 12 words): "Words."
- Planned claims:
  1. One is one. support: derivation; source: D1.
  2. Earth radius 6,378 km. support: citation; source: WGS 84 (NGA TR8350.2). The checker confirms it.
  3. Not claimed in learner text: survey rates.
- Needs interaction-designer spec: no.

### 2. beta-two · concept: c-two · intro · demand 2
- Prediction: "Q?" options: A. x / B. y.
- Planned claims:
  1. A claim with no support.

## 3. gamma-three · concept: c-missing · core · demand 2 · format: Before / after toggle · **needs spec**
- Claims to check: one; two.

### 4. delta-four · concept: c-one · core · demand 1 · **Format:** Single card
- Needs interaction-designer spec: yes (step over).
`;
const GEOM = `# Geometry
### 1. eps-five · concept: c-one · core · demand 2 · format: Single card
- Needs interaction-designer spec: no.
### 2. zeta-six · concept: c-two · core · demand 2 · format: Single card
### 3. eta-seven · concept: c-two · core · demand 2 · format: Single card
### 4. theta-eight · concept: c-two · core · demand 2 · format: Single card
### 5. iota-nine · concept: c-two · core · demand 2 · format: Single card
`;
const CS = `### 1. cs-one · concept: k · core · demand 1 · format: Single card\n`;
const ORPHAN_STRAND = `### 1. orphan-one · concept: k · core · demand 1 · format: Single card\n`; // no orphan.md → unreachable

const NOW = Date.parse("2026-10-21T12:00:00Z");
const iso = (msAgo) => new Date(NOW - msAgo).toISOString();

// Drive the real claim.mjs `next <domain>` until NONE: the hand-out order, as company code computes it.
function claimOrder(root, domain) {
  const out = [];
  for (let i = 0; i < 500; i++) {
    const r = spawnSync(process.execPath, [path.join(root, "tools/claim.mjs"), "next", domain, "--agent=parity"], { encoding: "utf8" });
    if (r.status !== 0) return { error: r.stderr.trim().split("\n").find((l) => /^Error: /.test(l)) ?? r.stderr, out };
    const s = r.stdout.trim();
    if (s === "NONE") return { out };
    out.push(s);
  }
  throw new Error("claim.mjs next did not terminate");
}

test("the copied regexes and stale window still appear verbatim in tools/claim.mjs (drift guard)", () => {
  const src = fs.readFileSync(CLAIM, "utf8");
  for (const re of [HEADING_RE, SPLIT_RE, FORMAT_RE]) assert.ok(src.includes(String(re)), `claim.mjs no longer contains ${re}`);
  assert.ok(src.includes("6 * 3600_000"), "STALE_MS changed in claim.mjs");
  assert.ok(src.includes('fs.mkdirSync(DIR, { recursive: true });'), "claim.mjs no longer mkdirs on load: brief.mjs could import it now");
});

test("parses a fixture section: heading, prediction, planned claims, needs-spec, group rules", () => {
  const root = fixture({ briefs: { "math.md": MATH } });
  const r = readBrief(root, "math.md", "alpha-one", { now: NOW, lockRoots: [root] });
  const b = r.brief;
  assert.equal(b.concept, "c-one"); assert.equal(b.level, "core"); assert.equal(b.demand, 3); assert.equal(b.format, "Single card");
  assert.deepEqual(b.prediction.options.map((o) => o.key), ["A", "B"]); assert.equal(b.prediction.answer, "B");
  assert.equal(b.qaPath, "chips 1 and 2"); assert.equal(b.reveal.words, 12);
  assert.equal(b.plannedClaims.length, 3);
  assert.deepEqual(b.plannedClaims.map((c) => c.supportEnum), ["derivation", "source", null]);
  assert.equal(b.plannedClaims[1].source, "WGS 84 (NGA TR8350.2)"); assert.equal(b.plannedClaims[1].note, "The checker confirms it.");
  assert.equal(b.plannedClaims[2].notClaimed, true);
  assert.equal(b.needsSpec.value, "no");
  assert.equal(b.group.heading, "Wave A (cm-math)"); assert.match(b.group.intro, /Shared build rules/);
  assert.ok(!b.section.includes("beta-two"), "section stops at the next heading");
  assert.match(r.accept, /^LESSON alpha-one · domain math/); assert.match(r.accept, /Shared rules from the group/); assert.match(r.accept, /Brief \(verbatim\):\n### 1\. alpha-one/);
  assert.deepEqual(r.findings, []);
  assert.match(r.accept, /\nPlanned claims: 2 \(\+1 not claimed\) \(1: derivation, 2: source\)/, "a Not-claimed item is not counted");
  assert.equal(r.orderArgv.find((a) => a.startsWith("--to=")), "--to=cm-math");
});

test("findings: no format blocks (exit 1); needs spec marker, unknown concept and unitemised claims warn", () => {
  const root = fixture({ briefs: { "math.md": MATH } });
  const beta = run(["math.md", "beta-two", `--repo=${root}`, "--json"]);
  assert.equal(beta.code, 1);
  assert.deepEqual(beta.json.findings.map((f) => f.code).sort(), ["claim-no-support", "needs-spec-unstated", "no-format", "prediction-no-answer"]);
  const gamma = run(["math.md", "gamma-three", `--repo=${root}`, "--json"]);
  assert.equal(gamma.code, 0);
  assert.equal(gamma.json.brief.needsSpec.value, "yes"); assert.equal(gamma.json.brief.needsSpec.formatMarker, true);
  assert.deepEqual(gamma.json.findings.map((f) => f.code).sort(), ["needs-spec", "no-planned-claims", "no-prediction", "unknown-concept"]);
  const delta = run(["math.md", "delta-four", `--repo=${root}`, "--json"]);
  assert.equal(delta.json.brief.format, "Single card", "a bold **Format:** in the heading is read");
  assert.equal(delta.json.eligibility.formatForQueue, "Single card");
  assert.equal(delta.json.brief.needsSpec.value, "yes");
});

test("exit codes: usage 2, not-found 1, missing repo 3; accept text precedes the JSON line", () => {
  const root = fixture({ briefs: { "math.md": MATH } });
  assert.equal(run([`--repo=${root}`]).code, 2);
  assert.equal(run(["nope.md", "alpha-one", `--repo=${root}`]).code, 2);
  const nf = run(["math.md", "no-such-slug", `--repo=${root}`]);
  assert.equal(nf.code, 1); assert.equal(nf.json.findings[0].code, "not-found");
  assert.equal(run(["math.md", "alpha-one", `--repo=${path.join(root, "missing")}`]).code, 3);
  const ok = run(["math.md", "alpha-one", `--repo=${root}`]);
  assert.equal(ok.code, 0); assert.equal(ok.lines[0].startsWith("LESSON alpha-one"), true); assert.equal(ok.json.ok, true);
});

test("--list equals the real claim.mjs `next` hand-out order on a fixture with built, skipped, and every lock state", () => {
  const briefs = { "math.md": MATH, "math.geometry.md": GEOM, "cs.md": CS, "orphan.strand.md": ORPHAN_STRAND };
  const locks = {
    "zeta-six": JSON.stringify({ slug: "zeta-six", agent: "a", at: iso(3600_000) }) + "\n",          // held (1 h)
    "eta-seven": JSON.stringify({ slug: "eta-seven", agent: "b", at: iso(7 * 3600_000) }) + "\n",    // stale (7 h)
    "theta-eight": JSON.stringify({ slug: "theta-eight", agent: "c", at: iso(9e7), done: iso(1) }) + "\n", // done
    "iota-nine": "{not json",                                                                         // unreadable
  };
  // claim.mjs reads the wall clock, so lock ages are relative to the real now in that run.
  const realNow = Date.now();
  for (const [s, b] of Object.entries(locks)) if (b.startsWith("{\"")) { const j = JSON.parse(b); j.at = new Date(realNow - (NOW - Date.parse(j.at))).toISOString(); locks[s] = JSON.stringify(j) + "\n"; }
  const root = fixture({ briefs, skips: { "delta-four": "W-1" }, built: [["math", "eps-five"]], locks });
  const mine = run(["--list", `--repo=${root}`]);
  assert.equal(mine.code, 0);
  const byDomain = (d) => mine.json.eligible.filter((r) => r.domain === d).map((r) => r.slug);
  assert.deepEqual(byDomain("math"), ["alpha-one", "gamma-three", "eta-seven"]); // beta: no format; delta: skipped; eps: built; zeta/theta/iota: locked
  assert.equal(mine.json.findings[0].code, "no-domain-file");
  assert.equal(mine.json.counts.ineligible.locked, 3);
  // Now let company code hand them out (this writes locks, in the temp repo only).
  for (const d of ["math", "cs"]) assert.deepEqual(claimOrder(root, d).out, byDomain(d), `parity for ${d}`);
  assert.match(claimOrder(root, "orphan").error, /no briefs for orphan/);
  // --any-format admits beta-two, exactly like claim.mjs --any-format.
  const root2 = fixture({ briefs: { "math.md": MATH } });
  const any = run(["--list", "--domain=math", "--any-format", `--repo=${root2}`]).json.eligible.map((r) => r.slug);
  const r2 = spawnSync(process.execPath, [path.join(root2, "tools/claim.mjs"), "next", "math", "--agent=x", "--any-format"], { encoding: "utf8" });
  assert.equal(r2.stdout.trim(), any[0]); assert.ok(any.includes("beta-two"));
});

test("read-only: a run leaves the fixture tree byte-identical (no claims dir, no lock)", () => {
  const root = fixture({ briefs: { "math.md": MATH }, copyClaim: false });
  const snap = () => { const out = []; const walk = (d) => { for (const e of fs.readdirSync(d, { withFileTypes: true })) { const p = path.join(d, e.name); if (e.isDirectory()) walk(p); else out.push(p + ":" + fs.readFileSync(p, "utf8")); } }; walk(root); return out.sort().join("\n"); };
  const before = snap();
  run(["--list", `--repo=${root}`]); run(["math.md", "alpha-one", `--repo=${root}`]);
  assert.equal(snap(), before);
  assert.ok(!fs.existsSync(path.join(root, "company/ops/claims")));
});

// Review fix (lockState): a lock file that parses to a falsy value blocks in claim.mjs (tryLock skips both
// branches and openSync("wx") fails); a truthy non-object is deleted as stale and taken.
test("lock files with degenerate JSON: --list agrees with the real claim.mjs", () => {
  const slugs = { "l-null": "null", "l-zero": "0", "l-false": "false", "l-empty-str": '""', "l-one": "1", "l-arr": "[]", "l-true": "true", "l-done-zero": JSON.stringify({ done: 0, at: "garbage" }) };
  const md = Object.keys(slugs).map((s, i) => `### ${i + 1}. ${s} · concept: c-one · core · demand 1 · format: Single card\n`).join("");
  const root = fixture({ briefs: { "math.md": md }, locks: slugs });
  const mine = run(["--list", "--domain=math", `--repo=${root}`]);
  const got = mine.json.eligible.map((r) => r.slug);
  assert.deepEqual(got, ["l-one", "l-arr", "l-true", "l-done-zero"]);
  assert.equal(mine.json.counts.ineligible.locked, 4);
  for (const s of ["l-null", "l-zero"]) assert.equal(run(["math.md", s, `--repo=${root}`, "--json"]).code, 1, `${s} blocks`);
  assert.deepEqual(claimOrder(root, "math").out, got, "parity with claim.mjs next");
});

// Review fix (queue/readBrief duplicates): claim.mjs rules are per slug, so a slug in two files is handed out once.
test("a slug in two files of one domain and in another domain is listed once and blocks a single read", () => {
  const dup = (n) => `### ${n}. dup-x · concept: c-one · core · demand 1 · format: Single card\n`;
  const briefs = { "math.md": `### 1. m-first · concept: c-one · core · demand 1 · format: Single card\n${dup(2)}${dup(3)}`, "math.geometry.md": dup(1), "cs.md": `${dup(1)}### 2. cs-two · concept: k · core · demand 1 · format: Single card\n` };
  const root = fixture({ briefs });
  const mine = run(["--list", `--repo=${root}`]).json;
  assert.deepEqual(mine.eligible.map((r) => `${r.domain}:${r.slug}`), ["math:m-first", "math:dup-x", "cs:cs-two"]);
  assert.equal(mine.counts.eligible, 3); assert.equal(mine.counts.duplicateHeadings, 3);
  assert.equal(mine.findings.filter((f) => f.code === "duplicate").length, 3);
  const handed = [...claimOrder(root, "math").out, ...claimOrder(root, "cs").out];
  assert.deepEqual(handed, ["m-first", "dup-x", "cs-two"], "claim.mjs hands dup-x out once");
  const root2 = fixture({ briefs });
  const second = run(["math.geometry.md", "dup-x", `--repo=${root2}`, "--json"]);
  assert.equal(second.code, 1);
  const f = second.json.findings.find((x) => x.code === "duplicate");
  assert.deepEqual(f.copies, ["company/domains/briefs/cs.md:1", "company/domains/briefs/math.geometry.md:1", "company/domains/briefs/math.md:2", "company/domains/briefs/math.md:3"]);
  assert.equal(second.json.eligibility.queueEntry, "company/domains/briefs/math.md:2", "the queue entry is the first copy, not this one");
});

// Review fix (concept prefix): "concept: <domain>:<id>" is looked up as <id> (company.mjs:376 compares bare ids).
test("a domain-prefixed concept is stripped before the curriculum lookup", () => {
  const md = `### 1. pre-a · concept: math:c-one · core · demand 1 · format: Single card\n- Needs interaction-designer spec: no.\n- Prediction: "Q?" options: A. x / B. y (answer: A).\n- Planned claims:\n  1. x. support: derivation.\n### 2. pre-b · concept: cs:c-one · core · demand 1 · format: Single card\n### 3. pre-c · concept: math:c-nope · core · demand 1 · format: Single card\n`;
  const root = fixture({ briefs: { "math.md": md } });
  const a = run(["math.md", "pre-a", `--repo=${root}`, "--json"]).json;
  assert.equal(a.brief.concept, "c-one"); assert.equal(a.brief.conceptRaw, "math:c-one"); assert.deepEqual(a.findings, []);
  assert.ok(run(["math.md", "pre-b", `--repo=${root}`, "--json"]).json.findings.some((f) => f.code === "concept-prefix-mismatch"));
  assert.ok(run(["math.md", "pre-c", `--repo=${root}`, "--json"]).json.findings.some((f) => f.code === "unknown-concept"), "a missing concept still warns");
});

// Review fix (inline claims): "(1) … (2) …" on the bullet line (economics.md:17) is itemised.
test("inline (1) … (2) … claim lists are itemised; markers must run in order", () => {
  const items = splitInline("(1) balance = deposit × (1+r)^t, redo by calculator; (2) 76,123 and the 24.5% gap, arithmetic; (3) Not claimed: real returns.");
  assert.deepEqual(items.map((i) => i.n), [1, 2, 3]);
  assert.equal(items[0].raw, "balance = deposit × (1+r)^t, redo by calculator", "(1+r) is not a marker");
  assert.deepEqual(splitInline("only one (1) here"), []);
  const md = `### 1. inl-a · concept: c-one · core · demand 1 · format: Single card\n- Needs interaction-designer spec: no.\n- Prediction: "Q?" options: A. x / B. y (answer: A).\n- Claims to check: (1) a = b, arithmetic; (2) c. support: derivation; (3) Not claimed: d.\n`;
  const root = fixture({ briefs: { "math.md": md } });
  const r = run(["math.md", "inl-a", `--repo=${root}`]);
  assert.equal(r.code, 0);
  assert.deepEqual(r.json.brief.plannedClaims.map((c) => [c.n, c.style, c.supportEnum, c.notClaimed]), [[1, "inline", null, false], [2, "inline", "derivation", false], [3, "inline", null, true]]);
  assert.ok(r.lines.some((l) => l.startsWith("Planned claims: 2 (+1 not claimed) (1: no support, 2: derivation)")));
  assert.deepEqual(r.json.findings.map((f) => [f.code, f.claims]), [["inline-claims-no-support", [1]]]);
});

// Review fix (needs-spec): the variant forms in the real briefs (lines quoted from the files named).
test("needs-spec variants: an-form, prose after the colon, no colon, no-spec-needed, heading marker", () => {
  const cases = [
    ["- Format: Simulation run. Needs an interaction-designer spec: no (row of 100 dots)", "no", "explicit"],        // probability.statistics.md:24
    ["- Format: Before / after toggle. **Needs an interaction-designer spec**: the toggle plus slider", "yes", "stated-need"], // cs.systems.md:18
    ["- Interaction: … **Needs an interaction-designer spec** for 8 small multiples at 390 px (S2-20).", "yes", "stated-need"], // probability.chance.md:39
    ["- Format: Single card with a step-run button (spec: needs interaction-designer spec).", "yes", "stated-need"],   // economics.markets.md:59
    ["- **New need: interaction-designer spec (one page) for the tint**", "yes", "stated-need"],                      // math.discrete.md:371
    ["- Format: Single card. No interaction-designer spec needed: default format, ≤ 6 controls.", "no", "no-spec-needed"], // behavioral.md:27
    ["- Format: Single card. No interaction-designer spec required; it is", "no", "no-spec-needed"],                  // cs.systems.md:31
    ["- Needs interaction-designer spec: done (W-1568).", "done", "explicit"],
    ["- Format: Single card.", null, null],
  ];
  for (const [text, value, form] of cases) { const r = parseNeedsSpec(text); assert.deepEqual([r.value, r.form], [value, form], text); }
  const head = "### 3. all-lines-meet-in-one-mother · concept: life:coalescent-mrca · core · demand 2 · format: Storyboard / scrub · needs interaction-designer spec"; // life.genetics-evolution.md:21
  assert.equal(parseNeedsSpec(head, head).value, "yes"); assert.equal(parseNeedsSpec(head, head).formatMarker, true);
  assert.equal(parseNeedsSpec("### 1. x · format: Single card · **needs spec**\n- Needs interaction-designer spec: no.", "### 1. x · format: Single card · **needs spec**").conflict, true);
});

// Review fix (lock location): claim.mjs keeps locks under the checkout its script sits in (claim.mjs:19-23).
test("lock roots: a lock in a second checkout blocks; claimRootOf cuts .claude/worktrees; outside-repo warns", () => {
  const root = fixture({ briefs: { "math.md": `### 1. held-x · concept: c-one · core · demand 1 · format: Single card\n` } });
  const main = fs.mkdtempSync(path.join(os.tmpdir(), "brief-main-")); TMP.push(main);
  fs.mkdirSync(path.join(main, "company/ops/claims"), { recursive: true });
  fs.writeFileSync(path.join(main, "company/ops/claims/held-x.json"), JSON.stringify({ slug: "held-x", agent: "builder", at: new Date().toISOString() }));
  assert.equal(run(["math.md", "held-x", `--repo=${root}`]).code, 0, "fixture locks only: free");
  const r = run(["math.md", "held-x", `--repo=${root}`, `--locks=${root},${main}`, "--json"]);
  assert.equal(r.code, 1); assert.ok(r.json.findings.find((f) => f.code === "locked").msg.includes(main));
  assert.equal(run(["--list", `--repo=${root}`, `--locks=${root},${main}`]).json.counts.ineligible.locked, 1);
  assert.equal(lockState([root, main], "held-x").state, "held");
  assert.equal(claimRootOf("/x/repo/.claude/worktrees/agent-1"), "/x/repo");
  assert.equal(claimRootOf("/home/user/s3c-wt/base"), "/home/user/s3c-wt/base");
  assert.deepEqual(defaultLockRoots(root), fs.existsSync(MAIN_CHECKOUT) ? [root, MAIN_CHECKOUT] : [root]);
  const other = fs.mkdtempSync(path.join(os.tmpdir(), "brief-other-")); TMP.push(other);
  fs.writeFileSync(path.join(other, "math.md"), `### 1. held-x · concept: c-one · core · demand 1 · format: Single card\n`);
  assert.ok(run([path.join(other, "math.md"), "held-x", `--repo=${root}`, "--json"]).json.findings.some((f) => f.code === "outside-repo"));
});

// Real data (read-only): the three M4 candidates (plan §M4 "Live run"; maps.json maps[1].facts[20]).
test("real repo: the M4 candidates parse, need no interaction-designer spec, and are eligible", { skip: !fs.existsSync(CLAIM) && "no company repo" }, () => {
  const claimsDirBefore = fs.existsSync(path.join(REPO, "company/ops/claims"));
  const want = [
    ["math.geometry.md", "one-metre-more-rope", 1, 4, "circumference-linear-in-radius"],
    ["math.geometry.md", "three-sticks-one-triangle", 3, 3, "triangle-inequality"],
    ["math.discrete.md", "four-cards-one-rule", 1, 3, "conditional-falsification"],
  ];
  for (const [f, slug, n, claims, concept] of want) {
    const r = run([f, slug, `--repo=${REPO}`, "--json"]);
    assert.equal(r.code, 0, JSON.stringify(r.json.findings));
    const b = r.json.brief;
    assert.equal(b.n, n); assert.equal(b.concept, concept); assert.equal(b.format, "Single card");
    assert.equal(b.needsSpec.value, "no"); assert.equal(b.plannedClaims.length, claims);
    assert.equal(r.json.eligibility.built, false); assert.equal(r.json.eligibility.skipped, null);
    assert.equal(r.json.managers.manager, "cm-math");
    assert.equal(r.json.eligibility.queueEntry, `company/domains/briefs/${f}:${b.line}`);
  }
  const fc = run(["math.discrete.md", "four-cards-one-rule", `--repo=${REPO}`]);
  assert.ok(fc.lines.some((l) => l.startsWith("Planned claims: 2 (+1 not claimed)")), "header counts real claims only");
  assert.equal(fs.existsSync(path.join(REPO, "company/ops/claims")), claimsDirBefore, "brief.mjs created company/ops/claims");
});

test("real repo: --list matches the real claim.mjs on a skeleton copy (briefs, skips, built set)", { skip: !fs.existsSync(CLAIM) && "no company repo" }, () => {
  const root = fs.mkdtempSync(path.join(os.tmpdir(), "brief-real-")); TMP.push(root);
  fs.cpSync(path.join(REPO, "company/domains/briefs"), path.join(root, "company/domains/briefs"), { recursive: true });
  fs.cpSync(path.join(REPO, "content"), path.join(root, "content"), { recursive: true });
  fs.mkdirSync(path.join(root, "company/ops"), { recursive: true });
  fs.copyFileSync(path.join(REPO, "company/ops/brief-skips.json"), path.join(root, "company/ops/brief-skips.json"));
  fs.mkdirSync(path.join(root, "tools")); fs.copyFileSync(CLAIM, path.join(root, "tools/claim.mjs"));
  const demos = path.join(REPO, "src/demos");
  for (const d of fs.readdirSync(demos)) {
    if (!fs.statSync(path.join(demos, d)).isDirectory()) continue;
    for (const s of fs.readdirSync(path.join(demos, d))) if (fs.existsSync(path.join(demos, d, s, "meta.json"))) { fs.mkdirSync(path.join(root, "src/demos", d, s), { recursive: true }); fs.writeFileSync(path.join(root, "src/demos", d, s, "meta.json"), "{}"); }
  }
  const mine = run(["--list", `--repo=${root}`]).json;
  const real = run(["--list", `--repo=${REPO}`, `--locks=${REPO}`]).json; // same lock root as the skeleton
  assert.deepEqual(mine.eligible.map((r) => r.slug), real.eligible.map((r) => r.slug), "skeleton and real repo agree");
  for (const d of Object.keys(mine.perDomain)) {
    const want = mine.eligible.filter((r) => r.domain === d).map((r) => r.slug);
    const got = claimOrder(root, d);
    if (mine.perDomain[d].error) assert.ok(got.error); else assert.deepEqual(got.out, want, `parity for ${d}`);
  }
  for (const s of ["one-metre-more-rope", "three-sticks-one-triangle", "four-cards-one-rule"]) assert.ok(mine.eligible.some((r) => r.slug === s), `${s} eligible`);
});
