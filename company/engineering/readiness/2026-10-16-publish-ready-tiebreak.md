# Operational readiness: publish-ready same-version same-day tie-break without mtime

change: tools/publish-ready.mjs decide() orders same-version same-day learner records by built-from git ancestry, then a supersedes line, then the -rN suffix; an unordered tie keeps the most severe verdict. File mtime is no longer read.
change-tier: 1
paths: tools/publish-ready.mjs, tests/publish/publish-ready.test.mjs, tests/publish/publish-ready-tiebreak.test.mjs, company/product/demo-standard.md, company/ops/changelog.md
author: tools-lead
self-check: tools-lead
board: W-1596
risks: none
links: company/rituals/records/2026-10-16-launch-review-ncm-gap4.md (ruling 2, objection 3)

1. **What can fail.** (a) A wrong order lists a lesson whose newest learner verdict is not launch; the
   gates in tools/company.mjs still run on publish, and a deploy still needs the founder. (b) A lesson
   that was a candidate before is now held: two same-day records of different stems with no signal
   between them now fail closed to the more severe verdict, where mtime used to pick one. Measured on
   this tree: the only change in the read-only list is the-swap-that-goes-in-circles moving from
   "held (verdict revise)" to candidate (before/after run of HEAD de35116b vs this change). (c) git
   absent or a SHA unknown (shallow clone, unmerged worktree branch): ancestry abstains and the suffix
   decides, so the answer is the same as with no git.
2. **How we would know.** tests/publish/ (18 tests, incl. a pinned repo case for the swap lesson);
   `node tools/publish-ready.mjs` prints its hold reasons per lesson. No new meter.
3. **Rollback.** `git revert <this commit>`; nothing written to disk by the change, no data.
4. **Capacity.** At most one `git merge-base --is-ancestor` per same-day pair whose records both name
   a SHA, cached per run; measured today: 1 such pair among 53 same-version same-day groups in
   company/reviews. A full read-only list run takes 0.14 s.
5. **Security.** SHAs reach git only as `[0-9a-f]{7,40}` argv entries via execFileSync (no shell).
6. **Data.** Reads review files only; writes nothing new.
7. **Risks.** None added or closed.
