*Simulated learner. This review finds problems; it is not evidence that anyone learned.*

# Learner review (re-review r6): deleted-key-breaks-search
lesson version: v4
boundary: adult who knows linear probing for insertion (a key whose slot is taken moves to the next free slot, per meta.json learner field); has not been told how a search decides to stop; never programmed. (Same boundary as r5.)
Screenshots seen: yes (artifacts/walkthroughs/deleted-key-breaks-search/sheet.png, all 5 frames; integrated build 3 at localhost:3470)
Verdict: launch

## 1. From the artifact (written before reading the earlier review)

- Predict: the question now states the search rule: "A search starts at the key's slot and walks right until it finds the key or meets an empty slot." The locked stage repeats it ("A search walks right and stops at the first empty slot") above A B C in slots 1 to 3 and "Search C: ?". The prediction is now something I can reason out: apply the rule to the emptied slot 2. A learner holding the misconception ("C is still there, so it is found") can still pick option 1, as I did, so the guess still has a wrong answer worth making. Nothing leaks the outcome.
- Explore: "Delete B" empties slot 2 and the button greys to "B deleted". "Search C" draws hops 1 → 2 with a red box, "stop: empty", and "Emptied slot: search C stopped at slot 2. Not found." "Switch delete to: gone marker" hatches slot 2 "gone", reruns the hops 1 → 2 → 3 with "C ✓", and keeps both result lines on stage. The button relabels to "Switch delete to: emptying". The reveal opens only after all three steps.
- Both doesNotKnow items are on the stage: emptying hides C (the red stop), and the marker means keep looking (the hatched slot passed through). The reveal points at both ("Emptying slot 2 made your search stop there ... With a gone marker, the same search kept going").
- Reveal: it now says why a search stops at a gap ("an insert always takes the first free slot: a stored key never sits past a gap, so without that stop a missing key would mean checking every slot"). This is told, not shown, but it is supporting context outside the brief's gap and is one sentence. "Markers pile up ... rebuilt" is told context. Under 120 words.
- Minor: in the locked frame the two top controls are clipped at the bottom of the stage (only their top edges show).
- Minor: the strip of slots moves down the stage between frames (top in predict, middle in steps 1 to 3, top again at reveal). The jump is mild, but on a phone the eye has to find the slots again.
- No FATAL.

## 2. Earlier findings (r5 review, v2)

1. Prediction relied on a stop rule the learner was not given, and the rule's reason was never given: **fixed**. The rule is in the question and on stage, and the reason is one sentence in the reveal.
2. Delete-mode toggle clipped and read as a label: **mostly fixed**. It is now a full-width button, "Switch delete to: gone marker". The locked-frame clipping of the controls remains (minor).
3. Claims 0/5 checked, DRAFT (routed): **improved**, now 5/6 checked. Still DRAFT; this belongs to the fact-checker and the publish gate, not to me.

## 3. New findings

- Minor: slot strip changes position between frames (see above).
