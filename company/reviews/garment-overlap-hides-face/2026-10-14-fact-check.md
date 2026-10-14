# Fact-check: garment-overlap-hides-face (2026-10-14)

## Pass 35 (2026-10-14, batch 3)

Checker: fact-checker (fresh instance; drafted none of this wording). Artifact: lifehacks/garment-overlap-hides-face v1. Method: read Demo.tsx and the shared Life Hacks engine (src/lib/lifehacks, src/components/lifehacks) first, tracing every reachable path, Reset (where present) and reduced motion; re-ran the numbers in node/Python with independent re-implementations; checked how-chosen notes. Web sources could not be opened from this host (web fetch DNS failure, proxy 403), so nothing here is verified on an unopened source. No screenshots: the dev server at localhost:3530 did not respond. Scripts: scratchpad fc35-3/.

| Claim | Verdict | Basis |
|---|---|---|
| c5 | verified | Transfer prompt in home-lessons.ts spec.recall; not rendered anywhere. Its presupposition (an overlap hides both touching faces) matches the 'overlap' model, exposed = 4ab − 2·overlap·b. Convention. Owner may withdraw it as unrendered. |
