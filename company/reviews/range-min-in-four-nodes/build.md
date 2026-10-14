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

## Pre-flight v3 (demo-builder, 2026-10-14, wave G, r7 adult-beginner)

Fixes: (top) the question's cover is recorded when 3 to 12 is combined: a stage row "Seen: 3 to 12 = [3] + [4 to 7] + [8 to 11] + [12], 4 nodes, minimum 2", and the four blocks stay outlined dashed whenever they are not lit, so after dragging to 5 to 14 the quoted cover is still on the stage. The reveal's block list is computed from the same cover. (minor 5) the change message now names the new value: "Position 9 changed from 2 to 8: only the 5 nodes on its path to the top were rewritten." Not changed: Minimum returns to "?" after a range change (minor 4); the reveal does not quote it.
1. Title and hook: "Smallest of ten: how many looks?" / "A tree stores the minimum of every aligned block. How many blocks cover positions 3 to 12?" Unchanged; no count.
2. Options: "10", "4", "2". Bare numbers.
3. Locked stage: root lit for 0 to 15, Positions 16, Nodes used 1, Minimum "?", "Predict first, then pick a range." No Seen row, no dashed blocks before the commit.
4. Reveal values: 10 values, 4 nodes and the four block names: (b) milestones range + combined, recorded on the Seen row and the dashed blocks. "Your last range, 5 to 14, needed 5": (a) current range, in the readouts. "5 nodes on its path": (b) milestone changed, green outline on stage. 6 and 2 log₂ n: told context (c2, c3).
5. QA path: Positions 3 to 12, Combine (Seen row appears), From x2 (5 to 12), To x2 (5 to 14), Change the value at 9. All 3 milestones; at the reveal the stage shows the Seen row, the dashed [3] and [4 to 7] (lit [8 to 11] stays lit only if inside 5 to 14: it is, as part of that cover), and the 5 to 14 readouts.
6. Reset: no Reset; Seen row never clears. QA-path reveal: "Positions 3 to 12 are 10 values, but you combined just 4 stored nodes: [3], [4 to 7], [8 to 11] and [12] (the Seen row; dashed when not lit). Only the ragged ends need small nodes; the middle is covered by big aligned ones. Your last range, 5 to 14, needed 5. No range of these 16 positions needs more than 6. / Every range is a union of at most about 2 log₂ n stored nodes ..."
- meta.json 2 -> 3; new claim c7 (unverified). Not run: build, QA, walkthrough, tsc.

## Pre-flight v4 (demo-builder, 2026-10-14, W-244, answering FC pass 26 c7)

Fixes: (1) `combine()` now sets seenMin only if it is still null, so the row records the first combine of 3 to 12 and is never rewritten. The row is labelled "Seen (first combine): 3 to 12 = [3] + [4 to 7] + [8 to 11] + [12], 4 nodes, minimum 2". The 2 holds when the learner combines before any Change. If Change was pressed first, the row shows that combine's minimum (3 after one or two changes, 2 after three), and the claim says so. (2) The dash is now `dashed = !on && seenMin !== null && Q_KEYS.has(key(b))`, which no longer depends on onPath. A Seen block on the change path keeps its dashes, drawn in the path's green at width 3. The checker's path (combine 3..12, widen to 0..15, Change) now shows [8 to 11] dashed green, not solid. The reveal's "dashed when not lit" is unchanged and true on that path. c7 is reworded and set to unverified.
1. Title and hook: unchanged.
2. Options: unchanged ("10", "4", "2").
3. Locked stage: unchanged. No Seen row, no dashes.
4. Reveal values: unchanged from v3. The reveal does not quote the Seen row's minimum.
5. QA path: unchanged from v3. Combine comes before Change, so the row reads "minimum 2". After Change at 9 (inside 5 to 14), [8 to 11] is lit as part of the 5 to 14 cover, so it is solid and lit, not traced.
6. Reset: none. The Seen row never clears or rewrites. The QA-path reveal is as in v3.
- meta.json 3 -> 4. Not run: build, QA, walkthrough.

## Pre-flight v5 (demo-builder, 2026-10-14, wave H, learner r8 / W-293)

Changes: reveal cut from ~128 to 72 body words (told context cut: "your last range needed k", "no range needs more than 6", the 2 log₂ n sentence, "maximum or sum"; c2, c3, c6 withdrawn); "Positions 3 to 12 are" → "The range 3 to 12 holds" (so the reveal does not quote the folded button). Both control rows and the two sliders (now side by side in one Row) opt in to the fold; none holds a Readout, no reveal sentence reads them, and what they set stays drawn (range bar, lit nodes, green path). At the reveal the tree levels sit 27 units apart instead of 30 and the empty band under the range bar goes (viewBox 196 → 165 high; labels keep their size). MINIMUM shows the current range's value at the reveal instead of "?" (r8 minor). Position labels 9 → 10 px.

1. Title and hook: unchanged.
2. Options: unchanged ("10", "4", "2").
3. Locked stage: unchanged (root lit, NODES USED 1, MINIMUM ?).
4. Reveal values: 3 to 12, 10 values, 4 nodes and their labels: constants of the question, recorded on the Seen row (b, combined milestone); "dashed when not lit": drawn from the Seen record; 5 path nodes (b) changed milestone, outlined green and stated in the message line.
5. QA path: Positions 3 to 12, Combine, From, To, Change. All three milestones; Seen row, dashed outlines, green path and message on screen at the reveal.
6. Reset: none. Reveal (QA path, 72 words): "The range 3 to 12 holds 10 values, but you combined just 4 stored nodes: [3], [4 to 7], [8 to 11] and [12] (the Seen row; dashed when not lit). Only the ragged ends need small nodes; the middle is covered by big aligned ones. When you changed one value, only the 5 nodes on its path to the top were rewritten, so both the question and the update take about log n steps for n positions, not n."
7. Phone fit (reveal-fit, localhost:3530, 2026-10-14): crop 290 px → 0 px; hiddenBelow 0; namedHidden 5 → 0; phoneFit true; reveal 133 → 85 words as measured (verdict included). Stage 556 → 359 px; the fold fires ("Show controls"). The whole tree, the message line, readouts and Seen row are on screen. Screenshot: artifacts/reveal-fit/range-min-in-four-nodes.png.
