import { test } from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import { spawnSync } from "node:child_process";

// M4 audit (plan 2026-10-21 §2): the lesson flow end to end, every kernel feature composed in one spec and driven only
// through the CLI, as agents and the supervisor drive it. build → test1 cmd (K1) → qa async (K2) → walk async → check
// (K3 role fact-checker, K4 independent, K6 pack history:false, K12 post) → learner (role, post with routes) → launch
// (role, post) → gates cmd → ship (release, cmd with K11 routes); K5 worktree, K7 commits, K8 park/cancel, K9 cap.
// The adapters are fakes that keep adapters/s3c's contract: "<severity> <kind>: <message>" lines, then the LAST stdout
// line one JSON {ok, findings[{severity, kind, message, route}]}; exit 0 pass, 1 revise, 3 stage-error.
const LIVE = fs.mkdtempSync(path.join(os.tmpdir(), "meta-s3c-"));
const HERE = path.dirname(new URL(import.meta.url).pathname);
const { validateSpec } = await import("../generator.mjs");
const { flowProblems } = await import("../lib.mjs");
const git = (cwd, ...args) => { const r = spawnSync("git", ["-C", cwd, ...args], { encoding: "utf8" }); assert.equal(r.status, 0, r.stderr); return r.stdout.trim(); };

// ---- the company repo (a temp git repo) and the fake adapters (outside it: the spec names them by absolute path)
const REPO = path.join(LIVE, "repo"), ROOT = path.join(LIVE, "wt"), BIN = path.join(LIVE, "bin"), FLAGS = path.join(LIVE, "flags");
for (const d of ["company/constitution", "company/reviews", "tests/qa", "tools", "src/demos/physics"]) fs.mkdirSync(path.join(REPO, d), { recursive: true });
fs.mkdirSync(BIN); fs.mkdirSync(FLAGS);
git(REPO, "init", "-q", "-b", "main"); git(REPO, "config", "user.email", "t@example.com"); git(REPO, "config", "user.name", "t");
fs.writeFileSync(path.join(REPO, "company/constitution/protected-paths.txt"), "company/constitution/protected-paths.txt\ntests/qa/**\ntools/company.mjs\n");
fs.writeFileSync(path.join(REPO, "tests/qa/contract.md"), "qa\n");
fs.writeFileSync(path.join(REPO, "tools/company.mjs"), "// the company CLI\n");
fs.writeFileSync(path.join(REPO, "company/reviews/_template-learner-review.md"), "lesson version: vN\nVerdict: launch|revise|fatal\n");
fs.writeFileSync(path.join(REPO, ".gitignore"), "artifacts/\n");
git(REPO, "add", "-A"); git(REPO, "commit", "-q", "-m", "base");
const BASE = git(REPO, "rev-parse", "HEAD");

const LIB = `import fs from "node:fs"; import path from "node:path"; import { spawnSync } from "node:child_process";
export const slug = process.argv[2], dir = path.join("src/demos/physics", slug), metaFile = path.join(dir, "meta.json");
export const meta = () => JSON.parse(fs.readFileSync(metaFile, "utf8"));
export const reviews = path.join("company/reviews", slug);
export const flag = (n) => { const f = path.join(${JSON.stringify(FLAGS)}, n); if (!fs.existsSync(f)) return false; fs.unlinkSync(f); return true; };
export function done(findings, exit = findings.some((f) => f.severity === "block") ? 1 : 0, extra = {}) {
  for (const f of findings) console.log(f.severity + " " + f.kind + ": " + f.message);
  console.log(JSON.stringify({ ok: exit === 0, slug, findings, ...extra })); process.exit(exit);
}
export const block = (kind, message, route = "build") => ({ severity: "block", kind, message, route });
export const changed = () => spawnSync("git", ["status", "--porcelain", "-uall"], { encoding: "utf8" }).stdout.split("\\n").filter(Boolean).map((l) => l.slice(3));
`;
const BINS = {
  "lib.mjs": LIB,
  // stages 2 and 8: the lesson's gates at build (pre-flight, design, claims never verified by the builder) and at ship
  "gates.mjs": `import fs from "node:fs"; import { meta, metaFile, dir, reviews, done, block, flag } from "./lib.mjs";
const stage = process.argv[3]; const f = [];
if (flag("gates-env")) done([{ severity: "environment", kind: "repo", message: "company check did not run" }], 3);
if (!fs.existsSync(metaFile)) done([block("lesson", "no " + metaFile)]);
const m = meta();
if (stage === "--stage=build") {
  if (!(fs.readFileSync(dir + "/build.md", "utf8").includes("## Pre-flight v" + m.version))) f.push(block("preflight", "build.md has no ## Pre-flight v" + m.version));
  if (!fs.existsSync(reviews + "/design.md")) f.push(block("design", "no design.md"));
  for (const c of m.claims) if (c.status !== "unverified") f.push(block("claims", c.id + " is " + c.status + " before the fact-check"));
  f.push({ severity: "advisory", kind: "copy-tell", message: "card 2 says 'delve'" });
} else {
  for (const c of m.claims) if (c.status !== "verified" || c.checkedBy !== "fact-checker") f.push(block("claims", "claims not verified: " + c.id, "check"));
}
done(f);
`,
  // stage 3: QA writes its record (a K7 commit) and an a11y advisory; exit 3 is "no evidence", a stage-error
  "qa.mjs": `import fs from "node:fs"; import { meta, reviews, done, flag } from "./lib.mjs";
if (flag("qa-no-evidence")) done([{ severity: "environment", kind: "fit", message: "reveal-fit: no evidence" }], 3);
const v = meta().version;
fs.mkdirSync(reviews, { recursive: true });
fs.writeFileSync(reviews + "/2026-10-22-qa.md", "result: **pass**\\nlesson version: v" + v + "\\nport: " + process.env.QA_PORT + "\\n");
done([{ severity: "advisory", kind: "a11y", message: "contrast 4.4 on card 3" }]);
`,
  // stage 4: the walkthrough (artifacts/ is gitignored: the learner's pack, never a commit)
  "walk.mjs": `import fs from "node:fs"; import { slug, meta, done } from "./lib.mjs";
const d = "artifacts/walkthroughs/" + slug; fs.mkdirSync(d, { recursive: true });
fs.writeFileSync(d + "/transcript.md", "walked v" + meta().version + "\\n"); fs.writeFileSync(d + "/sheet.png", "png");
done([]);
`,
  // stage 5 post: the diff guard (only meta.json and the fact-check record may change) and code's stamp
  "claims-guard.mjs": `import fs from "node:fs"; import { slug, meta, metaFile, reviews, done, block, changed } from "./lib.mjs";
const ok = (p) => p === metaFile || (p.startsWith(reviews + "/") && p.endsWith("-fact-check.md"));
const bad = changed().filter((p) => !ok(p));
if (bad.length) done([block("diff", "a fact-check may not change " + bad.join(", "), "check")]);
const rec = fs.existsSync(reviews) ? fs.readdirSync(reviews).filter((f) => f.endsWith("-fact-check.md")) : [];
if (!rec.length) done([block("record", "no " + reviews + "/<date>-fact-check.md", "check")]);
const m = meta();
if (fs.readFileSync(reviews + "/" + rec.sort().at(-1), "utf8").includes("all claims hold")) for (const c of m.claims) Object.assign(c, { status: "verified", checkedBy: "fact-checker", checkedOn: "2026-10-22" });
fs.writeFileSync(metaFile, JSON.stringify(m, null, 2) + "\\n");
done([{ severity: "advisory", kind: "stamp", message: "stamped " + m.claims.length + " claims" }]);
`,
  // stage 6 post: the newest learner review, for this version: launch → pass; revise → build; fatal → park; else refuse
  "learner-verdict.mjs": `import fs from "node:fs"; import { meta, reviews, done, block } from "./lib.mjs";
const fs_ = fs.existsSync(reviews) ? fs.readdirSync(reviews).filter((f) => /-learner-.*\\.md$/.test(f)).sort() : [];
if (!fs_.length) done([block("no-review", "no learner review", "learner")]);
const t = fs.readFileSync(reviews + "/" + fs_.at(-1), "utf8"), v = meta().version;
if (!t.includes("lesson version: v" + v)) done([block("version", "review is not for v" + v, "learner")]);
const verdict = (t.match(/^Verdict: (\\w+)/m) ?? [])[1];
if (verdict === "fatal") done([block("fatal", "Verdict: fatal", "park")], 1, { park: true });
if (verdict === "revise") done([block("revise", "Verdict: revise: " + (t.match(/^Why: (.*)$/m) ?? [])[1])]);
if (verdict !== "launch") done([block("unreadable", "no Verdict line", "learner")]);
done([]);
`,
  // stage 7 post: the launch record's shape (a decision line and an objection list), the record named by the evidence
  "launch-record.mjs": `import fs from "node:fs"; import { done, block } from "./lib.mjs";
const f = process.argv[3]; const t = fs.existsSync(f) ? fs.readFileSync(f, "utf8") : "";
const g = [];
if (!/^Decision: (go|no-go)$/m.test(t)) g.push(block("decision", f + " has no Decision: go|no-go line", "launch"));
if (!/^Objections:/m.test(t)) g.push(block("objections", f + " has no Objections: list", "launch"));
done(g);
`,
  // stage 9: publish (meta.status published); a flag makes one run fail as company publish would, with its reason line
  "publish.mjs": `import fs from "node:fs"; import { meta, metaFile, done, block, flag } from "./lib.mjs";
if (flag("publish-unverified")) done([block("publish", "claims not verified: c1", "check")]);
if (flag("publish-hold")) done([block("publish", "active publish hold: head-of-product ruling", "park")], 1, { park: true });
const m = meta(); m.status = "published"; fs.writeFileSync(metaFile, JSON.stringify(m, null, 2) + "\\n");
done([]);
`,
};
for (const [f, t] of Object.entries(BINS)) fs.writeFileSync(path.join(BIN, f), t);

// ---- the spec: the plan's §2 flow, as s3c-lessons.json would hold it
const bin = (f, ...args) => ["node", path.join(BIN, f), "${slug}", ...args];
const FINDINGS = { fromStdout: "^(?:block|advisory) [\\w-]+: (.*)$" };
const ROUTE = (...to) => Object.fromEntries(to.map((s) => [`"route":"${s}"`, s]));
export const SPEC = () => ({
  name: "s3c-lessons", title: "System 3 Company lessons (M4 audit)",
  rooms: [{ id: "lobby", floor: 1, kind: "lobby" }, { id: "ceo-office", floor: 1, kind: "office" }, { id: "studio", floor: 2, kind: "lane", lane: "s" }, { id: "review", floor: 3, kind: "quality" }, { id: "launch", floor: 3, kind: "launch" }],
  skills: ["manage", "build", "verify", "learn", "product", "release"],
  roles: [
    { id: "founder", level: "founder", human: true, room: "lobby", floor: 1 },
    { id: "cos", level: "chief-of-staff", reportsTo: "founder", room: "ceo-office", floor: 1 },
    { id: "head-of-product", level: "vp", reportsTo: "cos", room: "launch", floor: 3, skills: ["product"] },
    { id: "lead", level: "manager", reportsTo: "head-of-product", lane: "s", room: "studio", floor: 2, skills: ["manage"] },
    { id: "demo-builder", level: "builder", reportsTo: "lead", lane: "s", room: "studio", floor: 2, skills: ["build"], sessionMin: 60, maxTurns: 200 },
    { id: "fact-checker", level: "checker", reportsTo: "cos", room: "review", floor: 3, skills: ["verify"], sessionMin: 30, maxTurns: 120 },
    { id: "learner-evaluator", level: "evaluator", reportsTo: "cos", room: "review", floor: 3, skills: ["learn"], sessionMin: 30, maxTurns: 120 },
    { id: "release-manager", level: "release", reportsTo: "cos", room: "launch", floor: 3, skills: ["release"] },
  ],
  workspace: { kind: "git-worktree", repo: REPO, base: BASE, root: ROOT, run: "m4", env: { QA_PORT: "${port}", NEXT_DIST_DIR: ".next-${task}" }, commit: true },
  maxLoops: 3,
  flow: { name: "lesson", stages: [
    { stage: "build", signer: "builder", evidence: ["src/demos/<d>/<slug>/", "company/reviews/<slug>/design.md", "build.md"] },
    { stage: "test1", signer: "code", evidence: [], run: { argv: bin("gates.mjs", "--stage=build"), pass: { json: "ok", equals: true }, errorExit: [2, 3], findings: FINDINGS } },
    { stage: "qa", signer: "code", evidence: [], async: true, run: { argv: bin("qa.mjs"), errorExit: [2, 3], findings: FINDINGS, timeoutMs: 600_000 } },
    { stage: "walk", signer: "code", evidence: [], async: true, run: { argv: bin("walk.mjs"), errorExit: [2, 3], findings: FINDINGS } },
    { stage: "check", signer: { role: "fact-checker" }, independent: true, evidence: ["company/reviews/<slug>/<date>-fact-check.md"], pack: { exclude: ["build.md", "design.md"], history: false }, post: { argv: bin("claims-guard.mjs"), errorExit: [2, 3], findings: FINDINGS } },
    { stage: "learner", signer: { role: "learner-evaluator" }, evidence: ["company/reviews/<slug>/<date>-learner-*.md"], pack: { include: ["artifacts/walkthroughs/${slug}/", "company/reviews/_template-learner-review.md"], history: false }, post: { argv: bin("learner-verdict.mjs"), errorExit: [2, 3], findings: FINDINGS, route: ROUTE("park", "build") } },
    { stage: "launch", signer: { role: "head-of-product" }, evidence: ["company/rituals/records/<date>-launch-review-<slug>.md"], post: { argv: bin("launch-record.mjs", "${evidence}"), errorExit: [2, 3], findings: FINDINGS } },
    { stage: "gates", signer: "code", evidence: [], run: { argv: bin("gates.mjs", "--stage=ship"), pass: { json: "ok", equals: true }, errorExit: [2, 3], findings: FINDINGS, route: ROUTE("check") } },
    { stage: "ship", signer: "release", evidence: ["meta.status published"], run: { argv: bin("publish.mjs"), errorExit: [2, 3], findings: FINDINGS, route: ROUTE("park", "check", "learner", "qa") } },
  ] },
});

// ---- the CLI, as agents and the orchestrator call it
const ENV = { ...process.env, META_LIVE_DIR: LIVE };
delete ENV.NODE_TEST_CONTEXT;
function cli(file, ...args) {
  const r = spawnSync("node", [path.join(HERE, "..", file), ...args], { env: ENV, encoding: "utf8" });
  let out = null; try { out = r.stdout ? JSON.parse(r.stdout) : null; } catch { out = r.stdout; }
  return { code: r.status, out, err: r.stderr };
}
const meta = (...a) => cli("meta.mjs", ...a);
const ok = (r) => { assert.equal(r.code, 0, r.err || JSON.stringify(r.out)); return r.out; };
const order = (id) => ok(meta("flow", "show", id));
const tick = () => ok(cli("supervisor.mjs", "tick")).steps;
/** Tick (async jobs end on their own) until `pred` holds; every step seen is returned. */
async function tickUntil(pred, ms = 20000) {
  const end = Date.now() + ms, seen = [];
  for (;;) {
    seen.push(...tick());
    if (pred()) return seen;
    if (Date.now() > end) throw new Error(`timed out; steps ${JSON.stringify(seen.map((s) => `${s.step}:${s.result}`))}`);
    await new Promise((r) => setTimeout(r, 100));
  }
}
const SLUG = "orbit-speed";
const W = (o, f) => path.join(ROOT, o.task ?? SLUG, f);
const write = (o, f, t) => { fs.mkdirSync(path.dirname(W(o, f)), { recursive: true }); fs.writeFileSync(W(o, f), t); };
const msgOf = (q, id) => ok(meta("queue", q)).find((m) => m.order === id);
function enter(q, role, id) {
  const m = msgOf(q, id);
  assert.ok(m, `${q} holds a message for ${id}`);
  return ok(meta("room", "enter", `--msg=${m.msg}`, `--role=${role}`));
}
const leave = (p, ...flags) => meta("room", "leave", `--run=${p.run}`, ...flags);
function buildLesson(p, version) {
  const o = { task: p.task };
  write(o, `src/demos/physics/${p.task}/Demo.tsx`, `export default () => "v${version}";\n`);
  write(o, `src/demos/physics/${p.task}/build.md`, `notes for v${version}: BUILDER-ACCOUNT\n## Pre-flight v${version}\n`);
  write(o, `src/demos/physics/${p.task}/meta.json`, JSON.stringify({ slug: p.task, version, status: "review", claims: [{ id: "c1", text: "v = sqrt(GM/r)", status: "unverified" }] }, null, 2) + "\n");
  write(o, `company/reviews/${p.task}/design.md`, "design\n");
}
const lessonMeta = (task = SLUG) => JSON.parse(fs.readFileSync(path.join(ROOT, task, `src/demos/physics/${task}/meta.json`), "utf8"));

test("the plan's §2 lesson flow validates as one spec, every kernel feature on", () => {
  assert.deepEqual(validateSpec(SPEC()), []);
  assert.deepEqual(flowProblems(SPEC().flow), []);
  // the flow has no release stage (deploy is not in the flow) and no stage signs code an agent wrote
  assert.equal(SPEC().flow.stages.some((s) => s.stage === "release"), false);
  const bad = (f) => { const s = SPEC(); f(s.flow.stages); return validateSpec(s).join("\n"); };
  assert.match(bad((st) => { st[5].post.route = { x: "launch" }; }), /stage learner: post: route "x" goes to launch, not an earlier stage/);
  assert.match(bad((st) => { st[1].run.errorExit = [0]; }), /errorExit is a list of non-zero exit codes/);
});

test("an order moves through build → test1 → qa → walk → check → learner → launch → gates → ship, CLI only", async () => {
  const f = path.join(LIVE, "lessons.json");
  fs.writeFileSync(f, JSON.stringify(SPEC(), null, 1));
  ok(meta("init", `--spec-file=${f}`));
  const id = ok(meta("order", "new", "--to=lead", "--title=Orbit speed", `--task=${SLUG}`, "--accept=a lesson in ${workdir}/src/demos/physics/${slug}/")).order;
  ok(meta("order", "delegate", id, "--by=lead", "--to=demo-builder"));

  // K5: the tick makes the order's worktree once; build happens there
  let steps = tick();
  assert.equal(steps.find((s) => s.step === "workspace").result, "created");
  let p = enter("demo-builder", "demo-builder", id);
  assert.equal(p.workdir, path.join(ROOT, SLUG) + "/");
  assert.equal(p.branch, `meta/m4-${SLUG}`);
  assert.equal(p.accept, `a lesson in ${path.join(ROOT, SLUG)}/src/demos/physics/${SLUG}/`);
  assert.equal(p.env.QA_PORT, "3101", "${port} = portBase + order number");
  buildLesson(p, 1);
  let r = ok(leave(p, `--evidence=src/demos/physics/${SLUG}/`));
  assert.equal(r.next_stage, "test1");
  assert.match(r.commit, /^[0-9a-f]{40}$/, "K7: the build is committed");

  // K1 test1 (sync cmd, advisory copy-tell on a pass), K2 qa: exit 3 is a stage-error (held, no revise), retried
  fs.writeFileSync(path.join(FLAGS, "qa-no-evidence"), "");
  steps = await tickUntil(() => order(id).stageError);
  const t1 = steps.find((s) => s.step === "test1");
  assert.deepEqual([t1.result, t1.findings], ["pass", "card 2 says 'delve'"]);
  let o = order(id);
  assert.deepEqual([o.stage, o.loops], ["qa", 0], "exit 3 is not a revise");
  assert.match(o.stageError.why, /exit 3/);
  assert.equal(tick().filter((s) => s.order === id).length, 0, "held until a retry");
  ok(cli("supervisor.mjs", "retry", `--order=${id}`));
  steps = await tickUntil(() => order(id).stage === "check");
  assert.deepEqual(steps.filter((s) => s.kind === "job" && s.result !== "started").map((s) => `${s.step}:${s.result}`), ["qa:pass", "walk:pass"]);
  assert.match(fs.readFileSync(W({}, `company/reviews/${SLUG}/2026-10-22-qa.md`), "utf8"), /port: 3101/, "K5 env reaches an async job");
  assert.ok(fs.existsSync(W({}, `artifacts/walkthroughs/${SLUG}/transcript.md`)));

  // K4: the builder may not take the fact-check; K3: it is addressed to role:fact-checker, not a pool
  assert.equal(ok(meta("queue", "pool:checker")).length, 0);
  const fcMsg = msgOf("role:fact-checker", id);
  assert.equal(meta("room", "enter", `--msg=${fcMsg.msg}`, "--role=demo-builder").code, 1);
  // the supervisor plans the fact-checker for it (never the builder), and K10's launch config starts it in the worktree
  const planned = ok(cli("supervisor.mjs", "tick")).plan;
  assert.ok(planned.some((x) => x.role === "fact-checker" && x.msgs.includes(fcMsg.msg)), JSON.stringify(planned));
  assert.ok(!planned.some((x) => x.role === "demo-builder" && x.msgs.includes(fcMsg.msg)));
  const lc = ok(meta("launch", "config", "--role=fact-checker", `--msgs=${fcMsg.msg}`));
  assert.deepEqual([lc.workdir, lc.sessionMin, lc.maxTurns], [path.join(ROOT, SLUG), 30, 120]);
  // K6: the fact-checker's pack has no account (findings, history, build.md, design.md)
  p = enter("role:fact-checker", "fact-checker", id);
  assert.equal(p.findings, null); assert.deepEqual(p.history, []); assert.ok(p.history_withheld);
  assert.ok(p.files.includes(`src/demos/physics/${SLUG}/meta.json`));
  assert.ok(!p.files.some((x) => /build\.md|design\.md/.test(x)), JSON.stringify(p.files));
  assert.match(p.leave_with, /--verdict=pass\|revise/);
  // K12: no record → the leave is refused, the run stays open; an edit outside the checker's files is refused too
  r = leave(p, `--evidence=company/reviews/${SLUG}/2026-10-22-fact-check.md`);
  assert.equal(r.code, 1); assert.match(r.err, /no company\/reviews\/orbit-speed\/<date>-fact-check.md/);
  write({}, `src/demos/physics/${SLUG}/Demo.tsx`, "rewritten by the checker\n");
  write({}, `company/reviews/${SLUG}/2026-10-22-fact-check.md`, "all claims hold\n");
  r = leave(p, `--evidence=company/reviews/${SLUG}/2026-10-22-fact-check.md`);
  assert.equal(r.code, 1); assert.match(r.err, /may not change src\/demos\/physics\/orbit-speed\/Demo.tsx/);
  git(path.join(ROOT, SLUG), "checkout", "--", `src/demos/physics/${SLUG}/Demo.tsx`);
  ok(leave(p, `--evidence=company/reviews/${SLUG}/2026-10-22-fact-check.md`));
  assert.deepEqual(lessonMeta().claims.map((c) => [c.status, c.checkedBy]), [["verified", "fact-checker"]], "code stamped the claims");

  // stage 6: the learner reads only the walkthrough and the template (K6 templated include); a revise review routes
  // the order back to build through the post-check's route, whatever verdict the agent typed (K12 + K11)
  p = enter("role:learner-evaluator", "learner-evaluator", id);
  assert.deepEqual(p.files, ["artifacts/walkthroughs/orbit-speed/sheet.png", "artifacts/walkthroughs/orbit-speed/transcript.md", "company/reviews/_template-learner-review.md"]);
  assert.match(p.leave_with, /--verdict=pass\|revise/, "an independent stage's hand-in can revise (not only check's)");
  write({}, `company/reviews/${SLUG}/2026-10-22-learner-cold.md`, "lesson version: v1\nVerdict: revise\nWhy: the reveal comes before the prediction\n");
  r = ok(leave(p, `--evidence=company/reviews/${SLUG}/2026-10-22-learner-cold.md`));
  o = order(id);
  assert.deepEqual([o.stage, o.loops], ["build", 1], "the review's revise sends it back to build");
  assert.match(o.findings, /Verdict: revise: the reveal comes before the prediction/);
  assert.equal(o.history.at(-1).verdict, "revise");

  // loop 1: the builder fixes and bumps the version; stages 2-5 run again on the new version
  p = enter("demo-builder", "demo-builder", id);
  assert.match(p.findings, /reveal comes before the prediction/, "the builder's pack carries the findings");
  buildLesson(p, 2);
  ok(leave(p, `--evidence=src/demos/physics/${SLUG}/`));
  await tickUntil(() => order(id).stage === "check");
  p = enter("role:fact-checker", "fact-checker", id);
  assert.equal(p.findings, null, "the re-check still sees no prior findings");
  write({}, `company/reviews/${SLUG}/2026-10-23-fact-check.md`, "all claims hold\n");
  ok(leave(p, `--evidence=company/reviews/${SLUG}/2026-10-23-fact-check.md`));
  p = enter("role:learner-evaluator", "learner-evaluator", id);
  write({}, `company/reviews/${SLUG}/2026-10-23-learner-cold.md`, "lesson version: v1\nVerdict: launch\n");
  r = leave(p, `--evidence=company/reviews/${SLUG}/2026-10-23-learner-cold.md`);
  assert.equal(r.code, 1, "a review for another version is the record's defect: refused, fixed in-session");
  write({}, `company/reviews/${SLUG}/2026-10-23-learner-cold.md`, "lesson version: v2\nVerdict: launch\n");
  ok(leave(p, `--evidence=company/reviews/${SLUG}/2026-10-23-learner-cold.md`));

  // stage 7: the launch record's shape is code's to check
  p = enter("role:head-of-product", "head-of-product", id);
  const rec = `company/rituals/records/2026-10-22-launch-review-${SLUG}.md`;
  write({}, rec, "Decision: go\n");
  r = leave(p, `--evidence=${rec}`);
  assert.equal(r.code, 1); assert.match(r.err, /has no Objections: list/);
  write({}, rec, "Decision: go\nObjections:\n- none raised (asked twice)\n");
  ok(leave(p, `--evidence=${rec}`));

  // stages 8-9: gates pass; publish refuses once with "claims not verified" → K11 routes it to check, not a rebuild
  fs.writeFileSync(path.join(FLAGS, "publish-unverified"), "");
  steps = tick();
  assert.deepEqual(steps.filter((s) => s.order === id && s.kind === "cmd").map((s) => `${s.step}:${s.result}`), ["gates:pass", "ship:revise"]);
  assert.equal(steps.find((s) => s.step === "ship").route, "check");
  o = order(id);
  assert.deepEqual([o.stage, o.loops, o.history.at(-1).to], ["check", 2, "check"]);
  p = enter("role:fact-checker", "fact-checker", id);
  write({}, `company/reviews/${SLUG}/2026-10-24-fact-check.md`, "all claims hold\n");
  ok(leave(p, `--evidence=company/reviews/${SLUG}/2026-10-24-fact-check.md`));
  p = enter("role:learner-evaluator", "learner-evaluator", id);
  ok(leave(p, `--evidence=company/reviews/${SLUG}/2026-10-23-learner-cold.md`));
  p = enter("role:head-of-product", "head-of-product", id);
  ok(leave(p, `--evidence=${rec}`));
  steps = tick();
  assert.deepEqual(steps.filter((s) => s.order === id && s.kind === "cmd").map((s) => `${s.step}:${s.result}`), ["gates:pass", "ship:pass"]);
  o = order(id);
  assert.deepEqual([o.stage, o.loops], ["done", 2]);
  assert.equal(lessonMeta().status, "published");
  assert.deepEqual(o.signers, { check: "fact-checker", learner: "learner-evaluator", launch: "head-of-product" });
  assert.equal(o.history.filter((h) => h.stage === "ship").at(-1).by, "release-manager");

  // K7: one commit per stage that changed something, on the order's branch only; never [deploy], never protected
  const wt = path.join(ROOT, SLUG);
  const subjects = git(wt, "log", "--format=%s", `${BASE}..HEAD`).split("\n").reverse();
  assert.ok(subjects.every((s) => s.startsWith(`meta: ${id} `) && s.endsWith(` ${SLUG}`) && !/\[deploy\]/i.test(s)), subjects.join("\n"));
  assert.deepEqual([...new Set(subjects.map((s) => s.split(" ")[2]))], ["build", "qa", "check", "learner", "launch", "ship"]);
  assert.equal(git(wt, "status", "--porcelain"), "", "a clean tree");
  assert.equal(git(wt, "diff", "--name-only", BASE, "HEAD", "--", "tests", "tools", "company/constitution"), "");
  assert.equal(git(REPO, "rev-parse", "main"), BASE, "main is untouched: nothing is merged or pushed by the kernel");
  const ev = ok(meta("events"));
  assert.equal(ev.filter((e) => e.type === "refuse" && e.rule === "post-check").length, 4);
  assert.ok(ev.some((e) => e.type === "shipped" && e.order === id));
});

test("a learner's fatal and a publish hold park the order with an ask (K8 via a route); the orderer cancels or resumes", async () => {
  // reuses the state above: two more lessons, one each way
  const run = async (task) => {
    const id = ok(meta("order", "new", "--to=lead", `--title=${task}`, `--task=${task}`, "--accept=a lesson")).order;
    ok(meta("order", "delegate", id, "--by=lead", "--to=demo-builder"));
    tick();
    const p = enter("demo-builder", "demo-builder", id);
    buildLesson(p, 1);
    ok(leave(p, `--evidence=src/demos/physics/${task}/`));
    await tickUntil(() => order(id).stage === "check");
    const c = enter("role:fact-checker", "fact-checker", id);
    write({ task }, `company/reviews/${task}/2026-10-22-fact-check.md`, "all claims hold\n");
    ok(leave(c, `--evidence=company/reviews/${task}/2026-10-22-fact-check.md`));
    return id;
  };
  const a = await run("tides");
  let p = enter("role:learner-evaluator", "learner-evaluator", a);
  write({ task: "tides" }, "company/reviews/tides/2026-10-22-learner-cold.md", "lesson version: v1\nVerdict: fatal\n");
  ok(leave(p, "--evidence=company/reviews/tides/2026-10-22-learner-cold.md"));
  let o = order(a);
  assert.equal(o.stage, "parked");
  assert.deepEqual([o.parked.stage, o.loops], ["learner", 0], "a park is not a revise loop");
  assert.match(o.parked.reason, /Verdict: fatal/);
  const asks = ok(meta("ask", "summary"));
  assert.ok(JSON.stringify(asks).includes(a), "the park raised an ask about the order");
  assert.equal(tick().filter((s) => s.order === a).length, 0, "a parked order does nothing");
  ok(meta("order", "cancel", a, "--by=lead", "--reason=the idea cannot be taught this way"));
  assert.equal(order(a).stage, "cancelled");

  const b = await run("gravity");
  p = enter("role:learner-evaluator", "learner-evaluator", b);
  write({ task: "gravity" }, "company/reviews/gravity/2026-10-22-learner-cold.md", "lesson version: v1\nVerdict: launch\n");
  ok(leave(p, "--evidence=company/reviews/gravity/2026-10-22-learner-cold.md"));
  p = enter("role:head-of-product", "head-of-product", b);
  write({ task: "gravity" }, "company/rituals/records/2026-10-22-launch-review-gravity.md", "Decision: go\nObjections:\n");
  ok(leave(p, "--evidence=company/rituals/records/2026-10-22-launch-review-gravity.md"));
  fs.writeFileSync(path.join(FLAGS, "publish-hold"), "");
  const steps = tick();
  assert.equal(steps.find((s) => s.order === b && s.step === "ship").result, "park");
  o = order(b);
  assert.deepEqual([o.stage, o.parked.stage, o.loops], ["parked", "ship", 0]);
  assert.match(o.parked.reason, /active publish hold/);
  ok(meta("order", "resume", b, "--by=lead", "--reason=hold lifted"));
  const s2 = tick();
  assert.equal(s2.find((s) => s.order === b && s.step === "ship").result, "pass");
  assert.equal(order(b).stage, "done");
});

test("the cmd check as the adapters' contract needs it: errorExit, a JSON pass needs exit 0, the last line that parses", async () => {
  const { judgeCmd, validateCmd } = await import("../state.mjs");
  const J = { pass: { json: "ok", equals: true } };
  const run = (c, stdout, status) => judgeCmd(c, "x", { stdout, stderr: "", status, error: null, timedOut: false });
  // K1 audit: {"ok":true} then a crash after printing passed
  assert.equal(run(J, '{"ok":true}\n', 2).pass, false);
  assert.match(run(J, '{"ok":true}\n', 2).output, /exit 2/);
  assert.equal(run(J, '{"ok":true}\n', 0).pass, true);
  // K1 audit: an advisory line that looks like JSON after the JSON line was "stdout is not JSON"
  assert.equal(run(J, '{"ok":true}\n[advisory] x\n', 0).pass, true);
  // exit 3 with errorExit is a stage-error and never routes; without it, a revise as before
  const E = { errorExit: [3], route: { "route.:.check": "check" } };
  assert.deepEqual([run(E, '{"route":"check"}', 3).stageError, run(E, '{"route":"check"}', 3).route], [true, null]);
  assert.deepEqual([run({ route: E.route }, '{"route":"check"}', 3).stageError, run({ route: E.route }, '{"route":"check"}', 3).route], [false, "check"]);
  assert.match(validateCmd({ argv: ["x"], errorExit: [3, "4"] }), /errorExit is a list/);
  assert.match(validateCmd({ argv: ["x"], route: { a: "nowhere" } }, { stages: ["build"] }), /goes to nowhere, not an earlier stage \(build\) or park/);
  assert.equal(validateCmd({ argv: ["x"], route: { a: "park" } }, { stages: ["build"] }), null);
});
