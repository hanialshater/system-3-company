# Fact-check: lh-count-sheets-not-rolls (2026-10-14)

## Pass 35 (2026-10-14)

Checker: fact-checker, fresh instance (wrote none of these claims). Method: read the lesson Demo.tsx and the shared engine first (src/components/lifehacks/ResourceLesson.tsx: useResourceState, Test A / Test B, slider, results with printed formulas, assumptions and warning lines, reveal; src/lib/lifehacks/resource-model.ts evaluateResource; the spec in src/lib/lifehacks/resource-specs.json), then meta.json claims and recall, then source fields. No Reset control or animation on this path. Source hosts (energy.gov.au, nist.gov and other government sites) are unreachable from this sandbox, so no claim below is verified on them.

| Claim | Verdict | Basis |
|---|---|---|
| c5 | unverified | HELD. First half is a definition (unit price = cost ÷ quantity; the stage computes €6 ÷ (6×120) = €0.008 and €5 ÷ (4×240) ≈ €0.005 per sheet). Second half, that comparable unit-price labels use consistent units of measure, is a statement about labelling practice/regulation and rests on NIST SP 1181-2025, which I could not open (nvlpubs.nist.gov unreachable). Not verified on memory. |

**Result:** the one open claim held unverified (c5, rests on NIST SP 1181, not openable). No disputes.
