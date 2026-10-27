# Independent fact check: hemoglobin-s-curve

Checker: fact-checker · 2026-10-27 · current lesson v3

Artifact: http://localhost:3001/d/hemoglobin-s-curve, supplied frozen production build f693857f. Public HTML fetched before implementation/source checking; separate phone walkthrough captured in this worktree at artifacts/walkthroughs/hemoglobin-s-curve/transcript.md. No builder review/account was used as evidence. Underlying current source inspected; only verification metadata changes are proposed. This record attests only the addressed claims below, not publication readiness, QA or learner effectiveness.

## life.hemoglobin-s-curve.c3: VERIFIED

Claim: From 40 to 20 mmHg the four-site carrier falls from 74.7% to 31.2% saturation, 43.5 points; the one-site carrier from 59.9% to 42.7%, 17.1 points; the ratio is 2.5.

Recomputed with algebraically equivalent Hill form 100*p^n/(p^n+26.8^n), n=2.7 versus1. Results: n2.7: 74.67379184 at40,31.21240186 at20, drop43.46138998; n1:59.88023952,42.73504274,drop17.14519679; ratio2.53490179. One-decimal formatting gives74.7,31.2,43.5,59.9,42.7,17.1,2.5 as claimed. Current code uses these constants and toFixed(1). Exact scope: numerical outputs of the displayed toy curve, not the claim that all real people have these saturations.

Reproduction: `node company/reviews/checks-first/2026-10-27-independent-claims.mjs`; retained results: `company/reviews/checks-first/2026-10-27-independent-results.json`. Source address for this check: `company/reviews/hemoglobin-s-curve/2026-10-27-fact-check-checks-first.md#life.hemoglobin-s-curve.c3`.

