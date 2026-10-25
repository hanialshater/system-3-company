// The crew: the dynamic-workflow archetype (product/ONBOARDING.md) as a kernel module. Proven in Benchmarks 11-13
// (bench11/org.mjs, bench12/run.mjs): members work continuously, each in its own tree; they sync with main when they
// choose and land their own work past the company's referee, which accepts a land only if main's score does not fall;
// they coordinate by notes, the board and claims; they may go idle to leave the shared budget to others; when they leave
// they off-board into the company's knowledge base.
//
// Everything is an event in one append-only log, <dir>/events.jsonl (schema v1, product/STARTER.md "the event log"):
// { v: 1, t, type, by, ...fields }. Types: crew.start, land, land.refused, sync, note, board.post, claim, claim.drop,
// idle, wake, spend, offboard, crew.end. The starter HQ reads this log; nothing else is needed to draw the crew.
//
//   node crew.mjs status|sync|land ["msg"]|note --to=<id|all> --text=…|notes|post …|read [--area=]|claim …|claims|drop …
//   with CREW_DIR (the crew's folder) and CREW_ME (the member) in the environment, or crew.json beside the caller's tree
import fs from "node:fs";
import path from "node:path";
import { spawnSync } from "node:child_process";
import { fileURLToPath } from "node:url";

export const SCHEMA = 1;
export const CLAIM_MIN = 40;
export const BOARD_KINDS = ["finding", "dead-end", "hypothesis"];

export class CrewRefusal extends Error { constructor(m, code = 2) { super(m); this.code = code; } }
const refuse = (m, code) => { throw new CrewRefusal(m, code); };
const J = (f, d) => { try { return JSON.parse(fs.readFileSync(f, "utf8")); } catch { return d; } };
const git = (cwd, by, ...a) => spawnSync("git", ["-c", "safe.directory=*", "-c", `user.name=${by}`, "-c", `user.email=${by}@crew`, "-C", cwd, ...a], { encoding: "utf8", maxBuffer: 64 << 20 });

/** the crew in <dir>: its spec (crew.json: { members: [{id, tree}], main, referee: {cmd}, budget, minutes }) and its log */
export function openCrew(dir) {
  const spec = J(path.join(dir, "crew.json"), null);
  if (!spec) refuse(`no crew.json in ${dir}`);
  const log = path.join(dir, "events.jsonl");
  const events = () => { try { return fs.readFileSync(log, "utf8").trim().split("\n").filter(Boolean).map((l) => JSON.parse(l)); } catch { return []; } };
  const emit = (type, by, fields = {}) => { const e = { v: SCHEMA, t: new Date().toISOString(), type, by, ...fields }; fs.mkdirSync(dir, { recursive: true }); fs.appendFileSync(log, JSON.stringify(e) + "\n"); return e; };
  const member = (id) => { const m = spec.members.find((x) => x.id === id); if (!m) refuse(`no member ${id} (members: ${spec.members.map((x) => x.id).join(", ")})`); return m; };
  return { dir, spec, log, events, emit, member };
}

/** main's current state, from the log: the last accepted land (or crew.start) */
export function mainState(crew) {
  const ev = crew.events(), last = ev.filter((e) => e.type === "land" || e.type === "crew.start").at(-1);
  return { head: last?.head ?? null, rate: last?.after ?? last?.rate ?? 0, areas: last?.areas ?? null };
}

/** the referee: spec.referee.cmd with {dir} replaced, run on a clean copy of a commit; its last stdout line is JSON
 *  { rate, areas?: { name: rate } }. A company plugs in its own (tests, judges, fact-checks). */
export function referee(crew, tree, head, { by = "referee" } = {}) {
  const snap = fs.mkdtempSync(path.join(crew.dir, ".snap-")); fs.rmSync(snap, { recursive: true });
  git(crew.dir, by, "clone", "-q", "--no-hardlinks", tree, snap); git(snap, by, "checkout", "-q", head);
  try {
    const cmd = String(crew.spec.referee.cmd).replaceAll("{dir}", snap);
    const r = spawnSync("sh", ["-c", cmd], { encoding: "utf8", timeout: (crew.spec.referee.timeoutMin ?? 60) * 60000, maxBuffer: 64 << 20 });
    for (const l of String(r.stdout).trim().split("\n").reverse()) { try { const j = JSON.parse(l); if (typeof j.rate === "number") return j; } catch {} }
    return null;
  } finally { fs.rmSync(snap, { recursive: true, force: true }); }
}

/** start a crew: main's starting score from the referee (so no land may lower it) */
export function startCrew(crew) {
  if (crew.events().some((e) => e.type === "crew.start")) return mainState(crew);
  const head = git(crew.spec.main, "operator", "rev-parse", "HEAD").stdout.trim(), s = referee(crew, crew.spec.main, head);
  crew.emit("crew.start", "operator", { head, rate: s?.rate ?? 0, areas: s?.areas ?? null, members: crew.spec.members.map(({ id, model, role }) => ({ id, model, role })), budget: crew.spec.budget, minutes: crew.spec.minutes });
  return mainState(crew);
}

export function sync(crew, me) {
  const m = crew.member(me), f = git(m.tree, me, "fetch", "-q", crew.spec.main, "HEAD");
  if (f.status !== 0) refuse(f.stderr);
  const r = git(m.tree, me, "merge", "--no-edit", "FETCH_HEAD");
  crew.emit("sync", me, { ok: r.status === 0, head: git(m.tree, me, "rev-parse", "HEAD").stdout.trim() });
  if (r.status !== 0) refuse(`merge conflict: resolve it in ${m.tree}, commit, check, then land\n${r.stdout}${r.stderr}`, 1);
  return git(m.tree, me, "log", "--oneline", "-1").stdout.trim();
}

/** land a member's committed HEAD on main: it must contain main; the referee must not see main fall; one at a time.
 *  A lock whose holder is gone is broken (bench11's stale-lock bug); every refusal releases the lock. */
export function land(crew, me, msg = "") {
  const m = crew.member(me), tree = m.tree, mainDir = crew.spec.main;
  if (git(tree, me, "status", "--porcelain", "--untracked-files=no").stdout.trim()) refuse("commit your work first (only committed work lands)");
  const head = git(tree, me, "rev-parse", "HEAD").stdout.trim(), mainHead = git(mainDir, me, "rev-parse", "HEAD").stdout.trim();
  if (head === mainHead) refuse("nothing to land: your HEAD is main");
  if (git(tree, me, "merge-base", "--is-ancestor", mainHead, head).status !== 0) { git(tree, me, "fetch", "-q", mainDir, "HEAD"); if (git(tree, me, "merge-base", "--is-ancestor", mainHead, head).status !== 0) refuse(`main has moved on (now ${mainHead.slice(0, 10)}): sync, check, commit, then land`); }
  const lock = path.join(crew.dir, "land.lock");
  for (let i = 0; ; i++) {
    try { fs.mkdirSync(lock); fs.writeFileSync(path.join(lock, "pid"), String(process.pid)); break; }
    catch { let pid = null; try { pid = Number(fs.readFileSync(path.join(lock, "pid"), "utf8")); } catch {} let alive = false; if (pid) { try { process.kill(pid, 0); alive = true; } catch {} } if (!alive && i > 2) { fs.rmSync(lock, { recursive: true, force: true }); continue; } if (i > 1200) refuse("the land lock is busy; try again"); spawnSync("sleep", ["1"]); }
  }
  try {
    if (git(mainDir, me, "rev-parse", "HEAD").stdout.trim() !== mainHead) refuse("main moved while you waited: sync and land again");
    const s = referee(crew, tree, head, { by: me }), before = mainState(crew).rate;
    if (!s) { crew.emit("land.refused", me, { head, why: "the referee could not score it" }); refuse("refused: the referee could not score your HEAD", 1); }
    if (s.rate < before) { crew.emit("land.refused", me, { head, before, after: s.rate, why: `main would fall: ${before} → ${s.rate}`, areas: s.areas ?? null }); refuse(`refused: main would fall (${before} → ${s.rate})`, 1); }
    git(mainDir, me, "fetch", "-q", tree, head); const ff = git(mainDir, me, "merge", "--ff-only", "-q", head);
    if (ff.status !== 0) refuse(`could not move main: ${ff.stderr}`);
    crew.emit("land", me, { head, before, after: s.rate, msg: String(msg).slice(0, 300), areas: s.areas ?? null });
    return { head, before, after: s.rate };
  } finally { fs.rmSync(lock, { recursive: true, force: true }); }
}

export function note(crew, from, to, text) {
  if (!String(text ?? "").trim()) refuse("a note needs --text");
  const ids = crew.spec.members.map((x) => x.id), list = to === "all" ? ids.filter((x) => x !== from) : [crew.member(to).id];
  for (const id of list) crew.emit("note", from, { to: id, text: String(text).slice(0, 2000) });
  return list;
}
export const notesFor = (crew, me) => crew.events().filter((e) => e.type === "note" && e.to === me);
export const unread = (crew, me) => { const seen = crew.events().filter((e) => (e.type === "notes.read" || e.type === "wake") && e.by === me).at(-1)?.count ?? 0; return notesFor(crew, me).length - seen; };
export function readNotes(crew, me) { const n = notesFor(crew, me); crew.emit("notes.read", me, { count: n.length }); return n; }

export function post(crew, by, { kind, area, text, evidence, wrongIf }) {
  if (!BOARD_KINDS.includes(kind)) refuse(`kind is one of ${BOARD_KINDS.join(", ")}`);
  for (const [k, v] of Object.entries({ area, text, evidence, wrongIf })) if (!String(v ?? "").trim()) refuse(`a board post needs ${k} (a finding carries its evidence and the outcome that would show it wrong)`);
  return crew.emit("board.post", by, { kind, area: area.slice(0, 60), text: text.slice(0, 1200), evidence: evidence.slice(0, 400), wrongIf: wrongIf.slice(0, 300) });
}
export const board = (crew, area = null) => crew.events().filter((e) => e.type === "board.post" && (!area || e.area === area));
export function claim(crew, by, area, text) { if (!area || !text) refuse("a claim needs an area and a text"); return crew.emit("claim", by, { area, text: text.slice(0, 300) }); }
export function dropClaim(crew, by, area) { return crew.emit("claim.drop", by, { area }); }
export function claims(crew, now = Date.now()) {
  const live = new Map();
  for (const e of crew.events()) { const k = `${e.by} ${e.area}`; if (e.type === "claim") live.set(k, e); if (e.type === "claim.drop") live.delete(k); }
  return [...live.values()].filter((e) => now - Date.parse(e.t) < CLAIM_MIN * 60000);
}
/** spend: the runner emits a spend event per member turn; the total is the sum */
export const spent = (crew) => crew.events().filter((e) => e.type === "spend").reduce((a, e) => a + (e.usd ?? 0), 0);
export const spentBy = (crew) => crew.events().filter((e) => e.type === "spend").reduce((m, e) => ((m[e.by] = (m[e.by] ?? 0) + (e.usd ?? 0)), m), {});

export function status(crew) {
  const ms = mainState(crew), ev = crew.events();
  return { main: ms, spent: Number(spent(crew).toFixed(2)), budget: crew.spec.budget, lands: ev.filter((e) => e.type === "land").length, refused: ev.filter((e) => e.type === "land.refused").length, byMember: spentBy(crew), recent: ev.filter((e) => e.type === "land" || e.type === "land.refused").slice(-12) };
}

// ---------------------------------------------------------------- CLI
if (process.argv[1] && fileURLToPath(import.meta.url) === path.resolve(process.argv[1])) {
  const [cmd, ...rest] = process.argv.slice(2);
  const opt = Object.fromEntries(rest.filter((a) => a.startsWith("--")).map((a) => { const [k, ...v] = a.slice(2).split("="); return [k, v.join("=") || true]; }));
  const words = rest.filter((a) => !a.startsWith("--")).join(" ");
  const dir = process.env.CREW_DIR, me = process.env.CREW_ME;
  try {
    if (!dir || !me) refuse("CREW_DIR and CREW_ME must be set");
    const crew = openCrew(dir); crew.member(me);
    const out = {
      status: () => { const s = status(crew); return `main ${s.main.head?.slice(0, 10)} at ${s.main.rate}; spent $${s.spent} of $${s.budget}; ${s.lands} lands, ${s.refused} refused\n` + s.recent.map((e) => `  ${e.t.slice(11, 16)} ${e.by} ${e.type === "land" ? `landed ${e.head.slice(0, 10)}: ${e.before} → ${e.after}${e.msg ? ` (${e.msg})` : ""}` : `refused: ${e.why}`}`).join("\n"); },
      sync: () => sync(crew, me),
      land: () => { const r = land(crew, me, words); return `landed ${r.head.slice(0, 10)}: ${r.before} → ${r.after}`; },
      note: () => `noted to ${note(crew, me, opt.to, opt.text).join(", ")}`,
      notes: () => readNotes(crew, me).map((n) => `${n.t.slice(11, 16)} from ${n.by}: ${n.text}`).join("\n") || "no notes",
      post: () => `posted (${post(crew, me, { kind: opt.kind, area: opt.area, text: opt.text, evidence: opt.evidence, wrongIf: opt["wrong-if"] }).t})`,
      read: () => board(crew, opt.area ?? null).slice(-Number(opt.last ?? 50)).map((e) => `${e.kind} [${e.area}] by ${e.by}: ${e.text}\n   evidence: ${e.evidence}\n   wrong if: ${e.wrongIf}`).join("\n") || "the board is empty",
      claim: () => (claim(crew, me, opt.area, opt.text), `claimed [${opt.area}]`),
      drop: () => (dropClaim(crew, me, opt.area), `dropped [${opt.area}]`),
      claims: () => claims(crew).map((e) => `[${e.area}] ${e.by}: ${e.text}`).join("\n") || "no claims in force",
    }[cmd];
    if (!out) refuse("usage: crew.mjs status|sync|land [msg]|note --to= --text=|notes|post --kind= --area= --text= --evidence= --wrong-if=|read|claim --area= --text=|drop --area=|claims");
    console.log(out());
  } catch (e) { if (e instanceof CrewRefusal) { console.error(e.message); process.exit(e.code); } throw e; }
}
