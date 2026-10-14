# Fact-check: no-fraction-fits, 2026-10-14

## Pass 11 (2026-10-14)

Checker: fact-checker. Scope: claims still unverified after wave C revisions. Method: re-derived in node from the Demo.tsx model code, compared claim text with the stage/reveal code, checked cited sources.

| Claim | Verdict | What I re-ran / found |
|---|---|---|
| c5 When a square is off from 2 x q^2 by exactly 1, the square is odd and ... | verified | 2q^2 is even; /p^2 - 2q^2/ = 1 makes p^2 odd. Own node: off-by-1 cases for q <= 100 are exactly q = 1, 2, 5, 12, 29, 70 (Pell). Caption line 121 matches. |
| c6 If p/q = sqrt(2), squaring both sides gives p^2 = 2 x q^2. | verified | (p/q)^2 = 2, times q^2: p^2 = 2q^2. The multiply step is implicit in "gives"; acceptable. |

Result: 2 verified, 0 disputed.

## Pass 22

Checker: fact-checker (did not write these claims). Scope: the claims left unverified after the wave D wording reopen. Method: read Demo.tsx (and model.ts where used) against each sentence, then re-ran the numbers in my own node ports of the lesson's logic (scratchpad fc22-5); sources opened where reachable, otherwise marked as not opened.

| Claim | Verdict | Basis |
|---|---|---|
| c3 | verified | Own node with near(): q = 1..70 gives off 0 nowhere; off 1 exactly at 1, 2, 5, 12, 29, 70; 2 x 5^2 = 50, 7^2 = 49. BigInt check: no q up to 100,000 makes 2q^2 a perfect square. closest() sorts by off, then larger q, matching 'smallest miss, largest q'. |
| c4 | verified | Own derivation: if p = 2^a m and q = 2^b n with m, n odd, p^2 has 2a factors 2 and 2q^2 has 2b+1 (2 is prime, so counts add under multiplication); even never equals odd, so p^2 = 2q^2 has no whole solution. Cited Aristotle/Euclid/Hardy not opened; note they give the lowest-terms form of the proof, not this count-of-2s form. The sentence rests on the derivation. |
| c7 | verified | Own node with twos(): 256 has 8, 49 has 0, 50 has 1, 288 has 5; for every q in 1..70 both bracketing squares have even counts and 2q^2 odd. 16^2 is shown at q = 12 (288 between 256 and 289), 7^2 at q = 5. Stage labels '2s: n (even)' and '2s: n (odd)'. |

**Result:** every claim in this pass verified.

## Pass 26 (2026-10-14)

Checker: fact-checker (wrote none of these claims; builder demo-builder). Scope: claims open after the wave G revision. Method: read Demo.tsx (and model.ts) for every reachable branch, Reset and reduced motion before the claim sources, then re-ran the numbers in my own node scripts (scratchpad fc26-b1/). No build run.

| Claim | Verdict | Basis |
|---|---|---|
| c8 | verified | split(): 50, 16, 49, 9800 as quoted; all gloss numbers for q = 1..70 factor correctly. |

**Result:** every claim open at this pass is now verified.
