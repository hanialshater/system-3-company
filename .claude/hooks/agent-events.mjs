#!/usr/bin/env node
// Agent-tool hook: writes `dispatch` and `report` events at the moment they happen, through
// `node tools/events.mjs add --spool`, so the event log no longer depends on someone running the backfill
// (W-716, W-1195; retro company/rituals/records/2026-10-16-retro-delegation.md H3, C1).
//
// It only records. It never blocks the tool call: on any error it logs to .serve/agent-events.log and exits 0.
// NOT WIRED: wiring is a change to .claude/settings.json, which needs the founder (F-31) and a tier-2
// readiness approval. The snippet is in company/engineering/readiness/2026-10-16-agent-events-hook.md.
//
// Events (stdin is the hook JSON from Claude Code):
//   PreToolUse  Agent|Task   -> dispatch: role = subagent_type, the description, source parsed from the prompt
//                               (`batch=<file>#B<n>` | `batch=SO-…` | `SO-<lane>-<n>` | `§4:<reason>` | none),
//                               chooser (`chooser=<role>` in the prompt, else the batch file's `poc:`, else the dispatcher).
//                               A dispatch with no source is still written, with `source=none`, so the gap shows.
//   PostToolUse Agent|Task   -> report, when the agent ran in the foreground (the response is its report).
//                               An async launch ("async_launched") is not a report: the hook only remembers
//                               agentId -> label in .serve/agent-events/, so the dispatch stays open.
//   SubagentStop             -> report for a remembered async agent (agent_id in the payload).
//
//   Git state of the main checkout (W-1337; batch 2026-10-16-r5-tools.md#B1): at SubagentStop (and at a foreground
//   PostToolUse report) it reads the main checkout's .git from the filesystem (no git process). If it has
//   rebase-merge/ or rebase-apply/ (a stuck rebase: its autostash holds other agents' edits), it writes one
//   `incident` event; if it has only MERGE_HEAD, or has gained stash entries since the agent's dispatch (baseline
//   taken at PreToolUse from .git/logs/refs/stash), it writes one `note` in room `incident`. Both name the agent
//   label and the state. The id is a hash of the state, so one state is reported once, by the first stop that sees it.
//   git >= 2.47 (RelNotes 2.47.0, pw/rebase-autostash-fix) no longer leaves rebase-merge/autostash when a rebase fails
//   to start: it re-applies the autostash and, when that conflicts, stores it as a stash entry named exactly
//   "autostash" and removes rebase-merge/. Such an entry (new since the baseline, or any when there is no baseline)
//   is the same stranding and also writes an `incident`.
//   An error here is logged and never stops the report event or the tool call.
// Writes go to the spool (ruling H2), one per repository via the git common dir: <main checkout>/company/ops/events-spool/.
// Env: S3_SPOOL (spool dir) or S3_EVENTS (spool = <its dir>/events-spool/; passed through to events.mjs),
//      S3_HOOK_LOG (error log), S3_HOOK_STATE (state dir),
//      S3_ROLE (the dispatcher's role id; default chief-of-staff),
//      S3_MAIN_CHECKOUT (the main checkout whose .git is read for the git-state check; tests point it at a tmp repo).

import fs from "node:fs";
import path from "node:path";
import crypto from "node:crypto";
import { spawnSync } from "node:child_process";
import { fileURLToPath } from "node:url";

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "../..");
const LOG = process.env.S3_HOOK_LOG ? path.resolve(process.env.S3_HOOK_LOG) : path.join(ROOT, ".serve/agent-events.log");
const STATE = process.env.S3_HOOK_STATE ? path.resolve(process.env.S3_HOOK_STATE) : path.join(ROOT, ".serve/agent-events");
const hash = (s, n = 10) => crypto.createHash("sha1").update(String(s)).digest("hex").slice(0, n);

function logError(msg) {
  try {
    fs.mkdirSync(path.dirname(LOG), { recursive: true });
    fs.appendFileSync(LOG, `${new Date().toISOString()} ${msg}\n`);
  } catch {}
}
process.on("uncaughtException", (e) => { logError(`uncaught: ${e?.stack ?? e}`); process.exit(0); });

const oneLine = (s, n) => {
  const l = String(s ?? "").split("\n").find((x) => x.trim())?.trim() ?? "";
  return l.length > n ? l.slice(0, n - 1) + "…" : l;
};

/** Source of a dispatch, from its prompt (dispatch-requests.md §2.3, §3.4, §4). */
export function parseSource(prompt = "") {
  const p = String(prompt);
  const batch = p.match(/\bbatch=([^\s,;)`"']+)/)?.[1]?.replace(/[.:]+$/, "");
  if (batch) return { source: `batch=${batch}`, kind: batch.startsWith("SO-") ? "standing-order" : "batch", batch };
  const so = p.match(/\b(SO-[A-Za-z0-9]+-\d+)\b/)?.[1];
  if (so) return { source: `batch=${so}`, kind: "standing-order", batch: so };
  const s4 = p.match(/§4:\s*([^\n]+)/)?.[1]?.trim();
  if (s4) return { source: `§4:${s4.length > 80 ? s4.slice(0, 79) + "…" : s4}`, kind: "section-4" };
  return { source: "none", kind: "none" };
}

/** Who chose the run: explicit `chooser=` > the batch file's `poc:` line > §4 / none: the dispatcher. */
export function parseChooser(prompt = "", src = parseSource(prompt), dispatcher = "chief-of-staff", root = ROOT) {
  const explicit = String(prompt).match(/\bchooser=([a-z0-9-]+)/)?.[1];
  if (explicit) return explicit;
  if (src.kind === "batch") {
    const file = path.resolve(root, src.batch.split("#")[0]);
    try {
      if (file.startsWith(root + path.sep) && fs.existsSync(file)) {
        const poc = fs.readFileSync(file, "utf8").match(/^poc:\s*([a-z0-9-]+)/m)?.[1];
        if (poc) return poc;
      }
    } catch {}
    return "unknown";
  }
  if (src.kind === "standing-order") return "unknown";
  return dispatcher;
}

function roomFor(role) {
  // The same rooms as tools/events.mjs; imported lazily so a syntax error there cannot break the tool call.
  return import(path.join(ROOT, "tools/events.mjs")).then((m) => m.roomFor(role)).catch(() => "chief-of-staff");
}

// Ruling H2 (company/decisions/2026-10-16-cos-ruling-h2-hook-spool.md): the hook writes only to the spool
// (`add --spool`, tools/lib/events-spool.mjs), never to company/ops/events.jsonl. The chief of staff folds it in.
function add(fields, body) {
  const args = [path.join(ROOT, "tools/events.mjs"), "add", "--spool"];
  for (const [k, v] of Object.entries(fields)) if (v !== undefined && v !== null && v !== "") args.push(`--${k}=${v}`);
  if (body !== undefined) args.push("--body-file=-");
  const r = spawnSync(process.execPath, args, { input: body ?? "", env: process.env, stdio: ["pipe", "ignore", "pipe"], timeout: 10_000, encoding: "utf8" });
  const err = String(r.stderr ?? "").trim();
  if (r.error || r.status !== 0) throw Object.assign(new Error(`events.mjs add failed (${r.error?.code ?? `exit ${r.status}`})`), { stderr: err });
  if (err) logError(`events.mjs add ${fields.id}: ${err.slice(0, 300)}`); // e.g. E1's "N unreadable line(s) skipped"
}

const responseText = (r) => {
  if (r == null) return "";
  if (typeof r === "string") return r;
  const c = r.content ?? r;
  if (Array.isArray(c)) return c.map((x) => (typeof x === "string" ? x : x?.text ?? "")).join("\n");
  return typeof c === "string" ? c : JSON.stringify(r);
};
const isAsyncLaunch = (r) => r?.status === "async_launched" || r?.isAsync === true || /Async agent launched successfully/.test(responseText(r));
const agentIdOf = (r) => r?.agentId ?? responseText(r).match(/agentId: (a[0-9a-f]{8,})/)?.[1];
const labelFor = (input, toolUseId) => `${input?.description ?? "agent"} ·${hash(toolUseId, 4)}`;

// ---- main-checkout git state (W-1337)
/** The main checkout of the repo holding `root` (`.git` dir = main; `.git` file -> gitdir -> commondir). */
function mainCheckoutOf(root = ROOT) {
  try {
    const dotgit = path.join(root, ".git");
    if (fs.statSync(dotgit).isDirectory()) return root;
    const gitdir = path.resolve(root, fs.readFileSync(dotgit, "utf8").match(/^gitdir:\s*(.+)$/m)[1].trim());
    const common = path.resolve(gitdir, fs.readFileSync(path.join(gitdir, "commondir"), "utf8").trim());
    if (path.basename(common) === ".git") return path.dirname(common);
  } catch {}
  return null;
}
const mainDir = () => (process.env.S3_MAIN_CHECKOUT ? path.resolve(process.env.S3_MAIN_CHECKOUT) : mainCheckoutOf());
const readTrim = (f) => { try { return fs.readFileSync(f, "utf8").trim(); } catch { return ""; } };

/** What the main checkout's .git holds now: in-progress states and the stash entries (newest first, as `stash list`). */
export function mainGitState(main = mainDir()) {
  const gd = main && path.join(main, ".git");
  if (!gd || !fs.existsSync(gd) || !fs.statSync(gd).isDirectory()) return null;
  const states = [];
  for (const d of ["rebase-merge", "rebase-apply"]) {
    if (!fs.existsSync(path.join(gd, d))) continue;
    const auto = readTrim(path.join(gd, d, "autostash"));
    const head = readTrim(path.join(gd, d, "head-name")).replace(/^refs\/heads\//, "");
    states.push({ kind: d, autostash: auto || null, head: head || null });
  }
  if (fs.existsSync(path.join(gd, "MERGE_HEAD"))) states.push({ kind: "MERGE_HEAD", sha: readTrim(path.join(gd, "MERGE_HEAD")).split("\n")[0] });
  const stash = readTrim(path.join(gd, "logs/refs/stash")).split("\n").filter(Boolean).map((l) => {
    const [, sha, msg] = l.match(/^[0-9a-f]+ ([0-9a-f]+) .*?\t(.*)$/) ?? [];
    return sha ? { sha, msg } : null;
  }).filter(Boolean).reverse();
  return { main, states, stash };
}

const stashShas = () => { try { return (mainGitState()?.stash ?? []).map((x) => x.sha); } catch { return null; } };

/** One event when the main checkout is mid-rebase / mid-merge or gained stash entries since `baseline` (sha list). */
async function checkMainGit({ label, role, baseline, when }) {
  try {
    const g = mainGitState();
    if (!g) return "no-main";
    const known = baseline ? new Set(baseline) : null;
    const isNew = (x) => !known || !known.has(x.sha);
    // git >= 2.47: a failed autostash re-apply lands on the stash list as "autostash" (see the header).
    const autostashed = g.stash.map((x, i) => ({ ...x, i })).filter((x) => x.msg === "autostash" && isNew(x));
    const gained = known ? g.stash.filter((x) => !known.has(x.sha) && x.msg !== "autostash") : [];
    if (!g.states.length && !gained.length && !autostashed.length) return "clean";
    const rebasing = [...g.states.filter((x) => x.kind !== "MERGE_HEAD"), ...autostashed];
    const parts = [
      ...g.states.map((x) => x.kind === "MERGE_HEAD" ? `MERGE_HEAD (${x.sha.slice(0, 9)})` : `${x.kind}/ (${x.head ?? "?"}${x.autostash ? `, autostash ${x.autostash.slice(0, 9)}` : ", no autostash"})`),
      ...autostashed.map((x) => `stash@{${x.i}} "autostash" (${x.sha.slice(0, 9)}, a failed autostash re-apply)`),
      ...(gained.length ? [`${gained.length} new stash entr${gained.length === 1 ? "y" : "ies"} since dispatch (${gained.map((x) => `"${x.msg.slice(0, 50)}"`).join(", ")})`] : []),
    ];
    const summary = `Main checkout git state when ${label} ${when}: ${parts.join(" · ")}`;
    const body = [
      `Seen by .claude/hooks/agent-events.mjs (W-1337) in ${g.main}/.git when ${label} (${role}) ${when}.`,
      "",
      ...g.states.map((x) => `- ${x.kind}${x.head ? ` on ${x.head}` : ""}${x.autostash ? `; autostash ${x.autostash}: other agents' edits may be ONLY there. Keep it: \`git stash store -m "autostash ${x.autostash}" ${x.autostash}\` (from the main checkout, by the chief of staff), then \`git stash show -p ${x.autostash}\`.` : ""}${x.sha ? ` ${x.sha}` : ""}`),
      ...autostashed.map((x) => `- stash@{${x.i}} ${x.sha} "autostash": git could not re-apply a rebase/merge autostash and stored it there; other agents' edits may be ONLY there. Keep it (do not drop or pop it in the main checkout); inspect with \`git stash show -p --include-untracked ${x.sha}\` (by the chief of staff).`),
      ...gained.map((x) => `- new stash entry ${x.sha} "${x.msg}"`),
      "",
      "Nobody should rebase, pull --rebase, stash or reset in the main checkout; integrate in a worktree (e.g. /home/user/s3c-int).",
      "Readiness: company/engineering/readiness/2026-10-16-shared-checkout-git-guard.md",
    ].join("\n");
    const fp = JSON.stringify({ s: g.states, n: gained.map((x) => x.sha), ...(autostashed.length ? { a: autostashed.map((x) => x.sha) } : {}) });
    add({ id: `hk-gs-${hash(fp)}`, ts: new Date().toISOString(), type: rebasing.length ? "incident" : "note", room: "incident", actor: role || "chief-of-staff", agent: label, subjects: ["W-1337", role].filter(Boolean).join(","), summary: summary.length > 300 ? summary.slice(0, 299) + "…" : summary, refs: "company/engineering/readiness/2026-10-16-shared-checkout-git-guard.md" }, body);
    return rebasing.length ? "incident" : "note";
  } catch (e) {
    logError(`git-state check: ${e?.message ?? e} | stderr: ${String(e?.stderr ?? "").trim().slice(0, 300)}`);
    return "error";
  }
}

/** The stash shas taken at this tool call's PreToolUse (null when none was taken); the file is consumed. */
function readBaseline(toolUseId) {
  const f = path.join(STATE, `pre-${hash(toolUseId)}.json`);
  try {
    const b = JSON.parse(fs.readFileSync(f, "utf8")).stash;
    fs.rmSync(f, { force: true });
    return Array.isArray(b) ? b : null;
  } catch { return null; }
}

export async function handle(payload) {
  const ev = payload?.hook_event_name;
  const dispatcher = process.env.S3_ROLE || "chief-of-staff";
  const now = new Date().toISOString();
  if ((ev === "PreToolUse" || ev === "PostToolUse") && !["Agent", "Task"].includes(payload.tool_name)) return "ignored";
  const input = payload.tool_input ?? {};
  const role = input.subagent_type || "general-purpose";
  const toolUseId = payload.tool_use_id || hash(JSON.stringify(input) + now);

  if (ev === "PreToolUse") {
    const src = parseSource(input.prompt);
    const chooser = parseChooser(input.prompt, src, dispatcher);
    const summary = `Dispatch ${role}${input.model ? ` (${input.model})` : ""}: ${oneLine(input.description || "agent", 100)} · ${src.source === "none" ? "source=none" : src.source} chooser=${chooser}`;
    try {
      // The stash baseline for this run (W-1337): per tool call, and the latest dispatch's for runs the hook cannot join.
      const shas = stashShas();
      if (shas) {
        fs.mkdirSync(STATE, { recursive: true });
        const b = JSON.stringify({ stash: shas, ts: now, toolUseId });
        fs.writeFileSync(path.join(STATE, `pre-${hash(toolUseId)}.json`), b);
        fs.writeFileSync(path.join(STATE, "stash-last.json"), b);
      }
    } catch (e) { logError(`stash baseline: ${e?.message ?? e}`); }
    add({ id: `hk-${hash(toolUseId + "dispatch")}`, ts: now, type: "dispatch", room: await roomFor(role), actor: dispatcher, agent: labelFor(input, toolUseId), subjects: role, summary, state: "working", source: src.source, chooser, "tool-use-id": toolUseId }, String(input.prompt ?? ""));
    return "dispatch";
  }
  if (ev === "PostToolUse") {
    const r = payload.tool_response;
    if (isAsyncLaunch(r)) {
      const id = agentIdOf(r);
      if (!id) return "async-no-id";
      fs.mkdirSync(STATE, { recursive: true });
      const pre = readBaseline(toolUseId);
      fs.writeFileSync(path.join(STATE, `${id}.json`), JSON.stringify({ toolUseId, label: labelFor(input, toolUseId), role, ts: now, stash: pre }));
      return "async";
    }
    const body = responseText(r);
    const baseline = readBaseline(toolUseId);
    add({ id: `hk-${hash(toolUseId + "report")}`, ts: now, type: "report", room: await roomFor(role), actor: role, agent: labelFor(input, toolUseId), subjects: role, summary: `${oneLine(input.description || "agent", 60)}: ${oneLine(body, 110) || "(no report text)"}`, state: "done", "tool-use-id": toolUseId }, body);
    await checkMainGit({ label: labelFor(input, toolUseId), role, baseline, when: "reported" });
    return "report";
  }
  if (ev === "SubagentStop") {
    const id = payload.agent_id;
    const f = id && path.join(STATE, `${path.basename(String(id))}.json`);
    if (!f || !fs.existsSync(f)) {
      // Not a run this hook launched async (or no id): still check the main checkout, against the latest dispatch.
      let last = null;
      try { last = JSON.parse(fs.readFileSync(path.join(STATE, "stash-last.json"), "utf8")).stash; } catch {}
      await checkMainGit({ label: id ? `agent ${String(id).slice(0, 40)}` : `a ${payload.agent_type || "subagent"} run`, role: payload.agent_type || "", baseline: last, when: "stopped" });
      return "unknown-agent";
    }
    const s = JSON.parse(fs.readFileSync(f, "utf8"));
    let body = "";
    try {
      // The last assistant text of the subagent's own transcript, if the harness gives its path.
      const lines = fs.readFileSync(payload.agent_transcript_path, "utf8").split("\n").filter(Boolean);
      for (let i = lines.length - 1; i >= 0 && !body; i--) {
        const o = JSON.parse(lines[i]);
        if (o.type === "assistant") body = responseText(o.message).trim();
      }
    } catch {}
    add({ id: `hk-${hash(s.toolUseId + "report")}`, ts: now, type: "report", room: await roomFor(s.role), actor: s.role, agent: s.label, subjects: s.role, summary: `${s.label.split(" ·")[0].slice(0, 60)}: ${oneLine(body, 110) || "finished (SubagentStop)"}`, state: "done", "tool-use-id": s.toolUseId }, body.slice(0, 50_000));
    fs.rmSync(f, { force: true });
    await checkMainGit({ label: s.label, role: s.role, baseline: s.stash ?? null, when: "stopped" });
    return "report";
  }
  return "ignored";
}

const isMain = process.argv[1] && path.resolve(process.argv[1]) === fileURLToPath(import.meta.url);
if (isMain) {
  let raw = "";
  try { raw = fs.readFileSync(0, "utf8"); } catch {}
  try {
    await handle(JSON.parse(raw || "{}"));
  } catch (e) {
    logError(`${e?.message ?? e} | stderr: ${String(e?.stderr ?? "").trim().slice(0, 300)} | payload: ${raw.slice(0, 200)}`);
  }
  process.exit(0);
}
