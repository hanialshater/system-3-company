# Fact-check: ray-counts-crossings (2026-10-14)

## Pass 21 (2026-10-14)

Checker: fact-checker. Method: read Demo.tsx (stage, question, reveal) against each open claim, re-ran the lesson's own model in node (scratch scripts extracting or re-implementing it), and tried each named source. Most source hosts are blocked to fetch; where only a web-search extract was available, the row says so.

| Claim | Verdict | Basis |
|---|---|---|
| c1 | verified | Re-ran Demo.tsx crossings(): (3,4) crosses at x = 4, 6; (1,4) 3; (5,4) 1; (3,1) 1; (7,4) 0. |
| c2 | verified | Parity of crossings() equals an independent inside test for the U on 25,521 snapped stage points (0 mismatches). Derivation from the Jordan curve theorem for polygons; Shimrat 1962 and Haines 1994 cited from memory, not opened; sentence rests on the derivation. |
| c3 | verified | snap() never returns y in {0, 2, 6} or a boundary point (checked on the same 25,521 points). |
