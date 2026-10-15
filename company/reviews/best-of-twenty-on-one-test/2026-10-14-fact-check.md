# Fact-check: best-of-twenty-on-one-test

Independent claim checks for src/demos/ai/best-of-twenty-on-one-test. Newest pass at the bottom.

## Pass 35 (2026-10-14)

Checker: fact-checker, a fresh instance that did not write these claims. Method: I read Demo.tsx first, covering every reachable path, the reset and reduced-motion states and every learner-visible string. Then I read the claim text and support, and only then the source fields. I re-ran the numbers in my own node ports of the lesson logic (session scratchpad fc35b1/), using the repo's own d3-geo, topojson-client and TypeScript where the lesson does. No builds and no screenshots. No verdict rests on an unopened source: every external host failed (WebFetch DNS failure, proxy 403).

| Claim | Verdict | Basis |
|---|---|---|
| c1 | verified | Own exact sum over k of 1 − F(k)^20 with F = Binomial(100, 0.5) cdf: 59.31. Own node port of board() with mulberry32: seed 1, 20 models, winner 56 (seeds 1 to 40: 56 to 66). Default m = 20 and nextSeed = 1, so the first Run press is seed 1; if the learner presses a Models button first, seed 1 goes to that m (the claim calls seed 1 an example, which holds). |
| c2 | verified | Own port of fresh(): seed 1 gives 49.7%; over seeds 1 to 2,000 the fresh score ranges 44.9% to 56.0%, mean 50.07%. It is independent of the shared test (a separate stream, mulberry32(seed + 100000)), so the winner stays a 50% guesser. The fresh score reached the winner's shared score in 4 of 2,000 seeds; the reveal has a branch for that ('a rare run where luck held'), so the stage never says 'fell' when it did not. |
| c3 | verified | Own exact expected maxima: 50.00, 55.81, 59.31, 62.48 for m = 1, 5, 20, 100, which round to the claim's 50, 56, 59, 62. board(seed, m) shares a prefix across m, so for one seed the best of 100 is ≥ the best of 20 ≥ the best of 5 (seed 1: 53, 54, 56, 59). The reveal crowd lines are guarded by crowd.w ≥ r.w or ≤ r.w, so they never contradict the run. |
| c4 | held unverified | Reveal sentence matches the claim. The selection bias is shown on stage, but the claim is about practice with real models ('quietly trains on it'; 'keep a final test set ... used once') and rests on Dwork et al. 2015 (Science) and ESL 2nd ed. 7.2. Neither could be opened (WebFetch DNS failure for hastie.su.domains; proxy 403). Left unverified. |
| c5 | verified | Stage tag text 'Toy models that only guess' (Demo.tsx span.tag) matches. The model: each question is right if r() < 0.5, for every model, on both tests. No skill parameter exists. |

**Result:** 4 verified, 0 disputed, 1 held unverified (no source could be opened; board W-511, evaluation-steward).

## Pass 38 (2026-10-14, set A)

Checker: fact-checker. I wrote and built none of these claims. Scope: every open claim in this lesson (set A of pass 38: ai, cs, math, physics, probability, economics, geography, lifehacks). Method: I read Demo.tsx (or the Life Hacks spec and engine) first, every learner-visible string, then the claims. I re-ran every number in my own node scripts (scratchpad fc38/: cluster.mjs, enemy.mjs, secret.mjs, plus inline runs), not imported from the lesson. Web: arxiv, publisher, government, Wikipedia and help-centre hosts return proxy 403 or fail DNS. Only raw.githubusercontent.com, PyPI and npm are reachable, so the sources I opened are files on GitHub (OpenStax CNXML, MicrosoftDocs, NetworkX, d2l, GRASS, GNOME/KDE source, the authors' own repositories, a papers-we-love PDF), each named in its row. Search-result snippets were not used as evidence. A claim whose source I could not open stays unverified.

| Claim | Verdict | Basis |
|---|---|---|
| c4 | unverified | HELD. No source that supports it could be opened from this host: the cited hosts return proxy 403 or fail DNS, and only GitHub raw, PyPI and npm are reachable. I did not verify it from memory or from search snippets. Dwork et al. 2015 (Science) and ESL 2nd ed. 7.2 were not found on any reachable mirror. The selection bias itself is shown on stage (c1-c3, verified). |

**Result:** 0 verified, 0 disputed, 1 held (unverified), 0 withdrawn.

## Pass 41

Checker: fact-checker, a fresh instance, 2026-10-15. I did not write, build or record any of these claims. Lesson status review, version 1. Method: I read Demo.tsx (and model.ts or the src/lib/lifehacks specs where the lesson uses them) for every learner-visible string before reading the builder's notes. I re-derived every derivation and simulation claim with my own scripts (node or python, kept in the session scratchpad under fc41/chk; the kit's mulberry32 copied verbatim, everything else re-implemented). Sources: the founder's pass-41 allow-list works only for bare hosts. ourworldindata.org, cran.r-project.org and pmc.ncbi.nlm.nih.gov open. gapminder.org, census.gov, naturalearthdata.com, rug.nl, doi.org, sciencedirect.com and econometricsociety.org all redirect to their www. hosts, which the proxy still blocks (403), so in practice they did not open. doi.org resolves only to publisher hosts, which are blocked. raw.githubusercontent.com, git clone and PyPI also work. WebFetch fails DNS for every host. A source counts only if I opened its text. I used no search snippets and nothing from memory. For secondary sources (for example a PMC article describing an older paper), the basis says so. No fetched page contained instructions addressed to an AI or to me; all pages were treated as data only.

| Claim | Verdict | Basis |
|---|---|---|
| c4 | verified | Learner text (Demo.tsx line 105): 'Using one test set to choose among many models quietly trains on it. Keep a final test set that is used once, after the ...'. Opened on PMC: Patterns 2025 6(4): 101185, 'Unraveling overoptimism and publication bias in ML-driven science' (PMC12010447). It says 'Model development is inherently an iterative, adaptive process where researchers reuse test sets to refine models. However, repeated use of the same test set can lead to inadvertently learning specific patterns or noise unique to that set, exacerbating overfitting', and 'reusing a test set multiple times during model development introduces significant overfitting errors, which optimistically scales as [a function of] t / n' (formula as extracted from the HTML), citing Dwork et al. 2015 (holdout reuse). That supports the first sentence ('quietly trains on it'). The second, a test set used once after the choice, is the direct remedy: a set used once is not reused, so this bias cannot arise. Dwork et al. 2015 (Science) and ESL 7.2 are not opened; this paper is the basis. |

**Result (Pass 41):** 1 verified, 0 disputed, 0 unverified (held).
