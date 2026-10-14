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

## Pass 35 (2026-10-14, batch 2)

Checker: fact-checker. I did not write or build these claims. Scope: every claim in this lesson that was neither verified nor withdrawn. Method: I read the lesson's Demo.tsx and the shared engine first (src/components/lifehacks/{ResourceLesson,HomeLesson,StudyLesson}.tsx and src/lib/lifehacks/*: the evaluator, the spec, every rendered string), then the claims. I re-ran the numbers in my own node scripts (session scratchpad fc35/), not imported from the lesson. No screenshot: the dev server on :3530 was not running. Web hosts are blocked from this session (proxy 403 / DNS failure), so no verdict rests on a source I could not open; the only outside sources I opened are PyPI packages (ht 1.2.0 property tables, pint 0.26.1 unit definitions), named where used.

| Claim | Verdict | Basis |
|---|---|---|
| c2 | verified | Engine read (resource-model.ts, ResourceLesson.tsx): A = 75 x Portions, B = 300; at 6: 450g and 300g, formulas '(75×6)' and '300'. Allocation family fills scale by resourceGraphicScale = max over 1..12 = 900 (assumptions line 'Full scale:900g; quantities only.'). Recall at 2: 150g, key 0 only. |
| c3 | verified | 300/4 = 75 g per portion; 75 x n keeps the per-portion amount; the principle text is rendered by ResourceReveal. |
| c4 | verified | 300 ÷ 4 = 75; 75 x 2 = 150; options 150/300/600, key 0 unique. |
| c5 | held (unverified) | Food-safety advice; the source owed (USDA FSIS, UK FSA or similar) could not be opened (web blocked). Not verified on an unopened source. |

**Result:** 3 verified, 0 disputed, 1 held (unverified), 0 withdrawn.

## Pass 38 (2026-10-14, set A)

Checker: fact-checker. I wrote and built none of these claims. Scope: every open claim in this lesson (set A of pass 38: ai, cs, math, physics, probability, economics, geography, lifehacks). Method: I read Demo.tsx (or the Life Hacks spec and engine) first, every learner-visible string, then the claims. I re-ran every number in my own node scripts (scratchpad fc38/: cluster.mjs, enemy.mjs, secret.mjs, plus inline runs), not imported from the lesson. Web: arxiv, publisher, government, Wikipedia and help-centre hosts return proxy 403 or fail DNS. Only raw.githubusercontent.com, PyPI and npm are reachable, so the sources I opened are files on GitHub (OpenStax CNXML, MicrosoftDocs, NetworkX, d2l, GRASS, GNOME/KDE source, the authors' own repositories, a papers-we-love PDF), each named in its row. Search-result snippets were not used as evidence. A claim whose source I could not open stays unverified.

| Claim | Verdict | Basis |
|---|---|---|
| c5 | unverified | HELD. Food-safety advice; the owed food-safety body source (USDA FSIS, UK FSA or similar) is unreachable. No source that supports it could be opened from this host: the cited hosts return proxy 403 or fail DNS, and only GitHub raw, PyPI and npm are reachable. I did not verify it from memory or from search snippets. |

**Result:** 0 verified, 0 disputed, 1 held (unverified), 0 withdrawn.
