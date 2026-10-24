#!/usr/bin/env node
// Benchmark 11 harness (B11.md): a SQLite-compatible database in Clojure. Arms V (one session) and O (the autonomous
// org: four members, each one continuous session, landing their own work, one shared budget), run at the same time.
// Roots laid out as B8's V arm (bench8/setup.mjs: access rule, hook, canUseTool, PATH shims), --isolation=hooks.
//   node setup.mjs            first
//   node run.mjs v | o        an arm; caps $150 / 360 active minutes each; restart-safe
//   node run.mjs full --dir=<tree>     the full judge on one committed tree
//   node run.mjs final        the full judge on each arm's final main/head
//   --fake (agents play a trivial commit, $0)
import fs from "node:fs";
import path from "node:path";
import { spawn, spawnSync } from "node:child_process";
import { fileURLToPath, pathToFileURL } from "node:url";

const HERE = path.dirname(fileURLToPath(import.meta.url));
const SCRATCH = "/tmp/claude-0/-home-user/aa2da695-733d-5610-822b-d0f420a6080f/scratchpad";
const cmd = process.argv[2];
const opt = Object.fromEntries(process.argv.slice(3).filter((a) => a.startsWith("--")).map((a) => { const [k, ...v] = a.slice(2).split("="); return [k, v.join("=") || true]; }));
process.env.B8_ISOLATION ??= "hooks";
const S8 = await import(pathToFileURL(path.join(HERE, "..", "bench8", "setup.mjs")).href);
const B8 = path.join(SCRATCH, "b8"), B8RUNS = path.join(SCRATCH, "b8-runs");
const B11 = path.resolve(opt.runs ?? path.join(SCRATCH, "b11-runs"));
export const CAP_COST = Number(opt["max-cost"] ?? 150), CAP_MIN = Number(opt["max-min"] ?? 360), TURN_MAX = Number(opt["turn-max"] ?? 60);
const FAKE = !!opt.fake;
const git = (cwd, ...a) => spawnSync("git", ["-c", "safe.directory=*", "-c", "user.name=b11", "-c", "user.email=b11@harness", "-C", cwd, ...a], { encoding: "utf8", maxBuffer: 64 << 20 });
const gitOk = (cwd, ...a) => { const r = git(cwd, ...a); if (r.status !== 0) throw new Error(`git ${a.join(" ")}: ${r.stderr || r.stdout}`); return r.stdout.trim(); };
const log = (f, x) => S8.append(f, x);
const launcherSrc = fs.readFileSync(path.join(HERE, "..", "launcher", "launch.mjs"), "utf8");
const MODEL = opt.model ?? (launcherSrc.match(/const MODEL = opt\.model \?\? "([^"]+)"/) ?? [])[1];
export const SECOND_MODEL = opt["second-model"] ?? "claude-sonnet-5-5";
const startDir = path.join(B11, "start"), judgeDir = path.join(B11, "judge"), ledgerOf = (arm) => path.join(B11, "_operator", arm, "ledger.jsonl");
const ORG = path.join(B11, "_org");

// ---------------------------------------------------------------- roots
function makeRoot(id, from) {
  const root = path.join(B11, "arms", id), P = S8.paths({ runs: root, b8: B8 });
  if (!fs.existsSync(P.V)) { fs.mkdirSync(root, { recursive: true }); gitOk(root, "clone", "-q", "--no-hardlinks", from, P.V); git(P.V, "checkout", "-q", "-B", "main"); git(P.V, "remote", "remove", "origin"); }
  if (!fs.existsSync(P.toolchain)) {
    fs.cpSync(path.join(B8RUNS, "toolchain"), P.toolchain, { recursive: true });
    const jd = path.join(P.toolchain, "judge"); fs.mkdirSync(jd, { recursive: true }); fs.copyFileSync(path.join(judgeDir, "judge.mjs"), path.join(jd, "judge.mjs"));
    const cfg = JSON.parse(fs.readFileSync(path.join(judgeDir, "judge.json"), "utf8")); cfg.clj = P.clj; fs.writeFileSync(path.join(jd, "judge.json"), JSON.stringify(cfg, null, 1));
  }
  S8.installShims(P, "V");
  return P;
}
const fastCmd = (P) => `node ${path.join(P.toolchain, "judge", "judge.mjs")} fast --dir=${P.V}`;
const runNode = (args, timeout) => new Promise((resolve) => { const ch = spawn(process.execPath, args, { stdio: ["ignore", "pipe", "pipe"] }); let out = "", err = ""; const t = setTimeout(() => ch.kill("SIGKILL"), timeout); ch.stdout.on("data", (d) => (out += d)); ch.stderr.on("data", (d) => (err += d)); ch.on("close", (code) => { clearTimeout(t); resolve({ code, out, err }); }); });
const lastJson = (s) => { for (const l of String(s ?? "").trim().split("\n").reverse()) { try { return JSON.parse(l); } catch {} } return null; };
async function full(dir, out = null) {
  const r = await runNode([path.join(judgeDir, "judge.mjs"), "full", `--dir=${dir}`, ...(out ? [`--out=${out}`] : [])], 6 * 3600_000);
  return { ...lastJson(r.out), lines: r.out.split("\n").filter((l) => /^B11 /.test(l)) };
}

// ---------------------------------------------------------------- sessions; cost always from transcripts (B10: the SDK's
// reported cost is unreliable for resumed sessions), list prices × 1.33 (B9c's calibration), the same for both arms
const projDir = (cwd) => path.join(process.env.HOME ?? "/root", ".claude", "projects", path.resolve(cwd).replace(/[^A-Za-z0-9]/g, "-"));
const PRICE = (model) => (/sonnet/.test(model) ? [3, 3.75, 0.3, 15] : /haiku/.test(model) ? [1, 1.25, 0.1, 5] : [5, 6.25, 0.5, 25]);
function sessionCost(cwd, sid, since = 0) {
  let txt; try { txt = fs.readFileSync(path.join(projDir(cwd), `${sid}.jsonl`), "utf8"); } catch { return 0; }
  const seen = new Set(); let usd = 0;
  for (const l of txt.split("\n")) { let m; try { m = JSON.parse(l); } catch { continue; } if (m.type !== "assistant" || !m.message?.usage || Date.parse(m.timestamp) < since || seen.has(m.message.id)) continue; seen.add(m.message.id); const p = PRICE(m.message.model ?? ""), u = m.message.usage; usd += ((u.input_tokens ?? 0) * p[0] + (u.cache_creation_input_tokens ?? 0) * p[1] + (u.cache_read_input_tokens ?? 0) * p[2] + (u.output_tokens ?? 0) * p[3]) / 1e6; }
  return usd * 1.33;
}
function contextStats(cwd, sid) {
  let txt; try { txt = fs.readFileSync(path.join(projDir(cwd), `${sid}.jsonl`), "utf8"); } catch { return null; }
  let peak = 0, compactions = 0;
  for (const l of txt.split("\n")) { let m; try { m = JSON.parse(l); } catch { continue; } if ((m.type === "system" && /compact/.test(m.subtype ?? "")) || m.isCompactSummary) compactions++; const u = m.message?.usage; if (m.type === "assistant" && u) peak = Math.max(peak, (u.input_tokens ?? 0) + (u.cache_read_input_tokens ?? 0) + (u.cache_creation_input_tokens ?? 0)); }
  return { peak, compactions };
}
function clockFor(arm) {
  const f = path.join(B11, "_operator", arm, "clock.json"); fs.mkdirSync(path.dirname(f), { recursive: true });
  let acc = 0; try { acc = JSON.parse(fs.readFileSync(f, "utf8")).activeMs; } catch {}
  let t = Date.now();
  const tick = () => { const n = Date.now(); acc += n - t; t = n; fs.writeFileSync(f, JSON.stringify({ activeMs: acc, t: new Date().toISOString() })); };
  const iv = setInterval(tick, 15_000); iv.unref();
  return { min: () => { tick(); return acc / 60000; }, stop: () => { tick(); clearInterval(iv); } };
}
let query = null;
/** one turn; aborted early by `stop()` returning true (the live budget guard) or by its time cap */
async function turn(P, prompt, { resume = null, ms, label, ledger, model = MODEL, stop = () => false, onSid = () => {} }) {
  const t0 = Date.now();
  if (FAKE) { fs.appendFileSync(path.join(P.V, "src", "sqlclj", "main.clj"), `\n;; fake turn ${label}\n`); gitOk(P.V, "add", "-A"); git(P.V, "commit", "-qm", `fake ${label}`); const fsid = resume ?? `fake-${label}`; log(ledger, { event: "turn", label, sid: fsid, model, cost: 0, ok: true, min: 0 }); return { sid: fsid, cost: 0, ok: true, text: "fake" }; }
  query ??= (await import(pathToFileURL(path.join(HERE, "..", "launcher", "node_modules", "@anthropic-ai", "claude-agent-sdk", "sdk.mjs")).href)).query;
  const ac = new AbortController(), timer = setTimeout(() => ac.abort(new Error("time cap")), Math.max(5000, ms));
  const guard = setInterval(() => { if (stop()) ac.abort(new Error("budget")); }, 10_000);
  let sid = resume, result = null, error = null, lastText = "";
  try {
    const options = await S8.vOptions(P, { cwd: P.V, model, effort: S8.EFFORT, abortController: ac, tools: S8.TOOLS_OK, maxTurns: 1000, sid: () => sid, resume, stderrLog: path.join(P.op, "V", "cli-stderr.log") });
    for await (const m of query({ prompt, options })) {
      if (typeof m.session_id === "string" && m.session_id && m.session_id !== sid) { sid = m.session_id; onSid(sid); }
      if (m.type === "assistant") for (const c of m.message?.content ?? []) if (c.type === "text") lastText = c.text;
      if (m.type === "result") result = m;
    }
  } catch (e) { error = e?.message ?? String(e); }
  clearTimeout(timer); clearInterval(guard);
  const cost = sid ? sessionCost(P.V, sid, t0) : 0, ok = !error && !!result && !result.is_error;
  log(ledger, { event: "turn", label, sid, model, cost: Number(cost.toFixed(4)), ok, why: ok ? null : String(error ?? result?.subtype ?? "no result").slice(0, 200), turns: result?.num_turns ?? null, min: Math.round((Date.now() - t0) / 600) / 100, ctx: sid ? contextStats(P.V, sid) : null });
  return { sid, cost, ok, text: String(result?.result ?? lastText ?? "") };
}
const TASK = (P) => `${fs.readFileSync(path.join(P.V, "spec", "B11.md"), "utf8")}\n\n## Where things are\n\n- Your tree: **${P.V}** (a git repository; commit your work there).\n- The fast judge: \`${fastCmd(P)}\` (add \`--only=<family>\` for one family, \`--show=30\` for more failures)\n- \`clj-run\` is on your PATH; \`spec/b11/sqlrun script.sql\` runs real SQLite for comparison.\n`;

// ---------------------------------------------------------------- arm V
async function armV() {
  const led = ledgerOf("V"), rows = S8.readJsonl(led);
  if (rows.some((x) => x.event === "end")) return { done: true };
  if (!rows.length) log(led, { event: "start", arm: "V", model: MODEL, caps: { cost: CAP_COST, min: CAP_MIN }, fake: FAKE });
  const P = makeRoot("V", startDir), clock = clockFor("V");
  let sid = rows.findLast((x) => x.event === "turn" && x.sid)?.sid ?? null, k = rows.filter((x) => x.event === "turn").length;
  const spentNow = () => (sid ? sessionCost(P.V, sid, 0) : 0);
  while (clock.min() < CAP_MIN - 3 && spentNow() < CAP_COST - 2) {
    const spent = spentNow(), rate = clock.min() > 5 && spent > 0 ? spent / clock.min() : 0.5, byBudget = Math.floor((CAP_COST - 2 - spent) / rate);
    if (byBudget < 3) break;
    const prompt = k === 0
      ? `${TASK(P)}\nYou work alone, in charge of your own plan, for about ${CAP_MIN / 60} hours of working time and $${CAP_COST} in total. Work in long stretches; commit as you go (your last commit is what is judged). When you stop, I will say "go on" until the time or the budget runs out.`
      : `Go on. So far: $${spent.toFixed(2)} of $${CAP_COST}, ${Math.round(clock.min())} of ${CAP_MIN} minutes. Your last commit: ${gitOk(P.V, "log", "--oneline", "-1")}. Keep raising the pass rate; commit as you go.`;
    const r = await turn(P, prompt, { resume: sid, ms: Math.min(TURN_MAX, CAP_MIN - clock.min(), byBudget) * 60000, label: `V turn ${k + 1}`, ledger: led, stop: () => spentNow() >= CAP_COST, onSid: (s) => (sid = s) });
    sid = r.sid ?? sid; k++;
    log(led, { event: "checkpoint", turn: k, head: gitOk(P.V, "rev-parse", "HEAD"), spent: Number(spentNow().toFixed(4)), min: Math.round(clock.min() * 100) / 100 });
    if (FAKE && k >= 3) break;
  }
  clock.stop();
  const end = { event: "end", head: gitOk(P.V, "rev-parse", "HEAD"), dir: P.V, cost: Number(spentNow().toFixed(4)), min: Math.round(clock.min() * 100) / 100, turns: k, ctx: sid ? contextStats(P.V, sid) : null };
  log(led, end); return end;
}

// ---------------------------------------------------------------- arm O
export const MEMBERS = [
  { id: "m-architect", model: MODEL, role: "the big picture: the system's shape and its interfaces (the AST, the value representation, storage and indexes, execution); keep the members' work fitting together; you also build" },
  { id: "m-engine", model: MODEL, role: "query execution: SELECT, joins, subqueries, aggregation and GROUP BY, sorting, LIMIT, compound queries" },
  { id: "m-language", model: SECOND_MODEL, role: "the SQL language: tokenizer, parser, SQLite's error messages, DDL, constraints and DML" },
  { id: "m-values", model: SECOND_MODEL, role: "values and functions: type affinity, comparison and collation, integer and real arithmetic, SQLite's number formatting, the string functions" },
];
async function armO() {
  const led = ledgerOf("O"); let rows = S8.readJsonl(led);
  if (rows.some((x) => x.event === "end")) return { done: true };
  if (!rows.length) log(led, { event: "start", arm: "O", model: MODEL, second: SECOND_MODEL, caps: { cost: CAP_COST, min: CAP_MIN }, fake: FAKE });
  const clock = clockFor("O");
  fs.mkdirSync(ORG, { recursive: true });
  const MAIN = path.join(B11, "arms", "O-main");
  if (!fs.existsSync(MAIN)) { gitOk(B11, "clone", "-q", "--no-hardlinks", startDir, MAIN); git(MAIN, "checkout", "-q", "-B", "main"); git(MAIN, "remote", "remove", "origin"); }
  if (!fs.existsSync(path.join(ORG, "status.json"))) fs.writeFileSync(path.join(ORG, "status.json"), JSON.stringify({ head: gitOk(MAIN, "rev-parse", "HEAD"), rate: 0, lands: [], refused: [] }, null, 1));
  const W = MEMBERS.map((m) => {
    const R = makeRoot(`O-${m.id}`, MAIN);
    fs.copyFileSync(path.join(HERE, "..", "bench9", "board.mjs"), path.join(R.toolchain, "board.mjs")); fs.writeFileSync(path.join(R.toolchain, "board.json"), JSON.stringify({ file: path.join(ORG, "board.jsonl") }));
    fs.copyFileSync(path.join(HERE, "org.mjs"), path.join(R.toolchain, "org.mjs"));
    fs.writeFileSync(path.join(R.toolchain, "org.json"), JSON.stringify({ me: m.id, tree: R.V, main: MAIN, judge: path.join(R.toolchain, "judge", "judge.mjs"), dir: ORG, board: path.join(R.toolchain, "board.mjs"), budget: CAP_COST, minutes: CAP_MIN, members: MEMBERS.map((x) => x.id) }, null, 1));
    return { ...m, R, sid: rows.findLast((x) => x.event === "turn" && x.label?.startsWith(`O ${m.id} `) && x.sid)?.sid ?? null, k: rows.filter((x) => x.event === "turn" && x.label?.startsWith(`O ${m.id} `)).length, idle: false };
  });
  const spentNow = () => W.reduce((a, w) => a + (w.sid ? sessionCost(w.R.V, w.sid, 0) : 0), 0);
  const spendTick = () => { const members = Object.fromEntries(W.map((w) => [w.id, w.sid ? sessionCost(w.R.V, w.sid, 0) : 0])); fs.writeFileSync(path.join(ORG, "spend.json"), JSON.stringify({ spent: Object.values(members).reduce((a, x) => a + x, 0), minutes: clock.min(), members, t: new Date().toISOString() })); };
  const iv = setInterval(spendTick, 30_000); spendTick();
  const ORGCMD = (w) => `node ${path.join(w.R.toolchain, "org.mjs")}`, BOARD = (w) => `node ${path.join(w.R.toolchain, "board.mjs")}`;
  const notesFor = (w) => { try { return fs.readFileSync(path.join(ORG, "notes", `${w.id}.jsonl`), "utf8").trim().split("\n").filter(Boolean).length; } catch { return 0; } };
  const seenFor = (w) => { try { return Number(fs.readFileSync(path.join(ORG, "notes", `${w.id}.seen`), "utf8")); } catch { return 0; } };
  const intro = (w) => `${TASK(w.R)}
## You are a member of an organisation of ${W.length}

The organisation's goal is the score above. Its members: ${W.map((x) => `**${x.id}** (${x.role.split(":")[0]})`).join(", ")}. You are **${w.id}**. Your starting role: **${w.role}**. A role is a responsibility, not a limit: you have the whole picture, and you may work on anything, in any way, that you judge most useful for the goal; change your role, pair with someone, review others' work, or stop to leave the budget to others. Coordinate with the others as you judge useful.

How the organisation works:
- Main is the organisation's shared tree. Your own clone is ${w.R.V}. \`${ORGCMD(w)} sync\` merges main into your tree whenever you choose; \`${ORGCMD(w)} land "what it does"\` lands your committed work on main: you must have synced first, and the referee scores your HEAD on the visible corpus and lands it only if main's score does not fall. Land often: what is on main is what counts, and what others build on.
- \`${ORGCMD(w)} status\`: main's score per family, who landed what, the organisation's spend and time. **The budget ($${CAP_COST}) and the time (${CAP_MIN / 60} hours of work) are shared by all ${W.length} members**; each of your turns costs it.
- \`${ORGCMD(w)} note --to=<member|all> --text='…'\` and \`${ORGCMD(w)} notes\`: direct notes.
- The board, the organisation's memory: \`${BOARD(w)} read\`; \`${BOARD(w)} post --by=${w.id} --kind=finding|dead-end|hypothesis --area=<topic> --text='…' --evidence='…' --wrong-if='…'\`; claims for what you are changing now: \`${BOARD(w)} claim --by=${w.id} --area=<topic> --text='…'\`, \`${BOARD(w)} claims\`, \`${BOARD(w)} drop --by=${w.id} --area=…\`.
- If you judge that the organisation is better served by you stepping back (for example, to leave the budget to others), end your answer with the word IDLE on its own line: you will be woken when someone sends you a note.

Commit as you go. When you stop, I will say "go on" while the organisation's time and budget last.`;
  const one = async (w) => {
    while (true) {
      const spent = spentNow(), left = CAP_MIN - clock.min();
      if (left < 3 || spent >= CAP_COST - 2) return;
      if (w.idle) { if (notesFor(w) > seenFor(w)) { w.idle = false; log(led, { event: "wake", id: w.id }); } else { await new Promise((r) => setTimeout(r, 20_000)); continue; } }
      const active = W.filter((x) => !x.idle).length, rate = clock.min() > 5 && spent > 0 ? spent / clock.min() : 0.5 * active, byBudget = Math.floor((CAP_COST - 2 - spent) / Math.max(rate, 0.05));
      if (byBudget < 3) return;
      const unread = notesFor(w) - seenFor(w);
      const prompt = w.k === 0 ? intro(w) : `Go on. The organisation: $${spent.toFixed(2)} of $${CAP_COST} spent, ${Math.round(clock.min())} of ${CAP_MIN} minutes; main at ${JSON.parse(fs.readFileSync(path.join(ORG, "status.json"), "utf8")).rate}.${unread > 0 ? ` You have ${unread} unread note${unread > 1 ? "s" : ""} (\`${ORGCMD(w)} notes\`).` : ""} Your last commit: ${gitOk(w.R.V, "log", "--oneline", "-1")}.`;
      const r = await turn(w.R, prompt, { resume: w.sid, ms: Math.min(TURN_MAX, left, byBudget) * 60000, label: `O ${w.id} ${w.k + 1}`, ledger: led, model: w.model, stop: () => spentNow() >= CAP_COST || clock.min() >= CAP_MIN, onSid: (s) => (w.sid = s) });
      w.sid = r.sid ?? w.sid; w.k++;
      if (/(^|\n)\s*IDLE\s*$/.test(r.text)) { w.idle = true; log(led, { event: "idle", id: w.id }); }
      log(led, { event: "checkpoint", id: w.id, turn: w.k, head: gitOk(w.R.V, "rev-parse", "HEAD"), spent: Number(spentNow().toFixed(4)), min: Math.round(clock.min() * 100) / 100 });
      if (FAKE) { spawnSync(process.execPath, [path.join(w.R.toolchain, "org.mjs"), "sync"], { encoding: "utf8" }); const l = spawnSync(process.execPath, [path.join(w.R.toolchain, "org.mjs"), "land", "fake"], { encoding: "utf8" }); log(led, { event: "fake-land", id: w.id, out: (l.stdout + l.stderr).slice(0, 200) }); if (w.k >= 2) return; }
    }
  };
  await Promise.all(W.map(one));
  clearInterval(iv); spendTick(); clock.stop();
  const st = JSON.parse(fs.readFileSync(path.join(ORG, "status.json"), "utf8"));
  const end = { event: "end", head: gitOk(MAIN, "rev-parse", "HEAD"), dir: MAIN, rate: st.rate, cost: Number(spentNow().toFixed(4)), min: Math.round(clock.min() * 100) / 100, lands: (st.lands ?? []).length, refused: (st.refused ?? []).length, landsBy: (st.lands ?? []).reduce((m, l) => ((m[l.by] = (m[l.by] ?? 0) + 1), m), {}), ctx: Object.fromEntries(W.map((w) => [w.id, w.sid ? contextStats(w.R.V, w.sid) : null])) };
  log(led, end); return end;
}

async function finalScoring() {
  const out = {}, cands = { start: startDir };
  for (const arm of ["V", "O"]) { const e = S8.readJsonl(ledgerOf(arm)).find((x) => x.event === "end"); if (e?.dir) cands[arm] = e.dir; }
  if (opt.only) { const keep = String(opt.only).split(","); for (const k of Object.keys(cands)) if (!keep.includes(k)) delete cands[k]; }
  for (const [arm, dir] of Object.entries(cands)) { out[arm] = await full(dir, path.join(B11, "_operator", `final-${arm}.json`)); const { lines, ...x } = out[arm]; log(path.join(B11, "_operator", "final.jsonl"), { arm, ...x }); }
  return out;
}
const fns = { v: armV, o: armO, final: finalScoring, full: () => full(path.resolve(opt.dir)) };
if (!fns[cmd]) { console.error("usage: run.mjs v|o|full|final"); process.exit(2); }
if (!MODEL && ["v", "o"].includes(cmd) && !FAKE) { console.error("no model"); process.exit(2); }
console.log(JSON.stringify(await fns[cmd](), null, 1));
