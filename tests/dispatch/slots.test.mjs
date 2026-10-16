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
function run(args, { dir, ev }, env = {}) {
  const e = { ...process.env, S3_SLOTS_DIR: dir, S3_EVENTS: ev, ...env };
  delete e.S3_SLOTS; delete e.S3_SLOTS_S4;
  Object.assign(e, env);
  try { return { code: 0, ...JSON.parse(execFileSync("node", [CHECK, "--kind=other", "--running=0", "--json", ...args], { env: e, encoding: "utf8" })) }; }
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
  const later = new Date(Date.now() + 1000).toISOString();
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
  for (const r of ["fact-checker", "qa-tester", "learner-evaluator", "privacy-reviewer", "cultural-reviewer"]) assert.ok(c.has(r), r);
  assert.ok(!c.has("evaluation-steward"), "the lane's POC is not a checker");
  const src = fs.readFileSync(CHECK, "utf8");
  for (const f of ["--role=", "--source=", "--chooser=", "--no-claim", "S3_SLOTS=warn|enforce", "S4 "]) assert.ok(src.includes(f), f);
});
