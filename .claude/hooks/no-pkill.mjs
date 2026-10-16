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
//   Port kills (M2, W-529): `kill [-9] $(lsof …)` / `kill $(fuser …)`, `lsof … | xargs kill`, `fuser -k <port>/tcp`.
//     A port on this host can belong to another agent's server (W-851). Plain `lsof -i:<port>` and
//     `fuser <port>/tcp` (lookups, no -k) pass.
//   git stash with no message (bare `git stash`, `git stash -u`, `git stash push` without -m), `git stash save`,
//   `git stash pop`, `git stash apply|drop|branch` with no explicit ref, `git stash clear`.
//     The stash stack lives in the common git dir, so the main checkout and every worktree share it. A bare
//     pop or apply takes whatever is on top, which may be another session's work (B2's run, 2026-10-16).
//   In the MAIN checkout only (W-1337; batch company/ops/dispatch-requests/2026-10-16-r5-tools.md#B1): `git rebase`
//   (any flags), `git pull` unless it is `--ff-only` (or `--no-rebase`) with no `--rebase`/`-r`/`--autostash`,
//   `git stash` other than `list`/`show`, `git reset --hard`, `git checkout -f` or `git checkout [<rev>] -- .`
//   (also `:/`, `*`, `./`), `git restore` of the whole tree, `git clean` with -f. The main checkout's work tree and
//   index hold every agent's work in flight; each of these can wipe or bury it (the 13:06 autostash wipe).
//   Which checkout: the payload's `cwd`, moved by `cd`/`pushd` earlier in the command, then by `git -C <dir>` or
//   `--git-dir`. A dir is the main checkout when the nearest `.git` above it is a directory and that dir is the main
//   checkout of this repo (S3_GUARD_MAIN overrides it, for tests). Linked worktrees (`.git` is a file) all pass.
//
// Only the command position of each simple command is read (after `;`, `&&`, `||`, `|`, `$(`, backticks,
// `bash -c`), so `git commit -m "add pkill -f hook"` or `grep "pkill -f" file` pass. Heredoc bodies are data
// (N1), unless a shell reads them as commands (`sh <<EOF`, `cat <<EOF | sh`) or they hold a command
// substitution under an unquoted delimiter.
// Hook I/O follows .claude/hooks/protect-constitution.mjs: JSON on stdin, exit 2 + stderr to refuse.
// It fails open: unreadable input or an internal error exits 0. It is a guard, not the only line of defence.

import fs from "node:fs";
import path from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";

const STOP_HINT =
  "Stop a server you started with `tools/serve.sh stop <port>`, or a process by exact pid with `kill <pid>` " +
  "(pid from your own pid file, e.g. `kill $(cat .serve/<port>.pid)`).";
const PORT_HINT =
  "A port on this shared host may be another agent's server (W-851). Stop a server you started with " +
  "`tools/serve.sh stop <port>` (it stops only the pid in its own .serve/<port>.pid), or by exact pid with `kill <pid>`. " +
  "To see who holds a port, `lsof -i:<port>` is fine; killing what it finds is not.";
const STASH_HINT =
  "The stash stack is shared by the main checkout and every worktree. Prefer a temporary WIP commit. If you must stash: " +
  '`git stash push -u -m "<unique-tag>"`, capture the SHA with `git stash list --format=\'%H %gs\'`, restore with ' +
  "`git stash apply <sha>`, then drop your own entry by its re-found `stash@{n}`.";

const MAIN_HINT =
  "The main checkout is shared by every agent: its work tree and index hold their work in flight. Integrate in your own " +
  "worktree (e.g. /home/user/s3c-int, or `git worktree add /home/user/s3c-<tag> -b <branch>`) and rebase, stash or reset " +
  "there. In the main checkout use only `git pull --ff-only`, `git status`, `git log`, `git stash list|show`, and commit by " +
  "path (`tools/commit-own.sh` or `git commit -m … -- <paths>`).";

// ---- main checkout or linked worktree (W-1337), from the filesystem only: no git process per Bash call.
const HOOK_ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "../..");
/** The main checkout of the repo holding `root`: `.git` dir = main; `.git` file -> gitdir -> commondir. */
export function mainCheckoutOf(root = HOOK_ROOT) {
  try {
    const dotgit = path.join(root, ".git");
    if (fs.statSync(dotgit).isDirectory()) return root;
    const gitdir = path.resolve(root, fs.readFileSync(dotgit, "utf8").match(/^gitdir:\s*(.+)$/m)[1].trim());
    const common = path.resolve(gitdir, fs.readFileSync(path.join(gitdir, "commondir"), "utf8").trim());
    if (path.basename(common) === ".git") return path.dirname(common);
  } catch {}
  return null;
}
/** True when `dir` lies in the work tree of `main` itself (not in a linked worktree, not in another repo). */
export function inMainCheckout(dir, main) {
  if (!dir || !main) return false;
  let d = path.resolve(dir);
  for (let i = 0; i < 64; i++) {
    const g = path.join(d, ".git");
    try {
      const st = fs.statSync(g);
      return st.isDirectory() && path.resolve(d) === path.resolve(main);
    } catch {}
    // inside the main .git dir itself (e.g. cwd .git/): judge by the dir above it
    if (path.basename(d) === ".git") return path.resolve(path.dirname(d)) === path.resolve(main);
    const up = path.dirname(d);
    if (up === d) return false;
    d = up;
  }
  return false;
}
const isMainGitDir = (gd, main) => !!main && path.resolve(gd) === path.join(path.resolve(main), ".git");

// Main-checkout git rules. `sub` is the subcommand, `rest` its args. Returns a reason or null.
function mainGitRule(sub, rest, conf) {
  const has = (...f) => rest.some((a) => f.includes(a) || f.some((x) => x.startsWith("--") && a.startsWith(x + "=")));
  const pathsAfterDashDash = () => { const k = rest.indexOf("--"); return k === -1 ? [] : rest.slice(k + 1); };
  const wholeTree = (ps) => ps.some((p) => [".", "./", ":/", ":/.", "*", ":(top)", ":(glob)*"].includes(p) || p === path.sep);
  if (sub === "rebase")
    return `\`git rebase\` in the main checkout. With an autostash it resets the shared work tree first (the 13:06 wipe, W-1337); ` +
      `if a rebase is already stuck here, do not --abort or --continue it: report it to the chief of staff (its autostash sha is in .git/rebase-merge/autostash). ${MAIN_HINT}`;
  if (sub === "pull") {
    const rebaseFlag = has("--rebase", "--autostash") || hasShortFlag(rest.filter((a) => !a.startsWith("--")), "r");
    const rebaseConf = conf.some((c) => /^(pull\.rebase|rebase\.autostash|branch\..*\.rebase)=(?!false$)/i.test(c));
    if (rebaseFlag || rebaseConf)
      return `\`git pull\` with a rebase or an autostash in the main checkout can reset the shared work tree (W-1337). ${MAIN_HINT}`;
    if (!has("--ff-only", "--no-rebase") && !rest.includes("--help"))
      return `plain \`git pull\` in the main checkout rebases when pull.rebase is set; say \`git pull --ff-only\`. ${MAIN_HINT}`;
    return null;
  }
  if (sub === "stash") {
    const action = rest.length && !rest[0].startsWith("-") ? rest[0] : "push";
    if (action === "list" || action === "show") return null;
    return `\`git stash ${action}\` in the main checkout moves or rewrites other agents' uncommitted work (the stash stack and the work tree are shared). ${MAIN_HINT}`;
  }
  if (sub === "reset" && has("--hard", "--merge", "--keep"))
    return `\`git reset ${rest.find((a) => ["--hard", "--merge", "--keep"].includes(a))}\` in the main checkout discards other agents' edits. ${MAIN_HINT}`;
  if (sub === "checkout") {
    const opts = rest.includes("--") ? rest.slice(0, rest.indexOf("--")) : rest;
    if (opts.includes("--force") || hasShortFlag(opts.filter((a) => !a.startsWith("--")), "f"))
      return `\`git checkout -f\` in the main checkout throws away other agents' edits. ${MAIN_HINT}`;
    const ps = rest.includes("--") ? pathsAfterDashDash() : rest.filter((a) => !a.startsWith("-"));
    if (wholeTree(ps)) return `\`git checkout ${rest.join(" ")}\` in the main checkout reverts every agent's edits in that tree. ${MAIN_HINT}`;
  }
  if (sub === "restore") {
    const ps = rest.includes("--") ? pathsAfterDashDash() : rest.filter((a) => !a.startsWith("-"));
    if (wholeTree(ps)) return `\`git restore ${rest.join(" ")}\` in the main checkout reverts or unstages every agent's work in that tree. ${MAIN_HINT}`;
  }
  if (sub === "clean" && (has("--force") || hasShortFlag(rest.filter((a) => !a.startsWith("--")), "f")))
    return `\`git clean -f\` in the main checkout deletes other agents' new, uncommitted files. ${MAIN_HINT}`;
  return null;
}

// Heredocs (N1, company/engineering/reviews/2026-10-16-agent-hooks-wiring-review.md): `<<WORD`, `<<-WORD`,
// `<<'WORD'`, `<<"WORD"`, `<<\WORD`. Returns { delim, strip, quoted, end } or null when s[i] does not start one.
// A here-string (`<<<`) is not a heredoc. An unquoted delimiter must start with a letter or `_`, so arithmetic like
// `$((1<<2))` is not mistaken for one.
function heredocOp(s, i) {
  if (s[i] !== "<" || s[i + 1] !== "<" || s[i + 2] === "<" || s[i - 1] === "<") return null;
  let j = i + 2;
  const strip = s[j] === "-";
  if (strip) j++;
  while (s[j] === " " || s[j] === "\t") j++;
  let word = "";
  let quoted = false;
  for (; j < s.length; j++) {
    const c = s[j];
    if (c === "'" || c === '"') {
      const k = s.indexOf(c, j + 1);
      if (k === -1) return null;
      quoted = true;
      word += s.slice(j + 1, k);
      j = k;
      continue;
    }
    if (c === "\\" && j + 1 < s.length) { quoted = true; word += s[++j]; continue; }
    if (/[\s;&|<>()`]/.test(c)) break;
    word += c;
  }
  if (!word || !(quoted || /^[A-Za-z_]/.test(word))) return null;
  return { delim: word, strip, quoted, end: j };
}

// Read the bodies of the pending heredocs, starting at `from` (just after the newline that ends their command line).
// Sets h.body on each; returns the index just after the last terminator line (or past the end, if unterminated).
function readBodies(s, from, pending) {
  let pos = from;
  for (const h of pending) {
    let body = "";
    while (pos <= s.length) {
      let e = s.indexOf("\n", pos);
      if (e === -1) e = s.length;
      const line = s.slice(pos, e);
      pos = e + 1;
      if ((h.strip ? line.replace(/^\t+/, "") : line) === h.delim) break;
      body += line + "\n";
      if (e >= s.length) break;
    }
    h.body = body;
  }
  return pos;
}

// Find the end of a `$(` … `)` starting at index i (just after `$(`); returns index of the closing paren.
// Heredoc bodies inside are skipped, so a `)` or a lone `'` in a commit message cannot end it early.
function closeParen(s, i) {
  let depth = 1;
  let q = null;
  let pending = [];
  for (; i < s.length; i++) {
    const c = s[i];
    if (q === "'") { if (c === "'") q = null; continue; }
    if (c === "\\") { i++; continue; }
    if (q === '"') { if (c === '"') q = null; continue; }
    if (c === "'" || c === '"') { q = c; continue; }
    if (c === "<") {
      const h = heredocOp(s, i);
      if (h) { pending.push(h); i = h.end - 1; continue; }
    }
    if (c === "\n" && pending.length) { i = readBodies(s, i + 1, pending) - 1; pending = []; continue; }
    if (c === "(") depth++;
    if (c === ")" && --depth === 0) return i;
  }
  return s.length;
}

// Command substitutions in an unquoted heredoc body: the shell runs them, so they are checked; the rest is data.
function substitutions(body) {
  const out = [];
  for (let i = 0; i < body.length; i++) {
    const c = body[i];
    if (c === "\\") { i++; continue; }
    if (c === "$" && body[i + 1] === "(") {
      const j = closeParen(body, i + 2);
      out.push(...simpleCommands(body.slice(i + 2, j)));
      i = j;
      continue;
    }
    if (c === "`") {
      const j = body.indexOf("`", i + 1);
      const end = j === -1 ? body.length : j;
      out.push(...simpleCommands(body.slice(i + 1, end)));
      i = end;
    }
  }
  return out;
}

// Split a shell command into simple commands (token arrays). Quote-aware; command substitutions are
// returned as their own commands, also when they sit inside double quotes, and the outer token keeps the
// substitution's text (`$(pgrep x)`), so `kill $(pgrep x)` is seen as one pattern kill.
// Heredoc bodies are data (N1): they are attached to their command as `.heredoc` and not split into commands,
// except command substitutions in an unquoted-delimiter body. A command after a pipe carries `.pipedFrom`, so
// `cat <<EOF | sh` can be checked: the shell reads the body as commands.
export function simpleCommands(cmd) {
  const out = [];
  let tokens = [];
  let tok = null;
  let pending = []; // heredocs opened on the current line, bodies read at its newline
  let last = null; // the last command pushed at this level
  let pipeFrom = null;
  const endTok = () => {
    if (tok !== null) tokens.push(tok);
    tok = null;
  };
  const endCmd = () => {
    endTok();
    if (tokens.length) {
      if (pipeFrom) tokens.pipedFrom = pipeFrom;
      out.push(tokens);
      last = tokens;
      pipeFrom = null;
    }
    tokens = [];
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
        tok += `$(${cmd.slice(i + 2, j)})`;
        i = j;
        continue;
      }
      if (c === "`") {
        const j = cmd.indexOf("`", i + 1);
        const end = j === -1 ? cmd.length : j;
        out.push(...simpleCommands(cmd.slice(i + 1, end)));
        tok += `\`${cmd.slice(i + 1, end)}\``;
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
      // comment to end of line (the newline itself is handled next, so pending heredoc bodies are still read)
      while (i + 1 < cmd.length && cmd[i + 1] !== "\n") i++;
      continue;
    }
    if (c === "$" && cmd[i + 1] === "(") {
      // unquoted command substitution: its own command; the outer token keeps its text
      const j = closeParen(cmd, i + 2);
      out.push(...simpleCommands(cmd.slice(i + 2, j)));
      tok = (tok ?? "") + `$(${cmd.slice(i + 2, j)})`;
      i = j;
      continue;
    }
    if (c === "`") {
      const j = cmd.indexOf("`", i + 1);
      const end = j === -1 ? cmd.length : j;
      out.push(...simpleCommands(cmd.slice(i + 1, end)));
      tok = (tok ?? "") + `\`${cmd.slice(i + 1, end)}\``;
      i = end;
      continue;
    }
    if (c === "<") {
      const h = heredocOp(cmd, i);
      if (h) {
        endTok();
        h.target = tokens;
        pending.push(h);
        i = h.end - 1;
        continue;
      }
    }
    if (c === "\n") {
      endCmd();
      if (pending.length) {
        const next = readBodies(cmd, i + 1, pending);
        for (const h of pending) {
          h.target.heredoc = (h.target.heredoc ?? "") + h.body;
          if (!h.quoted) out.push(...substitutions(h.body));
        }
        pending = [];
        i = next - 1;
      }
      continue;
    }
    if (";&|()".includes(c)) {
      const pipe = c === "|" && cmd[i + 1] !== "|" && cmd[i - 1] !== "|";
      endCmd();
      if (pipe) pipeFrom = last;
      continue;
    }
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

function checkSimple(tokens, raw, depth, ctx = {}) {
  const { argv, via } = unwrap(tokens);
  if (!argv.length) return null;
  const cmd = base(argv[0]);
  const args = argv.slice(1);

  if (["bash", "sh", "zsh", "dash", "ksh"].includes(cmd) && depth < 4) {
    const ci = args.findIndex((a) => /^-[A-Za-z]*c[A-Za-z]*$/.test(a));
    if (ci !== -1 && args[ci + 1] !== undefined) return verdict(args[ci + 1], depth + 1, ctx);
    // No -c and no script file: the shell reads commands from stdin, here a heredoc (`sh <<EOF`) or a piped one
    // (`cat <<EOF | sh`). Its body is commands, not data.
    if (args.every((a) => a.startsWith("-"))) {
      const body = tokens.heredoc ?? tokens.pipedFrom?.heredoc;
      if (body) return verdict(body, depth + 1, ctx);
    }
    return null;
  }
  if (cmd === "pkill") return `\`pkill\` kills by name or pattern on a host every agent shares (with -f it matches the shell running it). ${STOP_HINT}`;
  if (cmd === "pgrep" && (hasShortFlag(args, "f") || args.includes("--full")))
    return `\`pgrep -f\` matches full command lines, including the shell running it and other agents' processes. ${STOP_HINT}`;
  if (cmd === "killall") {
    const listOnly = args.length > 0 && args.every((a) => ["-l", "--list", "-V", "--version"].includes(a));
    if (!listOnly) return `\`killall\` kills every process with that name on the shared host. ${STOP_HINT}`;
  }
  if (cmd === "fuser" && (hasShortFlag(args, "k") || args.includes("--kill")))
    return `\`fuser -k\` kills every process using that port or file, whoever started it. ${PORT_HINT}`;
  if (cmd === "kill") {
    if (via === "xargs") {
      const from = tokens.pipedFrom ? unwrap(tokens.pipedFrom).argv : [];
      if (from.length && ["lsof", "fuser", "ss", "netstat"].includes(base(from[0])))
        return `\`${base(from[0])} … | xargs kill\` kills whatever holds the port (a port kill). ${PORT_HINT}`;
      return `\`xargs kill\` kills whatever the pipeline matched (a pattern kill). ${STOP_HINT}`;
    }
    if (args.some((a) => /(\$\(|`)\s*(\S*\/)?(lsof|fuser)\b/.test(a)))
      return `\`kill\` fed by \`lsof\`/\`fuser\` is a port kill on a shared host. ${PORT_HINT}`;
    if (args.some((a) => /(\$\(|`)\s*(\S*\/)?(pgrep|pidof)\b/.test(a)))
      return `\`kill\` fed by \`pgrep\`/\`pidof\` is a pattern kill on a shared host. ${STOP_HINT}`;
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
    let dir = ctx.cwd ?? null; // where git will run: the shell's cwd, moved by each -C
    let gitDir = null;
    const conf = [];
    while (i < args.length && args[i].startsWith("-")) {
      const o = args[i++];
      if (o === "-C" && args[i] !== undefined) {
        const d = args[i];
        if (path.isAbsolute(d)) dir = path.resolve(d);
        else dir = dir ? path.resolve(dir, d) : null; // relative to an unknown cwd: unknown
      }
      if (o === "-c" && args[i] !== undefined) conf.push(args[i]);
      if (o === "--git-dir" && args[i] !== undefined) gitDir = args[i];
      if (o.startsWith("--git-dir=")) gitDir = o.slice("--git-dir=".length);
      if (["-C", "-c", "--git-dir", "--work-tree", "--namespace"].includes(o)) i++;
    }
    const sub = args[i];
    const rest = args.slice(i + 1);
    if (ctx.main && sub) {
      const resolvedGitDir = gitDir && (path.isAbsolute(gitDir) ? gitDir : dir ? path.resolve(dir, gitDir) : null);
      const inMain = resolvedGitDir ? isMainGitDir(resolvedGitDir, ctx.main) : inMainCheckout(dir, ctx.main);
      if (inMain) {
        const r = mainGitRule(sub, rest, conf);
        if (r) return r;
      }
    }
    if (sub !== "stash") return null;
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
// ctx: { cwd, main }. cwd is the shell's working dir (the hook payload's `cwd`); main is the main checkout's path.
// With no ctx (the old call form) the main-checkout rules are off, unless a command names an absolute -C / cd and
// ctx.main is given. `cd`/`pushd` move ctx.cwd for the commands after them (a subshell's cd is not scoped: approximate).
export function verdict(command, depth = 0, ctx = {}) {
  if (typeof command !== "string" || !command.trim()) return null;
  // `kill $(pgrep …)` / `kill $(pidof …)` is checked on the kill command's own tokens (checkSimple), so a heredoc
  // body that only mentions it is data.
  for (const tokens of simpleCommands(command)) {
    const { argv } = unwrap(tokens);
    if (argv.length && ["cd", "pushd"].includes(base(argv[0]))) {
      const d = argv.slice(1).find((a) => !a.startsWith("-") || a === "-");
      if (d === undefined || d === "~") ctx.cwd = process.env.HOME || ctx.cwd;
      else if (d === "-" || d.includes("$") || d.startsWith("~")) ctx.cwd = d.startsWith("~/") && process.env.HOME ? path.join(process.env.HOME, d.slice(2)) : null;
      else ctx.cwd = path.isAbsolute(d) ? path.resolve(d) : ctx.cwd ? path.resolve(ctx.cwd, d) : null;
      continue;
    }
    const r = checkSimple(tokens, command, depth, ctx);
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
      let main = null;
      try { main = process.env.S3_GUARD_MAIN ? path.resolve(process.env.S3_GUARD_MAIN) : mainCheckoutOf(); } catch {}
      const reason = verdict(event.tool_input?.command, 0, { cwd: event.cwd || process.cwd(), main });
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
