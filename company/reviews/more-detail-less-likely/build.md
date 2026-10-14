# Build note: more-detail-less-likely (demo-builder, wave-i-probability, 2026-10-14)

Brief: `company/domains/briefs/probability.chance.md` Round 3 item 3. Status draft, version 1. Claims c1-c4 unverified (c4 is the conjunction-fallacy citation, not in learner text; needs a human source check).

- Stage: 1,000 dots (40 x 25, filled column by column) = the town's people who fit Sam's description. Outer ring (dark outline, dark dots) = librarians; inner ring (red outline, gold dots) = librarians who run a book club, taken from the first librarians, so inner <= outer by construction. Dots are drawn as three paths (not 1,000 elements) after the first reveal-fit run timed out on the dev server.
- Sliders in DOM order: "Run a club, of librarians" (10-90%, step 20, start 50) then "Librarians, of people like Sam" (5-50%, step 5, start 10). Readouts: outer and inner counts.
- Milestones: "club-max" (club share 90%; counts recorded and shown in the stage message as a trace) and "lib-moved".
- Departure from the brief: club slider step 20 (not continuous) so two arrow presses reach 90%. The conjunction-fallacy name is not in learner text.

## Pre-flight v1
1. **Title and hook.** "Sam, the quiet book-lover" / "Two stories about Sam. Which one is more likely to be true?" Names no story and no direction.
2. **Options.** "Sam is a librarian" / "Sam is a librarian who runs a book club" / "Equally likely": none numbered; the right one is the least detailed, not the most precise.
3. **Locked stage.** Grey dots only (no rings, no colours), both sliders disabled at 50% and 10%, readouts "-". Nothing marks librarians or club members.
4. **Reveal values.** "Now {club}% ... {inner} dots in the inner ring, {outer} in the outer": (a) current sliders, same as the readouts. "At 90% it was X of Y, still fewer": (b) milestone club-max, recorded when it fired and shown in the stage message; printed only when the current state differs.
5. **QA path.** Club slider 50 -> 70 -> 90 (milestone club-max: 90 of 100), librarian slider 10 -> 15 -> 20 (milestone lib-moved; club still 90, record updates to 180 of 200). Both milestones reached. At the reveal the message "Club share at 90%: 180 in the inner ring, 200 in the outer." and the readouts 200 / 180 are on stage.
6. **Reset.** No reset control; the record survives any slider move. Reveal on the QA run: "Every librarian who runs a book club is a librarian, so the inner ring sits inside the outer one. Now 90% of librarians run a club: 180 dots in the inner ring, 200 in the outer. Sam's description makes the book club feel fitting, but each added detail can only remove people. A more specific story can feel more convincing, yet it is never more likely."
7. **Phone fit.** `node tools/reveal-fit.mjs --url http://localhost:3530 more-detail-less-likely` (dev server, 2026-10-14): verdict fit, stage-top crop 0 px, hiddenBelow 0, namedHidden 0, 69 words with the verdict (66 reveal; worst case 75). Stage 388 px (picture 113, controls 100, text 127), reveal 205 px, window 618 px. Screenshot `artifacts/reveal-fit/more-detail-less-likely.png`. Locked screen: dot grid shrinks to 16dvh so both sliders show; the readout row scrolls inside the stage before the prediction.

Not run: next build, QA, walkthrough (per task). tsc and check pass.
