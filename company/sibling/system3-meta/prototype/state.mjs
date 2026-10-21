// Shared live state for meta.mjs (the agents' CLI) and supervisor.mjs (the code-only supervisor): the live org, the
// task flow, load/save of the JSON state under an O_EXCL lock, and running a task's tests.
import fs from "node:fs";
import path from "node:path";
import { execFileSync } from "node:child_process";
import { fileURLToPath } from "node:url";
import { Log, Mailbox, Org, Engine, Rooms, DEFAULT_CONFIG } from "./lib.mjs";
import { SPECS } from "./specs.mjs";
import { applyFloor } from "./building.mjs";
export const HERE = path.dirname(fileURLToPath(import.meta.url));
export const LIVE = process.env.META_LIVE_DIR || path.join(HERE, "live");
export const STATE = path.join(LIVE, process.env.META_STATE || "state.json");
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

export function make(specName = "toy") {
  const spec = SPECS[specName];
  if (!spec) throw new Error(`no company spec ${specName} (have: ${Object.keys(SPECS).join(", ")})`);
  const config = DEFAULT_CONFIG;
  const log = new Log(clock);
  const mailbox = new Mailbox({ log, clock, config });
  const org = new Org({ log, rooms: spec.rooms, skills: spec.skills, rituals: [] });
  const engine = new Engine({ log, clock, config, mailbox, org });
  const rooms = new Rooms({ log, clock, config, mailbox, engine, org });
  const co = { log, mailbox, org, engine, rooms, data: { spec: specName }, spec };
  engine.onApproved.push({ prefix: "FLOOR-", fn: (ref) => applyFloor(co, ref) });
  return co;
}

export const rep = (k, v) => (v instanceof Map ? { __map: [...v] } : v instanceof Set ? { __set: [...v] } : v);
export const rev = (k, v) => (v && v.__map ? new Map(v.__map) : v && v.__set ? new Set(v.__set) : v);
export const FIELDS = { data: ["spec", "building", "channels", "tracker", "goals", "meetings", "rituals", "rules"], log: ["events"], mailbox: ["msgs", "keys", "n"], org: ["roles", "changes", "n", "rooms"], engine: ["flows", "active", "orders", "approvals", "n", "limits", "policies", "contracts"], rooms: ["runs", "n", "memory", "sessions", "nS"] };

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
  const co = make(data.data?.spec ?? "toy");
  for (const [o, fs_] of Object.entries(FIELDS)) for (const f of fs_) if (data[o]?.[f] !== undefined) co[o][f] = data[o][f];
  co.mailbox.promote(); // due `later` items become `next` on every command: time is checked when anything happens
  co.writeFile = writeFile;
  return co;
}

export function withLock(fn) {
  fs.mkdirSync(LIVE, { recursive: true });
  const until = Date.now() + 10_000;
  for (;;) {
    try { fs.writeFileSync(LOCK, String(process.pid), { flag: "wx" }); break; }
    catch (e) {
      if (e.code !== "EEXIST") throw e;
      const age = Date.now() - fs.statSync(LOCK).mtimeMs;
      if (age > 30_000) { fs.rmSync(LOCK, { force: true }); continue; } // a writer died holding it
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
export function runTextChecks(task, checks) {
  const file = path.join(LIVE, "work", task, checks.file ?? "page.md");
  if (!fs.existsSync(file)) return { pass: false, output: `missing live/work/${task}/${checks.file ?? "page.md"}` };
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
  // a rule on some lines, e.g. {prefix: "**Why:**", maxWords: 20} (benchmark 2: a 20-word why-line rule in the style
  // sheet sent 3 of 5 rounds back at the check, after test1 had passed them)
  for (const r of checks.lineMaxWords ?? []) for (const [i, l] of lines.entries()) {
    if (!l.trimStart().startsWith(r.prefix)) continue;
    const n = l.trimStart().slice(r.prefix.length).split(/\s+/).filter((w) => /[\p{L}\p{N}]/u.test(w)).length;
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
export const CHECK_KEYS = ["file", "minWords", "maxWords", "mustInclude", "banned", "minReadingEase", "titleLine", "lineMaxWords", "distinctAnswers", "allowedLines"];
export function validateChecks(c) {
  if (!c || typeof c !== "object" || Array.isArray(c)) return "checks are an object";
  const bad = Object.keys(c).filter((k) => !CHECK_KEYS.includes(k));
  if (bad.length) return `unknown check ${bad.join(", ")} (known: ${CHECK_KEYS.join(", ")})`;
  for (const k of ["mustInclude", "banned"]) if (c[k] != null && !Array.isArray(c[k])) return `${k} is a list`;
  if (c.lineMaxWords != null && (!Array.isArray(c.lineMaxWords) || c.lineMaxWords.some((r) => !r.prefix || !(r.maxWords > 0)))) return "lineMaxWords is a list of {prefix, maxWords}";
  if (c.distinctAnswers != null && !c.distinctAnswers.prefix) return "distinctAnswers needs a prefix";
  if (c.allowedLines != null && (!Array.isArray(c.allowedLines) || !c.allowedLines.length)) return "allowedLines is a list of line prefixes";
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
  const out = [];
  for (const [i, x] of secs.entries()) for (const { a, q } of x.qa) {
    if (!a) continue;
    for (const [j, y] of secs.entries()) {
      if (i === j || !(x.mine || y.mine)) continue;
      if (j > i && y.qa.some((z) => z.a === a)) out.push(`answer "${a}" is in both ${x.name} and ${y.name}`);
      if (!/\p{L}/u.test(a) || a.length < 3) continue;
      const re = new RegExp(`\\b${a.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")}\\b`, "i");
      const keys = keyOf(q);
      const hit = y.other.find((l) => re.test(l) && keys.some((k) => words(l).includes(k)));
      if (hit) out.push(`${y.name} gives away ${x.name}'s answer "${a}": "${hit.trim().slice(0, 80)}"`);
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
  if (c.distinctAnswers) L.push(`no ${JSON.stringify(c.distinctAnswers.prefix)} answer repeats ${c.distinctAnswers.across ? `another ${c.distinctAnswers.across}* task's` : "another section's"}, and no line names another ${c.distinctAnswers.across ? "task" : "section"}'s answer together with a distinctive word of that answer's question (a give-away)`);
  return L;
}

/** test1 for an order: its declared text checks if it has them, otherwise the builder's tests. */
export function runTest1(o) { return o.checks ? runTextChecks(o.task, o.checks) : runTests(o.task); }
