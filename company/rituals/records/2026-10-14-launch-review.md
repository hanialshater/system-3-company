# Launch review: 2026-10-14 pre-deploy publish pass

Date: 2026-10-14 · executed by: release manager (Diego), for the founder-approved deploy

Note: this file did not exist; earlier 2026-10-14 sections live in 2026-10-14-launch-review-wave-C.md.

- Ran `node tools/publish-ready.mjs --publish` (company gates run on every publish; company/ops/publish-holds.json respected).
- Candidates: 1 (patience-wins-the-split). Result: not published. `company publish` refused it: claims not verified: economics.patience-wins-the-split.c5. Not published around the gate.
- Published: 0. Published count unchanged at 608.
- `company status` "Ready to publish" lists 24 gate-clean lessons, but the publish loop's launch-verdict check clears none of them:
  - Held by publish-holds.json (9): eratosthenes-shadow, fingernail-ocean, half-of-humanity, horizon-ruler, mercator-greenland, ruler-on-mercator, shrinking-degree (screenshot re-review), penalty-kick-mix, who-pays-same-filter (W-513).
  - Latest learner verdict is for an older version (8 across the status list incl. a-star-heads-for-goal, every-second-seat-out, palindromes-grow-from-centres, rotation-untangles-the-chain).
  - Latest learner verdict is revise for the current version (e.g. penalty-on-wiggle, karatsuba-three-not-four, one-road-cuts-the-map, range-min-in-four-nodes, selfish-routes-cost-a-third-more, outside-option-sets-the-split, two-bets-split, continental-jigsaw, cut-the-rod-for-more, pay-for-the-harm-you-do, only-the-needed-trader-profits).
  - Verdict not machine-readable (reviews of the form "Verdict for the current version: launch" without "Verdict:" and a "lesson version: vN" stamp): new-road-slower-trip, one-good-link-beats-many, web-bow-tie-reach, below-critical-mass, bid-what-its-worth, mild-preferences-sharp-divides, prices-sort-the-buyers (and similar). The "final" reviews appear to say launch, but the script cannot confirm they name the current version. Routed to the chief of staff / learner-evaluator to restamp; not published.

## Second pre-deploy publish pass (2026-10-14, evening), release manager (Diego)

- Ran `node tools/publish-ready.mjs --publish`: 28 candidates, the company gates ran on each (publish-holds.json and learner launch verdicts respected; 202 held for no learner review, 38 for verdict revise, 2 for W-513 holds, 1 for an older-version verdict).
- Published: 27. a-star-heads-for-goal, every-second-seat-out, new-road-slower-trip, one-good-link-beats-many, palindromes-grow-from-centres, rotation-untangles-the-chain, web-bow-tie-reach, below-critical-mass, bid-what-its-worth, mild-preferences-sharp-divides, prices-sort-the-buyers, eratosthenes-shadow, fingernail-ocean, half-of-humanity, horizon-ruler, mercator-greenland, midnight-sun-line, ruler-on-mercator, shrinking-degree, contact-order-matters, news-comes-from-acquaintances, one-odd-loop-blocks-two-camps, the-loser-flips-the-winner, few-shortcuts-shrink-the-world, same-songs-different-hits, the-giant-appears, two-said-blue.
- Refused by the gate: 1. patience-wins-the-split: claims not verified: economics.patience-wins-the-split.c5. Not published around the gate; needs a fact-checker to verify or fix c5.
- Founder approval for the deploy: the chief of staff's conversation 2026-10-14, "go with C".
