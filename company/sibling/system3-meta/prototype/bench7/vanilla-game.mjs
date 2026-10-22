#!/usr/bin/env node
// Benchmark 7, arm V: one vanilla Claude Code agent per game, driven by a script that plays the orderer and the hidden
// acceptance, with no person in the loop. Modelled on Benchmark 5V (b5v/vanilla.mjs) and Benchmark 6V.
//   - G1, G2, G3 in order, each in a fresh dir (<runs>/arm-V/<game>/, nothing carried over) and a FRESH Agent SDK
//     session (no memory across games: a vanilla user starts a new chat per project). Within a game the session is
//     resumed for each feedback round, as a person's chat would be.
//   - turn 1: the spec text (also written to SPEC.md in the dir) + "build game.mjs to this spec, write your own tests,
//     say when done". When the turn ends (its hand-in), the hidden suite runs (setup.mjs hidden(): the same runner and
//     the same `<category>: <f> of <t> tests fail` lines the Meta arms' accept stage returns as findings); only those go
//     back, up to MAX_ROUNDS=3 feedback rounds; a full pass ends the game.
//   - same model as the Meta arms (the launcher's --model default, read from launch.mjs: no model id lives here), same
//     tools (Bash/Read/Write/Edit/Glob/Grep, no Agent tool), settingSources [] (the launcher's default), maxTurns 200
//     and 60 min a turn (the builder role's maxTurns and sessionMin), one resume on a crash or timeout.
//   - the same access rule as the Meta arms (setup.mjs accessDecision, here as an in-process PreToolUse hook): every
//     tool call is logged to <runs>/_operator/access.jsonl, a benchmark-only path is denied.
//   - ledger <runs>/_operator/V/vanilla.jsonl: start, each turn (session, cost, cumulative, minutes), each hidden run
//     (pass, total, failing), and a game-summary per game: first hand-in and final pass rate, rounds, cost, tokens, minutes.
//
//   node vanilla-game.mjs [--games=G1,G2,G3] [--model=<id>] [--runs=<dir>] [--b7=<dir>] [--turn-min=60] [--max-turns=200] [--dry-run]
//   --dry-run prints each game's prompt and the settings, writes nothing and starts no session.
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { paths, hidden, accessDecision, accessNote, denyRoots, DENY_TEXT, GAMES } from "./setup.mjs";

const HERE = path.dirname(fileURLToPath(import.meta.url));
const opt = Object.fromEntries(process.argv.slice(2).filter((a) => a.startsWith("--")).map((a) => { const [k, ...v] = a.slice(2).split("="); return [k, v.join("=") || true]; }));
const P = paths(opt);
const DRY = !!opt["dry-run"];
const RUN_GAMES = String(opt.games ?? GAMES.join(",")).split(",").filter(Boolean);
if (!RUN_GAMES.every((g) => GAMES.includes(g))) { console.error("--games is a list of G1, G2, G3"); process.exit(2); }
const MAX_ROUNDS = 3, RESUMES = 1;
const TURN_MIN = Number(opt["turn-min"] ?? 60), MAX_TURNS = Number(opt["max-turns"] ?? 200);
const TOOLS = ["Bash", "Read", "Write", "Edit", "Glob", "Grep"];
// the Meta arms' model: the launcher's own default (or the same --model passed to both)
const launcherSrc = fs.readFileSync(path.join(P.proto, "launcher", "launch.mjs"), "utf8");
const MODEL = opt.model ?? (launcherSrc.match(/const MODEL = opt\.model \?\? "([^"]+)"/) ?? [])[1];
if (!MODEL) { console.error("no --model, and the launcher's default could not be read"); process.exit(2); }

const promptFor = (game, dir, spec) => `${spec.trimEnd()}

---
Build game.mjs to this spec, in ${dir} (SPEC.md there is the same text). Plain JavaScript ES modules, Node 22, no dependencies. Write your own tests (node --test, *.test.mjs in ${dir}). When you are done, say so briefly.
After you finish, a hidden acceptance suite runs on game.mjs and reports only the failing categories, one line each: \`<category>: <f> of <t> tests fail\`.`;
const feedback = (lines) => `The hidden acceptance tests on game.mjs failed:\n${lines.join("\n")}\nFix it, and say when you are done.`;

if (DRY) {
  for (const g of RUN_GAMES) {
    const dir = P.live("V", g), spec = fs.readFileSync(P.spec(g), "utf8");
    console.log(`===== ${g}: ${dir}\n${promptFor(g, dir, spec)}\n`);
  }
  console.log(JSON.stringify({ dry: true, games: RUN_GAMES, model: MODEL, tools: TOOLS, settingSources: [], maxTurns: MAX_TURNS, turnMin: TURN_MIN, maxRounds: MAX_ROUNDS, ledger: P.vledger, access: P.access, denyRoots: denyRoots(P, "V") }, null, 1));
  process.exit(0);
}

for (const g of RUN_GAMES) if (fs.existsSync(P.live("V", g))) { console.error(`refused: ${P.live("V", g)} exists (a fresh dir per game)`); process.exit(2); }
const { query } = await import("@anthropic-ai/claude-agent-sdk");
const note = (x) => { fs.mkdirSync(path.dirname(P.vledger), { recursive: true }); const l = JSON.stringify({ t: new Date().toISOString(), ...x }); fs.appendFileSync(P.vledger, l + "\n"); console.log(l); };
const env = { ...process.env };
for (const k of ["CLAUDECODE", "CLAUDE_CODE_SESSION_ID", "CLAUDE_AUTO_BACKGROUND_TASKS", "CLAUDE_CODE_BG_TASKS_REPORT_RUNNING", "NODE_TEST_CONTEXT", "B7_DEBUG"]) delete env[k];
for (const k of Object.keys(env)) if (k.startsWith("META_")) delete env[k];
const ROOTS = denyRoots(P, "V");

async function playGame(game) {
  const dir = P.live("V", game), spec = fs.readFileSync(P.spec(game), "utf8");
  fs.mkdirSync(dir, { recursive: true });
  fs.writeFileSync(path.join(dir, "SPEC.md"), spec);
  let session = null, turns = 0;
  const hook = async (input) => {
    const d = accessDecision({ tool: input?.tool_name, input: input?.tool_input, cwd: input?.cwd || dir }, ROOTS);
    try { accessNote(P, { arm: "V", game, sid: input?.session_id ?? session, tool: input?.tool_name, input: input?.tool_input, cwd: input?.cwd || dir, d }); } catch {}
    return d.deny ? { hookSpecificOutput: { hookEventName: "PreToolUse", permissionDecision: "deny", permissionDecisionReason: DENY_TEXT } } : {};
  };
  async function turn(prompt, label) {
    turns++;
    const ac = new AbortController(), limit = setTimeout(() => ac.abort(new Error(`turn over ${TURN_MIN} min`)), TURN_MIN * 60_000);
    const t0 = Date.now(); let result = null, error = null;
    try {
      for await (const m of query({ prompt, options: { cwd: dir, model: MODEL, abortController: ac, env, settingSources: [], tools: TOOLS, allowedTools: TOOLS, permissionMode: "dontAsk", permissionPrompts: "none", maxTurns: MAX_TURNS, hooks: { PreToolUse: [{ hooks: [hook] }] }, ...(session ? { resume: session } : {}) } })) {
        if (typeof m.session_id === "string" && m.session_id && !session) session = m.session_id;
        if (m.type === "result") result = m;
      }
    } catch (e) { error = e?.message ?? String(e); }
    clearTimeout(limit);
    // a resumed session's result carries the session's running total (SDK): the ledger keeps each turn's, tally keeps the latest
    const mu = Object.values(result?.modelUsage ?? {});
    const cumulative = mu.reduce((a, u) => a + u.inputTokens + u.outputTokens + u.cacheReadInputTokens + u.cacheCreationInputTokens, 0);
    const cost = mu.reduce((a, u) => a + (u.costUSD ?? 0), 0);
    const ok = !error && !!result && !result.is_error;
    note({ event: "turn", game, n: turns, label, session, ok, reason: ok ? null : (error ?? result?.subtype ?? "no result"), cumulative, cost: Number(cost.toFixed(4)), agentTurns: result?.num_turns ?? null, minutes: Math.round((Date.now() - t0) / 600) / 100, said: String(result?.result ?? "").slice(0, 2000) });
    return ok;
  }
  async function turnWithResume(prompt, label) {
    let ok = await turn(prompt, label);
    for (let r = 0; !ok && r < RESUMES; r++) ok = await turn(session ? "You were interrupted. Continue the task where you left off, and say when you are done." : prompt, `${label} resume`);
    return ok;
  }
  const T0 = Date.now();
  note({ event: "start", game, dir, model: MODEL, tools: TOOLS, settingSources: [], maxTurns: MAX_TURNS, turnMin: TURN_MIN, maxRounds: MAX_ROUNDS });
  let prompt = promptFor(game, dir, spec), h = null, first = null;
  for (let round = 0; round <= MAX_ROUNDS; round++) {
    const ok = await turnWithResume(prompt, round ? `feedback ${round}` : "build");
    h = hidden(P, game, dir);
    note({ event: "hidden", game, round, ok, ...(h.error ? { error: h.error } : { pass: h.pass, total: h.total, rate: h.rate, failing: h.failing }) });
    first ??= h;
    if (!h.error && !h.fail) break;
    if (!ok && !session) break; // never started: nothing to resume
    prompt = h.error ? feedback([`load: the suite could not run (${h.error.slice(0, 200)})`]) : feedback(h.failing);
  }
  const s = { event: "game-summary", game, session, turns, minutes: Math.round((Date.now() - T0) / 600) / 100, first: first?.error ? null : { pass: first?.pass, total: first?.total, rate: first?.rate }, final: h?.error ? null : { pass: h?.pass, total: h?.total, rate: h?.rate, failing: h?.failing } };
  note(s);
}

for (const g of RUN_GAMES) await playGame(g);
