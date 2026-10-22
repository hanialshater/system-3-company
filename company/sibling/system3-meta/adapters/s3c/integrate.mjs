#!/usr/bin/env node
// integrate.mjs: merge one order's branch into the run's integration branch, with the generated registry resolved by
// code (plan 2026-10-21-m4-m7-plan.md §M6 exit criterion 5: "the generated registry conflicts are resolved by code
// with no agent edits"; M4-RUN.md open defect 4: "a merge of lesson branches needs `company registry`"). K16 (wave
// integration) is not built: M4 measured QA + build at about 2 min an order (P4.8 held), so each order is merged on its
// own, after ship, by the flow's code stage `merge` (specs/s3c-lessons-m6.json), which the supervisor runs under its
// lock, one order at a time. M6 prep review: that lock is held for ship, this merge and the exports after the tick, past
// 30 s at times; withLock no longer breaks a live holder's lock (state.mjs), so a writer meanwhile waits 10 s and fails
// loudly instead of being overwritten by the tick's save.
//
//   node integrate.mjs --into=<branch> --from=<branch> --from-sha=<sha> --slug=<slug> --repo=<integration worktree>
//        --from-sha: the commit ship signed (the spec passes ${head_sha}, the order's last K7 commit); --slug: the
//        order's lesson (M6 prep review: both required)
//
// What it does, in the integration worktree (--repo, a linked worktree checked out on --into):
//   1. refuses a repo that is the main checkout or any primary checkout (a .git directory; the integration worktree's
//      .git is a file), an --into that is not a meta/* branch, a worktree on another branch, and tracked changes
//      (exit 2 for the first two, 3 for the rest: the environment, not the order). A merge left half done by an
//      earlier attempt at the same --from (MERGE_HEAD is its tip: a timeout, a kill) is aborted first; any other
//      MERGE_HEAD is a stage-error. M6 prep review: changes to the generated registry alone are code's own output
//      from an attempt that died before its commit: they are undone (step 5 regenerates them), and an uncommitted
//      company/ops/founder-inbox.json is inbox-export.mjs's (its next --commit commits it; the merge never touches it);
//   2. M6 prep review: refuses (exit 1, route park) a --from whose tip is not --from-sha (a commit added to the branch
//      after ship signed it, by another session or by hand, would be merged unreviewed: only the signed commit is
//      merged, and a moved branch is the decider's), any commit between --into and it whose message names [deploy]
//      (vercel.json builds [deploy] commits; K7 already refuses them on the order's branch, this is the second look),
//      and an incoming change (merge base to --from-sha) to any path outside the order's own lesson: its
//      src/demos/<d>/<slug>/, company/reviews/<slug>/, its launch record company/rituals/records/<date>-launch-review-
//      <slug>.md, and the generated registry (M6 criterion 5, "no order's commit touches another order's
//      src/demos/<d>/<slug>"; and tools/**, package.json, .husky/**: code from an order's branch would otherwise run
//      at code's privilege in the integration worktree, through the registry run and the repo's hooks below);
//   3. `git merge --no-ff --no-edit -m "meta: merge <from> into <into>" <from>`, with the repo's normal hooks (the
//      kernel's git pins are taken out of the environment: GIT_CONFIG_*, so a hooksPath the kernel set for its own git
//      is not inherited; nothing here sets one). --no-ff: the tip is always this merge, never an order's own commit;
//   4. on a conflict ONLY in src/demos/*.generated.ts (tools/registry.mjs's output; qa-changed.mjs GENERATED), it runs
//      `node tools/company.mjs registry`, stages those files and concludes the merge (`git commit -m <the merge
//      message>`: --no-edit kept git's "# Conflicts:" lines). A conflict in any other path (with step 2, only the
//      order's own lesson files, changed on --into since) aborts the merge (`git merge --abort`) and exits 1 with
//      route park: the decider resumes the order to build (`order resume <O> --to=build`), where its builder brings
//      --into into the order's branch and redoes its own conflicting files, or cancels it (plan §M6 "Risks");
//   5. after every merge, clean ones too, it runs `node tools/company.mjs registry` again and commits the generated
//      files if they changed ("meta: registry regenerated after merging <from>"): M4 showed a clean textual merge of
//      two lesson branches leaving the registry stale (each branch regenerated it without the other's lesson). The
//      registry runs the tree's tools/, which step 2 keeps as --into had them; any path it changes besides the
//      generated files (anywhere in the worktree, M6 prep review: not only under src/demos) is a stage-error.
//   An --from already merged is no merge: only step 5 runs (a retry after a stage-error is safe).
// Never pushes, never writes the main checkout, and never names [deploy] in a commit.
//
// Contract (plan §4): the LAST stdout line is one JSON object {ok, findings[], merged, upToDate, resolved[], registry,
// head}. Exit 0 pass, 1 revise (route park, with the ask the supervisor raises), 2 usage, 3 stage-error.

import fs from "node:fs";
import path from "node:path";
import { spawnSync } from "node:child_process";
import { fileURLToPath } from "node:url";
import { parseArgs, F, SLUG_RE } from "./lib/proc.mjs";

export const MAIN_REPO = "/home/user/system-3-company";
export const GENERATED = /^src\/demos\/[^/]+\.generated\.ts$/; // tools/registry.mjs output (tools/qa-changed.mjs GENERATED)
const DEPLOY = /\[deploy\]/i;
const INTO = /^meta\/[A-Za-z0-9._/-]+$/;
const USAGE = "usage: integrate.mjs --into=<meta/* branch> --from=<branch> --from-sha=<the commit ship signed> --slug=<slug> --repo=<integration worktree>";
const INBOX = "company/ops/founder-inbox.json"; // inbox-export.mjs --commit's file in the integration worktree
const esc = (x) => x.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
/** M6 prep review (criterion 5): the paths an order's branch may change: its own lesson's, and the generated registry. */
export const ownPath = (slug) => { const e = esc(slug); return new RegExp(`^(src/demos/[^/]+/${e}/|company/reviews/${e}/|company/rituals/records/[^/]*-launch-review-${e}\\.md$)`); };

/** The environment for git and the company CLI: no kernel git pins (GIT_CONFIG_*), no inherited repo pointers, and
 *  not a node --test child. */
export function cleanEnv(env = process.env) {
  const e = { ...env };
  for (const k of Object.keys(e)) if (/^GIT_(CONFIG_|CONFIG$|DIR$|WORK_TREE$|INDEX_FILE$|COMMON_DIR$|OBJECT_DIRECTORY$)/.test(k)) delete e[k];
  delete e.NODE_TEST_CONTEXT;
  return e;
}
const run = (cwd, bin, args, timeout = 120_000) => spawnSync(bin, args, { cwd, env: cleanEnv(), encoding: "utf8", timeout, maxBuffer: 64 * 1024 * 1024 });
const g = (repo, ...args) => run(repo, "git", args);
const lines = (r) => String(r.stdout ?? "").split("\n").map((x) => x.trim()).filter(Boolean);
const tail = (r) => `${r.stderr ?? ""}${r.stdout ?? ""}`.trim().split("\n").slice(-4).join(" | ") || `exit ${r.status}`;

export function integrate({ repo, into, from, fromSha: signed, slug }) {
  const findings = [];
  const out = (exit, extra = {}) => ({ exit, out: { ok: exit === 0, stage: "integrate", into, from, repo, findings, ...extra } });
  const envErr = (kind, message, extra) => { findings.push(F.env(kind, message)); return out(3, extra); };
  if (!fs.existsSync(path.join(repo, "tools/company.mjs"))) return envErr("repo", `${repo} is not a System 3 Company checkout (no tools/company.mjs)`);
  const branch = g(repo, "rev-parse", "--abbrev-ref", "HEAD");
  if (branch.status !== 0) return envErr("git", `git rev-parse in ${repo}: ${tail(branch)}`);
  if (lines(branch)[0] !== into) return envErr("branch", `${repo} is on ${lines(branch)[0]}, not ${into}: check out ${into} there (the integration worktree holds that branch only)`);
  const tip = g(repo, "rev-parse", "--verify", "-q", `${from}^{commit}`);
  if (tip.status !== 0) return envErr("from", `no branch or commit ${from} in ${repo}`);
  const fromSha = lines(tip)[0];
  const sig = g(repo, "rev-parse", "--verify", "-q", `${signed}^{commit}`);
  if (sig.status !== 0) return envErr("from-sha", `no commit ${signed} (--from-sha) in ${repo}`);
  // a merge an earlier attempt left half done (a timeout under the supervisor's stage limit, a kill)
  const mh = g(repo, "rev-parse", "-q", "--verify", "MERGE_HEAD");
  if (mh.status === 0) {
    if (lines(mh)[0] !== fromSha) return envErr("merge-in-progress", `${repo} has a merge of ${lines(mh)[0].slice(0, 9)} in progress, not of ${from}: finish or abort it by hand (git merge --abort)`);
    const ab = g(repo, "merge", "--abort");
    if (ab.status !== 0) return envErr("git", `git merge --abort of an earlier attempt: ${tail(ab)}`);
    findings.push(F.advisory("retry", `an earlier merge of ${from} was left half done; it was aborted and is made again`));
  }
  const st = g(repo, "status", "--porcelain", "--untracked-files=no");
  if (st.status !== 0) return envErr("git", `git status in ${repo}: ${tail(st)}`);
  // -z: one NUL-separated entry per path, its two status letters kept (lines() would trim the leading space of " M")
  const entries = (r) => String(r.stdout ?? "").split("\0").filter(Boolean);
  const stz = g(repo, "status", "--porcelain", "-z", "--untracked-files=no");
  const dirty = entries(stz).map((l) => l.slice(3)), regen = dirty.filter((f) => GENERATED.test(f)), rest = dirty.filter((f) => !GENERATED.test(f) && f !== INBOX);
  if (rest.length) return envErr("dirty", `${repo} has uncommitted changes (${lines(st).slice(0, 5).join(", ")}): the integration worktree is code's; commit or undo them by hand`);
  // M6 prep review: an attempt that died after step 5's registry run and before its commit left only code's own output
  if (regen.length) {
    const co = g(repo, "checkout", "--", ...regen);
    if (co.status !== 0) return envErr("git", `git checkout -- ${regen.join(" ")}: ${tail(co)}`);
    findings.push(F.advisory("retry", `the generated registry had uncommitted changes (${regen.join(", ")}): code's output from an earlier attempt, undone and regenerated`));
  }
  if (dirty.includes(INBOX)) findings.push(F.advisory("inbox", `${INBOX} has uncommitted changes: inbox-export.mjs's, left for its next --commit (the merge does not touch it)`));
  const id = g(repo, "config", "user.email").stdout?.trim() ? [] : ["-c", "user.name=System 3 Meta", "-c", "user.email=meta@localhost"];
  const park = (kind, message, text, extra = {}) => { findings.push(F.block(kind, message, "park")); return out(1, { route: "park", park: true, ...extra, ask: { kind: "decision", text } }); };
  // M6 prep review: only the commit ship signed is merged; a branch that moved since is the decider's
  if (lines(sig)[0] !== fromSha) return park("moved", `${from} is at ${fromSha.slice(0, 9)}, not ${lines(sig)[0].slice(0, 9)} (the commit ship signed, --from-sha): a commit was added after ship and was never reviewed; not merged into ${into}`, `${from} moved after ship signed ${lines(sig)[0].slice(0, 9)} (its tip is ${fromSha.slice(0, 9)}). Undo the later commits on the branch and resume the order, or resume it to build (order resume --to=build) so the change is reviewed, or cancel it.`);
  // [deploy] anywhere on the incoming side
  const lg = g(repo, "log", "-z", "--format=%h %B", `HEAD..${fromSha}`);
  if (lg.status !== 0) return envErr("git", `git log HEAD..${from}: ${tail(lg)}`);
  const bad = lg.stdout.split("\0").filter((m) => DEPLOY.test(m)).map((m) => m.split(" ")[0]);
  if (bad.length) return park("deploy", `commit ${bad.join(", ")} on ${from} names [deploy] (a deploy needs the founder's approval): not merged into ${into}`, `${from} carries a [deploy] commit (${bad.join(", ")}); integrate.mjs did not merge it into ${into}. Rewrite or drop the commit on the branch, then resume.`);
  // M6 prep review (criterion 5): the incoming change, from the merge base, stays inside the order's own lesson
  const df = g(repo, "diff", "--name-only", "-z", "--no-renames", `HEAD...${fromSha}`);
  if (df.status !== 0) return envErr("git", `git diff HEAD...${from}: ${tail(df)}`);
  const own = ownPath(slug), foreign = entries(df).filter((f) => !GENERATED.test(f) && !own.test(f));
  if (foreign.length) return park("foreign-path", `${from} changes ${foreign.slice(0, 6).join(", ")}${foreign.length > 6 ? ` and ${foreign.length - 6} more` : ""}: outside its lesson ${slug} (src/demos/<d>/${slug}/, company/reviews/${slug}/, its launch record, the generated registry); not merged into ${into}`, `${from} changes paths outside its own lesson ${slug} (${foreign.slice(0, 6).join(", ")}): another order's lesson, the tools or the repo's setup. No order's commit touches what is not its own (M6 criterion 5): undo those changes on the branch and resume it to build (order resume --to=build), or cancel it.`, { foreign });
  const registry = () => run(repo, process.execPath, ["tools/company.mjs", "registry"], 60_000);
  // M6 prep review: the whole worktree, against what was there before the registry ran (an untracked file left there,
  // the inbox export's uncommitted file), not only src/demos
  const snap = () => g(repo, "status", "--porcelain", "-z", "--untracked-files=all");
  const changedGenerated = (before) => { const s = snap(), was = new Set(entries(before)), fs_ = entries(s).filter((l) => !was.has(l)).map((l) => l.slice(3)); return { r: s, files: fs_.filter((f) => GENERATED.test(f)), other: fs_.filter((f) => !GENERATED.test(f)) }; };
  let merged = false, resolved = [];
  const anc = g(repo, "merge-base", "--is-ancestor", fromSha, "HEAD");
  const upToDate = anc.status === 0;
  if (!upToDate) {
    const msg = `meta: merge ${from} into ${into}`;
    if (DEPLOY.test(msg)) return envErr("message", `the merge message would name [deploy]: ${msg}`);
    const m = g(repo, ...id, "merge", "--no-ff", "--no-edit", "-m", msg, fromSha);
    if (m.status !== 0) {
      const u = g(repo, "diff", "--name-only", "--diff-filter=U");
      const conflicted = lines(u);
      const abort = () => g(repo, "merge", "--abort");
      if (!conflicted.length) { if (g(repo, "rev-parse", "-q", "--verify", "MERGE_HEAD").status === 0) abort(); return envErr("merge", `git merge ${from} failed without a conflict (a hook, an untracked file in the way): ${tail(m)}`); }
      const other = conflicted.filter((f) => !GENERATED.test(f));
      if (other.length) {
        abort();
        findings.push(F.block("conflict", `merging ${from} into ${into} conflicts in ${other.join(", ")}${conflicted.length > other.length ? " (and the generated registry)" : ""}: only the generated registry is resolved by code; the merge was aborted`, "park"));
        return out(1, { route: "park", park: true, conflicts: conflicted, ask: { kind: "decision", text: `${from} does not merge into ${into}: conflicts in ${other.join(", ")} (its own lesson's files, changed on ${into} since; the generated registry is code's). Resume it to build (\`order resume <O> --to=build\`): its builder merges ${into} into the order's branch in its worktree, redoes the conflicting files of its own lesson and regenerates the registry (node tools/company.mjs registry), and every stage after build runs again; or cancel it.` } });
      }
      // only the registry: code regenerates it from every lesson's meta.json now in the tree, and concludes the merge
      const r = registry();
      if (r.status !== 0) { abort(); return envErr("registry", `node tools/company.mjs registry during the merge: ${tail(r)}`); }
      const add = g(repo, "add", "--", ...conflicted);
      if (add.status !== 0) { abort(); return envErr("git", `git add ${conflicted.join(" ")}: ${tail(add)}`); }
      if (lines(g(repo, "diff", "--name-only", "--diff-filter=U")).length) { abort(); return envErr("merge", `conflicts remain after the registry was regenerated`); }
      const c = g(repo, ...id, "commit", "-q", "-m", msg); // M6 prep review: --no-edit kept "# Conflicts:" lines
      if (c.status !== 0) { abort(); return envErr("git", `git commit (concluding the merge): ${tail(c)}`); }
      resolved = conflicted;
    }
    merged = true;
  }
  // a clean merge (or none) can still leave the registry stale: regenerate, commit what changed
  const pre = snap();
  if (pre.status !== 0) return envErr("git", `git status before the registry: ${tail(pre)}`, { merged, upToDate, resolved });
  const r = registry();
  if (r.status !== 0) return envErr("registry", `node tools/company.mjs registry after the merge: ${tail(r)}`, { merged, upToDate, resolved });
  const ch = changedGenerated(pre);
  if (ch.r.status !== 0) return envErr("git", `git status after the registry: ${tail(ch.r)}`, { merged, upToDate, resolved });
  if (ch.other.length) return envErr("registry", `company registry changed files it does not own: ${ch.other.join(", ")}`, { merged, upToDate, resolved });
  let registryState = "up to date";
  if (ch.files.length) {
    const msg = `meta: registry regenerated after merging ${from}`;
    const a = g(repo, "add", "--", ...ch.files), c = a.status === 0 ? g(repo, ...id, "commit", "-q", "-m", msg, "--", ...ch.files) : a;
    if (c.status !== 0) return envErr("git", `committing the regenerated registry: ${tail(c)}`, { merged, upToDate, resolved });
    registryState = "committed";
  }
  const head = lines(g(repo, "rev-parse", "HEAD"))[0] ?? null;
  return out(0, { merged, upToDate, resolved, registry: registryState, head });
}

export function main(argv) {
  const o = parseArgs(argv);
  const usage = (message) => ({ exit: 2, out: { ok: false, stage: "integrate", findings: [F.env("usage", message)], usage: USAGE } });
  for (const k of Object.keys(o)) if (!["into", "from", "from-sha", "slug", "repo", "positional"].includes(k)) return usage(`unknown flag --${k}`);
  if (o.positional.length) return usage(`unexpected argument ${o.positional[0]}`);
  for (const k of ["into", "from", "from-sha", "slug", "repo"]) if (typeof o[k] !== "string" || !o[k]) return usage(`--${k} is required`);
  if (!/^[0-9a-f]{7,64}$/.test(o["from-sha"])) return usage(`--from-sha=${o["from-sha"]} is not a commit sha (the commit ship signed: \${head_sha})`);
  if (!SLUG_RE.test(o.slug)) return usage(`--slug=${o.slug} is not a lesson slug`);
  if (!INTO.test(o.into)) return usage(`--into=${o.into} is not a meta/* branch: integrate.mjs merges into the run's sandbox branch only`);
  if (o.from.startsWith("-") || /\s/.test(o.from)) return usage(`--from=${o.from} is not a branch name`);
  const repo = path.resolve(o.repo);
  let real = repo; try { real = fs.realpathSync(repo); } catch {}
  if (real === MAIN_REPO) return usage(`--repo=${repo} is the main checkout: integrate.mjs merges in the run's integration worktree only`);
  let dotgit = null; try { dotgit = fs.statSync(path.join(repo, ".git")); } catch {}
  if (dotgit?.isDirectory()) return usage(`--repo=${repo} is a primary checkout (its .git is a directory): the integration worktree is a linked one (git worktree add)`);
  if (!dotgit) return { exit: 3, out: { ok: false, stage: "integrate", findings: [F.env("repo", `${repo} is not a git worktree`)] } };
  return integrate({ repo, into: o.into, from: o.from, fromSha: o["from-sha"], slug: o.slug });
}

if (process.argv[1] && path.resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
  let r;
  try { r = main(process.argv.slice(2)); }
  catch (e) { r = { exit: 3, out: { ok: false, stage: "integrate", findings: [F.env("crash", e.stack?.split("\n").slice(0, 3).join(" | ") ?? String(e))] } }; }
  for (const f of r.out.findings ?? []) console.log(`${f.severity} ${f.kind}: ${f.message}`);
  console.log(JSON.stringify(r.out));
  process.exitCode = r.exit;
}
