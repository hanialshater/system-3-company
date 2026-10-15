*Simulated learner. This review finds problems; it is not evidence that anyone learned.*

# Learner review (r11): bag-weight-before-volume
lesson version: v2
boundary: adult-beginner (from meta.json learner: knows that everyday objects have sizes, positions and amounts; does not know that capacity in litres and a weight limit answer different questions)
Screenshots seen: yes (artifacts/walkthroughs/bag-weight-before-volume/sheet.png, recorded 2026-10-15T22:22, phone viewport)
Verdict: revise

## Findings (written from the walkthrough before reading build.md or meta.json)

Path walked: chose "Yes, half of it is empty"; tapped A · Judge by space, B · Weigh it; slid Contents to 4.2 kg; opened reveal.

1. **Where understanding first broke: where the 6 kg comes from.** The question gives a 2 kg bag holding 4 kg of things. B then shows "Total mass 6 kg" with no breakdown, and nowhere on the stage or in the reveal does it say that the empty bag's 2 kg counts toward the limit. The title ("bag weight before volume") suggests this is the point, but the reveal talks only about space vs mass. A learner who picked "Yes" may have done so by forgetting the bag (4 kg < 5 kg passes), not by believing in empty space. The reveal never speaks to that learner.
2. **What the prediction felt like.** The arithmetic is in the question (2 + 4 vs 5), so "No, it is over" is easy for anyone who adds. "Yes, half of it is empty" is the misconception spelled out in the option, which makes it a decoy rather than a temptation.
3. **The drawing.** The bag picture is a box inside a box. I could not read "half empty" from it, and nothing on it changes when I weigh it or move the slider. The 10 of 20 L row says "half full" in text only.
4. **The reveal reports the slider state, not the question.** After my slider move it says "1.20 kg (over)" while the question was about 1 kg over. The direction is the same, so this is only mild friction.
5. **Did the reveal answer my question?** Partly. "Capacity in litres and a weight limit answer different questions" is the right sentence. The useful habit ("weigh the empty bag too; it is part of the total") is missing.

Verdict reason: the stage and reveal never show that the empty bag's own 2 kg counts toward the limit, so the 6 kg total appears with no reason, and a learner who forgot the bag gets no correction.

## After reading meta.json

- Walked build: a9ea371 (server on 3591). meta.json version there matches branch HEAD. The misconception text below is from branch HEAD (rewritten in 0fe98dd after the build was made, meta only; the walked build had template placeholder text).
- Objective ("capacity in litres and a weight limit answer different questions") is stated in the reveal and matches the A/B contrast.
- Misconception ("if a bag still has free space, it must be under the weight limit") is the "Yes, half of it is empty" option. But the scenario also makes the bag's own 2 kg decisive, and the lesson never says so (finding 1). The recall question (pillows vs books, 30 L each) tests only the space/mass idea, which suggests the bag's own weight is an unintended second variable. Either drop it from the question or make it the point. Owner: demo-builder.
