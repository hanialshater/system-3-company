# G on readout 3b: reachable-v2 NO-GO (INVALID); website part of M1 closed

owner: vp-personalization (Mateo) · run: vp-g3b-1017 · date: 2026-10-17 · board: W-1751
readout: company/personalization/eval/2026-10-17-criterion-3b-readout.md (criterion 3b frozen 8e96251, run read f4f2fbf; outcome INVALID), read unedited
rules applied: company/personalization/batches/2026-10-17-batch-5.md §4 (G4, G5, G6), §12 (G1(c), G6 stricter), §15-§19. Full reasoning: batch 5 §21.

## Decisions

| # | Decision | Rule |
|---|---|---|
| 1 | **reachable-v2 (2666271f…6714): NO-GO.** Readout 3b is INVALID: copy check V10 gave M3 = 4 at threshold 4. The numbers printed under INVALID are not a result. 3b is not re-run, and any changed copy check is a new criterion, frozen first. | §4 G4, G6 |
| 2 | **K7 not sent.** reachable-v3 (53981ab0…c195) stays frozen and in the HQ lab, labelled. It is withdrawn from the website unscored. It carries all four V10 names, so 3b's frozen check would very likely print INVALID. I will not ask the eval to change its check after the fact. And GO needs G1 to hold in 12 of 12 rows, where every order built toward recall in this world failed: the reference arm, oracle-order and oracle-new in readout 3, and v2 in 240/240 rows. | §4 G4, §12 G1(c), G6 |
| 3 | **R4 not needed now. It is parked.** INVALID comes from a static check of two files, not from the run, and G5 gates a GO only. R4 runs first if any later decision reads 3b's printed numbers. | §4 G5 |
| 4 | **The website part of M1 is closed. M1 = the HQ part only.** Everyone gets the default order. The flag stays off. The founder's L3 answer lapses. AMD-013 stays ratified and unused. | §12 G6(a) |

Confidence: high that no GO path exists for the website under M1. The G1 reading for v3 is a judgement, not a measurement: v3 was never scored. Objection to myself (batch 5 §21.2): I spent the single v3 on reason truth, but G1 was the binding constraint and readout 3 had already shown it.

## Objections

- **Mine, to myself (batch 5 §21.2):** I kept G1(c) knowing the reference arm failed G1 in readout 3, then spent v3 on reason truth rather than G1. **What happened to it:** recorded here and in §21.2. The lesson is the post-M1 rule in §21.5 item 10: a gate the reference design already fails is answered in the design before any candidate is built.
- **personalization-eval (readout 3b §1, self-finding):** the copy check's common-word list missed `post` and `kappa`. **What happened to it:** accepted as the eval wrote it. The result stands as INVALID by the eval's rule and mine. I do not ask for a changed check (§21.2 item 1).
- **head-of-product (L3, §O1):** upheld in practice. The founder's answer has lapsed, and no learner sees L3.
- **Unmeasured:** v3's own G1 was never scored, so decision 2 rests on judgement. Anyone who wants it measured can ask the chief of staff or the founder to overrule in writing. It would still need a new criterion that the eval writes on its own initiative.

## For the founder (for the chief of staff to pass on)

Personalised lesson order will not go on the website in this milestone. Everyone keeps today's order (subjects in turn, published lessons first), and the feed keeps saying it is not personalised.

The reason is our own judge's test, not a learner complaint. The scored candidate, v2, failed a copying check. The check is mechanical and found four variable names the candidate shares with the judge's reference code. The judge says the check cannot tell copying from two people naming the same equations alike, but it was fixed in advance, so the result stands as invalid. Behind that sits a bigger problem. Every order we built toward better recall, including the judge's own reference designs, made learners' feeds lean heavily towards one subject, at 3 to 9 times the limit we set to stop a bubble. For v2 it happened in every simulated learner in every condition tested. Our last allowed candidate, v3, uses the same core arithmetic. Scoring it would cost about 550k tokens and would almost certainly end in no, so we are not running it.

The milestone becomes the HQ part. The Personalization Lab and the evaluation record go into HQ, with the candidates shown read-only and clearly marked not live. Your approval of the L3 reason line lapses, because no learner will see it. AMD-013 stays ratified but is unused, since the flag stays off. Nothing goes live without your deploy approval.

If you want personalisation on the website later, it needs a new design that keeps subjects mixed from the start, judged under a new test frozen before it is built. That is after M1.
