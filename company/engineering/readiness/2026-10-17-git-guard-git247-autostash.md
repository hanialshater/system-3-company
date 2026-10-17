# Operational readiness: git-state detector sees git >= 2.47's stored autostash (W-1337 follow-up; F-47 deploy verify)

```
change: .claude/hooks/agent-events.mjs treats a stash entry named exactly "autostash" (new since the agent's baseline, or any when there is no baseline) as a stranded-autostash incident, because git >= 2.47 stores a failed autostash there and removes rebase-merge/; the C2 guard test and the agent-events tests assert the version's real end state
change-tier: 2
paths: .claude/hooks/agent-events.mjs, tests/dispatch/guards.test.mjs, tests/dispatch/agent-events.test.mjs, company/ops/changelog.md, company/engineering/readiness/2026-10-17-git-guard-git247-autostash.md
author: tools-lead
board: W-1337
risks: none added or closed; R-017's detector regains coverage on git >= 2.47 hosts (CI runs 2.55.0)
links: parent record company/engineering/readiness/2026-10-16-shared-checkout-git-guard.md (approval 2026-10-16-shared-checkout-git-guard-approval.md, C2); branch fix-guard-git255 (worktree /home/user/s3c-g255)
```

Status: **awaiting principal-engineer-ops.** Tier 2 because `.claude/hooks/**` is tier 2 in paths.json. The author does not approve it. It blocks the founder-approved F-47 deploy only through the test; the deploy itself is not touched.

## 0. What git actually does (evidence, 2026-10-17, tools-lead)

The F-47 `npm run verify` on GitHub Actions (git 2.55.0) failed tests/dispatch/guards.test.mjs:531 ("nothing on git stash list" got `['autostash']`). Reproduced with conda-forge git binaries in a scratch prefix (git-2.46.2-pl5321h59d505e_0, git-2.47.0-pl5321h59d505e_0, git-2.55.0-pl5321hc575239_0) and the local 2.43.0, same scenario as the C2 test (staged edit + staged new file + unstaged edit, post-index-change writer dirties theirs.txt inside the window, `git rebase --autostash main`):

| git | message after "cannot rebase: You have unstaged changes" | .git/rebase-merge/ | stash list | tree / index |
|---|---|---|---|---|
| 2.43.0, 2.46.2 | none | holds `autostash` (the only copy) | empty | staged work gone |
| 2.47.0, 2.55.0 | "Applying autostash resulted in conflicts. Your changes are safe in the stash." | removed | `autostash` (reflog message exactly `autostash`) | staged work gone |

The change is in git 2.47.0: RelNotes 2.47.0 line 272, `"git rebase --autostash" failed to resurrect the autostashed changes when the command gets aborted ... (merge bf6ab087d1 pw/rebase-autostash-fix later to maint)` (RelNotes ship in the git package, share/doc/git/RelNotes/2.47.0.adoc). In both versions pre-rebase never runs on this path and the staged work leaves the tree and index; only where git keeps the autostash commit differs.

The old detector read only rebase-merge/ and rebase-apply/, and counted stash entries only against a baseline, as a `note`. On git >= 2.47 the C2 scenario wrote **no** event at all (checked: the new test fails against the old hook under 2.55.0, 0 `hk-gs-` events).

## 1. What can fail

- False incident: someone runs `git stash store -m autostash` by hand. Rare, and it is still an unlisted-work signal; one event per state (id = hash of state).
- An old "autostash" entry with no baseline (a run the hook did not launch, no stash-last.json) is reported once. The main checkout today has `stash@{1}: autostash`; at most one incident for it, then deduplicated by id.
- Event ids for states without an autostash entry are unchanged (the fingerprint only gains a key when such an entry exists).

## 2. How we would know

`hk-gs-` incident in the spool / events log, as before. CI: test:dispatch on 2.55.0 asserts the stored-autostash branch; local 2.43.0 asserts the rebase-merge branch. The test picks the branch by `git version` (>= 2.47), so a git that does neither fails.

## 3. Rollback

`git revert <sha>` of this commit; no data. The C2 test then fails again on git >= 2.47.

## 4. Capacity

None: a filter over the already-read stash reflog. Tests add < 1 s.

## 5. Security / 6. Data

No new routes, secrets or learner data. Writes only the existing spool event.

## 7. Risks

None added or closed. Propose to principal-engineer-ops: R-017 note "detector depends on git's autostash placement; pinned by version-branching test".

## Approval (principal-engineer-ops)

(pending)
