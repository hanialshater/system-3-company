// W-1195 / W-716 (retro 2026-10-16 C1): the Agent-tool hook writes dispatch/report events at the moment they
// happen; metrics print the last-dispatch age and mark "never dispatched" STALE over 6 h.
// Every test writes to a temp log through S3_EVENTS; none touches company/ops/events.jsonl.
// Run: npm run test:dispatch
import { test } from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import { execFileSync } from "node:child_process";
import { fileURLToPath } from "node:url";
import { lastDispatchAge, lastDispatchLine } from "../../tools/lib/dispatch-age.mjs";
import { transcriptEvents } from "../../tools/events.mjs";

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "../..");
const HOOK = path.join(ROOT, ".claude/hooks/agent-events.mjs");
const REAL_LOG = path.join(ROOT, "company/ops/events.jsonl");

function sandbox() {
  const d = fs.mkdtempSync(path.join(os.tmpdir(), "agent-events-"));
  return { dir: d, events: path.join(d, "events.jsonl"), log: path.join(d, "hook.log"), state: path.join(d, "state") };
}
function runHook(sb, payload, extraEnv = {}) {
  const input = typeof payload === "string" ? payload : JSON.stringify(payload);
  const r = (() => {
    try {
      execFileSync("node", [HOOK], { input, env: { ...process.env, S3_EVENTS: sb.events, S3_HOOK_LOG: sb.log, S3_HOOK_STATE: sb.state, ...extraEnv }, encoding: "utf8" });
      return 0;
    } catch (e) { return e.status; }
  })();
  return r;
}
const read = (f) => (fs.existsSync(f) ? fs.readFileSync(f, "utf8").split("\n").filter(Boolean).map((l) => JSON.parse(l)) : []);
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
  const evs = read(sb.events);
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
  const [e] = read(sb.events);
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
  const [so, s4, so2] = read(sb.events);
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
  assert.equal(read(sb.events).length, 1, "no report on async launch");
  assert.ok(fs.existsSync(path.join(sb.state, "a0123456789abcdef.json")));
  const tr = path.join(sb.dir, "agent.jsonl");
  fs.writeFileSync(tr, JSON.stringify({ type: "assistant", message: { content: [{ type: "text", text: "Changed: tools/x.mjs\nAll tests pass." }] } }) + "\n");
  assert.equal(runHook(sb, { hook_event_name: "SubagentStop", agent_id: "a0123456789abcdef", agent_transcript_path: tr }), 0);
  const [d, r] = read(sb.events);
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
  const [d, r] = read(sb.events);
  assert.equal(r.type, "report");
  assert.equal(r.agent, d.agent);
  assert.equal(r.state, "done");
});

test("never blocks: garbage stdin, other tools and a broken log path all exit 0", () => {
  const sb = sandbox();
  assert.equal(runHook(sb, "not json"), 0);
  assert.match(fs.readFileSync(sb.log, "utf8"), /payload: not json/);
  assert.equal(runHook(sb, { hook_event_name: "PreToolUse", tool_name: "Bash", tool_input: { command: "ls" } }), 0);
  assert.equal(read(sb.events).length, 0);
  const blocked = path.join(sb.dir, "file-not-dir");
  fs.writeFileSync(blocked, "");
  assert.equal(runHook(sb, pre("batch=x#B1"), { S3_EVENTS: path.join(blocked, "events.jsonl") }), 0);
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
