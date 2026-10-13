# Vercel deployment command and pipeline for the release manager

owner: release-manager
date: 2026-10-13
status: proposed (implementation in PR)

## Context
The founder asked for a function for the company to deploy to Vercel. The existing deployment
runbook requires verification, but its commands leave target checks, hosted smoke tests and
release records to the operator's memory.

## Decision
Add `npm run deploy -- preview|production` and `/deploy`, owned by the release manager. Pin
Vercel CLI 63.1.2 as a development dependency. Stage production without assigning domains,
check the deployment, then promote it. Set published-only visibility at build and runtime and
apply it to the feed, map and direct lesson pages. Write release records under
`company/ops/deployments/`. See EDD-002.
The GitHub pipeline automatically deploys previews after default-branch CI succeeds; production
is a manual default-branch run. CI uses prebuilt output and scoped environment credentials.
It records outcomes in the run summary and release-record artifacts without writing to GitHub.

## Rests on
The existing verify suite, Vercel CLI help for 63.1.2, and the founder's requests for a deployment
function and pipeline on 2026-10-13.

## Revisit if
The CLI becomes a significant install cost, or the company's deployment environment needs
prebuilt CI uploads instead of remote builds.

## Objections
- A new development dependency increases install size. Pin it for reproducible commands; it
  does not enter the browser bundle.
- An initial Vercel login/project link is still required. The command refuses an unresolved or
  conflicting target instead of choosing one. No live deployment is part of this implementation.
- HTTP smoke checks do not establish learning or replace the browser QA; the existing full
  verification suite still runs before uploading.
