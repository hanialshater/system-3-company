# Founder ask: deploy one content hub demo

owner: release-manager
date: 2026-10-25
status: routed
class: engineering
route: principal-engineer → release-manager
recorded by: chief-of-staff

## What the founder said

> Also lets deploy one with the content hub

Source: this conversation, following the production physical architecture discussion.

## Scope and execution

The founder authorized one content-hub demo deployment. Prepare an isolated technical pilot with the already published sum-seven-ignores-first-die lesson, a dedicated artifact origin and a dedicated Next.js shell. The existing production app, its domains, learner data and editorial publication state are outside this change. The Git/build operator remains local for the pilot.

W-2030 tracks execution. [Plan](../rnd/content-hub/deployment-plan.md) and [current status/evidence](../rnd/content-hub/deployment-status.md). Local production build and full-flow checks pass. Independent production integration acceptance is not claimed.

## Objections

- Existing whole-app checks are red. **Answer:** do not deploy that whole-app tree or weaken its checks; prepare an independent, bounded host whose own production build/full flow passes, and preserve the existing failures in the report.
- The Vercel connection lacks team-scoped authorization. **Answer:** use the connector's authorize_team_access flow and wait for the user to grant access. Do not change accounts or bypass the scope restriction. No cloud resources/deployment have been created.

## Remaining action

Once team access is granted, deploy the prepared isolated resources and verify live revision switching/rollback without rebuilding the host. No second deployment approval is required for the already authorized pilot.
