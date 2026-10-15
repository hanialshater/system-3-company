*Simulated learner. This review finds problems; it is not evidence that anyone learned.*

# Learner review (r11): laundry-sort-before-walk
lesson version: v1
boundary: adult-beginner (from meta.json learner: knows Everyday objects have sizes, positions and amounts; does not know: For a fixed route and unlimited carrying capacity, one grouped trip pays the distance once instead of once per item. The picture compares repeated travel with a single batch.)
Screenshots seen: yes (artifacts/walkthroughs/laundry-sort-before-walk/sheet.png, recorded 2026-10-15T21:34:56.341Z)
Verdict: revise

## Findings (written from the walkthrough before reading build.md or meta.json)

Path walked: chose "One-item trips"; tapped Grouped trip; slid Count 8 -> 10; opened reveal.

1. **No real prediction.** "Which plan travels less?" One trip vs eight trips over the same route: nobody picks eight. The locked picture (a thick bundle of dashed lines) also shows the answer.
2. **Where understanding first broke: the one-item-trips number never appears.** I saw Travel 8 m for the grouped trip, twice. The 64 m (then 80 m) for one-item trips is never shown, so the slider I moved changed nothing and I never saw the gap grow with item count, which is the only interesting thing here.
3. **The title is not taught.** "Carry once, sort at the start" suggests the lesson is about sorting laundry before walking it to the machine. Nothing on stage involves sorting; it is just batching trips.
4. Reveal "for a fixed route and unlimited carrying capacity" is honest; the capacity caveat is the real-life catch and is only a sentence.
5. Recall card uses a 3 m route and 3 items per trip, a different model from the stage (4 m, unlimited capacity). Button highlight stuck on "One-item trips"; "1trips" label.

Verdict reason: the answer is obvious from the question and picture, and the one-item travel total is never displayed, so the count slider shows nothing.

## After reading the brief (meta.json)

- doesNotKnow matches the reveal. Claim c3 says total = 8 × item count for one-item trips; that value is never displayed (finding 2).
- Recall card uses a 3 m route and a capacity of 3 per trip, a different model from the stage; route to fact-checker.
- Fix route: demo-builder (show both totals; reconsider title or add the sorting step).
