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

## Pass 22 (2026-10-14)

Checker: fact-checker (wrote none of these claims; builder algo-pair-09). Method: read Demo.tsx learner-visible text (predict, stage captions/readouts, reveal) before the claim sources, then re-derived each number with my own node scripts (session scratchpad fc22/: bm.mjs, kn.mjs, kmp.mjs, nash.mjs, bid.mjs, sg.mjs, apply.mjs) or by hand. All external source hosts were blocked by the proxy (403); where a row cites a paper or book, only web-search snippets were seen and the row says so. Verdicts rest on the re-derivation, not on the unopened citation.

| Claim | Verdict | Basis |
|---|---|---|
| c1 | verified | Pass 22 re-check of v3 (scratchpad fc22/kmp.mjs, own naive): 24 comparisons, alignments 0-5. Predict text states 24; stage tally reaches 24 at the end. |
| c2 | verified | Pass 22: own KMP: found at comparison 14, 0 back moves. Reveal computes KMP.length and backs(). |
| c3 | verified | Pass 22: own prefix function of AAAB = 0 1 2 0. Stage label reads "numbers under AAAB: A's kept after a miss"; reveal muted line "That table (0 1 2 0) is the fallback table". |
| c5 | verified | Pass 22: own traces, back move = text index lower than previous comparison: naive 1/3/5 after 5/14/24; KMP 0. Reveal uses backs() with the same definition. |
| c7 | disputed | DISPUTED (pass 22): the arithmetic is right (own trace: 3 + 5 x 2 + 1 = 14; table 2 under the third A gives a slide of 3 - 2 = 1, next comparison at the same text index). But the reveal sentence this claim addresses says the next comparison was "the same text letter, never one already read". That is false as written: own trace reads text positions 3..7 twice each (the miss, then the re-compare). Fix (builder): "never one to its left" / "never an earlier letter". |

**Result:** open after this pass: c7 (disputed blocks publishing until the builder fixes the stage text and the claim is re-checked).

## Pass 23 (2026-10-14)

Checker: fact-checker (wrote none of these claims; the two new claims are builder sentences recorded word for word). Method: read Demo.tsx (stage, every reachable branch, reveal, predict, plus the meta.json hook and recall card for new lessons) before claim sources; re-ran the numbers with my own node copies of the lesson logic (scratchpad fc23/). Sources: every scholarly host (cornell.edu, arxiv, journals, crossref, openalex, semantic scholar, Wikipedia, UPenn, UVM) was unreachable through the proxy, so no paper or book was opened. A claim that rests only on such a source is HELD as unverified, not verified; claims verified by derivation or simulation say so in their row.

| Claim | Verdict | Basis |
|---|---|---|
| c7 | verified | Re-traced the Demo KMP loop in my own node copy: 0/0 1/1 2/2 3/3x 3/2 4/3x 4/2 5/3x 5/2 6/3x 6/2 7/3x 7/2 8/3 = 14. All 5 misses come at j = 3, after AAA matched. Each next comparison is at the same text index with j = FAIL[2] = 2, so the offset i - j rises by exactly 1. The text index never decreases, so 'never one to its left' is true. 3 + 2 x 5 + 1 = 14. The reveal paragraph 2 wording (lines 193-195) matches the claim. |

**Result:** every claim in this lesson is now verified.
