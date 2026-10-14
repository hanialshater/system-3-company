# Fact-check: drying-room-water-load

Records by the fact-checker. Each pass is appended.

## Pass LH-2 (2026-10-14, W-369: re-check after W-357/W-358/W-361)

- **Checked by:** fact-checker, fresh instance (not the LH-1 session 2 checker), 2026-10-14, board W-369.
- **Method:** rendered stage first: headless Playwright 390x844 on the dev server (http://localhost:3530/d/drying-room-water-load), predict, lock, both controls, slider extremes, reveal; screenshots in the session scratchpad (not kept). Then the code paths (home-models.ts evaluateHome and homeCordScene, HomeLesson.tsx Scene cord branch; resource-model.ts evaluateResource and snapToInteger), re-run in node with my own scripts (`node --import ./tests/lifehacks/register.mjs`), and exact integer arithmetic where rounding is involved.
- **Network:** every outside source tried (mit.edu, pnas.org, arxiv, PMC, gov.uk, nhs.uk, epa.gov, cdc.gov, fsis.usda.gov, food.gov.uk, council pages) failed from this host (proxy CONNECT 403; WebFetch DNS failure). Nothing below is verified on a source I did not open.
- **Independence (W-280):** I wrote none of these claims. Reading-order disclosure: the dispatch brief pointed me to the LH-1 record and my first claim dump printed the source fields before I opened the stage. My verdicts rest on my own screenshots and scripts, not on LH-1's numbers. The evaluation-steward may rule this short of the W-280 conditions; if so, overage c4 is the one to re-check.

| Claim | Verdict | Evidence |
|---|---|---|
| c5 | unverified (held) | Not rendered and superseded by .recall. **Builder deletes it.** |
| c6 | unverified (held) | This advice claim (damp and mould) needs a housing or public-health body. None could be opened here. UK council damp-guidance snippets agree, but I did not open them, so I do not use them. The physical clause is true: evaporated water enters the room air first. Re-check from a connected host, for example the gov.uk "Understanding and addressing the health risks of damp and mould in the home" guidance or NHS damp and mould guidance. |
| recall | verified | 6 × 300 g = 1800 g = 1.8 kg, and the key is option 0. This is the evaluateHome mass balance. The why describes the model, so it does not contradict c6. |

## Pass 35 (2026-10-14, batch 3)

Checker: fact-checker (fresh instance; drafted none of this wording). Artifact: lifehacks/drying-room-water-load v2. Method: read Demo.tsx and the shared Life Hacks engine (src/lib/lifehacks, src/components/lifehacks) first, tracing every reachable path, Reset (where present) and reduced motion; re-ran the numbers in node/Python with independent re-implementations; checked how-chosen notes. Web sources could not be opened from this host (web fetch DNS failure, proxy 403), so nothing here is verified on an unopened source. No screenshots: the dev server at localhost:3530 did not respond. Scripts: scratchpad fc35-3/.

| Claim | Verdict | Basis |
|---|---|---|
| c6 | unverified | Warning renders in the reveal (spec.warning, home-lessons.ts line 721) with the claim's exact text. The physical clause (dried water enters room air) is a mass balance and true. The damp-and-mould advice needs a housing or public-health body; nhs.uk (tried this pass) and the other hosts fail DNS / proxy 403. Left unverified, as in LH-2. |
