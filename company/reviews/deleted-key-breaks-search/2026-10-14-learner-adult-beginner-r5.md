*Simulated learner. This review finds problems; it is not evidence that anyone learned.*

# Learner review (re-review r5): deleted-key-breaks-search
lesson version: v2
boundary: adult who knows linear probing for insertion (a key whose slot is taken moves to the next free slot, per meta.json learner field); has not been told how a search decides to stop; never programmed.
Screenshots seen: yes (artifacts/walkthroughs/deleted-key-breaks-search/sheet.png)
Verdict: revise

## 1. From the artifact

- Predict: "Deleting B, searching for C", with the hook "C is still in the table. Will the search still find it?" The hook's "still" signals trouble. The question explains linear probing in one clause ("a key that finds its slot taken moves to the next one") and sets up A, B and C in slots 1–3. **It never says how a search works or when it stops.** The right answer ("The search says C is not there") depends on the rule "a search stops at the first empty slot", and I was not given it. So the prediction is a gotcha, not a test of a belief I could reason about: "C is found in slot 3" is the only sensible answer from the information given. The locked stage (A B C in 1–3, "Search C: ?") leaks nothing. Its third control, "Delete by: emptying the slot", is cut off at the bottom of the stage in the predict frame.
- Explore: "Delete B" empties slot 2. "Search C" draws hops 1 → 2 with a red "stop: empty" box and "Emptied slot: search C stopped at slot 2. Not found." That is very clear as a picture of what happens. Tapping "Delete by: emptying the slot" flips it to "leaving a gone marker": slot 2 turns hatched "gone", the hops run 1 → 2 → 3 with "C ✓", and both outcomes stay listed. The before/after contrast is excellent.
- Reveal: both outcomes were seen. "A search treats an empty slot as the run ends here" is the missing rule, now told. Why a search must stop at an empty slot (otherwise every search for a missing key would scan the whole table) is never said, so the rule feels arbitrary to a non-programmer. "Markers pile up and slow searches, so tables get rebuilt" is told context.
- Other: the delete-mode control looks like a status pill, not a button. Status chip DRAFT, trust link 0/5 claims checked.

## 2. Earlier findings

There is no earlier learner review for this lesson; this is its first. Only company/reviews/deleted-key-breaks-search/2026-10-14-fact-check.md and build.md exist, and I did not read build.md.

After writing section 1, I read the meta.json learner field. The brief's learner "knows linear probing: a key whose slot is taken moves to the next free slot (probing-clusters-grow)". That is insertion, not search. If probing-clusters-grow also teaches that a search stops at the first empty slot, finding 1 drops to minor for a learner arriving from that lesson. This lesson can't assume a feed order, though, and its own question doesn't state the rule.

## 3. New findings

1. **Revise:** the prediction depends on a rule the learner is not given (a search stops at the first empty slot), and the reason for the rule is never given. Options: add one clause to the question ("a search walks forward from the key's slot and gives up at the first empty slot") so the prediction is reasoned rather than a trap; and add a half-line on stage or in the reveal on why it gives up there (an absent key would otherwise mean checking every slot). The builder chooses.
2. Minor: the "Delete by: emptying the slot" toggle is clipped in the locked frame and reads as a label rather than a button. The panel's "flip how the delete is done" helps.
3. Routed, not mine: 0/5 claims checked and DRAFT status (fact-checker before any launch).
4. No FATAL. The stage's empty-vs-marker contrast is strong once the rule is known.
