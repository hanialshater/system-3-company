# Operational readiness: deploy upload diagnostics and HQ trace scoping (deploy run 39042065255)

```
change: tools/deploy.mjs prints a failed command's stdout as well as stderr (token-redacted, live log only); HQ readers get turbopackIgnore so HQ functions stop tracing the whole repo
change-tier: 2
paths: tools/deploy.mjs, tests/deploy/deploy.test.mjs, src/lib/hq.ts, src/lib/hq-library.ts, src/lib/hq-whiteboard-server.ts, company/engineering/reviews/2026-10-17-deploy-upload-failure.md, company/engineering/readiness/2026-10-17-deploy-upload-failure.md, company/ops/changelog.md
author: platform-engineer
board: none yet (root to assign; failure is deploy run 39042065255)
risks: none added or closed (proposal below)
links: company/engineering/reviews/2026-10-17-deploy-upload-failure.md
```

Status: **awaiting principal-engineer-ops approval and a principal-engineer diff read.** The author does not approve this record. It is tier 2 because it touches deploy tooling, and because it changes the trace of 18 server functions, including `src/app/api/**` routes, although only HQ ones.

1. **What can fail.** (a) A production function that needs a repo file stops getting it. All 9 non-HQ function traces are byte-identical before and after (review note, After table), and every HQ route returns 404 or notFound() in production (`src/lib/hq.ts:222`). Learners see nothing. (b) If HQ is ever enabled on Vercel with `HQ_PUBLIC=1`, library, whiteboard and founder-queue reads find no company/ files. (c) A new diagnostic line prints a secret other than VERCEL_TOKEN that Vercel echoes on stdout. Vercel's deploy JSON carries deployment ids and URLs, not credentials, and the token is redacted exactly as on stderr. Worst case: the next deploy fails again (it already does), now with a readable reason.
2. **How we would know.** The Deploy workflow log now shows Vercel's stdout on failure. The post-deploy smoke in tools/deploy.mjs checks feed, catalog, a lesson and the unpublished-404. `npm run build` warnings: none of "Dynamic filesystem" or broad-pattern remain, so a new one is visible in CI build output.
3. **How to roll back.** `git revert <sha>` of the commit. It takes minutes, loses no data and does not need the founder. Nothing is deployed by this change.
4. **Capacity.** Smaller. Distinct traced files go from 12,260 to 137, traced bytes from 84.9 MB to 10.2 MB, and the sum over functions from 1,541 MB to 187 MB (review note). The cold upload drops by about 12,100 files. No CI minutes added. The two new tests run in about 1 ms.
5. **Security.** No new route, parameter or secret. Excluding about 8,200 internal handbook files (including prompts) from production function bundles reduces exposure. The diagnostics go to the CI log only, never to the release record (tested).
6. **Data.** No learner data. The release record schema is unchanged.
7. **Risks.** Proposal for principal-engineer-ops: the deploy path has a single point of failure in an unverified Vercel file-count or upload-rate limit, and the cold prebuilt upload is about 14,000 files after this change. Re-score or add the entry once the next run shows the real error. If it is `too_many_files` or `api-upload-*`, the fix is `--archive=tgz` (review note, Proposal 2).

## Approval (principal-engineer-ops)

- Decision:
- Conditions, each with a board id:
- What would make me revoke it:
- Objections raised, and what happened to each:
