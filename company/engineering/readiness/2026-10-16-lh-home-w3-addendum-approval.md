# Readiness approval: lh-home-w3-addendum (Life Hacks Home wave W3)

approved-by: principal-engineer-ops · date: 2026-10-16 · change-tier: 2 · board: W-1070, W-1066 (parent conditions), new items asked for below
record approved: `company/engineering/readiness/2026-10-16-lh-home-w3-addendum.md` **on branch lhw3 at 5d9de52** (not yet on main). The approval lives in this separate file because the record's branch is not merged and its worktree (/home/user/s3c-lhw3) is read-only to me. When lhw3 merges, the chief of staff copies the Decision line below into that record's "Approval" section and links this file. This file is the authority until then.
parents: company/engineering/readiness/2026-10-15-lh-home-template-tp1-tp2.md, company/engineering/readiness/2026-10-15-lh-home-w2-addendum.md

## Decision

**Approved, with conditions, for the code and tests of W3 as committed at 5d9de52**, and for any later lhw3 commit that leaves `src/lib`, `src/components`, `tests` and `package.json` unchanged. 4251146 (FC pass 54, meta.json claims and a fact-check record only) qualifies: `git diff 5d9de52 4251146 -- src/lib src/components tests` is empty. **This clears the lhw3 merge.** It does not cover publishing. 7 W3 claims are disputed and 1 is held (FC pass 54), and any deploy still needs the founder.

**Life Hacks W4** needs its own addendum and approval. I will not approve W4 until condition 1 below is closed, because W4 is where more two-option lines would arrive.

Not my area: the author is demo-builder, and the change is a lesson engine. I am the approver.

## What I checked (my own runs, not the record's numbers)

I used a clean detached worktree of 5d9de52 under my scratchpad, with node_modules hard-link-copied from the lhw3 worktree. Nothing in /home/user/s3c-lhw3 was edited. The worktree and its build dir were removed afterwards.

| Claim in the record | Command | Result |
|---|---|---|
| Suite green with the W3 ratchet | `npm run test:lifehacks` | **120/120** |
| No malformed number at any slider step | My own scratch sweep (not the builder's): all 11 W3 specs, every slider step, both modes, every amount and result cell, plus the reveal line. It fails on a raw `{token}`, NaN, Infinity, undefined or a bare "−0" | **318 cells, 0 failures**. All 11 have `homeV2Problems` = []. `homeSliderMatters` is false only for elastic-loop-release and fitted-sheet-corners-nest, which matches the record's (d). The other 8 v2-stage lessons are true, and cord is on its own stage |
| QA contract on a production build | `next build` (NEXT_DIST_DIR=.next-opsw3), then `playwright test tests/qa/contract.spec.ts` with QA_PORT=3873 and QA_ONLY = the 11 W3 lessons + packing-cube-walls + towel-spread-dries-first. Server started and stopped by Playwright | **26/26**. Harness stamp `clean: true`, contract commit 3b97991, head 5d9de52. This matches the builder's 26/26 independently |
| Types | `npx tsc --noEmit` | exit 0 |
| Check | `npm run check` in the worktree | passed: 960 lessons, 5223 claims, 2 warnings on unrelated lessons |
| Merges cleanly | `git merge-tree --write-tree origin/ccr-4c6c7654-ew9ko1 5d9de52` | exit 0, no conflicts |
| tsconfig.json | `next build` rewrote it in my worktree | reverted from a copy before the next step |

**Mutation of my own (it found a gap).** I set tote-balance-sides `answer` to 2. The spec has two options, so index 2 does not exist. `npm run test:lifehacks` still gave **120/120**. The Home v2 test checks `answer < options.length` for Study specs (engines-v2.test.mjs line 82), but not for Home specs. Before W3 every Home v2 spec had three options, so an answer of 0–2 was always in range. W3 is the first wave where it can go out of range. Every one of today's 26 Home v2 specs is in range (my sweep asserts it), so this does not block W3. It becomes condition 1.

## Conditions

None of them gates the lhw3 merge. Each one closes before the work it names. Where there is no board id yet, the chief of staff places the item. I do not write to the board.

1. **Before any W4 approval** (new item, demo-builder; tests/lifehacks is not protected): add to engines-v2.test.mjs (or home-v2.test.mjs) the Home equivalent of line 82, `answer >= 0 && answer < options.length` for every engine-2 Home spec. Also add W3's slugs to the W2 every-step ratchet in home-v2.test.mjs, so the sweep the builder and I both ran as scratch becomes a standing test. The mutation above must fail the suite afterwards.
2. **Before any two-option W3 lesson publishes, and before W4 adds more** (new item, interaction-designer): confirm or object, in company/design/specs/lifehacks-engines-v2.md §8, to two predict options. The spec still says three. The five two-option lessons are sock-pairing-by-pattern, fitted-sheet-corners-nest, shoes-opposite-ends, tote-balance-sides and socks-use-shoe-space. If the designer objects, the engine change stays, but the lines change.
3. **Before any W3 lesson publishes** (fact-checker, then release-manager): resolve the 7 disputed claims and the 1 held claim from FC pass 54 (company/reviews/lifehacks-200/fact-check-W3-2026-10-16.md on lhw3). This approval says nothing about their truth.
4. **Parent conditions carried, still unreached** (W-1070 and W-1066, demo-builder). No W3 lesson uses `{ratio}`. The one negative cell (tote-balance-sides) uses `sig3`, not `plainNumbers`, and my sweep found no "−0". The first lesson that reaches either needs its own engine change and readiness note, as before.
5. **laundry-sort-before-walk** stays out of W3. Moving it to engine 2 changes the `home.test.mjs` pin (the evaluation-steward re-pin ruling in the quality round-2 batch). It needs its own readiness note, not this one.

## What would make me revoke it

- `test:lifehacks` failing on main after the merge.
- Any of the 11 W3 lessons failing the QA contract on a production build.
- A W3 reveal or Seen cell showing a raw `{token}`, NaN, Infinity, undefined or "−0".
- A later lhw3 commit that touches `src/lib/lifehacks`, `src/components/lifehacks` or `tests/lifehacks` and merges without a readiness note.
- A Home v2 spec merging with `answer` out of range for its options, before condition 1 closes.

## Objections raised, and what happened to each

- *The author's own flag (record, "What changed"): the design spec says three options.* Not answered by me, because it is design. Turned into condition 2, with an owner, so it travels with publishing and W4.
- *The author's offer (record 7): make the sweep a standing test if PE-ops wants it.* Yes. That is condition 1, together with the answer-range test. The owner is demo-builder. tests/lifehacks is not protected, so routing it to evaluation-steward is not needed. Evaluation-steward may review it.
- *My own objection: the record names 8a9df55 as broken by an index mistake.* Answered by scope. I reviewed the tip as a whole, and the approval names 5d9de52 and later code-identical commits, not 8a9df55 alone.
- *My own objection: the record says "QA_ONLY makes feed.spec fail".* Accepted as a property of the harness, not of W3. My run used contract.spec.ts only. The full feed spec runs in `npm run verify` on the merged tree (the merger's step).
- No other objections are on record for this addendum.
