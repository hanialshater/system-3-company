# Build note: two-suspects-payoff

builder: demo-builder · 2026-10-13

- Intent: the 2 × 2 table, your payoff big and theirs small. Picking what they do lights that column and rings your better row with its margin (+2 or +1).
- Milestones: "they cooperate" seen and "they defect" seen. Those buttons come first in DOM order; the "You …" buttons only move the highlighted cell and the "You get" readout.
- Dropped from the brief: the ten-round replay against a seeded tit-for-tat opponent. It would be a second representation and a second idea in 60 seconds. The reveal's last line says repeated play can sustain cooperation (c4, Axelrod) without claiming tit-for-tat is optimal. A candidate for its own lesson.
- The predict answer comes from the table (DOMINANT), not a typed index.
- Title shortened to 38 characters (the first draft was 44).

## 2026-10-14 colour-only contrast fix (W-155, demo-builder)

- dimmed columns: opacity now applies to the cell box only, so "you/they" labels and the payoff numbers stay readable; "them N" uses --fg (was --muted); same good/bad fill change as the other economics lessons.
- Colour-only change: no pedagogy, wording or claims touched, so no version bump. Meaning is unchanged and never colour alone (letters, labels and borders still carry it).
- Re-scanned with the a11y scan on a build of this branch: no lesson-origin contrast failure remains.

