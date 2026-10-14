# Build note: five-heads-then-what (demo-builder, 2026-10-12)
- Intent: the stage shows the event itself. Every run of five heads becomes a small column: 5 small H coins, then the next flip as a big coin. The big coins come out about half H, half T. A strip of the last 30 flips shows streaks as they form.
- Gate: the reveal unlocks only after 20 runs of five heads have been caught, because interact() fires only then. The learner sees the next-flip sample before being told.
- Brief correction: about 1 position in 32 follows five heads (about 312 per 10,000), not 1 in 64 or about 150 (claim c2).
- After screenshots: I added H/T letters to the strip coins because colour alone was ambiguous, added "Flip 10,000" for a tighter share and renamed the readout to "Heads share".

## 2026-10-14 colour-only contrast fix (W-155, demo-builder)

- H/T letters: dark ink on the head (domain) discs, --fg on the tail discs (class onHead).
- Colour-only change: no pedagogy, wording or claims touched, so no version bump. Meaning is unchanged and never colour alone (letters, labels and borders still carry it).
- Re-scanned with the a11y scan on a build of this branch: no lesson-origin contrast failure remains.

