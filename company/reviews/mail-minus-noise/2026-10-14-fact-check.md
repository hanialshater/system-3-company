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
