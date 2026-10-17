# Operational readiness: output file tracing excludes (deploy run 39032703960)

```
change: next.config.mjs adds outputFileTracingExcludes for the .vercelignore entries that HQ's process.cwd() readers pull into function traces (artifacts/**, test-results*/**, playwright-report/**, .next-*/**, .claude/**, company/ops/deployments/**)
change-tier: 2
paths: next.config.mjs, company/engineering/reviews/2026-10-17-trace-excludes.md, company/engineering/readiness/2026-10-17-trace-excludes.md, company/ops/changelog.md
author: platform-engineer
board: none yet (root to assign; failure is deploy run 39032703960)
risks: none added or closed
links: company/engineering/reviews/2026-10-17-trace-excludes.md, commit 52db8a0a
approved-by: principal-engineer-ops
approved: 2026-10-17
```

Status: **approved with conditions by principal-engineer-ops, 2026-10-17** (C1-C4 below; C1 depends on the parallel principal-engineer review). The author does not approve it. It is tier 2 because it is `next.config.*` on the path to production.

1. **What can fail.** (a) A file a production function needs is excluded. Every excluded path is already `.vercelignore`d, so Vercel never uploads it, and HQ, its only reader, is gated off in production. Learners see nothing. (b) The deploy still fails on another traced, ignored path. The before build showed only artifacts/ and company/ops/deployments/ traced (review note table). Worst case: the deploy fails again, as it does today.
2. **How we would know.** The Vercel step of the Deploy workflow fails with the same "matched .vercelignore" list, and the post-deploy smoke covers (a).
3. **How to roll back.** `git revert <sha>` of this commit. It is config-only, takes minutes, loses no data and does not need the founder.
4. **Capacity.** None added. Traces get smaller: 72 entries fewer on a `.vercelignore`-matching tree in the worktree build, and hundreds of screenshots fewer on CI.
5. **Security.** No new routes or params. Fewer files are packaged.
6. **Data.** None written. No learner data.
7. **Risks.** None proposed.

## Approval (principal-engineer-ops)

Assessed on branch `ops-ready` from 52db8a0a, against company/rituals/templates/ops-readiness.md. I read the diff, the review note, `.vercelignore`, `tools/deploy.mjs`, `.github/workflows/deploy.yml` and the HQ gate (`src/lib/hq.ts` `hqEnabled`), and ran my own builds rather than relying on the author's tables.

**My evidence (worktree, Next 16.4.0, dummy `artifacts/qa/x/y.png`, `artifacts/walkthroughs/x/sheet.png`, `company/ops/deployments/zz-dummy.json`, dist dirs not `.next-` prefixed):**

| Build | exit | nft files | citing `artifacts/` | citing `company/ops/deployments` | citing test-results / playwright-report / `.claude/` |
|---|---|---|---|---|---|
| parent config (4ffc352b), dist `opscheck-before` | 0 | 29 | 18 | 18 | 0 |
| this change, dist `opscheck-trace` | 0 | 29 | 0 | 0 | 0 |

This matches the author's 18 and 0. The event API trace (`server/app/api/events/route.js.nft.json`) has 248 entries in both builds, so the learner-facing write path is untouched. In the after build no traced path matches any `.vercelignore` rule, `.git` and `.env*` included. The only near-misses are tracked `playwright.config.ts` files and a decision doc, and those are not ignored. Outside HQ, `src/` refers to the excluded paths only in comments. Every HQ API route returns 404 when `NODE_ENV=production` unless `HQ_PUBLIC=1`. Build dirs and dummies are deleted.

Blast radius: production function bundles only, and only by dropping files that `.vercelignore` already keeps off Vercel. Learners cannot see any difference. Agents and HQ in development are unaffected, because `next dev` does not use traces. The CI checkout has a real `.git` directory, which this worktree does not, so `.git/**` tracing on CI is unproven. The review's failure mode (b) covers it, and C3 catches it.

Rollback, as I found it: if the Vercel step or the smoke fails, `tools/deploy.mjs` never reaches `promote` (it stages with `--prod --skip-domain`, smoke-tests `/`, `/catalog`, one published lesson and the unpublished-lesson 404, then promotes). Production stays on r8 with no action and no data loss. If a bad build were promoted, the fix is `npx vercel rollback` plus a COE (company/ops/runbook-deploy.md "Rollback").

**Correction to section 3.** `git revert 52db8a0a` is the wrong recipe. That commit also adds the review, this record, the changelog entry and a mailbox note, so a revert would delete the paper trail, and if it lands through a merge the revert needs `-m 1` (company/engineering/readiness/2026-10-16-books-a11y-b1-b4.md). The source rollback is `git checkout 52db8a0a^ -- next.config.mjs` and a commit. That is minutes, no founder needed, no data lost. Rolling back the source also brings back the deploy failure.

- **Decision:** approved with conditions.
- **Conditions** (no board ids: this slot may not edit board.json, so root assigns them):
  - **C1 (before merge):** the parallel principal-engineer review of this diff finds no blocking issue. Changes to the exclude list alone, such as dropping `.next-*/**` (author's question 1), do not need re-approval if the 18-to-0 grep is re-run and recorded. Any other change to `next.config.mjs` does need re-approval.
  - **C2 (before the deploy run):** release-manager confirms that the founder's r9 approval covers the new release SHA that includes this commit (CLAUDE.md: approval is per deploy). Run 39032703960 deployed 4ffc352b, which is a different commit.
  - **C3 (after the deploy run):** the deployment record in the run's artifact shows the `smoke` and `promote` steps passing. If the Vercel step fails again with a "matched .vercelignore" list, that is a second instance, not a retry. Classify it before running the deploy again.
  - **C4 (follow-up, not blocking):** the review's question 2 (make HQ's `process.cwd()` readers untraceable, so this list does not have to track `.vercelignore` by hand) goes to the principal-engineer as a board item. Until then, any new `.vercelignore` entry must be mirrored here.
- **What would make me revoke it:** a production function returning 5xx or missing a file under an excluded path after promotion; a non-HQ route that reads an excluded path (grep `src/` outside `src/app/**/hq/**` and `src/lib/hq*`); or HQ being turned on in production (`HQ_PUBLIC=1`) while this list stands, because HQ would then 404 its sheets and artifacts.
- **Objections raised, and what happened to each:**
  - The author's rollback line (`git revert <sha>`) would delete the records. Corrected above. The author does not need to act.
  - The `.next-trace-after` row in the review counts the private dist dir's own self-references. The author already flagged it, and my non-`.next-` build confirms the clean comparison. Closed.
  - The smoke does not exercise `/api/events`. The equal 248-entry trace shows this change cannot affect it. This is a gap in the smoke, not in this change; it is release-manager's to weigh. No board item from this slot.
- **Proposed risk (register text; tools/risks.mjs needs a W-id, so root adds it with C4's item):** "Trace excludes must mirror `.vercelignore` by hand. A new ignored path that HQ's `process.cwd()` readers reach fails the production deploy at the Vercel step. Mitigation: C4. Likelihood 2, impact 2 (deploy blocked, production stays on the previous release)." Owner: platform-engineer.
