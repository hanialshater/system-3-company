# Fact-check: lh-purchase-plus-running (2026-10-14)

## Pass 35 (2026-10-14, batch 3)

Checker: fact-checker (fresh instance; drafted none of this wording). Artifact: lifehacks/lh-purchase-plus-running v1. Method: read Demo.tsx and the shared Life Hacks engine (src/lib/lifehacks, src/components/lifehacks) first, tracing every reachable path, Reset (where present) and reduced motion; re-ran the numbers in node/Python with independent re-implementations; checked how-chosen notes. Web sources could not be opened from this host (web fetch DNS failure, proxy 403), so nothing here is verified on an unopened source. No screenshots: the dev server at localhost:3530 did not respond. Scripts: scratchpad fc35-3/.

| Claim | Verdict | Basis |
|---|---|---|
| c5 | verified | Unit identity, re-derived: 1 kWh = 1,000 W × 1 h, so a constant load of W watts for h hours uses W·h/1000 kWh; a per-kWh tariff makes running cost = kWh × price, and fixed costs are added separately. The lesson model matches: A = 80 + 120 × 0.30 × years, B = 140 + 60 × 0.30 × years. The watts clause is not on this lesson's stage (it states kWh/year directly). energy.gov.au not opened; the claim does not rest on it. Nit (builder): support could be 'derivation'. |
| c6 | unverified | Safety line 'Tariffs and appliance ratings vary: check your own.' renders under the assumptions (ResourceLesson). Source owed (a national energy body or tariff regulator); none could be opened from this host (web fetch DNS failure, proxy 403). Left unverified; re-check from a connected host or get a coordinator ruling on whether a caution line needs a source. |
