# Experiments

`EXP-<n>-<slug>.md`. Owner: analytics steward (process) and the proposing role (content).

Required sections, in this order (`npm run check` enforces the order of the first two):

1. `## Hypothesis`
2. `## Committed prediction`, written and committed **before** any result exists, including a `would_be_wrong_if:` line
3. `## Design`: arms, including the simpler baseline that is allowed to win; sample; period; what each competing explanation predicts
4. `## Result`: added later, never by editing section 2
5. `## What changed because of it`

Before reading a result: check sample ratios, logging changes and novelty effects. Anything that
looks interesting is probably wrong until those checks pass.

| ID | Title | Status |
|---|---|---|
| EXP-001 | [Planted false claim](EXP-001-planted-false-claim.md) | designed, not run |
| EXP-002 | [Real-learner recall](EXP-002-real-learner-recall.md) · [run kit](EXP-002-run-kit.md) | designed, not run; run kit 2026-10-17, waits on the founder recruiting 5 adults and a committed P-list (EXP-002/predictions.md) |
| EXP-004 | [First Light prediction swap: first-revisit recall (PRD-003)](EXP-004-first-light-prediction-swap-recall.md) | registered 2026-10-16, not run; comparison, P2 and guardrail blocked on instruments |
| EXP-005 | [First Light challenges: first-revisit recall, 20% holdout (PRD-004)](EXP-005-first-light-challenges-recall.md) | registered 2026-10-16, not run; guardrail blocked on an instrument |
| EXP-006 | [Launch predictions for r6 and r7 (cut-the-busiest-link, four NCM gap lessons)](EXP-006-launch-predictions-r6-r7.md) | committed 2026-10-16 before any deploy carrying them, not run; F1/F2 blocked on an instrument |
| EXP-007 | [Launch predictions for launch review r8 (tricolour-check v2, draw-a-table-knot v3; Amendment 1: unknot-game v2)](EXP-007-launch-predictions-r8-knots.md) | committed 2026-10-17 before publish and before any deploy carrying them, not run; F1-F4 blocked on an instrument (W-1600, privacy-reviewer) |
| EXP-008 | [Launch predictions for math/left-or-right v3 (knot chirality; standard and mirrored-branch reveal openers)](EXP-008-launch-predictions-left-or-right.md) | committed 2026-10-17 before publish and before any deploy carrying it, not run; F5/F6 blocked on W-1600, O1/O2 on an opener field that does not exist |
| EXP-009 | [Meta phase 0: measurement integrity of the run record](EXP-009-meta-measurement-integrity.md) | registered 2026-10-20 before any reconciliation, not run; build W-2026 (tools-lead), acceptance W-2027 (analytics-steward), project tag W-2028 |
| EXP-010 | [Lesson frames pilot, 50 lessons: build and launch predictions P1-P6](EXP-010-lesson-frames-pilot-predictions.md) | committed 2026-10-25 before the Next upgrade and any artifact build; builder's local results 2026-10-26: P1, P4, P5, P6 held; P2 frame lines held, in-app ±10% wrong in 1 of 3 rounds; P3 frame copy 100/100; preview run W-2094 pending |
| EXP-011 | [Lessons World exploration and one-week recall](EXP-011-lessons-world.md) | registered as EXP-009, renumbered 2026-10-28 (main had EXP-009); preregistered 2026-10-27 by the commit containing this row; awaits head-of-product/Privacy review, comparison authorization, observable instruments, budget guardrails and green checks; NOT run |
