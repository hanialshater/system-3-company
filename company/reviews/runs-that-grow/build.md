# Build note: runs-that-grow (demo-builder, 2026-10-13)

- Design intent: a strip of 8 pixel buttons (16 in two rows of 8 after the size toggle) that the learner paints. The code builds live underneath as count-then-letter chunks, dark chunks for black runs; readouts give pixels, code characters and the change (+/-). "Question's row" loads BWBWBWBW in one tap; "All white" gives one long run.
- Key state: a row whose code is shorter than its pixels, and one whose code is longer. Milestones ["shrunk", "expanded"], minInteractions 2. QA path: painting pixels from all-white gives shrunk rows; Question's row gives the 16-for-8 expansion.
- Numbers: the question's row, its 16-character code and the 16W example in the reveal come from encode() in Demo.tsx. Brief answer (C, longer) re-computed in Node and held. The reveal quotes the learner's best and worst ratio rows.
- Locked: the code shows an ellipsis and the readouts a dash.
- Pixel colours are fixed near-white and near-black (content, not theme), so they read the same in light and dark themes.
- After screenshots: two rows of 8 fit the phone; the 10-chunk code line fits one line at 16 pixels for this pattern but could wrap for 16 alternating pixels (16 chunks); wrapping is allowed.
