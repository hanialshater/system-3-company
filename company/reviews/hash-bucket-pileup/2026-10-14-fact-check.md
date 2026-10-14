# Fact-check: hash-bucket-pileup (2026-10-14)

## Pass 19

Checker: fact-checker (did not write these claims). Demo.tsx read against each claim; numbers re-derived in own node scripts. Network to primary sources blocked this pass; source claims corroborated by search snippets as noted.

| Claim | Result | Basis |
|---|---|---|
| c4 | verified | CLRS 3e section 11.2 (and 4e 11.2) "collision resolution by chaining", CHAINED-HASH-INSERT etc., corroborated by course notes citing the section; reveal text "keeping a short list in each slot" matches. |
| c7 | verified | Own node product of (1 - i/10): 1, 0.9, 0.72, 0.504, 0.3024, 0.1512 for k = 1..6; same as noCol(k) in Demo.tsx and the stage readout. |
