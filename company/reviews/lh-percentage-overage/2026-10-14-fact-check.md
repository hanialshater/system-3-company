# Fact-check: lh-percentage-overage

Records by the fact-checker. Each pass is appended.

## Pass LH-2 (2026-10-14, W-369: re-check after W-357/W-358/W-361)

- **Checked by:** fact-checker, fresh instance (not the LH-1 session 2 checker), 2026-10-14, board W-369.
- **Method:** rendered stage first: headless Playwright 390x844 on the dev server (http://localhost:3530/d/lh-percentage-overage), predict, lock, both controls, slider extremes, reveal; screenshots in the session scratchpad (not kept). Then the code paths (home-models.ts evaluateHome and homeCordScene, HomeLesson.tsx Scene cord branch; resource-model.ts evaluateResource and snapToInteger), re-run in node with my own scripts (`node --import ./tests/lifehacks/register.mjs`), and exact integer arithmetic where rounding is involved.
- **Network:** every outside source tried (mit.edu, pnas.org, arxiv, PMC, gov.uk, nhs.uk, epa.gov, cdc.gov, fsis.usda.gov, food.gov.uk, council pages) failed from this host (proxy CONNECT 403; WebFetch DNS failure). Nothing below is verified on a source I did not open.
- **Independence (W-280):** I wrote none of these claims. Reading-order disclosure: the dispatch brief pointed me to the LH-1 record and my first claim dump printed the source fields before I opened the stage. My verdicts rest on my own screenshots and scripts, not on LH-1's numbers. The evaluation-steward may rule this short of the W-280 conditions; if so, overage c4 is the one to re-check.

| Claim | Verdict | Evidence |
|---|---|---|
| c1 | verified | Matches the rendered question and the assumptions line "Full scale:132tiles; quantity-only model; no installation advice." |
| c2 | verified | The stage prints ceil((40×1.1)) = 44tiles and (40+10) = 50tiles. Fills are proportional, and Full scale 132 = A at 120 stays fixed across x=40, 95, 100 and 105. |
| c3 | verified | Exact integers: A = floor((11x+9)/10). A = B for 91..100 (95 and 100 on the step-5 slider). A < B for 20..90 and A > B for 105..120. The model with snapToInteger matches the exact values at all 21 slider points, and the stage shows 105/105, 110/110 and 116/115. The sentence "Rounding up also ties them at 95" is true and scoped to the slider. |
| c4 | verified | ceil(1.1x) ≥ x+10 holds exactly when x > 90, so 91 is the least integer and the key is option 2. The two are equal for 91..100, and ten-extra is larger below that. The wording is an FC LH-1 example adopted verbatim. This check is the fresh instance under W-280 (see the disclosure above). |
| c5 (new) | **disputed** | Hook "A fixed spare count and a percentage spare count diverge as a job grows." It was learner-visible and unrecorded. Spare counts are 10 and ceil(0.1x), with gap 8 at x=20, 0 at 95/100 and 2 at 120. On the stage they converge over most of the range and then cross. **Fix (owner decides; example wording):** "A fixed spare count stays the same; a percentage spare count grows with the job, so the two cross." |

Note: the principle (c3) says "ties them at 95" while the recall (c4) says "equal for 91 to 100". Both are true and they are consistent. cm-lifehacks may align them (W-370).

## Pass 35 (2026-10-14)

Checker: fact-checker, a fresh instance that did not write these claims. Method: I read Demo.tsx and the shared Life Hacks engine (src/components/lifehacks/, src/lib/lifehacks/) first, covering every reachable path, the reset and reduced-motion states and every learner-visible string. Then I read the claim text and support, and only then the source fields. I re-ran the numbers in my own node ports of the lesson logic (session scratchpad fc35b1/), using the repo's own d3-geo, topojson-client and TypeScript where the lesson does. No builds and no screenshots. No verdict rests on an unopened source: every external host failed (WebFetch DNS failure, proxy 403).

| Claim | Verdict | Basis |
|---|---|---|
| c5 | verified | Own run of the transpiled resource-model.ts on the spec (A = ceil(1.1x) with snapToInteger, B = x + 10), slider 20 to 120 step 5: B > A from 20 to 90, A = B at 95 (105/105) and 100 (110/110), A > B from 105 (116/115) to 120 (132/130). So which order is bigger depends on the job size, as the hook says. The hook names no crossover, so no off-by-one risk. |

**Result:** 1 verified, 0 disputed, 0 held unverified.
