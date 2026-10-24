#!/usr/bin/env node
// Benchmark 10 harness (B10.md): make the compiler an optimising one. Arms V (one session) and O (the full principled
// org), run at the same time (the referee counts instructions, which load does not change). Each arm root is laid out
// as B8's V arm (<root>/V the compiler, its own git repo; <root>/toolchain: clj-run and the fast judge), so B8's
// access rule, hook, canUseTool and PATH shims apply unchanged (bench8/setup.mjs), with --isolation=hooks.
//   node setup.mjs                     first: the material, references, corpora, workloads, start and judge
//   node run.mjs v                     arm V: one session continued with "go on" turns; caps $150 / 360 active min
//   node run.mjs o                     arm O: the org (B10.md "The arms"); caps as V
//   node run.mjs full --dir=<tree>     the full judge on one committed tree
//   node run.mjs final                 the full judge on each arm's final head (and on checkpoints, for the curves)
//   node run.mjs status
//   --fake plays the agents (a trivial commit, $0); --fake-judge returns made-up judge results (dry runs)
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
const B10 = path.resolve(opt.runs ?? path.join(SCRATCH, "b10-runs"));
export const CAP_COST = Number(opt["max-cost"] ?? 150), CAP_MIN = Number(opt["max-min"] ?? 360);
const FAKE = !!opt.fake, FAKE_JUDGE = !!opt["fake-judge"];
const git = (cwd, ...a) => spawnSync("git", ["-c", "safe.directory=*", "-c", "user.name=b10", "-c", "user.email=b10@harness", "-C", cwd, ...a], { encoding: "utf8", maxBuffer: 64 << 20 });
const gitOk = (cwd, ...a) => { const r = git(cwd, ...a); if (r.status !== 0) throw new Error(`git ${a.join(" ")}: ${r.stderr || r.stdout}`); return r.stdout.trim(); };
const log = (f, x) => S8.append(f, x);
const launcherSrc = fs.readFileSync(path.join(HERE, "..", "launcher", "launch.mjs"), "utf8");
const MODEL = opt.model ?? (launcherSrc.match(/const MODEL = opt\.model \?\? "([^"]+)"/) ?? [])[1];
export const SECOND_MODEL = opt["second-model"] ?? "claude-sonnet-5-5";
const startDir = path.join(B10, "start"), judgeDir = path.join(B10, "judge"), ledgerOf = (arm) => path.join(B10, "_operator", arm, "ledger.jsonl");

// ---------------------------------------------------------------- roots
function makeRoot(id, from, rev = "HEAD") {
  const root = path.join(B10, "arms", id), P = S8.paths({ runs: root, b8: B8 });
  if (!fs.existsSync(P.V)) { fs.mkdirSync(root, { recursive: true }); gitOk(root, "clone", "-q", "--no-hardlinks", from, P.V); gitOk(P.V, "checkout", "-q", "-B", "main", rev); git(P.V, "remote", "remove", "origin"); }
  if (!fs.existsSync(P.toolchain)) {
    fs.cpSync(path.join(B8RUNS, "toolchain"), P.toolchain, { recursive: true });
    const jd = path.join(P.toolchain, "judge"); fs.mkdirSync(jd, { recursive: true });
    for (const f of ["judge.mjs", "visible-check.mjs"]) fs.copyFileSync(path.join(judgeDir, f), path.join(jd, f));
    const cfg = JSON.parse(fs.readFileSync(path.join(judgeDir, "judge.json"), "utf8")); cfg.clj = P.clj; fs.writeFileSync(path.join(jd, "judge.json"), JSON.stringify(cfg, null, 1));
  }
  if (id.startsWith("O-")) { fs.copyFileSync(path.join(HERE, "..", "bench9", "board.mjs"), path.join(P.toolchain, "board.mjs")); fs.writeFileSync(path.join(P.toolchain, "board.json"), JSON.stringify({ file: path.join(B10, "_board", "O.jsonl") })); }
  S8.installShims(P, "V");
  // B10 allows gcc for study (spec/B10.md "Rules"): its shims pass through, still logged; the judge's build blocks it
  for (const n of ["gcc", "cc", "clang", "gcc-13", "x86_64-linux-gnu-gcc"]) {
    const realBin = ["/usr/bin/" + n, "/usr/local/bin/" + n].find((f) => fs.existsSync(f)); if (!realBin) continue;
    fs.writeFileSync(path.join(P.shim("V"), n), `#!/bin/sh\n# Benchmark 10 shim: ${n} passes through (for study; logged)\nprintf '{"t":"%s","arm":"V","prog":"${n}","deny":false,"args":"%s"}\\n' "$(date -u +%Y-%m-%dT%H:%M:%SZ)" "$(printf '%s ' "$*" | tr -d '"\\\\' | cut -c1-300)" >> "\${B8_SHIM_LOG:-${P.shimLog.replace(/'/g, "")}}" 2>/dev/null\nexec ${realBin} "$@"\n`, { mode: 0o755 });
  }
  return P;
}
const fastCmd = (P) => `node ${path.join(P.toolchain, "judge", "judge.mjs")} fast --dir=${P.V}`;
const runNode = (args, timeout) => new Promise((resolve) => { const ch = spawn(process.execPath, args, { stdio: ["ignore", "pipe", "pipe"] }); let out = "", err = ""; const t = setTimeout(() => ch.kill("SIGKILL"), timeout); ch.stdout.on("data", (d) => (out += d)); ch.stderr.on("data", (d) => (err += d)); ch.on("close", (code) => { clearTimeout(t); resolve({ code, out, err }); }); });
const lastJson = (s) => { for (const l of String(s ?? "").trim().split("\n").reverse()) { try { return JSON.parse(l); } catch {} } return null; };

// ---------------------------------------------------------------- the referee
let fakeN = 0;
/** the merge check: build, visible corpus, visible workloads (no W1-W5/Lua; that runs once a round) */
async function check(dir, { visible = false } = {}) {
  if (FAKE_JUDGE) { const n = fakeN++; return { ok: n % 6 !== 4, ratio: Number((1.79 - 0.03 * n + (n % 5 === 2 ? 0.1 : 0)).toFixed(4)), lines: ["B10 fake judge"] }; }
  const r = await runNode([path.join(judgeDir, "judge.mjs"), "fast", `--dir=${dir}`, ...(visible ? [] : ["--skip-visible"])], 4 * 3600_000);
  const lines = r.out.split("\n").filter((l) => /^B10 /.test(l)), m = r.out.match(/B10 fast ratio: ([\d.]+)/);
  return { ok: r.code === 0 && !!m, ratio: m ? Number(m[1]) : null, lines };
}
/** the full judge on a fresh clone of a tree's HEAD (only committed work counts) */
async function full(dir, out = null) {
  if (FAKE_JUDGE) { const n = fakeN++; return { score: Number((1.7 - 0.02 * n).toFixed(4)), gateOk: true, ratio: Number((1.7 - 0.02 * n).toFixed(4)), lines: ["B10 fake judge"] }; }
  const snap = fs.mkdtempSync(path.join(B10, "snap-")); fs.rmSync(snap, { recursive: true }); gitOk(B10, "clone", "-q", "--no-hardlinks", dir, snap);
  try { const r = await runNode([path.join(judgeDir, "judge.mjs"), "full", `--dir=${snap}`, ...(out ? [`--out=${out}`] : [])], 6 * 3600_000); const j = lastJson(r.out); return { ...j, lines: r.out.split("\n").filter((l) => /^B10 /.test(l)), code: r.code, ...(j ? {} : { error: r.err.slice(-600) }) }; }
  finally { fs.rmSync(snap, { recursive: true, force: true }); }
}

// ---------------------------------------------------------------- sessions (as bench9/run.mjs, with the cost fix and a model per session)
function clockFor(arm) {
  const f = path.join(B10, "_operator", arm, "clock.json"); fs.mkdirSync(path.dirname(f), { recursive: true });
  let acc = 0; try { acc = JSON.parse(fs.readFileSync(f, "utf8")).activeMs; } catch {}
  let t = Date.now();
  const tick = () => { const n = Date.now(); acc += n - t; t = n; fs.writeFileSync(f, JSON.stringify({ activeMs: acc, t: new Date().toISOString() })); };
  const iv = setInterval(tick, 15_000); iv.unref();
  return { min: () => { tick(); return acc / 60000; }, stop: () => { tick(); clearInterval(iv); } };
}
const projDir = (cwd) => path.join(process.env.HOME ?? "/root", ".claude", "projects", path.resolve(cwd).replace(/[^A-Za-z0-9]/g, "-"));
/** a session's cost since t0 from its transcript, for a turn the SDK reports none for (cut by its time cap): list
 *  prices per million tokens (Opus: input 5, cache write 6.25, cache read 0.5, output 25; Sonnet: 3, 3.75, 0.3, 15) times
 *  1.33, the ratio of the SDK's reported cost to these prices on B9c's completed turn. An estimate. */
function transcriptCost(cwd, sid, t0, model) {
  let txt; try { txt = fs.readFileSync(path.join(projDir(cwd), `${sid}.jsonl`), "utf8"); } catch { return null; }
  const p = /sonnet/.test(model) ? [3, 3.75, 0.3, 15] : /haiku/.test(model) ? [1, 1.25, 0.1, 5] : [5, 6.25, 0.5, 25];
  const seen = new Set(); let usd = 0;
  for (const l of txt.split("\n")) { let m; try { m = JSON.parse(l); } catch { continue; } if (m.type !== "assistant" || !m.message?.usage || Date.parse(m.timestamp) < t0 || seen.has(m.message.id)) continue; seen.add(m.message.id); const u = m.message.usage; usd += ((u.input_tokens ?? 0) * p[0] + (u.cache_creation_input_tokens ?? 0) * p[1] + (u.cache_read_input_tokens ?? 0) * p[2] + (u.output_tokens ?? 0) * p[3]) / 1e6; }
  return usd * 1.33;
}
/** compactions and peak context in a session's transcript */
function contextStats(cwd, sid) {
  let txt; try { txt = fs.readFileSync(path.join(projDir(cwd), `${sid}.jsonl`), "utf8"); } catch { return null; }
  let peak = 0, compactions = 0;
  for (const l of txt.split("\n")) { let m; try { m = JSON.parse(l); } catch { continue; } if (m.type === "system" && /compact/.test(m.subtype ?? "")) compactions++; if (m.isCompactSummary) compactions++; const u = m.message?.usage; if (m.type === "assistant" && u) peak = Math.max(peak, (u.input_tokens ?? 0) + (u.cache_read_input_tokens ?? 0) + (u.cache_creation_input_tokens ?? 0)); }
  return { peak, compactions };
}
let query = null;
async function turn(P, prompt, { resume = null, ms, label, ledger, model = MODEL }) {
  const t0 = Date.now();
  if (FAKE) {
    fs.appendFileSync(path.join(P.V, "src", "ccc", "main.clj"), `\n;; fake turn ${label}\n`); gitOk(P.V, "add", "-A"); git(P.V, "commit", "-qm", `fake ${label}`);
    const fsid = resume ?? `fake-${label}`; log(ledger, { event: "turn", label, sid: fsid, model, cost: 0, ok: true, min: 0 }); return { sid: fsid, cost: 0, ok: true, text: `fake. practices: #1` };
  }
  query ??= (await import(pathToFileURL(path.join(HERE, "..", "launcher", "node_modules", "@anthropic-ai", "claude-agent-sdk", "sdk.mjs")).href)).query;
  const ac = new AbortController(), timer = setTimeout(() => ac.abort(new Error("time cap")), Math.max(5000, ms));
  let sid = resume, result = null, error = null, lastText = "";
  try {
    const options = await S8.vOptions(P, { cwd: P.V, model, effort: S8.EFFORT, abortController: ac, tools: S8.TOOLS_OK, maxTurns: 1000, sid: () => sid, resume, stderrLog: path.join(P.op, "V", "cli-stderr.log") });
    for await (const m of query({ prompt, options })) {
      if (typeof m.session_id === "string" && m.session_id) sid = m.session_id;
      if (m.type === "assistant") for (const c of m.message?.content ?? []) if (c.type === "text") lastText = c.text;
      if (m.type === "result") result = m;
    }
  } catch (e) { error = e?.message ?? String(e); }
  clearTimeout(timer);
  let cost = Object.values(result?.modelUsage ?? {}).reduce((a, u) => a + (u.costUSD ?? 0), 0), costEstimated = false;
  if (!result && sid) { const est = transcriptCost(P.V, sid, t0, model); if (est != null) { cost = est; costEstimated = true; } }
  const ok = !error && !!result && !result.is_error, ctx = sid ? contextStats(P.V, sid) : null;
  log(ledger, { event: "turn", label, sid, model, cost: Number(cost.toFixed(4)), ...(costEstimated ? { costEstimated } : {}), ok, why: ok ? null : String(error ?? result?.subtype ?? "no result").slice(0, 300), turns: result?.num_turns ?? null, min: Math.round((Date.now() - t0) / 600) / 100, ctx });
  return { sid, cost, ok, why: error, text: String(result?.result ?? lastText ?? "") };
}
const commitLeftover = (P, who) => { if (git(P.V, "status", "--porcelain").stdout.trim()) { gitOk(P.V, "add", "-A"); git(P.V, "commit", "-qm", `harness: ${who}'s uncommitted work at hand-in`); } return gitOk(P.V, "rev-parse", "HEAD"); };
/** A hand-in is the last commit: uncommitted work (often an edit cut half-way by the time cap) is not merged; it is
 *  saved as a patch in .b10-leftover/ (ignored by git, kept across the next round's reset) for its author to reapply.
 *  Returns { head, patch } (patch: its path, or null). Smoke test, 2026-10-24: a cut worker's half-written edit,
 *  committed by the old rule, failed the check and took the round's committed work down with it. */
function handIn(P, tag) {
  const head = gitOk(P.V, "rev-parse", "HEAD");
  if (!git(P.V, "status", "--porcelain").stdout.trim()) return { head, patch: null };
  const dir = path.join(P.V, ".b10-leftover"); fs.mkdirSync(dir, { recursive: true });
  git(P.V, "add", "-A", "--", ".", ":(exclude).b10-leftover"); const diff = git(P.V, "diff", "--cached", "--binary", "HEAD").stdout; git(P.V, "reset", "-q");
  const patch = path.join(dir, `${tag}.patch`); fs.writeFileSync(patch, diff);
  return { head, patch: diff.trim() ? patch : null };
}

const TASK = (P) => `${fs.readFileSync(path.join(P.V, "spec", "B10.md"), "utf8")}\n\n## Where things are\n\n- Your compiler: **${P.V}** (a git repository; commit your work there). Read \`spec/\` and the code; \`docs/\` may hold notes from earlier work.\n- The fast judge: \`${fastCmd(P)}\`\n- \`clj-run\`, gcc and valgrind are on your PATH.\n`;

// ---------------------------------------------------------------- arm V
async function armV() {
  const led = ledgerOf("V"), rows = S8.readJsonl(led);
  if (rows.some((x) => x.event === "end")) return { done: true, end: rows.find((x) => x.event === "end") };
  if (!rows.length) log(led, { event: "start", arm: "V", model: MODEL, caps: { cost: CAP_COST, min: CAP_MIN }, fake: FAKE });
  const P = makeRoot("V", startDir), clock = clockFor("V");
  let spent = rows.filter((x) => x.event === "turn").reduce((a, x) => a + (x.cost ?? 0), 0), sid = rows.findLast((x) => x.event === "turn" && x.sid)?.sid ?? null, k = rows.filter((x) => x.event === "turn").length;
  while (clock.min() < CAP_MIN - 5 && spent < CAP_COST - 3) {
    const left = CAP_MIN - clock.min();
    // Fix (operator, 2026-10-24 14:55, during the run): a turn's cost is bounded only by its time, so size the turn to
    // the budget left at V's own observed cost per active minute (turn 1: $47 in 90 min), keeping $3 in hand
    const rate = clock.min() > 5 && spent > 0 ? spent / clock.min() : 0.55, byBudget = Math.floor((CAP_COST - 3 - spent) / rate);
    if (byBudget < 5) break;
    const prompt = k === 0
      ? `${TASK(P)}\nYou work alone, in charge of your own plan, for about ${CAP_MIN / 60} hours of working time and $${CAP_COST} in total. Work in long stretches; commit as you go (your last commit is what is judged). When you stop, I will say "go on" until the time or the budget runs out.`
      : `Go on. So far: $${spent.toFixed(2)} of $${CAP_COST}, ${Math.round(clock.min())} of ${CAP_MIN} minutes. Your last commit: ${gitOk(P.V, "log", "--oneline", "-1")}. Keep improving the generated code; commit as you go.`;
    const r = await turn(P, prompt, { resume: sid, ms: Math.min(90, left, byBudget) * 60000, label: `V turn ${k + 1}`, ledger: led });
    spent += r.cost; sid = r.sid ?? sid; k++;
    log(led, { event: "checkpoint", turn: k, head: gitOk(P.V, "rev-parse", "HEAD"), dirty: !!git(P.V, "status", "--porcelain").stdout.trim(), spent: Number(spent.toFixed(4)), min: Math.round(clock.min() * 100) / 100 });
    if (FAKE && k >= 3) break;
  }
  clock.stop();
  const hv = handIn(P, "V-end");
  const end = { event: "end", head: hv.head, leftover: hv.patch, dir: P.V, cost: Number(spent.toFixed(4)), min: Math.round(clock.min() * 100) / 100, turns: k, ctx: sid ? contextStats(P.V, sid) : null };
  log(led, end); return end;
}

// ---------------------------------------------------------------- arm O (B10.md "O, the full principled org")
export const WORKERS = [
  { id: "w-measure", temperament: "Measure before you change anything, and let the numbers pick each next move.", model: MODEL },
  { id: "w-bold", temperament: "Look for the one restructuring that removes a whole class of cost, and do it well.", model: MODEL },
  { id: "w-sceptic", temperament: "Assume a speedup breaks something until you have shown it does not; check the claims others post on the board before you build on them.", model: SECOND_MODEL },
  { id: "w-lean", temperament: "Find the smallest change with the largest effect, and stop a line of work when its returns fall.", model: SECOND_MODEL },
];
export const AREAS = { driver: ["main.clj"], frontend: ["lexer.clj", "preproc.clj"], parser: ["parser.clj", "types.clj"], codegen: ["codegen.clj"] };
export const areaOf = (f) => (!/^src\//.test(f) ? null : Object.entries(AREAS).find(([, fs_]) => fs_.includes(path.basename(f)))?.[0] ?? "passes");
const ROUND_MIN = Number(opt["round-min"] ?? 45), ROUND_COST = Number(opt["round-cost"] ?? 40), MAX_ROUNDS = Number(opt.rounds ?? 8);
const boardFile = () => path.join(B10, "_board", "O.jsonl");
const boardRows = () => { try { return fs.readFileSync(boardFile(), "utf8").trim().split("\n").filter(Boolean).map((l) => JSON.parse(l)); } catch { return []; } };
const boardPost = (e) => { fs.mkdirSync(path.dirname(boardFile()), { recursive: true }); fs.appendFileSync(boardFile(), JSON.stringify({ n: boardRows().length + 1, t: new Date().toISOString(), ...e }) + "\n"); };
const BOARD = (P) => `node ${path.join(P.toolchain, "board.mjs")}`;
/** practices (K38-style beliefs): a practice is a board entry of kind hypothesis whose area is "practice"; a hand-in's
 *  "practices: #n, #m" line names those it used; a kept merge with credit > 0 counts for each, any other result against */
function practiceBeliefs(merges) {
  const P = {};
  for (const e of boardRows()) if (e.area === "practice") P[e.n] = { n: e.n, by: e.by, text: e.text, a: 1, b: 1 };
  for (const m of merges) for (const n of m.practices ?? []) if (P[n]) { if (m.kept && m.credit > 0) P[n].a++; else P[n].b++; }
  return Object.values(P).map((p) => ({ ...p, belief: Number((p.a / (p.a + p.b)).toFixed(3)) })).sort((x, y) => y.belief - x.belief);
}
function coverage(merges) {
  const cov = {}; for (const a of [...Object.keys(AREAS), "passes"]) cov[a] = { claimedBy: [], postedBy: [], kept: [], reverted: [], credit: {} };
  const norm = (s) => { const t = String(s ?? "").toLowerCase(); return Object.keys(cov).find((a) => t.includes(a)) ?? (/preproc|lexer|token/.test(t) ? "frontend" : /regalloc|register|ir\b|ssa|inline|fold|pass|peephole|optim/.test(t) ? "passes" : /emit|asm|instr|select|call/.test(t) ? "codegen" : /type|decl|parse/.test(t) ? "parser" : null); };
  for (const e of boardRows()) { const a = norm(e.area); if (!a || e.by === "judge") continue; const key = e.kind === "claim" ? "claimedBy" : e.kind === "drop" ? null : "postedBy"; if (key && !cov[a][key].includes(e.by)) cov[a][key].push(e.by); }
  for (const m of merges) for (const a of m.areas ?? []) { if (!cov[a]) continue; if (m.kept) { cov[a].kept.push(`r${m.round}:${m.id}`); cov[a].credit[m.id] = Number(((cov[a].credit[m.id] ?? 0) + m.credit / m.areas.length).toFixed(4)); } else cov[a].reverted.push(`r${m.round}:${m.id}`); }
  return cov;
}
const stewardsOf = (cov) => Object.fromEntries(Object.entries(cov).map(([a, c]) => [a, Object.entries(c.credit).sort((x, y) => y[1] - x[1]).find(([, v]) => v > 0)?.[0] ?? null]).filter(([, s]) => s));

async function armO() {
  const led = ledgerOf("O"); let rows = S8.readJsonl(led);
  if (rows.some((x) => x.event === "end")) return { done: true, end: rows.find((x) => x.event === "end") };
  if (!rows.length) log(led, { event: "start", arm: "O", model: MODEL, second: SECOND_MODEL, caps: { cost: CAP_COST, min: CAP_MIN }, fake: FAKE });
  const clock = clockFor("O"), all = () => S8.readJsonl(led);
  /** the merges as they stand: the last row per (round, worker) (a round-end revert appends a corrected row) */
  const effMerges = () => { const m = new Map(); for (const x of all().filter((x) => x.event === "merge")) m.set(`${x.round} ${x.id}`, x); return [...m.values()]; };
  const done = (label) => all().find((x) => x.event === "turn" && x.label === label && x.ok);
  let spent = rows.filter((x) => x.event === "turn").reduce((a, x) => a + (x.cost ?? 0), 0);
  const M = makeRoot("O-main", startDir);
  if (fs.existsSync(path.join(M.V, ".git", "MERGE_HEAD"))) git(M.V, "merge", "--abort");
  let base = rows.findLast((x) => x.event === "main")?.ratio ?? null;
  if (base == null) { const c = await check(M.V); base = c.ratio; log(led, { event: "main", round: 0, head: gitOk(M.V, "rev-parse", "HEAD"), ratio: base, ok: c.ok, lines: c.lines }); }
  const W = WORKERS.map((w) => ({ ...w, R: makeRoot(`O-${w.id}`, M.V), sid: all().findLast((x) => x.event === "turn" && x.label?.startsWith("O r") && x.label.endsWith(` ${w.id}`) && x.sid)?.sid ?? null }));
  let arch = all().findLast((x) => x.event === "turn" && x.label?.startsWith("O architect") && x.sid)?.sid ?? null;
  const tools = (w) => `Tools:
- the findings board: \`${BOARD(w.R)} read [--area=…]\`; post each measured finding and each dead end as you go: \`${BOARD(w.R)} post --by=${w.id} --kind=finding|dead-end|hypothesis --area=<area> --text='…' --evidence='<commit, instruction counts>' --wrong-if='…'\`. A **practice** (a way of working that you found pays, e.g. how you find what to optimise or how you check a change is safe) is posted with \`--kind=hypothesis --area=practice\`; when you hand in, end with a line \`practices: #n, #m\` naming the board's practices you used this round (the referee's results update each practice's belief);
- claims: before you change an area, \`${BOARD(w.R)} claim --by=${w.id} --area=<driver|frontend|parser|codegen|passes|…> --text='what you are about to change'\`; \`${BOARD(w.R)} claims\` shows the others'; \`${BOARD(w.R)} drop --by=${w.id} --area=…\` when you move on. A claim avoids two people rewriting the same code at once; it is not ownership: anyone may work anywhere;
- the fast judge, as often as you like: \`${fastCmd(w.R)}\`; \`valgrind --tool=callgrind\` and \`callgrind_annotate\` on one workload are faster for a single question.`;
  for (let k = 1; k <= MAX_ROUNDS; k++) {
    if (all().some((x) => x.event === "round-end" && x.round === k)) continue;
    // Fix (operator, 2026-10-24 14:55, during the run): the round's cost estimate is the observed mean of O's rounds so far
    // (round 1: $63, not the $40 assumed); a round that would not fit is shortened to fit, or not started under 15 min
    const ends = all().filter((x) => x.event === "round-end"), perRound = ends.length ? Math.max(ROUND_COST, ends.at(-1).spent / ends.length) : ROUND_COST;
    const roundMin = Math.min(ROUND_MIN, Math.floor(ROUND_MIN * (CAP_COST - 3 - spent) / perRound), Math.floor(CAP_MIN - clock.min() - 20));
    if (roundMin < 15) { log(led, { event: "stop", round: k, why: "caps", spent: Number(spent.toFixed(2)), min: Math.round(clock.min()), perRound: Number(perRound.toFixed(2)) }); break; }
    const gains = all().filter((x) => x.event === "round-end").slice(-2).map((x) => x.gain ?? 1);
    if (gains.length === 2 && gains.every((g) => g < 0.01)) { log(led, { event: "stop", round: k, why: "two rounds under 1%" }); break; }
    const mainHead = gitOk(M.V, "rev-parse", "HEAD");
    if (!all().some((x) => x.event === "round-start" && x.round === k)) log(led, { event: "round-start", round: k, main: mainHead, ratio: base, minutes: roundMin });
    const merges = effMerges(), stewards = k >= 3 ? stewardsOf(coverage(merges.filter((m) => m.round <= k - 1))) : {};
    const intent = all().findLast((x) => x.event === "intent")?.text ?? "";
    const beliefs = practiceBeliefs(merges).slice(0, 8);
    await Promise.all(W.map(async (w) => {
      const label = `O r${k} ${w.id}`; if (done(label)) return;
      gitOk(w.R.V, "fetch", "-q", M.V, "HEAD"); gitOk(w.R.V, "reset", "-q", "--hard", "FETCH_HEAD"); git(w.R.V, "clean", "-qfd");
      const mine = Object.entries(stewards).filter(([, s]) => s === w.id).map(([a]) => a);
      const review = mine.length ? merges.filter((m) => m.round === k - 1 && m.kept && m.id !== w.id && m.areas.some((a) => mine.includes(a))) : [];
      const last = merges.filter((m) => m.round === k - 1).map((m) => `- ${m.id}: ${m.kept ? `kept, credit ${m.credit} (main ${m.before} → ${m.after})` : `not kept (${m.why})`}; areas ${m.areas.join(", ") || "none"}`).join("\n");
      const prevHand = all().find((x) => x.event === "handin" && x.round === k - 1 && x.id === w.id);
      const leftNote = prevHand?.leftover ? ` Your uncommitted work when the last round was cut is saved in ${prevHand.leftover} (only committed work is merged; reapply it with git apply if it is still useful).` : "";
      const prompt = k === 1
        ? `${TASK(w.R)}
## You are one of a team of ${W.length}

You are **${w.id}**, one of ${W.length} engineers working in parallel on this compiler, each on its own clone of the team's **main**; yours is ${w.R.V} (commit there). After each round of about ${ROUND_MIN} minutes an independent referee merges every engineer's committed work into main, one at a time, and measures main after each merge (the build, the visible corpus and the visible workloads' instruction counts): a merge that breaks anything or raises the instruction count is reverted, and your credit is the fall in the ratio your merged work causes. Once a round the visible W1-W5 and Lua check runs on main. Each round ends at about ${ROUND_MIN} minutes whether you are done or not, and only your committed work is merged, so commit each working step. You keep your memory between rounds, and each round you start again from the new main, which holds everyone's kept work. Work that composes with the others' is worth the most. An architect owns the interfaces between the compiler's parts (if someone introduces an intermediate representation, its shape is the architect's call), settles disputed claims and merge conflicts, and writes each round's picture of where the instructions go; the architect assigns no work.

From round 3, whoever has earned the most kept credit in an area becomes its **steward**: it keeps \`docs/areas/<area>.md\` (what the area does, what was tried, what is next), reviews what others changed there, and may ask the architect to revert a merge with evidence. Stewards still work wherever they like.

Your temperament: **${w.temperament}** Nobody assigns your focus. Start by understanding the whole compiler and where SQLite's instructions go (profile the workloads, compare with what gcc -O2 emits for the hottest functions), then choose.

1. Before you read the board, write your own plan in ${w.R.V}/PLAN-${w.id}.md.
2. Then read the board and the claims, claim what you start on, and work.

${tools(w)}

Commit your best working state as you go (your last commit is what the referee merges). Then say briefly what you changed and what it gained, and end with the practices line.`
        : `Round ${k}. The referee's results for round ${k - 1}:
${last || "(nothing merged)"}
Main is now at ratio ${base} (lower is better; gcc -O2 is 1.0). Your clone ${w.R.V} has been reset to the new main (\`git log\` shows everyone's kept work); work of yours that was not kept is gone from your clone, so redo on top of main what still matters.${leftNote}
${intent ? `\nThe architect's picture for this round:\n${intent}\n` : ""}${mine.length ? `\nYou are the steward of: ${mine.join(", ")} (from the referee's record). Keep docs/areas/<area>.md up to date. ${review.length ? `Review these merges by others in your area${review.length > 1 ? "s" : ""} from the last round: ${review.map((m) => `${m.id}'s (${m.head.slice(0, 10)})`).join(", ")}; if one is wrong or harmful, post a finding with evidence and \`--area=revert-request\`, naming the commit.` : ""}\n` : ""}${beliefs.length ? `\nThe board's practices by belief (from the referee's results): ${beliefs.map((p) => `#${p.n} ${p.belief} "${p.text.slice(0, 80)}"`).join("; ")}\n` : ""}
Read the board and the claims first. Then choose your focus, claim, and work for about ${roundMin} minutes (this round's length).

${tools(w)}

Commit as you go. Then say briefly what you changed and what it gained, and end with the practices line.`;
      const r = await turn(w.R, prompt, { resume: w.sid, ms: roundMin * 60000, label, ledger: led, model: w.model });
      w.sid = r.sid ?? w.sid; spent += r.cost;
      const practices = [...String(r.text).matchAll(/practices?:\s*([#\d,\s]+)/gi)].flatMap((m) => [...m[1].matchAll(/#?(\d+)/g)].map((x) => Number(x[1])));
      const hi = FAKE ? { head: gitOk(w.R.V, "rev-parse", "HEAD"), patch: null } : handIn(w.R, `r${k}`);
      log(led, { event: "handin", round: k, id: w.id, head: hi.head, leftover: hi.patch, practices: [...new Set(practices)], note: String(r.text).slice(-1500) });
    }));
    // integration: check each changed head alone, then merge best first, keeping a merge only if main does not get worse
    const handins = all().filter((x) => x.event === "handin" && x.round === k), merged = all().filter((x) => x.event === "merge" && x.round === k).map((x) => x.id);
    const heads = await Promise.all(W.map(async (w) => {
      const prev = all().find((x) => x.event === "head" && x.round === k && x.id === w.id); if (prev) return { w, ...prev };
      const h = handins.find((x) => x.id === w.id), head = h?.head ?? gitOk(w.R.V, "rev-parse", "HEAD"), changed = head !== mainHead;
      const c = changed ? await check(w.R.V) : { ok: false, ratio: null, lines: [] };
      const x = { event: "head", round: k, id: w.id, head, changed, ok: c.ok, ratio: c.ratio, lines: c.lines }; log(led, x); return { w, ...x };
    }));
    heads.sort((a, b) => (a.ok ? a.ratio : 9) - (b.ok ? b.ratio : 9));
    const roundStart = base;
    for (const s of heads) {
      if (merged.includes(s.w.id)) continue;
      const before = gitOk(M.V, "rev-parse", "HEAD"), practices = handins.find((x) => x.id === s.w.id)?.practices ?? [];
      const rec = { event: "merge", round: k, id: s.w.id, head: s.head, mainBefore: before, before: base, kept: false, credit: 0, areas: [], conflict: false, practices };
      const finish = (x) => { log(led, x); boardPost({ by: "judge", kind: x.kept ? "finding" : "dead-end", area: x.areas.join("+") || "none", text: `round ${k}: ${s.w.id}'s work ${x.kept ? `merged into main, ratio ${x.before} → ${x.after} (credit ${x.credit})` : `not merged: ${x.why}`}`, evidence: `head ${s.head.slice(0, 10)}; main ${gitOk(M.V, "rev-parse", "HEAD").slice(0, 10)}`, wrongIf: "the full judge's hidden ratio moves the other way" }); };
      if (!s.changed) { finish({ ...rec, why: "no change" }); continue; }
      if (!s.ok) { finish({ ...rec, why: "its own head fails the check" }); continue; }
      gitOk(M.V, "fetch", "-q", s.w.R.V, "HEAD");
      const m = git(M.V, "merge", "--no-ff", "--no-edit", "-m", `merge ${s.w.id} (round ${k})`, "FETCH_HEAD");
      if (m.status !== 0) {
        rec.conflict = true;
        const files = git(M.V, "diff", "--name-only", "--diff-filter=U").stdout.trim().split("\n").filter(Boolean);
        if (FAKE) { git(M.V, "checkout", "--ours", "--", "."); git(M.V, "add", "-A"); git(M.V, "commit", "-qm", `fake architect: ${s.w.id}`); }
        else {
          const r = await turn(M, `${arch ? "" : `${TASK(M)}\n## Your role: the team's architect\n\n${W.length} engineers work in parallel on clones of main; after each round a referee merges their work into main, here in **${M.V}** (yours), and measures it. You assign no work. You own the interfaces between the compiler's parts, resolve merge conflicts, settle disputed claims and revert requests, and after each round write the picture of where the instructions go now. The board: \`${BOARD(M)} read\`.\n\n`}A merge conflicts: round ${k}, ${s.w.id}'s work into main (a merge is in progress in ${M.V}; conflicted files: ${files.join(", ")}). Resolve it so that **both sides' intent survives**; check with the fast judge (\`${fastCmd(M)}\`); commit the merge (git commit, no rebase). At most 15 minutes; if the two cannot be combined, keep main's side (\`git checkout --ours\`), commit, and say why.`, { resume: arch, ms: 15 * 60000, label: `O architect r${k} merge ${s.w.id}`, ledger: led, model: MODEL });
          arch = r.sid ?? arch; spent += r.cost;
        }
        if (fs.existsSync(path.join(M.V, ".git", "MERGE_HEAD")) || git(M.V, "diff", "--name-only", "--diff-filter=U").stdout.trim()) { git(M.V, "merge", "--abort"); git(M.V, "reset", "-q", "--hard", before); finish({ ...rec, why: "merge conflict not resolved" }); continue; }
        commitLeftover(M, "architect");
      }
      rec.areas = [...new Set(git(M.V, "diff", "--name-only", before, "HEAD").stdout.trim().split("\n").filter(Boolean).map(areaOf).filter(Boolean))];
      const c = await check(M.V);
      if (!c.ok || c.ratio == null || c.ratio > base) { git(M.V, "reset", "-q", "--hard", before); finish({ ...rec, after: c.ratio, why: !c.ok ? "main fails the check after the merge" : `main got worse (${base} → ${c.ratio})`, lines: c.lines }); continue; }
      finish({ ...rec, kept: true, after: c.ratio, credit: Number((base - c.ratio).toFixed(4)), lines: c.lines }); base = c.ratio;
    }
    // once a round: the visible W1-W5 and Lua check on main; a failure reverts this round's merges from the last
    let vis = await check(M.V, { visible: true });
    const keptNow = () => effMerges().filter((x) => x.round === k && x.kept).sort((a, b) => Date.parse(a.t) - Date.parse(b.t));
    while (!vis.ok && keptNow().length) {
      const last = keptNow().at(-1);
      git(M.V, "reset", "-q", "--hard", last.mainBefore); log(led, { event: "merge-revert", round: k, id: last.id, why: "the round's visible W1-W5/Lua check failed", lines: vis.lines });
      const { t: _t, ...lastRow } = last; log(led, { ...lastRow, revertedAtRoundEnd: true, kept: false, credit: 0, why: "reverted at round end (visible W1-W5/Lua check)" });
      boardPost({ by: "judge", kind: "dead-end", area: last.areas.join("+") || "none", text: `round ${k}: ${last.id}'s merge reverted at the round's end: main failed the visible W1-W5/Lua check with it`, evidence: vis.lines.join(" | ").slice(0, 380), wrongIf: "the check passes with it" });
      vis = await check(M.V, { visible: true }); base = vis.ratio ?? base;
    }
    if (vis.ok) base = vis.ratio;
    // the architect: revert requests, the round's picture (intent), the interfaces
    const reqs = boardRows().filter((e) => e.area === "revert-request" && Date.parse(e.t) > Date.parse(all().find((x) => x.event === "round-start" && x.round === k).t));
    const covNow = coverage(effMerges());
    if (!FAKE) {
      const res = effMerges().filter((x) => x.round === k).map((m) => `- ${m.id}: ${m.kept ? `kept, credit ${m.credit}` : `not kept (${m.why})`}; areas ${m.areas.join(", ") || "none"}`).join("\n");
      const r = await turn(M, `${arch ? "" : `${TASK(M)}\n## Your role: the team's architect\n\n${W.length} engineers work in parallel on clones of main; after each round a referee merges their work into main, here in **${M.V}** (yours), and measures it. You assign no work. You own the interfaces between the compiler's parts, resolve merge conflicts, settle disputed claims and revert requests, and after each round write the picture of where the instructions go now. The board: \`${BOARD(M)} read\`.\n\n`}Round ${k} is merged. Results:\n${res || "(nothing)"}\nMain's ratio: ${base}. The coverage map (per area: who claimed, who posted, kept and reverted merges, credit by member): ${JSON.stringify(covNow)}\n${reqs.length ? `Revert requests from stewards: ${reqs.map((e) => `#${e.n} by ${e.by}: ${e.text} (evidence: ${e.evidence})`).join("; ")}. Decide each: to revert, \`git revert -m 1 <merge commit>\` in ${M.V} and commit, and say why; the referee will check main again.\n` : ""}
Do three things, in at most 15 minutes: (1) profile main on the visible workloads (callgrind) and write **the picture for the next round**: where the instructions go now, against gcc -O2, in a few lines: the largest remaining gaps, without assigning anyone; (2) if the parts' interfaces need a decision (for example the shape of an intermediate representation), make it and write it in docs/INTERFACES.md, and commit; (3) settle any revert request. End your answer with the picture under a line "PICTURE:".`, { resume: arch, ms: 15 * 60000, label: `O architect r${k} round`, ledger: led, model: MODEL });
      arch = r.sid ?? arch; spent += r.cost;
      const pic = String(r.text).split(/PICTURE:/i).slice(1).join("").trim() || String(r.text).slice(-1200);
      log(led, { event: "intent", round: k, text: pic.slice(0, 2500) }); boardPost({ by: "architect", kind: "hypothesis", area: "picture", text: pic.slice(0, 1200), evidence: `main ${gitOk(M.V, "rev-parse", "HEAD").slice(0, 10)} at ratio ${base}`, wrongIf: "the next round's profile shows otherwise" });
      if (git(M.V, "status", "--porcelain").stdout.trim()) commitLeftover(M, "architect");
      if (reqs.length) { const c = await check(M.V, { visible: true }); if (c.ok) base = c.ratio; else log(led, { event: "warn", round: k, why: "main fails the check after the architect's turn", lines: c.lines }); }
    }
    const head = gitOk(M.V, "rev-parse", "HEAD");
    log(led, { event: "main", round: k, head, ratio: base });
    log(led, { event: "round-end", round: k, head, ratio: base, gain: roundStart ? Number(((roundStart - base) / roundStart).toFixed(4)) : null, spent: Number(spent.toFixed(4)), min: Math.round(clock.min() * 100) / 100, stewards: stewardsOf(coverage(effMerges().filter((x) => x.round <= k))) });
  }
  clock.stop();
  const merges = effMerges(), cov = coverage(merges);
  fs.writeFileSync(path.join(B10, "_operator", "O", "coverage.json"), JSON.stringify(cov, null, 1));
  const end = { event: "end", head: gitOk(M.V, "rev-parse", "HEAD"), dir: M.V, ratio: base, cost: Number(spent.toFixed(4)), min: Math.round(clock.min() * 100) / 100, kept: merges.filter((m) => m.kept).length, reverted: merges.filter((m) => !m.kept).length, board: boardRows().length, practices: practiceBeliefs(merges), stewards: stewardsOf(cov), coverage: cov, ctx: Object.fromEntries(W.map((w) => [w.id, w.sid ? contextStats(w.R.V, w.sid) : null])) };
  log(led, end); return end;
}

// ---------------------------------------------------------------- status and the final scoring
function status() {
  const out = {};
  for (const arm of ["V", "O"]) { const r = S8.readJsonl(ledgerOf(arm)); if (!r.length) continue; const { lines, coverage: _c, ...last } = r.at(-1); out[arm] = { rows: r.length, last, cost: Number(r.filter((x) => x.event === "turn").reduce((a, x) => a + (x.cost ?? 0), 0).toFixed(2)) }; }
  return out;
}
async function finalScoring() {
  const out = {}, cands = { start: startDir };
  for (const arm of ["V", "O"]) { const e = S8.readJsonl(ledgerOf(arm)).find((x) => x.event === "end"); if (e?.dir) cands[arm] = e.dir; }
  if (opt.only) { const keep = String(opt.only).split(","); for (const k of Object.keys(cands)) if (!keep.includes(k)) delete cands[k]; }
  for (const [arm, dir] of Object.entries(cands)) { out[arm] = await full(dir, path.join(B10, "_operator", `final-${arm}.json`)); const { lines, ...x } = out[arm]; log(path.join(B10, "_operator", "final.jsonl"), { arm, dir, ...x }); }
  return out;
}

const fns = { v: armV, o: armO, status, final: finalScoring, full: () => full(path.resolve(opt.dir)) };
if (!fns[cmd]) { console.error("usage: run.mjs v|o|full|final|status"); process.exit(2); }
if (!MODEL && ["v", "o"].includes(cmd) && !FAKE) { console.error("no --model and the launcher's default could not be read"); process.exit(2); }
console.log(JSON.stringify(await fns[cmd](), null, 1));
