# Build note: count-the-out-of-order-pairs

Builder: algo2-b2 (demo-builder). Status: draft. Kept from evaluators until they report. Not built, typechecked or QA'd locally.

## What was built
- Lanes: left [2 4], right [1 3 5], out row. Take next moves the smaller front card out; when a right card is taken, red arcs go to the left cards still waiting and the counter adds that many.
- Controls: Take next, Finish the merge, Start over. Readouts: out-of-order pairs, cards taken; a line lists the pairs found.
- Milestones (minInteractions 2): `jump` (a right card jumps someone; the first press), `merged`.

## Checks run
- Node: brute force 3 ((2,1), (4,1), (4,3)); 5 4 3 2 1 gives 10; sorted gives 0; merge log 1(+2), 2, 3(+1), 4, 5(+0); merge-sort count equals brute force on all 720 orders of 1..6.

## Choices to challenge
- Only the top-level merge is shown; the halves are given already sorted, so the recursion that makes it O(n log n) is told in the reveal, not shown.
- Arcs run from the taken card in the out row up to the waiting left cards; they may read as clutter on a phone.

## Pre-flight v2

Changes for r6 (adult-beginner, revise): a "Check every pair" control puts the 10 pair checks on stage beside the merge's 5 takes (finding 1); a jump log under the stage lists every jump of the run, so "Finish the merge" still leaves "3 jumped 4: +1" visible (finding 2); the full merge is recorded and the log shows "Last merge: …" after Start over (finding 3). Title changed: the old one ("…without checking pairs") answered the hook. Gate is now 3 milestones: jump, merged, brute.

1. **Title and hook.** "How messy is 2 4 1 3 5?" / "Count the pairs that are out of order. Is checking every pair the only way?" No: neither names 3 or a count.
2. **Options.** "2", "3", "5": all bare numbers, same precision.
3. **Locked stage.** Halves 2 4 / 1 3 5, readouts "Merge: pairs 0", "Merge: takes 0 of 5", "Every pair: checks not run", log "Jumps: none yet". Nothing matches 3.
4. **Reveal values.** count 3 and the jump log: (b) recorded when milestone `merged` fires (MergeRecord). Takes 5: (b) same record. 10 checks and "the same 3" with the pair list: (b) milestone `brute`, readout "10, 3 found" stays on stage (Start over does not clear it).
5. **QA path.** Take next (jump, 1 jumps 2 and 4), Finish the merge (merged; log shows both jumps), Check every pair (brute), Start over. All three milestones in four presses, no animation. After Start over the log reads "Last merge: 1 jumped 2 4: +2 · 3 jumped 4: +1" and the brute readout still reads "10, 3 found".
6. **Reset.** Reveal after Start over (traced from code, not run): "Your merge counted 3: 1 jumped 2 4: +2 · 3 jumped 4: +1. When 1 left the right half ahead of 2 and 4, it jumped both, and each jump is one out-of-order pair. 3 jumped only 4. / Checking every pair took 10 checks to find the same 3: (2,1), (4,1), (4,3). The merge found them in 5 takes. Merge sort repeats this merge at every level, so counting this way costs O(n log n) in total, not n²." Matches the stage: the counter reads 0 after Start over, but the reveal quotes the recorded merge and the log row shows it. Still told: the O(n log n) sentence (one claimed context sentence, c6); the recursion is not drawn.
