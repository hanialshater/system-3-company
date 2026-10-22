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
// given (the order's worktree, the repo it came from); (2) Bash that bashDenial refuses (deploy, push, publish, claims:
// publish is code-only, a builder never verifies a claim); (3) a tool not in the role's list (what dontAsk did for
// tools outside allowedTools). Every denial goes to `record` once per tool call (the launcher logs a `guard` event).
// Bash that writes a protected file (sed -i, >) is not parsed here: the company's own hook (loaded with the project
// settings) is best effort for it, and K7's commit check refuses the change whatever made it.
import fs from "node:fs";
import path from "node:path";

// K10 review: one regex over the whole line both missed and over-caught. Missed: `git -C '/a b' push`, `git --git-dir /x
// push`, `git send-pack`, `npm run company --silent -- publish`, `node tools/company.mjs --x publish`, `yarn deploy`.
// Over-caught (a lost turn and a guard event each): `cat vercel.json` (the deploy runbook's own file), `grep -r claim.mjs`,
// `git log --grep '[deploy]'`, `git push-to-x`. So Bash is now split into simple commands (bashDenial: quotes, ; & | &&
// || newlines, ( ) and `…`/$(…) substitutions, `bash -c`/`eval` strings, env/sudo/xargs-style wrappers) and each command
// is judged by its words: git push/send-pack (global options and their values skipped), a git commit-like command with
// `[deploy]` anywhere in the line, an npm/pnpm/yarn/bun deploy script, the company CLI with a `publish` word, claim.mjs
// run, vercel run (directly or through npx/npm exec/dlx), gh workflow/api. DENY_BASH stays as a raw backstop for the
// plainest spellings (words the splitter could lose, e.g. inside a heredoc fed to a shell).
export const DENY_BASH = /\bgit\s+(push|send-pack)(?![\w-])|\bnpm\s+run\s+deploy(?![\w-])|\bgh\s+(workflow|api)\b/i;
const GIT_VALUE_OPTS = ["-C", "-c", "--git-dir", "--work-tree", "--namespace", "--super-prefix", "--config-env"];
const GIT_COMMITS = ["commit", "commit-tree", "merge", "tag", "notes", "revert", "cherry-pick", "am", "rebase"];
const WRAPPERS = ["sudo", "env", "command", "exec", "builtin", "time", "nice", "nohup", "xargs", "timeout", "stdbuf", "ionice"];
const KEYWORDS = ["{", "}", "!", "if", "then", "else", "elif", "do", "while", "until"]; // `{ git push; }`, `if …; then git push`
const SHELLS = ["bash", "sh", "zsh", "dash", "ksh"];
const PKG = ["npm", "pnpm", "yarn", "bun"], RUNNERS = ["npx", "pnpx", "bunx"];
const base = (w) => String(w ?? "").split("/").pop();

/** The simple commands of shell line `s`, each as its words (quotes removed), plus the bodies of $(…) and `…`. */
export function shellCommands(s) {
  const cmds = [], subs = [];
  // each substitution is judged on its own and stands as one word in its command (`git -C $(pwd) push` is still git push)
  for (let prev = null; prev !== s;) { prev = s; s = String(s).replace(/\$\(([^()]*)\)|`([^`]*)`/g, (m, a, b) => { subs.push(a ?? b); return "SUB"; }); }
  let words = [], w = null, q = null;
  const endWord = () => { if (w != null) words.push(w); w = null; };
  const endCmd = () => { endWord(); if (words.length) cmds.push(words); words = []; };
  for (let i = 0; i < s.length; i++) {
    const c = s[i];
    if (q === "'") { if (c === "'") q = null; else w += c; continue; }
    if (q === '"') { if (c === '"') q = null; else if (c === "\\" && i + 1 < s.length) w += s[++i]; else w += c; continue; }
    if (c === "'" || c === '"') { q = c; w ??= ""; continue; }
    if (c === "\\" && i + 1 < s.length) { if (s[i + 1] !== "\n") w = (w ?? "") + s[i + 1]; i++; continue; }
    if (/\s/.test(c) && c !== "\n") { endWord(); continue; }
    if (";&|\n()".includes(c)) { endCmd(); continue; }
    if (c === "<" || c === ">") { endWord(); continue; }
    w = (w ?? "") + c;
  }
  endCmd();
  return { cmds, subs };
}

/** Why one simple command (`words`) is denied, as the matched spelling, or null. `line` is the whole Bash line. */
function commandDenial(words, line, depth) {
  let i = 0;
  // assignments and wrappers before the command (FOO=1 git push, sudo -E git push, timeout 30 git push, xargs -n1 git push)
  for (;;) {
    if (/^[A-Za-z_]\w*=/.test(words[i] ?? "")) { i++; continue; }
    if (KEYWORDS.includes(words[i])) { i++; continue; }
    const b = base(words[i]);
    if (!WRAPPERS.includes(b)) break;
    i++;
    while (i < words.length && (words[i].startsWith("-") || /^[A-Za-z_]\w*=/.test(words[i]))) i++;
    if (b === "timeout" && /^\d/.test(words[i] ?? "")) i++;
  }
  const w = words.slice(i), cmd = base(w[0]);
  if (!cmd) return null;
  const sub = (from = 1, valueOpts = []) => { let j = from; while (j < w.length && w[j].startsWith("-")) j += valueOpts.includes(w[j]) ? 2 : 1; return j; };
  if (SHELLS.includes(cmd)) { const j = w.findIndex((x, k) => k > 0 && /^-[a-z]*c[a-z]*$/.test(x)); return j > 0 && w[j + 1] != null ? bashDenial(w[j + 1], depth + 1) : null; }
  if (cmd === "eval") return bashDenial(w.slice(1).join(" "), depth + 1);
  if (cmd === "git") {
    const j = sub(1, GIT_VALUE_OPTS), s = w[j];
    if (s === "push" || s === "send-pack") return `git ${s}`;
    if (GIT_COMMITS.includes(s) && /\[deploy\]/i.test(line)) return "[deploy]";
    return null;
  }
  if (PKG.includes(cmd)) {
    let j = sub(1);
    if (["exec", "dlx", "x"].includes(w[j])) return commandDenial(w.slice(sub(j + 1)), line, depth);
    if (["run", "run-script", "rum", "urn"].includes(w[j])) j = sub(j + 1);
    else if (cmd === "npm") return null; // `npm deploy` is no npm command; npm scripts need `run`
    const script = w[j] ?? "";
    if (/^deploy(\W|$)/i.test(script)) return `${cmd} run ${script}`;
    if (script === "company" && w.slice(j + 1).includes("publish")) return `${cmd} run company … publish`;
    return null;
  }
  if (RUNNERS.includes(cmd)) return commandDenial(w.slice(sub(1)), line, depth);
  if (cmd === "node" || cmd.endsWith(".mjs") || cmd.endsWith(".js")) {
    const script = cmd === "node" ? base(w[sub(1, ["-r", "--require", "--import", "--loader"])]) : cmd, rest = cmd === "node" ? w.slice(sub(1, ["-r", "--require", "--import", "--loader"]) + 1) : w.slice(1);
    if (script === "claim.mjs") return "claim.mjs";
    if (script === "company.mjs" && rest.includes("publish")) return "company.mjs … publish";
    if (/^vercel(\.js)?$/.test(script)) return "vercel";
    return null;
  }
  if (/^vercel(@|$)/.test(cmd)) return "vercel";
  if (cmd === "gh") { const s = w[sub(1, ["-R", "--repo", "--hostname"])]; return s === "workflow" || s === "api" ? `gh ${s}` : null; }
  return null;
}

/** Why Bash line `c` is denied, as the matched spelling, or null. */
export function bashDenial(c, depth = 0) {
  c = String(c ?? "");
  const m = DENY_BASH.exec(c);
  if (m) return m[0];
  if (depth > 4) return null;
  const { cmds, subs } = shellCommands(c);
  for (const words of cmds) { const d = commandDenial(words, c, depth); if (d) return d; }
  for (const x of subs) { const d = bashDenial(x, depth + 1); if (d) return d; }
  return null;
}
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
 *  opts: tools (the role's list; null = any), roots ([{dir, globs:[glob strings], nested?}]: with `nested` n, the first
 *  n path segments under dir name a checkout and the globs apply below them), cwd (relative paths resolve here). */
export function decide(tool, input = {}, { tools = null, roots = [], cwd = process.cwd() } = {}) {
  if (tools && !tools.includes(tool)) return { rule: "tool", why: `${tool} is not one of this role's tools (${tools.join(", ")})`, detail: tool };
  if (WRITE_TOOLS.includes(tool)) {
    const p = input?.file_path ?? input?.notebook_path;
    if (typeof p !== "string" || !p) return null;
    const abs = realish(path.resolve(cwd, p));
    for (const r of roots) {
      let rel = path.relative(realish(r.dir), abs).split(path.sep).join("/");
      if (!rel || rel.startsWith("..") || path.isAbsolute(rel)) continue;
      if (r.nested) rel = rel.split("/").slice(r.nested).join("/"); // a root of checkouts (workspace.root): <worktree>/<path>
      if (!rel) continue;
      const g = (r.globs ?? []).find((x) => globRe(x).test(rel));
      if (g) return { rule: "protected-path", why: `${rel} is a protected path (${g} in ${r.file ?? "protected-paths.txt"}): only a ratified amendment changes it`, detail: abs };
    }
    return null;
  }
  if (tool === "Bash") {
    const c = String(input?.command ?? "");
    const m = bashDenial(c);
    if (m) return { rule: "bash", why: `\`${m}\` is not allowed in an agent session (deploys need the founder's approval; pushing, publishing and verifying claims are code's or a person's)`, detail: c.slice(0, 300) };
  }
  return null;
}

/** The guard for one session: { canUseTool, preToolUse, denials }. `record(denial)` is called once per denied call.
 *  strictTools: the role named its tools (the SDK `tools` option then hides the rest, and the hook backs it up). Unset
 *  (a role with no `tools`: every spec before K10), only canUseTool applies the list, so a call that needs no permission
 *  (TodoWrite) runs as it did under dontAsk and one that would prompt (WebFetch) is refused as dontAsk refused it. */
export function makeGuard({ tools = null, strictTools = true, roots = [], cwd = process.cwd(), record = () => {} } = {}) {
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
      const d = decide(input?.tool_name, input?.tool_input ?? {}, { tools: strictTools ? tools : null, roots, cwd: input?.cwd || cwd });
      if (!d) return {};
      return { hookSpecificOutput: { hookEventName: "PreToolUse", permissionDecision: "deny", permissionDecisionReason: deny("hook", input.tool_name, d, toolUseID ?? input?.tool_use_id) } };
    },
  };
}

// ---- the session's options, as pure functions (K10 review: nothing tested the wiring; a slip back to dontAsk +
// permissionPrompts "none", where canUseTool is never called, or a dropped hook kept every test green)
/** One launch's plan from `meta.mjs launch config` (cfg; null when the lookup failed) and the launcher's flags:
 *  { refused } (K10 review: a failed lookup started the session with no roots, so no protected-path rule: it fails
 *  closed now), or { cwd, tools, strictTools, sessionMin, maxTurns, settingSources, roots }.
 *  cli: { fromOrder, settingSources (the --setting-sources list, or null), sessionMin (--session-min, or null) };
 *  defaults: { cwd (the kernel), sessionMin, maxTurns, settingSources }. */
export function sessionPlan(cfg, cli = {}, defaults = {}) {
  if (!cfg || typeof cfg !== "object") return { refused: "launch config failed (see the meta-error note): no session starts without its guard's roots" };
  const strictTools = Array.isArray(cfg.tools), tools = strictTools ? cfg.tools : DEFAULT_TOOLS;
  const cwd = cli.fromOrder && cfg.workdir ? cfg.workdir : defaults.cwd;
  const settingSources = cfg.settingSources ?? cli.settingSources ?? (cli.fromOrder && cwd !== defaults.cwd ? ["project"] : defaults.settingSources ?? []);
  // K10 review: the role's sessionMin overrode --session-min, so an operator could not shorten a smoke run; an explicit
  // flag now wins, the role's value is the default under it
  const sessionMin = cli.sessionMin ?? cfg.sessionMin ?? defaults.sessionMin, maxTurns = cfg.maxTurns ?? defaults.maxTurns;
  return { cwd, tools, strictTools, sessionMin, maxTurns, settingSources, roots: cfg.roots ?? [] };
}
/** The query() options for plan `p` and its guard (makeGuard's). The write tools and Bash stay out of allowedTools (an
 *  allowed tool never reaches canUseTool); "default" with prompts answered by this host (canUseTool), where dontAsk +
 *  permissionPrompts "none" never called it; the PreToolUse hook sees every call. A role that names its tools gets
 *  them as the SDK `tools` (K10 review: denying alone left TodoWrite, Task, WebFetch visible, a turn and a guard event
 *  per try); a role that does not keeps the SDK's base set, as before K10. */
export function queryOptions(p, guard, { model, env, abortController } = {}) {
  return {
    cwd: p.cwd, model, abortController, env,
    settingSources: p.settingSources,
    ...(p.strictTools ? { tools: p.tools } : {}),
    allowedTools: p.tools.filter((t) => !GUARDED.includes(t)),
    permissionMode: "default", permissionPrompts: "host",
    canUseTool: guard.canUseTool,
    hooks: { PreToolUse: [{ hooks: [guard.preToolUse] }] },
    maxTurns: p.maxTurns,
  };
}
