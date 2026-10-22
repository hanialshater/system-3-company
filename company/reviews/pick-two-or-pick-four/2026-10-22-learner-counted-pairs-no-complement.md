*Simulated learner. This review finds problems; it is not evidence that anyone learned.*

# Learner review: pick-two-or-pick-four
lesson version: v1
boundary: knows how to count pairs (handshakes: 6 people make 15 pairs); does not know that choosing k of n has as many ways as choosing the n − k left behind, and leans to "bigger groups, more groups"
Screenshots seen: yes (artifacts/walkthroughs/pick-two-or-pick-four/sheet.png, recorded 2026-10-22T12:20:01.036Z)
Verdict: launch

## Findings (written from the walkthrough before reading build.md or meta.json)

1. **Where understanding first broke: it did not.** The first Next pair puts A, B on the "go" row and C–F inside a dashed "stay" box, with "pairs seen: 1 of 15 / fours seen: 1 of 15". Seeing the four as the remainder of the pair is the whole idea, and it lands on the first tap. Someone who can count handshakes already accepts that 15 is right. The new step is that every pair brings exactly one four with it, and the stage shows that as a single picture, not as a sentence.
2. **What the prediction felt like.** "Taking 4" felt natural ("bigger groups, more ways"), and so did "Taking 2". The walkthrough chose Taking 2, which is wrong in the other direction. The explore panel names the choice ("You said Taking 2") without giving the answer away. The locked stage shows all six friends under "stay" and both counters at 0. Nothing there echoes either wrong answer.
3. **Whether the reveal answered my question.** Yes. My question after All pairs was "are the fours really all different?" The reveal's first sentence answers it directly: "each four left behind exactly one pair". The reveal stage keeps the A,B / C–F split and the 15-chip grid in view, so the matching is visible while I read it.
4. **Grid check (traced every chip).** I checked the 15 chips against the go/stay colouring of the letter circles (filled = go, hollow = stay). Row 1 is 12, 13, 14, 15, 16. Row 2 is 23, 24, 25, 26, 34. Row 3 is 35, 36, 45, 46, 56. That is all 15 distinct pairs with no repeats, and each chip has exactly 2 filled and 4 hollow dots. The final frame after All pairs (E,F go; A–D stay) matches the last chip.
5. **Note (not blocking): the chips have no key.** A chip is six unlabeled dots. A learner has to work out that dot position matches A–F, and that the hollow dots are "the four". The trust sheet explains this, but the stage does not. The filled/hollow styling matches the go/stay circles above, so most learners will get it. A one-time "A…F" tick under the first chip would remove the guess.
6. **Note (not blocking): "Groups of 3" tells and does not show.** Pressing it shows one 3-and-3 split and "groups of 3: 20", but the grid still lists pairs. The reveal then says "Groups of 3 are the most", but the lesson only shows 15 and 20 side by side. It never shows that sizes 0, 1, 5 and 6 are smaller. It is an aside and the core idea does not rest on it, but "the most" is accepted on trust.
7. **Fit and controls.** At 390×844 the reveal fits with the stage above it. Current-state chips are highlighted and disabled after the reveal. Reset clears the counters to 0, but the reveal still shows the milestone state (15/15, 20). The text is legible, and the pair chips are small but readable.

Verdict reason: no finding blocks a first-time learner. The go/stay one-to-one match is shown on the first tap and named in the reveal. Findings 5 and 6 are notes only.

## After reading build.md / meta.json

- Not read (this stage reads only the walkthrough and the template).
