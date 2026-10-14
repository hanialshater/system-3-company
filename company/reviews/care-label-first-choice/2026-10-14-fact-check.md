# Fact-check: care-label-first-choice

## Pass 35 (2026-10-14, batch 2)

Checker: fact-checker. I did not write or build these claims. Scope: every claim in this lesson that was neither verified nor withdrawn. Method: I read the lesson's Demo.tsx and the shared engine first (src/components/lifehacks/{ResourceLesson,HomeLesson,StudyLesson}.tsx and src/lib/lifehacks/*: the evaluator, the spec, every rendered string), then the claims. I re-ran the numbers in my own node scripts (session scratchpad fc35/), not imported from the lesson. No screenshot: the dev server on :3530 was not running. Web hosts are blocked from this session (proxy 403 / DNS failure), so no verdict rests on a source I could not open; the only outside sources I opened are PyPI packages (ht 1.2.0 property tables, pint 0.26.1 unit definitions), named where used.

| Claim | Verdict | Basis |
|---|---|---|
| c1 | verified | States the stipulated example (flat-dry instruction) and a rule that follows from it; label-rule model gives 0 compatible items when hung, N when flat. It asserts nothing about GINETEX symbols, so the unopened GINETEX page (web blocked) is not needed. Support could be convention. |
| c5 | verified | Transfer prompt, no factual assertion; consistent with the rendered limit 'Read the real label'. HomeSpec.recall is not rendered (see cm-to-inches c5 note); could be withdrawn. |

**Result:** 2 verified, 0 disputed, 0 held (unverified), 0 withdrawn.
