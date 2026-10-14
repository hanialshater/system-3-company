# Fact-check: lh-count-sheets-not-rolls (2026-10-14)

## Pass 35 (2026-10-14)

Checker: fact-checker, fresh instance (wrote none of these claims). Method: read the lesson Demo.tsx and the shared engine first (src/components/lifehacks/ResourceLesson.tsx: useResourceState, Test A / Test B, slider, results with printed formulas, assumptions and warning lines, reveal; src/lib/lifehacks/resource-model.ts evaluateResource; the spec in src/lib/lifehacks/resource-specs.json), then meta.json claims and recall, then source fields. No Reset control or animation on this path. Source hosts (energy.gov.au, nist.gov and other government sites) are unreachable from this sandbox, so no claim below is verified on them.

| Claim | Verdict | Basis |
|---|---|---|
| c5 | unverified | HELD. First half is a definition (unit price = cost ÷ quantity; the stage computes €6 ÷ (6×120) = €0.008 and €5 ÷ (4×240) ≈ €0.005 per sheet). Second half, that comparable unit-price labels use consistent units of measure, is a statement about labelling practice/regulation and rests on NIST SP 1181-2025, which I could not open (nvlpubs.nist.gov unreachable). Not verified on memory. |

**Result:** the one open claim held unverified (c5, rests on NIST SP 1181, not openable). No disputes.

## Pass 38 (2026-10-14, set A)

Checker: fact-checker. I wrote and built none of these claims. Scope: every open claim in this lesson (set A of pass 38: ai, cs, math, physics, probability, economics, geography, lifehacks). Method: I read Demo.tsx (or the Life Hacks spec and engine) first, every learner-visible string, then the claims. I re-ran every number in my own node scripts (scratchpad fc38/: cluster.mjs, enemy.mjs, secret.mjs, plus inline runs), not imported from the lesson. Web: arxiv, publisher, government, Wikipedia and help-centre hosts return proxy 403 or fail DNS. Only raw.githubusercontent.com, PyPI and npm are reachable, so the sources I opened are files on GitHub (OpenStax CNXML, MicrosoftDocs, NetworkX, d2l, GRASS, GNOME/KDE source, the authors' own repositories, a papers-we-love PDF), each named in its row. Search-result snippets were not used as evidence. A claim whose source I could not open stays unverified.

| Claim | Verdict | Basis |
|---|---|---|
| c5 | unverified | HELD. The first half is a definition (cost ÷ quantity). The second half is about labelling practice and rests on NIST SP 1181-2025 (nvlpubs.nist.gov: proxy 403). No source that supports it could be opened from this host: the cited hosts return proxy 403 or fail DNS, and only GitHub raw, PyPI and npm are reachable. I did not verify it from memory or from search snippets. |

**Result:** 0 verified, 0 disputed, 1 held (unverified), 0 withdrawn.
