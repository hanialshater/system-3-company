// W-1196 / W-1173 (retro 2026-10-16 C2): the slot ledger and dispatch-check rules S1-S4, warn vs enforce.
// Every test uses its own S3_SLOTS_DIR and S3_EVENTS in a temp folder: nothing touches company/ops/slots/ or
// company/ops/events.jsonl. Run: npm run test:dispatch
import { test } from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import { execFileSync, spawn } from "node:child_process";
import { fileURLToPath } from "node:url";
import * as slots from "../../tools/lib/slots.mjs";
import { stubGitPath } from "./git-stub.mjs";

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "../..");
const CHECK = path.join(ROOT, "tools/dispatch-check.mjs");
const LIB = path.join(ROOT, "tools/lib/slots.mjs");
const TOOLS_B2 = "batch=company/ops/dispatch-requests/2026-10-16-r2-tools.md#B2";

function sandbox() {
  const d = fs.mkdtempSync(path.join(os.tmpdir(), "slots-"));
  const ev = path.join(d, "events.jsonl");
  fs.writeFileSync(ev, "");
  return { d, dir: path.join(d, "slots"), ev };
}
// A fixture batch file (absolute path, so the source resolves outside the repo).
function batch(d, name, { poc, lane, items }) {
  const f = path.join(d, name);
  fs.writeFileSync(f, `# Dispatch request: fixture\npoc: ${poc} (Fixture)\nlane: ${lane} Fixture lane\n\n` +
    items.map((r, i) => `## B${i + 1} · fixture item · board W-0\nrole: ${r}\nkind: other\n`).join("\n"));
  return f;
}
// G5-d (2026-10-16-r5-tools.md#B3): the spawns run with a stub git (tests/dispatch/git-stub.mjs says why). No test
// here reads R1 or C3, the only rules that call git; every run is --kind=other. The slow suite cross-checks real git.
const SLOW = process.env.S3_SLOW_TESTS === "1";
const STUB_PATH = stubGitPath();
function run(args, { dir, ev }, env = {}, { realGit = false } = {}) {
  const e = { ...process.env, S3_SLOTS_DIR: dir, S3_EVENTS: ev, ...env };
  delete e.S3_SLOTS; delete e.S3_SLOTS_S4;
  Object.assign(e, env);
  if (!realGit) e.PATH = STUB_PATH;
  try { return { code: 0, ...JSON.parse(execFileSync(process.execPath, [CHECK, "--kind=other", "--running=0", "--json", ...args], { env: e, encoding: "utf8" })) }; }
  catch (err) { return { code: err.status, ...JSON.parse(err.stdout) }; }
}
const has = (list, re) => list.some((l) => re.test(l));
const writeSlot = (dir, s) => { fs.mkdirSync(dir, { recursive: true }); fs.writeFileSync(path.join(dir, `${s.id}.json`), JSON.stringify(s) + "\n"); };

test("done-when: the B2 dispatch passes, claims one slot with role, lane, source and chooser", () => {
  const sb = sandbox();
  const r = run(["--role=tools-lead", `--source=${TOOLS_B2}`, "--chooser=tools-lead"], sb);
  assert.equal(r.code, 0, JSON.stringify(r.fails));
  assert.ok(r.slot);
  const files = fs.readdirSync(sb.dir);
  assert.equal(files.length, 1);
  const s = JSON.parse(fs.readFileSync(path.join(sb.dir, files[0]), "utf8"));
  assert.deepEqual([s.role, s.lane, s.source, s.chooser, s.kind], ["tools-lead", "9", TOOLS_B2, "tools-lead", "other"]);
  assert.ok(Date.parse(s.ts));
  assert.ok(!has(r.warns, /^S[1-4] /), r.warns.join("\n"));
});

test("--no-claim checks without writing a slot", () => {
  const sb = sandbox();
  const r = run(["--role=tools-lead", `--source=${TOOLS_B2}`, "--no-claim"], sb);
  assert.equal(r.code, 0);
  assert.equal(fs.existsSync(sb.dir) ? fs.readdirSync(sb.dir).length : 0, 0);
});

test("S1: no source is a warning in warn mode (exit 0) and a FAIL in enforce mode (exit 1)", () => {
  const sb = sandbox();
  const w = run(["--role=tools-lead", "--chooser=tools-lead", "--no-claim"], sb);
  assert.equal(w.code, 0);
  assert.ok(has(w.warns, /^S1 no source.*S3_SLOTS=warn/), w.warns.join("\n"));
  const e = run(["--role=tools-lead", "--chooser=tools-lead", "--no-claim"], sb, { S3_SLOTS: "enforce" });
  assert.equal(e.code, 1);
  assert.ok(has(e.fails, /^S1 no source/));
  const f = run(["--role=tools-lead", "--chooser=tools-lead", "--no-claim", "--slots=enforce"], sb);
  assert.equal(f.code, 1, "--slots=enforce works like S3_SLOTS=enforce");
});

test("S1 in warn mode still claims the slot, with source none, so the gap is visible in the ledger", () => {
  const sb = sandbox();
  const r = run(["--role=tools-lead", "--chooser=chief-of-staff"], sb);
  assert.equal(r.code, 0);
  const s = slots.listSlots({ dir: sb.dir, events: [] });
  assert.equal(s.length, 1);
  assert.equal(s[0].source, "none");
});

test("S1: malformed source, missing item, wrong role, wrong chooser, §4 without a reason, unknown SO", () => {
  const sb = sandbox();
  const en = { S3_SLOTS: "enforce" };
  const cases = [
    [["--role=tools-lead", "--source=round 2 tools"], /not batch=/],
    [["--role=tools-lead", "--source=batch=company/ops/dispatch-requests/2026-10-16-r2-tools.md#B9"], /no item "## B9"/],
    [["--role=hq-engineer", `--source=${TOOLS_B2}`], /names role tools-lead, not hq-engineer/],
    [["--role=tools-lead", `--source=${TOOLS_B2}`, "--chooser=chief-of-staff"], /--chooser=chief-of-staff but .* poc: tools-lead/],
    [["--role=tools-lead", "--source=§4:"], /§4 source with no reason/],
    [["--role=tools-lead", "--source=SO-nowhere-99"], /SO-nowhere-99 is not in any batch file/],
    [["--role=tools-lead", "--source=batch=company/ops/dispatch-requests/no-such.md#B1"], /does not exist/],
  ];
  for (const [args, re] of cases) {
    const r = run([...args, "--no-claim"], sb, en);
    assert.equal(r.code, 1, args.join(" "));
    assert.ok(has(r.fails, new RegExp("^S1 .*" + re.source)), `${args.join(" ")}\n${r.fails.join("\n")}`);
  }
});

test("S1: a standing order resolves to the batch that issued it (lane and chooser from its header)", () => {
  const src = slots.resolveSource("SO-lifehacks-1", { root: ROOT });
  assert.deepEqual(src.problems, []);
  assert.equal(src.chooser, "cm-lifehacks");
  assert.equal(src.lane, "1");
  assert.equal(slots.resolveSource("batch=SO-lifehacks-1", { root: ROOT }).type, "so");
});

test("S2: general-purpose only with a §4 integration reason; an unknown role is refused", () => {
  const sb = sandbox();
  const en = { S3_SLOTS: "enforce" };
  const bad = run(["--role=general-purpose", `--source=${TOOLS_B2}`, "--no-claim"], sb, en);
  assert.ok(has(bad.fails, /^S2 general-purpose runs only for a §4 integration task/));
  const ritual = run(["--role=general-purpose", "--source=§4:ritual: WBR", "--no-claim"], sb, en);
  assert.ok(has(ritual.fails, /^S2 general-purpose with §4 reason "ritual: WBR"/));
  const ok = run(["--role=general-purpose", "--source=§4:integration: merge tools-ledger", "--no-claim"], sb, en);
  assert.equal(ok.code, 0, ok.fails.join("\n"));
  const unknown = run(["--role=head-of-nothing", "--source=§4:integration: x", "--no-claim"], sb, en);
  assert.ok(has(unknown.fails, /^S2 role head-of-nothing has no \.claude\/agents/));
});

test("S3: live slots count toward the 14-agent cap; the larger count wins; warn vs enforce", () => {
  const sb = sandbox();
  const now = new Date().toISOString();
  for (let i = 0; i < 14; i++) writeSlot(sb.dir, { id: `fixture-${i}`, role: "fact-checker", lane: "10", source: "SO-quality-1", chooser: "evaluation-steward", kind: "check", agent: `fc-${i}`, ts: now });
  const w = run(["--role=tools-lead", `--source=${TOOLS_B2}`], sb);
  assert.equal(w.code, 0);
  assert.ok(has(w.warns, /^S3 slots: 14 live slots; this dispatch would make 15 \(limit 14\)/), w.warns.join("\n"));
  assert.equal(fs.readdirSync(sb.dir).length, 15, "warn mode lets the dispatch go ahead, so its slot is claimed and counted");
  const e = run(["--role=tools-lead", `--source=${TOOLS_B2}`, "--agent=tools-lead: another"], sb, { S3_SLOTS: "enforce" });
  assert.equal(e.code, 1);
  assert.ok(has(e.fails, /^S3 slots: 15 live/), e.fails.join("\n"));
  assert.equal(fs.readdirSync(sb.dir).length, 15, "a refused dispatch claims nothing");
  // The event log or caller count over the cap is still C1, whatever the mode.
  const c1 = run(["--role=tools-lead", `--source=${TOOLS_B2}`, "--running=14"], sb);
  assert.ok(has(c1.fails, /^C1 concurrency/));
});

test("S3: builder slots count against the 3-builder cap (library)", () => {
  const sb = sandbox();
  const now = new Date().toISOString();
  writeSlot(sb.dir, { id: "b1", role: "demo-builder", kind: "build", source: "x", ts: now });
  writeSlot(sb.dir, { id: "b2", role: "tools-lead", kind: "build", source: "x", ts: now });
  writeSlot(sb.dir, { id: "o1", role: "tools-lead", kind: "other", source: "x", ts: now });
  const f = slots.inFlight({ dir: sb.dir, events: [] });
  assert.equal(f.agents, 3);
  assert.equal(f.builders, 2);
});

test("S3: a slot older than 6 h is reported as stale, not counted, and not deleted", () => {
  const sb = sandbox();
  const old = new Date(Date.now() - 7 * 3.6e6).toISOString();
  writeSlot(sb.dir, { id: "old-one", role: "qa-tester", lane: "10", source: "SO-quality-1", chooser: "evaluation-steward", kind: "check", ts: old });
  const r = run(["--role=tools-lead", `--source=${TOOLS_B2}`, "--no-claim"], sb);
  assert.ok(has(r.warns, /^S3 stale slot old-one \(qa-tester, SO-quality-1, 7\.0 h\)/), r.warns.join("\n"));
  assert.ok(has(r.info, /slots: 0 live, 0 builders \(1 stale/));
  assert.ok(fs.existsSync(path.join(sb.dir, "old-one.json")));
  const out = execFileSync("node", [LIB, "list"], { env: { ...process.env, S3_SLOTS_DIR: sb.dir, S3_EVENTS: sb.ev }, encoding: "utf8" });
  assert.match(out, /^STALE old-one/m);
});

test("S3: a concurrent double-claim of the same slot: exactly one wins", async () => {
  const sb = sandbox();
  const N = 8;
  const code = `import(${JSON.stringify(LIB)}).then((m) => { const r = m.claim({ role: "tools-lead", source: ${JSON.stringify(TOOLS_B2)}, chooser: "tools-lead", kind: "other", agent: "same" }, { dir: ${JSON.stringify(sb.dir)} }); process.stdout.write(r.ok ? "WIN" : "LOSE"); })`;
  fs.mkdirSync(sb.dir, { recursive: true });
  const outs = await Promise.all(Array.from({ length: N }, () => new Promise((res, rej) => {
    const p = spawn("node", ["--input-type=module", "-e", code], { stdio: ["ignore", "pipe", "inherit"] });
    let o = ""; p.stdout.on("data", (b) => (o += b)); p.on("error", rej); p.on("close", () => res(o));
  })));
  assert.equal(outs.filter((o) => o === "WIN").length, 1, outs.join(","));
  assert.equal(outs.filter((o) => o === "LOSE").length, N - 1);
  assert.equal(fs.readdirSync(sb.dir).length, 1);
});

test("S3: dispatching the same item twice while its slot is live is flagged; enforce refuses it", () => {
  const sb = sandbox();
  assert.equal(run(["--role=tools-lead", `--source=${TOOLS_B2}`], sb).code, 0);
  const w = run(["--role=tools-lead", `--source=${TOOLS_B2}`], sb);
  assert.equal(w.code, 0);
  assert.ok(has(w.warns, /^S3 slot .* is already held/));
  const e = run(["--role=tools-lead", `--source=${TOOLS_B2}`], sb, { S3_SLOTS: "enforce" });
  assert.equal(e.code, 1);
  // A second run of the same item with its own agent label is a different slot.
  const own = run(["--role=tools-lead", `--source=${TOOLS_B2}`, "--agent=tools-lead: B2 second run"], sb, { S3_SLOTS: "enforce" });
  assert.equal(own.code, 0, own.fails.join("\n"));
});

test("release on report: a later report naming the batch item (abbreviated path) or the agent frees the slot", () => {
  const sb = sandbox();
  assert.equal(run(["--role=tools-lead", `--source=${TOOLS_B2}`], sb).code, 0);
  assert.equal(run(["--role=tools-lead", `--source=batch=company/ops/dispatch-requests/2026-10-16-r2-tools.md#B4`, "--agent=tools-lead: B4 serve"], sb).code, 0);
  // G5-d: the reports are dated when both claims have returned, so they come after those slots and before the
  // re-dispatch below. (It was now + 1 s, which held only while a spawn took over 1 s: with a fast spawn the
  // re-dispatch's slot fell inside that second and was released too.)
  const later = new Date().toISOString();
  fs.writeFileSync(sb.ev, [
    { id: "ev-1", ts: later, type: "report", actor: "tools-lead", agent: "tools-lead: B2 ledger", summary: "batch=…r2-tools.md#B2 done (abc123)" },
    { id: "ev-2", ts: later, type: "report", actor: "tools-lead", agent: "tools-lead: B4 serve", summary: "done" },
    { id: "ev-3", ts: later, type: "report", actor: "tools-lead", summary: "batch=…r2-tools.md#B21 is not B2" },
  ].map((e) => JSON.stringify(e)).join("\n") + "\n");
  const f = slots.inFlight({ dir: sb.dir, events: fs.readFileSync(sb.ev, "utf8").trim().split("\n").map((l) => JSON.parse(l)) });
  assert.equal(f.agents, 0);
  assert.deepEqual(f.released.map((s) => s.releasedBy).sort(), ["ev-1", "ev-2"]);
  // The id is free again for a new dispatch of the same item.
  const again = run(["--role=tools-lead", `--source=${TOOLS_B2}`], sb, { S3_SLOTS: "enforce" });
  assert.equal(again.code, 0, again.fails.join("\n"));
  // `prune` deletes slots an event released.
  const out = execFileSync("node", [LIB, "prune"], { env: { ...process.env, S3_SLOTS_DIR: sb.dir, S3_EVENTS: sb.ev }, encoding: "utf8" });
  assert.match(out, /pruned 1 slot/);
});

test("S4 is off by default; on with --s4 or S3_SLOTS_S4=on it refuses a checker from a non-lane-10 batch", () => {
  const sb = sandbox();
  const tools = batch(sb.d, "tools.md", { poc: "tools-lead", lane: 9, items: ["fact-checker"] });
  const quality = batch(sb.d, "quality.md", { poc: "evaluation-steward", lane: 10, items: ["fact-checker"] });
  const en = { S3_SLOTS: "enforce" };
  const off = run(["--role=fact-checker", `--source=batch=${tools}#B1`, "--no-claim"], sb, en);
  assert.ok(!has(off.fails, /^S4/), off.fails.join("\n"));
  assert.ok(has(off.info, /S4 off \(F-28\)/));
  const on = run(["--role=fact-checker", `--source=batch=${tools}#B1`, "--no-claim", "--s4"], sb, en);
  assert.equal(on.code, 1);
  assert.ok(has(on.fails, /^S4 fact-checker is a lane-10 checker/));
  const onEnv = run(["--role=fact-checker", `--source=batch=${tools}#B1`, "--no-claim"], sb, { ...en, S3_SLOTS_S4: "on" });
  assert.ok(has(onEnv.fails, /^S4 /));
  const s4src = run(["--role=fact-checker", "--source=§4:ritual: launch review", "--no-claim", "--s4"], sb, en);
  assert.ok(has(s4src.fails, /^S4 /), "a §4 source is not a lane-10 batch either");
  const fromQuality = run(["--role=fact-checker", `--source=batch=${quality}#B1`, "--no-claim", "--s4"], sb, en);
  assert.ok(!has(fromQuality.fails, /^S4/), fromQuality.fails.join("\n"));
  const notChecker = run(["--role=tools-lead", `--source=${TOOLS_B2}`, "--no-claim", "--s4"], sb, en);
  assert.equal(notChecker.code, 0, notChecker.fails.join("\n"));
});

test("lane-10 checker roles are read from poc-map.md, and the CLI usage names the new flags", () => {
  const c = slots.checkerRoles(ROOT);
  for (const r of ["fact-checker", "qa-tester", "learner-evaluator", "privacy-reviewer", "route-reviewer"]) assert.ok(c.has(r), r);
  assert.ok(!c.has("evaluation-steward"), "the lane's POC is not a checker");
  const src = fs.readFileSync(CHECK, "utf8");
  for (const f of ["--role=", "--source=", "--chooser=", "--no-claim", "S3_SLOTS=warn|enforce", "S4 "]) assert.ok(src.includes(f), f);
});

// ---- r3 B6: W-1240 F1-F8 and PE-ops L1/L2 (base c73ddb9; lane 10 re-checks only the delta)

const HOOK = path.join(ROOT, ".claude/hooks/agent-events.mjs");
const TOOLS_B4 = "batch=company/ops/dispatch-requests/2026-10-16-r2-tools.md#B4";
const S4_LONG = "§4:integration: merge tools-ledger into main and re-run the dispatch tests on the merge result, then fold";
function hookSandbox() {
  const sb = sandbox();
  Object.assign(sb, { spool: path.join(sb.d, "spool"), state: path.join(sb.d, "state"), log: path.join(sb.d, "hook.log") });
  sb.env = { S3_SPOOL: sb.spool, S3_HOOK_STATE: sb.state, S3_HOOK_LOG: sb.log, S3_ROLE: "chief-of-staff" };
  return sb;
}
const hook = (sb, payload) => execFileSync("node", [HOOK], { input: JSON.stringify(payload), env: { ...process.env, S3_EVENTS: sb.ev, ...sb.env }, encoding: "utf8" });
const readL = (f) => fs.readFileSync(f, "utf8").split("\n").filter(Boolean).map((l) => JSON.parse(l));
// As main's dispatch-check reads them: the log plus the spool, deduped by id.
const logPlusSpool = (sb) => {
  const spool = fs.existsSync(sb.spool) ? fs.readdirSync(sb.spool).filter((f) => f.endsWith(".jsonl")).flatMap((f) => readL(path.join(sb.spool, f))) : [];
  const log = readL(sb.ev);
  const have = new Set(log.map((e) => e.id));
  return [...log, ...spool.filter((e) => !have.has(e.id))];
};

test("F1/F4/F7/F8 fixture: release joins the hook's report through its dispatch event (real hook, log + spool)", () => {
  const sb = hookSandbox();
  const claims = [
    ["--role=tools-lead", `--source=${TOOLS_B2}`, "--chooser=tools-lead", "--agent=tools-lead: B2 ledger"],
    ["--role=tools-lead", `--source=${TOOLS_B4}`, "--chooser=tools-lead"],
    ["--role=qa-tester", "--source=SO-10-2", "--agent=qa-tester: SO run 2"],
    ["--role=general-purpose", `--source=${S4_LONG}`],
  ];
  for (const a of claims) { const r = run(a, sb, sb.env); assert.equal(r.code, 0, JSON.stringify(r.fails)); assert.ok(r.slot, a.join(" ")); }
  assert.equal(fs.readdirSync(sb.dir).length, 4);
  const calls = [
    { id: "toolu_a", role: "tools-lead", description: "tools-lead: B2 ledger", prompt: `[project:maintenance] ${TOOLS_B2} (your own batch). Do B2.` },
    { id: "toolu_b", role: "tools-lead", description: "tools-lead B4 serve swap", prompt: `${TOOLS_B4}. Do B4.` },
    { id: "toolu_c", role: "qa-tester", description: "qa-tester: SO run 2", prompt: "Standing order SO-10-2: smoke the feed." },
    { id: "toolu_d", role: "general-purpose", description: "integrate tools-ledger", prompt: `${S4_LONG}, and write the merge sha into the record` },
  ];
  for (const c of calls) hook(sb, { hook_event_name: "PreToolUse", tool_name: "Agent", tool_use_id: c.id, tool_input: { subagent_type: c.role, description: c.description, prompt: c.prompt } });
  for (const c of calls.filter((c) => c.id !== "toolu_c")) hook(sb, { hook_event_name: "PostToolUse", tool_name: "Agent", tool_use_id: c.id, tool_input: { subagent_type: c.role, description: c.description, prompt: c.prompt }, tool_response: { content: [{ type: "text", text: `Changed: done (${c.id})` }] } });
  const c = calls[2];
  hook(sb, { hook_event_name: "PostToolUse", tool_name: "Agent", tool_use_id: c.id, tool_input: { subagent_type: c.role, description: c.description, prompt: c.prompt }, tool_response: { status: "async_launched", agentId: "a0123456789abcdef" } });
  const tr = path.join(sb.d, "agent.jsonl");
  fs.writeFileSync(tr, JSON.stringify({ type: "assistant", message: { content: [{ type: "text", text: "SO run 2: feed smoke passed" }] } }) + "\n");
  hook(sb, { hook_event_name: "SubagentStop", agent_id: "a0123456789abcdef", agent_transcript_path: tr });
  assert.ok(!fs.existsSync(sb.log) || fs.readFileSync(sb.log, "utf8") === "", "the hook logged an error: " + (fs.existsSync(sb.log) ? fs.readFileSync(sb.log, "utf8") : ""));
  assert.equal(readL(sb.ev).length, 0, "the hook wrote only the spool");
  const events = logPlusSpool(sb);
  const reports = events.filter((e) => e.type === "report");
  assert.equal(reports.length, 4);
  assert.ok(reports.every((e) => e.id.startsWith("hk-") && e.toolUseId));
  const f = slots.inFlight({ dir: sb.dir, events });
  assert.equal(f.agents, 0, JSON.stringify(f.live));
  const byTU = Object.fromEntries(reports.map((e) => [e.toolUseId, e.id]));
  const rel = Object.fromEntries(f.released.map((s) => [s.source, [s.releasedBy, s.releasedRule]]));
  assert.deepEqual(rel[TOOLS_B2], [byTU.toolu_a, "label"]);
  assert.deepEqual(rel[TOOLS_B4], [byTU.toolu_b, "hook"], "an unlabelled batch slot is released through the dispatch event");
  assert.deepEqual(rel["SO-10-2"], [byTU.toolu_c, "label"], "the async run's SubagentStop report, label '<agent> ·<hash>'");
  assert.deepEqual(rel[S4_LONG], [byTU.toolu_d, "hook"], "a §4 slot with no --agent, joined on the hook's 79-character prefix (F4)");
  // F7: dispatch-check itself reads the spool when counting slots.
  const cli = run(["--role=tools-lead", `--source=${TOOLS_B2}`, "--no-claim"], sb, sb.env);
  assert.ok(has(cli.info, /^slots: 0 live, 0 builders \(0 stale, 4 released by events: 2 label, 2 hook\)/), cli.info.join("\n"));
  // F8: prune reads the spool too (nothing was folded into the log).
  const out = execFileSync("node", [LIB, "prune"], { env: { ...process.env, S3_SLOTS_DIR: sb.dir, S3_EVENTS: sb.ev, ...sb.env }, encoding: "utf8" });
  assert.match(out, /pruned 4 slot/);
  assert.equal(fs.readdirSync(sb.dir).length, 0);
});

test("F1 negatives: no dispatch event, other role, report before the slot, #B21 vs #B2, >60 s after dispatch; oldest-first", () => {
  const T = (s) => new Date(Date.parse("2026-10-16T12:00:00Z") + s * 1000).toISOString();
  const slot = (id, extra = {}) => ({ id, role: "tools-lead", source: TOOLS_B2, ts: T(0), ...extra });
  const disp = (tu, extra = {}) => ({ id: `d-${tu}`, type: "dispatch", ts: T(5), toolUseId: tu, subjects: ["tools-lead"], source: TOOLS_B2, agent: `x ·${tu.slice(-4)}`, ...extra });
  const rep = (tu, extra = {}) => ({ id: `r-${tu}`, type: "report", ts: T(600), toolUseId: tu, actor: "tools-lead", agent: `x ·${tu.slice(-4)}`, summary: "x: done", ...extra });
  const rel = (sl, evs) => slots.assignReleases(sl, evs);
  assert.equal(rel([slot("n1")], [rep("toolu_none")]).size, 0, "a report whose tool-use-id has no dispatch event");
  assert.equal(rel([slot("n2")], [disp("toolu_2", { subjects: ["hq-engineer"] }), rep("toolu_2", { actor: "hq-engineer" })]).size, 0, "another role, same source");
  assert.equal(rel([slot("n3", { ts: T(900) })], [disp("toolu_3"), rep("toolu_3")]).size, 0, "a report before the slot was claimed");
  assert.equal(rel([slot("n4")], [disp("toolu_4", { source: TOOLS_B2.replace("#B2", "#B21") }), rep("toolu_4")]).size, 0, "#B21 is not #B2");
  assert.equal(rel([slot("n5", { ts: T(120) })], [disp("toolu_5"), rep("toolu_5")]).size, 0, "a slot claimed more than 60 s after the dispatch");
  assert.equal(rel([slot("p0")], [disp("toolu_6"), rep("toolu_6")]).get("p0")?.rule, "hook", "the positive control");
  // Two live slots for one source and role: one report releases only the oldest; a second report the next.
  const two = [slot("so-run-2", { role: "qa-tester", source: "SO-10-2", ts: T(1) }), slot("so-run-1", { role: "qa-tester", source: "SO-10-2", ts: T(0) })];
  const sd = (tu) => disp(tu, { subjects: ["qa-tester"], source: "batch=SO-10-2" });
  const r1 = rel(two, [sd("toolu_7"), rep("toolu_7", { actor: "qa-tester" })]);
  assert.deepEqual([...r1.keys()], ["so-run-1"]);
  const r2 = rel(two, [sd("toolu_7"), rep("toolu_7", { actor: "qa-tester" }), sd("toolu_8"), rep("toolu_8", { actor: "qa-tester", ts: T(700) })]);
  assert.deepEqual([...r2.keys()].sort(), ["so-run-1", "so-run-2"]);
  // Label: exact, or the hook's "<label> ·<hash>", but not a longer label that merely starts the same.
  const lab = slot("lab", { agent: "tools-lead: B2" });
  assert.equal(rel([lab], [rep("toolu_9", { agent: "tools-lead: B2 ·3f2a" })]).get("lab")?.rule, "label");
  assert.equal(rel([lab], [rep("toolu_9", { agent: "tools-lead: B21 ·3f2a" })]).size, 0);
});

test("F2 / L1: a ledger exception warns and goes ahead in warn mode (exit 0) and FAILs in enforce mode (exit 1)", () => {
  const sb = sandbox();
  const asFile = path.join(sb.d, "slots-is-a-file");
  fs.writeFileSync(asFile, "not a folder\n");
  const w = run(["--role=tools-lead", `--source=${TOOLS_B2}`], { dir: asFile, ev: sb.ev });
  assert.equal(w.code, 0, JSON.stringify(w.fails));
  assert.ok(has(w.warns, /^S3 ledger error \(reading the ledger\): ENOTDIR .*\[S3_SLOTS=warn: not refused; no slot claimed\]/), w.warns.join("\n"));
  assert.equal(w.slot, null);
  const e = run(["--role=tools-lead", `--source=${TOOLS_B2}`], { dir: asFile, ev: sb.ev }, { S3_SLOTS: "enforce" });
  assert.equal(e.code, 1);
  assert.ok(has(e.fails, /^S3 ledger error/), e.fails.join("\n"));
  assert.equal(fs.readFileSync(asFile, "utf8"), "not a folder\n", "nothing was written over it");
});

test("F3 / L2: an unreadable slot ages by its mtime: live while young, stale after 6 h, replaced by a claim", () => {
  const sb = sandbox();
  fs.mkdirSync(sb.dir, { recursive: true });
  const young = path.join(sb.dir, "young.json"), old = path.join(sb.dir, "garbage.json");
  fs.writeFileSync(young, "{garbage");
  fs.writeFileSync(old, "{garbage");
  const seven = (Date.now() - 7 * 3.6e6) / 1000;
  fs.utimesSync(old, seven, seven);
  const f = slots.inFlight({ dir: sb.dir, events: [] });
  assert.deepEqual(f.live.map((s) => s.id), ["young"]);
  assert.deepEqual(f.stale.map((s) => s.id), ["garbage"]);
  assert.ok(f.stale[0].unreadable && f.stale[0].ageH > 6.9);
  const r = run(["--role=tools-lead", `--source=${TOOLS_B2}`, "--no-claim"], sb);
  assert.ok(has(r.warns, /^S3 stale slot garbage .*unreadable, aged by mtime/), r.warns.join("\n"));
  const c = slots.claim({ id: "garbage", role: "tools-lead", source: TOOLS_B2 }, { dir: sb.dir });
  assert.ok(c.ok && c.replaced?.unreadable, "a stale unreadable slot is replaced like a stale readable one");
});

test("F5: general-purpose needs §4:integration: <what>, with a non-empty <what>", () => {
  const sb = sandbox();
  const en = { S3_SLOTS: "enforce" };
  for (const src of ["§4:integration", "§4:integration:   ", "§4:integrations of things"]) {
    const r = run(["--role=general-purpose", `--source=${src}`, "--no-claim"], sb, en);
    assert.equal(r.code, 1, src);
    assert.ok(has(r.fails, /^S2 general-purpose with §4 reason/), `${src}\n${r.fails.join("\n")}`);
  }
  assert.equal(run(["--role=general-purpose", "--source=§4:integration: fold", "--no-claim"], sb, en).code, 0);
});

test("F6 / Q1: with S4 on, §4:ritual: <id> passes only when <id> is in the role's rituals: in roles.mjs", () => {
  const sb = sandbox();
  const en = { S3_SLOTS: "enforce" };
  const ok = run(["--role=fact-checker", "--source=§4:ritual: launch-review for wave J", "--no-claim", "--s4"], sb, en);
  assert.ok(!has(ok.fails, /^S4/), ok.fails.join("\n"));
  const no = run(["--role=privacy-reviewer", "--source=§4:ritual: launch-review", "--no-claim", "--s4"], sb, en);
  assert.ok(has(no.fails, /^S4 privacy-reviewer is a lane-10 checker/), no.fails.join("\n"));
  const near = run(["--role=fact-checker", "--source=§4:ritual: launch-reviewer", "--no-claim", "--s4"], sb, en);
  assert.ok(has(near.fails, /^S4 /), "the id must match a whole ritual id");
  const free = run(["--role=fact-checker", "--source=§4:emergency: launch-review", "--no-claim", "--s4"], sb, en);
  assert.ok(has(free.fails, /^S4 /), "only the ritual: form is exempt");
  assert.deepEqual([...slots.roleRituals("fact-checker")].sort(), ["coe", "launch-review"]);
});

// G5-d: the git stub must not change any S/C result. Slow suite only (each real-git spawn reads 53 records, ~2.8 s).
test("G5-d cross-check: with the real git on PATH, S1/S2/S3 and C1 give the same result as with the stub", { skip: !SLOW && "slow: set S3_SLOW_TESTS=1 (npm run test:dispatch:slow)" }, () => {
  const sb = sandbox();
  const now = new Date().toISOString();
  for (let i = 0; i < 14; i++) writeSlot(sb.dir, { id: `fixture-${i}`, role: "fact-checker", lane: "10", source: "SO-quality-1", chooser: "evaluation-steward", kind: "check", agent: `fc-${i}`, ts: now });
  const en = { S3_SLOTS: "enforce" };
  const cases = [
    [["--role=tools-lead", "--chooser=tools-lead", "--no-claim"], en],
    [["--role=general-purpose", `--source=${TOOLS_B2}`, "--no-claim"], en],
    [["--role=tools-lead", `--source=${TOOLS_B2}`, "--no-claim"], en],
    [["--role=tools-lead", `--source=${TOOLS_B2}`, "--no-claim", "--running=14"], {}],
  ];
  const rules = (r) => [...r.fails, ...r.warns].map((l) => l.split(" ")[0]).filter((w) => /^[SC]\d$/.test(w)).sort();
  for (const [args, env] of cases) {
    const stub = run(args, sb, env), real = run(args, sb, env, { realGit: true });
    assert.equal(real.code, stub.code, args.join(" "));
    assert.deepEqual(rules(real), rules(stub), args.join(" "));
    assert.deepEqual(real.fails, stub.fails, args.join(" "));
  }
});
