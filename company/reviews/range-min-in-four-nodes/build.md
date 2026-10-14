# Build note: range-min-in-four-nodes

Builder: algo2-b2 (demo-builder). Status: draft. Kept from evaluators until they report. Not built, typechecked or QA'd locally.

## What was built
- Segment tree over 16 hand-picked values drawn as 5 rows of blocks (whole, halves, quarters, eighths, singles), each showing its minimum. The nodes a range uses are lit; a bar under the index row shows the range.
- Controls in DOM order: "Positions 3 to 12" preset, "Combine the lit nodes", From slider, To slider, "Change the value at 9" (cycles 2, 8, 4 and outlines the 5 nodes on its path).
- The brief asked for drag handles; two kit Sliders replace them (phone and QA friendly).
- Milestones (minInteractions 2): `range` (3..12 selected), `combined` (combined at 3..12).

## Checks run
- Node: cover(3,12) = [3], [4-7], [8-11], [12]; cover(1,14) = 6 nodes; max over all 136 ranges = 6; update path = 5 nodes.

## Choices to challenge
- The preset button hands the learner the key range; the sliders are there for their own ranges.
- c3 (at most about 2 log2 n) has no textbook source; derivation only.

## Pre-flight v2

Revision for r6 (adult-beginner): the title "Ten values, four looks" and the hook's "far fewer" gave the answer; the readouts were cropped; the reveal quoted "1 to 14 needs 6", a range nobody chose. Title and hook rewritten; "(0-based)" dropped from the stem; the readout row moved above the buttons and sliders; the range state is lifted to the lesson so the reveal quotes the learner's own last range; "Change the value" is now a third milestone, so the path sentence is something they did. log₂ glossed. c2, c3, c4 reworded.

1. **Title and hook.** "Smallest of ten: how many looks?" / "A tree stores the minimum of every aligned block. How many blocks cover positions 3 to 12?" Neither names a count or says fewer/more.
2. **Options.** "10", "4", "2": all bare numbers.
3. **Locked stage.** The 5-level tree with the root lit for 0 to 15, readouts Positions 16, Nodes used 1, Minimum "?", message "Predict first, then pick a range." No 4 or highlight on [3]…[12].
4. **Reveal values.** "10 values … just 4 stored nodes: [3], [4 to 7], [8 to 11] and [12]": the question's own case, gated by milestones "range" and "combined" (3–12 selected and combined). "Your last range, 5 to 14, needed 5": computed from the learner's current range (shown in the Positions/Nodes used readouts and the lit nodes); omitted if the range is still 3–12. "No more than 6" and "about 2 log₂ n": told context (c2, c3), not quoted as seen. "the 5 nodes on its path": milestone "changed"; the green outlined path is on stage.
5. **QA path.** Positions 3 to 12 ("range"), Combine the lit nodes ("combined"), From ×2 (5 to 12), To ×2 (5 to 14), Change the value at 9 ("changed"). All 3 milestones; the 5-node path outline and the 5 to 14 readouts are on stage when the reveal opens.
6. **Reset.** No Reset control. Reveal from that run: "Positions 3 to 12 are 10 values, but you combined just 4 stored nodes: [3], [4 to 7], [8 to 11] and [12]. Only the ragged ends need small nodes; the middle is covered by big aligned ones. Your last range, 5 to 14, needed 5. No range of these 16 positions needs more than 6. Every range is a union of at most about 2 log₂ n stored nodes, where log₂ n counts the halvings from n down to 1 (4 for 16). When you changed one value, only the 5 nodes on its path to the top were rewritten, so both the question and the update take about log n steps. The same tree works for maximum or sum."
