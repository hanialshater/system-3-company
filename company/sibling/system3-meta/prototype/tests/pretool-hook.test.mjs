import { test } from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

// B8: the launcher's --pretool-hook (guard.mjs commandHook): an operator's PreToolUse command hook, run in process for
// every session, so a run adds its own access rule with settingSources [] (no project settings file to load it from).
// exit 0 allows, exit 2 denies with stderr as the reason, anything else denies (fails closed); queryOptions runs it
// after the guard; launch.mjs wires it for every launch.
const HERE = path.dirname(new URL(import.meta.url).pathname);
const LAUNCHER = path.join(HERE, "..", "launcher");
const G = await import(path.join(LAUNCHER, "guard.mjs"));
const TMP = fs.mkdtempSync(path.join(os.tmpdir(), "meta-hook-"));
const HOOK = path.join(TMP, "hook.mjs");
// denies any Bash line naming "forbidden", crashes on "crash", hangs on "hang"; echoes the role it was given
fs.writeFileSync(HOOK, 'import fs from "node:fs"; const j = JSON.parse(fs.readFileSync(0, "utf8")); const c = String(j.tool_input?.command ?? "");\nif (c.includes("crash")) process.exit(5); if (c.includes("hang")) setTimeout(() => {}, 60000);\nelse if (c.includes("forbidden")) { process.stderr.write(`no (${process.env.META_ROLE})`); process.exit(2); } else process.exit(0);\n');

test("commandHook: exit 0 allows, exit 2 denies with stderr, a crash, a timeout or a missing command denies", async () => {
  const seen = [];
  const h = G.commandHook(["node", HOOK], { env: { ...process.env, META_ROLE: "backend" }, timeoutMs: 1500, record: (d) => seen.push(d) });
  const call = (command) => h({ hook_event_name: "PreToolUse", tool_name: "Bash", tool_input: { command }, cwd: TMP });
  assert.deepEqual(await call("ls"), {});
  const d = await call("cat forbidden");
  assert.equal(d.hookSpecificOutput.permissionDecision, "deny");
  assert.equal(d.hookSpecificOutput.permissionDecisionReason, "no (backend)", "stderr is the reason; the env reaches the hook");
  assert.match((await call("crash")).hookSpecificOutput.permissionDecisionReason, /hook failed \(exit 5\).*fails closed/);
  assert.match((await call("hang")).hookSpecificOutput.permissionDecisionReason, /timed out after 1500 ms/);
  assert.deepEqual(seen.map((x) => [x.via, x.tool, x.rule]), [["pretool-hook", "Bash", "pretool-hook"], ["pretool-hook", "Bash", "pretool-hook-failed"], ["pretool-hook", "Bash", "pretool-hook-failed"]]);
  const gone = G.commandHook([path.join(TMP, "no-such-hook")], {});
  assert.match((await gone({ tool_name: "Read", tool_input: {} })).hookSpecificOutput.permissionDecisionReason, /hook failed/);
  assert.deepEqual(await h({ hook_event_name: "PostToolUse", tool_name: "Bash", tool_input: { command: "forbidden" } }), {}, "only PreToolUse");
  assert.throws(() => G.commandHook("node hook.mjs"), /JSON argv/);
});

test("queryOptions runs the command hook after the guard; launch.mjs wires --pretool-hook into every launch", () => {
  const p = G.sessionPlan({ tools: ["Bash", "Read"], workdir: null, roots: [], settingSources: [] }, {}, { cwd: "/k", sessionMin: 20, maxTurns: 80, settingSources: [] });
  const g = G.makeGuard({ tools: p.tools, roots: [], cwd: "/k" }), extra = G.commandHook(["node", HOOK]);
  assert.deepEqual(G.queryOptions(p, g, {}).hooks.PreToolUse.map((x) => x.hooks), [[g.preToolUse]], "no hook: as before");
  const q = G.queryOptions(p, g, { extraHooks: [extra] });
  assert.deepEqual(q.hooks.PreToolUse.map((x) => x.hooks), [[g.preToolUse, extra]]);
  assert.deepEqual(q.settingSources, [], "the role's settingSources [] is kept");
  const src = fs.readFileSync(path.join(LAUNCHER, "launch.mjs"), "utf8");
  assert.match(src, /opt\["pretool-hook"\]/);
  assert.match(src, /commandHook\(HOOK_ARGV, \{ env: \{ \.\.\.env, META_LAUNCH: id, META_ROLE: ev\.role \}/);
  assert.match(src, /queryOptions\(plan, guard, \{ model: MODEL, .*, resume, extraHooks, effort: EFFORT \}\)/);
});

test("B8 pilot fix: --effort sets the SDK effort option on every session; unset, no effort key (the CLI's own)", () => {
  const p = G.sessionPlan({ tools: ["Bash"], workdir: null, roots: [], settingSources: [] }, {}, { cwd: "/k", sessionMin: 20, maxTurns: 80, settingSources: [] });
  const g = G.makeGuard({ tools: p.tools, roots: [], cwd: "/k" });
  assert.equal(G.queryOptions(p, g, { effort: "high" }).effort, "high");
  assert.ok(!("effort" in G.queryOptions(p, g, {})));
  const src = fs.readFileSync(path.join(LAUNCHER, "launch.mjs"), "utf8");
  assert.match(src, /const EFFORT = opt\.effort \? String\(opt\.effort\) : null;/);
  assert.match(src, /\["low", "medium", "high", "xhigh", "max"\]\.includes\(EFFORT\)/);
});
