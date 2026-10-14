# Build note: ties-keep-their-order

builder: algo-pair-00 · 2026-10-14 · status: draft (kept from evaluators until they report)

Built from the brief (cs.algorithms.md #1) and the spec (company/design/specs/ties-keep-their-order.md).

## Decisions
- Card title is the spec's "Who leads the Bs?"; the slug stays. The slug states the stable half of the answer.
- Two lanes with trails, three controls in DOM order: Slide next card, Swap smallest to front, Both: rest of the steps. All exist at first render, disabled while locked.
- "Both: rest" advances both lanes one row per tick (110 ms), so at most 3 ticks (330 ms); instant under reduced motion. It adds the same rows as the step buttons and the result lines appear only after each lane's last row. While it runs, all controls are disabled.
- Milestones `slide-done`, `swap-done`; `minInteractions=2`. The reveal text quotes only rows both lanes reached.
- Rows are computed by code (insertion with a strict "higher grade" test; selection with strict less-than, so the first smallest is chosen). No randomness.
- Ana solid, Cal hatched, position badge on every card (colour is not the only cue). The passing tag "Ana passed Cal" is drawn under swap row 2 and outlines both cards in `--bad`.

## Node check (re-run)
Insertion rows: Ben Ana Cal Dee / Ben Ana Cal Dee / Ben Dee Ana Cal. Selection rows: Ben Ana Cal Dee / Ben Dee Cal Ana / Ben Dee Cal Ana. Matches the spec.

## QA path
Slide (lane left row 1) -> Swap (lane right row 1) -> Both: rest (left rows 2-3, right rows 2-3). Both milestones are reached.

## Open items
- All claims are `unverified` (fact-checker). c3 cites CLRS 8.2 and 2.1 from memory of the definitions; the verifier should open the book.
- Recall question is mine (the brief has none); the learning designer should review.
- Reveal is about 80 words.

## Checks skipped
Build, QA, walkthrough and full typecheck were not run on the final code (machine out of memory; coordinator instruction). An earlier tsc run passed. npm run check passes. The chief of staff runs the integrated pass.
