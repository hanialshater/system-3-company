// K10 (plan 2026-10-21 §3): the launcher's tool guard, enforced in code and not by prompt. Benchmark 5 / the M4 plan:
// agents ran with `dontAsk` + Bash and no protected-path hook or deploy rule. One pure decision (`decide`) backs two SDK
// entry points, because neither covers every call alone (signatures read from the installed SDK 0.3.293 sdk.d.ts):
//   - canUseTool(toolName, input, {signal, toolUseID, …}) => Promise<PermissionResult>, PermissionResult being
//     {behavior:"allow", updatedInput?} | {behavior:"deny", message, interrupt?}. It is called only for a call that
//     would prompt: never for a tool in `allowedTools`, never under permissionPrompts "none", and not for a call a
//     settings allow rule approves (the company's .claude/settings.json allows `Bash(npm run deploy:*)` and
//     `Bash(node tools/company.mjs:*)`, which settingSources ["project"] loads);
//   - so the same decision runs as a PreToolUse hook (HookCallback (input, toolUseID, {signal}) => Promise<HookJSONOutput>,
//     input {tool_name, tool_input, cwd, …}), which sees every call before the permission rules; it only denies
//     ({hookSpecificOutput:{hookEventName:"PreToolUse", permissionDecision:"deny", permissionDecisionReason}}) and
//     otherwise returns {} (the normal permission flow, then canUseTool, decides).
// What it denies: (1) Write/Edit/MultiEdit/NotebookEdit on a path matching a protected-paths glob of any root it was
// given (the order's worktree, the repo it came from); (2) Bash matching DENY_BASH (deploy, push, publish, claims:
// publish is code-only, a builder never verifies a claim); (3) a tool not in the role's list (what dontAsk did for
// tools outside allowedTools). Every denial goes to `record` once per tool call (the launcher logs a `guard` event).
// Bash that writes a protected file (sed -i, >) is not parsed here: the company's own hook (loaded with the project
// settings) is best effort for it, and K7's commit check refuses the change whatever made it.
import fs from "node:fs";
import path from "node:path";

// the plan's pattern, plus: `npm run company -- publish` (the company CLI's usual spelling, which the plan's
// `tools/company.mjs\s+publish` missed) and git options before `push` (`git -C <dir> push`)
export const DENY_BASH = /npm\s+run\s+deploy|vercel|\[deploy\]|\bgit(\s+-[Cc]\s+\S+|\s+--?[\w-]+(=\S+)?)*\s+push\b|\bgh\s+(workflow|api)\b|company(\.mjs)?\s+(--\s+)?publish\b|claim\.mjs/i;
export const WRITE_TOOLS = ["Write", "Edit", "MultiEdit", "NotebookEdit"];
export const DEFAULT_TOOLS = ["Bash", "Read", "Write", "Edit", "Glob", "Grep"]; // the launcher's list before K10
/** Tools the guard must see on every call: kept out of `allowedTools`, so canUseTool is asked for them. */
export const GUARDED = ["Bash", ...WRITE_TOOLS];

/** A protected-paths glob as a regex: the company hook's own translation (as workspace.mjs globRe). */
export const globRe = (g) => new RegExp("^" + g.replace(/[.+^${}()|[\]\\]/g, "\\$&").replace(/\*\*/g, "§").replace(/\*/g, "[^/]*").replace(/§/g, ".*") + "$");
/** The real path of `p`, through its deepest existing ancestor (a new file under a symlinked dir is still caught). */
export function realish(p) {
  let head = path.resolve(p), tail = [];
  while (!fs.existsSync(head) && path.dirname(head) !== head) { tail.unshift(path.basename(head)); head = path.dirname(head); }
  try { head = fs.realpathSync(head); } catch {}
  return path.join(head, ...tail);
}

/** Why tool call (`tool`, `input`) is denied, as {rule, why, detail}, or null (allowed).
 *  opts: tools (the role's list; null = any), roots ([{dir, globs:[glob strings]}]), cwd (relative paths resolve here). */
export function decide(tool, input = {}, { tools = null, roots = [], cwd = process.cwd() } = {}) {
  if (tools && !tools.includes(tool)) return { rule: "tool", why: `${tool} is not one of this role's tools (${tools.join(", ")})`, detail: tool };
  if (WRITE_TOOLS.includes(tool)) {
    const p = input?.file_path ?? input?.notebook_path;
    if (typeof p !== "string" || !p) return null;
    const abs = realish(path.resolve(cwd, p));
    for (const r of roots) {
      const rel = path.relative(realish(r.dir), abs).split(path.sep).join("/");
      if (!rel || rel.startsWith("..") || path.isAbsolute(rel)) continue;
      const g = (r.globs ?? []).find((x) => globRe(x).test(rel));
      if (g) return { rule: "protected-path", why: `${rel} is a protected path (${g} in ${r.file ?? "protected-paths.txt"}): only a ratified amendment changes it`, detail: abs };
    }
    return null;
  }
  if (tool === "Bash") {
    const c = String(input?.command ?? "");
    const m = DENY_BASH.exec(c);
    if (m) return { rule: "bash", why: `\`${m[0]}\` is not allowed in an agent session (deploys need the founder's approval; pushing, publishing and verifying claims are code's or a person's)`, detail: c.slice(0, 300) };
  }
  return null;
}

/** The guard for one session: { canUseTool, preToolUse, denials }. `record(denial)` is called once per denied call. */
export function makeGuard({ tools = null, roots = [], cwd = process.cwd(), record = () => {} } = {}) {
  const denials = [], seen = new Set();
  const deny = (via, tool, d, id) => {
    const key = id ?? `${via}:${denials.length}`;
    if (!seen.has(key)) { seen.add(key); const x = { via, tool, ...d, toolUseID: id ?? null }; denials.push(x); try { record(x); } catch {} }
    return `Denied by the launcher's guard (K10): ${d.why}.`;
  };
  return {
    denials,
    /** SDK CanUseTool. */
    async canUseTool(toolName, input, options = {}) {
      const d = decide(toolName, input, { tools, roots, cwd });
      if (!d) return { behavior: "allow", updatedInput: input };
      return { behavior: "deny", message: deny("canUseTool", toolName, d, options.toolUseID) };
    },
    /** SDK HookCallback for PreToolUse. */
    async preToolUse(input, toolUseID) {
      if (input?.hook_event_name && input.hook_event_name !== "PreToolUse") return {};
      const d = decide(input?.tool_name, input?.tool_input ?? {}, { tools, roots, cwd: input?.cwd || cwd });
      if (!d) return {};
      return { hookSpecificOutput: { hookEventName: "PreToolUse", permissionDecision: "deny", permissionDecisionReason: deny("hook", input.tool_name, d, toolUseID ?? input?.tool_use_id) } };
    },
  };
}
