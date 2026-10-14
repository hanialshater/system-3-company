# Fact-check: one-bad-label-knn (2026-10-14)

## Pass 19 (2026-10-14)

Checker: fact-checker (wrote none of these claims). Method: read Demo.tsx learner-visible text (static and dynamic) before claim sources, then re-derived each claim with own node scripts (scratchpad fc19b2: kmp.mjs, radix.mjs, hull.mjs) or by hand; book sources I could not open are marked as from memory per claim, with the number confirmed another way.

| Claim | Verdict | Basis |
|---|---|---|
| c4 | verified | ESL 13.3 not opened (publisher/author site blocked). Independently confirmed by R package class::knn documentation (Venables & Ripley): k nearest training vectors by Euclidean distance, class decided by majority vote. Demo.tsx vote() implements exactly this; k odd and two classes, so no ties at k=1,3,5,7,13. |

**Result:** every claim in this lesson is now verified.
