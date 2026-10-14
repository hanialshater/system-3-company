# Fact-check: shell-gaps-shrink-the-shuffles (2026-10-14)

## Pass 22

Checker: fact-checker (did not write these claims). Method: read Demo.tsx (predict, stage text, readouts, reveal) first, then re-ran each number in my own node scripts (copies of the lesson's logic plus independent re-implementations) or checked the source. Sources marked "not opened" were checked against my own knowledge only; Easley & Kleinberg chapter titles were confirmed through web-search results (library-catalogue tables of contents), as the book's host and mirrors are blocked.

| Claim | Verdict | Basis |
|---|---|---|
| c1 | verified | Own node gapped-insertion (g=1) on 16..1: 120 shifts = 15*16/2; matches PLAIN and the predict text. |
| c2 | verified | Own node run, gaps 8,4,2,1: 8,8,8,8 = 32 shifts; the stage's swap-form loop also counts 32. Gaps 4,1 give 48. |
| c3 | verified | Own node: max /i-(v-1)/ = 15, 7, 3, 1, 0 after each pass; hands match the builder's. Reveal prints 15, then 7, 3, 1; stage readout shows 0. |
| c4 | verified | Hand before gap 1 is 2 1 4 3 ... 16 15: every card exactly 1 from home; gap-1 pass makes 8 shifts (own run). Reveal says 'swaps' for shifts; same count. |
| c5 | verified | Own node: during plain insertion the 1's insertion makes 15 shifts (position 16 to 1). |
| c6 | verified | Derivation: the g=1 pass is insertion sort, which sorts any input. Shell 1959 (Commun. ACM 2(7), 30-32) and Knuth TAOCP vol. 3 sec. 5.2.1 placement correct to my knowledge; neither opened, and the sentence does not depend on them. |
| c7 | verified | Matches the stage rule line and the inner loop of gapped insertion sort (definition). |

**Result:** 7 verified, 0 disputed, 0 withdrawn.
