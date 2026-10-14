# Fact-check: kmp-never-steps-back (2026-10-14)

## Pass 19 (2026-10-14)

Checker: fact-checker (wrote none of these claims). Method: read Demo.tsx learner-visible text (static and dynamic) before claim sources, then re-derived each claim with own node scripts (scratchpad fc19b2: kmp.mjs, radix.mjs, hull.mjs) or by hand; book sources I could not open are marked as from memory per claim, with the number confirmed another way.

| Claim | Verdict | Basis |
|---|---|---|
| c1 | verified | Own node script (scratchpad fc19b2/kmp.mjs, own naive search): alignments 0-5 at 4 comparisons each = 24; match at offset 5. |
| c2 | verified | Own KMP (CLRS-style prefix function, written independently): trace 0/0 1/1 2/2 3/3x 3/2 4/3x 4/2 5/3x 5/2 6/3x 6/2 7/3x 7/2 8/3 = 14, found at 5, 0 back moves; agrees with indexOf on 50,000 random binary cases. Matches Demo.tsx KMP loop. |
| c3 | verified | Own prefix function of AAAB = 0 1 2 0 (and by hand: A, AA, AAA have borders 0, 1, 2; AAAB has none). Matches FAIL in Demo.tsx and the reveal text. |
| c4 | verified | Own traces: first false comparison is number 4 in both (text 3 vs pattern 3, A vs B). |
| c5 | verified | Own traces, back move = text index lower than previous comparison's: naive 1/3/5 after 5/14/24; KMP 0. Same definition as backs() in Demo.tsx. |
| c6 | verified | Derivation: potential 2i - j rises by at least 1 per comparison (match: +1; miss with j>0: j drops; miss at j=0: +2), is 0 at start and at most 2n - j at the end, and equality would need j=0 at the end with every step +1, impossible since the last step is then a j=0 miss (+2) or a match ending with j=M>0; so comparisons < 2n. Text index never decreases by construction. Own random check (50,000 cases, n<=30, m<=6): max ratio 1.92, never >= 2, never a back move. KMP 1977 / CLRS 4e 32.4 not opened (from memory; bound re-derived). |

**Result:** every claim in this lesson is now verified.
