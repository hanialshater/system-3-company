# Fact-check: undo-a-bad-push (2026-10-14)

## Pass 10 (2026-10-14)

Checker: fact-checker (did not write these claims; any claim marked 'recorded by the fact-checker' is a quote of the builder's stage text). Method: no walkthrough transcript exists for this lesson yet, so I read Demo.tsx as rendered text (every learner-visible string, including dynamic ones) before the claim sources, then re-derived every number in my own node scripts (own copies of mulberry32 and of each algorithm; scratchpad fc10/a.mjs, b.mjs, c.mjs, d.mjs) and checked citations. Egress to most publisher pages is blocked, so book passages I could not open are said so per claim.

| Claim | Verdict | Basis |
|---|---|---|
| c1 | verified | Own greedy forward-only simulation: zig first 1; s-a-t first 2; s-b-t first 2. |
| c2 | verified | Residual after zig: s-b, b->a (reverse), a-t free; augment gives all four outer pipes at 1, a-b 0, total 2. |
| c3 | verified | Own cut enumeration: {s} 2, {s,a} 3, {s,b} 2, {s,a,b} 2; min 2. CLRS 3rd ed. Corollary 26.5. |
| c4 | verified | Ford and Fulkerson, Canad. J. Math. 8 (1956) 399-404; CLRS 3rd ed. 26.2, Theorem 26.6 (max-flow min-cut). |

**Result:** all claims in this pass verified.
