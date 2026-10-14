*Simulated learner. This review finds problems; it is not evidence that anyone learned.*

# Learner review (r9): karatsuba-three-not-four
lesson version: v5
boundary: cs-learner (from meta.json learner: knows splitting a problem and combining; does not know that two-digit halves can be multiplied with 3 products instead of 4)
Screenshots seen: yes (artifacts/walkthroughs/karatsuba-three-not-four/sheet.png and 05-reveal.png, recorded 2026-10-14T15:06)
Verdict: revise

## Findings (written from the walkthrough before reading build.md)

Path walked: chose "16"; tapped "Split once", "Split to 1 digit", "Check middle"; opened reveal.

1. **The prediction is easy once you see 64 = 4·4·4.** The question gives "4 per split … 64", so 3·3·3 = 27 is one step away. That is acceptable: the surprise is that 3 is possible at all, and the hook ("fewer digit products than n × n?") sets that up. 16 and 48 are good distractors.
2. **The payoff is shown.** "Check middle" prints (a+b)(c+d) = a·c + a·d + b·c + b·d and then the real numbers: schoolbook's a·d + b·c = 3,084,879 and 6,152,445 − 1,460,454 − 1,607,112 = 3,084,879. That is the "where did a·d and b·c go?" answer, computed and not asserted. The dot grids (64 against 3 × 9) make the count feel real.
3. **Where the idea I lack first appears:** recombining. Nothing shows how the three products become the full answer (shifting by powers of ten). "= 146,076,250,397,112 (both)" asserts it. Fine for 60 seconds; it is outside the stated gap.
4. **The reveal does not fit with its picture (revise).** In 05-reveal the stage has been cut at the top: its caption "Split each number into halves: a b and c d. Multiply the halves." and the rounded top edge are gone, and the stage starts at the "11141313 × 13111224 = …" line. The stage-top crop is not 0 at 390×844. Everything the reveal points at ("your check lines", 64 and 27) is still visible, so this is the fit rule's crop clause only. The reveal itself is short (42 words), so the space is going to the stage: the four-by-four schoolbook leaf grid plus the dot grids.
5. "About n^1.58 instead of n^2" is told. One claimed sentence of context is allowed.
6. The trust link reads "1/7 claims checked" (fact-checker's lane).

Verdict reason: the teaching works, but at the reveal the stage top is cropped on a phone. The demo standard requires a crop of 0.
