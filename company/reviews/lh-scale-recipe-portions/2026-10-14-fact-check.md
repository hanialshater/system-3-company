# Fact-check: lh-scale-recipe-portions

Records by the fact-checker. Each pass is appended.

## Pass LH-2 (2026-10-14, W-369: re-check after W-357/W-358/W-361)

- **Checked by:** fact-checker, fresh instance (not the LH-1 session 2 checker), 2026-10-14, board W-369.
- **Method:** rendered stage first: headless Playwright 390x844 on the dev server (http://localhost:3530/d/lh-scale-recipe-portions), predict, lock, both controls, slider extremes, reveal; screenshots in the session scratchpad (not kept). Then the code paths (home-models.ts evaluateHome and homeCordScene, HomeLesson.tsx Scene cord branch; resource-model.ts evaluateResource and snapToInteger), re-run in node with my own scripts (`node --import ./tests/lifehacks/register.mjs`), and exact integer arithmetic where rounding is involved.
- **Network:** every outside source tried (mit.edu, pnas.org, arxiv, PMC, gov.uk, nhs.uk, epa.gov, cdc.gov, fsis.usda.gov, food.gov.uk, council pages) failed from this host (proxy CONNECT 403; WebFetch DNS failure). Nothing below is verified on a source I did not open.
- **Independence (W-280):** I wrote none of these claims. Reading-order disclosure: the dispatch brief pointed me to the LH-1 record and my first claim dump printed the source fields before I opened the stage. My verdicts rest on my own screenshots and scripts, not on LH-1's numbers. The evaluation-steward may rule this short of the W-280 conditions; if so, overage c4 is the one to re-check.

| Claim | Verdict | Evidence |
|---|---|---|
| c1 | verified | Matches the rendered question and the assumptions line "Full scale:900g; quantities only." (75×12 = 900). |
| c4 | verified | 300 ÷ 4 = 75, and 75 × 2 = 150 g, so the key is option 0. The stage at Portions=2 shows (75×2) = 150g. **Builder:** the source field still describes the old ten-portion recall (750 g), so update it. |
| c5 | unverified (held) | This advice claim needs a food-safety body (for example USDA FSIS or UK FSA). None could be opened here. Of v3 wording: I read it as accurate (times change with quantity, but not in proportion). Re-check from a connected host. |
