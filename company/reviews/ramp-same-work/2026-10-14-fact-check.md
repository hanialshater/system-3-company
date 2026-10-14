# Fact-check: ramp-same-work (2026-10-14)

## Pass 19 (2026-10-14)

Checker: fact-checker (wrote none of these claims). Method: read Demo.tsx learner-visible text (static and dynamic) before claim sources, then re-derived each claim with own node scripts (scratchpad fc19b2: kmp.mjs, radix.mjs, hull.mjs) or by hand; book sources I could not open are marked as from memory per claim, with the number confirmed another way.

| Claim | Verdict | Basis |
|---|---|---|
| c5 | verified | 50 x 9.81 = 490.5 N (Demo.tsx G = 9.81, M = 50); with standard gravity 9.80665 m/s^2 (CGPM 1901) it is 490.3 N; 'about 490 N' holds either way. Predict text matches. |

**Result:** every claim in this lesson is now verified.

## Pass 22 (2026-10-14)

Checker: fact-checker (wrote none of these claims). Method: read Demo.tsx (stage, reveal, model) before claim sources; re-ran the numbers with my own node scripts copying the lesson's logic (scratchpad fc22); sources checked by web search where reachable. Source hosts (JSTOR mirrors, Wikipedia, the E&K book host) were blocked, so citations are confirmed bibliographically only and say so per claim.

| Claim | Verdict | Basis |
|---|---|---|
| c2 | disputed | Physics right (50 x 9.81 x 1 = 490.5 J; 490.5/4 = 122.625 N), but the sentence the log and reveal print, '122.6 N × 4 m = 490.5 J', does not multiply out: 122.6 x 4 = 490.4. The log rounds the push to 0.1 N and prints the unrounded product, so 4 of the 8 lengths mismatch (2 m: 245.3 x 2 = 490.6; 4 m: 490.4; 6 m: 81.8 x 6 = 490.8; 7 m: 70.1 x 7 = 490.7; 8 m: 61.3 x 8 = 490.4). r5 asked for the arithmetic to check; it still does not for the reveal's default 4 m. Fix (builder): write '≈' in the log and reveal, or show the push as 'weight × height ÷ length = 490.5 ÷ 4 = 122.6 N' and the work as 490.5 J without the product sign. |

**Result:** 1 claim disputed; the lesson cannot publish until the builder fixes the sentence and the claim is re-checked.

## Pass 23 (2026-10-14)

Checker: fact-checker (wrote none of these claims; the two new claims are builder sentences recorded word for word). Method: read Demo.tsx (stage, every reachable branch, reveal, predict, plus the meta.json hook and recall card for new lessons) before claim sources; re-ran the numbers with my own node copies of the lesson logic (scratchpad fc23/). Sources: every scholarly host (cornell.edu, arxiv, journals, crossref, openalex, semantic scholar, Wikipedia, UPenn, UVM) was unreachable through the proxy, so no paper or book was opened. A claim that rests only on such a source is HELD as unverified, not verified; claims verified by derivation or simulation say so in their row.

| Claim | Verdict | Basis |
|---|---|---|
| c2 | verified | Demo.tsx v4: the reveal reads 'finished at 490.5 J ≈ 122.6 N × 4 m (the push is rounded). A straight lift: 490.5 N × 1 m, the same 490.5 J', and the log prints 'L m: F N × L m ≈ W J'. Own node for L = 1-8: the pushes are 490.5, 245.3, 163.5, 122.6, 98.1, 81.8, 70.1, 61.3 N, and force(L) x L prints 490.5 every time. The rounded push times L is 490.4-490.8, which '≈' now covers. The reveal quotes the learner's last ramp of 4 m or more (4-8), all of which print correctly. 50 x 9.81 x 1 = 490.5 J = m g h. |

**Result:** every claim in this lesson is now verified.
