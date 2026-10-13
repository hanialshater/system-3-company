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
| [EDD-001](edd/EDD-001-feed-at-500-lessons.md) | The feed at 500+ lessons | proposed |
| [EDD-002](edd/EDD-002-vercel-deploy-command.md) | Executable Vercel deployment | proposed (PR) |
| [EDD-003](edd/EDD-003-lesson-storage-at-scale.md) | Lesson storage and loading at 10k–1M (client-side bundles, hybrid) | proposed (review open) |
| [SPIKE-001](spikes/SPIKE-001-frontend-sandbox.md) | 3 lessons as content-hashed bundles in a sandboxed cross-origin iframe (EDD-003 stage-1 spike) | done: go with changes |

See also [best-practices.md](best-practices.md).
