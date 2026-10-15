*Simulated learner. This review finds problems; it is not evidence that anyone learned.*

# Learner review (r11): group-cables-with-ends
lesson version: v2
boundary: adult-beginner (from meta.json learner: knows Everyday objects have sizes, positions and amounts; does not know: Bundling the middle leaves ends that can still weave through loops. The drawing distinguishes keeping strands together from restricting the ends’ routes.)
Screenshots seen: yes (artifacts/walkthroughs/group-cables-with-ends/sheet.png, recorded 2026-10-15T21:32:36.790Z)
Verdict: revise

## Findings (written from the walkthrough before reading build.md or meta.json)

Path walked: chose "Loose ends"; tapped Secure bundle ends; slid Count 4 -> 6; opened reveal.

1. **The question uses words I do not have.** "Which layout removes the depicted free-end paths?" is hard to parse. I read it as "which one has no loose ends?", and then the answer is obvious from the option names ("Loose ends" vs "Secure bundle ends").
2. **The interesting belief is not set up in words.** The real misconception is "if I tie the middle, the cords will not tangle". The first picture does show a tie in the middle with 8 ends splayed out, which is good, but the option is named "Loose ends", not "Tie the middle", so I did not realise that was the layout I was defending.
3. **The Count slider does nothing visible.** At 4 or 6 cords, Secure bundle ends shows 0 accessible ends. The loose-ends count (8 at 4 cords, 12 at 6) is never shown after the reveal unlocks, so the slider never shows anything grow.
4. **The reveal says the right thing but only in text.** "Bundling the middle leaves ends that can still weave through loops" is the actual lesson, and it is clear. But nothing on stage shows an end weaving through a loop; tangling itself is not modelled, which the trust sheet admits.
5. Safety line about electrical limits is fine.

Verdict reason: the question is phrased in jargon and the option names give the answer away, so the "tie the middle" belief the reveal corrects is never actually tested.

## After reading the brief (meta.json)

- Objective matches the reveal text, which is clear. What fails is the setup: the option names and the question's wording give the answer before any belief is committed (findings 1-2).
- Claim c3 says knots/tangles are not simulated, which is honest, but it means "can still weave through loops" is only asserted.
- Fix route: demo-builder (plain-language question such as "Does tying the middle stop tangles?"; name the first layout "Tie the middle"; make Count change a visible number).
