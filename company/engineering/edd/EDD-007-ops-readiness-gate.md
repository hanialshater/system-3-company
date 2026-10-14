# EDD-007: Operational readiness, checked by a tool

author: principal-engineer-ops (Rhea) · reviewers: principal-engineer (co-designer, Amendment 1) + tools-lead (would build it) + release-manager (affected: deploy) · tier: 2 (it gates deploys) · status: approved with changes (principal-engineer, 2026-10-14: company/engineering/reviews/2026-10-14-edd-007-review.md; conditions C1-C7 there; tools-lead and release-manager sections pending)
decision: company/decisions/2026-10-14-founder-risk-in-ops-review.md, Amendment 1. Template: company/rituals/templates/ops-readiness.md

## Problem and why now
The founder's words: "swes should have touch points with that process and get needed approval". The approval must be **checked by a tool, not stated in a document**. Today no tool asks whether a tier-2 change was thought through operationally. Every SEV2 on 10-14 involved a change that added load to a shared resource (CI per push, Vercel quota, host CPU and disk), or a path that skipped the pipeline. Nobody asked the capacity, meter or rollback questions before the change shipped.

## Goals / non-goals
- Goal: a tier-1 change ships only with a self-check record. A tier-2 change, or any change that touches deploy, the event API, auth or learner data, ships only with a record carrying `approved-by: principal-engineer-ops` (or `principal-engineer` when the change is in the ops area). A tool enforces both.
- Goal: no amendment. Use only unprotected surfaces.
- Non-goal: gating tier-0 work (lessons, copy, records). Non-goal: replacing EDDs, engineering reviews or amendments.

## Current state (with measurements)
- Change tiers exist in company/engineering/README.md (principal-engineer), but nothing checks them. Tier-2 reviews happen when someone remembers (EDD-003 to EDD-006 had reviews; the `/spike` route, W-477, shipped to production with none).
- Enforcement points, and whether they are protected: `npm run check` → `tools/company.mjs` (**protected**); `ci.yml` (**protected**); `tools/deploy.mjs` and `.github/workflows/deploy.yml` (not protected); `tools/dispatch-check.mjs` (not protected, CEO office, under review W-715); `package.json` scripts (not protected).

## Options considered
| Option | Cost | Risk | Reversibility |
|---|---|---|---|
| A. Do nothing: the template only | 0 | The founder's condition is not met; the record becomes ceremony nobody checks | — |
| B. Add the check to `npm run check` | Small code, but an **amendment** to `tools/company.mjs` | Slow (needs ratification); makes `check` red for everyone on someone else's change, which repeats R-016 | Amendment to undo |
| C. A CI job in `ci.yml` | Small, but an **amendment** | CI does not conclude today (R-002), and Vercel deploys do not wait for CI (R-003), so it would gate nothing | Amendment to undo |
| **D. `tools/readiness.mjs check --base=<sha>` called by `tools/deploy.mjs` before it builds, plus a dispatch-check warning (proposed)** | About 120 lines + node tests; ~5 lines in deploy.mjs; one rule in dispatch-check | Bypassed by Vercel git builds until W-480 lands (the same hole as CI) | Remove the call; no amendment |

## Proposal (option D)
1. **`tools/readiness.mjs check --base=<sha> [--head=HEAD]`** (read-only). It reads the changed paths from `git diff --name-only base..head` and classifies them with a path map in `company/engineering/readiness/paths.json`. The map is owned by principal-engineer, who owns change tiers, and principal-engineer-ops proposes entries. For each tier-1 or tier-2 path it needs a record in `company/engineering/readiness/` whose `paths:` globs cover the path. A tier-1 path needs `self-check:`. A tier-2 path needs `approved-by:` that names principal-engineer-ops or principal-engineer and differs from `author:`. The record must be committed at or before head. It exits 1 and lists each uncovered path with its tier. Tier-0 paths are ignored.
2. **The deploy is the gate.** `tools/deploy.mjs production` runs it with `--base` = the commit in the last production record in `company/ops/deployments/`, and refuses on exit 1. Production is where operational risk reaches learners, and every sanctioned deploy passes through this one command (runbook and `deploy.yml`). A founder override is allowed: `--override=<decision record>`, and the record is logged in the deployment JSON.
3. **Early warning.** dispatch-check gets rule **O1**. A `build` or `other` dispatch whose `--paths=` include a tier-2 glob prints WARN (not FAIL) when no record matches. The engineer writes the record before coding, not after.
4. **A test, not prose.** `tests/readiness/*.test.mjs`, outside the protected `tests/qa/**`, run by `npm run verify`. It covers a tier-2 path with no record (fail), one with a self-approved record (fail), one approved (pass), and a tier-0 path (pass).

Initial tier-2 map (superseded: the confirmed map is company/engineering/readiness/paths.json, see the review F1): `src/kit/**`, `src/lib/catalog.ts`, `tools/registry*`, `vercel.json`, `next.config.*`, `.github/workflows/**`, `package.json`, `package-lock.json`, `src/app/api/**`, `src/lib/events*`, `tools/deploy.mjs`, `tools/snapshot.sh`, any `src/**/auth*` or `src/**/db*`, and shared engines and templates used by more than 10 lessons (today `src/components/lifehacks/**` and `src/lib/lifehacks/**`). Initial tier-1 map: `src/app/**` (other), `src/components/**`, `src/lib/**` (other), `tools/**` (other), `src/app/hq/**`.

## Measurements that will show it worked (committed before implementation)
- Tier-2 changes deployed without an approved record: unknown today → 0. Command: `node tools/readiness.mjs check --base=<previous production sha>` on each deployment record.
- Median time from record to approval: target < 4 h (the approval must not become the bottleneck that slows review).
- would_be_wrong_if: within two weeks, more than 1 in 5 records are written after the change merged (ceremony after the fact, audit F10), or a tier-2 change reaches production through `deploy.mjs` without a record.

## Rollout and rollback
Week 1: the tool and tests, and dispatch-check O1 as WARN. The deploy call reports but does not refuse. After that, the deploy refuses. Rollback: remove the call from deploy.mjs. Until W-480 closes the Vercel git path (R-003), this gate is advisory in the same way CI is. That is stated, not hidden.

## Open questions and objections
- *"This is another check after an incident."* It adds no gate to tier-0 work, and tier-1 needs no approval. Only tier-2 and the deploy, event-API, auth and data classes wait on a person.
- *"principal-engineer-ops becomes a bottleneck."* If the median approval time is over 4 h for a week, delegate tier-2 approval for one team's own services to principal-engineer.
- Question for principal-engineer: should the path map live in company/engineering/README.md (prose) or `paths.json` (data the tool reads)? I propose data, generated into the README table.
