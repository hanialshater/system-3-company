# Fact-check: mail-minus-noise (2026-10-14)

## Pass 35 (2026-10-14)

Checker: fact-checker, fresh instance (wrote none of these claims). Method: read the lesson Demo.tsx (thin wrapper) and the shared engine first (src/components/lifehacks/StudyLesson.tsx: Stage / FileStage, both buttons, faded non-matching rows, result count, observation() used by the reveal; src/lib/lifehacks/studyModels.ts fileResult / reconstructionMatches; the fixture in src/lib/lifehacks/studyCatalog.ts), then meta.json claims and the recall card (src/components/Feed.tsx), then source fields. No Reset or animation on this path. Google Help pages (support.google.com) are unreachable from this sandbox, so no claim below is verified on them.

| Claim | Verdict | Basis |
|---|---|---|
| c2 | verified | Derivation on the fixture: fileResult operation "exclude" keeps rows containing "train" at step 1 (m1, m2, m4) and rows containing "train" but not "newsletter" at step 2 (m1, m4), i.e. topic matches lacking the excluded word; matching is per record (r.value.includes), so no conversation grouping is modelled. Own node agrees. |
| recall | unverified | HELD. The recall asks "Which Gmail search fits?" and the why states real Gmail operator semantics (minus excludes, OR unions, a space requires both words). That rests on Google Gmail Help 7190, which I could not open (support.google.com unreachable). The logic is consistent with the lesson fixture, and the key (index 0) is the only option that excludes the digest, but the Gmail behaviour itself needs the opened page. |

**Result:** 1 verified (c2, on the fixture), 1 held unverified (recall, states real Gmail operator behaviour; Gmail Help not openable). No disputes.

## Pass 38 (2026-10-14, set A)

Checker: fact-checker. I wrote and built none of these claims. Scope: every open claim in this lesson (set A of pass 38: ai, cs, math, physics, probability, economics, geography, lifehacks). Method: I read Demo.tsx (or the Life Hacks spec and engine) first, every learner-visible string, then the claims. I re-ran every number in my own node scripts (scratchpad fc38/: cluster.mjs, enemy.mjs, secret.mjs, plus inline runs), not imported from the lesson. Web: arxiv, publisher, government, Wikipedia and help-centre hosts return proxy 403 or fail DNS. Only raw.githubusercontent.com, PyPI and npm are reachable, so the sources I opened are files on GitHub (OpenStax CNXML, MicrosoftDocs, NetworkX, d2l, GRASS, GNOME/KDE source, the authors' own repositories, a papers-we-love PDF), each named in its row. Search-result snippets were not used as evidence. A claim whose source I could not open stays unverified.

| Claim | Verdict | Basis |
|---|---|---|
| recall | unverified | HELD. The key is the only option that excludes 'digest' under the fixture rules. Real Gmail operator semantics rest on Gmail Help 7190 (proxy 403). No source that supports it could be opened from this host: the cited hosts return proxy 403 or fail DNS, and only GitHub raw, PyPI and npm are reachable. I did not verify it from memory or from search snippets. |

**Result:** 0 verified, 0 disputed, 1 held (unverified), 0 withdrawn.

## Pass 41

Checker: fact-checker, a fresh instance, 2026-10-15. I did not write, build or record any of these claims. Lesson status review, version 1. Method: I read Demo.tsx (and model.ts or the src/lib/lifehacks specs where the lesson uses them) for every learner-visible string before reading the builder's notes. I re-derived every derivation and simulation claim with my own scripts (node or python, kept in the session scratchpad under fc41/chk; the kit's mulberry32 copied verbatim, everything else re-implemented). Sources: the founder's pass-41 allow-list works only for bare hosts. ourworldindata.org, cran.r-project.org and pmc.ncbi.nlm.nih.gov open. gapminder.org, census.gov, naturalearthdata.com, rug.nl, doi.org, sciencedirect.com and econometricsociety.org all redirect to their www. hosts, which the proxy still blocks (403), so in practice they did not open. doi.org resolves only to publisher hosts, which are blocked. raw.githubusercontent.com, git clone and PyPI also work. WebFetch fails DNS for every host. A source counts only if I opened its text. I used no search snippets and nothing from memory. For secondary sources (for example a PMC article describing an older paper), the basis says so. No fetched page contained instructions addressed to an AI or to me; all pages were treated as data only.

| Claim | Verdict | Basis |
|---|---|---|
| recall | unverified | HELD. Real Gmail operator semantics (minus excludes, OR unions, space requires both) rest on Gmail Help 7190 (support.google.com: 403, not allow-listed). Under the fixture rules the key is the only option that excludes 'digest'. Needs support.google.com opened, or a reword to the fixture's own rules. |

**Result (Pass 41):** 0 verified, 0 disputed, 1 unverified (held).

Open items (each blocks publishing until fixed and re-checked by a fact-checker who is not the builder):

- recall (unverified): see the basis above for the fix or the source it needs.
