# Spec: flaw-to-lawn

owner: interaction-designer (Rafael) · 2026-10-14 · status: draft, for design review · brief: `company/domains/briefs/cs.algorithms.md` #5 · wireframe: `flaw-to-lawn.svg`

**Format: Storyboard / scrub, stepped (no slider).** The payoff is a process: each answer is built from answers already on the stage. The learner should stop at named frames (each finished row, then the corner), which is what a storyboard is for. A slider is the wrong control here. Two arrow presses on the QA path would fill two cells, and a scrub lets the learner skip the cells that carry the idea. The key frames are the four rows, stepped by buttons. A 16-pip progress strip under the grid is the timeline.

**Brief problem (interaction, not the answer):** "tap each grid cell in order" makes 16 cell controls plus a trace control. QA presses only the first 16 stage controls, so the trace (control 17) is never pressed and the reveal could not unlock on the QA path. The 16 cell taps also take most of the 60 seconds. This spec replaces them with row steps. The idea and the key state are unchanged.

## Answer check (designer node run, 2026-10-14)
Levenshtein grid, rows = prefixes of FLAW, columns = prefixes of LAWN:
```
      ·  L  A  W  N
   ·  0  1  2  3  4
   F  1  1  2  3  4
   L  2  1  2  3  4
   A  3  2  1  2  3
   W  4  3  2  1  2
```
Distance 2. Positional mismatches 4. KITTEN to SITTING is 3 (control). 25 cells, 16 to fill. The trace-back path is unique: (W,N) ← insert N; (W,W), (A,A), (L,L) free diagonals; (F,·) delete F. **The brief is right.**

## Stage at 390×844 (~500 px)
1. Rule line (muted, 2 lines, 21 words): "Each cell: fewest edits from the first letters of FLAW (rows) to the first letters of LAWN (columns). Same letter: free diagonal."
2. Header row: readout "Cell 0 of 16" (left), **Next cell** button (right).
3. **Grid**: 5 × 5 cells of 48 px with letter headers. The top row and left column are prefilled (0–4, muted: "build from nothing" / "delete everything"). Interior cells are blank. The corner (W,N) shows a ringed "?". To the right of each interior row is its row button (62 × 44).
4. A 16-pip progress strip (the storyboard timeline).
5. **Trace back from the corner**, full width.
6. Edit line: "Edits: ?" until traced.

## Controls, in DOM order (6)
| # | Kind | Label | Behaviour |
|---|---|---|---|
| 1 | Control | "Next cell" | fills the next blank cell in reading order. Draws three arrows into it from up (+1 delete), left (+1 insert) and diagonal (+1 replace, or **+0** if the letters match). The cheapest arrow (or arrows, if tied) is lit `--good` and labelled with its sum. Disabled at 16/16 |
| 2–5 | Control | "Row F" · "Row L" · "Row A" · "Row W" | fills the rest of that row cell by cell (≤ 4 × 90 ms, inside the 450 ms QA wait; instant under reduced motion). The last cell keeps its arrows lit. Each row button is enabled only when the row above is complete, and becomes "✓ F" (disabled) when its row is full |
| 6 | Control | "Trace back from the corner" | enabled at 16/16. Walks from the corner to (·,·) along the lit arrows and fills the path cells. Sets the edit line to "delete F · keep L A W · insert N = 2". It then becomes "✓ Traced" (disabled) |

No jump button: the corner is reached only by filling row W, and each row fill shows every cell's comparison. No reset, because the reveal needs the full grid. All six controls exist at first render, disabled while `locked`.

QA path (each pressed once, in DOM order): Next cell (F,L = 1) · Row F (2 3 4) · Row L (1 2 3 4) · Row A (2 1 2 3) · Row W (3 2 1 2; the corner reads **2**: milestone 1) · Trace (milestone 2). Every press changes the stage.

## States
- **Predict:** prefilled edges, blank interior, corner "?", "Cell 0 of 16", "Edits: ?". The match cells are *not* marked yet: their diagonal would sketch the answer path. Hook: "Every letter differs. How far apart?" / "FLAW and LAWN clash at all 4 spots." Neither names 2.
- **Explore, each fill:** the new number appears with its three arrows. On a match (L,L / A,A / W,W) the cell gets a solid outline and the diagonal arrow reads "+0". The learner sees a 1 appear where a mismatch count would say 2 or 3.
- **After Row W:** the corner fills with 2 and its winning arrow comes from the left (1 + 1).
- **Reveal:** the grid stays full, the path cells stay filled (`--domain` fill with `--fg` numbers, plus a 2 px `--fg` outline so the path does not depend on colour), and the edit line reads "delete F · keep L A W · insert N = 2". The reveal quotes it:
  > Your corner read 2: delete F, keep L, A, W, insert N. Counting spot by spot gave 4, because it never lets letters slide. One delete shifts LAW into line. Each of the 16 cells you filled took the cheapest of three neighbours you had already filled, so a small grid replaces trying every sequence of edits. Spell checkers and DNA alignment fill this grid. (≈ 65 words)

Milestones (`minInteractions=2`): `corner` (16/16 filled, corner = 2), `traced` (trace pressed).

## Shown, not told
The learner fills the cell that makes the idea: (L,L) reads 1 straight after (F,L) reads 1, because the diagonal is free. The "slide" happens under their hands before any word names it. The edit list appears only when *they* trace it. The reveal names the path they drew and the 16 cells they filled.

## Colour and access
Lit arrow `--good` + bold label; unlit arrows `--muted`. Match cells get a solid outline, not only a tint. Numbers are integers. The grid has `aria-label` "Row A filled: 2, 1, 2, 3; corner not yet filled". Row buttons are 62 × 44 and the others 44 px high, using `.tap` until the kit fix. No illustration.

## Claims this spec adds
The grid values above and the unique path (simulation: the builder re-runs and records them). "Spell checkers and DNA alignment fill this grid" is brief claim 2's territory and needs its own source line (Wagner and Fischer 1974 covers the recurrence, not DNA). This goes to the fact-checker.
