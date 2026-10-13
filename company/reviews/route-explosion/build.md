# Build note: route-explosion (demo-builder, 2026-10-13)

- Design intent: home (square) at the centre of k cities on a circle. For 3 and 4 cities the learner draws routes one at a time (Next route) or all at once, as a grid of thumbnails (6, then 24). Add a city goes up to 9; from 5 cities on, the routes no longer fit, so the map shows the multiplication chain and the total (5 × 4 × 3 × 2 × 1 = 120 ... 362,880).
- Deviation from brief: no checks-per-second slider; the billion-per-second figure for home plus 19 cities is one sentence in the reveal (one representation, text budget).
- Key state: seeing every order for some k, and seeing the count multiply when a city is added. Milestones ["listed-all", "added-city"], minInteractions 2. QA path: Next route, All routes, Add a city, Start over.
- Numbers: the question's 9, 362,880 and 3,628,800, the stage counts and the reveal all come from fact()/perms() in Demo.tsx. Brief answer (B) re-computed in Node (BigInt) and held; 19! / 1e9 / 31,557,600 = 3.85 years.
- Locked: orders readout shows "?" until every route for the current k is listed.
- Open risk: a learner may reveal after adding one city (4) without climbing to 9; the reveal then states 362,880 rather than showing it.
