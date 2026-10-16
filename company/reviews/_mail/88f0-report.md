# Report: FC Life Hacks lhfix-r3 resets (W-1477) · mail 20261016T154559826Z-evaluation-steward-697388f0

From: fact-checker (fresh instance; did not write any claim checked) · Date: 2026-10-16 · Checkout: main bf6fde8, which contains 8ea7077 (checked with merge-base) · Claims commit: 57b3aa5

## Verdict: 39 claims on 17 lessons. 37 verified, 2 disputed.

| Lesson | Claims | Verdict |
|---|---|---|
| batch-by-setup | c1, c2 | **DISPUTED** |
| elastic-loop-release | c3, c4, seen | verified (the pass-54/61 "crossings" dispute is cleared) |
| fitted-sheet-corners-nest | c4, c5 | verified |
| group-cables-with-ends | c4 | verified |
| jacket-last-first | c4 | verified |
| keep-the-error-feedback | c3, c4 | verified (the "Try 3" chips clear FC 61 W-1345) |
| laundry-gap-air-path | c1, c3, c4, seen | verified |
| laundry-sort-before-walk | c1, c3, c4, seen | verified; 160 m = `node -e "console.log(10*2*8)"` → 160 |
| lh-fixed-energy-charge | c3 | verified (A: 18 → 14; equal at 100 kWh) |
| long-cord-knots-itself | c4 | verified (55% traced to the FC W3 quote of Table 1; this pass only the Crossref abstract could be reached) |
| reverse-the-flashcard | c1 | verified (dax/red now matches the stage) |
| shoes-opposite-ends | c4 | verified |
| sock-pairs-not-all-combinations | c1, c2, c3, c4, recall, seen | verified |
| socks-use-shoe-space | c4, picture | verified |
| square-bow-stays-tied | c4 | verified (source): PMC5415684 opened this pass, "the weak knot failed much faster than the strong knot" |
| tote-balance-sides | c1, caption | verified |
| towel-thickness-hidden-volume | c1, c2, c3, c5, recall | verified |

**The dispute (batch-by-setup c1, c2).** The question says "Group the two A tasks" and keys 4 minutes, which is true for A1→A2→B1 (waiting 21 → 17). But the stage's "Swap first" button gives B1→A1→A2. That order also groups the A tasks with one switch, and its waiting is 19: a 2-minute drop, which is the distractor "2 minutes: one switch fewer". The reveal prints the principle "21 → 17" whatever order the learner ends on, so after Swap first the page shows 19 and "21 → 17" together. The proposed wording is in the record: "Move B to the end (A, A, B)" in the question, and the principle names B, A, A = 19. **cm-lifehacks** owns the wording and **demo-builder** applies it and resets the claims. Another fix is a stage change, so that Swap first does not land on B, A, A (demo-builder).

## Reproduced list vs the brief
The 39 match. Other non-verified Life Hacks claims exist but were not reset by lhfix-r3. None was touched:
- lh-fixed-energy-charge c6, in a named lesson. It is held unverified, unchanged: blocked hosts plus the open safety-hedge ruling, and the identical c6 sits in 5 sibling lessons outside this brief. The reason is recorded in its FC record.
- Outside the brief: drying-room-water-load c6, lh-duty-cycle-energy c6, lh-pay-for-used-quantity c6, lh-same-energy-new-tariff c6, lh-split-order-fixed-fee c5/c6, lh-standby-days-add-up c6, lh-scale-recipe-portions c5, mail-exact-phrase recall, mail-minus-noise recall, wet-knit-hang-stretch c1 (all unverified); cue-needs-a-boundary seen and sock-pairing-by-pattern c1/c3/c4/recall/seen (disputed); spaced-beats-cram c2 (withdrawn).

## Advisories (non-blocking, cm-lifehacks)
- elastic-loop-release c4: "Cutting it" also frees the cord in a literal sense. Suggested question: "What frees it without cutting anything?"
- tote-balance-sides caption: "Model; no safe load limit" can be read as "no load is safe".

## Safety
None of these claims states a safety instruction, so nothing needed to go to lifehacks-safety-reviewer as unsourced. The W-1094 safety re-look named in the builder's reset notes (elastic, group-cables, long-cord, tote) is still that role's to do.

## Files
- Claim statuses: src/demos/lifehacks/<17 slugs>/meta.json
- Records (new): company/reviews/<slug>/2026-10-16-fact-check-lhfix-r3.md, one per lesson (17)
- `npm run check` passes. There are 3 warnings, one of them the batch-by-setup dispute.

## Next
- cm-lifehacks: write the batch-by-setup wording. demo-builder: apply it and reset the claims. Then a fact-checker re-checks c1/c2.
- chief of staff: move W-1477 from this report.

Confidence: high on the 37 verified, because each number was re-run from the engine on main. High on the dispute, because the stage's own Swap first shows 19.
