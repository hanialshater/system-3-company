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

Status: **approved with conditions by principal-engineer-ops, 2026-10-17** (see Approval). Tier 2 because `.claude/hooks/**` is tier 2 in paths.json. The author does not approve it. It blocks the founder-approved F-47 deploy only through the test; the deploy itself is not touched.

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

### 2026-10-17 principal-engineer-ops verdict: APPROVED WITH CONDITIONS (on c08e3162)

Not my area: the change is tools-lead's (`.claude/hooks/**`, tests/dispatch); I approve readiness only. The deploy approval for F-47 stays the founder's.

What I checked, myself:
- The diff (5 files, c08e3162 vs 0e5146c6). `autostashed` = stash entries whose reflog message is exactly `autostash` and that are new (not in the baseline, or any entry when there is no baseline); they count as `rebasing`, so they write an `incident`. `gained` now leaves those entries out, so each is listed once. The fingerprint only gains the `a` key when such an entry exists, so ids for every other state are unchanged.
- `npm run test:dispatch` in /home/user/s3c-g255 (node_modules hard-linked from the main checkout, removed afterwards): local git 2.43.0 gave 117 tests, 114 pass, 0 fail, 3 skipped. With the 2.55.0 wrapper first on PATH: 117 tests, 114 pass, 0 fail, 3 skipped. The 3 skips are the S3_SLOW_TESTS ones (#30 F5, #95 and #117 G5-d) and they are the same on both.
- A negative control in a throwaway detached worktree at c08e3162 with the old hook (0e5146c6) restored, running guards and agent-events tests. On 2.43 the new agent-events test (#18) fails. On 2.55, #18 and C2 (#51) both fail. So the new tests catch the defect, and on git >= 2.47 the old hook really wrote no event. Worktree removed.

No existing guarantee is weakened:
- C2 on git <= 2.46 still asserts an empty stash list and reads rebase-merge/autostash. On >= 2.47 it asserts that rebase-merge/ is gone and the stash list is exactly `["autostash"]`. On both versions it now also asserts that the autostash commit holds the staged edits (index parent) and the unstaged edit (tree), which is stronger than before. A git that does neither fails: the else branch reads a file that would be missing. The pre-rebase-skipped assertion and verdict() refusal (ii) are unchanged.
- The edited "gained since dispatch" test changes its fixture from `autostash` to `On main: wip`, so the `note` path is still covered by an ordinary entry. An `autostash` entry, which used to be a `note`, is now an `incident`. That is stricter, not weaker. An `autostash` entry that is already in the baseline still writes nothing (new test, sb3).
- Version parse: `git version` gives "2.55.0" and also parses Apple's "2.39.3 (Apple Git-145)".

Side effect (checked on the host, read-only): main's `stash@{1}: autostash` is 13e83c83f065, the 10:55:11 `rebase --quit` stranding already covered by COE-B (company/rituals/records/2026-10-16-coe-shared-checkout-autostash.md, Impact and line 97 follow-up). Main has no `.serve/agent-events/` today, so the first SubagentStop of a run the hook did not launch has no baseline and will write one `incident` for it. After the first PreToolUse, stash-last.json includes 13e83c8 and it stops firing. Deduplication is by id against the spool only (tools/events.mjs `--spool`). A no-baseline stop after a fold can re-spool the same id, and the fold dedupes it against the log, so the log holds it once. This is how every persistent hk-gs state already behaves. The detector also catches the `rebase --quit` shape on 2.43, which is a gain.

Conditions:
1. (chief-of-staff) Triage the one-time hk-gs incident for 13e83c8 as a known duplicate of COE-B: no new SEV and no new COE. Do not drop or pop the entry in response to the event. The COE-B line 97 follow-up (drop after COE-B closes, as integrator) stands unchanged.
2. (integrator) Rollback: if this lands as a merge, `git revert <sha>` is wrong (it needs -m 1 and also deletes this record). Use `git checkout c08e3162^ -- .claude/hooks/agent-events.mjs tests/dispatch/guards.test.mjs tests/dispatch/agent-events.test.mjs` and commit. Know that a rollback brings back the C2 failure on CI's git 2.55.0, which blocks any deploy verify, F-47 included. So a rollback is not free: it trades the detector's false positive for a red verify.
3. (principal-engineer-ops, next ops review) Add to R-017 the note "detector depends on git's autostash placement (rebase-merge/ on <= 2.46, stash list `autostash` on >= 2.47); pinned by the version-branching C2 test". It is not written here because this slot does not touch the risk register.

Not checked: the S3_SLOW_TESTS set, `npm run verify` (build and computer-use QA), and git 2.46.2 or 2.47.0 through the suite. Those two versions are covered only by the author's repro (section 0). None of these blocks this verdict: the change is in the hook and the tests, not in what ships.
