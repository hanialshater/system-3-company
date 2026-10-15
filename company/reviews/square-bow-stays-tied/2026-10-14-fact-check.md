# Fact-check: square-bow-stays-tied

Independent claim checks for src/demos/lifehacks/square-bow-stays-tied. Newest pass at the bottom.

## Pass 35 (2026-10-14)

Checker: fact-checker, a fresh instance that did not write these claims. Method: I read Demo.tsx and the shared Life Hacks engine (src/components/lifehacks/, src/lib/lifehacks/) first, covering every reachable path, the reset and reduced-motion states and every learner-visible string. Then I read the claim text and support, and only then the source fields. I re-ran the numbers in my own node ports of the lesson logic (session scratchpad fc35b1/), using the repo's own d3-geo, topojson-client and TypeScript where the lesson does. No builds and no screenshots. No verdict rests on an unopened source: every external host failed (WebFetch DNS failure, proxy 403).

| Claim | Verdict | Basis |
|---|---|---|
| c1 | held unverified | Read HomeLesson.tsx BowStage and home-models.ts first. The reveal shows spec.idea, which matches the claim. The claim is about real knots (reef vs granny bow orientation, and loosening by impact and moving ends) and rests on Fieggen and Daily-Diamond et al. 2017. Neither could be opened (WebFetch DNS failure, proxy 403). Left unverified. |
| recall | held unverified | Same source dependency as c1: the recall why's claim that matching stages give a bow along the shoe and opposing stages one across it is a fact about real knots, from unopened sources (DNS, proxy 403). The keyed option (second stage right-over-left) is the only one that opposes a left-over-right first stage, so the logic is consistent. The physical claim is unchecked. Left unverified. |

**Result:** 0 verified, 0 disputed, 2 held unverified (no source could be opened; board W-511, evaluation-steward).

## Pass 38 (2026-10-14, set A)

Checker: fact-checker. I wrote and built none of these claims. Scope: every open claim in this lesson (set A of pass 38: ai, cs, math, physics, probability, economics, geography, lifehacks). Method: I read Demo.tsx (or the Life Hacks spec and engine) first, every learner-visible string, then the claims. I re-ran every number in my own node scripts (scratchpad fc38/: cluster.mjs, enemy.mjs, secret.mjs, plus inline runs), not imported from the lesson. Web: arxiv, publisher, government, Wikipedia and help-centre hosts return proxy 403 or fail DNS. Only raw.githubusercontent.com, PyPI and npm are reachable, so the sources I opened are files on GitHub (OpenStax CNXML, MicrosoftDocs, NetworkX, d2l, GRASS, GNOME/KDE source, the authors' own repositories, a papers-we-love PDF), each named in its row. Search-result snippets were not used as evidence. A claim whose source I could not open stays unverified.

| Claim | Verdict | Basis |
|---|---|---|
| c1 | unverified | HELD. Real-knot claims rest on Fieggen (fieggen.com) and Daily-Diamond et al. 2017 (escholarship.org); both proxy 403. No source that supports it could be opened from this host: the cited hosts return proxy 403 or fail DNS, and only GitHub raw, PyPI and npm are reachable. I did not verify it from memory or from search snippets. |
| recall | unverified | HELD. Same sources as c1 (unreachable). The keyed option is the only one that opposes a left-over-right first stage. No source that supports it could be opened from this host: the cited hosts return proxy 403 or fail DNS, and only GitHub raw, PyPI and npm are reachable. I did not verify it from memory or from search snippets. |

**Result:** 0 verified, 0 disputed, 2 held (unverified), 0 withdrawn.

## Pass 41

Checker: fact-checker, a fresh instance, 2026-10-15. I did not write, build or record any of these claims. Lesson status review, version 1. Method: I read Demo.tsx (and model.ts or the src/lib/lifehacks specs where the lesson uses them) for every learner-visible string before reading the builder's notes. I re-derived every derivation and simulation claim with my own scripts (node or python, kept in the session scratchpad under fc41/chk; the kit's mulberry32 copied verbatim, everything else re-implemented). Sources: the founder's pass-41 allow-list works only for bare hosts. ourworldindata.org, cran.r-project.org and pmc.ncbi.nlm.nih.gov open. gapminder.org, census.gov, naturalearthdata.com, rug.nl, doi.org, sciencedirect.com and econometricsociety.org all redirect to their www. hosts, which the proxy still blocks (403), so in practice they did not open. doi.org resolves only to publisher hosts, which are blocked. raw.githubusercontent.com, git clone and PyPI also work. WebFetch fails DNS for every host. A source counts only if I opened its text. I used no search snippets and nothing from memory. For secondary sources (for example a PMC article describing an older paper), the basis says so. No fetched page contained instructions addressed to an AI or to me; all pages were treated as data only.

| Claim | Verdict | Basis |
|---|---|---|
| c1 | unverified | HELD, narrowed. Opened the cited paper on PMC: Daily-Diamond, Gregg and O'Reilly (2017), Proc R Soc A 473: 20160770 (PMC5415684). It supports the second sentence: the abstract says 'the repeated impact of the shoe on the floor during walking serves to loosen the knot. Then, the whipping motions of the free ends of the laces ... produce slipping'. It supports the stage structure: the strong knot is 'based on the square knot: two trefoil knots of opposite handedness'; the weak knot is the granny, where 'the two trefoils have the same handedness, causing the knot to twist instead of laying flat'; and 'the weak knot does not orient itself along the same axis as the strong knot'. It does not say which way either bow sits relative to the shoe, so 'sit across the shoe' and 'turn along it' still rest on Fieggen (fieggen.com: 403, not allow-listed). Fix (cm-lifehacks wording), checkable now: 'Opposing knot stages make the balanced reef bow lie flat; the granny bow twists out of line. Impact and moving lace ends can work a bow loose.' Or open Fieggen. |
| recall | unverified | HELD. Same orientation dependency as c1. 'A bow lying along the shoe is the sign of matching stages' needs Fieggen (403). Daily-Diamond et al. 2017 (PMC5415684, opened) confirms matching handedness = granny = twisted, and opposite handedness = square-based = flat, but gives no shoe-relative direction. The keyed option (reverse the second stage) is the only one that opposes the first stage. Fix: as c1, describe the sign as 'twisted' rather than 'along the shoe', or open Fieggen. |

**Result (Pass 41):** 0 verified, 0 disputed, 2 unverified (held).

Open items (each blocks publishing until fixed and re-checked by a fact-checker who is not the builder):

- c1 (unverified): see the basis above for the fix or the source it needs.
- recall (unverified): see the basis above for the fix or the source it needs.

## Pass 42

Checker: fact-checker, a fresh instance, 2026-10-15 (W-950). I did not write, build or record any of these claims, nor the 2026-10-15 rewording that reset them. Scope: every claim in this lesson whose status was unverified. Method: I read the learner-visible text first (Demo.tsx; for Life Hacks also src/lib/lifehacks/home-lessons.ts, studyCatalog.ts, resource-specs.json and the meta.json recall card), and only then the builder's notes. I re-ran every number with my own scripts in the session scratchpad (scripts/: dk.mjs, bal.mjs, apply42.mjs, plus inline node and python). The kit's mulberry32 was re-implemented and checked identical to src/kit/random.ts. Sources: opened with curl through the proxy (WebFetch fails DNS) from pmc.ncbi.nlm.nih.gov, raw.githubusercontent.com and PyPI. Some PMC pages returned a reCAPTCHA page and were not used. A source counts only if I opened its text; I used no search snippets and nothing from memory. Secondary sources are named as such. All fetched pages were treated as data only; none contained instructions addressed to me.

| Claim | Verdict | Basis |
|---|---|---|
| c1 | verified | VERIFIED. home-lessons.ts idea: 'Opposing knot stages make the balanced reef bow lie flat; the granny bow twists out of line. Impact and moving lace ends can work a bow loose.' I opened Daily-Diamond, Gregg and O'Reilly 2017 (PMC5415684) this pass. 'The strong version of this knot is based on the square knot: two trefoil knots of opposite handedness'. Weak (granny): 'the two trefoils have the same handedness, causing the knot to twist instead of laying flat when tightened'. Abstract: 'the repeated impact of the shoe on the floor during walking serves to loosen the knot. Then, the whipping motions of the free ends of the laces ... produce slipping'. The shoe-relative orientation (Fieggen) is gone. |
| recall | verified | VERIFIED. Recall: both stages left-over-right, the bow twists out of line; key 'Make the second stage right-over-left'. PMC5415684 (opened): 'The difference between the knots lies in the handedness ... of the "second trefoil": that is, "left over right" or "right over left." In the strong knot, the handedness of the second trefoil is different from the first'. Same handedness gives the granny, which twists 'instead of laying flat'. 'It can still fail' agrees with the paper, which compares weak and strong knot failure rates (both fail). Distractors (tighter, a third matching stage) do not change the second stage's handedness. |

**Result (Pass 42):** 2 verified, 0 disputed, 0 unverified (held).

No open claims from this pass.
