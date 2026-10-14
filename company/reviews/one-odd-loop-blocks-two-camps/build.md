# Build note: one-odd-loop-blocks-two-camps

builder: demo-builder (ncm-m2) · 2026-10-14 · v1 draft · brief: company/domains/briefs/math.discrete.md, Course: NCM, brief 8 (as edited at acceptance)

- Graph as the brief: ring A-F (A top, clockwise; brief nodes 0-5) plus cross link A-D (brief chord 0-3) drawn vertically, so the two small loops read as "Right loop" A-B-C-D and "Left loop" A-D-E-F. Enemies A-B and D-E (brief 0-1, 3-4). Friends green solid, enemies red dashed.
- Controls in DOM order: Big ring, Right loop, Left loop (each highlights its loop with a wide band; readout "Loop's enemy links: k, odd/even"), Try all 64 splits (brute force; colours people by the best labelling and thickens its broken links; readout "Splits that work"), Move enemy D-E to C-D (toggle, label flips to "Move it back to D-E"). Milestones: odd-loop (a small loop viewed as given), tried-all (brute force as given), minInteractions 2. Moving back re-awards them, so a learner who moves first cannot get stuck.
- Show the why: the cause (an odd loop) is on the stage as the highlighted loop with its count, and the best attempt's single broken link is the cross link A-D. The reveal says what walking round an odd loop does and points back at the counts. The reveal reads the lifted `moved` state, so it quotes the moved result only if the learner moved the link.
- Re-run (own code, node 2026-10-14, then the Demo's tryAll()): as given, ring 2, right loop 1, left loop 1; 0 of 64 labellings valid; minimum 1 broken link (the chord). Moved to C-D: loops 2, 2, 0; 2 of 64 valid ({A,D,E,F} vs {B,C} and its swap). Matches the edited brief.
- Not run: build, typecheck, QA, walkthrough. Draft.

## Revision v2 (wave E, r6 learner review)

- r6 blocking (switch-camp-per-enemy-link told, not shown): picking a loop now walks it from A on the stage. Each person on the loop is tinted by the camp the walk gives them (filled or dotted), switching at every red link, and A gets an outer ring in the camp the walk comes back with (dashed red ring = clash). Caption: "Right loop: 1 enemy link. Walk from A, switching at each: back at A in the other camp: clash." The big ring walk comes back in the same camp.
- r6 legend: a fixed line "Green solid: friends · red dashes: enemies" (also while locked), and the question states the camp rule. The best-try caption names the two camps (filled vs dotted) and the broken link (thick).
- "Move enemy D-E to C-D" relabelled itself: now two buttons, "Enemy on D-E" (active at start) and "Enemy on C-D".
- Loop counts and split results are recorded per layout in a row under the readouts; the reveal quotes that row.
- Title "Two camps on a ring of six?", hook "Two enemy links on a ring of six, plus one cross link. Can two camps form?" (the old title "The big loop looks fine. Is it?" leaned to No).
- Not changed: the graph cropped at the top over the reveal (kit reveal layout); flag for the walkthrough.
- c2 and c4 reworded and unverified.

## Pre-flight v2

1. Title and hook: "Two camps on a ring of six?" / "Two enemy links on a ring of six, plus one cross link. Can two camps form?" Both are open; neither says "looks fine" or hints at a catch.
2. Options: "Yes" / "No" / "Can't tell from the loops". None numbered.
3. Locked stage: hexagon A–F with cross link A–D, red dashed A–B and D–E, the legend line, readouts "?". No loop highlight, no camp tint, no clash ring.
4. Reveal values: "big ring had 2 enemy links", "right loop: 1, left loop: 1": recorded in the layout row when the learner picks each loop (a, from their own picks; milestone odd-loop guarantees at least one odd loop). "came back to A in the other camp": the walk drawn at milestone odd-loop (b). "0 of the 64 splits": recorded at milestone tried-all (b), in the row. "With the enemy on C-D … 2 of 64": only if the learner tried that layout (a, from the row); otherwise the sentence is an invitation in the present tense, not a "you saw".
5. QA path: Big ring (2, same camp) → Right loop (1, clash: odd-loop) → Left loop (1, clash) → Try all 64 splits (0/64: tried-all) → Enemy on D-E (disabled) → Enemy on C-D (2/64). At the reveal the row reads "enemy on D-E: big ring 2, right loop 1, left loop 1; 0/64 work · enemy on C-D: left loop 0; 2/64 work".
6. Reset: there is no reset; moving the enemy back does not clear the row. Reveal on the QA path: "Your big ring had 2 enemy links, an even number, but the cross link A-D makes two smaller loops (right loop: 1, left loop: 1) with an odd count. On those walks every red link switched camp, so the walk came back to A in the other camp. That is why 0 of the 64 splits worked. / With the enemy on C-D every loop was even and 2 of 64 worked: one split, with the camp names swapped. A network splits into two camps exactly when every loop has an even number of enemy links."

## Revision v3 (W-265, phone fit, 2026-10-14)

- Decision `company/decisions/2026-10-14-reveal-fits-with-its-picture.md`: at 390×844 the stage top (the ring) was cropped by 45 px at the reveal (picture already shrunk 184 → 74 px).
- Control rows merged: "Try all 64 splits" now shares a three-column row with "Enemy on D-E" and "Enemy on C-D" (was its own full-width row). DOM order unchanged; buttons keep min-height 44 px (labels may wrap to two lines, about 48 px tall). Removes one 44 px row and one gap: about 45 px.
- Reveal 95 → 81 words: "an even number" → "even", "with an odd count" → "each odd", "On those walks every red link … the walk came back" → "Every red link switched camp, so those walks came back", "That is why 0 of the 64 splits worked" → ": 0 of 64 splits worked", "one split, with the camp names swapped" → "(one split, names swapped)". About 1 to 2 lines, 20 to 40 px. No teaching sentence removed.
- Estimated saving: 65 to 85 px against a 45 px crop (estimate, not measured).
- Claims c1–c4 reopened (their reveal sentences were reworded; claim text unchanged). c5 is verbatim. Status published → review.

## Pre-flight v3

1. Title and hook: unchanged ("Two camps on a ring of six?" / "Two enemy links on a ring of six, plus one cross link. Can two camps form?").
2. Options: unchanged, "Yes" / "No" / "Can't tell from the loops".
3. Locked stage: unchanged (ring A–F with cross link A–D, red dashed A–B and D–E, legend, readouts "?"; no loop, tint or clash ring).
4. Reveal values: unchanged sources. Ring 2, right loop 1, left loop 1: the layout row, from the learner's picks (a; milestone odd-loop guarantees one odd loop). "came back to A in the other camp": the walk drawn at odd-loop (b). "0 of 64": tried-all (b). C-D "2 of 64": only if tried (a), else present tense.
5. QA path: Big ring → Right loop (odd-loop) → Left loop → Try all 64 splits (tried-all) → Enemy on D-E (disabled) → Enemy on C-D. DOM order unchanged by the row merge. The layout row and both readouts are on stage at the reveal.
6. Reset: no reset. Reveal on the QA path: "Your big ring had 2 enemy links, even, but the cross link A-D makes two smaller loops (right loop: 1, left loop: 1), each odd. Every red link switched camp, so those walks came back to A in the other camp: 0 of 64 splits worked. / With the enemy on C-D every loop was even and 2 of 64 worked (one split, names swapped). A network splits into two camps exactly when every loop has an even number of enemy links."
7. Phone fit: reveal 81 words. Named by the reveal: the loops on the ring, the walk back to A, the layout row. Stage-top crop: not measured (no build allowed this session). Estimated 45 px → 0 px. Needs a 390×844 screenshot of the open reveal.

## Revision v4 (W-281, fact-check pass 30 c4, 2026-10-14)

- Dispute: once "Try all 64 splits" was pressed, the stage always showed the best split and never a walk, so Try → Right/Left loop reached odd-loop with no walk drawn, while the reveal says "those walks came back to A in the other camp".
- Fix: the picture shows one thing at a time (`view` state: walk or split). Picking a loop draws its walk and A's clash ring, also after Try; the caption is the walk caption. Pressing Try shows the best split again (Try is re-enabled while a walk is shown after trying; the loop button you are on is re-enabled while the split is shown, so you can go back to its walk). The "Splits that work" readout and the layout row keep the tried result either way.
- Moving the enemy back to D-E reaches odd-loop only while a walk is drawn (before: also while the split was shown). Nobody gets stuck: picking a small loop on D-E always reaches it.
- Reveal text unchanged (81 words). c4 reopened (unverified). c1-c3, c5 untouched.
- Run: tsc, `npm run check`. Not run: build, QA, walkthrough (not asked this session).

## Pre-flight v4

1. Title and hook: unchanged ("Two camps on a ring of six?" / "Two enemy links on a ring of six, plus one cross link. Can two camps form?").
2. Options: unchanged, "Yes" / "No" / "Can't tell from the loops".
3. Locked stage: unchanged (ring A-F, cross link A-D, red dashed A-B and D-E, legend, readouts "?"; no loop, tint or clash ring).
4. Reveal values: ring 2, right 1, left 1: layout row from the learner's picks (a). "those walks came back to A in the other camp": now on every path the walk with the clash ring is drawn when odd-loop is reached (b): onLoop always sets the walk view; onMove awards it only in the walk view. "0 of 64": tried-all (b), in the row. C-D "2 of 64": only if tried (a), else present tense.
5. QA path: Big ring → Right loop (walk, clash: odd-loop) → Left loop → Try all 64 splits (split, tried-all) → Enemy on D-E (disabled) → Enemy on C-D. Unchanged by this fix. Path from the dispute: Try (split) → Right loop (walk drawn: A-B-C-D, clash ring at A; odd-loop) → reveal.
6. Reset: no reset. Reveal on the QA path unchanged from Pre-flight v3.
7. Phone fit: no layout change; reveal 81 words.
