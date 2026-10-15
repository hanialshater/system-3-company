# Fact-check: sudden-skill-or-strict-score

## Pass 38 (2026-10-14, set A)

Checker: fact-checker. I wrote and built none of these claims. Scope: every open claim in this lesson (set A of pass 38: ai, cs, math, physics, probability, economics, geography, lifehacks). Method: I read Demo.tsx (or the Life Hacks spec and engine) first, every learner-visible string, then the claims. I re-ran every number in my own node scripts (scratchpad fc38/: cluster.mjs, enemy.mjs, secret.mjs, plus inline runs), not imported from the lesson. Web: arxiv, publisher, government, Wikipedia and help-centre hosts return proxy 403 or fail DNS. Only raw.githubusercontent.com, PyPI and npm are reachable, so the sources I opened are files on GitHub (OpenStax CNXML, MicrosoftDocs, NetworkX, d2l, GRASS, GNOME/KDE source, the authors' own repositories, a papers-we-love PDF), each named in its row. Search-result snippets were not used as evidence. A claim whose source I could not open stays unverified.

| Claim | Verdict | Basis |
|---|---|---|
| c1 | verified | VERIFIED. exact(p, len) = p^len, the product rule under the stated independence. Caption 'Toy: each token right or wrong independently' is on the stage. |
| c2 | verified | VERIFIED. Own node: p^10 = 0.098, 0.605, 2.825, 10.737, 34.868, 59.874%; pct() (toFixed(1)) shows 0.1, 0.6, 2.8, 10.7, 34.9, 59.9%. Per-token values are P = 50 to 95%; ONE = p^1 = p. Non-blocking wording note: the reveal calls 0.1% to 10.7% 'near zero'; the numbers are right. |
| c3 | unverified | HELD. No source that supports it could be opened from this host: the cited hosts return proxy 403 or fail DNS, and only GitHub raw, PyPI and npm are reachable. I did not verify it from memory or from search snippets. Schaeffer, Miranda and Koyejo 2023 (arXiv, NeurIPS) and Wei et al. 2022: only search-result summaries were seen, and they agree with the claim, but no text was opened. |

**Result:** 2 verified, 0 disputed, 1 held (unverified), 0 withdrawn.

## Pass 41

Checker: fact-checker, a fresh instance, 2026-10-15. I did not write, build or record any of these claims. Lesson status draft, version 1. Method: I read Demo.tsx (and model.ts or the src/lib/lifehacks specs where the lesson uses them) for every learner-visible string before reading the builder's notes. I re-derived every derivation and simulation claim with my own scripts (node or python, kept in the session scratchpad under fc41/chk; the kit's mulberry32 copied verbatim, everything else re-implemented). Sources: the founder's pass-41 allow-list works only for bare hosts. ourworldindata.org, cran.r-project.org and pmc.ncbi.nlm.nih.gov open. gapminder.org, census.gov, naturalearthdata.com, rug.nl, doi.org, sciencedirect.com and econometricsociety.org all redirect to their www. hosts, which the proxy still blocks (403), so in practice they did not open. doi.org resolves only to publisher hosts, which are blocked. raw.githubusercontent.com, git clone and PyPI also work. WebFetch fails DNS for every host. A source counts only if I opened its text. I used no search snippets and nothing from memory. For secondary sources (for example a PMC article describing an older paper), the basis says so. No fetched page contained instructions addressed to an AI or to me; all pages were treated as data only.

| Claim | Verdict | Basis |
|---|---|---|
| c3 | verified | Learner text: 'Before calling an ability emergent, check whether a smoother score shows it growing all along.' Opened on PMC: 'A roadmap for medical large language models', Mil Med Res 2026 13(1): 100050 (PMC13321024), section 3.1.3. 'LLMs can exhibit qualitative capability shifts on certain tasks, sometimes described as emergent behaviors [77] ... although their onset and measurability can depend on task design and evaluation granularity [77], [78]', where [77] is Wei et al. 2022 and [78] is Schaeffer, Miranda and Koyejo 2023, 'Are emergent abilities of large language models a mirage?'. That supports 'some reported emergent abilities look sudden under all-or-nothing metrics and smooth under continuous ones' at the level the claim states it ('some'), and the reveal only advises a check. Schaeffer et al. and Wei et al. themselves are not opened. Medium confidence: the review says 'evaluation granularity', not 'exact match vs per-token' word for word. |

**Result (Pass 41):** 1 verified, 0 disputed, 0 unverified (held).
