# Spec: rotation-untangles-the-chain

owner: interaction-designer (Rafael) · 2026-10-14 · status: draft, for design review · brief: `company/domains/briefs/cs.algorithms.md` #61 · wireframe: `rotation-untangles-the-chain.svg`

**Format: Before / after toggle.** One tree, one change: whether it rotates. "Before" is the plain tree (a chain); "after" is the rotating tree, and it persists into the reveal. The stage starts on the rotating tree, because the question asks about it and the plain chain is already given in the question. This follows the `a-star-heads-for-goal` pattern: the question's mode first, the other mode one chip away, then back.

## Brief check (re-run in node, 2026-10-14)
AVL insertion of 1 … 7 in order. Height counted in **levels** (a single node is height 1), as the question's "chain of height 7" implies.
- Rotating: **height 3, root 4, 4 rotations**, all single left rotations: at node 1 (inserting 3), at 3 (inserting 5), at 2 (inserting 6) and at 5 (inserting 7). Heights after each key: 1, 2, 2, 3, 3, 3, 3. Plain: a right-leaning chain, **height 7**. Inserting 1, 2, 3 needs one rotation and makes 2 the root. **The brief is right.**
- The height convention must be in the claim and on the stage ("levels"). Counted in edges, the numbers would be 2 and 6, and the question's options would be wrong.

## Stage at 390×844 (~380 px at predict, ~500 px in explore)
1. Rule line (muted, 15 words). Rotating: "If one side gets two levels deeper, rotate: lift the middle key up." Plain: "Smaller keys go left, bigger go right. No rotations."
2. **Tree area**, 342 × 300 px. Nodes are 32 px circles with the key inside, levels 40 px apart, so a 7-level chain fits (280 px) as a diagonal down to the right. The tree is laid out by in-order position: each key has its own column (7 columns, 46 px apart). **A key never changes column, only level.** That makes the in-order rule visible: a rotation moves keys up and down, never sideways past each other.
3. **Key row** under the tree: the seven columns labelled 1–7 along a baseline. Inserted keys are solid and waiting keys dashed ("next: 4 5 6 7" is read from it, with no words).
4. **Rotation ghost**: when an insert causes a rotation, the subtree before the rotation stays drawn dashed in `--muted` until the next press. A note sits beside it: "Rotated at 1: 2 moves up" (5 words).
5. Readouts: "Height: 3 levels" and "Rotations: 1".
6. **Results line**, two readouts: "Plain: ?" · "Rotating: ?" (heights after all seven keys).
7. Controls, below.

Stage words at the busiest moment: rule line 15 + note 5 + readout labels 4 (numbers and keys not counted) = 24.

## Controls, in DOM order (4)
| # | Kind | Label | Behaviour |
|---|---|---|---|
| 1 | Control | "Insert next key" | inserts the next key in the current mode. The new node drops into its column. If a rotation happens, the nodes slide to their new levels over 300 ms (instant under reduced motion), and the ghost and note appear. Disabled after 7 |
| 2 | Control | "Insert the rest" | inserts the remaining keys one at a time, about 50 ms per key, with each rotation's slide shortened to fit (≤ 400 ms in all). The last rotation's ghost and note stay. Disabled after 7 |
| 3–4 | Control chips | "Plain" · "Rotating" (group "Tree") | start: **Rotating** active and disabled. Switching empties the tree and restarts from key 1 in the new mode. **If the old run had inserted all seven**, the new mode is replayed to seven at once, as #2 |

All 4 controls render at first paint, disabled while `locked`, class `.tap` (44 px). No reset button: the chips restart, and nothing empties the stage at the reveal.

QA path (each control once, DOM order): Insert next key (1 alone, height 1) · Insert the rest (2–7 with four rotations, height 3, root 4, ghost of the rotation at 5: milestones `first-rotation` and `seven-rotating`) · Plain (replayed: the chain, height 7, results "Plain: 7") · Rotating (re-enabled; replayed back: height 3, results "Rotating: 3"). The QA path ends on the "after".

## States
- **Predict:** empty tree area, key row with 1–7 all dashed, the rotating rule line, "Height: 0 levels", "Rotations: 0", results "?". No tree outline or level guides that would hint at 3 levels.
- **On unlock:** nothing moves until a press. Exploration hint: "Insert the keys one at a time and watch key 3."
- **Rotating, keys 1–2:** 1 at the top, 2 below it to the right. Height 2.
- **Rotating, key 3:** for a moment 1-2-3 is a chain, then 2 slides up to the top and 1 drops down: 2 is the root, 1 and 3 its children. The ghost shows the 1-2-3 chain dashed, with the note "Rotated at 1: 2 moves up". Height 2, rotations 1.
- **Keys 4–7:** rotations at 3 (key 5), at 2 (key 6) and at 5 (key 7). After 7: root 4, children 2 and 6, leaves 1 3 5 7. Height 3, rotations 4.
- **Plain, all seven:** a diagonal chain 1 → 7 across the full tree area. Height 7, rotations 0.
- **Reveal:** the stage stays on the rotating tree, full. The reveal: "Your tree took 1 to 7 in order and stayed 3 levels tall. The plain tree was a chain of 7. Each time one side got two levels deeper, a rotation lifted the middle key: at key 3, 2 rose above 1 and 3. No key ever left its column, so the left-to-right order, and every search, stayed valid. Four rotations in all. Doing this at every insert keeps the height close to log₂ of the number of keys."

Milestones (`minInteractions=2`): `first-rotation` (rotating mode, key 3 inserted, root 2), `seven-rotating` (rotating mode, all seven inserted).

## Shown, not told
The column layout is the proof of "it stays in order": the learner watches 2 rise and 1 sink in their own columns. The ghost chain under the fixed tree is the before and after of one rotation, on the stage at once.

## Colour and access
Inserted nodes `--domain` fill, `--fg` keys; waiting keys dashed `--line`; ghost dashed `--muted`. The rotation is shown by position and the dashed ghost, not by colour. Tree `aria-label`: "Rotating tree: root 4, height 3 levels, 4 rotations".

## Notes for others
- **Builder:** "two levels deeper" is the AVL balance rule (|left height − right height| = 2 triggers). Inserting 1 … 7 needs only single left rotations. Draw by in-order column so no key moves sideways.
- **Brief owner (cm-cs-algorithms):** the toggle starts on rotating, not plain. The reveal gate is all seven keys in rotating mode, as the brief says, and the first rotation is also a milestone. Teaching unchanged.
- No illustration (CS).
