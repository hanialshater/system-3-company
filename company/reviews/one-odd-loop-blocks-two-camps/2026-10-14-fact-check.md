# Fact-check: one-odd-loop-blocks-two-camps (2026-10-14)

## Pass 22 (2026-10-14)

Checker: fact-checker (wrote none of these claims; builder demo-builder). Method: read Demo.tsx learner-visible text (predict, stage captions/readouts, reveal) before the claim sources, then re-derived each number with my own node scripts (session scratchpad fc22/: bm.mjs, kn.mjs, kmp.mjs, nash.mjs, bid.mjs, sg.mjs, apply.mjs) or by hand. All external source hosts were blocked by the proxy (403); where a row cites a paper or book, only web-search snippets were seen and the row says so. Verdicts rest on the re-derivation, not on the unopened citation.

Easley & Kleinberg (2010) chapter placement checked against my knowledge of the book's table of contents (host blocked): ch. 5 - consistent; section numbers not checked.

| Claim | Verdict | Basis |
|---|---|---|
| c1 | verified | Own count (scratchpad fc22/sg.mjs): ring has enemies A-B, D-E = 2; loop A-B-C-D has A-B = 1; loop A-D-E-F has D-E = 1. |
| c2 | verified | Own brute force over 64 labellings, 7 links: 0 valid, minimum 1 broken. |
| c3 | verified | Own brute force with enemies A-B, C-D: loops 2, 2, 0; 2 valid labellings, both the split {A,D,E,F} vs {B,C}. |
| c4 | verified | Parity argument re-derived: k switches return to the start camp iff k is even. |
| c5 | verified | Own check on 3,000 random signed graphs (3-6 nodes): two-camp split exists iff every simple cycle has an even number of negative edges, 0 mismatches. Harary, Michigan Math. J. 2(2):143-146 (1953) confirmed as bibliographic data via search snippets; paper NOT opened. E&K ch. 5 (Positive and Negative Relationships; general-network balance in its advanced section) agrees with my knowledge of the book. |

**Result:** every claim in this lesson is now verified.
