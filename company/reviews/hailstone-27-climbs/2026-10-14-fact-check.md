# Fact-check: hailstone-27-climbs (2026-10-14)

## Pass 22 (2026-10-14)

Checker: fact-checker. Method: read Demo.tsx (stage, reveal, model) against each open claim; re-ran the numbers in node with own re-implementations of the lesson's model (mulberry32 copied from src/kit/random.ts); web sources by search only (the proxy blocked every primary host tried: dl.acm.org, wikipedia, os-book.com, nasa.gov, university hosts). Search-result text is marked as such below.

| Claim | Verdict | Basis |
|---|---|---|
| c1 | verified | Own node: 27 takes 111 steps, peak 9,232 at step 77; first values 82, 41, 124, 62, 31, 94. |
| c2 | verified | Own node: 26 -> 10 (peak 40), 28 -> 18 (peak 52), 97 -> 118 (peak 9,232 at step 84); 97 is the longest under 100. |
| c3 | verified | Interpretive line resting on c1/c2 (10, 111, 18 for neighbours); holds. |
| c4 | verified | Learner sentence has no bound. Not opened (fit.vut.cz blocked). Search-result text: Barina, J. Supercomputing 77(3):2681-2688 (2021) confirmed as a paper, but the 2^68 bound was NOT confirmed from that text; Barina 2025 (J. Supercomputing 81) reports 2^71; Oliveira e Silva in Lagarias (2010) reports about 5.76 x 10^18. Builder should correct the bound in this source field or drop it. |
| c5 | verified | Lagarias (ed.) 2010, AMS, not opened; AMS book description and Lagarias overview (arXiv) state the problem is unsolved (search-result text). Consistent with my own knowledge to mid-2026. |

## Pass 24 (2026-10-14)

Checker: fact-checker (Ingrid). I did not write or build any of these claims. Scope: every unverified or disputed claim after the wave E revisions. Method: read Demo.tsx (predict, stage, every reachable branch, the state after Reset or Start over where the lesson has one, and the reveal gates), then re-ran the numbers in my own node copies of the lesson's logic (kit mulberry32 where seeded). I opened the builder's pre-flight only for count-the-out-of-order-pairs and each-element-pops-once, and only after reading the code. Hosts for primary sources were unreachable (DNS failure), so a row says when a verdict rests on derivation.

| Claim | Verdict | Basis |
|---|---|---|
| c6 | verified | Own run: the first value of 97's run that is on 27's run is 94 (97's step 13; 27's step 6), and the tails from 94 are identical, so 13 + 105 = 118 steps. 97's peak before 94 is 376, so its 9,232 peak comes from 27's path. |
| c7 | held (unverified) | HELD, not verified. Lagarias (1985) not opened; cecm.sfu.ca, arxiv.org and wikipedia all fail DNS. Search-result text found nothing that states 'no formula' (only that the map looks pseudorandom, Applegate-Lagarias). It is a state-of-knowledge claim, and only an openable source can settle it. To clear: a checker with access opens Lagarias 1985 or Lagarias (ed.) 2010, or the builder rewords it to something the stage shows ('each ? is filled only by running it'). |

**Result:** 1 verified, 0 disputed, 1 held (unverified), 0 withdrawn.

## Pass 25 (2026-10-14, W-238)

Checker: fact-checker (did not write these claims). Re-check after the pass 24 fixes. Method: read Demo.tsx first (every learner-visible string, every reachable branch including reduced motion and the state after any reset or list/tree switch), then the build.md Pre-flight; re-ran the numbers in my own node ports of the lesson's logic (session scratchpad fc25/). No builds. No sentence below is verified on an unopened source.

| Claim | Verdict | Basis |
|---|---|---|
| c7 | verified | (stage only). Demo.tsx: a start's Steps and Peak cells render '?' unless done.includes(n); done is appended only in show() when steps >= STEPS(n), and show() is called only by Step, Run to 1 and runOut (a chip pressed after a finished run runs the new start on stage). No other control fills a cell. Stage note 'Only running a start fills its ?.' and reveal 'Each ? in your table stayed a ? until you ran that start: only running the rule filled it in' match. The claim no longer states 'no known formula'; Lagarias is background only. |

**Result:** 1 verified, 0 disputed, 0 held unverified, 0 withdrawn.

## Pass 26 (2026-10-14)

Checker: fact-checker (wrote none of these claims; builder demo-builder). Scope: claims left unverified or disputed by the wave G revision (build.md Pre-flight, latest). Method: read Demo.tsx (stem, stage strings, every control path, Reset or its absence, reduced-motion branches, reveal) against each claim, then re-ran the numbers in my own node ports of the lesson logic (scratchpad fc26-b0/). No outside source was opened; no claim below rests only on one.

| Claim | Verdict | Basis |
|---|---|---|
| c6 | verified | Own node run: SEQ[97].findIndex(v in SEQ[27]) = 13, value 94, at 27's index 6; tails from 94 identical; 97 has 118 steps; 97's peak before 94 is 376, so its 9,232 peak is on 27's path. Stage line shows once show(97, steps >= 13) sets joinSeen (stepping, or runOut strides of 6: 6, 12, 18) and stays; reveal quotes it only if has(97) && joinSeen. Nit, not blocking: path chip 97 at the start, Step 13 times, chip 27, chip 97 (no run is finished, so no auto-run) leaves the line '..., ringed.' on stage while drawn[97] = 0 and no ring is drawn; the reveal cannot be open in that state with 97 done. Board item for demo-builder. |

**Result:** 1 verified, 0 disputed, 0 held unverified, 0 withdrawn.

## Pass 27 (2026-10-14, re-check of pass 26 disputes and rewordings, W-254)

Checker: fact-checker (wrote and built none of these claims). Method: read the pass 26 dispute, then the new Demo.tsx on every reachable branch, including the exact path that failed in pass 26, plus Reset and reduced motion where they exist. Then I re-ran the numbers in my own node scripts (session scratchpad fc27/). No builds. External source hosts were refused (proxy 403 / DNS), so nothing below is verified on an unopened source.

| Claim | Verdict | Basis |
|---|---|---|
| c6 | verified | Own node: join at 97's step 13, value 94 (27's step 6), tails identical, 118 steps, peak before the join 376. v5: one condition (drawn[97] >= 13) drives both the ring and the ', ringed.' ending. The pass 26 nit path (chip 97, Step x13, chip 27, chip 97) now reads '(its step 13).' with no ring. runOut strides and reduced motion (jump to 118) set joinSeen and ringOn together. |

**Result:** 1 verified, 0 disputed, 0 held unverified.

## Pass 35 (2026-10-14, batch 2)

Checker: fact-checker. I did not write or build these claims. Scope: every claim in this lesson that was neither verified nor withdrawn. Method: I read Demo.tsx (and any model.ts) first on every reachable path, including replays, reduced motion and the lack of a Reset where there is none, then the claims. I re-ran the numbers in my own node scripts (session scratchpad fc35/), not imported from the lesson. No screenshot: the dev server on :3530 was not running. Web hosts are blocked from this session (proxy 403 / DNS failure), so no verdict rests on a source I could not open; the only outside sources I opened are PyPI packages (ht 1.2.0 property tables, pint 0.26.1 unit definitions), named where used.

| Claim | Verdict | Basis |
|---|---|---|
| c3 | verified | Interpretive line on c1/c2: own node 26 -> 10, 27 -> 111, 28 -> 18 steps, all three neighbours on the stage table once run. Holds. |
| c4 | held (unverified) | State-of-knowledge claim ('every start checked so far reaches 1'). No openable source: Barina 2021 / 2025 and Oliveira e Silva not reachable (web blocked; GitHub repo xbarin02/collatz not enabled for this session). Pass 22's note stands: the 2^68 bound in this source field is not confirmed. My own run of every start below 10^6 reaching 1 does not establish the global claim. |
| c5 | held (unverified) | Open-problem status needs an opened source (Lagarias ed. 2010 or a current survey); none could be opened from this host. Consistent with my knowledge, but that is not a source. |
| c6 | verified | Own node: the first value of 97's run on 27's run is 94, at 97's step 13 and 27's step 6; the tails from 94 are identical; 97 takes 13 + 105 = 118; 97's peak before 94 is 376, so its 9,232 is on 27's path. Code: joinSeen set when show(97, steps >= 13); ringOn = drawn[97] >= 13 drives both the ring and the ', ringed' ending in the stage line and the reveal. Reveal string 'at the value 94 (its step 13, ringed) it joins 27's path' matches. |
| c7 | verified | Stage-only, re-read in v6: Steps and Peak cells render '?' unless done.includes(n); done grows only in show() when steps >= STEPS(n), called by Step, Run to 1 and runOut (a chip after a finished run starts runOut). Header chips only pick a start. Note 'Only running a start fills its ?.' renders when phase !== 'reveal'; reveal says 'Each ? stayed a ? until you ran that start.' |

**Result:** 3 verified, 0 disputed, 2 held (unverified), 0 withdrawn.

## Pass 38 (2026-10-14, set A)

Checker: fact-checker. I wrote and built none of these claims. Scope: every open claim in this lesson (set A of pass 38: ai, cs, math, physics, probability, economics, geography, lifehacks). Method: I read Demo.tsx (or the Life Hacks spec and engine) first, every learner-visible string, then the claims. I re-ran every number in my own node scripts (scratchpad fc38/: cluster.mjs, enemy.mjs, secret.mjs, plus inline runs), not imported from the lesson. Web: arxiv, publisher, government, Wikipedia and help-centre hosts return proxy 403 or fail DNS. Only raw.githubusercontent.com, PyPI and npm are reachable, so the sources I opened are files on GitHub (OpenStax CNXML, MicrosoftDocs, NetworkX, d2l, GRASS, GNOME/KDE source, the authors' own repositories, a papers-we-love PDF), each named in its row. Search-result snippets were not used as evidence. A claim whose source I could not open stays unverified.

| Claim | Verdict | Basis |
|---|---|---|
| c4 | unverified | HELD. No source that supports it could be opened from this host: the cited hosts return proxy 403 or fail DNS, and only GitHub raw, PyPI and npm are reachable. I did not verify it from memory or from search snippets. The xbarin02/collatz repository README (raw GitHub, opened) confirms Barina 2021 (J Supercomput 77: 2681-2688) and Barina 2025 (J Supercomput 81: 810) by citation, but states no result or bound. Pass 22's note stands: the 2^68 in the source field is unconfirmed. |
| c5 | unverified | HELD. No source that supports it could be opened from this host: the cited hosts return proxy 403 or fail DNS, and only GitHub raw, PyPI and npm are reachable. I did not verify it from memory or from search snippets. Open-problem status needs an opened survey (Lagarias ed. 2010 or later). |

**Result:** 0 verified, 0 disputed, 2 held (unverified), 0 withdrawn.

## Pass 41

Checker: fact-checker, a fresh instance, 2026-10-15. I did not write, build or record any of these claims. Lesson status review, version 6. Method: I read Demo.tsx (and model.ts or the src/lib/lifehacks specs where the lesson uses them) for every learner-visible string before reading the builder's notes. I re-derived every derivation and simulation claim with my own scripts (node or python, kept in the session scratchpad under fc41/chk; the kit's mulberry32 copied verbatim, everything else re-implemented). Sources: the founder's pass-41 allow-list works only for bare hosts. ourworldindata.org, cran.r-project.org and pmc.ncbi.nlm.nih.gov open. gapminder.org, census.gov, naturalearthdata.com, rug.nl, doi.org, sciencedirect.com and econometricsociety.org all redirect to their www. hosts, which the proxy still blocks (403), so in practice they did not open. doi.org resolves only to publisher hosts, which are blocked. raw.githubusercontent.com, git clone and PyPI also work. WebFetch fails DNS for every host. A source counts only if I opened its text. I used no search snippets and nothing from memory. For secondary sources (for example a PMC article describing an older paper), the basis says so. No fetched page contained instructions addressed to an AI or to me; all pages were treated as data only.

| Claim | Verdict | Basis |
|---|---|---|
| c4 | unverified | HELD. 'Every start checked so far reaches 1' needs an opened verification report (Barina 2021/2025, J Supercomput; Oliveira e Silva). None is on an allow-listed host: the journal is Springer (blocked), fit.vut.cz is blocked, PMC has no Collatz verification paper (PMC search 'Collatz conjecture': only encryption and graph papers), and Barak's TCS text (git clone, grep) does not mention Collatz. Pass 22's note stands: the 2^68 bound in the source field is unconfirmed. Fix: open Barina from a host that can reach it, or the builder rewords to what the lesson shows ('Every start this lesson tries reaches 1'). |
| c5 | unverified | HELD. The open-problem status needs an opened survey (Lagarias ed. 2010, AMS; arXiv overview). AMS and arXiv are not allow-listed, and no PMC, OWID, CRAN or GitHub-raw text I could find states the conjecture's status (PMC search: none relevant; Barak TCS: no mention). Not verified from memory. |

**Result (Pass 41):** 0 verified, 0 disputed, 2 unverified (held).

Open items (each blocks publishing until fixed and re-checked by a fact-checker who is not the builder):

- c4 (unverified): see the basis above for the fix or the source it needs.
- c5 (unverified): see the basis above for the fix or the source it needs.
