# Spec: copy-overlaps-itself

owner: interaction-designer (Rafael) · 2026-10-14 · status: draft, for design review · brief: `company/domains/briefs/cs.algorithms.md` #37 · wireframe: `copy-overlaps-itself.svg`

**Format: Storyboard / scrub.** The payoff is *when* something happens: at copy step 3 the back pointer reaches a letter that did not exist when the instruction started. A scrub over the six copy steps lets the learner stop on that moment and see it.

**Brief check (node, 2026-10-14):** start "ab", instruction back 2, copy 6, one letter at a time. Steps 1–2 read the original a, b; steps 3–6 read letters written by this same copy (indexes 2–5). Result **"abababab"**. The brief's answer (B) holds.

## Stage at 390×844 (~300 px at predict, ~400 px in explore)
1. Rule line (muted): "The decoder copies one letter at a time, from 2 back." (11 words)
2. **Instruction card**, centred: "back 2 · copy 6" with a small counter under it: "copied 0 of 6".
3. **Decode strip**: cells 40 × 44 px, 4 px gaps, left-aligned, up to 8 cells (348 px). Only written cells are drawn, plus one dashed "?" cursor cell. There is **no outline of 8 cells**: the strip's length is not shown before it is written. Original letters are plain tiles; letters written by this copy are tinted tiles with a small dot under them ("new").
4. **Back pointer**: an arc above the strip from the source cell to the cell being written, labelled "2 back". When the source is a tinted "new" tile, the arc's tail gets a ring and the readout says "reading a letter this copy wrote".
5. **Timeline**: a row of six frame chips, labelled 1–6, under the strip, with a caption "Copy step".

## Controls, in DOM order (6)
| # | Kind | Label | Behaviour |
|---|---|---|---|
| 1–6 | Control chips | "1" … "6" (group "Copy step") | chip k shows the frame after copy step k: k + 2 letters written, the arc from cell k to cell k + 2, the counter "copied k of 6". The new letter slides along the arc in ≤ 250 ms (instant under reduced motion). Chip 1 is enabled on unlock; chip k is enabled once frame k − 1 has been shown. Earlier chips stay enabled for scrubbing back |

So there is no jump: the last frame (the answer) can only be reached after frames 1–5 have each been shown. The active chip carries `className="active"`.

Not in this spec: the brief's encode mode (pick back-distance and length for a repeated word). It would double the controls and add a second task inside 60 s. The run-length point is made from what the stage already shows (two numbers wrote six letters), and the reveal names it once. If the learning designer wants encode back, it should be a second lesson, not a second mode.

QA path (each once, DOM order): 1 (a written, reads original a) · 2 (b) · 3 (reads index 2, a "new" tile: milestone 1) · 4 · 5 · 6 ("abababab", copied 6 of 6: milestone 2). The stage at the reveal is frame 6.

## States
- **Predict:** "ab" in two plain tiles, a dashed "?" cursor, the card "back 2 · copy 6", "copied 0 of 6", no arc. Chips disabled. Nothing shows how many letters will exist.
- **Steps 1–2:** the arc reaches back into the original "ab". Nothing surprising.
- **Step 3:** the arc's tail lands on the tinted "a" written at step 1. Ring on the source; readout "reading a letter this copy wrote". This is the misconception breaking.
- **Steps 4–6:** the arc slides right one cell per step, always onto tinted tiles. Six tinted tiles after two plain ones.
- **Reveal:** stage stays on the frame the learner last chose (frame 6 on the QA path, since the milestone needs it). Reveal quotes the frames reached: "Your decoder wrote abababab. From step 3 on, it was copying letters it had written two steps earlier, so 2 letters were enough to copy 6." Then the payoff: a back-reference is two numbers in place of a repeat; a copy that overlaps itself encodes a whole run; this is the idea inside gzip and PNG (claims 2, 3).

Milestones (`minInteractions=2`): `read-new-letter` (frame 3 shown), `eight-written` (frame 6 shown, as the brief's key state).

## Shown, not told
The learner sees the pointer's source become a letter that the same instruction produced, and the strip grow past where the "copy" started. The reveal names it ("overlapping copy") after they watched it.

## Colour and access
Plain tiles `--bg-2` with `--fg` letters; new tiles a `--domain` tint with `--fg` letters plus the dot (shape cue, not colour only). Arc `--fg`; source ring `--fg`, 2 px. Chips 44 px high (`.tap`), ~56 px wide with 6 px gaps (fits 366 px). Strip `aria-label`: "Written: a b a b a, copied 3 of 6, reading a letter this copy wrote".

## Title constraint (for the learning designer)
The hook and title must not contain the decoded string or "overlap" wording that gives away option B.
