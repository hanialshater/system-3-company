# Engineering

owner: principal-engineer

Most changes here are small and safe: a new lesson, a wording fix, a curriculum entry. Treating
them like architecture would be a defect. A few changes can break every lesson at once, or are
expensive to reverse. Those get a design and a review. The tier decides which is which.

## Change tiers

| Tier | Examples | What it needs |
|---|---|---|
| **0: routine** | A lesson's own files, copy, curriculum and briefs, review records, docs | `npm run check`; lesson QA for lesson code |
| **1: shared, reversible** | Feed UI, catalog page, CLI commands outside the gates, CSS shared by lessons, the walkthrough tool | `npm run verify`; a changelog line; one reviewer (any engineer role) reads the diff |
| **2: critical** | The lesson kit or contract (`src/kit/`), data shapes (`meta.json` schema, registry), build/deploy config, new dependencies, anything touching every lesson, performance at scale, privacy and events, protected paths | An **EDD** before code, an **engineering review** before merge, an **ADR** if the decision is expensive to reverse, `npm run verify` on the integrated tree, and a rollback plan. If it is a protected path, also an **amendment**. |

Which paths are which tier is data: [readiness/paths.json](readiness/paths.json) (ordered rules, first match wins, protected paths always tier 2, unmatched paths tier 1). `tools/readiness.mjs` reads it (EDD-007). Tier 1 and tier 2 also need an [operational readiness record](readiness/README.md).

When unsure, ask the principal engineer. Do not upgrade tier-0 work "to be safe".

## Documents

| Doc | When | Template | Where |
|---|---|---|---|
| **EDD** (engineering design doc) | Before a tier-2 change | [edd/TEMPLATE.md](edd/TEMPLATE.md) | `edd/EDD-<n>-<slug>.md` |
| **ADR** (architecture decision record) | A decision that is expensive to reverse, or that others will ask "why?" about | [adr/TEMPLATE.md](adr/TEMPLATE.md) | `adr/ADR-<n>-<slug>.md` |
| **Engineering review** | Before merging tier-2 | `rituals/templates/eng-review.md` | `rituals/records/<date>-eng-review.md` |

An ADR is never edited after it is accepted. A later ADR supersedes it, and the old one says by which.

## Index

| ID | Title | Status |
|---|---|---|
| [ADR-001](adr/ADR-001-nextjs-static-lessons.md) | Next.js with statically generated lesson pages and a generated registry | accepted |
| [ADR-002](adr/ADR-002-geo-kit.md) | The geo kit: d3-geo + Natural Earth 1:110m, bundled | accepted |
| [ADR-003](adr/ADR-003-no-lesson-code-on-server.md) | Lesson code never runs on the server | proposed |
| [ADR-004](adr/ADR-004-content-addressed-lesson-versions.md) | Lessons are immutable, content-addressed versions | proposed |
| [ADR-005](adr/ADR-005-independent-lesson-bundles.md) | Lessons build independently against a versioned kit | proposed |
| [ADR-006](adr/ADR-006-sandboxed-lesson-frame.md) | Sandboxed cross-origin lesson frame with a postMessage bridge | proposed |
| [ADR-007](adr/ADR-007-manifest-is-the-registry.md) | The manifest is the registry; rollback is a pointer change | proposed |
| [ADR-008](adr/ADR-008-better-auth-magic-link.md) | Accounts are Better Auth magic links in our own Postgres, optional, invisible to the beacon | proposed (spike W-1135) |
| [ADR-009](adr/ADR-009-postgres-on-neon-eu.md) | One Postgres on Neon via Vercel, Frankfurt, plain SQL migrations, no preview copies of learner rows | proposed (spike W-1135) |
| [EDD-001](edd/EDD-001-feed-at-500-lessons.md) | The feed at 500+ lessons | proposed |
| [EDD-002](edd/EDD-002-vercel-deploy-command.md) | Executable Vercel deployment | proposed (PR) |
| [EDD-003](edd/EDD-003-lesson-storage-at-scale.md) | Lesson storage and loading at 10k–1M (client-side bundles, hybrid) | approved with changes ([review](../rituals/records/2026-10-13-eng-review-lesson-storage.md), 2026-10-14) |
| [EDD-004](edd/EDD-004-knots-kit.md) | Promote the knots library (gen2-force-smooth) to `src/kit/knots` | approved with conditions ([review](../rituals/records/2026-10-14-eng-review-EDD-004.md)); moved. Addendum A: kit drawing → fix1-bigon (tier 2, approved, shipped) |
| [EDD-007](edd/EDD-007-ops-readiness-gate.md) | Operational readiness, checked by a tool (`tools/readiness.mjs` from `deploy.mjs`, dispatch-check O1) | approved with changes ([review](reviews/2026-10-14-edd-007-review.md), 2026-10-14); advisory until W-480 |
| [EDD-008](edd/EDD-008-accounts-and-server-progress.md) | Optional accounts and server-side progress (anonymous first, merge on "Keep my history") | proposed, draft 1 (data model for W-965) |
| [SPIKE-001](spikes/SPIKE-001-frontend-sandbox.md) | 3 lessons as content-hashed bundles in a sandboxed cross-origin iframe (EDD-003 stage-1 spike) | done: go with changes (accepted in the EDD-003 review, 2026-10-14) |
| [SPIKE-002](spikes/SPIKE-002-accounts-plan.md) | Better Auth + pg on Next 16.4 against the EDD-008 schema | planned (phase 2) |

See also [best-practices.md](best-practices.md).
