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
// Bash that writes a protected file: a redirect (`>`, `>>`, `>|`, `&>`, `>&<file>`) or a `tee` argument is judged as a
// write tool's path is (M6 prep); other writers (sed -i, cp, mv, a script) are not parsed here: the company's own hook
// (loaded with the project settings) is best effort for them, and K7's commit check refuses the change whatever made it.
import fs from "node:fs";
import path from "node:path";
import { spawn } from "node:child_process";

// K10 review: one regex over the whole line both missed and over-caught. Missed: `git -C '/a b' push`, `git --git-dir /x
// push`, `git send-pack`, `npm run company --silent -- publish`, `node tools/company.mjs --x publish`, `yarn deploy`.
// Over-caught (a lost turn and a guard event each): `cat vercel.json` (the deploy runbook's own file), `grep -r claim.mjs`,
// `git log --grep '[deploy]'`, `git push-to-x`. So Bash is now split into simple commands (bashDenial: quotes, ; & | &&
// || newlines, ( ) and `…`/$(…) substitutions, `bash -c`/`eval` strings, env/sudo/xargs-style wrappers) and each command
// is judged by its words: git push/send-pack (global options and their values skipped), a git commit-like command with
// `[deploy]` anywhere in the line, an npm/pnpm/yarn/bun deploy script, the company CLI with a `publish` word, claim.mjs
// run, vercel run (directly or through npx/npm exec/dlx), gh workflow/api. DENY_BASH stays as a raw backstop for the
// plainest spellings (words the splitter could lose, e.g. inside a heredoc fed to a shell).
// K10 fix review (821f5c7d1): the company's deploy is `deploy = node tools/deploy.mjs` (package.json), and `node
// tools/deploy.mjs --prod`, `node node_modules/vercel/dist/index.js deploy`, `npm --prefix /repo run deploy`, `npm -w x
// run deploy`, `corepack pnpm run deploy`, `git subtree push`, `git -c alias.p=push p` and `git $'push'` all passed.
// Now: deploy.mjs and a vercel path segment are denied as a node script (or as the command itself), the package managers
// skip their value options (--prefix, -w/--workspace, -C/--dir, --filter/-F, --cwd) and corepack is a wrapper. The
// claim rule is narrower than the plan's `claim\.mjs` anywhere, on purpose (`grep -r claim.mjs tools` reads, it runs
// nothing): claim.mjs is denied as the script, as a --require/--import/--loader value, or named in a node -e/-p string.
// The raw backstop no longer judges the arguments of a search command (grep/egrep/fgrep/rg without --pre, git grep, git
// log): `grep -rn 'git push' docs` passes, `echo 'git push' | sh` and `ssh h 'git push'` do not. These rules are still
// best effort: a git alias set in an earlier call (`git config alias.p push`), a script the agent writes and runs,
// a .git/hooks file all get through; the real backstops are K7's commit check and the credentials the session lacks.
// M4 integrate (K10 re-review of 90efcfa71): the value-option lists were hardcoded and incomplete (`npm --loglevel silent
// run deploy`, `npm -C /repo run deploy`, `pnpm --reporter silent run deploy`, `node --title x tools/deploy.mjs`,
// `node --disable-warning X tools/claim.mjs`), `--config-env alias.q=P` (space form) passed, a substitution or variable
// as the command or git subcommand was an opaque word that passed (`git $(echo push)`, `$(echo git) push`, `G=git; $G
// push`), and `gh pr merge` / `gh release create` were not denied. Now: a package manager's script is any word after
// its run word (and, for pnpm/yarn/bun, any word not after an install-like subcommand); a node line is denied when
// ANY of its words is a denied script (not only the one after the options it knows); a command, git subcommand, gh
// subcommand or package script that is a substitution or a variable cannot be read and is denied; git -c/--config-env
// and GIT_CONFIG_* assignments that define an alias or a command-running key, and `git config` writing one, are denied;
// gh pr merge, gh release writes, gh repo sync/delete/rename/archive/edit and gh run rerun are denied. And (K8+K9
// re-review) a line that names META_ROLE or clears the environment (env -i) is denied, and with the session's role
// known, a meta.mjs call whose --by or --role is another role.
export const DENY_BASH = /\bgit\s+(push|send-pack)(?![\w-])|\bnpm\s+run\s+deploy(?![\w-])|\bgh\s+(workflow|api)\b|\bgh\s+pr\s+merge\b/i;
const READERS = ["grep", "egrep", "fgrep", "rg"]; // commands whose arguments are patterns and files, never run
const PKG_VALUE_OPTS = { npm: ["--prefix", "-w", "--workspace", "--userconfig", "--cache"], pnpm: ["-C", "--dir", "--filter", "-F", "--workspace-dir"], yarn: ["--cwd"], bun: ["--cwd", "--filter", "-F"] };
const NODE_VALUE_OPTS = ["-r", "--require", "--import", "--loader", "--experimental-loader", "-e", "--eval", "-p", "--print", "--input-type", "--env-file", "--conditions", "-C", "--title", "--disable-warning", "--watch-path", "--run", "--inspect-port", "--test-name-pattern", "--test-reporter", "--test-reporter-destination", "--redirect-warnings", "--icu-data-dir", "--openssl-config", "--localstorage-file", "--experimental-config-file", "--env-file-if-exists", "--stack-size", "--max-old-space-size"];
// M6 prep review: integrate.mjs (the merge into the run's integration branch) and inbox-export.mjs (the chief of
// staff's code step, --commit) are code's stages, run by the supervisor: never an agent's
// M7 review: so are the M7 writers, run by code as the chief of staff's steps against the integration worktree:
// board-mirror.mjs and events-export.mjs (exports, --commit), lib/commit-file.mjs (their commit), and rituals.mjs ship
// (the ritual flow's ship stage; its other subcommands are code's pre and post checks, harmless in an agent's own
// worktree). An agent that ran them committed forged board items, company events or a ritual record on meta/m7 under
// the chief of staff's message; and m7-scope.mjs, the scope check code runs them through (adapters/s3c)
const CODE_ONLY = ["integrate.mjs", "inbox-export.mjs", "board-mirror.mjs", "events-export.mjs", "commit-file.mjs", "m7-scope.mjs"];
const CODE_ONLY_SUB = { "rituals.mjs": ["ship"] };
const CODE_ONLY_EVAL = new RegExp(`(^|[^\\w.-])(${CODE_ONLY.map((x) => x.replace(".", "\\.")).join("|")})`);
const NODE_SCRIPT_DENY = (p) => base(p) === "claim.mjs" ? "claim.mjs" : base(p) === "deploy.mjs" ? "deploy.mjs" : CODE_ONLY.includes(base(p)) ? `${base(p)} (a code stage)` : /(^|\/)vercel(\/|(\.js)?$)/.test(p) ? "vercel" : null;
const GIT_VALUE_OPTS = ["-C", "-c", "--git-dir", "--work-tree", "--namespace", "--super-prefix", "--config-env", "--exec-path", "--list-cmds", "--attr-source"];
// git config keys that run a command or alias one (workspace.mjs TRAP_KEY's list), as `-c k=v`, `--config-env k=E`,
// GIT_CONFIG_KEY_n=k / GIT_CONFIG_PARAMETERS, or `git config k v`
const GIT_RUN_KEY = /^(alias\.|core\.(hookspath|fsmonitor|pager|editor|sshcommand|askpass|gitproxy|alternaterefscommand|worktree)$|sequence\.editor$|filter\.|diff\.external$|diff\..+\.(textconv|command)$|merge\..+\.driver$|gpg\.|credential\.|uploadpack\.packobjectshook$|include\.path$|includeif\.|remote\..+\.(receivepack|uploadpack|vcs)$)/i;
const SUBST = "\u0001"; // a $(…) or `…` substitution, as it stands in its command's words
const opaque = (x) => x != null && (x.includes(SUBST) || x.includes("$"));
const PKG_RUN = ["run", "run-script", "rum", "urn"], PKG_EXEC = ["exec", "dlx", "x"];
const PKG_INSTALL = ["add", "install", "i", "ci", "remove", "rm", "uninstall", "un", "update", "up", "upgrade", "info", "view", "why", "outdated", "list", "ls", "link", "unlink", "pack", "publish", "init", "create", "config", "set", "get", "audit", "help"];
const GIT_COMMITS = ["commit", "commit-tree", "merge", "tag", "notes", "revert", "cherry-pick", "am", "rebase"];
// M6 prep review: setsid and unshare too (`setsid -f node …/supervisor.mjs launched` was judged as the command setsid)
const WRAPPERS = ["sudo", "env", "command", "exec", "builtin", "time", "nice", "nohup", "xargs", "timeout", "stdbuf", "ionice", "corepack", "setsid", "unshare"];
const KEYWORDS = ["{", "}", "!", "if", "then", "else", "elif", "do", "while", "until"]; // `{ git push; }`, `if …; then git push`
const SHELLS = ["bash", "sh", "zsh", "dash", "ksh"];
const PKG = ["npm", "pnpm", "yarn", "bun"], RUNNERS = ["npx", "pnpx", "bunx"];
const base = (w) => String(w ?? "").split("/").pop();
const bare = (w) => base(w).replace(/@[^/]*$/, ""); // corepack's pnpm@8.15.0, npx's vercel@latest

// M6 prep (M4 run, P4.6: the guard's one refusal was a false positive): `mkdir -p a b && cat > a/x.tsx <<'EOF' … EOF`
// was split on its newlines, so the TSX body was judged as commands (a `${…}` line is a command the guard cannot read).
// A heredoc's body is now data when the command that reads it only copies or prints it (DATA_SINKS, not piped on, no
// process substitution): it is taken out of the line before anything is judged, and its command's redirect target is
// judged as a write (decide). With an unquoted delimiter the shell still runs the body's $(…) and `…`, so those are
// judged; a heredoc fed to anything else (bash, node, python, a pipe) keeps its body in the line, judged as before.
const DATA_SINKS = ["cat", "tee", "head", "tail", "wc", "sort", "uniq", "tr", "cut", "nl", "fold", "base64", "md5sum", "sha1sum", "sha256sum", ...READERS];
const RUNS_FILE = ["source", ".", ...SHELLS, "node", "python", "python3", "perl", "ruby", "chmod", "exec"]; // a later command that runs a written file

/** The command head (bare name) of the last simple command in `text`, a line cut just before a `<<`. */
function headWord(text) { const { cmds } = shellCommands(text.replace(/<</g, " ")); const w = cmds.at(-1) ?? []; return bare(w[headOf(w)]); }
/** Whether command text `t` (from the command's start to the end of its line) is piped on or names a process
 *  substitution before its command ends: its heredoc's body then reaches another program, which may run it. */
function pipedOn(t) {
  let q = null;
  for (let i = 0; i < t.length; i++) {
    const c = t[i];
    if (q) { if (c === q) q = null; else if (c === "\\" && q === '"') i++; continue; }
    if (c === "'" || c === '"') { q = c; continue; }
    if (c === "\\") { i++; continue; }
    if ((c === ">" || c === "<") && t[i + 1] === "(") return true;
    if (c === "|") return t[i + 1] !== "|";
    if (c === "|" || c === ";" || c === "&" || c === "\n") return false;
  }
  return false;
}
/** Shell line `s` with each data heredoc's body taken out: { s, docs: [{delim, quoted, head, data, body, closed, targets}] }.
 *  A non-data heredoc (fed to a shell, an interpreter, a pipe) is in docs too, its body left in `s` as it was. */
export function heredocs(s) {
  s = String(s ?? "");
  let out = "", q = null, seg = 0, start = true; // start: the next character begins a word (a `#` there is a comment)
  const pending = [], docs = [];
  for (let i = 0; i < s.length; i++) {
    const c = s[i], atStart = start;
    start = false;
    if (q === "'") { out += c; if (c === "'") q = null; continue; }
    if (q === '"') { out += c; if (c === "\\" && i + 1 < s.length) out += s[++i]; else if (c === '"') q = null; continue; }
    if (c === "\\" && i + 1 < s.length) { out += c + s[++i]; continue; }
    if (c === "'" || c === '"') { q = c; out += c; continue; }
    // M6 prep review: an unquoted `#` that begins a word comments out the rest of its line, as the shell reads it (a
    // `<<EOF` there opens no heredoc: `cat > a # <<EOF` then `git push` ran as a command while the guard dropped it
    // as the heredoc's body). The comment is kept as text, for shellCommands, which drops it the same way
    if (c === "#" && atStart) { const nl = s.indexOf("\n", i), e = nl < 0 ? s.length : nl; out += s.slice(i, e); i = e - 1; continue; }
    if (/\s/.test(c) || ";&|()<>".includes(c)) start = true;
    if (c === "<" && s[i + 1] === "<" && s[i + 2] === "<") { out += "<<<"; i += 2; continue; } // a here-string: a word, not a body
    if (c === "<" && s[i + 1] === "<") {
      let j = i + 2; const strip = s[j] === "-"; if (strip) j++;
      while (s[j] === " " || s[j] === "\t") j++;
      let d = "", quoted = false; // the delimiter word, quotes removed; any quoting makes the body literal
      while (j < s.length && !/[\s;&|<>()]/.test(s[j])) {
        if (s[j] === "'" || s[j] === '"') { const qq = s[j++]; quoted = true; while (j < s.length && s[j] !== qq) d += s[j++]; j++; continue; }
        if (s[j] === "\\") { quoted = true; d += s[j + 1] ?? ""; j += 2; continue; }
        d += s[j++];
      }
      if (!d) { out += "<<"; i++; continue; } // no word: the shell refuses the line; judged as it stands
      pending.push({ delim: d, quoted, strip, head: headWord(out.slice(seg)), at: seg, op: s.slice(i, j) });
      out += "\u0002"; i = j - 1; // a placeholder until the line ends (the operator is put back for a non-data heredoc)
      continue;
    }
    if (c !== "\n" || !pending.length) { if (";&|(\n".includes(c)) seg = out.length + 1; out += c; continue; }
    // the line with the operators ends: decide each heredoc, then its body follows, in operator order
    for (const h of pending) { h.text = out.slice(h.at).replace(/\u0002/g, " "); h.data = DATA_SINKS.includes(h.head) && !pipedOn(h.text); }
    for (const h of pending) out = out.replace("\u0002", h.data ? " " : h.op);
    out += c; seg = out.length;
    let k = i + 1;
    for (const h of pending) {
      const lines = []; let closed = false, raw = "";
      while (k < s.length) {
        const nl = s.indexOf("\n", k), e = nl < 0 ? s.length : nl, line = s.slice(k, e);
        raw += s.slice(k, nl < 0 ? e : e + 1); k = nl < 0 ? s.length : e + 1;
        if ((h.strip ? line.replace(/^\t+/, "") : line) === h.delim) { closed = true; break; }
        lines.push(h.strip ? line.replace(/^\t+/, "") : line);
      }
      // the reading command (its line with every operator taken out): its redirect targets, tee's files
      const { cmds, writes } = h.data ? shellCommands(h.text) : { cmds: [], writes: [] };
      const targets = cmds.length ? [...new Set(writes)] : [];
      docs.push({ delim: h.delim, quoted: h.quoted, head: h.head, data: h.data, body: lines.join("\n"), closed, targets });
      if (!h.data) out += raw; // judged as before: its lines are commands
    }
    pending.length = 0;
    i = k - 1;
  }
  for (const h of pending) { // the line never ended: no body
    h.data = DATA_SINKS.includes(h.head) && !pipedOn(out.slice(h.at).replace(/\u0002/g, " "));
    out = out.replace("\u0002", h.data ? " " : h.op);
    docs.push({ delim: h.delim, quoted: h.quoted, head: h.head, data: h.data, body: "", closed: false, targets: [] });
  }
  return { s: out, docs };
}

/** The simple commands of shell line `s`, each as its words (quotes removed), plus the bodies of $(…) and `…`, the
 *  line's write targets (redirects and tee's files, as written: a target with a $ or substitution is opaque), and its
 *  heredocs (heredocs(): a data heredoc's body is not in `cmds`; an unquoted one's substitutions are in `subs`). */
export function shellCommands(s) {
  const cmds = [], subs = [], writes = [];
  const h = /<</.test(String(s ?? "")) ? heredocs(s) : { s: String(s ?? ""), docs: [] };
  s = h.s;
  for (const d of h.docs) if (d.data && !d.quoted) { let b = d.body; for (let prev = null; prev !== b;) { prev = b; b = b.replace(/\$\(([^()]*)\)|`([^`]*)`/g, (m, x, y) => { subs.push(x ?? y); return SUBST; }); } }
  // each substitution is judged on its own and stands as one word in its command (`git -C $(pwd) push` is still git push)
  for (let prev = null; prev !== s;) { prev = s; s = String(s).replace(/\$\(([^()]*)\)|`([^`]*)`/g, (m, a, b) => { subs.push(a ?? b); return SUBST; }); }
  let words = [], w = null, q = null, redir = null; // redir: the next word is a write target ("file"), or after >& ("dup")
  const endWord = () => { if (w != null) { words.push(w); if (redir && !(redir === "dup" && /^(\d+|-)$/.test(w))) writes.push(w); redir = null; } w = null; };
  const endCmd = () => { endWord(); redir = null; if (words.length) cmds.push(words); words = []; };
  for (let i = 0; i < s.length; i++) {
    const c = s[i];
    if (q === "'") { if (c === "'") q = null; else w += c; continue; }
    if (q === '"') { if (c === '"') q = null; else if (c === "\\" && i + 1 < s.length) w += s[++i]; else w += c; continue; }
    // M6 prep review: a comment (an unquoted `#` beginning a word) to the end of its line, quotes in it included (a `'`
    // there opened a quote that swallowed the commands on the next lines)
    if (c === "#" && w == null) { const nl = s.indexOf("\n", i); i = (nl < 0 ? s.length : nl) - 1; continue; }
    if (c === "$" && s[i + 1] === "'") continue; // $'push' (ANSI-C quoting) is the word push: escapes are not decoded
    if (c === "'" || c === '"') { q = c; w ??= ""; continue; }
    if (c === "\\" && i + 1 < s.length) { if (s[i + 1] !== "\n") w = (w ?? "") + s[i + 1]; i++; continue; }
    if (/\s/.test(c) && c !== "\n") { endWord(); continue; }
    if (";&|\n()".includes(c)) { endCmd(); continue; }
    if (c === ">") { endWord(); if (s[i + 1] === ">" || s[i + 1] === "|") i++; if (s[i + 1] === "&") { i++; redir = "dup"; } else if (s[i + 1] !== "(") redir = "file"; continue; }
    if (c === "<") { endWord(); continue; }
    w = (w ?? "") + c;
  }
  endCmd();
  for (const c of cmds) { const x = c.slice(headOf(c)); if (bare(x[0]) === "tee") writes.push(...x.slice(1).filter((y) => !y.startsWith("-"))); }
  return { cmds, subs, writes, docs: h.docs };
}

/** Every write target of Bash line `c` (its own, its substitutions', a `bash -c`/`eval` string's), as written. */
export function bashWrites(c, depth = 0) {
  const { cmds, subs, writes } = shellCommands(c);
  if (depth > 4) return writes;
  const out = [...writes];
  for (const x of subs) out.push(...bashWrites(x, depth + 1));
  for (const words of cmds) {
    const w = words.slice(headOf(words)), cmd = bare(w[0]);
    if (SHELLS.includes(cmd)) { const j = w.findIndex((x, k) => k > 0 && /^-[a-z]*c[a-z]*$/.test(x)); if (j > 0 && w[j + 1] != null) out.push(...bashWrites(w[j + 1], depth + 1)); }
    if (cmd === "eval") out.push(...bashWrites(w.slice(1).join(" "), depth + 1));
  }
  return out;
}

/** Where the command itself starts in `words`: after assignments, keywords and wrappers. */
function headOf(words) {
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
  return i;
}
/** Whether simple command `words` only searches (its arguments are patterns and files, never run): the raw backstop
 *  skips its words. rg --pre runs a command, so it is no reader. */
function isReader(words) {
  const w = words.slice(headOf(words)), cmd = base(w[0]);
  if (READERS.includes(cmd)) return !(cmd === "rg" && w.some((x) => /^--pre(=|$)/.test(x)));
  if (cmd !== "git") return false;
  let j = 1; while (j < w.length && w[j].startsWith("-")) j += GIT_VALUE_OPTS.includes(w[j]) ? 2 : 1;
  return w[j] === "grep" || w[j] === "log";
}

/** Why one simple command (`words`) is denied, as the matched spelling, or null. `line` is the whole Bash line. */
function commandDenial(words, line, depth, ctx = {}) {
  const w = words.slice(headOf(words)), cmd = bare(w[0]);
  // the environment cleared for what follows (`env -i`, `env -`, --ignore-environment): META_ROLE with it
  for (let k = 0; k < words.length - w.length; k++) if (base(words[k]) === "env") for (let q = k + 1; q < words.length - w.length && (words[q].startsWith("-") || /^[A-Za-z_]\w*=/.test(words[q])); q++) if (/^(-|-[a-zA-Z]*i[a-zA-Z]*|--ignore-environment)$/.test(words[q])) return "env -i";
  // M6 prep review: `exec -c` runs its command with an empty environment, as env -i
  for (let k = 0; k < words.length - w.length; k++) if (base(words[k]) === "exec") for (let q = k + 1; q < words.length - w.length && words[q].startsWith("-"); q++) if (/^-[a-z]*c/.test(words[q])) return "exec -c";
  if (!cmd) return null;
  if (opaque(w[0])) return "<a command the guard cannot read>";
  // M6 prep review: unsetting the session's variables (`unset ${!META_R*}`, a loop over compgen) is as env -i
  if ((cmd === "unset" || (cmd === "export" && w.includes("-n"))) && w.slice(1).some((x) => opaque(x) || /^META_/.test(x))) return `${cmd} <the session's variables>`;
  const sub = (from = 1, valueOpts = []) => { let j = from; while (j < w.length && w[j].startsWith("-")) j += valueOpts.includes(w[j]) ? 2 : 1; return j; };
  if (SHELLS.includes(cmd)) { const j = w.findIndex((x, k) => k > 0 && /^-[a-z]*c[a-z]*$/.test(x)); return j > 0 && w[j + 1] != null ? bashDenial(w[j + 1], depth + 1, ctx) : null; }
  if (cmd === "eval") return bashDenial(w.slice(1).join(" "), depth + 1, ctx);
  if (cmd === "git") {
    const j = sub(1, GIT_VALUE_OPTS), s = w[j];
    if (opaque(s)) return "git <a subcommand the guard cannot read>";
    if (s === "push" || s === "send-pack") return `git ${s}`;
    if (s === "subtree" && w[sub(j + 1, ["-C", "--prefix", "-P"])] === "push") return "git subtree push";
    // an alias defined on the line (`git -c alias.p=push p`, `-c alias.p='!git push'`, `--config-env alias.q=P q` in
    // either form, GIT_CONFIG_KEY_0=alias.q before it), or a key that runs a command (-c core.fsmonitor=…)
    for (let k = 1; k < j; k++) {
      const kv = w[k] === "-c" || w[k] === "--config-env" ? w[k + 1] ?? "" : /^--config-env=/.test(w[k]) ? w[k].slice("--config-env=".length) : null;
      if (kv != null && GIT_RUN_KEY.test(kv.split("=")[0])) return /^alias\./i.test(kv) ? "git alias" : `git -c ${kv.split("=")[0]}`;
    }
    for (const a of words.slice(0, words.length - w.length)) if (/^GIT_CONFIG_(KEY_\d+=|PARAMETERS=)/.test(a) && (/^GIT_CONFIG_PARAMETERS=/.test(a) ? /alias\.|hookspath|fsmonitor|filter\.|pager|sshcommand|gpg\./i.test(a) : GIT_RUN_KEY.test(a.slice(a.indexOf("=") + 1)))) return `git with ${a.split("=")[0]}`;
    if (s === "config") { const key = w.slice(j + 1).find((x) => !x.startsWith("-")); if (key && GIT_RUN_KEY.test(key) && w.slice(j + 1).some((x) => !x.startsWith("-") && x !== key) && !w.slice(j + 1).some((x) => /^--(get|get-all|get-regexp|list|unset|unset-all|remove-section)$|^-l$/.test(x))) return `git config ${key}`; }
    if (GIT_COMMITS.includes(s) && /\[deploy\]/i.test(line)) return "[deploy]";
    return null;
  }
  if (PKG.includes(cmd)) {
    // M4 integrate: no list of value options (npm takes `--<any config> <value>`): the words are judged by position
    // relative to the run/exec word, wherever the options put it
    const vo = PKG_VALUE_OPTS[cmd], args = w.slice(1), plain = args.filter((x) => !x.startsWith("-"));
    const ex = args.findIndex((x) => PKG_EXEC.includes(x)), rn = args.findIndex((x) => PKG_RUN.includes(x));
    if (ex >= 0 && (rn < 0 || ex < rn)) for (let k = ex + 1; k < args.length; k++) if (!args[k].startsWith("-")) { const d = opaque(args[k]) ? `${cmd} ${args[ex]} <a command the guard cannot read>` : commandDenial(args.slice(k), line, depth, ctx); if (d) return d; }
    const judge = (after) => {
      const ws = after.filter((x) => !x.startsWith("-"));
      if (ws.length && opaque(ws[0])) return `${cmd} run <a script the guard cannot read>`;
      const d = ws.find((x) => /^deploy(\W|$)/i.test(x));
      if (d) return `${cmd} run ${d}`;
      const c = ws.indexOf("company");
      if (c >= 0 && ws.slice(c + 1).includes("publish")) return `${cmd} run company … publish`;
      return null;
    };
    if (rn >= 0) { const d = judge(args.slice(rn + 1)); if (d) return d; }
    if (cmd === "npm") return null; // `npm deploy` is no npm command; npm scripts need `run`
    // pnpm/yarn/bun run a script by its bare name: any word, unless an install-like subcommand comes first
    const inst = plain.findIndex((x) => PKG_INSTALL.includes(x));
    return judge(inst < 0 ? args : args.slice(0, args.indexOf(plain[inst])));
  }
  if (RUNNERS.includes(cmd)) { const j = sub(1); return opaque(w[j]) ? `${cmd} <a command the guard cannot read>` : commandDenial(w.slice(j), line, depth, ctx); }
  if (cmd === "node" || cmd.endsWith(".mjs") || cmd.endsWith(".js")) {
    const at = cmd === "node" ? sub(1, NODE_VALUE_OPTS) : 0, script = w[at] ?? "", rest = w.slice(at + 1);
    if (cmd === "node") for (let k = 1; k < at; k++) {
      const [o, v] = w[k].includes("=") ? [w[k].slice(0, w[k].indexOf("=")), w[k].slice(w[k].indexOf("=") + 1)] : [w[k], w[k + 1] ?? ""];
      if (["-r", "--require", "--import", "--loader", "--experimental-loader"].includes(o)) { const d = NODE_SCRIPT_DENY(v); if (d) return d; }
      if (["-e", "--eval", "-p", "--print"].includes(o)) { const m = /claim\.mjs|deploy\.mjs|(^|[^\w.-])vercel\//.exec(v); if (m) return m[0].replace(/^[^\w]/, ""); }
      if (["-e", "--eval", "-p", "--print"].includes(o)) { const m = CODE_ONLY_EVAL.exec(v); if (m) return `${m[2]} (a code stage)`; }
    }
    // M6 prep review: a script named through a variable (`x=supervisor; node /k/$x.mjs launched`) cannot be read
    if (cmd === "node" && opaque(script) && !w.slice(1, at).some((x) => /^(-e|--eval|-p|--print)(=|$)/.test(x))) return "node <a script the guard cannot read>";
    const d = NODE_SCRIPT_DENY(script);
    if (d) return d;
    if (CODE_ONLY_SUB[base(script)]) { const p0 = rest.find((x) => !x.startsWith("-")); if (opaque(p0) || CODE_ONLY_SUB[base(script)].includes(p0)) return `${base(script)} ${opaque(p0) ? "<a command the guard cannot read>" : p0} (a code stage)`; }
    if (base(script) === "company.mjs" && rest.includes("publish")) return "company.mjs … publish";
    if (cmd === "node") {
      // M4 integrate: any word of the line, not only the one after the options this list knows (`node --title x
      // tools/deploy.mjs`), and `node --run deploy` (a package.json script)
      for (let k = 1; k < w.length; k++) {
        const v = w[k].startsWith("-") ? (w[k].includes("=") ? w[k].slice(w[k].indexOf("=") + 1) : "") : w[k];
        const dd = v && NODE_SCRIPT_DENY(v);
        if (dd) return dd;
        if (base(w[k]) === "company.mjs" && w.slice(k + 1).includes("publish")) return "company.mjs … publish";
        if ((w[k] === "--run" && /^deploy(\W|$)/i.test(w[k + 1] ?? "")) || /^--run=deploy(\W|$)/i.test(w[k])) return "node --run deploy";
      }
    }
    // K8+K9 re-review: with the session's role known, meta.mjs acts only as that role
    const mi = cmd === "node" ? w.findIndex((x, k) => k > 0 && base(x) === "meta.mjs") : base(w[0]) === "meta.mjs" ? 0 : -1;
    if (ctx.role && mi >= 0) for (const x of w.slice(mi + 1)) { const m = /^--(by|role)=(.*)$/.exec(x); if (m && m[2] !== ctx.role) return `meta.mjs --${m[1]}=${m[2]} (this session is ${ctx.role})`; }
    // M5 review: `launch finished` and `guard denied` are the launcher's reports, never an agent's (a first report of
    // --cumulative=1 left its order's spend at 1; --tasks=x:<order> charged a rival's order); meta.mjs refuses them too
    if (ctx.role && mi >= 0) { const ps = w.slice(mi + 1).filter((x) => !x.startsWith("-")); if ((ps[0] === "launch" && ps[1] === "finished") || (ps[0] === "guard" && ps[1] === "denied")) return `meta.mjs ${ps[0]} ${ps[1]} (the launcher's report)`; }
    // M6 prep: so are supervisor.mjs `launched` (launch events: reservations, and the launches K13 charges by) and
    // `usage`; supervisor.mjs refuses them in an agent session too
    const si = cmd === "node" ? w.findIndex((x, k) => k > 0 && base(x) === "supervisor.mjs") : base(w[0]) === "supervisor.mjs" ? 0 : -1;
    if (ctx.role && si >= 0) { const p0 = w.slice(si + 1).find((x) => !x.startsWith("-")); if (p0 === "launched" || p0 === "usage" || opaque(p0)) return `supervisor.mjs ${opaque(p0) ? "<a command the guard cannot read>" : p0} (the orchestrator's report)`; }
    return null;
  }
  if (/^vercel(@|$)/.test(base(w[0]))) return "vercel";
  if (cmd === "gh") {
    const j = sub(1, ["-R", "--repo", "--hostname"]), s = w[j], t = w[sub(j + 1, ["-R", "--repo"])];
    if (opaque(s) || (["pr", "release", "repo", "run"].includes(s) && opaque(t))) return "gh <a subcommand the guard cannot read>";
    if (s === "workflow" || s === "api") return `gh ${s}`;
    // a merge on the remote is a push to its base branch; a release makes a tag there; sync pushes; rerun runs a workflow
    if ((s === "pr" && t === "merge") || (s === "release" && ["create", "upload", "edit", "delete", "delete-asset"].includes(t)) || (s === "repo" && ["sync", "delete", "rename", "archive", "edit"].includes(t)) || (s === "run" && t === "rerun")) return `gh ${s} ${t}`;
    return null;
  }
  return null;
}

/** Why Bash line `c` is denied, as the matched spelling, or null. */
export function bashDenial(c, depth = 0, ctx = {}) {
  c = String(c ?? "");
  if (/META_ROLE/.test(c)) return "META_ROLE"; // the session's identity (state.mjs sessionRole) is the launcher's to set
  // M6 prep review: an indirect expansion names variables by prefix (`unset ${!META_R*}` named META_ROLE unspelled)
  if (/\$\{!/.test(c)) return "<an indirect expansion the guard cannot read>";
  const { cmds, subs, docs } = shellCommands(c);
  // the raw backstop over the line's words, less a search command's (substitutions are judged on their own below)
  const m = DENY_BASH.exec(cmds.filter((x) => !isReader(x)).map((x) => x.join(" ")).join("\n"));
  if (m) return m[0];
  if (depth > 4) return null;
  for (const words of cmds) { const d = commandDenial(words, c, depth, ctx); if (d) return d; }
  for (const x of subs) { const d = bashDenial(x, depth + 1, ctx); if (d) return d; }
  // M6 prep: a data heredoc written to a file that the same line then runs (`cat > x.sh <<EOF … EOF; bash x.sh`, `./x.sh`,
  // `chmod +x x.sh`) is code: its body is judged as commands, as every heredoc's body was before
  for (const doc of docs.filter((x) => x.data && x.targets.length)) {
    const runs = cmds.some((words) => { const w = words.slice(headOf(words)), at = (x) => doc.targets.some((t) => x === t || base(x) === base(t)); return at(w[0] ?? "") || (RUNS_FILE.includes(bare(w[0])) && w.slice(1).some(at)); });
    if (runs) { const d = bashDenial(doc.body, depth + 1, ctx); if (d) return d; }
  }
  return null;
}
export const WRITE_TOOLS = ["Write", "Edit", "MultiEdit", "NotebookEdit"];
export const DEFAULT_TOOLS = ["Bash", "Read", "Write", "Edit", "Glob", "Grep"]; // the launcher's list before K10
/** Tools the guard must see on every call: kept out of `allowedTools`, so canUseTool is asked for them. */
export const GUARDED = ["Bash", ...WRITE_TOOLS];

/** A protected-paths glob as a regex: the company hook's own translation (as workspace.mjs globRe). */
export const globRe = (g) => new RegExp("^" + g.replace(/[.+^${}()|[\]\\]/g, "\\$&").replace(/\*\*/g, "§").replace(/\*/g, "[^/]*").replace(/§/g, ".*") + "$");
/** K29: an ownership glob (owners.mjs ownGlobRe: a trailing `/` is the whole folder). */
const ownRe = (g) => globRe(String(g).replace(/\/$/, "/**"));
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
export function decide(tool, input = {}, { tools = null, roots = [], cwd = process.cwd(), role = null } = {}) {
  if (tools && !tools.includes(tool)) return { rule: "tool", why: `${tool} is not one of this role's tools (${tools.join(", ")})`, detail: tool };
  if (WRITE_TOOLS.includes(tool)) {
    const p = input?.file_path ?? input?.notebook_path;
    if (typeof p !== "string" || !p) return null;
    return pathDenial(realish(path.resolve(cwd, p)), roots);
  }
  if (tool === "Bash") {
    const c = String(input?.command ?? "");
    const m = bashDenial(c, 0, { role });
    // M6 prep: a line the guard cannot read says what to do instead (M4: the builder found the Write tool by itself)
    if (m && /cannot read/.test(m)) return { rule: "bash", why: `\`${m}\`: the guard cannot read this line, so it refuses it. To write a file, use the Write tool (not a shell heredoc or redirect); otherwise spell the command out in plain words (no $(…), \`…\` or variable as a command, git subcommand or script name)`, detail: c.slice(0, 300) };
    if (m) return { rule: "bash", why: `\`${m}\` is not allowed in an agent session (deploys need the founder's approval; pushing, publishing and verifying claims are code's or a person's)`, detail: c.slice(0, 300) };
    // M6 prep: a redirect or tee target is a write, judged as the write tools' paths are: against cwd, against each
    // literal `cd` directory on the line, and as written (a relative path that names a protected glob from a checkout's
    // root is refused wherever the line runs). A target with a $ or substitution is not judged (K7's commit check is the
    // backstop), nor a device
    const ws = bashWrites(c).filter((t) => t && !opaque(t) && !/^\/dev\//.test(t));
    if (ws.length) {
      const cds = shellCommands(c).cmds.map((w) => w.slice(headOf(w))).filter((w) => w[0] === "cd" && w[1] && !opaque(w[1])).map((w) => path.resolve(cwd, w[1]));
      for (const t of ws) {
        const asIs = !path.isAbsolute(t) && !path.normalize(t).startsWith("..") ? path.normalize(t).split(path.sep).join("/") : null;
        for (const dir of [cwd, ...cds]) { const d = pathDenial(realish(path.resolve(dir, t)), roots); if (d) return { ...d, why: `${d.why} (a shell write: ${t}); write files with the Write tool, never into a protected path`, detail: c.slice(0, 300) }; }
        const r = asIs && roots.find((x) => (x.globs ?? []).some((g) => globRe(g).test(asIs)));
        if (r) return { rule: "protected-path", why: `${asIs} is a protected path (${r.globs.find((g) => globRe(g).test(asIs))} in ${r.file ?? "protected-paths.txt"}): only a ratified amendment changes it (a shell write); write files with the Write tool, never into a protected path`, detail: c.slice(0, 300) };
      }
    }
  }
  return null;
}

/** Why a write to absolute path `abs` is denied ({rule, why, detail}), or null: a .git folder, or a protected glob of a root. */
function pathDenial(abs, roots) {
  // M4 integrate (K7/K10 re-review): a repo's .git (its config, hooks, info/attributes; a worktree's is shared with
  // the main checkout) is git's machinery: a line there makes git run a command, the kernel's and the founder's
  if (abs.split(path.sep).includes(".git")) return { rule: "git-dir", why: `${abs} is inside a .git folder (git config and hooks run commands, in this worktree and in the founder's checkout): no agent writes there`, detail: abs };
  for (const r of roots) {
    let rel = path.relative(realish(r.dir), abs).split(path.sep).join("/");
    if (!rel || rel.startsWith("..") || path.isAbsolute(rel)) continue;
    if (r.nested) rel = rel.split("/").slice(r.nested).join("/"); // a root of checkouts (workspace.root): <worktree>/<path>
    if (!rel) continue;
    // K29 (owners.mjs guardRoot): the ownership table of an order's workdir: an interface or module another role owns
    // is read-only for this role unless a change request granted it (its owner or the architect approved it)
    if (r.kind === "owned") {
      const e = (r.owned ?? []).find((x) => (x.globs ?? []).some((y) => ownRe(y).test(rel)));
      if (e && e.owner !== r.role && !(r.granted ?? []).some((y) => ownRe(y).test(rel))) return { rule: "module-owner", why: `${rel} is in ${e.kind} ${e.name}, owned by ${e.owner}: every role reads it, only ${e.owner} writes it. Ask for the change: node meta.mjs ask raise --kind=change-request --module=${e.name}${r.order ? ` --order=${r.order}` : ""} --title=… --why=… --due=<min> (its owner or the architect decides)`, detail: abs };
      continue;
    }
    const g = (r.globs ?? []).find((x) => globRe(x).test(rel));
    if (g) return { rule: "protected-path", why: `${rel} is a protected path (${g} in ${r.file ?? "protected-paths.txt"}): only a ratified amendment changes it`, detail: abs };
  }
  return null;
}

/** M5 review: the `meta.mjs guard denied` arguments that record denial `d` of launch `id` (role `role`): one wiring for
 *  the launcher (launch.mjs) and the tests that show a denial reaching the kernel. */
export const deniedArgs = (id, role, d) => ["guard", "denied", `--launch=${id}`, `--role=${role}`, `--tool=${d.tool}`, `--rule=${d.rule}`, `--why=${d.why}`, `--via=${d.via}`, ...(d.detail ? [`--detail=${d.detail}`] : [])];

/** The guard for one session: { canUseTool, preToolUse, denials }. `record(denial)` is called once per denied call.
 *  strictTools: the role named its tools (the SDK `tools` option then hides the rest, and the hook backs it up). Unset
 *  (a role with no `tools`: every spec before K10), only canUseTool applies the list, so a call that needs no permission
 *  (TodoWrite) runs as it did under dontAsk and one that would prompt (WebFetch) is refused as dontAsk refused it. */
export function makeGuard({ tools = null, strictTools = true, roots = [], cwd = process.cwd(), role = null, record = () => {} } = {}) {
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
      const d = decide(toolName, input, { tools, roots, cwd, role });
      if (!d) return { behavior: "allow", updatedInput: input };
      return { behavior: "deny", message: deny("canUseTool", toolName, d, options.toolUseID) };
    },
    /** SDK HookCallback for PreToolUse. */
    async preToolUse(input, toolUseID) {
      if (input?.hook_event_name && input.hook_event_name !== "PreToolUse") return {};
      const d = decide(input?.tool_name, input?.tool_input ?? {}, { tools: strictTools ? tools : null, roots, cwd: input?.cwd || cwd, role });
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
  // K10 fix review: a protected-paths lookup that failed (a timeout, a lock, a bad ref) dropped that root silently and
  // the session started without it; launchConfig now lists it in `missing`, and a missing root refuses the launch
  if (Array.isArray(cfg.missing) && cfg.missing.length) return { refused: `protected paths unknown for ${cfg.missing.map((x) => `${x.dir} (${x.error})`).join("; ")}: no session starts without its guard's roots` };
  if (cfg.workspace && !Array.isArray(cfg.roots)) return { refused: "launch config has a workspace but no roots list: no session starts without its guard's roots" };
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
export function queryOptions(p, guard, { model, env, abortController, resume = null, extraHooks = [] } = {}) {
  return {
    cwd: p.cwd, model, abortController, env,
    ...(resume ? { resume } : {}), // K26: a warm role's next item continues its own Agent SDK session
    settingSources: p.settingSources,
    ...(p.strictTools ? { tools: p.tools } : {}),
    allowedTools: p.tools.filter((t) => !GUARDED.includes(t)),
    permissionMode: "default", permissionPrompts: "host",
    canUseTool: guard.canUseTool,
    // B8: an operator's command hook (launch.mjs --pretool-hook) runs after the guard, on every call too
    hooks: { PreToolUse: [{ hooks: [guard.preToolUse, ...extraHooks] }] },
    maxTurns: p.maxTurns,
  };
}

/** K26: after a resumed query, start cold instead? Only when the resume itself failed: an error or an error result
 *  before the session produced anything (no assistant turn). A resumed session that worked and then failed is a failed
 *  launch like any other (its work goes back to the queue), never run twice. */
export function warmFallback({ resumed, error = null, result = null, sawAssistant = false, aborted = false }) {
  // B7 review: the launch's own abort (its sessionMin limit, --kill) before the first assistant turn is not a failed
  // resume: the SDK session is healthy, and a cold retry on the same aborted controller fails at once
  if (aborted) return false;
  return !!resumed && !sawAssistant && (!!error || !result || !!result.is_error);
}

/** B8: an operator's PreToolUse command hook, in process (the launcher's --pretool-hook=<JSON argv>), so a run can add
 *  its own access rule with settingSources [] (no project settings file to load it from, none for an agent to edit).
 *  The command gets the hook input as JSON on stdin, as a settings `command` hook does, with `env` (the launch's
 *  META_ROLE and META_LAUNCH among it); exit 0 allows (the guard and canUseTool still decide), exit 2 denies with its
 *  stderr as the reason, and anything else (a crash, a timeout, a missing command) denies too: it fails closed.
 *  `record(d)` gets each denial {via: "pretool-hook", tool, rule, why}. */
export function commandHook(argv, { env = process.env, timeoutMs = 20_000, record = () => {} } = {}) {
  if (!Array.isArray(argv) || !argv.length || !argv.every((a) => typeof a === "string" && a)) throw new Error("a command hook is a JSON argv: a non-empty list of strings");
  const deny = (tool, rule, why) => { try { record({ via: "pretool-hook", tool, rule, why }); } catch {} return { hookSpecificOutput: { hookEventName: "PreToolUse", permissionDecision: "deny", permissionDecisionReason: why } }; };
  return async function preToolUseCommand(input) {
    if (input?.hook_event_name && input.hook_event_name !== "PreToolUse") return {};
    const tool = input?.tool_name ?? null;
    const r = await new Promise((resolve) => {
      let out = "", err = "", done = false;
      const fin = (x) => { if (!done) { done = true; clearTimeout(t); resolve(x); } };
      let ch;
      try { ch = spawn(argv[0], argv.slice(1), { env, stdio: ["pipe", "pipe", "pipe"] }); } catch (e) { return fin({ code: null, err: String(e?.message ?? e) }); }
      const t = setTimeout(() => { try { ch.kill("SIGKILL"); } catch {} fin({ code: null, err: `timed out after ${timeoutMs} ms` }); }, timeoutMs);
      ch.stdout.on("data", (d) => { if (out.length < 65536) out += d; });
      ch.stderr.on("data", (d) => { if (err.length < 4096) err += d; });
      ch.on("error", (e) => fin({ code: null, err: String(e?.message ?? e) }));
      ch.on("close", (code) => fin({ code, err }));
      ch.stdin.on("error", () => {});
      ch.stdin.end(JSON.stringify(input ?? {}));
    });
    if (r.code === 0) return {};
    if (r.code === 2) return deny(tool, "pretool-hook", String(r.err).trim().slice(0, 1000) || "denied by the operator's hook");
    return deny(tool, "pretool-hook-failed", `the operator's hook failed (${r.code == null ? r.err : `exit ${r.code}`}): denied, the hook fails closed`);
  };
}
