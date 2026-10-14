# Build note: web-bow-tie-reach (demo-builder, 2026-10-14)

- Format: single card, hand-built directed network stage, built to `company/design/reviews/2026-10-14-design-lead-ncm-rulings.md` §2 (the rulings win over the brief): 12 tappable nodes, one-character labels A-L (brief's C1..O3 renamed: core A-D, IN E-F, OUT G-I, tendril J, detached pair K-L), drawn radius 15, 44 px hit buttons (real `<button data-qa="control">` overlaid on the SVG, DOM order A..L), minimum centre distance 60 (node check), arrowheads 10 long ending 2 px outside the target rim, viewBox 340x290, no layout change between states.
- States: hollow = not reachable, filled = reachable, filled + heavy ring = start. Legend line "Ring: start. Filled: reachable." Edges leaving a reachable page are drawn solid `--fg`, others `--line`. SVG aria-label states the count.
- Node check (re-run 2026-10-14, same rule as Demo.tsx): reach A-D 7, E 10, F 8, G 3, H 2, I 1, J 1, K 2, L 1; undirected component of A = 10; 44 of 132 ordered pairs.
- Reveal gate: three milestones (a core page, an IN page, an OUT page). The reveal quotes the first tapped page of each group, so it only quotes reached states (e.g. "From F you reach 8" if F was the IN page tapped).
- Section unconfirmed: the brief's section for ch. 13 (13.3-13.4) is unconfirmed; references carry chapter 13, section 13.3 with a note.
- Broder et al. figures: "about 200 million pages" is claim c5, needs a human source check. The brief's percentages (28/21/21) are NOT shown to learners.
- Not done: hero illustration (1:1, predict only) from the brief; no illustration pipeline run in this session. Route to visual-designer.
- The predict question says "page A"; options are plain numbers, so A is not confused with an option letter.
- Recall question written by the builder.
- Open: the stage grows taller once the predict panel collapses (kit behaviour), so the readout line moves between phases.

## Revision v2 (demo-builder, 2026-10-14)

- Reveal stage pinned to the first core page tapped (its reach filled), dashed rings on the first IN and OUT page tapped, legend and reveal text say so; stage taps disabled in the reveal. Text now names what is on screen.
- IN, CORE, OUT, TENDRIL, DETACHED labels drawn on the stage once all three groups were tried (and in the reveal); reveal text says CORE/IN/OUT instead of left/right.
- Fact-check advisory: c4 now says "tendrils hanging off those, and disconnected pieces".
- Positional tell: predict options now 7 / 10 / 4 (answer 0); recall options reordered (answer 0).
- Claims c1, c3, c4 text changed, back to unverified. Version 2.
- Node check unchanged: A-D 7, E 10, F 8, G 3, H 2, I 1, J 1, K 2, L 1.
- QA (QA_ONLY=web-bow-tie-reach, port 3691): 10 passed, 2 failed (feed.spec subject chips, pre-existing, unrelated, both viewports). Lesson specs passed on phone and desktop. check and typecheck pass.
