*Simulated learner. This review finds problems; it is not evidence that anyone learned.*

# Learner review (re-review r6): flaw-to-lawn
lesson version: v3
boundary: an adult who has filled a grid from its neighbours before (blocked-cell-routes), but does not know how a spell checker measures word difference, or that the whole-word distance is built from distances between beginnings.
Screenshots seen: yes (artifacts/walkthroughs/flaw-to-lawn/sheet.png, all 8 frames)
Verdict: launch

## 1. From the artifact
- Predict: the trap still works. The hook and stem push "4", and the locked grid shows only the 0–4 edges and a "?" corner. Nothing leaks. All controls are visibly locked, including Trace back.
- Explore: a legend under the grid, "↓ delete · → insert · ↘ replace (free if letters match)", gives each direction its edit meaning. Each filled cell gets a caption naming the two beginnings it compares and the neighbour it came from, with a dot-and-line from that neighbour. Examples: "F → L = 1: replace F with L (+1), after · → · (0)" and "FLA → LAWN = 3: insert N (+1), after FLA → LAW (2)". That is "built from beginnings", shown cell by cell.
- Trace back: the path 0 → 1 (down) → 1 → 1 → 1 (diagonal) → 2 (right) is highlighted with "Edits: delete F, keep L A W, insert N = 2". With the legend, the shape of the path now reads as the edits: down is a delete, diagonals over matches are free, right is an insert.
- Reveal: it quotes the corner caption I saw and the traced edits, and it answers "why not 4" ("never lets letters slide; one delete shifts LAW into line").
- Minor: "·" for the empty word ("after · → · (0)") is never explained. A first-timer may read it as a typo. "(empty)" or "nothing" would be clearer.
- Minor: on the recorded path, Row buttons fill whole rows, so only the last cell of each row gets a caption. A match cell (L/L, "+0, free") is never captioned. The legend says it, but the diagonal of free 1s isn't marked differently from paid cells.
- Minor: on the reveal screen the grid scrolls so the L A W N header row is cut off.
- Minor: trust link reads 6/9 claims checked (fact-checker lane, not a learner issue).
- No FATAL.

## 2. Earlier findings (v2 review, r5)
1. Directions had no edit meaning on stage (top finding): **fixed** (three-arrow legend; captions name the edit).
2. "+0 when letters match" never captioned: **partly fixed** (legend says "free if letters match"; no match cell is captioned on the default path). Minor now.
3. No cell labelled with the beginnings it compares: **fixed** ("FL → LAWN = 4 … after F → LAW (3)").
4. Learner never picks a neighbour; rows auto-fill: **not fixed** (Next cell exists but Row buttons skip the decisions). Minor.
5. Trace back looked enabled before the lock: **fixed**.

## 3. Against the brief (read after section 1)
doesNotKnow "distance between whole words is built from distances between their beginnings" is on stage in the per-cell captions and neighbour lines, and the reveal points at the corner caption. Show-the-why is met. The misconception (count mismatched positions) is answered by the traced slide.
