# Fact-check: twenty-flips-run-of-five (2026-10-14)

## Pass 35 (2026-10-14, batch 3)

Checker: fact-checker (fresh instance; drafted none of this wording). Artifact: probability/twenty-flips-run-of-five v1. Method: read Demo.tsx first, tracing every reachable path, Reset (where present) and reduced motion; re-ran the numbers in node/Python with independent re-implementations; checked how-chosen notes. Web sources could not be opened from this host (web fetch DNS failure, proxy 403), so nothing here is verified on an unopened source. No screenshots: the dev server at localhost:3530 did not respond. Scripts: scratchpad fc35-3/.

| Claim | Verdict | Basis |
|---|---|---|
| c1 | verified | Independent brute force over all 2^20 sequences (not the DP): P(longest run ≥ 5) = 0.4584 → '45.8%'; ≥3 0.9791, ≥4 0.7684, ≥6 0.2369, ≥7 0.1151, matching model.ts exactAtLeast. Own mulberry32 port over seeds 1..100,000: 45.85%. |
| c2 | verified | Own port of mulberry32 and sequence(): seeds 1..1,000 give 475 runs of 5+ (47.5%), bins 14, 219, 292, 217, 143, 61, 54; seeds 1..1,001 give 476 (47.6% after rounding); sequence 1,001 = HHHHTTTTTHHHTTTTTHTT, longest 5. runMore adds seeds n+1..n+count in order; the stage draws sequence(tally.n), the latest. Seeds are not chosen. |
| c3 | verified | Brute force: P(longest = 4) = 0.3100, P(=3) = 0.2107, P(=5) = 0.2215; 4 is the mode. The reveal's 'tallest bar' is computed from the learner's tally: own run over every reachable tally size n = 1,000..30,000 (seeds in order) puts the tallest bar at 4 every time (0 exceptions); the first-max tie rule never fires. |
| c4 | verified | Independence: P(flip i = flip i-1) = P(H)P(H) + P(T)P(T) = 1/4 + 1/4 = 1/2. Reveal sentence matches. |
| c5 | disputed | Wrong number on a reachable path. The tally bins longest runs as ≤2, 3, …, 7, 8+, so atMost(t, k) cannot count 'k or less' for k ≥ 8: atLeast(t, k+1) is 0 for k ≥ 8, and atMost returns t.n, which counts the 9+ runs in the 8+ bin as 'that short'. Own run at n = 1,001 (QA path): learner taps with a longest run of 8 → reveal says '100.0% of real sequences stayed that short'; the true share of seeds 1..1,001 is 97.5% (exact 97.46%). Run 9 → shown 100.0%, true 99.0%; 12 → 100.0% vs 99.9%. k ≤ 7 is exact (k = 7: 94.6% both). Taps of 8+ in a row are reachable with the H/T buttons. Fix (builder): keep each longest run (or bins up to 20) so atMost is exact for every k, or word the k ≥ 8 case as '8 or more'. Blocks publishing. |
| c6 | unverified | Not learner-facing. Rests only on Bar-Hillel & Wagenaar (1991), Advances in Applied Mathematics 12(4), which could not be opened from this host (web fetch DNS failure, proxy 403). Left unverified; re-check from a host that can open it. |

Dispute c5 is on the board as W-498 (demo-builder). After the fix, a fact-checker re-checks it.

## Pass 36 (2026-10-14, W-637 re-check after the pass 35 fixes)

Checker: fact-checker (fresh instance per the W-280 ruling; drafted none of this wording, and was not a pass 35 session). Artifact: probability/twenty-flips-run-of-five v2. Order: read Demo.tsx and model.ts first, then the claim text, then the source fields, this file's Pass 35 table and build.md. Numbers re-run in node (and Python where noted) from copies of the lesson logic and independent re-implementations; no dev server, no screenshots (QA and reveal-fit are W-638, not this pass). Web sources could not be opened (tc39.es DNS failure), so nothing here rests on an unopened source. Scripts: session scratchpad fc36/.

| Claim | Verdict | Basis |
|---|---|---|
| c5 | verified | Ran a copy of model.ts v2 (strip-types) against an independent mulberry32 + longest-run tally for n = 1000, 1001, 1002, 1005, 2000, 2001, 3001 (batches then steps): atMost(t, k) equals the true count of longest run <= k for every k = 1..20, 0 mismatches. n = 1,001: k = 7 94.6%, 8 97.5%, 9 99.0%, 12 99.9%, 14+ 100.0% (exact by brute force over 2^20: 94.56, 97.46, 98.83, 99.89). k = 1 (alternating taps) prints 0.0% via the myRun >= 2 guard; true share is also 0 (no seed in 1..3001 has longest run 1). Note for builder: the first source sentence still describes v1 ('atMost(t, k) = t.n - atLeast(t, k+1)'); update it, no effect on the claim. |

## Pass 38 (2026-10-14, set A)

Checker: fact-checker. I wrote and built none of these claims. Scope: every open claim in this lesson (set A of pass 38: ai, cs, math, physics, probability, economics, geography, lifehacks). Method: I read Demo.tsx (or the Life Hacks spec and engine) first, every learner-visible string, then the claims. I re-ran every number in my own node scripts (scratchpad fc38/: cluster.mjs, enemy.mjs, secret.mjs, plus inline runs), not imported from the lesson. Web: arxiv, publisher, government, Wikipedia and help-centre hosts return proxy 403 or fail DNS. Only raw.githubusercontent.com, PyPI and npm are reachable, so the sources I opened are files on GitHub (OpenStax CNXML, MicrosoftDocs, NetworkX, d2l, GRASS, GNOME/KDE source, the authors' own repositories, a papers-we-love PDF), each named in its row. Search-result snippets were not used as evidence. A claim whose source I could not open stays unverified.

| Claim | Verdict | Basis |
|---|---|---|
| c6 | unverified | HELD (not learner-visible). No source that supports it could be opened from this host: the cited hosts return proxy 403 or fail DNS, and only GitHub raw, PyPI and npm are reachable. I did not verify it from memory or from search snippets. Bar-Hillel and Wagenaar 1991 not opened. |

**Result:** 0 verified, 0 disputed, 1 held (unverified), 0 withdrawn.

## Pass 40 (2026-10-14, W-852)

Checker: fact-checker (fresh instance). I wrote and built none of these claims. Scope: c6, the only open claim in this lesson. Method: I read Demo.tsx first. A grep finds no 'random', 'people' or 'human' string, which confirms that c6 is not learner-visible. Web: sciencedirect.com, doi.org, cris.huji.ac.il and the secondary hosts I tried (pmc.ncbi.nlm.nih.gov, europepmc.org, dlab.sauder.ubc.ca, labs.la.utexas.edu, srri.umass.edu) return proxy 403 from curl or ENOTFOUND from web fetch. I found no GitHub raw or PyPI copy of Bar-Hillel and Wagenaar (1991). I did not use search-result snippets as evidence.

| Claim | Verdict | Basis |
|---|---|---|
| c6 | unverified | HELD (not learner-visible). Source not opened (hosts above). There is nothing to re-derive in node: the chance baseline (repeat or switch with probability 1/2) is c4, which is already verified. The claim is about human behaviour and needs the empirical source. **Fallback (builder):** no learner sees this sentence, so delete c6 from meta.json; the reveal already compares the learner's own taps with the tally (c5). Alternatively, replace it with a derivation the stage supports, e.g. 'A fair coin switches faces half the time, so in 20 flips the longest run is usually 4 or more'. I checked that against all 2^20 sequences in my own node brute force: P(longest ≥ 4) = 0.7684. |

**Result:** 0 verified, 0 disputed, 1 held (unverified).
