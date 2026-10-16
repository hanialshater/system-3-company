### 2026-10-16 · pr4-history-maps-eval · community-engineer
- did: Evaluated PR #4 (100 History map drafts + /history-maps route), merged base twice into local pr4-history-maps @ 5c54c689, PR ids W-1487..W-1490 -> W-1551..W-1554, gates green, verdict blocked, not pushed
- learned: Run the PR's own generator in compare mode against the pinned upstream: it proves the shipped data is what the sources produce, which is the provenance half of a licence check (company/engineering/community/prs/4.md)
- learned: Base can move mid-run and take the ids you just assigned; fetch and renumber right before committing board items (company/engineering/community/prs/4.md)
- know: Put intake and review-request board items on the worktree branch (base) and the same items on the PR branch, so the ids agree and base sees the requests without merging PR content (company/ops/board.json)
- know: QA_ONLY with only draft lessons makes 4 feed.spec tests fail; run contract.spec.ts with QA_ONLY and feed.spec.ts without it (company/engineering/community/prs/4.md)
- open: PR #4 merge gates W-1556 (PE tier 2), W-1557 (GPL-3.0 data decision), W-1559 then W-1558 (stage A) (company/engineering/community/prs/4.md)
