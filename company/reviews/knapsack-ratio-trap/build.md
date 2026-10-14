# Build note: knapsack-ratio-trap

builder: algo-pair-03 · 2026-10-14 · status: draft (not yet QA-passed in this note; see QA record) · kept from evaluators until they report

Built from brief #4 (`company/domains/briefs/cs.algorithms.md`) and the spec `company/design/specs/knapsack-ratio-trap.md`.

## What it does
- Predict ($160 / $220 / $240, answer $220). Stage at predict shows the ratio-first bag: 10 + 20 kg, $160, 20 kg hatched empty, record line "$160 (ratio first)". No $220 or $240 anywhere on the locked stage.
- 4 controls in DOM order 10 kg, 30 kg, 20 kg, "Items can be cut". QA path: 10 out, 30 in ($220, milestone `whole-220`), 20 out, cut on ($240, milestone `cut-seen`). `minInteractions=2`.
- Each mode keeps its own bag. Too-big item: it hovers beside the bag and "Needs 30 kg, 20 kg empty." shows. Record line only changes when a whole-item bag beats it. No best/solve button.
- Reveal quotes only reached states (cut mode seen, learner's record).

## Re-run of the answers (node)
`node company/reviews/knapsack-ratio-trap/verify.mjs`: all 8 subsets (best fits 50 kg: 20 + 30 kg = $220), ratio first whole = $160 with 20 kg empty, ratio first cut = $240, ratios 6/5/4. Own implementation; TheAlgorithms/Python not copied.

## Departures from the spec
- Scale is 4 px per kg (not 5) so bag and the three-slot shelf both fit in one 290 px-tall viewBox; the shelf has a fixed slot per item (dashed "in the bag") so it never reflows.
- Shared `.tap` module class does not exist in the repo; `min-height: 44px` is in the lesson's own CSS.
- Recall question added (10 kg bag, 6 kg $60, two 5 kg $45) with the same trap; checked in node (best $90).

## Open
- Claim c5/c6: CLRS section numbers are 3rd edition (16.2, ex. 16.2-2); 4th edition numbering unchecked (reference recorded as 15.2 with a note). For the fact-checker.
- All claims `unverified`.

## Checks skipped (coordinator order, machine out of memory)
No next build, QA, walkthrough or full tsc ran. `npm run check` passed. An earlier tsc run found two missing-children errors in tic-tac-toe Demo.tsx, which were fixed but not retyped. Status stays draft; chief of staff runs integrated QA and walkthrough after merge.
