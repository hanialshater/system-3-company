# Fact-check: lh-purchase-plus-running (2026-10-14)

## Pass 35 (2026-10-14, batch 3)

Checker: fact-checker (fresh instance; drafted none of this wording). Artifact: lifehacks/lh-purchase-plus-running v1. Method: read Demo.tsx and the shared Life Hacks engine (src/lib/lifehacks, src/components/lifehacks) first, tracing every reachable path, Reset (where present) and reduced motion; re-ran the numbers in node/Python with independent re-implementations; checked how-chosen notes. Web sources could not be opened from this host (web fetch DNS failure, proxy 403), so nothing here is verified on an unopened source. No screenshots: the dev server at localhost:3530 did not respond. Scripts: scratchpad fc35-3/.

| Claim | Verdict | Basis |
|---|---|---|
| c5 | verified | Unit identity, re-derived: 1 kWh = 1,000 W × 1 h, so a constant load of W watts for h hours uses W·h/1000 kWh; a per-kWh tariff makes running cost = kWh × price, and fixed costs are added separately. The lesson model matches: A = 80 + 120 × 0.30 × years, B = 140 + 60 × 0.30 × years. The watts clause is not on this lesson's stage (it states kWh/year directly). energy.gov.au not opened; the claim does not rest on it. Nit (builder): support could be 'derivation'. |
| c6 | unverified | Safety line 'Tariffs and appliance ratings vary: check your own.' renders under the assumptions (ResourceLesson). Source owed (a national energy body or tariff regulator); none could be opened from this host (web fetch DNS failure, proxy 403). Left unverified; re-check from a connected host or get a coordinator ruling on whether a caution line needs a source. |

## Pass 38 (2026-10-14, set A)

Checker: fact-checker. I wrote and built none of these claims. Scope: every open claim in this lesson (set A of pass 38: ai, cs, math, physics, probability, economics, geography, lifehacks). Method: I read Demo.tsx (or the Life Hacks spec and engine) first, every learner-visible string, then the claims. I re-ran every number in my own node scripts (scratchpad fc38/: cluster.mjs, enemy.mjs, secret.mjs, plus inline runs), not imported from the lesson. Web: arxiv, publisher, government, Wikipedia and help-centre hosts return proxy 403 or fail DNS. Only raw.githubusercontent.com, PyPI and npm are reachable, so the sources I opened are files on GitHub (OpenStax CNXML, MicrosoftDocs, NetworkX, d2l, GRASS, GNOME/KDE source, the authors' own repositories, a papers-we-love PDF), each named in its row. Search-result snippets were not used as evidence. A claim whose source I could not open stays unverified.

| Claim | Verdict | Basis |
|---|---|---|
| c6 | unverified | HELD. Rendered warning line. No source that supports it could be opened from this host: the cited hosts return proxy 403 or fail DNS, and only GitHub raw, PyPI and npm are reachable. I did not verify it from memory or from search snippets. The source is still owed (a national energy body or tariff regulator), and none is named or reachable. As in pass 35: it needs an openable source, or an evaluation-steward ruling on whether a safety hedge is a factual claim. |

**Result:** 0 verified, 0 disputed, 1 held (unverified), 0 withdrawn.
