*Simulated learner. This review finds problems; it is not evidence that anyone learned.*

# Learner review (re-review r2): rsa-lock-with-public-key
lesson version: v2
boundary: an adult beginner with school maths (powers, primes, dividing); has never seen "mod" or public-key cryptography.
Screenshots seen: yes (sheet.png, 9 frames, phone viewport, server :3425)
Previous review: 2026-10-14-learner-adult-beginner.md (v1, fatal)

## 1. From the artifact (fresh)

- Prediction: "Public key: n = 55, e = 3. You lock 7 as 7³ mod 55 = 13. If n had hundreds of digits, who could unlock 13?" The question now asks about real key size, so my factoring of 55 in three taps no longer contradicts the marked answer. I chose "Anyone with the public key".
- Explore path: message 9 locks to 14 ("Anyone can do this"); unlock with e gives a red 49 ("Not 9: e only locks"). That still breaks the belief directly. ÷2, ÷3, ÷5 finds 5 × 11, d = 27 appears, and unlock with d returns 9. The steps are clear.
- Reveal values: 9, 14, 49, 5 × 11, d = 27 were all visited. It quotes no unvisited state.
- Nothing gives the answer away before the prediction except the option wording (see N1).

New findings:
- N1 (minor): the right option, "Only someone who can find the factors 5 × 11", is the longest and most specific of the three, which makes it guessable. And because the question supposes n has hundreds of digits, "5 × 11" can't be its factors, which confused me for a moment. "Only someone who can find n's two prime factors" would fit the question.
- N2 (minor, carried over): the key insight, that big products are hard to split, is still only told in the reveal. The stage only lets me feel that 55 is easy. This is acceptable now that the question names the size, but it is the weakest part.

## 2. Earlier findings

- v1 FATAL, marked answer contradicted by the stage at n = 55: FIXED. The question now asks about hundreds of digits, and the 7 → 13 example wraps.
- Fix 1, make hardness felt: NOT FIXED (now minor, N2).
- Fix 2, acknowledge toy size in the question: FIXED.
- Fix 3, gloss "mod": NOT FIXED. "mod" is still never explained on the card. This is friction, not a block, because the who-question can be answered without it.
- "(5−1)(11−1) = 40" magic-formula line: NOT FIXED. It is still dense, but acceptable as a glimpse.
- Keys row scrolled off on the reveal frame: still true (minor).
- Trust link 6/7: FIXED (7/7).

Verdict: launch
