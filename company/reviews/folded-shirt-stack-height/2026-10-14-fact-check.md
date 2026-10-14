# Fact-check: folded-shirt-stack-height (2026-10-14)

## Pass 35 (2026-10-14, batch 3)

Checker: fact-checker (fresh instance; drafted none of this wording). Artifact: lifehacks/folded-shirt-stack-height v2. Method: read Demo.tsx and the shared Life Hacks engine (src/lib/lifehacks, src/components/lifehacks) first, tracing every reachable path, Reset (where present) and reduced motion; re-ran the numbers in node/Python with independent re-implementations; checked how-chosen notes. Web sources could not be opened from this host (web fetch DNS failure, proxy 403), so nothing here is verified on an unopened source. No screenshots: the dev server at localhost:3530 did not respond. Scripts: scratchpad fc35-3/.

| Claim | Verdict | Basis |
|---|---|---|
| c5 | verified | Transfer prompt in home-lessons.ts spec.recall; no component renders it (only meta.json recall is shown), so it does not reach the learner. Presupposition (smaller folds give a taller stack) matches the 'layers' model: height = N × 0.4 × layers. Convention. Owner may withdraw it as unrendered. |
| recall | verified | Own arithmetic: 5 × 0.4 × 2 = 4 cm (the stated stack), 5 × 0.4 × 4 = 8 cm; doubling layers halves the footprint and doubles height in the ideal sheet model. Keyed '8 cm' is the only correct option; the compression caveat matches the limit line. |
