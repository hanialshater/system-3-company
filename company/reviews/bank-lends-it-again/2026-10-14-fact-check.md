# Fact-check: bank-lends-it-again (2026-10-14)

## Pass 22 (2026-10-14)

Checker: fact-checker (wrote none of these claims; builder demo-builder). Method: read Demo.tsx learner-visible text (predict, stage captions/readouts, reveal) before the claim sources, then re-derived each number with my own node scripts (session scratchpad fc22/: bm.mjs, kn.mjs, kmp.mjs, nash.mjs, bid.mjs, sg.mjs, apply.mjs) or by hand. All external source hosts were blocked by the proxy (403); where a row cites a paper or book, only web-search snippets were seen and the row says so. Verdicts rest on the re-derivation, not on the unopened citation.

| Claim | Verdict | Basis |
|---|---|---|
| c1 | verified | Pass 22 re-check of v3: deposit(r) = 1000 x 0.9^(r-1): $900, $810, ...; reveal text "round 2 added $900 ... every round adds 90%" matches; caption shows this (c7). |
| c7 | verified | Pass 22: deposit(r,k) = 1000(1-k/100)^(r-1), so each is exactly (100-k)% of the one before; e.g. "round 3 adds $810 = 90% of round 2's $900". Non-blocking note: both sides are rounded to whole dollars, so some states show a visible gap (own scan: 12 states, worst "$12 = 80% of round 20's $14", true 11.20; also "$349 = 90% of $387"). Recommend "≈" or cents below $100. |

**Result:** every claim in this lesson is now verified.
