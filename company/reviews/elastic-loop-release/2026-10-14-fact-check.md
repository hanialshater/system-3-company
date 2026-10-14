# Fact-check: elastic-loop-release

Records by the fact-checker. Each pass is appended.

## Pass LH-2 (2026-10-14, W-369: re-check after W-357/W-358/W-361)

- **Checked by:** fact-checker, fresh instance (not the LH-1 session 2 checker), 2026-10-14, board W-369.
- **Method:** rendered stage first: headless Playwright 390x844 on the dev server (http://localhost:3530/d/elastic-loop-release), predict, lock, both controls, slider extremes, reveal; screenshots in the session scratchpad (not kept). Then the code paths (home-models.ts evaluateHome and homeCordScene, HomeLesson.tsx Scene cord branch; resource-model.ts evaluateResource and snapToInteger), re-run in node with my own scripts (`node --import ./tests/lifehacks/register.mjs`), and exact integer arithmetic where rounding is involved.
- **Network:** every outside source tried (mit.edu, pnas.org, arxiv, PMC, gov.uk, nhs.uk, epa.gov, cdc.gov, fsis.usda.gov, food.gov.uk, council pages) failed from this host (proxy CONNECT 403; WebFetch DNS failure). Nothing below is verified on a source I did not open.
- **Independence (W-280):** I wrote none of these claims. Reading-order disclosure: the dispatch brief pointed me to the LH-1 record and my first claim dump printed the source fields before I opened the stage. My verdicts rest on my own screenshots and scripts, not on LH-1's numbers. The evaluation-steward may rule this short of the W-280 conditions; if so, overage c4 is the one to re-check.

| Claim | Verdict | Evidence |
|---|---|---|
| c1 | unverified (held) | Support is "source" and Raymer & Smith 2007 could not be opened. It is true by topology without it: a one-crossing curl in an open cord (Reidemeister I) is never a knot, and sliding the loop to the free end removes it. **Fix (builder):** retype support to derivation with that argument (as FC LH-1 asked). Then re-check. |
| c2 | verified | Caption "Plain cord; storage only" and the reveal limit are shown. The drawing is path, ellipse, arrow, dots and bracket only. |
| c3 | verified | Crossings drawn = readout = 1 before, 0 after for p=15..35 (0 mismatches). Slider min 15 cm > 10 cm travel. |
| c4 | verified | Key "Slide loop off" is correct. Threading the end through the loop would add crossings (an overhand). |
| c5 | unverified (held) | Not rendered: HomeLesson.tsx never reads spec.recall, and Feed shows meta.recall. It is superseded by .recall. **Builder deletes it.** |
| recall | verified | Derivation as for c1. The key "Not if the loop slides off the free end" is right and both distractors are false. |

Minor findings for the builder (non-blocking): (1) the orange crossing dot is drawn at (150,125), but the segments cross at (150,116.7), so the dot sits below the X. (2) The "End through loop" state draws the untouched curl and reads "Drawn crossing 1". It is literally true of the drawing, but it does not depict threading, which would make an overhand knot.

## Pass 35 (2026-10-14)

Checker: fact-checker, a fresh instance that did not write these claims. Method: I read Demo.tsx and the shared Life Hacks engine (src/components/lifehacks/, src/lib/lifehacks/) first, covering every reachable path, the reset and reduced-motion states and every learner-visible string. Then I read the claim text and support, and only then the source fields. I re-ran the numbers in my own node ports of the lesson logic (session scratchpad fc35b1/), using the repo's own d3-geo, topojson-client and TypeScript where the lesson does. No builds and no screenshots. No verdict rests on an unopened source: every external host failed (WebFetch DNS failure, proxy 403).

| Claim | Verdict | Basis |
|---|---|---|
| c1 | verified | Read the cord scene in HomeLesson.tsx and homeCordScene first. Derivation: an arc with free ends is unknotted (any tangle in an open string can be undone by moving an end), and the drawn curl is a one-crossing kink (Reidemeister I), so one crossing never proves a knot. Own run of the transpiled home-models.ts: crossings = 1 before and 0 after 'Slide loop off'. The free end minus the start is 3p px for p = 15 to 35 cm, always more than the 10 cm loop travel (30 px). The reveal shows spec.idea, the claim text. No source is relied on. |

**Result:** 1 verified, 0 disputed, 0 held unverified.
