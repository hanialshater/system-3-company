*Simulated learner. This review finds problems; it is not evidence that anyone learned.*

# Learner review (r7, wave F): penalty-on-wiggle
lesson version: v5
boundary: adult-beginner (school-level maths and science; knows a too-flexible curve can overfit and that held-out points check a model; does not know ridge)
Screenshots seen: yes (artifacts/walkthroughs/penalty-on-wiggle/sheet.png)
Verdict: revise

## Findings (written from the walkthrough before reading meta.json or earlier reviews)

Path walked: chose "Larger"; slider right two presses (shows 0.001); tapped "Penalty 10"; tapped "New data" (data set 2); opened reveal.

1. **The idea is on the stage.** Training miss reads "–" locked, then 0.13 at 0.001 and 0.50 at 10, and the purple curve visibly peels off the black dots while the dashed no-penalty curve still threads them. A first-time learner can see "the penalty makes the training miss larger" without the reveal. The why (the penalty charges for bending, so the curve flattens) is shown by the curve going flatter as λ rises. Good.
2. **The reveal quotes a penalty the learner did not see (revise).** The reveal says "at penalty 0.0001 on data set 1 you saw 0.41 against 0.44 with none." The stage at step 1 read "Penalty λ 0.001", held-out 0.41. The 0.0001 state lasted one arrow press and never sat on screen. A learner who read 0.001 will now read 0.0001 and wonder if they misread, or if it is a different setting. This breaks "The reveal quotes what you saw" (the quoted state must be the one visible and in the stage's terms).
3. **The quoted data set 1 values are not on the stage when the reveal opens.** The reveal frame shows data set 2 (0.72 / 0.64 / 0.58). The "0.41 against 0.44 on data set 1" sentence points at a state the learner left two steps ago, with no trace of it on the stage. Minor, but the rule asks for the quoted state to still be visible (a trace, row or readout).
4. **No answer before the commit: passes.** Title "What a penalty does to the fit" and hook ask a question. Options are plain words; "0" appears in two options, so no option is uniquely precise. The locked stage shows training and held-out miss as "–". The "NO-PENALTY HELD-OUT 0.44" readout is visible locked, but it is not the asked quantity.
5. **Reveal text** is about 115 words, under budget, and ends on the idea ("A worse fit to training can be a better model.").
6. Small: the held-out story (moderate penalty helps, 10 hurts) is a second idea beyond the question. It is carried by numbers, not by a picture; a learner can follow it but the stage never shows a held-out curve winning. Not blocking.

## After reading the brief and the r6 review

r6 (v4) findings:
1. Reveal quotes "penalty 0.0001" while the stage showed 0.001: **not fixed**. Same text in v5. r6 called it minor and gave launch; under "The reveal quotes what you saw" (decision 2026-10-14-reveal-quotes-what-you-saw) the quoted state must be the one on screen in the stage's terms, so I hold it as the blocking finding here.
2. Reveal frame scrolls the chart mostly off the top: **not fixed** (still true in 05-reveal), minor.
3. Predict stem about 50 words: **not fixed**, minor.

Verdict reason: the training-miss idea comes through from the stage, but the reveal names a penalty value the learner never saw. Fix route: demo-builder (quote the moderate stop that was on screen, or show a trace of the moderate visit on the stage).
