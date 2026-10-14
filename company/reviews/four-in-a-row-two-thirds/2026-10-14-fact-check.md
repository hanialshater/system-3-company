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

## Pass 35 (2026-10-14)

Checker: fact-checker, fresh instance (wrote none of these claims). Method: read Demo.tsx first (stage, chip in every branch: locked, round 0, round N; trace rows; Reset; reveal; predict; hook and recall in meta.json), then the claim text and support, then source fields. Re-ran numbers in my own node scripts (scratchpad fc35/). No source host could be opened (WebFetch and curl fail DNS or proxy 403 for cornell.edu, berkeley.edu, arxiv.org, wikipedia.org), so nothing below is verified on an unopened source; claims verified here rest on the code or on a derivation re-run.

| Claim | Verdict | Basis |
|---|---|---|
| c2 | verified | Learner text describes the lesson's own rule, checked against Demo.tsx v5 shares(): oB = 1 - vC (C's last share), vB = oB + (1 - oB)/2 (A's fallback 0, so cover both, halve the rest). Chip: locked 'Each pair covers both fallbacks, then halves the rest'; round 0 'no fallbacks yet, each pair halves $1'; round N 'B's fallback = $1 − C's last share x = y'. All match. The Easley and Kleinberg / Cook and Yamagishi attribution in the source field was NOT opened (hosts unreachable) and is not in learner text; it is not the basis of this verdict. |
| c3 | verified | Own node of shares(): rounds 1-3 B = 0.75, 0.625, 0.6875 -> usd '$0.750, $0.625, $0.688' (reveal is ROUNDS.slice(1,4)); trace row toFixed(3).slice(1) gives '.500 .750 .625 .688 ...'. maxSeen is not reset by Reset, so the row persists. Swing follows from oB = 1 - vC. |
| c5 | verified | Convention. Reveal muted line reads 'A model, not a forecast of real bargains.' Consistent with the stage chip, which states the model rule. |
| c6 | verified | Own run, TOL 0.0005: round 8 0.66602 (outside), round 9 0.66699 (first inside), rounds 10-14 stay inside; SETTLED_AT = 9. usd -> '$0.667', A 1 - 0.66699 -> '$0.333'. Reveal needs milestone 'settled' (round >= 9), so the learner has seen a round reading $0.667. |
| c7 | verified | Own run tracking vB and vC separately: equal every round (symmetry). Round 1 C = 0.75 -> '$0.750'; round 2 fallback 1 - 0.75 = 0.25 -> '$0.250' (reveal uses ROUNDS[1].inner and ROUNDS[2].fallback). Trace row 'B's fallback: .000 .500 .250 ...'. |
| c8 | verified | Verified as a derivation under the lesson's own rule, not on the cited source (not opened). 3-path A-B-C with A-B matched: C has no deal (share 0), so B's fallback is 1 - 0 = 1 and B gets 1 + 0/2 = $1 (own node). 'Nearly all' is weaker than 'all', so it holds; c5 frames it as a model. |
| c9 | verified | Derivation: oB = 1 - vC and oC = 1 - vB in shares(), so each inner fallback is set by the other's share; fixed point v = 1 - v/2 = 2/3 < 1 (own run converges to 0.66666). Contrast with the 3-path (c8) where the centre gets 1. 'Power depends on the network' is the lesson's interpretive conclusion from that contrast, consistent with the model. |

**Result:** all seven open claims verified on code and derivation; none rests on an unopened source. No disputes.
