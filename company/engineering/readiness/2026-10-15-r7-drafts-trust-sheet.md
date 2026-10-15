# Operational readiness: r7-drafts-trust-sheet

change: Drafts 404 on Vercel production (W-884/W-480); trust sheet and /api/meta serve learner-facing claims only (W-878); trust line excludes withdrawn claims (W-879)
change-tier: 2
paths: src/lib/visibility.ts, src/lib/trust.ts, src/lib/catalog.ts, src/lib/feed-index.ts, src/lib/feed-types.ts, src/app/d/[slug]/page.tsx, src/app/api/meta/[slug]/route.ts, src/components/DemoCard.tsx, src/components/Feed.tsx, tests/platform/*, package.json (scripts only)
author: platform-engineer
board: W-884, W-480, W-878, W-879
risks: R-003 rescored (proposed: drafts-reachable half in-place once deployed and checked; deploy-bypass half unchanged); R-005 rescored (proposed: trust sheet no longer leaks internal notes for review lessons)
links: branch r7-fixes (commit on that branch); founder decision company/decisions/2026-10-15-founder-show-review.md

Tier 2 because it touches `src/lib/catalog.ts` (data, visibility), `src/app/d/**` (every lesson page) and `src/app/api/**` (the /api/meta response shape). **Not approved. It must not ship until principal-engineer-ops adds approved-by below.** Not a kit-contract change: `src/kit/**`, `tests/qa/**`, `tools/company.mjs` and `src/kit/Lesson.tsx` are untouched, and no test id was renamed (one was added: `trust-claim`, `trust-source`).

## 1. What can fail
- Drafts leak anyway if a production build or runtime sees neither `VERCEL=1` nor `VERCEL_ENV=production` (rule in src/lib/visibility.ts). Vercel documents both as system env vars at build and runtime; `vercel build --prod` (deploy.mjs prebuilt path) is assumed to set them, not measured here. Who sees it: learners.
- `/api/meta/<slug>` shape changed: `claims[]` is now `{id,text,support,status,links}` (no `source`, `checkedBy`, `checkedOn`, no withdrawn claims). Any consumer reading `source` from the API breaks. In-repo consumers: DemoCard (updated) and Feed revisits (reads recall only). No tool reads /api/meta (grep).
- Local `next start` builds still show drafts (on purpose, so `npm run verify`, which runs the QA contract over drafts, stays green). A non-Vercel production host would show drafts unless `SHOW_DRAFTS=off`.
- Worst: drafts reachable in production again, silently.

## 2. How we would know
- tools/deploy.mjs production smoke curls the first unpublished lesson and expects 404. Caveat for the release manager: that first unpublished lesson is alphabetical and may be a review lesson, which now (founder decision) returns 200 on production with SHOW_REVIEW on, so the smoke check needs to pick a draft. Until it does, the meter is the manual check below.
- Manual post-deploy: `curl -o /dev/null -w '%{http_code}' https://system-3-company.vercel.app/d/rome-placed-too-far-east` must be 404, and `/api/meta/rome-placed-too-far-east` 404.
- Unit: `npm run test:platform` (13 tests). Not wired into `npm run verify` (that is the deploy path; proposed, not done).

## 3. How to roll back
`git revert <sha>` of the r7 commit, then a founder-approved deploy (runbook-deploy.md), or a Vercel rollback to the previous production deployment (minutes; it restores the draft leak and the notes). No data is lost either way.

## 4. Capacity
No new process, store or route. Per-lesson /api/meta JSON gets smaller (source records dropped). Static params for /d and /api/meta on production drop by the number of drafts (81 today). No CI or Vercel quota change.

## 5. Security
Reduces public surface: fact-check notes and draft lessons no longer reachable. New outbound links on the trust sheet: only http(s) URLs already in meta.json sources, localhost excluded, `target=_blank rel="noopener noreferrer"`, at most 3 per claim.

## 6. Data
No learner data, no writes. Content data only (meta.json read at build).

## 7. Risks
Proposes: the drafts half of R-003 (W-480) moves to in-place once deployed and the manual 404 check passes; the deploy-bypass half (G1) is untouched. Proposes a new low risk: draft hiding depends on Vercel system env vars (mitigation: deploy smoke picks a draft).

## Approval (tier 2; written by principal-engineer-ops)

- Decision:
- Conditions, each with a board id:
- What would make me revoke it:
- Objections raised, and what happened to each:
