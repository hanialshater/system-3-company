# Build note: near-and-far-links-find-the-way

builder: ncm-p1 (demo-builder) · 2026-10-14 · status: draft · kept from evaluators until they report

## What was built
Simulation run. A ring of 2,000 people (drawn as a circle) with one long link each. Three rule buttons (Uniform, Chance ∝ 1/d, Chance ∝ 1/d²) each run 1,000 greedy messages (5 seeded networks × 200 pairs) and show message 1: its route in the domain colour, start and target dots, step count in the centre, and the long links of every 40th person as faint chords so the rule's link lengths are visible. "Next message" steps through the 1,000 routes. Readouts: mean steps per rule run so far, and "Ring only 500". Milestones: q0, q1, q2 (each rule run once). Controls in DOM order: the three rules, then Next message.

## Answers re-run in node (the lesson's own code)
- Extracted runRule() from Demo.tsx and ran it with Node strip-types: uniform 38.32, 1/d 28.52, 1/d² 212.59. Message 1 (pair 271 → 1529): 29, 30, 210 steps.
- Pairs come from mulberry32(100 + seed), so all rules route the same 1,000 pairs. An earlier variant drew pairs from the network generator (37.0, 29.5, 219.2); seeds 11-15 gave 38.9, 30.0, 213.1. The brief's 30/38/219 is within this spread; the order never changed.
- Ring only: 1,000,000/1,999 = 500.25.

## Choices
- Reveal quotes the learner's run (fixed seeds, so always the same numbers as c1).
- The Milgram claim (brief c4) is left out of learner text, as the brief asks. It is not in meta claims.
- The Kleinberg theorem (c6) says "on large networks" because at N = 2,000 uniform (38) is close to 1/d (29); the gap grows with N.

## Known gaps
- Message 1 happens to show uniform and 1/d nearly tied (29 vs 30); the means separate the rules, not single messages.
- All claims unverified; c6 needs the fact-checker.

## Pre-flight v2

Revision for r6 learner review (adult-beginner, revise). The big number in the ring was one message's step count, so uniform 29 seemed to beat 1/d 30. The means that answer the question sat in a row cut off below the controls. The cause, links spread across scales, was told. The "∝" was never defined.
Changes:
- The ring's centre now shows the rule's mean over 1,000 messages ("mean steps, 1,000 messages"). The single message's count moves to the note.
- The means row sits right under the ring, above the controls.
- The drawn links are tinted by length (near 1-10, middle 11-100, far 101-1,000). A "Links by length" block under the ring lists, for each rule picked so far, the shares of the shown network's 2,000 links in each band. Each share is recorded at the pick, and the current rule is underlined.
- The reveal points at the tallies.
- The options and buttons no longer use "∝". They read "Chance falls with distance" / "... squared" and "Falls as 1/d" / "Falls as 1/d²".
- c3, c4 and c5 are reworded and set unverified, and c7 (the tallies) is new.

1. **Title and hook.** "Which shortcuts help you find someone?" / "Random long links reach farthest. Do they help a message find its way?" No: they question random links without naming 1/d.
2. **Options.** "Uniformly random", "Chance falls with distance", "Chance falls with distance squared": none has a number, and all are worded at the same level.
3. **Locked stage.** An empty ring, "?" with "mean steps, 1,000 messages", "Pick a rule for the long links. Each run sends 1,000 messages.", an empty Links by length block, means "–", Ring only 500. No links and no values are drawn.
4. **Reveal values.** Means 38.3 / 28.5 / 212.6: (b) milestones q0, q1 and q2, recorded at each pick and shown in the means row. About 500 with no long links: shown on the stage throughout (Ring only). Uniform 89% far and 1% near, 1/d² 95% near and 1% far, and 1/d 41% · 30% · 29%: (b) the same milestones, recorded at each pick. All three tallies stay listed in the Links by length block. Kleinberg: told context (c6).
5. **QA path.** Uniform (q0) -> Falls as 1/d (q1) -> Falls as 1/d² (q2) -> Next message. All three milestones are reached. When the reveal opens, the means row shows all three means and the Links by length block shows all three tallies.
6. **Reset.** There is no reset. Next message changes only the single-message path and the note. Reveal (QA path): "Over your 1,000 messages per rule, uniform links averaged 38.3 steps, 1/d links 28.5 and 1/d² links 212.6. With no long links at all it would be about 500. / Look at your link tallies. Uniform links were 89% far and 1% near, so close to the target they rarely help and the last stretch crawls along the ring. 1/d² links were 95% near and 1% far. Only 1/d links came at every scale (41% · 30% · 29%), so wherever the message is, some contact can cut the remaining distance a lot. / On large networks, Kleinberg proved greedy search is fast only when the exponent matches the dimension: 1 for a ring."
