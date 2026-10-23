// Benchmark 8, the restart test's stand-in for the Agent SDK (no model, no network): `setup.mjs run --fake` copies this
// folder over the frozen launcher's node_modules/@anthropic-ai/claude-agent-sdk in a scratch run, so the real launcher,
// serve, the broker, the accept stage and the hidden runner all run, and each launch's "agent" plays its role by the
// kernel's CLI, as dryrun.mjs does: the architect delegates the wave to the owners at once; an owner writes its module
// of the stub compiler (bench8/dryrun/stub, B8_FAKE_STUB) into the worktree, or appends to it on a revise, and hands in;
// the evaluator writes EVAL.md and passes; a retro proposes {}. Each launch takes B8_FAKE_SEC seconds (default 2), so
// a test can kill the run while sessions are in flight. Sessions: a resume of an id this fake never started fails as
// a gone session does (no assistant message, an error), and with B8_FAKE_LOSE_SESSION=1 the first resume of a launcher
// process fails too (the launcher's cold fallback, K26).
import fs from "node:fs";
import path from "node:path";
import crypto from "node:crypto";
import { spawnSync } from "node:child_process";

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
    const text = String(prompt);
    // the architect: delegate each waiting order to every active owner at once
    for (const m of text.matchAll(/Orders waiting for a builder: ([^.]+)\./g)) for (const o of m[1].matchAll(/(O-\d+)/g)) { const r = meta("order", "delegate", o[1], "--by=architect", "--to=backend", "--owners=architect,frontend,semantics"); did.push(`delegate ${o[1]}: ${r.code}`); }
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
        if (role === "evaluator") {
          ev = `tests/eval/${task}/EVAL.md`;
          fs.mkdirSync(path.join(wd, path.dirname(ev)), { recursive: true });
          fs.writeFileSync(path.join(wd, ev), `# ${task} evaluation (fake agent)\n\nverdict: pass\n`);
          const r = meta("room", "leave", `--run=${p.run}`, `--evidence=${ev}`, "--verdict=pass");
          did.push(`eval ${task}: ${r.code}${r.code ? ` ${String(r.err).slice(0, 160)}` : ""}`);
        } else {
          const files = OWNED[role] ?? [];
          for (const f of files) {
            const dst = path.join(wd, f), src = path.join(process.env.B8_FAKE_STUB ?? "", f);
            if (!fs.existsSync(dst) && fs.existsSync(src)) { fs.mkdirSync(path.dirname(dst), { recursive: true }); fs.copyFileSync(src, dst); }
            else if (fs.existsSync(dst)) fs.appendFileSync(dst, f.endsWith(".md") ? `\n${role}: ${task} (fake ${launch})\n` : `\n;; ${role}: ${task} (fake ${launch})\n`);
          }
          ev = files[0] ?? ".";
          const r = meta("room", "leave", `--run=${p.run}`, `--evidence=${ev}`, `--learned=fake agent`);
          did.push(`${role} ${task} ${p.stage ?? ""}: ${r.code}${r.code ? ` ${String(r.err).slice(0, 160)}` : ""}`);
        }
      }
    }
    yield { type: "result", subtype: "success", is_error: false, num_turns: 1, session_id: sid, result: `fake agent (${role}, ${launch}): ${did.join("; ") || "nothing to do"}`, modelUsage: { fake: { inputTokens: 100, outputTokens: 10, cacheReadInputTokens: 0, cacheCreationInputTokens: 0, costUSD: 0.01 } } };
  })();
}
