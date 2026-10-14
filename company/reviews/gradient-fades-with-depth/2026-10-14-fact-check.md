# Fact-check: gradient-fades-with-depth

## Pass 38 (2026-10-14, set A)

Checker: fact-checker. I wrote and built none of these claims. Scope: every open claim in this lesson (set A of pass 38: ai, cs, math, physics, probability, economics, geography, lifehacks). Method: I read Demo.tsx (or the Life Hacks spec and engine) first, every learner-visible string, then the claims. I re-ran every number in my own node scripts (scratchpad fc38/: cluster.mjs, enemy.mjs, secret.mjs, plus inline runs), not imported from the lesson. Web: arxiv, publisher, government, Wikipedia and help-centre hosts return proxy 403 or fail DNS. Only raw.githubusercontent.com, PyPI and npm are reachable, so the sources I opened are files on GitHub (OpenStax CNXML, MicrosoftDocs, NetworkX, d2l, GRASS, GNOME/KDE source, the authors' own repositories, a papers-we-love PDF), each named in its row. Search-result snippets were not used as evidence. A claim whose source I could not open stays unverified.

| Claim | Verdict | Basis |
|---|---|---|
| c1 | verified | VERIFIED. s' = s(1 - s) with s in (0, 1) is maximised at s = 1/2 (x = 0), value 1/4. Question text ('the sigmoid's slope, 0.25') and reveal ('at most a quarter') match. |
| c2 | verified | VERIFIED. share() = slope^(layers - layer + 1). Own node: 0.25^10 = 9.54e-7 = 0.0000954%, pct() gives toPrecision(1) -> '0.0001%'; 0.25^3 = 1.5625% -> toFixed(1) '1.6%'. Bars use y = TOP - log10(f) x 17 px per decade, so bar heights are these exact values (0.25^10 > 1e-7, the axis floor). Stage tag reads 'Toy: weights 1, every unit at its steepest' (steepest = input 0). |
| c3 | verified | VERIFIED. NETS relu10 has slope 1, so share = 1^k = 100% for every layer. The toy assumes every unit is on its active side; the reveal says 'wherever it is active'. |
| c4 | verified | VERIFIED on an opened source other than the ones cited: Zhang, Lipton, Li and Smola, Dive into Deep Learning, section 'Numerical Stability and Initialization' (raw GitHub d2l-ai/d2l-en, chapter_multilayer-perceptrons/numerical-stability-and-init.md, opened 2026-10-14). It says vanishing gradients leave parameters that 'hardly move on each update'; that through many sigmoid layers 'the gradients of the overall product may vanish ... this problem used to plague deep network training. Consequently, ReLUs ... have emerged as the default choice'; and in its summary that 'ReLU activation functions mitigate the vanishing gradient problem'. Bengio et al. 1994, Glorot et al. 2011 and Goodfellow et al. were not opened. Builder: add d2l to the source field. |

**Result:** 4 verified, 0 disputed, 0 held (unverified), 0 withdrawn.
