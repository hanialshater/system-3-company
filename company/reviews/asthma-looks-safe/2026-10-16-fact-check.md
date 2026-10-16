# Fact-check: asthma-looks-safe v3 (2026-10-16, FC pass 65)

order: SO-10-2, trigger (b)/(d) (c1, c2, c3 reset and c7 new in the v3 build b0d5cff, r5-ai B1, W-1329/W-1330) · tag [project:catalog]
checker: fact-checker, fresh instance; wrote none of these claims (c1-c3 and c7 text is the builder's / cm-ai's).
server: http://localhost:3591, built from 987687acc1cc934b5eaa4f5510d2111712263532 (BUILT_FROM read at start and end; R3a check.sh exit 0; newest lesson commit b0d5cff is an ancestor).
method: Demo.tsx v3 read first; fresh walkthrough `npm run walkthrough -- asthma-looks-safe --url http://localhost:3591` (recorded 2026-10-16T14:43:05Z; the on-disk transcript from 13:03 was v2 and was not used), cut at the trust-sheet appendix; reveal screenshot 04-reveal.png viewed; numbers re-derived in node. Toy-only claims: no external source needed or used.

| Claim | Verdict | Basis |
|---|---|---|
| c1 | verified | ASTHMA_DIE_ICU = [7, 32] → 2/50 = 4%; OTHERS_DIE (o mod 25 ∈ {3,16}) → 12/150 = 8%. Predict card: "…and 4% of them died." Grid row after commit: "Old rule 2/50 12/150". Ward-risk line "Ward risk: asthma 20%, others 8%. Intensive care: asthma 4%." is rendered under `!locked` alone (not behind `view`); on :3591 it is on screen after "Model's view", after "Model decides" and in the reveal frame. The post-commit, pre-tap frame was not captured by the walkthrough and rests on the code. |
| c2 | verified | 2/50 = 4% < 12/150 = 8%, so the group-rate model ranks asthma lowest. Beside the control once tapped (empty before): "Safest: asthma 4%, others 8%". Reveal: "ranked asthma safest". |
| c3 | verified | ASTHMA_DIE_WARD: 10 distinct entries → 10/50 = 20%; ICU deaths 7 and 32 inside it; others unchanged at 12. Stage after "Model decides": box "Ward: all", row "Model decides 10/50 12/150". Reveal: "10 of 50 died." |
| c7 | verified | Reveal on :3591, exact: "On the ward their toy risk is 20%, against 8% for others: the care was hiding a higher risk." pct(0.2) = 20%, pct(0.08) = 8%. Parenthetical matches RISK = {0.2, 0.04, 0.08} and the realised counts (old 2/50 = ICU rate; model 10/50 = ward rate). |

W-1330 (c1 "stated on the stage" held only in a brief state): **holds, can close.** The ward-risk line is now in every unlocked state (code + server frames above). Board close is the chief of staff's.

Not re-checked (unchanged by v3 in substance, verified earlier): c4, c5, c6. Spot check on :3591: "Toy pneumonia patients" tag present; hook text unchanged; the c5 sentence is in the reveal as before.

No unrecorded learner claim found. The new predict options ("Stays about 4%" / "Rises above 4%" / "Falls below 4%") are a question, not a claim; the answer (Rises above 4%) agrees with c3.

**Result:** 4 verified, 0 disputed, 0 held. All 7 claims of the lesson are now verified.
