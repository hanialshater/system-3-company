// Benchmark 8, the restart test's stand-in for the Agent SDK (no model, no network): `setup.mjs run --fake` copies this
// folder over the frozen launcher's node_modules/@anthropic-ai/claude-agent-sdk in a scratch run, so the real launcher,
// serve, the broker, the accept stage and the hidden runner all run, and each launch's "agent" plays its role by the
// kernel's CLI, as dryrun.mjs does: the architect delegates the wave to the owners at once; an owner writes its module
// of the stub compiler (bench8/dryrun/stub, B8_FAKE_STUB) into the worktree, or appends to it on a revise, and hands in;
// the evaluator writes EVAL.md and passes; a retro proposes {}. Each launch takes B8_FAKE_SEC seconds (default 2), so
// a test can kill the run while sessions are in flight. Sessions: a resume of an id this fake never started fails as
// a gone session does (no assistant message, an error), and with B8_FAKE_LOSE_SESSION=1 the first resume of a launcher
// process fails too (the launcher's cold fallback, K26).
// S2 (its brief's context names `--scope=`; PROTOCOL.md "S2"): the architect scopes each wave (W1: backend; W2:
// semantics; later: backend,semantics); every write goes through the session's PreToolUse hooks first (the kernel
// guard: a denied write is skipped), so a borrow is seen and recorded as a real session's would be; backend borrows
// semantics' lower.clj in W1; an owner asked to review a borrow answers yes; the guard is asked about the shell
// writes S1's agents were refused (fake-guard.jsonl); the evaluator, advisory and time-boxed, writes one defect line
// to EVAL.md and then works on until its session is ended at the box.
import fs from "node:fs";
import path from "node:path";
import crypto from "node:crypto";
import { spawnSync } from "node:child_process";

// B9 S9: the start's layout (V's compiler: lexer, parser, codegen), modules frontend, parser, backend
const OWNED9 = { architect: ["src/ccc/main.clj", "docs/MODULES.md"], frontend: ["src/ccc/lexer.clj"], parser: ["src/ccc/parser.clj"], backend: ["src/ccc/codegen.clj"] };
const OWNED = { architect: ["src/ccc/main.clj", "src/ccc/ast.clj", "src/ccc/ir.clj", "docs/ABI.md", "docs/MODULES.md"], frontend: ["src/ccc/frontend/lexer.clj", "src/ccc/frontend/parser.clj"], semantics: ["src/ccc/sema/lower.clj"], backend: ["src/ccc/backend/x86.clj"], optimizer: [] };
let lostOne = !process.env.B8_FAKE_LOSE_SESSION;
const sleep = (ms, signal) => new Promise((res, rej) => { const t = setTimeout(res, ms); signal?.addEventListener("abort", () => { clearTimeout(t); rej(signal.reason ?? new Error("aborted")); }, { once: true }); });

export function query({ prompt, options = {} }) {
  const env = options.env ?? process.env, live = env.META_LIVE_DIR, role = env.META_ROLE, launch = env.META_LAUNCH;
  const registry = path.join(live, "fake-sessions.jsonl");
  const known = () => { try { return fs.readFileSync(registry, "utf8").split("\n").filter(Boolean); } catch { return []; } };
  const signal = options.abortController?.signal;
  return (async function* () {
    if (options.resume && (!known().includes(options.resume) || !lostOne)) {
      lostOne = true;
      throw new Error(`No conversation found with session ID: ${options.resume} (fake)`);
    }
    const sid = options.resume ?? crypto.randomUUID();
    if (!options.resume) fs.appendFileSync(registry, sid + "\n");
    yield { type: "system", subtype: "init", session_id: sid };
    yield { type: "assistant", session_id: sid, parent_tool_use_id: null, message: { usage: { input_tokens: 100, output_tokens: 10, cache_read_input_tokens: 0, cache_creation_input_tokens: 0 } } };
    const kernel = path.join(live, "kernel", "meta.mjs");
    const menv = { ...process.env, ...env };
    // as an agent would, a call refused for the state lock (a tick's integration check holds it) is tried again
    const meta = (...a) => { let r; for (let i = 0; i < 12; i++) { r = spawnSync(process.execPath, [kernel, ...a], { env: menv, encoding: "utf8" }); if (r.status === 0 || !/state is locked/.test(r.stderr ?? "")) break; spawnSync("sleep", ["3"]); } let out = null; try { out = JSON.parse(r.stdout); } catch {} return { code: r.status, out, err: r.stderr }; };
    const did = [];
    await sleep(Number(process.env.B8_FAKE_SEC ?? 2) * 1000, signal);
    const text = String(prompt), S2 = /--to=architect --scope=/.test(text);
    // S2: the session's own PreToolUse hooks (the kernel guard first), as a tool call would meet them
    const hooks = options.hooks?.PreToolUse?.[0]?.hooks ?? [];
    let tu = 0;
    const askGuard = async (tool_name, tool_input, cwd) => { const g = hooks[0]; if (!g) return { allowed: true }; const r = await g({ hook_event_name: "PreToolUse", tool_name, tool_input, cwd }, `fake-${launch}-${++tu}`); const why = r?.hookSpecificOutput?.permissionDecisionReason ?? null; fs.appendFileSync(path.join(live, "fake-guard.jsonl"), JSON.stringify({ t: new Date().toISOString(), role, launch, tool: tool_name, what: tool_input.command ?? tool_input.file_path, allowed: !why, why }) + "\n"); return { allowed: !why, why }; };
    const write = async (wd, f, fn) => { const g = await askGuard("Write", { file_path: path.join(wd, f) }, wd); if (!g.allowed) { did.push(`write ${f}: denied`); return false; } fn(); return true; };
    // the architect: delegate each waiting order to every active owner at once (S2: scoped to the wave's modules)
    const SCOPE = { W1: "backend", W2: "semantics", W8: "frontend,parser,backend", W9: "parser,backend", W10: "frontend,backend" };
    for (const m of text.matchAll(/Orders waiting for a builder: ([^.]+)\./g)) for (const o of m[1].matchAll(/(O-\d+) \((W\d+)\)/g)) { const r = S2 ? meta("order", "delegate", o[1], "--by=architect", "--to=architect", `--scope=${SCOPE[o[2]] ?? "backend,semantics"}`) : meta("order", "delegate", o[1], "--by=architect", "--to=backend", "--owners=architect,frontend,semantics"); did.push(`delegate ${o[1]}: ${r.code}${r.code ? ` ${String(r.err).slice(0, 160)}` : ""}`); }
    // S2: a borrow review (K37): yes
    for (const m of text.matchAll(/Borrow reviews for you \(K37\): ([^.]+)\./g)) for (const it of m[1].matchAll(/(ISS-\d+)/g)) { const r = meta("ask", "answer", `--by=${role}`, `--id=${it[1]}`, "--decision=yes", "--text=the borrowed change is right (fake agent)"); did.push(`review ${it[1]}: ${r.code}`); }
    // a retro: nothing recurs
    for (const m of text.matchAll(/learn propose --by=(\S+) --retro=(RETRO-\d+)/g)) { const r = meta("learn", "propose", `--by=${m[1]}`, `--retro=${m[2]}`, "--proposal={}"); did.push(`retro ${m[2]}: ${r.code}`); break; }
    // room work
    const enter = /room enter --msg=(M-\d+) --role=([\w-]+)/.exec(text);
    if (enter) {
      const pk = meta("room", "enter", `--msg=${enter[1]}`, `--role=${enter[2]}`);
      if (pk.code !== 0) did.push(`enter ${enter[1]}: refused ${String(pk.err).slice(0, 160)}`);
      else {
        const p = pk.out, wd = p.workdir ?? options.cwd, task = p.task ?? p.order?.task ?? "W";
        let ev;
        if (role === "evaluator" && S2) {
          // advisory and time-boxed: one defect line as it goes, then on until the box ends the session
          ev = `tests/eval/${task}/EVAL.md`;
          for (const command of [`mkdir -p tests/eval/${task}/gray && cd tests/eval/${task}/gray && printf 'int main() { int a[2] = {}; return a[1]; }\\n' > g01_empty_braces.c`, `T=${path.join(path.dirname(live), "..", "toolchain", "clj-run")}; $T -m ccc.main -I spec/include tests/eval/${task}/gray/g01_empty_braces.c -o /tmp/g01.s`]) { const g = await askGuard("Bash", { command }, wd); did.push(`guard ${command.slice(0, 40)}…: ${g.allowed ? "allowed" : "denied"}`); }
          await write(wd, ev, () => { fs.mkdirSync(path.join(wd, path.dirname(ev)), { recursive: true }); fs.writeFileSync(path.join(wd, ev), `# ${task} evaluation (fake agent, advisory)\n\ne1.c (nested calls): compiled and ran\n${task === "W1" ? "W1 calls: a value returned through two nested calls is lost -> keep the return value in rax across the call sequence" : `${task} pointers: pointer difference not scaled -> divide by the element size`}\n`); });
          await sleep(3600_000, signal); // until the launcher ends the session at the box
        } else if (role === "evaluator") {
          ev = `tests/eval/${task}/EVAL.md`;
          fs.mkdirSync(path.join(wd, path.dirname(ev)), { recursive: true });
          fs.writeFileSync(path.join(wd, ev), `# ${task} evaluation (fake agent)\n\nverdict: pass\n`);
          const r = meta("room", "leave", `--run=${p.run}`, `--evidence=${ev}`, "--verdict=pass");
          did.push(`eval ${task}: ${r.code}${r.code ? ` ${String(r.err).slice(0, 160)}` : ""}`);
        } else {
          const files = [...((fs.existsSync(path.join(wd, "src/ccc/codegen.clj")) ? OWNED9 : OWNED)[role] ?? []), ...(S2 && role === "backend" && task === "W1" ? ["src/ccc/sema/lower.clj"] : [])]; // S2: backend borrows sema in W1
          for (const f of files) {
            const dst = path.join(wd, f), src = path.join(process.env.B8_FAKE_STUB ?? "", f);
            const doIt = () => { if (!fs.existsSync(dst) && fs.existsSync(src)) { fs.mkdirSync(path.dirname(dst), { recursive: true }); fs.copyFileSync(src, dst); } else if (fs.existsSync(dst)) fs.appendFileSync(dst, f.endsWith(".md") ? `\n${role}: ${task} (fake ${launch})\n` : `\n;; ${role}: ${task} (fake ${launch})\n`); };
            if (S2) await write(wd, f, doIt); else doIt();
          }
          if (S2 && role === "backend") for (const command of [`mkdir -p test/backend/c && echo 37 > test/backend/c/stress1.exit`, `CLJ=${path.join(path.dirname(live), "..", "toolchain", "clj-run")}; $CLJ -m ccc.main -I spec/include visible/${task}/x.c -o .bout/x.s 2>&1 | tail -5`]) { const g = await askGuard("Bash", { command }, wd); did.push(`guard ${command.slice(0, 40)}…: ${g.allowed ? "allowed" : "denied"}`); }
          ev = files[0] ?? ".";
          const r = meta("room", "leave", `--run=${p.run}`, `--evidence=${ev}`, `--learned=fake agent`);
          did.push(`${role} ${task} ${p.stage ?? ""}: ${r.code}${r.code ? ` ${String(r.err).slice(0, 160)}` : ""}`);
        }
      }
    }
    yield { type: "result", subtype: "success", is_error: false, num_turns: 1, session_id: sid, result: `fake agent (${role}, ${launch}): ${did.join("; ") || "nothing to do"}`, modelUsage: { fake: { inputTokens: 100, outputTokens: 10, cacheReadInputTokens: 0, cacheCreationInputTokens: 0, costUSD: 0.01 } } };
  })();
}
