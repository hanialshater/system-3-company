#!/usr/bin/env node
// Benchmark 7, the Meta arms' harness: H (specs/textgame-hybrid-nolearn.json: a warm builder that self-checks, one
// external evaluation, code accept and ship) and HSI (specs/textgame-hybrid.json: the same plus the K28 playbook, whose
// store persists across G1 -> G2 -> G3). One live dir per (arm, game), so no session and no file carries over between
// games; only HSI's playbook store does. The vanilla arm (V) is vanilla-game.mjs, which uses this file's accept, hook and
// tally helpers, so all three arms get the same feedback text, the same file-access rule and the same measures.
//
//   node setup.mjs place --arm=H|HSI --game=G1|G2|G3 [--budget=60000000] [--runs=<dir>] [--b7=<dir>] [--out-of-order] [--sample-salt=<s>]
//        the live dir, the spec, SPEC.md, one order (founder -> lead), the access hook; prints the run command
//        (--sample-salt: a fixed K27 salt, for a dry run whose sample decision must be known; recorded in the manifest)
//   node setup.mjs run   --arm=H|HSI --game=Gn [--max-parallel=2] [--max-min=480] [--poll=3] [--model=<id>] [--dry-run]
//        the launcher (Agent SDK) with the observer beside it, then the tally; --dry-run prints the launcher command,
//        runs one observer pass and starts no session
//   node setup.mjs watch --arm=H|HSI --game=Gn [--once]   the observer alone (snapshots + hidden score per signed stage) and the protocol's stops
//   node setup.mjs accept --game=Gn --dir=<workdir> --log=<jsonl> [--b7=<dir>]   the order's accept cmd (code runs it):
//        v2: its first run scores the pre-notice suite, records it and exits 3 (a stage error: the order is held at
//        accept); the observer then delivers the Change Notice as the founder (deliverNoticeMeta); later runs score the
//        post-notice suite
//   node setup.mjs hook --arm=<A> --game=Gn --log=<jsonl> [--runs] [--b7]   PreToolUse command hook (stdin JSON)
//   node setup.mjs tally [--arm=V|H|HSI] [--md]   per (arm, game): first and final hidden pass rate, rounds, cost, ...
//   node setup.mjs audit [--md]                   fairness: hook coverage, denials, hidden-test canaries in transcripts
//
// Layout (all outside any git checkout, so a session's project settings are only the hook this file writes):
//   <runs>/arm-V/G1/              V's game dir (vanilla-game.mjs)
//   <runs>/arm-H/G1/              H's live dir (state.json, work/G1/SPEC.md, kernel/.claude/settings.json, launches.jsonl)
//   <runs>/arm-HSI/G1/            HSI's live dir; <runs>/arm-HSI/playbook-store/ the store (G1 starts it empty)
//   <runs>/_operator/             never readable by an arm: access.jsonl, <arm>-<game>/{accept,observe}.jsonl, snaps/,
//                                 launcher.out, V's ledger
// No model identifier lives here: the launcher's own --model default is used unless --model is passed.
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import crypto from "node:crypto";
import { spawn, spawnSync } from "node:child_process";
import { fileURLToPath } from "node:url";

const SELF = fileURLToPath(import.meta.url);
const HERE = path.dirname(SELF);
const SCRATCH_B7 = "/tmp/claude-0/-home-user/aa2da695-733d-5610-822b-d0f420a6080f/scratchpad/b7";
const REPO_PROTO = "/home/user/system-3-company/company/sibling/system3-meta/prototype";
export const GAMES = ["G1", "G2", "G3"];
export const ARMS = ["V", "H", "HSI"];
const SPEC_OF = { H: "textgame-hybrid-nolearn.json", HSI: "textgame-hybrid.json" };
export const GAME_MIN = 600; // PROTOCOL.md "Stops": every arm's wall clock per game (V's own most, v2: 5 hand-ins, the notice's included, x (60 min + one 60-min resume))
const DEFAULT_BUDGET = 60_000_000; // cumulative tokens per order: a runaway cap, see PROTOCOL.md "Budgets"
const FAILED_RE = /^failed: (.+)$/; // the specs' accept findings regex (flow.stages.accept.run.findings.fromStdout)

export function paths(opt = {}) {
  const b7 = path.resolve(opt.b7 ?? process.env.B7_HOME ?? (fs.existsSync(path.join(HERE, "run-hidden.mjs")) ? HERE : SCRATCH_B7));
  const runs = path.resolve(opt.runs ?? process.env.B7_RUNS ?? path.join(path.dirname(b7), "b7-runs"));
  const proto = path.resolve(opt.proto ?? (fs.existsSync(path.join(HERE, "..", "meta.mjs")) ? path.join(HERE, "..") : REPO_PROTO));
  const op = path.join(runs, "_operator");
  return {
    b7, runs, proto, op,
    arm: (a) => path.join(runs, `arm-${a}`),
    live: (a, g) => path.join(runs, `arm-${a}`, g),
    opdir: (a, g) => path.join(op, `${a}-${g}`),
    store: path.join(runs, "arm-HSI", "playbook-store"),
    access: path.join(op, "access.jsonl"),
    vledger: path.join(op, "V", "vanilla.jsonl"),
    spec: (g) => path.join(b7, "specs", `${g}.md`),
    notice: (g) => path.join(b7, "notices", `${g}.md`),
    visible: (g) => path.join(b7, "visible", g),
    visibleNotice: (g) => path.join(b7, "visible", `${g}-notice`),
    runner: path.join(b7, "run-hidden.mjs"),
    hidden: path.join(b7, "hidden"),
  };
}
const sha = (s) => crypto.createHash("sha256").update(s).digest("hex").slice(0, 16);
const readJsonl = (f) => { try { return fs.readFileSync(f, "utf8").split("\n").filter(Boolean).map((l) => JSON.parse(l)); } catch { return []; } };
const append = (f, x) => { fs.mkdirSync(path.dirname(f), { recursive: true }); fs.appendFileSync(f, JSON.stringify({ t: new Date().toISOString(), ...x }) + "\n"); };
const real = (p) => { try { return fs.realpathSync(p); } catch { return p; } };
export const gameTitle = (spec) => (spec.split("\n")[0].match(/G\d: (.+)$/) ?? [])[1] ?? "";

// ---------------------------------------------------------------- the hidden acceptance, as every arm receives it
/** Run the hidden suite on <dir>: { pass, fail, total, categories, failing: ["<cat> (f of t fail)"], lines, code }.
 *  phase (v2): "pre" = the suite of the spec as first handed out (it scores only the first hand-in), "post" = the suite
 *  with the game's Change Notice in force (every later hand-in). */
export function hidden(P, game, dir, phase = "post") {
  const { NODE_TEST_CONTEXT, B7_DEBUG, B7_MUTANT, B7_VARIANT, ...env } = process.env; // never the operator's --debug, a mutation or a variant check
  const r = spawnSync(process.execPath, [P.runner, `--game=${game}`, `--dir=${dir}`, `--phase=${phase}`], { encoding: "utf8", env, timeout: 240_000, maxBuffer: 16 << 20 });
  const last = String(r.stdout ?? "").trim().split("\n").pop();
  let j = null; try { j = JSON.parse(last); } catch {}
  if (!j || typeof j.total !== "number") return { error: `runner: exit ${r.status} ${String(r.stderr ?? r.error ?? "").slice(0, 300)}`, code: 3 };
  // "<category>: <f> of <t> tests fail": the defect-class form K28's classifier reads (learn.mjs DEFAULT_CLASSIFY), so
  // HSI's evidence carries the hidden categories as classes; `failed: ` is the specs' accept findings prefix
  const failing = Object.entries(j.categories).filter(([, c]) => c.fail).map(([k, c]) => `${k}: ${c.fail} of ${c.total} tests fail`);
  return { phase, pass: j.pass, fail: j.fail, total: j.total, rate: j.total ? j.pass / j.total : 0, categories: j.categories, failing, lines: failing.map((f) => `failed: ${f}`), code: j.fail ? 1 : 0 };
}

// ---------------------------------------------------------------- v2: the visible tests and the Change Notice (same for every arm)
/** The one pointer every arm gets when the Change Notice is delivered: V as its next turn, H and HSI as the founder's
 *  resume reason (the revise findings the builder reads). The notice itself is appended to SPEC.md, byte for byte the
 *  same for every arm. */
export const NOTICE_POINTER = (game) => `Change Notice ${game}-N1 from the orderer, after your first hand-in: the requirements have changed. SPEC.md in your work directory now ends with Part D, the Change Notice; it takes precedence over Parts A, B and C for the rules it names, and the hidden acceptance suite now tests the game with it in force. visible-tests/ has a few tests of the notice's rules (notice.test.mjs). Update game.mjs to the changed spec.`;
const copyDir = (from, to) => { fs.mkdirSync(to, { recursive: true }); for (const f of fs.readdirSync(from)) fs.copyFileSync(path.join(from, f), path.join(to, f)); };
/** The visible sample of the hidden suite, into <workdir>/visible-tests/ (every arm, at placement). */
export function placeVisible(P, game, workdir) {
  copyDir(P.visible(game), path.join(workdir, "visible-tests"));
  return sha(fs.readdirSync(P.visible(game)).sort().map((f) => f + fs.readFileSync(path.join(P.visible(game), f), "utf8")).join("\0"));
}
/** Append the Change Notice to <workdir>/SPEC.md and add its visible tests (idempotent: a second call changes nothing). */
export function deliverNoticeFiles(P, game, workdir) {
  const notice = fs.readFileSync(P.notice(game), "utf8"), spec = path.join(workdir, "SPEC.md");
  const cur = fs.readFileSync(spec, "utf8");
  if (!cur.includes(notice.trim().split("\n")[0])) fs.writeFileSync(spec, cur.trimEnd() + "\n\n" + notice);
  copyDir(P.visibleNotice(game), path.join(workdir, "visible-tests"));
  return { noticeSha: sha(notice), specSha: sha(fs.readFileSync(spec, "utf8")) };
}
const noticeFile = (od) => path.join(od, "notice.json");
export const noticeState = (od) => { try { return JSON.parse(fs.readFileSync(noticeFile(od), "utf8")); } catch { return {}; } };
const setNotice = (od, x) => { fs.mkdirSync(od, { recursive: true }); fs.writeFileSync(noticeFile(od), JSON.stringify({ ...noticeState(od), ...x }, null, 1) + "\n"); };
/** A hash of the files the hidden suite can load (everything in the dir but notes, evaluations, the spec and the visible tests). */
export function gameHash(dir) {
  const h = crypto.createHash("sha256");
  const walk = (d, rel = "") => { for (const f of fs.readdirSync(d, { withFileTypes: true }).sort((a, b) => a.name.localeCompare(b.name))) {
    if (f.name === "node_modules" || f.name === ".claude" || f.name === "visible-tests" || /^(EVAL|NOTES).*\.md$|^SPEC\.md$/.test(f.name)) continue;
    const p = path.join(d, f.name), r = path.join(rel, f.name);
    if (f.isDirectory()) walk(p, r); else if (f.isFile()) { h.update(r + "\0"); h.update(fs.readFileSync(p)); h.update("\0"); }
  } };
  try { walk(dir); } catch { return null; }
  return h.digest("hex").slice(0, 16);
}

// ---------------------------------------------------------------- the access rule (same for every arm)
// B7 review: the first rule denied a list of folders only when a call named them literally or by an absolute path, so
// `cat ../../../../b7/hidden/G1/ref/game.mjs`, `cd ../.. && cat …`, another arm's work in progress, the same arm's
// earlier game and _operator's per-snapshot scores were all one relative path away. The rule now resolves every path a
// call can reach: each Bash word against the directory the line is in at that point (each `cd` and `pushd` followed),
// symlinks by their real path, Glob/Grep by their search root. An arm's own game directory is open; around it the
// whole benchmark area is closed (the scratchpad that holds b7/ and the runs, every other arm and game, _operator,
// the playbook store, the repo and its home folder, other sessions' transcripts); anything else (/usr, /tmp, …) is open.
// A Bash path built at run time ($VAR/…, $(…), `…`) cannot be resolved and is denied. Code an agent writes and runs
// (a node script that computes a path) is out of the hook's reach: run-hidden.mjs's permission model, the content
// canaries and the transcript audit are the backstops.
const REPO_ROOT = path.resolve(REPO_PROTO, "..", "..", "..", "..");
const enc = (p) => p.replace(/[^a-zA-Z0-9]/g, "-");
const cfgDirs = () => [...new Set([process.env.CLAUDE_CONFIG_DIR, path.join(os.homedir(), ".claude")].filter(Boolean).map((d) => path.resolve(d)))];
/** {own, deny, cfg}: what arm `arm` may touch in game `game` (its own game directory) and what is closed around it. */
export function accessRules(P, arm, game) {
  const own = [P.live(arm, game)];
  const scratch = path.dirname(P.b7);
  const deny = [P.b7, P.runs, P.op, P.store, path.join(P.proto, "bench7"), path.join(P.proto, "bench7-research-difficulty.md"), path.join(REPO_PROTO, "bench7"), REPO_ROOT, ...cfgDirs()];
  if (scratch !== "/" && scratch !== os.homedir()) deny.push(scratch);
  if (path.dirname(REPO_ROOT) !== "/") deny.push(path.dirname(REPO_ROOT));
  return { arm, game, own: [...new Set(own.flatMap((r) => [r, real(r)]))], deny: [...new Set(deny.flatMap((r) => [r, real(r)]))], cfg: cfgDirs() };
}
/** The folders arm `arm` may never touch in game `game` (the dry run prints them). */
export const denyRoots = (P, arm, game = "G1") => accessRules(P, arm, game).deny;
const DENY_WORDS = /run-hidden|acc\.test\.mjs|hidden\/common|specsrc|mutants\.mjs|bench7-research|golden\.(pre|post)\.json|casegen\.mjs|build-golden/;
const RECURSIVE = /(^|[\s;&|(])(find|grep|egrep|fgrep|rg|ag|fd|locate|tree|du|rsync|tar|zip|scp)(\s|$)|\bls\s+-[a-zA-Z]*R|\bcp\s+-[a-zA-Z]*[rRa]|\bgrep\s+-[a-zA-Z]*[rR]/;
const inside = (p, r) => p === r || p.startsWith(r.endsWith("/") ? r : r + "/");
const realish = (p) => { let head = path.resolve(p), tail = []; while (!fs.existsSync(head) && path.dirname(head) !== head) { tail.unshift(path.basename(head)); head = path.dirname(head); } return path.join(real(head), ...tail); };
/** Why absolute path `abs` is closed to the arm (null: open). */
function closed(abs, R) {
  const ra = realish(abs);
  const ownCfg = (p) => R.cfg.some((c) => { const rel = path.relative(path.join(c, "projects"), p); if (!rel || rel.startsWith("..") || path.isAbsolute(rel)) return false; const name = rel.split(path.sep)[0]; return R.own.some((o) => name === enc(o) || name.startsWith(enc(o) + "-")); });
  const open = (p) => R.own.some((o) => inside(p, o)) || ownCfg(p);
  if (open(abs) && open(ra)) return null;
  if (R.deny.some((d) => inside(abs, d) || inside(ra, d))) return "a path outside your own directory, in the benchmark's area";
  return null;
}
/** Is `abs` a folder above a closed one (a recursive command or search over it reaches inside)? */
const above = (abs, R) => { const ra = realish(abs); return R.deny.some((d) => (inside(d, abs) || inside(d, ra)) && !R.own.some((o) => inside(o, d))); };
/** The paths one Bash line can reach: each word resolved against the directory the line is in when it runs. */
export function bashReach(cmd, cwd) {
  const out = { paths: [], unresolved: [], recursive: RECURSIVE.test(cmd) };
  const toks = String(cmd).split(/[\s'"=;|&()<>,{}\[\]]+/).filter(Boolean);
  let cur = cwd;
  const res = (t) => path.resolve(cur, t.replace(/^~(?=\/|$)/, os.homedir()));
  for (let i = 0; i < toks.length; i++) {
    const t = toks[i];
    if (/[$`]/.test(t)) { if (/[/.~]/.test(t.replace(/^\$\w+$/, "")) || /\$\(|`|\$\{|\$(?:HOME|PWD|OLDPWD|TMPDIR)\b/.test(t)) out.unresolved.push(t); continue; }
    if (t === "cd" || t === "pushd") {
      const n = toks[i + 1];
      if (n == null || n.startsWith("-") || /[$`]/.test(n)) { if (n != null && /[$`]/.test(n)) out.unresolved.push(n); cur = n == null ? os.homedir() : null; if (cur == null) out.unresolved.push(`${t} ${n ?? ""}`.trim()); i++; continue; }
      if (cur == null) { out.unresolved.push(`${t} ${n}`); i++; continue; }
      cur = res(n); out.paths.push(cur); i++; continue;
    }
    if (t === "popd") { cur = null; out.unresolved.push(t); continue; }
    if (t.startsWith("-") || /^[a-z][a-z0-9+.-]*:\/\//i.test(t)) continue;
    if (cur == null) { if (/[/~]|^\.\.?$/.test(t)) out.unresolved.push(t); continue; }
    const base = t.split(/[*?]/)[0];
    out.paths.push(res(base === t ? t : (base.endsWith("/") ? base : path.dirname(base)) || "."));
  }
  if (out.recursive && cur) out.paths.push(cur);
  return out;
}
/** {deny, why} for one tool call. */
const WRITERS = ["Write", "Edit", "MultiEdit", "NotebookEdit"];
export function accessDecision({ tool, input = {}, cwd = process.cwd() }, R) {
  const text = WRITERS.includes(tool) ? "" : JSON.stringify(input ?? {});
  if (DENY_WORDS.test(text)) return { deny: true, why: "names a hidden-test file" };
  const at = (f) => path.resolve(cwd, String(f).replace(/^~(?=\/|$)/, os.homedir()));
  for (const k of ["file_path", "path", "notebook_path"]) {
    const f = input?.[k]; if (typeof f !== "string" || !f) continue;
    const why = closed(at(f), R); if (why) return { deny: true, why };
  }
  if (tool === "Glob" || tool === "Grep") {
    const root = at(typeof input?.path === "string" && input.path ? input.path : ".");
    const pat = typeof input?.pattern === "string" ? input.pattern : "";
    const base = tool === "Glob" && pat ? path.resolve(root, pat.split(/[*?[{]/)[0].replace(/[^/]*$/, "") || ".") : root;
    for (const b of [root, base]) { const why = closed(b, R); if (why) return { deny: true, why }; if (above(b, R)) return { deny: true, why: "a search over a folder that holds the benchmark's area" }; }
    if (tool === "Grep" && typeof input?.glob === "string" && /(^|\/)\.\.(\/|$)|^\//.test(input.glob)) return { deny: true, why: "a search glob that leaves your directory" };
  }
  if (tool === "Bash" && typeof input?.command === "string") {
    const b = bashReach(input.command, cwd || process.cwd());
    if (b.unresolved.length) return { deny: true, why: `a path the hook cannot resolve (${b.unresolved[0].slice(0, 60)}): spell paths out, inside your own directory` };
    for (const p of b.paths) { const why = closed(p, R); if (why) return { deny: true, why }; if (b.recursive && above(p, R)) return { deny: true, why: "a recursive command over a folder that holds the benchmark's area" }; }
  }
  return { deny: false };
}
export const DENY_TEXT = "Benchmark harness: this path is outside your work (the orderer's hidden tests, the operator's logs, another team's or another game's files). Work in your own directory, with paths spelled out.";
/** One access-log line: every tool call of every arm, allowed or denied. */
export function accessNote(P, { arm, game, sid, tool, input, cwd, d }) {
  const what = input?.command ?? input?.file_path ?? input?.path ?? input?.pattern ?? input?.notebook_path ?? "";
  append(P.access, { arm, game, sid: sid ?? null, tool, cwd, what: String(what).slice(0, 300), deny: d.deny, ...(d.deny ? { why: d.why } : {}) });
}

// ---------------------------------------------------------------- state readers
export function readState(live) {
  for (let i = 0; i < 5; i++) { try { return JSON.parse(fs.readFileSync(path.join(live, "state.json"), "utf8")); } catch { spawnSync("sleep", ["0.2"]); } }
  return null;
}
const mapVals = (m) => (m?.__map ?? []).map(([, v]) => v);
export const orderOf = (st, game) => mapVals(st?.engine?.orders).find((o) => o.task === game) ?? null;
const eventsOf = (st) => st?.log?.events ?? [];
const TERMINAL = ["done", "cancelled", "parked"];
const catOf = (f) => String(f).split(":")[0];
const classOf = (line) => (String(line).match(/^(?:[-*•]\s*)?(?:failed:\s*)?([A-Za-z][\w ./-]{0,40}?)\s*(?::|—|–| - |\s\()/) ?? [])[1]?.trim().toLowerCase() ?? null;

// ---------------------------------------------------------------- the observer
/** One pass: each history entry the order gained since the last pass gets a snapshot of the workdir and the hidden
 *  score of that snapshot (the version that stage signed), in <opdir>/observe.jsonl. The arm never sees any of it. */
export function observe(P, arm, game) {
  const live = P.live(arm, game), od = P.opdir(arm, game), log = path.join(od, "observe.jsonl");
  const st = readState(live), o = orderOf(st, game);
  if (!o) return { order: null, new: 0 };
  const seen = readJsonl(log), have = new Set(seen.filter((x) => x.i != null).map((x) => x.i)), byHash = new Map(seen.filter((x) => x.hash && x.hidden).map((x) => [`${x.hash}:${x.phase ?? "post"}`, x.hidden]));
  const work = o.workdir ?? path.join(live, "work", game);
  // v2: a version is scored with the suite the arm was working to when that stage signed: pre until the Change Notice
  // was delivered, post after (the same rule as V's: the pre-notice suite scores only what came before the notice)
  const phase = noticeState(od).delivered ? "post" : "pre";
  let n = 0;
  for (let i = 0; i < o.history.length; i++) {
    if (have.has(i)) continue;
    const h = o.history[i], hash = gameHash(work);
    let snap = null, score = hash ? byHash.get(`${hash}:${phase}`) : null;
    if (hash && !score) {
      snap = path.join(od, "snaps", `${String(i).padStart(2, "0")}-${h.stage}-${h.verdict ?? "x"}`);
      fs.cpSync(work, snap, { recursive: true, filter: (s) => !/node_modules|\/\.claude(\/|$)/.test(s) });
      const r = hidden(P, game, snap, phase);
      score = r.error ? { error: r.error } : { pass: r.pass, total: r.total, rate: r.rate, failing: r.failing };
      byHash.set(`${hash}:${phase}`, score);
    }
    const findings = h.findings ? String(h.findings).split("\n").filter(Boolean) : [];
    append(log, { i, stage: h.stage, by: h.by, verdict: h.verdict ?? null, at: h.t, hash, phase, snap, hidden: score, classes: [...new Set(findings.map(classOf).filter(Boolean))], findings: findings.slice(0, 40) });
    n++;
  }
  return { order: o.id, stage: o.stage, new: n, terminal: TERMINAL.includes(o.stage) };
}

// ---------------------------------------------------------------- place
function placeArm(P, opt) {
  const arm = opt.arm, game = opt.game;
  if (!["H", "HSI"].includes(arm) || !GAMES.includes(game)) throw new Error("place takes --arm=H|HSI --game=G1|G2|G3 (V runs from vanilla-game.mjs)");
  const live = P.live(arm, game), od = P.opdir(arm, game);
  if (fs.existsSync(live)) throw new Error(`${live} exists: one live dir per (arm, game); move it aside to place again`);
  if (fs.existsSync(od) && fs.readdirSync(od).length) throw new Error(`${od} exists: the operator's records of an earlier placement`);
  for (const f of [P.runner, P.spec(game), P.notice(game), P.visible(game), P.visibleNotice(game), path.join(P.hidden, game, "acc.test.mjs"), path.join(P.hidden, game, "golden.pre.json"), path.join(P.hidden, game, "golden.post.json"), path.join(P.proto, "meta.mjs"), path.join(P.proto, "launcher", "launch.mjs")]) if (!fs.existsSync(f)) throw new Error(`missing ${f}`);
  // the protocol's order: Gn after the same arm's G(n-1) has ended (and, for HSI, its retro ran: the playbook is in the store)
  const k = GAMES.indexOf(game);
  if (k > 0 && !opt["out-of-order"]) {
    const prev = GAMES[k - 1], ps = readState(P.live(arm, prev)), po = orderOf(ps, prev);
    if (!po || !TERMINAL.includes(po.stage)) throw new Error(`${arm} ${prev} has not ended (${po?.stage ?? "not placed"}): the arms run G1, G2, G3 in order (--out-of-order to override, recorded)`);
    if (arm === "HSI" && !ps?.data?.learn?.closed) throw new Error(`HSI ${prev}'s run is not closed (its retro or evidence is pending): the playbook would miss it`);
  }
  const specFile = path.join(P.proto, "specs", SPEC_OF[arm]), spec = JSON.parse(fs.readFileSync(specFile, "utf8"));
  if ((arm === "H") === !!spec.learn) throw new Error(`${SPEC_OF[arm]}: ${arm === "H" ? "H has no playbook" : "HSI needs learn"}`);
  let vars = null;
  if (arm === "HSI") {
    const ev = readJsonl(path.join(P.store, "evidence.jsonl"));
    if (k === 0 && fs.existsSync(P.store) && fs.readdirSync(P.store).length) throw new Error(`${P.store} is not empty: HSI's G1 starts from an empty playbook`);
    if (k > 0 && !GAMES.slice(0, k).every((g) => ev.some((e) => e.task === g)) && !opt["out-of-order"]) throw new Error(`${P.store} has no evidence for ${GAMES.slice(0, k).filter((g) => !ev.some((e) => e.task === g)).join(", ")}`);
    fs.mkdirSync(P.store, { recursive: true });
    vars = { playbook_store: P.store };
  } else if (fs.existsSync(path.join(P.arm("H"), "playbook-store"))) throw new Error("H has a playbook store: H never learns");
  const specText = fs.readFileSync(P.spec(game), "utf8");
  fs.mkdirSync(live, { recursive: true }); fs.mkdirSync(od, { recursive: true });
  const env = { ...process.env, META_LIVE_DIR: live };
  for (const x of ["META_ROLE", "META_LAUNCH", "NODE_TEST_CONTEXT", "META_STATE"]) delete env[x];
  const cli = (...a) => { const r = spawnSync(process.execPath, [path.join(P.proto, "meta.mjs"), ...a], { env, encoding: "utf8" }); if (r.status !== 0) throw new Error(`meta.mjs ${a[0]} ${a[1] ?? ""}: ${r.stderr || r.stdout}`); return JSON.parse(r.stdout); };
  const salt = typeof opt["sample-salt"] === "string" && opt["sample-salt"] ? opt["sample-salt"] : null;
  cli("init", `--spec-file=${specFile}`, ...(vars ? [`--vars=${JSON.stringify(vars)}`] : []), ...(salt ? [`--sample-salt=${salt}`] : []));
  const acceptText = `${specText.trimEnd()}\n\n---\nacceptance: after the external evaluation, code runs the orderer's hidden acceptance suite on game.mjs in your workdir (the orderer's runner; no agent runs it or reads its tests). A failure comes back as a revise naming only the failing categories, one line each: \`<category>: <f> of <t> tests fail\`.`;
  const acceptCmd = ["node", SELF, "accept", `--game=${game}`, "--dir=${workdir}", `--b7=${P.b7}`, `--log=${path.join(od, "accept.jsonl")}`];
  const budget = Number(opt.budget ?? DEFAULT_BUDGET);
  const o = cli("order", "new", "--by=founder", "--to=lead", `--title=${game}: ${gameTitle(specText)}`, `--task=${game}`, `--accept=${acceptText}`, `--accept-cmd=${JSON.stringify(acceptCmd)}`, `--budget=${budget}`);
  if (o.stage !== "build") throw new Error(`order ${o.order} is at ${o.stage}, not build (a budget hold?)`);
  const work = path.join(live, "work", game);
  fs.mkdirSync(work, { recursive: true });
  fs.writeFileSync(path.join(work, "SPEC.md"), specText);
  const visibleSha = placeVisible(P, game, work); // v2: the visible sample of the hidden suite, as every arm gets it
  // the access hook, as the sessions' project settings (the launcher runs them in <live>/kernel with --setting-sources=project)
  const hookCmd = [process.execPath, SELF, "hook", `--arm=${arm}`, `--game=${game}`, `--b7=${P.b7}`, `--runs=${P.runs}`, `--proto=${P.proto}`].map((x) => `'${x.replace(/'/g, "'\\''")}'`).join(" ");
  fs.mkdirSync(path.join(live, "kernel", ".claude"), { recursive: true });
  fs.writeFileSync(path.join(live, "kernel", ".claude", "settings.json"), JSON.stringify({ hooks: { PreToolUse: [{ matcher: "*", hooks: [{ type: "command", command: hookCmd, timeout: 15 }] }] } }, null, 1) + "\n");
  const git = spawnSync("git", ["-C", P.proto, "rev-parse", "HEAD"], { encoding: "utf8" }).stdout.trim() || null;
  const manifest = { arm, game, spec: SPEC_OF[arm], specSha: sha(specText), order: o.order, budget, b7: P.b7, runs: P.runs, store: vars?.playbook_store ?? null, storeRulesAtStart: arm === "HSI" ? activeRuleIds(P.store) : null, kernelHead: git, placedAt: new Date().toISOString(), outOfOrder: !!opt["out-of-order"], sampleSalt: salt, visibleSha, noticeSha: sha(fs.readFileSync(P.notice(game), "utf8")) };
  fs.writeFileSync(path.join(od, "manifest.json"), JSON.stringify(manifest, null, 1) + "\n");
  return { ...manifest, live, run: `node ${SELF} run --arm=${arm} --game=${game}`, launcher: launcherArgv(P, arm, game, {}).join(" ") };
}
function activeRuleIds(store) { try { return JSON.parse(fs.readFileSync(path.join(store, "playbook.json"), "utf8")).rules.filter((r) => r.status === "active").map((r) => r.id); } catch { return []; } }

function launcherArgv(P, arm, game, opt) {
  return [process.execPath, path.join(P.proto, "launcher", "launch.mjs"), `--live=${P.live(arm, game)}`, "--setting-sources=project", `--max-parallel=${opt["max-parallel"] ?? 2}`, `--max-min=${opt["max-min"] ?? GAME_MIN}`, ...(opt.model ? [`--model=${opt.model}`] : [])];
}

/** v2, PROTOCOL.md "The Change Notice": once the first accept run has scored the pre-notice suite (accept exits 3, so
 *  the order is held at accept as a stage error and nothing is signed), the harness, acting as the founder, appends the
 *  notice to SPEC.md, adds its visible tests, parks the order and resumes it to build with NOTICE_POINTER as the reason
 *  (the builder's revise findings). Parking and resuming to an earlier stage costs no loop (lib.mjs resume: the loop the
 *  return to build counts is granted back), as V's notice turn costs none of its 3 feedback rounds. Idempotent, and
 *  safe to call on every observer pass. */
export function deliverNoticeMeta(P, arm, game) {
  const live = P.live(arm, game), od = P.opdir(arm, game), ns = noticeState(od);
  if (!ns.due || ns.delivered) return null;
  const o = orderOf(readState(live), game);
  if (!o) return null;
  const env = { ...process.env, META_LIVE_DIR: live }; for (const x of ["META_ROLE", "META_LAUNCH", "NODE_TEST_CONTEXT"]) delete env[x];
  const cli = (...a) => spawnSync(process.execPath, [path.join(P.proto, "meta.mjs"), ...a], { env, encoding: "utf8" });
  const work = o.workdir ?? path.join(live, "work", game);
  if (!ns.parked) {
    if (o.stage !== "accept" || o.stageError?.stage !== "accept") return null; // the accept's stage error is not in yet
    const files = deliverNoticeFiles(P, game, work);
    const r = cli("order", "park", o.id, "--by=founder", `--reason=Change Notice ${game}-N1: the orderer changes the requirements after the first hand-in`);
    append(path.join(od, "operator.jsonl"), { act: "notice-park", order: o.id, ok: r.status === 0, ...files, out: String(r.stdout || r.stderr).slice(0, 400) });
    if (r.status !== 0) return { error: "park refused" };
    setNotice(od, { parked: new Date().toISOString(), ...files });
  }
  const r2 = cli("order", "resume", o.id, "--by=founder", "--to=build", `--reason=${NOTICE_POINTER(game)}`);
  append(path.join(od, "operator.jsonl"), { act: "notice-resume", order: o.id, ok: r2.status === 0, out: String(r2.stdout || r2.stderr).slice(0, 400) });
  if (r2.status !== 0) return { error: "resume refused" };
  setNotice(od, { delivered: new Date().toISOString() });
  return { delivered: o.id };
}

/** PROTOCOL.md "Stops": an order parked at the loop cap, stopped at its budget, or still open when the launcher stopped
 *  at the game's wall clock (B7 review: that order was neither parked nor at budget, so it stayed open, HSI had no
 *  evidence or retro, and the next game's place refused), is cancelled by the harness acting as the founder (a rule
 *  fixed before the run, never a judgment): its last version is the arm's final, and a cancelled order is an ended
 *  one, so HSI's evidence and retro still run (a parked order is not ended for learn). */
export function endIfStopped(P, arm, game, { launcherStopped = null } = {}) {
  const live = P.live(arm, game), o = orderOf(readState(live), game);
  if (!o || TERMINAL.slice(0, 2).includes(o.stage)) return null;
  const ns = noticeState(P.opdir(arm, game)); if (ns.parked && !ns.delivered) return null; // the notice's own park, resumed on the next pass
  const why = o.stage === "parked" ? `parked: ${String(o.parked?.reason ?? "").slice(0, 200)}` : o.budgetHold?.ask ? `budget: ${o.spent} of ${o.budget} tokens` : launcherStopped ? `wall clock: ${launcherStopped}` : null;
  if (!why) return null;
  const env = { ...process.env, META_LIVE_DIR: live }; for (const x of ["META_ROLE", "META_LAUNCH", "NODE_TEST_CONTEXT"]) delete env[x];
  const r = spawnSync(process.execPath, [path.join(P.proto, "meta.mjs"), "order", "cancel", o.id, "--by=founder", `--reason=B7 protocol stop (${why}): the last version is the arm's final`], { env, encoding: "utf8" });
  append(path.join(P.opdir(arm, game), "operator.jsonl"), { act: "cancel", order: o.id, why, ok: r.status === 0, out: String(r.stdout || r.stderr).slice(0, 400) });
  return { cancelled: o.id, why, ok: r.status === 0 };
}

const learnOpen = (st) => !!st?.data?.learn && (!st.data.learn.closed || st.data.learn.retros?.some((x) => x.state === "open"));
async function runArm(P, opt) {
  const { arm, game } = opt, live = P.live(arm, game), od = P.opdir(arm, game);
  if (!fs.existsSync(path.join(live, "state.json"))) throw new Error(`${live} is not placed: node ${SELF} place --arm=${arm} --game=${game}`);
  const argv = launcherArgv(P, arm, game, opt);
  if (opt["dry-run"]) return { dry: true, launcher: argv, observe: observe(P, arm, game) };
  const env = { ...process.env }; for (const x of ["META_ROLE", "META_LAUNCH", "NODE_TEST_CONTEXT", "CLAUDECODE"]) delete env[x];
  const poll = Number(opt.poll ?? 3) * 1000, t0 = Date.now();
  const launch = async (a) => {
    const out = fs.openSync(path.join(od, "launcher.out"), "a");
    const child = spawn(a[0], a.slice(1), { env, stdio: ["ignore", out, out] });
    let exited = false; child.on("exit", () => { exited = true; });
    while (!exited) { observe(P, arm, game); deliverNoticeMeta(P, arm, game); endIfStopped(P, arm, game); await new Promise((r) => setTimeout(r, poll)); }
    observe(P, arm, game);
  };
  await launch(argv);
  // the launcher stopped (its --max-min, the game's wall clock) with the order still open: the protocol's stop
  const stop = endIfStopped(P, arm, game, { launcherStopped: `the launcher stopped after ${Math.round((Date.now() - t0) / 60000)} min (--max-min=${opt["max-min"] ?? GAME_MIN})` });
  // HSI: the cancelled order's evidence and the lead's retro still run, in a short launcher of their own
  if (arm === "HSI" && learnOpen(readState(live))) {
    append(path.join(od, "operator.jsonl"), { act: "retro-launch", why: stop ? "after a wall-clock stop" : "the run's learn step is still open" });
    await launch(launcherArgv(P, arm, game, { ...opt, "max-min": 30 }));
  }
  return tally(P, { arm })[0]?.games?.find((g) => g.game === game) ?? null;
}

// ---------------------------------------------------------------- tally
/** Cost of a set of launches, one Agent SDK session counted once: a resumed session's result carries the session's
 *  running total (SDK: "a resumed or forked session continues from the total its transcript saved"), so summing every
 *  launch's cost (the launcher's summary) counts a warm session's earlier work again on each resume. */
export function dedupCost(fins) {
  const by = new Map(); let free = { cost: 0, cumulative: 0 };
  for (const f of fins) {
    if (!f.sdk) { free.cost += f.cost ?? 0; free.cumulative += f.cumulative ?? 0; continue; }
    const s = by.get(f.sdk) ?? { base: { cost: 0, cumulative: 0 }, last: { cost: 0, cumulative: 0 } };
    if ((f.cost ?? 0) < s.last.cost) { s.base.cost += s.last.cost; s.base.cumulative += s.last.cumulative; } // the total restarted
    s.last = { cost: f.cost ?? 0, cumulative: f.cumulative ?? 0 };
    by.set(f.sdk, s);
  }
  let cost = free.cost, cumulative = free.cumulative;
  for (const s of by.values()) { cost += s.base.cost + s.last.cost; cumulative += s.base.cumulative + s.last.cumulative; }
  return { cost: Number(cost.toFixed(4)), cumulative, naive: Number(fins.reduce((a, f) => a + (f.cost ?? 0), 0).toFixed(4)), sdkSessions: by.size };
}
const pct = (x) => (x == null ? null : Math.round(x * 1000) / 10);
const minutesBetween = (a, b) => (a && b ? Math.round((Date.parse(b) - Date.parse(a)) / 600) / 100 : null);

function tallyMeta(P, arm, game) {
  const live = P.live(arm, game), od = P.opdir(arm, game);
  const st = readState(live); if (!st) return null;
  const o = orderOf(st, game), ev = eventsOf(st);
  const L = readJsonl(path.join(live, "launches.jsonl")), fins = L.filter((x) => x.event === "finish");
  const acc = readJsonl(path.join(od, "accept.jsonl")), obs = readJsonl(path.join(od, "observe.jsonl"));
  const c = dedupCost(fins);
  const byRole = {}; for (const f of fins) { const r = (byRole[f.role] ??= { launches: 0, cold: 0, resumed: 0 }); r.launches++; f.resumed ? r.resumed++ : r.cold++; }
  const fallbacks = L.filter((x) => x.event === "warm-fallback").length;
  // v2: the first accept run is scored with the pre-notice suite (the first hand-in); every later one with the post-notice
  // suite. rounds counts the post-notice runs after the first (the feedback rounds, as V's)
  const accRuns = acc.filter((x) => x.total != null), preAcc = accRuns.filter((x) => x.phase === "pre"), postAcc = accRuns.filter((x) => x.phase !== "pre");
  const firstAcc = preAcc[0] ?? accRuns[0] ?? null, lastAcc = postAcc.at(-1) ?? null, lastObs = [...obs].reverse().find((x) => x.hidden?.total != null && x.phase !== "pre") ?? null;
  const ns = noticeState(od);
  const builds = obs.filter((x) => x.stage === "build" && x.by !== "code" && x.hidden?.total != null);
  const evals = obs.filter((x) => x.stage === "eval" && x.by !== "code");
  const evalRows = evals.map((e) => {
    const failing = (e.hidden?.failing ?? []).map(catOf);
    return { verdict: e.verdict, classes: e.classes, hiddenFailing: failing, exactMatch: e.classes.filter((k) => failing.includes(k)), unmatched: e.classes.filter((k) => !failing.includes(k)), missed: failing.filter((k) => !e.classes.includes(k)), findings: e.findings };
  });
  const sc = ev.filter((e) => e.type === "self-check" && e.order === o?.id);
  const hist = o?.history ?? [];
  const revises = {}; for (const h of hist) if (h.verdict === "revise") revises[h.stage] = (revises[h.stage] ?? 0) + 1;
  const up = L.find((x) => x.event === "launcher-up")?.t ?? null, end = L.findLast((x) => x.event === "summary")?.t ?? L.at(-1)?.t ?? null;
  const learnEv = ev.filter((e) => e.type?.startsWith("learn-"));
  return {
    arm, game, order: o?.id ?? null, stage: o?.stage ?? null, loops: o?.loops ?? null,
    firstHandin: firstAcc ? { pass: firstAcc.pass, total: firstAcc.total, pct: pct(firstAcc.rate), failing: firstAcc.failing } : lastObs ? { pass: lastObs.hidden.pass, total: lastObs.hidden.total, pct: pct(lastObs.hidden.rate), failing: lastObs.hidden.failing, note: "no accept run: the last observed version" } : null,
    final: lastAcc && (!lastObs || lastObs.hash === lastAcc.hash) ? { pass: lastAcc.pass, total: lastAcc.total, pct: pct(lastAcc.rate), failing: lastAcc.failing } : lastObs ? { pass: lastObs.hidden.pass, total: lastObs.hidden.total, pct: pct(lastObs.hidden.rate), failing: lastObs.hidden.failing } : null,
    firstBuild: builds[0] ? { pass: builds[0].hidden.pass, total: builds[0].hidden.total, pct: pct(builds[0].hidden.rate) } : null,
    afterNotice: postAcc[0] ? { pass: postAcc[0].pass, total: postAcc[0].total, pct: pct(postAcc[0].rate), failing: postAcc[0].failing } : null,
    notice: { due: ns.due ?? null, delivered: ns.delivered ?? null },
    rounds: Math.max(0, postAcc.length - 1), acceptRuns: accRuns.length, revises,
    cost: c.cost, costNaive: c.naive, cumulative: c.cumulative,
    minutes: minutesBetween(up, end), leadMin: o && hist.length ? Math.round((hist.at(-1).t - o.created) * 100) / 100 : null,
    sessions: c.sdkSessions + fins.filter((f) => !f.sdk).length, launches: fins.length, cold: fins.filter((f) => !f.resumed).length + fallbacks, resumes: fins.filter((f) => f.resumed).length - fallbacks, warmFallbacks: fallbacks, byRole,
    selfChecks: { n: sc.length, failed: sc.filter((e) => !e.pass).length },
    eval: { runs: hist.filter((h) => h.stage === "eval" && h.by !== "code").length, observed: evals.length, sampledOut: hist.filter((h) => h.verdict === "sampled-out").length, rows: evalRows, falsePasses: evalRows.filter((r) => r.verdict === "pass" && r.hiddenFailing.length).length },
    playbook: arm === "HSI" ? { rulesAtStart: learnEv.find((e) => e.type === "learn-init")?.rules ?? null, added: learnEv.filter((e) => e.type === "learn-rule-add").map((e) => ({ rule: e.rule, targets: e.targets, text: e.text })), retired: learnEv.filter((e) => e.type === "learn-rule-retire").map((e) => ({ rule: e.rule, by: e.by, why: e.why })), refused: learnEv.filter((e) => e.type === "learn-refuse").length, scores: learnEv.filter((e) => e.type === "learn-score").map((e) => ({ rule: e.rule, outcome: e.outcome, recurred: e.recurred })) } : null,
    guardDenials: L.filter((x) => x.event === "guard").length,
  };
}
function tallyV(P) {
  const rows = readJsonl(P.vledger);
  return GAMES.map((game) => {
    const r = rows.filter((x) => x.game === game); if (!r.length) return null;
    const hs = r.filter((x) => x.event === "hidden"), s = r.findLast((x) => x.event === "game-summary");
    const turns = r.filter((x) => x.event === "turn");
    const bySid = new Map(); for (const t of turns) bySid.set(t.session, { cost: Math.max(bySid.get(t.session)?.cost ?? 0, t.cost ?? 0), cumulative: Math.max(bySid.get(t.session)?.cumulative ?? 0, t.cumulative ?? 0) });
    const cost = [...bySid.values()].reduce((a, x) => a + x.cost, 0), cumulative = [...bySid.values()].reduce((a, x) => a + x.cumulative, 0);
    const ok = hs.filter((x) => x.total != null), pre = ok.filter((x) => x.phase === "pre"), postH = ok.filter((x) => x.phase !== "pre");
    const f = pre[0] ?? ok[0], l = postH.at(-1), a = postH[0], nv = r.find((x) => x.event === "notice");
    return { arm: "V", game, firstHandin: f ? { pass: f.pass, total: f.total, pct: pct(f.rate), failing: f.failing } : null, afterNotice: a ? { pass: a.pass, total: a.total, pct: pct(a.rate), failing: a.failing } : null, notice: { delivered: nv?.t ?? null }, final: l ? { pass: l.pass, total: l.total, pct: pct(l.rate), failing: l.failing } : null, rounds: Math.max(0, postH.length - 1), acceptRuns: ok.length, cost: Number(cost.toFixed(4)), cumulative, minutes: s?.minutes ?? minutesBetween(r[0].t, r.at(-1).t), sessions: bySid.size, launches: turns.length, cold: bySid.size, resumes: turns.length - bySid.size, done: !!s };
  }).filter(Boolean);
}
/** HSI: did a rule added after game k target a category that failed in a later game's first hand-in? */
function ruleTargeting(games) {
  const out = [];
  games.forEach((g, k) => { for (const r of g.playbook?.added ?? []) {
    const later = games.slice(k + 1).map((h) => ({ game: h.game, failedFirst: (h.firstHandin?.failing ?? []).map(catOf).filter((x) => r.targets.includes(x)) }));
    out.push({ rule: r.rule, addedAfter: g.game, targets: r.targets, later });
  } });
  return out;
}
export function tally(P, opt = {}) {
  const arms = opt.arm ? [opt.arm] : ARMS;
  return arms.map((arm) => {
    const games = arm === "V" ? tallyV(P) : GAMES.map((g) => (fs.existsSync(P.live(arm, g)) ? tallyMeta(P, arm, g) : null)).filter(Boolean);
    return { arm, games, ...(arm === "HSI" ? { ruleTargeting: ruleTargeting(games) } : {}) };
  });
}
function tallyMd(T) {
  const L = ["| arm | game | first hand-in (pre-notice) | after the notice | final | rounds | loops | cost $ (naive) | min | sessions | cold / resumed | self-checks (failed) | eval runs / false passes |", "|---|---|---|---|---|---|---|---|---|---|---|---|---|"];
  const f = (x) => (x ? `${x.pass}/${x.total} (${x.pct}%)` : "-");
  for (const a of T) for (const g of a.games) L.push(`| ${a.arm} | ${g.game} | ${f(g.firstHandin)} | ${f(g.afterNotice)} | ${f(g.final)} | ${g.rounds} | ${g.loops ?? "-"} | ${g.cost}${g.costNaive != null && g.costNaive !== g.cost ? ` (${g.costNaive})` : ""} | ${g.minutes ?? "-"} | ${g.sessions} | ${g.cold} / ${g.resumes} | ${g.selfChecks ? `${g.selfChecks.n} (${g.selfChecks.failed})` : "-"} | ${g.eval ? `${g.eval.runs} / ${g.eval.falsePasses}` : "-"} |`);
  return L.join("\n");
}

// ---------------------------------------------------------------- audit
/** The audit's canaries. `content`: strings only the hidden material holds, none of which the specs contain: the
 *  suite's test names (24+ characters) and identifiers, and (B7 review: reading the reference was invisible to the
 *  audit) the references' and engine's own identifiers and long string literals. `paths`: the harness's paths, which
 *  a Meta arm can see without reading anything hidden (its own state.json holds the accept command, and the accept
 *  label names setup.mjs): reported as seen, never a leak (B7 review: they made a false NOT clean). */
export function canaries(P) {
  // v2: the hidden suite is golden data (case names, inputs, masked outputs) replayed by suite.mjs; the reference is the
  // shared engine and each game's world. What every arm is given (the specs, the notices, the visible tests) is never a
  // canary, so a string an arm could have read in its own directory never flags a leak.
  const read = (f) => { try { return fs.readFileSync(f, "utf8"); } catch { return ""; } };
  const ls = (d) => { try { return fs.readdirSync(d).map((f) => path.join(d, f)); } catch { return []; } };
  const given = [...GAMES.flatMap((g) => [P.spec(g), P.notice(g), ...ls(P.visible(g)), ...ls(P.visibleNotice(g))]), path.join(P.b7, "specs", "API.md")].map(read).join("\n");
  const content = new Set(), paths = new Set([P.b7, real(P.b7), P.op, "run-hidden", "acc.test.mjs"]);
  for (const g of GAMES) for (const ph of ["pre", "post"]) {
    let j = null; try { j = JSON.parse(read(path.join(P.hidden, g, `golden.${ph}.json`))); } catch {}
    for (const c of j?.cases ?? []) if (c.name.length >= 24 && !given.includes(c.name)) content.add(c.name);
  }
  const code = [...GAMES.flatMap((g) => [path.join(P.hidden, g, "cases.mjs"), path.join(P.hidden, g, "world.mjs")]), ...["engine.mjs", "casegen.mjs", "suite.mjs"].map((f) => path.join(P.hidden, "common", f)), path.join(P.hidden, "build-golden.mjs")];
  for (const f of code) {
    const t = read(f);
    for (const m of t.matchAll(/\b(?:const|function|let|class)\s+([A-Za-z_][\w]{7,})/g)) if (!given.includes(m[1]) && /[A-Z_]/.test(m[1])) content.add(m[1]);
    for (const m of t.matchAll(/"([A-Z][A-Za-z ,.'!?;-]{39,})"/g)) if (!given.includes(m[1]) && m[1].split(" ").length >= 7) content.add(m[1]); // prose the reference prints (free wording)
  }
  return { content: [...content], paths: [...paths] };
}
/** B7 review (cross-arm reads left no canary): lines of 50+ characters, not in the spec, that two arms' final games
 *  of the same game share. Reported for the operator to read, never a verdict by itself. */
function sharedLines(P) {
  const out = [];
  for (const g of GAMES) {
    let spec = ""; try { spec = fs.readFileSync(P.spec(g), "utf8"); } catch {}
    const files = { V: path.join(P.live("V", g), "game.mjs"), H: path.join(P.live("H", g), "shipped", g, "game.mjs"), HSI: path.join(P.live("HSI", g), "shipped", g, "game.mjs") };
    for (const a of ["H", "HSI"]) if (!fs.existsSync(files[a])) files[a] = path.join(P.live(a, g), "work", g, "game.mjs");
    const lines = Object.fromEntries(Object.entries(files).map(([a, f]) => { try { return [a, new Set(fs.readFileSync(f, "utf8").split("\n").map((l) => l.trim()).filter((l) => l.length >= 50 && !spec.includes(l)))]; } catch { return [a, new Set()]; } }));
    for (const [a, b] of [["V", "H"], ["V", "HSI"], ["H", "HSI"]]) { const n = [...lines[a]].filter((l) => lines[b].has(l)).length; if (n) out.push({ game: g, arms: `${a}+${b}`, sharedLines: n }); }
  }
  return out;
}
/** v2: the game may not read files or its environment (A1.1). The hidden runner lets the test process read the suite's
 *  own copy (its golden file included), so a game that reads files could look its answers up: the audit lists every
 *  arm's final .mjs files that touch the file system, the environment or load code at run time, for the operator. */
function gameFileAccess(P) {
  const out = [];
  const RE = /\bnode:fs\b|from\s+["']fs(\/promises)?["']|require\(\s*["']fs|\breadFileSync\b|\bopenSync\b|process\.env|process\.argv|\bimport\s*\(|\bcreateRequire\b|node:child_process|node:worker_threads|node:module\b/;
  for (const g of GAMES) for (const a of ARMS) {
    const dirs = a === "V" ? [P.live("V", g)] : [path.join(P.live(a, g), "shipped", g), path.join(P.live(a, g), "work", g)];
    const dir = dirs.find((d) => fs.existsSync(path.join(d, "game.mjs"))); if (!dir) continue;
    const hits = [];
    const walk = (d) => { for (const f of fs.readdirSync(d, { withFileTypes: true })) { const p = path.join(d, f.name); if (f.isDirectory()) { if (!["node_modules", "visible-tests", ".claude"].includes(f.name)) walk(p); } else if (/\.m?js$/.test(f.name) && !/\.test\.m?js$/.test(f.name)) { const t = fs.readFileSync(p, "utf8"); const m = RE.exec(t); if (m) hits.push(`${path.relative(dir, p)}: ${m[0]}`); } } };
    try { walk(dir); } catch {}
    if (hits.length) out.push({ arm: a, game: g, hits });
  }
  return out;
}
function transcriptOf(sid) {
  const roots = [process.env.CLAUDE_CONFIG_DIR, path.join(os.homedir(), ".claude")].filter(Boolean).map((r) => path.join(r, "projects"));
  for (const r of roots) { let ds = []; try { ds = fs.readdirSync(r); } catch { continue; } for (const d of ds) { const f = path.join(r, d, `${sid}.jsonl`); if (fs.existsSync(f)) return f; } }
  return null;
}
export function audit(P) {
  const acc = readJsonl(P.access), C = canaries(P), can = [...C.content, ...C.paths], isPath = new Set(C.paths);
  const sessions = [];
  for (const arm of ["H", "HSI"]) for (const g of GAMES) for (const f of readJsonl(path.join(P.live(arm, g), "launches.jsonl")).filter((x) => x.event === "finish" && x.sdk)) sessions.push({ arm, game: g, sid: f.sdk, role: f.role });
  for (const t of readJsonl(P.vledger).filter((x) => x.event === "turn" && x.session)) sessions.push({ arm: "V", game: t.game, sid: t.session, role: "vanilla" });
  const uniq = [...new Map(sessions.map((s) => [s.sid, s])).values()];
  const rows = uniq.map((s) => {
    const logged = acc.filter((a) => a.sid === s.sid), file = transcriptOf(s.sid);
    // in transcript order: a canary the session wrote first (its own test of the same name, printed back by node
    // --test) is its own; one that first reaches it in a tool result is a leak; one only in its calls is an attempt
    let seen = [], tried = [], paths = [];
    const own = new Set();
    if (file) for (const line of fs.readFileSync(file, "utf8").split("\n")) {
      if (!line) continue; let m; try { m = JSON.parse(line); } catch { continue; }
      const content = m?.message?.content; if (!Array.isArray(content)) continue;
      for (const c of content) {
        const text = c.type === "tool_result" ? JSON.stringify(c.content ?? "") : c.type === "tool_use" ? JSON.stringify(c.input ?? {}) : null;
        if (text == null) continue;
        for (const k of can) if (text.includes(k)) {
          if (c.type === "tool_use") { if (isPath.has(k)) tried.push(k.slice(0, 80)); else own.add(k); }
          else if (isPath.has(k)) paths.push(k.slice(0, 80));
          else if (!own.has(k)) seen.push(k.slice(0, 80));
        }
      }
    }
    return { ...s, hookCalls: logged.length, denials: logged.filter((a) => a.deny).map((a) => `${a.tool}: ${a.what.slice(0, 120)} (${a.why})`), transcript: file, seenCanaries: [...new Set(seen)], triedCanaries: [...new Set(tried)], pathsSeen: [...new Set(paths)] };
  });
  return {
    canaries: C.content.length, pathCanaries: C.paths.length, sessions: rows.length,
    hookMissing: rows.filter((r) => !r.hookCalls).map((r) => `${r.arm} ${r.game} ${r.role} ${r.sid}`),
    transcriptMissing: rows.filter((r) => !r.transcript).map((r) => `${r.arm} ${r.game} ${r.role} ${r.sid}`),
    denials: rows.flatMap((r) => r.denials.map((d) => `${r.arm} ${r.game} ${r.role}: ${d}`)),
    leaks: rows.filter((r) => r.seenCanaries.length).map((r) => ({ arm: r.arm, game: r.game, role: r.role, sid: r.sid, seen: r.seenCanaries })),
    attempts: rows.filter((r) => r.triedCanaries.length).map((r) => ({ arm: r.arm, game: r.game, role: r.role, sid: r.sid, tried: r.triedCanaries })),
    pathsSeen: rows.filter((r) => r.pathsSeen.length).map((r) => ({ arm: r.arm, game: r.game, role: r.role, sid: r.sid, paths: r.pathsSeen })),
    sharedLines: sharedLines(P),
    gameFileAccess: gameFileAccess(P),
    verdict: rows.length && rows.every((r) => r.hookCalls && r.transcript && !r.seenCanaries.length) ? "clean: every session ran under the hook, and no hidden-test or reference text reached any session (harness paths seen are listed apart)" : "NOT clean: see hookMissing, transcriptMissing and leaks",
  };
}

// ---------------------------------------------------------------- CLI
async function main() {
  const [cmd] = process.argv.slice(2).filter((a) => !a.startsWith("--"));
  const opt = Object.fromEntries(process.argv.slice(2).filter((a) => a.startsWith("--")).map((a) => { const [k, ...v] = a.slice(2).split("="); return [k, v.join("=") || true]; }));
  const P = paths(opt);
  if (cmd === "hook") {
    // fail closed on a benchmark-only path, open on unreadable input (it is a logger first; the audit is the backstop)
    let input = ""; try { input = fs.readFileSync(0, "utf8"); } catch {}
    let j; try { j = JSON.parse(input); } catch { process.exit(0); }
    const d = accessDecision({ tool: j.tool_name, input: j.tool_input, cwd: j.cwd }, accessRules(P, opt.arm, opt.game));
    try { accessNote(P, { arm: opt.arm, game: opt.game, sid: j.session_id, tool: j.tool_name, input: j.tool_input, cwd: j.cwd, d }); } catch {}
    if (d.deny) { process.stderr.write(DENY_TEXT + "\n"); process.exit(2); }
    process.exit(0);
  }
  if (cmd === "accept") {
    if (!GAMES.includes(opt.game) || !opt.dir || !opt.log) { console.error("usage: setup.mjs accept --game=Gn --dir=<workdir> --log=<jsonl>"); process.exit(2); }
    const dir = path.resolve(opt.dir), hash = gameHash(dir), t0 = Date.now(), od = path.dirname(opt.log), ns = noticeState(od);
    // v2: the first hand-in is scored with the pre-notice suite and nothing goes back but the notice (delivered by the
    // observer as the founder: deliverNoticeMeta); exit 3 holds the order at accept as a stage error, signing nothing
    if (ns.due && !ns.delivered) { console.log("# the Change Notice is being delivered: accept waits for it"); process.exit(3); }
    const phase = ns.delivered ? "post" : "pre";
    const r = hidden(P, opt.game, dir, phase);
    if (r.error) { append(opt.log, { game: opt.game, dir, hash, phase, error: r.error }); console.log(r.error); process.exit(3); }
    // the operator's copy of exactly the version this accept judged
    const n = readJsonl(opt.log).length, snap = path.join(path.dirname(opt.log), "snaps", `accept-${n + 1}`);
    try { fs.cpSync(dir, snap, { recursive: true, filter: (s) => !/node_modules|\/\.claude(\/|$)/.test(s) }); } catch {}
    append(opt.log, { game: opt.game, dir, hash, phase, snap, pass: r.pass, fail: r.fail, total: r.total, rate: r.rate, failing: r.failing, categories: r.categories, ms: Date.now() - t0 });
    if (phase === "pre") { setNotice(od, { due: new Date().toISOString(), firstHandin: { pass: r.pass, total: r.total } }); console.log("# the first hand-in is recorded; the orderer issues a Change Notice"); process.exit(3); }
    for (const l of r.lines) console.log(l);
    // the categories this run checked: the specs' findings.checked reads it, so K28 scores a rule only on a game whose
    // suite has its class (B7 dry run 2: G1's padlock rule scored helped on G2); the kernel keeps them as hashes only
    console.log(`checked: ${Object.keys(r.categories).join(", ")}`);
    console.log(r.fail ? `# hidden acceptance: ${r.failing.length} categories fail` : "# hidden acceptance: every category passes");
    process.exit(r.code);
  }
  let out;
  if (cmd === "place") out = placeArm(P, opt);
  else if (cmd === "run") out = await runArm(P, opt);
  else if (cmd === "watch") {
    if (opt.once) { out = observe(P, opt.arm, opt.game); const d = deliverNoticeMeta(P, opt.arm, opt.game); if (d) out = { ...out, notice: d }; }
    else { for (;;) { const r = observe(P, opt.arm, opt.game); deliverNoticeMeta(P, opt.arm, opt.game); endIfStopped(P, opt.arm, opt.game); if (r.terminal && !readState(P.live(opt.arm, opt.game))?.data?.learn?.retros?.some((x) => x.state === "open")) { out = r; break; } await new Promise((res) => setTimeout(res, Number(opt.poll ?? 3) * 1000)); } }
  }
  else if (cmd === "tally") { const T = tally(P, opt); if (opt.md) { console.log(tallyMd(T)); return; } out = T; }
  else if (cmd === "audit") out = audit(P);
  else { console.error("usage: node setup.mjs place|run|watch|accept|hook|tally|audit … (see the header)"); process.exit(2); }
  console.log(JSON.stringify(out, null, 1));
}
if (process.argv[1] && real(process.argv[1]) === real(SELF)) main().catch((e) => { console.error(e.message); process.exit(1); });
