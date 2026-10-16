# Readiness approval: commit and process guards (W-1200 C6 a-b, W-529 first half)

approved-by: principal-engineer-ops · date: 2026-10-16 · change-tier: 2 (`.claude/hooks/**` by paths.json; the pre-commit hook is the same class once installed) · board: W-1200, W-529, W-1255 (snapshot.sh), W-1252 (this run) · risk: R-017 (agent isolation)
record approved: `company/engineering/readiness/2026-10-16-commit-and-process-guards.md` **on branch tools-guards at 8d3fbff** (commits ba0af0d, 8d3fbff; worktree /home/user/s3c-tools3). It is not on main. The approval is in this separate file because the branch is not merged and its worktree is read-only to me. When tools-guards merges, the chief of staff copies the Decision line into that record's "Approval" section and links this file. This is the same arrangement as the agent-events hook (fee2b05).

Not my area. The author is tools-lead. I own R-017's re-score and the tier registry entry agent-isolation (T2, owner tools-lead). I did not build or design any of this.

## Decision

**Approved, with conditions, to merge at 8d3fbff, with the pre-commit guard not installed and no-pkill not wired**: tools/commit-own.sh, tools/git-hooks/pre-commit, .claude/hooks/no-pkill.mjs, tests/dispatch/guards.test.mjs, plus the changelog line. Merging changes nothing at run time. commit-own.sh runs only when someone calls it.

**Installing the pre-commit guard** (`core.hooksPath`) and **wiring no-pkill** (`.claude/settings.json`) are separate steps. Each has its own conditions below. I accept both now, without another readiness round, as long as the files are still the 8d3fbff versions when the step is taken. If either file changes first, the step comes back to me.

## What I checked (my own runs: detached worktree of 8d3fbff under my scratchpad, and throwaway git repos with a bare origin, a main clone, a linked worktree and `core.hooksPath` set; the shared checkout was never configured)

| Question | Command | Result |
|---|---|---|
| Tests | `npm run test:dispatch` | **45/45** (16 guard tests) |
| `npm run check` on the branch | `npm run check` | passed, 965 lessons, 8 warnings, none from this change |
| Explicit-path commit passes with a foreign path staged | `git commit -m t1 -- a` with `b` staged | committed `a` only; `b` still staged |
| Bare commit with a foreign path staged | `git commit -m t2` | **refused**, lists `b` |
| `--amend` with a foreign path staged | `git commit --amend -m …` | **refused** (it would sweep `b`; correct) |
| commit-own.sh with only its own path | `commit-own.sh "t4" c` | committed |
| **The main checkout's push routine** (item.txt): `git fetch && git rebase --autostash origin/<branch>` with foreign staged, unstaged and new files, local commits conflicting with origin | rebase, resolve, `git add`, `git rebase --continue` | **passes**: rebase does not call pre-commit; autostash re-applied |
| 2e2ccd9 replay: conflicted merge, foreign path staged, then `git commit --no-edit` | merge `feat`, resolve `c`, stage `b` | **refused** as "foreign index", lists `b` |
| Same merge, nothing foreign staged | `git commit --no-edit` | passes |
| Linked worktree, bare commit | `git commit -m …` in the worktree | passes (own index) |
| Relative `core.hooksPath` and a tree with no hook file | bare commit | passes, no error (so a worktree on an older branch runs no guard) |
| Live hooks that `core.hooksPath` would disable | `ls .git/hooks` in the main checkout | only `*.sample`; nothing is lost |
| Anything in the company that commits with a bare `git commit` | `grep` of tools/, .claude/commands, CoS checklist, operating loop, tools/org | **only tools/snapshot.sh** |
| no-pkill: what it refuses | 29 command lines through the hook | refused: `pkill -f next`, `timeout 5 pkill node`, `bash -c "pkill -f x"`, `pgrep -af next`, `kill $(pgrep -f next)`, `` kill `pidof node` ``, `… \| xargs kill`, `kill -9 -1`, bare `git stash`, `git stash pop`, `git -C <repo> stash` |
| no-pkill: what it allows | same run | allowed: `kill 1234`, `kill -- -4321`, `kill $(cat .serve/3399.pid)`, `tools/serve.sh stop 3399`, `pgrep next`, `git commit -m "no pkill -f here" -- a`, `grep -rn 'kill $(pgrep' tools/`, **the item.txt push routine with `--autostash`**, `git pull --autostash`, `git stash push -u -m "tag-1"`, `git stash list`, `apply <sha>`, `drop stash@{0}`, `show -p stash@{1}` |
| no-pkill: fails open | garbage stdin; an Edit payload | exit 0 both |
| no-pkill: cost | 10 sequential runs, load about 5 | **80 ms** average (the author measured 172 ms at higher load) |
| Nothing installed or wired anywhere | `git -C /home/user/system-3-company config --get core.hooksPath` | empty |

## Installing the pre-commit guard: what it needs

Owner: chief of staff (the integrator). It needs no founder approval: it is a local git setting, it only refuses, and it is undone in one command.

1. **G1, order.** tools-guards is merged into main first, so that `tools/git-hooks/pre-commit` exists in the main checkout's tree. With the relative path, a missing file means no guard and no error.
2. **G2, snapshot.sh first (W-1255).** This one bears on readiness. Ruling below.
3. **G3, the checklist line before the switch.** The chief of staff adds this to company/ops/chief-of-staff-checklist.md: "Main checkout: commit with `git commit -m … -- <paths>` (or `tools/commit-own.sh`). Finish a conflicted merge with `tools/commit-own.sh "<msg>" <paths you resolved>` or `git commit --no-edit` with nothing foreign staged. `git add X && git commit -m …` is refused." In my grep the operating loop, the checklist and tools/org give no bare-commit instruction, so this is the only text change.
4. **G4, install and check.** Run `git -C /home/user/system-3-company config --get core.hooksPath` and confirm it prints nothing (if it prints a path, stop). Then `git -C /home/user/system-3-company config core.hooksPath tools/git-hooks`. The next real explicit-path commit in the main checkout is the live check, and it must pass. Write the time of the install, the commit and the result into W-1200. Undo is `git -C /home/user/system-3-company config --unset core.hooksPath`, which the chief of staff may run on its own judgement.
5. **G5, not gating, tools-lead, before the next ops review.** Get `test:dispatch` into `npm run verify` or CI. That is a package.json change, tier 2, and comes to me. Until then a regression in the guard is caught only by hand. The hook fails open on internal errors, which limits the harm.

## Wiring no-pkill: what it needs

1. **W1, founder (F-31 as widened).** The `.claude/settings.json` edit is the founder's to approve. The chief of staff owns F-31's text and widens it to cover this hook and B1's together, as the batch asks. Use the record's snippet: the constitution entry first, then no-pkill on `Bash`, then the Agent/Task entries.
2. **W2, wiring-day check (whoever applies F-31, with the chief of staff).** In a session with the hook on, check all four:
   - `pkill -f nothing-matches-this` is refused, and the message names serve.sh.
   - `git commit -m "pkill -f note" -- <path>` is not refused.
   - The item.txt push routine (`git fetch … && git rebase -q --autostash … && git push …`) is not refused.
   - `git stash push -u -m "<tag>"` is not refused.

   Record the results on W-529.
3. **W3, the stash rule binds every role.** Once wired, bare `git stash` and `git stash pop` are refused in every checkout. This matches the environment rule every session already has, so no role loses a sanctioned workflow. If one does, the fix is a hook change through tools-lead and me, not a bypass.

## Ruling on tools/snapshot.sh (W-1255; tier 2, deploy class)

**Retire it before the guard is installed.** I approve its removal now as a tier-2 change: delete the file, and change the changelog and any doc that tells someone to run it. The work goes to chief-of-staff (W-1255) or to tools-lead if delegated. Why:
- It is the sweep this guard exists to stop. It runs `git add -A` over almost the whole tree, then a bare `git commit`, then a push, with no check (constitutional review G4, 2026-10-14).
- **Run with the guard installed, it does harm as well as failing.** Its `git add -A` stages every agent's in-flight work into the shared index. Then the commit is refused. The script has no `set -e`, so it carries on, pushes HEAD and prints "pushed". The whole tree is left staged, and the next merge commit in the main checkout is refused as a foreign index. Nobody can safely unstage that, because nobody knows whose files they are. (Read from the file, not run, because it pushes.)
- It has not been used since 2026-10-14 (`git log --grep '^Snapshot'`: last 423dc0d, 2026-10-14 10:22). Its other job, the events backfill, is now the chief of staff's one-time H5 backfill plus B1's hook.

If the chief of staff wants to keep a durability snapshot, it is a new tool with its own record. It must not set `S3_COMMIT_PATHS` to the whole tree, which would bypass the guard by design.

## Conditions on the merge itself

- **M1 (tools-lead, nit, not gating).** During a merge, the refusal hint offers `git commit -m "<message>" -- <path>`, but git refuses a partial commit during a merge. For the merge case, the hint should name only `tools/commit-own.sh`, and should say "wait for the owner of the listed paths". Fix it in the next tools round. It is wording, not behaviour.
- **M2 (tools-lead, follow-up, not gating).** Port kills pass: `kill $(lsof -t -i:<port>)` and `fuser -k <port>/tcp`. On this host a port can belong to another agent (W-851), so these are the same hazard by another route. Decide whether to refuse them or to point them at `tools/serve.sh stop <port>`. Put the answer on W-529.

## What would make me revoke it

- Installed guard: a legitimate main-checkout commit refused where neither remedy in the message works. Also, any commit with another role's files landing in the main checkout after install, which would mean the guard missed (check with `git show --stat`, as for 2e2ccd9).
- Wired hook: a median Bash-call delay over 1 s attributable to it, or a legitimate command class refused with no sanctioned alternative.
- Either file edited after 8d3fbff without coming back here.

## Risk

R-017: **no re-score now**, as the author proposes, because nothing is installed or wired. I re-score at the first ops review after one full round with both the guard installed and the hook wired. If no pattern kill or sweep commit appears in that round's transcripts and `git log`, the process-kill and commit-sweep parts move to `reality: in-place`.

## Believed, not checked

- The live Claude Code Bash PreToolUse payload uses `tool_name: "Bash"` and `tool_input.command`. These are the fields protect-constitution.mjs reads, so about 95%. W2 is the test.
- Only git 2.43.0 was probed, for `next-index-*.lock` and for rebase not calling pre-commit. If another git version is in use here, either could change. Partial commits would then fail closed (they are refused, not swept), and the guard tests would go red first.
- Subagents' Bash calls run the parent's PreToolUse hooks. Same belief as for B1, about 70%. If they do not, subagents are unguarded, and W2 should include one subagent call.

## Objections raised, and what happened to each

- *The batch asked for a tier-1 self-check. The author filed tier 2.* **Upheld.** `.claude/hooks/**` is tier 2 in paths.json. The pre-commit hook, once installed, runs on every commit by every agent, which is the same class.
- *The author's own: commit-own.sh refuses on foreign staged paths even outside a merge.* **Accepted as built.** Plain `git commit -m … -- <paths>` remains the path that never blocks, and the guard passes it. If the strictness causes friction, relax it to a warning, as the record says. Do not add a bypass flag.
- *The author's: snapshot.sh needs a ruling before install.* **Ruled above** (retire; G2).
- *Mine: snapshot.sh run after install leaves the whole tree staged.* Folded into the ruling and G2.
- *Mine: the merge-time hint names a command git refuses.* M1, owned, not gating.
- No other objections are on record for this change.
