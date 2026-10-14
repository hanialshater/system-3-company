*Simulated learner. This review finds problems; it is not evidence that anyone learned.*

# Learner review (re-review r6): no-fraction-fits
lesson version: v3
boundary: adult beginner (even/odd, squares; proof by contradiction unfamiliar), same as r5. The brief's learner adds "knows the idea of a proof by contradiction"; I keep r5's stricter boundary on purpose.
Screenshots seen: yes (artifacts/walkthroughs/no-fraction-fits/sheet.png, 4 frames; integrated build 3 at localhost:3470)
Verdict: revise

## 1. From the artifact (written before reading the earlier review)

- **The title answers the question.** "No fraction fits" sits directly above "Can it be written exactly as a fraction ...?", whose answer is "No, never". The hook voices the misconception well ("surely some fraction hits √2 exactly?"), but the title has already denied it. A beginner who reads top to bottom is told the answer before committing. The options are otherwise good: "Yes: 99,999 / 70,710" is a believable trap.
- Locked stage: "If p/q = √2, squaring gives p² = 2 × q². So: is 2 × q² ever a perfect square?" over a number line from 1² to 2². This is algebra to hold before predicting, but it is one line and it frames the stage.
- Explore: slider q = 3 puts 2 × 3² = 18 between 4² = 16 and 5² = 25. Each number carries a count of its 2s: 16 has 4 (even), 25 has 0 (even), 18 has 1 (odd, in red). The caption reads "Nearest square 4² = 16: off by 2. Its 2s: 4, even; 18's: 1, odd." "Next close call" jumps to q = 5: 50 (2s: 1, odd) next to 49 (2s: 0, even), "off by 1", 7/5 → 1.9600.
- This is the real reason, on the stage. Every square's 2-count is even and every 2 × q² count is odd, and I see that pattern hold on each number I visit. The misses still get closer (1.78 → 1.96), but the red "odd" against the green "even" says why closer never becomes equal. That fixes r5's main complaint: the stage no longer argues for the misconception.
- Reveal: it quotes my own closest call (50 next to 49) and says "Close calls keep coming, so closeness cannot settle it. The 2s can." It then explains why a square has an even count (each 2 of p twice) and 2 × q² an odd one (q's twice, plus one), pointing at "7² had 0" and "50 had 1". No "lowest terms" or "contradiction" vocabulary is needed. About 115 words, near the budget.
- Show the why you promised: the doesNotKnow ("why no fraction equals √2") is stood for by the 2-count labels on every number on the line, and the reveal points at them. Pass.
- Minor (W-150): the reveal says "For q = 1, 2, 3, 5". The QA path visited 1 (locked), 3 and 5. The slider's two arrow presses skip q = 2, so 8 between 4 and 9 was never seen.
- Minor: the lower half of the stage is empty on a phone.
- Routed, not mine: the trust link reads 3/6 claims checked, so the new parity claims are not yet verified (fact-checker). The argument is correct: the 2-adic count of p² is 2·v₂(p), even; of 2q² it is 2·v₂(q) + 1, odd.
- No FATAL.

## 2. Earlier findings (r5 review, v2)

1. "Never" carried only by the reveal; the stage showed closer misses supporting the misconception: **fixed**. The 2-count labels show the never on stage.
2. "49 is odd and 50 is even" caption was a false lead: **fixed**. It is replaced by the count of 2s, which is a valid argument.
3. 288/289 example unvisited: **fixed**. The reveal quotes the learner's own 50/49. (New, smaller instance: "q = 2" quoted but not visited, see above.)
4. "Close is not equal; this proves it" pointed at the near misses: **fixed** ("closeness cannot settle it. The 2s can.").
5. Weak third option "Only with a calculator": **fixed** ("Yes: 99,999 / 70,710").

## 3. New findings

1. **Revise (top):** the title "No fraction fits" states the answer before the prediction. It is the only blocker I found, and a cheap one: a question title, for example "Does any fraction hit √2?", keeps the trap that the hook and options set.
2. Minor: "q = 1, 2, 3, 5" includes an unvisited q = 2.
3. Minor: empty lower stage; 3/6 claims checked (routed).
