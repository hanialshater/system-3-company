# Spec: trie-word-length-not-count

owner: interaction-designer (Rafael) · 2026-10-14 · status: draft, for design review · brief: `company/domains/briefs/cs.algorithms.md` #11 · wireframe: `trie-word-length-not-count.svg`

**Format: Before / after toggle.** There is one change: 990 more words. The lesson is that the "after" looks completely different (a tree fanned out sideways) while the walk to "cat" is the same three hops. One stage and one toggle, and the after state persists into the reveal.

## Brief check (node, 2026-10-14)
I built a letter tree with 10 words (cat car cap dog dot sun sea art ant bat), then added 990 distinct other words of 3 to 8 letters from a seeded generator. Looking up "cat" takes 3 letter steps and finds an end-of-word mark, both before and after. **The brief is correct.** It holds as long as a step means "follow one letter edge" and finding a child takes constant time (claim 3). The stage counts steps that way and says so.

## Stage at 390×844 (~300 px at predict, ~480 px in explore)
1. Model line (muted): "One step = follow one letter down the tree." (9 words)
2. Readout row: "Words: 10 · Steps: 0". After the toggle it becomes "Words: 1,000 · Steps: 3", and the previous walk is pinned beside it in muted text ("10 words: 3 steps").
3. **The tree**, 358 × 240 px, top-down. The root is at the top. Level 1 holds the first letters, level 2 the second, level 3 the third. Nodes are 22 px circles with their letter, and an end-of-word node has a double ring.
   - **10 words:** the full tree is drawn (5 first letters, 10 leaves).
   - **1,000 words:** the c → a → t path stays at the **same screen position**. Level 1 widens to all the first letters in the list (thin 12 px stubs, letter labels only on every few). Every other branch becomes a grey fan wedge with its word count ("c: 61 words" — the builder takes the number from the list). Depths below 3 are a muted "deeper" wedge. The tree grows sideways, not downwards.
   - The walked path is drawn thick in `--fg`, and the node currently reached pulses once.
4. Letter keys, then the toggle.

## Controls, in DOM order (4)
| # | Kind | Label | Behaviour |
|---|---|---|---|
| 1 | Control key (`.tap`, ~110 × 44) | "c" | Walks root → c, so Steps: 1. Enabled at depth 0. After a complete walk it stays enabled and starts a fresh walk (depth 1) |
| 2 | Control key | "a" | c → a, Steps: 2. Enabled only at depth 1 |
| 3 | Control key | "t" | a → t, Steps: 3, and the double ring lights up: "cat ✓" |
| 4 | Control toggle (`.tap`, full width) | "Add 990 words" / "Back to 10 words" (`aria-pressed`) | Swaps the tree. **The learner's walk is kept:** the same letters are re-traced in the new tree hop by hop (≤ 300 ms, counter ticking 1, 2, 3), and the old tree's count is pinned in the readout |

All 4 controls render at first paint, disabled while `locked`. There is no reset and no "find" button.

QA path: c · a · t (3 steps among 10 words: milestone 1) · Add 990 words (the walk is re-traced in the 1,000-word tree, 3 steps: milestone 2).

**For the design lead: one deviation from the brief.** The brief's key state is the learner walking c, a, t twice. QA presses each control once, so the second walk cannot be typed on the QA path. Instead the toggle carries the walk across and re-traces it in the new tree. A learner can still walk again by hand (tap c, a, t after the toggle). I do not count the toggle as a jump to the answer. It changes the dictionary, which is what the question asks about. The step count is then read off the learner's own path, which is drawn in the same place. If you rule that a hand walk is required after the toggle, the alternative is to put the toggle first in DOM order and accept that QA reaches only the 1,000-word walk.

## States
- **Predict:** the 10-word tree, no path, "Words: 10 · Steps: 0", and a muted "1,000 words: ?" in the readout. The keys and the toggle are disabled. The 1,000-word tree is never shown before the commit.
- **Walk c, a, t:** the path thickens one hop per key. Steps 1, 2, 3, then "cat ✓".
- **Add 990 words:** the tree fans out sideways (≤ 400 ms) and the readout says "Words: 1,000". The path re-traces 1, 2, 3, and the pinned readout says "10 words: 3 steps".
- **Back to 10 words:** the tree shrinks back. The walk is kept, and both counts stay pinned.
- **Reveal:** the stage stays on the 1,000-word tree with the path drawn, whatever the learner did last. (If they toggled back, the reveal pins the 1,000-word view, labelled "Your walk, 1,000 words".) The reveal quotes what they reached: "Your walk to cat took 3 steps among 10 words and 3 steps among 1,000." Then the idea: each step picks the next letter, so the cost is the word's length, not how many words share the tree. The extra words made the tree wider, not deeper on your path.

Milestones (`minInteractions=2`): `walked-small` (cat reached in the 10-word tree) and `walked-big` (cat reached or re-traced in the 1,000-word tree).

## Shown, not told
The learner sees the dictionary grow a hundredfold in "Words" while "Steps" stays at 3, and the fan wedges show where the 990 words went: sideways, off the path. The reveal names only what both readouts already showed.

## Answer hygiene
The predict question's options (100×, 10×, the same 3) are in the predict block only. The locked stage shows "1,000 words: ?" rather than a step count. The title does not say "same" (for example "A thousand times the words").

## Colour and access
Nodes `--line` on `--bg-2`, the walked path `--fg` at 3 px, and fan wedges `--muted` at 30% fill with `--muted` count text. End-of-word is a double ring plus "✓", so colour is not the cue. The keys are ≥ 44 px and spell the word left to right. `aria-label` on the tree: "1,000 words. Path c, a, t: 3 steps, cat found".

## Inputs for the builder and the fact-checker
A bundled list of 1,000 words (no network) that contains the 10 starting words. The list's source and licence go in the claims. The fan counts come from the list. Claim: step count = word length for any list that contains the word (derivation, plus the builder's own script).
