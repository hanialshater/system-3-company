# Founder: keep the two unapproved production deploys (merges of PR #7 and PR #10)

owner: release-manager (verify and record) · date: 2026-10-18 · status: decided
class: release
route: founder → chief-of-staff (records; COE) → release-manager (verifies production against r10's settings, records the deploys) → principal-engineer-ops (COE review)
recorded by: chief-of-staff

## What happened

The chief of staff merged PR #7 (merge commit bcd102d7) and PR #10 (2902594b) into the production branch with merge messages that contained the literal marker the build filter looks for (in the sentence "No ... deploy marker", written with the bracketed word). `vercel.json`'s ignoreCommand builds any commit whose message contains it, so both merges deployed to production through Vercel's git integration, without the founder's approval and without `tools/deploy.mjs` (so without its pinned `SHOW_REVIEW` value and its release record). GitHub shows Vercel "Deployment has completed" on both commits.

Observed on production after the second deploy (chief of staff, 2026-10-18): the feed shows the default order (the personalised order was never merged; its flag is unset); new HQ pages answer 200 (/hq/rnd, /hq/personalization, /hq/evaluation; HQ was already public); `/api/account/settings` and `/api/auth/session` answer 404 (accounts still off); a lesson in review (`penalty-on-wiggle`) answers 200 (not compared with r10).

## What the founder said

> "Keep what’s live"  (founder, conversation, 2026-10-18, choosing between rolling back to r10 and keeping and verifying)

## What is decided

- Production stays on 2902594b. No rollback.
- release-manager verifies production against r10's intended settings (SHOW_REVIEW, accounts/likes/saves flags, HQ visibility) and records the two deploys in company/ops/releases.json as unapproved deploys the founder accepted after the fact, with this record's path as the approval. Any difference from r10's settings comes back to the founder before anything is changed.
- A COE is opened (company/ops/coe/ or the repo's COE location) for the marker in a merge message.

## Objections

- **chief-of-staff:** accepting after the fact must not become a precedent for deploying first and asking later. **Answer:** the COE records it as an error; the rule in CLAUDE.md is unchanged; the chief of staff writes no commit message containing the bracketed marker word, including in negations.
