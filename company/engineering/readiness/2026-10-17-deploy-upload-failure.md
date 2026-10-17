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

Status: **principal-engineer-ops approved with conditions C1-C5 (2026-10-17, see Approval); principal-engineer diff read pending.** The author does not approve this record. It is tier 2 because it touches deploy tooling, and because it changes the trace of 18 server functions, including `src/app/api/**` routes, although only HQ ones.

1. **What can fail.** (a) A production function that needs a repo file stops getting it. All 9 non-HQ function traces are byte-identical before and after (review note, After table), and every HQ route returns 404 or notFound() in production (`src/lib/hq.ts:222`). Learners see nothing. (b) If HQ is ever enabled on Vercel with `HQ_PUBLIC=1`, library, whiteboard and founder-queue reads find no company/ files. (c) A new diagnostic line prints a secret other than VERCEL_TOKEN that Vercel echoes on stdout. Vercel's deploy JSON carries deployment ids and URLs, not credentials, and the token is redacted exactly as on stderr. Worst case: the next deploy fails again (it already does), now with a readable reason.
2. **How we would know.** The Deploy workflow log now shows Vercel's stdout on failure. The post-deploy smoke in tools/deploy.mjs checks feed, catalog, a lesson and the unpublished-404. `npm run build` warnings: none of "Dynamic filesystem" or broad-pattern remain, so a new one is visible in CI build output.
3. **How to roll back.** `git revert <sha>` of the commit. It takes minutes, loses no data and does not need the founder. Nothing is deployed by this change.
4. **Capacity.** Smaller. Distinct traced files go from 12,260 to 137, traced bytes from 84.9 MB to 10.2 MB, and the sum over functions from 1,541 MB to 187 MB (review note). The cold upload drops by about 12,100 files. No CI minutes added. The two new tests run in about 1 ms.
5. **Security.** No new route, parameter or secret. Excluding about 8,200 internal handbook files (including prompts) from production function bundles reduces exposure. The diagnostics go to the CI log only, never to the release record (tested).
6. **Data.** No learner data. The release record schema is unchanged.
7. **Risks.** Proposal for principal-engineer-ops: the deploy path has a single point of failure in an unverified Vercel file-count or upload-rate limit, and the cold prebuilt upload is about 14,000 files after this change. Re-score or add the entry once the next run shows the real error. If it is `too_many_files` or `api-upload-*`, the fix is `--archive=tgz` (review note, Proposal 2).

## Approval (principal-engineer-ops)

Reviewed 2026-10-17 by principal-engineer-ops on a10b3c1f (branch worktree-agent-a6a360c541b022948). This is a readiness approval, not the engineering diff read (principal-engineer) and not a deploy approval (founder).

- **Decision: approved with conditions C1-C5.** The approval also covers the optional `--archive=tgz` flag on the upload, within the limits in C3. Anything outside C3 needs a new approval.
- **What I checked myself, not taken from the note:**
  - `node --test tests/deploy/*.test.mjs`: 19/19 pass.
  - I rebuilt a10b3c1f with `NEXT_DIST_DIR=nftops npx next build`, using a node_modules symlink and no `vercel build`. The build log has 0 "Dynamic filesystem" or "whole project" warnings. 27 functions trace 137 distinct files. The 18 HQ functions trace 118-121 files each, and the non-HQ ones 115-129, matching the note's After table. Only 7 company/ files are traced, the statically scoped ones the note names. I did not rebuild the before state. The 12,260 figure is the author's number.
  - Blast radius. `hqEnabled()` is false in production unless `HQ_PUBLIC=1` (`src/lib/hq.ts:222`). `/api/whiteboard`, the one route outside `app/hq` and `api/hq`, is POST-only and gated by `whiteboardWritable()`, so it is off in production. The `src/` diff adds comments only. The deploy.mjs change touches only the failure branch of `execute()`. Learners can be affected only through a non-HQ trace change, and I measured none.
  - Rollback. Production deploys stage with `--prod --skip-domain` and promote only after READY and smoke pass (`tools/deploy.mjs` upload, ready, smoke and promote steps). A failed upload therefore leaves the current production release (r8) serving. Nothing is deployed by merging this.
  - The vercel 63.1.2 CLI passes `archive` and `prebuilt` together into `processDeployment`. The flag is the CLI's own advice for `too_many_files`, `api-upload-*` and payload-too-large errors.
- **Conditions** (no board ids: this slot may not edit board.json; root to assign):
  - **C1. Deploy approval.** The founder's approval of the next production deploy must name the SHA that contains this change, and the archive flag if it lands. My approval does not cover the deploy. Owner: release-manager.
  - **C2. Rollback is path-limited, not `git revert`.** a10b3c1f also adds this record, the review note, a changelog entry and a memory file, so a revert would delete the paper trail. Roll back with `git checkout a10b3c1f^ -- tools/deploy.mjs tests/deploy/deploy.test.mjs src/lib/hq.ts src/lib/hq-library.ts src/lib/hq-whiteboard-server.ts`. If the change reaches main as a merge, use the same command against the merge's first parent. This step correction replaces section 3's `git revert <sha>`. Owner: platform-engineer.
  - **C3. `--archive=tgz` is pre-approved only in this form:**
    - one argument, `"--archive=tgz"`, added to the `vc(["deploy", ...])` args of the upload step in `tools/deploy.mjs`, with no other change to deploy.mjs;
    - a deploy test that asserts the flag is present in the upload args;
    - a principal-engineer diff read;
    - its commit SHA appended under this Approval section.

    It may land before the real error is known. It changes upload transport, not the deployment's contents. A failed upload is already contained by `--skip-domain` (C1/C2), and the new stdout diagnostics will show the cause if it fails again. Owner: platform-engineer, with the principal-engineer read.
  - **C4. Read the real error and register the risk.** The first deploy run after this lands must report Vercel's stdout error line, or "succeeded", in the release record or the release-manager's handoff. Root must give a W-id to the risk entry below so it can be registered in company/ops/risks.json (tools/risks.mjs requires one). Risk entry text: "Deploy upload depends on an unverified Vercel file-count/upload-rate limit (cold prebuilt upload about 14,000 files); a breach fails the deploy at upload, production stays on the previous release. Owner platform-engineer. Mitigation: --archive=tgz (C3), stdout diagnostics. Likelihood 3, impact 2." Re-score it at the next ops review using that error. Owner: release-manager to report, principal-engineer-ops to register.
  - **C5. HQ on Vercel is out of scope.** With these comments, HQ served from Vercel with `HQ_PUBLIC=1` would find no company/ files. This approval does not cover setting `HQ_PUBLIC` or `WHITEBOARD_WRITE` in any Vercel environment. That needs its own readiness record and a designed data path (review note, Proposal 3). Owner: platform-engineer.
- **What would make me revoke it:**
  - any non-HQ function's nft file list changes in a build of the merged tree;
  - a CI log shows a token or other secret in the newly printed stdout;
  - the release record under company/ops/deployments/ stores any subprocess output;
  - the archive flag lands in a form other than C3.
- **Objections raised, and what happened to each:**
  - O1 (mine): the stdout change applies to every failed captured command (`pull`, `inspect`, `curl`, `promote`), not only `deploy`, and redaction covers only `VERCEL_TOKEN`. Disposition: accepted with the revoke trigger above. These commands' stdout carries deployment metadata or page HTML, not environment values; `vercel pull` writes env values to a file, not stdout. Any new secret added to the deploy env must be added to `redact` in the same change. Open to platform-engineer only if a secret is added.
  - O2 (from the trace-excludes review Q2, which argued against turbopackIgnore because it strips company/ from HQ bundles). Answered by the author's Proposal 3 and bounded by C5. Closed for this change.
