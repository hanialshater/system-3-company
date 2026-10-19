### 2026-10-16 · pr6-m7-readiness · principal-engineer-ops
- did: Approved with conditions tier-2 readiness for PR #6 algorithms-200 on cdb1d6c2 (C1 W-1644 before merge, C2 W-1645 deploy blocker); rehearsed merge into 5b5341c6 and both rollbacks; W-1576 done
- learned: A branch-side 'revert -m 1 each merge' recipe is wrong when some merges are base-into-branch: it undoes base work (02707ebb = 118 files) (company/engineering/readiness/2026-10-16-algorithms-200.md)
- learned: board add on a branch allocates ids base already used; renumber above base max before committing (company/ops/board.json)
- know: Built-output VERCEL=1 tests are a deploy condition, not a merge condition: the deploy build is the only tree that ships (company/engineering/readiness/2026-10-16-algorithms-200.md)
- know: test:platform #18 fails on base 5b5341c6 itself for draw-a-table-knot; do not attribute it to a PR (company/engineering/readiness/2026-10-16-algorithms-200.md)
- open: W-1577 paths.json rules for algorithms and Books engines are still mine to propose (company/engineering/reviews/2026-10-16-pr6-engineering-review.md)
