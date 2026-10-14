# Fact-check: sudden-skill-or-strict-score

## Pass 38 (2026-10-14, set A)

Checker: fact-checker. I wrote and built none of these claims. Scope: every open claim in this lesson (set A of pass 38: ai, cs, math, physics, probability, economics, geography, lifehacks). Method: I read Demo.tsx (or the Life Hacks spec and engine) first, every learner-visible string, then the claims. I re-ran every number in my own node scripts (scratchpad fc38/: cluster.mjs, enemy.mjs, secret.mjs, plus inline runs), not imported from the lesson. Web: arxiv, publisher, government, Wikipedia and help-centre hosts return proxy 403 or fail DNS. Only raw.githubusercontent.com, PyPI and npm are reachable, so the sources I opened are files on GitHub (OpenStax CNXML, MicrosoftDocs, NetworkX, d2l, GRASS, GNOME/KDE source, the authors' own repositories, a papers-we-love PDF), each named in its row. Search-result snippets were not used as evidence. A claim whose source I could not open stays unverified.

| Claim | Verdict | Basis |
|---|---|---|
| c1 | verified | VERIFIED. exact(p, len) = p^len, the product rule under the stated independence. Caption 'Toy: each token right or wrong independently' is on the stage. |
| c2 | verified | VERIFIED. Own node: p^10 = 0.098, 0.605, 2.825, 10.737, 34.868, 59.874%; pct() (toFixed(1)) shows 0.1, 0.6, 2.8, 10.7, 34.9, 59.9%. Per-token values are P = 50 to 95%; ONE = p^1 = p. Non-blocking wording note: the reveal calls 0.1% to 10.7% 'near zero'; the numbers are right. |
| c3 | unverified | HELD. No source that supports it could be opened from this host: the cited hosts return proxy 403 or fail DNS, and only GitHub raw, PyPI and npm are reachable. I did not verify it from memory or from search snippets. Schaeffer, Miranda and Koyejo 2023 (arXiv, NeurIPS) and Wei et al. 2022: only search-result summaries were seen, and they agree with the claim, but no text was opened. |

**Result:** 2 verified, 0 disputed, 1 held (unverified), 0 withdrawn.
