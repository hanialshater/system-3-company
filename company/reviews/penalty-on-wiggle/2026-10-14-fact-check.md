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
