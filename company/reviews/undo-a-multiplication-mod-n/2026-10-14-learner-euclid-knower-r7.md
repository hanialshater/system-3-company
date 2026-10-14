*Simulated learner. This review finds problems; it is not evidence that anyone learned.*

# Learner review (r7): undo-a-multiplication-mod-n
lesson version: v2
boundary: euclid-knower (same tag as r6). Knows that Euclid's remainders find a gcd and that clock arithmetic wraps at the clock size. Has never run Euclid backwards or met a modular inverse.
Screenshots seen: yes (artifacts/walkthroughs/undo-a-multiplication-mod-n/sheet.png, 8 frames, build 4 at localhost:3480)
Verdict: launch

## Findings (written from the walkthrough before reading the brief or the r6 review)

Walked as someone who can run Euclid's algorithm for a gcd and has never back-substituted, or met a modular inverse.

1. **No answer before the commit.** The locked ring is labelled "×7: x = 0…25 lands on all 26 hours". That hints that an undo exists, not which one. Options 11 / 15 / 19 are all bare numbers. 11 is a clever trap: it is the bare coefficient from back-substitution.
2. **The why is on the stage, step by step.** The division lines build up (26 = 3 × 7 + 5 … 2 = 2 × 1 + 0), and the remainder 1 is coloured. "Back up" lines turn into "1 = 3 × 26 − 11 × 7". "Read off x" adds "-11 + 26 = 15 · 7 × 15 = 105 = 4 × 26 + 1" and puts a green dot at 1 and a red ring at 25 for "your 7 × 11 = 77 → 25". My wrong guess gets a place on the clock. That is the reveal quoting what I saw, before the reveal.
3. **"Back up to 26 and 7" does two substitutions in one tap.** The first "Back up" shows one swap. The second button adds two lines at once ("swap in 2 = …", "swap in 5 = …"). For someone who has never back-substituted, the second swap is the one where the 26 appears, and I just watched it happen. That is the step I would most need to do myself. Minor, because the lines stay on the stage to re-read.
4. **Stage text is heavy.** At "Read off x" the stage holds the caption, two ring labels, 4 division lines, 3 back-up lines and the read-off line. That is well over 25 words of equations at once on a phone. The equations are the representation, but the ring and the equation column compete, and the ring only matters at the end.
5. **×13 contrast lands.** "26 = 2 × 13 + 0", "gcd = 13, not 1: no way to write 1. ×13 has no undo.", and the ring dims to just 0 and 13. I see why gcd 1 is the condition without being told.
6. **The reveal frame is scrolled past the ring.** The ×7 trace survives as "×7: x = 15, 7 × 15 = 105 → 1 · your 7 × 11 = 77 → 25", so the quoted numbers are visible. "12 of the 25 non-zero hours here have one" is told context.
7. Wording: "-11 × 7 is 1" in the reveal means "lands on 1 o'clock". It is a little loose, but clear in context.

What the prediction felt like: honest. I guessed 11 because I half-remembered a back-substitution, and the stage showed me why that is off by a sign.

Verdict reasoning: the stage carries both halves (how to find the undo, and when none exists), and the trap answer is answered on the clock.

## Earlier findings (r6), checked after the findings above were written

1. Revise: "an undo exists exactly when gcd is 1" told only: **fixed.** "Times 13" runs Euclid to gcd 13, the ring lights only 0 and 13, and UNDO ×13 reads "none".
2. Revise: no clock on the stage: **fixed.** A 26-hour ring now shows 7 × 15 landing on 1 and my 7 × 11 landing on 25.
3. Reveal unreachable on the once-per-control path: **fixed.** "Divide to the end" and "Back up to 26 and 7" make the path reachable, and the walkthrough opened the reveal.
4. Stage over the text budget, and presses do the algebra: **not fixed** (finding 4 above, minor).
5. 75 s chip: **not fixed** (product-owner item, not a learner blocker).
- r6's note on the misconception ("undo by dividing"): still not confronted on the stage. Minor at this boundary.

## Verdict

Launch. Both halves of the idea are now drawn on the clock, and my wrong answer has a place on it. Polish, not blockers: thin the equation column, and let the second back-substitution be its own press.
