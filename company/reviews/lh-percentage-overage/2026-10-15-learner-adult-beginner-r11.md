*Simulated learner. This review finds problems; it is not evidence that anyone learned.*

# Learner review (r11): lh-percentage-overage
lesson version: v3
boundary: adult-beginner (from meta.json learner: knows basic addition, multiplication and division; that a model can declare hypothetical quantities; does not know: Distinguish a proportional allowance from a fixed spare count.)
Screenshots seen: yes (artifacts/walkthroughs/lh-percentage-overage/sheet.png, recorded 2026-10-15T21:36, build f1832fa, phone viewport)
Verdict: revise

## Findings (written from the walkthrough before reading build.md or meta.json)

Path walked: chose "10% extra"; tapped Test A, Test B; slid Required 40 to 50 tiles; opened reveal.

1. **The prediction is genuine.** "10% sounds like a lot" against "ten tiles", and the hook says it depends on the job size without saying which way. At 40 tiles, ten extra is bigger (50 against 44).
2. **"ceil((40×1.1))" is outside my boundary.** The question says "rounded up", but the readout uses "ceil" and "×1.1", neither of which I would recognise as "10% extra, rounded up".
3. **Where understanding broke: the tie sentence.** The reveal ends "Rounding up also ties them at 95; above 100 the percentage order is larger." Why 95? Nothing on the stage reached 95, and the sentence reads as if 95 is the one tie point. Working it out myself, 10% rounded up and ten extra give the same order at every size from 91 to 100 (91 gives 101 and 101; 100 gives 110 and 110). So "ties at 95" is incomplete and, as a learner, misleading.
4. **Does the reveal answer my question?** The main part does: a fixed extra stays ten, a percentage grows with the job; at 100 they meet. The rounding sentence muddles it.
5. The picture is two buckets filling, not tiles.

Fixes (for the builder):
- Replace the tie sentence with "With rounding up, they give the same order from 91 to 100 tiles; above 100, 10% is more." (fact-checker to confirm the range).
- "ceil" to "round up"; consider drawing tiles.

Verdict reason: the reveal's last sentence names a single tie at 95 that the learner never saw and that is incomplete (they tie from 91 to 100).

## After reading the brief (meta.json)

- Objective: distinguish a proportional allowance from a fixed spare count. The main contrast is delivered.
- On finding 3: the claim record already knows the orders tie for every requirement from 91 to 100 and scopes "95" to the step-5 slider (95 and 100). So the sentence is correct for slider positions, but the learner sees neither the scope nor the range, and has not been to 95. The finding stands as a wording issue, not a factual error; the verdict stays revise because the sentence confuses rather than misinforms.
- Fix route: demo-builder (tie sentence, "ceil" wording).
