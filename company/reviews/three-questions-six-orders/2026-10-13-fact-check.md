# Fact-check: three-questions-six-orders (2026-10-13)

## Pass 9 (2026-10-13)

Checker: fact-checker (did not write these claims; c-claims added by an earlier fact-checker pass are quotes of the builder's stage text). Method: read Demo.tsx as rendered text first, then re-derived every number in my own node script (own copies of the sims and mulberry32; scratchpad fc9/check.mjs), and searched sources on the web. Egress to population.un.org, royalsocietypublishing.org, Wikipedia and BioNumbers is blocked (403/DNS).

| Claim | Verdict | Basis |
|---|---|---|
| c1 | verified | 3! = 6; node permutations of [A,B,C] = 6, same as Demo ORDERS. |
| c2 | verified | node, greedy keep-more answers for all 6 asking orders: 6 -> 3 -> 2 -> 1 every time. Reveal uses narrow([0,1]) = 2 and final 1. |
| c3 | verified | q yes/no answers give at most 2^q leaves: 4 < 6 <= 8 (decision-tree bound, CLRS 3e s.8.1). |
| c4 | verified | node exhaustive minimax over comparison strategies: optimal worst-case depth 3 for n=3 (also 5 for n=4, 7 for n=5). |
| c5 | verified | CLRS 3e Theorem 8.1: worst case Omega(n lg n); lg(n!) = Theta(n lg n) by Stirling. |
