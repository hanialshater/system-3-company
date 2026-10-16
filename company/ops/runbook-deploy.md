# Deploy runbook

owner: release-manager

## Local (now)

```sh
npm install
npm run dev            # http://localhost:3000 (lessons in review are visible and tagged)
npm run verify         # check + typecheck + build + QA: must be green before any release
npm run start          # serve the production build locally
```

## One-time Vercel setup

The repo is Vercel-ready: `vercel.json` sets the framework, build and install commands.

Log in and link the intended team/project from the repository root:

```sh
npx vercel login
npx vercel link --project system-3-company  # select the intended owner/team
npx vercel project inspect --format json --non-interactive
```

The pinned CLI comes from `npm ci`. `.vercel/project.json` is ignored by git. In CI, configure
`VERCEL_ORG_ID`, `VERCEL_PROJECT_ID` and `VERCEL_TOKEN` in the runner's variables/secret store.
Do not put tokens in commands, handoffs, release records or tracked files. The command rejects
partial IDs, conflicting local/environment links and a CLI-resolved owner/project mismatch.

## Deploy (release manager)

**Since 2026-10-16 (F-48, company/decisions/2026-10-16-founder-no-git-deployments.md): pushes create no Vercel deployment (`vercel.json` `git.deploymentEnabled: false`). Deploy only through the Deploy to Vercel workflow, after the founder approves that deploy. The commit marker no longer deploys.**

```sh
npm run deploy -- preview --dry-run  # plan only; no credentials or cloud mutation
npm run deploy -- preview            # tagged review lessons available for testing
npm run deploy -- production         # published lessons only; requires committed source
npm run deploy -- production --prebuilt  # build and upload Vercel output locally (CI mode)
```

`/deploy preview` and `/deploy production` dispatch the same workflow in Claude Code.

Every real run:
1. Confirms the linked project and captures the source commit.
2. Runs the existing `npm run verify` suite on the full preview tree. Vercel credentials are not
   passed into that build/test process.
3. Uploads a remote build and waits up to ten minutes for READY. `SHOW_REVIEW` is explicitly set
   for both build and runtime (`on` for preview, `off` for production).
4. Uses `vercel curl` to check the feed, map and one lesson, including protected deployments.
   Production also checks that unpublished lessons are absent and a direct unpublished URL is 404.
5. For production, deploys with `--prod --skip-domain`, then promotes the exact staged deployment
   only after checks pass. A staging/check failure leaves the current production domains alone.
6. Writes `company/ops/deployments/<timestamp>-<target>-<commit>.json`, including failed attempts.

`--prebuilt` runs verification first, then pulls the selected Vercel environment/settings,
sets only `SHOW_REVIEW` in the ignored pulled environment file, and runs `vercel build`. It
uploads that output with `--prebuilt`. The local builder receives no Vercel authentication token.

The release manager reports the URL, commits the release record and adds it to the handoff.

### Release log (release manager, every deploy)

The release manager owns `company/ops/releases.json` (versions `r1`, `r2`, ... sequential, the date shown beside; append-only).
Before each production deploy: run `node tools/release-draft.mjs --commit=HEAD`, fill in the summary,
features, fixes and known issues by hand, and set `approved_by` to the founder with a pointer to the
approval (conversation date and words, or a commit message). Never invent an approval: write
"not recorded" instead. Commit the entry with the release verification; `npm run test:hq` checks the file.
Production still needs a launch review and green CI; the command does not decide which lessons
deserve publication or override their gates. `NEXT_PUBLIC_EVENTS=off` can be configured in the
Vercel project to disable the anonymous event beacon.

If Vercel's Git integration is also enabled, set production `SHOW_REVIEW=off` in the dashboard
and configure Deployment Checks: a separate automatic Git deployment does not run this wrapper.

## GitHub Actions pipeline

Workflow: `.github/workflows/deploy.yml` (**Deploy to Vercel**).

| Trigger | Target | Source |
|---|---|---|
| Actions → Deploy to Vercel → Run workflow → target=preview | preview | Selected default-branch commit |
| Actions → Deploy to Vercel → Run workflow → target=production | production | Selected default-branch commit |

Manual runs on other branches and CI events for forks/other branches do not deploy. Production
is explicit; previews do not assign production domains. Deploys to each target are serialized
and are not cancelled halfway through a release.

One-time setup in GitHub **Settings → Environments**:
1. Create `preview-deploy` and `production` and restrict their deployment branches to the
   repository's current default branch (currently `ccr-4c6c7654-ew9ko1`; update this restriction
   if the default branch changes). Configure required reviewers for production. Default-branch
   previews can run automatically; no PR code receives deployment secrets. The workflow's branch
   checks automatically follow the default branch.
2. In each environment, add variables `VERCEL_ORG_ID` and `VERCEL_PROJECT_ID` for the intended
   Vercel project. These IDs come from your local `.vercel/project.json` after linking.
3. In each environment, add the secret `VERCEL_TOKEN` directly in GitHub. Do not put it in a
   repository file, workflow input or chat. Give it access only to the intended Vercel team.
4. Merge this workflow into the default branch. GitHub discovers manual
   dispatch workflows there. The pipeline fails clearly before installation if configuration
   is missing; it does not create a Vercel project or invent credentials.

The workflow checks out the exact release SHA without persisting GitHub credentials, installs
the pinned CLI and QA browser, runs the prebuilt deployment command, and publishes a run summary
with the URL/commit/result. Release JSON files are retained as workflow artifacts for 30 days,
including failed attempts. It never uploads pulled environments, Vercel build output or browser
authentication state as artifacts, and it does not post PR comments or write back to the repo.

After downloading a release record, the release manager can commit it to the company's history.
The pipeline requires only `contents: read`; storing records as artifacts avoids a push/deploy
loop. If Git integration also deploys the same branch, choose which system owns releases so
an automatic Git deployment cannot race this pipeline's staged promotion.

## Rollback

Run `npx vercel rollback` from the linked project, then open a COE. Rollback pauses automatic
production-domain assignment; resume with `npx vercel promote <tested-production-url>`.

## Smoke test after deploy (qa-tester)

```sh
QA_BASE_URL=https://<deployment> npx playwright test tests/qa/feed.spec.ts
```

(`QA_BASE_URL` skips the local web server.)

## Git-integration builds only on `[deploy]` commits (2026-10-14)

Vercel's GitHub integration used to build a preview for every push to the working branch. Agents push work-in-progress snapshots dozens of times a day, which spent the free plan's 100 deployments a day (`api-deployments-free-per-day`) and blocked real releases. `vercel.json` now has an `ignoreCommand`: Vercel skips the build unless the latest commit message contains `[deploy]`. The release manager (or chief of staff) makes one `[deploy]` commit per publish wave, after `npm run check` and QA on that tree. Deliberate releases through `npm run deploy` are unaffected.

**Founder approval (2026-10-14):** every deploy, preview or production, needs the founder's explicit approval for that deploy. No agent adds `[deploy]` to a commit or runs `npm run deploy` on its own judgement, including the release manager after a publish wave: ask first, then deploy once.
