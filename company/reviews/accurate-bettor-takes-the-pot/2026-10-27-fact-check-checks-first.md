# Independent fact check: accurate-bettor-takes-the-pot

Checker: fact-checker · 2026-10-27 · current lesson v6

Artifact: http://localhost:3001/d/accurate-bettor-takes-the-pot, supplied frozen production build f693857f. Public HTML fetched before implementation/source checking; separate phone walkthrough captured in this worktree at artifacts/walkthroughs/accurate-bettor-takes-the-pot/transcript.md. No builder review/account was used as evidence. Underlying current source inspected; only verification metadata changes are proposed. This record attests only the addressed claims below, not publication readiness, QA or learner effectiveness.

## economics.accurate-bettor-takes-the-pot.c2: VERIFIED

Claim: Luck can lead for a long time: after race 50, the 50% bettor's best moment was 91.0% of the money at race 203 in run 2 (seed 2212) and 94.2% at race 176 in run 5 (seed 2215); runs 1, 3 and 4 never put the 50% bettor above half after race 50. The reveal quotes the circled low point of the run on screen: "the less accurate bettor can lead for many races: in run 5 the 50% bettor held 94.2% at race 176 (the circle)".

Independently recomputed all 500 races for seeds 2211..2215 using log-odds: L starts at 0 and increments log(1.2) on win and log(0.8) on loss, converting to accurate share 1/(1+exp(-L)). This is algebraically derived from each bettor's stake and avoids copying the stage's share recurrence. After race 50, other-bettor maxima are 91.042534% at 203 for seed2212 and 94.166269% at176 for seed2215; accurate-share minima for runs1/3/4 are .7160866/.6546128/.5528331, all >.5. See independent-results.json. Inspected lowPoint's scan 51..t and full-run milestone; public walkthrough reaches run5 and its labelled circle and reveal at 94.2%, race176. Exact scope: these five seeded toy runs, not general empirical gambling performance.

Reproduction: `node company/reviews/checks-first/2026-10-27-independent-claims.mjs`; retained results: `company/reviews/checks-first/2026-10-27-independent-results.json`. Source address for this check: `company/reviews/accurate-bettor-takes-the-pot/2026-10-27-fact-check-checks-first.md#economics.accurate-bettor-takes-the-pot.c2`.

