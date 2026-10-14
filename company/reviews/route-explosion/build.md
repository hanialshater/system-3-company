# Build note: route-explosion (demo-builder, 2026-10-13)

- Design intent: home (square) at the centre of k cities on a circle. For 3 and 4 cities the learner draws routes one at a time (Next route) or all at once, as a grid of thumbnails (6, then 24). Add a city goes up to 9; from 5 cities on, the routes no longer fit, so the map shows the multiplication chain and the total (5 × 4 × 3 × 2 × 1 = 120 ... 362,880).
- Deviation from brief: no checks-per-second slider; the billion-per-second figure for home plus 19 cities is one sentence in the reveal (one representation, text budget).
- Key state: seeing every order for some k, and seeing the count multiply when a city is added. Milestones ["listed-all", "added-city"], minInteractions 2. QA path: Next route, All routes, Add a city, Start over.
- Numbers: the question's 9, 362,880 and 3,628,800, the stage counts and the reveal all come from fact()/perms() in Demo.tsx. Brief answer (B) re-computed in Node (BigInt) and held; 19! / 1e9 / 31,557,600 = 3.85 years.
- Locked: orders readout shows "?" until every route for the current k is listed.
- Open risk: a learner may reveal after adding one city (4) without climbing to 9; the reveal then states 362,880 rather than showing it.


## Revision v2

From the latest learner review and fact-check (batch 03).

- Adding a city now shows the count as the previous count times the city count (6, 24, 120 ... 362,880) at once, with the drawing optional.
- Reveal keeps one explanation (choices multiply) and drops the insertion argument; new "Try 19 cities" control shows 19 cities and the 3.9-year figure on the stage.
- c3, c4 unverified.

## Revision v3 (wave D r5, 2026-10-14)

Running chain (6 x4 24 x5 120 ... x9 362,880) under the map; gate now needs 9 cities on stage. New 'Add up to 9' steps 5..9 in about 300 ms so QA's single press reaches it; 'Add a city' stays as the step control. Caption says routes leave home. Reopened c3; added c6.
Edited claims are unverified for the fact-checker. Not run here: build, QA, walkthrough, tsc (shared machine); syntax checked only.
