// K5 (plan 2026-10-21 §3): the order workspace. A spec `workspace` gives every order its own git worktree of the
// company repo, made once per order (not per run), so every stage of the order (the builder's session, the code stages,
// the checkers) works in the same checkout. Why: the lesson flow's stages 1 to 9 work in the repo, not in
// live/work/<task>; reveal-fit (exit 3, "no evidence") and the QA stamp (`built from <sha>`) need a clean git checkout.
//   workspace: { kind: "git-worktree", repo: "<the repo>", base: "<commit or branch the order starts from>",
//                root: "/home/user/s3c-wt", branch: "meta/${run}/${task}",
//                env: { NEXT_DIST_DIR: ".next-${task}", QA_PORT: "${port}", QA_OUT: "test-results/${task}" },
//                nodeModules: "symlink:/home/user/s3c-wt/base/node_modules", run: "m4", portBase: 3100 }
// Templates take ${run} (spec `run`, else the live dir's name), ${task}, ${slug}, ${n} (the order's number) and
// ${port} (portBase, default 3100, plus n: two orders' QA servers never share a port). The order keeps o.workdir and
// o.workspace {dir, branch, base, sha, env}; cmd stages run there with that env (state.mjs prepareCmd), and the pack and
// the brief name it. No spec `workspace`: nothing changes (live/work/<task>, as every run before K5).
import fs from "node:fs";
import path from "node:path";
import { spawnSync } from "node:child_process";
import { LIVE } from "./state.mjs";

export const WS_KEYS = ["kind", "repo", "base", "root", "branch", "env", "nodeModules", "run", "portBase"];
export const WS_KINDS = ["git-worktree"];
export const DEFAULT_BRANCH = "meta/${run}/${task}";
// git runs under the state lock (withLock breaks a lock older than 30 s, state.mjs): a git call that hangs past this is
// a stage-error, not a broken lock
const GIT_TIMEOUT_MS = 25_000;
const VAR = /\$\{(run|task|slug|n|port)\}/g;

/** Why a spec `workspace` is invalid, or null. */
export function validateWorkspace(w) {
  if (!w || typeof w !== "object" || Array.isArray(w)) return "a workspace is an object";
  const bad = Object.keys(w).filter((k) => !WS_KEYS.includes(k));
  if (bad.length) return `unknown workspace field ${bad.join(", ")} (known: ${WS_KEYS.join(", ")})`;
  if (!WS_KINDS.includes(w.kind)) return `kind is one of ${WS_KINDS.join(", ")}`;
  for (const k of ["repo", "root"]) if (typeof w[k] !== "string" || !path.isAbsolute(w[k])) return `${k} is an absolute path`;
  if (w.base != null && (typeof w.base !== "string" || !w.base)) return "base is a commit, tag or branch";
  if (w.branch != null && (typeof w.branch !== "string" || !w.branch.includes("${task}"))) return "branch is a template naming ${task} (one branch per order)";
  if (w.run != null && (typeof w.run !== "string" || !/^[\w.-]+$/.test(w.run))) return "run is a name ([A-Za-z0-9_.-])";
  if (w.portBase != null && !(Number.isInteger(w.portBase) && w.portBase > 0 && w.portBase < 65000)) return "portBase is a port number";
  if (w.env != null && (typeof w.env !== "object" || Array.isArray(w.env) || Object.values(w.env).some((v) => typeof v !== "string"))) return "env is an object of strings";
  if (w.nodeModules != null && !(typeof w.nodeModules === "string" && /^symlink:\//.test(w.nodeModules))) return 'nodeModules is "symlink:<absolute path>"';
  return null;
}

export const specOf = (co) => co.spec?.workspace ?? null;
const git = (cwd, ...args) => spawnSync("git", ["-C", cwd, ...args], { encoding: "utf8", timeout: GIT_TIMEOUT_MS });
const ok = (r) => r.status === 0;
const why = (r, what) => `${what}: ${r.error?.code === "ETIMEDOUT" ? `timed out after ${GIT_TIMEOUT_MS} ms` : (r.stderr || r.error?.message || `exit ${r.status}`).trim().split("\n").slice(-3).join(" ")}`;
/** A worktree of `repo` at exactly `dir` (not a folder inside some other checkout). */
const isWorktree = (dir, repo) => {
  if (!fs.existsSync(path.join(dir, ".git"))) return false;
  const top = git(dir, "rev-parse", "--show-toplevel"), common = git(dir, "rev-parse", "--git-common-dir"), mine = git(repo, "rev-parse", "--git-common-dir");
  return ok(top) && ok(common) && ok(mine) && fs.realpathSync(top.stdout.trim()) === fs.realpathSync(dir)
    && fs.realpathSync(path.resolve(dir, common.stdout.trim())) === fs.realpathSync(path.resolve(repo, mine.stdout.trim()));
};

/** The template variables for order `o`. */
export function varsFor(w, o) {
  const n = Number(String(o.id ?? "").replace(/\D/g, "")) || 0;
  return { run: w.run ?? path.basename(LIVE), task: o.task ?? "", slug: o.slug ?? o.task ?? "", n: String(n), port: String((w.portBase ?? 3100) + n) };
}
export const fill = (s, vars) => s.replace(VAR, (_, k) => vars[k] ?? "");

/** The order's worktree, made the first time it is needed and reused after: { workdir, branch, sha, created } or
 *  { error } (the caller holds the order as a stage-error: a git failure is not the work's fault). null when the spec
 *  has no workspace. Sets o.workdir and o.workspace. */
export function ensure(co, o) {
  const w = specOf(co);
  if (!w) return null;
  const done = (created) => ({ workdir: o.workdir, branch: o.workspace.branch, sha: o.workspace.sha, created });
  if (o.workspace?.dir && isWorktree(o.workspace.dir, w.repo)) return done(false); // once per order
  if (!/^[\w.-]+$/.test(o.task ?? "")) return { error: `task ${JSON.stringify(o.task)} cannot name a worktree ([A-Za-z0-9_.-])` };
  const vars = varsFor(w, o);
  const dir = path.join(w.root, o.task), branch = fill(w.branch ?? DEFAULT_BRANCH, vars), base = w.base ?? "HEAD";
  if (!ok(git(w.repo, "check-ref-format", "--branch", branch))) return { error: `branch ${branch} is not a valid branch name` };
  let created = false;
  if (!isWorktree(dir, w.repo)) {
    // a folder there that is not this repo's worktree is someone else's: never overwrite it
    if (fs.existsSync(dir) && fs.readdirSync(dir).length) return { error: `${dir} exists and is not a worktree of ${w.repo}` };
    git(w.repo, "worktree", "prune"); // a worktree removed by hand leaves a stale entry that blocks its branch
    // the branch survives a removed worktree or a re-initialised state: check it out again, keeping its commits
    const has = ok(git(w.repo, "rev-parse", "--verify", "--quiet", `refs/heads/${branch}`));
    const r = has ? git(w.repo, "worktree", "add", dir, branch) : git(w.repo, "worktree", "add", "-b", branch, dir, base);
    if (!ok(r)) return { error: why(r, `git worktree add ${dir} (${has ? branch : `-b ${branch} from ${base}`})`) };
    created = true;
  }
  const head = git(dir, "rev-parse", "HEAD");
  if (!ok(head)) return { error: why(head, `git rev-parse HEAD in ${dir}`) };
  if (w.nodeModules) {
    // one npm ci for every order (plan F-b): the base checkout's node_modules, linked; ignored by an anchored pattern in
    // the repo's info/exclude, since `node_modules/` in .gitignore does not match a symlink and the tree must stay clean
    const target = w.nodeModules.slice("symlink:".length), link = path.join(dir, "node_modules");
    if (!fs.existsSync(link) && !isLink(link)) fs.symlinkSync(target, link, "dir");
    const common = git(dir, "rev-parse", "--git-common-dir");
    if (ok(common)) {
      const ex = path.join(path.resolve(dir, common.stdout.trim()), "info", "exclude");
      const text = fs.existsSync(ex) ? fs.readFileSync(ex, "utf8") : "";
      if (!text.split("\n").includes("/node_modules")) { fs.mkdirSync(path.dirname(ex), { recursive: true }); fs.appendFileSync(ex, `${text && !text.endsWith("\n") ? "\n" : ""}/node_modules\n`); }
    }
  }
  const env = Object.fromEntries(Object.entries(w.env ?? {}).map(([k, v]) => [k, fill(v, vars)]));
  o.workdir = dir;
  o.workspace = { kind: w.kind, repo: w.repo, dir, branch, base, sha: head.stdout.trim(), env };
  co.log.add({ type: "workspace", order: o.id, task: o.task, dir, branch, base, sha: o.workspace.sha, created });
  return done(created);
}
const isLink = (p) => { try { return fs.lstatSync(p).isSymbolicLink(); } catch { return false; } };
