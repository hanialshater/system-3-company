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

## Pre-flight v4 (demo-builder, 2026-10-14, fact-check pass 25 fixes, W-239)

- c2 (disputed, off-by-one): the claim text now says "each later number is compared once with the top, which is bigger, and pushed (the first meets an empty stack)." No stage string in Demo.tsx used the old "each new number is compared once" wording, and the reveal already said "each later number", so only meta.json changed. Set to unverified.
- c6 (1), replay: the claim now says "when the 9 is stepped, or replayed with motion on, the stack empties one box at a time ... (with reduced motion a replay jumps to the end)". The code is unchanged: with reduced motion, replay() still jumps (setK(N)) and leaves sawEmpty unset, so the reveal's "box by box" clause is still gated.
- c6 (2), stage pointer: the reveal changed from present tense "look at the 9's row: 8 solid ticks" to past tense "the 9's row showed 8 solid ticks marked "8 pops"". It now reports the recorded 8 … 1 9 run, not whatever list is on stage. Path to check: chip 8 … 1 9, All the rest, then chip 9 8 … 1 (list 0 on stage); the sentence no longer points at the stage. Set to unverified.
- meta.json version 3 -> 4. Not run: build, QA, walkthrough.

## Pre-flight v5 (demo-builder, 2026-10-14, wave G, r7 adult-beginner: pops too fast to see)

Fixes: Next number on a number that pops always steps (arrival, then one pop per press, then the push), with motion on or off, so the 9's eight pops are eight visible states. A replay holds each pop frame 260 ms (was 22 ms for all frames). Hollow "stop" ticks now have a thicker stroke and a page-colour fill, and a "pop / stop" legend sits beside the Stack header; the reveal names both. Not changed: the question still asks about 9 8 ... 1 (r7 finding 1, a judgment call; changing the predicted case would change the brief's answer and misconception, so it goes to the learning designer).
1. Title and hook: "Waiting for a bigger number" / "Is "next bigger" a scan from every position?" Unchanged; no count, no verdict on the stack.
2. Options: "36", "18", "8". All bare numbers.
3. Locked stage: 9 tiles, "?" answer slots, "Scan: ?" / "Stack: ?", the pop/stop legend (two sample ticks, no number), readouts "scan ? · stack ?", rule line. Nothing matches 8.
4. Reveal values: 36 and 8 on 9 8 ... 1: (b) milestone descending-done (readout filled). 8 pops, 15, 36 on 8 ... 1 9: (b) milestone pops-seen (readout "scan 36 · stack 15"; the 9's row "8 pops" when list 1 is on stage). "box by box": (b) sawEmpty, set only when the 9's pops were stepped or replayed with motion.
5. QA path: Next number (9 placed), All the rest (list 0, 9 frames at 40 ms, descending-done), chip "9 8 … 1" disabled, chip "8 … 1 9" (replay: 8 x 40 ms, 9 pop frames x 260 ms, push; about 2.7 s, pops-seen at the end, inside the reveal button's 5 s wait). At the reveal the stage shows list 1 with the 9's "8 pops" row and both readouts.
6. Reset: no Reset control; switching lists keeps the readouts and the reveal quotes them in the past tense. QA-path reveal: "On 9 8 … 1, scanning took 36 comparisons and the stack 8: each later number met one bigger top (a hollow "stop" tick) and was pushed. On 8 … 1 9, the 9's row showed 8 solid "pop" ticks marked "8 pops", one for each waiting number, while the stack emptied box by box down to the 9. That run cost 15 in all, still against 36. / A number waits on the stack until a bigger one arrives, ..."
- meta.json 4 -> 5; c6 text changed, unverified. Not run: build, QA, walkthrough, tsc.

## Pre-flight v6 (demo-builder, 2026-10-14, wave H, r8 adult-beginner: reveal never unlocked on the walkthrough path; W-309)

Fixes: milestone pops-seen now fires when the 9 arrives in a replay of 8 … 1 9 (frame [9, 0], about 270 ms after the chip; plain replay frames 40 -> 30 ms), not at the end of the ~2.6 s replay, so the reveal unlocks within one press's wait on the DOM-order path. The stepping path (Next number to the push) still fires it at the end. The readout "scan 36 · stack 15" still fills when the replay ends. Reveal trimmed 92 -> 88 words (sawEmpty "box by box" clause and the "9 pushes and 9 pops" bound cut). Stage compacted for the phone: stack rows 18 -> 15 units, panel up 12 units, rule line one line ("Each new number pops smaller tops, then waits."), stage gap 6 -> 4 px. Picture labels 9-11 -> 12 px (svg draws at about 0.89, so >= 10.7 px rendered).
1. Title and hook: unchanged.
2. Options: "36", "18", "8". Bare numbers.
3. Locked stage: 9 tiles, "?" slots, "Scan: ?" / "Stack: ?", pop/stop legend, readouts "scan ? · stack ?", rule line (a mechanism, no count). Nothing matches 8.
4. Reveal values: 36 and 8 on 9 8 … 1: (b) descending-done (readout filled). 8 pops, 15, 36 on 8 … 1 9: (b) pops-seen, recorded as popsSeen (constants of that run, shown on the 9's row and, after the replay, the readout).
5. QA path: Next number, All the rest (descending-done after ~300 ms), chip "9 8 … 1" disabled, chip "8 … 1 9" (replay; pops-seen at ~270 ms). Known edge: if the reveal is opened at once, the 9's row is mid-pop (reveal-fit shot shows "4 pops") for up to ~2.3 s while the reveal already says "popped all 8"; the row reaches "8 pops" and the readout "stack 15" before a learner can read that far. Evaluator: judge whether this breaks "quotes what you saw".
6. Reset: no Reset control; unchanged.
7. Phone fit: reveal-fit at 390x844 (dev server :3530): crop 0 px (was: reveal never unlocked, so unmeasured; 78 px after the milestone fix alone), hiddenBelow 0, namedHidden 0, 88 words, stage 390 px (picture 209), window 638. The reveal points at the hollow "stop" / solid "pop" ticks and the "8 pops" label: on screen.
- meta.json 5 -> 6; c5 and c6 text changed, unverified. Not run: build, QA, walkthrough.
- Addendum (same v6, wave H batch 1, before any review of v6): closes the Pre-flight v6 item 5 "known edge". Opening the reveal while a replay is running now jumps the replay to its end (an OnReveal effect on phase "reveal"), so the 9's row reads "8 pops" and both readouts are filled when the reveal opens, instead of mid-pop. Readouts reworded to fit one row at the end state: label "9 8 … 1: scan · stack", value "36 · 8" (and "8 … 1 9: scan · stack", "36 · 15"; locked "? · ?"); the old "scan 36 · stack 15" values wrapped onto two rows (crop 36 px). c6 text extended with the jump-to-end, unverified.
- Question 7 (re-measured after the addendum): reveal-fit at 390x844 (dev :3530): crop 0 px (36 px with the old readout wording once the end state shows), hiddenBelow 0, namedHidden 0, 88 words, stage 390 px (picture 209), window 638. On screen at the reveal: stage top (rule line), the hollow "stop" ticks, the 9's "8 pops" row, readouts 36 · 8 and 36 · 15.
