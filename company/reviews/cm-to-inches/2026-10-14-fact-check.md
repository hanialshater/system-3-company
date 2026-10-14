# Fact-check: cm-to-inches

## Pass 35 (2026-10-14, batch 2)

Checker: fact-checker. I did not write or build these claims. Scope: every claim in this lesson that was neither verified nor withdrawn. Method: I read the lesson's Demo.tsx and the shared engine first (src/components/lifehacks/{ResourceLesson,HomeLesson,StudyLesson}.tsx and src/lib/lifehacks/*: the evaluator, the spec, every rendered string), then the claims. I re-ran the numbers in my own node scripts (session scratchpad fc35/), not imported from the lesson. No screenshot: the dev server on :3530 was not running. Web hosts are blocked from this session (proxy 403 / DNS failure), so no verdict rests on a source I could not open; the only outside sources I opened are PyPI packages (ht 1.2.0 property tables, pint 0.26.1 unit definitions), named where used.

| Claim | Verdict | Basis |
|---|---|---|
| c1 | verified | NIST page not opened (web blocked). Opened instead: pint 0.26.1 (PyPI) default_en.txt, group USCSLengthInternational: 'inch = yard / 36' and 'yard = 0.9144 * meter ... # since Jul 1959', so 1 in = 0.0254 m = 25.4 mm exactly. Secondary source (a units registry), recorded so a reviewer can weigh it. Error grows with length: p/2.5 - p/2.54 = 0.0063 p in, proportional to p (stage conversion model). |
| c5 | verified | Transfer prompt with no factual assertion; its implied answer (no) matches the rendered limit 'Measurement uncertainty remains even when the conversion factor is exact.' Note for the builder: HomeSpec.recall strings are not rendered anywhere (only spec.idea, limit, warning reach the learner; the feed uses meta.recall), so this claim could be withdrawn. |
| recall | verified | 127 ÷ 2.54 = 50, 127 ÷ 2.5 = 50.8, 127 x 2.5 = 317.5 (node); key 0 unique. Exact inch per pint 0.26.1 default_en.txt (opened), as for c1; NIST not opened. |

**Result:** 3 verified, 0 disputed, 0 held (unverified), 0 withdrawn.
