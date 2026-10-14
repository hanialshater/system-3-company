# Spec: kmp-never-steps-back

owner: interaction-designer (Rafael) · 2026-10-14 · status: draft, for design review · brief: `company/domains/briefs/cs.algorithms.md` #36 · wireframe: `kmp-never-steps-back.svg`

**Format: Side-by-side comparison** (as briefed). Two methods on the same text, sharing one control, so the work is like for like. On a 390 px phone a 9-letter strip needs the full width, so the "sides" are **stacked panels**: "Restart one on" above "Reuse the match". The shared control steps both by the **same number of comparisons**. Equal work, and the learner sees whose text arrow is further right.

## Brief check (designer's node run, 2026-10-14)
Counting rule: every letter comparison counts, including the re-compare after a fallback. The restart method stops an alignment at its first mismatch.
- Restart one on: alignments 0–4 cost 4 each, and alignment 5 matches in 4: **24**. Correct.
- KMP: 3 matches, then at text letters 4–8 (1-based) a miss against B plus a re-compare against A, 2 each, then the final B: **14**. Correct. Fallback table AAAB = **0 1 2 0**. Correct.
- Precision note for the claim: KMP never moves its text arrow left, but it does read letters 4–8 twice (bounded, which is why it is linear). The reveal must not say "reads each letter once".

## Brief conflict (resolved here, flagged to the brief owner)
The brief unlocks the reveal "at the match". The match is comparison 14, which is the answer. A one-press QA path to it needs a jump that lands on the answer, and that is banned this week. Resolution: unlock at the **first miss** (both panels at comparison 5: the restart arrow has moved back, the KMP arrow has not). That is the brief's key state ("seen the text pointer in KMP only move right"). The match is 3 more presses away for a learner who keeps going, and the reveal quotes it only if reached. cm-cs-algorithms should confirm this or change the key state.

## Stage at 390×844 (~330 px at predict, ~460 px in explore)
1. Model line (muted): "Find AAAB. Both count every letter comparison." (7 words)
2. **Panel "Restart one on"** (~350 × 130): text strip AAAAAAAAB (9 × 32 px tiles), the pattern strip under it at its current alignment, a ▲ text arrow under the letter being read, ✓/✗ in each tile's corner for the latest comparison. Line: "Comparisons 5 · arrow moved back 1".
3. **Panel "Reuse the match"** (~350 × 150): same, plus the **fallback row** under the pattern tiles (0 1 2 0), with the entry used highlighted at a miss. Line: "Comparisons 5 · arrow moved back 0". The title gets "· found at 14" when it matches.
4. On a miss, the restart panel draws a short back arrow along the text ("← back 2"). The KMP panel slides the pattern right by (matched − fallback) while the ▲ stays put.

## Controls, in DOM order (2)
| # | Kind | Label | Behaviour |
|---|---|---|---|
| 1 | Control | "Compare" | one comparison in each unfinished panel |
| 2 | Control | "Compare ×4" | four comparisons in each unfinished panel, replayed ≤ 100 ms each (instant under reduced motion). A panel that finds the match stops and shows "found at N" |

A finished panel stays as it is. Both controls are disabled when both panels have finished, so no enabled control is a no-op. From the start, the KMP match takes at least 4 presses (Compare ×4 four times, stopping at 14). No single press lands on 14.

QA path: Compare (both ✓ on letter 1) · Compare ×4 (both reach comparison 5: the restart panel missed at letter 4 and went back to letter 2, "moved back 1". KMP missed at letter 4, used fallback 2, slid the pattern one place, and re-compared letter 4 ✓, "moved back 0": milestone `first-miss`). Both controls render at first paint, disabled while `locked`.

## States
- **Predict:** both panels at alignment 0, counters 0, the fallback row visible. The answer (14) is nowhere: no "found" label, and no axis or total.
- **After 5 comparisons:** equal work, but the KMP arrow is on letter 4 and the restart arrow is back on letter 2.
- **After 9:** restart at alignment 2, arrow on letter 3 after moving back twice. KMP on letter 6.
- **After 14:** KMP "found at 14", arrow never moved back. Restart at alignment 3, moved back 3 times. The learner can keep pressing to see restart finish at 24.
- **Reveal:** stage as left. Quotes the learner's furthest state: "After 5 comparisons each, your reuse arrow was on letter 4 and had never moved left; the restart arrow had gone back to letter 2." If reached: "Reuse found AAAB at comparison 14; restart needed 24." Then the idea: the part that matched is known text, so the pattern slides to its longest self-overlap (the fallback number), and each text letter is read a bounded number of times: O(n + m) (claim).

Milestones (`minInteractions=1`): `first-miss` (both panels past their first mismatch, comparison ≥ 5).

## Shown, not told
The payoff is the two arrows under equal work: one zig-zags back, one only moves right. The fallback row is used in front of the learner at each miss before it is named.

## Colour and access
Tiles `--bg-2`/`--fg`. ✓/✗ glyphs in text-safe `--good`/`--bad`. ▲ arrow `--fg`; the back arrow is dashed `--bad` plus the "← back 2" text. Fallback entry in use is boxed, not only coloured. Controls `.tap`, ~165 px wide each. Panel `aria-label`: "Reuse the match: 5 comparisons, on letter 4, never moved back".
