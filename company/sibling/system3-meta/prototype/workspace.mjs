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
// K7 (plan §3): the integrator. With `workspace.commit` (true, or { protectedPaths: "<repo-relative file>" }), every
// stage that leaves (engine.advance, pass or revise) is committed in the order's worktree by code: `git add -A` and
// `git commit -m "meta: <O> <stage> <slug>"`. Refused (and the order held, as a workspace stage-error, until the change
// is undone and `supervisor.mjs retry`; the next tick commits again): a message matching /\[deploy\]/i (vercel.json
// builds only [deploy] commits; the slug is an agent's text) or naming any commit on the branch since the order's base
// on the branch's first-parent line (an agent's own `git commit` too, K7 review), and any path the branch changes since that base (commits plus index)
// matching a glob of the repo's protected-paths.txt as of the base commit (the worktree's own copy is the agent's to
// edit). The commit runs the repo's hooks, so the same checks run again on the commit as made, which is undone on a hit
// (K7 review 2). A refusal puts the index back as the agent left it. It never pushes.
import fs from "node:fs";
import path from "node:path";
import { spawnSync } from "node:child_process";
import { LIVE } from "./state.mjs";

export const WS_KEYS = ["kind", "repo", "base", "root", "branch", "env", "nodeModules", "run", "portBase", "commit", "cleanup"];
export const WS_KINDS = ["git-worktree"];
// K5 review: not `meta/${run}/${task}` (the plan's): the base checkout is on branch meta/m4, and a ref meta/m4 cannot
// coexist with meta/m4/<task> ("cannot lock ref"), so every order of run m4 was a workspace stage-error
export const DEFAULT_BRANCH = "meta/${run}-${task}";
const BRANCH_VARS = ["run", "task", "slug", "n", "port"], ENV_VARS = [...BRANCH_VARS, "workdir"];
// git runs under the state lock (withLock breaks a dead holder's lock older than 30 s, state.mjs; a live holder's makes other
// writers fail after 10 s, M6 prep review). K5 review: a 25 s timeout per call
// let ensure's ~8 calls pass 30 s, so the budget is for the whole ensure, plus a fixed one for undoing a failed add
const ENSURE_BUDGET_MS = 20_000, CLEANUP_MS = 5_000;
const VAR = /\$\{(run|task|slug|n|port|workdir|brief_file)\}/g; // M6 prep: brief_file (state.mjs briefVars) for packs
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
  if (w.commit != null && typeof w.commit !== "boolean") {
    if (typeof w.commit !== "object" || Array.isArray(w.commit) || Object.keys(w.commit).some((k) => k !== "protectedPaths")) return "commit is true, false or { protectedPaths }";
    const pp = w.commit.protectedPaths;
    if (pp != null && (typeof pp !== "string" || !pp || path.isAbsolute(pp) || pp.split("/").includes(".."))) return "commit.protectedPaths is a path inside the repo";
  }
  if (w.cleanup != null) { const e = cleanupProblem(w.cleanup, w.env); if (e) return `cleanup: ${e}`; }
  return null;
}

// ---- M7 housekeeping (the M6 run needed the operator to delete each done order's .next-<task> by hand: ~186 MB each)
// Spec workspace.cleanup {env: ["NEXT_DIST_DIR"], worktree: false}: when an order is done (its last commit made), the
// folders its workspace env names (relative paths inside the worktree: the order's own build output) are removed, and
// with `worktree: true` its worktree too (`git worktree remove`, never --force: a worktree with uncommitted or untracked
// work is left, and said so; its branch is always kept, so a reopen checks it out again). A cancelled order's env
// folders are removed too, never its worktree. Nothing outside the worktree is ever deleted: a path that resolves (real
// path) outside it, onto it, onto .git or node_modules, or through a symlink, is refused.
// A flow may set its own, `flows.<name>.workspace: {maxOpen, cleanup}` (the ritual flow: maxOpen 2, worktree removed):
// maxOpen caps how many of the flow's open orders hold a worktree at once (supervisor tick: the others wait).
export const CLEANUP_KEYS = ["env", "worktree"];
export function cleanupProblem(c, env = {}) {
  if (typeof c !== "object" || c == null || Array.isArray(c)) return "cleanup is {env, worktree}";
  const bad = Object.keys(c).filter((k) => !CLEANUP_KEYS.includes(k));
  if (bad.length) return `unknown key ${bad.join(", ")} (${CLEANUP_KEYS.join(", ")})`;
  if (c.env != null && !(Array.isArray(c.env) && c.env.every((k) => typeof k === "string" && /^[A-Z][A-Z0-9_]*$/.test(k)))) return "cleanup.env is a list of workspace env names (NEXT_DIST_DIR)";
  if (env && c.env) for (const k of c.env) if (env[k] == null) return `cleanup.env names ${k}, which the workspace env does not set`;
  if (c.worktree != null && typeof c.worktree !== "boolean") return "cleanup.worktree is true or false";
  return null;
}
/** A flow's workspace settings ({maxOpen, cleanup}), or {}. */
export const flowWs = (co, o) => { const n = String(o.flow ?? "").split("@")[0], S = co.spec ?? {}; return (S.flows?.[n] ?? (S.flow?.name === n ? S.flow : null))?.workspace ?? {}; }; // the spec's (meta.mjs init defines a flow's stages only)
export function flowWsProblem(f, env = {}) {
  if (f == null) return null;
  if (typeof f !== "object" || Array.isArray(f)) return "workspace is {maxOpen, cleanup}";
  const bad = Object.keys(f).filter((k) => !["maxOpen", "cleanup"].includes(k));
  if (bad.length) return `workspace has unknown key ${bad.join(", ")} (maxOpen, cleanup)`;
  if (f.maxOpen != null && !(Number.isInteger(f.maxOpen) && f.maxOpen >= 1 && f.maxOpen <= 20)) return "workspace.maxOpen is a whole number 1-20";
  if (f.cleanup != null) { const e = cleanupProblem(f.cleanup, env); if (e) return `workspace.cleanup: ${e}`; }
  return null;
}
/** Is order `o`'s flow at its maxOpen (open orders of the flow that hold a worktree)? */
export function flowFull(co, o) {
  const max = flowWs(co, o).maxOpen;
  if (max == null) return false;
  const name = String(o.flow).split("@")[0];
  const open = [...co.engine.orders.values()].filter((x) => x.id !== o.id && String(x.flow).split("@")[0] === name && x.workdir && !["done", "cancelled"].includes(x.stage));
  return open.length >= max;
}
/** The cleanup that applies to order `o`: the spec's, with its flow's over it. */
export const cleanupOf = (co, o) => { const a = specOf(co)?.cleanup ?? null, b = flowWs(co, o).cleanup ?? null; return a || b ? { ...(a ?? {}), ...(b ?? {}) } : null; };
export const cleanupDue = (co, o) => !!(o.workspace?.dir && !o.workspace.cleaned && cleanupOf(co, o) && (o.stage === "cancelled" || (o.stage === "done" && !commitDue(co, o))));
/** Remove what cleanup names for order `o` (see above). Returns { removed: [rel], worktree, error? }; records
 *  o.workspace.cleaned and a `cleanup` event. */
export function cleanup(co, o) {
  const c = cleanupOf(co, o), dir = o.workspace.dir, removed = [], skipped = [];
  const root = real(dir);
  for (const k of c.env ?? []) {
    const v = o.workspace.env?.[k];
    if (!v) continue;
    if (path.isAbsolute(v) || v.split(/[\\/]/).includes("..")) { skipped.push(`${k}=${v}: not a path inside the worktree`); continue; }
    const abs = path.resolve(dir, v);
    if (!fs.existsSync(abs) && !isLink(abs)) continue;
    const top = v.split(/[\\/]/).filter(Boolean)[0] ?? "";
    if (isLink(abs) || real(abs) === root || !real(abs).startsWith(root + path.sep) || [".git", "node_modules"].includes(top)) { skipped.push(`${k}=${v}: resolves outside the worktree's own files`); continue; }
    try { fs.rmSync(abs, { recursive: true, force: true }); removed.push(v); } catch (e) { skipped.push(`${k}=${v}: ${e.message}`); }
  }
  let worktree = false, error = skipped.length ? skipped.join("; ") : null;
  if (c.worktree && o.stage === "done" && fs.existsSync(dir)) {
    const r = safeGit(o.workspace.repo, ["worktree", "remove", dir], { timeout: ENSURE_BUDGET_MS });
    if (r.status === 0) { worktree = true; delete o.workdir; } // the branch stays; a reopen makes the worktree again (ensure)
    else error = [error, `git worktree remove ${dir}: ${(r.stderr || r.error?.message || `exit ${r.status}`).trim().split("\n").slice(-2).join(" ")} (left as it is)`].filter(Boolean).join("; ");
  }
  o.workspace.cleaned = { t: co.engine.clock.now(), removed, worktree, ...(error ? { error } : {}) };
  co.log.add({ type: "cleanup", order: o.id, dir, removed, worktree, branch: o.workspace.branch, ...(error ? { error } : {}) });
  return { removed, worktree, ...(error ? { error } : {}) };
}

export const specOf = (co) => co.spec?.workspace ?? null;
const ok = (r) => r.status === 0;
const out = (r) => r.stdout.trim().split("\n");
const why = (r, what) => `${what}: ${r.error?.code === "ETIMEDOUT" ? `timed out (ensure has ${ENSURE_BUDGET_MS} ms for all its git calls)` : (r.stderr || r.error?.message || `exit ${r.status}`).trim().split("\n").slice(-3).join(" ")}`;
const w_common = (dir) => { const r = spawnSync("git", ["-C", dir, "rev-parse", "--path-format=absolute", "--git-common-dir"], { encoding: "utf8", timeout: 5_000, env: { ...process.env, ...GIT_PINS_ENV } }); return r.status === 0 ? r.stdout.trim() + "/" : "the repo's .git/"; };
const real = (p) => { try { return fs.realpathSync(p); } catch { return path.resolve(p); } };
const isLink = (p) => { try { return fs.lstatSync(p).isSymbolicLink(); } catch { return false; } };
// M4 integrate (K7/K10 re-review): every git call the kernel made in an order's worktree also ran what the agent had
// configured there: a core.hooksPath post-commit hook or a core.fsmonitor command pushed to the remote from the kernel's
// own process (the after-scan only undid the local commit, after the push), and a filter driver runs on add. Worktrees
// share the main repo's .git/config, and Write/Edit on <repo>/.git/config was allowed. So the kernel's git (and every
// git a code stage runs: state.mjs prepareCmd) runs with these pinned through GIT_CONFIG_COUNT (command-line scope,
// above every config file): no hooks at all (the company repo has none; the kernel's own checks are the rules), no
// fsmonitor, no pager, no signature display, no auto gc, no submodule recursion, every filter driver not set in the
// system config emptied, and no commit signing when a gpg.* key is set in the repo's own config (an agent's program).
// And a change the agent made to those keys (or to .git/hooks) is refused at the next commit (gitTraps), so it does
// not wait in the founder's checkout for the founder's own git.
export const GIT_PINS = [["core.hooksPath", "/dev/null"], ["core.fsmonitor", "false"], ["core.pager", "cat"], ["log.showSignature", "false"], ["gc.auto", "0"], ["maintenance.auto", "false"], ["submodule.recurse", "false"], ["diff.external", ""]];
/** Keys in a repo's own config (local or worktree scope) that make git run a command, or send what it pushes elsewhere. */
export const TRAP_KEY = /^(core\.(hookspath|fsmonitor|pager|editor|sshcommand|askpass|gitproxy|alternaterefscommand|worktree)|sequence\.editor|filter\..+\.(clean|smudge|process)|diff\.external|diff\..+\.(textconv|command)|merge\..+\.driver|gpg\..+|credential\..*helper|uploadpack\.packobjectshook|include\.path|includeif\..+\.path|remote\..+\.(receivepack|uploadpack|vcs)|alias\..+)$/i;
/** The config git sees in `cwd`: [{scope, key, value}] (no hooks or drivers run to read it). */
export function gitConfig(cwd, env = process.env) {
  const r = spawnSync("git", ["-C", cwd, "config", "--list", "--show-scope", "-z"], { encoding: "utf8", timeout: 5_000, env });
  if (r.status !== 0) return [];
  const parts = r.stdout.split("\0"), list = [];
  for (let i = 0; i + 1 < parts.length; i += 2) { const kv = parts[i + 1], nl = kv.indexOf("\n"); list.push({ scope: parts[i], key: (nl < 0 ? kv : kv.slice(0, nl)).toLowerCase(), value: nl < 0 ? null : kv.slice(nl + 1) }); }
  return list;
}
/** The env for a git call in `cwd`: `env` plus the pins above, appended after any GIT_CONFIG_COUNT entries it has. */
export function gitPins(cwd, env = process.env) {
  const pins = [...GIT_PINS], cfg = gitConfig(cwd, env);
  for (const n of new Set(cfg.filter((e) => e.scope !== "system").map((e) => /^filter\.(.+)\.(clean|smudge|process|required)$/.exec(e.key)?.[1]).filter(Boolean)))
    pins.push([`filter.${n}.clean`, ""], [`filter.${n}.smudge`, ""], [`filter.${n}.process`, ""], [`filter.${n}.required`, "false"]);
  if (cfg.some((e) => (e.scope === "local" || e.scope === "worktree") && /^gpg\./.test(e.key))) pins.push(["commit.gpgSign", "false"], ["tag.gpgSign", "false"]);
  const n0 = Number(env.GIT_CONFIG_COUNT) || 0, out = { GIT_CONFIG_COUNT: String(n0 + pins.length) };
  pins.forEach(([k, v], i) => { out[`GIT_CONFIG_KEY_${n0 + i}`] = k; out[`GIT_CONFIG_VALUE_${n0 + i}`] = v; });
  return out;
}
/** git in `cwd` with the pins: the kernel's only way to run git. */
export const safeGit = (cwd, args, opts = {}) => { const env = opts.env ?? process.env; return spawnSync("git", ["-C", cwd, ...args], { encoding: "utf8", ...opts, env: { ...env, ...gitPins(cwd, env) } }); };
/** What in `cwd`'s repo could make git run an agent's command: its own config's trap keys (local, worktree scope) and
 *  the hook files in its hooks folder, as sorted strings (a snapshot to compare: gitTraps at ensure, again at commit). */
export function gitTraps(cwd) {
  const keys = gitConfig(cwd).filter((e) => (e.scope === "local" || e.scope === "worktree") && TRAP_KEY.test(e.key)).map((e) => `${e.scope} ${e.key}=${e.value ?? ""}`);
  const c = spawnSync("git", ["-C", cwd, "rev-parse", "--git-common-dir"], { encoding: "utf8", timeout: 5_000, env: { ...process.env, ...GIT_PINS_ENV } });
  let hooks = [];
  if (c.status === 0) { const d = path.join(path.resolve(cwd, c.stdout.trim()), "hooks"); try { hooks = fs.readdirSync(d).filter((f) => !f.endsWith(".sample")).map((f) => `hook ${path.join(d, f)}`); } catch {} }
  return [...keys, ...hooks].sort();
}
const GIT_PINS_ENV = (() => { const n0 = Number(process.env.GIT_CONFIG_COUNT) || 0, o = { GIT_CONFIG_COUNT: String(n0 + GIT_PINS.length) }; GIT_PINS.forEach(([k, v], i) => { o[`GIT_CONFIG_KEY_${n0 + i}`] = k; o[`GIT_CONFIG_VALUE_${n0 + i}`] = v; }); return o; })();
/** git with what is left of `by` as its timeout: ensure's calls share one budget (they all run under the state lock). */
const gitBy = (by) => (cwd, ...args) => {
  const left = by - Date.now();
  if (left < 250) return { status: null, error: { code: "ETIMEDOUT" }, stdout: "", stderr: "" };
  return safeGit(cwd, args, { timeout: left });
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
  if (!o.workdir && flowFull(co, o)) return `its flow has ${flowWs(co, o).maxOpen} worktree(s) open (workspace.maxOpen): it waits for one to finish`; // M7
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
      safeGit(w.repo, ["worktree", "remove", "--force", "--force", dir], { timeout: CLEANUP_MS });
      if (!existed) fs.rmSync(dir, { recursive: true, force: true });
      safeGit(w.repo, ["worktree", "prune"], { timeout: CLEANUP_MS });
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
  // K7 review: the base as a commit, for K7's checks of everything the branch did since (a reused branch's sha is its
  // head, past the base: commits there were never checked)
  const b = created && !has ? { status: 0, stdout: at.sha } : git(w.repo, "rev-parse", "--verify", "-q", `${base}^{commit}`);
  if (!ok(b)) return { error: why(b, `git rev-parse ${base}`) };
  const all = { ...vars, workdir: dir };
  const env = Object.fromEntries(Object.entries(w.env ?? {}).map(([k, v]) => [k, fill(v, all)]));
  o.workdir = dir;
  o.workspace = { kind: w.kind, repo: w.repo, dir, branch, base, sha: at.sha, baseSha: out(b)[0], env, vars: all, traps: gitTraps(dir) };
  co.log.add({ type: "workspace", order: o.id, task: o.task, dir, branch, base, sha: at.sha, created });
  return done(created);
}

// ---- K7: the per-stage commit
export const DEFAULT_PROTECTED = "company/constitution/protected-paths.txt";
export const DEPLOY = /\[deploy\]/i;
/** The commit settings of spec workspace `w`, or null (no commits: every run before K7). */
export const commitOf = (w) => (w?.commit ? { protectedPaths: (typeof w.commit === "object" && w.commit.protectedPaths) || DEFAULT_PROTECTED } : null);
/** A protected-paths glob as a regex: the company hook's own translation (.claude/hooks/protect-constitution.mjs). */
export const globRe = (g) => new RegExp("^" + g.replace(/[.+^${}()|[\]\\]/g, "\\$&").replace(/\*\*/g, "\u00a7").replace(/\*/g, "[^/]*").replace(/\u00a7/g, ".*") + "$");
export const globsOf = (text) => text.split("\n").map((l) => l.trim()).filter((l) => l && !l.startsWith("#"));

/** Commit order `o`'s worktree after `stage` left: { sha, files }, { skipped } (nothing changed: no empty commits),
 *  { error, refused? } (nothing committed; a refusal unstages what it staged, the work tree is left as it was), or
 *  null (no commit setting, or no worktree yet). Never pushes. */
export function commit(co, o, stage) {
  const c = commitOf(specOf(co));
  if (!c || !o.workspace?.dir) return null;
  const git = gitBy(Date.now() + ENSURE_BUDGET_MS), dir = o.workspace.dir;
  const msg = `meta: ${o.id} ${stage} ${o.slug ?? o.task ?? ""}`.trim();
  if (DEPLOY.test(msg)) return { refused: true, error: `commit message ${JSON.stringify(msg)} names [deploy] (a deploy needs the founder's approval): rename the order's slug` };
  // the branch is checked again: a builder's `git checkout` would otherwise put the order's commit on another branch
  const h = git(dir, "rev-parse", "--abbrev-ref", "HEAD");
  if (!ok(h)) return { error: why(h, `git rev-parse in ${dir}`) };
  if (out(h)[0] !== o.workspace.branch) return { error: `${dir} is on ${out(h)[0] === "HEAD" ? "a detached HEAD" : `branch ${out(h)[0]}`}, not ${o.workspace.branch}: switch it back and retry` };
  // M4 integrate: git config or hooks that run commands, added since the worktree was made (gitTraps above). The kernel's
  // own git ignores them now, but the founder's git in the main checkout (same .git/config) would not
  const traps = gitTraps(dir);
  if (!o.workspace.traps) o.workspace.traps = traps; // a state from before the snapshot: from now on
  const added = traps.filter((t) => !o.workspace.traps.includes(t));
  if (added.length) return { refused: true, error: `the repo's git config or hooks gained ${added.join("; ")} since the order's worktree was made: git would run that command in the founder's checkout too (worktrees share ${w_common(dir)}config); remove it (git config --unset <key>, or delete the hook) and retry` };
  const pre = git(dir, "rev-parse", "HEAD"), staged = git(dir, "write-tree"); // the agent's own index, to put back
  if (!ok(pre)) return { error: why(pre, `git rev-parse HEAD in ${dir}`) };
  const add = git(dir, "add", "-A");
  if (!ok(add)) return { error: why(add, `git add -A in ${dir}`) };
  // K7 review: `git reset -q` also unstaged what the agent had staged itself (`git add -p`); now the index goes back
  // to exactly what it was before the kernel's add (reset only when write-tree failed: an unmerged index)
  const unstage = () => (ok(staged) ? git(dir, "read-tree", out(staged)[0]) : git(dir, "reset", "-q"));
  const base = o.workspace.baseSha ?? o.workspace.sha; // states from before the K7 review: the sha ensure saw
  const ls = git(dir, "ls-tree", "--name-only", base, "--", c.protectedPaths);
  if (!ok(ls)) { unstage(); return { error: why(ls, `git ls-tree ${base.slice(0, 7)}`) }; }
  let globs = [];
  if (ls.stdout.trim()) {
    const t = git(dir, "show", `${base}:${c.protectedPaths}`);
    if (!ok(t)) { unstage(); return { error: why(t, `git show ${c.protectedPaths}`) }; }
    globs = globsOf(t.stdout).map(globRe);
  }
  // K7 review: only the kernel's message and the staged diff were checked, so a builder's own `git commit -qam
  // "[deploy] mine"` (a protected file edited with sed: the K10 guard denies only Write/Edit) sat under the kernel's
  // clean commit on the branch that is merged later. Now every commit on the branch since the order's base, and the
  // whole change from that base (commits plus index), are checked, whether or not this stage staged anything.
  // K7 review 2: --first-parent: commits that came in through an agent's `git merge main` (main's own [deploy] release
  // commits) held the order for good, and main's history cannot be rewritten; vercel.json builds on the tip's message
  // only, and a merge commit's own message is still checked
  const scan = () => {
    const lg = git(dir, "log", "-z", "--first-parent", "--format=%h %B", `${base}..HEAD`);
    if (!ok(lg)) return { error: why(lg, `git log ${base.slice(0, 7)}..HEAD in ${dir}`) };
    const bad = lg.stdout.split("\0").filter((m) => DEPLOY.test(m)).map((m) => m.split(" ")[0]);
    if (bad.length) return { refused: true, error: `commit ${bad.join(", ")} on ${o.workspace.branch} names [deploy] in its message (a deploy needs the founder's approval): rewrite or drop it in ${dir} (the kernel never rewrites an agent's commits; a fast-forward merge puts the other branch's commits on the branch: merge with --no-ff)` };
    const all = git(dir, "diff", "--no-ext-diff", "--no-textconv", "--cached", "--name-only", "--no-renames", "-z", base); // a rename lists both paths: moving a protected file away is caught
    if (!ok(all)) return { error: why(all, `git diff --cached ${base.slice(0, 7)} in ${dir}`) };
    const hit = all.stdout.split("\0").filter(Boolean).filter((f) => globs.some((g) => g.test(f)));
    if (hit.length) return { refused: true, error: `the order's branch would change protected paths ${hit.join(", ")} since its base ${base.slice(0, 7)} (${c.protectedPaths}: only a ratified amendment changes them): undo the change in ${dir}, in the work tree or in the commit that made it` };
    return null;
  };
  const before = scan();
  if (before) { unstage(); return before; }
  const st = git(dir, "diff", "--no-ext-diff", "--no-textconv", "--cached", "--name-only", "--no-renames", "-z"); // this stage's own change
  if (!ok(st)) { unstage(); return { error: why(st, `git diff --cached in ${dir}`) }; }
  const files = st.stdout.split("\0").filter(Boolean);
  // M6 prep review: nothing to commit, so the head the stage left is the branch's tip as it was signed (${head_sha})
  if (!files.length) { o.workspace.head = out(pre)[0]; return { skipped: true }; }
  // the repo's own identity when it has one. M4 integrate: no hooks run (GIT_PINS core.hooksPath=/dev/null): a hook is
  // whatever the agent put there; the kernel's checks before and after are the rules
  const id = git(dir, "config", "user.email").stdout?.trim() ? [] : ["-c", "user.name=System 3 Meta", "-c", "user.email=meta@localhost"];
  const r = git(dir, ...id, "commit", "-q", "-m", msg);
  if (!ok(r)) { unstage(); return { error: why(r, `git commit in ${dir}`) }; }
  // K7 review 2: the checks ran on the index before `git commit`, and the commit runs the repo's hooks: a hooksPath set
  // from Bash (the K10 guard does not cover it) let a pre-commit hook `git add` tests/qa/contract.md and a
  // prepare-commit-msg hook append [deploy], and the commit after ship (the one merged) was never checked again. So the
  // commit the kernel made is checked as made; on a hit it is undone (reset --soft to the head before it: only the
  // kernel's commit, and any its hooks made) and the index put back
  const after = scan();
  if (after) {
    const back = git(dir, "reset", "-q", "--soft", out(pre)[0]);
    if (ok(back)) unstage();
    return { ...after, error: `the kernel's commit as the repo's hooks made it (check core.hooksPath and .git/hooks): ${after.error}${ok(back) ? "; the commit was undone" : `; ${why(back, `git reset --soft ${out(pre)[0].slice(0, 7)}`)}: undo it by hand`}` };
  }
  const sha = git(dir, "rev-parse", "HEAD");
  if (!ok(sha)) return { error: why(sha, `git rev-parse HEAD in ${dir}`) };
  o.workspace.head = out(sha)[0];
  co.log.add({ type: "commit", order: o.id, stage, branch: o.workspace.branch, sha: o.workspace.head, files: files.length, message: msg });
  return { sha: o.workspace.head, files };
}

/** Is order `o`'s commit still to be made? Only while the spec commits (K7 review 2: a pendingCommit left from a spec
 *  whose workspace.commit was later turned off kept settled() false, and `serve` ran to --max-min). */
export const commitDue = (co, o) => !!(o.workspace?.pendingCommit && o.workspace.dir && commitOf(specOf(co)));

/** engine.advance's hook (state.mjs make): commit after `stage`; a failure or refusal holds the order (hold) and
 *  keeps the stage in o.workspace.pendingCommit, which the tick commits again after a retry. Never throws: the stage
 *  has already been signed. */
export function afterStage(co, o, stage) {
  if (!commitOf(specOf(co)) || !o.workspace?.dir) return null;
  let r;
  try { r = commit(co, o, stage); } catch (e) { r = { error: `commit: ${e.message}` }; }
  if (r?.error) {
    o.workspace.pendingCommit = { stage };
    if (r.refused) co.log.add({ type: "commit-refused", order: o.id, stage, why: r.error });
    hold(co, o, `commit after ${stage}: ${r.error}`);
  } else if (r) delete o.workspace.pendingCommit;
  return r;
}

// ---- K10: what the launcher needs for one session (launcher/launch.mjs --workdir-from=order, launcher/guard.mjs)
export const SETTING_SOURCES = ["user", "project", "local"];
export const ROLE_LAUNCH_KEYS = ["tools", "sessionMin", "maxTurns", "settingSources"];
/** Why role `r`'s launch fields (plan §3 K10: `tools`, `sessionMin`, `maxTurns`, `settingSources`) are invalid, or null. */
export function validateRoleLaunch(r) {
  if (r.tools != null && !(Array.isArray(r.tools) && r.tools.length && r.tools.every((t) => typeof t === "string" && /^[\w-]+$/.test(t)))) return "tools is a list of tool names";
  if (r.sessionMin != null && !(typeof r.sessionMin === "number" && r.sessionMin > 0)) return "sessionMin is a number of minutes above 0";
  if (r.maxTurns != null && !(Number.isInteger(r.maxTurns) && r.maxTurns > 0)) return "maxTurns is a whole number above 0";
  if (r.settingSources != null && !(Array.isArray(r.settingSources) && r.settingSources.every((s) => SETTING_SOURCES.includes(s)))) return `settingSources is a list of ${SETTING_SOURCES.join(", ")}`;
  return null;
}
/** The protected-paths globs of `repo` as of `ref`: { file, globs }, null (the ref is a commit with no such file), or
 *  { file, error } (the lookup failed: a timeout, a lock, a bad ref, no repo). K10 review: every failure was null, so a
 *  timed-out `git show` read as "no file here" and the launch started with that root missing (fail open); only git's own
 *  "path … does not exist in / exists on disk, but not in" now means no file. `cache` maps repo+ref to the answer (one
 *  git call per base, whatever the number of orders). */
function globsAt(w, repo, ref, cache = new Map()) {
  const file = commitOf(w)?.protectedPaths ?? DEFAULT_PROTECTED, key = `${repo}\0${ref}\0${file}`;
  if (!cache.has(key)) {
    const r = safeGit(repo, ["show", `${ref}:${file}`], { timeout: 5_000 });
    // git says "path … not in '<sha>'" for an unknown sha too, so a missing path counts only once the ref is a commit
    const none = !r.error && !r.signal && /fatal: path '.*' (does not exist in|exists on disk, but not in) '/.test(r.stderr ?? "")
      && ok(safeGit(repo, ["rev-parse", "--verify", "--quiet", `${ref}^{commit}`], { timeout: 5_000 }));
    cache.set(key, ok(r) ? { file, globs: globsOf(r.stdout) } : none ? null
      : { file, error: r.error?.code === "ETIMEDOUT" || r.signal ? `git show ${ref}:${file} timed out in ${repo}` : `git show ${ref}:${file} failed in ${repo}: ${String(r.stderr || r.error?.message || r.status).trim().slice(0, 200)}` });
  }
  return cache.get(key);
}
/** The protected-paths globs for order `o`: { file, globs } as of the order's base commit (as K7 reads them: the
 *  worktree's own copy is the agent's to edit), null (no workspace, or the base has no such file), or { file, error }. */
export function protectedGlobs(co, o, cache) {
  const w = specOf(co);
  if (!w || !o?.workspace?.repo) return null;
  return globsAt(w, o.workspace.repo, o.workspace.baseSha ?? o.workspace.sha, cache);
}
/** One launch's settings: the role's spec fields (null where unset: the launcher keeps its own defaults), the workdirs
 *  of the orders its messages name (the first is its cwd under --workdir-from=order), and the guard's roots. K10 review:
 *  roots came only from the launch's messages, so a task-only launch (a manager's delegate, an ask, a meeting, a
 *  contract: msgs []) had none and could Write tools/company.mjs anywhere, and a builder could write into a sibling
 *  order's worktree. With a spec workspace the roots are now always: every order's worktree (globs as of its base), the
 *  repo (as of the spec base) and the worktree root, `nested` (its first path segment is a worktree: one made after this
 *  launch, or by hand, is covered too). No workspace: no roots (nothing to protect, as before K10). K10 fix review:
 *  `missing` lists [{dir, error}] whose lookup failed (guard.mjs sessionPlan refuses on any), `workspace` says a spec
 *  workspace applies. */
export function launchConfig(co, { role, msgs = [] }) {
  const r = co.org.role(role);
  if (!r) throw new Error(`no role ${role}`);
  const workdirs = [], roots = [], cache = new Map(), w = specOf(co);
  // K10 review: a failed lookup (p.error) is a missing root, reported, and sessionPlan refuses the launch on it
  const missing = [];
  const add = (dir, p, extra = {}) => {
    if (!p || !dir) return;
    if (p.error) { if (!missing.some((x) => x.dir === dir)) missing.push({ dir, error: p.error }); return; }
    if (!roots.some((x) => x.dir === dir && !!x.nested === !!extra.nested)) roots.push({ dir, ...p, ...extra });
  };
  for (const id of msgs) {
    const o = co.engine.orders.get(co.mailbox.msgs.get(id)?.ref);
    if (o?.workdir && !workdirs.includes(o.workdir)) workdirs.push(o.workdir);
  }
  if (w) {
    // this launch's own orders first (their denial names their own base's file), then every other order's
    const mine = new Set(workdirs), orders = [...co.engine.orders.values()].filter((o) => o.workdir && o.workspace?.repo);
    for (const o of [...orders.filter((o) => mine.has(o.workdir)), ...orders.filter((o) => !mine.has(o.workdir))]) { const p = protectedGlobs(co, o, cache); add(o.workdir, p); add(o.workspace.repo, p); }
    const p = globsAt(w, w.repo, w.base ?? "HEAD", cache);
    add(w.repo, p); add(w.root, p, { nested: 1 });
  }
  return { role, ...Object.fromEntries(ROLE_LAUNCH_KEYS.map((k) => [k, r[k] ?? null])), workdir: workdirs[0] ?? null, workdirs, roots, workspace: !!w, missing };
}

// ---- K6: a stage's context-pack rules (lib.mjs packProblem): which workdir files the pack names
/** A pack glob as a regex on a workdir-relative path: `**\/` is any depth (none too), `*` and `?` stay in one segment, a
 *  trailing `/` is the whole folder, and a glob with no `/` matches the file's name anywhere (`build.md`, as .gitignore). */
export const packGlobRe = (g) => {
  const body = g.replace(/\/$/, "/**").replace(/[.+^${}()|[\]\\]/g, "\\$&").replace(/\*\*\//g, "§").replace(/\*\*/g, "¶").replace(/\*/g, "[^/]*").replace(/\?/g, "[^/]").replace(/§/g, "(?:.*/)?").replace(/¶/g, ".*");
  return new RegExp((g.replace(/\/$/, "").includes("/") ? "^" : "^(?:.*/)?") + body + "$");
};
const PACK_SKIP = (n) => n === ".git" || n === "node_modules" || n.startsWith(".next"); // the checkout's machinery, not the artifact
export const PACK_MAX = 400;
/** The files of `dir` a stage's pack rules let in: { files, truncated, include, exclude }, or null with no include or
 *  exclude rules (the pack then names no files: every run before K6). A missing dir is no files. */
export function packFiles(dir, p, vars = {}) {
  if (!p?.include?.length && !p?.exclude?.length) return null;
  // K6 audit: globs take the order's vars (stage 6's pack is artifacts/walkthroughs/${slug}/: as written it matched nothing)
  const include = (p.include ?? []).map((g) => fill(g, vars)), exclude = (p.exclude ?? []).map((g) => fill(g, vars));
  const inc = include.map(packGlobRe), exc = exclude.map(packGlobRe);
  const files = []; let truncated = false;
  const walk = (rel) => {
    let ents; try { ents = fs.readdirSync(path.join(dir, rel), { withFileTypes: true }); } catch { return; }
    for (const e of ents.sort((a, b) => a.name.localeCompare(b.name))) {
      if (truncated) return;
      const r = rel ? `${rel}/${e.name}` : e.name;
      if (e.isDirectory()) { if (!PACK_SKIP(e.name)) walk(r); continue; }
      if ((inc.length && !inc.some((x) => x.test(r))) || exc.some((x) => x.test(r))) continue;
      if (files.length >= PACK_MAX) { truncated = true; return; }
      files.push(r);
    }
  };
  walk("");
  return { files, truncated, include, exclude };
}
