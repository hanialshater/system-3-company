// Shared live state for meta.mjs (the agents' CLI) and supervisor.mjs (the code-only supervisor): the live org, the
// task flow, load/save of the JSON state under an O_EXCL lock, and running a task's tests.
import fs from "node:fs";
import path from "node:path";
import { execFileSync, spawnSync } from "node:child_process";
import { fileURLToPath } from "node:url";
import { Log, Mailbox, Org, Engine, Rooms, DEFAULT_CONFIG, DEFAULT_MAX_LOOPS } from "./lib.mjs";
import { SPECS } from "./specs.mjs";
import { applyFloor } from "./building.mjs";
import { afterStage, gitPins } from "./workspace.mjs";
import { raiseParkAsk } from "./asks.mjs";
import { storeArtifacts, snapshotArtifacts, artifactVars } from "./artifacts.mjs";
export const HERE = path.dirname(fileURLToPath(import.meta.url));
export const LIVE = process.env.META_LIVE_DIR || path.join(HERE, "live");

/** M4 integrate (K8+K9 review): the role of the agent session this process runs in, or null (a person or code at a
 *  terminal). Every `--by` was self-declared, so a builder at its loop cap ran `order resume --by=founder
 *  --extra-loops=10` as often as it liked. The launcher sets META_ROLE in each agent process's environment
 *  (launcher/launch.mjs); everything below that process is the agent's, so the OUTERMOST META_ROLE on the process's
 *  ancestry (/proc/<pid>/environ is the environment a process started with, which its children cannot change) is the
 *  session's role: `META_ROLE=founder node meta.mjs …` and `env -u META_ROLE …` from inside the session change only
 *  the inner ones. Best effort, as the rest of K10: a process the agent detaches from its session's tree (reparented
 *  to init) and starts with a cleared environment is not seen; the guard denies the plain spellings of that. */
export function sessionRole({ env = process.env, proc = "/proc", pid = process.ppid } = {}) {
  let role = env.META_ROLE != null ? env.META_ROLE || "?" : null;
  for (let p = pid, n = 0; p > 1 && n < 128; n++) {
    let st;
    try { st = fs.readFileSync(`${proc}/${p}/status`, "utf8"); } catch { break; }
    try {
      const e = fs.readFileSync(`${proc}/${p}/environ`, "utf8").split("\0").find((x) => x.startsWith("META_ROLE="));
      if (e != null) role = e.slice("META_ROLE=".length) || "?";
    } catch {}
    p = Number((/^PPid:\s*(\d+)/m.exec(st) ?? [])[1] ?? 0);
  }
  return role;
}
/** M6 prep review: whether this process was re-parented to init (its parent died or detached it: `setsid -f`, a double
 *  fork), so sessionRole has no ancestry to read. */
export const detachedProcess = ({ ppid = process.ppid } = {}) => ppid <= 1;
export const STATE = path.join(LIVE, process.env.META_STATE || "state.json");
// K10: with META_KERNEL_ABS set (launcher --workdir-from=order: the agent's cwd is the order's worktree, not the kernel),
// briefs, packs and every meta.mjs/supervisor.mjs output name kernel commands by absolute path (K10 review: the held-order
// note said `node supervisor.mjs retry`, wrong from a worktree); unset, every text is as before. Idempotent.
export const absCmds = (s) => (process.env.META_KERNEL_ABS ? s.replace(/\bnode (meta|supervisor)\.mjs\b/g, (m, f) => `node ${path.join(HERE, `${f}.mjs`)}`) : s);
/** The company's known false claims, kept across runs (benchmark 3): every text order is checked against them. */
export const ESCAPES = process.env.META_ESCAPES || path.join(HERE, "escapes.json");
export const readEscapes = () => (fs.existsSync(ESCAPES) ? JSON.parse(fs.readFileSync(ESCAPES, "utf8")) : []);
export const LOCK = path.join(LIVE, "state.lock");

export const LIVE_ROOMS = [{ id: "lobby", floor: 1 }, { id: "ceo-office", floor: 1 }, { id: "sandbox", floor: 2 }, { id: "quality", floor: 3 }, { id: "launch", floor: 3 }];
export const LIVE_ROLES = [
  { id: "founder", level: "founder", human: true, room: "lobby", floor: 1 },
  { id: "cos", level: "chief-of-staff", reportsTo: "founder", room: "ceo-office", floor: 1 },
  { id: "mgr-live", level: "manager", reportsTo: "cos", lane: "s", room: "sandbox", floor: 2, skills: ["manage"] },
  { id: "toy-builder-1", level: "builder", reportsTo: "mgr-live", lane: "s", room: "sandbox", floor: 2, skills: ["js"] },
  { id: "toy-builder-2", level: "builder", reportsTo: "mgr-live", lane: "s", room: "sandbox", floor: 2, skills: ["js"] },
  { id: "toy-checker", level: "checker", reportsTo: "cos", lane: "q", room: "quality", floor: 3, skills: ["review"] },
  { id: "toy-release", level: "release", reportsTo: "cos", lane: "r", room: "launch", floor: 3, skills: ["release"] },
];
export const TASK_FLOW = {
  stages: [
    { stage: "build", signer: "builder", evidence: ["live/work/<task>/"] },
    { stage: "test1", signer: "code", evidence: [] },
    { stage: "check", signer: "checker", evidence: ["review notes"] },
    { stage: "uat", signer: "orderer", evidence: ["hidden acceptance tests"] },
    { stage: "ship", signer: "release", evidence: ["copied to live/shipped/"] },
  ],
};

export const clock = { now: () => Date.now() / 60000 }; // minutes, to the millisecond (live run 1 used whole minutes: too coarse for agents)

export function make(specName = "toy", specDef = null) {
  // a generated company (M2) keeps its spec in the state; a built-in one is looked up by name
  const spec = specDef ?? SPECS[specName];
  if (!spec) throw new Error(`no company spec ${specName} (have: ${Object.keys(SPECS).join(", ")})`);
  const config = { ...DEFAULT_CONFIG }; // K12 review: one copy per company (a test that set enforce off turned it off for every later make() in the process)
  const log = new Log(clock);
  const mailbox = new Mailbox({ log, clock, config });
  const org = new Org({ log, rooms: spec.rooms, skills: spec.skills, rituals: [] });
  const engine = new Engine({ log, clock, config, mailbox, org });
  const rooms = new Rooms({ log, clock, config, mailbox, engine, org });
  const co = { log, mailbox, org, engine, rooms, data: { spec: specName, ...(specDef ? { specDef } : {}) }, spec };
  engine.onApproved.push({ prefix: "FLOOR-", fn: (ref) => applyFloor(co, ref) });
  engine.onAdvanced.push((o, { stage }) => afterStage(co, o, stage)); // K7: only with spec workspace.commit
  rooms.postCheck = (o, cmd, vars) => runCmdCheck(o, cmd, vars); // K12: a stage's post cmd, at the agent's leave
  rooms.storeArtifacts = (o, sd, opts) => storeArtifacts(co, o, sd, opts); // K24: a passing leave's files, into the run's store
  rooms.snapshotArtifacts = (o, sd, opts) => snapshotArtifacts(co, o, sd, opts); // K24 review: what was there before the run
  // K9: the spec's loop cap (true: 3, the plan's default; unset: none, as every spec before K9); a loop-cap park asks
  // the orderer through the tracker, which the engine does not hold. Opt-in (K8+K9 review): the M4 lesson spec
  // (specs/s3c-lessons.json, not yet written) must set `maxLoops: true`, or a HELD claim loops forever as before
  engine.defaultMaxLoops = spec.maxLoops === true ? DEFAULT_MAX_LOOPS : spec.maxLoops ?? null;
  engine.standing = spec.approvals?.standing ?? []; // K15: AMD-015's scoped pre-approval as data (a test only)
  engine.onParked.push((o, p) => { if (p.ask) raiseParkAsk(co, o, { reason: p.reason, findings: p.ask.findings, budget: p.ask.budget ?? null }); });
  return co;
}

export const rep = (k, v) => (v instanceof Map ? { __map: [...v] } : v instanceof Set ? { __set: [...v] } : v);
export const rev = (k, v) => (v && v.__map ? new Map(v.__map) : v && v.__set ? new Set(v.__set) : v);
export const FIELDS = { data: ["spec", "specDef", "building", "channels", "tracker", "goals", "meetings", "rituals", "rules", "jobs", "host", "exports", "schedulers", "gates", "serve", "warm", "learn", "vars"], log: ["events"], mailbox: ["msgs", "keys", "n"], org: ["roles", "changes", "n", "rooms"], engine: ["flows", "active", "orders", "approvals", "n", "limits", "policies", "contracts", "sampleRates", "sampleSalt"], rooms: ["runs", "n", "memory", "sessions", "nS"] };

export function save(co) {
  const data = Object.fromEntries(Object.entries(FIELDS).map(([o, fs_]) => [o, Object.fromEntries(fs_.map((f) => [f, co[o][f]]))]));
  const tmp = `${STATE}.tmp`;
  fs.writeFileSync(tmp, JSON.stringify(data, rep, 1));
  fs.renameSync(tmp, STATE); // atomic replace: a crash mid-write leaves the old state
}
/** Files code publishes for agents to read (minutes), under the live directory. */
const writeFile = (rel, text) => { const f = path.join(LIVE, rel); fs.mkdirSync(path.dirname(f), { recursive: true }); fs.writeFileSync(f, text); };

export function load() {
  const data = JSON.parse(fs.readFileSync(STATE, "utf8"), rev);
  const co = make(data.data?.spec ?? "toy", data.data?.specDef ?? null);
  for (const [o, fs_] of Object.entries(FIELDS)) for (const f of fs_) if (data[o]?.[f] !== undefined) co[o][f] = data[o][f];
  co.mailbox.promote(); // due `later` items become `next` on every command: time is checked when anything happens
  co.writeFile = writeFile;
  return co;
}

/** M6 prep review: whether the process that wrote a lock (its pid, the lock's content) is still running. */
export function lockHolderAlive(text) {
  const pid = Number(String(text ?? "").trim());
  if (!Number.isInteger(pid) || pid <= 0) return false;
  try { process.kill(pid, 0); return true; } catch (e) { return e.code === "EPERM"; }
}
export const LOCK_STALE_MS = 30_000, LOCK_HUNG_MS = 15 * 60_000;
export function withLock(fn) {
  fs.mkdirSync(LIVE, { recursive: true });
  const until = Date.now() + 10_000;
  for (;;) {
    try { fs.writeFileSync(LOCK, String(process.pid), { flag: "wx" }); break; }
    catch (e) {
      if (e.code !== "EEXIST") throw e;
      let age = 0, text = "";
      try { age = Date.now() - fs.statSync(LOCK).mtimeMs; text = fs.readFileSync(LOCK, "utf8"); } catch { continue; } // released meanwhile
      // a writer died holding it. M6 prep review: only a dead one (the lock names its pid). A live holder's lock was broken
      // at 30 s too, and a tick holds it longer (ship, the merge after it and the exports run under one hold): the
      // writer that broke it saved (exit 0), then the tick's save overwrote that write, a silent lost update. Now
      // that writer waits its 10 s and fails loudly; only a holder hung past LOCK_HUNG_MS loses its lock
      if (age > LOCK_STALE_MS && (!lockHolderAlive(text) || age > LOCK_HUNG_MS)) { fs.rmSync(LOCK, { force: true }); continue; }
      if (Date.now() > until) throw new Error("state is locked by another process (10 s)");
      Atomics.wait(new Int32Array(new SharedArrayBuffer(4)), 0, 0, 50);
    }
  }
  try { return fn(); } finally { fs.rmSync(LOCK, { force: true }); }
}

export function runTests(task, { dir = path.join(LIVE, "work", task), label = `live/work/${task}`, files: only = null } = {}) {
  const files = only ?? (fs.existsSync(dir) ? fs.readdirSync(dir).filter((f) => f.endsWith(".test.mjs")) : []);
  if (!files.length) return { pass: false, output: `no *.test.mjs in ${label}` };
  // Started from inside a node --test process, the child inherits NODE_TEST_CONTEXT, reports to that parent instead and
  // exits 0 even when its tests fail. Drop it, and judge by the parsed counts as well as the exit code.
  const { NODE_TEST_CONTEXT, ...env } = process.env;
  let text, code = 0;
  try { text = execFileSync(process.execPath, ["--test", ...files], { cwd: dir, encoding: "utf8", stdio: "pipe", timeout: 60_000, env }); }
  catch (e) { text = String(e.stdout || e.message); code = e.status ?? 1; }
  const count = (k) => Number((text.match(new RegExp(`^# ${k} (\\d+)`, "m")) || [])[1] ?? NaN);
  const pass = code === 0 && count("fail") === 0 && count("pass") > 0;
  const output = pass ? text.split("\n").filter((l) => /^# (tests|pass|fail)/.test(l)).join(" ") : text.split("\n").filter((l) => /^not ok|^# (tests|pass|fail)|error:/.test(l)).slice(0, 12).join("\n");
  return { pass, output };
}

// ---------------------------------------------------------------- test1 for non-code work: text checks

const syllables = (w) => Math.max(1, (w.toLowerCase().replace(/e\b/, "").match(/[aeiouy]+/g) || []).length);
/** Readability and form checks on live/work/<task>/page.md, from the order's `checks`:
 *  { file, minWords, maxWords, mustInclude: [...], banned: [...], minReadingEase, titleLine, lineMaxWords: [{prefix, maxWords}] } */
export function runTextChecks(task, checks, { dir = path.join(LIVE, "work", task) } = {}) {
  const file = path.join(dir, checks.file ?? "page.md");
  // the real path (benchmark 3: "missing live/work/…" made two agents doubt that the check reads META_LIVE_DIR)
  if (!fs.existsSync(file)) return { pass: false, output: `missing ${file}` };
  const text = fs.readFileSync(file, "utf8");
  const lines = text.split("\n");
  const body = lines.filter((l) => !/^#/.test(l)).join(" ");
  const words = body.split(/\s+/).filter((w) => /[\p{L}\p{N}]/u.test(w));
  const sentences = Math.max(1, (body.match(/[.!?]+(\s|$)/g) || []).length);
  const ease = 206.835 - 1.015 * (words.length / sentences) - 84.6 * (words.reduce((s, w) => s + syllables(w.replace(/[^\p{L}]/gu, "")), 0) / Math.max(1, words.length));
  const fails = [];
  if (checks.titleLine && !/^# \S/.test(lines[0] ?? "")) fails.push("first line is not a '# Title'");
  if (checks.minWords && words.length < checks.minWords) fails.push(`${words.length} words < ${checks.minWords}`);
  if (checks.maxWords && words.length > checks.maxWords) fails.push(`${words.length} words > ${checks.maxWords}`);
  // literal text; word boundaries only where the text starts or ends with a word character (benchmark 2: "**Q1.**"
  // threw and "## Format" could never match under a bare \b…\b)
  const lit = (m) => `${/^\w/.test(m) ? "\\b" : ""}${m.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")}${/\w$/.test(m) ? "\\b" : ""}`;
  for (const m of checks.mustInclude ?? []) if (!new RegExp(lit(m), "i").test(text)) fails.push(`does not mention ${m}`);
  for (const b of checks.banned ?? []) if (new RegExp(`\\b${b}\\b`, "i").test(text)) fails.push(`uses banned word ${b}`);
  // claims that escaped earlier runs (benchmark 3: "thick clouds trap the heat" on Venus escaped three runs running)
  for (const x of checks.knownFalse ?? []) { const m = text.match(new RegExp(x.pattern, "i")); if (m) fails.push(`known false claim "${m[0]}": ${x.why}`); }
  // a rule on some lines, e.g. {prefix: "**Why:**", maxWords: 20} (benchmark 2: a 20-word why-line rule in the style
  // sheet sent 3 of 5 rounds back at the check, after test1 had passed them)
  for (const r of checks.lineMaxWords ?? []) for (const [i, l] of lines.entries()) {
    if (!l.trimStart().startsWith(r.prefix)) continue;
    let rest = l.trimStart().slice(r.prefix.length);
    // a prefix that opens bold ("**Q") leaves the label's tail ("1.**") behind; it is not a word (benchmark 3: a chair
    // coded 17 for a 16-word decision)
    if ((r.prefix.match(/\*\*/g) ?? []).length % 2 === 1) rest = rest.replace(/^[^\s]*?\*\*/, "");
    const n = rest.split(/\s+/).filter((w) => /[\p{L}\p{N}]/u.test(w)).length;
    if (n > r.maxWords) fails.push(`line ${i + 1} (${r.prefix}) has ${n} words > ${r.maxWords}`);
  }
  if (checks.distinctAnswers) fails.push(...answerClashes(task, text, checks.distinctAnswers));
  // only these kinds of line (live run 4: a decided format, a title then Q/Answer/Why lines, could not be checked, and an
  // intro line went back at the reader)
  if (checks.allowedLines) for (const [i, l] of lines.entries()) { const t = l.trim(); if (t && !checks.allowedLines.some((p) => t.startsWith(p))) fails.push(`line ${i + 1} is not an allowed kind of line (${checks.allowedLines.map((p) => JSON.stringify(p)).join(", ")}): "${t.slice(0, 60)}"`); }
  if (checks.minReadingEase && ease < checks.minReadingEase) fails.push(`reading ease ${ease.toFixed(0)} < ${checks.minReadingEase}`);
  return { pass: !fails.length, output: fails.length ? fails.join("; ") : `ok: ${words.length} words, reading ease ${ease.toFixed(0)}` };
}

// ---- checks as data: validated, merged (a decision tightens them), and the cross-section answer check ----------------
export const CHECK_KEYS = ["file", "minWords", "maxWords", "mustInclude", "banned", "minReadingEase", "titleLine", "lineMaxWords", "distinctAnswers", "allowedLines", "knownFalse"];
export function validateChecks(c) {
  if (!c || typeof c !== "object" || Array.isArray(c)) return "checks are an object";
  const bad = Object.keys(c).filter((k) => !CHECK_KEYS.includes(k));
  if (bad.length) return `unknown check ${bad.join(", ")} (known: ${CHECK_KEYS.join(", ")})`;
  for (const k of ["mustInclude", "banned"]) if (c[k] != null && !Array.isArray(c[k])) return `${k} is a list`;
  if (c.lineMaxWords != null && (!Array.isArray(c.lineMaxWords) || c.lineMaxWords.some((r) => !r.prefix || !(r.maxWords > 0)))) return "lineMaxWords is a list of {prefix, maxWords}";
  if (c.distinctAnswers != null && !c.distinctAnswers.prefix) return "distinctAnswers needs a prefix";
  if (c.allowedLines != null && (!Array.isArray(c.allowedLines) || !c.allowedLines.length)) return "allowedLines is a list of line prefixes";
  if (c.knownFalse != null && (!Array.isArray(c.knownFalse) || c.knownFalse.some((x) => !x.pattern || !x.why || (() => { try { new RegExp(x.pattern, "i"); return false; } catch { return true; } })()))) return "knownFalse is a list of {pattern (a regular expression), why}";
  return null;
}
/** Merge b into a: lists join, limits take the stricter value. A decision can only tighten an order's checks. */
export function mergeChecks(a = {}, b = {}) {
  const out = { ...a };
  for (const [k, v] of Object.entries(b)) {
    if (k === "mustInclude" || k === "banned") out[k] = [...new Set([...(a[k] ?? []), ...v])];
    else if (k === "lineMaxWords") { const m = new Map((a[k] ?? []).map((r) => [r.prefix, r])); for (const r of v) m.set(r.prefix, { prefix: r.prefix, maxWords: Math.min(r.maxWords, m.get(r.prefix)?.maxWords ?? Infinity) }); out[k] = [...m.values()]; }
    else if (k === "minWords" || k === "minReadingEase") out[k] = Math.max(v, a[k] ?? -Infinity);
    else if (k === "maxWords") out[k] = Math.min(v, a[k] ?? Infinity);
    else if (k === "titleLine") out[k] = !!(v || a[k]);
    else if (k === "allowedLines") out[k] = a[k] ? a[k].filter((x) => v.includes(x)) : v; // stricter: only prefixes both allow
    else if (k === "knownFalse") { const m = new Map((a[k] ?? []).map((x) => [x.pattern, x])); for (const x of v) m.set(x.pattern, x); out[k] = [...m.values()]; }
    else out[k] = v;
  }
  return out;
}

const STOP = new Set("about after again also because been before being below between both could does doing down during each from further have having here into itself just more most much near only other over same should some such than that their them then there these they this those through under until very what when where which while whom will with would your yours planet planets space round".split(" "));
const normAnswer = (s) => s.toLowerCase().replace(/\*\*/g, "").split(/[.;,:(—–]| - /)[0].replace(/\b(a|an|the|about)\b/g, " ").replace(/[^\p{L}\p{N} ]/gu, " ").replace(/\s+/g, " ").trim();
const words = (s) => s.toLowerCase().replace(/[^\p{L}\p{N} ]/gu, " ").split(/\s+/).filter(Boolean);
/** Answers across sections (rounds): none repeats, and none is given away by another section, meaning a line there
 *  holds the answer together with a distinctive word of the answer's own question (benchmark 2: Round 1's why line
 *  said "Pluto … dwarf planet", the answer to Round 5's "biggest dwarf planet" question). Sections are the parts of
 *  this file split at `split` (a regex source), plus, with `across`, the other tasks in live/work whose name starts
 *  with it; then only clashes involving this file are reported. */
export function answerClashes(task, text, { prefix, split = null, across = null, question = "**Q" }) {
  const secs = [];
  const own = split ? text.split(new RegExp(`(?=${split})`, "m")).filter((p) => new RegExp(split, "m").test(p)) : [text];
  // a section ends at the next heading that is not itself a section (benchmark 3: PACK's "## Changes" notes were read
  // as part of Round 5, so a note quoting another round's answer failed as a giveaway)
  if (split) own.forEach((t, i) => { const lines = t.split("\n"); const k = lines.findIndex((l, j) => j > 0 && /^#{1,6}\s/.test(l) && !new RegExp(split).test(l)); if (k > 0) own[i] = lines.slice(0, k).join("\n"); });
  own.forEach((t, i) => secs.push({ name: split ? t.match(new RegExp(split, "m"))[0].replace(/^#+\s*|:\s*$/g, "").trim() : task, text: t, mine: true }));
  if (across) for (const d of fs.existsSync(path.join(LIVE, "work")) ? fs.readdirSync(path.join(LIVE, "work")) : []) {
    if (d === task || !d.startsWith(across)) continue;
    const f = path.join(LIVE, "work", d, "page.md");
    if (fs.existsSync(f)) secs.push({ name: d, text: fs.readFileSync(f, "utf8"), mine: false });
  }
  for (const s of secs) {
    const lines = s.text.split("\n");
    s.qa = [];
    let q = "";
    for (const l of lines) { const t = l.trim(); if (t.startsWith(question)) q = t; if (t.startsWith(prefix)) s.qa.push({ a: normAnswer(t.slice(prefix.length)), q }); }
    s.other = lines.filter((l) => !l.trim().startsWith(prefix));
  }
  const df = new Map();
  for (const s of secs) for (const w of new Set(words(s.text))) df.set(w, (df.get(w) ?? 0) + 1);
  const keyOf = (q) => words(q).filter((w) => w.length >= 4 && !STOP.has(w) && (df.get(w) ?? 0) <= 2);
  // an answer whose every word is in more than two sections (the Sun, in a solar-system pack) is common ground, not a
  // giveaway (benchmark 3: "The Sun" could not be an answer at all, so a writer dropped a listed fact)
  const common = (a) => secs.length > 3 && words(a).every((w) => (df.get(w) ?? 0) > 2);
  const out = [];
  for (const [i, x] of secs.entries()) for (const { a, q } of x.qa) {
    if (!a) continue;
    for (const [j, y] of secs.entries()) {
      if (i === j || !(x.mine || y.mine)) continue;
      if (j > i && y.qa.some((z) => z.a === a)) out.push(`answer "${a}" is in both ${x.name} and ${y.name}`);
      if (!/\p{L}/u.test(a) || a.length < 3 || common(a)) continue;
      const re = new RegExp(`\\b${a.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")}\\b`, "i");
      const keys = keyOf(q);
      const hit = y.other.find((l) => re.test(l) && keys.some((k) => words(l).includes(k)));
      if (hit) out.push(`${y.name} gives away ${x.name}'s answer "${a}": "${hit.trim().slice(0, 80)}"`);
    }
  }
  // within one section (live run 4: Round 2's "shark" answer sat inside its own "whale shark" answer, and the clue fit
  // both): an answer that is part of another answer in the section, or named in another question of the section
  for (const x of secs) {
    if (!x.mine) continue;
    const qs = x.qa;
    for (const [i, p] of qs.entries()) {
      if (!p.a || !/\p{L}/u.test(p.a) || p.a.length < 3) continue;
      const re = new RegExp(`\\b${p.a.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")}\\b`, "i");
      for (const [j, q] of qs.entries()) {
        if (i === j) continue;
        if (q.a && q.a !== p.a && re.test(q.a)) out.push(`${x.name}: answer "${p.a}" is part of answer "${q.a}"`);
        // only an earlier question gives a later answer away; a later question naming an answer already given is fine
        if (j < i && q.q && !common(p.a) && re.test(q.q.replace(/^\*\*Q\d+\.\*\*/, ""))) out.push(`${x.name}: answer "${p.a}" is named in an earlier question: "${q.q.slice(0, 80)}"`);
      }
    }
  }
  return [...new Set(out)];
}

/** The checks in plain words, so agents read what code enforces instead of guessing (live run 4: three agents believed
 *  banned words matched inside longer words, and avoided "warm-blooded" and "endangered"). */
export function describeChecks(c = {}) {
  const L = [];
  if (c.titleLine) L.push("the first line is a '# Title'");
  if (c.minWords || c.maxWords) L.push(`${c.minWords ?? 0}-${c.maxWords ?? "any"} words, not counting heading lines or markdown markers`);
  if (c.mustInclude?.length) L.push(`must contain, as exact text (case does not matter): ${c.mustInclude.map((x) => JSON.stringify(x)).join(", ")}`);
  if (c.banned?.length) L.push(`must not contain these as whole words (case does not matter; "kill" does not match "skill", "blood" does not match "warm-blooded"; plurals and other forms are not matched either): ${c.banned.join(", ")}`);
  for (const r of c.lineMaxWords ?? []) L.push(`each line starting ${JSON.stringify(r.prefix)} has at most ${r.maxWords} words after it`);
  if (c.minReadingEase) L.push(`Flesch reading ease at least ${c.minReadingEase} (short sentences, short words)`);
  if (c.allowedLines) L.push(`every non-empty line starts with one of: ${c.allowedLines.map((x) => JSON.stringify(x)).join(", ")}`);
  for (const x of c.knownFalse ?? []) L.push(`no known false claim matching /${x.pattern}/i (${x.why})`);
  if (c.distinctAnswers) L.push(`no ${JSON.stringify(c.distinctAnswers.prefix)} answer repeats ${c.distinctAnswers.across ? `another ${c.distinctAnswers.across}* task's` : "another section's"}, and no line names another ${c.distinctAnswers.across ? "task" : "section"}'s answer together with a distinctive word of that answer's question (a give-away)`);
  return L;
}

/** test1 for an order: its declared text checks if it has them, otherwise the builder's tests. */
export function runTest1(o) {
  const at = o.workdir ? { dir: o.workdir, label: o.workdir } : {}; // K5: an order with a worktree is tested there
  return o.checks ? runTextChecks(o.task, o.checks, at) : runTests(o.task, at);
}

// ---- K1: a stage `run` as a command (plan 2026-10-21 §3: lesson stages 2, 3, 4, 8 and 9 are scripts, and test1 only
// knew `node --test` or page.md). A cmd comes from the spec, never from an agent: it is not a CHECK_KEY, because order
// checks and meeting rules are agent-written (a chair's --rules would otherwise make code run any argv).
// M4 audit: `errorExit` lists exit codes that are a stage-error, not a revise (adapters/s3c: exit 2 usage, 3 environment;
// plan §2 stage 3 "exit 3 = no evidence, stage errors, not revise": without it a broken host burned the builder's loops)
export const CMD_KEYS = ["argv", "cwd", "env", "timeoutMs", "pass", "findings", "route", "errorExit", "argvFrom"];
/** K26/B7: a stage `run` may take its argv from the order (`argvFrom: "order"`): the acceptance cmd the orderer gave
 *  with `order new --accept-cmd` (refused in an agent session, so no agent picks a program code runs), e.g. a hidden
 *  test runner whose category-only output is the finding. Only on a stage run (validateCmd's `orderArgv`). */
export const ORDER_ARGV = "order";
/** Why an order's acceptance argv is invalid, or null. */
export const orderArgvProblem = (a) => (Array.isArray(a) && a.length > 0 && a.length <= 64 && a.every((x) => typeof x === "string" && x && x.length <= 2000) ? null : "--accept-cmd is a JSON list of 1-64 non-empty strings (the argv)");
/** M4 audit: a route may also say `park` (plan §2: a learner's fatal, an active publish hold: park + ask, K8). */
export const PARK_ROUTE = "park";
const badRe = (x) => { try { new RegExp(x, "m"); return false; } catch { return true; } };
/** Why a cmd is invalid, or null. `stages`: the flow's stage names before this one (a route only goes back). */
export function validateCmd(c, { stages = null, orderArgv = false } = {}) {
  if (!c || typeof c !== "object" || Array.isArray(c)) return "a cmd is an object";
  const bad = Object.keys(c).filter((k) => !CMD_KEYS.includes(k));
  if (bad.length) return `unknown cmd field ${bad.join(", ")} (known: ${CMD_KEYS.join(", ")})`;
  if (c.argvFrom != null) {
    if (!orderArgv) return "argvFrom is for a stage run only (the order's acceptance cmd)";
    if (c.argvFrom !== ORDER_ARGV || c.argv != null) return `argvFrom is "${ORDER_ARGV}", in place of argv`;
  } else if (!Array.isArray(c.argv) || !c.argv.length || c.argv.some((a) => typeof a !== "string" || !a)) return "argv is a non-empty list of strings";
  if (c.cwd != null && typeof c.cwd !== "string") return "cwd is a string";
  if (c.env != null && (typeof c.env !== "object" || Array.isArray(c.env) || Object.values(c.env).some((v) => typeof v !== "string"))) return "env is an object of strings";
  if (c.timeoutMs != null && !(Number.isFinite(c.timeoutMs) && c.timeoutMs > 0)) return "timeoutMs is a positive number";
  const p = c.pass ?? "exit0";
  if (!(p === "exit0" || (p && typeof p === "object" && ((p.tap === true && Object.keys(p).length === 1) || (typeof p.json === "string" && "equals" in p && Object.keys(p).length === 2))))) return `pass is "exit0", {tap: true} or {json: "<dotted path into stdout JSON>", equals: <value>}`;
  if (c.findings != null && (typeof c.findings !== "object" || Array.isArray(c.findings) || Object.keys(c.findings).some((k) => !["fromStdout", "checked"].includes(k)) || typeof c.findings.fromStdout !== "string" || badRe(c.findings.fromStdout) || (c.findings.checked != null && (typeof c.findings.checked !== "string" || badRe(c.findings.checked) || !/\((?!\?)/.test(c.findings.checked))))) return "findings is {fromStdout: <regular expression>, checked: <regular expression whose group 1 lists the defect classes the cmd checked>}";
  if (c.errorExit != null && !(Array.isArray(c.errorExit) && c.errorExit.every((x) => Number.isInteger(x) && x > 0 && x < 256))) return "errorExit is a list of non-zero exit codes (1-255) that are a stage-error";
  if (c.route != null) {
    if (typeof c.route !== "object" || Array.isArray(c.route)) return "route is {<regular expression>: <stage>}";
    for (const [re, to] of Object.entries(c.route)) {
      if (badRe(re)) return `route ${JSON.stringify(re)} is not a regular expression`;
      if (stages && !stages.includes(to) && to !== PARK_ROUTE) return `route ${JSON.stringify(re)} goes to ${to}, not an earlier stage (${stages.join(", ") || "none"}) or ${PARK_ROUTE}`;
    }
  }
  return null;
}
/** ${slug}, ${task}, ${workdir}, ${live}, ${base_sha} (K12 post-checks: ${evidence}, ${verdict}, ${stage}) in a cmd string; slug is the order's slug if set (lessons), else its task. With a K5
 *  workspace also ${run}, ${n} and ${port} (o.workspace.vars: one vocabulary for workspace env, cmds and briefs, K5
 *  review); M5 review: ${order}, ${budget}, ${remaining}, ${ledger_project} (prepareCmd); M6 prep: ${branch}; M6 prep review: ${head_sha}; a variable the order does not
 *  have stays as written. */
/** M6 prep (M4: reviewers were 46% of spend; the fact-checker's pack listed all 51 brief files): the order's own brief
 *  file, read from its accept text (adapters/s3c/brief.mjs writes `brief company/domains/briefs/<f>.md:<a>-<b>` in the
 *  header line), as ${brief_file} for packs, briefs and cmds; an order with no such line has none (the template stays
 *  as written, and a glob of it matches nothing). */
/** K24/K25: the order's store and commit variables, for cmds, briefs and packs: ${artifacts} (its latest view in the run's
 *  artifact store), ${artifacts_root}, ${artifacts_of:<stage>} (a stage's newest copy, once stored) and ${head_of:<stage>}
 *  (the commit K7 made, or found, when that stage last left: test1's --base after a plan check is the plan check's
 *  commit, the claims as approved). A stage with none yet has no such variable (the text stays as written). */
export function storeVars(o) {
  const heads = Object.fromEntries(Object.entries(o?.workspace?.heads ?? {}).map(([st, sha]) => [`head_of:${st}`, sha]));
  return { ...artifactVars(o), ...heads, head_seq: { ...(o?.workspace?.headSeq ?? {}) } };
}
/** K24/K25 review: the value of template variable `k` in `vars`, or undefined. ${head_of:a|b} is the head of whichever of
 *  those stages left last (workspace.commit numbers each head: o.workspace.headSeq): test1's base after a plan check
 *  and then a check is the check's commit (a claim the check disputed is not "as at base" when the builder restores
 *  the plan check's copy of it), and after a re-plan the new plan check's. None of them yet: undefined. */
export function lookupVar(vars, k) {
  if (k in vars) return vars[k] ?? "";
  const m = /^head_of:(.+\|.+)$/.exec(k);
  if (!m) return undefined;
  const seq = vars.head_seq ?? {}, have = m[1].split("|").filter((n) => `head_of:${n}` in vars);
  if (!have.length) return undefined;
  return vars[`head_of:${have.reduce((a, b) => ((seq[b] ?? 0) > (seq[a] ?? 0) ? b : a))}`] ?? "";
}
export const briefVars = (o) => { const m = /(?:^|[\s·])brief (company\/domains\/briefs\/[A-Za-z0-9._-]+\.md):\d+-\d+/m.exec(String(o?.accept ?? "")); return m ? { brief_file: m[1] } : {}; };
// K20: a launch gate also reads ${role} (the session's), ${running} and ${builders} (agent and builder sessions in flight,
// this one not counted) and ${launch} (a label naming the planned launch), so dispatch-check gets Meta's own count
// K24/K25: ${artifacts}, ${artifacts_root}, ${artifacts_of:<stage>} and ${head_of:<stage>} (storeVars). K24/K25 review:
// a stage name is any generator.mjs STAGE_REF name (plan_check and Review validated, then never filled), and
// ${head_of:a|b} the newest of several (lookupVar)
export const interpolate = (s, vars) => s.replace(/\$\{(slug|task|workdir|run|n|port|evidence|verdict|stage|live|base_sha|order|budget|remaining|ledger_project|branch|head_sha|brief_file|role|running|builders|launch|artifacts|artifacts_root|artifacts_of:[A-Za-z0-9][\w.-]*|head_of:[A-Za-z0-9][\w.-]*(?:\|[A-Za-z0-9][\w.-]*)*)\}/g, (m, k) => { const v = lookupVar(vars, k); return v === undefined ? m : v; });
const dig = (x, p) => p.split(".").filter(Boolean).reduce((v, k) => (v == null ? undefined : k === "length" && (Array.isArray(v) || typeof v === "string") ? v.length : v[k]), x);
// K1 audit: the last line that parses, not the last that looks like JSON ("[advisory] x" after the JSON was "not JSON")
const parseJson = (t) => { try { return JSON.parse(t); } catch {} for (const l of t.trim().split("\n").reverse()) { if (!/^[[{]/.test(l.trim())) continue; try { return JSON.parse(l); } catch {} } return undefined; };
/** A cmd ready to run for order `o`: argv/cwd/env interpolated, `node` as this node. Shared by runCmdCheck (sync) and
 *  jobs.mjs (K2: the same cmd started detached, judged on a later tick by judgeCmd). */
export function prepareCmd(o, s, extra = {}) {
  const c = s.run ?? s;
  // K12: a post-check also reads ${evidence}, ${verdict} and ${stage} (the leave it judges: stage 7's record file)
  // M4 integrate: ${live} (the run's live dir: a file every order of the run shares, e.g. test1's baseline) and
  // ${base_sha} (the commit the order's worktree started from, K7's base: test1's --base for inherited claims)
  // M5 review: ${order}, ${budget} and ${remaining} (its budget less its charged spend), and ${ledger_project} (`order
  // new --ledger-project`: the company projects.json line it is charged to; unset, it stays as written), so a pre-check
  // such as ledger-gate.mjs gates each order's own project and tokens
  const own = { order: o.id ?? "", ...(Number.isFinite(o.budget) ? { budget: String(o.budget), remaining: String(Math.max(0, o.budget - (o.spent ?? 0))) } : {}), ...(o.ledgerProject ? { ledger_project: o.ledgerProject } : {}) };
  // M6 prep: ${branch}, the order's worktree branch (the integration merge's --from); with no worktree it stays as written.
  // M6 prep review: ${head_sha}, the order's last K7 commit (workspace.commit: after ship, the commit ship signed: the
  // merge's --from-sha, so a commit added to the branch after ship is never merged unreviewed). K24/K25 review: before
  // the first K7 commit it is the commit the worktree started at (o.workspace.sha), so a post-check's base is always
  // the tree as code last left it (the first draft's too), never HEAD, which an agent's own `git commit` moves
  const head = o.workspace?.head ?? (o.workspace?.dir ? o.workspace.sha : null);
  const vars = { ...(o.workspace?.vars ?? {}), ...briefVars(o), ...storeVars(o), ...extra, ...own, ...(o.workspace?.branch ? { branch: o.workspace.branch } : {}), ...(head ? { head_sha: head } : {}), slug: o.slug ?? o.task ?? "", task: o.task ?? "", workdir: o.workdir ?? path.join(LIVE, "work", o.task ?? ""), live: LIVE, base_sha: o.workspace?.baseSha ?? o.workspace?.sha ?? "" };
  // K26/B7: argvFrom "order": the orderer's acceptance cmd (o.acceptCmd); an order without one cannot run the stage
  const raw = c.argvFrom === ORDER_ARGV ? (orderArgvProblem(o.acceptCmd) ? null : o.acceptCmd) : c.argv;
  const missing = raw ? null : `order ${o.id ?? ""} names no acceptance cmd (order new --accept-cmd)`;
  const argv = (raw ?? ["(no acceptance cmd)"]).map((a) => interpolate(a, vars));
  const cwd = c.cwd ? path.resolve(vars.workdir, interpolate(c.cwd, vars)) : vars.workdir;
  // a child of a node --test process would report to it and exit 0 whatever its tests do (see runTests)
  const { NODE_TEST_CONTEXT, ...base } = process.env;
  // K5: the order workspace's env (NEXT_DIST_DIR, QA_PORT, QA_OUT per order) under the stage's own
  const env0 = { ...base, ...(o.workspace?.env ?? {}), ...Object.fromEntries(Object.entries(c.env ?? {}).map(([k, v]) => [k, interpolate(v, vars)])) };
  // M4 integrate (K7/K10 re-review): in an order's worktree every git the stage runs (qa's stamp, the company's tools)
  // gets the kernel's pins too: no agent-set hooks, fsmonitor or filter drivers run in code's process
  const env = o.workspace?.dir && fs.existsSync(o.workspace.dir) ? { ...env0, ...gitPins(o.workspace.dir, env0) } : env0;
  // "node" is this node (a launcher PATH may lack it, or hold another version)
  return { c, argv, bin: argv[0] === "node" ? process.execPath : argv[0], cwd, env, label: argv.join(" ").slice(0, 160), missing };
}
/** K26/B7: a stage whose cmd cannot be made (no acceptance cmd on the order): a stage-error, not the work's fault. */
export const noArgv = (p) => ({ pass: false, output: `${p.label}: ${p.missing}`, findings: null, route: null, code: null, timedOut: false, stageError: true });
/** A missing cwd is the work's fault (no workdir built yet): a revise, as K1 had it. */
export const noCwd = (p) => ({ pass: false, output: `${p.label}: no directory ${p.cwd}`, findings: null, route: null, code: null, timedOut: false, stageError: false });
/** Judge a finished cmd {stdout, stderr, status, error: "<why it never ran or died>"|null, timedOut} by its pass rule.
 *  stageError (K2): the stage itself failed (timed out, could not start, died), not the work; the caller holds the order
 *  at its stage instead of revising (plan 2026-10-21 §3 K2: a `next build` over the limit was a false revise). */
export function judgeCmd(c, label, r, timeoutMs = c.timeoutMs ?? 60_000) {
  const out = String(r.stdout ?? ""), err = String(r.stderr ?? ""), both = `${out}\n${err}`;
  const p = c.pass ?? "exit0";
  let pass, why;
  const errExit = !r.error && !r.timedOut && (c.errorExit ?? []).includes(r.status);
  if (r.error) { pass = false; why = r.error; }
  else if (r.timedOut) { pass = false; why = `timed out after ${timeoutMs} ms`; }
  else if (errExit) { pass = false; why = `exit ${r.status} (errorExit: the stage failed, not the work)`; }
  else if (p === "exit0") { pass = r.status === 0; why = `exit ${r.status}`; }
  else if (p.tap) { const n = (k) => Number((out.match(new RegExp(`^# ${k} (\\d+)`, "m")) || [])[1] ?? NaN); pass = r.status === 0 && n("fail") === 0 && n("pass") > 0; why = `exit ${r.status}, ${out.split("\n").filter((l) => /^# (tests|pass|fail)/.test(l)).join(" ") || "no TAP counts"}`; }
  else { const j = parseJson(out); const v = j === undefined ? undefined : dig(j, p.json); pass = j !== undefined && JSON.stringify(v) === JSON.stringify(p.equals) && r.status === 0; why = j === undefined ? `exit ${r.status}, stdout is not JSON` : `${p.json} = ${JSON.stringify(v)?.slice(0, 200)}${JSON.stringify(v) === JSON.stringify(p.equals) ? "" : `, wanted ${JSON.stringify(p.equals)}`}${r.status === 0 ? "" : `, exit ${r.status}`}`; } // K1 audit: {"errors":[]} then a crash (exit 2) passed
  let findings = null;
  if (c.findings?.fromStdout) { const m = [...out.matchAll(new RegExp(c.findings.fromStdout, "gm"))].map((x) => (x[1] ?? x[0]).trim()).filter(Boolean); findings = m.length ? m.join("\n").slice(0, 2000) : null; }
  // B7 dry run 2: `checked` names the defect classes this run could see (K28 scores a rule only where its class was
  // checked); those lines never reach the findings
  const ckRe = c.findings?.checked ? new RegExp(c.findings.checked, "m") : null;
  const checked = ckRe ? [...new Set(out.split("\n").map((l) => ckRe.exec(l)?.[1]).filter(Boolean).flatMap((x) => x.split(/[,\s]+/)).filter(Boolean))] : null;
  if (!pass && !findings) findings = both.trim().split("\n").filter((l) => l && !(ckRe && ckRe.test(l))).slice(-20).join("\n").slice(0, 2000) || null;
  const route = pass ? null : Object.entries(c.route ?? {}).find(([re]) => new RegExp(re, "m").test(both))?.[1] ?? null;
  // M4 integrate: a stage-error never routes, whatever made it (errorExit, a timeout, a failed spawn): a timed-out or
  // crashed post-check's partial output ("Verdict: revise", "fatal: …") was routed as a verdict by Rooms.checkPost
  const stageError = !!(r.error || r.timedOut || errExit);
  // M5 review: an adapter's failing answer may name the ask it wants (ledger-gate.mjs: {ask:{kind:"budget", text}})
  const j = pass || stageError ? undefined : parseJson(out), ask = j?.ask && typeof j.ask === "object" && !Array.isArray(j.ask) && typeof j.ask.kind === "string" ? j.ask : null;
  return { pass, output: `${label}: ${why}`, findings, route: stageError ? null : route, code: r.status ?? null, timedOut: !!r.timedOut, stageError, ...(ask ? { ask } : {}), ...(checked && !stageError ? { checked } : {}) };
}
/** Run stage `s`'s `run` cmd for order `o` and wait: { pass, output, findings, route, code, timedOut, stageError }.
 *  findings are advisory on a pass (copy-tells, a11y) and the reason on a fail; route is the earlier stage the first
 *  matching route regex names. */
export function runCmdCheck(o, s, extra = {}) {
  const { t } = execCmd(o, s, extra);
  return t;
}
function execCmd(o, s, extra) {
  const p = prepareCmd(o, s, extra);
  if (p.missing) return { t: noArgv(p), stdout: "" };
  if (!fs.existsSync(p.cwd)) return { t: noCwd(p), stdout: "" };
  const timeoutMs = p.c.timeoutMs ?? 60_000;
  const r = spawnSync(p.bin, p.argv.slice(1), { cwd: p.cwd, env: p.env, encoding: "utf8", timeout: timeoutMs, maxBuffer: 64 * 1024 * 1024 });
  const timedOut = r.error?.code === "ETIMEDOUT";
  return { t: judgeCmd(p.c, p.label, { stdout: r.stdout, stderr: r.stderr, status: r.status, error: r.error && !timedOut ? `could not start: ${r.error.message}` : null, timedOut }, timeoutMs), stdout: String(r.stdout ?? "") };
}
/** K18/K21: as runCmdCheck, plus `json`: the last stdout line that parses as JSON (the adapter contract, plan §4), or
 *  undefined. Schedulers read the orders it names; exports read the labels it hands back. */
export function runCmdJson(o, s, extra = {}) {
  const { t, stdout } = execCmd(o, s, extra);
  return { ...t, json: parseJson(stdout) };
}
