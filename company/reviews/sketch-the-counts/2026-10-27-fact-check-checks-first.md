# Independent fact check: sketch-the-counts

Checker: fact-checker · 2026-10-27 · current lesson v3

Artifact: http://localhost:3001/d/sketch-the-counts, supplied frozen production build f693857f. Public HTML fetched before implementation/source checking; separate phone walkthrough captured in this worktree at artifacts/walkthroughs/sketch-the-counts/transcript.md. No builder review/account was used as evidence. Underlying current source inspected; only verification metadata changes are proposed. This record attests only the addressed claims below, not publication readiness, QA or learner effectiveness.

## cs.sketch-the-counts.c6: VERIFIED

Claim: A count-min sketch is a fixed table of shared counters. With nonnegative updates, its estimate cannot fall below the true count.

Re-derived invariant: row r query cell C[r,h_r(x)] = f(x) + sum(y != x, h_r(y)=h_r(x)) f(y). With initially zero counters and nonnegative updates all summands are nonnegative. Every row reading is >= f(x), so their minimum is also >= f(x). No hash-independence assumption is needed for this one-sided bound. Inspected counters(), HASH and Math.min query in current Demo.tsx. Independent exhaustive replay of all 120 reachable combinations (4 row counts × 10 stream prefixes × 3 keys) has zero violations; see independent-results.json. Exact scope excludes decrements, finite-counter overflow, accuracy probabilities and the old source's empirical simulation percentages.

Reproduction: `node company/reviews/checks-first/2026-10-27-independent-claims.mjs`; retained results: `company/reviews/checks-first/2026-10-27-independent-results.json`. Source address for this check: `company/reviews/sketch-the-counts/2026-10-27-fact-check-checks-first.md#cs.sketch-the-counts.c6`.

