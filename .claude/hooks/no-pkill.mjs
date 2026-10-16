#!/usr/bin/env node
// PreToolUse hook (Bash): refuse pattern kills and stash commands that can hit another agent's work.
// Board W-529 (first half), W-1200 (retro 2026-10-16 C6(b)); batch company/ops/dispatch-requests/2026-10-16-r2-tools.md#B3.
// UNWIRED until founder F-31 (as widened) is approved: the snippet is in
// company/engineering/readiness/2026-10-16-commit-and-process-guards.md.
//
// Refused:
//   pkill (any form), pgrep -f / --full, killall <name>, `kill $(pgrep|pidof …)`, `… | xargs kill`, kill -1.
//     All agents share one host: a name or pattern match kills other agents' servers and, with -f, the
//     shell running the command (retros 2026-10-13 and 2026-10-16 H5). Stop by exact pid instead.
//   git stash with no message (bare `git stash`, `git stash -u`, `git stash push` without -m), `git stash save`,
//   `git stash pop`, `git stash apply|drop|branch` with no explicit ref, `git stash clear`.
//     The stash stack lives in the common git dir, so the main checkout and every worktree share it. A bare
//     pop or apply takes whatever is on top, which may be another session's work (B2's run, 2026-10-16).
//
// Only the command position of each simple command is read (after `;`, `&&`, `||`, `|`, `$(`, backticks,
// `bash -c`), so `git commit -m "add pkill -f hook"` or `grep "pkill -f" file` pass.
// Hook I/O follows .claude/hooks/protect-constitution.mjs: JSON on stdin, exit 2 + stderr to refuse.
// It fails open: unreadable input or an internal error exits 0. It is a guard, not the only line of defence.

import { pathToFileURL } from "node:url";

const STOP_HINT =
  "Stop a server you started with `tools/serve.sh stop <port>`, or a process by exact pid with `kill <pid>` " +
  "(pid from your own pid file, e.g. `kill $(cat .serve/<port>.pid)`).";
const STASH_HINT =
  "The stash stack is shared by the main checkout and every worktree. Prefer a temporary WIP commit. If you must stash: " +
  '`git stash push -u -m "<unique-tag>"`, capture the SHA with `git stash list --format=\'%H %gs\'`, restore with ' +
  "`git stash apply <sha>`, then drop your own entry by its re-found `stash@{n}`.";

// Split a shell command into simple commands (token arrays). Quote-aware; command substitutions are
// returned as their own commands, also when they sit inside double quotes.
export function simpleCommands(cmd) {
  const out = [];
  let tokens = [];
  let tok = null;
  const endTok = () => {
    if (tok !== null) tokens.push(tok);
    tok = null;
  };
  const endCmd = () => {
    endTok();
    if (tokens.length) out.push(tokens);
    tokens = [];
  };
  // Find the end of a `$(` … `)` starting at index i (just after `$(`); returns index of the closing paren.
  const closeParen = (s, i) => {
    let depth = 1;
    let q = null;
    for (; i < s.length; i++) {
      const c = s[i];
      if (q === "'") { if (c === "'") q = null; continue; }
      if (c === "\\") { i++; continue; }
      if (q === '"') { if (c === '"') q = null; continue; }
      if (c === "'" || c === '"') { q = c; continue; }
      if (c === "(") depth++;
      if (c === ")" && --depth === 0) return i;
    }
    return s.length;
  };
  let q = null;
  for (let i = 0; i < cmd.length; i++) {
    const c = cmd[i];
    if (q === "'") {
      if (c === "'") q = null;
      else tok += c;
      continue;
    }
    if (q === '"') {
      if (c === '"') { q = null; continue; }
      if (c === "\\" && i + 1 < cmd.length) { tok += cmd[++i]; continue; }
      if (c === "$" && cmd[i + 1] === "(") {
        const j = closeParen(cmd, i + 2);
        out.push(...simpleCommands(cmd.slice(i + 2, j)));
        tok += "$(…)";
        i = j;
        continue;
      }
      if (c === "`") {
        const j = cmd.indexOf("`", i + 1);
        const end = j === -1 ? cmd.length : j;
        out.push(...simpleCommands(cmd.slice(i + 1, end)));
        tok += "`…`";
        i = end;
        continue;
      }
      tok += c;
      continue;
    }
    if (c === "'" || c === '"') { q = c; if (tok === null) tok = ""; continue; }
    if (c === "\\" && i + 1 < cmd.length) {
      if (cmd[i + 1] === "\n") { i++; continue; }
      tok = (tok ?? "") + cmd[++i];
      continue;
    }
    if (c === "#" && tok === null) {
      // comment to end of line
      while (i < cmd.length && cmd[i] !== "\n") i++;
      endCmd();
      continue;
    }
    if (c === "$" && cmd[i + 1] === "(") {
      // unquoted command substitution: its own command; the outer token keeps a placeholder
      const j = closeParen(cmd, i + 2);
      out.push(...simpleCommands(cmd.slice(i + 2, j)));
      tok = (tok ?? "") + "$(…)";
      i = j;
      continue;
    }
    if (c === "`") {
      const j = cmd.indexOf("`", i + 1);
      const end = j === -1 ? cmd.length : j;
      out.push(...simpleCommands(cmd.slice(i + 1, end)));
      tok = (tok ?? "") + "`…`";
      i = end;
      continue;
    }
    if (";&|\n()".includes(c)) { endCmd(); continue; }
    if (c === " " || c === "\t" || c === "\r") { endTok(); continue; }
    if (c === "<" || c === ">") { endTok(); continue; }
    tok = (tok ?? "") + c;
  }
  endCmd();
  return out;
}

const base = (t) => t.replace(/^.*\//, "");
const isAssign = (t) => /^[A-Za-z_][A-Za-z0-9_]*=/.test(t);

// Strip env assignments and wrapper commands; return { argv, via } where via names a wrapper that feeds args.
function unwrap(tokens) {
  let t = tokens.slice();
  let via = null;
  for (let guard = 0; guard < 10 && t.length; guard++) {
    while (t.length && isAssign(t[0])) t.shift();
    if (!t.length) break;
    const w = base(t[0]);
    if (["sudo", "nohup", "exec", "command", "builtin", "time", "setsid", "stdbuf", "doas"].includes(w)) {
      t.shift();
      while (t.length && t[0].startsWith("-")) t.shift();
      continue;
    }
    if (w === "env") {
      t.shift();
      while (t.length && (t[0].startsWith("-") || isAssign(t[0]))) t.shift();
      continue;
    }
    if (w === "nice" || w === "ionice") {
      t.shift();
      while (t.length && t[0].startsWith("-")) { const o = t.shift(); if (/^-[nc]$/.test(o)) t.shift(); }
      continue;
    }
    if (w === "timeout") {
      t.shift();
      while (t.length && t[0].startsWith("-")) { const o = t.shift(); if (/^-[sk]$/.test(o)) t.shift(); }
      t.shift(); // duration
      continue;
    }
    if (w === "xargs") {
      t.shift();
      while (t.length && t[0].startsWith("-")) { const o = t.shift(); if (/^-[IiLlnPsdEa]$/.test(o)) t.shift(); }
      via = "xargs";
      continue;
    }
    if (w === "watch") {
      t.shift();
      while (t.length && t[0].startsWith("-")) { const o = t.shift(); if (/^-[nd]$/.test(o)) t.shift(); }
      continue;
    }
    break;
  }
  return { argv: t, via };
}

const hasShortFlag = (args, letter) => args.some((a) => /^-[A-Za-z]+$/.test(a) && a.slice(1).includes(letter));

function checkSimple(tokens, raw, depth) {
  const { argv, via } = unwrap(tokens);
  if (!argv.length) return null;
  const cmd = base(argv[0]);
  const args = argv.slice(1);

  if (["bash", "sh", "zsh", "dash", "ksh"].includes(cmd) && depth < 4) {
    const ci = args.findIndex((a) => /^-[A-Za-z]*c[A-Za-z]*$/.test(a));
    if (ci !== -1 && args[ci + 1] !== undefined) return verdict(args[ci + 1], depth + 1);
    return null;
  }
  if (cmd === "pkill") return `\`pkill\` kills by name or pattern on a host every agent shares (with -f it matches the shell running it). ${STOP_HINT}`;
  if (cmd === "pgrep" && (hasShortFlag(args, "f") || args.includes("--full")))
    return `\`pgrep -f\` matches full command lines, including the shell running it and other agents' processes. ${STOP_HINT}`;
  if (cmd === "killall") {
    const listOnly = args.length > 0 && args.every((a) => ["-l", "--list", "-V", "--version"].includes(a));
    if (!listOnly) return `\`killall\` kills every process with that name on the shared host. ${STOP_HINT}`;
  }
  if (cmd === "kill") {
    if (via === "xargs") return `\`xargs kill\` kills whatever the pipeline matched (a pattern kill). ${STOP_HINT}`;
    // pid positions: after `--`, or every arg that is not an option / signal spec
    let pids = [];
    for (let i = 0; i < args.length; i++) {
      const a = args[i];
      if (a === "--") { pids.push(...args.slice(i + 1)); break; }
      if (a === "-s" || a === "-n") { i++; continue; }
      if (a.startsWith("-") && i === 0) continue; // signal spec like -9 / -TERM
      pids.push(a);
    }
    if (pids.includes("-1")) return `\`kill -1\` signals every process you can reach on the shared host. ${STOP_HINT}`;
  }
  if (cmd === "git") {
    let i = 0;
    while (i < args.length && args[i].startsWith("-")) {
      const o = args[i++];
      if (["-C", "-c", "--git-dir", "--work-tree", "--namespace"].includes(o)) i++;
    }
    if (args[i] !== "stash") return null;
    const rest = args.slice(i + 1);
    const action = rest.length && !rest[0].startsWith("-") ? rest[0] : "push";
    const opts = action === "push" && (rest[0] === undefined || rest[0].startsWith("-")) ? rest : rest.slice(1);
    const refs = opts.filter((a) => !a.startsWith("-"));
    const hasMsg = opts.some((a) => a === "-m" || a === "--message" || a.startsWith("--message=") || /^-[A-Za-z]*m/.test(a));
    if (action === "push" && !hasMsg)
      return `\`git stash\` without \`-m "<unique-tag>"\` leaves an entry nobody can tell apart from another session's. ${STASH_HINT}`;
    if (action === "save") return `\`git stash save\` is deprecated and untagged here. ${STASH_HINT}`;
    if (action === "pop") return `\`git stash pop\` takes and drops an entry from the shared stack (by default the top one, which may not be yours). ${STASH_HINT}`;
    if (action === "clear") return `\`git stash clear\` deletes every session's stash entries. ${STASH_HINT}`;
    if ((action === "apply" || action === "drop") && refs.length === 0)
      return `\`git stash ${action}\` with no ref acts on the top entry, which may be another session's. ${STASH_HINT}`;
    if (action === "branch" && refs.length < 2)
      return `\`git stash branch <name>\` with no ref pops the top entry, which may be another session's. ${STASH_HINT}`;
  }
  return null;
}

// Returns a refusal reason (string) or null when the command may run.
export function verdict(command, depth = 0) {
  if (typeof command !== "string" || !command.trim()) return null;
  // `kill $(pgrep …)` / `kill $(pidof …)`: the inner command alone may be harmless; together they are a pattern kill.
  if (/(^|[;&|(\s])kill\b[^;&|\n]*(\$\(|`)\s*(pgrep|pidof)\b/.test(command))
    return `\`kill\` fed by \`pgrep\`/\`pidof\` is a pattern kill on a shared host. ${STOP_HINT}`;
  for (const tokens of simpleCommands(command)) {
    const r = checkSimple(tokens, command, depth);
    if (r) return r;
  }
  return null;
}

function main() {
  let input = "";
  process.stdin.on("data", (d) => (input += d));
  process.stdin.on("end", () => {
    try {
      const event = JSON.parse(input);
      if (event.tool_name !== "Bash") process.exit(0);
      const reason = verdict(event.tool_input?.command);
      if (reason) {
        process.stderr.write(`Blocked by .claude/hooks/no-pkill.mjs: ${reason}`);
        process.exit(2);
      }
    } catch {
      // fail open
    }
    process.exit(0);
  });
}

if (process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href) main();
