*Simulated learner. This review finds problems; it is not evidence that anyone learned.*

# Learner review: not-every-circle-is-red
lesson version: v1
boundary: an adult or teen who uses "all", "none", "some" in everyday speech; has never seen formal logic, quantifiers, truth tables or the word "negation"; believes "not every circle is red" means "no circle is red".
Screenshots seen: yes (artifacts/walkthroughs/not-every-circle-is-red/sheet.png, recorded 2026-10-22T12:05:26.475Z)
Verdict: launch

## Findings (written from the walkthrough before reading build.md or meta.json)

1. Where understanding first broke: nowhere blocking. The first unfamiliar thing is the "=" glyph, which already appears on the locked predict stage (all red: "No circle is red ✗ =", "Some circle is not red ✗ ="), before the learner has touched anything and with no key. A learner who picked "No circle is red" sees an "=" next to their own choice at the start. The bold top row with a rule under it, plus the reveal, are enough to work out that "=" means "same mark as the top row", so this is a note, not a block. Note: a tiny header over the "=" column (or an aria/visible "same as top row") would remove the guess.
2. What the prediction felt like: real. The three options are plain everyday sentences, the misconception (A, "No circle is red") is the natural pick, and "whatever the colours" in the question tells the learner what "means the same" will be tested against. The stage shown while locked is all red, where A also "matches" (both ✗); that does not give the answer away, it matches the misconception, which the first tap then breaks.
3. The first tap does the work: one blue circle turns "Not every circle is red" ✓ while "No circle is red" stays ✗. That is the moment the misconception fails, and it is visible in one frame. In that frame "Some circle is red" also gets "=", so a learner briefly sees two candidates; tapping on to all blue (needed before "Show me why" lights up) separates them ("Some circle is red" ✗ vs top row ✓). The forced path reaches the distinguishing state, good.
4. Kept columns (mini-circle headers "1 blue, 3 red" and "all blue") let the learner compare states side by side after Reset; the reveal's "in every state you made" can be checked against them. Their headers are small icons with no word; readable from the circle pictograms. Note only.
5. Whether the reveal answered the question the learner actually had: yes. My question after exploring was "so which one is it, and why was I wrong?" The reveal names the answer, points to the exact frame that disproved my choice (one blue circle), and gives the rule in plain words ("One exception is enough to deny 'every'"). The last clause ("the opposite of 'none are' is 'at least one is'") is a second idea, but the stage supports it: "No circle is red" and "Some circle is red" carry opposite marks in every column. The reveal fits on the phone screen with the stage above it.
6. Shape not colour: circles are labelled R/B and blue is hatched; ✓/✗ differ in shape; "=" differs from ✓. Fine for a colour-blind learner.

Verdict reason: no finding blocks a first-time learner; the only notes are the unexplained "=" glyph (visible already on the locked stage) and the unlabelled kept-column headers.

## After reading build.md / meta.json

- Read only meta.json's `version` field (1) to stamp this review. build.md and design.md not read.
