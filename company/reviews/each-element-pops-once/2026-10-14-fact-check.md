# Fact-check: each-element-pops-once (2026-10-14)

## Pass 21 (2026-10-14)

Checker: fact-checker. Method: read Demo.tsx (stage, question, reveal) against each open claim, re-ran the lesson's own model in node (scratch scripts extracting or re-implementing it), and tried each named source. Most source hosts are blocked to fetch; where only a web-search extract was available, the row says so.

| Claim | Verdict | Basis |
|---|---|---|
| c1 | verified | Re-ran run(): scan 36 = 8+7+...+1; no answers. |
| c2 | verified | Re-ran run(): stack 8 comparisons, 0 pops. |
| c3 | verified | Re-ran run() on 8 7 6 5 4 3 2 1 9: scan 36, stack 15 (7 + 8), 8 pops, answers 9 x8 then none. |
| c4 | verified | Derivation checked; brute-force next-greater equals stack answers on all 5040 orders of 1..7. |
| c5 | verified | comparisons <= pops + (n-1) checked on all 5040 orders of 1..7 (max 11 for n = 7 < 2n); '9 pushes and 9 pops' is a valid (loose) bound. CLRS 4e ch. 16 amortized analysis cited from memory; not needed for the sentence. |
