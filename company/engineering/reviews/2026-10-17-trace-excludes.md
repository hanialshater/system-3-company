# Build-config change: output file tracing excludes (deploy run 39032703960)

author: platform-engineer · for: principal-engineer (diff read) · readiness: company/engineering/readiness/2026-10-17-trace-excludes.md (tier 2, awaiting principal-engineer-ops)

## What failed

Production deploy run 39032703960 (Deploy to Vercel, commit 4ffc352b) passed verify and build, then failed at the Vercel step. Vercel listed traced files such as `artifacts/qa/<slug>/phone-1-predict.png (matched .vercelignore:6: artifacts/**)`, said "Remove the colliding rules from .vercelignore, or exclude those paths from tracing with outputFileTracingExcludes", and exited 1.

Cause: the workflow runs `npm run verify` (QA writes `artifacts/qa/**`) before `vercel build`. HQ code reads the working tree through `process.cwd()` (for example `src/lib/hq-lessons.ts` `sheetPath`, `src/app/api/hq/sheet/[slug]/route.ts`), so Next's output file tracing pulls whatever is on disk under those directories into the function traces. Vercel refuses a trace that includes a `.vercelignore`d file. HQ is gated off in production, so these files are never needed at runtime there.

## Change

`next.config.mjs` only: `outputFileTracingExcludes: { "*": ["artifacts/**", "test-results/**", "test-results-*/**", "playwright-report/**", ".next-*/**", ".claude/**", "company/ops/deployments/**"] }`. These are the `.vercelignore` entries that could be traced. `.git`, `node_modules`, `.next` and `.env*.local` are left out on purpose (node_modules and .next are what the functions need). Existing settings are unchanged, and so is `.vercelignore`.

## Evidence (worktree build, `next build` with a private NEXT_DIST_DIR, dummy `artifacts/qa/x/y.png` and `artifacts/walkthroughs/x/sheet.png`)

| Build | nft files | traced entries | nft files citing `artifacts/` | citing `company/ops/deployments/` |
|---|---|---|---|---|
| before (HEAD 4ffc352b config), dist `.next-trace-before` | 29 | 225858 | **18** (36 refs, both dummies) | **18** (36 refs) |
| after, dist `.next-trace-after` | 29 | 222688 | 0 | 0 |
| after, dist `distcheck-trace` (not `.next-` prefixed, like Vercel's `.next`) | 29 | 225786 | 0 | 0 |

`grep -rl 'artifacts/' <dist> --include='*.nft.json' | wc -l` gave 18 before and 0 after. The before build reproduces the failure: the 18 traces are the HQ routes and pages (for example `server/app/api/hq/sheet/[slug]/route.js.nft.json`). `company/ops/deployments/**` was also traced, and Vercel would have rejected it next.

**Read this before relying on the `.next-trace-after` row.** That build dropped about 3100 more entries because `.next-*/**` matches the private build's *own* dist dir. The third build uses a dist dir that `.next-*` does not match, as on Vercel, and there the difference from before is exactly 225858 - 72 = 225786. So the only entries removed are the 36 artifacts refs and the 36 deployments refs. Builds that use a `.next-*` NEXT_DIST_DIR lose self-references in their nft files. Only standalone output or a deploy reads those files, and neither uses a `.next-*` dir. Both builds exited 0.

Checks on the change: `npm run check` passed, `npx tsc --noEmit` exited 0, and `npm run test:platform` gave 34 tests, 30 pass, 0 fail, 4 skipped (the built-output tests, which need a built dir).

## Not proven here

- I did not run a real `vercel build` or deploy. Release-manager proves that with the next founder-approved deploy.
- Excluding these paths does not fix the underlying coupling, which is that HQ reads the working tree at runtime. If HQ is ever enabled in production, those routes will 404 their artifacts. That is consistent with the HQ production gate, but it is a constraint.

## Questions for the reviewer

1. Keep `.next-*/**` in the list? It matches `.vercelignore`, but it has the self-dist side effect above for private builds.
2. Should the HQ readers use `/* turbopackIgnore: true */` or a non-static path so tracing never sees them, instead of a path list that must track `.vercelignore`?

## Ruling (principal-engineer, 2026-10-17)

**Approve with conditions.** Reviewed the diff 4ffc352b..52db8a0a (config only: `next.config.mjs` plus records). Readiness approval stays with principal-engineer-ops; this is the diff read only.

What I checked:
- **HQ is gated off in production.** `hqEnabled()` is `NODE_ENV !== "production" || HQ_PUBLIC === "1"` (`src/lib/hq.ts:222`). Every HQ page and API route that reads the tree calls it first (`notFound()` or 404). The only `process.cwd()` reader outside HQ is `src/app/catalog/page.tsx`, which reads `content/curriculum/**`; that is not in the exclude list, so production readers lose nothing. `HQ_PUBLIC` is not set in `vercel.json` or the deploy workflow.
- **Every excluded glob is already in `.vercelignore`,** so no excluded file could have reached a Vercel function anyway. The change can only remove files that Vercel would refuse.
- **The cause matches the pipeline.** `tools/deploy.mjs` runs `npm run verify` (QA writes `artifacts/qa/**`) and writes the deployment record under `company/ops/deployments/` before the prebuilt `vercel build`. That explains both traced paths in your table. The arithmetic in the third row holds (225858 - 72 = 225786).

**Q1: keep `.next-*/**`.** On Vercel and in the deploy workflow the dist dir is `.next`, so the self-match never happens there. Private `.next-*` builds lose self-references only in their `*.nft.json` files. `next start` and the built-output tests never read those files, and we do not use `output: "standalone"`. The glob also covers a real case: any `.next-*` build left on disk before `vercel build` (for example a `.next-prod` from the W-1645 C2 built-output step, if it moves into the deploy run) would otherwise be traced by HQ's broad readers and fail the deploy the same way. Revisit only if we adopt `output: "standalone"` with a `.next-*` dist dir.

**Q2: no, do not move HQ readers to `turbopackIgnore` or non-static paths.** That would touch eight reader modules (`src/lib/hq*.ts`) for a problem a seven-line config already solves. It would also hide from tracing the `company/**` files HQ does need, which matters if `HQ_PUBLIC=1` is ever used on a deploy. The path list is the remedy Vercel's own error message names. The real cost is drift between this list and `.vercelignore`, and a check fixes that more cheaply than a refactor (C2).

Conditions:
- **C1 (before closing the incident, release-manager):** the next founder-approved deploy passes the Vercel step with no "matched .vercelignore" list, and its record cites this commit. Until then the fix is unproven, as the note says.
- **C2 (follow-up, does not block, platform-engineer):** add a test in `tests/platform/` that fails when a `.vercelignore` line other than `.git/**`, `node_modules/**`, `.next/**` and `.env*.local` is missing from `outputFileTracingExcludes["*"]`. That makes the "keep in step" comment enforceable.
- **C3 (constraint, recorded here):** with `HQ_PUBLIC=1` in production, HQ routes that serve artifacts (sheet, review) return 404 for those files. That is acceptable while HQ is private. Anyone who enables `HQ_PUBLIC` on a deploy has to read this first.

I made no code change. Objections: none raised.
