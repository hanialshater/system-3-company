# System 3 Meta: moved

> **Moved (2026-10-25):** System 3 Meta, company zero of the System 3 city, now lives in its own repository,
> **`hanialshater/system3-meta`**: the kernel, the starter HQ, onboarding, the contracts, its records, knowledge base and
> benchmarks. Make Meta changes there (decisions: `docs/decisions/2026-10-25-repositories.md` in that repository).
> The city (the public registry and shared knowledge) is **`hanialshater/system3-city`**.

What stays here is System 3 Company's own side of the connection, `adapters/s3c/`:

- `org-from-roles.mjs`: System 3 Company's org tool for the city HQ (the org contract over `tools/org/roles.mjs`,
  `people.mjs` and the HQ's seating). Standalone; its test is `adapters/s3c/org.test.mjs`.
- The other adapters (gates, publish, claims, board mirror, events export, …) drive this company's lesson flow through
  the Meta kernel (milestones M4-M7). They need the kernel beside them: run them with a checkout of
  `hanialshater/system3-meta`, until System 3 Company takes Meta as a versioned dependency (MIGRATION.md, step 5).

The history of Meta's work before the move is in this repository's git history under `company/sibling/system3-meta/`.
