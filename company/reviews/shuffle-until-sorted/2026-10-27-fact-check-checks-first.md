# Independent fact check: shuffle-until-sorted

Checker: fact-checker · 2026-10-27 · current lesson v3

Artifact: http://localhost:3001/d/shuffle-until-sorted, supplied frozen production build f693857f. Public HTML fetched before implementation/source checking; separate phone walkthrough captured in this worktree at artifacts/walkthroughs/shuffle-until-sorted/transcript.md. No builder review/account was used as evidence. Underlying current source inspected; only verification metadata changes are proposed. This record attests only the addressed claims below, not publication readiness, QA or learner effectiveness.

## cs.shuffle-until-sorted.c6: VERIFIED

Claim: Independent uniform shuffling needs n! attempts on average, though one run can finish sooner or later.

For n distinct cards there are n! permutations and one sorted result, so independent uniform trials have p=1/n!. If T counts attempts including the successful shuffle, P(T>k)=(1-p)^k and E[T]=sum(k>=0)(1-p)^k=1/p=n!. For n>1, positive probabilities exist both below and above the mean. Checked the current code's Fisher–Yates shuffle and distinct 1..n cards. Exact scope is the ideal independent uniform model, not a claim of exact independence of a finite seeded PRNG or an exact mean for its 5,000-attempt cap. No blocked paper is relied upon.

Reproduction: `node company/reviews/checks-first/2026-10-27-independent-claims.mjs`; retained results: `company/reviews/checks-first/2026-10-27-independent-results.json`. Source address for this check: `company/reviews/shuffle-until-sorted/2026-10-27-fact-check-checks-first.md#cs.shuffle-until-sorted.c6`.

