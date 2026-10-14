*Simulated learner. This review finds problems; it is not evidence that anyone learned.*

# Learner review (r9): ruler-on-mercator
lesson version: v3 (meta.json version 3)
boundary: scale-bar-knower (the lesson's own). Knows that maps have scale bars; does not know that on a world map a scale bar is true only along one line (meta.json learner field, same as r6/r8).
Screenshots seen: yes (artifacts/walkthroughs/ruler-on-mercator/sheet.png, release build recorded 2026-10-14T15:19Z, 6 frames; 06-reveal.png opened at full size)
Verdict: launch

## Findings (written from the walkthrough, before build.md)

Chose option 1 ("1,000 km").

1. **Where it first asks for an idea I don't have: nowhere on the required path.** The question names everything it uses: the yellow bar, 2,000 km at the equator, 60°N. "Mercator" is a word I may not know, but the stage caption says what to look at ("Yellow: the same bar. Green dashed: a true 2,000 km here"), so I do not need it.
2. **No answer before the commit: met.** Options 1,000 / 2,000 / 4,000 km, same form. Locked stage shows the equator case only (2,000 km, 1.00×, "Seen: nothing yet").
3. **Shows the why: met.** At 60°N the green dashed true-2,000 km is visibly about twice the yellow bar, the grid rows get taller northward, and MAP STRETCH 2.00× is a readout. 30°N (1,732 km, 1.15×) shows the stretch growing. The new dashed "equator" line gives "as at the equator" something on the map to point at.
4. **The reveal quotes what I saw: met.** "at 60°N the bar spanned 1,000 km, map stretch 2.00×" matches the Seen line and both readouts, still on stage at reveal.
5. **The reveal shows the payoff, not only tells it.** "The green bar ... was twice as long" is on screen in 06-reveal (yellow bar and green dashed both visible with readable labels). The last sentence ("one scale bar is true along only one line") is told, but its evidence (1.00× at the equator, growing to 2.00×) was seen on the path.
6. **Fit and budget: met.** Reveal is 69 words (r8: 97). 06-reveal is 1082×2202 at about 2.77 device px per CSS px, so about 795 CSS px tall: the stage top, map, readouts and last line of the reveal are all on one 390×844 screen. The map at reveal is full width; the r8 label-shrink (W-287) is not seen on this frame.
7. Minor: the locked frame (01-predict) still draws the map small with tiny labels ("true 2,000 km here" about 4 px). It is the equator case, so nothing is lost, but the first picture a learner sees is the hardest to read.
8. Minor: the reveal's "Your Seen line:" opener is a slightly bureaucratic phrase for a learner; it does its job.

Where understanding first broke: it did not, on this path.

## After reading build.md

Read after the section above. The v3 changes (c4 sentence cut, "toward the poles", equator line c6) match what the walkthrough shows; r8's only revise (word budget) is fixed. Claims c3, c5, c6 are UNVERIFIED after the v3 rewording: that is the fact-checker's gate, not a learner finding.

| r8 finding | Status |
|---|---|
| Reveal 97 words (> 90) | fixed: 69 words |
| Labels unreadable at reveal (W-287) | not seen at reveal in this build; locked frame still small (minor 7) |
| "Yellow" renders dark gold | fixed on this build (bar reads yellow) |
