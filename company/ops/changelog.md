# Changelog

## 2026-10-13: release-manager deployment workflow
- `npm run deploy -- preview|production` and `/deploy`: linked-project validation, full verification,
  staged production, hosted smoke checks and durable deployment records. CLI pinned at 63.1.2.
- Production visibility applies to the feed, map and direct lesson pages; unpublished lesson URLs
  return 404 with `SHOW_REVIEW=off`. Preview keeps direct draft URLs for author QA.
- Validation: 13 deployment tests, 646 browser checks, and published-only production checks passed.
- No live deployment performed; account login/project link is one-time setup.
- GitHub Actions pipeline: automatic previews after successful default-branch CI; explicit manual
  production. CI uses locally built Vercel output, scoped deployment environments, pinned actions,
  run summaries and release-record artifacts. No GitHub write token is needed.

## 2026-10-12: founding
- App: vertical feed, lesson kit (predict → explore → reveal), spaced revisits, trust sheet, map, event beacon.
- Company: 26 roles (25 agents), constitution, 13 rituals with templates, gates, CLI, computer-use QA.
- Lessons: see `npm run company -- status`.
- 2026-10-12: geo kit re-exports geoProjection, geoConicEqualArea, geoStereographic (additive; cm-geography request).
- 2026-10-12: kit adds useMilestones (earn-the-reveal helper) and an .active:disabled style (wave 1 builder requests).
- 2026-10-12: kit adds src/kit/random.ts (mulberry32); standard documents QA control order and seed disclosure.
- 2026-10-13: reveal phase no longer squeezes the stage; the card body scrolls (tier 1, shared CSS).
- 2026-10-13: kit adds <Milestones> component (no inner Stage boilerplate needed); useMilestones always calls the latest interact.
- 2026-10-13: metrics count only learner verdicts on the current lesson version (revised lessons show 'needs re-review').
