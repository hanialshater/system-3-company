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
