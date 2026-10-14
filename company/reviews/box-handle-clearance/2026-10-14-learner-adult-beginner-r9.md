*Simulated learner. This review finds problems; it is not evidence that anyone learned.*

# Learner review (r9, release-build walkthrough): box-handle-clearance
lesson version: v1 (meta.json version 1, status review)
boundary: adult-beginner (measures furniture with a tape; has never thought that a box's advertised size may exclude handles or lids that stick out).
Screenshots seen: yes (artifacts/walkthroughs/box-handle-clearance/sheet.png, 4 frames; walkthrough re-run 2026-10-14 because the earlier transcript was an aborted page.goto timeout)
Verdict: revise (blocking finding below)

## 1. From the artifact (written before reading meta.json, build.md or the crit)

- Where I first lose it: nowhere conceptually, because the title answers the question. "A box is wider with handles" + "Which measurement catches this shelf collision?" + option "Include handles". An adult picks it without the lesson.
- Amounts the reveal explains are not shown. The stage shows inputs (Body=40cm · handles=2×3cm, 42 cm opening) and one result (Clearance −4 cm). The outer width 46 cm, which is the whole point ("the external envelope"), never appears as a number; I have to compute 40 + 2×3 = 46, 42 − 46 = −4.
- "Body only" result never seen. I chose Body only; the walkthrough went straight to Include handles. The +2 cm "it fits" that would make my choice look right, and then wrong, is never on screen. So the reveal's "Not quite" corrects me without showing the trap.
- BLOCKING (misleading state): the mode indicator looks inverted. From 02-step-1 to the reveal the white bold toggle is "Body only", while the drawing shows handles and Clearance −4 cm. A beginner reads "Body only gives −4 cm", the opposite of the lesson. Same pattern as bag, coil, circle, desk; likely the shared engine. (The white button may be meant as "try this next"; either way nothing on the stage marks the mode in effect, and the lit button is the one not in effect.)
- Slider: moving to 44 cm gives −2 cm, still a collision; fine, but the "it now fits" moment (≥ 46) is not reached.
- Reveal: "The current include handles setting gives -2cm" is ungrammatical and unlabelled (clearance). "Advertised box-body dimensions" is a new idea that the stage never shows (no label says "advertised"). Told.
- Negative clearance ("−4cm") is shown without a word like "overlap" or "too wide by"; a beginner may not read a negative margin as a collision.
- Recall (answer text from the trust sheet: "38 + 2 × 4 = 46 cm. The body width alone hides an 8 cm collision"): computable without the lesson once handle sizes are given. See section 3.
- Phone fit: pass.

## 2. Earlier findings, read after section 1

None. This is the first learner review of this lesson (evidence.simulatedLearner was empty).

## 3. After reading meta.json, builder notes and the crit

- Version recorded: meta.json version 1. Boundary in meta.json: knows ["Everyday objects have sizes, positions and amounts"]; I used the same, made concrete as an adult beginner.
- meta.json doesNotKnow: 'The external envelope includes protrusions.' The envelope is the one number not drawn.
- Recall: body 38 cm, 4 cm handle each side (38 / 42 / 46), key 2. Good transfer: misconception (38) and a plausible slip (42, one handle) as the patch rule asks. It needs the lesson's arithmetic. An adult may get it without the lesson, but the item is fair. No change needed to the recall.
- Builder notes: No build.md. The trust-sheet formula (c3) 'Test width = 40 or 40+2×3 cm. Shelf margin = opening − test width' confirms the 46 cm envelope is computed and not displayed.
- Demo crit (company/rituals/records/2026-10-14-demo-crit.md, read after section 1): its reusable lesson 1, 'Draw the base, not only the result... stages that show only totals plus a formula move the mechanism into the reveal's prose', matches what I found here independently: only the clearance (−4, −2) and the 2×3 legend are shown; the 46 cm envelope is not.
- Not in the crit: the mode toggle. In the illustrative-model engine (bag, box, circle, coil, desk in this batch) the white bold button after a tap is the mode *not* in effect. The crit did not raise it. I could not tell from the artifact whether it is a 'try this next' hint or a selection bug; either way no element marks the current mode. QA should rule on it (board item for qa-tester).
- Verdict: revise (blocking finding below).
