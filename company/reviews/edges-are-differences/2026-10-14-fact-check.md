# Fact-check: edges-are-differences (2026-10-14)

## Pass 21 (2026-10-14)

Checker: fact-checker (did not write these claims). Method: read Demo.tsx (every learner-visible string, including computed and state-dependent ones) before the claim sources; re-ran every number in my own node scripts (scratchpad fc21/); checked sources by web search where reachable (most hosts, including the Easley-Kleinberg book site, are blocked; sources not opened are marked in each row).

| Claim | Verdict | Basis |
|---|---|---|
| c1 | verified | Own arithmetic on 200 200 200 10 10 10, right minus left at pixels 2-5: 0, -190, -190, 0 (two nonzero); swapped row gives 0, 190, 190, 0. Demo filt(row, p) = row[p] - row[p - 2] with 1-based p is right minus left. |
| c2 | verified | Equal neighbours give 0 for any value; reversing the step negates the difference (re-derived). |
| c3 | verified | Gonzalez and Woods not opened (cited from memory; no copy reachable). Verified on my own derivation plus web-search snippets (MathWorks 'Compare image filtering using correlation and convolution'; DIP course notes): sliding the window unflipped is correlation; convolution rotates the kernel 180 degrees, so this operation is convolution with [+1 0 -1], and image-processing and CNN usage call such sliding filters convolutions. The sentence is fair under that usage. Optional wording the builder could take: 'a convolution-style filter'. |

**Result:** all open claims verified.
