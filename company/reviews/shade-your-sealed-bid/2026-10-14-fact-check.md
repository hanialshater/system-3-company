# Fact-check: shade-your-sealed-bid (2026-10-14)

## Pass 22 (2026-10-14)

Checker: fact-checker (wrote none of these claims; builder ncm-e01). Method: read Demo.tsx learner-visible text (predict, stage captions/readouts, reveal) before the claim sources, then re-derived each number with my own node scripts (session scratchpad fc22/: bm.mjs, kn.mjs, kmp.mjs, nash.mjs, bid.mjs, sg.mjs, apply.mjs) or by hand. All external source hosts were blocked by the proxy (403); where a row cites a paper or book, only web-search snippets were seen and the row says so. Verdicts rest on the re-derivation, not on the unopened citation.

Easley & Kleinberg (2010) chapter placement checked against my knowledge of the book's table of contents (host blocked): ch. 9 - consistent; section numbers not checked.

| Claim | Verdict | Basis |
|---|---|---|
| c1 | verified | Own derivation: rival bid uniform on [0,50], P(win) = min(b,50)/50. Own LCG Monte Carlo (400,000 draws, scratchpad fc22/bid.mjs): 0.801 at $40, 1 at $50 and $60. |
| c2 | verified | Own grid (0.01 steps, 0..100): (80-b)min(b,50)/50 maximal at b = 40.00 with $32; $30 at 50, $20 at 60, $0 at 80; $31.98 at 39 and 41. |
| c3 | verified | From c1: chance 1 for b >= 50; slope 1/50 = 2 points per dollar below 50. |
| c4 | verified | Own derivation: against a rival bidding v/2 (v uniform 0..100), the best reply for every value v = 1..100 is v/2 (grid search, max deviation 0.000), so bidding half is a symmetric equilibrium (the standard symmetric one). Vickrey, J. Finance 16(1):8-37 (1961) confirmed as bibliographic data via search snippets; paper NOT opened. E&K ch. 9 (Auctions) placement agrees with my knowledge; section not checked. |
| c5 | verified | Convention, on stage: chip "Worth $80 to you · rival bids half of a $0-100 value"; reveal "A model: one rival, values spread evenly." |

**Result:** every claim in this lesson is now verified.
