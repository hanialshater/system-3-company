# Correction of Error: 2026-10-14: `[deploy]` commits reached production before CI judged them, and WIP pushes used up the Vercel daily quota

owner: tools-lead (author, W-523; outside release and deploy) · reviewers: evaluation-steward, pattern-librarian
status: DRAFT. Timeline and evidence by principal-engineer-ops (incident commander). Five whys, "What allowed it" and actions are the author's to write. Ops does not finalise this record.
incident: ev-b27f3b93ae (SEV2, declared 2026-10-14 15:27 UTC in company/engineering/operations/2026-10-14-ops-review.md)
final path: company/rituals/records/2026-10-14-coe-deploy-bypass-and-quota.md (the author moves this file there with `git mv` and sets `status: final`; `tools/dispatch-check.mjs` R2 only sees files directly in company/rituals/records/)

One COE, two failure paths, because both come from Vercel building on git push outside our pipeline (ops review, section 3).

## What happened (facts, timestamps, links)
All times UTC, 2026-10-14. Sources: `git log`, the constitutional review (G1, J3), the retro corrections, the ops review.
- Before 12:58: Vercel's git integration built every pushed commit. WIP snapshot pushes (about 30 today, constitutional review G4) used up Vercel's 100 deployments per day, so production deploys were blocked for the rest of the day.
- 12:58 `f868127`: `vercel.json` `ignoreCommand` added so Vercel builds only commits whose message contains `[deploy]`. Its own message contains the marker (it describes the filter), so it also triggers a build.
- 13:01 `6b45ea0` `[deploy]`: Life Hacks, 200 lessons on the feed tagged "In review".
- 13:51 `91274b8` `[deploy]`: Life Hacks (200) and NCM (49) on the live feed.
- 14:27 `f4537d7` `[deploy]`: 54 new and revised lessons.
- 14:43 `5e8608d` `[deploy]`: edits the filter itself (reads `VERCEL_GIT_COMMIT_MESSAGE`) and redeploys. A `[deploy]` commit changed the control that decides what deploys (constitutional review J3).
- Five commits carry the marker (retro corrections; checked in git for this draft). The founder asked for these deploys; the rule that each deploy needs the founder's approval came after them (`company/decisions/2026-10-14-deploy-needs-founder-approval.md`).
- At every one of these deploys, every `ci` run since at least `f868127` was still `queued` (constitutional review G1). Vercel's git builds do not wait for `ci`, so `constitution` and `verify` were advisory for everything shipped.
- 15:27: SEV2 declared (ev-b27f3b93ae).

## Impact (learners affected, lessons, claims)
- Production received four content releases with no CI result (the 200 Life Hacks, 49 NCM and 54 new or revised lessons, shown tagged "In review").
- No unratified protected-path change is known to have shipped (constitutional review, audit 0), but nothing would have stopped one.
- Quota: production deploys were blocked for part of the day.
- Claims: 238+ unverified claims are visible behind the "In review" tag (G2). That exposure is a founder choice on watch, not part of this SEV2 (ops review section 1, W-479 item 4).

## Five whys (stop when the answers stop being about people)
Author to write. Questions the evidence leaves open:
- Why was the Vercel git integration, not `deploy.yml`, the working path to production? When was it last checked which path ships?
- Why can any agent type `[deploy]`, and why is the filter in an unprotected file that a `[deploy]` commit can edit?
- Why did WIP pushes reach a branch Vercel builds?
- Is the founder-approval rule a mechanism, or a sentence in CLAUDE.md? What enforces it?

## What allowed it
Author to write.

## Actions (each changes a mechanism; tracked on the board until done)
Author to keep, change or drop each row, and add the root-cause fix. Rows below are mechanisms already in place or on the board today, listed so they are linked, not as conclusions. The ops review's objection stands: the filter and the approval rule fix the quota (cost), not the bypass.

| Action | Mechanism changed | Owner | Board id |
|---|---|---|---|
| Containment (quota): Vercel builds only `[deploy]` commits | `vercel.json` `ignoreCommand` (`f868127`, `5e8608d`) | release-manager | W-480 (the filter is containment; W-480 replaces it as the gate) |
| Containment (who may ship): each deploy needs the founder's approval in conversation | CLAUDE.md rule + decision record `2026-10-14-deploy-needs-founder-approval.md` | founder; release-manager checks | W-480 |
| Fix (bypass): production deploys only via `deploy.yml` after green `ci`; drafts unreachable in production | Vercel git production builds off or a Deployment Check on `ci`; decision record | platform-engineer + founder | W-480 |
| Snapshots refuse protected paths and record `check` status; a `[deploy]` commit needs `check` green on that tree | `tools/snapshot.sh`, release-manager checklist | chief-of-staff (snapshot.sh), tools-lead (item) | W-482 |
| Hold app deploys while the S1 `/spike` route is open | release checklist | release-manager | W-534 |

## Claims and decisions to send back to review
- The "In review" display decision (G2) rested on CI and fact-check being the gate before learners. With CI advisory, that decision goes back to the founder (W-479 item 4).
- `company/decisions/2026-10-14-deploy-needs-founder-approval.md` presents a cost rule; the constitutional review (J3) shows it became the only release control. Author to say whether the decision record needs an amendment note.

## Pattern update
Pattern librarian, after the author's root cause. Candidate under test: "every shared resource needs an allocator before it needs a cleanup" (the Vercel quota is one). A second candidate for the author to test: "a control that sits outside the pipeline is advisory".
