# Build note: pentagon-gap (demo-builder, 2026-10-13)

- Intent: pick a regular shape and as many copies as fit go corner to corner around one dot; the leftover wedge (pentagons: 36°) or, after "Squeeze in one more", the overlap (72°) is drawn and captioned. One SVG, no slider.
- Key state (two milestones): the pentagon gap seen, and one shape that closes the turn. QA path: Pentagons is the first control, then Triangles.
- Every number (corner, count, gap, overlap) comes from corner(n) = (n-2)·180/n and fits(n) in Demo.tsx; the question quotes corner(5).
- Deviation from brief: the brief's "places pentagons" is one tap per shape (fan of copies), not one tap per tile, because QA presses each control once; the "Squeeze in one more" control keeps the overlap a learner action. The question names the 108° corner (a hint, not the answer).
- Reveal also covers corners meeting a straight edge (180°), so "rotate some" (option C) is answered honestly.
- After screenshots: layout reads on phone; no change.
- All numbers recomputed with node; all claims unverified, for the fact-checker.
