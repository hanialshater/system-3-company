# Learner review r11: the-loser-flips-the-winner

*Simulated learner. This review finds problems; it is not evidence that anyone learned.*

lesson version: v3
Verdict: launch

reviewer: learner-evaluator (borrowed mind), 2026-10-14
boundary: ranking-and-points (same tag as r7/r8). Knows ranking options and adding up points; does not know that removing an option nobody ranks first can change who wins a points-based vote.
artifact: walkthrough against a release build on :3590 (I started it). transcript.md read first, then sheet.png. Screenshots seen: all 5 frames.
path walked: chose B again; Count points; Remove C; A vs B gaps; reveal.

## Findings (written before reading meta.json)

- **Prediction:** "B again" is the common-sense answer for this mind (C was last, nobody's A/B view changed). Real tension.
- **Every number is on the ballots:** Count points writes 2/1/0 beside each name on all five ballots and draws bars (A 6, B 7, C 2). I re-added them: correct. Remove C greys C out as a dashed box and rewrites the points 1/0; bars become A 3, B 2.
- **The gap chips answer my actual question ("how can removing the loser matter?"):** +1 A on ballots 1-3, +1 B "was +2" on ballots 4-5, plus the lead-sum line "B 2 + 2 = 4, A 1 + 1 + 1 = 3". The cause is located on two specific ballots. Shown, not told.
- **Weak spot (not a blocker):** the scoring rule changes when C goes (2/1/0 becomes 1/0). A sceptical reader may think "you changed the rules, of course the result changed". The "was +2" chips and the reveal's "nobody changed their mind about A versus B" largely answer this, but the lesson never says outright that 1/0 is just Borda for two options.
- **Cosmetic:** in the reveal frame the stage's top line ("C removed: 1 point for 1st, 0 for 2nd.") sits against the top edge of the stage panel; readable, not clipped through.
- Final sentence ("Points voting like this can let a last-placed option pick the winner") generalises from one case, appropriately hedged with "can".

## After reading the brief

Objective (C between B and A on two ballots doubled B's lead; removing it flips the vote with no A/B order change) is exactly what the gap chips show. The misconception "dropping a last-placed candidate cannot change the winner" is broken by the learner's own recount. No false claim, dead control or reinforced misconception seen.
