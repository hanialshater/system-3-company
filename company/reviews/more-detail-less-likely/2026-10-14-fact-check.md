# Fact-check: more-detail-less-likely

## Pass 35 (2026-10-14, batch 2)

Checker: fact-checker. I did not write or build these claims. Scope: every claim in this lesson that was neither verified nor withdrawn. Method: I read Demo.tsx (and any model.ts) first on every reachable path, including replays, reduced motion and the lack of a Reset where there is none, then the claims. I re-ran the numbers in my own node scripts (session scratchpad fc35/), not imported from the lesson. No screenshot: the dev server on :3530 was not running. Web hosts are blocked from this session (proxy 403 / DNS failure), so no verdict rests on a source I could not open; the only outside sources I opened are PyPI packages (ht 1.2.0 property tables, pint 0.26.1 unit definitions), named where used.

| Claim | Verdict | Basis |
|---|---|---|
| c1 | verified | P(A and B) = P(A)P(B\|A) <= P(A). Own check of model.ts over every slider setting (lib 5..50 step 5, club 10..90 step 20): inner < outer in all 50, since the club slider stops at 90%. |
| c2 | verified | model.ts: librarians = round(1000 lib%), clubbers = round(librarians club%); header states the shares are a model chosen for the card. |
| c3 | verified | Own: librarians(20) = 200, clubbers(20, 90) = 180; librarians(10) = 100, clubbers(10, 90) = 90. Reveal quotes current club share and rings, plus the record at 90% only when it differs from the current state. |
| c4 | held (unverified) | HELD (not learner-visible). Tversky and Kahneman 1983 not opened (web blocked); the name and the Linda result need an opened source. |

**Result:** 3 verified, 0 disputed, 1 held (unverified), 0 withdrawn.

## Pass 38 (2026-10-14, set A)

Checker: fact-checker. I wrote and built none of these claims. Scope: every open claim in this lesson (set A of pass 38: ai, cs, math, physics, probability, economics, geography, lifehacks). Method: I read Demo.tsx (or the Life Hacks spec and engine) first, every learner-visible string, then the claims. I re-ran every number in my own node scripts (scratchpad fc38/: cluster.mjs, enemy.mjs, secret.mjs, plus inline runs), not imported from the lesson. Web: arxiv, publisher, government, Wikipedia and help-centre hosts return proxy 403 or fail DNS. Only raw.githubusercontent.com, PyPI and npm are reachable, so the sources I opened are files on GitHub (OpenStax CNXML, MicrosoftDocs, NetworkX, d2l, GRASS, GNOME/KDE source, the authors' own repositories, a papers-we-love PDF), each named in its row. Search-result snippets were not used as evidence. A claim whose source I could not open stays unverified.

| Claim | Verdict | Basis |
|---|---|---|
| c4 | unverified | HELD (not learner-visible). No source that supports it could be opened from this host: the cited hosts return proxy 403 or fail DNS, and only GitHub raw, PyPI and npm are reachable. I did not verify it from memory or from search snippets. Tversky and Kahneman 1983 not opened; OpenStax Psychology 2e (opened) does not mention the Linda problem. |

**Result:** 0 verified, 0 disputed, 1 held (unverified), 0 withdrawn.
