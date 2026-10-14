# Build note: glider-walks

builder: algo-pair-02 (demo-builder) · 2026-10-14 · status: draft · kept from evaluators until they report

## What was built
Storyboard / scrub per `company/design/specs/glider-walks.md`. 7x7 grid (40 px cells), glider at offset (1,1), dashed ghost of gen 0 on every frame, neighbour counts (toggle, starts on), x/+ marks on the frame just shown, a readout, and a filmstrip. Controls in DOM order: Gen 1, Gen 2, Gen 3, Gen 4 (each makes exactly one generation from the previous, enabled only once the one before exists; a made frame can be tapped to look back; the frame on show is active and disabled), then "Counts: on/off". No cell toggling (spec decision).

## Answers re-run in node
- Glider (1,0) (2,1) (0,2) (1,2) (2,2): live counts 5,5,5,5,5; gen 4 is gen 0 shifted by (+1,+1).
- Step one: (1,0) and (0,2) have 1 neighbour and die; (2,1) 3, (1,2) 3, (2,2) 2 live on; (0,1) and (1,3) are born with exactly 3.

## Rules checked
- Predict: only gen 0 shown, frames 1-4 "?", all controls disabled. Ghost sits behind live cells, so no displacement is visible.
- Reveal pins the grid to gen 4 ("Your gen 4") with the ghost, even if the learner scrubbed back; the reveal quotes 5 cells and the shift, which gate on milestones gen-1 and gen-4 (gen 4 can only be made after gens 1-3).
- No jump-to-answer; one generation per press. One-press path: Gen 1, Gen 2, Gen 3, Gen 4, Counts.

## Known gaps
- Rule line plus readout plus legend are close to the 25-word stage budget.
- The Turing-complete sentence is in the reveal (claim c4, Winning Ways ch. 25) and must be verified from the book.
- All claims start unverified.
