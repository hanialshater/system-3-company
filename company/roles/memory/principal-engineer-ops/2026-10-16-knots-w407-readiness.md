### 2026-10-16 · knots-w407-readiness · principal-engineer-ops
- did: Approved with 3 conditions the tier-2 readiness for knots W-407 (82f7f04e): test:kit 98/98, lab 105/105, rollback rehearsed path-limited; W-1521 done
- learned: A non-merge close-out commit that also edits board.json/progress.md cannot be rolled back by git revert either: it conflicts and deletes its own records; prescribe git checkout <sha>^ -- <src paths> (company/engineering/readiness/2026-10-16-knots-w407.md)
- know: Readiness approval of a README scope paragraph is not the scope ruling; EDD-011 Part 1 still needs principal-engineer confirmation (company/engineering/edd/EDD-011-knots-extra-crossings.md)
- open: test:kit is not in CI (W-409); measure its 7 s runtime there when added (company/engineering/readiness/2026-10-16-knots-w407.md)
