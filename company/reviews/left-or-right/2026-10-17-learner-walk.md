*Simulated learner. This review finds problems; it is not evidence that anyone learned.*

# Learner review: left-or-right
lesson version: v3
boundary: knows what a mirror image is, and that a trefoil is a closed loop with three crossings; does not know that turning a knot over is a way of moving it (so it never changes the knot) while its mirror image can be a different knot, or that the figure-eight is its own mirror image (meta.json `learner`, the only field read before the findings)
Screenshots seen: yes (artifacts/walkthroughs/left-or-right/sheet.png, recorded 2026-10-17T02:00:48Z, QA path, Pixel 7 profile; plus my own 390x844 probe frames, see Method)
Verdict: launch

## Method

- Built this worktree (main 8a67fe3e, meta.version 3) into a private dist dir (`NEXT_DIST_DIR=.next-le-lor`), ran `npm run walkthrough -- left-or-right --port 3891` (QA path: option 1 "Yes, wiggle it"; Turn over, Mirror, Figure-eight; reveal).
- Then a Playwright probe at 390x844 (isMobile, touch, DPR 2) on `next start -p 3892` (killed by PID afterwards), eight paths, stage text, picture label and reveal read at reveal time:
  A "No, never": Turn over, Mirror (Turn-over-first order).
  B "Yes, wiggle it": Mirror, Turn over (Mirror-first order).
  C "No, never": Mirror only. D option 3: Turn over only.
  E "No, never": Figure-eight, Mirror, Turn over (figure-eight only).
  F option 3: Mirror, Turn over, Figure-eight, Mirror. G "No, never": Turn over twice, then Mirror.
  H "No, never": Figure-eight, Mirror, Turn over, then Trefoil, Turn over, Mirror.
  Probe frames are in the session scratchpad (`lor-p-*.png`), not committed.
- At 390x844 the predict card and the reveal card fit with no scroll on every path I opened; the crossing badges are legible.

## Findings (written from the walkthrough and probe before reading build.md, design.md, meta.json claims or the earlier reviews)

1. **Both orders: the reveal matches what I saw.**
   - Turn over first (QA path, A, G, H): I saw −,−,− "Sum −3 Left-handed" after Turn over, then +,+,+ "Sum +3 Right-handed" after Mirror. The reveal says "Turning the trefoil over left every mark minus ... so its hand stayed left. Mirroring turned every mark plus". True to what I saw.
   - Mirror first (B, F): I saw +,+,+ after Mirror, and still +,+,+ "Right-handed" after Turn over; I never saw the plain turned-over trefoil. The reveal switches to "Turning the mirrored trefoil over left every mark plus ... so its hand stayed right." Also true to what I saw. I found no path where the reveal cites a state I did not reach.
   - Small gap on B: the Seen line stays "Trefoil: mirror +3" after I turn the mirrored trefoil over, so the step the reveal leads with ("Turning the mirrored trefoil over") is the one step the Seen line does not record. On the Turn-over-first order the line records both ("turned over −3 · mirror +3"). Not blocking; it reads as a record that missed my second tap.
2. **Where understanding first broke: Turn over looks like a mirror.** With my boundary ("I know what a mirror image is"), the turned-over trefoil's outline is the left-right flip of the front drawing: lobes that were on the right are now on the left. My first reading of step 1 was "that is the mirror image", and the readout disagreed (still −3, still left-handed). Then Mirror gave the same flipped outline with every badge +. The only thing that separates "turned over" from "mirrored" on screen is which strand is on top at each crossing, carried by the badges. I could repair it by trusting the badges, and the reveal's "turning over is a way of moving it" names exactly this; this is the lesson's point, not a bug, and it is the moment a first-time learner is most likely to stall. A learner who does not look at over/under has only the badge colour to go on.
3. **What the prediction felt like.** A real question. The hook (hold a rope trefoil up to a mirror) primes "it looks the same in a mirror, so surely", and option 3 ("Only by picking it up and turning it over") is a genuinely tempting middle answer for someone who knows mirror images flip left and right. The reveal answers option 3 directly ("turning one over never swaps them") on paths D/F, so that predictor is not left without an answer.
4. **The figure-eight claim is by assertion on the QA path.** On the QA path I tapped Figure-eight once: front only, − + − +, "Sum 0", no hand named. The reveal says "The figure-eight is different: it is its own mirror image." I never mirrored it, and at reveal time the Turn over / Mirror buttons are gone, so I cannot check now. When I do mirror it (F, H) the reveal adds "The figure-eight's marks summed to 0 both ways", which is better. Even then, the mirrored drawing (+ − + −) is a different picture from the front one (− + − +); the stage never shows the two becoming the same knot. The inference this mind is then most likely to make is "Sum 0 means own mirror image; Sum ≠ 0 means it has a hand". I do not know whether that rule is true in general; I flag it as a likely takeaway the lesson did not intend to teach (see After). Not blocking for the trefoil argument, which is the hook.
5. **Figure-eight first stays locked with no hint (E).** If I go to the figure-eight first and do exactly what the panel says ("Turn the card over, then mirror it"), the button stays "Try it first" and the panel sentence does not change or name the trefoil. H shows the cure: switch back to Trefoil, Turn over, Mirror, and it opens. A learner who is curious about the second knot first can stall here for a few taps. Not blocking (the trefoil is the hook's knot and the default chip), but it is the only dead end I found.
6. **The reveal gate is earned.** C (Mirror only) and D (Turn over only) stay locked; any path that both turns over and mirrors the trefoil opens it, in either order. So every learner who reaches the reveal has seen the trefoil's marks survive a turn and flip under the mirror.
7. **The question I actually had.** "Can the rope ever match its reflection?" is answered: no, and turning over does not help. The question my boundary raises next, "if I wiggle it, couldn't the badges change?", is answered only by authority ("no wiggling gets back ... as Max Dehn proved in 1914"); the stage cannot wiggle. I accept that as told context in 60 seconds; it is the weakest link of the argument for this mind.
8. **Turn over is a toggle.** G: the second Turn over returns to "Trefoil, front" while the Seen line still says "turned over −3". Harmless.

Verdict reason: on both orders the reveal states only what the learner saw, and no finding stops a first-time learner with this boundary from following the trefoil argument; finding 4 (figure-eight "own mirror image" asserted on the QA path, with Sum 0 inviting a false rule) and finding 5 (figure-eight-first dead end) are the first things to fix if the lesson is revised.

## After reading meta.json (build.md, design.md and the earlier reviews not read)

- **Intent vs experience.** The objective (turning over keeps every mark, the mirror changes every mark, the trefoil cannot be moved into its mirror) is what both orders showed me on screen (finding 1). The misconception ("a mirror image is the same knot; you just flip it over") is exactly the stall in finding 2, and the reveal's "turning over is a way of moving it" is aimed at it. Intent and experience agree on the trefoil.
- **keyState matches my probe.** 'turned' counts on either side of the mirror, which is why B and F unlock; the Seen line writes "turned over" only from the plain turned state, which is the gap in finding 1 (B). That is designed behaviour; I still read it, as a learner, as the line missing a tap.
- **'eightMirror' is optional and off the QA path**, which confirms finding 4: the QA-path learner gets the figure-eight sentence without having mirrored it. The figure-eight is in the `doesNotKnow` boundary, so on the QA path that part of the boundary is taught by statement, not by the stage.
- **Finding 4's false rule.** c5's fact-check note quotes PMC5582600 ("all reduced representations of an alternating knot have a constant writhe"), so the badge sum is meaningful for these drawings. Whether a learner may generalise "Sum 0 means own mirror image" is a maths question I cannot settle from my boundary; I route it to cm-math / fact-checker rather than assert it. The reveal's "summed to 0 both ways, and it is its own mirror image" (F, H) puts the two side by side with "and", which invites the reading.
- **Claims.** c3 and c6 are unverified at v3 (reset by the builder for the new Mirror-first opener, W-1619). The opener sentence I saw on B and F ("Turning the mirrored trefoil over left every mark plus ... its hand stayed right") matched the stage on both; this is learner-side agreement, not a fact-check. The trust link reads "6/8 claims checked" on every frame.
- `evidence.simulatedLearner` is empty; this record is not linked there (I may not edit the lesson; the lesson owner links it).
