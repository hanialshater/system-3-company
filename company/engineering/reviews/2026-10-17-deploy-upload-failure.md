# Deploy upload failure: diagnostics and whole-repo HQ tracing (deploy run 39042065255)

author: platform-engineer · date: 2026-10-17 · reviewer: principal-engineer (diff read) · readiness: company/engineering/readiness/2026-10-17-deploy-upload-failure.md (tier 2, awaiting principal-engineer-ops)

## What happened

Production deploy run 39042065255 (commit e84b8784, after the trace-excludes fix in company/engineering/reviews/2026-10-17-trace-excludes.md) passed `npm run verify` and `vercel build --prebuilt` ("Build completed successfully", "Created all serverless functions in 5.98s"). It then failed at the upload step. The log shows only "Retrieving project… / Deploying hanis-projects-2e2b67f6/system-3-company / Deployment stopped… / deploy: vercel command failed (exit 1)". Vercel's own error is not in the log.

## 1. Why the error was lost, and the fix (tools/deploy.mjs)

`execute()` printed only `error.stderr` when a captured command failed. `vercel deploy --format json` writes its result, including errors, to stdout. Captured stdout was dropped, so the log never showed Vercel's reason.

Change: on failure `execute()` now writes both `error.stdout` and `error.stderr` to the live log (process stderr). Both get the same redaction: every occurrence of `VERCEL_TOKEN` becomes `[redacted]`. The thrown error is still only `"<cmd> command failed (exit N)."`. The release record under company/ops/deployments/ still stores only the step name (`failedStep`), never subprocess output. `execute` is now exported, and its process runner and log writer can be injected for tests.

Tests (tests/deploy/deploy.test.mjs, the deploy.mjs test file; tests/platform does not cover deploy.mjs):
- A failing command whose stdout carries Vercel-style error JSON and whose stderr carries a message prints both, with the token redacted from each (two `[redacted]`). The thrown message carries neither.
- A prebuilt production deploy whose upload fails through `execute` leaves a record with `failedStep: "upload"` that contains neither stream's text and no token.
- A successful command returns its stdout and writes nothing.
`npm run test:deploy`: 19/19 pass.

## 2. Likely cause: every HQ function traced the whole repository

The build warns "Dynamic filesystem access causes tracing of the whole project" at nine call sites: `src/lib/hq.ts:208` (twice), `src/lib/hq-whiteboard-server.ts:8, 12, 22, 35, 36` and `src/lib/hq-library.ts:76, 79`. Each of these sits in a module imported by all HQ pages and API routes and by `/api/whiteboard`.

### Method

I built main (e84b8784 plus this branch's deploy.mjs change, with no src change) in this worktree using `NEXT_DIST_DIR=nftb-before npx next build`. The dist dir is not prefixed `.next-`, so the `.next-*/**` exclude does not alter its traces (see the trace-excludes note). node_modules was symlinked from the main checkout and tsconfig.json was restored after each build. A script read every `server/**/*.nft.json`, resolved each entry, dropped the private dist dir's own self-references (2,065 in both builds, which are build chunks and not repo files), and summed file sizes. The script is not committed. It is about 40 lines and easy to rerun: walk `server/` for `*.nft.json`, resolve `files[]` against the nft file's directory, `statSync` each.

### Before (main)

| | value |
|---|---|
| server functions (nft files) | 27 |
| functions tracing the whole repo | 18 (all `app/hq/**` pages, all `app/api/hq/**` routes, `app/api/whiteboard`) |
| traced files per HQ function | 12,259 to 12,260 |
| traced bytes per HQ function | 84.7 to 84.9 MB (company/ 61.3 MB of it, 8,171 files) |
| largest function | `app/api/hq/curriculum/concept/[key]/route.js` and its eight sibling API routes, 12,260 files, 84.9 MB |
| non-HQ functions | 115 to 129 files, about 1.5 MB each |
| distinct traced files across all functions | 12,260 (84.9 MB) |
| sum over functions (no dedupe) | 1,541 MB |
| largest traced trees | company/reviews 6,818 files 34.2 MB; src 3,823 files 19.8 MB; company/ops 71 files 10.9 MB; company/domains 137 files 6.3 MB; company/design 230 files 3.7 MB |

Other output that a prebuilt upload carries, from the same build: 3,376 files in `static/` (43 MB) and about 10,400 prerendered html/rsc/meta files under `server/app`. On a cold upload the deployment therefore had about 26,000 distinct files, nearly half of them repo files that HQ traced in.

### After (this branch)

The fix is `/*turbopackIgnore: true*/` on the flagged calls, following the precedent at `src/lib/hq-lessons.ts:9`. It goes on the nine flagged sites plus `companyRoot()` in `src/lib/hq-library.ts:65`. After the first nine, that call was the next warning: its file pattern matched 16,346 files and the three library functions still traced all of company/. The diff touches three files and adds comments only. No logic changes.

| | before | after |
|---|---|---|
| "Dynamic filesystem" / broad-pattern warnings | 9 | 0 |
| functions over 1,000 traced files | 18 | 0 |
| traced files per HQ function | 12,260 | 118 to 121 |
| traced bytes per HQ function | 84.9 MB | 9.7 MB (8 MB is `company/ops/events.jsonl`, a statically scoped reader) |
| distinct traced files, all functions | 12,260 (84.9 MB) | 137 (10.2 MB) |
| sum over functions | 1,541 MB | 187 MB |
| non-HQ functions (`/`, `/d/[slug]`, `/catalog`, `/api/events`, `/api/feed`, `/api/meta`, `/spike`, error pages) | 115 to 129 files | **identical file lists** |

The repo files still traced by HQ functions are `company/ops/events.jsonl`, `company/ops/releases.json`, `company/rituals/triggers.json`, `company/sibling/press/hq-snapshot.json` and three first-light standup files. These are statically scoped reads, and I left them alone.

Runtime check: with `next start` on the after build and `HQ_PUBLIC=1` (the repo on disk, as in local use), `/hq`, `/hq/library`, `/hq/whiteboard`, `/hq/releases`, `/api/hq/library`, `/api/hq/library/doc?path=ops/runbook-deploy.md` and `/` all returned 200. `turbopackIgnore` changes only what is traced and bundled. Runtime reads are unchanged.

## 3. Against Vercel's limits

I could not reach Vercel's docs from this host (the proxy refuses vercel.com). What I am sure of, and what I am not:
- **Per-function size: 250 MB uncompressed.** The largest function was 84.9 MB. **Function size was not the failure.**
- **Deployments per day (Hobby): 100**, per CLAUDE.md. Not relevant to an upload error.
- **File count and upload limits: not verified.** The installed CLI (vercel 63.1.2, `dist/chunks/chunk-YDRNDY2V.js`) handles three upload failures specially: API error code `too_many_files`, error names starting with `api-upload-` (an upload rate limit), and "entity/payload too large". For all three it adds "Try using `--archive=tgz` to limit the amount of files you upload." So Vercel enforces a file-count limit and a per-plan upload-rate limit. My recollection is that the Hobby upload limit is 5,000 files per day (error code `api-upload-free`), but I could not confirm it here, so treat that number as unverified.

**Conclusion (moderate confidence, about 60 to 70 percent): the upload most likely failed on file count or upload rate, not on size.** The whole-repo trace roughly doubled the distinct files (about 26,000 cold, versus about 14,000 without it). If the limit is per-day uploads of new files, though, 14,000 may still exceed it on a first CLI upload, because files are deduplicated by hash and earlier releases appear to have been remote git builds, not CLI uploads. Fixing the trace is right on its own merits: about 12,100 files and 75 MB fewer, warnings gone, no traced file that `.vercelignore` could collide with. It may not be sufficient alone. The diagnostics change makes the next run show the real error.

## Proposals

1. **Ship both changes in this branch** (diagnostics plus turbopackIgnore). These are tier 2 because they touch deploy tooling and every HQ function's trace: readiness record company/engineering/readiness/2026-10-17-deploy-upload-failure.md.
2. **If the next run's stdout says `too_many_files` or `api-upload-*`:** add `--archive=tgz` to the upload in `tools/deploy.mjs`. The CLI itself suggests this. It uploads one archive instead of thousands of files. This is a one-line change, but I have not made it: it changes the upload mechanism and should be decided on the real error, not on my guess. Owner: platform-engineer, on release-manager's report.
3. **Trade-off to record:** with these comments, HQ on Vercel with `HQ_PUBLIC=1` would no longer have company/** in its bundle (library, whiteboard and founder-queue reads would find nothing). The trace-excludes review (Q2) cited this as a reason not to use turbopackIgnore. Today HQ is off in production (`src/lib/hq.ts:222`), `HQ_PUBLIC` is set nowhere in the deploy path, and whiteboard writes cannot persist on Vercel's read-only filesystem anyway. Shipping 85 MB of internal handbook in 18 functions is the larger risk, and those files include internal prompts, which is why HQ is gated. If HQ is ever served from Vercel it needs a data path designed for it, not a whole-repo trace.
4. The trace-excludes list in next.config.mjs stays. It still protects the readers that remain statically scoped.

## Process incident (contained)

My first attempt at an offline `vercel build` (with a hand-written `.vercel/project.json`) ran `npm ci` inside the worktree. npm emptied the main checkout's `node_modules` through the worktree symlink and then replaced the symlink with a real directory. For a few minutes, any other session using the main checkout had no dependencies. I restored it by moving the worktree's fresh install (the same `package-lock.json`, byte-identical by `cmp`, from the same `npm ci`) into the main checkout and re-creating the symlink. next, typescript, react and @playwright/test are present, and tsc, test:hq, test:platform and test:deploy pass through the symlink. **Do not run `vercel build` in a worktree whose node_modules is a symlink.** It runs the project's install command. Use `next build` with a private dist dir, as above.

## Principal engineer ruling (2026-10-17, branch pe-upload from a10b3c1f)

I read the code diff (tools/deploy.mjs, tests/deploy, the three src/lib files) before the account above.

**R1. Diagnostics (tools/deploy.mjs `execute`): approve.** Both streams pass through the same redaction, output goes to the live log only, and the thrown message and release record carry neither stream (tested). The injectable `exec`/`write` defaults keep the call sites unchanged.

**R2. turbopackIgnore on HQ readers: approve. This overrides my answer to Q2 in company/engineering/reviews/2026-10-17-trace-excludes.md.** Q2 rested on two premises. First, that the seven-line exclude list already solved the problem. It did not: it removed the files that collided with `.vercelignore`, but 18 functions still traced 12,260 files each (measured above). Second, that HQ might need its `company/**` files on a deploy. That case was already broken in part (C3 of that review), HQ is gated off in production (`src/lib/hq.ts:222`), whiteboard writes cannot persist on Vercel, and the bundled files include internal prompts, which is the reason HQ is gated. The fix adds comments only, follows the precedent at `src/lib/hq-lessons.ts:9`, and leaves the nine non-HQ function traces byte-identical. The constraint now reads: **HQ served from a Vercel deployment (`HQ_PUBLIC=1`) is unsupported.** It would read no company/ files, so turning it on needs its own design (EDD) for a data path, not a revert of these comments. That replaces C3 of the trace-excludes review. The trace-excludes C4 follow-up (make HQ readers untraceable) is done by this change. C1 (deploy proof) and C2 (drift test) there still stand.

**R3. `--archive=tgz` on the prebuilt upload: approve now, and made (one line in tools/deploy.mjs).** Reasons:
- Each attempt is a founder-approved run of about 75 minutes and counts against the 100 deployments a day. Waiting for the real error costs at least one more such run to learn something the archive is meant to make irrelevant.
- The cold upload after R2 is still about 14,000 files. In the installed CLI (vercel 63.1.2), all three upload failure classes it recognises (`too_many_files`, `api-upload-*` rate limits, entity/payload too large) get the same advice: use `--archive=tgz`. The likely causes and the unlikely ones share one remedy.
- It works with `--prebuilt` in this CLI. `createTgzFiles` (node_modules/vercel/dist/chunks/chunk-GNY6U33Z.js) packs the same prebuilt `fileList` into gzip tar chunks uploaded as `.vercel/source.tgz.partN`. The chunking also covers a single oversized payload. `--archive=tgz` now behaves as the old `split-tgz` (commands/deploy/index.js).
- It is easy to reverse: one array element. It touches only the prebuilt branch. Source deploys (`npm run deploy` without `--prebuilt`) keep per-file upload.
- Cost: no per-file deduplication between deploys, so every CI deploy uploads the whole compressed output (static 43 MB plus function bundles; not measured compressed). That is acceptable at our deploy rate.
- What it does not do: it does not tell us the original cause. If the next run succeeds, the cause of 39042065255 stays unconfirmed, and the record should say so rather than claim a diagnosis. If it fails, R1 now shows Vercel's reason.

Tests: the prebuilt upload test asserts `--archive=tgz`, and the source-deploy test asserts no `--archive` flag (tests/deploy/deploy.test.mjs). `npm run test:deploy` 19/19, `npm run test:platform` 0 failures, `npx tsc --noEmit` clean, `npm run check` passed.

**Still required before a deploy:** principal-engineer-ops approval in company/engineering/readiness/2026-10-17-deploy-upload-failure.md (its section 7 risk proposal should now say the archive is in place and the file-count limit is mitigated, not verified), and the founder's approval for that specific deploy. The release-manager's next run record cites this branch's head and quotes the upload step's outcome.

Objections: none raised. Process note: the `npm ci` through a symlinked node_modules (above) left the main checkout's tree sane. `npm ls --depth=0` exits 0, all 15 direct dependencies are at lockfile versions, and `npm ls --all` shows nothing missing or invalid. Six optional wasm fallbacks (@emnapi/*, @img/sharp-wasm32, @napi-rs/wasm-runtime, @tybys/wasm-util) show as "extraneous". They are present in package-lock.json at the same versions and marked optional, so this is cosmetic.
