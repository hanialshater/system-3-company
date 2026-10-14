# Fact-check: glider-walks (2026-10-14)

## Pass 19

Checker: fact-checker (did not write these claims). Demo.tsx read against each claim; numbers re-derived in own node scripts. Network to primary sources blocked this pass; source claims corroborated by search snippets as noted.

| Claim | Result | Basis |
|---|---|---|
| c1 | verified | Own node sim of Demo.tsx rule on an unbounded grid: counts 5,5,5,5,5; gen 4 = gen 0 + (1,1); all cells stay inside 7x7, so the stage edge never matters. |
| c2 | verified | Own sim: neighbour counts (1,0)=1, (0,2)=1 die; (2,1)=3, (1,2)=3, (2,2)=2 live; births at (0,1) and (1,3) (glider coordinates). |
| c3 | verified | Stage rule = step() = B3/S23. Gardner Oct 1970 column not opened (network blocked); publication and B3/S23 as Conway's rule corroborated by search snippets (LifeWiki, ibiblio copy of the column). Glider name standard in the same sources. |
| c4 | verified | Winning Ways not opened; search snippets corroborate: CRC Concise Encyclopedia lists "What Is Life" as ch. 25 of Winning Ways vol. 2 (1982), and secondary sources attribute the universal-computer construction to it. Source says 1982 vol. 2; builder may add "vol. 2". |
| c5 | verified | Read step()/neighbours(): only own state and 8 neighbours are used; no position or velocity state exists. |
