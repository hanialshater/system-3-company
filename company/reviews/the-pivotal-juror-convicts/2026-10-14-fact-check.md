# Fact-check: the-pivotal-juror-convicts (2026-10-14)

## Pass 21 (2026-10-14)

Checker: fact-checker (did not write these claims). Method: read Demo.tsx (every learner-visible string, including computed ones) before the claim sources, then re-ran the numbers in my own node scripts (scratchpad fc21b/). Sources: opened where the proxy allowed (web search only; oeis.org, wikipedia.org, publisher PDFs blocked); citations I could not open are marked, and no verdict rests on an unopened source alone. E&K chapter placements are from memory (host blocked).

| Claim | Verdict | Basis |
|---|---|---|
| c1 | verified | Rule check over all 8 vote patterns: verdict depends on your vote only when both others vote guilty. |
| c2 | verified | Own node: P(G/g,i) with r = 0.7, prior 1/2: (0,1) = 0.30, (2,1) = 0.70, (1,0) = 0.70. |
| c3 | disputed | DISPUTED: the stage does not show this. Demo.tsx sets pGuilt = guilt(g, 1), counting only your innocent clue and ignoring the others' innocent clues, so the bar labelled 'Chance of guilt from all three clues' reads 30% when both others vote innocent and 50% when they split (own node run of the Demo function). The correct values with sincere voting are guilt(g, 3 - g): 7% and 30%, as the claim and the Demo header comment say. Only the pivotal case (70%) is right. Fix (builder): pGuilt = guilt(g, 3 - g). |
| c4 | verified | Re-derived: under sincere voting a guilty vote occurs iff the clue says guilty, so pivotal implies both clues guilty. E&K (2010) ch. 23 (Voting; jury decisions and unanimity) placement from memory, confident; Feddersen & Pesendorfer (1998), APSR 92(1), from memory, not opened; the sentence rests on the derivation. |

**Result:** 1 disputed (c3: stage bug, pGuilt = guilt(g, 1) shows 30% / 50% instead of 7% / 30%). Lesson blocked until Demo.tsx is fixed.
