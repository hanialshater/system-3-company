// Mailboxes (founder decision F-42, company/decisions/2026-10-16-founder-mailbox-dispatch.md): managers decide by
// writing files; the chief of staff, the only process that starts agents, drains the `dispatcher` mailbox.
// Runbook: company/ops/runbook-mailbox.md. CLI: tools/mailbox.mjs. No dependencies.
//
// Spool: company/ops/mailboxes/<role>/ in the MAIN checkout (gitignored, like company/ops/slots/). A run inside a
// linked worktree resolves the main checkout through `git rev-parse --git-common-dir`, so a worker in
// /home/user/s3c-x reports into the same mailboxes the chief of staff drains. S3_MAILBOX_DIR overrides (tests).
//
// One file per message, `<ts>-<from>-<key>.md`, created complete and exclusively: the text goes to a temp file,
// then link(2) puts it at its name, which fails with EEXIST if the name is taken (then a new key is drawn). So
// parallel writers never collide and a reader never sees half a message. State sits beside each message as
// marker files, each created with O_EXCL: `<id>.read`, `<id>.claimed` (the dispatcher took it), `<id>.done`
// (its report was delivered). Messages are never edited or deleted by the tool.
//
// Lanes (decision §5): a dispatch-request is refused unless the sender is the POC of its lane on
// company/ceo-office/poc-map.md and the role is listed in that lane; only lane 10 requests checkers; nobody
// requests release-manager or anything naming deploy. dispatch-check repeats this for --source=mail:<id>.
import fs from "node:fs";
import path from "node:path";
import crypto from "node:crypto";
import { execFileSync } from "node:child_process";
import { fileURLToPath } from "node:url";

export const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "../..");
export const KINDS = ["dispatch-request", "report", "question", "answer"];
export const DISPATCH_KINDS = ["build", "wave", "check", "ritual", "incident", "other"];
export const DISPATCHER = "dispatcher";
// Lane-10 checkers named by the decision and the map (rule 3). The map's lane-10 row adds to this list, never removes.
export const CHECKERS = ["fact-checker", "qa-tester", "learner-evaluator", "accessibility-reviewer", "pedagogy-critic"];
export const FIELDS = ["id", "ts", "from", "to", "kind", "role", "lane", "project", "dispatch-kind", "title", "budget", "done-when", "stop-if", "worktree", "in-reply-to"];
const DEPLOY_RE = /deploy/i;

// The main checkout: the parent of the shared .git directory. Falls back to this file's repository.
export function mainRoot(root = ROOT) {
  try {
    const common = execFileSync("git", ["rev-parse", "--path-format=absolute", "--git-common-dir"], { cwd: root, encoding: "utf8", stdio: ["ignore", "pipe", "ignore"] }).trim();
    if (common && path.basename(common) === ".git") return path.dirname(common);
  } catch {}
  return root;
}
let cachedBase = null;
export function baseDir() {
  if (process.env.S3_MAILBOX_DIR) return path.resolve(process.env.S3_MAILBOX_DIR);
  return (cachedBase ??= path.join(mainRoot(), "company/ops/mailboxes"));
}
export const boxDir = (role, base = baseDir()) => path.join(base, safeRole(role));

function safeRole(r) {
  const s = String(r ?? "");
  if (!/^[a-z0-9][a-z0-9-]*$/.test(s)) throw new MailError(`not a role id: "${s}"`);
  return s;
}
export class MailError extends Error {}

// ---- roles and lanes
export function agentRoles(root = ROOT) {
  const d = path.join(root, ".claude/agents");
  return new Set(fs.existsSync(d) ? fs.readdirSync(d).filter((f) => f.endsWith(".md")).map((f) => f.slice(0, -3)) : []);
}
const wordIn = (r, text) => new RegExp(`(^|[^a-z0-9-])${r}([^a-z0-9-]|$)`).test(text);
// Lane number -> { pocs: Set, roles: Set } from the map's table: column 3 (POC) and column 4 (roles dispatched).
// A role counts when its id appears as a whole word. Prose in a cell ("launch-review participants") names no role,
// so such a lane accepts nothing by mail until the map lists ids: the tool fails closed.
export function readLanes(root = ROOT) {
  const p = path.join(root, "company/ceo-office/poc-map.md");
  const lanes = new Map();
  if (!fs.existsSync(p)) return lanes;
  const known = agentRoles(root);
  for (const line of fs.readFileSync(p, "utf8").split("\n")) {
    const m = /^\|\s*(\d+)\s*\|[^|]*\|([^|]*)\|([^|]*)\|/.exec(line);
    if (!m) continue;
    lanes.set(m[1], {
      pocs: new Set([...known].filter((r) => wordIn(r, m[2]))),
      roles: new Set([...known].filter((r) => wordIn(r, m[3]))),
    });
  }
  return lanes;
}
export function checkerSet(lanes) {
  const l10 = lanes.get("10");
  return new Set([...CHECKERS, ...(l10 ? [...l10.roles] : [])]);
}

// The lane rule (decision §5). msg: { from, role, lane, text }. Returns { ok, lane, reasons }.
export function laneCheck({ from, role, lane, text = "" }, { root = ROOT, lanes = readLanes(root) } = {}) {
  const reasons = [];
  const known = agentRoles(root);
  const ln = lane === undefined || lane === null || lane === true || lane === "" ? null : String(lane).trim();
  if (!role) reasons.push("no role: a dispatch-request names the role to start (--role, or --to=<role>)");
  else if (!known.has(role)) reasons.push(`role ${role} has no .claude/agents/${role}.md (poc-map rule 4: no POC, no dispatch)`);
  if (role === "release-manager") reasons.push("release-manager is never requested by mail: publishing and deploy go through the founder (decision §5)");
  if (DEPLOY_RE.test(text)) reasons.push('the request names "deploy": no mailbox request may touch a deploy path (decision §5); remove the word or ask the founder through the chief of staff');
  if (!lanes.size) { reasons.push("company/ceo-office/poc-map.md has no lane table: nothing can be requested"); return { ok: false, lane: ln, reasons }; }
  const own = [...lanes].filter(([, l]) => l.pocs.has(from)).map(([n]) => n);
  let use = ln;
  if (!own.length) reasons.push(`${from} is not the POC of any lane on poc-map.md, so it requests nothing`);
  else if (!use) {
    if (own.length === 1) use = own[0];
    else reasons.push(`${from} is POC of lanes ${own.join(", ")}: name one with --lane`);
  } else if (!own.includes(use)) reasons.push(`${from} is not the POC of lane ${use} (its lane${own.length > 1 ? "s are" : " is"} ${own.join(", ")})`);
  if (use === "11") reasons.push("lane 11 (release and deploy) is never requested by mail");
  if (role && checkerSet(lanes).has(role) && use !== "10") reasons.push(`${role} is a checker: only lane 10 (evaluation-steward) requests checkers (poc-map rule 3)${use ? `, not lane ${use}` : ""}`);
  if (role && use && lanes.has(use) && own.includes(use)) {
    const l = lanes.get(use);
    // Lane 1: a category manager also requests its own strand managers (cm-<domain>-<strand>), which the map names
    // in prose ("the CM's strand managers"). Only its own: the prefix is the sender's id plus a hyphen.
    const strand = use === "1" && /^cm-/.test(from) && role.startsWith(`${from}-`) && known.has(role);
    if (!l.roles.has(role) && !strand) reasons.push(`role ${role} is not dispatched in lane ${use} on poc-map.md (lane ${use} lists ${[...l.roles].join(", ") || "no role ids"})`);
  } else if (use && !lanes.has(use)) reasons.push(`lane ${use} is not on poc-map.md`);
  return { ok: reasons.length === 0, lane: use, reasons: [...new Set(reasons)] };
}

// ---- messages
const stamp = (d) => d.toISOString().replace(/[-:]/g, "").replace(".", "");
export function format(fm, body) {
  const lines = ["---"];
  for (const k of FIELDS) if (fm[k] !== undefined && fm[k] !== null && fm[k] !== "") lines.push(`${k}: ${fm[k]}`);
  lines.push("---", "");
  return lines.join("\n") + String(body ?? "").replace(/\s*$/, "\n");
}
export function parse(text) {
  const m = /^---\n([\s\S]*?)\n---\n?([\s\S]*)$/.exec(text);
  if (!m) return { fm: {}, body: text };
  const fm = {};
  for (const l of m[1].split("\n")) { const i = l.indexOf(":"); if (i > 0) fm[l.slice(0, i).trim()] = l.slice(i + 1).trim(); }
  return { fm, body: m[2].replace(/^\n/, "") };
}

// Write one message into `to`'s mailbox. Returns { id, file }. Throws MailError on a refusal.
export function send(opts, { root = ROOT, base = baseDir(), now = new Date() } = {}) {
  const kind = opts.kind;
  if (!KINDS.includes(kind)) throw new MailError(`--kind must be one of ${KINDS.join(", ")}`);
  const from = safeRole(opts.from);
  let to = opts.to === undefined || opts.to === true ? null : safeRole(opts.to);
  let role = opts.role === undefined || opts.role === true ? null : safeRole(opts.role);
  const known = agentRoles(root);
  if (!known.has(from)) throw new MailError(`--from=${from} has no .claude/agents/${from}.md`);
  const fm = { from, kind, project: opts.project, budget: opts.budget, "done-when": opts["done-when"], "stop-if": opts["stop-if"], title: opts.title, worktree: opts.worktree, "in-reply-to": opts["in-reply-to"] };
  for (const [k, v] of Object.entries(fm)) {
    if (v === true) throw new MailError(`--${k} needs a value`);
    if (typeof v === "string" && /[\r\n]/.test(v)) throw new MailError(`--${k} must be one line`);
  }
  if (!fm.project) throw new MailError("--project is required (an approved tag in company/ops/projects.json, as for every batch item)");
  const body = opts.body;
  if (body === undefined || body === true || String(body).trim() === "") throw new MailError("the message is empty: pass --file=<path> or --body=<text>");
  if (kind === "dispatch-request") {
    // --to=dispatcher --role=X, or --to=X as shorthand: either way the file goes to the dispatcher's mailbox.
    if (to && to !== DISPATCHER) { if (role && role !== to) throw new MailError(`--to=${to} and --role=${role} disagree`); role = to; }
    to = DISPATCHER;
    for (const k of ["done-when", "stop-if", "budget"]) if (!fm[k]) throw new MailError(`a dispatch-request needs --${k}`);
    const dk = opts["dispatch-kind"] === undefined ? (role === "demo-builder" ? "build" : "other") : String(opts["dispatch-kind"]);
    if (!DISPATCH_KINDS.includes(dk)) throw new MailError(`--dispatch-kind must be one of ${DISPATCH_KINDS.join(", ")}`);
    fm["dispatch-kind"] = dk;
    const proj = projectStatus(fm.project, root);
    if (!proj.ok) throw new MailError(`refused: ${proj.reason}`);
    const text = [fm.title, fm.budget, fm["done-when"], fm["stop-if"], fm.project, role, body].filter(Boolean).join("\n");
    const lc = laneCheck({ from, role, lane: opts.lane, text }, { root });
    if (!lc.ok) throw new MailError(`refused: ${lc.reasons.join("; ")}`);
    fm.role = role; fm.lane = lc.lane;
  } else {
    if (!to) throw new MailError("--to is required");
    if (to !== DISPATCHER && !known.has(to)) throw new MailError(`--to=${to} has no .claude/agents/${to}.md`);
    if (opts.lane !== undefined && opts.lane !== true) fm.lane = String(opts.lane);
    if (role) fm.role = role;
  }
  fm.to = to;
  const dir = boxDir(to, base);
  fs.mkdirSync(dir, { recursive: true });
  for (let i = 0; i < 20; i++) {
    const key = crypto.randomBytes(4).toString("hex");
    const id = `${stamp(now)}-${from}-${key}`;
    const file = path.join(dir, `${id}.md`);
    const tmp = path.join(dir, `.tmp-${id}-${process.pid}`);
    fs.writeFileSync(tmp, format({ ...fm, id, ts: now.toISOString() }, body), { flag: "wx" });
    try { fs.linkSync(tmp, file); return { id, file, to, role: fm.role ?? null, lane: fm.lane ?? null }; }
    catch (e) { if (e.code !== "EEXIST") throw e; }
    finally { fs.rmSync(tmp, { force: true }); }
  }
  throw new MailError("could not find a free message name after 20 tries");
}

// A project tag must be approved or active (projects.json is the portfolio-manager's file; read only).
export function projectStatus(tag, root = ROOT) {
  const p = path.join(root, "company/ops/projects.json");
  let list = [];
  try { list = JSON.parse(fs.readFileSync(p, "utf8")).projects ?? []; } catch { return { ok: false, reason: "company/ops/projects.json is unreadable" }; }
  const hit = list.find((x) => x.id === tag);
  if (!hit) return { ok: false, reason: `project ${tag} is not in company/ops/projects.json` };
  if (!["approved", "active", "in-flight"].includes(hit.status)) return { ok: false, reason: `project ${tag} is ${hit.status}, not approved` };
  return { ok: true, status: hit.status };
}

// ---- reading
export function roles(base = baseDir()) {
  return fs.existsSync(base) ? fs.readdirSync(base, { withFileTypes: true }).filter((d) => d.isDirectory()).map((d) => d.name).sort() : [];
}
const exists = (f) => fs.existsSync(f);
export function state(dir, id) {
  const m = (s) => path.join(dir, `${id}.${s}`);
  return { read: exists(m("read")), claimed: exists(m("claimed")) ? readMarker(m("claimed")) : null, done: exists(m("done")) ? readMarker(m("done")) : null };
}
function readMarker(f) { try { return JSON.parse(fs.readFileSync(f, "utf8")); } catch { return { unreadable: true }; } }
export function list(role, { base = baseDir() } = {}) {
  const dir = boxDir(role, base);
  if (!exists(dir)) return [];
  return fs.readdirSync(dir).filter((f) => f.endsWith(".md") && !f.startsWith(".")).sort().map((f) => {
    const id = f.slice(0, -3);
    const file = path.join(dir, f);
    const { fm, body } = parse(fs.readFileSync(file, "utf8"));
    return { id, file, fm, body, role, ...state(dir, id) };
  });
}
// Find a message by id in any mailbox (ids are unique: they carry the time, the sender and a random key).
export function find(id, { base = baseDir() } = {}) {
  if (!/^[A-Za-z0-9-]+$/.test(String(id ?? ""))) throw new MailError(`not a message id: "${id}"`);
  for (const r of roles(base)) {
    const file = path.join(base, r, `${id}.md`);
    if (exists(file)) { const { fm, body } = parse(fs.readFileSync(file, "utf8")); return { id, file, fm, body, role: r, ...state(path.dirname(file), id) }; }
  }
  return null;
}
function marker(file, data) {
  try { fs.writeFileSync(file, JSON.stringify(data) + "\n", { flag: "wx" }); return true; }
  catch (e) { if (e.code === "EEXIST") return false; throw e; }
}
export function markRead(id, { base = baseDir(), by = null, now = new Date() } = {}) {
  const m = find(id, { base });
  if (!m) throw new MailError(`no message ${id}`);
  marker(path.join(path.dirname(m.file), `${id}.read`), { ts: now.toISOString(), by });
  return m;
}
// The dispatcher takes a request: O_EXCL, so two drains cannot start the same request twice.
export function claim(id, { base = baseDir(), by = "chief-of-staff", agent = null, now = new Date() } = {}) {
  const m = find(id, { base });
  if (!m) throw new MailError(`no message ${id}`);
  if (m.fm.kind !== "dispatch-request") throw new MailError(`${id} is a ${m.fm.kind}, not a dispatch-request`);
  const ok = marker(path.join(path.dirname(m.file), `${id}.claimed`), { ts: now.toISOString(), by, agent: agent ?? label(m) });
  if (!ok) throw new MailError(`${id} is already claimed (${JSON.stringify(state(path.dirname(m.file), id).claimed)})`);
  marker(path.join(path.dirname(m.file), `${id}.read`), { ts: now.toISOString(), by });
  return { ...m, claimed: { ts: now.toISOString(), by, agent: agent ?? label(m) } };
}
// The Agent call's description for a request: the ledger's "[project:<tag>]" prefix and a "·xxxx" run key (the
// message key's last four characters), so `events.mjs report --key=xxxx` and slot release match it.
export function label(m) {
  const key = m.id.split("-").pop().slice(-4);
  const title = (m.fm.title || firstLine(m.body)).slice(0, 70);
  return `[project:${m.fm.project}] mail ${m.fm.role}: ${title} ·${key}`;
}
const firstLine = (s) => String(s ?? "").split("\n").map((l) => l.replace(/^#+\s*/, "").trim()).find(Boolean) ?? "";
const shq = (s) => `'${String(s).replace(/'/g, `'\\''`)}'`;

// Every unclaimed dispatch-request, re-checked against today's map, with the lines the chief of staff runs.
// Writes nothing (decision §6: the chief of staff records the events; single writer).
export function drain(role = DISPATCHER, { base = baseDir(), root = ROOT } = {}) {
  return list(role, { base }).filter((m) => m.fm.kind === "dispatch-request" && !m.claimed).map((m) => {
    const text = [m.fm.title, m.fm.budget, m.fm["done-when"], m.fm["stop-if"], m.fm.project, m.fm.role, m.body].filter(Boolean).join("\n");
    const lc = laneCheck({ from: m.fm.from, role: m.fm.role, lane: m.fm.lane, text }, { root });
    const dk = m.fm["dispatch-kind"] || "other";
    const lab = label(m);
    const builds = dk === "build" || dk === "wave";
    const check = `node tools/dispatch-check.mjs --kind=${dk} --role=${m.fm.role} --source=mail:${m.id} --chooser=${m.fm.from} --agent=${shq(lab)}${builds ? ` --worktree=${m.fm.worktree || "<worktree>"}` : ""} --running=<N>${builds ? " --builders=<N>" : ""}`;
    const event = `node tools/events.mjs add --type=dispatch --room=<room of ${m.fm.role}> --actor=chief-of-staff --agent=${shq(lab)} --subjects=${m.fm.role} --source=mail:${m.id} --chooser=${m.fm.from} --key=${shq(lab.split("·").pop())} --refs=${m.file} --summary=${shq(`Dispatch ${m.fm.role} from mail ${m.id} (lane ${m.fm.lane}, chooser ${m.fm.from})`)} --body-file=${m.file} --state=working`;
    return { id: m.id, from: m.fm.from, role: m.fm.role, lane: m.fm.lane, project: m.fm.project, kind: dk, title: m.fm.title || firstLine(m.body), brief: m.file, label: lab, ok: lc.ok, refused: lc.reasons, check, claim: `node tools/mailbox.mjs claim ${m.id} --agent=${shq(lab)}`, event };
  });
}

// Deliver a worker's report to the requester's mailbox (kind report, in-reply-to the request) and mark it done.
export function done(id, reportPath, { base = baseDir(), root = ROOT, now = new Date() } = {}) {
  const m = find(id, { base });
  if (!m) throw new MailError(`no message ${id}`);
  if (m.fm.kind !== "dispatch-request") throw new MailError(`${id} is a ${m.fm.kind}, not a dispatch-request`);
  if (!m.claimed) throw new MailError(`${id} was never claimed: claim it when you start the agent, then report`);
  if (m.done) throw new MailError(`${id} is already done (report ${m.done.report})`);
  if (!reportPath || reportPath === true || !fs.existsSync(reportPath)) throw new MailError(`--report=<path> must name an existing file (got ${reportPath})`);
  const body = fs.readFileSync(reportPath, "utf8");
  const dir = path.dirname(m.file);
  // Take the done marker first, so two `done` runs deliver one report.
  if (!marker(path.join(dir, `${id}.done`), { ts: now.toISOString(), report: path.resolve(reportPath), pending: true })) throw new MailError(`${id} is already done`);
  let sent;
  try {
    sent = send({ from: m.fm.role, to: m.fm.from, kind: "report", project: m.fm.project, lane: m.fm.lane, title: `report on ${m.fm.title || id}`, "in-reply-to": id, body }, { root, base, now });
  } catch (e) { fs.rmSync(path.join(dir, `${id}.done`), { force: true }); throw e; }
  fs.writeFileSync(path.join(dir, `${id}.done`), JSON.stringify({ ts: now.toISOString(), report: path.resolve(reportPath), reply: sent.id }) + "\n");
  const lab = m.claimed.agent || label(m);
  const event = `node tools/events.mjs report --agent=${shq(lab)} --actor=${m.fm.role} --key=${shq(lab.split("·").pop())} --source=mail:${id} --refs=${sent.file} --summary=${shq(`${m.fm.role} reported on mail ${id} to ${m.fm.from}`)} --body-file=${sent.file}`;
  return { id, reply: sent.id, file: sent.file, to: m.fm.from, event };
}

export function status({ base = baseDir() } = {}) {
  return roles(base).map((r) => {
    const all = list(r, { base });
    return { role: r, total: all.length, unread: all.filter((m) => !m.read).length, unclaimed: all.filter((m) => m.fm.kind === "dispatch-request" && !m.claimed).length, reportsUnread: all.filter((m) => m.fm.kind === "report" && !m.read).length };
  });
}
