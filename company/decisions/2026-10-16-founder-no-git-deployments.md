# Founder decision: no deployment from git pushes until a deploy is approved (F-48)

owner: release-manager · date: 2026-10-16 · class: release (deploy path)
route: founder → chief-of-staff (records, vercel.json) → release-manager (runs approved deploys through the Deploy to Vercel workflow)
recorded by: chief-of-staff · status: decided

## What the founder said
> "Ok but we cut the deploymenta until we get an approval" (2026-10-16, after r8 was refused with "Deployment rate limited — retry in 24 hours")

## Why
Vercel's free plan allows 100 deployments a day. Every push to any branch created a Vercel deployment, even the ones `ignoreCommand` skipped for lack of the deploy marker, so pushes from several sessions used the quota up and the founder-approved r8 (6cbce51) was refused (Vercel status on 6cbce51, 19:11Z).

## Decided
- `vercel.json` sets `"git": { "deploymentEnabled": false }`: pushes no longer create Vercel deployments. The commit-message marker no longer deploys anything.
- The only deploy path is the **Deploy to Vercel** GitHub Actions workflow (`.github/workflows/deploy.yml`, manual `workflow_dispatch`, default branch only), run once the founder has approved that specific deploy.
- Vercel reads `vercel.json` from the pushed commit, so branches made before this change still deploy on push until they merge the default branch. To stop those too, the founder disconnects the Git repository in the Vercel project (Settings → Git), which this session cannot do (no Vercel access).

## Open
- The workflow needs `VERCEL_TOKEN`, `VERCEL_ORG_ID` and `VERCEL_PROJECT_ID` in the repository's deployment environments; the release manager confirms they are set before the r8 retry.

## Objections
| Objection | Raised by | Status |
|---|---|---|
| Preview deploys for review stop too. | chief-of-staff | Accepted: reviews use the shared local review server; a preview is a workflow run with target preview, approved like any deploy. |
| If the workflow secrets are missing, nothing can deploy. | chief-of-staff | Open: checked before the r8 retry (above). |
