# Build note: sketch-the-counts (demo-builder, 2026-10-12)

- Design intent: a stream of 9 animal tokens (C, D, E) plays into a table of 5 counters; the queried item's counters are outlined and the smallest is filled. Rows 2-4 are hand-picked hashes so cat goes 8 -> 5 and dog 8 -> 4 -> 3 as rows are added.
- Reveal gate (minInteractions 2): interact() when the stream finishes and when the table first has 2+ rows with the stream finished, so the learner sees the over-count and then the min across rows.
- Cut word count by showing tokens as coloured letters, matched to the cat/dog/eel query buttons.
- After screenshots: a 'row' header sat over the counter numbers and read as a row index; replaced with a caption 'Counters 1-5 · one row per hash'.
