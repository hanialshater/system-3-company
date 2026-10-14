*Simulated learner. This review finds problems; it is not evidence that anyone learned.*

# Learner review (r9): cluster-stops-the-cascade
lesson version: v4 (meta.json version 4)
boundary: threshold-rule-only (the lesson's own: knows a 12-person friend network, the rule "join if at least half your friends have", fractions like 1/4 and 3/4; does not know that a cascade stops exactly at a tightly knit group, or the cluster-density condition). Same tag as earlier reviews.
Screenshots seen: yes (artifacts/walkthroughs/cluster-stops-the-cascade/sheet.png, release build recorded 2026-10-14T15:21Z, 18 frames; 01-predict.png and 18-reveal.png opened at full size)
Verdict: revise

## Findings (written from the walkthrough, before build.md)

Chose option 1 ("Many more people adopting first, outside those four").

1. **Where it first asks for an idea I don't have: "those four", at the commit.** The question says "the idea stops at 8 of 12" and all three options then name "those four". Nothing on the locked stage says which four: no outline, no "never adopted" mark, and the run has not happened. I can guess the square 8–11 because it looks different, but that guess is the lesson's own idea (the tight group is where it stops). So the options both require and point at the answer's key object before the commit. This is new in v4 (the final review's options did not say "four").
2. **No answer before the commit: at risk.** Beyond finding 1, the right option is the only one with an exact count ("Two people ... among those four") and it echoes the hook's "Two people adopt". With "outside/among those four", the contrast the lesson wants to teach (where, not how many) is written into the option pair. I count this as pointing to the answer under the standard ("an option worded more precisely than the others"). The final review's objection that option 1 was defensible is answered by "outside those four", which is a real fix.
3. **Shows the why: met.** After "To the end" (round 6, 8 of 12, final) the dashed "holdouts" outline marks 8–11 and the status line reads "8: 1 of 4 friends adopted; 3 of 4 in the group, so at most 1 (needs 2)". "Start 8,9" reaches 12 of 12. The cause is on the stage.
4. **The reveal does not fit with its picture.** In 18-reveal the stage is scrolled: only the bottom of the outline, 10 and 11, the legend, readout and buttons are visible. The reveal names "the four outlined" (half visible), "Person 8 had 1 of 4 friends adopted" (8 and its 1/4 pill are off screen), "8 has 3 of 4 friends inside it, the others 3 of 3" (the edges inside the group, mostly off screen). Stage-top crop is well above 0.
5. **Budget: missed by a lot.** Reveal is 140 words (budget 90; lesson unpublished). The first paragraph restates the run ("From 0 and 1 it stopped at 8 of 12 in round 6 ... the same two seeds reached all 12"); the general closing line is told context.
6. Explore: the Start 8,9 / Start 0,1 buttons are now fully visible in explore frames (final review's clipping finding fixed). The locked frame (01-predict) crops the legend at the bottom of the stage.
7. Minor (carried): tapping each of 12 people earns only a pill ("0/2"); the walkthrough spends 12 of 16 steps on it.
8. Minor (carried): closing line "with none among the rest, it takes everyone" is hard to parse (none of what?).

Where understanding first broke: at the question, on "those four".

## After reading build.md and the final review

| Earlier finding (final) | Status |
|---|---|
| Option 1 defensible; "Not more seeds" false | fixed by "outside those four"; but see findings 1–2 |
| Start buttons clipped in explore | fixed |
| 12 taps for nothing | not fixed (minor 7) |
| "none among the rest" hard to parse | not fixed (minor 8) |

Fix route: demo-builder for fit (finding 4) and for naming the four before the commit without pointing at them, or rewording the options so the four are not presupposed (finding 1–2); category manager picks the reveal cuts (finding 5).
