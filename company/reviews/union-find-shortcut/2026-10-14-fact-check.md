# Fact-check: union-find-shortcut (2026-10-14)

## Pass 10 (2026-10-14)

Checker: fact-checker (did not write these claims; any claim marked 'recorded by the fact-checker' is a quote of the builder's stage text). Method: no walkthrough transcript exists for this lesson yet, so I read Demo.tsx as rendered text (every learner-visible string, including dynamic ones) before the claim sources, then re-derived every number in my own node scripts (own copies of mulberry32 and of each algorithm; scratchpad fc10/a.mjs, b.mjs, c.mjs, d.mjs) and checked citations. Egress to most publisher pages is blocked, so book passages I could not open are said so per claim.

| Claim | Verdict | Basis |
|---|---|---|
| c1 | verified | Own exhaustive enumeration of every merge order of 8 singletons under union by size: max height 3; pairwise equal merges reach 3. Note: CLRS 21.3 / ex. 21.4-2 prove the analogous bound for union by rank; the size bound is the c3 derivation, which stands on its own. |
| c2 | verified | Own union-find with own mulberry32(1), 1,000 orders: heights 1: 157, 2: 833, 3: 10; seed 7, 20,000 orders: worst 3. |
| c3 | verified | Re-derived: depth of x grows only when its root is hung under a root of a group at least as large, so x's group size at least doubles; 1 -> 8 allows 3 doublings. |

**Result:** all claims in this pass verified.
