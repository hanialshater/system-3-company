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
