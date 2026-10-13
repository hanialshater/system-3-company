# EDD-002: Give the release manager a deployment command and CI pipeline

author: Codex (implementation) · reviewers: principal-engineer, release-manager · tier: 2 · status: implemented (PR review pending)

## Problem and why now
The founder requested a function for the company to deploy to Vercel. Today the release manager
has a runbook but no deployment command, target validation, remote smoke check or durable release
record. `SHOW_REVIEW=off` hides review lessons from the feed but not from the map or direct URLs.

## Goals / non-goals
One command for previews and one explicit production command. Reuse the existing verification
suite. Confirm an already linked Vercel project, stage production before changing its domains,
check the hosted pages, and record the result. Production must expose only published lessons.
Account login and initial project linking remain one-time setup. This change does not deploy a
live site, create a project, change constitutional gates or add a background scheduler.
The founder also authorized a GitHub deployment pipeline: previews after successful default-
branch CI, with explicit manual production runs.

## Current state (with measurements)
318 lessons, 47 published. The reviewed snapshot passes company checks, typechecking, build and
28 sampled browser checks. No linked Vercel project is present in this checkout.

## Options considered (including doing nothing)
| Option | Cost | Risk | Reversibility |
|---|---|---|---|
| Keep the manual runbook | No implementation | Operator can omit verification or deploy to the wrong target | Immediate |
| Dependency-free wrapper around a globally installed CLI | Small implementation | CLI versions vary between agents | One revert |
| Wrapper with pinned Vercel CLI (chosen) | A development dependency, orchestration tests | More development dependencies; cloud operation still requires credentials | One revert |

## Proposal
`tools/deploy.mjs`, exposed through `npm run deploy` and `/deploy`, belongs to the release manager.
Use Vercel CLI 63.1.2 (verified against its installed help). Credentials stay in the CLI's login
store or `VERCEL_TOKEN`, never command-line flags or release records. Preview shows tagged review
lessons. Production sets `SHOW_REVIEW=off` at build and runtime, deploys with `--skip-domain`, then
promotes the staged deployment only after smoke checks. A release record names the commit, target,
project, URL and completed steps. Failed runs keep their record and stop before promotion.
CI uses `--prebuilt`: verify, pull the selected project configuration, locally build Vercel
output without an authentication token, upload that output, check it, and promote production.
The new workflow uses scoped GitHub environments and a read-only GitHub token, pins action
revisions, checks out the successful CI commit, and retains only release records as artifacts.

## Measurements committed before implementation
- Missing or conflicting project links stop before verification/upload.
- Failed verification, non-READY deployment and failed smoke checks never reach promotion.
- A production build returns 404 for review lessons and does not link them from the map.
- Existing full QA stays green in preview mode; production smoke checks use published lessons.
- Other branches/forks, failed CI and missing deployment configuration never upload a build.
- Prebuilt pull/build failures stop before upload or promotion; the build has target-specific
  visibility and does not receive the Vercel authentication token.
- would_be_wrong_if: a failed check can still promote a deployment, or unpublished lesson pages
  remain reachable on a production build.

## Rollout and rollback
Deliver as a PR, run the orchestration tests and full repository verification, and review before
merge. Initial login/link happens in the founder's deployment environment. Revert the change to
remove the command. For a live release, use `vercel rollback` and open a COE as in the runbook.

## Open questions and objections
- The real Vercel upload requires the founder's linked account/project; this implementation can
  test orchestration and the production build without making a live deployment.
- CLI smoke requests use `vercel curl` so protected deployments can be tested without disabling
  deployment protection. They supplement, rather than replace, the local browser QA suite.
