# Fact-check: same-count-different-weight (2026-10-14)

## Pass 19

Checker: fact-checker (did not write these claims). Method: read Demo.tsx (predict, stage, reveal) against each claim, then re-derived every number in my own node scripts (scratchpad fc9: Bellman-Ford/Dijkstra traces, heap sift and insert over all 5,040 orders, Prim from every start and brute-force spanning trees, d3-geo area ratio plus independent sphere integral, own mulberry32). Sources recalled and not opened are marked.

| Claim | Verdict | Basis |
|---|---|---|
| c4 | verified | CIAAW conventional atomic weights: H2O 2(1.008) + 15.999 = 18.015, C 12.011; molar mass in g/mol equals particle mass in Da (SI Brochure 9th ed. 2019, not re-opened). Reveal text '18 against 12, in the same units' matches. |
| c5 | disputed | DISPUTED. Demo.tsx draws COLS = 20 dots per row, so the outlined box is two rows of 20 dots (40 dots); the claim's 'two rows of 40 dots' reads as 80 dots. Other parts check: PER_MOL = 40, 6.02214076e23 / 40 = 1.506e22, stage label 'full box', reveal names the crowd one mole. Fix (builder): 'the outlined box of two rows of 20 dots (40 in all) is one mole'. |

**Result:** 1 verified, 1 disputed, 0 withdrawn.
