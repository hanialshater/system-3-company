# Learner review (final): Mild preferences, sharp divides (boundary: no-schelling)

*Simulated learner. This review finds problems; it is not evidence that anyone learned.*

Seen: walkthrough regenerated at c9e4df0d (phone), sheet.png (all 9 frames), 09-reveal; Demo.tsx Reveal read for branches the script does not take (no 30% run finished, other thresholds not tapped). Boundary: knows percentages and "neighbours"; has never seen an agent-based model, Schelling, or a threshold rule.

## Findings (artifact first)

**Idea the learner lacks:** a rule that tolerates being a minority (move only below 30% like) is not a rule that tolerates mixing, because each move changes other streets.

1. **Answer visible before predicting?** Title and hook ("Nobody wants a majority. What does the city do?") signal a surprise, but the locked stage shows only a random 50% start. Option 3 (75%) is the only option that is not 30 or 50, so a test-taker finds it; mild. The question itself states the tolerance (70% other group), so the surprise is carried by the number, not hidden.
2. **Where understanding first broke: the hollow/ring/tint legend.** Rule line now carries glyph keys (hollow = would move, ring = unsettled by a move, filled tint = all neighbours like). At the locked frame the glyphs are tiny; I could read them only after unlocking. By frame 03 (54 rings, 7% tint) it makes sense. Earlier "Happy 83%" confusion is gone; the readout is now the count wanting to move (247).
3. **Told vs shown, the cause.** The objective asks the learner to explain that moves unsettle content households. On stage: red rings for households unsettled by a move, with a per-tick count (frame 03: 54). That stands for the cause and the reveal points at it ("The red rings show the rest"). Met. But the reveal also says "143 households content at the start were unsettled and moved too". 143 is a cumulative count across the whole run; the stage only ever showed per-tick counts (54 at tick 1, 0 later). A learner cannot find 143 anywhere (W-150 flavour: a number from a state never displayed as a number).
4. **"Sharp divides" at 30% is a stretch in the picture.** My own 30% run (frame 04, 77%, 35% tint) is blotchy clumps with visible mixing. The sharp blocks appear at 50% and, strongly, 70% (frames 07, 08). The reveal's "Mild preferences can add up to sharp divides" is carried by the 70% run, but a learner who taps only 10% and 30% would see 52% and 77% and a patchy grid. The tint count (35% fully like) helps; the claim is still bigger than the 30% picture.
5. **What I still ask after the reveal:** why do moves end in blocks rather than a reshuffle? The ratchet (content households never move, so settled blocks stay; only unhappy ones move) is not stated or marked. Rings show the cascade, not the ratchet.
6. **70% chip:** "moves if under 70%" is not mild; the "does not settle, 25 want to move" state still reads as a broken model until the reveal's parenthesis (2% still want to move). Reveal gives a percent; the stage gives a count (25). Mismatch of units, same fact.
7. **Reveal quotes only reached states:** gated on the 30% run and shows other runs only if tapped; falls back to "You did not finish a 30% run." for the other branch. All numbers in the run I saw match the frames (50% to 77%, tick 13, 1% to 35%, 52/87/98).
8. **Stage on reveal (phone):** pinned 30% run is scaled small and the grid is hard to read (known kit issue; not failed for it).
9. "the city" in the hook vs "toy model, not any real city" in the caveat: mild tension, caveat is present and visible.

## Earlier findings (r1, learner-no-schelling.md) checked

Legend before picture: partly fixed (keys now on stage, tiny while locked). "Happy 83%" bug-look: fixed. Told-only mechanism: fixed (rings, per-tick count). "Sharp vs 30% picture": **not fixed**, reworded around 70%. Reveal quotes reached states: still good. 70% confusing: partly. Chips jump to end state: unchanged, the Step view is optional. Caveat: kept.

## Verdict for the current version: **launch with notes**

Top remaining finding: the reveal quotes "143 households" that the stage never showed as a number (only per-tick counts like 54 were visible), and the 30% picture itself looks patchy, not sharp. Screenshots seen. Also: the one-sentence ratchet explanation is absent.
