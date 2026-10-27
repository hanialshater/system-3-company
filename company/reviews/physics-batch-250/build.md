# Physics expansion — work in progress

The founder requested 250 physics lessons in one PR, with 3D where useful. This branch contains 18 draft lessons: the existing inclined-orbit projection prototype plus 17 additions. The other 232 are not yet implemented. The new group fills ten pre-existing physics curriculum gaps and adds seven orbit, relativity, photon and radioactive-decay concepts.

All claims remain unverified. The scenes show idealized two-case examples and need independent physics, learner and design review. The orbit prototype uses an orthographic 3D projection drawn in SVG. No browser/phone QA or walkthrough has been performed; no lesson is presented as ready to publish. Repeated two-case scenes need review for explanatory depth and redundancy.

Validation: `npm run typecheck` and `npm run build` pass. Independent arithmetic spot checks: Malus-law filter 12.5, rope 575.877 N, Carnot limit 0.5, equal-distance trip 40 km/h, and muscle force 150 N. `npm run check` gives the same pre-existing 810 errors and five warnings; `npm run verify` stops at two pre-existing publication-readiness failures. Browser binaries were not available. Board W-2115 tracks the unfinished 232.
