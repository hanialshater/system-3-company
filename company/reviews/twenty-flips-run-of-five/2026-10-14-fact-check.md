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
