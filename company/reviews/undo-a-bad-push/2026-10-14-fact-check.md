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

## Pass 19 (2026-10-14)

Checker: fact-checker (wrote none of these claims). Method: read Demo.tsx learner-visible text (static and dynamic) before claim sources, then re-derived each claim with own node scripts (scratchpad fc19b2: kmp.mjs, radix.mjs, hull.mjs) or by hand; book sources I could not open are marked as from memory per claim, with the number confirmed another way.

| Claim | Verdict | Basis |
|---|---|---|
| c2 | verified | Re-checked against Demo.tsx sendBack(): from zig flow (sa 1, ab 1, bt 1) it sets ab 0, sb 1, at 1; conservation holds at a (in 1, out 1) and b (in 1, out 1); total at+bt = 2. This is augmenting along residual path s->b->a->t. |
| c3 | verified | Own enumeration of directed s-t cuts: {s} 2, {s,a} 3, {s,b} 2 (s-a, b-t), {s,a,b} 2; min 2 = flow, so flow is maximum (weak duality, CLRS 3e Cor. 26.5, from memory). After sendBack, sa = sb = 1 (both full); the stage draws the cut when total is 2, and both pipes from s are full in every total-2 state. |

**Result:** every claim in this lesson is now verified.
