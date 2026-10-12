*Simulated learner. This review finds problems; it is not evidence that anyone learned.*

# Learner review: mercator-greenland (adult, world-map-familiar, no projection vocabulary)

Boundary used: knows what Greenland, Africa and the Congo look like on the wall maps and in school atlases they have seen all their lives; can read a slider and a "×" ratio; has never heard the words "projection", "Mercator", "conformal", "equal-area", and does not do trigonometry. Phone viewport. Chosen on purpose (not read from meta.json).

## 1. From the artifact (written before reading the brief)

Read: `artifacts/walkthroughs/mercator-greenland/transcript.md`, its 8 PNGs, `artifacts/qa/mercator-greenland/phone-*.png`. I also drove the built lesson myself on a 430px phone viewport (slider 73 -> 60 -> 40 -> 20 -> 0, then the map toggle, then slider back to 73 on the other map).

### Where understanding first broke

1. **The prediction screen contradicts itself in numbers.** The stage reads "ON THIS MAP, GREENLAND ÷ CONGO **10.7×**" while the question directly below says "Greenland (blue) looks about **15 times** the size of DR Congo". An adult who checks the readout against the sentence sees two numbers for the same thing. The reveal then adds a third ("more than ten times"). I could not tell which was meant, and the lesson's own number undercuts its own question. This is where I first stopped trusting the screen.
2. **"Mercator" and "Equal Earth" arrive as unexplained names.** The only place the maps are named is the toggle button ("Show Equal Earth map" / "Show Mercator map"). Nothing says that a flat map has to flatten a ball. The word "projection" never appears in anything the learner sees, though that is the idea. I had to infer that the button swaps between two ways of drawing the world.
3. **Reveal jargon.** "areas grow by about 1 / cos²(latitude)", "keeps angles true", "constant compass bearing", "equal-area", and the stage footnote "Coarse outlines (1:110m)" are all unglossed. For this learner the formula is noise; "stretches everything away from the equator" carries the idea and the formula adds nothing.

### Did the prediction allow a real guess?

Partly. The question asks about two things the learner has strong, wrong intuitions about, so a guess is easy. But:
- The **title ("Greenland is not that big") and the hook ("Slide it south and watch")** give away the answer and the move before the prediction. A cooperative adult picks option 2 because the title says so, not because they reasoned. Choosing "Greenland, by far" feels like picking the wrong answer on purpose.
- Option 3 ("Congo, by about 15 times") reads as a strawman: the picture's 15x, flipped. Only options 1 and 2 are live.
- The slider is greyed and the toggle absent while predicting, so the learner cannot probe before committing. That is fine. But the ratio chip is **clipped at the bottom edge of the stage** on the phone predict and reveal frames, which looks like a layout bug.

### Did exploring answer the learner's actual question?

The learner's real question is "is my wall map lying about Greenland, or is Congo just drawn small?" Exploring answers the first half well:
- Dragging Greenland to the equator on the same map visibly shrinks it and the readout falls 10.7x -> 4.1x (60N) -> 1.6x (40N) -> 1.1x (20N) -> 0.9x (0N). This is the strongest moment: same shape, one slider, a number that tracks it. A dotted ghost of the real position stays behind, which helps but is never explained.
- Toggling to the other map and seeing 0.9x at 73N, and the number not moving when the slider moves, is a good silent contrast.

Problems:
- **The slider starts at its maximum (far right) and "toward the equator" is leftward, with no cue.** In the recorded walkthrough all three "moved slider right" steps are no-ops: latitude stays 73N throughout, so the transcript never shows Greenland moving. A learner who tries right first sees nothing happen and may think the slider is dead. (Dragging left works.)
- **Greenland shrinks as it slides and nothing says why at that moment.** A beginner can conclude "moving it makes it smaller" (property of the country) rather than "the map stretches more the farther from the equator". The reveal says "Greenland never changed as you slid it", a correction told after the fact for a misreading the explore step invites.
- **The learner is never shown why the equator is the trustworthy place.** The logic needs "near the equator this map is faithful". That is asserted. A sceptic could think Congo is just drawn small. The second map is the only independent check and is never framed as one.
- The explore footnote prints true areas ("Greenland 2.19M km², Congo 2.33M km²") **during exploring, before the reveal**, in small grey text: it gives away the answer, in units a lay learner cannot picture, and differs from the reveal's figures (2.17 / 2.34 million). Two near-identical pairs of numbers on one card read as sloppy.

### Was the reveal earned by what was shown, or only told?

Mixed.
- **Earned by showing:** "they are close" is genuinely shown by the 0.9x readout on the slid-to-equator map and on the other map.
- **Only told:** that this is because Mercator stretches away from the equator, the 1/cos² law, why a sailor's map is built this way, and "No flat map can keep both". None has a visible referent on the stage, so they land as a lecture. The sailor sentence answers "so why do they still hang this map on walls?" but is one sentence with no picture.
- **Template seam:** after "Not quite: it was 'About the same; Congo slightly bigger'." the next line starts lowercase ("they are close."), which reads like a concatenation bug. "Not quite" is also a mild slap for a learner the title has already steered.

### Findings (problems, not fixes)

1. Question says 15x, stage readout says 10.7x, reveal says "more than ten times": three numbers for one fact, no explanation of the difference.
2. Title and hook leak the answer, so the prediction measures cooperation, not belief.
3. "Projection" is the concept but is never named for the learner; the two map names are unexplained.
4. Slider direction is ambiguous and starts at the end stop; in the recorded walkthrough no latitude change ever happened.
5. Shrinking Greenland during the slide invites "the country shrinks as it moves"; the correction is told, not shown.
6. The reveal's explanatory half (why, sailors, no flat map can do both) is told with unglossed terms and no visual.
7. True areas printed in the explore footnote before the reveal, in unpicturable units, inconsistent with reveal figures at the second decimal.
8. Layout: ratio chip clipped at the stage edge on predict and reveal frames; large empty space under the footnote in explore.
9. The dotted ghost outline of Greenland's real position is unexplained.
10. All 7 claims show UNVERIFIED and the card says "0/7 claims checked"; a learner who taps "Why trust this?" sees the lesson saying it has not checked itself. (Process state, noted not judged.)

### FATAL flaws

None I would call fatal. Finding 1 is the closest: a visible numeric contradiction on the first screen is a credibility problem for a lesson whose whole point is "do not trust a number just because the map shows it". If 15x and 10.7x are deliberately defined differently, the learner is not told so.

## 2. After reading the brief

Read: `src/demos/geography/mercator-greenland/meta.json` only (not build.md, design.md or Demo.tsx).

- **Boundary match.** The lesson's own boundary (knows what a world map looks like and the equator/poles; does not know projections, why maps distort, Mercator's purpose) is close to the one I used. Mine is slightly more sceptical ("no trig, no jargon"), so the unglossed vocabulary findings (2, 3, 6) are against what the lesson itself says its learner lacks: "map projections" is listed as unknown, yet the word and its meaning are never supplied on the card.
- **Misconception targeted:** "sizes of countries on a world map are their real sizes." Intent and experience agree on the best part (sliding to the equator and seeing 0.9x). But the objective says the learner "can explain that a flat map must distort"; the card only asserts that in its last sentence ("No flat map can keep both"). Nothing shown makes a flat-map-must-distort point, so that third of the objective rests on telling.
- **Finding 1 confirmed by the record.** Claim c3 is marked `disputed` by the fact-checker: the 15x figure only holds for an unclipped projection, while the lesson's own readout is 10.7x. So the contradiction I hit as a learner is a real defect, not a misreading. Per review rules a false or disputed visible claim blocks launch until fixed or rejected with a reason; I record it here as a blocker candidate shared with the fact-check, not as my own fatal call (I could only see it as an inconsistency).
- **Unrecorded claims the learner sees** and I flagged as unsupported are listed by the brief as unverified: c8 (sailors), c9 (wall maps rival Africa), c10 (Greenland never changed), c11 (explore footnote areas), c12 (the predict answer itself). The footnote (my finding 7) is claim c11.
- **Intent I cannot see in the experience:** the recall question (near the poles looks most inflated) exists in meta.json, but nothing in the walkthrough shows it; I did not experience it, so I have no view on it.
- **Brief's learner description includes "the equator and the poles"** as known; the lesson leans on that, yet the slider is labelled in degrees ("73°N") and a lay learner does not know what 73 degrees north means. This suggests latitude is not as familiar as the brief assumes; the stage shows no equator line to tie 0° to.
- **Not contradicted by the brief:** that dragging left is needed and that the slider starts at the end stop; the brief says nothing about direction, so that is an experience-only finding.

Nothing in the brief reduces my findings; the brief confirms 1 and the unverified-claim state of 7, and it widens finding 3 (the learner is described as not knowing projections, and the lesson never introduces the word).

Hypothesis only (not evidence): a learner would probably leave believing "Greenland and Congo are about equal, and Mercator is stretchy". Whether they could explain why, or would apply it to another country, I cannot say; only people can.

Verdict: revise
