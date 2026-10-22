*Simulated learner. This review finds problems; it is not evidence that anyone learned.*

# Learner review: slice-a-corner-off
lesson version: v2
boundary: a learner who can name and count the corners, edges and faces of a cube and does simple arithmetic; has never heard of Euler's formula or the word "convex" in a maths sense; expects a cut to change the counts unpredictably.
Screenshots seen: yes (artifacts/walkthroughs/slice-a-corner-off/sheet.png, recorded 2026-10-22T12:07:54.426Z)
Verdict: launch

## Findings (written from the walkthrough before reading build.md or meta.json)

1. Where understanding first broke: nowhere blocking. I recounted each drawing against its readout. One slice: the cut corner becomes a shaded triangle (3 new corners, 3 new edges round it, 1 new face), 10 − 15 + 7 = 2. Second slice on the front-top-left corner: a narrower triangle (drawn thin by the oblique view, but its three corners are dotted), 12 − 18 + 8 = 2. Pyramid 5 − 8 + 5 = 2; tip sliced gives a shaded square on top (4 new corners, 4 new edges, 1 face), 8 − 12 + 6 = 2. The change line ("+2 corners, +3 edges, +1 face"; "+3 corners, +4 edges, +1 face") matches the drawings.
2. What the prediction felt like: a real choice. The question gives the cube's own count first, so "still 2" is not obvious; a learner who thinks "more pieces, more corners" picks "more" or "less". The first slice settles it in one frame, and the chip records "+2 − 3 + 1 = 0", which is exactly the arithmetic that answers "why".
3. The pyramid adds a second case where 4 edges meet, so the learner sees the pattern is not a cube accident (+3 − 4 + 1 = 0). Good choice of second solid.
4. Note: after Reset, the stage (and the reveal's picture) show the whole cube again, while the reveal says "Slicing a corner off your cube …". The chips keep the recorded sums, so the numbers survive; only the sliced picture does not. A learner can tap again. Note, not a block.
5. Note: the reveal's last sentence uses "convex solid" without explaining it, and introduces "k". "k edges at a corner" is followed by two concrete instances (3 and 4) on screen, so k is readable. "Convex" is new to this learner; the claim reads as "every solid" to them, which is slightly over-general but the trust sheet adds "(convex polyhedron)". A plain gloss ("with no dents or holes") would help.
6. Whether the reveal answered the question the learner actually had: yes. My question after slicing was "why didn't it change?" The reveal's +2 − 3 + 1 = 0 bookkeeping answers it directly, and names the general rule.

Verdict reason: no finding blocks a first-time learner; notes only (sliced picture not kept after Reset into the reveal; "convex" unexplained).

## After reading build.md / meta.json

- Read only meta.json's `version` field (2) to stamp this review. build.md and design.md not read.
