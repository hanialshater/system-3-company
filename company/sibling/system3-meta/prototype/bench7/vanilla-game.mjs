#!/usr/bin/env node
// Benchmark 7, arm V: one vanilla Claude Code agent per game, driven by a script that plays the orderer and the hidden
// acceptance, with no person in the loop. Modelled on Benchmark 5V (b5v/vanilla.mjs) and Benchmark 6V.
//   - G1, G2, G3 in order, each in a fresh dir (<runs>/arm-V/<game>/, nothing carried over) and a FRESH Agent SDK
//     session (no memory across games: a vanilla user starts a new chat per project). Within a game the session is
//     resumed for each feedback round, as a person's chat would be.
//   - turn 1: the spec text (also written to SPEC.md in the dir, with the visible tests in visible-tests/, setup.mjs
//     placeVisible: the same files the Meta arms' workdir gets) + "build game.mjs to this spec, write your own tests,
//     say when done". When the turn ends (its hand-in), the PRE-notice hidden suite scores it (the first hand-in) and
//     nothing of that score goes back: v2's Change Notice does. The notice is appended to SPEC.md and its visible tests
//     added (setup.mjs deliverNoticeFiles, as the Meta arms get them), and turn 2 is NOTICE_POINTER (the same text the
//     Meta builder gets as the founder's resume reason). From then on the POST-notice suite scores every hand-in (the
//     same runner and the same `<category>: <f> of <t> tests fail` lines the Meta arms' accept stage returns as
//     findings); only those go back, up to MAX_ROUNDS=3 feedback rounds after the notice turn (the notice costs none, as
//     the founder's resume costs the Meta arms no loop); a full post-notice pass ends the game.
//   - same model as the Meta arms (the launcher's --model default, read from launch.mjs: no model id lives here), same
//     tools (Bash/Read/Write/Edit/Glob/Grep, no Agent tool), settingSources [] (the launcher's default), maxTurns 200
//     and 60 min a turn (the builder role's maxTurns and sessionMin), one resume on a crash or timeout.
//   - the same access rule as the Meta arms (setup.mjs accessDecision with accessRules(P, "V", game): the game's own
//     dir is open, the benchmark's area around it closed, relative paths resolved), here as an in-process PreToolUse
//     hook: every tool call is logged to <runs>/_operator/access.jsonl, a call that reaches outside is denied.
//   - the same wall clock per game as the Meta arms (setup.mjs GAME_MIN): no round starts after it, and a turn ends at it.
//   - a hidden runner that itself errors spends no round and sends nothing (B7 review: V got the runner's stderr as a
//     round of feedback, where Meta's accept exits 3, a stage error that spends no loop): it is retried twice, then
//     the game ends with the error recorded for the operator.
//   - ledger <runs>/_operator/V/vanilla.jsonl: start, each turn (session, cost, cumulative, minutes), each hidden run
//     (pass, total, failing), and a game-summary per game: first hand-in and final pass rate, rounds, cost, tokens, minutes.
//
//   node vanilla-game.mjs [--games=G1,G2,G3] [--model=<id>] [--runs=<dir>] [--b7=<dir>] [--turn-min=60] [--max-turns=200] [--dry-run]
//   --dry-run prints each game's prompt and the settings, writes nothing and starts no session.
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { paths, hidden, accessDecision, accessNote, accessRules, denyRoots, DENY_TEXT, GAMES, GAME_MIN, NOTICE_POINTER, placeVisible, deliverNoticeFiles } from "./setup.mjs";

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
const noticeTurn = (game) => `${NOTICE_POINTER(game)} Say when you are done.`;

if (DRY) {
  for (const g of RUN_GAMES) {
    const dir = P.live("V", g), spec = fs.readFileSync(P.spec(g), "utf8");
    console.log(`===== ${g}: ${dir}\n${promptFor(g, dir, spec)}\n\n===== ${g}, turn 2 (after the first hand-in; SPEC.md gains ${P.notice(g)}):\n${noticeTurn(g)}\n`);
  }
  console.log(JSON.stringify({ dry: true, games: RUN_GAMES, model: MODEL, tools: TOOLS, settingSources: [], maxTurns: MAX_TURNS, turnMin: TURN_MIN, maxRounds: MAX_ROUNDS, gameMin: GAME_MIN, ledger: P.vledger, access: P.access, denyRoots: denyRoots(P, "V", RUN_GAMES[0]) }, null, 1));
  process.exit(0);
}

for (const g of RUN_GAMES) if (fs.existsSync(P.live("V", g))) { console.error(`refused: ${P.live("V", g)} exists (a fresh dir per game)`); process.exit(2); }
const { query } = await import("@anthropic-ai/claude-agent-sdk");
const note = (x) => { fs.mkdirSync(path.dirname(P.vledger), { recursive: true }); const l = JSON.stringify({ t: new Date().toISOString(), ...x }); fs.appendFileSync(P.vledger, l + "\n"); console.log(l); };
const env = { ...process.env };
for (const k of ["CLAUDECODE", "CLAUDE_CODE_SESSION_ID", "CLAUDE_AUTO_BACKGROUND_TASKS", "CLAUDE_CODE_BG_TASKS_REPORT_RUNNING", "NODE_TEST_CONTEXT", "B7_DEBUG"]) delete env[k];
for (const k of Object.keys(env)) if (k.startsWith("META_")) delete env[k];

async function playGame(game) {
  const dir = P.live("V", game), spec = fs.readFileSync(P.spec(game), "utf8");
  fs.mkdirSync(dir, { recursive: true });
  fs.writeFileSync(path.join(dir, "SPEC.md"), spec);
  const visibleSha = placeVisible(P, game, dir);
  let session = null, turns = 0;
  const ROOTS = accessRules(P, "V", game), T0 = Date.now(), left = () => GAME_MIN * 60_000 - (Date.now() - T0);
  const hook = async (input) => {
    const d = accessDecision({ tool: input?.tool_name, input: input?.tool_input, cwd: input?.cwd || dir }, ROOTS);
    try { accessNote(P, { arm: "V", game, sid: input?.session_id ?? session, tool: input?.tool_name, input: input?.tool_input, cwd: input?.cwd || dir, d }); } catch {}
    return d.deny ? { hookSpecificOutput: { hookEventName: "PreToolUse", permissionDecision: "deny", permissionDecisionReason: DENY_TEXT } } : {};
  };
  async function turn(prompt, label) {
    turns++;
    const ms = Math.max(1000, Math.min(TURN_MIN * 60_000, left()));
    const ac = new AbortController(), limit = setTimeout(() => ac.abort(new Error(ms < TURN_MIN * 60_000 ? `game over ${GAME_MIN} min` : `turn over ${TURN_MIN} min`)), ms);
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
    for (let r = 0; !ok && r < RESUMES && left() > 0; r++) ok = await turn(session ? "You were interrupted. Continue the task where you left off, and say when you are done." : prompt, `${label} resume`);
    return ok;
  }
  note({ event: "start", game, dir, model: MODEL, tools: TOOLS, settingSources: [], maxTurns: MAX_TURNS, turnMin: TURN_MIN, maxRounds: MAX_ROUNDS, gameMin: GAME_MIN, visibleSha });
  const score = (phase, round, ok) => {
    let h = hidden(P, game, dir, phase);
    for (let k = 0; h.error && k < 2; k++) { note({ event: "hidden-error", game, round, phase, try: k + 1, error: h.error }); h = hidden(P, game, dir, phase); }
    note({ event: "hidden", game, round, phase, ok, ...(h.error ? { error: h.error } : { pass: h.pass, total: h.total, rate: h.rate, failing: h.failing }) });
    if (h.error) note({ event: "stop", game, round, why: "the hidden runner failed three times: an operator error, no round spent" });
    return h;
  };
  let h = null, first = null, afterNotice = null;
  // the first hand-in, scored with the pre-notice suite; nothing of it goes back
  const ok0 = await turnWithResume(promptFor(game, dir, spec), "build");
  first = score("pre", 0, ok0);
  const started = ok0 || !!session;
  if (!first.error && started && left() > 0) {
    // the Change Notice: SPEC.md and visible-tests/ change exactly as the Meta arms' do, and it is the next turn
    const files = deliverNoticeFiles(P, game, dir);
    note({ event: "notice", game, ...files });
    let prompt = noticeTurn(game);
    for (let round = 0; round <= MAX_ROUNDS; round++) {
      if (left() <= 0) { note({ event: "stop", game, round, why: `wall clock: ${GAME_MIN} min` }); break; }
      const ok = await turnWithResume(prompt, round ? `feedback ${round}` : "notice");
      h = score("post", round, ok);
      if (h.error) break;
      afterNotice ??= h;
      if (!h.fail) break;
      if (!ok && !session) break; // never started: nothing to resume
      if (left() <= 0) { note({ event: "stop", game, round, why: `wall clock: ${GAME_MIN} min` }); break; }
      prompt = feedback(h.failing);
    }
  } else if (!first.error) note({ event: "stop", game, round: 0, why: left() > 0 ? "the first turn never started a session" : `wall clock: ${GAME_MIN} min` });
  const sum = (x) => (!x || x.error ? null : { pass: x.pass, total: x.total, rate: x.rate, failing: x.failing });
  const s = { event: "game-summary", game, session, turns, minutes: Math.round((Date.now() - T0) / 600) / 100, first: sum(first), afterNotice: sum(afterNotice), final: sum(h) };
  note(s);
}

for (const g of RUN_GAMES) await playGame(g);
