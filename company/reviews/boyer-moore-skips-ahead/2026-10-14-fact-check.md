# Fact-check: boyer-moore-skips-ahead (2026-10-14)

## Pass 22 (2026-10-14)

Checker: fact-checker (wrote none of these claims; builder algo2-sc). Method: read Demo.tsx learner-visible text (predict, stage captions/readouts, reveal) before the claim sources, then re-derived each number with my own node scripts (session scratchpad fc22/: bm.mjs, kn.mjs, kmp.mjs, nash.mjs, bid.mjs, sg.mjs, apply.mjs) or by hand. All external source hosts were blocked by the proxy (403); where a row cites a paper or book, only web-search snippets were seen and the row says so. Verdicts rest on the re-derivation, not on the unopened citation.

| Claim | Verdict | Basis |
|---|---|---|
| c1 | verified | Own Horspool in node (scratchpad fc22/bm.mjs, written independently): 15 comparisons, 5 placements 0,7,9,15,17; slides 0:S->7, 7:P->2, 9:E->6, 15:P->2, 17:match. Matches HORS in Demo.tsx and the reveal (computed from HORS). |
| c2 | verified | Own naive search (scratchpad fc22/bm.mjs): 27 comparisons, 18 placements (0..17), 24 distinct text positions read; match at 17. Matches PLAIN in Demo.tsx. |
| c3 | verified | Own Horspool: 13 distinct text positions read, 24 - 13 = 11 never read. Reveal and lane readout compute T.length - read.size. |
| c4 | verified | Derivation re-done: shift(c) = m-1-(last index of c in P[0..5]); E (index 0; the E at 6 is excluded) 6, X 5, A 4, M 3, P 2, L 1, absent 7. Own node table matches SHIFT/TABLE in Demo.tsx and the stage's Slide row. |
| c5 | verified | At placement 0 text[6] = S (pattern end), S not in EXAMPLE; placements 1..6 all put a pattern letter over position 6, so none can match; own run's first slide is 7. Reveal sentence computed from HORS[0]. |
| c6 | verified | The sentence describes the stage's algorithm, which I traced (c1). Attribution: Horspool, Software: Practice and Experience 10(6):501-506 (1980) confirmed as bibliographic data by web-search snippets (Wikipedia, NIST DADS listings); the paper PDF host was blocked (proxy 403), so the paper itself was NOT opened. Boyer-Moore 1977 CACM 20(10) and CLRS ch. 32 not opened (from memory). |
| c7 | verified | Derivation: the largest table entry is the pattern length m (letter absent from the pattern), so the maximum jump grows with m. The O(nm) worst case / ~n/m typical in the source note is not learner-visible and was not checked. |
| c8 | verified | Own count: "HERE IS A SIMPLE EXAMPLE".length = 24 (node). |

**Result:** every claim in this lesson is now verified.

## Pass 24 (2026-10-14)

Checker: fact-checker (did not write these claims). Wave E revision. Method: read Demo.tsx first (every learner-visible string, every reachable branch and the state after any reset control), then build.md Pre-flight; re-ran every number in my own node scripts using the lesson's own logic (scratchpad fc24/). No builds. Web egress to source hosts is blocked (proxy 403); no claim below is verified on an unopened source alone.

| Claim | Verdict | Basis |
|---|---|---|
| c9 | verified | Own Horspool run: offsets 0 (S, slide 7), 7 (P, 2), 9 (E L P M matched, miss on I, slide 6 by E), 15 (P, 2), found at 17; 15 comparisons. slideLabel log: 'Horspool slides: S 7 · P 2 · E 6 (miss on I) · P 2 · found'. 'Placement 9' is the 0-based text offset of the third placement (not shown on stage). |

**Result:** all open claims verified; no disputes.
