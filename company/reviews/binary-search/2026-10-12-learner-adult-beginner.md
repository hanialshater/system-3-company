*Simulated learner. This review finds problems; it is not evidence that anyone learned.*

Boundary used: remembers basic school arithmetic and everyday life (has played "guess my number"); has never studied binary search or logarithms.

## 1. From the artifact (written before reading the brief)

Sources: walkthrough transcript and screenshots (phone), QA phone-2-explore.png. I did not drive the lesson myself.

**Prediction.** Question: "what is the most guesses you could need?" Options: 10, About 50, About 100, About 500. As an adult I can make a real guess from experience of the game (I would say "about 10" or "about 50"). But "10" is the only exact number among three "About" options, so it stands out as the odd one. A guesser can pick it by elimination rather than from understanding. Also "Playing smart" is left undefined before I have seen any strategy, and "most guesses you could need" (worst case) is easy to read as "how many on average".

**Where understanding first broke.** Not in the controls. In the reveal: "After 0 guesses you had 1,000 numbers left." The reveal opens by talking about my play, but in the recorded path I played zero guesses that counted. Steps 3-6 show one guess, then "New number" reset everything to 1,000 and I never got past guess 1. The sentence reads as a bug.

**Explore vs the learner's actual question.** My question after predicting: "does it really only take 10?" Exploring lets me make one guess and see "499 numbers still possible", which is a small, real demonstration of halving. But nothing makes me play on to the end. The 10 dots are a nice progress cue, but I see only 1 of 10 filled. A real gap: the dots suggest 10 is a limit I am meant to hit, and never show me hitting it. I can reach "Show me why" from the very first screen without guessing at all (the button is present with 0 guesses and in the Step 1 state).

**Reveal: earned or told?** Mostly told. The chain "1,000 → 500 → 250 → 125 → 62 → 31 → 15 → 7 → 3 → 1" is asserted in text. What I was shown (one guess leaving 499) supports only the first arrow. "Your prediction held" appears for a learner who never got near ten guesses. The "million needs 20, billion 30" jump is pure assertion, with no way to see it in the widget. "Doubling the range adds one guess" is a good sentence, but I would have to take it on trust.

**Findings as problems**
1. The reveal can be reached with zero or one guess played, so "earned" evidence is missing; the opening line "After 0 guesses you had 1,000 numbers left" is odd and deflating.
2. "Your prediction held" is shown to a learner who has not tested the prediction.
3. Option "10" is the only non-"About" answer, which gives the answer away by form.
4. "Lower than 500" leaves 499 numbers, but the reveal chain says 1,000 → 500. A careful reader sees 499 on screen and 500 in text. The worst-case-vs-this-case distinction (62 not 62.5, "at most") is not explained.
5. Ambiguity about who the guesser is: "I pick a number" but I never see or confirm a hidden number or get a "you found it" ending. The game has no payoff moment for the tenth guess.
6. "Pick the middle" is a button doing the clever thing for me. Using it first makes the key insight (middle is best) something I am handed rather than discover. Slider guesses like 253 get no comparison with the middle.
7. Why the middle is best is told ("rules out half... whichever way") but never contrasted with a bad guess (e.g. guess 100, hear "higher", 900 left).

**FATAL:** none found in text. (Note, not marked fatal: finding 1 is close, since the reveal can be reached without seeing the key thing, repeated halving to the end. Under the rule "reveal can be reached without seeing the key thing" this arguably qualifies; I flag it as FATAL-candidate for the owner to decide.)

## 2. After reading the brief

- Intent: the misconception is "bigger range means proportionally more guesses; 50 or 100 for 1,000". The prediction options do target it (About 50 / About 100 / About 500). Experience: the distractors work, but "10" being the only exact option weakens the guess.
- Intent: learner can explain that the middle throws away half, and that doubling adds one guess. Experience: halving is stated and glimpsed once (499 left); "doubling adds one" is only told, and the 2,000-names recall question depends on it.
- Recall expects 11 for 2,000. A learner who only saw one guess has nothing in the lesson to derive 11 from except the told sentence.
- All four claims are unverified derivations; the 500-vs-499 gap in my finding 4 relates to claim c2 being "worst case", which the learner-facing text does not make visible.
- The brief's boundary (knows halving and the guessing game) matches mine; finding 1 stands independent of the brief.

Verdict: revise

