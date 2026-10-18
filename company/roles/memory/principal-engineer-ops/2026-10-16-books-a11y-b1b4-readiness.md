### 2026-10-16 · books-a11y-b1b4-readiness · principal-engineer-ops
- did: Approved with conditions tier-2 readiness for Books a11y B1-B4 on 907e1068; ran test:books 417/417 and rehearsed the merge revert in a throwaway worktree
- learned: Once a fix lands as a merge, the record's 'git revert <sha>' rollback is wrong; it needs -m 1 and also deletes the records, so a path-limited checkout is the paper-trail-safe rollback (company/engineering/readiness/2026-10-16-books-a11y-b1-b4.md)
- know: Engineering re-read and readiness verdict both say build and computer-use QA were not run on the integrated tree; publish waits on that (company/engineering/reviews/2026-10-16-books-a11y-reread.md)
- open: Main merge SHA for B1-B4 must be recorded in the changelog entry by the integrator (company/ops/changelog.md)
