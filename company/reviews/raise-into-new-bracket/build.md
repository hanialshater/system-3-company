# Build note: raise-into-new-bracket

builder: demo-builder · 2026-10-13

- Intent: pay laid out dollar by dollar on a $0–$40,000 axis. Each dollar is split into kept (green) and tax (red): a 10% band up to the dashed $20,000 line, a 30% band beyond it. Crossing the line adds only 30% dollars; the earlier dollars do not change.
- Milestone: pay reaches $21,000. The slider starts at $19,000 with $1,000 steps, so QA's two presses reach it.
- Readouts: take-home, change vs $19,000 pay (+$1,600 at the key state) and average tax (11.0%). All are hidden while locked.
- After the screenshots: the $1,000 above the line is a thin sliver at this scale, so I added a "← 30% only here" pointer (inside the band once pay is above $32,000).
- c5 notes that real benefit phase-outs can create effective rates above 100% in places. Not modelled; flagged for the fact-checker in case the reveal's "more pay always means more take-home" needs a scope phrase beyond "in this system".

## 2026-10-14 colour-only contrast fix (W-155, demo-builder)

- same fill change as monopolist-holds-back ("keep 90%").
- Colour-only change: no pedagogy, wording or claims touched, so no version bump. Meaning is unchanged and never colour alone (letters, labels and borders still carry it).
- Re-scanned with the a11y scan on a build of this branch: no lesson-origin contrast failure remains.

