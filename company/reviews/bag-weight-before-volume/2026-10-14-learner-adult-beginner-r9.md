*Simulated learner. This review finds problems; it is not evidence that anyone learned.*

# Learner review (r9, release-build walkthrough): bag-weight-before-volume
lesson version: v1 (meta.json version 1, status review)
boundary: adult-beginner (packs bags, knows kilograms and litres; has never separated "how full it looks" from "how much it weighs" when checking a limit).
Screenshots seen: yes (artifacts/walkthroughs/bag-weight-before-volume/sheet.png, 4 frames; walkthrough re-run 2026-10-14 because the earlier transcript was an aborted page.goto timeout)
Verdict: revise (blocking finding below)

## 1. From the artifact (written before reading meta.json, build.md or the crit)

- Where I first lose it: the question. "Which check notices the illustrated weight limit?" with options "Ignore mass / Check mass / Same outcome". The answer is in the option words: only a check that looks at mass can notice a mass limit. The title "A half-empty bag can be overweight" also states the idea before the commit.
- Volume is never on the stage. The reveal opens with "Capacity in litres and a weight limit answer different questions", but no litre figure, fill fraction or "looks half empty" readout appears anywhere. The drawing changes from a filled rectangle (predict) to a bag with a smaller inner rectangle (explore), unlabelled. I cannot see the contrast the lesson is about.
- Amounts the reveal explains are not shown. The stage shows inputs (Contents 4 kg; legend "Base=2kg · example limit=5kg") and one result ("Over limit 1kg"). The total the reveal talks about ("sums the contents' masses") is never shown: 4 + 2 = 6 kg, 6 − 5 = 1 kg is left to me. At 4.2 kg I had to work out 6.2 kg myself.
- The "Ignore mass" result is never seen. I picked Ignore mass; the walkthrough tapped Check mass then moved the slider. What would Ignore mass have said ("fits"? a volume?) — I do not know, so the reveal's "Not quite" corrects me without showing my option failing.
- BLOCKING (misleading state): the mode indicator looks inverted. After tapping "Check mass" (02-step-1 onward, and in the reveal), the white bold toggle is "Ignore mass", while the readout shows the Check-mass result. A beginner reads "Ignore mass is selected, and it says 1 kg over". That supports the wrong answer. This looks like an engine behaviour (it recurs in box, coil, circle and desk); it should be checked by QA. (The white button may be meant as "try this next"; either way nothing on the stage marks the mode in effect, and the lit button is the one not in effect.)
- Reveal: "The current check mass setting gives 1.2kg" — 1.2 kg of what? It is "over limit", but the sentence does not say so. The rest is told.
- Recall (answer text from the trust sheet: "2 + 6 = 8 kg, 1 kg over. Unused space subtracts nothing. The 7 kg limit is an example"): this is arithmetic; anyone who adds the masses gets it without the lesson. See section 3 for the question.
- Phone fit: pass (04-reveal shows the drawing, readout and full reveal).

## 2. Earlier findings, read after section 1

None. This is the first learner review of this lesson (evidence.simulatedLearner was empty).

## 3. After reading meta.json, builder notes and the crit

- Version recorded: meta.json version 1. Boundary in meta.json: knows ["Everyday objects have sizes, positions and amounts"]; I used the same, made concrete as an adult beginner.
- meta.json doesNotKnow names 'Capacity in litres and a weight limit answer different questions'. No capacity is on the stage, so the cause the brief promises is told, not shown.
- Recall: limit 7 kg, bag 2 kg, contents 6 kg, a third empty (Yes, a third empty / Yes, exactly 7 kg / No: at 8 kg it is 1 kg over), key 2. A transfer item with the misconception as a distractor, as the patch rule asks. But the correct option is the longest and the only one with worked numbers, and adding 2 + 6 needs no lesson. Guessable on length and arithmetic.
- Builder notes: No build.md for this lesson. Builder notes in the trust sheet (claims c1–c3) give the formula Total = load + 2 kg, overload = max(0, total − 5), 'Volume not used'. So the total is computed but never displayed, and volume is not in the model at all, though the reveal opens on litres.
- Demo crit (company/rituals/records/2026-10-14-demo-crit.md, read after section 1): its reusable lesson 1, 'Draw the base, not only the result... stages that show only totals plus a formula move the mechanism into the reveal's prose', matches what I found here independently: the 6 kg total and any volume figure are absent; only inputs, a legend formula and 'Over limit' appear.
- Not in the crit: the mode toggle. In the illustrative-model engine (bag, box, circle, coil, desk in this batch) the white bold button after a tap is the mode *not* in effect. The crit did not raise it. I could not tell from the artifact whether it is a 'try this next' hint or a selection bug; either way no element marks the current mode. QA should rule on it (board item for qa-tester).
- Verdict: revise (blocking finding below).
