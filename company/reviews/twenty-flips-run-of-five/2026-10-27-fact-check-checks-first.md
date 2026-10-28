# Independent fact check: twenty-flips-run-of-five

Checker: fact-checker · 2026-10-27 · current lesson v4

Artifact: http://localhost:3001/d/twenty-flips-run-of-five, supplied frozen production build f693857f. Public HTML fetched before implementation/source checking; separate phone walkthrough captured in this worktree at artifacts/walkthroughs/twenty-flips-run-of-five/transcript.md. No builder review/account was used as evidence. Underlying current source inspected; only verification metadata changes are proposed. This record attests only the addressed claims below, not publication readiness, QA or learner effectiveness.

## probability.twenty-flips-run-of-five.c2: VERIFIED

Claim: Real sequence k on the stage is 20 flips from mulberry32(k), for k = 1, 2, 3, ... in order (seeds not chosen; not shown to the learner); Run 1,000 real adds the next 1,000, Simulate one adds one, and the stage draws the latest. The tally's share differs from 45.8% by sampling noise.

Independent string/run-regexp oracle of the specified mulberry32 recurrence gives seeds1..1000:475 five-plus sequences, bins14/219/292/217/143/61/54; seed1001 adds one, giving476/1001. Exhaustive enumeration of all2^20 fair bit strings independently gives480670/1048576=45.84026337% (45.8% rounded). Current runMore adds consecutive seeds from tally.n+1 and UI draws sequence(tally.n); batch/one controls add1000/1. Independent replay checks batches followed by steps through3001; see independent-results.json. Exact scope: reproducible pseudorandom toy simulations and their finite-sample deviation from the fair-coin target; pseudorandom sequences are not physical coin observations. Seed non-selection is established for the implemented consecutive enumeration, not a claim about undocumented author intent.

Reproduction: `node company/reviews/checks-first/2026-10-27-independent-claims.mjs`; retained results: `company/reviews/checks-first/2026-10-27-independent-results.json`. Source address for this check: `company/reviews/twenty-flips-run-of-five/2026-10-27-fact-check-checks-first.md#probability.twenty-flips-run-of-five.c2`.

## probability.twenty-flips-run-of-five.c5: BLOCKED

Claim: When the learner has tapped all 20 flips, the reveal gives their longest run k and the share of their simulated sequences with a longest run of k or less (computed from the tally, model.ts atMost).

Current model.atMost correctly sums exact runs[0..k], independently matched for every k1..20 at n1000/1001/1002/2000/2001/3001. However Demo.tsx sets tame = myRun>=2 ? atMost(tally,myRun) :0. The independent RNG/string scan finds the first longest-run1 sample at seed246629, sequence THTHTHTHTHTHTHTHTHTH. Reachable path:246 batches plus629 single steps (or247 batches), then20 alternating learner taps. The exact tally share <=1 is positive while tame is forced0. At246629 the correct1/246629 share and forced0 both format as0.0%, so this is NOT evidence of a visibly wrong rounded percentage. The unrestricted claim says share is computed from the tally for every completed20-flip learner sequence; that exact scope is not established. Preserve existing metadata/status. No external-access blocker: this is a code-scope qualification. Next owner: builder can remove the k1 guard, or claim owner can explicitly define rounded-display scope with adequate justification; fact-checker then checks fresh version. No QA/learner verdict granted.

Reproduction: `node company/reviews/checks-first/2026-10-27-independent-claims.mjs`; retained results: `company/reviews/checks-first/2026-10-27-independent-results.json`. Source address for this check: `company/reviews/twenty-flips-run-of-five/2026-10-27-fact-check-checks-first.md#probability.twenty-flips-run-of-five.c5`.

