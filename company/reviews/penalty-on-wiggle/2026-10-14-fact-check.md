# Fact-check: penalty-on-wiggle (2026-10-14)

## Pass 22 (2026-10-14)

Checker: fact-checker (did not write these claims). Method: read Demo.tsx (every learner-visible string, including computed ones and reachable fallback branches) against each claim, then re-ran the numbers in my own node scripts (scratchpad fc22/). Network to primary sources is blocked (Wikipedia, Google Patents, NIST, Cornell and other hosts return 403); where a claim rests on a source, the basis says whether it was corroborated by search snippets, taken from my own knowledge (Easley & Kleinberg chapter placement), or not checked.

| Claim | Verdict | Basis |
|---|---|---|
| c5 | verified | Own re-run of the extracted model, seeds 1-500: lambda 10 held-out miss worse than none in 441/500 (88%, 'usually loses'), worse than the best moderate penalty in 500/500. Reveal branches on big.held > big.none, and big is set by every visit to 10 (slider, button or New data at 10); the gate (too-much) guarantees a visit. Independence: the claim was first recorded by fact-checker (2026-10-13), but the sentence verified here is demo-builder v4 wording, checked fresh this pass. |
| c6 | disputed | Mod branch checked: own re-run seed 1 at 0.001 gives 0.41 vs 0.44 none; mod keeps the visit with the smallest held - none. But the stage makes a different sentence on a reachable path: from penalty 0, pressing 'Penalty 10' (or End on the slider) reaches both milestones without visiting 0.0001-1, so mod is null and the fallback prints '{none} with no penalty, {now} now' with now = penalty 10 (seed 1: '0.44 with no penalty, 0.72 now') as 'the other story', the bug the v4 change meant to remove. Fix (builder): gate the reveal on a moderate visit, or in the fallback compute and quote the best moderate penalty on the current data set (and record that sentence). |

**Result:** 1 disputed claim(s); lesson cannot publish until the builder fixes the stage or the wording and a fact-checker re-checks.

## Pass 23 (2026-10-14)

Checker: fact-checker (wrote none of these claims; the two new claims are builder sentences recorded word for word). Method: read Demo.tsx (stage, every reachable branch, reveal, predict, plus the meta.json hook and recall card for new lessons) before claim sources; re-ran the numbers with my own node copies of the lesson logic (scratchpad fc23/). Sources: every scholarly host (cornell.edu, arxiv, journals, crossref, openalex, semantic scholar, Wikipedia, UPenn, UVM) was unreachable through the proxy, so no paper or book was opened. A claim that rests only on such a source is HELD as unverified, not verified; claims verified by derivation or simulation say so in their row.

| Claim | Verdict | Basis |
|---|---|---|
| c6 | verified | Ran the MODEL block plus the reveal's fallback with node strip-types (fc23/pow.ts). Fallback output: seed 1 'the best moderate penalty, 0.01, gives 0.38 against 0.44 with none' (seed 2: 1, 0.42 vs 0.58; seed 3: 0.01, 0.32 vs 0.94), which matches the claim and the builder's run. The jump-to-10 path now quotes a moderate penalty, not penalty 10. The mod branch keeps the visit with the smallest held - none; re-checked. Advisory, not a dispute: the numbers are always true, but 'the other story' reads as 'held-out got better'. Two cases print a held-out miss worse than none. (a) The only moderate visit was a worse lambda, e.g. tapping the track at 1 on data set 1 gives 0.55 against 0.44. (b) The fallback lands on one of the 10/500 seeds where no moderate penalty wins (186, 200, 208, ...). |

**Result:** every claim in this lesson is now verified.

## Pass 26 (2026-10-14, batch 2, wave G revisions)

Checker: fact-checker (wrote and built none of these claims). Method: read Demo.tsx first (every learner-visible string, every reachable branch, Reset/Start over where it exists, reduced motion where it applies; this lesson has no motion-dependent text), then the build.md Pre-flight; re-ran the numbers in my own node ports of the lesson's logic (scratchpad fc26-b2/). No builds. No sentence below is verified on an unopened source; external hosts failed DNS this pass.

| Claim | Verdict | Basis |
|---|---|---|
| c6 | verified | Ran the MODEL block plus both reveal branches with node strip-types (fc26-b2/pow.ts). mod is overwritten on every visit to λ 0.0001..1 (slider, or New data at a moderate λ, always the state then on stage), so it is the last moderate stop; the Seen line prints the same mod and big values and survives New data. QA path: 0.0001 then 0.001 gives "at penalty 0.001 on data set 1 you saw 0.41 against 0.44 with none."; stopping last on 1 gives "0.55 against 0.44 with none (that one did not win)." Fallback (Penalty 10 first, mod null): seed 1 "the best moderate penalty, 0.01, gives 0.38 against 0.44", seed 2 "1, 0.42 vs 0.58", seed 3 "0.01, 0.32 vs 0.94". Advisory, not a dispute: the win test uses unrounded values, so in 61 of 2,500 seed/λ pairs (e.g. set 5 at 0.0001) the sentence prints equal two-decimal numbers with no suffix, and 65 equal-looking pairs carry "(that one did not win)"; the fallback adds no suffix on the 10/500 seeds where no moderate λ wins. |

**Result:** 1 verified, 0 disputed, 0 held unverified.

## Pass 35 (2026-10-14)

Checker: fact-checker, a fresh instance that did not write these claims. Method: I read Demo.tsx first, covering every reachable path, the reset and reduced-motion states and every learner-visible string. Then I read the claim text and support, and only then the source fields. I re-ran the numbers in my own node ports of the lesson logic (session scratchpad fc35b1/), using the repo's own d3-geo, topojson-client and TypeScript where the lesson does. No builds and no screenshots. No verdict rests on an unopened source: every external host failed (WebFetch DNS failure, proxy 403).

| Claim | Verdict | Basis |
|---|---|---|
| c3 | verified | Read v7 Demo.tsx first. Own node port of makeData, fit and rms over seeds 1 to 500: at λ = 0 the training rms is at most 1.4e-12 (shows '0.00') in all 500. Training rms never falls along 0, 1e-4, ..., 10 in all 500 seeds, as ridge theory says. Any λ > 0 gives a rms above 0. Note (display, not a defect in the claim): at λ = 1e-4 the rms is below 0.005, so the readout shows '0.00' in 5 of 500 seeds (not seeds 1 to 3: 0.084, 0.061, 0.167). |
| c5 | verified | Own port: on seed 1, held-out at λ 10 is 0.72 vs 0.44 with none. The reveal's comparison is big.held vs big.none, i.e. against no penalty: λ 10 loses to none in 441 of 500 seeds (88%), so 'usually loses' holds in the sense the sentence uses. It also does worse than the best moderate λ in 500 of 500 (the claim's own statistic). Branches: 'lost again' if held > none, 'still won here, though it usually loses' otherwise, and 'and usually loses again' if 10 was never visited. Values come from visit() at the moment of the visit (seed, held, none), so they are the learner's own. |
| c6 | verified | Own port: mod is the last moderate λ (indices 1 to 5) visited; the reveal and the 'Seen held-out' line print the same mod values, with '(that one did not win)' when held ≥ none. Fallback with mod null: the best of λ 1e-4..1 on the current seed. Seed 1: best 0.01, 0.38 vs 0.44, matching the claim's example. Some moderate λ beats none in 490 of 500 seeds. Non-blocking nit (not this claim): while locked, the 'Held-out (no penalty)' readout already prints '– (0.44)'. |

**Result:** 3 verified, 0 disputed, 0 held unverified.
