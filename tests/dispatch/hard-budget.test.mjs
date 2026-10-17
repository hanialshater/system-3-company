// External assessment 2026-10-17 (company/reviews/org/2026-10-17-external-assessment.md), finding 2 and §3:
// (1) an unknown --role and a batch file that does not exist FAIL in every slot mode (warn mode no longer waves
// them through), while the other S rules keep the founder's F-28 warn rollout; (2) B1: a source that names a project
// must pass the ledger gate (tools/lib/ledger.mjs gate) with token-budget.md's grace rules.
// Every spawn uses a temp S3_SLOTS_DIR, S3_EVENTS, S3_PROJECTS and S3_LEDGER; nothing touches company/ops/.
// Run: npm run test:dispatch
import { test } from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import { execFileSync } from "node:child_process";
import { fileURLToPath } from "node:url";
import * as slots from "../../tools/lib/slots.mjs";
import { stubGitPath } from "./git-stub.mjs";

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "../..");
const CHECK = path.join(ROOT, "tools/dispatch-check.mjs");
const STUB_PATH = stubGitPath();
const has = (list, re) => list.some((l) => re.test(l));

// A register with one project per gate outcome (token-budget.md sections 4 and 6).
const REGISTER = {
  thresholds: { warnAt: 0.8 },
  projects: [
    { id: "fx-spent", title: "Exhausted", kind: "project", owner: "portfolio-manager", status: "approved", major: true, budget: { tokens: 1000 } },
    { id: "fx-topped", title: "Exhausted, then topped up", kind: "project", owner: "portfolio-manager", status: "approved", major: true, budget: { tokens: 1000, topUps: [{ tokens: 5000, record: "x.md" }] } },
    { id: "fx-near", title: "At 90%", kind: "project", owner: "portfolio-manager", status: "approved", major: true, budget: { tokens: 1000 } },
    { id: "fx-grace", title: "In flight, in grace", kind: "project", owner: "portfolio-manager", status: "in-flight", major: true, grandfatheredUntil: "2999-01-01T00:00:00Z" },
    { id: "fx-graceover", title: "In flight, grace over", kind: "project", owner: "portfolio-manager", status: "in-flight", major: true, grandfatheredUntil: "2026-10-16T23:59:00Z" },
    { id: "fx-line", title: "A line at 300%", kind: "line", owner: "portfolio-manager", status: "active", budget: { tokens: 1000 } },
  ],
};
const line = (project, tokens, i) => ({ id: `L-fx-${project}-${i}`, ts: "2026-10-16T12:00:00Z", project, role: "demo-builder", agent: `fx ${project} ${i}`, tokens, outcome: "done", attribution: "tagged", source: `fx:${i}` });
const LEDGER = [line("fx-spent", 1200, 1), line("fx-topped", 1200, 2), line("fx-near", 900, 3), line("fx-line", 3000, 4)];

function sandbox() {
  const d = fs.mkdtempSync(path.join(os.tmpdir(), "hard-budget-"));
  const ev = path.join(d, "events.jsonl");
  fs.writeFileSync(ev, "");
  fs.writeFileSync(path.join(d, "projects.json"), JSON.stringify(REGISTER));
  fs.writeFileSync(path.join(d, "ledger.jsonl"), LEDGER.map((l) => JSON.stringify(l)).join("\n") + "\n");
  return { d, ev, dir: path.join(d, "slots") };
}
// A fixture batch: poc tools-lead, lane 9, one tools-lead item per entry of `projects` (null = no project line on the
// item). headerProject, when set, goes on the batch header.
function batch(sb, projects, { headerProject } = {}) {
  const f = path.join(sb.d, `batch-${Math.random().toString(36).slice(2)}.md`);
  fs.writeFileSync(f, `# Dispatch request: fixture\npoc: tools-lead (Fixture)\nlane: 9 Company tools\n${headerProject ? `project: ${headerProject}\n` : ""}\n` +
    projects.map((p, i) => `## B${i + 1} · fixture item\nrole: tools-lead\nkind: other\n${p ? `project: ${p}\n` : ""}`).join("\n"));
  return f;
}
function run(sb, args, env = {}) {
  const e = { ...process.env, S3_SLOTS_DIR: sb.dir, S3_EVENTS: sb.ev, S3_PROJECTS: path.join(sb.d, "projects.json"), S3_LEDGER: path.join(sb.d, "ledger.jsonl"), PATH: STUB_PATH };
  delete e.S3_SLOTS; delete e.S3_SLOTS_S4;
  Object.assign(e, env);
  try { return { code: 0, ...JSON.parse(execFileSync(process.execPath, [CHECK, "--kind=other", "--running=0", "--no-claim", "--json", ...args], { env: e, encoding: "utf8" })) }; }
  catch (err) { return { code: err.status, ...JSON.parse(err.stdout) }; }
}

test("the assessment's reproduction now FAILs: unknown role and missing batch file, in warn mode (the default)", () => {
  const sb = sandbox();
  const r = run(sb, ["--role=does-not-exist", "--source=batch=missing.md#B1"]);
  assert.equal(r.slotMode, "warn");
  assert.equal(r.code, 1);
  assert.equal(r.ok, false);
  assert.ok(has(r.fails, /^S2 role does-not-exist has no \.claude\/agents\/does-not-exist\.md and is not a role in tools\/org\/roles\.mjs \[refused in every slot mode\]$/), r.fails.join("\n"));
  assert.ok(has(r.fails, /^S1 batch file missing\.md does not exist \[refused in every slot mode\]$/), r.fails.join("\n"));
});

test("hard S1/S2 fail in every slot mode, and each one alone is enough", () => {
  const sb = sandbox();
  const good = batch(sb, [null]);
  for (const mode of ["warn", "enforce"]) {
    const role = run(sb, ["--role=head-of-nothing", "--source=§4:integration: x"], { S3_SLOTS: mode });
    assert.equal(role.code, 1, `unknown role, ${mode}`);
    assert.ok(has(role.fails, /^S2 role head-of-nothing .*\[refused in every slot mode\]/));
    const file = run(sb, ["--role=tools-lead", `--source=batch=${path.join(sb.d, "nope.md")}#B1`], { S3_SLOTS: mode });
    assert.equal(file.code, 1, `missing batch file, ${mode}`);
    assert.ok(has(file.fails, /^S1 batch file .*nope\.md does not exist \[refused in every slot mode\]/));
    assert.equal(run(sb, ["--role=tools-lead", `--source=batch=${good}#B1`], { S3_SLOTS: mode }).code, 0, `a valid dispatch passes, ${mode}`);
  }
});

test("other S rules keep the F-28 warn rollout: a missing item, a wrong chooser, no source still only warn in warn mode", () => {
  const sb = sandbox();
  const f = batch(sb, [null]);
  for (const args of [["--role=tools-lead", `--source=batch=${f}#B9`], ["--role=tools-lead", `--source=batch=${f}#B1`, "--chooser=chief-of-staff"], ["--role=tools-lead", "--chooser=tools-lead"]]) {
    const w = run(sb, args);
    assert.equal(w.code, 0, `${args.join(" ")}: ${w.fails.join("; ")}`);
    assert.ok(has(w.warns, /^S1 .*\[S3_SLOTS=warn: not refused this round\]/), w.warns.join("\n"));
    assert.equal(run(sb, args, { S3_SLOTS: "enforce" }).code, 1, `${args.join(" ")} fails in enforce mode`);
  }
  // A role the org defines but that has no agent file (the founder) is not "unknown": S2 follows the mode.
  const founder = run(sb, ["--role=founder", "--source=§4:integration: x"]);
  assert.equal(founder.code, 0, founder.fails.join("\n"));
  assert.ok(has(founder.warns, /^S2 role founder has no \.claude\/agents\/founder\.md \[S3_SLOTS=warn/), founder.warns.join("\n"));
});

test("B1: a batch item tagged to a project whose budget is spent FAILs, in warn mode too", () => {
  const sb = sandbox();
  const f = batch(sb, ["[project:fx-spent]"]);
  for (const mode of ["warn", "enforce"]) {
    const r = run(sb, ["--role=tools-lead", `--source=batch=${f}#B1`], { S3_SLOTS: mode });
    assert.equal(r.code, 1, mode);
    assert.ok(has(r.fails, /^B1 budget fx-spent \(1k of 1k\): fx-spent has spent 1k of 1k \(100%\): new dispatches stop .*\(node tools\/ledger\.mjs gate --project=fx-spent\)$/), r.fails.join("\n"));
  }
});

test("B1 respects token-budget.md: top-ups count, 80% warns, grace periods pass with a warning, lines never block", () => {
  const sb = sandbox();
  const f = batch(sb, ["[project:fx-topped]", "[project:fx-near]", "[project:fx-grace]", "[project:fx-line]", "[project:fx-graceover]", null, "[project:fx-near]; [project:fx-spent] for the rest"], { headerProject: "[project:fx-grace]" });
  const at = (n) => run(sb, ["--role=tools-lead", `--source=batch=${f}#B${n}`]);
  const topped = at(1);
  assert.equal(topped.code, 0, topped.fails.join("\n"));
  assert.ok(has(topped.info, /^budget: fx-topped ok \(1k of 6k\), project named by the item$/), topped.info.join("\n"));
  const near = at(2);
  assert.equal(near.code, 0);
  assert.ok(has(near.warns, /^B1 budget fx-near \(1k of 1k\): fx-near is at 90%: owner files a forecast/), near.warns.join("\n"));
  const grace = at(3);
  assert.equal(grace.code, 0);
  assert.ok(has(grace.warns, /^B1 budget fx-grace.*allowed until 2999-01-01/), grace.warns.join("\n"));
  const lineR = at(4);
  assert.equal(lineR.code, 0, "a budget line never blocks small work (section 4)");
  assert.ok(has(lineR.warns, /^B1 budget fx-line .*300% of its line budget/), lineR.warns.join("\n"));
  const over = at(5);
  assert.equal(over.code, 1);
  assert.ok(has(over.fails, /^B1 budget fx-graceover: .*grace period ended 2026-10-16T23:59:00Z/), over.fails.join("\n"));
  const header = at(6);
  assert.equal(header.code, 0);
  assert.ok(has(header.info, /^budget: fx-grace warn, project named by the header$/), header.info.join("\n"));
  const two = at(7);
  assert.equal(two.code, 1, "an item naming two projects is gated on each");
  assert.ok(has(two.fails, /^B1 budget fx-spent/) && has(two.warns, /^B1 budget fx-near/));
});

test("B1: no project named (a §4 source, an untagged batch) is never gated; an unreadable register follows the mode", () => {
  const sb = sandbox();
  assert.equal(run(sb, ["--role=tools-lead", "--source=§4:integration: x"]).code, 0);
  const f = batch(sb, [null]);
  const ok = run(sb, ["--role=tools-lead", `--source=batch=${f}#B1`]);
  assert.ok(!has([...ok.fails, ...ok.warns, ...ok.info], /^B1|^budget:/), "untagged work is small work (section 6)");
  const tagged = batch(sb, ["[project:fx-near]"]);
  fs.writeFileSync(path.join(sb.d, "projects.json"), "{not json");
  const w = run(sb, ["--role=tools-lead", `--source=batch=${tagged}#B1`]);
  assert.equal(w.code, 0);
  assert.ok(has(w.warns, /^S3 ledger error \(reading the token ledger for B1\)/), w.warns.join("\n"));
  assert.equal(run(sb, ["--role=tools-lead", `--source=batch=${tagged}#B1`], { S3_SLOTS: "enforce" }).code, 1);
});

test("sourceProjects reads the item's project line, else the header's; bare one-word ids count, prose does not", () => {
  const sb = sandbox();
  const f = batch(sb, ["catalog", "[project:history] for W-1; [project:first-light]", "report tokens separately", null], { headerProject: "[project:maintenance]" });
  const sp = (n) => slots.sourceProjects(`batch=${f}#B${n}`, { root: ROOT });
  assert.deepEqual(sp(1), { projects: ["catalog"], from: "item" });
  assert.deepEqual(sp(2), { projects: ["history", "first-light"], from: "item" });
  assert.deepEqual(sp(3), { projects: ["maintenance"], from: "header" });
  assert.deepEqual(sp(4), { projects: ["maintenance"], from: "header" });
  assert.deepEqual(slots.sourceProjects("§4:integration: x"), { projects: [], from: null });
  assert.deepEqual(slots.sourceProjects(`batch=${path.join(sb.d, "nope.md")}#B1`), { projects: [], from: null });
  // The real r2 history batch names history on its items.
  assert.deepEqual(slots.sourceProjects("batch=company/ops/dispatch-requests/2026-10-16-r2-history.md#B1", { root: ROOT }).projects, ["history"]);
});

test("ledger check --summary (the npm run verify step) prints counts by project and always exits 0", () => {
  const sb = sandbox();
  const env = { ...process.env, S3_PROJECTS: path.join(sb.d, "projects.json"), S3_LEDGER: path.join(sb.d, "ledger.jsonl") };
  const LEDGER_CLI = path.join(ROOT, "tools/ledger.mjs");
  const out = execFileSync(process.execPath, [LEDGER_CLI, "check", "--summary"], { env, encoding: "utf8" }); // throws on a non-zero exit
  assert.match(out, /^ledger check \(informational, never fails verify\): \d+ error\(s\), \d+ warning\(s\); errors by project: fx-/);
  let full = 0;
  try { execFileSync(process.execPath, [LEDGER_CLI, "check"], { env, encoding: "utf8", stdio: ["ignore", "pipe", "pipe"] }); } catch (e) { full = e.status; }
  assert.equal(full, 1, "the full check still exits 1 on an error");
});
