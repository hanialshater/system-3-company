# Ruling: left-or-right v2, the reveal opener on the Mirror-then-Turn-over path

cm-math-discrete · 2026-10-17 · lesson `src/demos/math/left-or-right` v2 (main aae6d2d6) · brief 4 in `company/domains/briefs/math.discrete.md`
Asked by: build notes "v2 fix round", Open, first bullet (`company/reviews/left-or-right/build.md`). I read Demo.tsx (`settle`, `seenText`, `Reveal`) and meta.json; I did not run the lesson.

## The gap
After W-1606(2), `turned` fires on plain turned (−3) and on mirrored-and-turned (+3). A learner who presses Mirror and then Turn over unlocks the reveal. Their seen line is "Trefoil: mirror +3" (the "turned over" segment is written only from plain turned, so no −3 is quoted). The reveal then opens "Turning the trefoil over left every mark minus", a state they never saw. The reveal row of controls is unmounted, so they cannot go and see it. That breaks the told-vs-shown rule.

## Ruling: ADD A BRANCH (option 2). Keep the opener for everyone else.
- Not "keep": the sentence is false of what this learner saw, and it is the lesson's central contrast (turning over leaves the marks, mirroring flips them).
- Not "require plain turned again": W-1606(2) was made because a learner who did exactly what the hint says in the other order was stuck on "Try it first". A hint that steers them back costs them a gesture to repair a sentence. The branch costs two words.
- What this learner did see is true and teaches the same thing: the marks stayed plus when they turned the mirrored trefoil over. The branch says that.

## Condition
`seen.turned === undefined` at the reveal, i.e. the seen line has no "turned over" segment. The gate needs `turned`, and `turned` on a trefoil without a recorded plain-turned value can only mean mirrored-and-turned. A learner who later also reaches plain turned (Mirror back, Turn over) has `seen.turned = −3` and gets the standard opener. So the branch fires exactly when the seen line lacks the −3. `Reveal` needs the `seen` prop (builder; no new flag needed).

## Exact wording
Standard (unchanged), paragraph 1, sentence 1:
"Turning the trefoil over left every mark minus: turning over is a way of moving it, so its hand stayed left."

Branch, in its place:
"Turning the mirrored trefoil over left every mark plus: turning over is a way of moving it, so its hand stayed right."

Everything after it is unchanged on both paths ("Mirroring turned every mark plus, and no wiggling gets back: ... Max Dehn proved in 1914." and paragraph 2). I deliberately kept "Mirroring turned every mark plus" verbatim: this learner did mirror the front trefoil first (seen "mirror +3", from the front's −3), so it is true for them, and leaving it avoids resetting c1. Delta: +1 word ("mirrored"); "right" for "left" and "plus" for "minus" are swaps.

Numbers checked in node, not in my head: kit trefoil signs front −,−,−; turned −,−,−; mirror +,+,+; mirrored then turned +,+,+ (brief check K21, `company/domains/briefs/checks/knots-check.mjs`; the fact-checker's own signs agree, claim c3 note). hand(+3) is "Right-handed" (Demo.tsx `hand`).

## What changed learner text means (builder and downstream)
1. **Claims.** New learner text is quoted in: c3 (add 'Turning the mirrored trefoil over left every mark plus'; the number it rests on is already in c3's source and the fact-check), c5 (add 'its hand stayed right' to the quoted reveal text; c5 is already unverified from W-1608, so no extra reset), c6 (add the branch sentence to its quote list). c1 is not touched. Reset c3 and c6 to unverified with a note naming this ruling, and re-run the fact-checker; both are re-reads of signs already derived (mirrored-then-turned +,+,+), not new research. Builders never mark their own claims verified.
2. **Reveal-fit pass.** The branch is a longer paragraph by one word, but wrapping decides. Run `node tools/reveal-fit.mjs --strict --width 390 --height 844` on the Mirror-then-Turn-over path (the v2 probe `v2-w1606-probe.mjs` already reaches it), and on the standard path to confirm no change. Spare was 56 px on the trefoil paths and 35 px on the mirrored-figure-eight branch at 390×844; one extra word may add a line (about 20 px), which fits. At 360×740 the reveal already crops 96 px on all endings (accepted by S4); the branch must not make it worse than the existing endings, and I am not asking for a fix there. If strict fails at 390×844, do not drop "mirrored" (it is what makes the sentence true); come back to me.
3. **Version.** This is a learner-text change: it joins v2 if v2 has not shipped, otherwise bump to v3. Status stays draft either way.
4. **Test.** Add one probe line: Mirror then Turn over, reveal opens with the branch; Turn over then Mirror (contract order), reveal opens with the standard opener; Mirror, Turn over, Mirror, Turn over, standard opener. The QA contract path is index order, which reaches the standard opener, so it does not change.

## Not done / follow-ups for the caller to board (I did not)
- demo-builder: wire `seen` into `Reveal`, apply the branch, reset c3 and c6, run reveal-fit strict and the three-path probe, note it in build.md.
- fact-checker: re-verify c3, c5, c6, plus the earlier c1 and c5 from W-1608.
- design-lead: reveal-fit pass on the branch is measured by the builder; the lead need only look if strict fails.
- Lesson, board.json and progress.md untouched.
