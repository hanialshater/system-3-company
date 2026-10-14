# Fact-check: lh-idle-versus-active

## Pass 35 (2026-10-14, batch 2)

Checker: fact-checker. I did not write or build these claims. Scope: every claim in this lesson that was neither verified nor withdrawn. Method: I read the lesson's Demo.tsx and the shared engine first (src/components/lifehacks/{ResourceLesson,HomeLesson,StudyLesson}.tsx and src/lib/lifehacks/*: the evaluator, the spec, every rendered string), then the claims. I re-ran the numbers in my own node scripts (session scratchpad fc35/), not imported from the lesson. No screenshot: the dev server on :3530 was not running. Web hosts are blocked from this session (proxy 403 / DNS failure), so no verdict rests on a source I could not open; the only outside sources I opened are PyPI packages (ht 1.2.0 property tables, pint 0.26.1 unit definitions), named where used.

| Claim | Verdict | Basis |
|---|---|---|
| c5 | verified | Definitional, not resting on energy.gov.au (not opened, web blocked): 1 kWh = 1000 W x 1 h, so constant load energy = W x h / 1000; per-kWh cost = kWh x price, with fixed charges separate. Not rendered on this stage (no learner string contains it); the stage formulas apply it: 60 x 2 x 5 / 1000 = 0.6, 3 x 22 x 5 / 1000 = 0.33. |
| c6 | held (unverified) | Rendered warning line; the source owed (national energy body or tariff regulator) could not be opened (web blocked). |

**Result:** 1 verified, 0 disputed, 1 held (unverified), 0 withdrawn.
