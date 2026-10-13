# Build note: wheel-of-negatives (demo-builder, 2026-10-13)

- Design intent: one wheel of 256 positions (0 at the top, clockwise), the first half green (0 to 127) and the second half red (-128 to -1), with the pointer, the signed value in the centre, and the 8 bits with their weights directly underneath (top weight -128 in red). Buttons: +1, +128 (half turn), -1, Back to 127. Start at 127, the question's premise.
- Key state: crossing the top (127 -> -128) and crossing zero (-1 -> 0, or a half turn from -128 to 0). Milestones ["over-top", "past-zero"], minInteractions 2. QA path: +1 (127 -> -128), +128 (-128 -> 0), -1 (0 -> -1), Back to 127.
- Numbers: question bits, options and the reveal's -128 and 11111111 come from signed()/bitsOf() in Demo.tsx, the code that draws the wheel. Brief answer (B, -128) re-computed in Node and held.
- Locked: the halves are grey, the negative labels are hidden and the top weight shows "?", so the -128 weight is not given away before the prediction.
- Deviation from brief: no drag on the wheel; step buttons only (drag on a 256-notch circle is imprecise on a phone).
- Before the first build the bottom labels (127, -128) would have been clipped and overlapping; moved the wheel down and spread them. Screenshots then read cleanly; no further changes.
