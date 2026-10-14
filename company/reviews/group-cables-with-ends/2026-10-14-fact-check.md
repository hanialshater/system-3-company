# Fact-check: group-cables-with-ends

Records by the fact-checker. Each pass is appended.

## Pass LH-2 (2026-10-14, W-369: re-check after W-357/W-358/W-361)

- **Checked by:** fact-checker, fresh instance (not the LH-1 session 2 checker), 2026-10-14, board W-369.
- **Method:** rendered stage first: headless Playwright 390x844 on the dev server (http://localhost:3530/d/group-cables-with-ends), predict, lock, both controls, slider extremes, reveal; screenshots in the session scratchpad (not kept). Then the code paths (home-models.ts evaluateHome and homeCordScene, HomeLesson.tsx Scene cord branch; resource-model.ts evaluateResource and snapToInteger), re-run in node with my own scripts (`node --import ./tests/lifehacks/register.mjs`), and exact integer arithmetic where rounding is involved.
- **Network:** every outside source tried (mit.edu, pnas.org, arxiv, PMC, gov.uk, nhs.uk, epa.gov, cdc.gov, fsis.usda.gov, food.gov.uk, council pages) failed from this host (proxy CONNECT 403; WebFetch DNS failure). Nothing below is verified on a source I did not open.
- **Independence (W-280):** I wrote none of these claims. Reading-order disclosure: the dispatch brief pointed me to the LH-1 record and my first claim dump printed the source fields before I opened the stage. My verdicts rest on my own screenshots and scripts, not on LH-1's numbers. The evaluation-steward may rule this short of the W-280 conditions; if so, overage c4 is the one to re-check.

| Claim | Verdict | Evidence |
|---|---|---|
| c1 | unverified (held) | Support is "source" (Raymer & Smith 2007, p.16435), which could not be opened. The second sentence is true of the stage: one middle tie and 2N orange end dots, against ties at both ends and the middle with none (N=2,4,8). **Fix (builder):** retype it to derivation or observation, or cite an openable source. Then re-check. |
| c2 | verified | The caption and reveal limit are shown. The drawing is strands, ties and end dots only. |
| c3 | verified | Readout = end dots drawn = 2N before, 0 after for N=2..8 (0 mismatches). Nothing simulates knots. |
| c4 | verified | Key "Secure bundle ends" is the only layout with 0 drawn ends. |
| c5 | unverified (held) | Not rendered and superseded by .recall. **Builder deletes it.** |
| recall | verified | With both ends held, an arc cannot change its knot type, so knotting needs an end to pass through a loop. A middle tie leaves the ends free. The key is right, and "in the drawing" scopes the last sentence. |
