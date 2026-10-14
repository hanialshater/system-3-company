*Simulated learner. This review finds problems; it is not evidence that anyone learned.*

# Learner review (r8): stag-needs-three-in-four
lesson version: v3 (meta.json version 3)
boundary: adult-beginner (meta.json learner field: knows best replies; does not know that a better equilibrium needs enough trust, here at least 75% belief that the partner cooperates). Same tag as r6/r7.
Screenshots seen: yes (artifacts/walkthroughs/stag-needs-three-in-four/sheet.png, build 5, 7 frames)
Verdict: revise

## Findings (written from the walkthrough, before build.md)

Chose option 1 ("At least 50%").

1. **No answer before the commit: met (r7 top finding fixed).** The locked stage has no preset row; the axis ticks 0/25/50/75/100% are drawn alike; no line, tint or dot; readouts "?". Options are four thresholds in one form ("At least 50% / 75% / 90%", "Fully sure: 100%"); 75 is no longer the only odd number. The stem's 4 / 0 / 3 makes 75% computable, which is the problem, not a leak.
2. **Shows the why: met on the stage.** The rising stag line (0 → 4) against the flat hare line at 3, with marks left at each preset ("0", "2", "3", "4"), shows the crossing at 75% as something I made. The two boxes "both hare: 3 each" / "both stag: 4 each" get ticks at 0% and 100%: two stable outcomes, which is the equilibrium idea.
3. **The reveal quotes what I saw: met.** "At 50% the stag was worth only 2" (my pick, mark "2"), "crossed at 75%", "At 0% ... both hare, 3 each", "At 100% ... both stag, 4 each", "Both boxes are ticked" all match the stage record. Readouts at reveal show my last slider state (3.6 / 3 / stag at 90%), which the reveal does not quote, so no contradiction.
4. **Fit fails on words.** The reveal is 105 words (> 90 on a new version, v3), including the grey note "Invented payoffs in a simplified model. The game is called the stag hunt, after an example of Rousseau's." The model chip on the stage already says "invented payoffs". The stage top is also cut by a few px (the model chip is clipped in 07-reveal).
5. **Labels at the reveal are unreadable (kit, W-287).** In 07-reveal the chart is shrunk so the axis numbers, the "hare 3" label, the marks and the two ticked boxes the reveal points at ("Both boxes are ticked") are a few px tall. The same shrink also appears mid-explore in frame 04 (after "75% sure"): the chart is drawn smaller than in frames 03 and 05. Recorded as a kit finding (W-287), not a lesson revise; the kit owner should check why it fires before the reveal.
6. Minor (carried, defensible): "At least 75%" vs "either (tie)" at exactly 75%.

Where understanding first broke: the commit, honestly; I picked 50% because "prefer the stag" sounded like "more than half". The stage answered that directly with "stag is worth 2" at 50%.

## After reading build.md (Pre-flight v3)

v3 hid the preset row while locked and reworded the options; both visible in build 5. Pre-flight 7 (phone fit) is not answered; build.md says reveal text is unchanged from v2, and v3 is a new version, so the 90-word budget binds.

**Top finding (revise, reveal fits with its picture / text budget):** reveal 105 words on v3 (> 90) and the stage top (model chip) clipped at 390×844. Cut told context first (the grey "Invented payoffs ... Rousseau's" note repeats the stage chip; category manager picks), then confirm stage-top crop 0 px. Label shrink at reveal (and the early shrink in frame 04) is kit W-287.

| r7 finding | Status |
|---|---|
| Top: locked "75% sure" preset + odd-precision option point at the answer | fixed |
| Locked chart shrunken and unreadable | fixed in the locked frame (01-predict is full size); shrink now appears at frame 04 and at reveal (kit) |
| Coordination chip wording | not changed (minor) |
| "At least" vs tie at 75% | not changed (defensible) |
