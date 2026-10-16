#!/usr/bin/env node
// Agent-tool hook: writes `dispatch` and `report` events at the moment they happen, through
// `node tools/events.mjs add`, so the event log no longer depends on someone running the backfill
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
// Env: S3_EVENTS (event log, passed through to events.mjs), S3_HOOK_LOG (error log), S3_HOOK_STATE (state dir),
//      S3_ROLE (the dispatcher's role id; default chief-of-staff).

import fs from "node:fs";
import path from "node:path";
import crypto from "node:crypto";
import { execFileSync } from "node:child_process";
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

function add(fields, body) {
  const args = [path.join(ROOT, "tools/events.mjs"), "add"];
  for (const [k, v] of Object.entries(fields)) if (v !== undefined && v !== null && v !== "") args.push(`--${k}=${v}`);
  if (body !== undefined) args.push("--body-file=-");
  execFileSync(process.execPath, args, { input: body ?? "", env: process.env, stdio: ["pipe", "ignore", "pipe"], timeout: 10_000 });
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
    add({ id: `hk-${hash(toolUseId + "dispatch")}`, ts: now, type: "dispatch", room: await roomFor(role), actor: dispatcher, agent: labelFor(input, toolUseId), subjects: role, summary, state: "working", source: src.source, chooser, "tool-use-id": toolUseId }, String(input.prompt ?? ""));
    return "dispatch";
  }
  if (ev === "PostToolUse") {
    const r = payload.tool_response;
    if (isAsyncLaunch(r)) {
      const id = agentIdOf(r);
      if (!id) return "async-no-id";
      fs.mkdirSync(STATE, { recursive: true });
      fs.writeFileSync(path.join(STATE, `${id}.json`), JSON.stringify({ toolUseId, label: labelFor(input, toolUseId), role, ts: now }));
      return "async";
    }
    const body = responseText(r);
    add({ id: `hk-${hash(toolUseId + "report")}`, ts: now, type: "report", room: await roomFor(role), actor: role, agent: labelFor(input, toolUseId), subjects: role, summary: `${oneLine(input.description || "agent", 60)}: ${oneLine(body, 110) || "(no report text)"}`, state: "done", "tool-use-id": toolUseId }, body);
    return "report";
  }
  if (ev === "SubagentStop") {
    const id = payload.agent_id;
    const f = id && path.join(STATE, `${path.basename(String(id))}.json`);
    if (!f || !fs.existsSync(f)) return "unknown-agent";
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
