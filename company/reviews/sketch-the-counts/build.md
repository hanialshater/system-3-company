# Build note: sketch-the-counts (demo-builder, 2026-10-12)

- Design intent: a stream of 9 animal tokens (C, D, E) plays into a table of 5 counters; the queried item's counters are outlined and the smallest is filled. Rows 2-4 are hand-picked hashes so cat goes 8 -> 5 and dog 8 -> 4 -> 3 as rows are added.
- Reveal gate (minInteractions 2): interact() when the stream finishes and when the table first has 2+ rows with the stream finished, so the learner sees the over-count and then the min across rows.
- Cut word count by showing tokens as coloured letters, matched to the cat/dog/eel query buttons.
- After screenshots: a 'row' header sat over the counter numbers and read as a row index; replaced with a caption 'Counters 1-5 · one row per hash'.

## 2026-10-14 colour-only contrast fix (W-155, demo-builder)

- tokens keep the category colour on the border only (new --cc variable: --domain, --warn-fill, --good-fill) and use --fg text; processed tokens use a dashed border and --muted text instead of opacity .25. The C/D/E letters still carry identity.
- Colour-only change: no pedagogy, wording or claims touched, so no version bump. Meaning is unchanged and never colour alone (letters, labels and borders still carry it).
- Re-scanned with the a11y scan on a build of this branch: no lesson-origin contrast failure remains.

