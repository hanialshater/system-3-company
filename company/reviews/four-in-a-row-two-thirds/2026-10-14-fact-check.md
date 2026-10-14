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

## Pass 23 (2026-10-14)

Checker: fact-checker (wrote none of these claims; the two new claims are builder sentences recorded word for word). Method: read Demo.tsx (stage, every reachable branch, reveal, predict, plus the meta.json hook and recall card for new lessons) before claim sources; re-ran the numbers with my own node copies of the lesson logic (scratchpad fc23/). Sources: every scholarly host (cornell.edu, arxiv, journals, crossref, openalex, semantic scholar, Wikipedia, UPenn, UVM) was unreachable through the proxy, so no paper or book was opened. A claim that rests only on such a source is HELD as unverified, not verified; claims verified by derivation or simulation say so in their row.

| Claim | Verdict | Basis |
|---|---|---|
| c1 | verified | Own node copy of shares() with TOL = 0.0005: 0.75, 0.625, 0.6875, 0.65625, ..., round 8 0.66602 (outside TOL), round 9 0.66699 (inside), rounds 10-14 stay inside. SETTLED_AT = 9, which matches the source and the Demo comment at line 34. Fixed point v = 1 - v/2 gives 2/3, and A = 1/3. Readouts at round 9 and later: B $0.667, A $0.333. |
| c6 | verified | Demo.tsx v2: the reveal prints 'settled at $0.667 (two thirds) by round 9. A kept $0.333.' 'Run until settled' calls go(max(round, 9)), and 'settled' needs round >= 9, so the learner has seen round 9 or later. Every round from 9 to 14 reads B $0.667, A $0.333 (own node), so the reveal matches the stage on every path. |

**Result:** every claim in this lesson is now verified.

## Pass 24 (2026-10-14)

Checker: fact-checker (did not write these claims). Wave E revision. Method: read Demo.tsx first (every learner-visible string, every reachable branch and the state after any reset control), then build.md Pre-flight; re-ran every number in my own node scripts using the lesson's own logic (scratchpad fc24/). No builds. Web egress to source hosts is blocked (proxy 403); no claim below is verified on an unopened source alone.

| Claim | Verdict | Basis |
|---|---|---|
| c3 | verified | Own node of shares(): B 0.5, 0.75, 0.625, 0.6875, 0.65625 ... ; trace row prints toFixed(3).slice(1): '.500 .750 .625 .688 ...'. Fallback oB = 1 - vC links the two inner people. |
| c6 | verified | Own run: first round within 0.0005 of 2/3 is round 9 (0.66699; round 8 0.66602); usd -> '$0.667', A 1 - 0.66699 -> '$0.333'; all later rounds stay within tolerance. Fixed point v = 1 - v/2 gives 2/3. |
| c7 | verified | Own run: round 1 share 0.75 (C = B by symmetry), round 2 fallback 1 - 0.75 = 0.25 -> '$0.250'. Chip 'B's fallback = $1 − C's last share' matches. |

**Result:** all open claims verified; no disputes.
