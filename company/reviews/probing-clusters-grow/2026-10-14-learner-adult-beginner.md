*Simulated learner. This review finds problems; it is not evidence that anyone learned.*

# Learner review: probing-clusters-grow
lesson version: v1
boundary: an adult beginner who knows "a table of numbered slots"; has never heard of hashing or probing; assumes random means even.
Screenshots seen: yes (sheet.png, 5 frames, phone viewport)

## 1. From the artifact

- Prediction: 10 slots, 2, 3, 4, 7 full; which empty slot most likely receives the new key? Options: all equally likely / slot 5 / slot 8. A good question with a real misconception behind option 1.
- Where understanding first broke: before I predicted. The locked stage already shows the band under the slots with "1/10 1/10 4/10 1/10 2/10 1/10" and the legend "band = hash values that end in the empty slot (n/10 = chance)". The answer (slot 5, 4/10) is printed under the slot in the largest number on screen. Even a beginner who does not decode the band can pick "the one with 4/10". The prediction is given away by the locked stage.
- Explore: inserting keys is clear: "Key 1 hashed to 7, full: walked to 8 (2 probes)" with an arrow along the walk. Watching the band merge into "8/10" after key 3 is the best moment: the run is visibly swallowing the odds.
- "Until a run of 5" stopped at a longest run of 7. A beginner reads that as a bug; it is because one key merged two runs, but nothing says so.
- Reveal: "Your 2nd and 3rd keys hashed to 3 and 2". Key 3's hash (2) was on screen. Key 2's hash (3) was never shown: "Until a run of 5" skipped over key 2's message, so I only saw "2" sitting in slot 5. A small case of the reveal quoting a value I never visited. "Your last key took 6 probes" I did see.
- Phone: reveal fully visible. No clipping.
- Reveal earned: the clustering idea yes (the 8/10 band); the prediction answer itself was read off the stage, not earned.

Fixes (owner: builder):
1. Hide the band (or its n/10 labels) until the prediction is locked, and reveal it as the first explore step.
2. Either show each key's line when "Until a run of 5" runs several keys (e.g. a short log), or quote only key 3 in the reveal.
3. Rename "Until a run of 5" to "Until a run of 5 or more", or say "two runs merged" when it overshoots.

## 2. After reading the brief

- Objective: slot 5 catches 4 in 10. The stage prints exactly that before the learner commits, so the misconception ("every empty slot equally likely") is never tested by a real guess. The rest of the objective (runs grow, probes lengthen) is shown well.
- 5 claims verified by others; I cannot vouch for them.

Verdict: revise
