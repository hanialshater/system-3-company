// lib/commit-file.mjs: code's commit of named files on the sandbox branch, for the M7 adapters that write the run's
// integration worktree (rituals.mjs ship, events-export.mjs, board-mirror.mjs). The same rules as inbox-export.mjs's
// --commit (M5 exit criterion 2, M6 prep review), which this file does not change: only in a linked worktree (its .git
// is a file) on a meta/* branch, only the named paths, the repo's normal hooks (the kernel's git pins and inherited repo
// pointers are taken out of the environment, so a hooksPath the kernel set for its own git is not inherited), never a
// push, and never a message naming [deploy].

import fs from "node:fs";
import path from "node:path";
import { spawnSync } from "node:child_process";

export const MAIN_REPO = "/home/user/system-3-company";
const DEPLOY = /\[deploy\]/i;

/** The output git may print to one call (M7 finish review: node's default maxBuffer is 1 MiB, and the company's own
 *  files are past it: company/ops/board.json ~1.06 MB, events.jsonl ~8.3 MB, progress.md ~0.6 MB. `git show
 *  <ref>:company/ops/board.json` died with ENOBUFS, status null and an empty stderr, so renumber --onto could not read the
 *  real board, and commitPaths counted board.json and events.jsonl as changed every time). */
export const GIT_MAX_BUFFER = 256 * 1024 * 1024;
/** git with no kernel pins (GIT_CONFIG_*) or inherited repo pointers, so the repo's own hooks run. */
export function git(cwd, ...args) {
  const env = { ...process.env };
  for (const k of Object.keys(env)) if (/^GIT_(CONFIG_|CONFIG$|DIR$|WORK_TREE$|INDEX_FILE$|COMMON_DIR$)/.test(k)) delete env[k];
  return spawnSync("git", ["-C", cwd, ...args], { encoding: "utf8", env, timeout: 30_000, maxBuffer: GIT_MAX_BUFFER });
}
/** Why a git call failed, in words (a spawn error such as ENOBUFS or ETIMEDOUT leaves stderr empty). */
export const gitWhy = (r) => String(r.stderr ?? "").trim() || (r.error ? `${r.error.code ?? r.error.message}` : `exit ${r.status}`);
const real = (p) => { try { return fs.realpathSync(p); } catch { return path.resolve(p); } };

/** Why `root` may not take code's commits, or null: it must be a linked worktree (not the main checkout, not any primary
 *  checkout) checked out on a meta/* branch. Returns { error } or { root, branch }. */
export function sandboxOf(dir) {
  const top = git(dir, "rev-parse", "--show-toplevel");
  if (top.status !== 0) return { error: `${dir} is not in a git worktree: ${String(top.stderr).trim()}` };
  const root = top.stdout.trim();
  if (real(root) === real(MAIN_REPO)) return { error: `${root} is the main checkout: code commits on the sandbox branch only` };
  let dotgit = null; try { dotgit = fs.statSync(path.join(root, ".git")); } catch {}
  if (!dotgit?.isFile()) return { error: `${root} is not a linked worktree (its .git is ${dotgit ? "a directory: a primary checkout" : "missing"}): code commits on the sandbox branch only` };
  const br = git(root, "rev-parse", "--abbrev-ref", "HEAD");
  const branch = br.stdout.trim();
  if (br.status !== 0 || !/^meta\/[A-Za-z0-9._/-]+$/.test(branch)) return { error: `${root} is on ${branch || "no branch"}, not a meta/* sandbox branch: code commits there only` };
  return { root, branch };
}

/** Commit `rels` (paths relative to the worktree root) alone, when any differs from HEAD's: { sha } | { unchanged: true }
 *  | { error }. Other changes in the worktree are left as they are (staged ones too: the commit names its paths). */
export function commitPaths(root, rels, message) {
  if (DEPLOY.test(message)) return { error: "a commit message never names [deploy]" };
  const sb = sandboxOf(root);
  if (sb.error) return { error: sb.error };
  let failed = null;
  const changed = rels.filter((rel) => {
    const head = git(sb.root, "show", `HEAD:${rel}`);
    if (head.error) { failed ??= `git show HEAD:${rel}: ${gitWhy(head)}`; return false; } // not "absent at HEAD"
    const abs = path.join(sb.root, rel);
    if (!fs.existsSync(abs)) return head.status === 0; // deleted
    return head.status !== 0 || head.stdout !== fs.readFileSync(abs, "utf8");
  });
  if (failed) return { error: failed };
  if (!changed.length) return { unchanged: true };
  const id = git(sb.root, "config", "user.email").stdout?.trim() ? [] : ["-c", "user.name=System 3 Meta", "-c", "user.email=meta@localhost"];
  const add = git(sb.root, "add", "--", ...changed);
  if (add.status !== 0) return { error: `git add ${changed.join(" ")}: ${String(add.stderr).trim()}` };
  const c = git(sb.root, ...id, "commit", "-q", "-m", message, "--", ...changed);
  if (c.status !== 0) return { error: `git commit ${changed.join(" ")}: ${String(c.stderr || c.stdout).trim()}` };
  return { sha: git(sb.root, "rev-parse", "HEAD").stdout.trim(), paths: changed };
}
