# Fact-check: two-thirds-of-the-average (2026-10-14)

## Pass 22 (2026-10-14)

Checker: fact-checker (wrote none of these claims; builder ncm-e01). Method: read Demo.tsx learner-visible text (predict, stage captions/readouts, reveal) before the claim sources, then re-derived each number with my own node scripts (session scratchpad fc22/: bm.mjs, kn.mjs, kmp.mjs, nash.mjs, bid.mjs, sg.mjs, apply.mjs) or by hand. All external source hosts were blocked by the proxy (403); where a row cites a paper or book, only web-search snippets were seen and the row says so. Verdicts rest on the re-derivation, not on the unopened citation.

Easley & Kleinberg (2010) chapter placement checked against my knowledge of the book's table of contents (host blocked): ch. 6 - consistent; section numbers not checked.

| Claim | Verdict | Basis |
|---|---|---|
| c1 | verified | Own derivation, including the guesser's own effect on the average: with all guesses <= 100, target t(g) <= 200/3 and /g - t(g)/ is increasing in g for g >= t(g); random check (200,000 cases, n = 2..21) found 0 cases where 66.67 was not strictly closer than any guess above it. "Worse" here means farther from the target. |
| c2 | verified | Own node: 100(2/3)^k = 66.667, 44.444, 29.630, ..., 1.156, 0.771; first below 33 at k = 3, first below 1 at k = 12. |
| c3 | verified | Derivation: every x > 0 exceeds 100(2/3)^k for large k; 0 never deleted. Stage chip says "decimals allowed". |
| c4 | verified | Derivation: each round uses one more level of mutual knowledge of rationality; if others average m > 0 the best reply is positive. No empirical claim made. E&K ch. 6 (dominated strategies, advanced section) placement agrees with the course map (snippet-confirmed) and my knowledge. |

**Result:** every claim in this lesson is now verified.
