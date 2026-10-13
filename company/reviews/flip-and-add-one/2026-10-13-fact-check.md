# Fact-check: flip-and-add-one, 2026-10-13

## Pass 3 (2026-10-13)

Checker: fact-checker. Scope: claims open (unverified) in this lesson that were not added by a fact-checker, including builder-rewritten claims after claim fixes. Method: re-derived numbers in node from the Demo.tsx model code, compared each claim with what the stage and reveal text actually say, checked cited sources (web search where reachable; the BoE, NASA and UN hosts were not directly reachable from this sandbox).

| Claim | Verdict | What I re-ran / found |
|---|---|---|
| c1 Flipping every bit of 00000101 gives 11111010 (−6); adding 1 gives 111... | verified | ~5 & 255 = 11111010 (-6); +1 = 11111011 = -5. |
| c2 00000101 + 11111011 = 1 00000000: the carry falls off the end of 8 bit... | verified | 5 + 251 = 256: carry out, 8-bit result 0. |
| c3 So a machine can subtract by adding: a − b is a + (flip b, add 1), usi... | verified | Patterson & Hennessy 2.4 and 3.2: negate by invert-and-add-one, subtraction as addition. |
| c4 A minus-sign bit would not work here: 10000101 reads −123 in two's com... | verified | 10000101 = -123 in two's complement; 5 + 133 = 138 = 10001010, not 0. |

Result: 4 verified, 0 disputed, 0 added unverified.
