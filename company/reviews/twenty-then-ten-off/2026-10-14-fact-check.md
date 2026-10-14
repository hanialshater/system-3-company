# Fact-check: twenty-then-ten-off (2026-10-14)

## Pass 10 (2026-10-14) (re-check of reworded claim)

Checker: fact-checker (did not write these claims; any claim marked 'recorded by the fact-checker' is a quote of the builder's stage text). Method: re-check of a reworded claim, so I read the current Demo.tsx text where the claim appears (the builder changed it after the last walkthrough) before the claim source, then re-derived every number in my own node scripts (own copies of mulberry32 and of each algorithm; scratchpad fc10/a.mjs, b.mjs, c.mjs, d.mjs) and checked citations. Egress to most publisher pages is blocked, so book passages I could not open are said so per claim.

| Claim | Verdict | Basis |
|---|---|---|
| c2 | verified | Re-check of the pass-9 dispute: TOTAL_PCT is now Math.round(((PRICE - FINAL)/PRICE)*1000)/10 = 28 (node), printed as '28%' in the option and '28% off' in the reveal. Claim matches the stage. |

**Result:** all claims in this pass verified.

## Pass 26 (2026-10-14)

Checker: fact-checker (wrote none of these claims; builder demo-builder). Scope: claims left unverified or disputed by the wave G revision (build.md Pre-flight, latest). Method: read Demo.tsx (stem, stage strings, every control path, Reset or its absence, reduced-motion branches, reveal) against each claim, then re-ran the numbers in my own node ports of the lesson logic (scratchpad fc26-b0/). No outside source was opened; no claim below rests only on one.

| Claim | Verdict | Basis |
|---|---|---|
| c1 | verified | Own node port of run()/seenLine() (fc26-b0/disc.mjs): [20,10] gives cuts 20 of 100 and 8 of 80, price 72, exact in floating point; Seen line 'Seen 20% then 10%: $20 off, then $8 of $80 -> $72 (28% off)'. Reveal reads seen['20>10'] ?? run([20,10]); every path (20 first, 10 first then Swap, repeated Swap, Reset and redo) records the same deterministic run, and Reset does not clear seen. |
| c2 | verified | pctOff(72) = Math.round(0.28*1000)/10 = 28 (node); shown as '28%' in the option, '28% off' on both Seen lines and in the reveal. |
| c3 | verified | run([10,20]): 10 of 100, then 18 of 90, price 72 (node). Seen line 'Seen 10% then 20%: $10 off, then $18 of $90 -> $72 (28% off)'. Swap order needs a finished order and records its reverse, so the swapped milestone guarantees both keys; the reveal fallback SWAPPED has the same values. |

**Result:** 3 verified, 0 disputed, 0 held unverified, 0 withdrawn.
