# Lessons World inspection: release plan

owner: release-manager
date: 2026-10-27
status: feasibility assessed; no deployment attempted
class: deploy
route: head-of-product → principal-engineer / principal-engineer-ops → release-manager

## Scope and authorization

The founder explicitly requests the world for all actual lessons, including content in open PRs, followed by PR integration and deployment for inspection while unchecked lessons remain visible. Product approved this sequence in `company/product/2026-10-27-world-all-lessons-inspection.md`. The earlier checks-first prerequisite in `2026-10-27-number-island-feasibility.md` is superseded for this scoped inspection. Preserve Published, Draft and In review metadata and all independent findings. No publish command, fabricated verification, gate edit or unrelated infrastructure release is authorized by this plan.

The release candidate must have independent readiness approval and focused code/build/navigation evidence. Release-manager does not approve its own readiness. Content verification remains incomplete and must be disclosed, but finishing hundreds of independent content checks is no longer an inspection prerequisite.

## Actual connection evidence

- Native Git and `github.com` HTML are reachable. The selected repository default is `ccr-4c6c7654-ew9ko1`, currently `f693857f43e49cb0d0e6a67f22e40e0953125a0e`, established by the coordinator's native `git ls-remote --symref origin HEAD`. Remote `main` is a different branch, so each PR must merge into its actual base or be explicitly integrated with provenance.
- Current `vercel.json` enables Git deployments and its ignore command permits builds for a commit message containing `[deploy]`. The checked-in build command is `npm run build`; that command builds rather than running full company verification. No configuration change is needed to try an explicitly authorized, focused-tested inspection deployment through the existing connection.
- Historical r15–r19 deployment receipts establish that marker commits on `ccr-4c6c7654-ew9ko1` produced production deployments and the canonical alias. They are evidence of past behavior, not proof that the connection still triggers now.
- The more recent r20 and r21 receipts explicitly say automatic builds did **not** appear. Those releases used a then-available existing Vercel project connection to create an exact-Git-SHA deployment. That connected deployment tool is not available in the current tool catalog. Consequently a marker push is a feasible trigger attempt, not a guaranteed release or a substitute for a receipt.
- Known existing project: `system-3-company`, project ID `prj_US7nNpj24KIFV5aIe27i2lqvD1Zq`, account `team_Ss0FbvX3HyCJMqitsy31SLPj`; canonical alias `https://system-3-company.vercel.app`. IDs and URL come from `2026-10-21-r21-production.json`, not a current settings read. Its past production source was selected default; current production-branch configuration cannot be established from Git alone.
- The local CLI/project binding and usable Vercel authentication are unconfirmed. Do not create a new project, log in interactively, ask for secrets in chat, invent credentials or copy historical credentials.
- Current live HTTP attempt to the canonical alias failed at the enforced sidecar: CONNECT tunnel 403. This is a network-policy denial, not an application HTTP failure or evidence that the website is down. API GitHub requests are likewise denied. Supported network configuration/permission must allow the actual API and hosted destinations before CLI/API or hosted smoke can be relied on. Never bypass the proxy.
- After the coordinator reported a supported network permission grant, ordinary canonical HTTP and `gh api` retries still returned CONNECT403/Forbidden from this executor. The observed sidecar restriction therefore remains unresolved here. CLI `whoami` with writable task-specific `/tmp` XDG directories reported Logged out; the inherited home config directory was absent/unwritable. No interactive login or credentials were created. A current GitHub commit page was fetched successfully with HTTP200, but its public HTML exposed no Vercel status/check URL. `/deployments` returned404. These pages do not establish deployment status. No live READY state or live World URL is claimed.

## Release sequence once the candidate exists

1. Record exact included PR heads, actual base branches, unique lesson count and unchanged editorial statuses. Integrate only lesson-related changes needed for this request. Keep unrelated deployment-policy proposal PR26 outside this release.
2. Obtain independent principal-engineer review/readiness for the exact candidate, including any required operational approval. Evidence must include successful install/typecheck/build, registry/world coverage equality, real PR-added lesson links, mobile/desktop Map/List navigation, keyboard/reduced-motion behavior, long titles, unknown destination fallback, bounded active-player loading and return restoration. Record inherited full-check failures separately without calling them green.
3. Prefer an inspection preview on a reviewed branch if the existing Git connection produces one. A `[deploy]` candidate commit pushed to that branch can request a build under current configuration; do not label it preview until the actual deployment receipt identifies its target. It must not silently promote a production alias.
4. If the existing project is confirmed to use selected default for production and an inspection release there is chosen under the founder's explicit request, release-manager may use the reviewed integrated SHA and marker trigger on that branch. The coordinator owns authorized PR/default integration. Do not force-push or change project production-branch settings. If no build appears, stop repeated marker commits and use the existing secure Vercel connection/CLI/workflow when it becomes available.
5. The existing manual `Deploy to Vercel` workflow is an alternative only when its configured API/environment route is available. It calls the unchanged full-verify wrapper and will still stop on inherited content failures. Do not silently weaken the wrapper or workflow to implement the founder's inspection exception; the existing Git build path is a distinct already configured mechanism.
6. Watch an actual deployment to READY and record the deployment ID, immutable URL, target, source SHA and alias. Check the hosted World, normal feed, one baseline lesson, and representatives of each integrated PR family. Compare a unique build asset or rendered source marker to the reviewed artifact. Screenshots should be captured from the hosted candidate as well as the local build when possible.
7. Write an honest deployment receipt and report the actual inspection URL. A pushed commit, successful local build, configured project ID, speculative branch alias or old canonical URL is not a completed deployment.

## Rollback

Before triggering, record the **currently serving** deployment/alias and its source; historical r21 is a reference, not proof of current live state. A branch preview needs no production rollback and can be withdrawn without touching the canonical alias. For a production inspection release, preserve the previous deployment and use the existing project's rollback/promote mechanism if available. If only native Git is available, create a normal additive revert of the scoped World/integration release and use the established marker trigger; never reset or force-push shared history. Confirm the resulting hosted source before claiming rollback complete. No rollback command is executable now without a recorded current deployment or reviewed release commit.

## Current disposition

Proceed with implementation and bounded independent inspection checks now. No broad content-review cleanup is required first. Deployment remains pending the concrete candidate/readiness and an observed successful existing connection. Network access is needed for a truthful hosted verification; this plan is not a deploy receipt and consumes no deployment approval.
