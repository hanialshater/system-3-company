# Algorithms 200 · B4 build handoff

Owner: demo-builder · 2026-10-16 · 50 new draft lessons.

Topics: resource/subset DP, string indexing/automata, computational geometry,
number-theoretic algorithms, and numerical/linear algebra (10 per topic).
Every wrapper imports its own named spec and the shared witnessed-run renderer.
The model executes on demand, exposes actual intermediate states, and supplies
both a question fixture and contrasting case. Lesson-specific hooks, mechanisms,
and distinct transfer recalls are retained in each topic's `lessonDetails`.
All learner text is recorded as unverified; no review evidence is invented.

Preflight: the integrated checker, invoked with a temporary 50-row manifest,
reports **50 specs; 0 errors; 0 claim/overlap warnings**. Traces satisfy 2–64
frames, bounded phone-sized grids/graphs, deterministic execution, different
contrasting final state, 25-word stage budget and 90-word reveal budget.
The full shared witness contract is owned by the renderer, not duplicated here.

Retained arithmetic checks: `company/domains/briefs/checks/algorithms-200-3.mjs`.
Run it from any directory with Node; its loader resolves from this repository.
It checks all 50 question fixtures and retains output in the adjacent results
JSON. Independent checks enumerate subsets, tours, assignments, tilings,
substrings, matches, geometry pairs and covered unit cells; number theory uses
integer certificate checks and trial division; numerical models use residuals,
products, norm/orthogonality and exact-integral comparisons. This is local
finite-fixture validation, not independent claim verification or learner evidence.
Tie conventions and rounding are explicit in code: zero-based indices, inclusive
integer intervals, closed geometry bounds, deterministic iteration order,
6-significant-digit numerical and 4-decimal geometry display.

The question witness now includes the secant first intercept and Cholesky pivots
so the retained proof supports those predictions after subsequent exploration.
The 50-row results JSON supplies computed answers for CM reconciliation.
Isolated `npm run check` was run: it reports the expected 50 missing CM-owned
curriculum concepts and two stale generated registries in this pre-integration
worktree (52 errors, 5 warnings). Those shared outputs are intentionally owned
by integration; no local gate was bypassed.

Source acquisition and independent fact/design/learner/browser reviews remain
open; every new lesson stays draft. Integrated checks/build/browser verification
are assigned to chief of staff in the dispatch, not performed on the incomplete
isolated curriculum checkout. No dependencies, registry, board, deployment,
server or protected paths were changed by this batch.
