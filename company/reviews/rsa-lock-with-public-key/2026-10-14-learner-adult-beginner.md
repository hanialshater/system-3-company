*Simulated learner. This review finds problems; it is not evidence that anyone learned.*

# Learner review: rsa-lock-with-public-key
lesson version: v1
boundary: an adult beginner with school maths (powers, primes, dividing); has never seen "mod" or public-key cryptography.
Screenshots seen: yes (sheet.png, 9 frames, phone viewport)

## 1. From the artifact

- Prediction: "Public key n = 55, e = 3. You lock 2 as 2³ mod 55 = 8. Who can unlock 8?" "mod" is never explained anywhere on the card. A beginner can still answer the who-question, so this is friction, not a block. I chose "Anyone with the public key".
- Explore, first half is excellent: lock 4 → 9 ("Anyone can do this"), then "Unlock with e = 3" gives a red 14: "Not 4: e only locks." That directly breaks my belief that the public key undoes itself.
- Where understanding first broke: the factoring step. I, a learner who only had the public key, tapped ÷2, ÷3, ÷5, found 55 = 5 × 11 in three taps, got d = 27 and unlocked the message. So on this stage "anyone with the public key" did unlock it, and then the reveal says my answer was wrong. The lesson's own experience supports the option it marks wrong. The reveal's rescue ("No fast method is known for numbers hundreds of digits long") is told, and it is the whole point of the lesson.
- "55 = 5 × 11. So (5−1)(11−1) = 40, and d = 27: 3 × 27 = 81 = 2 × 40 + 1." is a magic formula to a beginner. I accept d = 27 because the unlock works, not because I follow this line. Fine to leave as a glimpse, but it is the densest text on the card.
- Reveal values: 5 × 11, d = 27, my message 4 all visited. No unvisited values.
- Phone: reveal fully visible; on the reveal frame the PUBLIC/PRIVATE keys row is scrolled off the top of the stage. Minor. Badge 75S. Trust link says 6/7 claims checked.
- Reveal earned: "e only locks" yes; "unlocking needs the factors" yes; "and the factors are hard to find" no, contradicted by the stage at this size.

Fixes (owner: builder):
1. Make the hardness felt: e.g. after factoring 55, show a real-size n (or a 4-digit n where ÷ taps clearly will not get there in 60 s) with a "try to split this" that visibly fails.
2. Or change the question/option so the toy size is acknowledged ("For a real key with a 600-digit n, who can unlock?").
3. One gloss for mod ("remainder after dividing by 55").

## 2. After reading the brief

- Objective includes "real keys are safe because factoring very large products is not known to be fast". That is the part the stage contradicts at n = 55 and only tells in words.
- The predict-answer claim is disputed by the fact-checker for a related, stronger reason: 2³ = 8 < 55, so the lock never wraps and anyone takes the cube root; and with 55 messages anyone can tabulate. So "Anyone with the public key" is literally correct for the question as asked, and the lesson marks it wrong. My beginner finding (I unlocked it myself with only the public key) reaches the same place from the learner's side.
- FATAL: the lesson's marked answer is false for the example it poses, and the stage lets the learner demonstrate that. Fix the question (message whose cube exceeds 55; ask about real key sizes) and show the hardness, then re-review.
- `learner.knows` lists "remainders (mod)" as a prerequisite; for a fresh adult beginner arriving from the feed, mod is unexplained.

## Kudos
- fact-checker (pass 10): the dispute on the predict answer (cube root of 8; tabulating 55 messages) is sharper than my finding and confirmed the problem was real, not beginner confusion.

Verdict: fatal
