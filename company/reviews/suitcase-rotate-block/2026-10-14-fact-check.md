# Fact-check: suitcase-rotate-block

## Pass 35 (2026-10-14, batch 2)

Checker: fact-checker. I did not write or build these claims. Scope: every claim in this lesson that was neither verified nor withdrawn. Method: I read the lesson's Demo.tsx and the shared engine first (src/components/lifehacks/{ResourceLesson,HomeLesson,StudyLesson}.tsx and src/lib/lifehacks/*: the evaluator, the spec, every rendered string), then the claims. I re-ran the numbers in my own node scripts (session scratchpad fc35/), not imported from the lesson. No screenshot: the dev server on :3530 was not running. Web hosts are blocked from this session (proxy 403 / DNS failure), so no verdict rests on a source I could not open; the only outside sources I opened are PyPI packages (ht 1.2.0 property tables, pint 0.26.1 unit definitions), named where used.

| Claim | Verdict | Basis |
|---|---|---|
| recall | verified | Own: 20 along 30 -> floor(30/20) x floor(40/10) = 1 x 4 = 4, strip 10 x 40 left; turned, floor(30/10) x floor(40/20) = 3 x 2 = 6 = 1200/200, the area maximum. Key index 2 unique; matches gridfit floor counts. |

**Result:** 1 verified, 0 disputed, 0 held (unverified), 0 withdrawn.
