# Fact-check: four-in-a-row-two-thirds (2026-10-14)

## Pass 22 (2026-10-14)

Checker: fact-checker (did not write these claims). Method: read Demo.tsx (every learner-visible string, including computed ones and reachable fallback branches) against each claim, then re-ran the numbers in my own node scripts (scratchpad fc22/). Network to primary sources is blocked (Wikipedia, Google Patents, NIST, Cornell and other hosts return 403); where a claim rests on a source, the basis says whether it was corroborated by search snippets, taken from my own knowledge (Easley & Kleinberg chapter placement), or not checked.

| Claim | Verdict | Basis |
|---|---|---|
| c1 | verified | Own node iteration v <- 1 - v/2 from 0.5: 0.75 0.625 0.6875 0.6563 0.6719 0.6641 0.6680 0.6660 0.6670 ... -> 2/3; A = 1/3. Correction to this source: within $0.001 of 2/3 at round 8 (/e8/ = 1/1536), not 9, so SETTLED_AT = 8 (Demo comment '// 9' is stale; see c6). |
| c2 | verified | Definition matches the balanced outcome (Nash bargaining split with network outside options) in Easley & Kleinberg ch. 12 'Bargaining and Power in Networks' (chapter title confirmed by search snippet of the ToC; book host blocked; section placement from my own knowledge, confident) which credits Cook & Yamagishi (1992) for the concept (from memory, not opened). Round-by-round update is disclosed on the stage chip as the lesson's model. |
| c3 | verified | Reveal prints ROUNDS[1..3] = $0.750, $0.625, $0.688 (0.6875 toFixed(3) = 0.688, checked). Alternation follows from error e_r = -e_{r-1}/2. |
| c4 | verified | 3-node path: ends have only the centre, so any stable outcome gives the centre the full $1; E&K ch. 12 (placement from own knowledge, confident: the 3-path is that chapter's opening example). 'Nearly all' is fair for experiments with minimum units. |
| c5 | verified | Reveal muted line reads exactly this; stage chip discloses the model. |
| c6 | disputed | Unrecorded claim found by fact-checker 2026-10-14 (pass 22). SETTLED_AT = first round within TOL = $0.001 of 2/3 = round 8 (B 0.66602), not 9 as the Demo comment says. At round 8 (where 'Run until settled' stops) the stage readout shows 'B gets $0.666' and A '$0.334', while the reveal says settled at $0.667 by round 8 and A kept $0.333. DISPUTED: the reveal contradicts what the learner just saw. Fix (builder): TOL = 0.0005 gives round 9 (B $0.667, A $0.333 on the readout), or reword to 'came within $0.001 of $0.667 by round 8'. |

**Result:** 1 disputed claim(s); lesson cannot publish until the builder fixes the stage or the wording and a fact-checker re-checks.
