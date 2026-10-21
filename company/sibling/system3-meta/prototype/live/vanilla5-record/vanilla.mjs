// Benchmark 5V: the same task for one vanilla Claude Code agent (Agent SDK, same model, tools and settings as the
// company's agents), driven by a script that plays the founder and the hidden acceptance, with no person in the loop:
//   - one session, resumed between turns (its context keeps everything, as a person's Claude Code session would)
//   - turn 1 gets wave 1 of SPEC5; after each turn the hidden SHEET tests run; failing categories (the same lines the
//     company's UAT findings carry) go back as the next turn, up to MAX_ROUNDS per wave; a pass releases the next wave
//   - faults as in Benchmark 5 where they apply: F1 the first turn is killed after 60 s (the script resumes with
//     "you were interrupted"); F2 after wave 1 passes, sheet.mjs is wrapped (10 reads as 11); F4 after wave 3's first
//     turn, #CYCLE! becomes #CIRC! (announced as the next turn). F3 (a lost message) has no analogue: one agent, no mail.
//   node vanilla.mjs --dir=<work dir> --acc=<acceptance dir> --waves=<dir with wave1..3.md>
import { query } from "@anthropic-ai/claude-agent-sdk";
import { execFileSync } from "node:child_process";
import fs from "node:fs";
import path from "node:path";
const opt = Object.fromEntries(process.argv.slice(2).map((a) => { const [k, ...v] = a.replace(/^--/, "").split("="); return [k, v.join("=")]; }));
const DIR = path.resolve(opt.dir), ACC = path.resolve(opt.acc), WAVES = path.resolve(opt.waves);
const MAX_ROUNDS = 5;
fs.mkdirSync(DIR, { recursive: true });
const ledger = path.join(path.dirname(new URL(import.meta.url).pathname), `vanilla-${path.basename(DIR)}.jsonl`);
const note = (x) => { const l = JSON.stringify({ t: new Date().toISOString(), ...x }); fs.appendFileSync(ledger, l + "\n"); console.log(l); };
const env = { ...process.env };
for (const k of ["CLAUDECODE", "CLAUDE_CODE_SESSION_ID", "CLAUDE_AUTO_BACKGROUND_TASKS", "CLAUDE_CODE_BG_TASKS_REPORT_RUNNING"]) delete env[k];
const reqf = path.join(ACC, "requirements.json");
const setReq = (x) => fs.writeFileSync(reqf, JSON.stringify({ ...JSON.parse(fs.readFileSync(reqf, "utf8")), ...x }));
const spec = path.join(DIR, "SPEC5.md");

function hidden() {
  // the acceptance kit loads <BOOK_ROOT>/SHEET/sheet.mjs: point it at the agent's folder
  const root = path.join(DIR, ".root"); fs.mkdirSync(root, { recursive: true });
  const link = path.join(root, "SHEET"); if (!fs.existsSync(link)) fs.symlinkSync(DIR, link);
  const { NODE_TEST_CONTEXT, ...e } = process.env;
  let text, code = 0;
  try { text = execFileSync(process.execPath, ["--test", "SHEET.test.mjs"], { cwd: ACC, encoding: "utf8", stdio: "pipe", timeout: 120_000, env: { ...e, BOOK_ROOT: root } }); }
  catch (x) { text = String(x.stdout || x.message); code = x.status ?? 1; }
  const n = (k) => Number((text.match(new RegExp(`^# ${k} (\\d+)`, "m")) || [])[1] ?? NaN);
  const pass = code === 0 && n("fail") === 0 && n("pass") > 0;
  // exactly what the company's UAT findings show (state.mjs runTests)
  const output = pass ? text.split("\n").filter((l) => /^# (tests|pass|fail)/.test(l)).join(" ") : text.split("\n").filter((l) => /^not ok|^# (tests|pass|fail)|error:/.test(l)).slice(0, 12).join("\n");
  return { pass, output, categories: { pass: n("pass"), fail: n("fail") } };
}

let session = null, turns = 0, killed = false;
const totals = { tokens: 0, cumulative: 0, cost: 0, peak: 0 };
async function turn(prompt, label) {
  turns++;
  const ac = new AbortController();
  const kill = !killed && turns === 1 ? setTimeout(() => { killed = true; ac.abort(new Error("injected crash (F1)")); }, 60_000) : null;
  const t0 = Date.now(); let last = null, result = null, error = null;
  try {
    for await (const m of query({ prompt, options: { cwd: DIR, model: "claude-opus-5-5", abortController: ac, env, settingSources: [], allowedTools: ["Bash", "Read", "Write", "Edit", "Glob", "Grep"], permissionMode: "dontAsk", permissionPrompts: "none", maxTurns: 120, ...(session ? { resume: session } : {}) } })) {
      if (m.session_id && !session) session = m.session_id;
      if (m.type === "assistant" && m.parent_tool_use_id == null && m.message?.usage) last = m.message.usage;
      if (m.type === "result") result = m;
    }
  } catch (e) { error = e?.message ?? String(e); }
  if (kill) clearTimeout(kill);
  const ctx = last ? (last.input_tokens ?? 0) + (last.cache_read_input_tokens ?? 0) + (last.cache_creation_input_tokens ?? 0) + (last.output_tokens ?? 0) : 0;
  const mu = Object.values(result?.modelUsage ?? {});
  const cumulative = mu.reduce((a, u) => a + u.inputTokens + u.outputTokens + u.cacheReadInputTokens + u.cacheCreationInputTokens, 0);
  const cost = mu.reduce((a, u) => a + (u.costUSD ?? 0), 0);
  // a resumed session's result carries the running total of the whole session (SDK docs): keep the latest, never sum
  totals.tokens += ctx; totals.cumulative = Math.max(totals.cumulative, cumulative); totals.cost = Math.max(totals.cost, cost); totals.peak = Math.max(totals.peak, ctx);
  note({ event: "turn", n: turns, label, ok: !error && result && !result.is_error, error, context: ctx, cumulative, cost: Number(cost.toFixed(4)), minutes: Math.round((Date.now() - t0) / 600) / 100, said: String(result?.result ?? "").slice(0, 1500) });
  return !error;
}

const t0 = Date.now();
note({ event: "start", dir: DIR });
fs.writeFileSync(spec, fs.readFileSync(path.join(WAVES, "wave1.md"), "utf8").replaceAll("live/bench5/work/SHEET/sheet.mjs", path.join(DIR, "sheet.mjs")));
const intro = `Build the spreadsheet engine that ${spec} specifies, in ${DIR}: the product is ${path.join(DIR, "sheet.mjs")} exporting createSheet(). Plain JavaScript ES modules, Node 22, no dependencies. Split it into modules as you see fit, inside ${DIR}, and write your own tests (node --test). Hidden acceptance tests will run on sheet.mjs after you finish and report only failing categories. The requirements come in waves; this is wave 1. When you are done, say so briefly.`;
let prompt = intro, f4 = false, f2 = false;
for (let wave = 1; wave <= 3; wave++) {
  setReq({ wave });
  let passed = false;
  for (let round = 1; round <= MAX_ROUNDS && !passed; round++) {
    const ok = await turn(prompt, `wave ${wave} round ${round}`);
    if (!ok) { prompt = "You were interrupted. Continue the task where you left off, and say when you are done."; round--; continue; }
    if (wave === 3 && !f4) {
      f4 = true; setReq({ cycle: "#CIRC!" });
      fs.writeFileSync(spec, fs.readFileSync(spec, "utf8").replaceAll("#CYCLE!", "#CIRC!") + "\n## Changed (founder, during wave 3)\n\nThe cycle error is now `#CIRC!` (it was `#CYCLE!`). Everything else stands.\n");
      note({ fault: "F4", what: "#CYCLE! renamed #CIRC!" });
      prompt = `Requirement change from the founder: the cycle error is now #CIRC! (was #CYCLE!). ${spec} is updated. Make the change, and say when you are done.`;
      round--; continue;
    }
    const h = hidden();
    note({ event: "hidden", wave, round, pass: h.pass, categories: h.categories });
    if (h.pass) { passed = true; break; }
    prompt = `The hidden acceptance tests on sheet.mjs failed:\n${h.output}\nFix it, and say when you are done.`;
  }
  note({ event: "wave", wave, passed });
  if (!passed) break;
  if (wave === 1 && !f2) {
    f2 = true; const f = path.join(DIR, "sheet.mjs");
    fs.renameSync(f, path.join(DIR, "sheet-impl.mjs"));
    fs.writeFileSync(f, `export * from "./sheet-impl.mjs";\nimport { createSheet as impl } from "./sheet-impl.mjs";\nexport function createSheet() { const s = impl(); return { set: (c, t) => s.set(c, t), get: (c) => { const v = s.get(c); return v === 10 ? 11 : v; }, display: (c) => s.display(c) }; }\n`);
    note({ fault: "F2", what: "sheet.mjs wrapped after wave 1 passed" });
  }
  if (wave < 3) {
    fs.appendFileSync(spec, fs.readFileSync(path.join(WAVES, `wave${wave + 1}.md`), "utf8"));
    prompt = `Wave ${wave + 1} is released: ${spec} now has a Wave ${wave + 1} section at the end. Implement it, keep everything earlier working, and say when you are done.`;
  }
}
const final = hidden();
note({ event: "summary", final, turns, minutes: Math.round((Date.now() - t0) / 600) / 100, tokens: totals.tokens, peakContext: totals.peak, cumulative: totals.cumulative, cost: Number(totals.cost.toFixed(2)) });
