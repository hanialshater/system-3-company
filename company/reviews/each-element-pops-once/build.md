# Build note: each-element-pops-once (demo-builder, algo2-sa, 2026-10-14)

- Design intent (spec `company/design/specs/each-element-pops-once.md`): the list row on top (9 cells of 36 px) with a caret under the number just fed and an answer slot under each cell ("?", then "9✓" in `--good` when popped, "none" when the pass ends). Below, Scan (left): one row of `--muted` ticks per fed position, one tick per comparison, so 9 8 ... 1 draws a 36-tick triangle. Stack (right): the stack column (bottom = oldest) and one row of `--domain` ticks per arriving number. Counters "Scan: n" and "Stack: n" ("?" before the first press). Two Readouts keep each list's totals.
- Controls in DOM order: Next number, All the rest (replay at 40 ms each), chips "9 8 … 1" (active, disabled at start) and "8 … 1 9". Switching a chip after the current list finished replays the new list to its end (a-star-heads-for-goal pattern); otherwise it loads the new list from the start.
- Key state: milestones `descending-done`, `pops-seen`, minInteractions 2. QA path: Next number, All the rest (36 vs 8), skip the disabled chip, 8 … 1 9 (replay: 36 vs 15, eight pops on the 9).
- Numbers: run() computes both counts from the same comparison convention (stack: one test of the new value against the top; scan: stops at the first bigger). Re-ran in node: 36/8 (0 pops); added list 36/15 (8 pops, answers 9 x8, none); the brief's 5 3 8 1 9 2 7 4 gives 11/10 (not on the stage). Brief answer C held.
- The added list is new claim c3 (from the spec), needs a fact-check.
- Deviations from spec: the 150 ms pop slide is not built; popped values vanish from the stack and their answer slot fills with a ✓ on the same press.
- Not run (by instruction): build, typecheck, QA, walkthrough. Screenshots not yet looked at.

## Revision v2 (wave E r6, 2026-10-14)

r6 (adult beginner, revise): the 9 popping eight waiting numbers never happened on screen, "pop" was not on the stage, and the 9's eight bars were unlabelled. Fixes:
- The replay now shows each pop as its own frame: when the 9 arrives on 8 ... 1 9 the stack empties one box at a time (18 frames at 22 ms, about 400 ms, inside the QA wait).
- Stack ticks that pop are solid, the stopping comparison is hollow, and any row with pops is labelled "N pops" ("8 pops" on the 9's row). The trace stays after the run.
- Stage rule line now states the stack rule: "Stack rule: a new number pops each smaller number waiting on top, then waits too." The question stem states it as well.
- Options are "36", "18", "8" (was "About 18", the only imprecise one). Title changed from "Each number pops once" to "Waiting for a bigger number" so it does not point at the mechanism the reveal explains.
- Reveal points at the 9's row and its "8 pops" label. New claim c6 (unverified). Not run: build, QA, walkthrough, tsc.

## Pre-flight v2

1. Title and hook: "Waiting for a bigger number" / "Is "next bigger" a scan from every position?" Neither names a count or says the stack is cheap.
2. Options: "36", "18", "8". All bare numbers.
3. Locked stage: 9 tiles (9 8 ... 1), answer slots "?", "Scan: ?" / "Stack: ?", readouts "scan ? · stack ?", rule line. Nothing shows 8 or a stack cost.
4. Reveal values: 36 and 8 on 9 8 ... 1: (b) milestone descending-done (readout "scan 36 · stack 8" filled then); 8 pops, 15 and 36 on 8 ... 1 9: (b) milestone pops-seen (readout "scan 36 · stack 15", the 9's row "8 pops"). The 9's-row sentence only prints when that readout is filled.
5. QA path: Next number (9 placed), All the rest (replay, descending-done), chip "9 8 … 1" disabled, chip "8 … 1 9" (replay with pops, ~400 ms, pops-seen). Both milestones reached, the question's own case first. At the reveal the stage still shows the 8 … 1 9 run with the 9's "8 pops" row and both readouts.
6. Reset: no Reset control; switching lists clears the stage but not the readouts, and the reveal quotes the readout values. Reveal on the QA path: "On 9 8 … 1, scanning took 36 comparisons and the stack 8: each new number met one bigger top (a hollow tick) and was pushed. On 8 … 1 9, look at the 9's row: 8 solid ticks marked "8 pops", one for each waiting number, while the stack emptied box by box down to the 9. That run cost 15 in all, still against 36. / A number waits on the stack until a bigger one arrives, and then it is popped and answered, exactly once. Every stack comparison either pops a number or ends that number's turn, so 9 numbers cost at most 9 pushes and 9 pops: the work grows like n, not n²."

## Pre-flight v3 (demo-builder, 2026-10-14, fact-check pass 24 fixes)

W-234, c6 (disputed). The reveal said "the stack emptied box by box" even when the learner had pressed Next number 9 times, which made the stack jump in one frame, or had reduced motion on.
- Next number on a number that pops now plays that number's frames one box at a time, using the same `play()` frames as the replay. With reduced motion there is no animation: each press shows one more pop, and the press after the last pop pushes the 9 and finishes the list. `finished` is now `k >= N && pk === null`.
- The clause "while the stack emptied box by box down to the 9" shows only when `sawEmpty` is set. `sawEmpty` is set when the 9's pops on 8 ... 1 9 were animated (by Next number or a replay) or stepped press by press. A reduced-motion jump (All the rest, or a chip after a finished list) does not set it.
- "each new number met one bigger top" in the reveal and "each number's single comparison" in c6 now both say "each later number". c6 is set to unverified, with the new text "when the 9 is stepped or replayed the stack empties one box at a time".
- Every control pressed once in DOM order: Next number (k=1), All the rest (animates "9 8 … 1" to the end, descending-done), the "9 8 … 1" chip (disabled), then the "8 … 1 9" chip (animated replay with pops, so sawEmpty is set and pops-seen is reached). Under reduced motion the last press jumps and the clause is omitted.
- Note for the fact-checker: the reveal sentence that c2 addresses changed from "each new" to "each later". c2's own text ("each new number is compared once with the top") is unchanged and still verified, though by the same logic it should say "each later". Not run: build, QA, walkthrough.
