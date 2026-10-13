*Simulated learner. This review finds problems; it is not evidence that anyone learned.*

# Learner review: two-writers-one-counter
lesson version: v1
boundary: an adult with school-level maths, new to the topic (uses computers; has never heard of threads or race conditions).
Screenshots seen: yes (sheet.png, 5 frames)

## 1. From the artifact

- Prediction: 2 / 1 / 0. Good: 2 is the honest trap and the question spells out the order, so a careful reader can work it out.
- First idea I lacked: that each thread "keeps its own copy" of what it read. The stage says so only after "Start over" (step 3); before that I had no picture of a private copy, which is the whole trick.
- Not shown: "Both read first" jumps straight to the end state: all six tiles lit, "holds 1 / holds 1", counter 1. "One at a time" ends looking identical except "holds 2" and counter 2. The order of steps (the interleaving) is never visible, so I see two different answers without seeing why.
- Told, not shown: "both read 0, both wrote 1" and locks (reveal only).
- Layout: "holds" values are tiny grey text at the row ends; the key number is the least visible thing.
- Trust: the footer reads "Why trust this? (0/5 claims checked)" — none of the learner-facing claims are checked.
- Fix suggested: animate the runs one step at a time with each thread's copy shown in a box ("A has 0"), and have the panel require one hand-stepped run.

## 2. After reading the brief

- Intent is the interleaving of read/add/write. The runs show end states only, so the interleaving is not seen. meta.json lists 5 verified claims, but the running build shows "0/5 claims checked": the server build may be stale relative to meta.json (worth a check by whoever owns the build).
- Claims in meta.json: 5 verified. I cannot vouch for any of them.

Verdict: revise
