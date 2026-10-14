# Fact-check: plain-text-paste-scope

## Pass 35 (2026-10-14, batch 2)

Checker: fact-checker. I did not write or build these claims. Scope: every claim in this lesson that was neither verified nor withdrawn. Method: I read the lesson's Demo.tsx and the shared engine first (src/components/lifehacks/{ResourceLesson,HomeLesson,StudyLesson}.tsx and src/lib/lifehacks/*: the evaluator, the spec, every rendered string), then the claims. I re-ran the numbers in my own node scripts (session scratchpad fc35/), not imported from the lesson. No screenshot: the dev server on :3530 was not running. Web hosts are blocked from this session (proxy 403 / DNS failure), so no verdict rests on a source I could not open; the only outside sources I opened are PyPI packages (ht 1.2.0 property tables, pint 0.26.1 unit definitions), named where used.

| Claim | Verdict | Basis |
|---|---|---|
| c2 | verified | editResult(): step 1 tokens ['BOLD', 'Title'] (BOLD drawn at weight 700), step 2 ['plain', 'Title']; the second keeps the word with plain styling. The 'vary by app' hedge is a scope caveat, not resting on the unopened Microsoft Learn page (web blocked). |

**Result:** 1 verified, 0 disputed, 0 held (unverified), 0 withdrawn.
