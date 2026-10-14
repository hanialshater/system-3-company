*Simulated learner. This review finds problems; it is not evidence that anyone learned.*

# Learner review (first review, r9 batch B): debt-grows-ratio-falls
lesson version: v1
boundary: deficit-knower (meta.json learner: knows a deficit adds to the debt each year, from bathtub-deficit-debt; does not know that debt-to-GDP is a fraction, and that growth in GDP can shrink it while the debt itself keeps rising).
Screenshots seen: yes (artifacts/walkthroughs/debt-grows-ratio-falls/sheet.png, 6 frames, fresh release-build walkthrough 2026-10-14 15:20; 06-reveal.png opened)
Phone fit (tools/reveal-fit.mjs, 390x844, http://localhost:3561): crop 0 px, hidden below 0 px, 62 reveal words, named labels hidden 0, phoneFit true.
Verdict: launch

## 1. From the artifact (written before reading build.md)

Path walked: chose "Above 100%"; Next year; Run to year 10; Borrowing 3% to 5%; Growth 5% to 7%; opened reveal.

- **Where the idea first runs out:** the hook and question use "debt-to-GDP" as if the learner already reads it as debt divided by GDP. This boundary knows debt grows with each deficit, so "borrows every year" pulls hard toward "Above 100%" (my pick). That is the wanted wrong guess. The stage then gives DEBT, GDP and RATIO side by side: year 1 $103 / $105 / 98.2%, year 10 $140 / $163 / 85.7%. A learner can see debt rising and GDP rising faster without being told the word "fraction"; that is the stand-in for the cause.
- **No answer before the commit: pass, slight lean.** Above / Still / Below 100%, same precision; locked chart empty, readouts "?". The hook "Does its debt-to-GDP *have to* rise?" leans toward "no" for a test-wise reader (same kind of lean r6 flagged on bending-frontier's "Right?"). Not a blocker.
- **Show the why: pass, thin.** The picture plots only the ratio; the two quantities that make it are readouts, not drawn. The reveal's "borrowing adds to the top, growth enlarges the bottom" points at a top and a bottom that nothing on the stage shows as a fraction (no "140 / 163", no stacked bars). The readout row carries the argument for a learner who compares $140 with $163; a learner who reads RATIO as just another number is told, not shown, the fraction.
- **Reveal quotes what you saw: pass with a glance problem.** $100 to $140, $163, 85.7% and "5% and 5% ... 101.9%" are in the trace rows under the chart, which are on screen at the reveal. But the largest print at the reveal is the readout row from my last move: DEBT $174, GDP $197, RATIO 88.4%. Three big numbers disagree with the three bold numbers in the reveal's first sentence. The trace row resolves it, in 8-9 px bold text.
- **Rounding:** the stage's rounded readouts do not divide to the stage's ratio: $140 / $163 = 85.9%, the readout says 85.7% (year 1: $103 / $105 = 98.1%, readout 98.2%). A learner who takes the reveal's "the ratio is a fraction" at its word and checks it gets a different answer. Small, but it is exactly the check this lesson invites.
- **Reveal fits with its picture: pass** (crop 0). **Text budget: pass** (62 words). Stage text at step 3-4 (model chip about 17 words plus two trace rows about 16) is over the 25-word stage budget.
- Not tested: pressing "Back to year 0" last and then opening the reveal (the QA path did not do it). Whether the trace rows and the quoted $140 / 85.7% survive it is for QA's Reset check.
- Stage chip reads DRAFT and "0/4 claims checked" in this build: the fact-check gate, not a learner finding.

## 2. Earlier findings

None: first learner review.

## 3. Findings

1. Should fix (top): at the reveal the big readouts show the learner's last slider state ($174 / $197 / 88.4%) while the reveal names $140 / $163 / 85.7%. Same pattern as four-in-a-row r8 finding 2.
2. Should fix: the fraction the reveal names ("top", "bottom") has no picture; only RATIO as a number. The cause is carried by the debt and GDP readouts, which is enough to pass, not enough to be obvious.
3. Should fix: rounded readouts do not divide to the shown ratio (85.9% vs 85.7%).
4. Minor: hook "have to" leans to "no"; stage text over 25 words once two trace rows show.
- No FATAL.
