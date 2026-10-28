# Founder decision: ratify AMD-019, deploys only the founder can trigger (PR #26)

owner: evaluation-steward (the deploy gate) · decides: founder
date: 2026-10-28
status: decided; applied by the merge of PR #26 into main (commit under the `Amendment: AMD-019` trailer)
class: gates (constitutional surface)
route: S3 Donkey (proposal, PR #26) → founder (ratified) → integration engineer (merged, during the unification of main and the default branch)
recorded by: integration engineer
amendment: company/constitution/amendments/AMD-019-deploys-only-the-founder-triggers.md

## What the founder said

> **"Yes, ratify and merge (Rec.)"**  (2026-10-28)

The answer reached this run through the coordinating session, with the founder's other instructions of the same day
("We need to merge (check lessons later not now) all system 3 company prs, then move fully to system 3 lessons").
If it was not as quoted, the change reverts with one commit (revert the PR #26 merge).

## What was decided and applied

| Part | Applied |
|---|---|
| (a) Vercel's Git builds off | `vercel.json` `git.deploymentEnabled: false`; the ignore command builds only a commit whose subject line carries the marker and whose author login is the founder's |
| (b) the allow-list no longer pre-approves `npm run deploy:*` | `.claude/settings.json` |
| (c) three deploy files protected | `vercel.json`, `.github/workflows/deploy.yml`, `.claude/settings.json` added to `company/constitution/protected-paths.txt` |
| (d) founder settings outside the repository | not a commit: the `production` and `preview-deploy` environments with the founder as required reviewer and `VERCEL_TOKEN` as an environment secret. After the move these belong on `hanialshater/system3-lessons` |

## Objections

- **AMD-015's pre-approved withdrawal (travels with the decision).** With (a) and (d), the flag-off withdrawal that
  release-manager may run without asking first now also waits for the founder's approval of the `deploy.yml` run. The
  amendment as written takes way 1 ("accept the click", S3 Donkey's recommendation): a withdrawal is slower by the
  founder's reaction time. Way 2 (a reviewer-less `withdrawal` environment) is not written. CLAUDE.md's AMD-015
  sentence still reads as before; until a withdrawal job exists, "may run the flag-off withdrawal" means "may start
  the run; the founder's click releases it".
- **Not closed until M3 (a separate agent identity).** Agent sessions push as the founder, so (a)'s author check is
  narrowed, not closed, and a session holding a Vercel credential can still deploy past every Git gate. From the
  amendment, unchanged.
