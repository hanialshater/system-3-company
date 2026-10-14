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

## Revision v3 (demo-builder, 2026-10-14), from learner-adult-beginner-r2

- Reveal labels: the kit scrolls the stage top off in the reveal, so the SVG IN/CORE/OUT tags can be cropped (still partly cropped after a compact 250 px reveal stage). The reveal caption now lists the groups in text under the stage (IN = E, F. CORE = A-D. OUT = G, H, I. Tendril = J. Detached = K, L) and the reveal text cites CORE (A to D), OUT (G, H, I), IN (E, F). Reveal stage compact (max 250 px, readout hidden, tag font 15). Seen in 14-reveal.png (phone).
- Title now "Which pages can you click to?" (slug unchanged); no longer states the answer.
- K and L tied to the 10: reveal says "Ten pages are joined to the core (all but K and L, which link only to each other)". c2 and c3 text changed, back to unverified. Version 3.
- Not fixed (minor, out of the listed findings): step 1 confirms the guess; option 4.
- Build: `next build` was OOM-killed twice (shared machine); QA run against `next dev` on port 3901 (QA_ONLY, own QA_OUT): 9 passed, 3 failed (feed.spec only, unrelated: feed home and subject chips). Lesson specs passed phone and desktop. Node check unchanged (no numbers changed).
