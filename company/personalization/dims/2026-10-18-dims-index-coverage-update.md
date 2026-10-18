# Dims index: regenerated after the default-branch merge (update to the 2026-10-17 record)

owner: lesson-dims-owner · run: dims-merge-1018 · date: 2026-10-18 · branch: merge-default (worktree s3c-merge, after merge commit d212efa2)
updates: company/personalization/dims/2026-10-17-dims-index-coverage.md (left as written; this note gives only the numbers that changed)

## Why

The merge brought in about 758 changed lesson files. `src/lib/learner/dims-index.generated.ts` was stale and `npm run test:dims` failed 5 of 6. I reran `node company/personalization/dims/build-index.mjs` with the generator unchanged. All 6 tests now pass, including 5b, which compares the pilot entries with the simulator's catalogue (`company/personalization/model/sim/catalog.mjs`) as it stands in this worktree.

## What changed

- **Lessons:** 954, up from 946. Published 720 (was 711), review 234 (was 235). Drafts in the tree: 329 (was 28), all left out as before.
  - 8 new listed lessons: `draw-a-table-knot`, `left-or-right`, `the-swap-that-goes-in-circles`, `tricolour-check`, `unknot-game` (math), `price-tag-or-auction`, `worth-something-alone` (economics), `same-picture-two-histories` (probability, pilot).
  - 1 status change: `cut-the-busiest-link` went from review to published.
- **Pilot:** 231, up from 230 (probability 78, cs 153).
- **Pilot order vector:** 231 slugs, sha256 `4972b9d9fb9962afb2fc24a3c6d94068be7eb3b7df9816d34a339971a4914cfa`. The new lesson is at position 102 and the review lessons are at positions 154 and 225 to 230 (0-based). Test 4 still holds: the rule equals `feedOrder("all")` with non-pilot lessons removed. The 230-slug sha `04bf48f4…3853` in `company/personalization/policies/default-order-rule.md` and in `company/personalization/eval/harness/c3b/checks3b.mjs` (`ORDER_RULE_PILOT_SHA256`) describes the tree before the merge. The rule did not change. Only the statuses and lessons it runs over did. Those files belong to their owners, and I have not edited them.
- **misconceptionStrength:** still the 12 msr-v1 anchors, on 12 lessons. Level fallbacks: 0.
- **Successors:** many draft lessons came in with the merge. The new `cs:algo-*` concepts now show up as successors on existing cs entries, for example `binary-search` and `bad-hash-one-bucket`. The number of pilot entries with successors in a non-pilot domain is still 19. A successor concept does not have to be taught by a listed lesson. That was already true, and the effect is now larger.
- **Size:** 248,626 bytes raw (was about 240 KB), 43,259 bytes gzip. That is still under the 300 KB raw cap on a client chunk.
- **Diff:** 35 lines added and 27 removed in the index.

## Prerequisite coverage per domain (lessons listed by the feed, 2026-10-18)

Same definitions as §3 of the 2026-10-17 record. The script reproduces the 2026-10-17 table exactly from the pre-merge index.

| domain | lessons | ≥1 prerequisite | ≥1 same-domain prerequisite | same-domain prerequisite taught | ≥1 successor |
|---|---|---|---|---|---|
| ai | 63 | 53 (84%) | 47 (75%) | 47 (75%) | 30 (48%) |
| behavioral | 4 | 4 (100%) | 1 (25%) | 0 (0%) | 3 (75%) |
| big-ideas | 2 | 0 (0%) | 0 (0%) | 0 (0%) | 0 (0%) |
| chemistry | 65 | 49 (75%) | 48 (74%) | 48 (74%) | 41 (63%) |
| **cs (pilot)** | 153 | 131 (86%) | 128 (84%) | 128 (84%) | 68 (44%) |
| economics | 96 | 79 (82%) | 73 (76%) | 73 (76%) | 47 (49%) |
| geography | 60 | 49 (82%) | 48 (80%) | 48 (80%) | 25 (42%) |
| history | 12 | 11 (92%) | 6 (50%) | 4 (33%) | 8 (67%) |
| life | 68 | 53 (78%) | 49 (72%) | 46 (68%) | 28 (41%) |
| lifehacks | 200 | 15 (8%) | 15 (8%) | 15 (8%) | 12 (6%) |
| math | 85 | 55 (65%) | 55 (65%) | 55 (65%) | 27 (32%) |
| physics | 68 | 46 (68%) | 46 (68%) | 46 (68%) | 33 (49%) |
| **probability (pilot)** | 78 | 58 (74%) | 58 (74%) | 58 (74%) | 36 (46%) |
| all | 954 | 603 (63%) | 574 (60%) | 568 (60%) | 358 (38%) |

The conclusions in the 2026-10-17 record have not changed. Life Hacks is still the outlier at 8%.

## Open (routed, not done here)

- personalization-eval and the owner of default-order-rule.md: the pinned 230-slug sha is from before the merge. Decide whether to re-pin it to the 231-slug vector above or keep it as a dated record of the 3b readout.
- The open items in §4 of the 2026-10-17 record still stand: placement (W-1498), freshness in `check`, and the bundle size.
