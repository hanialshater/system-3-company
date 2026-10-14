# Fact-check: fenwick-hops-by-lowest-bit (2026-10-14)

## Pass 21 (2026-10-14)

Checker: fact-checker (wrote and built none of these claims). Method: read Demo.tsx (predict, stage, readouts, reveal) against each claim, then re-ran the numbers in my own node scripts copying the lesson's logic (session scratchpad fc21/). Primary sources were unreachable (proxy blocks the hosts); rows say where a verdict rests on derivation or on web-search secondary text instead.

| Claim | Verdict | Basis |
|---|---|---|
| c1 | verified | Demo CELL[i] = sum V[i-low(i)+1..i] with low(i) = i & -i; -i = ~i + 1 isolates the lowest set bit. Fenwick 1994, Softw. Pract. Exp. 24(3):327-336 (DOI 10.1002/spe.4380240306) confirmed bibliographically by web search; paper not opened (host blocked). Definition verified against the code and derivation. |
| c2 | verified | node fen.mjs: hopsDown(13) = 13, 12, 8 covering [13], [9..12], [1..8]; 15 -> 15 14 12 8; 7 -> 7 6 4. |
| c3 | verified | node: cells 1..16 = 3 4 4 9 5 14 2 31 5 8 5 21 9 16 9 80; 9 + 21 + 31 = 61 = direct prefix sum. The digits are those of pi (3.141592653589793). |
| c4 | verified | node: hopsUp(1) = 1 2 4 8 16; every running total 1..16 contains position 1. |
| c5 | verified | Derivation re-done; node n = 1024: at most 10 down hops, 11 up hops (floor(log2 n) + 1). |

**Result:** 5 verified, 0 disputed, 0 withdrawn.

## Pass 24 (2026-10-14)

Checker: fact-checker. Wave E revisions (build.md Pre-flight read after the code). Method: read Demo.tsx against each open claim, including every reachable branch and the state after Reset/Start over; re-ran the numbers in node with ports of the lesson's own functions (mulberry32 copied from src/kit/random.ts). No web sources were needed: no learner sentence below rests on an unopened source.

| Claim | Verdict | Basis |
|---|---|---|
| c2 | verified | Own node hopsDown(13) = 13, 12, 8 (1101, 1100, 1000); ranges 13, 9-12, 1-8 tile 1-13; sum 61 = RUN[13]. Prefix 15: 15, 14, 12, 8; prefix 7: 7, 6, 4. Reveal requires milestone tiled (start 13), so qSum exists. |
| c4 | verified | Own node hopsUp(1) = 1, 2, 4, 8, 16 (5 cells); every running total 1..16 includes position 1, so all 16 change. Stage readouts 5 and 16 match. |
| c5 | verified | Re-derived: down hops = popcount(i), up hops <= floor(log2 n) + 1. Own node over i = 1..16: max 4 down, max 5 up (from 1). 'About log2 n' accurate. Fenwick 1994 not opened; not needed. |
| c6 | verified | Own node prefix sums of V = 3 1 4 1 5 9 2 6 5 3 5 8 9 7 9 3: 3, 4, 8, 9, 14, 23, 25, 31, 36, 39, 44, 52, 61, 68, 77, 80. |

## Pass 26 (2026-10-14, batch 2, wave G revisions)

Checker: fact-checker (wrote and built none of these claims). Method: read Demo.tsx first (every learner-visible string, every reachable branch, Reset/Start over where it exists, reduced motion where it applies; this lesson has no motion-dependent text), then the build.md Pre-flight; re-ran the numbers in my own node ports of the lesson's logic (scratchpad fc26-b2/). No builds. No sentence below is verified on an unopened source; external hosts failed DNS this pass.

| Claim | Verdict | Basis |
|---|---|---|
| c7 | verified | Own node: i += i & -i from 1 gives 1, 2, 4, 8, 16 (each step doubles, since a power of two is its own lowest bit); independently, position 1 lies in cell j = (j - lowbit(j), j] only when j is a power of two, so for N = 16 the cells are exactly 1, 2, 4, 8, 16 (Fenwick 1994 not opened; not needed). Generated line: "Change position 1, hop up by adding the lowest 1 bit: 1=00001 → 2=00010 → 4=00100 → 8=01000 → 16=10000". up is never cleared (button disabled once set), so the line stays. |

**Result:** 1 verified, 0 disputed, 0 held unverified.

## Pass 35 (2026-10-14, batch 3)

Checker: fact-checker (fresh instance; drafted none of this wording). Artifact: cs/fenwick-hops-by-lowest-bit v4. Method: read Demo.tsx first, tracing every reachable path, Reset (where present) and reduced motion; re-ran the numbers in node/Python with independent re-implementations; checked how-chosen notes. Web sources could not be opened from this host (web fetch DNS failure, proxy 403), so nothing here is verified on an unopened source. No screenshots: the dev server at localhost:3530 did not respond. Scripts: scratchpad fc35-3/.

| Claim | Verdict | Basis |
|---|---|---|
| c1 | verified | v4 reveal 'An index's lowest 1 bit is its cell's range length' and the stage note 'Cell i covers the last (i & −i) numbers up to i' match CELL[i] = sum V[i-low(i)+1..i]. Own node: i & -i equals the isolated lowest set bit for i = 1..64. Openable independent source: npm fenwick-tree@0.0.0 (tarball sha256 0e1184a1…dac9, 0-based variant where cell at covers (at & (at+1))..at, i.e. i-lowbit(i)+1..i for i = at+1) builds the same 16 cells 3 4 4 9 5 14 2 31 5 8 5 21 9 16 9 80 from the stage numbers and gives prefix 13 = 61. Fenwick 1994 not opened (hosts blocked). |
| c2 | verified | Own node hopsDown(13) = 13, 12, 8 (1101, 1100, 1000); ranges [13], [9..12], [1..8] tile 1-13; sum 61. v4 reveal text is generated from qSum (milestone tiled, required) so it always reads '…tile 1–13 with no gaps: 3 reads for 13 numbers (61)'. Trail inside the picture reads 13=1101 → 12=1100 → 8=1000 → 0=0000. Target is now fixed at 13, so the trace cannot be cleared. |
| c3 | verified | Own node cells 9, 21, 31 for 13, 12, 8; 9 + 21 + 31 = 61 = direct sum of the first 13 numbers; npm fenwick-tree gives the same table. Finished note string (cur = 0) is 'Cells 13, 12, 8 cover 1–13: 9 + 21 + 31 = 61.', matching the claim. |
| c4 | verified | Own node hopsUp(1) = 1, 2, 4, 8, 16 (5); independently, position 1 lies in cell j iff j - lowbit(j) < 1, i.e. j is a power of two: {1, 2, 4, 8, 16}. Every running total 1..16 includes position 1, so all 16 change. Picture reads 'Fenwick cells changed: 5' and 'Σ: plain running totals · changed: 16'; reveal '5 cells changed, against all 16 in the Σ row'. Reveal needs milestone update; the button disables after one press and nothing clears up. |
| c5 | verified | Re-derived: a down hop clears one set bit (at most floor(log2 n) + 1 hops), an up hop strictly raises the lowest set bit (at most floor(log2 n) + 1 within n). Own node over i = 1..16: max 4 down, max 5 up. 'About log2 n' accurate; does not rest on Fenwick 1994. |
| c7 | verified | Own node: i += i & -i from 1 gives 1, 2, 4, 8, 16; bin5 gives 00001, 00010, 00100, 01000, 10000. Picture lines (y = BASE+92, BASE+106) read 'Change position 1: hop up by adding the lowest 1 bit' / '1=00001 → 2=00010 → 4=00100 → 8=01000 → 16=10000' once up is set; up never clears. |
