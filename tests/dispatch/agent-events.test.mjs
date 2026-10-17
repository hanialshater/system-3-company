// W-1195 / W-716 (retro 2026-10-16 C1): the Agent-tool hook writes dispatch/report events at the moment they
// happen; metrics print the last-dispatch age and mark "never dispatched" STALE over 6 h.
// Every test writes to a temp log through S3_EVENTS; none touches company/ops/events.jsonl.
// Run: npm run test:dispatch
import { test } from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import { execFileSync, spawnSync } from "node:child_process";
import { fileURLToPath } from "node:url";
import { lastDispatchAge, lastDispatchLine } from "../../tools/lib/dispatch-age.mjs";
import { transcriptEvents } from "../../tools/events.mjs";
import { mainCheckout } from "../../tools/lib/events-spool.mjs";

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "../..");
const HOOK = path.join(ROOT, ".claude/hooks/agent-events.mjs");
const REAL_LOG = path.join(ROOT, "company/ops/events.jsonl");

function sandbox() {
  const d = fs.mkdtempSync(path.join(os.tmpdir(), "agent-events-"));
  return { dir: d, events: path.join(d, "events.jsonl"), spool: path.join(d, "spool"), log: path.join(d, "hook.log"), state: path.join(d, "state") };
}
function runHook(sb, payload, extraEnv = {}) {
  const input = typeof payload === "string" ? payload : JSON.stringify(payload);
  const r = (() => {
    try {
      // S3_MAIN_CHECKOUT: the git-state check (W-1337) reads a sandbox dir, never the real main checkout's .git.
      execFileSync("node", [HOOK], { input, env: { ...process.env, S3_EVENTS: sb.events, S3_SPOOL: sb.spool, S3_HOOK_LOG: sb.log, S3_HOOK_STATE: sb.state, S3_MAIN_CHECKOUT: path.join(sb.dir, "no-main"), ...extraEnv }, encoding: "utf8" });
      return 0;
    } catch (e) { return e.status; }
  })();
  return r;
}
const read = (f) => (fs.existsSync(f) ? fs.readFileSync(f, "utf8").split("\n").filter(Boolean).map((l) => JSON.parse(l)) : []);
// Ruling H2: the hook writes only the spool. Every hook test reads the spool and checks the log was not created.
const spooled = (sb) => {
  assert.ok(!fs.existsSync(sb.events), "the hook never writes the event log (ruling H2)");
  return fs.existsSync(sb.spool) ? fs.readdirSync(sb.spool).sort().flatMap((f) => read(path.join(sb.spool, f))) : [];
};
const pre = (prompt, extra = {}) => ({
  session_id: "s1", hook_event_name: "PreToolUse", tool_name: "Agent", tool_use_id: extra.id ?? "toolu_fixture_1",
  tool_input: { description: extra.description ?? "Agent-events hook (B1)", subagent_type: extra.role ?? "tools-lead", prompt },
});
const realSize = () => (fs.existsSync(REAL_LOG) ? fs.statSync(REAL_LOG).size : -1);

test("PreToolUse with batch= writes one dispatch with role, batch= and the batch file's poc as chooser", () => {
  const before = realSize();
  const sb = sandbox();
  const code = runHook(sb, pre("[project:maintenance] batch=company/ops/dispatch-requests/2026-10-16-r2-tools.md#B1 (your own batch). Do B1."));
  assert.equal(code, 0);
  const evs = spooled(sb);
  assert.equal(evs.length, 1);
  const e = evs[0];
  assert.equal(e.type, "dispatch");
  assert.deepEqual(e.subjects, ["tools-lead"]);
  assert.equal(e.room, "tools");
  assert.equal(e.actor, "chief-of-staff");
  assert.equal(e.source, "batch=company/ops/dispatch-requests/2026-10-16-r2-tools.md#B1");
  assert.equal(e.chooser, "tools-lead");
  assert.match(e.summary, /batch=company\/ops\/dispatch-requests\/2026-10-16-r2-tools\.md#B1 chooser=tools-lead$/);
  assert.match(e.agent, /^Agent-events hook \(B1\) ·[0-9a-f]{4}$/);
  assert.equal(e.toolUseId, "toolu_fixture_1");
  assert.match(e.body, /Do B1\./);
  assert.equal(realSize(), before, "the real company/ops/events.jsonl was not touched");
});

test("a dispatch with no source is still written, marked source=none, chooser = the dispatcher", () => {
  const sb = sandbox();
  assert.equal(runHook(sb, pre("Please fix the thing.", { role: "general-purpose", id: "toolu_nosrc" })), 0);
  const [e] = spooled(sb);
  assert.equal(e.type, "dispatch");
  assert.equal(e.source, "none");
  assert.equal(e.chooser, "chief-of-staff");
  assert.match(e.summary, /source=none chooser=chief-of-staff$/);
});

test("explicit chooser=, SO- ids and §4 reasons are parsed", () => {
  const sb = sandbox();
  runHook(sb, pre("batch=SO-10-1 run QA on 15 lessons chooser=evaluation-steward", { role: "qa-tester", id: "t-so" }));
  runHook(sb, pre("§4: SEV2 containment, the review server is down", { role: "principal-engineer-ops", id: "t-s4" }));
  runHook(sb, pre("Standing order SO-lifehacks-1 applies.", { role: "demo-builder", id: "t-so2" }));
  const [so, s4, so2] = spooled(sb);
  assert.equal(so.source, "batch=SO-10-1");
  assert.equal(so.chooser, "evaluation-steward");
  assert.equal(s4.source, "§4:SEV2 containment, the review server is down");
  assert.equal(s4.chooser, "chief-of-staff");
  assert.equal(so2.source, "batch=SO-lifehacks-1");
  assert.equal(so2.chooser, "unknown");
});

test("async launch writes no report (the dispatch stays open); SubagentStop then writes the report under the same label", () => {
  const sb = sandbox();
  runHook(sb, pre("batch=company/ops/dispatch-requests/2026-10-16-r2-tools.md#B1"));
  const post = { hook_event_name: "PostToolUse", tool_name: "Agent", tool_use_id: "toolu_fixture_1", tool_input: pre("").tool_input, tool_response: { isAsync: true, status: "async_launched", agentId: "a0123456789abcdef" } };
  assert.equal(runHook(sb, post), 0);
  assert.equal(spooled(sb).length, 1, "no report on async launch");
  assert.ok(fs.existsSync(path.join(sb.state, "a0123456789abcdef.json")));
  const tr = path.join(sb.dir, "agent.jsonl");
  fs.writeFileSync(tr, JSON.stringify({ type: "assistant", message: { content: [{ type: "text", text: "Changed: tools/x.mjs\nAll tests pass." }] } }) + "\n");
  assert.equal(runHook(sb, { hook_event_name: "SubagentStop", agent_id: "a0123456789abcdef", agent_transcript_path: tr }), 0);
  const [d, r] = spooled(sb);
  assert.equal(r.type, "report");
  assert.equal(r.agent, d.agent);
  assert.equal(r.actor, "tools-lead");
  assert.match(r.summary, /Changed: tools\/x\.mjs/);
  assert.ok(!fs.existsSync(path.join(sb.state, "a0123456789abcdef.json")), "state file removed");
});

test("a foreground (sync) PostToolUse is the report", () => {
  const sb = sandbox();
  runHook(sb, pre("batch=x#B2", { id: "t-sync" }));
  runHook(sb, { hook_event_name: "PostToolUse", tool_name: "Agent", tool_use_id: "t-sync", tool_input: pre("").tool_input, tool_response: { content: [{ type: "text", text: "Done: wrote the record." }] } });
  const [d, r] = spooled(sb);
  assert.equal(r.type, "report");
  assert.equal(r.agent, d.agent);
  assert.equal(r.state, "done");
});

test("never blocks: garbage stdin, other tools and a broken log path all exit 0", () => {
  const sb = sandbox();
  assert.equal(runHook(sb, "not json"), 0);
  assert.match(fs.readFileSync(sb.log, "utf8"), /payload: not json/);
  assert.equal(runHook(sb, { hook_event_name: "PreToolUse", tool_name: "Bash", tool_input: { command: "ls" } }), 0);
  assert.equal(spooled(sb).length, 0);
  const blocked = path.join(sb.dir, "file-not-dir");
  fs.writeFileSync(blocked, "");
  assert.equal(runHook(sb, pre("batch=x#B1"), { S3_SPOOL: path.join(blocked, "spool") }), 0);
  assert.match(fs.readFileSync(sb.log, "utf8"), /ENOTDIR|Command failed/);
});

test("lastDispatchAge: fresh, stale and never", () => {
  const now = Date.parse("2026-10-16T12:00:00Z");
  const fresh = lastDispatchAge([{ type: "dispatch", ts: "2026-10-16T10:00:00Z" }, { type: "report", ts: "2026-10-16T11:59:00Z" }], now);
  assert.equal(fresh.hours, 2);
  assert.equal(fresh.stale, false);
  const stale = lastDispatchAge([{ type: "dispatch", ts: "2026-10-15T08:55:00Z" }], now);
  assert.equal(stale.stale, true);
  assert.match(lastDispatchLine(stale), /^last dispatch event: 27 h ago .*STALE/);
  const never = lastDispatchAge([{ type: "kudos", ts: "2026-10-16T10:00:00Z" }], now);
  assert.deepEqual(never, { ts: null, hours: null, stale: true });
  assert.equal(lastDispatchLine(never), "last dispatch event: never");
});

test("metrics on a fixture log print the last-dispatch line and mark never-dispatched STALE", () => {
  const sb = sandbox();
  const old = new Date(Date.now() - 30 * 3.6e6).toISOString();
  fs.writeFileSync(sb.events, JSON.stringify({ id: "f1", ts: old, type: "dispatch", room: "tools", actor: "chief-of-staff", agent: "x ·abcd", subjects: ["tools-lead"], summary: "Dispatch tools-lead: x" }) + "\n");
  const out = execFileSync("node", [path.join(ROOT, "tools/metrics.mjs")], { env: { ...process.env, S3_EVENTS: sb.events }, encoding: "utf8" });
  assert.match(out, /last dispatch event: (29|30|31) h ago .*STALE/);
  assert.match(out, /STALE never dispatched \(/);
  const md = execFileSync("node", [path.join(ROOT, "tools/metrics.mjs"), "--md"], { env: { ...process.env, S3_EVENTS: sb.events }, encoding: "utf8" });
  assert.match(md, /\| Last dispatch event \| (29|30|31) h ago/);
  assert.match(md, /\| STALE Roles never dispatched \|/);
  fs.writeFileSync(sb.events, JSON.stringify({ id: "f2", ts: new Date().toISOString(), type: "dispatch", room: "tools", actor: "chief-of-staff", summary: "d" }) + "\n");
  const fresh = execFileSync("node", [path.join(ROOT, "tools/metrics.mjs")], { env: { ...process.env, S3_EVENTS: sb.events }, encoding: "utf8" });
  assert.match(fresh, /last dispatch event: 0\.0 h ago/);
  assert.doesNotMatch(fresh, /STALE/);
});

test("backfill reuses the hook's label and writes no second dispatch for a hooked tool_use_id", () => {
  const d = fs.mkdtempSync(path.join(os.tmpdir(), "tx-"));
  const lines = [
    { type: "assistant", timestamp: "2026-10-16T10:00:00Z", message: { content: [{ type: "tool_use", name: "Agent", id: "toolu_H", input: { description: "Hooked run", subagent_type: "tools-lead", prompt: "batch=x#B1" } }] } },
    { type: "user", timestamp: "2026-10-16T10:00:01Z", message: { content: [{ type: "tool_result", tool_use_id: "toolu_H", content: [{ type: "text", text: "Async agent launched successfully.\nagentId: a1111111111111111 (internal)" }] }] } },
    { type: "queue-operation", timestamp: "2026-10-16T11:00:00Z", content: '<agent-message from="a1111111111111111">The report follows:\nAll done.</agent-message>' },
  ];
  fs.writeFileSync(path.join(d, "s.jsonl"), lines.map((l) => JSON.stringify(l)).join("\n") + "\n");
  const plain = transcriptEvents(d);
  assert.equal(plain.filter((e) => e.type === "dispatch").length, 1);
  const hooked = transcriptEvents(d, { hooked: new Map([["toolu_H", "Hooked run ·beef"]]) });
  assert.equal(hooked.filter((e) => e.type === "dispatch").length, 0);
  const rep = hooked.find((e) => e.type === "report");
  assert.equal(rep.agent, "Hooked run ·beef");
});

// ---- E1 (review 2026-10-16-agent-hooks-wiring-review.md) and the H2 spool (ruling 2026-10-16-cos-ruling-h2-hook-spool.md)
const CONFLICT = "<<<<<<< Updated upstream";
const ev = (id, ts, extra = {}) => ({ id, ts, type: "dispatch", room: "tools", actor: "chief-of-staff", summary: id, ...extra });
const jsonl = (evs) => evs.map((e) => (typeof e === "string" ? e : JSON.stringify(e))).join("\n") + "\n";
const EVENTS_CLI = path.join(ROOT, "tools/events.mjs");
const cli = (sb, args) => {
  try {
    const out = execFileSync("node", [EVENTS_CLI, ...args], { env: { ...process.env, S3_EVENTS: sb.events, S3_SPOOL: sb.spool }, encoding: "utf8", stdio: ["pipe", "pipe", "pipe"] });
    return { code: 0, out, err: "" };
  } catch (e) { return { code: e.status, out: String(e.stdout), err: String(e.stderr) }; }
};
const spawnCli = (sb, args) => {
  const r = spawnSync("node", [EVENTS_CLI, ...args], { env: { ...process.env, S3_EVENTS: sb.events, S3_SPOOL: sb.spool }, encoding: "utf8" });
  return { code: r.status, out: r.stdout, err: r.stderr };
};

test("E1: `add` on a log holding a conflict-marker line still appends, keeps the bad line, and reports 1 skipped", () => {
  const sb = sandbox();
  fs.writeFileSync(sb.events, jsonl([ev("a1", "2026-10-16T09:00:00Z"), CONFLICT, ev("a2", "2026-10-16T09:01:00Z")]));
  const before = fs.readFileSync(sb.events, "utf8");
  const r = spawnCli(sb, ["add", "--id=a3", "--type=note", "--room=tools", "--actor=tools-lead", "--summary=after the conflict"]);
  assert.equal(r.code, 0, r.err);
  assert.match(r.err, /events: 1 unreadable line\(s\) skipped/);
  const after = fs.readFileSync(sb.events, "utf8");
  assert.ok(after.startsWith(before), "append-only: the earlier lines, the bad one included, are untouched");
  assert.equal(JSON.parse(after.trim().split("\n").at(-1)).id, "a3");
  assert.match(spawnCli(sb, ["add", "--id=a1", "--type=note", "--room=tools", "--actor=tools-lead", "--summary=dup"]).out, /already in the log a1/, "dedupe still works past the bad line");
});

test("E1: a spool holding a `<<<<<<<` line still gets the hook's hk- event, and the hook log shows the skipped count", () => {
  const sb = sandbox();
  fs.mkdirSync(sb.spool, { recursive: true });
  fs.writeFileSync(path.join(sb.spool, "2026-10-01.jsonl"), jsonl([CONFLICT]));
  assert.equal(runHook(sb, pre("batch=x#B1", { id: "t-e1" })), 0);
  const raw = fs.readdirSync(sb.spool).flatMap((f) => fs.readFileSync(path.join(sb.spool, f), "utf8").split("\n").filter(Boolean));
  const hk = raw.filter((l) => l.startsWith("{")).map((l) => JSON.parse(l));
  assert.equal(hk.length, 1);
  assert.match(hk[0].id, /^hk-/);
  assert.match(fs.readFileSync(sb.log, "utf8"), /1 unreadable line\(s\) skipped/);
  assert.ok(!fs.existsSync(sb.events));
});

test("H2: the default spool is the main checkout's, found through the git common dir from a linked worktree", () => {
  const d = fs.mkdtempSync(path.join(os.tmpdir(), "spool-git-"));
  const main = path.join(d, "main");
  const g = (cwd, ...a) => execFileSync("git", a, { cwd, encoding: "utf8", env: { ...process.env, GIT_AUTHOR_NAME: "t", GIT_AUTHOR_EMAIL: "t@t", GIT_COMMITTER_NAME: "t", GIT_COMMITTER_EMAIL: "t@t" } });
  fs.mkdirSync(main);
  g(main, "init", "-q", "-b", "main");
  g(main, "commit", "-q", "--allow-empty", "-m", "init");
  g(main, "worktree", "add", "-q", path.join(d, "wt"), "-b", "wt");
  assert.equal(mainCheckout(path.join(d, "wt")), main);
  assert.equal(mainCheckout(main), main);
  assert.equal(mainCheckout(path.join(d, "no-repo-here")), path.join(d, "no-repo-here"), "no .git: falls back to the given root");
  fs.rmSync(d, { recursive: true, force: true });
});

test("H2: dispatch-check counts dispatches in the log plus the spool, deduped by id, and a spool report closes one", () => {
  const sb = sandbox();
  const now = Date.now();
  const t = (min) => new Date(now - min * 60e3).toISOString();
  fs.writeFileSync(sb.events, jsonl([ev("d-log", t(30), { agent: "A ·0001", subjects: ["tools-lead"] }), CONFLICT]));
  fs.mkdirSync(sb.spool, { recursive: true });
  fs.writeFileSync(path.join(sb.spool, "x.jsonl"), jsonl([
    ev("d-log", t(30), { agent: "A ·0001", subjects: ["tools-lead"] }), // already folded copy: counted once
    ev("hk-b", t(20), { agent: "B ·0002", subjects: ["demo-builder"] }),
    ev("hk-c", t(10), { agent: "C ·0003", subjects: ["qa-tester"] }),
    { id: "hk-c-r", ts: t(5), type: "report", room: "qa-lab", actor: "qa-tester", agent: "C ·0003", summary: "done" },
  ]));
  let out;
  try { out = execFileSync("node", [path.join(ROOT, "tools/dispatch-check.mjs"), "--kind=other", "--running=0"], { env: { ...process.env, S3_EVENTS: sb.events, S3_SPOOL: sb.spool }, encoding: "utf8" }); }
  catch (e) { out = String(e.stdout); }
  assert.match(out, /in flight: 2 agents, 1 builders \(event log 2\/1/);
  assert.match(out, /hook spool: 4 unfolded event\(s\)/);
  assert.match(out, /warn event log has 1 unreadable line\(s\) \(log 1, spool 0\)/);
});

test("H2: `fold` moves the spool into the log in ts order, dedupes by id, keeps unparseable lines aside and empties the spool", () => {
  const sb = sandbox();
  fs.writeFileSync(sb.events, jsonl([ev("old", "2026-10-16T08:00:00Z")]));
  const before = fs.readFileSync(sb.events, "utf8");
  fs.mkdirSync(sb.spool, { recursive: true });
  fs.writeFileSync(path.join(sb.spool, "2026-10-16.jsonl"), jsonl([ev("hk-2", "2026-10-16T10:00:00Z"), ev("old", "2026-10-16T08:00:00Z"), CONFLICT]));
  const deadPid = spawnSync("node", ["-e", ""]).pid; // an exited child: a pid that is not running (F1 adopts only those)
  fs.writeFileSync(path.join(sb.spool, `2026-10-15.jsonl.folding-${deadPid}`), jsonl([ev("hk-1", "2026-10-15T23:00:00Z")])); // left by a dead fold
  const dry = cli(sb, ["fold", "--dry"]);
  assert.match(dry.out, /fold --dry: 2 event\(s\) would be folded/);
  assert.equal(fs.readFileSync(sb.events, "utf8"), before, "--dry writes nothing");
  const r = cli(sb, ["fold"]);
  assert.equal(r.code, 0, r.err);
  assert.match(r.out, /fold: 2 event\(s\) folded .* from 2 spool file\(s\).*; 1 already in the log; 1 unparseable spool line\(s\) kept/);
  const after = fs.readFileSync(sb.events, "utf8");
  assert.ok(after.startsWith(before), "append-only");
  assert.deepEqual(read(sb.events).map((e) => e.id), ["old", "hk-1", "hk-2"]);
  const left = fs.readdirSync(sb.spool);
  assert.equal(left.filter((f) => /\.jsonl/.test(f)).length, 0, "spool emptied");
  const unparsed = left.filter((f) => f.startsWith("unparsed-"));
  assert.equal(unparsed.length, 1);
  assert.equal(fs.readFileSync(path.join(sb.spool, unparsed[0]), "utf8"), CONFLICT + "\n");
  assert.match(cli(sb, ["fold"]).out, /fold: 0 event\(s\) folded .* from 0 spool file\(s\)/, "a second fold is a no-op");
});

test("H2/H4: metrics read the spool beside a fixture log and print unreadable and unfolded counts", () => {
  const sb = sandbox();
  const now = new Date().toISOString();
  fs.writeFileSync(sb.events, jsonl([ev("m1", now, { agent: "M ·0001", subjects: ["tools-lead"] }), CONFLICT]));
  const spool = path.join(sb.dir, "events-spool"); // the S3_EVENTS sibling rule: no S3_SPOOL here
  fs.mkdirSync(spool);
  fs.writeFileSync(path.join(spool, "2026-10-16.jsonl"), jsonl([ev("hk-m2", now, { agent: "N ·0002", subjects: ["qa-tester"] })]));
  const env = { ...process.env, S3_EVENTS: sb.events };
  delete env.S3_SPOOL;
  const out = execFileSync("node", [path.join(ROOT, "tools/metrics.mjs")], { env, encoding: "utf8" });
  assert.match(out, /events\.jsonl: 1 unreadable line\(s\)/);
  assert.match(out, /events spool: 1 unfolded event\(s\)/);
});

// ---- W-1337 (batch 2026-10-16-r5-tools.md#B1): the main checkout's git state at SubagentStop / foreground report.
// The "main checkout" is a fake .git dir in the sandbox (files only: the hook reads .git, it never runs git).
function fakeMain(sb) {
  const m = path.join(sb.dir, "main");
  fs.mkdirSync(path.join(m, ".git/logs/refs"), { recursive: true });
  return m;
}
const stashLine = (sha, msg) => `${"0".repeat(40)} ${sha} t <t@t> 1760000000 +0000\t${msg}\n`;
const asyncRun = (sb, env, agentId = "a0123456789abcdef") => {
  runHook(sb, pre("batch=company/ops/dispatch-requests/2026-10-16-r5-tools.md#B1"), env);
  runHook(sb, { hook_event_name: "PostToolUse", tool_name: "Agent", tool_use_id: "toolu_fixture_1", tool_input: pre("").tool_input, tool_response: { isAsync: true, status: "async_launched", agentId } }, env);
};

test("W-1337: SubagentStop with rebase-merge/ in the main checkout writes one incident naming the agent and the autostash", () => {
  const sb = sandbox();
  const main = fakeMain(sb);
  const env = { S3_MAIN_CHECKOUT: main };
  asyncRun(sb, env);
  fs.mkdirSync(path.join(main, ".git/rebase-merge"));
  fs.writeFileSync(path.join(main, ".git/rebase-merge/autostash"), "3dd7009b5a85680437dc07862d4f0fa4864b2b37\n");
  fs.writeFileSync(path.join(main, ".git/rebase-merge/head-name"), "refs/heads/main\n");
  assert.equal(runHook(sb, { hook_event_name: "SubagentStop", agent_id: "a0123456789abcdef" }, env), 0);
  const evs = spooled(sb);
  const gs = evs.filter((e) => e.id.startsWith("hk-gs-"));
  assert.equal(gs.length, 1, JSON.stringify(evs.map((e) => e.type)));
  assert.equal(evs.length, 3, "dispatch, report, one git-state event");
  const [e] = gs;
  assert.equal(e.type, "incident");
  assert.equal(e.room, "incident");
  assert.equal(e.agent, evs[0].agent, "names the agent label");
  assert.match(e.summary, /rebase-merge\/ \(main, autostash 3dd7009b5/);
  assert.match(e.body, /git stash store -m "autostash 3dd7009b5a85680437dc07862d4f0fa4864b2b37"/);
  assert.deepEqual(e.refs, ["company/engineering/readiness/2026-10-16-shared-checkout-git-guard.md"]);
  // The same state seen at the next stop is not written twice.
  assert.equal(runHook(sb, { hook_event_name: "SubagentStop", agent_id: "aother000000000" }, env), 0);
  assert.equal(spooled(sb).filter((x) => x.id.startsWith("hk-gs-")).length, 1);
});

test("W-1337: a stash entry gained since dispatch is a note in room incident; a clean main checkout writes nothing extra", () => {
  const sb = sandbox();
  const main = fakeMain(sb);
  const env = { S3_MAIN_CHECKOUT: main };
  fs.writeFileSync(path.join(main, ".git/logs/refs/stash"), stashLine("1".repeat(40), "On main: older"));
  asyncRun(sb, env);
  fs.appendFileSync(path.join(main, ".git/logs/refs/stash"), stashLine("2".repeat(40), "On main: wip"));
  assert.equal(runHook(sb, { hook_event_name: "SubagentStop", agent_id: "a0123456789abcdef" }, env), 0);
  const gs = spooled(sb).filter((e) => e.id.startsWith("hk-gs-"));
  assert.equal(gs.length, 1);
  assert.equal(gs[0].type, "note");
  assert.equal(gs[0].room, "incident");
  assert.match(gs[0].summary, /1 new stash entry since dispatch \("On main: wip"\)/);
  assert.doesNotMatch(gs[0].summary, /older/, "the entry that was there at dispatch is not counted");

  const sb2 = sandbox();
  const main2 = fakeMain(sb2);
  fs.writeFileSync(path.join(main2, ".git/logs/refs/stash"), stashLine("1".repeat(40), "On main: older"));
  asyncRun(sb2, { S3_MAIN_CHECKOUT: main2 });
  assert.equal(runHook(sb2, { hook_event_name: "SubagentStop", agent_id: "a0123456789abcdef" }, { S3_MAIN_CHECKOUT: main2 }), 0);
  assert.equal(spooled(sb2).length, 2, "dispatch and report only");
});

// git >= 2.47 (RelNotes 2.47.0, pw/rebase-autostash-fix): a rebase that fails to start re-applies its autostash and, on a
// conflict, stores it as a stash entry named exactly "autostash" and removes rebase-merge/. That is the same stranding.
test("W-1337: a stash entry named \"autostash\" (git >= 2.47's failed autostash re-apply) is an incident, with or without a baseline", () => {
  const sb = sandbox();
  const main = fakeMain(sb);
  const env = { S3_MAIN_CHECKOUT: main };
  fs.writeFileSync(path.join(main, ".git/logs/refs/stash"), stashLine("1".repeat(40), "On main: older"));
  asyncRun(sb, env);
  fs.appendFileSync(path.join(main, ".git/logs/refs/stash"), stashLine("2".repeat(40), "autostash"));
  assert.equal(runHook(sb, { hook_event_name: "SubagentStop", agent_id: "a0123456789abcdef" }, env), 0);
  const gs = spooled(sb).filter((e) => e.id.startsWith("hk-gs-"));
  assert.equal(gs.length, 1);
  assert.equal(gs[0].type, "incident");
  assert.match(gs[0].summary, /stash@\{0\} "autostash" \(222222222, a failed autostash re-apply\)/);
  assert.doesNotMatch(gs[0].summary, /new stash entr/, "listed once, as the incident");
  assert.match(gs[0].body, /git stash show -p --include-untracked 2{40}/);
  // Seen again at the next stop: not written twice.
  assert.equal(runHook(sb, { hook_event_name: "SubagentStop", agent_id: "aother000000000" }, env), 0);
  assert.equal(spooled(sb).filter((x) => x.id.startsWith("hk-gs-")).length, 1);

  // No baseline at all (a run the hook did not launch, no stash-last.json): an "autostash" entry is still an incident,
  // while an ordinary entry is not counted.
  const sb2 = sandbox();
  const main2 = fakeMain(sb2);
  fs.writeFileSync(path.join(main2, ".git/logs/refs/stash"), stashLine("1".repeat(40), "On main: older") + stashLine("3".repeat(40), "autostash"));
  assert.equal(runHook(sb2, { hook_event_name: "SubagentStop", agent_id: "aunknown0000000" }, { S3_MAIN_CHECKOUT: main2 }), 0);
  const gs2 = spooled(sb2).filter((e) => e.id.startsWith("hk-gs-"));
  assert.equal(gs2.length, 1);
  assert.equal(gs2[0].type, "incident");
  assert.match(gs2[0].summary, /stash@\{0\} "autostash" \(333333333/);

  // An "autostash" entry that was already there at dispatch is not new.
  const sb3 = sandbox();
  const main3 = fakeMain(sb3);
  fs.writeFileSync(path.join(main3, ".git/logs/refs/stash"), stashLine("4".repeat(40), "autostash"));
  asyncRun(sb3, { S3_MAIN_CHECKOUT: main3 });
  assert.equal(runHook(sb3, { hook_event_name: "SubagentStop", agent_id: "a0123456789abcdef" }, { S3_MAIN_CHECKOUT: main3 }), 0);
  assert.equal(spooled(sb3).length, 2, "dispatch and report only");
});

test("W-1337: MERGE_HEAD alone is a note; an unreadable .git still exits 0 and the report is still written", () => {
  const sb = sandbox();
  const main = fakeMain(sb);
  asyncRun(sb, { S3_MAIN_CHECKOUT: main });
  fs.writeFileSync(path.join(main, ".git/MERGE_HEAD"), "abcdef0123456789abcdef0123456789abcdef01\n");
  assert.equal(runHook(sb, { hook_event_name: "SubagentStop", agent_id: "a0123456789abcdef" }, { S3_MAIN_CHECKOUT: main }), 0);
  const gs = spooled(sb).filter((e) => e.id.startsWith("hk-gs-"));
  assert.equal(gs.length, 1);
  assert.equal(gs[0].type, "note");
  assert.match(gs[0].summary, /MERGE_HEAD \(abcdef012\)/);

  const sb2 = sandbox();
  const bad = path.join(sb2.dir, "main");
  fs.mkdirSync(bad);
  fs.writeFileSync(path.join(bad, ".git"), "not a gitdir line\n"); // a file where a dir is expected
  asyncRun(sb2, { S3_MAIN_CHECKOUT: bad });
  assert.equal(runHook(sb2, { hook_event_name: "SubagentStop", agent_id: "a0123456789abcdef" }, { S3_MAIN_CHECKOUT: bad }), 0);
  assert.deepEqual(spooled(sb2).map((e) => e.type), ["dispatch", "report"]);
});
