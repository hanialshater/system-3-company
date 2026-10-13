*Simulated learner. This review finds problems; it is not evidence that anyone learned.*

# Learner review: mask-the-flags
lesson version: v1
boundary: an adult with school-level maths and science, new to the topic (knows binary is 0s and 1s; has never used AND/OR/XOR on bits).
Screenshots seen: yes (sheet.png, 9 frames)

## 1. From the artifact

- Prediction: 00110 / 10000 / 10110. The question defines AND, so the answer is a column-by-column check. 10110 ("nothing changes") is a fair trap. Felt like a small puzzle, which is right for the topic.
- First idea I lacked: why "settings live in one number" (the hook). The lesson never shows 10110 as a number (22), so the "one number" part is told.
- Shown well: tapping mask bits updates "AND gives" at once; green tiles mark the places that survive. OR and XOR on the same mask show "switch on" vs "flip".
- Told, not shown: "File permissions on Unix are stored and changed this way".
- Layout: large empty band above the grid on every explore frame; the grid sits mid-stage with a third of the card blank. Green tint on result tiles marks "mask was 1", which on XOR frames I misread as "result is 1".
- Fix suggested: pull the grid up; optionally show the decimal value of settings to earn the hook's "one number".

## 2. After reading the brief

- Intent (compute the AND; read/set/flip) matches the stage.
- Claims in meta.json: 5 verified. I cannot vouch for any of them.

Verdict: launch
