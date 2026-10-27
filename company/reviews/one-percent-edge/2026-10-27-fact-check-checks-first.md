# Independent fact check: one-percent-edge

Checker: fact-checker · 2026-10-27 · current lesson v3

Artifact: http://localhost:3001/d/one-percent-edge, supplied frozen production build f693857f. Public HTML fetched before implementation/source checking; separate phone walkthrough captured in this worktree at artifacts/walkthroughs/one-percent-edge/transcript.md. No builder review/account was used as evidence. Underlying current source inspected; only verification metadata changes are proposed. This record attests only the addressed claims below, not publication readiness, QA or learner effectiveness.

## life.one-percent-edge.c5: VERIFIED

Claim: The model is a toy: a very large asexual population (no drift, asexual reproduction), a constant advantage, and no new mutations. It is labelled 'Toy: huge population, asexual reproduction' on the stage and in the question.

Inspected trajectory(): p'=p(1+s)/(1+sp), with fixed edge selected once per trajectory, p0=.01 and no random draw or mutation term. Derivation from relative offspring production: new count pN(1+s), old count(1-p)N, normalization totalN(1+sp); offspring retain the parent's type. This deterministic frequency recurrence excludes drift and sexual mixing and is the infinite/very-large population approximation. Stage locked caption says 'Toy: huge population, asexual reproduction'; question explicitly says huge toy population with asexual reproduction. Exact scope: the model convention and actual labels, not a biological prediction.

Reproduction: `node company/reviews/checks-first/2026-10-27-independent-claims.mjs`; retained results: `company/reviews/checks-first/2026-10-27-independent-results.json`. Source address for this check: `company/reviews/one-percent-edge/2026-10-27-fact-check-checks-first.md#life.one-percent-edge.c5`.

