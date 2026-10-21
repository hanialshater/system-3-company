// K5 (plan 2026-10-21 §3): the order workspace. A spec `workspace` gives every order its own git worktree of the
// company repo, made once per order (not per run), so every stage of the order (the builder's session, the code stages,
// the checkers) works in the same checkout. Why: the lesson flow's stages 1 to 9 work in the repo, not in
// live/work/<task>; reveal-fit (exit 3, "no evidence") and the QA stamp (`built from <sha>`) need a clean git checkout.
//   workspace: { kind: "git-worktree", repo: "<the repo>", base: "<commit or branch the order starts from>",
//                root: "/home/user/s3c-wt", branch: "meta/${run}-${task}",
//                env: { NEXT_DIST_DIR: ".next-${task}", QA_PORT: "${port}", QA_OUT: "test-results/${task}" },
//                nodeModules: "symlink:/home/user/s3c-wt/base/node_modules", run: "m4", portBase: 3100 }
// Templates take ${run} (spec `run`, else the live dir's name), ${task}, ${slug}, ${n} (the order's number) and
// ${port} (portBase, default 3100, plus n: two orders' QA servers never share a port); env also takes ${workdir}. Any
// other ${…} is refused by validateWorkspace (K5 review: an unknown one was left as literal text). The same variables
// reach cmd stages (o.workspace.vars, state.mjs prepareCmd). The order keeps o.workdir and
// o.workspace {dir, branch, base, sha, env}; cmd stages run there with that env (state.mjs prepareCmd), and the pack and
// the brief name it. No spec `workspace`: nothing changes (live/work/<task>, as every run before K5).
import fs from "node:fs";
import path from "node:path";
import { spawnSync } from "node:child_process";
import { LIVE } from "./state.mjs";

export const WS_KEYS = ["kind", "repo", "base", "root", "branch", "env", "nodeModules", "run", "portBase"];
export const WS_KINDS = ["git-worktree"];
// K5 review: not `meta/${run}/${task}` (the plan's): the base checkout is on branch meta/m4, and a ref meta/m4 cannot
// coexist with meta/m4/<task> ("cannot lock ref"), so every order of run m4 was a workspace stage-error
export const DEFAULT_BRANCH = "meta/${run}-${task}";
const BRANCH_VARS = ["run", "task", "slug", "n", "port"], ENV_VARS = [...BRANCH_VARS, "workdir"];
// git runs under the state lock (withLock breaks a lock older than 30 s, state.mjs). K5 review: a 25 s timeout per call
// let ensure's ~8 calls pass 30 s, so the budget is for the whole ensure, plus a fixed one for undoing a failed add
const ENSURE_BUDGET_MS = 20_000, CLEANUP_MS = 5_000;
const VAR = /\$\{(run|task|slug|n|port|workdir)\}/g;
const unknownVar = (s, known) => [...s.matchAll(/\$\{([^}]*)\}/g)].map((m) => m[1]).find((k) => !known.includes(k));

/** Why a spec `workspace` is invalid, or null. */
export function validateWorkspace(w) {
  if (!w || typeof w !== "object" || Array.isArray(w)) return "a workspace is an object";
  const bad = Object.keys(w).filter((k) => !WS_KEYS.includes(k));
  if (bad.length) return `unknown workspace field ${bad.join(", ")} (known: ${WS_KEYS.join(", ")})`;
  if (!WS_KINDS.includes(w.kind)) return `kind is one of ${WS_KINDS.join(", ")}`;
  for (const k of ["repo", "root"]) if (typeof w[k] !== "string" || !path.isAbsolute(w[k])) return `${k} is an absolute path`;
  if (w.base != null && (typeof w.base !== "string" || !w.base)) return "base is a commit, tag or branch";
  if (w.branch != null && (typeof w.branch !== "string" || !w.branch.includes("${task}"))) return "branch is a template naming ${task} (one branch per order)";
  if (w.branch != null && unknownVar(w.branch, BRANCH_VARS) != null) return `branch: unknown variable \${${unknownVar(w.branch, BRANCH_VARS)}} (known: ${BRANCH_VARS.join(", ")})`;
  if (w.run != null && (typeof w.run !== "string" || !/^[\w.-]+$/.test(w.run))) return "run is a name ([A-Za-z0-9_.-])";
  if (w.portBase != null && !(Number.isInteger(w.portBase) && w.portBase > 0 && w.portBase < 65000)) return "portBase is a port number";
  if (w.env != null && (typeof w.env !== "object" || Array.isArray(w.env) || Object.values(w.env).some((v) => typeof v !== "string"))) return "env is an object of strings";
  for (const [k, v] of Object.entries(w.env ?? {})) if (unknownVar(v, ENV_VARS) != null) return `env ${k}: unknown variable \${${unknownVar(v, ENV_VARS)}} (known: ${ENV_VARS.join(", ")})`;
  if (w.nodeModules != null && !(typeof w.nodeModules === "string" && /^symlink:\//.test(w.nodeModules))) return 'nodeModules is "symlink:<absolute path>"';
  return null;
}

export const specOf = (co) => co.spec?.workspace ?? null;
const ok = (r) => r.status === 0;
const out = (r) => r.stdout.trim().split("\n");
const why = (r, what) => `${what}: ${r.error?.code === "ETIMEDOUT" ? `timed out (ensure has ${ENSURE_BUDGET_MS} ms for all its git calls)` : (r.stderr || r.error?.message || `exit ${r.status}`).trim().split("\n").slice(-3).join(" ")}`;
const real = (p) => { try { return fs.realpathSync(p); } catch { return path.resolve(p); } };
const isLink = (p) => { try { return fs.lstatSync(p).isSymbolicLink(); } catch { return false; } };
/** git with what is left of `by` as its timeout: ensure's calls share one budget (they all run under the state lock). */
const gitBy = (by) => (cwd, ...args) => {
  const left = by - Date.now();
  if (left < 250) return { status: null, error: { code: "ETIMEDOUT" }, stdout: "", stderr: "" };
  return spawnSync("git", ["-C", cwd, ...args], { encoding: "utf8", timeout: left });
};

/** What is at `dir`: null (not a worktree of the repo whose common dir is `common`, at exactly `dir`), {incomplete}
 *  (a `git worktree add` that was killed: git locks the worktree "initializing" until its checkout ends, K5 review),
 *  or {sha, head} (head: the branch checked out, "HEAD" when detached). One git call. */
function inspect(git, dir, common) {
  const dotgit = path.join(dir, ".git");
  if (!fs.existsSync(dotgit)) return null;
  try {
    const m = /^gitdir: (.*)$/m.exec(fs.readFileSync(dotgit, "utf8"));
    const lock = m && path.join(path.resolve(dir, m[1].trim()), "locked");
    if (lock && fs.existsSync(lock) && /initializing/.test(fs.readFileSync(lock, "utf8"))) return { incomplete: true };
  } catch {} // .git is a directory: a main checkout, judged below
  const r = git(dir, "rev-parse", "--show-toplevel", "--git-common-dir", "HEAD", "--abbrev-ref", "HEAD");
  if (!ok(r)) return null;
  const [top, c, sha, head] = out(r);
  return real(top) === real(dir) && real(path.resolve(dir, c)) === common ? { sha, head } : null;
}

/** The template variables for order `o`. */
export function varsFor(w, o) {
  const n = Number(String(o.id ?? "").replace(/\D/g, "")) || 0;
  return { run: w.run ?? path.basename(LIVE), task: o.task ?? "", slug: o.slug ?? o.task ?? "", n: String(n), port: String((w.portBase ?? 3100) + n) };
}
export const fill = (s, vars) => s.replace(VAR, (m, k) => (k in vars ? vars[k] : m));

/** Why the order may not be worked yet (its worktree is missing or wrong), or null; a git failure is recorded as a
 *  workspace hold (o.stageError kind "workspace"), which only `supervisor.mjs retry` lifts, whatever the order's stage
 *  (K5 review: a hold keyed to the stage lifted when the builder left build, and `room enter` went ahead without one). */
export function blocker(co, o, opts) {
  if (!specOf(co)) return null;
  if (o.stageError?.kind === "workspace") return o.stageError.why;
  const w = ensure(co, o, opts);
  if (w?.error) return hold(co, o, w.error);
  return w?.pending ? "its worktree is not made yet" : null;
}
/** Hold order `o` on a workspace failure until `node supervisor.mjs retry --order=<O>`. Returns the reason. */
export function hold(co, o, error) {
  const why = `workspace: ${error}`;
  o.stageError = { kind: "workspace", stage: o.stage, loops: o.loops, why, t: co.engine.clock.now() };
  co.log.add({ type: "stage-error", kind: "workspace", order: o.id, stage: o.stage, loops: o.loops, why });
  return why;
}

/** The order's worktree, made the first time it is needed and reused after: { workdir, branch, sha, created },
 *  { error } (the caller holds the order as a stage-error: a git failure is not the work's fault) or, with
 *  `create: false` when it would have to be made, { pending } (the tick makes one per pass: K5 review, each add of the
 *  17k-file repo runs under the lock). null when the spec has no workspace. Sets o.workdir and o.workspace. */
export function ensure(co, o, { create = true } = {}) {
  const w = specOf(co);
  if (!w) return null;
  const git = gitBy(Date.now() + ENSURE_BUDGET_MS);
  const done = (created) => ({ workdir: o.workdir, branch: o.workspace.branch, sha: o.workspace.sha, created });
  const R = git(w.repo, "rev-parse", "--git-common-dir", "--show-toplevel");
  if (!ok(R)) return { error: why(R, `git rev-parse in ${w.repo}`) };
  const [rc, rtop] = out(R), common = real(path.resolve(w.repo, rc));
  // K5 review: the reused worktree's branch was never checked, so another run's worktree (or the shared base checkout)
  // was reported as this order's branch while HEAD was elsewhere, and the work and K7's commits would land there
  const wrong = (dir, head, branch) => `${dir} is on ${head === "HEAD" ? "a detached HEAD" : `branch ${head}`}, not ${branch}: another order's or run's checkout (switch it back, or remove it and retry)`;
  if (o.workspace?.dir) {
    const at = inspect(git, o.workspace.dir, common);
    if (at?.sha) return at.head === o.workspace.branch ? done(false) : { error: wrong(o.workspace.dir, at.head, o.workspace.branch) }; // once per order
  }
  if (!/^[\w.-]+$/.test(o.task ?? "")) return { error: `task ${JSON.stringify(o.task)} cannot name a worktree ([A-Za-z0-9_.-])` };
  const vars = varsFor(w, o);
  const dir = path.join(w.root, o.task), branch = fill(w.branch ?? DEFAULT_BRANCH, vars), base = w.base ?? "HEAD";
  // never an order's workdir: the repo's own checkout, the root, or the checkout node_modules is shared from (the plan's
  // root holds the shared `base` checkout: a task named `base` got it as its workdir, K5 review)
  const shared = [rtop, w.root, w.nodeModules && path.dirname(w.nodeModules.slice("symlink:".length))].filter(Boolean);
  if (shared.some((p) => real(p) === real(dir))) return { error: `${dir} is a shared checkout (the repo's, the root or the node_modules base), not an order's: rename task ${o.task}` };
  if (!ok(git(w.repo, "check-ref-format", "--branch", branch))) return { error: `branch ${branch} is not a valid branch name` };
  const refs = git(w.repo, "for-each-ref", "--format=%(refname)", "refs/heads/");
  if (!ok(refs)) return { error: why(refs, `git for-each-ref in ${w.repo}`) };
  const heads = out(refs).filter(Boolean), me = `refs/heads/${branch}`;
  // K5 review: refs/heads/meta/m4 and refs/heads/meta/m4/T cannot both exist; say which ref is in the way
  const clash = heads.find((h) => me.startsWith(h + "/") || h.startsWith(me + "/"));
  if (clash) return { error: `branch ${branch} cannot be made: ref ${clash.slice("refs/heads/".length)} exists and git refs cannot nest (set workspace.branch, e.g. "meta/\${run}-\${task}")` };
  const has = heads.includes(me);
  let at = inspect(git, dir, common), created = false;
  if (at?.incomplete) return { error: `${dir} is a worktree whose \`git worktree add\` was interrupted: remove it (git -C ${w.repo} worktree remove --force --force ${dir}) and retry` };
  if (at && at.head !== branch) return { error: wrong(dir, at.head, branch) };
  if (!at) {
    // a folder there that is not this repo's worktree is someone else's: never overwrite it
    const existed = fs.existsSync(dir);
    if (existed && fs.readdirSync(dir).length) return { error: `${dir} exists and is not a worktree of ${w.repo}` };
    if (!create) return { pending: true };
    git(w.repo, "worktree", "prune"); // a worktree removed by hand leaves a stale entry that blocks its branch
    // the branch survives a removed worktree or a re-initialised state: check it out again, keeping its commits
    const r = has ? git(w.repo, "worktree", "add", dir, branch) : git(w.repo, "worktree", "add", "-b", branch, dir, base);
    if (!ok(r)) {
      // K5 review: a killed add leaves a registered, half-checked-out worktree; undo it (the folder was ours: absent or empty)
      spawnSync("git", ["-C", w.repo, "worktree", "remove", "--force", "--force", dir], { timeout: CLEANUP_MS });
      if (!existed) fs.rmSync(dir, { recursive: true, force: true });
      spawnSync("git", ["-C", w.repo, "worktree", "prune"], { timeout: CLEANUP_MS });
      return { error: why(r, `git worktree add ${dir} (${has ? branch : `-b ${branch} from ${base}`})`) };
    }
    created = true;
    at = inspect(git, dir, common);
    if (!at?.sha) return { error: `git worktree add ${dir} left no checkout git can read` };
  }
  if (has) {
    // a branch kept from before must start from this spec's base (K5 review: the base of a reused branch was never checked)
    const a = git(w.repo, "merge-base", "--is-ancestor", base, at.sha);
    if (!ok(a)) return { error: a.status === 1 ? `branch ${branch} (at ${at.sha.slice(0, 7)}) does not start from base ${base}: an older order's branch (remove it, or set workspace.branch)` : why(a, `git merge-base ${base}`) };
  }
  if (w.nodeModules) {
    // one npm ci for every order (plan F-b): the base checkout's node_modules, linked; `node_modules/` in .gitignore does
    // not match a symlink and the tree must stay clean, so an anchored /node_modules goes in the repo's info/exclude
    // (shared by every worktree: git has no per-worktree exclude file) only when git would otherwise list the link
    const target = w.nodeModules.slice("symlink:".length), link = path.join(dir, "node_modules");
    if (!fs.existsSync(link) && !isLink(link)) fs.symlinkSync(target, link, "dir");
    const ex = path.join(common, "info", "exclude");
    const text = fs.existsSync(ex) ? fs.readFileSync(ex, "utf8") : "";
    if (!text.split("\n").includes("/node_modules")) {
      const st = git(dir, "status", "--porcelain", "--", "node_modules");
      if (ok(st) && st.stdout.trim()) { fs.mkdirSync(path.dirname(ex), { recursive: true }); fs.appendFileSync(ex, `${text && !text.endsWith("\n") ? "\n" : ""}/node_modules\n`); }
    }
  }
  const all = { ...vars, workdir: dir };
  const env = Object.fromEntries(Object.entries(w.env ?? {}).map(([k, v]) => [k, fill(v, all)]));
  o.workdir = dir;
  o.workspace = { kind: w.kind, repo: w.repo, dir, branch, base, sha: at.sha, env, vars: all };
  co.log.add({ type: "workspace", order: o.id, task: o.task, dir, branch, base, sha: at.sha, created });
  return done(created);
}
