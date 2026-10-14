*Simulated learner. This review finds problems; it is not evidence that anyone learned.*

# Learner review (r5 wave; first learner review of this lesson): negative-edge-fools-dijkstra
lesson version: v2
boundary: adult learner who has done cheapest-is-not-shortest: knows settling the cheapest town first, and that road costs add along a route; does not know that a settled label is final only when no road is negative, or that checking every road repeatedly makes no such assumption (meta.json learner field).
Screenshots seen: yes (artifacts/walkthroughs/negative-edge-fools-dijkstra/sheet.png, 8 frames)
Verdict: revise

## 1. From the artifact

- Predict: the question lists every road and says cheapest-first "locks A at 2", then asks the true cheapest cost to A. Anyone who adds S→B→A (3 − 2) gets 1, and the hook ("A road that gives money back can undo it") has already said the lock fails. A learner who trusts cheapest-first will still say 2, as I did, so the trap exists, but it is thin: the stem does the work.
- Explore, top panel ("Cheapest first"): settling S gives A 2 and B 3. Settling A gives C 4, with lock icons on settled towns. Settling B shows the −2 road offering "1" and a red "too late" next to A's locked 2. That is the key moment, and it is seen.
- Explore, bottom panel ("Check every road"): **Pass 1 gives A 2, B 3, C ∞.** The caption says "Each pass checks every road once", and A→C costs 2 with A at 2, so I expected C = 4 after pass 1. The road order inside a pass is never shown, so C staying ∞ looks like a bug in the method the lesson is recommending. Pass 2 gives A 1, C 3, which is right. But the first time I watch the alternative, it seems to skip a road. This is where I first lost trust.
- Told, not shown: "Even a version that then corrected A to 1 leaves C at 4, because C was already priced from the old A." C = 4 is visible in the top panel, but no "corrected" version is ever run.
- Layout on phone: the two panels stack, and the Pass 1 / Pass 2 buttons sit cut off at the fold in frames 02 to 05. The reveal scrolls the top panel off, so the "too late" picture is gone while the text describes it. Badge DRAFT, "0/6 claims checked" (fact-checker lane).

## 2. Earlier findings

- No earlier learner review exists for this lesson.

## 3. New findings

- Show the road order in a pass (highlight each road as it is checked, or number them), or order the roads so C gets 4 in pass 1 and is lowered to 3 in pass 2. Either way, "checks every road once" should visibly match the numbers.
- Consider a hook that does not say the lock gets undone.
- Fit both panels and the pass buttons on one phone screen, or put them on tabs.
- No FATAL.
