*Simulated learner. This review finds problems; it is not evidence that anyone learned.*

# Learner review (r11): alphabet-sort-search
lesson version: v1
boundary: adult-beginner (from meta.json learner: knows Everyday objects have sizes, positions and amounts; does not know: Use a sorted comparison to eliminate impossible labels and compare observed checks with a target-last shuffled scan.)
Screenshots seen: yes (artifacts/walkthroughs/alphabet-sort-search/sheet.png, recorded 2026-10-15T21:32)
Verdict: revise

## Findings (written from the walkthrough before reading the brief or build.md)

Path walked: chose "Halve sorted candidates"; slid Count to 10; tapped Scan all, Compare, Finish; opened reveal.

1. **Where it first broke: the prediction answers itself.** The question asks which method can rule out labels "without checking every label". One option is "Scan shuffled labels", which is checking every label. I did not have to think about sorting at all; I only had to read the question. Nothing I believed was at risk.
2. **The "shuffled" list is not shuffled.** It is G F E D C B A H (and I H G F E D C B A J at 10): reverse alphabetical with the target moved to the end. The reveal does say "disclosed target-last scan", which is honest, but it means the scan always costs N by construction, and I noticed the list was just backwards, which made the whole race feel rigged rather than shown.
3. **I only ever saw "go right".** At every Count the target is the last letter, so every comparison is "E<J → right", "H<J → right". I never saw a "too high, go left" step, so I learned "keep going right" rather than "the middle tells you which half to drop".
4. **The best part is the fading tiles.** After one Compare, A to E are crossed out at once. That one frame shows "ruled out without checking" better than any sentence in the lesson. The reveal sentence ("it and all earlier labels can be ruled out because the list is sorted") matches what I saw.
5. **Reveal versus my actual question.** My question after the explore was "is this ever worth it, given I have to sort first?" The reveal acknowledges sorting cost in one sentence and stops. Acceptable for 60 seconds.
6. Where is the life hack? The hook never says where I would have sorted labels (files, a spice shelf, a contact list). Nothing ties it to my day.

Fixes (for the builder):
- Make the prediction a real choice, e.g. "With 10 sorted labels, about how many checks to find J? 10 / 5 / 4", so the answer is not in the question.
- Pick a target that forces at least one "left" step, and use an actually shuffled scan list (or say "worst case: target last" in the stage).

Verdict reason: the prediction is answered by its own wording, and the fixed target-last fixture only ever shows "go right", so the halving idea is shown but never tested.

## After reading the brief (meta.json)

- The objective (eliminate labels with a sorted comparison; compare with a target-last scan) is shown on stage; the fading tiles deliver it.
- The misconception the brief targets ('a middle comparison can discard half an unordered list') is never tested: the prediction offers 'Scan shuffled labels', not 'Halve the shuffled list'. Offering that option would make the prediction real and match the brief.
- The learner field's 'doesNotKnow' restates the objective rather than a gap a person has; I judged against an adult who has never thought about why sorted lists help.
- Fix route: demo-builder (prediction options, target choice).
