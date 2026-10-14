# Learner review (final): Better at shooting left. Shoot left more? (boundary: no-mixed-strategy)

*Simulated learner. This review finds problems; it is not evidence that anyone learned.*

Seen: walkthrough at c9e4df0d (phone), sheet.png, 02-04 and 05-reveal frames; Demo.tsx reveal and gating read (a single reveal, no per-choice branches). Boundary: knows probabilities and that a keeper must guess; has never met a payoff table or "mixing".

## Findings (artifact first)

**Idea the learner lacks:** your best mix is set by what keeps the other side indifferent, so a better weapon can mean using it less.

1. **Answer visible before predicting?** The hook "Should he use it more often?" and option "More than 50%" are the natural answer, which is wrong: the lesson plays on that, so no giveaway. The locked stage shows 50/50 and 0.700 only. Good.
2. **First thing I lack:** why 50% left is "best" at all. The question asserts "He mixes sides so the keeper can't guess: 50% left is best." By table symmetry it looks right; why a mix beats always picking a side is told and never shown. Acceptable only because the lesson's gap is the change, not the starting premise.
3. **Orientation:** the table (Kick left/right by Dives left/right, highlighted 0.90 -> 1.00 cell) makes "dives the wrong way" readable; the locked stage text is small but legible in the 01 frame.
4. **Where understanding broke, and then did not:** slider to 0.94 (47.6% / 52.4%) then Perfect (44.4% / 55.6%): I see the kicker bar fall and the keeper bar rise, with "Keeper left 0.722 = right 0.722" lines. Then "Keep 50% left": keeper dives left 100%, "Keeper left 0.700 | right 0.750", score 0.700. This is the mechanism on stage: the keeper takes the cheaper dive, so keeping 50% gains nothing. The earlier gap ("nothing shows why") is closed. A first-time reader may still wonder why the keeper jumps to 100% (a best reply, not a mix); the label says "Keeper dives left 100.0%" with no cue that the keeper is responding.
5. **Reveal answers the question I actually have** ("why not keep 50%?") and quotes only states reached: 0.90 start, 1.00 best mix (44.4/55.6/0.722), keep-50 at 1.00 (0.700/0.750). The kept-50 milestone is now gated on 1.00 (Demo.tsx: `v === BEST`), so the 0.750 in the reveal is a state the learner visited.
5b. **Told vs shown:** the objective's "keeper must cover left more" is shown by the keeper bar moving 50 -> 55.6 and the 100% in keep mode, and the reveal points at it. The closing "neither side gains by switching" is told but the "=" lines on stage stand for it.
6. **Surprise left over:** kicker shoots left less yet scores more (0.700 -> 0.722); reveal states both numbers without remark. The score rises by 0.022 while the left shot improved by 0.1; whether that is "a lot" is not said. Minor.
7. **Notation:** "Keeper left 0.700 | right 0.750" vs "=" : the pipe vs equals sign is the whole cue and is unlabelled. Small text.
8. **Layout:** reveal stage on a phone shows the table top at the card edge, cropped/scaled (known kit issue; not failed for it). Frames 02-03 leave an empty band under the table (unchanged).
9. Controls: slider and both buttons work, none dead. The gate can be satisfied in two taps.

## Earlier findings (r1) checked

Why 50% is best: **not fixed** (still told, acceptable). Orientation: unchanged, fine. Mechanism told only: **fixed** (keep-50 mode with both dive payoffs). "Why not keep 50%?" unanswered: **fixed** (reveal paragraph 2). Last-line slogan: removed. Reveal quotes reached states: fixed and stricter. Layout clip/gap: partly (gap remains, crop is the kit issue).

## Verdict for the current version: **launch with notes**

Top remaining finding: the keeper's jump to "100%" in keep mode is unexplained on stage (nothing says it is a best reply), and the "=" vs "|" cue is easy to miss. Screenshots seen.
