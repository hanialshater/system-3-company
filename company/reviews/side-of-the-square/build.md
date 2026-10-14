# Build note: side-of-the-square (demo-builder, 2026-10-13)

- Intent: one 1 m grid (0 to 11 m). The square floor starts at side 5 (25 m², not an option). Six chips set the side: 25, 10, 8, 7, 7.1, 7.07 m. The area reads side × side (2 decimals); a dashed green outline marks the 50 m² target (side √50), drawn only after the prediction so the grid cannot give the answer away while locked. The 25 m square is clipped by the frame and turns red; its label reads 625 m².
- Captions: start "Area = side × side: 5 × 5 = 25 m². Which side covers 50 m²?"; each chip "7 × 7 = 49 m²: too small", "7.1 × 7.1 = 50.41 m²: just over 50", "7.07 × 7.07 = 49.98 m²: just under 50".
- Key states (two milestones): both 7 m and 8 m seen (bracketed), and 7.07 m. QA's in-order path visits every value the question and reveal name (25 m option, 7, 8, 7.07).
- Reveal mentions the 25 m case only if visited.
- All claims unverified, for the fact-checker.

## Revision v2

Review 2026-10-14: the 25 m square was undersold. It stays clipped by the grid but is labelled 'runs off the grid' and the caption says 12.5x the target. The square-root sentence moved to the first reveal paragraph. c4, c5 reworded, unverified.
