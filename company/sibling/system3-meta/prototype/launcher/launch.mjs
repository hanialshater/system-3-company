#!/usr/bin/env node
// The launcher (M3, founder 2026-10-21: "go with Agent SDK"): starts every agent session the supervisor plans, with no
// person in the loop. Benchmark 3: `serve` planned and briefed every launch, and I still launched all 18 by hand.
//
//   node launcher/launch.mjs --live=<dir> [--acceptance=<dir>] [--model=claude-opus-5-5] [--max-parallel=4]
//        [--max-min=90] [--idle-min=1] [--session-min=20] [--kill=<n>:<seconds>,…] [--faults=<json>]
//        [--setting-sources=user,project,local]
//
// It runs `supervisor.mjs serve` as a child and reads its JSON lines. Each {"event":"launch"} becomes one Agent SDK
// query() whose prompt is the brief file exactly as code wrote it (benchmark 3: two of my hand launches were retyped
// wrong). Each agent process is named META_LAUNCH=<brief>, so `room enter` tags its session; when the process ends the
// launcher reports its tokens through `meta.mjs launch finished`, and a failed process abandons what it left running,
// so the work goes back to its queue and `serve` plans it again (crash recovery).
//
// Tokens: `tokens` is the agent's final context (input + cache + output of its last main-loop call), the measure the
// earlier live runs used (the Agent tool's subagent count); `cumulative` sums every call and `cost` is the SDK's
// estimate. Both are kept in live/<dir>/launches.jsonl with each launch's outcome.
//
// --kill=<n>:<s> aborts the n-th launch (1-based) after s seconds: an injected crash, to prove recovery.
import { query } from "@anthropic-ai/claude-agent-sdk";
import { spawn, spawnSync } from "node:child_process";
import fs from "node:fs";
import path from "node:path";
import readline from "node:readline";

import crypto from "node:crypto";
const HERE = path.dirname(new URL(import.meta.url).pathname);
const SRC = path.join(HERE, "..");
const opt = Object.fromEntries(process.argv.slice(2).filter((a) => a.startsWith("--")).map((a) => { const [k, ...v] = a.slice(2).split("="); return [k, v.join("=") || true]; }));
if (!opt.live) { console.error("usage: node launcher/launch.mjs --live=<dir> [--acceptance=<dir>] [--model=…] [--max-parallel=4] [--kill=<n>:<s>]"); process.exit(2); }
const LIVE = path.resolve(opt.live);
// the run uses a frozen copy of the kernel (benchmark 4b: I edited meta.mjs while a run was live and broke every
// agent's commands for half an hour). Agents and serve run from live/<dir>/kernel/; its hash goes in the ledger.
const PROTO = path.join(LIVE, "kernel");
const KERNEL_FILES = fs.readdirSync(SRC).filter((f) => f.endsWith(".mjs") || f === "escapes.json");
fs.mkdirSync(PROTO, { recursive: true });
for (const f of KERNEL_FILES) fs.copyFileSync(path.join(SRC, f), path.join(PROTO, f));
fs.cpSync(path.join(SRC, "specs"), path.join(PROTO, "specs"), { recursive: true });
// briefs and specs name paths like live/<dir>/SPEC.md, relative to the prototype: the copy sees the same live/
if (!fs.existsSync(path.join(PROTO, "live"))) fs.symlinkSync(path.join(SRC, "live"), path.join(PROTO, "live"));
const KERNEL_HASH = crypto.createHash("sha256").update(KERNEL_FILES.sort().map((f) => fs.readFileSync(path.join(PROTO, f))).join("\0")).digest("hex").slice(0, 12);
const MODEL = opt.model ?? "claude-opus-5-5";
const MAX_PAR = Number(opt["max-parallel"] ?? 4);
const SESSION_MIN = Number(opt["session-min"] ?? 20);
// --setting-sources=user,project,local loads what an interactive session loads (System 3 Company's CLAUDE.md and
// settings): the like-for-like arm for cost comparisons with the earlier benchmarks (benchmark 4's caveat)
const SOURCES = opt["setting-sources"] ? String(opt["setting-sources"]).split(",").filter(Boolean) : [];
const kills = new Map(String(opt.kill ?? "").split(",").filter(Boolean).map((x) => x.split(":").map(Number)));
const env = { ...process.env, META_LIVE_DIR: LIVE, BOOK_ROOT: process.env.BOOK_ROOT ?? path.join(LIVE, "work") };
delete env.CLAUDECODE; // the agents are their own Claude Code processes, not children of this session's
// benchmark 5: inherited, these made every agent write one shared transcript (this session's id), and let a long
// command move to the background, where an SDK agent waited for a notice that never came (a 30-minute hang)
for (const k of ["CLAUDE_CODE_SESSION_ID", "CLAUDE_AUTO_BACKGROUND_TASKS", "CLAUDE_CODE_BG_TASKS_REPORT_RUNNING"]) delete env[k];
const ledger = path.join(LIVE, "launches.jsonl");
const note = (x) => { const line = JSON.stringify({ t: new Date().toISOString(), ...x }); fs.appendFileSync(ledger, line + "\n"); console.log(line); };

const meta = (...args) => {
  const r = spawnSync("node", [path.join(PROTO, "meta.mjs"), ...args], { env, encoding: "utf8" });
  if (r.status !== 0) note({ event: "meta-error", args: args.join(" "), err: r.stderr.trim().slice(0, 300) });
  return r.status === 0 ? JSON.parse(r.stdout) : null;
};

let n = 0, done = false, serveExit = null;
const active = new Set(), waiting = [];

async function run(ev) {
  const id = path.basename(ev.brief, ".md"), k = ++n;
  const prompt = fs.readFileSync(ev.brief, "utf8");
  const ac = new AbortController();
  const limit = setTimeout(() => ac.abort(new Error(`session over ${SESSION_MIN} min`)), SESSION_MIN * 60_000);
  const kill = kills.has(k) ? setTimeout(() => ac.abort(new Error("injected crash (--kill)")), kills.get(k) * 1000) : null;
  note({ event: "start", launch: id, n: k, role: ev.role, msgs: ev.msgs ?? [], tasks: (ev.tasks ?? []).map((t) => `${t.kind}:${t.ref}`) });
  let last = null, result = null, error = null;
  const t0 = Date.now();
  try {
    for await (const m of query({ prompt, options: {
      cwd: PROTO, model: MODEL, abortController: ac,
      env: { ...env, META_LAUNCH: id },
      // the brief is the whole job: no project settings or CLAUDE.md (they belong to System 3 Company, not this run)
      settingSources: SOURCES,
      allowedTools: ["Bash", "Read", "Write", "Edit", "Glob", "Grep"],
      permissionMode: "dontAsk", permissionPrompts: "none",
      maxTurns: 80,
    } })) {
      if (m.type === "assistant" && m.parent_tool_use_id == null && m.message?.usage) last = m.message.usage;
      if (m.type === "result") result = m;
    }
  } catch (e) { error = e?.message ?? String(e); }
  clearTimeout(limit); if (kill) clearTimeout(kill);
  const ok = !error && result && !result.is_error;
  const tokens = last ? (last.input_tokens ?? 0) + (last.cache_read_input_tokens ?? 0) + (last.cache_creation_input_tokens ?? 0) + (last.output_tokens ?? 0) : 0;
  const mu = Object.values(result?.modelUsage ?? {});
  const cumulative = mu.reduce((a, u) => a + u.inputTokens + u.outputTokens + u.cacheReadInputTokens + u.cacheCreationInputTokens, 0);
  const cost = mu.reduce((a, u) => a + (u.costUSD ?? 0), 0);
  const reason = ok ? null : (error ?? result?.subtype ?? "no result");
  const rec = meta("launch", "finished", `--launch=${id}`, `--role=${ev.role}`, `--tokens=${tokens}`, `--cumulative=${cumulative}`, `--cost=${cost.toFixed(4)}`, `--ok=${ok}`, ...(reason ? [`--reason=${reason}`] : []));
  note({ event: "finish", launch: id, n: k, role: ev.role, ok, reason, tokens, cumulative, cost: Number(cost.toFixed(4)), turns: result?.num_turns ?? null, minutes: Math.round((Date.now() - t0) / 600) / 100, sessions: rec?.sessions ?? [], abandoned: rec?.abandoned ?? [], said: String(result?.result ?? "").slice(0, 4000) });
}

function pump() {
  while (active.size < MAX_PAR && waiting.length) {
    const ev = waiting.shift();
    const p = run(ev).catch((e) => note({ event: "launcher-error", err: String(e) })).finally(() => { active.delete(p); pump(); });
    active.add(p);
  }
  if (done && !active.size && !waiting.length) finish();
}

let finished = false;
function finish() {
  if (finished) return; finished = true;
  const lines = fs.readFileSync(ledger, "utf8").trim().split("\n").map((l) => JSON.parse(l)).filter((x) => x.event === "finish");
  note({ event: "summary", launches: lines.length, failed: lines.filter((x) => !x.ok).length, tokens: lines.reduce((a, x) => a + x.tokens, 0), cumulative: lines.reduce((a, x) => a + x.cumulative, 0), cost: Number(lines.reduce((a, x) => a + x.cost, 0).toFixed(2)), serve: serveExit });
  process.exit(0);
}

const serveArgs = [path.join(PROTO, "supervisor.mjs"), "serve", `--idle-min=${opt["idle-min"] ?? 1}`, `--max-min=${opt["max-min"] ?? 90}`, ...(opt.acceptance ? [`--acceptance=${path.resolve(opt.acceptance)}`] : []), ...(opt.faults ? [`--faults=${path.resolve(opt.faults)}`] : [])];
const serve = spawn("node", serveArgs, { env, stdio: ["ignore", "pipe", "inherit"] });
note({ event: "launcher-up", live: LIVE, kernel: KERNEL_HASH, model: MODEL, maxParallel: MAX_PAR, kills: [...kills.entries()], settingSources: SOURCES });
readline.createInterface({ input: serve.stdout }).on("line", (line) => {
  let ev; try { ev = JSON.parse(line); } catch { return; }
  fs.appendFileSync(path.join(LIVE, "serve.log"), line + "\n");
  if (ev.event === "launch") { waiting.push(ev); pump(); }
  if (ev.event === "done" || ev.event === "stopped") { done = true; pump(); }
});
serve.on("exit", (code) => { serveExit = code; done = true; pump(); });
// a launch planned while every slot is busy waits here; serve keeps reserving it, so it is not planned twice
process.on("SIGINT", () => { serve.kill(); done = true; finish(); });
