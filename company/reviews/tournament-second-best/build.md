# Build note: tournament-second-best (demo-builder, 2026-10-13)

- Design intent: one 8-player bracket (A-H), strengths hidden. "Play round n" steps a round, "Play to the final" jumps. After the final, tapping a player answers "who beat them?": the champion lights up its 3 victims; a victim reads "lost only to the champion: could be second"; anyone else reads "lost to X, not the champion. X is stronger: can't be second", with the losing edge in red. "Show true strengths" puts the numbers on the leaves, the runner-up in red.
- Key state: champion tapped (3 victims seen) and at least one non-victim ruled out. Milestones ["champion", "ruled-out"], minInteractions 2. QA path: round 1, to the final, A (ruled out by B) ... E (champion) ... H (victim), Show strengths.
- Numbers: 8, 7, 3, 9 and 13 in question/options/reveal come from NAMES/MATCHES (P − 1, VICTIMS.length, P − 2). Brief answer (B) re-checked in Node over 3,000 seeded random brackets: always exactly 3 victims and the true second always among them.
- Disclosure: strengths are chosen, not random, so that the runner-up F loses to E in round 1 and option C ("the final's loser", D) is visibly wrong (claim c3).
- Deviation from brief: no dragging strengths into the bracket (fiddly on a phone); the learner instead tries every player and fails to make a non-victim second.
- After screenshots: reads on phone; no changes.

## 2026-10-14 colour-only contrast fix (W-155, demo-builder)

- winner box: dark ink for the name and strength (class onChamp). Second-best strength uses the text-safe --bad. The "Knockout bracket" label issue is not a colour issue and is untouched.
- Colour-only change: no pedagogy, wording or claims touched, so no version bump. Meaning is unchanged and never colour alone (letters, labels and borders still carry it).
- Re-scanned with the a11y scan on a build of this branch: no lesson-origin contrast failure remains.

