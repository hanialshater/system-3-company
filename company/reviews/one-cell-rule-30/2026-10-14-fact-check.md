# Fact-check: one-cell-rule-30 (2026-10-14)

## Pass 21 (2026-10-14)

Checker: fact-checker. Method: read Demo.tsx (stage, question, reveal) against each open claim, re-ran the lesson's own model in node (scratch scripts extracting or re-implementing it), and tried each named source. Most source hosts are blocked to fetch; where only a web-search extract was available, the row says so.

| Claim | Verdict | Basis |
|---|---|---|
| c1 | disputed | Numbers re-run (Demo.tsx grow(), 17-cell row): Rule 30 counts 1,3,3,6,4,9,5,12,7, Rule 90 row 8 = 2. DISPUTED: the reveal sentence this claim records says the counts went '1, 3, 3, 6, 4, 9, 5, 12, 7 with no pattern', and the shown counts have an obvious one (odd steps 3, 6, 9, 12; even steps rise 1, 3, 4, 5, 7). The run breaks only at step 9 (12, not 15). Fix: drop 'with no pattern', or say the run does not last (step 9 gives 12, step 10 gives 11). |
| c2 | verified | Re-derived: 30 = 00011110 gives 111..000 -> 0,0,0,1,1,1,1,0, matching the question and TILES; bit n of 90 equals left XOR right for all 8 neighbourhoods (node). Wolfram 1983 RMP not opened; the sentence depends only on the numbering, which is checked by computation. |
| c3 | verified | Uniform update: by grow(). Irregular right side: 201-cell run to step 16 shows a regular stripe on the left edge and irregular triangles on the right. No known formula: OEIS A070952 (counts of 1s, Rule 30) lists the sequence, Mathematica/Haskell one-liners and the trivial relation a(n) = 2n+1 - A070951(n), no closed form (seen through a web-search extract; oeis.org itself blocked). Moderate confidence: 'not known' is an absence claim. |
| c4 | verified | Follows from c1 and c3 (counterexample). |
| c5 | verified | Re-ran: centre columns 110111001 (Rule 30) and 100000000 (Rule 90), steps 0-8. |
| c6 | verified | NKS p. 317 (ch. 7, 'The Intrinsic Generation of Randomness'): web-search extract of wolframscience.com/nks/p317 says Mathematica's Random[Integer] has long produced its bits from the Rule 30 centre column; Wikipedia (Rule 30) and a Wolfram Demonstration agree. Page reached only through the search index (host blocked to fetch); no conflicting source. |
