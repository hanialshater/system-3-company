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
