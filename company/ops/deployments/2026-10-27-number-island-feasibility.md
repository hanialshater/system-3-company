# Number Island preview: release feasibility consultation

owner: release-manager
date: 2026-10-27
status: blocked before implementation and release
source: company/decisions/2026-10-27-founder-number-island.md

## Answer

Agree with proceeding through the company to a reviewed preview. The founder's words, “Ok lets do the svgs, when you finish deploy so i can see it too”, are recorded in the source intake and cover this feature's preview once ready. Do not ask for the same approval again. They do not waive failing gates, authorize an unrelated production release, or supply a feature artifact that does not yet exist.

No deployment was attempted, no release approval was consumed, no Vercel project was created, and no live URL for Number Island is claimed. This is a feasibility consultation, not a release receipt or a QA verdict.

## Usable now

- The existing `Deploy to Vercel` workflow accepts `target=preview`, uses the `preview-deploy` GitHub environment, and runs only when its selected ref is the repository's default branch. It checks out the release SHA and retains the deployment receipt as a workflow artifact.
- `npm run deploy -- preview --dry-run` passed and printed the expected sequence: linked-target confirmation, full verification, upload, READY wait, smoke tests and receipt. A dry run does not establish authentication or deployment readiness.
- Native read-only Git access works through the existing configuration: `git ls-remote origin refs/heads/ccr-4c6c7654-ew9ko1` returned commit `f693857f43e49cb0d0e6a67f22e40e0953125a0e`. This proves read access to that ref, not GitHub API, workflow-dispatch, push or Vercel access.
- The pinned CLI and release wrapper are installed. The existing preview authorization remains available for this feature.

## Concrete blockers and uncertainties

1. **No feature artifact yet.** The intake is routed; the SVG page, independent review and implementation evidence must exist before a release can be considered. The engineering owner determines tier/readiness obligations. Any learner-data, auth, event-API or deploy change requires the prescribed approved readiness record; release-manager cannot approve its own.
2. **Baseline full verification is red.** `/tmp/s3-world-verify-before.log` stops in `test:publish`: 32 passed, 2 failed of 34. One fixture expects `same-week-a-year-apart` version 1 while actual metadata is version 2; the other expects no readiness errors but finds existing published-gate failures. Later verify stages did not run. Independent successful build/typecheck or a targeted page check cannot substitute for the required full gate. Route fixture/readiness policy to evaluation-steward and underlying content evidence to the appropriate owners; do not weaken tests or publish around them.
3. **Default-branch integration is required by the workflow.** The feature branch must go through the authorized pull-request review/integration process. This agent does not merge or push the default branch. Dispatching the current default commit would not deploy an unmerged Number Island feature; dispatching the feature branch would be skipped by the job condition.
4. **GitHub API is currently unavailable from this executor.** Ordinary `gh api repos/hanialshater/system-3-company` and preview environment variable/secret *name-only* list requests returned `Forbidden` for `https://api.github.com/...`. No credential values were requested or printed. `GH_TOKEN` is present, so this is not evidence that a new GitHub token is needed. The current cloud runtime reports enforced restricted networking and no configured secret/runtime-variable/outbound-identity bindings. The supported environment configuration/access owner must diagnose and enable the required API route before using `gh` for a workflow dispatch. Git reads succeeding do not resolve this API denial.
5. **Deployment bindings are unconfirmed.** In this executor, `VERCEL_TOKEN`, `VERCEL_ORG_ID`, `VERCEL_PROJECT_ID` and `GITHUB_TOKEN` are absent; `.vercel/project.json` is absent; `GH_TOKEN` is present. These are presence checks only. Their absence locally does not establish absence in GitHub's `preview-deploy` environment, whose name-only metadata could not be queried because of the API denial. Use the existing configured GitHub environment once accessible; do not ask for secret values in chat, copy credentials or start interactive login.
6. **Release documentation/configuration drift needs owner reconciliation.** The runbook's F-48 paragraph says Git deployment is disabled, but the current `vercel.json` has `git.deploymentEnabled: true` plus a marker-based `ignoreCommand`. Later historical records describe specific founder-approved Git releases; they are not a standing bypass for this release. The current workflow/default-branch/full-verify path remains the supported conservative route. Do not manufacture a marker commit to bypass a failed workflow.
7. **Legacy visibility smoke checks need scrutiny.** The 2026-10-19 founder decision explicitly made all statuses visible with accurate labels; the older runbook still describes production unpublished exclusion. This preview must preserve current visibility/status behavior. Do not “fix” a release check by hiding drafts or promoting lesson statuses. Evaluation-steward and the tooling owner must resolve any obsolete assertion through the normal review process.

## Supported next sequence

1. Chief-of-staff collects the design/product/engineering manager answers and routes existing specialists. Resolve actual dispatch preflight failures before build work; this consultation does not clear them.
2. Implement and independently review Number Island, with the feed, lesson statuses and protected paths preserved. Collect phone/desktop SVG page, keyboard/list fallback, lesson-launch/return and regression evidence.
3. Evaluation-steward coordinates remediation of the red verification prerequisite and any stale release assertions. Principal-engineer-ops owns any required readiness approval. Release-manager does not fix or waive their failures.
4. Authorized integration owner lands the reviewed source through the PR process. Confirm the repository's actual default branch and exact source SHA through available metadata; do not assume the documented branch stays default forever.
5. Once API access is restored, check only names/status for existing `preview-deploy` bindings and confirm the linked target using the established workflow. Any remaining values go through secure environment settings, never chat.
6. Release-manager dispatches `Deploy to Vercel` once with `target=preview` on that integrated SHA under the already recorded feature approval, watches verification/READY, and verifies the hosted Number Island route plus feed/map/lesson behavior. Return the real URL, exact commit, receipt and independent smoke results.

## Board suggestions for the chief of staff

- Keep W-2030 with release-manager, blocked on the artifact/reviews, green required verification, integrated default-branch source and usable workflow API access.
- Link the two `test:publish` baseline failures to evaluation-steward rather than broadening this feature into silently rewriting unrelated gates.
- Route the `api.github.com` denial to environment/network configuration ownership. Reuse existing authentication; no duplicate credential requirement is justified by current evidence.
- Track release documentation/visibility drift with the release tooling owner and evaluation-steward. No source, test, workflow or configuration changes were made in this consultation.
