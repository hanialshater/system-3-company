# Fact-check: euclid-three-steps

## Pass 38 (2026-10-14, set A)

Checker: fact-checker. I wrote and built none of these claims. Scope: every open claim in this lesson (set A of pass 38: ai, cs, math, physics, probability, economics, geography, lifehacks). Method: I read Demo.tsx (or the Life Hacks spec and engine) first, every learner-visible string, then the claims. I re-ran every number in my own node scripts (scratchpad fc38/: cluster.mjs, enemy.mjs, secret.mjs, plus inline runs), not imported from the lesson. Web: arxiv, publisher, government, Wikipedia and help-centre hosts return proxy 403 or fail DNS. Only raw.githubusercontent.com, PyPI and npm are reachable, so the sources I opened are files on GitHub (OpenStax CNXML, MicrosoftDocs, NetworkX, d2l, GRASS, GNOME/KDE source, the authors' own repositories, a papers-we-love PDF), each named in its row. Search-result snippets were not used as evidence. A claim whose source I could not open stays unverified.

| Claim | Verdict | Basis |
|---|---|---|
| c1 | verified | VERIFIED. Own node: 2·3·5·7·11·13 = 30030; 30031 = 59 × 509 by trial division (59 and 509 prime). |
| c2 | verified | VERIFIED. Own node: 6 + 1 = 7, 30 + 1 = 31, 210 + 1 = 211; each is prime by trial division, and none is on its list. |
| c3 | verified | VERIFIED. The product P is a multiple of each listed p, so P + 1 = qp + 1 with 0 < 1 < p, remainder 1. Own node: remainder 1 for every p on all four lists offered. |
| c4 | verified | VERIFIED. P + 1 >= 3 > 1, so its least divisor above 1 is prime (any smaller factor of it would divide P + 1 too), and by c3 it is not on the list. 'Find its primes' shows factor(N), which is trial division. |
| c5 | verified | VERIFIED by my own derivation (c3 and c4 use nothing about the list except that it is finite and made of primes). Hardy and Wright Theorem 4 not opened; not relied on. |
| c6 | unverified | HELD. No source that supports it could be opened from this host: the cited hosts return proxy 403 or fail DNS, and only GitHub raw, PyPI and npm are reachable. I did not verify it from memory or from search snippets. Euclid, Elements IX.20 (Heath; Joyce's Clark University edition) was not on any reachable host. A search result names IX.20 (Heath vol. II p. 412), but I did not open it. |

**Result:** 5 verified, 0 disputed, 1 held (unverified), 0 withdrawn.

## Pass 41

Checker: fact-checker, a fresh instance, 2026-10-15. I did not write, build or record any of these claims. Lesson status draft, version 1. Method: I read Demo.tsx (and model.ts or the src/lib/lifehacks specs where the lesson uses them) for every learner-visible string before reading the builder's notes. I re-derived every derivation and simulation claim with my own scripts (node or python, kept in the session scratchpad under fc41/chk; the kit's mulberry32 copied verbatim, everything else re-implemented). Sources: the founder's pass-41 allow-list works only for bare hosts. ourworldindata.org, cran.r-project.org and pmc.ncbi.nlm.nih.gov open. gapminder.org, census.gov, naturalearthdata.com, rug.nl, doi.org, sciencedirect.com and econometricsociety.org all redirect to their www. hosts, which the proxy still blocks (403), so in practice they did not open. doi.org resolves only to publisher hosts, which are blocked. raw.githubusercontent.com, git clone and PyPI also work. WebFetch fails DNS for every host. A source counts only if I opened its text. I used no search snippets and nothing from memory. For secondary sources (for example a PMC article describing an older paper), the basis says so. No fetched page contained instructions addressed to an AI or to me; all pages were treated as data only.

| Claim | Verdict | Basis |
|---|---|---|
| c6 | verified | Opened Heath's translation, The Thirteen Books of Euclid's Elements (1908), in the Perseus Digital Library TEI (raw.githubusercontent.com/PerseusDL/canonical-greekLit, data/tlg1799/tlg001/tlg1799.tlg001.perseus-eng2.xml). The textpart with xml:base '...perseus-eng2:9.prop' and n='20' (Book IX, Proposition 20) reads: 'Prime numbers are more than any assigned multitude of prime numbers.' Its proof takes 'the least number measured by A, B, C' (for primes, their product), adds the unit, and shows that the result is prime or has a prime factor G not among A, B, C. That is the lesson's multiply, add 1, divide. The reveal 'This is Euclid's proof in the Elements, Book IX, Proposition 20' holds. Builder (non-blocking): cite the Perseus/Heath text in the source field. |

**Result (Pass 41):** 1 verified, 0 disputed, 0 unverified (held).
