# Build note: two-genes-one-in-sixteen (demo-builder, 2026-10-13)

- Retitled "Two hidden traits in one seed"; the slug's "one in sixteen" is not shown to learners.
- Design: a 4 x 4 egg x pollen grid. Each seed is drawn as one glyph: fill = flower colour it grows (purple / white), outline = seed shape (round / wrinkled star). There are no allele letters, because letters before a key confused learners in one-in-four-sprouts. Headers show each egg or pollen type with the same glyph code. Controls: Cross them, Mark white, Mark wrinkled, Mark both.
- Numbers come from the grid it draws: white 4/16, wrinkled 4/16, both 1/16. The option "1 in 16" is computed (N / COUNT.both).
- Gate: milestones "one-trait" (mark white or wrinkled) and "both". QA path visits all three marks; the reveal lists only the marks the learner pressed.
- Linkage caveat in the reveal (c4). Claims unverified.
- Screenshot check: the white and round legend chips look alike (both hollow circles); fill vs outline is explained in the caption after crossing. A possible polish.
