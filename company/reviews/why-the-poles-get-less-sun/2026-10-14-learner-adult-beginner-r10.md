*Simulated learner. This review finds problems; it is not evidence that anyone learned.*

# Learner review (r10): why-the-poles-get-less-sun
lesson version: v1
boundary: adult-beginner (from meta.json learner: knows the poles are cold; does not know that it is the angle of the sunlight, not extra distance from the Sun, that cuts their yearly sunlight to about two fifths of the equator's)
Screenshots seen: yes (artifacts/walkthroughs/why-the-poles-get-less-sun/sheet.png, recorded 2026-10-14T18:57)
Verdict: revise

## Findings (written from the walkthrough before reading build.md)

Path walked: chose "About 99%"; tapped "Equator", "51.5 degrees N", "60 degrees N", "North Pole"; opened reveal.

1. **The prediction is genuine.** "About 99%" is the "distance hardly matters, so nearly the same" answer; "About 10%" is the "the pole is dark and frozen" answer. 40% is surprising. Good.
2. **Distance is cleanly ruled out.** "EXTRA DISTANCE FROM THE SUN: 6,371 km (0.004%)" against "41%" makes "not distance" seen.
3. **Where understanding breaks: the picture cannot produce the number.** The stage is "Equinox noon": the same beam lands on ×1.00, ×1.61, ×2.00 of ground, and at the pole it "grazes the ground". Reading the picture, I expect the pole to get almost nothing, and 51.5° N to get 1/1.61 ≈ 62%. The readout says 67% and 41%. The picture's own logic points to the "About 10%" option or lower, not 40%. The gap is the year: the pole gets six months of round-the-clock low sun because of Earth's tilt, which the lesson never mentions. So the reveal's "The cause is the angle. Near the poles the same beam lands on more ground" explains *less*, but not *how much less*, and the question is "how much". A beginner who trusts the picture is left with a contradiction (grazing beam, yet 41%).
4. 30° N on the locked stage ("spread over 1.15 times its width") is a useful starting example, but it vanishes after the first tap and is not in any readout.
5. Reveal fits with its picture (06-reveal, pole case, both readouts). Trust link reads "0/5 claims checked" (fact-checker's lane).

Verdict reason: the lesson's picture (equinox noon) and its answer (yearly 41%) come from different models, and nothing on the card bridges them; the learner's best reading of the picture points to a wrong option. Not a block: every number is true and the angle is the right headline.

Fixes (hypotheses for the builder, not tested):
- One line under the pole case: "In summer the pole has sun all day for months, at a low angle: that adds up to 41% over a year."
- Or ask about equinox noon (where the picture answers it), and keep the yearly figure as a follow-on.

## After reading build.md (Pre-flight v1)

- Yearly shares come from a full-year insolation model ("insol-annual", 3,600 steps), while the picture is fixed at equinox noon. The note does not discuss the tilt or the polar summer, which is what turns "grazes the ground" into 41%. Finding 3 stands; verdict stays revise.
- Fix route: cm-geography (what the card must say about the year), then demo-builder; the yearly-share claim scope to the fact-checker.
