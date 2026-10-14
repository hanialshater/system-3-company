# Build note: collect-all-six-faces (demo-builder, 2026-10-13)
- Intent: six face slots fill as the seeded die is rolled. Six bars show how many rolls each new face took. '1,000 collections' overlays dashed average waits (1, 1.23, 1.50, 2.04, 2.85, 6.25) and the 14.9 total.
- Gate: 2 milestones, one complete collection, then 1,000 collections (in either order).
- The reveal uses the last completed collection (stored separately), so pressing 'New collection' does not leave it describing an empty run.

## 2026-10-14 colour-only contrast fix (W-155, demo-builder)

- unseen-face numbers: removed opacity .6 so --muted shows at full strength. The "0 rolls" SVG label noted in the audit is not a colour issue and is untouched (route to a content fix).
- Colour-only change: no pedagogy, wording or claims touched, so no version bump. Meaning is unchanged and never colour alone (letters, labels and borders still carry it).
- Re-scanned with the a11y scan on a build of this branch: no lesson-origin contrast failure remains.



## Revision v2

The svg label is already dynamic in this code ('N rolls; K of 6 faces seen') and the face-number contrast was fixed in W-155; nothing stuck found. Version bumped so the accessibility reviewer can re-scan.

QA (QA_ONLY, phone and desktop) passes; I looked at the walkthrough sheet. Edited claims are unverified.
