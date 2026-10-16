# Operational readiness: commit and process guards (commit-own.sh, explicit-path pre-commit, no-pkill hook) (W-1200 C6 a-b, W-529 first half)

```
change: tools/commit-own.sh (new) commits only named paths and refuses a foreign staged index; tools/git-hooks/pre-commit (new, NOT installed) refuses main-checkout commits that would include paths their author did not name, including a merge commit over a foreign index; .claude/hooks/no-pkill.mjs (new, NOT wired) refuses pattern kills and untagged/top-of-stack git stash commands
change-tier: 2
paths: tools/commit-own.sh, tools/git-hooks/pre-commit, .claude/hooks/no-pkill.mjs, tests/dispatch/guards.test.mjs, company/ops/changelog.md
author: tools-lead
board: W-1200, W-529
risks: proposes R-017 rescored only after wiring and install (see 7); none added or closed now
links: batch company/ops/dispatch-requests/2026-10-16-r2-tools.md#B3; retro company/rituals/records/2026-10-16-retro-delegation.md (H5, C6, CoS answer to C6); founder inbox F-31; merge 2e2ccd9; branch tools-guards
```

**Why tier 2, not the tier-1 self-check the batch asked for.** `company/engineering/readiness/paths.json` classes
`.claude/hooks/**` as tier 2 ("hooks every agent runs") and its first matching rule wins; B1 hit the same rule.
`tools/commit-own.sh` and `tools/git-hooks/pre-commit` alone are tier 1 by the map, but once `core.hooksPath` is
set the pre-commit hook runs on every commit by every agent, in every worktree, which is the same class as
`.claude/hooks/**`. So the whole record is tier 2 and **not approved**: `approved-by:` is for
principal-engineer-ops to add, never the author. principal-engineer (lane 7) is the named checker in the batch.

**What is inert until whom.** Nothing here runs until someone acts:
- `tools/commit-own.sh`: a script; only runs when called. Safe to merge and use at once.
- `tools/git-hooks/pre-commit`: runs only after `git config core.hooksPath tools/git-hooks` in the shared repo.
  Not run by me. That is the integrator's step (chief of staff) after the principal-engineer check and this approval.
- `.claude/hooks/no-pkill.mjs`: runs only after the `.claude/settings.json` entry below. Founder F-31 (as widened).

## What each piece does

**`tools/commit-own.sh "<msg>" <path> [<path> ...]`**
- Refuses options in place of the message or a path (`-a`, `--all`), so it cannot be turned into a sweep.
- Lists staged paths outside the named paths. During a merge (`MERGE_HEAD`), paths changed on the incoming side
  (`HEAD...MERGE_HEAD`) also count as allowed. If any remain, it refuses, names them, and changes nothing: the
  index is left exactly as it was (the check runs before any `git add`).
- Then `git add -A -- <paths>` (so new files work: `git commit -- <path>` does not take untracked files) and
  `git commit -m <msg> -- <paths>`, or, during a merge (which cannot be a partial commit), `git commit -m <msg>`.
- Exports `S3_COMMIT_PATHS` (the named paths, one per line) so the pre-commit hook checks the same list.
- Decision I took within the role: the batch says "fails if the index holds staged paths outside the list". I kept
  that strict even outside a merge, where `git commit -- <paths>` alone could not sweep anything (git's `--only`
  builds a temporary index). A foreign staged path in the main checkout means someone's work is in flight there;
  the script says so instead of committing past it. The fallback that never blocks is plain
  `git commit -m … -- <paths>`, which the pre-commit hook passes. If this strictness causes friction in practice,
  relax it to a warning outside merges (one `if`), not by adding a bypass flag.

**`tools/git-hooks/pre-commit`** (node). In a linked worktree it passes at once (own index). In the main checkout:
1. A partial commit (`git commit -m … -- <paths>`; detected by git's temporary `next-index-*.lock` index, probed on
   git 2.43.0) passes: it cannot sweep. If `S3_COMMIT_PATHS` is set, it must cover what is staged.
2. With `S3_COMMIT_PATHS` set, every staged path must match it (or be from the merged branch during a merge).
3. A merge commit (`git commit --no-edit` after a conflict, as in 2e2ccd9): every staged path must be changed on
   the incoming side or listed in `S3_COMMIT_PATHS`. Otherwise "foreign index": refused, with the paths listed.
4. Any other commit with staged paths and no `S3_COMMIT_PATHS` (bare `git commit`, `-a`, `-i`): refused.
5. An empty commit passes. An internal error warns on stderr and passes (fails open: a broken guard must not stop
   every commit in the shared repo; `npm run test:dispatch` is what keeps it from being broken).
- Clean merges are already guarded by git itself: probed in a scratch repo, `git merge --no-ff --no-edit` with a
  staged path aborts ("Your local changes … would be overwritten by merge"). The gap is the conflicted merge,
  finished with `git commit`, which this hook covers. So no `pre-merge-commit` hook is shipped.
- `--no-verify` skips it, as it skips any git hook. It is a guard against accidents, not against intent.

**`.claude/hooks/no-pkill.mjs`** (Bash PreToolUse; JSON on stdin; exit 2 + stderr to refuse, as
protect-constitution.mjs does; fails open on bad input). Reads only the command position of each simple command
(quote-aware split on `;` `&&` `||` `|` newlines, `$( … )` and backticks, also inside double quotes, and recursing
into `bash -c` / `sh -c`; env assignments and wrappers such as `sudo`, `timeout`, `env`, `nohup`, `xargs` are
skipped). So `git commit -m "add pkill -f hook"` and `grep "pkill -f" …` pass.
- Refuses: `pkill` in any form (not only `-f`: a name match on a shared host kills other agents' servers),
  `pgrep -f` / `--full` / flag clusters with `f`, `killall <name>`, `kill $(pgrep …)` / `kill $(pidof …)`,
  `… | xargs kill`, `kill -1`. The message names `tools/serve.sh stop <port>` and `kill <pid>`.
- Also refuses, per the caller's note (B2's run did a stray bare `git stash`): bare `git stash`, `git stash -u`,
  `git stash push` without `-m`, `git stash save`, `git stash pop` (any), `git stash apply|drop` with no ref,
  `git stash branch <name>` with no ref, `git stash clear`. Allows `git stash push -u -m "<tag>"`,
  `apply <sha>`, `drop stash@{n}`, `list`, `show`. The stash stack lives in the common git dir, so **every**
  checkout of this repo shares it; the rule applies in all of them, not only the main checkout. A git hook cannot
  do this (git has no stash hook), so it lives in the Bash hook. The file name stays `no-pkill.mjs` because B1's
  merged record and F-31's text already name it.
- Allowed: `kill 1234`, `kill -TERM 1234`, `kill $(cat .serve/<port>.pid)`, `kill -- -<pgid>` (what serve.sh
  does), `pgrep <name>` without `-f`, `tools/serve.sh stop <port>`.

## Install and wiring (NOT done; for the integrator after approval, and for the founder under F-31)

Pre-commit guard, one command in the main checkout (the setting is in the common config, so all worktrees get it):
```
git -C /home/user/system-3-company config core.hooksPath tools/git-hooks
```
Undo: `git -C /home/user/system-3-company config --unset core.hooksPath`. Check before installing:
`git -C /home/user/system-3-company config --get core.hooksPath` should print nothing (if it prints a path,
another hook set is in use; stop and ask). **Before installing**, decide `tools/snapshot.sh` (below).

`.claude/settings.json`, the combined F-31 change (B1's entries, already merged unwired at 39f22c3, plus this one;
keep the constitution entry first). Not applied:
```json
{
  "hooks": {
    "PreToolUse": [
      { "matcher": "Edit|Write|MultiEdit|NotebookEdit|Bash",
        "hooks": [ { "type": "command", "command": "node \"$CLAUDE_PROJECT_DIR/.claude/hooks/protect-constitution.mjs\"" } ] },
      { "matcher": "Bash",
        "hooks": [ { "type": "command", "command": "node \"$CLAUDE_PROJECT_DIR/.claude/hooks/no-pkill.mjs\"", "timeout": 10 } ] },
      { "matcher": "Agent|Task",
        "hooks": [ { "type": "command", "command": "node \"$CLAUDE_PROJECT_DIR/.claude/hooks/agent-events.mjs\"", "timeout": 15 } ] }
    ],
    "PostToolUse": [
      { "matcher": "Agent|Task",
        "hooks": [ { "type": "command", "command": "node \"$CLAUDE_PROJECT_DIR/.claude/hooks/agent-events.mjs\"", "timeout": 15 } ] }
    ],
    "SubagentStop": [
      { "hooks": [ { "type": "command", "command": "node \"$CLAUDE_PROJECT_DIR/.claude/hooks/agent-events.mjs\"", "timeout": 15 } ] }
    ]
  }
}
```
Wiring-day check: in a session with the hook on, `pkill -f nothing-matches-this` is refused with the serve.sh hint,
and `git commit -m "pkill -f note" -- <path>` is not.

## Where this meets B1 and B2

- **B1 (tools-events, merged into main at 39f22c3, unwired):** one F-31 change wires both hooks; the snippet above
  is the union, and B1's record already names `no-pkill.mjs` as the second Bash entry. No shared code. This branch
  was fast-forwarded onto c030715 before the first commit, so the changelog sits above B1's entry and should merge
  without a conflict.
- **B2 (tools-ledger, c73ddb9, unmerged, awaiting lane 10):** no shared files except `company/ops/changelog.md`
  (both add a top entry: a trivial conflict for whoever merges second). B2's slot files in `company/ops/slots/` are
  gitignored there, so the pre-commit guard never sees them. B2's run did a bare `git stash`; the stash rules here
  are the answer to that, once wired. Neither dispatch-check nor the slot ledger reads anything this change writes.
- **`tools/snapshot.sh` (tier 2, deploy class; not mine to change in this item):** it is a whole-tree sweep by design
  (`git add -A <dirs>` then a bare `git commit`). Once the pre-commit guard is installed, snapshot.sh is **refused**
  in the main checkout (rule 4). B1's record shows it fell out of use after the 2026-10-14 COEs. The integrator
  should rule before installing: retire it (my recommendation; it is the sweep this guard exists to stop), or keep
  it as an explicit, logged exception. Not checked by running it (it pushes); read from the file.

## The check

1. **What can fail.** (a) A false refusal blocks a legitimate main-checkout commit: most likely a merge whose
   resolution touched a file the incoming side did not change (e.g. a regenerated file); the message lists it and
   `tools/commit-own.sh "<msg>" <that path>` commits it. (b) The no-pkill parser misses an exotic form
   (`eval "pkill …"`, a script file that calls pkill, `find -exec kill`): it reads command lines, not scripts.
   (c) A false refusal on a quoted string that contains `kill $(pgrep` inside single quotes (one raw regex sees it).
   Worst: the pre-commit hook blocks every commit. It fails open on internal errors and is covered by 10 git tests;
   undo is one `git config --unset`. (Board ask for the CoS: "add test:dispatch to npm run verify", owner
   tools-lead, tier 2 because it edits package.json.) Who sees it: agents only. No learner surface.
2. **How we would know.** Refusals print `pre-commit (tools/git-hooks/pre-commit): refused` or
   `Blocked by .claude/hooks/no-pkill.mjs`. There is no meter for refusals; that is acceptable for a guard whose
   failure mode is loud. Misses are the silent case: the next sweep shows up as a commit with another role's files
   (`git show --stat`), as 2e2ccd9 did. `npm run test:dispatch` holds the 16 tests, but **neither CI (`.github/workflows/ci.yml` runs check, typecheck,
   build, qa) nor `npm run verify` runs test:dispatch**, so a regression is caught only when someone runs it by hand.
   Adding `test:dispatch` to `verify` is a `package.json` change (tier 2) and is proposed, not done (board ask below).
3. **How to roll back.** Pre-commit: `git config --unset core.hooksPath` (seconds, no data loss, no founder needed).
   no-pkill: remove its entry from `.claude/settings.json` (a settings change, so the founder's F-31 path in reverse)
   or, faster, `git revert` the commit that adds the file, after which the entry calls a missing file and errors
   non-blocking. commit-own.sh: stop calling it.
4. **Capacity.** The pre-commit hook runs 3 to 5 `git diff --name-only` calls per commit in the main checkout:
   the full guard test file (16 tests, 10 of them creating temp repos with commits and a merge) takes about 10 s
   wall in total; one partial commit with the hook on in a scratch repo took 233 ms end to end. The no-pkill
   hook spawns one node process per Bash call: **172 ms average** over 10 runs on this host today (mostly node
   start-up), added to every Bash call of every agent once wired, beside the constitution hook's own spawn. If that
   is too much, the fix is to merge both Bash checks into one process, which needs an amendment because
   protect-constitution.mjs is protected. Disk: one test run makes about 19 temp repos in `os.tmpdir()` (~4 MB) and removes
   them when the file ends (checked: 0 `guards-*` dirs left after a run). No CI minutes (CI does not run
   test:dispatch). No deploys.
5. **Security.** No routes, no secrets, no network. The pre-commit hook reads env (`S3_COMMIT_PATHS`,
   `GIT_INDEX_FILE`) and git state; it writes nothing. no-pkill reads stdin and writes stderr only. Neither adds a
   capability: both only refuse.
6. **Data.** Writes nothing, keeps nothing. No learner data.
7. **Risks.** R-017 (agent isolation: wrong worktree, process kills, scratch collisions; owner tools-lead) is the
   entry this answers for process kills, and C6(a) answers the commit sweeps that the retro filed under H5. Proposed
   for principal-engineer-ops: no rescore now, because nothing is wired or installed. Rescore R-017 after one round
   with the hook wired and the pre-commit guard installed, with `reality: in-place` for process kills only if no
   pattern kill appears in that round's transcripts. Commit sweeps have no risk entry of their own; I propose none,
   since the retro tracks them under W-1200.

## Checked on disk (2026-10-16, worktree /home/user/s3c-tools3)

| Claim | Command | Result |
|---|---|---|
| Guard tests pass | `node --test tests/dispatch/guards.test.mjs` | 16/16 |
| Whole dispatch suite passes | `npm run test:dispatch` (after fast-forward to c030715, with B1's tests) | 45/45 |
| git's partial-commit index is `next-index-*.lock`; `-a`/`-i` use `index.lock`; bare uses `.git/index` | probe pre-commit in a scratch repo, git 2.43.0 | as stated |
| A clean `--no-ff` merge with a staged path aborts | scratch repo | `error: Your local changes … would be overwritten by merge`, exit 2 |
| no-pkill cost per Bash call | 10 sequential runs with a `kill 1234` payload | 172 ms average |
| B2's slot files are gitignored | `git diff c030715 tools-ledger -- .gitignore` | `company/ops/slots/*` ignored, README kept |
| Nothing installed or wired here | `git config --get core.hooksPath`; `.claude/settings.json` unchanged | empty; no diff |

## Believed, not checked

- The live Claude Code Bash PreToolUse payload has `tool_name: "Bash"` and `tool_input.command` (same fields
  protect-constitution.mjs reads, so about 95%).
- `next-index-*.lock` naming holds for other git versions in use here (only 2.43.0 probed; if it changed, partial
  commits would be refused under rule 4 rather than swept, i.e. it fails closed for that case, and the test
  "explicit-path commit passes" would go red first).
- Octopus merges (several `MERGE_HEAD` lines) use only the first head for "incoming". Not used in this company.

## Change notes since 8d3fbff (tools-lead, 2026-10-16, W-1260: N1; still NOT wired)

The principal engineer's review (company/engineering/reviews/2026-10-16-agent-hooks-wiring-review.md, 08ee578)
approved no-pkill with change N1. It needs no second review if N1 and its tests are the only diff. Diff:
`git diff 8d3fbff tools-e1n1 -- .claude/hooks/no-pkill.mjs tests/dispatch/guards.test.mjs`. The rest of this
record is unchanged, and the Approval section below is still blank. It needs principal-engineer-ops.

- **Heredoc bodies are data.** After `<<WORD`, `<<-WORD`, `<<'WORD'`, `<<"WORD"` or `<<\WORD`, the lines up to the
  terminator are attached to their command (`.heredoc`) and are not split into commands. With `<<-`, leading tabs are stripped
  from the terminator. `closeParen` skips heredoc bodies too, so a `)` or an apostrophe in a `$(cat <<'EOF' …)`
  commit message cannot end the substitution early. A here-string (`<<<`) is not a heredoc. An unquoted
  delimiter must start with a letter or `_`, so `$((1<<2))` is not read as one.
- **Must-refuse, done rather than accepted as a miss.** When a shell (`sh`/`bash`/…) has no `-c` and no script
  argument, it reads stdin. If that stdin is its own heredoc (`bash <<'X'`) or a piped one (`cat <<EOF | sh`,
  `| bash -s`), the body is checked as commands. Command substitutions in an **unquoted**-delimiter body
  (`<<EOF … $(pkill x)`) are checked, because the shell expands them. A quoted delimiter body is not checked.
- **`kill $(pgrep …)`** moved from a regex over the whole command string to the kill command's own tokens. Substitution
  tokens now keep their text (`$(pgrep x)` and not a placeholder). Without this, a heredoc that only mentions it would still be refused.
- Accepted misses, added to the known list: `cat <<EOF > s.sh` followed by `sh s.sh`, a heredoc fed to `python3 -` or
  `node -`, and a heredoc terminator that shares a line with `)` (`EOF)`). In that last case the rest of the command is read as body,
  so it errs toward passing.
- Tests: guards.test.mjs, 16 → 20. Must-pass: the review's two reproduced inputs, through the hook process (exit 0).
  Must-refuse: `cat <<EOF | sh` with a `pkill` body (exit 2), plus `bash <<'X'`, `| bash -s`, `sh <<-EOF`. Also
  commands after the terminator are refused, an unquoted-body substitution is refused, `$((1<<2))` then `pkill`
  is refused, and the quoted body, the mention of `kill $(pgrep)`, a pipe to a non-shell, and a here-string all pass. Every
  pre-existing case still passes. `npm run test:dispatch` 55/55.

## Approval (tier 2; written by principal-engineer-ops)

- Decision: **approved with conditions to merge at 8d3fbff** (pre-commit guard not installed, no-pkill not wired) by principal-engineer-ops; copied by chief-of-staff at merge 2026-10-16. Authority, install conditions G1-G5 and wiring conditions W1-W3: `company/engineering/readiness/2026-10-16-commit-and-process-guards-approval.md` (90fc0de).
- Decision (N1, 3d4a34d): **approved and accepted for wiring under W1-W3** by principal-engineer-ops, with one added W2 check (a `$(cat <<'EOF' … EOF)` commit message containing a `git stash pop` line must pass). Authority: `company/engineering/readiness/2026-10-16-e1n1-approval.md` (e1c9162).
- Conditions, each with a board id:
- What would make me revoke it:
- Objections raised, and what happened to each:
