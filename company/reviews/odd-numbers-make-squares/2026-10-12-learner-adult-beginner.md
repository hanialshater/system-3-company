*Simulated learner. This review finds problems; it is not evidence that anyone learned.*

# Learner review: odd-numbers-make-squares

Knowledge boundary used: remembers school arithmetic (adding, times tables, "squared" as n x n, vaguely), lives everyday life; has never studied number patterns or proofs; has never seen a dot-array/gnomon argument. Phone viewport. Method: transcript + screenshots (walkthrough and QA phone), plus my own Playwright run of the live lesson (all ten steps, and a wrong prediction).

## 1. From the artifact (written before reading the brief)

**Where understanding first broke.** It did not break; it was never tested. The question hands over the pattern: "1 + 3 = 4 = 2 × 2 and 1 + 3 + 5 = 9 = 3 × 3. Keep adding the next odd number, up to 19. The totals…". I would pick "stay perfect squares every time" because two examples are given and the headline says "Odd numbers are secretly squares". The first moment I get lost is the reveal: "Every odd number you added landed as an L: one row and one column sharing a corner. Wrapping a 3 × 3 square needs 3 + 3 + 1 = 7 dots". I have only seen what is on screen; "wrapping a 3 × 3 square needs 3 + 3 + 1" is an arithmetic step I must take on trust, and "A 9 × 9 square needs 19" arrives with no picture.

**Did the prediction allow a real guess?** Barely. Two worked examples plus a title that states the answer make option 1 a read-the-room pick, not a guess. Options 2 and 3 look like decoys. A beginner has no reason to doubt the pattern, so the "surprise" is only that it holds. The hook "1 + 3 + 5 + 7 looks like a random pile" is never something I thought; I did not see the sum as random.

**Did exploring answer my actual question?** My question after predicting is "why would that keep working?". The control (+3, +5, ...) answers "does it keep working?" and the dots-in-an-L picture hints at why, which is good. But:
- The exploration is a single button. Each tap shows 1 new L and the caption "The 5 new dots wrap 2 × 2 into 3 × 3." The caption states the mechanism, so I am told it as much as shown it. The new L is coloured differently, which does help.
- The walkthrough's own run shows the problem: it tapped "Add 3", then "Take the last one away" three times over and never got past 2 × 2. The reveal was still reached ("Show me why" appeared after the first tap, 04-step-3.png). Exploring to 10 × 10 is optional and nothing nudges it.
- On phone at 10 steps the equation wraps ("1 + 3 + 5 + ... + 17 + 19 = 100 = 10 × 10") and the TOTAL tile drops to a second row; readable but cramped. The L at the top and right edge is clear.
- The old dots fade into a light grid with a dashed border; at 2 × 2 the dashed box around the single old dot is easy to miss.

**Was the reveal earned by what was SHOWN or only TOLD?** Partly told. After one tap I have seen 1 + 3 = 4 which the question already stated. "Every odd number you added landed as an L" is then asserted over, at that point, one L. The "7 for a 3 × 3" and "19 for 9 × 9" figures and the 100 / 10,000 leap are told. The step that would convince me (the L around n x n has n + n + 1 dots, so it is always the next odd number) is only in prose, with no animation or count shown on the L itself.

**The wrong-prediction path.** I picked "are squares only sometimes" and got "Try it first" until I tapped once, then the reveal opened with the line telling me my pick did not hold (quoted ending: ...squares every time”). That is fine.

### Findings (problems)
1. FATAL: The reveal can be reached without seeing the key thing. After a single "+ 3" tap (a 2 × 2, already stated in the question) "Show me why" unlocks and the reveal says "Every odd number you added landed as an L" and "So the totals cannot miss". A learner who adds one number is told the pattern is proven for all. The walkthrough itself shows this happening: it never got past 2 × 2 yet reached the reveal. The key moment (several L's each fitting the next square, especially one big one such as 19 around 9 × 9) is skippable.
2. The prediction gives away the answer (two examples plus the title). It does not let a beginner commit to a wrong belief, so there is little to be corrected.
3. The reveal's "why" (n + n + 1 = next odd number) is carried by sentences, not by something I can see or count on the dots.
4. "The first 100 odd numbers add up to 10,000, no adding required" is a leap from a 10 × 10 picture to 100 × 100 that was never shown; a beginner will accept it, not understand it.
5. Option text "are squares only sometimes" and "stop being squares as they grow" are weak decoys; nothing in everyday intuition leads to them.
6. Small: at 10 steps the equation line wraps and stat tiles reflow on a phone.

## 2. After reading the brief
- Intended misconception: "a running sum of odd numbers is an irregular total you grind out; no shape behind it". The prediction does not touch that belief (it asks "square or not", with squares given in the stem), so a learner can answer correctly while still holding the misconception. I did not experience the "random pile" feeling the hook promises.
- Objective: explain with the L why the sum is always n x n. The explore gives the L, but a learner who stops at one tap cannot yet explain it; the intent depends on exploring far, and the design does not require it. This confirms finding 1.
- The recall question (sum of first 15 odd numbers = 225) never appeared in the walkthrough, so I could not judge whether the lesson prepares for it.
- The brief's "doesNotKnow" list matches my boundary. The reveal's "3 + 3 + 1" is close to the claim c2 text; it stays at beginner level (no n or 2n + 1).
- All three claims are still unverified; nothing seen contradicts them.

Verdict: fatal
