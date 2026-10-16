# Founder decision: catalog closeout, every unfinished lesson published or retired (F-46); deploy approved (F-47)

owner: head-of-product (the closeout) · release-manager (the deploy)
date: 2026-10-16
status: decided
class: product scope and release
route: chief-of-staff proposal → founder → head-of-product runs the closeout; release-manager runs the approved deploy
recorded by: chief-of-staff

## What the founder said
> "I get it but look I need the current lessons up, I need to know we finish them so I can focus on something else like personalization" · on the proposal: "Publish now, I approve closeout" (2026-10-16)

## F-47: deploy approved
The founder approved a production deploy of the lessons published in the repo (711 at approval time). It is this deploy only; any later deploy needs its own approval. The deploy goes through the runbook (company/ops/runbook-deploy.md): `npm run verify` must be green, and the release record cites this approval. If verify fails on the known feed spec (W-1451), the fix comes first. Verify is not bypassed.

## F-46: catalog closeout
1. **One fix round per lesson.** Each of the 258 unfinished lessons (draft or review at approval time) gets at most one fix round. After it, the lesson is published if its gates pass, or retired. No v3/v4 for these lessons.
2. **Dates:** the 64 lessons outside Life Hacks finish by **2026-10-20**, and the 194 Life Hacks lessons by **2026-10-23**. The 30 parked Life Hacks lessons are retired unless cm-lifehacks argues for one by 2026-10-18.
3. **F-36 is settled the same way:** for the Life Hacks engine v2 kill rule, each lesson is revised once, re-walked, then published or retired.
4. **Single owner:** head-of-product owns the closeout. Each day the chief of staff gives the founder one line (published, retired, left) and nothing else unless a founder decision is needed.
5. **New lesson building pauses** until the closeout is done. Exception: the builds already running (physics #64-68, mail c5b4) finish and enter the closeout under the same rule. First Light continues on its own track.
6. Gates are unchanged. The rule limits the number of rounds, not the checks.

## Objections
| Objection | Raised by | Status |
|---|---|---|
| Retiring a lesson after one round may lose good work that needed a second pass. | chief-of-staff | Open: retired lessons keep their files and records; a category manager can propose one back later, as new work. |
| 194 Life Hacks lessons in 7 days needs batch checks, and the shared review server is a single point. | chief-of-staff | Open: lane 10 batches by mail (F-42); the server is rebuilt on every merge round. |
| Pausing new builds slows the 10k goal. | chief-of-staff | Answered: the founder chose to finish the current catalog first; F-41 stays open for after the closeout. |
