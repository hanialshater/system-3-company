# Readiness approval: lh-content-patch-r2-b4 (Life Hacks content patch r2, section 1)

approved-by: principal-engineer-ops · date: 2026-10-16 · change-tier: 2 · board: W-1179, W-1106, W-755, W-1118, W-1109 (the record's), W-1247 and W-1248 (my W3 conditions, still open)
record approved: `company/engineering/readiness/2026-10-16-lh-content-patch-r2-b4.md` **on branch lhfix-r2 at 90a3abb** (code at 483a52b; not yet on main). The approval lives in this separate file because the branch is not merged and its worktree (/home/user/s3c-lhfix) is read-only to me. When lhfix-r2 merges, the chief of staff copies the Decision line below into that record's "Approval" section and links this file. This file is the authority until then.
related: company/engineering/readiness/2026-10-16-lh-home-w3-addendum-approval.md (conditions 1 and 2 there are W-1247 and W-1248)

## Decision

**Approved, with conditions, for the code and tests of B4 as committed at 483a52b and 90a3abb**, and for any later lhfix-r2 commit that leaves `src/lib`, `src/components`, `tests` and `package.json` unchanged (`git diff 483a52b 90a3abb -- src tests package.json` is empty, so 90a3abb qualifies). **This clears the lhfix-r2 merge.** It does not cover publishing: 42 changed claims are unverified, and any deploy still needs the founder.

Not my area: the author is demo-builder, and the change is lesson specs plus one shared component label. I am the approver.

## What I checked (my own runs, not the record's numbers)

A clean detached worktree of 90a3abb under my scratchpad, node_modules hard-link-copied from /home/user/s3c-lhfix. Nothing in /home/user/s3c-lhfix was edited (its HEAD and status are unchanged). The worktree and its dist dir `.next-opsb4` were removed afterwards; port 4087 is free.

| Claim in the record | Command | Result |
|---|---|---|
| Suite green | `npm run test:lifehacks` | **120/120** |
| Types | `npx tsc --noEmit` | exit 0 |
| Check | `npm run check` | passed: 966 lessons, 5276 claims, 3 warnings (cue-needs-a-boundary, elastic-loop-release, sock-pairing-by-pattern: disputed claims in review, not B4's) |
| Build | `next build` with NEXT_DIST_DIR=.next-opsb4 | exit 0. It rewrote tsconfig.json; reverted from a copy before QA |
| QA contract, production build, the 33 touched lessons | `playwright test tests/qa/contract.spec.ts`, QA_ONLY = the 33 slugs from `git diff --name-only 483a52b~1 483a52b -- src/demos`, QA_PORT=4087, 2 workers, server started and stopped by Playwright | **66/66** (33 × phone/desktop). Harness stamp `clean: true`, contract commit 3b97991, head 90a3abb. This matches the builder's 66 contract passes independently. I did not run feed.spec (see objections) |
| The two engine-2 moves render at every step | My own scratch sweep (engine-v2.ts `homeColumn`, `homeRevealLine`, `homeV2Problems`): every slider step of towel-thickness-hidden-volume (1 to 5 by 0.1) and care-label-first-choice (2 to 6), both modes, every amount and result cell plus the reveal; fails on a raw `{token}`, NaN, Infinity, undefined, "−0" or a trailing-zero decimal | **312 cells, 0 failures**. `homeV2Problems` = [] and `homeSliderMatters` = true for both |
| Answers point at the right option (Home) | Same sweep; my arithmetic | towel: A 20 → B 10 cm² per cm³ at p=1, 10 → 5 at the initial p=2, key "Half as much" (2) is right. care label: hung 0, flat N at every step, key "None" (0) is right. All 28 engine-2 Home specs have `answer` in range for their options |
| Answers point at the right option (Study, Resource) | By hand, from the question text | batch-by-setup A,B,A = 15 + 2×2 = 19, grouped 17, saves 2 (key 0). unlock: 10+2+30 = 42 vs 2+30 = 32 (key 1). do-not-starve: 5+5+25 = 35 > 25, late (key 1). reserve-an-unassigned-slot: 60 + 10 = 70 (key 0). lh-fixed-energy-charge: €0.20×40+€10 = €18, ×20 = €14 (key 2). All right |
| Chip relabel touches one lesson | `grep -c '"kind": "feedback"' studyCatalog.ts`; QA phone overflow check | 1 entry (keep-the-error-feedback). Its phone QA passed, including the contract's no-horizontal-overflow assertion, so the longer labels fit |
| Builders do not mark their own claims verified | Scratch diff of every claim in the 33 metas, 483a52b~1 vs 483a52b | 43 claims changed: 42 now `unverified`. The 43rd, square-bow-stays-tied c3, keeps `verified` (fact-checker, FC52): only its source note changed, correcting stale 20-step arithmetic that FC52 itself flagged; the claim text is unchanged. Acceptable, see objections |
| Merges cleanly | `git merge-tree --write-tree origin/ccr-4c6c7654-ew9ko1 90a3abb` | exit 0, no conflicts |

**Mutations of my own.**
1. care-label-first-choice `answer` set to 2 (it has two options): suite **120/120**, still passes. This is the gap W-1247 (my W3 condition 1) names, and it is still in backlog. B4 adds two Home engine-2 specs, one of them two-option, while that test is missing. Both are in range today, so this does not block B4. It becomes condition 1.
2. towel-thickness revealLine `{resultB}` changed to `{resultC}`: suite **118/120**, fails. The W2 ratchet the builder extended catches a broken reveal on the two moved lessons.
3. towel-thickness `answer` set to 1 (wrong but in range): suite **120/120**. No test ties a key to the engine's outcome. That rests on the builder's run, my arithmetic above and the fact-checker's re-check of the c4-type claims (condition 3). This is a known limit, not a B4 defect.

## Conditions

None of them gates the lhfix-r2 merge. Each one closes before the work it names. I do not write to the board; the chief of staff places or links items.

1. **W-1247 (platform-engineer) stays a precondition for any further Home engine-2 move or wave**, not only W4. B4 used up the slack: there are now 28 engine-2 Home specs and nothing tests their answer range. My next tier-2 approval that adds a Home engine-2 spec will be refused until W-1247 lands and mutation 1 above fails the suite.
2. **care-label-first-choice joins W-1248 (interaction-designer)**. It is a new two-option Home line ("None" / "All 3: dry is dry"). It does not publish until the designer has confirmed or objected to two predict options in design spec §8. Ask the chief of staff to add the slug to W-1248's list.
3. **Before any of the 33 lessons publishes** (fact-checker, then release-manager): re-verify the 42 reset claims (`npm run -s company -- claims --open`). This includes keep-the-error-feedback c3, whose FC52 dispute the chip relabel is meant to answer. This approval says nothing about their truth.
4. **The four rows not applied** (laundry-gap-air-path, the garment-overlap slider, the drying-room singular, the reserve-slot free-gap label) each need an engine or component change in home-models.ts, engine-v2.ts or StudyLesson.tsx. Each needs its own readiness note. None is covered here.

## What would make me revoke it

- `test:lifehacks` failing on main after the merge.
- Any of the 33 lessons failing the QA contract on a production build.
- A reveal or Seen cell on towel-thickness-hidden-volume or care-label-first-choice showing a raw `{token}`, NaN, Infinity, undefined or "−0".
- A later lhfix-r2 commit that touches `src/lib/lifehacks`, `src/components/lifehacks` or `tests/lifehacks` and merges without a readiness note.
- A Home engine-2 spec merging with `answer` out of range before W-1247 closes.

## Objections raised, and what happened to each

- *The record's "2 feed.spec failures are an artifact of QA_ONLY".* Accepted as a property of the harness, as in the W3 approval. My run used contract.spec.ts only. The full feed spec runs in `npm run verify` on the merged tree; that is the merger's step.
- *My own: the builder edited the source note of a fact-checker-verified claim (square-bow-stays-tied c3) without resetting it.* Answered: the claim text did not change, and the edit applies the correction FC52 asked for (old 20-step numbers to the stage's 25 steps). The status is still the fact-checker's. I do not count it as self-verification. Fact-checker may reset it if they disagree.
- *My own: care-label-first-choice's question fixes "Three jumpers" and the option says "All 3", while the slider runs 2 to 6.* That is content, not readiness. The prediction is made at the initial 3, and the reveal reads "N of N" at other counts, which my sweep shows is consistent. Passed to cm-lifehacks as an observation; no condition.
- *The record's "risks: none".* Agreed. No routes, no data, no event shape, and rollback is a revert.
- No other objections are on record for this change.
