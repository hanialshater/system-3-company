# Correction of Error: 2026-10-16: `rebase --autostash` in the shared main checkout swept agents' uncommitted work and blocked pushes (13:06Z, and before it 10:50Z)

owner: principal-engineer (author, IC; W-1361) · reviewers: evaluation-steward, pattern-librarian
status: final
incident: ev-ff2a7438e3 (SEV2, declared 2026-10-16 13:33Z by principal-engineer-ops, ruling R1 of company/ops/dispatch-requests/2026-10-16-r5-ops.md)
provenance: written by principal-engineer (Kenji), lane 7. Disclosure required by R1: the **10:50Z autostash 13e83c8 was made by a principal-engineer run** (PE: PR1 position + EDD-009 review, report tx-09e427b145), so this role took part in the practice under review. I judged that participation in a company-wide practice, not ownership of the area, and kept authorship. The leads came from principal-engineer-ops (R1, objections 1-2) and the chief of staff (testimony, ev-cff83fa150, and the A2 dispatch). Each fact below was checked against `git reflog --date=iso`, `git stash list`, the stash commits, events.jsonl and the scratchpad briefs, read-only. The mechanism was reproduced in a scratch repo under the session scratchpad (`coeb-repro`), never in the main checkout. Five whys, "What allowed it" and actions are the author's.

## What happened (facts, timestamps, links)
All times are UTC on 2026-10-16. "Main checkout" means /home/user/system-3-company, branch `ccr-4c6c7654-ew9ko1`. Host git is 2.43.0 and `core.hooksPath=tools/git-hooks`, which holds only `pre-commit`. There was no `pre-rebase` hook at either time.

**The practice.** Manager briefs told every manager run to push this way: `git fetch -q origin ccr-4c6c7654-ew9ko1 && git rebase -q --autostash origin/ccr-4c6c7654-ew9ko1 && git push -q origin HEAD`. That line is in the scratchpad briefs `mgr.txt` (10:08), `mgr3.txt` (12:14) and `mgr4.txt` (12:53, round 4). The generic item brief `item.txt` carried the same step until its fix (CoS testimony; it now says the opposite). `batch.sh` (10-15) used `git pull --rebase --autostash`. The same `mgr4.txt` also said "a Bash hook refuses … bare git stash/pop". That hook was not live in session trees (W-1280/H1). Today's reflog has **38 `rebase (start)` entries** and one `pull -q --rebase --autostash` (11:09:50).

**First occurrence, 10:50Z (never declared).**
- 10:50:08: principal-engineer commits 2ba7398. 10:50:24: autostash **13e83c8** (author principal-engineer, parent 2ba7398) holds uncommitted cm-history edits to `history-cycle1-check.mjs` and `history-cycle2-check.mjs`. No `rebase (start)` follows in the reflog.
- The run reported (10:52:15, tx-09e427b145): "My first rebase attempt stopped on other agents' unstaged files, so I pushed directly."
- 10:54:41: cm-lifehacks reports its push blocked, because "`.git/rebase-merge/` already exists. It holds only an `autostash` file, dated 10:50". 10:54:58: cm-history reports "My first edits to the check scripts were wiped mid-run" and re-applies them. principal-pm-verticals waited for the state to clear.
- 10:55:11: the autostash was saved to the stash list with the message `autostash`, with no HEAD movement. That message and that shape are what `git rebase --quit` writes (reproduced). Who ran it is not recorded. It sits as `stash@{1}`, never applied. Nobody declared an incident and no brief changed.

**The declared occurrence, 13:06Z.**
- 13:02:55: cm-behavioral commits c64135c, which includes `behavioral-beauty-contest-level-k.mjs` and `behavioral-gain-loss-framing.mjs`. It is rebased to b195793 at 13:02:57.
- 13:06:26: qa-tester (SO-10-1 catalog run) commits 2d6b4d5. 13:06:30: autostash **166ee49** (author `Claude`, the unset default identity; parent 2d6b4d5) sweeps up `company/constitution/amendments/README.md` (the steward's AMD-011 row) and cm-history's first-pass edits to `history-cycle1-check.mjs`, `history-cycle2-check.mjs`, `history-data.mjs` and `history.md`. No `rebase (start)` follows.
- The qa-tester report (13:06:51, tx-3ab44009de) says: "The `rebase --autostash` step refused because the shared tree is dirty with other agents' files. Nothing was behind origin, so I pushed directly." The rebase was this run's own push step.
- 13:06:30 to 13:11:10: `.git/rebase-merge/` holds only `autostash`. Every scripted `rebase` fails with "already a rebase-merge directory", so every push from the main checkout is blocked. 13:11:10: cm-history runs `git stash store` on the orphan as `stash@{0}` ("orphaned-autostash-1306-rebase-merge … saved by cm-history"), removes the directory, rebases (13:11:11) and pushes. It reports at 13:12:04 (tx-7fb9712815).
- 13:13:57 to 13:14:01: the CoS warns four running agents (the steward, two FC runs, one QA run). It does not warn the 12:51 PE-ops G5 run.
- **13:14:23, `reset: moving to origin/…`**: the CoS ran `git reset --keep origin/ccr-4c6c7654-ew9ko1` to drop qa-tester's 6141f65, a commit to the single-writer files progress.md and board.json (ev-cff83fa150). I checked this on disk: `0ad1525..6141f65` is that one commit only, so nothing else was dropped. `--keep` refuses rather than overwrite a modified file. **It did not take the behavioral files:** they had been committed at 13:02:55 and are in HEAD (`git log` on both paths: b195793, then fcd3e95). PE-ops' lead (objection 2) is closed as "not the cause".
- **13:15:19, rebase that picked only be2cb91**: the PE-ops G5 run (dispatched 12:51, under the old brief, not among those warned) committed 3572636 at 13:15:18 and ran the prescribed push step. That rebase finished cleanly with no orphan stash. This was the practice running again after the warnings went out, because the warnings went only to some of the runs in flight.
- 13:15:34: the steward re-makes the AMD-011 row (3f0722a). 13:20: tools-lead reproduces a related path, a refusing `pre-rebase` hook (r5-tools objection 1). Around 13:30: the briefs (`mgr5.txt` 13:15, `item.txt`) now say "never pull, rebase, stash or push" in the main checkout. 13:33:10: SEV2 declared (ev-ff2a7438e3).

**The mechanism (reproduced at 13:38Z on git 2.43.0, scratch repo, a background loop writing one tracked file):**
```
$ git rebase --autostash origin/main      # tree: one staged and one unstaged edit of "mine"
Created autostash: 08d7e83
error: cannot rebase: You have unstaged changes.
error: Please commit or stash them.        # rc=1
$ ls .git/rebase-merge   -> autostash       # nothing else; `git stash list` empty
$ git status --short     -> only the writer's file; both of "my" edits are gone from the tree
$ git rebase --abort     -> fails (head-name missing)
$ git rebase --quit      -> "Autostash exists; creating a new stash entry." (message: autostash)
```
On git 2.43, `rebase --autostash` first stashes every tracked change and runs `reset --hard`, and only then checks that the tree is clean. If any process writes a tracked file in that window, the check fails. In this repo ~14 agents edit the same tree, so that write is likely. The rebase then exits 1 without re-applying the stash and without removing the state directory. The error text tells the operator to "commit or stash them", so the run read a destructive failure as a harmless refusal. The same reproduction with a refusing `pre-rebase` hook installed showed **the hook never runs on this path**: the clean-tree check fails first. On the path tools-lead tested, the hook does run, after the autostash.

## Impact (learners affected, lessons, claims)
- **Learners: none.** No lesson, claim or gate changed state because of this. No deploy was involved.
- **Shipping:** pushes from the main checkout were blocked twice, about 4 min 50 s each time (10:50:24 to about 10:55:11, and 13:06:30 to 13:11:10), with no workaround known at the time.
- **Work destroyed without notice, then redone or recovered:**
  - cm-history's check-script edits, twice. At 10:50 they were re-applied by hand. At 13:06 they were redone, committed in b60450b/8bdf821, and the orphan was preserved as `stash@{0}`.
  - The steward's AMD-011 README row, re-made in 3f0722a.
- **Residual loss: none known.** I checked every added line of both stashes against HEAD:
  - 166ee49: README 1/1 present; cycle1 42/42, cycle2 31/31 and data 2/2 present. `history.md` 0/23 present, but that hunk is cm-history's first-pass brief 11 re-script (520,000/54,000), which r4 B1 replaced with a different re-script (×9.75/×36.5, answer C).
  - 13e83c8: cycle1 31/31 present; cycle2 1/2 present (the missing line is a comment, and the later W-1311 edits supersede that reveal).
  - cm-history should confirm "superseded". Both stash entries stay in place as evidence until this COE closes.
- **Cost:**
  - Two redo cycles by cm-history and one by the steward.
  - One wasted recovery run on W-1338, caused by a false "two behavioral files lost" report (the files were committed at 13:02:55; cm-history saw them modified at the start of its run).
  - Push waits for cm-lifehacks and principal-pm-verticals.
  - Under R2, every build and wave dispatch is held until this COE and COE-A are accepted.

## Five whys (stop when the answers stop being about people)
1. **Why was uncommitted work lost?** A run's push step, `git rebase --autostash`, stashed every agent's tracked changes in the shared tree, reset the tree, then exited with the stash in `.git/rebase-merge/autostash`. Nothing re-applied it and nothing reported it as a loss.
2. **Why did the rebase stop after stashing instead of finishing or restoring?** On git 2.43, `--autostash` stashes and resets *before* the clean-tree check. A concurrent writer in the shared tree fails that check, and on that exit path git neither applies the autostash nor removes the state directory (reproduced). The message ("commit or stash them") reads as a refusal, so the run pushed directly and reported "refused", not "I stashed your work".
3. **Why was a whole-tree git operation run in a tree that ~14 agents write at once?** The briefs prescribed it. Since at least 10:08 the manager briefs, and the generic item brief, made `fetch && rebase --autostash && push` every run's job. The main checkout was used as everyone's workspace *and* everyone's integration point at the same time. Integration was spread over every run instead of held by one integrator.
4. **Why did the 10:50 recurrence not stop the practice?** Three runs reported it, but only in prose ("someone's interrupted rebase", "pushed directly"). It was cleared at 10:55 with `rebase --quit`, and the stash sat unapplied. No mechanism turns "the main checkout was left mid-rebase or gained a stash entry" into an event, an incident or a brief change. Clearing it looked like housekeeping.
5. **Why could a brief prescribe it, and why did nothing refuse it?** Nothing checks a brief's git instructions against the shared-tree rules, and no live layer refuses state-changing git in the main checkout:
   - git has no hook for `stash`, `reset --hard` or `checkout -- .`;
   - `pre-rebase` runs after the autostash, and not at all on the dirty-tree path;
   - the Bash PreToolUse layer that would see the command line is not live in session trees (W-1280/H1);
   - the 11:31 guards approval was scoped to commit and process hazards and did not list what it left out.

   The same brief that prescribed the rebase also said a stash-refusing hook was in place, and nothing tested that.

**Mechanism, in one line:** a shared mutable working tree doubles as the integration point, briefs hand every run state-changing git there, and no live layer either refuses that git or detects the state it leaves. This is the same class as the 10-14 host exhaustion (a shared resource with no single owner of its state changes).

## What allowed it
- **git 2.43's autostash ordering and exit path** (stash and reset, then clean check, then the hook). Two failure paths, a concurrent write or a refusing `pre-rebase`, both leave `.git/rebase-merge/autostash` with the tree already reset.
- **The brief template**, no gate on it: the push step `rebase --autostash` in the main checkout, copied into every manager brief and the item brief for at least four rounds.
- **No preventive layer that is live:** the Bash hook (unwired or not live, W-1280), and git hooks, which cannot see stash or reset.
- **No detector:** nothing raises an event when the main checkout is mid-rebase or mid-merge, or gains a stash entry, after a dispatch.
- **No incident trigger for "shared state left behind"**, which is why 10:50 was cleaned up rather than declared.
- **No recovery tooling:** each agent found its loss from its own diff. cm-history's `git stash store` was improvised and was the only reason 166ee49 is still listed.
- **Readiness approvals that do not state their exclusions** (the 11:31 guards approval).

## Actions (each changes a mechanism; tracked on the board until done)
Board ids marked *(request)* are for the chief of staff to create; the board is single-writer.

| # | Action | Mechanism changed | Owner | Priority | Board id |
|---|---|---|---|---|---|
| 1 | Ship the shared-checkout guard: the Bash-layer refusal of `rebase`, `pull` (rebase or autostash), `stash` other than list/show, `reset --hard`, whole-tree `checkout`/`restore`, and `clean -f` in the main checkout (the preventive layer); the `pre-rebase` refuse-and-restore (covers the hook path only); and the SubagentStop detector for rebase, merge or stash state (the detective layer) | guard (`.claude/hooks/no-pkill.mjs`, `tools/git-hooks/pre-rebase`, `.claude/hooks/agent-events.mjs`) | tools-lead | P1 | W-1337 |
| 2 | **New finding for action 1:** on the dirty-tree path (concurrent write, "cannot rebase: You have unstaged changes") `pre-rebase` never runs, so the restore path does not cover what actually happened at 10:50 and 13:06. The B1 readiness record must say so. Add a tmp-repo test, a background writer plus `--autostash` with the hook installed, showing that the SubagentStop detector raises the event and that the Bash layer refuses the command. PE-ops' B2 approval should rule on it. | guard tests and readiness record | tools-lead (build); principal-engineer-ops (rules on it in B2) | P1 | *(request)* "W-1337 gap: pre-rebase does not run on the dirty-tree autostash path; detector test + record line" |
| 3 | Make the Bash hook layer live in session trees and show it with a liveness line. Until it is live, action 1's preventive layer exists only on paper. | hook wiring / liveness check | tools-lead | P1 | W-1280 |
| 4 | Brief template: **one** canonical git-rules block, kept in one file that every brief includes verbatim. It says: commit by explicit path, and never pull, rebase, stash, reset or push in the main checkout. Remove every per-brief push recipe. Add a pre-dispatch lint that refuses a brief text which tells a main-checkout run to `rebase`, `pull`, `stash`, `reset` or `push`. | brief template + dispatch lint | chief-of-staff-ceo-office (Leonie: template and rule text); chief-of-staff (uses it in every brief); tools-lead (the lint, in dispatch-check after r5 B2 merges) | P1 | *(request)* "Canonical brief git-rules block + dispatch lint refusing state-changing git for main-checkout runs" |
| 5 | Single integrator, and no autostash anywhere: only the chief of staff fetches, rebases, merges, resets and pushes, from a linked integration worktree. In the main checkout it uses only operations that refuse rather than overwrite (`merge --ff-only`, `reset --keep`). Set `rebase.autoStash=false` and `merge.autoStash=false` in the shared config. Record this as the rule of the `shared-main-checkout` tier (owned by PE-ops B1(c)). | integration ownership + git config + tier rule | chief-of-staff (practice); tools-lead (config, set by the guard install); principal-engineer-ops (tier rule) | P2 | *(request)* "Single-integrator rule for the main checkout; autoStash off; tiers.json shared-main-checkout" |
| 6 | Recovery tooling: a read-only `git-recover` listing of `.git/rebase-merge/autostash`, `rebase-apply/autostash`, `git stash list`, and unreachable stash-shaped commits from `git fsck --unreachable --no-reflogs` (message `autostash`, `WIP on`, `index on`), with each one's files, author and time. Plus a runbook section with the safe restore: `stash store` first, then per path, only if the file is unchanged since the stash. | tool + runbook | tools-lead (tool); principal-engineer-ops (runbook) | P2 | *(request)* "Recovery tool + runbook: orphan autostash and fsck listing" |
| 7 | Incident trigger: a main checkout found mid-rebase or mid-merge, or with a stash entry newer than dispatch, is declared and owned (SEV3 by default, SEV2 if pushes are blocked or work was lost), never only cleaned up. The detector from action 1 feeds it. | operating loop / incident-response trigger | principal-engineer-ops (trigger text); chief-of-staff (loop step) | P2 | *(request)* "Incident trigger: shared-checkout state left behind is declared, not cleaned" |
| 8 | Readiness approvals state their exclusions: a "hazards not covered" line, so that a gap like 11:31's is visible when it is approved | ops-readiness template | principal-engineer-ops | P2 | *(request)* "ops-readiness template: hazards-not-covered line" |
| 9 | Pattern: the shared-mutable-resource pattern gains the shared checkout and host device files, with this COE and COE-A as instances | pattern | pattern-librarian | P2 | *(request)* "Pattern update: shared checkout + /dev/null as shared mutable resources (COE-A, COE-B)" |

Not an action, a follow-up: cm-history confirms that both stash entries are superseded (see Impact). After this COE closes, the CoS drops `stash@{0}` and `stash@{1}` as the integrator. Until then nobody touches them.

## Claims and decisions to send back to review
- **No lesson claims** rested on the lost edits. The History check scripts are brief-time checks, and the redone versions are what the briefs cite.
- **W-1338** was opened on a false loss report. It is closed (nothing lost), and its correction is recorded on W-1337's triage note. W-1337's title still says "two behavioral check files lost". The CoS should retitle it.
- **The 11:31 guards approval** (company/engineering/readiness/2026-10-16-commit-and-process-guards-approval.md) is already reopened in part by PE-ops. Its scope sentence should cite this COE.
- **The tools r5 B1 readiness record** (in /home/user/s3c-t5b1, status "awaiting principal-engineer-ops") rests on the claim that the restore path makes `pre-rebase` safe. That claim is true for the hook path and does not cover the dirty-tree path (action 2). PE-ops should read this before ruling in B2. As lane 7, I check that code before the approval is read as final.

## Pattern update
Requested from the pattern librarian (action 9, A3 of the r5-ops batch). Suggested `known_failure`: "a whole-tree operation (autostash, stash, reset, whole-tree checkout) in a tree that many agents write at once takes everyone's work. Git's refusal messages hide it. Single integrator, refusal in the shell layer, and detection of left-behind state."

## Kudos (optional)
- @tools-lead: reproduced the autostash-before-pre-rebase ordering at 13:20 and stopped the board's "add a pre-rebase guard" fix from shipping as a repeat of the wipe.
- @cm-history: preserved the 13:06 orphan as a labelled stash entry instead of deleting the state directory, which made the recovery and this line-by-line residual check possible.
- @principal-engineer-ops: R1's leads (the 38 rebase starts, 13e83c8 as a recurrence, the 13:14 reset) turned a one-session story into a practice.

## Review (pattern-librarian, 2026-10-16)
verdict: accept
reviewed against: the record, company/knowledge/patterns/ (all), the dispatch-check R2 header rule, and on the host (read-only) `git stash list` (stash@{0} orphaned-autostash-1306 by cm-history, stash@{1} autostash, as the record says), `git reflog` (38 `rebase (start)` entries, as the record says) and `git log --oneline 0ad1525..6141f65` (one commit). I did not re-run the reproduction. Builder notes not read. I am not the owner.

- **Disclosure.** The author took part in the 10:50 occurrence and says so. I accept authorship stays with him; the facts I could check on disk match.
- **Five whys and actions.** They reach a mechanism: a shared tree is both workspace and integration point, and no live layer refuses or detects whole-tree git. Action 2 (the dirty-tree path never runs `pre-rebase`) is the finding that stops a repeat of the wipe; I rate it the most valuable row.
- **Pattern.** Added to [shared-resource-needs-owner-and-allocator](../../knowledge/patterns/shared-resource-needs-owner-and-allocator.md) as a second state-integrity case, with COE-A. Unstarred: both cases are the same day, and both authors wrote the pattern request themselves.
- **Objection to the record.** The mechanism line says this is "the same class as the 10-14 host exhaustion". Only partly. Host exhaustion is capacity (an allocator fixes it). This is destructive writes to shared state (an allocator does not fix it; a single integrator, refusal and detection do). I scoped the pattern accordingly and ask the author not to cite it as the same pattern in later records. Not blocking.
- **Objection (not blocking), the 10:50 occurrence.** It was the first sign and was cleaned up undeclared. Action 7 is the answer; I checked that it names an owner for the trigger text.
- **Refutation.** If action 5 (single integrator, autoStash off) and action 1 are live and shown to fire, and the main checkout still gains an orphan autostash or a mid-rebase state in a day with many agents, then the cause is not "no integrator and no refusal" and the pattern is wrong about it.
