# Operational readiness: shared-checkout git guard (pre-rebase with autostash restore, main-checkout git rules, git-state events) (W-1337)

```
change: tools/git-hooks/pre-rebase (new) refuses every rebase in the main checkout and first puts back an autostash git already made (stash store + apply --index + remove the state dir); .claude/hooks/no-pkill.mjs refuses rebase, pull with rebase/autostash (or plain pull), stash other than list/show, reset --hard, checkout -f / whole-tree checkout or restore, and clean -f in the main checkout; .claude/hooks/agent-events.mjs writes one event when the main checkout is mid-rebase, mid-merge or gained a stash entry since an agent's dispatch
change-tier: 2
paths: tools/git-hooks/pre-rebase, .claude/hooks/no-pkill.mjs, .claude/hooks/agent-events.mjs, tests/dispatch/guards.test.mjs, tests/dispatch/agent-events.test.mjs, company/ops/changelog.md
author: tools-lead
board: W-1337, W-1338
risks: proposes R-017 rescored only after one round installed (see 7); none added or closed now
links: batch company/ops/dispatch-requests/2026-10-16-r5-tools.md#B1 (objection (1)); approval company/engineering/readiness/2026-10-16-commit-and-process-guards-approval.md ("Either file edited after 8d3fbff without coming back here": this record is that return for no-pkill.mjs); branch tools-r5-b1 (worktree /home/user/s3c-t5b1)
```

Status: **approved with conditions by principal-engineer-ops** (2026-10-16-shared-checkout-git-guard-approval.md, c178da1; C1 and C2 met in 0dd0abc; C3-C6 follow-ups); code check: merge (principal-engineer, 2026-10-16-shared-checkout-git-guard-code-check.md, a9df075). Was: awaiting principal-engineer-ops. Tier 2: `.claude/hooks/**` is tier 2 in paths.json, and the
pre-rebase hook runs on every rebase by every agent in the shared repository. The author does not approve it.
principal-engineer (lane 7) checks the code. **Do not merge before the approval below is written.**

**Install note.** The main checkout's `.git/config` already has `core.hooksPath = tools/git-hooks` (relative, so
each worktree runs its own checkout's copy). **Merging this branch into main therefore installs pre-rebase in the
main checkout at once**: there is no separate install step. No change to `.claude/settings.json` is needed:
no-pkill.mjs (Bash PreToolUse) and agent-events.mjs (SubagentStop, Agent PreToolUse/PostToolUse) are already wired.

## 0. The repro, and why the spec is not "refuse in pre-rebase"

Objection (1) of the batch, re-run by this author on 2026-10-16 at 13:24Z in a scratch repo under the session
scratchpad (git 2.43.0, `core.hooksPath` pointing at a hook that prints the state and exits 1):

```
$ echo staged > b; git add b; echo unstaged > c
$ git rebase --autostash main
Created autostash: 8868374
HOOK: … (inside pre-rebase) rebase-merge/ holds only `autostash`; `git status --short` prints nothing (tree already reset)
fatal: The pre-rebase hook refused to rebase.
$ git status --short          # nothing: both edits are gone from the work tree and the index
$ ls .git/rebase-merge        # autostash   (left behind; `git stash list` is empty; `git rebase --abort` fails)
```

So git 2.43 makes the autostash (`stash create` + hard reset) **before** it runs pre-rebase, and a refusing hook
strands the work in an unlisted commit. That is the mechanism that fits the 13:06 wipe in the main checkout
(`stash@{0}` "orphaned-autostash-1306-rebase-merge", saved later by hand by cm-history). A plain refusing hook,
as W-1337's title asked, would repeat it on every refused rebase.

The hook as built, same scratch repo (13:25Z): refused, `M  b` (staged) and ` M c` (unstaged) back as they were,
`stash@{0}: pre-rebase guard: autostash kept 2026-10-16T13:25:31.029Z`, no `.git/rebase-merge`, `git status` on
the branch with no rebase in progress. `git pull --rebase` with `rebase.autoStash=true`: the same. The
`--apply` backend: the same. In a linked worktree: `Applied autostash. Successfully rebased`.

**Git-version dependency.** This relies on (i) git writing the autostash sha to `rebase-merge/autostash` (or
`rebase-apply/autostash`) before pre-rebase, and (ii) git not touching the work tree after pre-rebase refuses.
Both hold on **git 2.43.0** (the host's). Only 2.43.0 was probed. If a later git runs pre-rebase before the
autostash, the restore branch simply never runs (no autostash file) and the refusal is clean. If a later git
does clean-up after a refused hook (e.g. applies the autostash itself), the hook's apply plus git's could
double-apply; the tests (`W-1337 pre-rebase: …` in tests/dispatch/guards.test.mjs, which assert the exact work
tree, index and one stash entry) go red first. **Re-run `npm run test:dispatch` after any git upgrade on the host.**

**What pre-rebase does not cover (PE-ops C1, added 2026-10-16 after the approval).** The restore path above
covers **only the path on which git runs the hook.** principal-engineer-ops reproduced (approval §0; COE-B a3c1445,
action 2) at least two other exits, and on both of them pre-rebase never runs:
- **Dirty tree during the rebase:** git autostashes (`Created autostash: …`), resets, then fails with
  `error: cannot rebase: You have unstaged changes.` (a writer touched a tracked file in between) **before** the
  hook runs. The edits are gone from the tree and sit only in `rebase-merge/autostash`.
- **Failed reset:** the same, ending `fatal: could not reset --hard`, also after the autostash and also without the hook.
- **`git rebase --no-verify`** skips pre-rebase altogether.

These are the paths that match the 10:50 and 13:06 wipes. On them, **prevention is only the Bash layer**
(`verdict()` in .claude/hooks/no-pkill.mjs refuses `git rebase` with any flags, and the exact 13:06 brief command, in
the main checkout) and **detection is only the SubagentStop detector** (.claude/hooks/agent-events.mjs reads the
state, `rebase-merge/` with an autostash, not the path, so it catches all three). **Both are Claude Code hooks, and
neither is live while H1 (W-1280) is open.** Until H1 is resolved, nothing live prevents, restores or detects the
path that caused both incidents; the only control is the commit-only line in every brief (R3 of the ops batch).
Merging this branch does not change that.

**C2 (PE-ops follow-up, done on this branch in the same commit as C1).** Test `W-1337 C2: dirty tree during
\`rebase --autostash\` …` in tests/dispatch/guards.test.mjs. The background writer is made deterministic rather
than raced: a `post-index-change` hook in the test's own hooks dir (with a copy of pre-rebase) appends to a tracked
file once, only while `rebase-merge/autostash` exists. git then reaches `cannot rebase: You have unstaged changes`
on every run (passed 3 of 3 runs in a row). The test asserts that pre-rebase printed nothing, the work is off the
tree, the index and `git stash list` and held only in `rebase-merge/autostash`, (i) the SubagentStop handler pointed
at that repo writes exactly one `incident` naming the autostash, and (ii) `verdict()` refuses the command, the
13:06 brief command and `--no-verify` with that repo as the main checkout. **Investigation (report only, nothing
built):** `post-index-change` does fire on this path, after the autostash reset and before git's clean-tree check,
with `rebase-merge/autostash` already on disk. So a git hook *can* see the stranding moment, unlike pre-rebase.
Building a restore on it would need a new readiness record. Open questions: it fires on every index write
(cheap gating needed), and git has not yet failed when it fires, so a restore there would itself dirty the tree
and *cause* the failure.

## 1. What can fail

- **The restore applies onto a changed tree.** It cannot here: after git's hard reset the tree equals HEAD, and
  the autostash was made from HEAD, so `stash apply --index` has nothing to conflict with. Untracked files are not
  in a rebase autostash (git leaves them in place). If `--index` fails anyway, it falls back to a plain apply (all
  edits back, previously staged ones unstaged, said so in the message); if that fails too, it says the work is
  NOT re-applied and names the kept stash ref and sha. In every case the stash entry is stored **first**, so the
  work is on `git stash list` before anything else is tried.
- **A legitimate rebase in the main checkout is refused.** By design: nobody rebases the shared checkout; the
  integrator works in /home/user/s3c-int. The message names that. This is the class the existing revoke clause
  watches ("a legitimate command class refused with no sanctioned alternative"): the alternative is named.
- **no-pkill.mjs misjudges the checkout.** It reads the payload `cwd`, then `cd`/`pushd` in the command, then
  `git -C` and `--git-dir`. Not modelled: `GIT_DIR=` / `GIT_WORK_TREE=` env prefixes, `cd` inside a subshell
  (treated as if it persisted), `cd "$VAR"` (unknown: falls back to "not judged", i.e. passes). It fails open,
  like the rest of the hook. pre-rebase is the backstop for rebase whatever the Bash hook decides.
- **A false refusal of plain `git pull` in the main checkout.** Chosen on purpose (decided within role; the batch
  listed only `--rebase`/`-r`/`--autostash`): a plain `git pull` rebases when `pull.rebase` is set in any config,
  so in the main checkout only `git pull --ff-only` (or `--no-rebase`) passes, and the message says so.
- **agent-events writes noise.** A MERGE_HEAD while the chief of staff is mid-merge in the main checkout when a
  subagent stops gives one `note` (not an incident). The event id is a hash of the state, so one state is written
  once, however many agents stop while it lasts.
- **The rebase exits before pre-rebase runs** (dirty tree during the rebase, failed reset, or `--no-verify`; see
  the C1 paragraph at the end of §0). The work is stranded in `rebase-merge/autostash` and the hook cannot help.
  Only the Bash layer (prevention) and the SubagentStop detector (detection) cover it, and both are inert until H1.
- **Worst case:** the pre-rebase hook throws before the apply. It still refuses, and prints the autostash sha and
  the `git stash store` line to keep it. The work is no worse off than without the hook, and the sha is on screen.

## 2. How we would know

- `npm run test:dispatch` (in `npm run verify`): 7 new cases in tests/dispatch/guards.test.mjs (pre-rebase
  refusal with staged + unstaged + staged-new edits restored and one listed stash; linked worktree proceeds;
  `pull --rebase` + `rebase.autoStash=true`; clean-tree refusal adds no stash; each (b) form refused in a real tmp
  main checkout, from a subdir, after `cd`, by `-C` and by `--git-dir`; each pass form passes, everything passes in
  a linked worktree and in another repo; the hook process exits 2 on a payload `cwd` in main) and 3 in
  tests/dispatch/agent-events.test.mjs (SubagentStop with `rebase-merge/` writes one `incident` naming the agent
  label and autostash, not repeated at the next stop; a stash entry gained since dispatch is one `note`, the older
  entry not counted, a clean main checkout writes nothing; MERGE_HEAD alone is a `note`; an unreadable `.git` still
  exits 0 and the report is still written). Every git command runs in a tmp repo; the agent-events helper points
  `S3_MAIN_CHECKOUT` at a sandbox, and the guards helper points `S3_GUARD_MAIN` at a non-checkout, so no test reads
  or runs git in /home/user/system-3-company.
- In operation: an `incident` event in room `incident` (HQ incident room, `node tools/events.mjs tail`) after
  fold, whenever a stopped agent leaves the main checkout mid-rebase. `incident` events count toward the retro
  trigger in company/rituals/triggers.json ("or any incident"); that is intended for a stuck rebase in the shared
  checkout. Stash gains and MERGE_HEAD are `note`s so a routine merge cannot trigger a retro.
- **Liveness caveat (H1, W-1280):** (b) and (c) only act if the Claude Code hooks actually run in the session
  tree. The batch reports they did not at 13:25Z in the CoS session tree. **(a) does not depend on that:** it is
  a git hook, live in every checkout of this repository as soon as it is merged. But (a) covers only the hook
  path; the dirty-tree, failed-reset and `--no-verify` paths (§0, C1 paragraph) rest on (b) and (c) alone.

## 3. How to roll back

`git revert <merge sha>` in a worktree, merged like any change; or for pre-rebase alone, delete
`tools/git-hooks/pre-rebase` (git skips a missing hook). No data is lost: the hook only adds stash entries and
spool events. Any `pre-rebase guard: autostash kept …` stash entries stay listed until someone who owns them drops
them by sha. Rollback does not need the founder.

## 4. Capacity

- pre-rebase: one node process per refused rebase (~0.14 s measured in the scratch repo, refusal + restore).
  Linked worktrees: two `git rev-parse` calls, then exit 0.
- no-pkill.mjs: no git process; per git command in the main checkout at most a few `stat` calls walking up to
  `.git`. No measurable change to the Bash-call delay the revoke clause watches (< 1 s median).
- agent-events.mjs: at each dispatch, a read of `.git/logs/refs/stash` and two small files in `.serve/agent-events/`;
  at each stop, a few `stat`s and file reads. No git process.
- Tests: +10 cases. guards.test.mjs 31/31 in 9.8 s at load 4.5 (6.3 s before these cases); agent-events.test.mjs
  18/18 in 15 s. Under contention the guards file has taken 97 s wall (4 s CPU); that is host load, but it feeds
  G5-d (test:dispatch under 60 s, B3).

## 5. Security

No new route, secret, permission or network call. The hooks read files in the repository's own `.git` and write
only to the stash (pre-rebase), the spool and `.serve/agent-events/`. Nothing a stranger can reach.

## 6. Data

No learner data. Events name an agent label, role, branch name, shas and stash messages from the main checkout.
They go to the spool (`company/ops/events-spool/`, gitignored) and reach `company/ops/events.jsonl` only through
the chief of staff's fold.

## 7. Risks

R-017 (agent isolation; owner tools-lead): **no re-score proposed now.** Proposed for the first ops review after
one full round with pre-rebase merged: if no main-checkout rebase, autostash orphan or lost edit appears in that
round (`ls /home/user/system-3-company/.git/rebase-*`, no `hk-gs-` incident in the log, no stash entry without an
owner tag), the shared-checkout part moves to `reality: in-place`. A new risk is not proposed: this is R-017's
scope.

## The permanent brief sentence (for the chief of staff and Leonie, for the brief template)

> **The main checkout (/home/user/system-3-company) is shared: there you only read, run `git pull --ff-only`, and
> commit your own paths by name (`tools/commit-own.sh "<msg>" <paths>` or `git commit -m "<msg>" -- <paths>`).
> Never rebase, pull with rebase, stash, `reset --hard`, `checkout`/`restore` the whole tree or `clean -f` there:
> do that in your own worktree (e.g. /home/user/s3c-int). If a guard refuses you, do not work around it; report it.**

It replaces the interim line "do NOT pull, rebase, stash or push in the main checkout; integrate in
/home/user/s3c-int" once this is merged. Pushing is not covered by these guards and stays a brief rule.

## Recovery note for W-1338 (cm-behavioral), read from disk, not run

The main checkout's stash reflog (read as a file at 13:2xZ, no git run) holds two entries:
`166ee49…` "orphaned-autostash-1306-rebase-merge (…saved by cm-history)" and `13e83c8…` "autostash". The batch's
ask stands: before redoing the two files, `git stash show -p 13e83c8` and `git stash show -p 166ee49` (read-only).

## Objections raised, and what happened to each

- *Batch objection (1), the POC's own: a refusing pre-rebase hook on its own repeats the 13:06 wipe.*
  **Upheld and built.** Reproduced again above; the hook stores, re-applies and clears the autostash before it
  refuses. Recorded here, as the batch asked.
- *The author's: should plain `git pull` (no flags) pass in the main checkout?* The batch named only rebase and
  autostash forms. **Refused in main**, because repository or user config can make plain pull rebase. Named
  alternative `git pull --ff-only`. If principal-engineer-ops thinks this is over-reach, the change is one line in
  `mainGitRule` (and one test entry).
- *The author's: `git rebase --abort` / `--continue` in main are refused too ("any flags").* The refusal says not
  to abort a stuck rebase oneself but to report it with the autostash sha, because `--abort` on a stranded
  autostash state fails and can confuse the recovery.
- *The author's: the event type.* The batch said `incident-note` "or whatever type the events allow-list
  permits". company/ops/events.md lists `incident` and `note`; there is no `incident-note`, so none was invented:
  `incident` for a stuck rebase, `note` (room `incident`) for MERGE_HEAD or stash gains.

## Approval (tier 2; written by principal-engineer-ops)

- Decision: (awaiting principal-engineer-ops)
