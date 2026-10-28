*Simulated learner. This review finds problems; it is not evidence that anyone learned.*

# Learner review: flatten-the-cube-to-a-dot
lesson version: v2
boundary: an adult who can count the corners, edges and faces of a box and does arithmetic with negatives, but has never met Euler's formula, a planar graph, or the idea of drawing a solid flat (the same boundary as the v1 walk, company/reviews/flatten-the-cube-to-a-dot/2026-10-25-learner-knows-faces-not-euler.md, chosen on purpose)
Screenshots seen: yes (sheet.png from `npm run walkthrough -- flatten-the-cube-to-a-dot --port 3981`, recorded 2026-10-25T20:16:58Z; private build of the working tree at 3e365688e/f1abc5834, lesson code identical in both, NEXT_DIST_DIR=.next-le-v2; probe server :3982, 390x844)
Verdict: launch

A second mind (does not know what "convex" means) walked the same build: company/reviews/flatten-the-cube-to-a-dot/2026-10-25-learner-no-convex-v2.md.

## How it was walked

- QA path (walkthrough, option 1 "less than 2"): Slice, Next, Take the top off, Next, Remove an edge, Remove the rest, reveal.
- Own probe (scratchpad le-cube-v2-probe.mjs, 390x844), 6 paths: A "more than 2", every step snapped, burst frames 0-1300 ms after "Replay the flatten", 12 single removals; C Next, Next without slicing or flattening (card 3 before the flatten); D one removal, "Remove the rest", reveal at 150 ms; E Replay tapped mid-flatten, then tab back from card 3 to card 2, Replay, tab forward; F skip Slice, finish flatten and shrink, then Slice via the tab; G slice, skip to card 3, back to card 2 by the tab.

## Findings (written from the walkthrough and probes before reading build.md or meta.json)

1. **Where understanding first broke: still card 2, but it breaks less.** The flatten is still fast: in the burst frames the lid lifts and the box is fully open by 300 ms. But now "Replay the flatten" sits under the drawing, and I can watch it as often as I like. Replay is disabled while the animation plays, so I cannot stack it. Replaying from card 2 after I have started shrinking (E) does not undo my removals, and card 3 comes back as I left it (8 − 10 + 3). The new line "The 5 regions are the cube's other 5 faces." answers the question I had in v1, which was "what is a region?". For about 300 ms during the animation the label still reads "5 faces = 1" before it turns into "regions". That reads naturally: the box has 5 faces now. What I still lack is the same thing as in v1: why any solid with one face off can always be stretched flat without edges crossing. On the cube I can see it happen. The general claim I take on trust (finding 4).
2. **The prediction felt real, and card 1 now reconciles.** "Less than 2" was again my honest guess. Card 1 gives 10 − 15 + 7 = 2 with "+2 corners, +3 edges, +1 face", and under it "1 corner gone, 3 new: +2 corners". That closes the v1 gap where I counted 3 new corners in the triangle and the caption said +2. The two lines say "corners" twice in a row, but they read as a sum and its working.
3. **Card 3 on the cube works as in v1.** Single removals show "−1 edge, −1 region" for the first four, then "−1 edge, −1 corner", and the row of 1s fills up. Singulars are right everywhere I looked: "1 region", "1 edge", "1 corner", "1 corner minus 0 edges plus 0 regions" in the stage text, and "2 corners minus 1 edge" (A6-11). The v1 note still stands: the lesson picks every edge for me, so I never learn that some removals (an edge whose loss splits the drawing) would break the count.
4. **Whether the reveal answered my question.** It is the same as v1. On the cube, the reveal summarises what I did, and the stage at reveal time shows the dot, "1 − 0 + 0 = 1" and "+ the top face = 2". For "any convex solid" it is an assertion resting on the two ideas from findings 1 and 3. Human-learner question, unchanged: "would this work on a pyramid?"
5. **Paths the walkthrough skips. The v1 rough path is fixed, and nothing is a dead end.**
   - Card 3 before the flatten (C, G): the stage shows the whole cube, "8 − 12 + 6 = 2", and in gold "Take the top off first". Both remove buttons are disabled and the "2 Flatten" tab is enabled. That fixes v1's worst path, where I could shrink a drawing I had never seen made. Following the hint (G: tab 2, Take the top off, Next) puts me back on the normal card 3.
   - Skipping Slice (F): flatten and shrink complete, the reveal stays "Try it first", and the panel says only "Work through the three cards". Card 1 has no tick, and its tab is enabled. Tapping it, then "Slice a corner", unlocks "Show me why". After the reveal the stage jumps to card 3 with the dot. This recovers, but the panel still does not name the missing card (kit-owned, as in v1).
   - Reveal before the dot (D): "Show me why" unlocks 150 ms after "Remove the rest", while the stage still reads 8 − 10 + 3. I tapped it at once. At 800 ms the stage already shows 1 − 0 + 0 = 1 and "+ the top face = 2", and it is the same at 5 s. So the stage does jump to the dot when the reveal opens: observed this time, not just the builder's account.
   - The reveal's first line matches the prediction: "Not quite: it was 'still 2'" for options 1 and 3, and "Your prediction held." for option 2 (D, F).
6. **Text.** I found no slips. The v1 "1 corners / 1 regions" is gone.

Verdict reason: every v1 finding that was the lesson's to fix is fixed (replay, region = face, +2 corners, singulars, the inert card 3). What remains is the idea the lesson asserts and does not show: that every convex solid flattens, and that there is always a safe edge to remove. As in v1, that is a note and a hypothesis for human learners, not a blocker.

## After reading build.md / meta.json

Read after the findings above were written, at HEAD f1abc5834. meta.json `version` is 2, so the stamp stands. The fact-checker commit f1abc5834 changed only meta.json (c9 now verified). My build compiled meta.json before that commit landed, so its trust sheet still showed c9 as "not yet checked". The lesson code is the same.

- **Intent vs experience.** `learner.doesNotKnow` says "why it is 2 for every convex solid", and `knowledgeBoundary.teaches` says the argument is "shown on the cube". As in v1, my experience matches "shown on the cube". The step to every convex solid is c6, which is asserted (findings 1, 3, 4). Nothing in v2 set out to change that, and build.md does not claim it did.
- **v1 findings, closure.** Replay (W-2063 a): done, and it is the same chip renamed, disabled during the motion, so my E path saw it disabled mid-flatten. Regions line c9: done. "+2 corners" line (W-2063 b): done. Singulars (W-2063 c): done, on the visible keys too. Inert card 3 (D1): done, matching build.md word for word ("Take the top off first", both chips disabled, Next not gated). Panel not naming the missing card: unchanged and kit-owned, as I said in v1.
- **Reveal before the dot.** build.md's maker probe says "reveal 100 ms into the 2.4 s playback (stage snaps to the dot)". My D path agrees: 8 − 10 + 3 at 150 ms, the dot by 800 ms after the reveal tap.
- **Flatten timing.** build.md says 700 ms. My bursts show the box fully open by 300 ms. The difference is probably easing, with most of the stretch early. Either way, replay is now available.
- **Reduced motion.** build.md says that under reduced motion the chip stays "Take the top off" and Replay is disabled. I did not probe reduced motion. With no motion there is nothing to replay, so I see no learner cost.
- **Desktop reveal-fit "thumb" (the strip).** Not in my scope (I walked 390 and Pixel 7 only). It is flagged for qa-tester in build.md.
- meta.json `evidence.simulatedLearner` linking is the lesson owner's job. I do not edit meta.json.
