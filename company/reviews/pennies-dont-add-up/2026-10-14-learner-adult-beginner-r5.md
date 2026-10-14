*Simulated learner. This review finds problems; it is not evidence that anyone learned.*

# Learner review (re-review r5): pennies-dont-add-up
lesson version: v2
boundary: adult who knows binary place value (switches worth 1, 2, 4, 8), decimals like 0.1, fractions like 1/2 and 1/4, and that 1/3 is 0.333...; does not know that many decimals have no finite binary form or that computers round to the nearest binary fraction (meta.json learner field; the v1 review used a no-binary boundary on purpose).
Screenshots seen: yes (artifacts/walkthroughs/pennies-dont-add-up/sheet.png, 16 frames)
Verdict: revise

## 1. From the artifact

- Predict: the hook "Do you get exactly 0.3?" is now neutral. Options are equal / a tiny bit more / a tiny bit less. The locked stage shows "Target 0.1" and 12 switches from 1/2 to 1/4096, so a learner at this boundary can tell what the switches are.
- Explore (scripted path): it switched on 1/2, 1/4, 1/8 ... in order, so every frame says "Over by 0.4 ... 0.8997". That shows nothing about 0.1, but a real learner would turn 1/2 back off. "Try 3 switches first" is an odd hint while I am over by 0.4. The useful hint ("Aim for 0.1: try 1/16 first") appeared only after "All off".
- "How does a computer store 0.1?" sets the switches to 0.10009765625 with "Closest 12 switches can get: still over", plus a box: 0.1 → 0.1000000000000000055... above, 0.2 → ...111... above, 0.1 in binary 0.000110011001100..., 0.1 + 0.2 → 0.30000000000000004 over 0.3.
- **Main finding:** the prediction is a choice between "a bit more" and "a bit less", and nothing on stage lets me see why it is more. The 12-switch "closest" is a button result. A learner building it by hand greedily lands **under** (1/16 + 1/32 + 1/256 + 1/512 + 1/4096 = 0.09985...), so "still over" contradicts what my own hands found, unless I notice that one step up is nearer. The 53-digit "above 0.1 / above 0.2" lines are just printed. So the part of the answer that separates option 2 from option 3 is told by a panel. The part that separates option 1 (exact) from the others ("you can't hit 0.1") is seen, provided the learner actually tries.
- Told: "0011 repeating forever, the way 1/3 is 0.333...". The stage's closest pattern (1/16, 1/32, 1/256, 1/512, 1/2048) does not show the repeat, because the last bit is rounded up.
- Reveal: fits on phone. Every number quoted was on stage. "Money is often counted in whole cents" is an aside.
- Chip reads 75S, not 60S (product-owner item).

## 2. Earlier findings (v1 review, 2026-10-13)

1. Hook leaked that the computer says no: **fixed**.
2. Switches' purpose and binary not set up: **fixed at the brief's boundary** (place values labelled, "Target 0.1"). Still open for a no-binary learner.
3. Default tap path moves away from 0.1: **partly fixed** (the "try 1/16 first" hint exists but appears late; "Try 3 switches first" is confusing).
4. Why "high" is only asserted: **not fixed**.
5. Reveal's "your closest try was 0.5" mismatch: **fixed**.
6. Reveal clipped: **fixed**.

## 3. New findings

- Either make the direction seeable (e.g. show the hand-built under-value next to the one-step-up over-value and which is nearer, so "rounds to nearest, which happens to be above" is watched), or change the prediction to exact vs not-exact so the coin-flip half is not the scored answer.
- Show the hint "try 1/16 first" from the first frame instead of only after All off.
- No FATAL.
