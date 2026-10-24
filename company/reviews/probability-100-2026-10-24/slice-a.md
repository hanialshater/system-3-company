# Probability 100: slice A build

owner: demo-builder
date: 2026-10-24
status: built as drafts; independent verification and browser QA pending
source: `company/domains/briefs/2026-10-24-probability-100.json`, `builderSlice: A`

Implemented exactly 50 local lesson folders, each with `Demo.tsx`, `spec.ts` and `meta.json`. Each wrapper uses the actual kit `Lesson` and four `Control` elements. The shared mini-lab engine controls witness gating; local files compute all numeric cases without a whole-catalog import. No shared engine, dependency, protected path, existing lesson, board, event log or curriculum was modified by this builder.

The cases use seven representations: bars, curves, causal graphs, count grids, scatter plots, tables and timelines. Model mechanisms include exact resample enumeration, sample-variance enumeration, weighted estimands, two-period contrasts, Wald ratios, regression attenuation, AIPW cell expectations, selection/collider enumeration, structural intervention and dynamic equations. No participant responses or historical study results are fabricated.

All 600 learner-text/frame claims remain `unverified`, with no `checkedBy`. Source entry IDs, sections and original text remain in provenance. The source list is an idea pointer, not a verified bibliography. There are no invented QA or learner records. Source-based medical examples are explicit toy arithmetic; no clinical recommendation is made.

## Verification performed

`node --experimental-strip-types company/reviews/probability-100-2026-10-24/slice-a-check.mjs` passes strict spec validation for all 50 lessons and 100 independently stated numeric fixture assertions (two per lesson). The same script checks draft state, claim independence, transfer recalls, local curriculum addresses and copy length. These are builder checks, not independent fact checks or evidence of learning.

Particularly important finite checks: all 27 size-three bootstrap resamples; all four size-two variance samples; zero joint-distribution mismatch for the two compatible observational graph factorizations; expected AIPW .2 with correct propensity but misspecified outcome model, .44 with both misspecified; parallel-trend difference 5 unchanged by a shared shock; classical-noise slope 5/6; collider conditioning correlation −1 from an independent full population.

`npm run typecheck` passes with the composable shared renderer. Local `npm run check` reports 861 errors / four warnings: the inherited 811 plus exactly 50 missing curriculum concept messages because this isolated worktree intentionally does not contain the manager's new curriculum commit. Chief of staff must confirm those 50 disappear after integration. No local Lesson/Control static-check errors remain.

## Pre-flight v1

1. Title/hook: each metadata record has a distinct neutral scene/tension; hook budget ≤90 characters. Titles stay ≤40. The title is not the scored numeric answer.
2. Options: each prediction has three comparable numerical alternatives, or three explicit causal interpretations at matched precision. Full wording is local in `spec.ts`.
3. Locked stage: the shared engine renders neutral setup and disabled controls; no result picture is shown before commitment. This implementation assumption still needs independent browser inspection.
4. Reveal values: local equations compute both scenario summaries; reveal numbers match those retained summaries and the model's finite constants. The saved witness, not an unsaved active run, supports reset truth.
5. QA path: Run case then Compare completes both scenario milestones; Step permits inspection of inputs. Every local case has at least two distinct rendered frames. Browser execution remains pending.
6. Reset: shared engine preserves the saved question-case visualization and both summaries. This builder has not recorded a browser reset pass or learner verdict.
7. Phone fit: captions and summaries are short and reveals stay within the engine's 90-word validation budget. Actual 390×844 screenshots, measured crop and visual legibility remain for the independent QA/design review.

## Integration and remaining work

Chief of staff integrates the 50 folders with the category manager's curriculum and the platform engineer's shared renderer. Run registry, typecheck, production build, exact company-error delta and all 50 phone/desktop contract paths. Evaluation roles review artifacts before this account. Independent source/claim verification, learner evidence, launch review and tier-2 shared-engine readiness remain open; no status may be promoted on this build note alone.
