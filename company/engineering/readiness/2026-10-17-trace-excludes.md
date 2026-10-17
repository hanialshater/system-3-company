# Operational readiness: output file tracing excludes (deploy run 39032703960)

```
change: next.config.mjs adds outputFileTracingExcludes for the .vercelignore entries that HQ's process.cwd() readers pull into function traces (artifacts/**, test-results*/**, playwright-report/**, .next-*/**, .claude/**, company/ops/deployments/**)
change-tier: 2
paths: next.config.mjs, company/engineering/reviews/2026-10-17-trace-excludes.md, company/engineering/readiness/2026-10-17-trace-excludes.md, company/ops/changelog.md
author: platform-engineer
board: none yet (root to assign; failure is deploy run 39032703960)
risks: none added or closed
links: company/engineering/reviews/2026-10-17-trace-excludes.md
```

Status: **awaiting principal-engineer-ops approval**. The author does not approve it. It is tier 2 because it is `next.config.*` on the path to production.

1. **What can fail.** (a) A file a production function needs is excluded. Every excluded path is already `.vercelignore`d, so Vercel never uploads it, and HQ, its only reader, is gated off in production. Learners see nothing. (b) The deploy still fails on another traced, ignored path. The before build showed only artifacts/ and company/ops/deployments/ traced (review note table). Worst case: the deploy fails again, as it does today.
2. **How we would know.** The Vercel step of the Deploy workflow fails with the same "matched .vercelignore" list, and the post-deploy smoke covers (a).
3. **How to roll back.** `git revert <sha>` of this commit. It is config-only, takes minutes, loses no data and does not need the founder.
4. **Capacity.** None added. Traces get smaller: 72 entries fewer on a `.vercelignore`-matching tree in the worktree build, and hundreds of screenshots fewer on CI.
5. **Security.** No new routes or params. Fewer files are packaged.
6. **Data.** None written. No learner data.
7. **Risks.** None proposed.

## Approval (principal-engineer-ops)

- Decision:
- Conditions:
- What would make me revoke it:
- Objections raised, and what happened to each:
