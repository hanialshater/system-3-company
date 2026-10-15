# Founder decision: keep "In review" lessons visible in production (W-479)

- **Date:** 2026-10-15
- **Decided by:** the founder, in the chief of staff's conversation ("2 show review")
owner: founder (recorded by chief-of-staff); release-manager (production config), platform-engineer (W-480)
date: 2026-10-15
class: deploy
route: release-manager → platform-engineer
recorded by: chief-of-staff

## Decision
Production keeps showing lessons in review, tagged "In review" (`SHOW_REVIEW` on, the current behaviour). Published lessons show untagged.

## What this does not cover
**Draft** lessons are a different status, and they should not be reachable in production. The smoke test of release 2026.10.15.1 found that `/d/rome-placed-too-far-east` (a History draft) returns 200 on https://system-3-company.vercel.app. That is W-480 (`findDemo` passes `includeDrafts:true`), and it is now the next production fix.

## Objections
- Lessons in review have not passed every gate, so a learner can meet an unverified claim. The "In review" tag and the trust line say so. The founder accepts this.
- W-878 (the trust sheet shows internal fact-checker notes) is more visible with review lessons on show. It goes in the next release.
